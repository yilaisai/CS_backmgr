webpackJsonp([29],{FrPk:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o={name:"currency-set",data:function(){return{cbbRate:"",billName:"",list:[{bill:"PNB"},{bill:"SAC"}],server_path:"",pageTypeList:[],dialogFormVisibleView:!1,dialogDeleteVisibleView:!1,showChangeRateDiv:!1}},created:function(){this.getBillList()},methods:{getBillList:function(){var t=this;this.$http.post("/cloud/coin/open/getCoinInfoList",{}).then(function(e){t.list=e.result})},onSubmit:function(){var t=this;this.$http.post("/cloud/coin/backmgr/updateCoinInfo",{id:"",coinName:"",price:""}).then(function(e){t.showChangeRateDiv=!1})},delete1:function(t){this.id=t.coinId,this.dialogDeleteVisibleView=!0},add:function(){this.dialogFormVisibleView=!0},confirmBill:function(){var t=this;this.$http.post("/cloud/coin/backmgr/createCoinInfo",{coinName:this.billName}).then(function(e){t.getBillList()})},confirmDetele:function(){var t=this;this.$http.post("/cloud/coin/backmgr/updateCoinInfoSysStatus",{id:this.id,sysStatus:0}).then(function(e){t.getBillList()})}}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"set-bill"},[i("h2",[t._v("PNB 兑人民币价格设置")]),t._v(" "),i("div",{staticStyle:{"background-color":"#f2f2f2",padding:"20px"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:!t.showChangeRateDiv,expression:"!showChangeRateDiv"}]},[t._v("\n      1PNB = 16.5¥"),i("el-button",{staticStyle:{"margin-left":"30px"},attrs:{type:"primary",size:"medium"},on:{click:function(e){t.showChangeRateDiv=!0}}},[t._v("修改")])],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.showChangeRateDiv,expression:"showChangeRateDiv"}]},[i("p",[t._v("1PNB = "),i("el-input",{staticStyle:{width:"150px"},attrs:{placeholder:"请输入内容"},model:{value:t.cbbRate,callback:function(e){t.cbbRate=e},expression:"cbbRate"}}),t._v(" ¥")],1),t._v(" "),i("el-button",{attrs:{type:"danger",size:"medium"},on:{click:function(e){t.showChangeRateDiv=!1}}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"medium"},on:{click:t.onSubmit}},[t._v("确认")])],1)]),t._v(" "),i("h2",[t._v("币种设置")]),t._v(" "),i("sac-table",{attrs:{data:t.list}},[i("el-table-column",{attrs:{prop:"coinName",label:"币种"}}),t._v(" "),i("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"primary"},nativeOn:{click:function(i){t.delete1(e.row)}}},[t._v("删除")]),t._v(" "),i("el-button",{attrs:{type:"danger"},nativeOn:{click:function(e){return t.add(e)}}},[t._v("添加")])]}}])})],1),t._v(" "),i("el-dialog",{attrs:{visible:t.dialogFormVisibleView},on:{"update:visible":function(e){t.dialogFormVisibleView=e}}},[i("p",[t._v("添加币种名称："),i("el-input",{staticStyle:{width:"150px"},attrs:{placeholder:"请输入内容"},model:{value:t.billName,callback:function(e){t.billName=e},expression:"billName"}})],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"danger",size:"medium"},on:{click:function(e){t.dialogFormVisibleView=!1}}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"medium"},on:{click:t.confirmBill}},[t._v("确认")])],1)]),t._v(" "),i("el-dialog",{attrs:{visible:t.dialogDeleteVisibleView},on:{"update:visible":function(e){t.dialogDeleteVisibleView=e}}},[i("p",[t._v("确认要删除该币种吗？")]),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"danger",size:"medium"},on:{click:function(e){t.dialogDeleteVisibleView=!1}}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"medium"},on:{click:t.confirmDetele}},[t._v("确认")])],1)])],1)},staticRenderFns:[]};var n=i("VU/8")(o,l,!1,function(t){i("rUKM")},null,null);e.default=n.exports},rUKM:function(t,e){}});