webpackJsonp([59],{Uh7t:function(t,e){},kWzf:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("Dd8w"),i=a.n(l),s=a("NYxO"),o={data:function(){return{filterForm:{coinName:""},detaileData:{otcFee:""},rateDetaile:{buyRate:null,payType:1,rank:1,saleRate:null,totalBuyRate:.1,totalSaleRate:.1}}},activated:function(){this.coinInfo[0]&&(this.filterForm.coinName=this.coinInfo[0].coinName,this.queryOtcCoinConfig()),this.getDefaultRate()},methods:{updateDefaultRate:function(){var t=this,e={buyRate:Math.floor(this.rateDetaile.buyRate)/100,saleRate:Math.floor(this.rateDetaile.saleRate)/100,totalBuyRate:Math.floor(this.rateDetaile.totalBuyRate)/100,totalSaleRate:Math.floor(this.rateDetaile.totalSaleRate)/100,payType:this.rateDetaile.payType,rank:this.rateDetaile.payType};this.$http.post("/wallet/invite/backmgr/updateDefaultRate",e).then(function(e){200==e.code&&(t.$message({type:"success",message:e.msg}),t.getDefaultRate())})},getDefaultRate:function(){var t=this;this.$http.post("/wallet/invite/backmgr/getDefaultRate",{payType:this.rateDetaile.payType,rank:this.rateDetaile.rank}).then(function(e){200==e.code&&(e.result.totalBuyRate=Math.floor(1e4*e.result.totalBuyRate)/100,e.result.totalSaleRate=Math.floor(1e4*e.result.totalSaleRate)/100,e.result.saleRate=Math.floor(1e4*e.result.saleRate)/100,e.result.buyRate=Math.floor(1e4*e.result.buyRate)/100,t.rateDetaile=e.result)})},queryOtcCoinConfig:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/queryOtcCoinConfig",{coinName:this.filterForm.coinName}).then(function(e){200==e.code&&(t.detaileData=e.result)})},UpdateOtcCoinConfig:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/UpdateOtcCoinConfig",{coinId:this.detaileData.coinId,deposit:this.detaileData.deposit,otcFee:this.detaileData.otcFee,sysMatchMin:this.detaileData.sysMatchMin,sysMatchMax:this.detaileData.sysMatchMax,sysCashoutMin:this.detaileData.sysCashoutMin,sysCashoutMax:this.detaileData.sysCashoutMax}).then(function(e){200==e.code?(t.$notify({title:"成功",message:"修改成功",type:"success"}),t.queryOtcCoinConfig()):t.$notify.error({title:"提示",message:e.msg})})}},watch:{coinInfo:function(t,e){this.filterForm.coinName=this.coinInfo[0].coinName,this.queryOtcCoinConfig()}},computed:i()({},Object(s.b)(["coinInfo"]))},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"LegalCurrencySetting-page"},[a("div",{staticClass:"title"},[a("h2",[t._v("法币设置")]),t._v(" "),a("div",{staticClass:"select-wrap"},[a("label",[t._v("币种：")]),t._v(" "),a("el-select",{attrs:{size:"small"},on:{change:t.queryOtcCoinConfig},model:{value:t.filterForm.coinName,callback:function(e){t.$set(t.filterForm,"coinName",e)},expression:"filterForm.coinName"}},t._l(t.coinInfo,function(t,e){return a("el-option",{key:e,attrs:{value:t.coinName,label:t.coinName}})}),1)],1)]),t._v(" "),a("el-tabs",{attrs:{type:"border-card"}},[a("h3",[t._v("普通交易设置")]),t._v(" "),a("el-form",{ref:"filterForm",attrs:{"label-width":"100px",size:"mini"}},[a("el-form-item",{attrs:{label:"手续费:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入手续费"},model:{value:t.detaileData.otcFee,callback:function(e){t.$set(t.detaileData,"otcFee",e)},expression:"detaileData.otcFee"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"保证金:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入保证金"},model:{value:t.detaileData.deposit,callback:function(e){t.$set(t.detaileData,"deposit",e)},expression:"detaileData.deposit"}})],1)],1),t._v(" "),a("h3",[t._v("承兑商接单额度全局设置")]),t._v(" "),a("el-form",{ref:"filterForm",attrs:{"label-width":"100px",size:"mini"}},[a("el-form-item",{attrs:{label:"全局买币范围:"}},[a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.detaileData.sysMatchMin,callback:function(e){t.$set(t.detaileData,"sysMatchMin",e)},expression:"detaileData.sysMatchMin"}},[a("template",{slot:"append"},[t._v(t._s(t.filterForm.coinName))])],2),t._v(" "),a("span",[t._v("　~　")]),t._v(" "),a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.detaileData.sysMatchMax,callback:function(e){t.$set(t.detaileData,"sysMatchMax",e)},expression:"detaileData.sysMatchMax"}},[a("template",{slot:"append"},[t._v(t._s(t.filterForm.coinName))])],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"全局卖币范围:"}},[a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.detaileData.sysCashoutMin,callback:function(e){t.$set(t.detaileData,"sysCashoutMin",e)},expression:"detaileData.sysCashoutMin"}},[a("template",{slot:"append"},[t._v(t._s(t.filterForm.coinName))])],2),t._v(" "),a("span",[t._v("　~　")]),t._v(" "),a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.detaileData.sysCashoutMax,callback:function(e){t.$set(t.detaileData,"sysCashoutMax",e)},expression:"detaileData.sysCashoutMax"}},[a("template",{slot:"append"},[t._v(t._s(t.filterForm.coinName))])],2)],1),t._v(" "),a("el-form-item",{attrs:{label:""}},[a("el-button",{attrs:{type:"primary"},on:{click:t.UpdateOtcCoinConfig}},[t._v("保存修改")])],1)],1)],1),t._v(" "),a("h3",[t._v("返佣设置")]),t._v(" "),a("el-tabs",{attrs:{type:"border-card"}},[a("el-form",{ref:"filterForm",attrs:{"label-width":"160px",size:"mini"}},[a("el-form-item",{attrs:{label:"全局最大兑入返佣比例:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"未设置默认0.7%"},model:{value:t.rateDetaile.totalBuyRate,callback:function(e){t.$set(t.rateDetaile,"totalBuyRate",e)},expression:"rateDetaile.totalBuyRate"}},[a("template",{slot:"append"},[t._v("%")])],2),t._v(" "),a("span",[t._v("设置后三级返佣比例之和不可超过该值")])],1),t._v(" "),a("el-form-item",{attrs:{label:"全局最大兑出返佣比例:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"未设置默认0.2%"},model:{value:t.rateDetaile.totalSaleRate,callback:function(e){t.$set(t.rateDetaile,"totalSaleRate",e)},expression:"rateDetaile.totalSaleRate"}},[a("template",{slot:"append"},[t._v("%")])],2),t._v(" "),a("span",[t._v("设置后三级返佣比例之和不可超过该值")])],1),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("el-form-item",{attrs:{label:"支付通道:"}},[a("el-select",{attrs:{placeholder:"请选择"},on:{change:t.getDefaultRate},model:{value:t.rateDetaile.payType,callback:function(e){t.$set(t.rateDetaile,"payType",e)},expression:"rateDetaile.payType"}},[a("el-option",{attrs:{label:"银行卡",value:1}}),t._v(" "),a("el-option",{attrs:{label:"支付宝",value:2}}),t._v(" "),a("el-option",{attrs:{label:"微信",value:3}}),t._v(" "),a("el-option",{attrs:{label:"宝转卡",value:4}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"反佣等级:"}},[a("el-select",{attrs:{placeholder:"请选择"},on:{change:t.getDefaultRate},model:{value:t.rateDetaile.rank,callback:function(e){t.$set(t.rateDetaile,"rank",e)},expression:"rateDetaile.rank"}},[a("el-option",{attrs:{label:"一级反佣",value:1}}),t._v(" "),a("el-option",{attrs:{label:"二级反佣",value:2}}),t._v(" "),a("el-option",{attrs:{label:"三级反佣",value:3}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"默认返佣兑入返佣比例:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"未设置默认0.6%"},model:{value:t.rateDetaile.buyRate,callback:function(e){t.$set(t.rateDetaile,"buyRate",e)},expression:"rateDetaile.buyRate"}},[a("template",{slot:"append"},[t._v("%")])],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"默认返佣兑出返佣比例:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"未设置默认0.1%"},model:{value:t.rateDetaile.saleRate,callback:function(e){t.$set(t.rateDetaile,"saleRate",e)},expression:"rateDetaile.saleRate"}},[a("template",{slot:"append"},[t._v("%")])],2)],1),t._v(" "),a("el-form-item",{attrs:{label:""}},[a("el-button",{attrs:{type:"primary"},on:{click:t.updateDefaultRate}},[t._v("保存")])],1)],1)],1)],1)},staticRenderFns:[]};var n=a("VU/8")(o,r,!1,function(t){a("Uh7t")},"data-v-608e1ad9",null);e.default=n.exports}});