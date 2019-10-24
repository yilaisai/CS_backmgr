webpackJsonp([81],{FrPk:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={name:"currency-set",data:function(){return{cbbRate:"",billName:"",list:[{bill:"PNB"},{bill:"SAC"}],server_path:"",pageTypeList:[],dialogFormVisibleView:!1,dialogDeleteVisibleView:!1,showChangeRateDiv:!1,pnbCoinId:"",pnbPrice:""}},methods:{getBillList:function(){var e=this;this.$http.post("/supernode/coin/open/getCoinInfoList",{}).then(function(t){e.list=t.result,e.list.map(function(t){"PNB"==t.coinName&&(e.pnbCoinId=t.coinId,e.pnbPrice=t.amount)})})},onSubmit:function(){var e=this;this.$http.post("/supernode/backmgr/coin/updateCoinInfo",{id:this.pnbCoinId,coinName:"PNB",price:this.cbbRate}).then(function(t){e.$message({type:"success",message:"修改成功！"}),e.showChangeRateDiv=!1,e.pnbPrice=e.cbbRate})},delete1:function(e){this.id=e.coinId,this.dialogDeleteVisibleView=!0},add:function(){this.dialogFormVisibleView=!0},confirmBill:function(){var e=this;this.$http.post("/supernode/backmgr/coin/createCoinInfo",{coinName:this.billName}).then(function(t){e.$message({type:"success",message:"添加成功！"}),e.dialogFormVisibleView=!1,e.getBillList(),e.billName=""})},confirmDetele:function(){var e=this;this.$http.post("/supernode/backmgr/coin/updateCoinInfoSysStatus",{id:this.id,sysStatus:0}).then(function(t){e.$message({type:"success",message:"删除成功！"}),e.dialogDeleteVisibleView=!1,e.getBillList()})}},activated:function(){this.getBillList()}},s={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"set-bill"},[i("h2",[e._v("PNB 兑人民币价格设置")]),e._v(" "),i("div",{staticStyle:{"background-color":"#f2f2f2",padding:"20px"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:!e.showChangeRateDiv,expression:"!showChangeRateDiv"}]},[e._v("\n      1PNB = "+e._s(e.pnbPrice?e.pnbPrice:"?")+"¥\n      "),i("el-button",{staticStyle:{"margin-left":"30px"},attrs:{type:"primary",size:"small"},on:{click:function(t){e.showChangeRateDiv=!0}}},[e._v("修改\n      ")])],1),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.showChangeRateDiv,expression:"showChangeRateDiv"}]},[i("p",[e._v("1PNB =\n        "),i("el-input",{staticStyle:{width:"150px"},attrs:{placeholder:"请输入内容"},model:{value:e.cbbRate,callback:function(t){e.cbbRate=t},expression:"cbbRate"}}),e._v("\n        ¥\n      ")],1),e._v(" "),i("el-button",{attrs:{type:"danger",size:"medium"},on:{click:function(t){e.showChangeRateDiv=!1}}},[e._v("取消")]),e._v(" "),i("el-button",{attrs:{type:"primary",size:"medium"},on:{click:e.onSubmit}},[e._v("确认")])],1)]),e._v(" "),i("el-row",[i("el-col",{attrs:{span:17}},[i("h2",[e._v("币种设置")])]),e._v(" "),i("el-col",{attrs:{span:4}},[i("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"danger",size:"small"},nativeOn:{click:function(t){return e.add(t)}}},[e._v("添加币种")])],1)],1),e._v(" "),i("sac-table",{attrs:{data:e.list}},[i("el-table-column",{attrs:{prop:"coinName",label:"币种"}}),e._v(" "),i("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(i){return e.delete1(t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),i("el-dialog",{attrs:{visible:e.dialogFormVisibleView},on:{"update:visible":function(t){e.dialogFormVisibleView=t}}},[i("p",[e._v("添加币种名称：\n      "),i("el-input",{staticStyle:{width:"150px"},attrs:{size:"small",placeholder:"请输入内容"},model:{value:e.billName,callback:function(t){e.billName=t},expression:"billName"}})],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(t){e.dialogFormVisibleView=!1}}},[e._v("取消")]),e._v(" "),i("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.confirmBill}},[e._v("确认")])],1)]),e._v(" "),i("el-dialog",{attrs:{visible:e.dialogDeleteVisibleView},on:{"update:visible":function(t){e.dialogDeleteVisibleView=t}}},[i("p",[e._v("确认要删除该币种吗？")]),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(t){e.dialogDeleteVisibleView=!1}}},[e._v("取消")]),e._v(" "),i("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.confirmDetele}},[e._v("确认")])],1)])],1)},staticRenderFns:[]};var l=i("VU/8")(n,s,!1,function(e){i("qo9o")},null,null);t.default=l.exports},qo9o:function(e,t){}});