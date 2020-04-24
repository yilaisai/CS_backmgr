<template>
	<div class="recharge">
		<div class="main">
			<!-- 筛选条件 -->
			<Query ref="query" @queryData='getData' :orderStatus="orderStatus"/>
			<!-- 表格 -->
			<Table :list="pageData.list" :orderStatus="orderStatus" @hideDialogMR="hideDialogMR"></Table>
		</div>
		<!-- 分页器 -->
		<div class="footer">
      <div class="total">
        <p v-for="(item,index) in newData" :key="index"> <span>{{item.coin_name}}</span> 数量：{{item.sumAmount}} &nbsp;&nbsp;&nbsp;&nbsp;手续费：{{ item.sumFee }}</p>
      </div>
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
		<!-- 手动录单弹框 -->
		<ManualRecordDialog :showDialogMR='showDialogMR' @hideDialogMR="hideDialogMR" @getData="getData" />
	</div>
</template>

<script>
import Query from './components/query.vue'
import Table from './components/table.vue'
import ManualRecordDialog from './components/manual-record-dialog'
export default {
	data() { 
		return {
			pageSize: 20,
			pageNum: 1,
			pageData: {
				total: 0,
				list: []
			},
			orderStatus: [
				{name: '失败', val: 0},
				{name: '成功', val: 1},
				// {name: '待审核', val: 2},
				// {name: '审核不通过', val: 3},
				// {name: '审核通过', val: 4},
			],
			showDialogMR: false,
			totalData:[],
		}
	},
	computed:{
		newData(){
			return this.totalData.filter((el)=>{
				return el.coin_name != 'ETH'
			})
		}
	},
	activated() {
		this.getData()
	},
	methods: {
		getData(formData) {
			formData = formData || {}
			formData.pageNum = this.pageNum
			formData.pageSize = this.pageSize
			formData.transType = 2
			this.$http.post('/wallet/backmgr/trade/queryRechargeWithdrawPage', formData).then(res => {
				if(res.code == 200) {
					this.pageData = res.result.pageInfo
					this.totalData = res.result.sumInfo
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
		hideDialogMR(b) {
			this.showDialogMR = b
		},
	},
	filters: {
		filterStatus(status) {
			this.orderStatus.forEach((value, index) => {
				if(status == value.val) {
					return value.name
				}
			})
		}
	},
	components: {
		Query,
		Table,
		ManualRecordDialog,
	}
}
</script>

<style lang="less" scoped>
.recharge{
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