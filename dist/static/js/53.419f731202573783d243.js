webpackJsonp([53],{"78zM":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("4YfN"),r=a.n(l),n=a("48sp"),o=a("CtzY"),i=a.n(o),s=a("s0MJ"),u={name:"transaction-details",data:function(){return{dialogVisible:!1,showAppeal:!1,appealData:{appealType:"4",proofTxt:"",proofImg:"",tradeId:""},selectItem:{trade_id:""},amount:"",selectedDate:[],currentPage:1,filterForm:{pageNum:1,account:"",pageSize:20,startDate:"",endDate:"",coinName:"",trade_status:"",status:"",tradeType:"3",advType:"",dateType:"1",timeOut:"",recdId:"",payType:""},advTypeMap:{1:"在线出售",2:"在线求购",3:"抢单兑出",4:"抢单兑入",5:"派单兑入",6:"派单兑出"},tradeTypeList:[{value:"全部",label:""},{value:"派单",label:"0"},{value:"抢单",label:"1"}],appealList:[{value:"0",label:"买方"},{value:"1",label:"卖方"}],statusList:[{value:"全部",label:""},{value:"未付款",label:"1"},{value:"已付款(待放行)",label:"2"},{value:"已完成",label:"3"},{value:"已取消",label:"4"},{value:"申诉中",label:"5"},{value:"申诉后完成交易",label:"6"},{value:"申诉后取消交易",label:"7"},{value:"超时取消",label:"8"}],transList:[{value:"所有",label:""},{value:"抢单兑出",label:"3"},{value:"抢单兑入",label:"4"},{value:"派单兑入",label:"5"},{value:"派单兑出",label:"6"}],tradeStatusMap:{1:"未付款",2:"待放行",3:"已完成",4:"已取消",5:"申诉中",6:"申诉后完成交易",7:"申诉后取消交易",8:"超时取消"},dateList:[{value:"今天",label:"1"},{value:"一周",label:"2"},{value:"一个月",label:"3"},{value:"三个月",label:"4"}],listData:{total:null,list:[]},sumInfo:{sumTakerAmount:"--",sumAmount:"--",sumFee:"--"},statistics:{},payTypes:{1:"银行卡",2:"支付宝",3:"微信"},server_path:"",token:localStorage.getItem("wallet_token")}},methods:{appealClick:function(e){this.appealData.tradeId=e.trade_id,this.appealData.proofTxt="",this.appealData.proofImg="",this.appealList=[{value:e.taker_user_id,label:"商户:"+e.taker_nick_name},{value:e.maker_user_id,label:"码商:"+e.nick_name}],this.showAppeal=!0},upload:function(e,t,a){this.appealData.proofImg=e.result.urls[0]},submitAppeal:function(){var e=this;this.$http.post("/wallet/app/otc/backmgr/submitAppeal",this.appealData).then(function(t){200==t.code&&(e.getList(),e.$notify({title:"提示",message:"申诉处理成功",type:"success"})),e.showAppeal=!1})},getList:function(){var e=this;this.selectedDate&&2==this.selectedDate.length?(this.filterForm.startDate=this.selectedDate[0],this.filterForm.endDate=this.selectedDate[1]):(this.filterForm.startDate="",this.filterForm.endDate=""),this.$http.post("/wallet/backmgr/merchant/trade/list",this.filterForm).then(function(t){var a=t.result.pageData,l=a.list,r=a.total;l.length<1?e.sumInfo={sumApiStock:"0",sumApiAmount:"0",sumFee:"0"}:e.sumInfo=t.result.sumInfo,e.listData.list=l,e.listData.total=r})},exportExcel:function(){this.selectedDate&&2==this.selectedDate.length?(this.filterForm.startDate=this.selectedDate[0],this.filterForm.endDate=this.selectedDate[1]):(this.filterForm.startDate="",this.filterForm.endDate=""),""==this.filterForm.coinName&&delete this.filterForm.coinName,this.filterForm.token=localStorage.getItem("wallet_token")||"";var e=localStorage.getItem("SERVER_PATH")||window.SERVER_PATH;window.open(e+"/wallet/backmgr/merchant/trade/list/export?"+i.a.stringify(this.filterForm))},showPrompt:function(e){this.selectItem=e,this.amount="",this.dialogVisible=!0},moneyInput:function(){this.amount=this.amount+"",this.amount=this.amount.replace(/^\.$/g,""),this.amount=this.amount.replace(/[^\d.]/g,""),this.amount=this.amount.replace(/\.{2,}/g,"."),this.amount=this.amount.replace(".","$#$").replace(/\./g,"").replace("$#$","."),this.amount=this.amount.replace(/^(\-)*(\d+)\.(\d\d).*$/,"$1$2.$3"),this.amount.indexOf(".")<0&&""!=this.amount&&(this.amount=parseFloat(this.amount))},addNewRecordAdmin:function(){var e=this;this.amount>0?this.$http.post("/wallet/backmgr/merchant/addNewRecordAdmin",{tradeId:this.selectItem.trade_id,amount:this.amount}).then(function(t){e.dialogVisible=!1,e.getList(),e.$notify({title:"成功",message:t.msg,type:"success"})}):this.$notify({title:"提示",message:"请输入金额",type:"error"})},activationLetgo:function(e){var t=this;this.$confirm("放行后订单状态将变为已完成(码商扣币，商户加币)，确认放行？","确认放行订单？",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){t.$http.post("/wallet/backmgr/merchant/activationLetgo",{tradeId:e}).then(function(e){200==e.code&&(t.getList(),t.$notify({title:"成功",message:e.msg,type:"success"}))})}).catch(function(){})},orderActivation:function(e){var t=this;this.$confirm("激活后订单状态将变为已付款待放行，确认激活?","确认激活订单？",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){t.$http.post("/wallet/backmgr/merchant/activation",{tradeId:e.trade_id}).then(function(e){200==e.code&&(t.getList(),t.$notify({title:"成功",message:e.msg,type:"success"}))})}).catch(function(){})},showActiveBtn:function(e){return(new Date).getTime()-e<2592e5},returnApi:function(e){var t=this;this.$http.post("/wallet/backmgr/merchant/returnApi",{tradeId:e.trade_id,userId:e.taker_user_id}).then(function(e){200==e.code&&t.$alert("返回结果："+e.result,{title:"提示",dangerouslyUseHTMLString:!0})})},setDateType:function(){var e=new Date,t=e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate();if(1==this.filterForm.dateType)this.selectedDate=[t,t];else if(2==this.filterForm.dateType){var a=new Date(e-6048e5),l=a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate();this.selectedDate=[l,t]}else if(3==this.filterForm.dateType){e.setMonth(e.getMonth()-1);var r=e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate();this.selectedDate=[r,t]}else if(4==this.filterForm.dateType){e.setMonth(e.getMonth()-3);var n=e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate();this.selectedDate=[n,t]}},search:function(){this.filterForm.pageNum=1,this.getList()},checkLog:function(){this.$router.push({path:"customer-log"})},checkDetails:function(){this.$router.push({path:"complaint-details"})},handleCurrentChange:function(e,t){this.filterForm.pageSize=e,this.filterForm.pageNum=t,this.getList()},download:function(){location.href=SERVER_PATH+"/wallet/app/otc/backmgr/exportExcel?startDate="+this.filterForm.startDate+"&endDate="+this.filterForm.endDate+"&userId="+this.filterForm.userId+"&token="+localStorage.getItem("cus_token")}},computed:r()({},Object(n.b)(["coinInfo"])),activated:function(){this.server_path=localStorage.getItem("SERVER_PATH")||SERVER_PATH,this.selectedDate=Object(s.b)(),this.getList()}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"transaction-details"},[a("el-container",[a("div",{staticClass:"main"},[a("el-collapse",{attrs:{value:"filter"}},[a("el-collapse-item",{attrs:{title:"查询条件",name:"filter"}},[a("el-form",{ref:"filterForm",attrs:{inline:!0,model:e.filterForm,size:"mini","label-width":"80px"}},[a("el-form-item",{staticClass:"dateItem",attrs:{label:"时间:"}},[a("el-date-picker",{attrs:{type:"datetimerange","value-format":"yyyy-MM-dd HH:mm:ss","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:function(t){e.filterForm.dateType=""}},model:{value:e.selectedDate,callback:function(t){e.selectedDate=t},expression:"selectedDate"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"订单号:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入单号"},model:{value:e.filterForm.recdId,callback:function(t){e.$set(e.filterForm,"recdId","string"==typeof t?t.trim():t)},expression:"filterForm.recdId"}})],1),e._v(" "),a("br"),e._v(" "),a("el-form-item",{attrs:{label:"账号/昵称:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入用户账号或昵称"},model:{value:e.filterForm.account,callback:function(t){e.$set(e.filterForm,"account","string"==typeof t?t.trim():t)},expression:"filterForm.account"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"状态:"}},[a("el-select",{model:{value:e.filterForm.status,callback:function(t){e.$set(e.filterForm,"status",t)},expression:"filterForm.status"}},e._l(e.statusList,function(e,t){return a("el-option",{key:t,attrs:{value:e.label,label:e.value}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"币种:"}},[a("el-select",{model:{value:e.filterForm.coinName,callback:function(t){e.$set(e.filterForm,"coinName",t)},expression:"filterForm.coinName"}},[a("el-option",{attrs:{value:"",label:"全部"}}),e._v(" "),e._l(e.coinInfo,function(e,t){return a("el-option",{key:t,attrs:{value:e.coinName,label:e.coinName}})})],2)],1),e._v(" "),a("br"),e._v(" "),a("el-form-item",{attrs:{label:"支付渠道:"}},[a("el-select",{model:{value:e.filterForm.payType,callback:function(t){e.$set(e.filterForm,"payType",t)},expression:"filterForm.payType"}},[a("el-option",{attrs:{value:"",label:"全部"}}),e._v(" "),e._l(e.payTypes,function(e,t){return a("el-option",{key:t,attrs:{value:t,label:e}})})],2)],1),e._v(" "),a("el-form-item",{attrs:{label:"交易类型:"}},[a("el-select",{model:{value:e.filterForm.advType,callback:function(t){e.$set(e.filterForm,"advType",t)},expression:"filterForm.advType"}},e._l(e.transList,function(e,t){return a("el-option",{key:t,attrs:{value:e.label,label:e.value}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"超时筛选:"}},[a("el-select",{model:{value:e.filterForm.timeOut,callback:function(t){e.$set(e.filterForm,"timeOut",t)},expression:"filterForm.timeOut"}},[a("el-option",{attrs:{value:"",label:"所有"}}),e._v(" "),a("el-option",{attrs:{value:"1",label:"已超时"}})],1)],1),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},nativeOn:{click:function(t){return e.search(t)}}},[e._v("搜索")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-document-checked"},nativeOn:{click:function(t){return e.exportExcel(t)}}},[e._v("导出Excel")])],1)],1)],1),e._v(" "),a("el-table",{attrs:{data:e.listData.list,border:"",height:"100%",size:"mini"}},[a("el-table-column",{attrs:{prop:"coin_name",label:"币种",width:"60",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"类型/下单时间",align:"center",width:"140"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("img",{staticStyle:{"vertical-align":"sub",width:"18px"},attrs:{src:"/static/img/paytype/"+t.row.pay_type+".svg",alt:""}}),e._v(" "+e._s(e.advTypeMap[t.row.adv_type])),a("br"),e._v(e._s(e.$fmtDate(t.row.create_time,"full")))]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"商户单号/平台单号",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return a("span",{},[e._v(e._s(t.row.api_trade_id)),a("br"),e._v(e._s(t.row.trade_id))])}}])}),e._v(" "),a("el-table-column",{attrs:{label:"商户昵称/账户",width:"150",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return a("span",{},[e._v(e._s(t.row.taker_nick_name)),a("br"),e._v(e._s(t.row.taker_phone))])}}])}),e._v(" "),a("el-table-column",{attrs:{label:"承兑商昵称/账户",width:"150",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return a("span",{},[e._v(e._s(t.row.nick_name)),a("br"),e._v(e._s(t.row.phone))])}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"tradeTime",label:"状态",width:"120",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e.tradeStatusMap[t.row.trade_status]))]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"价格/数量",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return a("div",{},[a("span",[e._v(e._s(t.row.taker_price))]),a("br"),e._v(" "),a("span",[e._v(e._s(t.row.taker_amount))])])}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"amount",label:"金额",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"api_user_id",label:"appUserId/收银台ip",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return a("div",{},[a("span",[e._v(e._s(t.row.api_user_id))]),a("br"),e._v(" "),a("span",[e._v(e._s(t.row.api_ip))])])}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"fee",label:"手续费",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"price",label:"操作",fixed:"right",align:"center",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.trade_status||2==t.row.trade_status?a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){return e.appealClick(t.row)}}},[e._v("申诉")]):e._e(),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},nativeOn:{click:function(a){return e.$router.push({path:"/merchant/merchantTradingFlowDetaile",query:{tradeId:t.row.trade_id}})}}},[e._v("查看详情")]),e._v(" "),8!=t.row.trade_status&&4!=t.row.trade_status||!e.showActiveBtn(t.row.create_time)?e._e():a("el-button",{attrs:{type:"danger",size:"mini"},nativeOn:{click:function(a){return e.orderActivation(t.row)}}},[e._v("激活订单")]),e._v(" "),2==t.row.trade_status&&1==t.row.isActivation?a("el-button",{attrs:{type:"danger",size:"mini"},nativeOn:{click:function(a){return e.activationLetgo(t.row.trade_id)}}},[e._v("  放   行  ")]):e._e(),e._v(" "),4!=t.row.adv_type&&5!=t.row.adv_type||3!=t.row.trade_status&&6!=t.row.trade_status||3==t.row.trade_type?e._e():a("el-button",{attrs:{type:"warning",size:"mini"},on:{click:function(a){return e.returnApi(t.row)}}},[e._v("异步补发")]),e._v(" "),(4!=t.row.adv_type&&5!=t.row.adv_type||3!=t.row.trade_status&&6!=t.row.trade_status&&7!=t.row.trade_status)&&(3!=t.row.adv_type&&6!=t.row.adv_type||7!=t.row.trade_status)||3==t.row.trade_type?e._e():a("el-button",{attrs:{type:"warning",size:"mini"},on:{click:function(a){return e.showPrompt(t.row)}}},[e._v("手动录单\n\t\t\t\t\t\t\t\t")])]}}])})],1)],1),e._v(" "),a("el-footer",[a("div",{staticClass:"statistics"},[e._v("\n\t\t\t\t\t总数量： "),a("span",[e._v(e._s(e.sumInfo.sumTakerAmount)+" "+e._s(e.$variableCoin))]),e._v("\n\t\t\t\t\t总金额： "),a("span",[e._v(e._s(e.sumInfo.sumAmount)+" CNY")]),e._v("\n\t\t\t\t\t已到账手续费： "),a("span",[e._v(e._s(e.sumInfo.sumFee)+" "+e._s(e.$variableCoin))])]),e._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.filterForm.pageSize,"current-page":e.filterForm.pageNum},on:{handleChange:e.handleCurrentChange}})],1)],1),e._v(" "),a("el-dialog",{staticClass:"EntryPrompt",attrs:{title:"申诉",visible:e.showAppeal,width:"460px"},on:{"update:visible":function(t){e.showAppeal=t}}},[a("el-form",{ref:"appealData",attrs:{"label-width":"80px",size:"mini"}},[a("el-form-item",{attrs:{label:"申诉人:"}},[a("el-select",{model:{value:e.appealData.userId,callback:function(t){e.$set(e.appealData,"userId",t)},expression:"appealData.userId"}},e._l(e.appealList,function(e,t){return a("el-option",{key:t,attrs:{value:e.value,label:e.label}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"申诉理由:"}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.appealData.proofTxt,callback:function(t){e.$set(e.appealData,"proofTxt",t)},expression:"appealData.proofTxt"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"上传图片:"}},[e.appealData.proofImg?a("div",{staticClass:"selectImg"},[a("img",{attrs:{src:e.appealData.proofImg}}),e._v(" "),a("span",{on:{click:function(t){e.appealData.proofImg=""}}},[e._v("删除")])]):a("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.server_path+"wallet/backmgr/uploadFile",name:"files","list-type":"picture-card",data:{type:"img",token:e.token},"show-file-list":!1,"on-success":e.upload}},[a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),e._v(" "),a("div",{staticClass:"btns"},[a("el-button",{attrs:{size:"mini"},on:{click:function(t){e.showAppeal=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.submitAppeal}},[e._v("提交申诉")])],1)],1),e._v(" "),a("el-dialog",{staticClass:"EntryPrompt",attrs:{title:"确定手动录单？",visible:e.dialogVisible,width:"420px"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("p",[e._v("录单成功将生成一笔订单状态为完成的单，确认录单？")]),e._v(" "),a("el-form",{ref:"form",attrs:{"label-width":"55px",size:"mini"}},[a("el-form-item",{attrs:{label:"金额："}},[a("el-input",{on:{input:e.moneyInput},model:{value:e.amount,callback:function(t){e.amount="string"==typeof t?t.trim():t},expression:"amount"}},[a("template",{slot:"append"},[e._v("CNY")])],2)],1)],1),e._v(" "),a("p",[e._v("其他信息同订单号："+e._s(e.selectItem.trade_id))]),e._v(" "),a("div",{staticClass:"btns"},[a("el-button",{attrs:{size:"mini"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.addNewRecordAdmin}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var c=a("C7Lr")(u,d,!1,function(e){a("gKtw")},"data-v-65024c99",null);t.default=c.exports},gKtw:function(e,t){throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: Cannot find module 'tslib'\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:594:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:520:25)\n    at Module.require (internal/modules/cjs/loader.js:650:17)\n    at require (internal/modules/cjs/helpers.js:20:18)\n    at Object.<anonymous> (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_less@3.11.0@less\\dist\\less.cjs.js:3:13)\n    at Module._compile (internal/modules/cjs/loader.js:702:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)\n    at Module.load (internal/modules/cjs/loader.js:612:32)\n    at tryModuleLoad (internal/modules/cjs/loader.js:551:12)\n    at Function.Module._load (internal/modules/cjs/loader.js:543:3)\n    at Module.require (internal/modules/cjs/loader.js:650:17)\n    at require (internal/modules/cjs/helpers.js:20:18)\n    at Object.<anonymous> (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_less@3.11.0@less\\index.js:1:80)\n    at Module._compile (internal/modules/cjs/loader.js:702:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)\n    at Module.load (internal/modules/cjs/loader.js:612:32)\n    at runLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:195:19)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:367:11\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:172:11\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:32:11)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:165:10)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:176:18\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:47:3)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:165:10)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:176:18\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:47:3)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at runLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:365:2)\n    at NormalModule.doBuild (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:182:3)\n    at NormalModule.build (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:275:15)")}});