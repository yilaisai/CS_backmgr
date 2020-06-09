<template>
	<div class="tradingFlowDetaile-page">
		<!-- <el-header>
			<el-button type="primary" @click="$router.go(-1)">返回</el-button>
		</el-header> -->
		<!-- <el-main></el-main> -->
		<div class="main">
			<div>
				<h3>订单信息</h3>
				<el-form :inline="true" :model="detaileData" class="demo-form-inline" size="small">
					<el-form-item label="单号:">
						<el-input v-model="detaileData.tradeId"  disabled></el-input>
					</el-form-item>
					<el-form-item label="类型:">
						<el-input :value=" detaileData.advType==3?'抢单兑出':detaileData.advType==4?'抢单兑入':detaileData.advType==5?' 派单兑入 ':'派单兑出'" disabled></el-input>
					</el-form-item>
					<el-form-item label="平台审核意见:" v-if="detaileData.advType != 4 && detaileData.advType != 5">
						<el-input disabled></el-input>
					</el-form-item>
					<el-form-item label="币种:">
						<el-input :value="detaileData.coinName" disabled></el-input>
					</el-form-item>
					<el-form-item label="状态">
						<el-input :value="tradeStatus[detaileData.tradeStatus]" disabled></el-input>
					</el-form-item>
				</el-form>
				<h3>交易方</h3>
				<el-form :inline="true" :model="detaileData" label-width="120px" class="demo-form-inline" size="small">
					<el-form-item label="商户账户:">
						<el-input v-model="detaileData.takerPhone"  disabled></el-input>
					</el-form-item>
					<el-form-item label="商户用户编号:">
						<el-input v-model="detaileData.takerName"  disabled></el-input>
					</el-form-item>
					<el-form-item label="商户appid:">
						<el-input v-model="detaileData.appId"  disabled></el-input>
					</el-form-item>
					<el-form-item label="商户apiUserId:">
						<el-input :value="detaileData.apiUserId" disabled></el-input>
					</el-form-item>
					<el-form-item label="商户订单号:">
						<el-input v-model="detaileData.apiTradeId" disabled></el-input>
					</el-form-item>
					<el-form-item label="承兑商账户:">
						<el-input v-model="detaileData.makerPhone" disabled></el-input>
					</el-form-item>
					<el-form-item label="承兑商用户编号:">
						<el-input v-model="detaileData.makerName" disabled></el-input>
					</el-form-item>
				</el-form>
				<h3>订单金额</h3>
				<el-form :inline="true" :model="detaileData" class="demo-form-inline" size="small">
					<el-form-item label="价格:">
						<el-input v-model="detaileData.makerPrice"  disabled></el-input>
					</el-form-item>
					<el-form-item label="数量:">
						<el-input :value="detaileData.makerAmount+detaileData.coinName"  disabled></el-input>
					</el-form-item>
					<el-form-item label="金额:">
						<el-input v-model="detaileData.amount"  disabled></el-input>
					</el-form-item>
					<el-form-item label="商户到账数量:" v-if="detaileData.advType == 4 || detaileData.advType == 5">
						<el-input v-if="detaileData.tradeStatus == 3 || detaileData.tradeStatus == 6" :value="detaileData.takerAmount" disabled></el-input>
						<el-input v-else value="--" disabled></el-input>
					</el-form-item>
					<el-form-item label="商户支付数量:" v-else>
						<el-input :value="detaileData.takerAmount" disabled></el-input>
					</el-form-item>
					<el-form-item label="手续费:">
						<el-input :value="detaileData.fee+detaileData.coinName" disabled></el-input>
					</el-form-item>
				</el-form>
				<h3>交易奖励</h3>
				<el-form :inline="true" :model="detaileData" class="demo-form-inline" size="small">
					<el-form-item label="商户方奖励:" class="big">
						<el-input :value=" '直接 0'+detaileData.coinName+', 间接 0'+detaileData.coinName  " disabled></el-input>
					</el-form-item>
					<el-form-item label="承兑商方折扣:" >
						<!-- <el-input class="hasBtn" :value=" '承兑商'+detaileData.makerCommission+detaileData.coinName+', 直接'+detaileData.makerFirstCommission+detaileData.coinName+', 间接'+detaileData.makerSecondaryCommission+detaileData.coinName  " disabled> -->
							<el-button  @click=" discountDetaile ">查看详情</el-button>
						<!-- </el-input> -->
					</el-form-item>
					<el-form-item label="平台盈利:">
						<el-input
							v-if="detaileData.tradeStatus == 3 || detaileData.tradeStatus == 6"
							:value=" detaileData.sysEarn   "
							disabled>
							<el-button slot="append" >{{detaileData.coinName}}</el-button>
							
						</el-input>
						<el-input v-else value="--" disabled></el-input>
					</el-form-item>
				</el-form>
				<h3>收款信息</h3>
				<el-form :inline="true" :model="detaileData" class="demo-form-inline" size="small">
					<el-form-item label="收款人:">
						<el-input :value="payList.userName" disabled></el-input>
					</el-form-item>
					<el-form-item label="收款方式:" >
						<el-input :value="payList.payType | payTypeFilter" disabled></el-input>
					</el-form-item>
					<el-form-item label="收款账号:" >
						<el-input :value="payList.num" disabled></el-input>
					</el-form-item>
					 <el-form-item label="付款图片:" class="special" v-if="detaileData.advType == 6 || detaileData.advType == 3 ">
						<el-image 
							:src="detaileData.paymentPhoto.split(',')[0]"
							:preview-src-list="detaileData.paymentPhoto.split(',')"
						>
						</el-image>
					</el-form-item>
					<!--<el-form-item label="退回凭证:" >
						<el-input disabled></el-input>
					</el-form-item> -->
				</el-form>
				<h3>时间信息</h3>
				<el-form :inline="true" :model="detaileData" class="demo-form-inline" size="small">
					<el-form-item label="发起时间:">
						<el-input :value="$fmtDate(detaileData.createTime, 'full')" disabled></el-input>
					</el-form-item>
					<el-form-item label="付款时间:" v-if="detaileData.payTime">
						<el-input :value="$fmtDate(detaileData.payTime, 'full')" disabled></el-input>
					</el-form-item>
					<el-form-item label="确认时间:" v-if="detaileData.letgoTime">
						<el-input :value="$fmtDate(detaileData.letgoTime, 'full')" disabled></el-input>
					</el-form-item>
				</el-form>
				<h3>位置信息</h3>
				<el-form :inline="true" :model="detaileData" class="demo-form-inline" size="small">
					<el-form-item label="发起IP:">
						<el-input :value="detaileData.takerIP" disabled></el-input>
					</el-form-item>
					<el-form-item label="承兑IP:" >
						<el-input :value="detaileData.makerIP" disabled></el-input>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<el-dialog title="折扣详情" :visible.sync="dialogVisible" width="800px">
			<el-table  border  size="mini" :data="detaile">
				<el-table-column prop="phone" label="手机号" align="center"></el-table-column>
				<el-table-column prop="nickName" label="昵称" align="center"></el-table-column>
				<el-table-column prop="rate" label="返佣比例" align="center">
					<template slot-scope="scope">
						{{  Math.floor(scope.row.rate*10000)/100}}%
					</template>
				</el-table-column>
				<el-table-column prop="amount"  label="返佣" align="center"></el-table-column>
				<el-table-column prop="createTimestamp" label="时间" align="center">
					<template slot-scope="scope">
						{{  $fmtDate(scope.row.createTimestamp,'full')}}
					</template>
				</el-table-column>
				
			</el-table>
		</el-dialog>
	</div>
</template>
<script>
export default {
	data(){
		return {
			detaileData:{},
			detaile:[],
			tradeStatus: {
				1: '未付款',
				2: '已付款(等待放行)',
				3: '已完成',
				4: '人为取消',
				5: '申诉中',
				6: '申诉后完成交易',
				7: '申诉后取消交易',
				8: '支付超时取消'
			},
			payTypeMap: {
				1: '银行卡',
				2: '支付宝',
				3: '微信',
				4: '宝转卡'
			},
			payList: {},
			dialogVisible:false,
		}
	},
	activated(){
		this.getData(this.$route.query.tradeId)
	},
	mounted(){
	},
	methods:{
		discountDetaile(){
			this.dialogVisible = true
			this.getInviteRewardCoinChange()
		},
		
		getInviteRewardCoinChange(){
			this.detaile = []
			this.$http.post('/wallet/invite/backmgr/getInviteRewardCoinChange',{
				recdId: this.detaileData.tradeId,
				pageNum:1,
				pageSize:1000
			}).then(res=>{
				this.detaile = res.result.list
				console.log(this.detaile)
			})
		},
		getData(tradeId){
			this.$http.post('/wallet/backmgr/merchant/queryMerchantTradeInfo',{
				tradeId: tradeId
			}).then(res=>{
				if(res.code==200){
					this.detaileData = res.result.otcApiTradeInfoEx;
					this.payList = res.result.payList[0]
				}
			})
		},
	},
	watch:{

	},
	computed:{

	}
	}
</script>
<style lang="less" scoped>
.tradingFlowDetaile-page{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	background-color: #F6F9FC;
	.el-header{
		width: 100%;
	}
	.main{
		flex: 1;
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		h3 {
			font-size: 16px;
			border-bottom: 1px solid #e6e6e6;
		}
		&>div{
			padding: 10px;
			background: #fff;
			padding-top: 1px;
			margin-bottom: 10px;
			/deep/.el-form-item{
				
				// width: 300px;
				.el-input__inner{
					// border: none;
				}
				.el-input.is-disabled .el-input__inner{
					cursor: default;
					color: #606266;
				}
				
				&.big{
					width: 620px;
					.el-input__inner{
						width: 520px;
					}
					.hasBtn .el-input__inner{
						width: 434px;
					}
				}
				.el-form-item__label{
					width: 100px;
				}
				&.special {
					/deep/.el-form-item__content {
						width: auto;
						.el-image {
							width: 100px;
							height: 100px;
							margin-right: 10px;
						}
					}
				}
			}
		}
	}
}
</style>