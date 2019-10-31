<template>
	<div class="details">
		<div class="topbar">
			<el-button type="primary" size="mini" @click="$router.go(-1)">返回</el-button>
			<el-select v-model="coinName" placeholder="请选择" size="mini">
				<el-option
				:label="$variableCoin"
				:value="$variableCoin">
				</el-option>
			</el-select>
		</div>
		<div class="basic">
			<div class="title"><h3>基本信息</h3></div>
			<ul>
				<li>
					<label>用户名:</label>
					<span>{{pageData.info.name}}</span>
				</li>
				<li>
					<label>身份证号码:</label>
					<span>{{pageData.info.idNo}}</span>
				</li>
				<li>
					<label>手机号码:</label>
					<span>{{pageData.info.phone}}</span>
				</li>
				<li>
					<label>邮箱:</label>
					<span>{{pageData.info.email}}</span>
				</li>
				<li>
					<label>直推人:</label>
					<span>{{pageData.info.firstPhone}}</span>
				</li>
				<li>
					<label>间推人:</label>
					<span>{{pageData.info.secPhone}}</span>
				</li>
				<li>
					<label>上次登录时间:</label>
					<span>{{pageData.info.lastLoginDate}}</span>
				</li>
				<li>
					<label>上次登录IP:</label>
					<span>{{pageData.info.lastLoginIp}}</span>
				</li>
				<li>
					<label>谷歌密钥:</label>
					<span>{{pageData.info.googleVerify}}</span>
					<el-button type="primary" plain size="mini" @click="deleteGoogleVerify">删除</el-button>
				</li>
				<li>
					<label>申请时间:</label>
					<span>{{pageData.info.applyDate}}</span>
				</li>
			</ul>
		</div>
		<div class="settable">
			<div class="title"><h3>可设置参数</h3></div>
			<ul>
				<li>
					<label>商户兑入手续费:</label>
					<!-- <el-select v-model="payType" placeholder="请选择" size="mini" style="width:100px">
						<el-option
							v-for="item in pageData.payList"
							:key="item.code"
							:label="item.typeName"
							:value="item.code">
						</el-option>
					</el-select> -->
					<span>{{pageData.coinInfo.apiMatchFee}}</span>
					<el-button type="primary" plain size="mini" @click="showDialog('feeRateIn')">修改</el-button>
				</li>
				<li>
					<label>商户兑入方式:</label>
					<span>
						<el-radio v-model="pageData.info.inType" :label="1" @change="inTypeChange">派单</el-radio>
  						<el-radio v-model="pageData.info.inType" :label="2" @change="inTypeChange">抢单</el-radio>
					</span>
				</li>
				<li>
					<label>商户兑出手续费:</label>
					<!-- <el-select v-model="payType" placeholder="请选择" size="mini" style="width:100px">
						<el-option
							v-for="item in pageData.payList"
							:key="item.code"
							:label="item.typeName"
							:value="item.code">
						</el-option>
					</el-select> -->
					<span>{{pageData.coinInfo.apiCashoutFee}}</span>
					<el-button type="primary" plain size="mini" @click="showDialog('feeRateIn')">修改</el-button>
				</li>
				<li>
					<label>商户兑出方式:</label>
					<span>
						<el-radio v-model="pageData.info.outType" :label="1" @change="outTypeChange">派单</el-radio>
  						<el-radio v-model="pageData.info.outType" :label="2" @change="outTypeChange">抢单</el-radio>
					</span>
				</li>
				<li>
					<label>直推人费率:</label>
					<span>兑入：{{pageData.info.firstRateIn}}% 　　 兑出：{{pageData.info.firstRateOut}}%</span>
					<el-button type="primary" plain size="mini" @click="showDialog('firstRate')">修改</el-button>
				</li>
				<li>
					<label>间推人费率:</label>
					<span>兑入：{{pageData.info.secRateIn}}% 　　 兑出：{{pageData.info.secRateOut}}%</span>
					<el-button type="primary" plain size="mini" @click="showDialog('secRate')">修改</el-button>
				</li>
				<li>
					<label>最小兑入额度（{{$variableCoin}}）:</label>
					<span>{{pageData.coinInfo.minIn}}</span>
					<el-button type="primary" plain size="mini" @click="showDialog('duiRu')">修改</el-button>
				</li>
				<li>
					<label>最小兑出额度（{{$variableCoin}}）:</label>
					<span>{{pageData.coinInfo.minOut}}</span>
					<el-button type="primary" plain size="mini" @click="showDialog('duiChu')">修改</el-button>
				</li>
				<li>
					<label>最大兑入额度({{$variableCoin}}):</label>
					<span>{{pageData.coinInfo.maxIn}}</span>
					<el-button type="primary" plain size="mini" @click="showDialog('duiRu')">修改</el-button>
				</li>
				<li>
					<label>最大兑出额度({{$variableCoin}}):</label>
					<span>{{pageData.coinInfo.maxOut}}</span>
					<el-button type="primary" plain size="mini" @click="showDialog('duiChu')">修改</el-button>
				</li>
			</ul>
		</div>

		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
			<el-form ref="form" :model="formData" label-width="120px">
				<el-form-item :label="label1">
					<el-input v-model="formData.value1">
						<template slot="append" v-if="dialogType == 'firstRate' || dialogType == 'secRate'">%</template>
					</el-input>
				</el-form-item>
				<el-form-item :label="label2">
					<el-input v-model="formData.value2">
						<template slot="append" v-if="dialogType == 'firstRate' || dialogType == 'secRate'">%</template>
					</el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false" size="mini">取 消</el-button>
				<el-button type="primary" size="mini" @click="dialogEnter">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() { 
		return {
			radio: '1',
			coinName: this.$variableCoin,
			pageData: {
				coinInfo: {},
				info: {},
				payList: []
			},
			formData: {
				value1: '',
				value2: '',
			},
			dialogVisible: false,
			dialogType: "",
			label1: "",
			label2: "",
			dialogTitle: "修改",
			payTypes: [
				{value: 1, label: '银行卡'},
				{value: 2, label: '支付宝'},
				{value: 3, label: '微信'}
			],
			payType: 1
		}
	},
	activated() {
		this.getDetails()
	},
	methods: {
		getDetails() {
			this.$http.post('/wallet/backmgr/merchant/detail', {
				userId: this.$route.query.id
			}).then(res => {
				this.pageData = res.result
			})
		},
		updateMerchantExchangeType(postData) {
			this.$http.post('/wallet/backmgr/merchant/updateMerchantExchangeType', postData).then(res => {
				this.$notify.success({
					title: '提示',
					message: res.msg
				})				
			})
		},
		inTypeChange(val) {
			this.updateMerchantExchangeType({
				exchangeType: val,
				type: 1,
				userId: this.$route.query.id
			})
		},
		outTypeChange(val) {
			this.updateMerchantExchangeType({
				exchangeType: val,
				type: 2,
				userId: this.$route.query.id
			})
		},
		deleteGoogleVerify() {
			this.$prompt('删除后，用户需重置谷歌验证，确定删除？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputPlaceholder: '请输入您的谷歌验证码',
			}).then(({ value }) => {
				this.$http.post("/wallet/backmgr/merchant/deleteGoogleVerify", {
					userId: this.$route.query.id,
					secret: value 
				}).then(res => {
					this.$notify.success({
						title: '提示',
						message: res.msg
					})	
				})
			}).catch(() => {
			});
		},
		// 对话框关闭
		handleClose() {},
		// 显示对话框
		showDialog(type) {
			this.dialogType = type || ""
			if(this.dialogType == 'duiRu') {
				this.dialogTitle = '修改兑入费率'
				this.label1 = '最小兑入额度：'
				this.label2 = '最大兑入额度：'
				this.formData.value1 = this.pageData.coinInfo.minIn
				this.formData.value2 = this.pageData.coinInfo.maxIn
			}else if(this.dialogType == 'duiChu') {
				this.dialogTitle = '修改兑出费率'
				this.label1 = '最小兑出额度：'
				this.label2 = '最大兑出额度：'
				this.formData.value1 = this.pageData.coinInfo.minOut
				this.formData.value2 = this.pageData.coinInfo.maxOut
			}else if(this.dialogType == 'feeRateIn') {
				this.dialogTitle = '修改商户手续费'
				this.label1 = '商户兑入手续费:'
				this.label2 = '商户兑出手续费:'
				this.formData.value1 = this.pageData.coinInfo.apiMatchFee
				this.formData.value2 = this.pageData.coinInfo.apiCashoutFee
			}else if(this.dialogType == 'firstRate') {
				this.dialogTitle = '修改直推人费率'
				this.label1 = '兑入佣金费率：'
				this.label2 = '兑出佣金费率：'
				this.formData.value1 = this.pageData.info.firstRateIn
				this.formData.value2 = this.pageData.info.firstRateOut
			}else if(this.dialogType == 'secRate') {
				this.dialogTitle = '修改间推人费率'
				this.label1 = '兑入佣金费率：'
				this.label2 = '兑出佣金费率：'
				this.formData.value1 = this.pageData.info.secRateIn
				this.formData.value2 = this.pageData.info.secRateOut
			}
			this.dialogVisible = true
		},
		//修改兑入兑出额度  
		updateMerchantCoinConfig(type) {
			this.$http.post('/wallet/backmgr/merchant/updateMerchantCoinConfig', {
				coinName: this.coinName,
				type: type,   //1、兑入；2、兑出；
				userId: this.$route.query.id,
				value1: this.formData.value1,   //最小兑入额
				value2: this.formData.value2   //最大兑入额
			}).then(res => {
				this.formData.value1 = ""
				this.formData.value2 = ""
				this.$notify.success({
					title: '提示',
					message: res.msg
				})	
				this.getDetails()
			})
		},
		//2、修改直推人手续费率；3、修改间推人手续费率；
		updateMerchantInfo(type) {
			this.$http.post('/wallet/backmgr/merchant/updateMerchantInfo', {
				coinName: this.coinName,
				type: type,   //2、修改直推人手续费率；3、修改间推人手续费率；
				userId: this.$route.query.id,
				value1: this.formData.value1,   //最小兑入额
				value2: this.formData.value2   //最大兑入额
			}).then(res => {
				this.formData.value1 = ""
				this.formData.value2 = ""
				this.$notify.success({
					title: '提示',
					message: res.msg
				})	
				this.getDetails()
			})
		},
		//1、修改商户手续费率；
		updateMerchantFee(type) {
			this.$http.post('/wallet/backmgr/merchant/updateMerchantFee', {
				coinName: this.coinName,
				type: type,   //1、兑入；2、兑出；
				userId: this.$route.query.id,
				value1: this.formData.value1,   //最小兑入额
				value2: this.formData.value2   //最大兑入额
			}).then(res => {
				this.formData.value1 = ""
				this.formData.value2 = ""
				this.$notify.success({
					title: '提示',
					message: res.msg
				})	
				this.getDetails()
			})
		},
		dialogEnter() {
			this.dialogVisible = false
			if(this.dialogType == 'duiRu') {
				this.updateMerchantCoinConfig(1)
			}else if(this.dialogType == 'duiChu') {
				this.updateMerchantCoinConfig(2)
			}else if(this.dialogType == 'feeRateIn') {
				this.updateMerchantFee(1)
			}else if(this.dialogType == 'firstRate') {
				this.updateMerchantInfo(2)
			}else if(this.dialogType == 'secRate') {
				this.updateMerchantInfo(3)
			}
		}
	},
	activated() {
		this.getDetails()
	}
}
</script>

<style lang="less" scoped>
.details{
	.title {
		h3 {
			font-size: 14px;
		}
	}
	.topbar {
		display: flex;
		justify-content: space-between;
	}
	.basic {
		ul {
			display: flex;
			flex-wrap: wrap;
			box-shadow: 0 0 2px #999;
			padding: 10px;
			margin: 0;
			li {
				width: 50%;
				list-style: none;
				padding: 10px 0;
				&>label {
					display: inline-block;
					min-width: 100px;
				}
				span {
					display: inline-block;
					padding: 0 10px;
				}
			}
		}
	}
	.settable {
		ul {
			display: flex;
			flex-wrap: wrap;
			box-shadow: 0 0 2px #999;
			padding: 10px;
			margin: 0;
			li {
				width: 50%;
				list-style: none;
				padding: 10px 0;
				&>label {
					display: inline-block;
					min-width: 100px;
				}
				span {
					display: inline-block;
					padding: 0 10px;
				}
			}
		}
	}
}
</style>