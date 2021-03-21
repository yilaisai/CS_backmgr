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
		<el-table-column prop="fromAddr" label="充值地址" align="center" width="220"></el-table-column>
		<el-table-column prop="txId" label="txid" align="center"></el-table-column>
		<el-table-column prop="amount" label="数量" align="center"></el-table-column>
		<el-table-column prop="coinName" label="币种" align="center"></el-table-column>
		<el-table-column prop="chain" label="主网" align="center"></el-table-column>
		<el-table-column prop="matchStatus" label="订单匹配状态" align="center">
			<template slot-scope="scope">
				{{scope.row.matchStatus | filterStatus}}
			</template>
		</el-table-column>
		<el-table-column prop="status" label="状态" align="center">
			<span slot-scope="scope" :class="{'red':scope.row.status == 0}">
				{{scope.row.status == 1?'正常':'异常'}}
			</span>
		</el-table-column>
		<el-table-column prop="rcOrderId" label="充值订单号" align="center" width="150"></el-table-column>
		<el-table-column prop="coin_name" label="操作" width="280" align="center">
			<template slot-scope="scope">
				<el-button type="danger" size="mini" v-if="scope.row.matchStatus == 0" @click="$emit('inWallet',scope.row.id)">入账</el-button>
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
	},
	created() {
	},
	data() { 
		return {
		}
	},
	filters: {
		filterStatus(type){
			let status = ''
			switch(type) {
				case 0:
					status = '待匹配'
					break
				case 1:
					status = '已匹配'
					break
				case 2:
					status = '已入账'
					break
				default:
					break
			}
			return status
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
		.red {
			color:red;
		}
	}
}
</style>