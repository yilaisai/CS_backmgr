<template>
	<div class="LegalCurrencySetting-page">
		<h3>普通交易设置</h3>
		<div>
			<el-form 
             label-width="86px"
             ref="filterForm">
				<el-form-item label="币种:">
				<el-select v-model="filterForm.coinName" >
					<el-option v-for="(item, key) in coinList" :key="key" :value="item.label" :label="item.value"></el-option>
				</el-select>
				</el-form-item>
				<el-form-item label="手续费:">
					<el-input placeholder="请输入手续费" v-model="filterForm.fee" class="input-with-select"></el-input>
				</el-form-item>
				<el-form-item label="保证金:">
					<el-input placeholder="请输入保证金" v-model="filterForm.amount" class="input-with-select"></el-input>
				</el-form-item>
				<el-form-item label="">
						<el-button type="primary">保存</el-button>
					</el-form-item>
					
			</el-form>
		</div>
		

	</div>
</template>
<script>
export default {
	components:{

	},
	data(){
		return {
			filterForm:{
				amount:'',
				fee: '',
				coinName:'',
				
			},
			coinList:[
					{value:'所有',label:""},
					{value:'USDT',label:"USDT"},
					{value:'BTC',label:"BTC"},
				],
		}
	},
	mounted(){

	},
	methods:{

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
		.main{
			flex: 1;
			overflow: hidden;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
			background: #F6F9FC;
		
		}
}
</style>