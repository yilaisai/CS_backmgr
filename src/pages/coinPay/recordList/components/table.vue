<template>
	<el-table
		:data="list"
		height="calc(100% - 50px)"
		border
		size="mini"
		style="min-width: 100%">
		<!-- <el-table-column prop="create_time" label="发起时间" width="140"></el-table-column> -->
		<el-table-column prop="nickName" label="订单号" width="190">
		</el-table-column>
		<el-table-column prop="toTags" label="用户编号" align="center"></el-table-column>
		<el-table-column prop="coin_name" label="币种" align="center"></el-table-column>
		<el-table-column prop="coin_name" label="主网" align="center"></el-table-column>
		<el-table-column prop="coin_name" label="订单金额" align="center"></el-table-column>
		<el-table-column prop="coin_name" label="订单数量" align="center"></el-table-column>
		<el-table-column prop="coin_name" label="实际数量" align="center"></el-table-column>
		<el-table-column prop="coin_name" label="手续费" align="center"></el-table-column>
		<el-table-column prop="coin_name" label="充值地址" align="center"></el-table-column>
		<el-table-column prop="coin_name" label="充值状态" align="center"></el-table-column>
		<el-table-column prop="coin_name" label="监控匹配状态" align="center"></el-table-column>
		<el-table-column prop="updateTime" label="充值时间" width="150">
			<span slot-scope="scope">{{ scope.row.updateTime*1 | dateFormat('YYYY-MM-DD HH:mm:ss') }}</span>
		</el-table-column>
		<el-table-column prop="coin_name" label="用户输入txid" align="center"></el-table-column>
		<el-table-column prop="coin_name" label="操作" width="280" align="center">
			<template slot-scope="scope">
				<el-button type="primary" size="mini">取消订单</el-button>
				<el-button type="danger" size="mini">人工入账</el-button>
				<el-button type="danger" size="mini">激活</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
import BigNumber from 'bignumber.js'
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
	},
	data() { 
		return {
		}
	},
	filters: {
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
		BigNumber(num){
			return BigNumber(num)
		}
	},
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