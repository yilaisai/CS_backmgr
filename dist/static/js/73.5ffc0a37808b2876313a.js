webpackJsonp([73],{kWzf:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("Dd8w"),s=a.n(i),l=a("NYxO"),o={data:function(){return{filterForm:{coinName:""},detaileData:{otcFee:""}}},activated:function(){this.coinInfo[0]&&(this.filterForm.coinName=this.coinInfo[0].coinName,this.queryOtcCoinConfig())},methods:{queryOtcCoinConfig:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/queryOtcCoinConfig",{coinName:this.filterForm.coinName}).then(function(e){200==e.code&&(t.detaileData=e.result)})},UpdateOtcCoinConfig:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/UpdateOtcCoinConfig",{coinId:this.detaileData.coinId,deposit:this.detaileData.deposit,otcFee:this.detaileData.otcFee,sysMatchMin:this.detaileData.sysMatchMin,sysMatchMax:this.detaileData.sysMatchMax,sysCashoutMin:this.detaileData.sysCashoutMin,sysCashoutMax:this.detaileData.sysCashoutMax}).then(function(e){200==e.code?(t.$notify({title:"成功",message:"修改成功",type:"success"}),t.queryOtcCoinConfig()):t.$notify.error({title:"提示",message:e.msg})})}},watch:{coinInfo:function(t,e){this.filterForm.coinName=this.coinInfo[0].coinName,this.queryOtcCoinConfig()}},computed:s()({},Object(l.b)(["coinInfo"]))},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"LegalCurrencySetting-page"},[a("div",{staticClass:"title"},[a("h2",[t._v("法币设置")]),t._v(" "),a("div",{staticClass:"select-wrap"},[a("label",[t._v("币种：")]),t._v(" "),a("el-select",{attrs:{size:"small"},on:{change:t.queryOtcCoinConfig},model:{value:t.filterForm.coinName,callback:function(e){t.$set(t.filterForm,"coinName",e)},expression:"filterForm.coinName"}},t._l(t.coinInfo,function(t,e){return a("el-option",{key:e,attrs:{value:t.coinName,label:t.coinName}})}),1)],1)]),t._v(" "),a("el-tabs",{attrs:{type:"border-card"}},[a("el-tab-pane",{attrs:{label:"普通交易设置"}},[a("el-form",{ref:"filterForm",attrs:{"label-width":"100px",size:"mini"}},[a("el-form-item",{attrs:{label:"手续费:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入手续费"},model:{value:t.detaileData.otcFee,callback:function(e){t.$set(t.detaileData,"otcFee",e)},expression:"detaileData.otcFee"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"保证金:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入保证金"},model:{value:t.detaileData.deposit,callback:function(e){t.$set(t.detaileData,"deposit",e)},expression:"detaileData.deposit"}})],1)],1)],1)],1),t._v(" "),a("el-tabs",{attrs:{type:"border-card"}},[a("el-tab-pane",{attrs:{label:"承兑商接单额度全局设置"}},[a("el-form",{ref:"filterForm",attrs:{"label-width":"100px",size:"mini"}},[a("el-form-item",{attrs:{label:"全局买币范围:"}},[a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.detaileData.sysMatchMin,callback:function(e){t.$set(t.detaileData,"sysMatchMin",e)},expression:"detaileData.sysMatchMin"}},[a("template",{slot:"append"},[t._v(t._s(t.filterForm.coinName))])],2),t._v(" "),a("span",[t._v("　~　")]),t._v(" "),a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.detaileData.sysMatchMax,callback:function(e){t.$set(t.detaileData,"sysMatchMax",e)},expression:"detaileData.sysMatchMax"}},[a("template",{slot:"append"},[t._v(t._s(t.filterForm.coinName))])],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"全局卖币范围:"}},[a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.detaileData.sysCashoutMin,callback:function(e){t.$set(t.detaileData,"sysCashoutMin",e)},expression:"detaileData.sysCashoutMin"}},[a("template",{slot:"append"},[t._v(t._s(t.filterForm.coinName))])],2),t._v(" "),a("span",[t._v("　~　")]),t._v(" "),a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.detaileData.sysCashoutMax,callback:function(e){t.$set(t.detaileData,"sysCashoutMax",e)},expression:"detaileData.sysCashoutMax"}},[a("template",{slot:"append"},[t._v(t._s(t.filterForm.coinName))])],2)],1)],1)],1)],1),t._v(" "),a("el-button",{staticClass:"save",attrs:{type:"primary"},on:{click:t.UpdateOtcCoinConfig}},[t._v("保存修改")])],1)},staticRenderFns:[]};var c=a("VU/8")(o,n,!1,function(t){a("rQzA")},"data-v-42517993",null);e.default=c.exports},rQzA:function(t,e){}});