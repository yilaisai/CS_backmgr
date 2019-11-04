<template>
	<div class="LegalCurrencySetting-page">
		<el-tabs type="border-card">
			<el-tab-pane label="普通交易设置">
				<el-form label-width="100px" ref="filterForm" size="mini">
					<el-form-item label="币种:">
						<el-select v-model="filterForm.coinName" @change="queryOtcCoinConfig" >
							<el-option v-for="(item, key) in coinInfo" :key="key" :value="item.coinName" :label="item.coinName"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="手续费:">
						<el-input placeholder="请输入手续费" v-model="detaileData.otcFee" class="input-with-select"></el-input>
					</el-form-item>
					<el-form-item label="保证金:">
						<el-input placeholder="请输入保证金" v-model="detaileData.deposit" class="input-with-select"></el-input>
					</el-form-item>
				</el-form>
			</el-tab-pane>
		</el-tabs>
		<el-tabs type="border-card">
			<el-tab-pane label="承兑商接单额度全局设置">
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
				</el-form>
			</el-tab-pane>
		</el-tabs>
		<el-button type="primary" class="save" @click="UpdateOtcCoinConfig">保存修改</el-button>
		<!-- <h3>返佣设置</h3>
		<div>
			<el-form 
             label-width="186px"
             ref="filterForm">
				<el-form-item label="全局最大兑入返佣比例:">
					<el-input placeholder="未设置默认0.7%" v-model="detaileData.otcFee" class="input-with-select"></el-input>
					<span>设置后三级返佣比例之和不可超过该值</span>
				</el-form-item>
				<el-form-item label="全局最大兑出返佣比例:">
					<el-input placeholder="未设置默认0.2%" v-model="detaileData.deposit" class="input-with-select"></el-input>
					<span>设置后三级返佣比例之和不可超过该值</span>
				</el-form-item>
				<el-form-item label="默认返佣兑入返佣比例:">
					<el-input placeholder="未设置默认0.6%" v-model="detaileData.otcFee" class="input-with-select"></el-input>
				</el-form-item>
				<el-form-item label="默认返佣兑出返佣比例:">
					<el-input placeholder="未设置0.1%" v-model="detaileData.deposit" class="input-with-select"></el-input>
				</el-form-item>
				
				<el-form-item label="">
						<el-button type="primary">保存</el-button>
					</el-form-item>
					
			</el-form>
		</div> -->
		

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
			}
		}
	},
	activated() {
		if(this.coinInfo[0]) {
			this.filterForm.coinName = this.coinInfo[0].coinName
			this.queryOtcCoinConfig()
		}
	},
	methods:{
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
	.el-tabs {
		margin-bottom: 20px;
	}
	/deep/.el-form-item__content{
		.el-input{
			width: 194px;
		}
			
	}
	.save {
		display: block;
		width: 30%;
		margin: 0 auto 20px;
	}
}
</style>