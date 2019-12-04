<template>
	<div class="recharge-record">
		<!-- 筛选条件 -->
        <Query ref="query" @queryData='getData' @exportExcel="exportExcel" :orderStatus="orderStatus"/>
		<!-- 表格 -->
		<Table :list="pageData.list" :orderStatus="orderStatus" @hideDialogMR="hideDialogMR"></Table>
		<!-- 分页器 -->
		<div class="load-more" style="display: flex;">
            <div class="count">
                <span>数量：<i v-for="(item,index) in sumInfo" :key="index">{{item.sumAmount}} {{item.coin_name}}</i></span>
				<span>手续费：<i v-for="(item,index) in sumInfo" :key="index">{{item.sumFee}} {{item.coin_name}}</i></span>
            </div>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[20,50]"
                :page-size="pageSize"
				:pager-count="5"
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
import qs from 'qs'
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
				{name: '待审核', val: 2},
				{name: '审核不通过', val: 3},
				{name: '审核通过', val: 4},
			],
			showDialogMR: false,
			formData: {},
			sumInfo: [],
		}
	},
	activated() {
		this.getData()
	},
	methods: {
		getData(formData) {
			if(formData) this.pageNum = 1
			formData = formData || this.formData
			formData.pageNum = this.pageNum
			formData.pageSize = this.pageSize
			this.formData = formData
			this.$http.post('/wallet/backmgr/merchant/trade/queryRechargeWithdrawPage', formData).then(res => {
				if(res.code == 200) {
					this.pageData = res.result.pageInfo
					this.sumInfo = res.result.sumInfo
				}
			})
		},
		exportExcel(formData) {
			formData = formData || this.formData
			formData.pageNum = this.pageNum
			formData.pageSize = this.pageSize
			formData.token = localStorage.getItem('wallet_token') || ""
			const baseUrl = localStorage.getItem('SERVER_PATH') || window.SERVER_PATH
			window.open(baseUrl + '/wallet/backmgr/merchant/trade/queryRechargeWithdrawPage/export?' + qs.stringify(formData))
		},
		handleCurrentChange(val) {
			this.pageNum = val
			this.getData()
		},
		handleSizeChange(val) {
			this.pageSize = val
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
.recharge-record{
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
					display: inline-block;
					margin-right: 10px;
                    font-style: normal;
                    color: #409EFF;
                    font-weight: 600;
                }
            }
        }
	}
}
</style>