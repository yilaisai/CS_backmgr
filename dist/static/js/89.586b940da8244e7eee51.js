webpackJsonp([89],{"9Ine":function(e,n){throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: Cannot find module 'tslib'\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:594:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:520:25)\n    at Module.require (internal/modules/cjs/loader.js:650:17)\n    at require (internal/modules/cjs/helpers.js:20:18)\n    at Object.<anonymous> (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_less@3.11.0@less\\dist\\less.cjs.js:3:13)\n    at Module._compile (internal/modules/cjs/loader.js:702:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)\n    at Module.load (internal/modules/cjs/loader.js:612:32)\n    at tryModuleLoad (internal/modules/cjs/loader.js:551:12)\n    at Function.Module._load (internal/modules/cjs/loader.js:543:3)\n    at Module.require (internal/modules/cjs/loader.js:650:17)\n    at require (internal/modules/cjs/helpers.js:20:18)\n    at Object.<anonymous> (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_less@3.11.0@less\\index.js:1:80)\n    at Module._compile (internal/modules/cjs/loader.js:702:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)\n    at Module.load (internal/modules/cjs/loader.js:612:32)\n    at runLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:195:19)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:367:11\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:172:11\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:32:11)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:165:10)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:176:18\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:47:3)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:165:10)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:176:18\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:47:3)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at runLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:365:2)\n    at NormalModule.doBuild (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:182:3)\n    at NormalModule.build (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:275:15)")},FrPk:function(e,n,l){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t={name:"currency-set",data:function(){return{cbbRate:"",billName:"",list:[{bill:"PNB"},{bill:"SAC"}],server_path:"",pageTypeList:[],dialogFormVisibleView:!1,dialogDeleteVisibleView:!1,showChangeRateDiv:!1,pnbCoinId:"",pnbPrice:""}},methods:{getBillList:function(){var e=this;this.$http.post("/supernode/coin/open/getCoinInfoList",{}).then(function(n){e.list=n.result,e.list.map(function(n){"PNB"==n.coinName&&(e.pnbCoinId=n.coinId,e.pnbPrice=n.amount)})})},onSubmit:function(){var e=this;this.$http.post("/supernode/backmgr/coin/updateCoinInfo",{id:this.pnbCoinId,coinName:"PNB",price:this.cbbRate}).then(function(n){e.$message({type:"success",message:"修改成功！"}),e.showChangeRateDiv=!1,e.pnbPrice=e.cbbRate})},delete1:function(e){this.id=e.coinId,this.dialogDeleteVisibleView=!0},add:function(){this.dialogFormVisibleView=!0},confirmBill:function(){var e=this;this.$http.post("/supernode/backmgr/coin/createCoinInfo",{coinName:this.billName}).then(function(n){e.$message({type:"success",message:"添加成功！"}),e.dialogFormVisibleView=!1,e.getBillList(),e.billName=""})},confirmDetele:function(){var e=this;this.$http.post("/supernode/backmgr/coin/updateCoinInfoSysStatus",{id:this.id,sysStatus:0}).then(function(n){e.$message({type:"success",message:"删除成功！"}),e.dialogDeleteVisibleView=!1,e.getBillList()})}},activated:function(){this.getBillList()}},a={render:function(){var e=this,n=e.$createElement,l=e._self._c||n;return l("div",{staticClass:"set-bill"},[l("h2",[e._v("PNB 兑人民币价格设置")]),e._v(" "),l("div",{staticStyle:{"background-color":"#f2f2f2",padding:"20px"}},[l("div",{directives:[{name:"show",rawName:"v-show",value:!e.showChangeRateDiv,expression:"!showChangeRateDiv"}]},[e._v("\n      1PNB = "+e._s(e.pnbPrice?e.pnbPrice:"?")+"¥\n      "),l("el-button",{staticStyle:{"margin-left":"30px"},attrs:{type:"primary",size:"small"},on:{click:function(n){e.showChangeRateDiv=!0}}},[e._v("修改\n      ")])],1),e._v(" "),l("div",{directives:[{name:"show",rawName:"v-show",value:e.showChangeRateDiv,expression:"showChangeRateDiv"}]},[l("p",[e._v("1PNB =\n        "),l("el-input",{staticStyle:{width:"150px"},attrs:{placeholder:"请输入内容"},model:{value:e.cbbRate,callback:function(n){e.cbbRate=n},expression:"cbbRate"}}),e._v("\n        ¥\n      ")],1),e._v(" "),l("el-button",{attrs:{type:"danger",size:"medium"},on:{click:function(n){e.showChangeRateDiv=!1}}},[e._v("取消")]),e._v(" "),l("el-button",{attrs:{type:"primary",size:"medium"},on:{click:e.onSubmit}},[e._v("确认")])],1)]),e._v(" "),l("el-row",[l("el-col",{attrs:{span:17}},[l("h2",[e._v("币种设置")])]),e._v(" "),l("el-col",{attrs:{span:4}},[l("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"danger",size:"small"},nativeOn:{click:function(n){return e.add(n)}}},[e._v("添加币种")])],1)],1),e._v(" "),l("sac-table",{attrs:{data:e.list}},[l("el-table-column",{attrs:{prop:"coinName",label:"币种"}}),e._v(" "),l("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(n){return[l("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(l){return e.delete1(n.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),l("el-dialog",{attrs:{visible:e.dialogFormVisibleView},on:{"update:visible":function(n){e.dialogFormVisibleView=n}}},[l("p",[e._v("添加币种名称：\n      "),l("el-input",{staticStyle:{width:"150px"},attrs:{size:"small",placeholder:"请输入内容"},model:{value:e.billName,callback:function(n){e.billName=n},expression:"billName"}})],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(n){e.dialogFormVisibleView=!1}}},[e._v("取消")]),e._v(" "),l("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.confirmBill}},[e._v("确认")])],1)]),e._v(" "),l("el-dialog",{attrs:{visible:e.dialogDeleteVisibleView},on:{"update:visible":function(n){e.dialogDeleteVisibleView=n}}},[l("p",[e._v("确认要删除该币种吗？")]),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(n){e.dialogDeleteVisibleView=!1}}},[e._v("取消")]),e._v(" "),l("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.confirmDetele}},[e._v("确认")])],1)])],1)},staticRenderFns:[]};var o=l("C7Lr")(t,a,!1,function(e){l("9Ine")},null,null);n.default=o.exports}});