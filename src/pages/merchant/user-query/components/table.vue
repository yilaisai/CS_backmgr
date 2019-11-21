<template>
	<div class="table-wrap">
		<div class="table-title">
			<h4>商户信息列表</h4>
			<div class="btn-wrap">
				<!-- <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="$emit('hideDialogMR', true)">手动录单</el-button> -->
			</div>
		</div>
		<el-table :data="list" height="auto" border size="mini" style="min-width: 100%">
			<el-table-column prop="appId" label="appid" align="center" width="90"></el-table-column>
			<el-table-column prop="phone" label="账号" align="center"></el-table-column>
			<el-table-column prop="name" label="昵称" align="center"></el-table-column>
			<el-table-column prop="feeRate" label="手续费" align="center"></el-table-column>
			<el-table-column label="直推人账户/费率" align="center" width="110">
				<template class="scope" slot-scope="scope"><span v-if="scope.row.firstPhone">{{ scope.row.firstPhone }} /</span> {{ scope.row.firstRateIn }}</template>
			</el-table-column>
			<el-table-column prop="secRateIn" label="间推人账户" width="110" align="center"></el-table-column>
			<el-table-column prop="amount" label="商户余额" width="140" align="center"></el-table-column>
			<el-table-column prop="to_addr" label="累计充值额（CNY）" width="140" align="center"></el-table-column>
			<el-table-column prop="id" label="累计提现额（CNY）" width="140" align="center"></el-table-column>
			<el-table-column prop="createDate" label="创建时间" width="160" align="center"></el-table-column>
			<el-table-column prop="date" label="操作" fixed="right" width="110" align="center">
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
	/deep/.scope{
		p{
			margin: 0
		}
	}
}
</style>