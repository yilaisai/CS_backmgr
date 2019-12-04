<template>
	<div class="recharge-record">
		<!-- 筛选条件 -->
        <Query ref="query" @queryData='getData' @exportExcel="exportExcel" :orderStatus="orderStatus"/>
		<!-- 表格 -->
		<Table :list="pageData.list" :orderStatus="orderStatus" @hideDialogMR="hideDialogMR"></Table>
		<!-- 分页器 -->
		<div class="load-more" style="display: flex;">
            <div class="count">
                <span>可用资金变化：<i v-for="(item,index) in sumInfo" :key="index">{{item.sum_balance_change}} {{item.coin_name}}</i></span><br />
				<span>冻结资金变化：<i v-for="(item,index) in sumInfo" :key="index">{{item.sum_frozen_amount_change}} {{item.coin_name}}</i></span>
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
				{name: '创建订单', val: 0},
				{name: '未知', val: 1},
				{name: '未知', val: 2},
				{name: '申诉买方赢，直接放币', val: 3},
				{name: '申诉卖方赢，出售广告回滚卖家的币', val: 4},
				{name: '未知', val: 5},
				{name: '未知', val: 6},
				{name: '未知', val: 7},
				{name: '未知', val: 8},
				{name: '未知', val: 9},
				{name: '未知', val: 10},
				{name: '成为商户', val: 11},
				{name: '未知', val: 12},
				{name: '未知', val: 13},
				{name: '未知', val: 14},
				{name: '未知', val: 15},
				{name: '未知', val: 16},
				{name: '未知', val: 17},
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
			this.$http.post('/wallet/backmgr/merchant/trade/queryAmountFlowPage', formData).then(res => {
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
			window.open(baseUrl + '/wallet/backmgr/merchant/trade/queryAmountFlowPage/export?' + qs.stringify(formData))
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