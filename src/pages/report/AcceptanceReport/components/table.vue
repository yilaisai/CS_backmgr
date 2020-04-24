<template>
	<div class="table-wrap">
		<div class="table-title">
			<h4>承兑商交易报表</h4>
			<div class="btn-wrap">
				<!-- <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="$emit('hideDialogMR', true)">手动录单</el-button> -->
			</div>
		</div>
		<el-table
			:data="list"
			height="auto"
			border
			size="mini"
			style="min-width: 100%">
			<el-table-column prop="create_time" label="发起时间" width="140"></el-table-column>
			<el-table-column prop="nickName" label="用户编号" width="170" align="center">
				<template slot-scope="scope">
					<span>{{scope.row.phone + ' | ' + scope.row.nickName}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="coin_name" label="姓名" align="center" width="60"></el-table-column>
			<el-table-column prop="amount" label="账号" align="center"></el-table-column>
			<el-table-column prop="fee" label="累计数量(USDT)" align="center"></el-table-column>
			<el-table-column prop="status" label="金额(CNY)" align="center">
			</el-table-column>
			<el-table-column prop="type" label="订单数量" align="center">
			</el-table-column>
			<el-table-column prop="from_addr" label="平均放币时间"></el-table-column>
			<el-table-column prop="to_addr" label="充值数量"></el-table-column>
			<el-table-column prop="id" label="提币数量"></el-table-column>
			<el-table-column prop="tx_id" label="当前余额">
                <a slot-scope="scope" :href="'https://www.omniexplorer.info/search/'+ scope.row.tx_id" target="_blank">{{scope.row.tx_id}}</a>
			</el-table-column>
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
		orderStatus: {
			type: Array
		}
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