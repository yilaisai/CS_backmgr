webpackJsonp([54],{JVCY:function(t,e){},kWzf:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("Dd8w"),i=a.n(l),o=a("NYxO"),s={data:function(){return{filterForm:{coinName:""},detaileData:{otcFee:""},quota:{assetCertification:"",payType:""},OtcPayList:[],rateDetaile:{buyRate:null,payType:1,rank:1,saleRate:null,totalBuyRate:.1,totalSaleRate:.1},atobLimitNum:0,atobLimitMin:0,atobLimitMax:0}},activated:function(){this.coinInfo[0]&&(this.filterForm.coinName="RMT",this.queryOtcCoinConfig()),this.getDefaultRate()},methods:{updateDefaultRate:function(){var t=this,e={buyRate:Math.floor(100*this.rateDetaile.buyRate)/1e4,saleRate:Math.floor(100*this.rateDetaile.saleRate)/1e4,totalBuyRate:Math.floor(100*this.rateDetaile.totalBuyRate)/1e4,totalSaleRate:Math.floor(100*this.rateDetaile.totalSaleRate)/1e4,payType:this.rateDetaile.payType,rank:this.rateDetaile.payType};this.$http.post("/wallet/invite/backmgr/updateDefaultRate",e).then(function(e){200==e.code&&(t.$message({type:"success",message:e.msg}),t.getDefaultRate())})},getDefaultRate:function(){var t=this;this.$http.post("/wallet/invite/backmgr/getDefaultRate",{payType:this.rateDetaile.payType,rank:this.rateDetaile.rank}).then(function(e){200==e.code&&(e.result.totalBuyRate=Math.floor(1e4*e.result.totalBuyRate)/100,e.result.totalSaleRate=Math.floor(1e4*e.result.totalSaleRate)/100,e.result.saleRate=Math.floor(1e4*e.result.saleRate)/100,e.result.buyRate=Math.floor(1e4*e.result.buyRate)/100,t.rateDetaile=e.result)})},queryOtcCoinConfig:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/queryOtcCoinConfig",{coinName:this.filterForm.coinName}).then(function(e){200==e.code&&(t.detaileData=e.result.coinInfo,t.atobLimitNum=e.result.atobLimitNum,t.atobLimitMin=e.result.atobLimitMin,t.atobLimitMax=e.result.atobLimitMax,t.OtcPayList=[],e.result.OtcPayList.forEach(function(e,a){t.OtcPayList.push({description:e.description,value:1*e.payType,assetCertification:e.assetCertification})}),""==t.quota.payType&&(t.quota.payType=t.OtcPayList[0].value,t.quota.assetCertification=t.OtcPayList[0].assetCertification))})},assetCertificationChange:function(t){this.quota.assetCertification=this.OtcPayList[t-1].assetCertification},UpdateOtcCoinConfig:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/UpdateOtcCoinConfig",{coinId:this.detaileData.coinId,deposit:this.detaileData.deposit,otcFee:this.detaileData.otcFee,sysMatchMin:this.detaileData.sysMatchMin,sysMatchMax:this.detaileData.sysMatchMax,sysCashoutMin:this.detaileData.sysCashoutMin,sysCashoutMax:this.detaileData.sysCashoutMax,assetCertification:this.quota.assetCertification,payType:this.quota.payType,atobLimitNum:this.atobLimitNum,atobLimitMin:this.atobLimitMin,atobLimitMax:this.atobLimitMax}).then(function(e){200==e.code?(t.$notify({title:"成功",message:"修改成功",type:"success"}),t.queryOtcCoinConfig()):t.$notify.error({title:"提示",message:e.msg})})}},watch:{coinInfo:function(t,e){this.filterForm.coinName="RMT",this.queryOtcCoinConfig()}},computed:i()({},Object(o.b)(["coinInfo"]))},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"LegalCurrencySetting-page"},[a("div",{staticClass:"title"},[a("h2",[t._v("法币设置")]),t._v(" "),a("div",{staticClass:"select-wrap"},[a("label",[t._v("币种：")]),t._v(" "),a("el-select",{attrs:{size:"small"},on:{change:t.queryOtcCoinConfig},model:{value:t.filterForm.coinName,callback:function(e){t.$set(t.filterForm,"coinName",e)},expression:"filterForm.coinName"}},t._l(t.coinInfo,function(t,e){return a("el-option",{key:e,attrs:{value:t.coinName,label:t.coinName}})}),1)],1)]),t._v(" "),a("el-tabs",{attrs:{type:"border-card"}},[a("h4",[t._v("普通交易设置")]),t._v(" "),a("el-form",{ref:"filterForm",attrs:{"label-width":"60px",size:"mini"}},[a("el-form-item",{attrs:{label:"手续费:"}},[a("el-input",{attrs:{placeholder:"请输入手续费"},model:{value:t.detaileData.otcFee,callback:function(e){t.$set(t.detaileData,"otcFee",e)},expression:"detaileData.otcFee"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"保证金:"}},[a("el-input",{attrs:{placeholder:"请输入保证金"},model:{value:t.detaileData.deposit,callback:function(e){t.$set(t.detaileData,"deposit",e)},expression:"detaileData.deposit"}})],1)],1),t._v(" "),a("h4",[t._v("承兑商接单额度全局设置")]),t._v(" "),a("el-form",{ref:"filterForm",attrs:{"label-width":"140px",size:"mini"}},[a("el-form-item",{attrs:{label:"全局买币范围:"}},[a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.detaileData.sysMatchMin,callback:function(e){t.$set(t.detaileData,"sysMatchMin",e)},expression:"detaileData.sysMatchMin"}},[a("template",{slot:"append"},[t._v(t._s(t.filterForm.coinName))])],2),t._v(" "),a("span",[t._v("　~　")]),t._v(" "),a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.detaileData.sysMatchMax,callback:function(e){t.$set(t.detaileData,"sysMatchMax",e)},expression:"detaileData.sysMatchMax"}},[a("template",{slot:"append"},[t._v(t._s(t.filterForm.coinName))])],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"全局卖币范围:"}},[a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.detaileData.sysCashoutMin,callback:function(e){t.$set(t.detaileData,"sysCashoutMin",e)},expression:"detaileData.sysCashoutMin"}},[a("template",{slot:"append"},[t._v(t._s(t.filterForm.coinName))])],2),t._v(" "),a("span",[t._v("　~　")]),t._v(" "),a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.detaileData.sysCashoutMax,callback:function(e){t.$set(t.detaileData,"sysCashoutMax",e)},expression:"detaileData.sysCashoutMax"}},[a("template",{slot:"append"},[t._v(t._s(t.filterForm.coinName))])],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"全局保证金额度:"}},[a("el-input",{staticClass:"selectInputBox",attrs:{placeholder:"请输入保证金额度"},model:{value:t.quota.assetCertification,callback:function(e){t.$set(t.quota,"assetCertification",e)},expression:"quota.assetCertification"}},[a("el-select",{staticClass:"selectPayType",attrs:{slot:"prepend",placeholder:"请选择"},on:{change:t.assetCertificationChange},slot:"prepend",model:{value:t.quota.payType,callback:function(e){t.$set(t.quota,"payType",e)},expression:"quota.payType"}},t._l(t.OtcPayList,function(t,e){return a("el-option",{key:e,attrs:{label:t.description,value:t.value}})}),1),t._v(" "),a("template",{slot:"append"},[t._v(t._s(t.filterForm.coinName))])],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"宝转卡接入单限制:"}},[t._v("\n\t\t\t\t\t每张卡24小时内允许接\n\t\t\t\t \t"),a("el-input",{staticClass:"miniInput",attrs:{placeholder:"默认2"},model:{value:t.atobLimitNum,callback:function(e){t.atobLimitNum=e},expression:"atobLimitNum"}}),t._v("笔单\n\t\t\t\t")],1),t._v(" "),a("el-form-item",{attrs:{label:""}},[a("el-input",{attrs:{placeholder:"100"},model:{value:t.atobLimitMin,callback:function(e){t.atobLimitMin=e},expression:"atobLimitMin"}},[a("template",{slot:"append"},[t._v(t._s(t.filterForm.coinName))])],2),t._v("\n\t\t\t\t\t～\n\t\t\t\t\t"),a("el-input",{attrs:{placeholder:"1000"},model:{value:t.atobLimitMax,callback:function(e){t.atobLimitMax=e},expression:"atobLimitMax"}},[a("template",{slot:"append"},[t._v(t._s(t.filterForm.coinName))])],2)],1),t._v(" "),a("el-form-item",{attrs:{label:""}},[a("el-button",{attrs:{type:"primary"},on:{click:t.UpdateOtcCoinConfig}},[t._v("保存修改")])],1)],1)],1),t._v(" "),a("h3",[t._v("返佣设置")]),t._v(" "),a("el-tabs",{attrs:{type:"border-card"}},[a("el-form",{ref:"filterForm",attrs:{"label-width":"160px",size:"mini"}},[a("el-form-item",{attrs:{label:"全局最大卖币返佣比例:"}},[a("el-input",{attrs:{placeholder:"未设置默认0.7%"},model:{value:t.rateDetaile.totalBuyRate,callback:function(e){t.$set(t.rateDetaile,"totalBuyRate",e)},expression:"rateDetaile.totalBuyRate"}},[a("template",{slot:"append"},[t._v("%")])],2),t._v(" "),a("span",[t._v("设置后三级返佣比例之和不可超过该值")])],1),t._v(" "),a("el-form-item",{attrs:{label:"全局最大买币返佣比例:"}},[a("el-input",{attrs:{placeholder:"未设置默认0.2%"},model:{value:t.rateDetaile.totalSaleRate,callback:function(e){t.$set(t.rateDetaile,"totalSaleRate",e)},expression:"rateDetaile.totalSaleRate"}},[a("template",{slot:"append"},[t._v("%")])],2),t._v(" "),a("span",[t._v("设置后三级返佣比例之和不可超过该值")])],1),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("el-form-item",{attrs:{label:"支付通道:"}},[a("el-select",{attrs:{placeholder:"请选择"},on:{change:t.getDefaultRate},model:{value:t.rateDetaile.payType,callback:function(e){t.$set(t.rateDetaile,"payType",e)},expression:"rateDetaile.payType"}},[a("el-option",{attrs:{label:"银行卡",value:1}}),t._v(" "),a("el-option",{attrs:{label:"支付宝",value:2}}),t._v(" "),a("el-option",{attrs:{label:"微信",value:3}}),t._v(" "),a("el-option",{attrs:{label:"宝转卡",value:4}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"反佣等级:"}},[a("el-select",{attrs:{placeholder:"请选择"},on:{change:t.getDefaultRate},model:{value:t.rateDetaile.rank,callback:function(e){t.$set(t.rateDetaile,"rank",e)},expression:"rateDetaile.rank"}},[a("el-option",{attrs:{label:"一级反佣",value:1}}),t._v(" "),a("el-option",{attrs:{label:"二级反佣",value:2}}),t._v(" "),a("el-option",{attrs:{label:"三级反佣",value:3}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"默认返佣卖币返佣比例:"}},[a("el-input",{attrs:{placeholder:"未设置默认0.6%"},model:{value:t.rateDetaile.saleRate,callback:function(e){t.$set(t.rateDetaile,"saleRate",e)},expression:"rateDetaile.saleRate"}},[a("template",{slot:"append"},[t._v("%")])],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"默认返佣买币返佣比例:"}},[a("el-input",{attrs:{placeholder:"未设置默认0.1%"},model:{value:t.rateDetaile.buyRate,callback:function(e){t.$set(t.rateDetaile,"buyRate",e)},expression:"rateDetaile.buyRate"}},[a("template",{slot:"append"},[t._v("%")])],2)],1),t._v(" "),a("el-form-item",{attrs:{label:""}},[a("el-button",{attrs:{type:"primary"},on:{click:t.updateDefaultRate}},[t._v("保存")])],1)],1)],1)],1)},staticRenderFns:[]};var r=a("VU/8")(s,n,!1,function(t){a("JVCY")},"data-v-4b142907",null);e.default=r.exports}});