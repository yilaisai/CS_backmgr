<template>
	<el-dialog
		title="手动录单"
		:visible.sync="dialogVisible"
		width="30%">
		<el-form ref="form" :model="form" label-width="80px" size="mini" label-position="left">
			<el-form-item label="类型">
				<el-radio v-model="form.type" label="1">平台账户</el-radio>
  				<el-radio v-model="form.type" label="2">非平台账户</el-radio>
			</el-form-item>
			<el-form-item label="账户" v-show="form.type == 1">
				<el-input v-model.trim="form.name"></el-input>
			</el-form-item>
			<el-form-item label="币种">
				<el-select v-model="form.coinName" placeholder="请选择币种">
					<el-option label="RMT" value="RMT"></el-option>
					<el-option label="ETH" value="ETH"></el-option>
					<el-option label="BTC" value="BTC"></el-option>
					<el-option label="EOS" value="EOS"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="TXID">
				<el-input v-model.trim="form.txId"></el-input>
			</el-form-item>
			<el-form-item label="from地址">
				<el-input v-model.trim="form.fromAddr"></el-input>
			</el-form-item>
			<el-form-item label="to地址">
				<el-input v-model.trim="form.toAddr"></el-input>
			</el-form-item>
			<el-form-item label="数量">
				<el-input v-model.trim="form.amount">
					<template slot="append">RMT</template>
				</el-input>
			</el-form-item>
			<el-form-item label="手续费">
				<el-input v-model.trim="form.fee">
					<template slot="append">RMT</template>
				</el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false" size="mini">取 消</el-button>
			<el-button type="primary" size="mini" @click="manualDo">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
export default {
	props: {
		showDialogMR: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			form: {
				type: "1",
				name: '',  //账号手机号码
				txId: "",
				coinName: "RMT",
				toAddr: "",
				fromAddr: "",
				amount: "", //实际到账金额
				fee: '', //手续费
			}
		}
	},
	methods: {
		manualDo() {
			for(let i in this.form) {
				if(this.form[i] === '' && i != 'name') {
					console.log(i)
					this.$notify.error({
						title: '提示',
						message: "数据填写不完整"
					})
					return
				}
			}
			this.$http.post('/wallet/backmgr/trade/createWithdrawSuccess', this.form).then(res => {
				if(res.code == 200) {
					this.$notify.success({
						title: '提示',
						message: '录入成功！'
					})
					this.dialogVisible = false
					this.$emit('getData')
				}else {
					this.$notify.error({
						title: '提示',
						message: res.msg
					})
				}
			})
		}
	},
	computed: {
        dialogVisible: {
            get () {
                return this.showDialogMR
            },
            set (val) {
                this.$emit('hideDialogMR', val)
            }
        }
    },
}
</script>

