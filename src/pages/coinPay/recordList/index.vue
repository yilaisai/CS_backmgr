<template>
	<div class="recordList">
		<div class="main">
			<!-- 筛选条件 -->
			<Query ref="query" @queryData='getData' :orderStatus="orderStatus"/>
			<!-- 表格 -->
			<Table :list="pageData.list" :orderStatus="orderStatus" @cancelOrder="cancel" @inWallet="showInWallet"></Table>
		</div>
		<!-- 分页器 -->
		<div class="footer">
      <!-- <div class="total">
        <p v-for="(item,index) in newData" :key="index"> <span>{{item.coin_name}}</span> 数量：{{item.sumAmount}} &nbsp;&nbsp;&nbsp;&nbsp;手续费：{{ item.sumFee }}</p>
      </div> -->
				<el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="pageNum"
						:page-sizes="[20,50]"
						:page-size="pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="pageData.total*1">
				</el-pagination>
		</div>
		<in-wallet :visible="showPop" @setVisible="setShowPop" @confirmTxid="confirmInWallet"></in-wallet>
	</div>
</template>

<script>
import Query from './components/query.vue'
import Table from './components/table.vue'
import InWallet from './components/inWallet'
export default {
	data() { 
		return {
			pageSize: 20,
			pageNum: 1,
			pageData: {
				total: 0,
				list: []
			},
			orderStatus:[
				{
					val:0,
					name:'待匹配'
				},
				{
					val:1,
					name:'匹配中'
				},
				{
					val:2,
					name:'匹配成功'
				},
				{
					val:3,
					name:'已取消'
				},
				{
					val:4,
					name:'已入账'
				},
			],
			showPop:false,
			showId:''
		}
	},
	computed:{
	},
	activated() {
		this.getData()
	},
	methods: {
		getData(formData) {
			formData = formData || {}
			formData.pageNum = this.pageNum
			formData.pageSize = this.pageSize
			this.$http.post('/wallet/recharge/backmgr/queryRcOrderList', formData).then(res => {
				if(res.code == 200) {
					this.pageData = res.result
				}
			})
		},
		handleCurrentChange(e) {
			this.pageNum = e
			this.getData()
		},
		handleSizeChange(e) {
			this.pageSize = e
			this.getData()
		},
		cancel(id){
			this.$confirm('确认取消订单？','提示',{
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(()=>{
				this.$http.post('/wallet/recharge/backmgr/cancelOrder',{
					orderId:id
				}).then(res => {
					this.$message('取消成功')
					this.getData()
				})
			}).catch(() => {        
			});
			
		},
		showInWallet(id){
			this.showPop = true
			this.showId = id
		},
		setShowPop(val){
			this.showPop = val
		},
		confirmInWallet(form){
			if(!form.txId || !form.secret)  {
				this.$notify({
					type:'error',
					message:'请输入TXID及谷歌验证码'
				})
				return
			}
			this.$http.post('/wallet/recharge/backmgr/checkOrderInWallet',{
				...form,
				orderId:this.showId
				}).then(res => {
				this.$notify({
					type:'success',
					message:res.msg
				})
				this.showPop = false
				this.getData()
			})
		}
	},
	components: {
		Query,
		Table,
		InWallet,
InWallet
	}
}
</script>

<style lang="less" scoped>
.recordList{
	overflow: hidden;
	
	.load-more {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.count {
				font-size: 14px;
				span {
						margin-right: 20px;
						i {
								font-style: normal;
								color: #436bff;
								font-weight: 600;
						}
				}
		}
	}
	.main {
		height:100%;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.footer{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		.total{
			p{
				display: inline;
				margin-right: 20px;
				line-height: 24px;
				font-size: 14px;
				color: #606266;
				&:last-of-type{
					margin: 0;
				}
				span{
					font-weight: 600;
					color: #409EFF;
				}
			}
			
		}
		/deep/.el-pagination{
			margin-top: 10px;
		}
	}
}
</style>