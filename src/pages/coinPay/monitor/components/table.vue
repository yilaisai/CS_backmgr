<template>
	<el-table
		:data="list"
		height="calc(100% - 50px)"
		border
		size="mini"
		style="min-width: 100%">
		<el-table-column prop="updateTime" label="充值时间" width="150">
			<span slot-scope="scope">{{ scope.row.updateTime*1 | dateFormat('YYYY-MM-DD HH:mm:ss') }}</span>
		</el-table-column>
		
		<el-table-column prop="nickName" label="数量" align="center"></el-table-column>
		<el-table-column prop="coin_name" label="币种" align="center"></el-table-column>
		<el-table-column prop="coin_name" label="主网" align="center"></el-table-column>
		<el-table-column prop="coin_name" label="订单匹配状态" align="center"></el-table-column>
		<el-table-column prop="coin_name" label="状态" align="center"></el-table-column>
		<el-table-column prop="coin_name" label="归拢状态" align="center"></el-table-column>
		<el-table-column prop="coin_name" label="归拢地址" align="center"></el-table-column>
		<el-table-column prop="updateTime" label="归拢时间" width="150">
			<span slot-scope="scope">{{ scope.row.updateTime*1 | dateFormat('YYYY-MM-DD HH:mm:ss') }}</span>
		</el-table-column>
		<el-table-column prop="coin_name" label="实际充值txid" align="center"></el-table-column>
		<el-table-column prop="coin_name" label="归拢txid" align="center"></el-table-column>
		<el-table-column prop="coin_name" label="币支付订单号" align="center"></el-table-column>
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