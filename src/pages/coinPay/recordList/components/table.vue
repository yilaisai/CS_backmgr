<template>
	<el-table
		:data="list"
		height="calc(100% - 50px)"
		border
		size="mini"
		style="min-width: 100%">
		<el-table-column prop="id" label="订单号" width="190"></el-table-column>
		<el-table-column prop="updateTime" label="订单时间" width="150">
			<span slot-scope="scope">{{ scope.row.updateTime | dateFormat('YYYY-MM-DD HH:mm:ss') }}</span>
		</el-table-column>
		<el-table-column prop="nickName" label="用户编号" align="center"></el-table-column>
		<el-table-column prop="coin_name" label="币种" align="center"><span>USDT</span></el-table-column>
		<el-table-column prop="chain" label="主网" align="center"></el-table-column>
		<el-table-column prop="amount" label="订单数量" align="center"></el-table-column>
		<el-table-column prop="fee" label="手续费" align="center"></el-table-column>
		<el-table-column prop="toAddr" label="充值地址" align="center"></el-table-column>
		<el-table-column prop="matchStatus" label="充值状态" align="center">
			<template slot-scope="scope">
				{{scope.row.matchStatus | filterStatus(scope.row.matchStatus)}}
			</template>
		</el-table-column>
		<el-table-column prop="rcStatus" label="监控匹配状态" align="center">
			<template slot-scope="scope">
				{{scope.row.rcStatus == 1?'正常':'异常'}}
			</template>
		</el-table-column>
		<el-table-column prop="txId" label="用户输入txid" align="center"></el-table-column>
		<el-table-column prop="realTxId" label="入账txid" align="center"></el-table-column>
		<el-table-column prop="manage" label="操作" width="280" align="center">
			<template slot-scope="scope">
				<el-button type="primary" size="mini" v-if="scope.row.matchStatus == 0 || scope.row.matchStatus == 1" @click="$emit('cancelOrder',scope.row.id)">取消订单</el-button>
				<el-button type="danger" size="mini" v-if="scope.row.matchStatus != 3 && scope.row.matchStatus != 4" @click="$emit('inWallet',scope.row)">人工入账</el-button>
				<el-button type="danger" size="mini" v-if="scope.row.matchStatus == 3" @click="$emit('inWallet',scope.row)">激活入账</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
import BigNumber from 'bignumber.js'
let orderStatus = []
export default {
	props: {
		list: {
			type: Array
		},
		orderStatus: {
			type: Array,
			default:[]
		}
	},
	created() {
		orderStatus = this.orderStatus || []
		console.log(orderStatus)
	},
	data() { 
		return {
		}
	},
	methods: {
		BigNumber(num){
			return BigNumber(num)
		}
	},
	filters:{
		filterStatus(status) {
			let text = ''
			switch(status) {
				case 0:
					text = "待匹配"
					break
				case 1:
					text = "匹配中"
					break
				case 2:
					text = "匹配成功"
					break
				case 3:
					text = "已取消"
					break
				case 4:
					text = "已入账"
					break
				default:
					break
			}
			return text
		}
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