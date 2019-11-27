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
				<el-form label-width="100px" ref="filterForm" size="mini">
					<el-form-item label="手续费:">
						<el-input placeholder="请输入手续费" v-model="detaileData.otcFee" class="input-with-select"></el-input>
					</el-form-item>
					<el-form-item label="保证金:">
						<el-input placeholder="请输入保证金" v-model="detaileData.deposit" class="input-with-select"></el-input>
					</el-form-item>
				</el-form>
				<h4>承兑商接单额度全局设置</h4>
				<el-form label-width="100px" ref="filterForm" size="mini">
					<el-form-item label="全局买币范围:">
						<el-input v-model="detaileData.sysMatchMin" placeholder="请输入">
							<template slot="append">{{filterForm.coinName}}</template>
						</el-input>
						<span>　~　</span>
						<el-input v-model="detaileData.sysMatchMax" placeholder="请输入">
							<template slot="append">{{filterForm.coinName}}</template>
						</el-input>
					</el-form-item>
					<el-form-item label="全局卖币范围:">
						<el-input v-model="detaileData.sysCashoutMin" placeholder="请输入">
							<template slot="append">{{filterForm.coinName}}</template>
						</el-input>
						<span>　~　</span>
						<el-input v-model="detaileData.sysCashoutMax" placeholder="请输入">
							<template slot="append">{{filterForm.coinName}}</template>
						</el-input>
					</el-form-item>
					<el-form-item label=""><el-button type="primary"  @click="UpdateOtcCoinConfig">保存修改</el-button></el-form-item>
				</el-form>
		</el-tabs>
		<h3>返佣设置</h3>
		<el-tabs type="border-card">
				<el-form label-width="160px" ref="filterForm" size="mini">
					<el-form-item label="全局最大卖币返佣比例:">
					<el-input placeholder="未设置默认0.7%" v-model="rateDetaile.totalBuyRate" class="input-with-select"><template slot="append">%</template></el-input>
					<span>设置后三级返佣比例之和不可超过该值</span>
				</el-form-item>
				<el-form-item label="全局最大买币返佣比例:">
					<el-input placeholder="未设置默认0.2%" v-model="rateDetaile.totalSaleRate" class="input-with-select"><template slot="append">%</template></el-input>
					<span>设置后三级返佣比例之和不可超过该值</span>
				</el-form-item>
				<br>
				<br>
				<el-form-item label="支付通道:">
					<el-select v-model="rateDetaile.payType"  placeholder="请选择"  @change="getDefaultRate">
							<el-option label="银行卡" :value="1"></el-option>
							<el-option label="支付宝" :value="2"></el-option>
							<el-option label="微信" :value="3"></el-option>
							<!-- <el-option label="宝转卡" :value="4"></el-option> -->
						</el-select>
				</el-form-item>
				<el-form-item label="反佣等级:">
					<el-select v-model="rateDetaile.rank"  placeholder="请选择" @change="getDefaultRate">
						<el-option label="一级反佣" :value="1"></el-option>
						<el-option label="二级反佣" :value="2"></el-option>
						<el-option label="三级反佣" :value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="默认返佣卖币返佣比例:">
					<el-input placeholder="未设置默认0.6%" v-model="rateDetaile.saleRate" class="input-with-select">
						<template slot="append">%</template>
					</el-input>
				</el-form-item>
				<el-form-item label="默认返佣买币返佣比例:">
					<el-input placeholder="未设置默认0.1%" v-model="rateDetaile.buyRate" class="input-with-select">
						<template slot="append">%</template>
					</el-input>
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
				coinName: '',
			},
			detaileData:{
				otcFee:''
			},
			rateDetaile:{
				buyRate: null,
				payType: 1,
				rank: 1,
				saleRate: null,
				totalBuyRate: 0.1,
				totalSaleRate: 0.1,
			}
		}
	},
	activated() {
		if(this.coinInfo[0]) {
			this.filterForm.coinName = this.coinInfo[0].coinName
			this.queryOtcCoinConfig()
		}
		this.getDefaultRate()
	},
	methods:{
		//
		
		updateDefaultRate(){
			let queryDate ={
				buyRate:Math.floor(this.rateDetaile.buyRate*100)/10000,
				saleRate:Math.floor(this.rateDetaile.saleRate*100)/10000,
				totalBuyRate:Math.floor(this.rateDetaile.totalBuyRate*100)/10000,
				totalSaleRate:Math.floor(this.rateDetaile.totalSaleRate*100)/10000,
				payType:this.rateDetaile.payType,
				rank:this.rateDetaile.payType,
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
			this.$http.post("/wallet/invite/backmgr/getDefaultRate", {payType:this.rateDetaile.payType,rank:this.rateDetaile.rank}).then(res => {
				if(res.code == 200){
					res.result.totalBuyRate = Math.floor(res.result.totalBuyRate*10000)/100
					res.result.totalSaleRate = Math.floor(res.result.totalSaleRate*10000)/100
					res.result.saleRate = Math.floor(res.result.saleRate*10000)/100
					res.result.buyRate = Math.floor(res.result.buyRate*10000)/100
					this.rateDetaile = res.result
				}
			})
		},
		queryOtcCoinConfig(){
			this.$http.post("/wallet/app/otc/backmgr/queryOtcCoinConfig", {coinName:this.filterForm.coinName}).then(res => {
				if(res.code == 200){
					this.detaileData = res.result
				}
			})
		},
		UpdateOtcCoinConfig(){
			this.$http.post("/wallet/app/otc/backmgr/UpdateOtcCoinConfig", {
				coinId: this.detaileData.coinId,
				deposit:this.detaileData.deposit,
				otcFee:this.detaileData.otcFee,
				sysMatchMin: this.detaileData.sysMatchMin,
				sysMatchMax: this.detaileData.sysMatchMax,
				sysCashoutMin: this.detaileData.sysCashoutMin,
				sysCashoutMax: this.detaileData.sysCashoutMax
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
		coinInfo(newVal, oldVal) {
			this.filterForm.coinName = this.coinInfo[0].coinName
			this.queryOtcCoinConfig()
		}
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
}
</style>