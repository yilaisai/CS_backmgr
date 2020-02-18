<template>
	<div class="table-wrap">
		<div class="table-title">
			<h4>商户资金流水列表</h4>
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
			<el-table-column prop="create_time" label="时间" width="140"></el-table-column>
			<el-table-column prop="phone" label="账号" width="140" align="center"></el-table-column>
			<el-table-column prop="nick_name" label="用户编号" align="center"></el-table-column>
			<el-table-column prop="coin_name" label="币种" align="center"></el-table-column>
			<el-table-column prop="type_name" label="描述" align="center"></el-table-column>
			<el-table-column prop="balance_change" label="可用资金变化" align="center"></el-table-column>
			<el-table-column prop="balance" label="可用资金余额" align="center"></el-table-column>
			<el-table-column prop="frozen_amount_change" label="冻结资金变化" align="center"></el-table-column>
			<el-table-column prop="frozen_amount" label="冻结资金余额" align="center"></el-table-column>
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