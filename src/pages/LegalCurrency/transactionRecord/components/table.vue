<template>
	<el-table :data="listData" border height="100%" size="mini">
		<el-table-column  label="单号/下单时间" width="180"  align="center">
			<span slot-scope="scope">{{scope.row.recdId}} <br />{{ $fmtDate(scope.row.createStamp,'full') }}</span>
		</el-table-column>
		<el-table-column label="用户编号/账户" width="150"  align="center">
			<span slot-scope="scope">{{scope.row.takerName}} <br />{{scope.row.takerPhone}}</span>
		</el-table-column>
		<el-table-column label="广告商编号/账户" width="150"  align="center">
			<span slot-scope="scope">{{scope.row.makerName}} <br />{{scope.row.makerPhone}}</span>
		</el-table-column>
		<el-table-column prop="tradeTime" label="状态" align="center" >
			<span slot-scope="scope">{{ scope.row.tradeStatus==1?'未付款':scope.row.tradeStatus==2?'待放行':scope.row.tradeStatus==3?'已完成':scope.row.tradeStatus==4?'已取消':scope.row.tradeStatus==5?'申述':'' }}</span>
		</el-table-column>
		<el-table-column prop="paymentPhoto" label="交易凭证" width="80" align="center">
			<div slot-scope="scope" class="imgBox" v-if="scope.row.paymentPhoto">
				<el-image 
					style="height: 50px"
					:src="scope.row.paymentPhoto ? scope.row.paymentPhoto.split(',')[0] : ''" 
					:preview-src-list="scope.row.paymentPhoto ? scope.row.paymentPhoto.split(',') : []">
				</el-image>
				<i>{{scope.row.paymentPhoto.split(',').length}}</i>
			</div>
		</el-table-column>
		<el-table-column prop="tradeType" label="广告类型" width="80" align="center">
			<template slot-scope="scope">
				<span v-if="scope.row.trans==1">购买</span>
				<span v-else>出售</span>
			</template>
		</el-table-column>
		<el-table-column label="价格/数量" width="120" align="center">
			<span slot-scope="scope">{{scope.row.price}} / {{scope.row.amount}}</span>
		</el-table-column>
		<el-table-column prop="money" label="金额" align="center" ></el-table-column>
		<el-table-column prop="coinName" label="币种" align="center" ></el-table-column>
		<el-table-column prop="fee" label="手续费" align="center" ></el-table-column>
	</el-table>
</template>

<script>
export default {
	props: {
		listData: {
			type: Array
		}
	}
}
</script>
<style lang="less" scoped>
.el-table{
	margin-top: 10px;
	.imgBox {
		position: relative;
		width:50px;
		height: 50px;
		i {
			position: absolute;
			font-style: normal;
			font-size: 12px;
			height: 16px;
			width: 16px;
			line-height: 16px;
			background-color: #666;
			border-radius: 50%;
			left: 0;
			top: 0;
			color: #fff;
		}
		.el-image {
			height: 100%;
		}
	}
}
</style>

