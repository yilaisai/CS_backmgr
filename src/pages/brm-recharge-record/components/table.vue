<template>
	<div class="table-wrap">
		<div class="table-title">
			<h4>审核列表</h4>
			<div class="btn-wrap">
				<el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="$emit('hideDialogMR', true)">手动录单</el-button>
			</div>
		</div>
		<el-table
			:data="list"
			height="auto"
			border
			size="mini"
			style="width: 100%">
			<el-table-column prop="create_time" label="发起时间" width="140"></el-table-column>
			<el-table-column prop="nickName" label="账号|昵称" width="140">
				<template slot-scope="scope">
					<span>{{scope.row.phone + ' | ' + scope.row.nickName}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="coin_name" label="币种"></el-table-column>
			<el-table-column prop="amount" label="数量"></el-table-column>
			<el-table-column prop="fee" label="手续费"></el-table-column>
			<el-table-column prop="status" label="状态">
				<template slot-scope="scope">
					<span>{{scope.row.status | filterStatus(orderStatus)}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="type" label="类型"></el-table-column>
			<el-table-column prop="from_addr" label="From" width="200"></el-table-column>
			<el-table-column prop="to_addr" label="To" width="200"></el-table-column>
			<el-table-column prop="id" label="订单号"></el-table-column>
			<el-table-column prop="tx_id" label="Txid" width="200">
				<template slot-scope="scope">
                    <a :href="'https://www.omniexplorer.info/search/'+ scope.row.tx_id" target="_blank">{{scope.row.tx_id}}</a>
                </template>
			</el-table-column>
			<el-table-column prop="sys_remark" label="备注"></el-table-column>
			<el-table-column prop="user_remark" label="上链备注"></el-table-column>
			<el-table-column prop="pay_time" label="打币时间" width="140"></el-table-column>
			<el-table-column prop="tx_time" label="到账时间" width="140"></el-table-column>
			<el-table-column prop="date" label="操作" fixed="right" width="100">
				<template slot-scope="scope">
					<el-button
						size="mini"
						type="primary"
						@click="handleEdit(scope.$index, scope.row)">
						手动打币
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
		}
	},
	methods: {
		handleEdit() {
			this.$emit('hideDialogMT', true)
		}
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