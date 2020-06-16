<template>
	<div class="LegalCurrencySetting-page">
		<div class="title">
			<h2>法币设置</h2>
			<div class="select-wrap">
				<label>币种：</label>
				<el-select v-model="filterForm.coinName" @change="queryOtcCoinConfig" size="small">
					<el-option v-for="(item, key) in coinInfo" :key="key" :value="item.coinName" :label="item.coinName"></el-option>
				</el-select>
			</div>
		</div>
		<el-tabs type="border-card">
				<h4>普通交易设置</h4>
				<el-form label-width="60px" ref="filterForm" size="mini">
					<el-form-item label="手续费:">
						<el-input placeholder="请输入手续费" v-model="detaileData.otcFee" ></el-input>
					</el-form-item>
					<el-form-item label="保证金:">
						<el-input placeholder="请输入保证金" v-model="detaileData.deposit" ></el-input>
					</el-form-item>
				</el-form>
				<h4>码商接单额度全局设置</h4>
				<el-form label-width="140px" ref="filterForm" size="mini">
					<el-form-item label="全局兑出范围:">
						<el-input v-model="detaileData.sysMatchMin" placeholder="请输入">
							<template slot="append">{{filterForm.coinName}}</template>
						</el-input>
						<span>　~　</span>
						<el-input v-model="detaileData.sysMatchMax" placeholder="请输入">
							<template slot="append">{{filterForm.coinName}}</template>
						</el-input>
					</el-form-item>
					<el-form-item label="全局兑入范围:">
						<el-input v-model="detaileData.sysCashoutMin" placeholder="请输入">
							<template slot="append">{{filterForm.coinName}}</template>
						</el-input>
						<span>　~　</span>
						<el-input v-model="detaileData.sysCashoutMax" placeholder="请输入">
							<template slot="append">{{filterForm.coinName}}</template>
						</el-input>
					</el-form-item>
					<!-- <el-form-item label="全局资产证明额度:">
					 	<el-input placeholder="请输入保证金额度" v-model="quota.assetCertification" class="selectInputBox">
							<el-select  v-model="quota.payType"  class="selectPayType" slot="prepend" @change="assetCertificationChange" placeholder="请选择">
								<el-option v-for="(item,index) in OtcPayList" :key="index" :label="item.description" :value="item.value"></el-option>
							</el-select>
							<template slot="append" >{{filterForm.coinName}}</template>
						</el-input>
					</el-form-item> -->
					<!-- <el-form-item label="宝转卡接入单限制:">
						每张卡24小时内允许接
					 	<el-input class="miniInput" v-model="atobLimitNum" placeholder="默认2"></el-input>笔单
					</el-form-item>
					<el-form-item label="">
						<el-input v-model="atobLimitMin" placeholder="100"><template slot="append" >{{filterForm.coinName}}</template></el-input>
						～
						<el-input v-model="atobLimitMax" placeholder="1000"><template slot="append" >{{filterForm.coinName}}</template></el-input>
					</el-form-item> -->
					<el-form-item label=""><el-button type="primary"  @click="UpdateOtcCoinConfig">保存修改</el-button></el-form-item>
				</el-form>
		</el-tabs>
		<h3>返佣设置</h3>
		<el-tabs type="border-card">
				<el-form label-width="160px" ref="filterForm" size="mini" v-if="rateDetaile.length>0">
					<el-form-item label="全局最大兑出返佣比例:">
					<el-input placeholder="未设置默认0.7%" v-model="rateDetaile[0].totalBuyRate" ><template slot="append">%</template></el-input>
					<span>设置后返佣比例之和不可超过该值</span>
				</el-form-item>
				<el-form-item label="全局最大兑入返佣比例:">
					<el-input placeholder="未设置默认0.2%" v-model="rateDetaile[0].totalSaleRate" ><template slot="append">%</template></el-input>
					<span>设置后返佣比例之和不可超过该值</span>
				</el-form-item>
				<br>
				<br>
				<el-form-item label="支付通道:">
					<el-select v-model="currentItem.payType"  placeholder="请选择"  @change="getDefaultRate">
							<el-option label="全部" :value="0"></el-option>
							<el-option label="银行卡" :value="1"></el-option>
							<el-option label="支付宝" :value="2"></el-option>
							<el-option label="微信" :value="3"></el-option>
						</el-select>
				</el-form-item>
				<!-- <el-form-item label="反佣等级:">
					<el-select v-model="rateDetaile.rank"  placeholder="请选择" @change="getDefaultRate">
						<el-option label="一级反佣" :value="1"></el-option>
						<el-option label="二级反佣" :value="2"></el-option>
						<el-option label="三级反佣" :value="3"></el-option>
					</el-select>
				</el-form-item> -->
				<el-form-item label="默认返佣兑入返佣比例:">
					<el-input placeholder="" v-model="currentItem.saleRate" >
						<template slot="append">%</template>
					</el-input>
				</el-form-item>
				<el-form-item label="默认返佣兑出返佣比例:">
					<el-input placeholder="" v-model="currentItem.buyRate" >
						<template slot="append">%</template>
					</el-input>
				</el-form-item>
				<el-form-item label="" v-if="currentItem.payType == 0" class="showList">
					<div class="item" v-if="rateDetaile.length >1">
						<span>银行卡兑入返佣比例：<b>{{rateDetaile[0].saleRate}}%</b></span>
						<span>银行卡兑出返佣比例：<b>{{rateDetaile[0].buyRate}}%</b></span>
					</div>
					<div class="item" v-if="rateDetaile.length >1">
						<span>支付宝兑入返佣比例：<b>{{rateDetaile[1].saleRate}}%</b></span>
						<span>支付宝兑出返佣比例：<b>{{rateDetaile[1].buyRate}}%</b></span>
					</div>
					<div class="item" v-if="rateDetaile.length >1">
						<span>微信兑入返佣比例：<b>{{rateDetaile[2].saleRate}}%</b></span>
						<span>微信兑出返佣比例：<b>{{rateDetaile[2].buyRate}}%</b></span>
					</div>
				</el-form-item>
				<el-form-item label="">
					<el-button type="primary" @click="updateDefaultRate">保存</el-button>
				</el-form-item>
			</el-form>
		</el-tabs>
		

	</div>
</template>
<script>
import {mapState} from 'vuex'
export default {
	data(){
		return {
			filterForm:{
				coinName: 'USDT',
			},
			detaileData:{
				otcFee:'',
				
			},
			quota:{
				assetCertification:'',
				payType:'',
			},
			OtcPayList:[],
			// rateDetaile:[{
			// 	buyRate: null,
			// 	payType: 1,
			// 	rank: 1,
			// 	saleRate: null,
			// 	totalBuyRate: 0.1,
			// 	totalSaleRate: 0.1,
			// }],
			currentItem:{
				payType:1,
				buyRate:'',
				saleRate:'',
				rank:1,
			},
			rateDetaile:[],
			atobLimitNum:0,
			atobLimitMin:0,
			atobLimitMax:0,
		}
	},
	activated() {
		// if(this.coinInfo[0]) {
		// 	this.filterForm.coinName = this.coinInfo[0].coinName
		// 	this.queryOtcCoinConfig()
		// }
		this.queryOtcCoinConfig()
		this.getDefaultRate()
	},
	methods:{
		//
		
		updateDefaultRate(){
			let queryDate ={
				buyRate:Math.floor(this.currentItem.buyRate*100)/10000 || -1,
				saleRate:Math.floor(this.currentItem.saleRate*100)/10000 || -1,
				totalBuyRate:Math.floor(this.rateDetaile[0].totalBuyRate*100)/10000,
				totalSaleRate:Math.floor(this.rateDetaile[0].totalSaleRate*100)/10000,
				payType:this.currentItem.payType,
				rank:1,
			}
			this.$http.post("/wallet/invite/backmgr/updateDefaultRate", queryDate).then(res => {
				if(res.code == 200){
					this.$message({
						type: 'success',
						message: res.msg
					})
					this.getDefaultRate()
				}
			})
		},
		getDefaultRate(){
			this.$http.post("/wallet/invite/backmgr/getDefaultRate", {payType:this.currentItem.payType,rank:this.currentItem.rank}).then(res => {
				if(res.code == 200){
					
					// res.result.totalBuyRate = Math.floor(res.result.totalBuyRate*10000)/100
					// res.result.totalSaleRate = Math.floor(res.result.totalSaleRate*10000)/100
					// res.result.saleRate = Math.floor(res.result.saleRate*10000)/100
					// res.result.buyRate = Math.floor(res.result.buyRate*10000)/100
					
					res.result.forEach(el => {
						el.totalBuyRate = Math.floor(el.totalBuyRate*10000)/100
						el.totalSaleRate = Math.floor(el.totalSaleRate*10000)/100
						el.saleRate = Math.floor(el.saleRate*10000)/100
						el.buyRate = Math.floor(el.buyRate*10000)/100
					})
					if (res.result.length > 1) {

						let saleChoose = true;
						let buyChoose = true;
						let saleRate = res.result[0].saleRate;
						let buyRate = res.result[0].buyRate;
						this.currentItem.saleRate = ''
						this.currentItem.buyRate = ''
						res.result.forEach(el => {
							saleChoose && saleRate == el.saleRate? saleChoose = true: saleChoose = false
							buyChoose &&  buyRate == el.buyRate?buyChoose = true: buyChoose = false
						})
						if (saleChoose) this.currentItem.saleRate = saleRate
						if (buyChoose)  this.currentItem.buyRate = buyRate
					} else {
						this.currentItem.saleRate =  res.result[0].saleRate
						this.currentItem.buyRate = res.result[0].buyRate
					}
					this.rateDetaile = res.result
				}
			})
		},
		queryOtcCoinConfig(){
			this.$http.post("/wallet/app/otc/backmgr/queryOtcCoinConfig", {coinName:this.filterForm.coinName}).then(res => {
				if(res.code == 200){
					this.detaileData = res.result.coinInfo
					this.atobLimitNum= res.result.atobLimitNum
					this.atobLimitMin= res.result.atobLimitMin
					this.atobLimitMax= res.result.atobLimitMax
					this.OtcPayList =[]
					res.result.OtcPayList.forEach((item,index) => {
						this.OtcPayList.push({description:item.description,value:item.payType*1,assetCertification:item.assetCertification})
					})
					if(this.quota.payType==''){
						this.quota.payType = this.OtcPayList[0].value
						this.quota.assetCertification = this.OtcPayList[0].assetCertification
					}
				}
			})
		},
		assetCertificationChange(i){
			this.quota.assetCertification = this.OtcPayList[i-1].assetCertification
		},
		UpdateOtcCoinConfig(){
			this.$http.post("/wallet/app/otc/backmgr/UpdateOtcCoinConfig", {
				coinId: this.detaileData.coinId,
				deposit:this.detaileData.deposit,
				otcFee:this.detaileData.otcFee,
				sysMatchMin: this.detaileData.sysMatchMin,
				sysMatchMax: this.detaileData.sysMatchMax,
				sysCashoutMin: this.detaileData.sysCashoutMin,
				sysCashoutMax: this.detaileData.sysCashoutMax,
				assetCertification:this.quota.assetCertification,
				payType:this.quota.payType,
				atobLimitNum:this.atobLimitNum,
				atobLimitMin:this.atobLimitMin,
				atobLimitMax:this.atobLimitMax,
			}).then(res => {
				if(res.code == 200){
					this.$notify({
						title: "成功",
						message: `修改成功`,
						type: "success"
					});
					this.queryOtcCoinConfig()
				}else{
						this.$notify.error({
							title: '提示',
							message: res.msg
						})
				}
				
			})
		}
	},
	watch: {
	},
	computed:{
		...mapState(['coinInfo'])
	}
}
</script>
<style lang="less" scoped>
.LegalCurrencySetting-page{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	overflow: hidden;
	overflow-y: scroll;
	h3{margin-top: 0;}
	h4 {
		padding: 0;
		margin: 0;
		font-size: 14px;
	}
	.el-form {
		margin-top: 10px;
	}
	.el-tabs {
		margin-bottom: 20px;
		
	}
	/deep/.el-form-item__content{
		.miniInput{
			&.el-input{
				width: 60px;
			}
		}
		.el-input{
			width: 194px;
		}
		.el-select{
			// .el-input{
			// 	width: 80px;
			// 	.el-input__inner{
			// 		padding-left: 10px;
			// 	}
			// }
		}
			
	}
	/deep/.selectInputBox {
		.selectPayType{
			// width: 60px;
			&>.el-input{
				width: 80px;
				&>input{
					padding-left: 10px;
				}
			}
		}
		&>.el-input__inner{
			width: 200px;
		}
	}
	
	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10px;
		h2 {
			margin: 0;
			padding: 0;
			font-size: 18px;
		}
		.select-wrap {
		}
	}
	.save {
		display: block;
		width: 30%;
		margin: 0 auto 20px;
	}
	.showList {
		display: flex;
		.item {
			display: flex;
			span {
				width:200px;
				text-align: right;
				margin-right:20px;
			}
		}
	}
}
</style>