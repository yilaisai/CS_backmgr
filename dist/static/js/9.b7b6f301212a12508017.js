webpackJsonp([9],{"J/Nc":function(e,t){},NYR9:function(e,t,a){e.exports=a.p+"static/img/skin1.3a2ea1c.png"},bnw3:function(e,t){},mFrx:function(e,t,a){e.exports=a.p+"static/img/skin2.2a2310e.png"},pJAj:function(e,t,a){e.exports=a.p+"static/img/skin3.33233fb.png"},vAx8:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={props:["data"],data:function(){return{imgList:[a("NYR9"),a("mFrx"),a("pJAj")],defaultForm:{CHECK_STAND_SWITCH:"",CHECK_STAND_SKIN_TYPE:"",CHECK_STAND_CHECK_TYPE:"",CHECK_STAND_SIGN_TYPE:"",CHECK_STAND_LOGO_TYPE:"",CHECK_STAND_PAY_TYPE:[]},modes:[{label:"无验证",value:"1"},{label:"手机号验证",value:"2"},{label:"【付费】银行卡要素验证",value:"3"}],payModes:[{label:"需要标记",value:"1"},{label:"不需要标记",value:"2"},{label:"关联抢派单模式",value:"3"}],payList:[]}},activated:function(){},methods:{changeSetting:function(e){var t=this,a="",i="";switch(e){case 4:a=this.defaultForm.CHECK_STAND_SKIN_TYPE;case 5:i=this.defaultForm.CHECK_STAND_PAY_TYPE.join(",");break;case 6:a=this.defaultForm.CHECK_STAND_CHECK_TYPE;break;case 7:a=this.defaultForm.CHECK_STAND_SIGN_TYPE;break;case 8:a=this.defaultForm.CHECK_STAND_SWITCH?1:0;break;case 9:a=this.defaultForm.CHECK_STAND_LOGO_TYPE}this.$http.post("/wallet/backmgr/merchant/updateMerchantInfo",{userId:this.$route.query.id,type:e,value3:a,value4:i}).then(function(e){t.$notify.success({title:"提示",message:e.msg})})}},watch:{data:function(e,t){var a=this;this.defaultForm.CHECK_STAND_SWITCH=1==e.info.checkStandSwitch,this.defaultForm.CHECK_STAND_SKIN_TYPE=e.info.checkStandSkinType&&e.info.checkStandSkinType.toString(),this.defaultForm.CHECK_STAND_CHECK_TYPE=e.info.checkStandCheckType&&e.info.checkStandCheckType.toString(),this.defaultForm.CHECK_STAND_SIGN_TYPE=e.info.checkStandSignType&&e.info.checkStandSignType.toString(),this.defaultForm.CHECK_STAND_LOGO_TYPE=e.info.checkStandLogoType&&e.info.checkStandLogoType.toString();var i=e.info.payList?e.info.payList.split(","):[];this.defaultForm.CHECK_STAND_PAY_TYPE=[],i.forEach(function(e){a.defaultForm.CHECK_STAND_PAY_TYPE.push(Number(e))}),this.payList=e.payList.slice(),this.payList.shift()}}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"setCheckstand"},[e._m(0),e._v(" "),a("el-form",{ref:"defaultForm",staticClass:"defaultForm",attrs:{model:e.defaultForm,inline:!0,"label-width":"140px",size:"small"}},[a("el-form-item",{attrs:{label:"开启单独设置："}},[a("el-switch",{attrs:{"active-color":"#13ce66"},on:{change:function(t){return e.changeSetting(8)}},model:{value:e.defaultForm.CHECK_STAND_SWITCH,callback:function(t){e.$set(e.defaultForm,"CHECK_STAND_SWITCH",t)},expression:"defaultForm.CHECK_STAND_SWITCH"}})],1),e._v(" "),e.defaultForm.CHECK_STAND_SWITCH?a("el-form-item",{attrs:{label:"默认皮肤："}},[a("div",{staticClass:"radioBox"},[a("el-image",{staticStyle:{width:"100px"},attrs:{src:e.imgList[0],"preview-src-list":[e.imgList[0]]}}),e._v(" "),a("el-radio",{attrs:{label:"1"},on:{change:function(t){return e.changeSetting(4)}},model:{value:e.defaultForm.CHECK_STAND_SKIN_TYPE,callback:function(t){e.$set(e.defaultForm,"CHECK_STAND_SKIN_TYPE",t)},expression:"defaultForm.CHECK_STAND_SKIN_TYPE"}},[e._v("皮肤1")])],1),e._v(" "),a("div",{staticClass:"radioBox"},[a("el-image",{staticStyle:{width:"100px"},attrs:{src:e.imgList[1],"preview-src-list":[e.imgList[1]]}}),e._v(" "),a("el-radio",{attrs:{label:"2"},on:{change:function(t){return e.changeSetting(4)}},model:{value:e.defaultForm.CHECK_STAND_SKIN_TYPE,callback:function(t){e.$set(e.defaultForm,"CHECK_STAND_SKIN_TYPE",t)},expression:"defaultForm.CHECK_STAND_SKIN_TYPE"}},[e._v("皮肤2")])],1),e._v(" "),a("div",{staticClass:"radioBox"},[a("el-image",{staticStyle:{width:"100px"},attrs:{src:e.imgList[2],"preview-src-list":[e.imgList[2]]}}),e._v(" "),a("el-radio",{attrs:{label:"3"},on:{change:function(t){return e.changeSetting(4)}},model:{value:e.defaultForm.CHECK_STAND_SKIN_TYPE,callback:function(t){e.$set(e.defaultForm,"CHECK_STAND_SKIN_TYPE",t)},expression:"defaultForm.CHECK_STAND_SKIN_TYPE"}},[e._v("皮肤3")])],1)]):e._e(),e._v(" "),e.defaultForm.CHECK_STAND_SWITCH?a("el-form-item",{attrs:{label:"默认LOGO："}},[a("div",{staticClass:"radioBox"},[a("el-radio",{attrs:{label:"1"},on:{change:function(t){return e.changeSetting(9)}},model:{value:e.defaultForm.CHECK_STAND_LOGO_TYPE,callback:function(t){e.$set(e.defaultForm,"CHECK_STAND_LOGO_TYPE",t)},expression:"defaultForm.CHECK_STAND_LOGO_TYPE"}},[e._v("FlashEx")])],1),e._v(" "),a("div",{staticClass:"radioBox"},[a("el-radio",{attrs:{label:"2"},on:{change:function(t){return e.changeSetting(9)}},model:{value:e.defaultForm.CHECK_STAND_LOGO_TYPE,callback:function(t){e.$set(e.defaultForm,"CHECK_STAND_LOGO_TYPE",t)},expression:"defaultForm.CHECK_STAND_LOGO_TYPE"}},[e._v("OTC-Flash")])],1),e._v(" "),a("div",{staticClass:"radioBox"},[a("el-radio",{attrs:{label:"3"},on:{change:function(t){return e.changeSetting(9)}},model:{value:e.defaultForm.CHECK_STAND_LOGO_TYPE,callback:function(t){e.$set(e.defaultForm,"CHECK_STAND_LOGO_TYPE",t)},expression:"defaultForm.CHECK_STAND_LOGO_TYPE"}},[e._v("RouteOtc")])],1)]):e._e(),e._v(" "),e.defaultForm.CHECK_STAND_SWITCH?a("el-form-item",{attrs:{label:"收银台支付入口："}},[a("el-checkbox-group",{attrs:{min:1},on:{change:function(t){return e.changeSetting(5)}},model:{value:e.defaultForm.CHECK_STAND_PAY_TYPE,callback:function(t){e.$set(e.defaultForm,"CHECK_STAND_PAY_TYPE",t)},expression:"defaultForm.CHECK_STAND_PAY_TYPE"}},e._l(e.payList,function(t){return a("el-checkbox",{key:t.payType,attrs:{label:t.payType}},[e._v(e._s(t.description))])}),1)],1):e._e(),e._v(" "),e.defaultForm.CHECK_STAND_SWITCH?a("el-form-item",{attrs:{label:"默认验证方式："}},[a("el-radio-group",{model:{value:e.defaultForm.CHECK_STAND_CHECK_TYPE,callback:function(t){e.$set(e.defaultForm,"CHECK_STAND_CHECK_TYPE",t)},expression:"defaultForm.CHECK_STAND_CHECK_TYPE"}},e._l(e.modes,function(t){return a("el-radio",{key:t.value,attrs:{label:t.value},on:{change:function(t){return e.changeSetting(6)}}},[e._v(e._s(t.label))])}),1)],1):e._e(),e._v(" "),e.defaultForm.CHECK_STAND_SWITCH?a("el-form-item",{attrs:{label:"是否标记已付款："}},[a("el-radio-group",{model:{value:e.defaultForm.CHECK_STAND_SIGN_TYPE,callback:function(t){e.$set(e.defaultForm,"CHECK_STAND_SIGN_TYPE",t)},expression:"defaultForm.CHECK_STAND_SIGN_TYPE"}},e._l(e.payModes,function(t){return a("el-radio",{key:t.value,attrs:{label:t.value},on:{change:function(t){return e.changeSetting(7)}}},[e._v(e._s(t.label))])}),1)],1):e._e(),e._v(" "),a("p",{staticClass:"tips"},[e._v("注：商户收银台支付入口单独设置后，全局风控配置将不再生效")])],1)],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"title"},[t("h3",[this._v("收银台设置")])])}]};var l=a("C7Lr")(i,n,!1,function(e){a("bnw3")},"data-v-23b53557",null).exports,o=(a("bBkB"),{data:function(){return{radio:"1",coinName:this.$variableCoin,pageData:{coinInfo:{},info:{},payList:[],feeList:[]},formData:{value1:"",value2:""},dialogVisible:!1,dialogType:"",label1:"",label2:"",dialogTitle:"修改",payType:-1,merchantInMaxAmount:"",merchantInMinAmount:"",merchantOutMaxAmount:"",merchantOutMinAmount:""}},activated:function(){this.getDetails()},methods:{getDetails:function(){var e=this;this.$http.post("/wallet/backmgr/merchant/detail",{userId:this.$route.query.id}).then(function(t){e.pageData=t.result;var a="",i="";e.pageData.feeList[0].inFee==e.pageData.feeList[1].inFee&&e.pageData.feeList[1].inFee==e.pageData.feeList[2].inFee&&(a=e.pageData.feeList[0].inFee),e.pageData.feeList[0].outFee==e.pageData.feeList[1].outFee&&e.pageData.feeList[1].outFee==e.pageData.feeList[2].outFee&&(i=e.pageData.feeList[0].outFee),-1==e.payType&&(e.payType=e.pageData.feeList[0].payType),e.pageData.feeList.unshift({payType:0,inFee:a,outFee:i,merchantInMaxAmount:"",merchantInMinAmount:"",merchantOutMaxAmount:"",merchantOutMinAmount:""}),e.pageData.payList.unshift({payType:0,description:"全部"}),e.changeValue()})},updateMerchantExchangeType:function(e){var t=this;this.$http.post("/wallet/backmgr/merchant/updateMerchantExchangeType",e).then(function(e){t.$notify.success({title:"提示",message:e.msg})})},inTypeChange:function(e){this.updateMerchantExchangeType({exchangeType:e,type:1,userId:this.$route.query.id})},outTypeChange:function(e){this.updateMerchantExchangeType({exchangeType:e,type:2,userId:this.$route.query.id})},deleteGoogleVerify:function(){var e=this;this.$prompt("删除后，用户需重置谷歌验证，确定删除？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPlaceholder:"请输入您的谷歌验证码"}).then(function(t){var a=t.value;e.$http.post("/wallet/backmgr/merchant/deleteGoogleVerify",{userId:e.$route.query.id,secret:a}).then(function(t){e.$notify.success({title:"提示",message:t.msg})})}).catch(function(){})},handleClose:function(){},showDialog:function(e){this.dialogType=e||"","duiRu"==this.dialogType?(this.dialogTitle="修改兑入费率",this.label1="最小兑入额度：",this.label2="最大兑入额度：",this.formData.value1=this.merchantInMinAmount,this.formData.value2=this.merchantInMaxAmount):"duiChu"==this.dialogType?(this.dialogTitle="修改兑出费率",this.label1="最小兑出额度：",this.label2="最大兑出额度：",this.formData.value1=this.merchantOutMinAmount,this.formData.value2=this.merchantOutMaxAmount):"feeRateIn"==this.dialogType?(this.dialogTitle="修改商户手续费【"+this.payTypeName+"】",this.label1="商户兑入手续费:",this.label2="商户兑出手续费:",this.formData.value1=this.inFee,this.formData.value2=this.outFee):"firstRate"==this.dialogType?(this.dialogTitle="修改直推人费率",this.label1="兑入佣金费率：",this.label2="兑出佣金费率：",this.formData.value1=this.pageData.info.firstRateIn,this.formData.value2=this.pageData.info.firstRateOut):"secRate"==this.dialogType?(this.dialogTitle="修改间推人费率",this.label1="兑入佣金费率：",this.label2="兑出佣金费率：",this.formData.value1=this.pageData.info.secRateIn,this.formData.value2=this.pageData.info.secRateOut):"daifu"==this.dialogType?(this.dialogTitle="修改代付兑出手续费比例",this.label1="每单代付费率",this.label2="每单固定金额",this.formData.value1=Math.floor(1e4*this.pageData.info.batchOutRatioFee)/100,this.formData.value2=this.pageData.info.batchOutFixedFee):"chongbi"==this.dialogType&&(this.dialogTitle="修改充币手续费：",this.label2="充币手续费",this.formData.value1="",this.formData.value2=Math.floor(1e4*this.pageData.coinInfo.merchantRechargeRate)/100),this.dialogVisible=!0},updateMerchantCoinConfig:function(e){var t=this;this.$http.post("/wallet/backmgr/merchant/updateMerchantCoinConfig",{payType:this.payType,coinName:this.coinName,type:e,userId:this.$route.query.id,value1:this.formData.value1,value2:this.formData.value2}).then(function(e){t.formData.value1="",t.formData.value2="",t.$notify.success({title:"提示",message:e.msg}),t.getDetails()})},updateMerchantInfo:function(e){var t=this;this.$http.post("/wallet/backmgr/merchant/updateMerchantInfo",{coinName:this.coinName,type:e,userId:this.$route.query.id,value1:this.formData.value1,value2:this.formData.value2}).then(function(e){t.formData.value1="",t.formData.value2="",t.$notify.success({title:"提示",message:e.msg}),t.getDetails()})},updateMerchantFee:function(e){var t=this;if("feeRateIn"==this.dialogType||"duiRu"==this.dialogType||"duiChu"==this.dialogType){var a=this.formData.value1,i=this.formData.value2;"feeRateIn"==this.dialogType&&(a=this.formData.value1?(this.formData.value1/100).toFixed(4):-.01,i=this.formData.value2?(this.formData.value2/100).toFixed(4):-.01),this.$http.post("/wallet/backmgr/merchant/updateMerchantFee",{coinName:this.coinName,payType:this.payType,type:e,userId:this.$route.query.id,value1:a,value2:i}).then(function(e){t.formData.value1="",t.formData.value2="",t.$notify.success({title:"提示",message:e.msg}),t.getDetails()})}},dialogEnter:function(){this.dialogVisible=!1,"duiRu"==this.dialogType?this.updateMerchantFee(2):"duiChu"==this.dialogType?this.updateMerchantFee(3):"feeRateIn"==this.dialogType?this.updateMerchantFee(1):"firstRate"==this.dialogType?this.updateMerchantInfo(2):"secRate"==this.dialogType?this.updateMerchantInfo(3):"daifu"==this.dialogType?this.updateBatchOutFee():"chongbi"==this.dialogType&&this.updateRechargeFee()},updateBatchOutFee:function(){var e=this;this.$http.post("/wallet/backmgr/merchant/updateBatchOutFee",{batchOutRatioFee:Math.floor(this.formData.value1)/100,userId:this.pageData.info.userId,batchOutFixedFee:this.formData.value2}).then(function(t){e.$notify.success({title:"提示",message:t.msg}),e.getDetails()})},updateMerchantSwitch:function(e){var t=this;this.$http.post("/wallet/backmgr/merchant/updateMerchantSwitch",{matchSwitch:e,userId:this.pageData.info.userId}).then(function(e){t.$notify.success({title:"提示",message:e.msg}),t.getDetails()})},updateRechargeFee:function(){var e=this;this.$http.post("/wallet/backmgr/merchant/updateMerchantCoinConfig",{coinName:this.coinName,userId:this.$route.query.id,type:1,merchantRechargeRate:Math.floor(1e3*this.formData.value2)/1e5}).then(function(t){e.formData.value1="",e.formData.value2="",e.$notify.success({title:"提示",message:t.msg}),e.getDetails()})},changeValue:function(){var e=this;this.pageData.feeList.forEach(function(t,a){t.payType==e.payType&&(e.merchantInMaxAmount=t.merchantInMaxAmount,e.merchantInMinAmount=t.merchantInMinAmount,e.merchantOutMaxAmount=t.merchantOutMaxAmount,e.merchantOutMinAmount=t.merchantOutMinAmount)})}},watch:{payType:function(){this.changeValue()}},computed:{inFee:function(){var e=this,t=0;return this.pageData.feeList.forEach(function(a,i){a.payType!=e.payType||(t=a.inFee)}),t?Math.floor(1e4*t)/100:t},outFee:function(){var e=this,t=0;return this.pageData.feeList.forEach(function(a,i){a.payType!=e.payType||(t=a.outFee)}),t?Math.floor(1e4*t)/100:t},payTypeName:function(){var e=this,t="";return this.pageData.payList.forEach(function(a,i){a.payType!=e.payType||(t=a.description)}),t}},components:{CheckStand:l}}),s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"details"},[a("div",{staticClass:"basic"},[e._m(0),e._v(" "),a("ul",[a("li",[a("label",[e._v("商户编号:")]),e._v(" "),a("span",[e._v(e._s(e.pageData.info.name))])]),e._v(" "),a("li",[a("label",[e._v("身份证号码:")]),e._v(" "),a("span",[e._v(e._s(e.pageData.info.idNo))])]),e._v(" "),a("li",[a("label",[e._v("手机号码:")]),e._v(" "),a("span",[e._v(e._s(e.pageData.info.phone))])]),e._v(" "),a("li",[a("label",[e._v("邮箱:")]),e._v(" "),a("span",[e._v(e._s(e.pageData.info.email))])]),e._v(" "),a("li",[a("label",[e._v("上次登录时间:")]),e._v(" "),a("span",[e._v(e._s(e.pageData.info.lastLoginDate))])]),e._v(" "),a("li",[a("label",[e._v("上次登录IP:")]),e._v(" "),a("span",[e._v(e._s(e.pageData.info.lastLoginIp))])]),e._v(" "),a("li",[a("label",[e._v("谷歌密钥:")]),e._v(" "),a("span",[e._v(e._s(e.pageData.info.googleVerify))]),e._v(" "),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:e.deleteGoogleVerify}},[e._v("删除")])],1),e._v(" "),a("li",[a("label",[e._v("申请时间:")]),e._v(" "),a("span",[e._v(e._s(e.pageData.info.applyDate))])]),e._v(" "),a("li",[a("label",[e._v("商户网址:")]),e._v(" "),a("span",[e._v(e._s(e.pageData.info.companyAddr))])])])]),e._v(" "),a("div",{staticClass:"settable"},[e._m(1),e._v(" "),a("ul",[a("li",[a("label",[e._v("支付方式:")]),e._v(" "),a("el-select",{staticStyle:{width:"90px"},attrs:{placeholder:"请选择",size:"mini"},model:{value:e.payType,callback:function(t){e.payType=t},expression:"payType"}},e._l(e.pageData.payList,function(e){return a("el-option",{key:e.payType,attrs:{label:e.description,value:e.payType}})}),1)],1),e._v(" "),a("li"),e._v(" "),a("li",[a("label",[e._v("商户兑入手续费:")]),e._v(" "),a("span",[e._v(e._s(e.inFee)+" %")]),e._v(" "),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(t){return e.showDialog("feeRateIn")}}},[e._v("修改")])],1),e._v(" "),a("li",[a("label",[e._v("商户兑出手续费:")]),e._v(" "),a("span",[e._v(e._s(e.outFee)+" %")]),e._v(" "),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(t){return e.showDialog("feeRateIn")}}},[e._v("修改")])],1),e._v(" "),0==e.payType?a("li",[a("p",[e._v("银行卡兑入手续费："+e._s(Math.floor(1e4*e.pageData.feeList[1].inFee)/100)+" %")]),e._v(" "),a("p",[e._v("支付宝兑入手续费："+e._s(Math.floor(1e4*e.pageData.feeList[2].inFee)/100)+" %")]),e._v(" "),a("p",[e._v("微信兑入手续费："+e._s(Math.floor(1e4*e.pageData.feeList[3].inFee)/100)+" %")])]):e._e(),e._v(" "),0==e.payType?a("li",[a("p",[e._v("银行卡兑出手续费："+e._s(Math.floor(1e4*e.pageData.feeList[1].outFee)/100)+" %")]),e._v(" "),a("p",[e._v("支付宝兑出手续费："+e._s(Math.floor(1e4*e.pageData.feeList[2].outFee)/100)+" %")]),e._v(" "),a("p",[e._v("微信兑出手续费："+e._s(Math.floor(1e4*e.pageData.feeList[3].outFee)/100)+" %")])]):e._e(),e._v(" "),a("li",[a("label",[e._v("商户兑出方式:")]),e._v(" "),a("span",[a("el-radio",{attrs:{label:1},on:{change:e.outTypeChange},model:{value:e.pageData.info.outType,callback:function(t){e.$set(e.pageData.info,"outType",t)},expression:"pageData.info.outType"}},[e._v("派单")]),e._v(" "),a("el-radio",{attrs:{label:2},on:{change:e.outTypeChange},model:{value:e.pageData.info.outType,callback:function(t){e.$set(e.pageData.info,"outType",t)},expression:"pageData.info.outType"}},[e._v("抢单")])],1)]),e._v(" "),a("li",[a("label",[e._v("兑入额度范围（"+e._s(e.$variableCoin)+"）:")]),e._v(" "),a("span",[e._v("【"+e._s(e.merchantInMinAmount)+"】 ~ 【"+e._s(e.merchantInMaxAmount)+"】")]),e._v(" "),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(t){return e.showDialog("duiRu")}}},[e._v("修改")])],1),e._v(" "),a("li",[a("label",[e._v("兑出额度范围（"+e._s(e.$variableCoin)+"）:")]),e._v(" "),a("span",[e._v("【"+e._s(e.merchantOutMinAmount)+"】 ~ 【"+e._s(e.merchantOutMaxAmount)+"】")]),e._v(" "),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(t){return e.showDialog("duiChu")}}},[e._v("修改")])],1),e._v(" "),a("li",[a("label",[e._v("充币手续费:")]),e._v(" "),a("span",[e._v(e._s(Math.floor(1e4*e.pageData.coinInfo.merchantRechargeRate)/100)),a("span",[e._v(" %")])]),e._v(" "),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(t){return e.showDialog("chongbi")}}},[e._v("修改")])],1)])]),e._v(" "),a("CheckStand",{attrs:{data:e.pageData}}),e._v(" "),a("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogVisible,width:"40%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.formData,"label-width":"120px"}},["chongbi"!=e.dialogType?a("el-form-item",{attrs:{label:e.label1}},[a("el-input",{attrs:{type:"number",oninput:"value = value.replace(/^(\\-)*(\\d+)\\.(\\d\\d).*$/,'$1$2.$3')"},model:{value:e.formData.value1,callback:function(t){e.$set(e.formData,"value1",t)},expression:"formData.value1"}},["feeRateIn"==e.dialogType||"firstRate"==e.dialogType||"secRate"==e.dialogType||"daifu"==e.dialogType?a("template",{slot:"append"},[e._v("%")]):e._e()],2)],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:e.label2}},["daifu"==e.dialogType?a("el-input",{attrs:{type:"number",oninput:"value = value.replace(/^(\\-)*(\\d+)\\.(\\d\\d\\d\\d).*$/,'$1$2.$3')"},model:{value:e.formData.value2,callback:function(t){e.$set(e.formData,"value2",t)},expression:"formData.value2"}},["daifu"==e.dialogType?a("template",{slot:"append"},[e._v(e._s(e.$variableCoin))]):e._e()],2):"chongbi"==e.dialogType?a("el-input",{model:{value:e.formData.value2,callback:function(t){e.$set(e.formData,"value2",t)},expression:"formData.value2"}},["feeRateIn"==e.dialogType||"firstRate"==e.dialogType||"secRate"==e.dialogType||"chongbi"==e.dialogType?a("template",{slot:"append"},[e._v("%")]):e._e()],2):a("el-input",{attrs:{type:"number",oninput:"value = value.replace(/^(\\-)*(\\d+)\\.(\\d\\d).*$/,'$1$2.$3')"},model:{value:e.formData.value2,callback:function(t){e.$set(e.formData,"value2",t)},expression:"formData.value2"}},["feeRateIn"==e.dialogType||"firstRate"==e.dialogType||"secRate"==e.dialogType||"chongbi"==e.dialogType?a("template",{slot:"append"},[e._v("%")]):e._e()],2)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.dialogEnter}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"title"},[t("h3",[this._v("基本信息")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"title"},[t("h3",[this._v("可设置参数")])])}]};var r=a("C7Lr")(o,s,!1,function(e){a("J/Nc")},"data-v-0ee8347e",null);t.default=r.exports}});