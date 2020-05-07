<template>
	<div class="table-wrap">
		<div class="table-title">
			<h4>商户数据交易报表</h4>
			<div class="btn-wrap">
				<!-- <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="$emit('hideDialogMR', true)">手动录单</el-button> -->
			</div>
		</div>
		<el-table
			:data="list"
			height="auto"
			border
			@sort-change='changeSort'
			size="mini"
			style="min-width: 100%">
			<el-table-column prop="nickName" label="用户编号" align="center"></el-table-column>
			<el-table-column prop="amount" label="累计数量(USDT)" sortable="custom" align="center"></el-table-column>
			<el-table-column prop="cny" label="金额(CNY)" sortable="custom" align="center"></el-table-column>
			<el-table-column prop="fee" label="手续费(USDT)" align="center"></el-table-column>
			<el-table-column prop="num" label="订单数量" align="center"></el-table-column>
			<el-table-column prop="sucNum" label="完成订单数量" align="center"></el-table-column>
			<el-table-column prop="calNum" label="取消订单数量" align="center"></el-table-column>
			<el-table-column prop="rate" label="完成订单比例" align="center"></el-table-column>
			<el-table-column prop="second" label="平均完成时间" align="center">
				<template slot-scope="scope">
					{{scope.row.second | secondsChange}}
				</template>
			</el-table-column>
			<el-table-column prop="withdraw" label="提币数量" align="center"></el-table-column>
			<el-table-column prop="currentAmount" label="当前余额" align="center"></el-table-column>
			<!-- <el-table-column prop="date" label="操作" fixed="right" width="100">
				<template slot-scope="scope">
					<el-button
						size="mini"
						type="primary"
						@click="handleEdit(scope.$index, scope.row)">
						手动打币
					</el-button>
				</template>
			</el-table-column> -->
		</el-table>
	</div>
</template>

<script>
let orderStatus = []
// import ManualTransferDialog from './manual-transfer-dialog'
export default {
	props: {
		list: {
			type: Array
		},
	},
	created() {
		orderStatus = this.orderStatus || []
	},
	data() { 
		return {
			showDialogMT: false
		}
	},
	filters: {
		filterStatus(status) {
			let name = ''
			orderStatus.forEach((value, index) => {
				if(status == value.val) {
					name = value.name
				}
			})
			return name
		},
		filterType(status) {
			let name = ""
			if(status == 2) {
				name = "充值"
			}else {
				name = "提币"
			}
			return name
		}
	},
	methods: {
		handleEdit(idx, row) {
			this.showDialogMT = true
		},
		hideDialogMT(b) {
			this.showDialogMT = b
		},
		changeSort(row) {
			console.log(row)
			this.$emit('sort')
		},
	},
}
</script>

<style lang="less" scoped>
.table-wrap {
	margin-top: 20px;
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	h4 {
		padding: 0 10px;
		margin: 0;
		font-size: 14px;
	}
	.table-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}
.el-table{
	flex: 1;
	margin-top: 10px;
}
</style>