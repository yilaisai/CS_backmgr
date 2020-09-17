<template>
	<div class="details">
		<!-- <div class="topbar">
			<el-button type="primary" size="mini" @click="$router.go(-1)">返回</el-button>
			<el-select v-model="coinName" placeholder="请选择" size="mini">
				<el-option
				:label="$variableCoin"
				:value="$variableCoin">
				</el-option>
			</el-select>
		</div> -->
		<div class="basic">
			<div class="title"><h3>基本信息</h3></div>
			<ul>
				<li>
					<label>商户编号:</label>
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
				<!-- <li>
					<label>直推人:</label>
					<span>{{pageData.info.firstPhone}}</span>
				</li>
				<li>
					<label>间推人:</label>
					<span>{{pageData.info.secPhone}}</span>
				</li> -->
				<!-- <li>
					<label>商户编号:</label>
					<span>300625</span>
				</li>
				<li>
					<label>商户代码:</label>
					<span>KSC</span>
				</li> -->
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
				<li>
					<label>商户网址:</label>
					<span>{{pageData.info.companyAddr}}</span>
				</li>
			</ul>
		</div>
		<div class="settable">
			<div class="title"><h3>可设置参数</h3></div>
			<ul>
				<li>
					<label>支付方式:</label>
					<el-select v-model="payType" placeholder="请选择" size="mini" style="width:90px">
						<el-option
							v-for="item in pageData.payList"
							:key="item.payType"
							:label="item.description"
							:value="item.payType">
						</el-option>
					</el-select>
				</li>
				<li></li>
				<li>
					<label>商户兑入手续费:</label>
					<span>{{inFee}} %</span>
					<el-button type="primary" plain size="mini" @click="showDialog('feeRateIn')">修改</el-button>
				</li>
				<!-- <li>
					<label>商户兑入方式:</label>
					<el-switch v-model="pageData.info.matchSwitch" :active-value="1" :inactive-value="0" @change="updateMerchantSwitch" style="margin-left: 10px;"></el-switch>
					<span style="margin-left: 15px;">
						<el-radio v-model="pageData.info.inType" :disabled="pageData.info.matchSwitch == 0" :label="1" @change="inTypeChange">派单</el-radio>
  						<el-radio v-model="pageData.info.inType" :disabled="pageData.info.matchSwitch == 0" :label="2" @change="inTypeChange">抢单</el-radio>
					</span>
				</li> -->
				<li>
					<label>商户兑出手续费:</label>
					<span>{{outFee}} %</span>
					<el-button type="primary" plain size="mini" @click="showDialog('feeRateIn')">修改</el-button>
				</li>
				<li v-if="payType == 0">
					<p>银行卡兑入手续费：{{Math.floor(pageData.feeList[1].inFee*10000)/100}} %</p>
					<p>支付宝兑入手续费：{{Math.floor(pageData.feeList[2].inFee*10000)/100}} %</p>
					<p>微信兑入手续费：{{Math.floor(pageData.feeList[3].inFee*10000)/100}} %</p>
				</li>
				<li v-if="payType == 0">
					<p>银行卡兑出手续费：{{Math.floor(pageData.feeList[1].outFee*10000)/100}} %</p>
					<p>支付宝兑出手续费：{{Math.floor(pageData.feeList[2].outFee*10000)/100}} %</p>
					<p>微信兑出手续费：{{Math.floor(pageData.feeList[3].outFee*10000)/100}} %</p>
				</li>
				<li>
					<label>商户兑出方式:</label>
					<span>
						<el-radio v-model="pageData.info.outType" :label="1" @change="outTypeChange">派单</el-radio>
  						<el-radio v-model="pageData.info.outType" :label="2" @change="outTypeChange">抢单</el-radio>
					</span>
				</li>
				<!-- <li>
					<label>直推人费率:</label>
					<span>兑入：{{pageData.info.firstRateIn}}% 　　 兑出：{{pageData.info.firstRateOut}}%</span>
					<el-button type="primary" plain size="mini" @click="showDialog('firstRate')">修改</el-button>
				</li>
				<li>
					<label>间推人费率:</label>
					<span>兑入：{{pageData.info.secRateIn}}% 　　 兑出：{{pageData.info.secRateOut}}%</span>
					<el-button type="primary" plain size="mini" @click="showDialog('secRate')">修改</el-button>
				</li> -->
				<li>
					<label>兑入额度范围（{{$variableCoin}}）:</label>
					<span>【{{merchantInMinAmount}}】 ~ 【{{merchantInMaxAmount}}】</span>
					<el-button type="primary" plain size="mini" @click="showDialog('duiRu')">修改</el-button>
				</li>
				<li>
					<label>兑出额度范围（{{$variableCoin}}）:</label>
					<span>【{{merchantOutMinAmount}}】 ~ 【{{merchantOutMaxAmount}}】</span>
					<el-button type="primary" plain size="mini" @click="showDialog('duiChu')">修改</el-button>
				</li>
				<li>
					<label>充币手续费:</label>
					<span>{{Math.floor(pageData.coinInfo.merchantRechargeRate*10000)/100}}<span> %</span></span>
					<el-button type="primary" plain size="mini" @click="showDialog('chongbi')">修改</el-button>
				</li>
				<!-- <li class="big">
					<label>代付兑出手续费比例 : 每单代付数量的</label>
					<el-input class="inputHasText" disabled placeholder="未设置默认1" :value="Math.floor(pageData.info.batchOutRatioFee*10000)/100"><template slot="append">%</template> </el-input>
					+ 每单固定<el-input class="inputHasText" disabled  placeholder="未设置默认1" v-model="pageData.info.batchOutFixedFee"><template slot="append">{{this.$variableCoin}}</template></el-input>
					<el-button type="primary" plain size="mini" @click="showDialog('daifu')">修改</el-button>
				</li> -->
			</ul>
		</div>
		<CheckStand :data="pageData"></CheckStand>
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%" >
			<el-form ref="form" :model="formData" label-width="120px">
				<el-form-item :label="label1" v-if="dialogType != 'chongbi'">
					<el-input type="number" v-model="formData.value1" oninput="value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')">
						<template slot="append" v-if="dialogType == 'feeRateIn' || dialogType == 'firstRate' || dialogType == 'secRate'|| dialogType == 'daifu'">%</template>
					</el-input>
				</el-form-item>
				
				<el-form-item :label="label2">
					<el-input type="number" v-if="dialogType == 'daifu'" v-model="formData.value2" oninput="value = value.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3')">
						<template slot="append" v-if="dialogType == 'daifu'">{{$variableCoin}}</template>
					</el-input>
					<el-input v-else-if="dialogType == 'chongbi'"  v-model="formData.value2">
						<template slot="append" v-if="dialogType == 'feeRateIn' || dialogType == 'firstRate' || dialogType == 'secRate' || dialogType == 'chongbi'">%</template>
					</el-input>
					<el-input v-else type="number" v-model="formData.value2" oninput="value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')">
						<template slot="append" v-if="dialogType == 'feeRateIn' || dialogType == 'firstRate' || dialogType == 'secRate' || dialogType == 'chongbi'">%</template>
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
import CheckStand from './components/checkStand'
import BigNumber from 'bignumber.js'
export default {
	data() { 
		return {
			radio: '1',
			coinName: this.$variableCoin,
			pageData: {
				coinInfo: {},
				info: {},
				payList: [],
				feeList: []
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
			payType: -1,
			merchantInMaxAmount: '',
			merchantInMinAmount: '',
			merchantOutMaxAmount: '',
			merchantOutMinAmount: ''
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
				let inFee = ''
				let outFee = ''
				let merchantInMaxAmount = ''
				let	merchantInMinAmount = ''
				let	merchantOutMaxAmount = ''
				let	merchantOutMinAmount = ''
				if (this.pageData.feeList[0].inFee == this.pageData.feeList[1].inFee &&  this.pageData.feeList[1].inFee == this.pageData.feeList[2].inFee) {
					inFee = this.pageData.feeList[0].inFee
				}
				if (this.pageData.feeList[0].outFee == this.pageData.feeList[1].outFee && this.pageData.feeList[1].outFee  == this.pageData.feeList[2].outFee) {
					outFee = this.pageData.feeList[0].outFee
				}
				if(this.payType == -1) {
					this.payType = this.pageData.feeList[0].payType
				}
				this.pageData.feeList.unshift({
					payType:0,
					inFee:inFee,
					outFee:outFee,
					merchantInMaxAmount,
					merchantInMinAmount,
					merchantOutMaxAmount,
					merchantOutMinAmount
				})
				this.pageData.payList.unshift({
					payType: 0,
					description:'全部'
				})
				this.changeValue()
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
				this.formData.value1 = this.merchantInMinAmount
				this.formData.value2 = this.merchantInMaxAmount
			}else if(this.dialogType == 'duiChu') {
				this.dialogTitle = '修改兑出费率'
				this.label1 = '最小兑出额度：'
				this.label2 = '最大兑出额度：'
				this.formData.value1 = this.merchantOutMinAmount
				this.formData.value2 = this.merchantOutMaxAmount
			}else if(this.dialogType == 'feeRateIn') {
				this.dialogTitle = '修改商户手续费【' + this.payTypeName + '】'
				this.label1 = '商户兑入手续费:'
				this.label2 = '商户兑出手续费:'
				this.formData.value1 = this.inFee
				this.formData.value2 = this.outFee
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
			}else if(this.dialogType == 'daifu'){
				this.dialogTitle = '修改代付兑出手续费比例'
				this.label1 = '每单代付费率'
				this.label2 = '每单固定金额'
				this.formData.value1 = Math.floor(this.pageData.info.batchOutRatioFee*10000)/100
				this.formData.value2 = this.pageData.info.batchOutFixedFee
			}else if (this.dialogType == 'chongbi'){
				this.dialogTitle = '修改充币手续费：'
				this.label2 = '充币手续费'
				this.formData.value1 = ''
				this.formData.value2 = Math.floor(this.pageData.coinInfo.merchantRechargeRate*10000)/100
			}
			this.dialogVisible = true
		},
		//修改兑入兑出额度  
		updateMerchantCoinConfig(type) {
			this.$http.post('/wallet/backmgr/merchant/updateMerchantCoinConfig', {
				payType: this.payType,
				coinName: this.coinName,
				type: type,   //1、兑入；2、兑出；
				userId: this.$route.query.id,
				value1: this.formData.value1,   //最小兑入额
				value2: this.formData.value2,   //最大兑入额
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
		//1、修改商户手续费率；修改兑入兑出额度  
		updateMerchantFee(type) {
			if (this.dialogType == "feeRateIn" || this.dialogType == "duiRu" || this.dialogType == "duiChu") {
				let value1 = this.formData.value1
				let value2 = this.formData.value2
				if(this.dialogType == "feeRateIn") {
					value1 = this.formData.value1?(this.formData.value1 / 100).toFixed(4):-0.01
					value2 = this.formData.value2?(this.formData.value2 / 100).toFixed(4):-0.01
				}
				this.$http.post('/wallet/backmgr/merchant/updateMerchantFee', {
					coinName: this.coinName,
					payType: this.payType,
					type: type,   //1、兑入；2、兑入额度；3.兑出额度
					userId: this.$route.query.id,
					value1,
					value2
				}).then(res => {
					this.formData.value1 = ""
					this.formData.value2 = ""
					this.$notify.success({
						title: '提示',
						message: res.msg
					})	
					this.getDetails()
				})
			}
			
		},
		dialogEnter() {
			this.dialogVisible = false
			if(this.dialogType == 'duiRu') {
				this.updateMerchantFee(2)
			}else if(this.dialogType == 'duiChu') {
				this.updateMerchantFee(3)
			}else if(this.dialogType == 'feeRateIn') {
				this.updateMerchantFee(1)
			}else if(this.dialogType == 'firstRate') {
				this.updateMerchantInfo(2)
			}else if(this.dialogType == 'secRate') {
				this.updateMerchantInfo(3)
			}else if(this.dialogType == 'daifu'){
				this.updateBatchOutFee()
			}else if(this.dialogType == "chongbi") {
				this.updateRechargeFee()
			}
		},
		
		updateBatchOutFee(){
			this.$http.post('/wallet/backmgr/merchant/updateBatchOutFee', {
				batchOutRatioFee: Math.floor(this.formData.value1)/100,
				userId: this.pageData.info.userId,
				batchOutFixedFee: this.formData.value2
			}).then(res => {
				this.$notify.success({
					title: '提示',
					message: res.msg
				})	
				this.getDetails()
			})
		},
		// 修改商户兑入兑出开关
		updateMerchantSwitch(val) {
			this.$http.post('/wallet/backmgr/merchant/updateMerchantSwitch', {
				matchSwitch: val,
				userId: this.pageData.info.userId
			}).then(res => {
				this.$notify.success({
					title: '提示',
					message: res.msg
				})	
				this.getDetails()
			})
		},
		//修改充币手续费
		updateRechargeFee(){
			this.$http.post('/wallet/backmgr/merchant/updateMerchantCoinConfig', {
				coinName: this.coinName,
				userId: this.$route.query.id,
				type:1,      // 无实际意义，必填参数，随便填兑入或者兑出
				merchantRechargeRate:Math.floor(this.formData.value2*1000)/100000
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
		changeValue() {
			this.pageData.feeList.forEach((val, idx) => {
				if(val.payType == this.payType) {
					this.merchantInMaxAmount = val.merchantInMaxAmount
					this.merchantInMinAmount = val.merchantInMinAmount
					this.merchantOutMaxAmount = val.merchantOutMaxAmount
					this.merchantOutMinAmount = val.merchantOutMinAmount
				}
			})
		}
	},
	watch: {
		payType() {
			this.changeValue()
		}
	},
	computed: {
		inFee() {
			let inFee = 0
			this.pageData.feeList.forEach((val, idx) => {
				if(val.payType == this.payType) {
					inFee = val.inFee
					return
				}
			})
			return inFee?Math.floor(inFee*10000)/100:inFee
		},
		outFee() {
			let outFee = 0
			this.pageData.feeList.forEach((val, idx) => {
				if(val.payType == this.payType) {
					outFee = val.outFee
					return
				}
			})
			return outFee?Math.floor(outFee*10000)/100:outFee
		},
		payTypeName() {
			let payTypeName = ""
			this.pageData.payList.forEach((val, idx) => {
				if(val.payType == this.payType) {
					payTypeName = val.description
					return
				}
			})
			return payTypeName
		}
	},
	components:{
		CheckStand
	}
}
</script>

<style lang="less" scoped>
.details{
	overflow:auto;
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
				&.big{
					width: 100%;
				}
			}
		}
	}
	.setCheckstand {
		.el-form {
			flex-wrap: wrap;
			box-shadow: 0 0 2px #999;
			padding: 10px;
			/deep/ .el-form-item  {
					display: flex;
					.el-form-item__content {
							flex:1;
							display: flex;
							align-items: center;
							.radioBox {
									display: flex;
									flex-direction: column;
									align-items: center;
									margin-right:30px;
									img {
											margin-bottom:10px;
									}
							}
					}
			}
		}
	}
	/deep/.inputHasText{
		width: 140px;
		height: 28px;
		.el-input__inner{
			height: 28px;
			padding: 0 5px;
			text-align: center;
		}
		.el-input-group__append{
			padding: 0 5px;
		}
	}
}
</style>