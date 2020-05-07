<template>
	<div class="table-wrap">
		<div class="table-title">
			<h4>承兑商交易报表</h4>
			<div class="btn-wrap">
				<!-- <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="$emit('hideDialogMR', true)">手动录单</el-button> -->
			</div>
			<h4>活跃用户数：{{activeUser}}</h4>
		</div>
		<el-table
			:data="list"
			height="auto"
			border
			size="mini"
			style="min-width: 100%">
			<el-table-column prop="nickName" label="用户编号" width="170" align="center">
			</el-table-column>
			<el-table-column prop="realName" label="姓名" align="center" width="60"></el-table-column>
			<el-table-column prop="phone" label="账号" align="center"></el-table-column>
			<el-table-column prop="amount" label="累计数量(USDT)" align="center"></el-table-column>
			<el-table-column prop="cny" label="金额(CNY)" align="center"></el-table-column>
			<el-table-column prop="reward" label="累计佣金(USDT)" align="center"></el-table-column>
			<el-table-column prop="num" label="订单数量" align="center"></el-table-column>
			<el-table-column prop="second" label="平均放币时间"  align="center">
				<template slot-scope="scope">
				{{scope.row.second | secondsChange}}
				</template>
			</el-table-column>
			<el-table-column prop="recharge" label="充值数量"  align="center"></el-table-column>
			<el-table-column prop="withdraw" label="提币数量" align="center"></el-table-column>
			<el-table-column prop="currentAmount" label="当前余额" align="center"></el-table-column>
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
		orderStatus: {
			type: Array
		},
		activeUser:{
			type:Number
		}
	},
	created() {
		orderStatus = this.orderStatus || []
	},
	data() { 
		return {
			showDialogMT: false,
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
		}
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