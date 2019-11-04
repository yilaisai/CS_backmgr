<template>
	<div class="init-settings">
		<div class="current">
			<div class="title">
				<h3>当前参数</h3>
				<div class="select-wrap">
					<label>币种：</label>
					<el-select v-model="coinName" placeholder="请选择" size="small">
						<el-option label="RMT" value="RMT"></el-option>
					</el-select>
				</div>
			</div>
			<ul>
				<li><label>{{coinName}}当前市价:</label><span>{{form.toRMBPrice}}</span></li>
				<li v-if="form.MERCHANT_RATE_TYPE == 1"><label>{{coinName}}当前兑入价格:</label><span>{{Math.floor(form.toRMBPrice * form.MERCHANT_IN_PRICE_FLOAT * 1000000) / 1000000}}</span></li>
				<li v-else><label>{{coinName}}当前兑入价格:</label><span>{{form.MERCHANT_IN_PRICE}}</span></li>
				<li v-if="form.MERCHANT_RATE_TYPE == 1"><label>{{coinName}}当前兑出价格:</label><span>{{Math.floor(form.toRMBPrice * form.MERCHANT_OUT_PRICE_FLOAT * 1000000) / 1000000}}</span></li>
				<li v-else><label>{{coinName}}当前兑出价格:</label><span>{{form.MERCHANT_OUT_PRICE}}</span></li>
				<!-- <li><label>商户最小兑入:</label><span>6.93 RMT</span></li>
				<li><label>商户最大兑入:</label><span>6.93 RMT</span></li>
				<li><label>商户最小兑出:</label><span>6.93 RMT</span></li>
				<li><label>商户最大兑出:</label><span>6.93 RMT</span></li>
				<li><label>商户提币手续费:</label><span>6.93 RMT</span></li>
				<li><label>商户转账手续费:</label><span>6.93 RMT</span></li> -->
			</ul>
		</div>
		<div class="content-wrap">
			<h3>商户设置</h3>
			<el-tabs type="border-card">
				<el-tab-pane label="兑入兑出价格设置">
					<el-form ref="form" :model="form" label-width="100px" size="small">
						<el-form-item label="类型：">
							<el-radio-group v-model="form.MERCHANT_RATE_TYPE">
								<el-radio label="1">系统</el-radio>
								<el-radio label="2">手动</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="货币：">
							<el-input v-model.trim="form.MERCHANT_COIN_NAME" :disabled="true" style="width:100px"></el-input>
						</el-form-item>
						<el-form-item label="兑入价格：" v-if="form.MERCHANT_RATE_TYPE == 1">
							<el-input v-model.trim="form.toRMBPrice" style="width:100px" :disabled="true"></el-input>　*　<el-input v-model.trim="form.MERCHANT_IN_PRICE_FLOAT" placeholder="输入倍数（如0.9）"></el-input>
						</el-form-item>
						<el-form-item label="兑入价格：" v-else>
							<el-input v-model.trim="form.MERCHANT_IN_PRICE"></el-input>
						</el-form-item>
						<el-form-item label="兑出价格：" v-if="form.MERCHANT_RATE_TYPE == 1">
							<el-input v-model.trim="form.toRMBPrice" style="width:100px" :disabled="true"></el-input>　*　<el-input v-model.trim="form.MERCHANT_OUT_PRICE_FLOAT" placeholder="输入倍数（如1.1）"></el-input>
						</el-form-item>
						<el-form-item label="兑出价格：" v-else>
							<el-input v-model.trim="form.MERCHANT_OUT_PRICE"></el-input>
						</el-form-item>
					</el-form>
					<p class="tips">提示：价格默认使用系统设置的价格，开启手动设置的价格，则自动关闭系统价格，关闭手动设置的价格，则自动开启系统价格。</p>
				</el-tab-pane>
			</el-tabs>
			<el-tabs type="border-card">
				<el-tab-pane label="商户初始化设置">
					<el-form ref="form" :model="form" :inline="true" label-width="155px" size="small">
						<el-form-item label="支付方式：">
							<el-select v-model="payType" placeholder="请选择">
								<el-option
									v-for="item in form.otcPayLists"
									:key="item.payType"
									:label="item.description"
									:value="item.payType">
								</el-option>
							</el-select>
						</el-form-item>
						<br />
						<el-form-item label="商户兑入手续费比例：">
							<el-input type="number" v-model.trim="inFee" placeholder="未设置默认1.5%">
								<template slot="append">%</template>
							</el-input>
						</el-form-item>
						<el-form-item label="商户兑出手续费比例：">
							<el-input type="number" v-model.trim="outFee" placeholder="未设置默认0.3%">
								<template slot="append">%</template>
							</el-input>
						</el-form-item>
						<el-form-item label="商户最小兑入额度：">
							<el-input type="number" v-model.trim="form.MERCHANT_MIN_IN_AMOUNT"></el-input>
						</el-form-item>
						<el-form-item label="商户最大兑入额度：">
							<el-input type="number" v-model.trim="form.MERCHANT_MAX_IN_AMOUNT"></el-input>
						</el-form-item>
						<el-form-item label="商户最小兑出额度：">
							<el-input type="number" v-model.trim="form.MERCHANT_MIN_OUT_AMOUNT"></el-input>
						</el-form-item>
						<el-form-item label="商户最大兑出额度：">
							<el-input type="number" v-model.trim="form.MERCHANT_MAX_OUT_AMOUNT"></el-input>
						</el-form-item>
					</el-form>
					<p class="tips">提示：商户默认该参数，可在商户查询模块单独配置该参数。初始化设置修改后只对新增商户生效。</p>
				</el-tab-pane>
			</el-tabs>
			<el-tabs type="border-card">
				<el-tab-pane label="全局设置">
					<el-form ref="form" :model="form" label-width="100px" size="small">
						<el-form-item label="提币手续费：">
							<el-input type="number" v-model.trim="form.MERCHANT_WITHDRAW_RATE"></el-input>
						</el-form-item>
						<el-form-item label="转账手续费：">
							<el-input type="number" v-model.trim="form.MERCHANT_TRADE_RATE"></el-input>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
			<el-button type="primary" class="save" @click="open">保存修改</el-button>
		</div>
	</div>
</template>

<script>
export default {
	data() { 
		return {
			form: {
				otcPayLists: []
			},
			inFee: 0,
			outFee: 0,
			coinName: "RMT",
			payType: ""
		}
	},
	activated() {
		this.getData()
	},
	methods: {
		getData() {
			this.$http.post('/wallet/backmgr/merchant/trade/config', {
				coinName: this.coinName
			}).then(res => {
				this.form = res.result
				if(this.form.otcPayLists.length > 0) {
					this.payType = this.form.otcPayLists[0].payType
				}
			})
		},
		open() {
			this.$prompt('请输入谷歌验证码', '安全验证', {
				confirmButtonText: '确定',
				cancelButtonText: '取消'
			}).then(({ value }) => {
				this.save(value)
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '取消修改'
				})    
			});
		},
		save(ggCode) {
			if(ggCode.trim() == '') {
				this.$message({
					type: 'info',
					message: '谷歌验证码不能为空'
				}) 
				return
			}
			this.form.secret = ggCode
			this.form.inFee = this.inFee / 100
			this.form.outFee = this.outFee / 100
			this.form.payType = this.payType
			this.$http.post('/wallet/backmgr/merchant/trade/updateConfig', this.form).then(res => {
				this.$notify.success({
					title: '提示',
					message: res.msg
				})
			})
		}
	},
	watch: {
		coinName() {
			this.getData()
		},
		payType(newVal, oldVal) {
			this.form.otcPayLists.forEach((val, idx) => {
				if(val.payType == this.payType) {
					this.inFee = val.inFee*100
					this.outFee = val.outFee*100
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.init-settings{
	.current {
		.title {
			display: flex;
			justify-content: space-between;
		}
		h3 {
			margin: 0;
		}
		ul {
			display: flex;
			flex-wrap: wrap;
			margin: 10px 0 0;
			padding: 10px;
			box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
			li {
				width: 33%;
				list-style: none;
				font-size: 15px;
				margin: 5px 0;
				label {
					margin-right: 10px;
					color: #666;
				}
				span {
					color: #000;
					font-weight: 700;
				}
			}
		}
	}
	.el-input {
		width: auto;
	}
	.el-tabs {
		margin-bottom: 20px;
	}
	.tips {
		color: #999;
		font-size: 14px;
	}
	.save {
		display: block;
		width: 30%;
		margin: 0 auto 20px;
	}
}
</style>