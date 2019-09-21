<template>
	<div class="tradingFlowDetaile-page">
		<el-header>
			<el-button type="primary" @click="$router.go(-1)">返回</el-button>
		</el-header>
		<!-- <el-main></el-main> -->
		<div class="main">
			<div>
				<h3>订单详情</h3>
				<el-form :inline="true" :model="detaileData" class="demo-form-inline">
					<el-form-item label="单号:">
						<el-input v-model="detaileData.recdId"  disabled></el-input>
					</el-form-item>
					<el-form-item label="状态">
						<el-input :value=" detaileData.tradeStatus==1?'未付款':detaileData.tradeStatus==2?'待放行':detaileData.tradeStatus==3?'已完成':detaileData.tradeStatus==4?'已取消':detaileData.tradeStatus==5?'申述中':''" disabled></el-input>
					</el-form-item>
					<el-form-item label="广告类型">
						<el-input :value=" detaileData.trans==0?'售出':detaileData.trans==1?'购买':''" disabled></el-input>
					</el-form-item>
					<el-form-item label="下单时间">
						<el-input :value=" $fmtDate(detaileData.createStamp,'full') " disabled></el-input>
					</el-form-item>
					<el-form-item label="币种:">
						<el-input :value=" detaileData.coinName" disabled></el-input>
					</el-form-item>
					<el-form-item label="广告类型:">
						<el-input :value=" detaileData.tradeType==0?'C2C':detaileData.tradeType==1?'派单':detaileData.tradeType==2?'抢单':''" disabled></el-input>
					</el-form-item>
					<el-form-item label="maker昵称:">
						<el-input v-model="detaileData.makerName"  disabled></el-input>
					</el-form-item>
					<el-form-item label="maker账户:">
						<el-input v-model="detaileData.makerPhone"  disabled></el-input>
					</el-form-item>
					<el-form-item label="maker佣金" class="big">
						<el-input :value=" '一级佣金'+detaileData.makerCommission+detaileData.coinName+',二级级佣金'+detaileData.makerFirstCommission+detaileData.coinName+',三级级佣金'+detaileData.makerSecondaryCommission+detaileData.coinName  " disabled></el-input>
					</el-form-item>
					<el-form-item label="taker昵称:">
						<el-input v-model="detaileData.takerPhone"  disabled></el-input>
					</el-form-item>
					<el-form-item label="taker账户:">
						<el-input v-model="detaileData.takerPhone"  disabled></el-input>
					</el-form-item>
					<!-- <el-form-item label="taker佣金:" class="big">
						<el-input v-model="detaileData.taker" disabled></el-input>
					</el-form-item> -->

					<el-form-item label="价格:">
						<el-input v-model="detaileData.price" disabled></el-input>
					</el-form-item>
					<el-form-item label="数量:">
						<el-input v-model="detaileData.amount" disabled></el-input>
					</el-form-item>
					<el-form-item label="金额:">
						<el-input v-model="detaileData.money" disabled></el-input>
					</el-form-item>

					<el-form-item label="吃单价格:">
						<el-input v-model="detaileData.makerPrice" disabled></el-input>
					</el-form-item>
					<el-form-item label="吃单数量:">
						<el-input v-model="detaileData.makerAmount" disabled></el-input>
					</el-form-item>
					<el-form-item label="报单价格:">
						<el-input v-model="detaileData.makerPrice" disabled></el-input>
					</el-form-item>
					<el-form-item label="接单数量:">
						<el-input v-model="detaileData.takerAmount" disabled></el-input>
					</el-form-item>
					<el-form-item label="手续费:">
						<el-input v-model="detaileData.fee" disabled></el-input>
					</el-form-item>
					<el-form-item label="撮合费:">
						<el-input v-model="detaileData.couplingFee" disabled></el-input>
					</el-form-item>
					








					
					  
				</el-form>
			</div>
			<div>
				<h3>APP下单信息：</h3>
				<el-form :inline="true" :model="detaileData" class="demo-form-inline">
					<el-form-item label="商户user_id">
						<el-input v-model="detaileData.dto.nickName" disabled></el-input>
					</el-form-item>
					<el-form-item label="商户order_id">
						<el-input v-model="detaileData.dto.orderId" disabled></el-input>
					</el-form-item>
					<el-form-item label="appid">
						<el-input v-model="detaileData.dto.appId" disabled></el-input>
					</el-form-item>
					<el-form-item label="金额">
						<el-input v-model="detaileData.money" disabled></el-input>
					</el-form-item>
					<el-form-item label="时间">
						<el-input :value=" $fmtDate(detaileData.createStamp,'full') " disabled></el-input>
					</el-form-item>
					
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	components:{

	},
	data(){
		return {
			formInline: {
				user: 'user',
				region: '',
				taker:'taker  0.4USDT    直推 0.1 USDT     间推  0.1USDT'
			},
			detaileData:{

			}
		}
	},
	activated(){
		this.getData(this.$route.query.recdId)
	},
	mounted(){
		
	},
	methods:{
		getData(recdId){
			this.$http.post('/wallet/app/otc/backmgr/getTradeRecdDetail',{
				recdId:recdId
			}).then(res=>{
				if(res.code==200){
					this.detaileData = res.result;
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
		background: #F6F9FC;
		padding: 10px;
		&>div{
			padding: 10px;
			background: #fff;
			padding-top: 1px;
			margin-bottom: 10px;
			/deep/.el-form-item{
				
				width: 300px;
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
				}
				.el-form-item__label{
					width: 100px;
				}
			}
		}
	}
}
</style>