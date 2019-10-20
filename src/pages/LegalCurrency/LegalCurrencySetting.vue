<template>
	<div class="LegalCurrencySetting-page">
		<h3>普通交易设置</h3>
		<div>
			<el-form 
             label-width="86px"
             ref="filterForm">
				<el-form-item label="币种:">
				<el-select v-model="filterForm.coinName" @change="queryOtcCoinConfig" >
					<el-option v-for="(item, key) in coinList" :key="key" :value="item.label" :label="item.value"></el-option>
				</el-select>
				</el-form-item>
				<el-form-item label="手续费:">
					<el-input placeholder="请输入手续费" v-model="detaileData.otcFee" class="input-with-select"></el-input>
				</el-form-item>
				<el-form-item label="保证金:">
					<el-input placeholder="请输入保证金" v-model="detaileData.deposit" class="input-with-select"></el-input>
				</el-form-item>
				<el-form-item label="">
						<el-button type="primary" @click="UpdateOtcCoinConfig">保存</el-button>
					</el-form-item>
					
			</el-form>
		</div>
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
export default {
	components:{

	},
	data(){
		return {
			filterForm:{
				coinName:'USDT',
			},
			coinList:[
				{value:'USDT',label:"USDT"},
				{value:'BTC',label:"BTC"},
				{value:'ETH',label:"ETH"},
			],
			detaileData:{
				otcFee:''
			}
		}
	},
	mounted(){
		this.queryOtcCoinConfig()
	},
	methods:{
		queryOtcCoinConfig(){
			this.$http.post("/wallet/app/otc/backmgr/queryOtcCoinConfig", {coinName:this.filterForm.coinName}).then(res => {
				// this.$notify({
				// 		title: "成功",
				// 		message: `修改成功`,
				// 		type: "success"
				// });
				if(res.code == 200){
					this.detaileData = res.result
				}
				
			})
		},
		UpdateOtcCoinConfig(){
			this.$http.post("/wallet/app/otc/backmgr/UpdateOtcCoinConfig", {coinId:this.detaileData.coinId,deposit:this.detaileData.deposit,otcFee:this.detaileData.otcFee}).then(res => {
				// 
				if(res.code == 200){
					// this.detaileData = res.result
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
	watch:{

	},
	computed:{

	}
	}
</script>
<style lang="less" scoped>
.LegalCurrencySetting-page{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	&>div{
		border: 1px solid #DCDFE6;
		box-sizing: border-box;
		padding: 40px 0;

	}
	.main{
		flex: 1;
		overflow: hidden;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		background: #F6F9FC;
		
	}
	/deep/.el-form-item__content{
		.el-input{
			width: 194px;
		}
			
	}
}
</style>