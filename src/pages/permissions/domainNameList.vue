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
					{{  $fmtDate(scope.row.updateTime,'full')}}
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
			this.$http.post("/wallet/app/otc/backmgr/domain/updateStatus",{status:data.status==1?0:1,id:data.id}).then(res => {
				if(res.code == 200){
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