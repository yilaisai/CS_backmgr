<template>
	<div class="init-settings">
		<div class="current">
			<div class="title">
				<h3>当前参数</h3>
				<div class="select-wrap">
					<label>币种：</label>
					<el-select v-model="coinName" placeholder="请选择" size="small">
						<el-option label="USDT" value="USDT"></el-option>
					</el-select>
				</div>
			</div>
			<ul v-if="tabs == 1">
				<li><label>{{coinName}}当前市价:</label><span>{{form.toRMBPrice}}</span></li>
				<li v-if="form.MERCHANT_RATE_TYPE == 1"><label>{{coinName}}当前兑入价格:</label><span>{{Math.floor((BigNumber(form.huobi.in*1).plus(form.MERCHANT_IN_PRICE_FLOAT*1 ))* 1000) / 1000}}</span></li>
				<li v-else-if="form.MERCHANT_RATE_TYPE == 3"><label>{{coinName}}当前兑入价格:</label><span>{{Math.floor((BigNumber(form.bian.in*1).plus(form.MERCHANT_IN_PRICE_FLOAT*1 ))* 1000) / 1000}}</span></li>
				<li v-else-if="form.MERCHANT_RATE_TYPE == 4"><label>{{coinName}}当前兑入价格:</label><span>{{Math.floor((BigNumber(form.okex.in*1).plus(form.MERCHANT_IN_PRICE_FLOAT*1 ))* 1000) / 1000}}</span></li>
				<li v-else><label>{{coinName}}当前兑入价格:</label><span>{{Math.floor(form.MERCHANT_IN_PRICE*1000)/1000}}</span></li>
				<li v-if="form.MERCHANT_RATE_TYPE == 1"><label>{{coinName}}当前兑出价格:</label><span>{{Math.floor((BigNumber(form.huobi.out*1).plus(form.MERCHANT_OUT_PRICE_FLOAT*1)) * 1000) / 1000}}</span></li>
				<li v-else-if="form.MERCHANT_RATE_TYPE == 3"><label>{{coinName}}当前兑出价格:</label><span>{{Math.floor((BigNumber(form.bian.out*1).plus(form.MERCHANT_OUT_PRICE_FLOAT*1)) * 1000) / 1000}}</span></li>
				<li v-else-if="form.MERCHANT_RATE_TYPE == 4"><label>{{coinName}}当前兑出价格:</label><span>{{Math.floor((BigNumber(form.okex.out*1).plus(form.MERCHANT_OUT_PRICE_FLOAT*1)) * 1000) / 1000}}</span></li>
				<li v-else><label>{{coinName}}当前兑出价格:</label><span>{{Math.floor(form.MERCHANT_OUT_PRICE*1000)/1000}}</span></li>
			</ul>
			<ul v-else>
				<li><label>{{coinName}}当前市价:</label><span>{{form.toRMBPrice}}</span></li>
				<li v-if="form.SET_TIME_RATE_TYPE == 1"><label>{{coinName}}当前兑入价格:</label><span>{{Math.floor((BigNumber(form.huobi.in*1).plus(form.SET_TIME_IN_PRICE_FLOAT*1 ))* 1000) / 1000}}</span></li>
				<li v-else-if="form.SET_TIME_RATE_TYPE == 3"><label>{{coinName}}当前兑入价格:</label><span>{{Math.floor((BigNumber(form.bian.in*1).plus(form.SET_TIME_IN_PRICE_FLOAT*1 ))* 1000) / 1000}}</span></li>
				<li v-else-if="form.SET_TIME_RATE_TYPE == 4"><label>{{coinName}}当前兑入价格:</label><span>{{Math.floor((BigNumber(form.okex.in*1).plus(form.SET_TIME_IN_PRICE_FLOAT*1 ))* 1000) / 1000}}</span></li>
				<li v-else><label>{{coinName}}当前兑入价格:</label><span>{{Math.floor(form.SET_TIME_IN_PRICE*1000)/1000}}</span></li>
				<li v-if="form.SET_TIME_RATE_TYPE == 1"><label>{{coinName}}当前兑出价格:</label><span>{{Math.floor((BigNumber(form.huobi.out*1).plus(form.SET_TIME_OUT_PRICE_FLOAT*1)) * 1000) / 1000}}</span></li>
				<li v-else-if="form.SET_TIME_RATE_TYPE == 3"><label>{{coinName}}当前兑出价格:</label><span>{{Math.floor((BigNumber(form.bian.out*1).plus(form.SET_TIME_OUT_PRICE_FLOAT*1)) * 1000) / 1000}}</span></li>
				<li v-else-if="form.SET_TIME_RATE_TYPE == 4"><label>{{coinName}}当前兑出价格:</label><span>{{Math.floor((BigNumber(form.okex.out*1).plus(form.SET_TIME_OUT_PRICE_FLOAT*1)) * 1000) / 1000}}</span></li>
				<li v-else><label>{{coinName}}当前兑出价格:</label><span>{{Math.floor(form.SET_TIME_OUT_PRICE*1000)/1000}}</span></li>
			</ul>
		</div>
		<div class="content-wrap">
			<h3>商户设置</h3>
			<el-tabs  v-model="tabs" type="border-card">
				<el-tab-pane label="兑入兑出价格设置" name="1">
					<el-form ref="form" :model="form" label-width="100px" size="small">
						<el-form-item label="类型：" v-if="form.huobi">
							<el-radio-group v-model="form.MERCHANT_RATE_TYPE">
								<el-radio label="1">
									<span>火币</span>
									<span>兑入价格：{{form.huobi.in}}</span>
									<span>兑出价格：{{form.huobi.out}}</span>
								</el-radio>
								<br/>
								<el-radio label="4">
									<span>OKEX</span>
									<span>兑入价格：{{form.okex.in}}</span>
									<span>兑出价格：{{form.okex.out}}</span>
								</el-radio>
								<br/>
								<el-radio label="3">
									<span>币安</span>
									<span>兑入价格：{{form.bian.in}}</span>
									<span>兑出价格：{{form.bian.out}}</span>
								</el-radio>
								<br/>
								<el-radio label="2">
									<span>手动</span>
								</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="货币：">
							<el-input v-model.trim="form.MERCHANT_COIN_NAME" :disabled="true" style="width:100px"></el-input>
						</el-form-item>
						<el-form-item label="兑入价格：" v-if="form.MERCHANT_RATE_TYPE == 1">
							<el-input v-model.trim="form.huobi.in" style="width:100px" :disabled="true"></el-input>　+　<el-input v-model.trim="form.MERCHANT_IN_PRICE_FLOAT" placeholder="输入倍数（如0.9）" oninput="value = value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/,'$1$2.$3')"></el-input>
						</el-form-item>
						<el-form-item label="兑入价格：" v-else-if="form.MERCHANT_RATE_TYPE == 3">
							<el-input v-model.trim="form.bian.in" style="width:100px" :disabled="true"></el-input>　+　<el-input v-model.trim="form.MERCHANT_IN_PRICE_FLOAT" placeholder="输入倍数（如0.9）" oninput="value = value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/,'$1$2.$3')"></el-input>
						</el-form-item>
						<el-form-item label="兑入价格：" v-else-if="form.MERCHANT_RATE_TYPE == 4">
							<el-input v-model.trim="form.okex.in" style="width:100px" :disabled="true"></el-input>　+　<el-input v-model.trim="form.MERCHANT_IN_PRICE_FLOAT" placeholder="输入倍数（如0.9）" oninput="value = value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/,'$1$2.$3')"></el-input>
						</el-form-item>
						<el-form-item label="兑入价格：" v-else>
							<el-input v-model.trim="form.MERCHANT_IN_PRICE" oninput="value = value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/,'$1$2.$3')"></el-input>
						</el-form-item>
						<el-form-item label="兑出价格：" v-if="form.MERCHANT_RATE_TYPE == 1">
							<el-input v-model.trim="form.huobi.out" style="width:100px" :disabled="true"></el-input>　+　<el-input v-model.trim="form.MERCHANT_OUT_PRICE_FLOAT" placeholder="输入倍数（如1.1）" oninput="value = value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/,'$1$2.$3')"></el-input>
						</el-form-item>
						<el-form-item label="兑出价格：" v-else-if="form.MERCHANT_RATE_TYPE == 3">
							<el-input v-model.trim="form.bian.out" style="width:100px" :disabled="true"></el-input>　+　<el-input v-model.trim="form.MERCHANT_OUT_PRICE_FLOAT" placeholder="输入倍数（如1.1）" oninput="value = value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/,'$1$2.$3')"></el-input>
						</el-form-item>
						<el-form-item label="兑出价格：" v-else-if="form.MERCHANT_RATE_TYPE == 4">
							<el-input v-model.trim="form.okex.out" style="width:100px" :disabled="true"></el-input>　+　<el-input v-model.trim="form.MERCHANT_OUT_PRICE_FLOAT" placeholder="输入倍数（如1.1）" oninput="value = value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/,'$1$2.$3')"></el-input>
						</el-form-item>
						<el-form-item label="兑出价格：" v-else>
							<el-input v-model.trim="form.MERCHANT_OUT_PRICE" oninput="value = value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/,'$1$2.$3')"></el-input>
						</el-form-item>
					</el-form>
					<p class="tips">提示：价格默认使用系统设置的价格，开启手动设置的价格，则自动关闭系统价格，关闭手动设置的价格，则自动开启系统价格。</p>
				</el-tab-pane>
				<el-tab-pane label="特殊时段兑入兑出价格设置" name="2">
					<el-form ref="form" :model="form" label-width="100px" size="small">
						<el-form-item label="开关：">
							<el-radio v-model="form.SET_TIME_ENABLE" label="1">开启</el-radio>
  						<el-radio v-model="form.SET_TIME_ENABLE" label="0">关闭</el-radio>
						</el-form-item>
						<el-form-item label="类型：" v-if="form.huobi">
							<el-radio-group v-model="form.SET_TIME_RATE_TYPE">
								<el-radio label="1">
									<span>火币</span>
									<span>兑入价格：{{form.huobi.in}}</span>
									<span>兑出价格：{{form.huobi.out}}</span>
								</el-radio>
								<br/>
								<el-radio label="4">
									<span>OKEX</span>
									<span>兑入价格：{{form.okex.in}}</span>
									<span>兑出价格：{{form.okex.out}}</span>
								</el-radio>
								<br/>
								<el-radio label="3">
									<span>币安</span>
									<span>兑入价格：{{form.bian.in}}</span>
									<span>兑出价格：{{form.bian.out}}</span>
								</el-radio>
								<br/>
								<el-radio label="2">
									<span>手动</span>
								</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="货币：">
							<el-input v-model.trim="form.MERCHANT_COIN_NAME" :disabled="true" style="width:100px"></el-input>
						</el-form-item>
						<el-form-item label="兑入价格：" v-if="form.SET_TIME_RATE_TYPE == 1">
							<el-input v-model.trim="form.huobi.in" style="width:100px" :disabled="true"></el-input>　+　<el-input v-model.trim="form.SET_TIME_IN_PRICE_FLOAT" placeholder="输入倍数（如0.9）" oninput="value = value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/,'$1$2.$3')"></el-input>
						</el-form-item>
						<el-form-item label="兑入价格：" v-else-if="form.SET_TIME_RATE_TYPE == 3">
							<el-input v-model.trim="form.bian.in" style="width:100px" :disabled="true"></el-input>　+　<el-input v-model.trim="form.SET_TIME_IN_PRICE_FLOAT" placeholder="输入倍数（如0.9）" oninput="value = value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/,'$1$2.$3')"></el-input>
						</el-form-item>
						<el-form-item label="兑入价格：" v-else-if="form.SET_TIME_RATE_TYPE == 4">
							<el-input v-model.trim="form.okex.in" style="width:100px" :disabled="true"></el-input>　+　<el-input v-model.trim="form.SET_TIME_IN_PRICE_FLOAT" placeholder="输入倍数（如0.9）" oninput="value = value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/,'$1$2.$3')"></el-input>
						</el-form-item>
						<el-form-item label="兑入价格：" v-else>
							<el-input v-model.trim="form.SET_TIME_IN_PRICE" oninput="value = value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/,'$1$2.$3')"></el-input>
						</el-form-item>
						<el-form-item label="兑出价格：" v-if="form.SET_TIME_RATE_TYPE == 1">
							<el-input v-model.trim="form.huobi.out" style="width:100px" :disabled="true"></el-input>　+　<el-input v-model.trim="form.SET_TIME_OUT_PRICE_FLOAT" placeholder="输入倍数（如1.1）" oninput="value = value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/,'$1$2.$3')"></el-input>
						</el-form-item>
						<el-form-item label="兑出价格：" v-else-if="form.SET_TIME_RATE_TYPE == 3">
							<el-input v-model.trim="form.bian.out" style="width:100px" :disabled="true"></el-input>　+　<el-input v-model.trim="form.SET_TIME_OUT_PRICE_FLOAT" placeholder="输入倍数（如1.1）" oninput="value = value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/,'$1$2.$3')"></el-input>
						</el-form-item>
						<el-form-item label="兑出价格：" v-else-if="form.SET_TIME_RATE_TYPE == 4">
							<el-input v-model.trim="form.okex.out" style="width:100px" :disabled="true"></el-input>　+　<el-input v-model.trim="form.SET_TIME_OUT_PRICE_FLOAT" placeholder="输入倍数（如1.1）" oninput="value = value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/,'$1$2.$3')"></el-input>
						</el-form-item>
						<el-form-item label="兑出价格：" v-else>
							<el-input v-model.trim="form.SET_TIME_OUT_PRICE" oninput="value = value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/,'$1$2.$3')"></el-input>
						</el-form-item>
						<el-form-item label="启用时间段：">
							<el-time-select
								placeholder="起始时间"
								v-model="startTime"
								@change="confirmStartTime"
								:picker-options="{
									start: '00:00',
									step: '00:30',
									end: '24:00'
								}">
							</el-time-select>
							&nbsp;-&nbsp;
							<el-time-select
								placeholder="结束时间"
								v-model="endTime"
								:picker-options="{
									start: '00:00',
									step: '00:30',
									end: '24:00'
								}">
							</el-time-select>
						</el-form-item>
					</el-form>
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
							<el-input type="number" v-model.trim="inFee" @input="inFee = inFee.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')" >
								<template slot="append">%</template>
							</el-input>
						</el-form-item>
						<el-form-item label="商户兑出手续费比例：">
							<el-input type="number" v-model.trim="outFee" @input="outFee = outFee.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')" >
								<template slot="append">%</template>
							</el-input>
						</el-form-item>
						<br />
						<el-form-item v-if="payType === 0" class="payList">
							<div>
								<div><span>银行卡兑入手续费：</span>{{$fmtNumber('%2', form.otcPayLists[1].inFee)}} %</div>
								<div><span>支付宝兑入手续费：</span>{{$fmtNumber('%2', form.otcPayLists[2].inFee)}} %</div>
								<div><span>微信兑入手续费：</span>{{$fmtNumber('%2', form.otcPayLists[3].inFee)}}%</div>
							</div>
							<div>
								<div><span>银行卡兑出手续费： </span>{{$fmtNumber('%2', form.otcPayLists[1].outFee)}}%</div>
								<div><span>支付宝兑出手续费：</span>{{$fmtNumber('%2', form.otcPayLists[2].outFee)}}%</div>
								<div><span>微信兑出手续费：</span> {{$fmtNumber('%2', form.otcPayLists[3].outFee)}}%</div>
							</div>
						</el-form-item>
						<br />
						<el-form-item label="商户最小兑入额度：">
							<el-input type="number" v-model.trim="form.MERCHANT_MIN_IN_AMOUNT"></el-input>
						</el-form-item>
						<el-form-item label="商户最大兑入额度：">
							<el-input type="number" v-model.trim="form.MERCHANT_MAX_IN_AMOUNT"></el-input>
						</el-form-item>
						<br />
						<el-form-item label="商户最小兑出额度：">
							<el-input type="number" v-model.trim="form.MERCHANT_MIN_OUT_AMOUNT"></el-input>
						</el-form-item>
						<el-form-item label="商户最大兑出额度：">
							<el-input type="number" v-model.trim="form.MERCHANT_MAX_OUT_AMOUNT"></el-input>
						</el-form-item>
						<br />
						<el-form-item label="商户充币手续费：">
							<el-input v-model.trim="form.MERCHANT_RECHARGE_RATE" @input="form.MERCHANT_RECHARGE_RATE = form.MERCHANT_RECHARGE_RATE.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')">
								<template slot="append">%</template>
							</el-input>
						</el-form-item>
					</el-form>
					<p class="tips">提示：商户默认该参数，可在商户查询模块单独配置该参数。初始化设置修改后只对新增商户生效。</p>
				</el-tab-pane>
			</el-tabs>
			<el-tabs type="border-card">
				<el-tab-pane label="全局设置">
					<el-form ref="form" :model="form" label-width="170px" size="small">
						<el-form-item v-if=" coinName == 'USDT' " label="omni提币手续费:">
							<el-input type="number" v-model.trim="form.MERCHANT_WITHDRAW_RATE_OMNI"></el-input>
						</el-form-item>
						<el-form-item v-if=" coinName == 'USDT' " label="Erc20提币手续费:">
							<el-input type="number" v-model.trim="form.MERCHANT_WITHDRAW_RATE_ERC20"></el-input>
						</el-form-item>
						<el-form-item v-if=" coinName == 'USDT' " label="Trc20提币手续费:">
							<el-input type="number" v-model.trim="form.MERCHANT_WITHDRAW_RATE_TRC20"></el-input>
						</el-form-item>
						<el-form-item v-else label="提币手续费：">
							<el-input type="number" v-model.trim="form.MERCHANT_WITHDRAW_RATE"></el-input>
						</el-form-item>
						<el-form-item label="转账手续费：">
							<el-input type="number" v-model.trim="form.MERCHANT_TRADE_RATE"></el-input>
						</el-form-item>
						<el-form-item class="bold" label="商户兑入方式：">
							<span style="margin-left: 15px;">
								<el-radio v-model="inSwitch"   label="1"  @change="modifyInSwitch">派单</el-radio>
								<el-radio v-model="inSwitch" label="2"  @change="modifyInSwitch">抢单</el-radio>
							</span>
						</el-form-item>
						<el-form-item label="抢单转派单时间：">
							<el-input v-model="rushWaitTime" placeholder="请输入时间" @blur = "modifyInSwitch " >
								<template slot="append">S</template>
							</el-input>
						</el-form-item>
						<el-form-item label="商户批量兑出最大笔数：">
							<el-input v-model="form.CASHOUT_NUM" placeholder="请输入兑出最大笔数" >
							</el-input>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
			<!-- <el-tabs type="border-card">
				<el-tab-pane label="代付设置">
					<div class="big">
						<label>商户代付兑出手续费比例 : 每单代付数量的</label>
						<el-input class="inputHasText" @input="batchOutRatioFeeInput"  placeholder="未设置默认1" v-model="form.BATCHOUT_RATIO_FEE"><template slot="append">%</template> </el-input>
						+ 每单固定<el-input class="inputHasText" oninput="value = value.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3')"   placeholder="未设置默认1" v-model="form.BATCHOUT_FIXED_FEE"><template slot="append">{{this.$variableCoin}}</template></el-input>
						
						<p>注：新注册的商户按此配置，后期可对商户单独设置，设置过的商户修改此配置不生效。</p>
					</div>
				</el-tab-pane>
			</el-tabs> -->
			<el-button type="primary" class="save" @click="open">保存修改</el-button>
		</div>
		<el-dialog title="修改代付兑出手续费比例" :visible.sync="dialogVisible" width="40%" >
			<el-form ref="form"  label-width="120px">
				<el-form-item label="每单代付费率">
					<el-input type="number" v-model="formData.value1" oninput="value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')">
						<template slot="append" >%</template>
					</el-input>
				</el-form-item>
				
				<el-form-item label="每单固定金额">
					<el-input type="number"  v-model="formData.value2" oninput="value = value.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3')">
						<template slot="append" >{{coinName}}</template>
					</el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false" size="mini">取 消</el-button>
				<el-button type="primary" size="mini" @click="updateBatchOutFee">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import {mapState} from 'vuex'
import BigNumber from 'bignumber.js'
export default {
	data() { 
		return {
			form: {
				otcPayLists: [],
			},
			dialogVisible:false,
			inFee: 0,
			outFee: 0,
			
			coinName: this.$variableCoin,
			payType: "",
			inSwitch:'1',
			rushWaitTime:'',
			formData:{
				value1: '',
				value2: '',
			},
			tabs:"1",
			startTime:'',
			endTime:'',
			feeType:1
		}
	},
	activated() {
		this.getData()
		this.getInSwitch()
	},
	methods: {
		confirmStartTime(){
			console.log(this.form.startTime)
		},
		getData() {
			this.$http.post('/wallet/backmgr/merchant/trade/config', {
				coinName: this.coinName
			}).then(res => {
				this.form = res.result
				this.form.BATCHOUT_RATIO_FEE = Math.floor(this.form.BATCHOUT_RATIO_FEE*10000)/100
				this.form.MERCHANT_RECHARGE_RATE = Math.floor(this.form.MERCHANT_RECHARGE_RATE*10000)/100
				this.startTime = this.form.SET_TIME_PRICE.split('-')[0]
				this.endTime = this.form.SET_TIME_PRICE.split('-')[1]
				let inFee = ''
				let outFee = ''
				let merchantInMinAmount = ''
				let merchantInMaxAmount = ''
				let merchantOutMinAmount = ''
				let merchantOutMaxAmount = ''
				if (this.form.otcPayLists[0].inFee == this.form.otcPayLists[1].inFee &&  this.form.otcPayLists[1].inFee == this.form.otcPayLists[2].inFee) {
					inFee = this.form.otcPayLists[0].inFee
				}
				if (this.form.otcPayLists[0].outFee == this.form.otcPayLists[1].outFee && this.form.otcPayLists[1].outFee  == this.form.otcPayLists[2].outFee) {
					outFee = this.form.otcPayLists[0].outFee
				}
				if (this.form.otcPayLists[0].merchantInMinAmount == this.form.otcPayLists[1].merchantInMinAmount && this.form.otcPayLists[1].merchantInMinAmount  == this.form.otcPayLists[2].merchantInMinAmount) {
					merchantInMinAmount = this.form.otcPayLists[0].merchantInMinAmount
				}
				if (this.form.otcPayLists[0].merchantInMaxAmount == this.form.otcPayLists[1].merchantInMaxAmount && this.form.otcPayLists[1].merchantInMaxAmount  == this.form.otcPayLists[2].merchantInMaxAmount) {
					merchantInMaxAmount = this.form.otcPayLists[0].merchantInMaxAmount
				}
				if (this.form.otcPayLists[0].merchantOutMinAmount == this.form.otcPayLists[1].merchantOutMinAmount && this.form.otcPayLists[1].merchantOutMinAmount  == this.form.otcPayLists[2].merchantOutMinAmount) {
					merchantOutMinAmount = this.form.otcPayLists[0].merchantOutMinAmount
				}
				if (this.form.otcPayLists[0].merchantOutMaxAmount == this.form.otcPayLists[1].merchantOutMaxAmount && this.form.otcPayLists[1].merchantOutMaxAmount  == this.form.otcPayLists[2].merchantOutMaxAmount) {
					merchantOutMaxAmount = this.form.otcPayLists[0].merchantOutMaxAmount
				}
				this.form.otcPayLists.unshift({
					payType:0,
					inFee:inFee,
					outFee:outFee,
					merchantInMinAmount,
					merchantInMaxAmount,
					merchantOutMinAmount,
					merchantOutMaxAmount,
					description:'全部'
				})
				if(this.form.otcPayLists.length > 0) {
					this.payType = this.form.otcPayLists[1].payType
				}
				this.payTypeChange()
			})
		},
		updateBatchOutFee(){
			this.$http.post('/wallet/backmgr/merchant/updateBatchOutFee', {
				batchOutRatioFee: Math.floor(this.formData.value1)/100,
				batchOutFixedFee: this.formData.value2
			}).then(res => {
				this.$notify.success({
					title: '提示',
					message: res.msg
				})	
				this.getDetails()
			})
		},
		modifyInSwitch(){
			this.$http.post('/wallet/app/otc/backmgr/modifyInSwitch', {
				inSwitch:this.inSwitch,
				rushWaitTime:this.rushWaitTime
			}).then(res => {
				if(res.code == 200){
					this.getInSwitch()
				}
			})
		},
		getInSwitch(){
			this.$http.post('/wallet/app/otc/backmgr/getInSwitch', {}).then(res => {
				if(res.code == 200){
					this.inSwitch = res.result.inSwitch+''
					this.rushWaitTime = res.result.rushWaitTime
				}
			})
		},
		open() {
			if (!this.inFee && !this.outFee) {
				this.$notify.warning({
					title:'提示',
					message:'兑入手续费与兑出手续费不能同时为空！'
				})
				return
			}
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
		batchOutRatioFeeInput(){
			this.form.BATCHOUT_RATIO_FEE =  this.form.BATCHOUT_RATIO_FEE.replace(/[^\d]/g,"") 
		},
		// 显示对话框
		showDialog(type) {
			this.dialogTitle = ''
			this.formData.value1 = this.form.BATCHOUT_RATIO_FEE
			this.formData.value2 = this.form.BATCHOUT_FIXED_FEE
			this.dialogVisible = true
			
		},
		save(ggCode) {
			if(ggCode.trim() == '') {
				this.$message({
					type: 'info',
					message: '谷歌验证码不能为空'
				}) 
				return
			}
			if(this.form.SET_TIME_ENABLE == 0){
				if(!this.startTime || !this.endTime) {
					this.startTime = "00:00"
					this.endTime = "00:00"
				}
			} else {
				if(!this.startTime || !this.endTime) {
					this.$message({
						type:'warning',
						message:'启用时间段格式不准确！'
					})
					return
				}
			}
			this.form.secret = ggCode
			this.form.inFee = this.inFee?(this.inFee / 100).toFixed(4):-1
			this.form.outFee = this.outFee?(this.outFee / 100).toFixed(4):-1
			this.form.payType = this.payType
			this.form.BATCHOUT_RATIO_FEE = Math.floor(this.form.BATCHOUT_RATIO_FEE)/100
			this.form.MERCHANT_RECHARGE_RATE = Math.floor(this.form.MERCHANT_RECHARGE_RATE*100)/10000
			this.form.SET_TIME_PRICE = this.startTime+'-'+this.endTime
			console.log(this.form.SET_TIME_PRICE)
			this.$http.post('/wallet/backmgr/merchant/trade/updateConfig', this.form).then(res => {
				this.$notify.success({
					title: '提示',
					message: res.msg
				})
				this.getData()
			})
		},
		BigNumber(val) {
			return BigNumber(val)
		},
		payTypeChange() {
			this.form.otcPayLists.forEach((val, idx) => {
				if(val.payType == this.payType) {
					this.inFee = val.inFee?Math.floor(val.inFee*10000) / 100 :val.inFee
					this.outFee = val.outFee?Math.floor(val.outFee*10000) / 100:val.outFee
					this.form.MERCHANT_MIN_IN_AMOUNT = val.merchantInMinAmount
					this.form.MERCHANT_MAX_IN_AMOUNT = val.merchantInMaxAmount
					this.form.MERCHANT_MIN_OUT_AMOUNT = val.merchantOutMinAmount
					this.form.MERCHANT_MAX_OUT_AMOUNT = val.merchantOutMaxAmount
				}
			})
		}
	},
	watch: {
		coinName() {
			this.getData()
		},
		payType(newVal, oldVal) {
			this.payTypeChange()
		}
	},computed:{
		...mapState(['coinInfo'])
	}
}
</script>

<style lang="less" scoped>
.init-settings{
	overflow-y: auto;
	h3 {
		margin: 0;
		font-size: 16px;
	}
	.current {
		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
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
	.content-wrap {
		h3 {
			margin: 10px 0;
		}
		/deep/ .el-radio-group {
			.el-radio {
				height:32px;
				line-height: 32px;
				margin-bottom:15px;
				.el-radio__label {
					span {
						margin-right:20px;
						&:first-of-type {
							display: inline-block;
							width:50px;
						}
					}
				}
			}
		}
	}
	.el-input {
		width: auto;
	}
	.el-tabs {
		margin-bottom: 20px;
		.payList {
			display: block;
			/deep/ .el-form-item__content {
				width:auto;
				display: flex;
				>div {
					width:355px;
					margin-right:15px;
					span {
						display: inline-block;
						width:155px;
						padding-right:15px;
						text-align: right;
						box-sizing: border-box;
					}
				}
			}
		}
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
	.big>p{
		color: red;
	}
	/deep/.bold{
		.el-form-item__label{
			font-weight: 600;
		}
	}
	.flex {
		/deep/ .el-radio-group {
			.el-radio {
				margin-bottom:0;
			}
		}
	}
}
</style>