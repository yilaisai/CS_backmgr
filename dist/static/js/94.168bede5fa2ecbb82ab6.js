webpackJsonp([94],{"0Uql":function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"details"},[t("div",{staticClass:"topbar"},[t("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return e.$router.go(-1)}}},[e._v("返回")]),e._v(" "),t("el-select",{attrs:{placeholder:"请选择",size:"mini"},model:{value:e.coinName,callback:function(a){e.coinName=a},expression:"coinName"}},[t("el-option",{attrs:{label:"USDT",value:"USDT"}})],1)],1),e._v(" "),t("div",{staticClass:"basic"},[e._m(0),e._v(" "),t("ul",[t("li",[t("label",[e._v("用户名:")]),e._v(" "),t("span",[e._v(e._s(e.pageData.info.name))])]),e._v(" "),t("li",[t("label",[e._v("身份证号码:")]),e._v(" "),t("span",[e._v(e._s(e.pageData.info.idNo))])]),e._v(" "),t("li",[t("label",[e._v("手机号码:")]),e._v(" "),t("span",[e._v(e._s(e.pageData.info.phone))])]),e._v(" "),t("li",[t("label",[e._v("邮箱:")]),e._v(" "),t("span",[e._v(e._s(e.pageData.info.email))])]),e._v(" "),t("li",[t("label",[e._v("直推人:")]),e._v(" "),t("span",[e._v(e._s(e.pageData.info.firstPhone))])]),e._v(" "),t("li",[t("label",[e._v("间推人:")]),e._v(" "),t("span",[e._v(e._s(e.pageData.info.secPhone))])]),e._v(" "),t("li",[t("label",[e._v("上次登录时间:")]),e._v(" "),t("span",[e._v(e._s(e.pageData.info.lastLoginDate))])]),e._v(" "),t("li",[t("label",[e._v("上次登录IP:")]),e._v(" "),t("span",[e._v(e._s(e.pageData.info.lastLoginIp))])]),e._v(" "),t("li",[t("label",[e._v("谷歌密钥:")]),e._v(" "),t("span",[e._v(e._s(e.pageData.info.googleVerify))]),e._v(" "),t("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:e.deleteGoogleVerify}},[e._v("删除")])],1),e._v(" "),t("li",[t("label",[e._v("申请时间:")]),e._v(" "),t("span",[e._v(e._s(e.pageData.info.applyDate))])])])]),e._v(" "),t("div",{staticClass:"settable"},[e._m(1),e._v(" "),t("ul",[t("li",[t("label",[e._v("商户兑入手续费:")]),e._v(" "),t("span",[e._v(e._s(e.pageData.info.feeRateIn))]),e._v(" "),t("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){return e.showDialog("feeRateIn")}}},[e._v("修改")])],1),e._v(" "),t("li",[t("label",[e._v("商户兑入方式:")]),e._v(" "),t("span",[t("el-radio",{attrs:{label:1},on:{change:e.inTypeChange},model:{value:e.pageData.info.inType,callback:function(a){e.$set(e.pageData.info,"inType",a)},expression:"pageData.info.inType"}},[e._v("派单")]),e._v(" "),t("el-radio",{attrs:{label:2},on:{change:e.inTypeChange},model:{value:e.pageData.info.inType,callback:function(a){e.$set(e.pageData.info,"inType",a)},expression:"pageData.info.inType"}},[e._v("抢单")])],1)]),e._v(" "),t("li",[t("label",[e._v("商户兑出手续费:")]),e._v(" "),t("span",[e._v(e._s(e.pageData.info.feeRateOut))]),e._v(" "),t("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){return e.showDialog("feeRateIn")}}},[e._v("修改")])],1),e._v(" "),t("li",[t("label",[e._v("商户兑出方式:")]),e._v(" "),t("span",[t("el-radio",{attrs:{label:1},on:{change:e.outTypeChange},model:{value:e.pageData.info.outType,callback:function(a){e.$set(e.pageData.info,"outType",a)},expression:"pageData.info.outType"}},[e._v("派单")]),e._v(" "),t("el-radio",{attrs:{label:2},on:{change:e.outTypeChange},model:{value:e.pageData.info.outType,callback:function(a){e.$set(e.pageData.info,"outType",a)},expression:"pageData.info.outType"}},[e._v("抢单")])],1)]),e._v(" "),t("li",[t("label",[e._v("直推人费率:")]),e._v(" "),t("span",[e._v("兑入："+e._s(e.pageData.info.firstRateIn)+"% 　　 兑出："+e._s(e.pageData.info.firstRateOut)+"%")]),e._v(" "),t("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){return e.showDialog("firstRate")}}},[e._v("修改")])],1),e._v(" "),t("li",[t("label",[e._v("间推人费率:")]),e._v(" "),t("span",[e._v("兑入："+e._s(e.pageData.info.secRateIn)+"% 　　 兑出："+e._s(e.pageData.info.secRateOut)+"%")]),e._v(" "),t("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){return e.showDialog("secRate")}}},[e._v("修改")])],1),e._v(" "),t("li",[t("label",[e._v("最小兑入额度（USDT）:")]),e._v(" "),t("span",[e._v(e._s(e.pageData.coinInfo.minIn))]),e._v(" "),t("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){return e.showDialog("duiRu")}}},[e._v("修改")])],1),e._v(" "),t("li",[t("label",[e._v("最小兑出额度（USDT）:")]),e._v(" "),t("span",[e._v(e._s(e.pageData.coinInfo.minOut))]),e._v(" "),t("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){return e.showDialog("duiChu")}}},[e._v("修改")])],1),e._v(" "),t("li",[t("label",[e._v("最大兑入额度(USDT):")]),e._v(" "),t("span",[e._v(e._s(e.pageData.coinInfo.maxIn))]),e._v(" "),t("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){return e.showDialog("duiRu")}}},[e._v("修改")])],1),e._v(" "),t("li",[t("label",[e._v("最大兑出额度(USDT):")]),e._v(" "),t("span",[e._v(e._s(e.pageData.coinInfo.maxOut))]),e._v(" "),t("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){return e.showDialog("duiChu")}}},[e._v("修改")])],1)])]),e._v(" "),t("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogVisible,width:"40%","before-close":e.handleClose},on:{"update:visible":function(a){e.dialogVisible=a}}},[t("el-form",{ref:"form",attrs:{model:e.formData,"label-width":"120px"}},[t("el-form-item",{attrs:{label:e.label1}},[t("el-input",{model:{value:e.formData.value1,callback:function(a){e.$set(e.formData,"value1",a)},expression:"formData.value1"}},["feeRateIn"==e.dialogType||"firstRate"==e.dialogType||"secRate"==e.dialogType?t("template",{slot:"append"},[e._v("%")]):e._e()],2)],1),e._v(" "),t("el-form-item",{attrs:{label:e.label2}},[t("el-input",{model:{value:e.formData.value2,callback:function(a){e.$set(e.formData,"value2",a)},expression:"formData.value2"}},["feeRateIn"==e.dialogType||"firstRate"==e.dialogType||"secRate"==e.dialogType?t("template",{slot:"append"},[e._v("%")]):e._e()],2)],1)],1),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{size:"mini"},on:{click:function(a){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.dialogEnter}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[function(){var e=this.$createElement,a=this._self._c||e;return a("div",{staticClass:"title"},[a("h3",[this._v("基本信息")])])},function(){var e=this.$createElement,a=this._self._c||e;return a("div",{staticClass:"title"},[a("h3",[this._v("可设置参数")])])}]};var n=t("VU/8")({data:function(){return{radio:"1",coinName:"USDT",pageData:{coinInfo:{},info:{}},formData:{value1:"",value2:""},dialogVisible:!1,dialogType:"",label1:"",label2:"",dialogTitle:"修改"}},mounted:function(){this.getDetails()},methods:{getDetails:function(){var e=this;this.$http.post("/wallet/backmgr/merchant/detail",{userId:this.$route.query.id}).then(function(a){e.pageData=a.result})},updateMerchantExchangeType:function(e){var a=this;this.$http.post("/wallet/backmgr/merchant/updateMerchantExchangeType",e).then(function(e){a.$notify.success({title:"提示",message:e.msg})})},inTypeChange:function(e){this.updateMerchantExchangeType({exchangeType:e,type:1,userId:this.$route.query.id})},outTypeChange:function(e){this.updateMerchantExchangeType({exchangeType:e,type:2,userId:this.$route.query.id})},deleteGoogleVerify:function(){var e=this;this.$prompt("删除后，用户需重置谷歌验证，确定删除？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPlaceholder:"请输入您的谷歌验证码"}).then(function(a){var t=a.value;e.$http.post("/wallet/backmgr/merchant/deleteGoogleVerify",{userId:e.$route.query.id,secret:t}).then(function(a){e.$notify.success({title:"提示",message:a.msg})})}).catch(function(){})},handleClose:function(){},showDialog:function(e){this.dialogType=e||"","duiRu"==this.dialogType?(this.dialogTitle="修改兑入费率",this.label1="最小兑入额度：",this.label2="最大兑入额度："):"duiChu"==this.dialogType?(this.dialogTitle="修改兑出费率",this.label1="最小兑出额度：",this.label2="最大兑出额度："):"feeRateIn"==this.dialogType?(this.dialogTitle="修改商户手续费",this.label1="商户兑入手续费:",this.label2="商户兑出手续费:"):"firstRate"==this.dialogType?(this.dialogTitle="修改直推人费率",this.label1="兑入佣金费率：",this.label2="兑出佣金费率："):"secRate"==this.dialogType&&(this.dialogTitle="修改间推人费率",this.label1="兑入佣金费率：",this.label2="兑出佣金费率："),this.dialogVisible=!0},updateMerchantCoinConfig:function(e){var a=this;this.$http.post("/wallet/backmgr/merchant/updateMerchantCoinConfig",{coinName:this.coinName,type:e,userId:this.$route.query.id,value1:this.formData.value1,value2:this.formData.value2}).then(function(e){a.formData.value1="",a.formData.value2="",a.$notify.success({title:"提示",message:e.msg}),a.getDetails()})},updateMerchantInfo:function(e){var a=this;this.$http.post("/wallet/backmgr/merchant/updateMerchantInfo",{coinName:this.coinName,type:e,userId:this.$route.query.id,value1:this.formData.value1,value2:this.formData.value2}).then(function(e){a.formData.value1="",a.formData.value2="",a.$notify.success({title:"提示",message:e.msg}),a.getDetails()})},dialogEnter:function(){this.dialogVisible=!1,"duiRu"==this.dialogType?this.updateMerchantCoinConfig(1):"duiChu"==this.dialogType?this.updateMerchantCoinConfig(2):"feeRateIn"==this.dialogType?this.updateMerchantInfo(1):"firstRate"==this.dialogType?this.updateMerchantInfo(2):"secRate"==this.dialogType&&this.updateMerchantInfo(3)}},activated:function(){this.getDetails()}},i,!1,function(e){t("oHym")},"data-v-0568798e",null);a.default=n.exports},oHym:function(e,a){}});