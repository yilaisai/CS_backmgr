<template>
	<el-dialog title="修改用户余额" :visible.sync="editBalanceShow">
			<p>当前用户资产账户余额：{{balanceData.assetsAmount}} RMT</p>
			<p>当前用户法币账户余额：{{balanceData.otcAmount}} RMT</p>
			<el-form :model="balanceData">
				<el-form-item label="修改账户类型：" label-width="110px" >
					<el-select v-model="balanceData.otcOrWallet" placeholder="请选择账户类型">
						<el-option  label="资产账户" value="1"></el-option>
						<el-option  label="法币账户" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="修改数量：" label-width="110px" >
					<el-input placeholder="请输入内容" v-model="balanceData.amount" @input="amountInput" class="input-with-select">
						<el-select v-model="balanceData.subOrAdd" slot="prepend" placeholder="请选择">
						<el-option label="减少" value="0"></el-option>
						<el-option label="增加" value="1"></el-option>
						</el-select>
						<span slot="append" >RMT</span>
					</el-input>
				</el-form-item>
				<el-form-item label="操作理由：" label-width="110px" >
					<el-input
					type="textarea"
					:rows="2"
					placeholder="请输入内容"
					v-model="balanceData.remarks">
					</el-input>
				</el-form-item>
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editBalanceShow = false">取 消</el-button>
				<el-button type="primary" @click="modifyAmount">确 定</el-button>
			</div>
		</el-dialog>
</template>

<script>
export default {
	props: {
    },
    data(){
        return{
            editBalanceShow:false,
            balanceData:{
				userId:'',
				amount: '',
				assetsAmount:'',
				otcAmount: '',
				otcOrWallet:'',//1就是钱包账户，2是法币账户
				remarks:'',//
				subOrAdd:'',//0是减1是加
			},
        }
    },
    methods:{
        modifyAmount(){
			if(this.balanceData.otcOrWallet==''){
				this.$message.error('请选择账户类型')
				return
			}
			if(this.balanceData.subOrAdd==''){
				this.$message.error('请选择修改类型')
				return
			}
			if(this.balanceData.amount==''){
				this.$message.error('请输入修改数量')
				return
			}
			if(this.balanceData.remarks==''){
				this.$message.error('请输入操作理由')
				return
			}
			// return
			this.$http.post('/wallet/app/otc/backmgr/modifyAmount',this.balanceData).then(res=>{
				
				if(res.code == 200){
                    this.$message.success(res.msg)
					this.editBalanceShow = false
				}else{
					this.$message.error(res.msg)
				}
				
			})
        },
        amountInput(){
			this.balanceData.amount = this.balanceData.amount + ""
			this.balanceData.amount = this.balanceData.amount.replace(/^\.$/g,"")  //清除第一个“.”   
			this.balanceData.amount = this.balanceData.amount.replace(/[^\d.]/g,"")  //清除“数字”和“.”以外的字符   
			this.balanceData.amount = this.balanceData.amount.replace(/\.{2,}/g,".") //只保留第一个. 清除多余的   
			this.balanceData.amount = this.balanceData.amount.replace(".","$#$").replace(/\./g,"").replace("$#$",".")  
			this.balanceData.amount = this.balanceData.amount.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3') //只能输入4个小数   
			if(this.balanceData.amount.indexOf(".") < 0 && this.balanceData.amount != ""){ //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
				this.balanceData.amount = parseFloat(this.balanceData.amount)
			}
		},
		editBalance(userId){
			this.$http.post('/wallet/app/otc/backmgr/queryUserBalance',{userId:userId}).then(res=>{
				if(res.code == 200){
                    this.balanceData={
                        userId:userId,
                        amount: '',
                        assetsAmount:res.result.amount,
                        otcAmount: res.result.otcAmount,
                        otcOrWallet:'',//1就是钱包账户，2是法币账户
                        remarks:'',//
                        subOrAdd:'',//0是减1是加
                    },
					this.editBalanceShow = true
				}else{
					this.$message.error(res.msg)
				}
				
			})
		},
    }
}
</script>

