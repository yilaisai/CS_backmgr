<template>
	<div class="table-wrap">
		<div class="table-title">
			<h4>商户信息列表</h4>
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
			<el-table-column prop="appId" label="appid" width="140"></el-table-column>
			<el-table-column prop="name" label="账号|昵称" width="140">
				<span slot-scope="scope">{{scope.row.name + ' | ' + scope.row.phone}}</span>
			</el-table-column>
			<el-table-column prop="feeRate" label="手续费"></el-table-column>
			<el-table-column prop="firstRateIn" label="直推人账户/费率" align="center"></el-table-column>
			<el-table-column prop="secRateIn" label="间推人账户"></el-table-column>
			<el-table-column prop="amount" label="商户余额"></el-table-column>
			<el-table-column prop="to_addr" label="累计充值额（CNY）"></el-table-column>
			<el-table-column prop="id" label="累计提现额（CNY）"></el-table-column>
			<el-table-column prop="createDate" label="创建时间"></el-table-column>
			<el-table-column prop="date" label="操作" fixed="right" width="100">
				<template slot-scope="scope">
					<el-button
						size="mini"
						type="primary"
						@click="handleEdit(scope.$index, scope.row)">
						详情/编辑
					</el-button>
				</template>
			</el-table-column>
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
			this.$router.push('/merchant/user-details?id=' + row.userId)
		},
		hideDialogMT(b) {
			this.showDialogMT = b
		}
	},
	components: {
	}
}
</script>

<style lang="less" scoped>
.table-wrap {
	margin-top: 20px;
	flex: 1;
	display: flex;
	flex-direction: column;
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