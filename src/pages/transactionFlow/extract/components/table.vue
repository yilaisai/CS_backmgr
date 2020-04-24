<template>
	<!-- <div class="table-wrap">
		<div class="table-title">
			<h4>充提记录列表</h4>
			<div class="btn-wrap">
				<el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="$emit('hideDialogMR', true)">手动录单</el-button>
			</div>
		</div>
		<el-table
			:data="list"
			height="calc(100% - 50px)"
			border
			size="mini"
			style="min-width: 100%">
			<el-table-column prop="create_time" label="发起时间" width="140"></el-table-column>
			<el-table-column prop="nickName" label="账号|用户编号" width="140">
				<template slot-scope="scope">
					<span>{{scope.row.phone + ' | ' + scope.row.nickName}}</span>
				</template>
			</el-table-column>
			<el-table-column label="用户类型" align="center">
				<template slot-scope="scope">{{scope.row.userType | userTypesFilter}}</template>
			</el-table-column>
			<el-table-column prop="coin_name" label="币种" align="center"></el-table-column>
			<el-table-column prop="amount" label="数量"></el-table-column>
			<el-table-column prop="fee" label="手续费"></el-table-column>
			<el-table-column prop="status" label="状态" align="center">
				<span slot-scope="scope">{{scope.row.status | filterStatus(orderStatus)}}</span>
			</el-table-column>
			<el-table-column prop="type" label="类型" align="center">
				<span slot-scope="scope">{{scope.row.type | filterType(orderStatus)}}</span>
			</el-table-column>
			<el-table-column prop="from_addr" label="From" width="320"></el-table-column>
			<el-table-column prop="to_addr" label="To" width="320"></el-table-column>
			<el-table-column prop="id" label="订单号"></el-table-column>
			<el-table-column prop="tx_id" label="Txid">
                <a slot-scope="scope" :href="'https://www.omniexplorer.info/search/'+ scope.row.tx_id" target="_blank">{{scope.row.tx_id}}</a>
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
		
		<ManualTransferDialog :showDialogMT='showDialogMT' @hideDialogMT="hideDialogMT"></ManualTransferDialog>
	</div> -->
	<el-table
		:data="list"
		height="calc(100% - 50px)"
		border
		size="mini"
		style="min-width: 100%">
		<el-table-column prop="create_time" label="发起时间" width="140"></el-table-column>
		<el-table-column prop="nickName" label="账号|用户编号" width="140">
			<template slot-scope="scope">
				<span>{{scope.row.phone + ' | ' + scope.row.nickName}}</span>
			</template>
		</el-table-column>
		<el-table-column label="用户类型" align="center">
			<template slot-scope="scope">{{scope.row.userType | userTypesFilter}}</template>
		</el-table-column>
		<el-table-column prop="coin_name" label="币种" align="center"></el-table-column>
		<el-table-column prop="amount" label="数量"></el-table-column>
		<el-table-column prop="fee" label="手续费"></el-table-column>
		<el-table-column prop="status" label="状态" align="center">
			<span slot-scope="scope">{{scope.row.status | filterStatus(orderStatus)}}</span>
		</el-table-column>
		<el-table-column prop="type" label="类型" align="center">
			<span slot-scope="scope">{{scope.row.type | filterType(orderStatus)}}</span>
		</el-table-column>
		<el-table-column prop="from_addr" label="From" width="320"></el-table-column>
		<el-table-column prop="to_addr" label="To" width="320"></el-table-column>
		<el-table-column prop="toUrl" label="地址图片" width="100">
			<span slot-scope="scope">
				 <el-image 
				  v-if="scope.row.toUrl"
					style="width: 40px; height: 40px"
					:src="scope.row.toUrl" 
					:preview-src-list="[scope.row.toUrl]">
				</el-image>
			</span>
		</el-table-column>
		<!-- <el-table-column prop="id" label="订单号"></el-table-column> -->
		<el-table-column prop="tx_id" label="Txid">
							<a slot-scope="scope" :href="'https://www.omniexplorer.info/search/'+ scope.row.tx_id" target="_blank">{{scope.row.tx_id}}</a>
		</el-table-column>
		<el-table-column prop="sys_remark" label="备注"></el-table-column>
		<el-table-column prop="user_remark" label="审核备注"></el-table-column>
		<!-- <el-table-column prop="pay_time" label="打币时间" width="140"></el-table-column> -->
		<el-table-column prop="tx_time" label="到账时间" width="140" ></el-table-column>
	</el-table>
</template>

<script>
let orderStatus = []
import ManualTransferDialog from './manual-transfer-dialog'
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
	components: {
		ManualTransferDialog
	}
}
</script>

<style lang="less" scoped>
.table-wrap {
	height: 100%;
	box-sizing: border-box;
	h4 {
		height: 50px;
		line-height: 50px;
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
	margin-top: 0px;
	/deep/ .cell {
		display: flex;
		align-items: center;
		justify-content: center;
		span {
			line-height: 1em;
		}
	}
}
</style>