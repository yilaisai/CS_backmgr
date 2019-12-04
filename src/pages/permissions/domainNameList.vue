<template>
	<div class="domainNameList-page">
		<el-table stripe border height="100%" size="mini" :data="list" >
			<el-table-column type="index" label="序号" :index="indexMethod" align="center"></el-table-column>
			<el-table-column prop="domainName" label="服务器域名" align="center"></el-table-column>
			<el-table-column prop="createTime" label="添加时间" align="center">
				<template slot-scope="scope">
					{{  $fmtDate(scope.row.createTime,'full')}}
				</template>
			</el-table-column>
			<el-table-column prop="updateTime" label="上次使用时间" align="center">
				<template slot-scope="scope">
					{{  $fmtDate(scope.row.lastStartTime,'full')}}
				</template>
			</el-table-column>
			<el-table-column  label="状态" align="center">
				<template slot-scope="scope">
					<span :class="scope.row.status == 1?'status1':'status2'">{{ scope.row.status == 1?'已开启':'已关闭' }}</span>
				</template>
			</el-table-column>
			
			<el-table-column  label="操作"  fixed="right" align="center" >
				<template slot-scope="scope">
					<el-button size="mini" @click="updateStatus(scope.row)" :type=" scope.row.status == 0?'primary':'warning'">{{ scope.row.status == 1?'关闭':'开启' }}</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
export default {
	components:{

	},
	data(){
		return {
			list:[]
		}
	},
	mounted(){
		this.getList()
		
	},
	methods:{
		getList(){
			this.$http.post("/wallet/app/otc/backmgr/domain/list").then(res => {
				if(res.code == 200){
					console.log(res)
					this.list = res.result.list
				}
			})
		},
		updateStatus(data){
			let num = 0
			this.list.forEach((e)=>{
				if(e.status == 1){
					num+=1
				}
			})
			console.log(num==1&&data.status==1)
			if(num==1&&data.status==1){
				this.$confirm(`当前只有一台服务器开启中，若关闭则无服务器开启，确定关闭？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
				}).then(() => {
					this.update(data)
				}).catch(()=>{

				})
			}else{
				this.update(data)
			}
		},
		update(data){
			this.$http.post("/wallet/app/otc/backmgr/domain/updateStatus",{status:data.status==1?0:1,id:data.id}).then(res => {
				if(res.code == 200){
					this.$notify({
						title: "成功",
						message: `修改成功`,
						type: "success"
					});
					this.getList()
				}
			})
		},
		indexMethod(index) {
			return   index+1
		},
	},
	watch:{

	},
	computed:{

	}
	}
</script>
<style lang="less" scoped>
.domainNameList-page{
	overflow: hidden;
	.status1{
		color: #409EFF;
	}
	.status2{
		color: #E6A23C;
	}
}
</style>