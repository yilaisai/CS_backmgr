webpackJsonp([76],{"4jJs":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o("4YfN"),i=o.n(a),l=o("48sp"),r=o("bBkB"),s=o.n(r),n={data:function(){return{form:{otcPayLists:[]},dialogVisible:!1,inFee:0,outFee:0,coinName:this.$variableCoin,payType:"",inSwitch:"1",rushWaitTime:"",formData:{value1:"",value2:""}}},activated:function(){this.getData(),this.getInSwitch()},methods:{getData:function(){var t=this;this.$http.post("/wallet/backmgr/merchant/trade/config",{coinName:this.coinName}).then(function(e){t.form=e.result,t.form.BATCHOUT_RATIO_FEE=Math.floor(1e4*t.form.BATCHOUT_RATIO_FEE)/100,t.form.MERCHANT_RECHARGE_RATE=Math.floor(1e4*t.form.MERCHANT_RECHARGE_RATE)/100;var o="",a="";t.form.otcPayLists[0].inFee==t.form.otcPayLists[1].inFee&&t.form.otcPayLists[1].inFee==t.form.otcPayLists[2].inFee&&(o=t.form.otcPayLists[0].inFee),t.form.otcPayLists[0].outFee==t.form.otcPayLists[1].outFee&&t.form.otcPayLists[1].outFee==t.form.otcPayLists[2].outFee&&(a=t.form.otcPayLists[0].outFee),t.form.otcPayLists.unshift({payType:0,inFee:o,outFee:a,description:"全部"}),t.form.otcPayLists.length>0&&(t.payType=t.form.otcPayLists[1].payType)})},updateBatchOutFee:function(){var t=this;this.$http.post("/wallet/backmgr/merchant/updateBatchOutFee",{batchOutRatioFee:Math.floor(this.formData.value1)/100,batchOutFixedFee:this.formData.value2}).then(function(e){t.$notify.success({title:"提示",message:e.msg}),t.getDetails()})},modifyInSwitch:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/modifyInSwitch",{inSwitch:this.inSwitch,rushWaitTime:this.rushWaitTime}).then(function(e){200==e.code&&t.getInSwitch()})},getInSwitch:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/getInSwitch",{}).then(function(e){200==e.code&&(t.inSwitch=e.result.inSwitch+"",t.rushWaitTime=e.result.rushWaitTime)})},open:function(){var t=this;this.inFee||this.outFee?this.$prompt("请输入谷歌验证码","安全验证",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(e){var o=e.value;t.save(o)}).catch(function(){t.$message({type:"info",message:"取消修改"})}):this.$notify.warning({title:"提示",message:"兑入手续费与兑出手续费不能同时为空！"})},batchOutRatioFeeInput:function(){this.form.BATCHOUT_RATIO_FEE=this.form.BATCHOUT_RATIO_FEE.replace(/[^\d]/g,"")},showDialog:function(t){this.dialogTitle="",this.formData.value1=this.form.BATCHOUT_RATIO_FEE,this.formData.value2=this.form.BATCHOUT_FIXED_FEE,this.dialogVisible=!0},save:function(t){var e=this;""!=t.trim()?(this.form.secret=t,this.form.inFee=this.inFee?(this.inFee/100).toFixed(4):-1,this.form.outFee=this.outFee?(this.outFee/100).toFixed(4):-1,this.form.payType=this.payType,this.form.BATCHOUT_RATIO_FEE=Math.floor(this.form.BATCHOUT_RATIO_FEE)/100,this.form.MERCHANT_RECHARGE_RATE=Math.floor(100*this.form.MERCHANT_RECHARGE_RATE)/1e4,this.$http.post("/wallet/backmgr/merchant/trade/updateConfig",this.form).then(function(t){e.$notify.success({title:"提示",message:t.msg}),e.getData()})):this.$message({type:"info",message:"谷歌验证码不能为空"})},BigNumber:function(t){return s()(t)}},watch:{coinName:function(){this.getData()},payType:function(t,e){var o=this;this.form.otcPayLists.forEach(function(t,e){t.payType==o.payType&&(o.inFee=t.inFee?Math.floor(1e4*t.inFee)/100:t.inFee,o.outFee=t.outFee?Math.floor(1e4*t.outFee)/100:t.outFee)})}},computed:i()({},Object(l.b)(["coinInfo"]))},m={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"init-settings"},[o("div",{staticClass:"current"},[o("div",{staticClass:"title"},[o("h3",[t._v("当前参数")]),t._v(" "),o("div",{staticClass:"select-wrap"},[o("label",[t._v("币种：")]),t._v(" "),o("el-select",{attrs:{placeholder:"请选择",size:"small"},model:{value:t.coinName,callback:function(e){t.coinName=e},expression:"coinName"}},[o("el-option",{attrs:{label:"USDT",value:"USDT"}})],1)],1)]),t._v(" "),o("ul",[o("li",[o("label",[t._v(t._s(t.coinName)+"当前市价:")]),o("span",[t._v(t._s(t.form.toRMBPrice))])]),t._v(" "),1==t.form.MERCHANT_RATE_TYPE?o("li",[o("label",[t._v(t._s(t.coinName)+"当前兑入价格:")]),o("span",[t._v(t._s(Math.floor(1e3*t.BigNumber(1*t.form.huobi.in).plus(1*t.form.MERCHANT_IN_PRICE_FLOAT))/1e3))])]):3==t.form.MERCHANT_RATE_TYPE?o("li",[o("label",[t._v(t._s(t.coinName)+"当前兑入价格:")]),o("span",[t._v(t._s(Math.floor(1e3*t.BigNumber(1*t.form.bian.in).plus(1*t.form.MERCHANT_IN_PRICE_FLOAT))/1e3))])]):4==t.form.MERCHANT_RATE_TYPE?o("li",[o("label",[t._v(t._s(t.coinName)+"当前兑入价格:")]),o("span",[t._v(t._s(Math.floor(1e3*t.BigNumber(1*t.form.okex.in).plus(1*t.form.MERCHANT_IN_PRICE_FLOAT))/1e3))])]):o("li",[o("label",[t._v(t._s(t.coinName)+"当前兑入价格:")]),o("span",[t._v(t._s(Math.floor(1e3*t.form.MERCHANT_IN_PRICE)/1e3))])]),t._v(" "),1==t.form.MERCHANT_RATE_TYPE?o("li",[o("label",[t._v(t._s(t.coinName)+"当前兑出价格:")]),o("span",[t._v(t._s(Math.floor(1e3*t.BigNumber(1*t.form.huobi.out).plus(1*t.form.MERCHANT_OUT_PRICE_FLOAT))/1e3))])]):3==t.form.MERCHANT_RATE_TYPE?o("li",[o("label",[t._v(t._s(t.coinName)+"当前兑出价格:")]),o("span",[t._v(t._s(Math.floor(1e3*t.BigNumber(1*t.form.bian.out).plus(1*t.form.MERCHANT_OUT_PRICE_FLOAT))/1e3))])]):4==t.form.MERCHANT_RATE_TYPE?o("li",[o("label",[t._v(t._s(t.coinName)+"当前兑出价格:")]),o("span",[t._v(t._s(Math.floor(1e3*t.BigNumber(1*t.form.okex.out).plus(1*t.form.MERCHANT_OUT_PRICE_FLOAT))/1e3))])]):o("li",[o("label",[t._v(t._s(t.coinName)+"当前兑出价格:")]),o("span",[t._v(t._s(Math.floor(1e3*t.form.MERCHANT_OUT_PRICE)/1e3))])])])]),t._v(" "),o("div",{staticClass:"content-wrap"},[o("h3",[t._v("商户设置")]),t._v(" "),o("el-tabs",{attrs:{type:"border-card"}},[o("el-tab-pane",{attrs:{label:"兑入兑出价格设置"}},[o("el-form",{ref:"form",attrs:{model:t.form,"label-width":"100px",size:"small"}},[t.form.huobi?o("el-form-item",{attrs:{label:"类型："}},[o("el-radio-group",{model:{value:t.form.MERCHANT_RATE_TYPE,callback:function(e){t.$set(t.form,"MERCHANT_RATE_TYPE",e)},expression:"form.MERCHANT_RATE_TYPE"}},[o("el-radio",{attrs:{label:"1"}},[o("span",[t._v("火币")]),t._v(" "),o("span",[t._v("兑入价格："+t._s(t.form.huobi.in))]),t._v(" "),o("span",[t._v("兑出价格："+t._s(t.form.huobi.out))])]),t._v(" "),o("br"),t._v(" "),o("el-radio",{attrs:{label:"4"}},[o("span",[t._v("OKEX")]),t._v(" "),o("span",[t._v("兑入价格："+t._s(t.form.okex.in))]),t._v(" "),o("span",[t._v("兑出价格："+t._s(t.form.okex.out))])]),t._v(" "),o("br"),t._v(" "),o("el-radio",{attrs:{label:"3"}},[o("span",[t._v("币安")]),t._v(" "),o("span",[t._v("兑入价格："+t._s(t.form.bian.in))]),t._v(" "),o("span",[t._v("兑出价格："+t._s(t.form.bian.out))])]),t._v(" "),o("br"),t._v(" "),o("el-radio",{attrs:{label:"2"}},[o("span",[t._v("手动")])])],1)],1):t._e(),t._v(" "),o("el-form-item",{attrs:{label:"货币："}},[o("el-input",{staticStyle:{width:"100px"},attrs:{disabled:!0},model:{value:t.form.MERCHANT_COIN_NAME,callback:function(e){t.$set(t.form,"MERCHANT_COIN_NAME","string"==typeof e?e.trim():e)},expression:"form.MERCHANT_COIN_NAME"}})],1),t._v(" "),1==t.form.MERCHANT_RATE_TYPE?o("el-form-item",{attrs:{label:"兑入价格："}},[o("el-input",{staticStyle:{width:"100px"},attrs:{disabled:!0},model:{value:t.form.huobi.in,callback:function(e){t.$set(t.form.huobi,"in","string"==typeof e?e.trim():e)},expression:"form.huobi.in"}}),t._v("　+　"),o("el-input",{attrs:{placeholder:"输入倍数（如0.9）",oninput:"value = value.replace(/^(\\-)*(\\d+)\\.(\\d\\d\\d).*$/,'$1$2.$3')"},model:{value:t.form.MERCHANT_IN_PRICE_FLOAT,callback:function(e){t.$set(t.form,"MERCHANT_IN_PRICE_FLOAT","string"==typeof e?e.trim():e)},expression:"form.MERCHANT_IN_PRICE_FLOAT"}})],1):3==t.form.MERCHANT_RATE_TYPE?o("el-form-item",{attrs:{label:"兑入价格："}},[o("el-input",{staticStyle:{width:"100px"},attrs:{disabled:!0},model:{value:t.form.bian.in,callback:function(e){t.$set(t.form.bian,"in","string"==typeof e?e.trim():e)},expression:"form.bian.in"}}),t._v("　+　"),o("el-input",{attrs:{placeholder:"输入倍数（如0.9）",oninput:"value = value.replace(/^(\\-)*(\\d+)\\.(\\d\\d\\d\\d).*$/,'$1$2.$3')"},model:{value:t.form.MERCHANT_IN_PRICE_FLOAT,callback:function(e){t.$set(t.form,"MERCHANT_IN_PRICE_FLOAT","string"==typeof e?e.trim():e)},expression:"form.MERCHANT_IN_PRICE_FLOAT"}})],1):4==t.form.MERCHANT_RATE_TYPE?o("el-form-item",{attrs:{label:"兑入价格："}},[o("el-input",{staticStyle:{width:"100px"},attrs:{disabled:!0},model:{value:t.form.okex.in,callback:function(e){t.$set(t.form.okex,"in","string"==typeof e?e.trim():e)},expression:"form.okex.in"}}),t._v("　+　"),o("el-input",{attrs:{placeholder:"输入倍数（如0.9）",oninput:"value = value.replace(/^(\\-)*(\\d+)\\.(\\d\\d\\d\\d).*$/,'$1$2.$3')"},model:{value:t.form.MERCHANT_IN_PRICE_FLOAT,callback:function(e){t.$set(t.form,"MERCHANT_IN_PRICE_FLOAT","string"==typeof e?e.trim():e)},expression:"form.MERCHANT_IN_PRICE_FLOAT"}})],1):o("el-form-item",{attrs:{label:"兑入价格："}},[o("el-input",{model:{value:t.form.MERCHANT_IN_PRICE,callback:function(e){t.$set(t.form,"MERCHANT_IN_PRICE","string"==typeof e?e.trim():e)},expression:"form.MERCHANT_IN_PRICE"}})],1),t._v(" "),1==t.form.MERCHANT_RATE_TYPE?o("el-form-item",{attrs:{label:"兑出价格："}},[o("el-input",{staticStyle:{width:"100px"},attrs:{disabled:!0},model:{value:t.form.huobi.out,callback:function(e){t.$set(t.form.huobi,"out","string"==typeof e?e.trim():e)},expression:"form.huobi.out"}}),t._v("　+　"),o("el-input",{attrs:{placeholder:"输入倍数（如1.1）",oninput:"value = value.replace(/^(\\-)*(\\d+)\\.(\\d\\d\\d\\d).*$/,'$1$2.$3')"},model:{value:t.form.MERCHANT_OUT_PRICE_FLOAT,callback:function(e){t.$set(t.form,"MERCHANT_OUT_PRICE_FLOAT","string"==typeof e?e.trim():e)},expression:"form.MERCHANT_OUT_PRICE_FLOAT"}})],1):3==t.form.MERCHANT_RATE_TYPE?o("el-form-item",{attrs:{label:"兑出价格："}},[o("el-input",{staticStyle:{width:"100px"},attrs:{disabled:!0},model:{value:t.form.bian.out,callback:function(e){t.$set(t.form.bian,"out","string"==typeof e?e.trim():e)},expression:"form.bian.out"}}),t._v("　+　"),o("el-input",{attrs:{placeholder:"输入倍数（如1.1）",oninput:"value = value.replace(/^(\\-)*(\\d+)\\.(\\d\\d\\d\\d).*$/,'$1$2.$3')"},model:{value:t.form.MERCHANT_OUT_PRICE_FLOAT,callback:function(e){t.$set(t.form,"MERCHANT_OUT_PRICE_FLOAT","string"==typeof e?e.trim():e)},expression:"form.MERCHANT_OUT_PRICE_FLOAT"}})],1):4==t.form.MERCHANT_RATE_TYPE?o("el-form-item",{attrs:{label:"兑出价格："}},[o("el-input",{staticStyle:{width:"100px"},attrs:{disabled:!0},model:{value:t.form.okex.out,callback:function(e){t.$set(t.form.okex,"out","string"==typeof e?e.trim():e)},expression:"form.okex.out"}}),t._v("　+　"),o("el-input",{attrs:{placeholder:"输入倍数（如1.1）",oninput:"value = value.replace(/^(\\-)*(\\d+)\\.(\\d\\d\\d\\d).*$/,'$1$2.$3')"},model:{value:t.form.MERCHANT_OUT_PRICE_FLOAT,callback:function(e){t.$set(t.form,"MERCHANT_OUT_PRICE_FLOAT","string"==typeof e?e.trim():e)},expression:"form.MERCHANT_OUT_PRICE_FLOAT"}})],1):o("el-form-item",{attrs:{label:"兑出价格："}},[o("el-input",{model:{value:t.form.MERCHANT_OUT_PRICE,callback:function(e){t.$set(t.form,"MERCHANT_OUT_PRICE","string"==typeof e?e.trim():e)},expression:"form.MERCHANT_OUT_PRICE"}})],1)],1),t._v(" "),o("p",{staticClass:"tips"},[t._v("提示：价格默认使用系统设置的价格，开启手动设置的价格，则自动关闭系统价格，关闭手动设置的价格，则自动开启系统价格。")])],1)],1),t._v(" "),o("el-tabs",{attrs:{type:"border-card"}},[o("el-tab-pane",{attrs:{label:"商户初始化设置"}},[o("el-form",{ref:"form",attrs:{model:t.form,inline:!0,"label-width":"155px",size:"small"}},[o("el-form-item",{attrs:{label:"支付方式："}},[o("el-select",{attrs:{placeholder:"请选择"},model:{value:t.payType,callback:function(e){t.payType=e},expression:"payType"}},t._l(t.form.otcPayLists,function(t){return o("el-option",{key:t.payType,attrs:{label:t.description,value:t.payType}})}),1)],1),t._v(" "),o("br"),t._v(" "),o("el-form-item",{attrs:{label:"商户兑入手续费比例："}},[o("el-input",{attrs:{type:"number"},on:{input:function(e){t.inFee=t.inFee.replace(/^(\-)*(\d+)\.(\d\d).*$/,"$1$2.$3")}},model:{value:t.inFee,callback:function(e){t.inFee="string"==typeof e?e.trim():e},expression:"inFee"}},[o("template",{slot:"append"},[t._v("%")])],2)],1),t._v(" "),o("el-form-item",{attrs:{label:"商户兑出手续费比例："}},[o("el-input",{attrs:{type:"number"},on:{input:function(e){t.outFee=t.outFee.replace(/^(\-)*(\d+)\.(\d\d).*$/,"$1$2.$3")}},model:{value:t.outFee,callback:function(e){t.outFee="string"==typeof e?e.trim():e},expression:"outFee"}},[o("template",{slot:"append"},[t._v("%")])],2)],1),t._v(" "),o("br"),t._v(" "),0===t.payType?o("el-form-item",{staticClass:"payList"},[o("div",[o("div",[o("span",[t._v("银行卡兑入手续费：")]),t._v(t._s(t.form.otcPayLists[1].inFee)+" %")]),t._v(" "),o("div",[o("span",[t._v("支付宝兑入手续费：")]),t._v(t._s(t.form.otcPayLists[2].inFee)+" %")]),t._v(" "),o("div",[o("span",[t._v("微信兑入手续费：")]),t._v(t._s(t.form.otcPayLists[3].inFee)+"%")])]),t._v(" "),o("div",[o("div",[o("span",[t._v("银行卡兑出手续费： ")]),t._v(t._s(t.form.otcPayLists[1].outFee)+"%")]),t._v(" "),o("div",[o("span",[t._v("支付宝兑出手续费：")]),t._v(t._s(t.form.otcPayLists[2].outFee)+"%")]),t._v(" "),o("div",[o("span",[t._v("微信兑出手续费：")]),t._v(" "+t._s(t.form.otcPayLists[3].outFee)+"%")])])]):t._e(),t._v(" "),o("br"),t._v(" "),o("el-form-item",{attrs:{label:"商户最小兑入额度："}},[o("el-input",{attrs:{type:"number"},model:{value:t.form.MERCHANT_MIN_IN_AMOUNT,callback:function(e){t.$set(t.form,"MERCHANT_MIN_IN_AMOUNT","string"==typeof e?e.trim():e)},expression:"form.MERCHANT_MIN_IN_AMOUNT"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"商户最大兑入额度："}},[o("el-input",{attrs:{type:"number"},model:{value:t.form.MERCHANT_MAX_IN_AMOUNT,callback:function(e){t.$set(t.form,"MERCHANT_MAX_IN_AMOUNT","string"==typeof e?e.trim():e)},expression:"form.MERCHANT_MAX_IN_AMOUNT"}})],1),t._v(" "),o("br"),t._v(" "),o("el-form-item",{attrs:{label:"商户最小兑出额度："}},[o("el-input",{attrs:{type:"number"},model:{value:t.form.MERCHANT_MIN_OUT_AMOUNT,callback:function(e){t.$set(t.form,"MERCHANT_MIN_OUT_AMOUNT","string"==typeof e?e.trim():e)},expression:"form.MERCHANT_MIN_OUT_AMOUNT"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"商户最大兑出额度："}},[o("el-input",{attrs:{type:"number"},model:{value:t.form.MERCHANT_MAX_OUT_AMOUNT,callback:function(e){t.$set(t.form,"MERCHANT_MAX_OUT_AMOUNT","string"==typeof e?e.trim():e)},expression:"form.MERCHANT_MAX_OUT_AMOUNT"}})],1),t._v(" "),o("br"),t._v(" "),o("el-form-item",{attrs:{label:"商户充币手续费："}},[o("el-input",{on:{input:function(e){t.form.MERCHANT_RECHARGE_RATE=t.form.MERCHANT_RECHARGE_RATE.replace(/^(\-)*(\d+)\.(\d\d).*$/,"$1$2.$3")}},model:{value:t.form.MERCHANT_RECHARGE_RATE,callback:function(e){t.$set(t.form,"MERCHANT_RECHARGE_RATE","string"==typeof e?e.trim():e)},expression:"form.MERCHANT_RECHARGE_RATE"}},[o("template",{slot:"append"},[t._v("%")])],2)],1)],1),t._v(" "),o("p",{staticClass:"tips"},[t._v("提示：商户默认该参数，可在商户查询模块单独配置该参数。初始化设置修改后只对新增商户生效。")])],1)],1),t._v(" "),o("el-tabs",{attrs:{type:"border-card"}},[o("el-tab-pane",{attrs:{label:"全局设置"}},[o("el-form",{ref:"form",attrs:{model:t.form,"label-width":"170px",size:"small"}},["USDT"==t.coinName?o("el-form-item",{attrs:{label:"omni提币手续费:"}},[o("el-input",{attrs:{type:"number"},model:{value:t.form.MERCHANT_WITHDRAW_RATE_OMNI,callback:function(e){t.$set(t.form,"MERCHANT_WITHDRAW_RATE_OMNI","string"==typeof e?e.trim():e)},expression:"form.MERCHANT_WITHDRAW_RATE_OMNI"}})],1):t._e(),t._v(" "),"USDT"==t.coinName?o("el-form-item",{attrs:{label:"Erc20提币手续费:"}},[o("el-input",{attrs:{type:"number"},model:{value:t.form.MERCHANT_WITHDRAW_RATE_ERC20,callback:function(e){t.$set(t.form,"MERCHANT_WITHDRAW_RATE_ERC20","string"==typeof e?e.trim():e)},expression:"form.MERCHANT_WITHDRAW_RATE_ERC20"}})],1):o("el-form-item",{attrs:{label:"提币手续费："}},[o("el-input",{attrs:{type:"number"},model:{value:t.form.MERCHANT_WITHDRAW_RATE,callback:function(e){t.$set(t.form,"MERCHANT_WITHDRAW_RATE","string"==typeof e?e.trim():e)},expression:"form.MERCHANT_WITHDRAW_RATE"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"转账手续费："}},[o("el-input",{attrs:{type:"number"},model:{value:t.form.MERCHANT_TRADE_RATE,callback:function(e){t.$set(t.form,"MERCHANT_TRADE_RATE","string"==typeof e?e.trim():e)},expression:"form.MERCHANT_TRADE_RATE"}})],1),t._v(" "),o("el-form-item",{staticClass:"bold",attrs:{label:"商户兑入方式："}},[o("span",{staticStyle:{"margin-left":"15px"}},[o("el-radio",{attrs:{label:"1"},on:{change:t.modifyInSwitch},model:{value:t.inSwitch,callback:function(e){t.inSwitch=e},expression:"inSwitch"}},[t._v("派单")]),t._v(" "),o("el-radio",{attrs:{label:"2"},on:{change:t.modifyInSwitch},model:{value:t.inSwitch,callback:function(e){t.inSwitch=e},expression:"inSwitch"}},[t._v("抢单")])],1)]),t._v(" "),o("el-form-item",{attrs:{label:"抢单转派单时间："}},[o("el-input",{attrs:{placeholder:"请输入时间"},on:{blur:t.modifyInSwitch},model:{value:t.rushWaitTime,callback:function(e){t.rushWaitTime=e},expression:"rushWaitTime"}},[o("template",{slot:"append"},[t._v("S")])],2)],1),t._v(" "),o("el-form-item",{attrs:{label:"商户批量兑出最大笔数："}},[o("el-input",{attrs:{placeholder:"请输入兑出最大笔数"},model:{value:t.form.CASHOUT_NUM,callback:function(e){t.$set(t.form,"CASHOUT_NUM",e)},expression:"form.CASHOUT_NUM"}})],1)],1)],1)],1),t._v(" "),o("el-button",{staticClass:"save",attrs:{type:"primary"},on:{click:t.open}},[t._v("保存修改")])],1),t._v(" "),o("el-dialog",{attrs:{title:"修改代付兑出手续费比例",visible:t.dialogVisible,width:"40%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[o("el-form",{ref:"form",attrs:{"label-width":"120px"}},[o("el-form-item",{attrs:{label:"每单代付费率"}},[o("el-input",{attrs:{type:"number",oninput:"value = value.replace(/^(\\-)*(\\d+)\\.(\\d\\d).*$/,'$1$2.$3')"},model:{value:t.formData.value1,callback:function(e){t.$set(t.formData,"value1",e)},expression:"formData.value1"}},[o("template",{slot:"append"},[t._v("%")])],2)],1),t._v(" "),o("el-form-item",{attrs:{label:"每单固定金额"}},[o("el-input",{attrs:{type:"number",oninput:"value = value.replace(/^(\\-)*(\\d+)\\.(\\d\\d\\d\\d).*$/,'$1$2.$3')"},model:{value:t.formData.value2,callback:function(e){t.$set(t.formData,"value2",e)},expression:"formData.value2"}},[o("template",{slot:"append"},[t._v(t._s(t.coinName))])],2)],1)],1),t._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{size:"mini"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.updateBatchOutFee}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var _=o("C7Lr")(n,m,!1,function(t){o("bHGy")},"data-v-05483ca2",null);e.default=_.exports},bHGy:function(t,e){}});