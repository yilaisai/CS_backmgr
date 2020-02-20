<template>
	<div class="domainNameList-page">
		<ul class="tabs">
			<li :class="payType == 4?'active':''" @click="checkedPayType(4)">宝转卡中转域名</li>
			<li :class="payType == 3?'active':''" @click="checkedPayType(3)">微信中转域名</li>
			<li :class="payType == 2?'active':''" @click="checkedPayType(2)">支付宝中转域名</li>
		</ul>
		<el-table stripe border height="600px" size="mini" :data="list" >
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
		 <el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="pageNum"
				:page-size="pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total*1">
		</el-pagination>
	</div>
</template>
<script>
export default {
	components:{

	},
	data(){
		return {
			list:[],
			payType:4,
			pageNum:1,
			pageSize:20,
			total:0
		}
	},
	mounted(){
		this.getList()
		
	},
	methods:{
		getList(){
			this.list = []
			this.$http.post("/wallet/app/otc/backmgr/domain/list",{payType:this.payType,pageNum:this.pageNum,pageSize:this.pageSize}).then(res => {
				if(res.code == 200){
					this.list = res.result.list.list
					this.total = res.result.list.total
				}
			})
		},
		handleCurrentChange(val) {
			this.pageNum = val
			this.getList()
		},
		handleSizeChange(val) {
			this.pageSize = val
			this.getList()
		},
		checkedPayType(payType){
			
			if(this.payType == payType){
				return
			}else{
				this.payType = payType
				this.pageNum = 1
				this.getList()
			}
		},
		updateStatus(data){
			let num = 0
			this.list.forEach((e)=>{
				if(e.status == 1){
					num+=1
				}
			})
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
	.status1{
		color: #409EFF;
	}
	.status2{
		color: #E6A23C;
	}
	.tabs{
		height: 40px;
		line-height: 40px;
		margin: 0;
		display: flex;
		flex-direction: row;
		// justify-content: space-between;
		align-items: center;
		background: #F5F7FA;
		border: 1px solid #E4E7ED;
		padding: 0;
		li{
			list-style: none;
			height: 100%;
			padding: 0 10px;
			border: 1px solid transparent;
			cursor: pointer;
			font-size: 14px;
			&:hover{
				color: #409EFF;
			}
			&.active{
				color: #409EFF;
				background: #fff;
				border-right-color: #E4E7ED;
				border-left-color: #E4E7ED;
				border-top-color:#E4E7ED; 
				cursor: no-drop;
			}
		}
	}
.el-pagination{
	margin: 0;
}
	.el-table{
		margin: 0;
	}
}
</style>