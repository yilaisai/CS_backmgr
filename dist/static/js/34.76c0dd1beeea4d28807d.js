webpackJsonp([34],{bZgh:function(t,e){},uym6:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("4YfN"),i=a.n(l),r=a("48sp"),s=a("CtzY"),o=a.n(s),n=a("s0MJ"),c={name:"transaction-details",data:function(){return{dialogVisible:!1,showAppeal:!1,appealData:{appealType:"4",proofTxt:"",proofImg:"",tradeId:""},selectItem:{trade_id:""},amount:"",selectedDate:[],currentPage:1,filterForm:{pageNum:1,account:"",pageSize:20,startDate:"",endDate:"",coinName:"",trade_status:"",status:"",tradeType:"3",advType:"",dateType:"1",timeOut:"2",recdId:"",payType:""},advTypeMap:{1:"在线出售",2:"在线求购",3:"抢单兑出",4:"抢单兑入",5:"派单兑入",6:"派单兑出"},tradeTypeList:[{value:"全部",label:""},{value:"派单",label:"0"},{value:"抢单",label:"1"}],appealList:[{value:"0",label:"买方"},{value:"1",label:"卖方"}],statusList:[{value:"全部",label:""},{value:"未付款",label:"1"},{value:"已付款(待放行)",label:"2"},{value:"已完成",label:"3"},{value:"已取消",label:"4"},{value:"申诉中",label:"5"},{value:"申诉后完成交易",label:"6"},{value:"申诉后取消交易",label:"7"},{value:"超时取消",label:"8"}],transList:[{value:"所有",label:""},{value:"抢单兑出",label:"3"},{value:"抢单兑入",label:"4"},{value:"派单兑入",label:"5"},{value:"派单兑出",label:"6"}],tradeStatusMap:{1:"未付款",2:"待放行",3:"已完成",4:"已取消",5:"申诉中",6:"申诉后完成交易",7:"申诉后取消交易",8:"超时取消"},dateList:[{value:"今天",label:"1"},{value:"一周",label:"2"},{value:"一个月",label:"3"},{value:"三个月",label:"4"}],listData:{total:null,list:[]},sumInfo:{sumTakerAmount:"--",sumAmount:"--",sumFee:"--"},statistics:{},payTypes:{1:"银行卡",2:"支付宝",3:"微信"},server_path:"",token:localStorage.getItem("wallet_token"),options:{inline:!1,button:!1,navbar:!1,title:!1,toolbar:!1,tooltip:!1,movable:!0,zoomable:!0,rotatable:!0,scalable:!1,transition:!0,fullscreen:!0,keyboard:!0,url:"data-source"}}},methods:{appealClick:function(t){this.appealData.tradeId=t.trade_id,this.appealData.proofTxt="",this.appealData.proofImg="",this.appealList=[{value:t.taker_user_id,label:"商户:"+t.taker_nick_name},{value:t.maker_user_id,label:"码商:"+t.nick_name}],this.showAppeal=!0},upload:function(t,e,a){this.appealData.proofImg=t.result.urls[0]},submitAppeal:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/submitAppeal",this.appealData).then(function(e){200==e.code&&(t.getList(),t.$notify({title:"提示",message:"申诉处理成功",type:"success"})),t.showAppeal=!1})},getList:function(){var t=this;this.selectedDate&&2==this.selectedDate.length?(this.filterForm.startDate=this.selectedDate[0],this.filterForm.endDate=this.selectedDate[1]):(this.filterForm.startDate="",this.filterForm.endDate=""),this.$http.post("/wallet/backmgr/merchant/trade/list",this.filterForm).then(function(e){var a=e.result.pageData,l=a.list,i=a.total;l.length<1?t.sumInfo={sumApiStock:"0",sumApiAmount:"0",sumFee:"0"}:t.sumInfo=e.result.sumInfo,t.listData.list=l,t.listData.total=i})},exportExcel:function(){this.selectedDate&&2==this.selectedDate.length?(this.filterForm.startDate=this.selectedDate[0],this.filterForm.endDate=this.selectedDate[1]):(this.filterForm.startDate="",this.filterForm.endDate=""),""==this.filterForm.coinName&&delete this.filterForm.coinName,this.filterForm.token=localStorage.getItem("wallet_token")||"";var t=localStorage.getItem("SERVER_PATH")||window.SERVER_PATH;window.open(t+"/wallet/backmgr/merchant/trade/list/export?"+o.a.stringify(this.filterForm))},showPrompt:function(t){this.selectItem=t,this.amount="",this.dialogVisible=!0},moneyInput:function(){this.amount=this.amount+"",this.amount=this.amount.replace(/^\.$/g,""),this.amount=this.amount.replace(/[^\d.]/g,""),this.amount=this.amount.replace(/\.{2,}/g,"."),this.amount=this.amount.replace(".","$#$").replace(/\./g,"").replace("$#$","."),this.amount=this.amount.replace(/^(\-)*(\d+)\.(\d\d).*$/,"$1$2.$3"),this.amount.indexOf(".")<0&&""!=this.amount&&(this.amount=parseFloat(this.amount))},addNewRecordAdmin:function(){var t=this;this.amount>0?this.$http.post("/wallet/backmgr/merchant/addNewRecordAdmin",{tradeId:this.selectItem.trade_id,amount:this.amount}).then(function(e){t.dialogVisible=!1,t.getList(),t.$notify({title:"成功",message:e.msg,type:"success"})}):this.$notify({title:"提示",message:"请输入金额",type:"error"})},activationLetgo:function(t){var e=this;this.$confirm("放行后订单状态将变为已完成(码商扣币，商户加币)，确认放行？","确认放行订单？",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){e.$http.post("/wallet/backmgr/merchant/activationLetgo",{tradeId:t}).then(function(t){200==t.code&&(e.getList(),e.$notify({title:"成功",message:t.msg,type:"success"}))})}).catch(function(){})},orderActivation:function(t){var e=this;this.$confirm("激活后订单状态将变为已付款待放行，确认激活?","确认激活订单？",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){e.$http.post("/wallet/backmgr/merchant/activation",{tradeId:t.trade_id}).then(function(t){200==t.code&&(e.getList(),e.$notify({title:"成功",message:t.msg,type:"success"}))})}).catch(function(){})},showActiveBtn:function(t){return(new Date).getTime()-t<2592e5},returnApi:function(t){var e=this;this.$http.post("/wallet/backmgr/merchant/returnApi",{tradeId:t.trade_id,userId:t.taker_user_id}).then(function(t){200==t.code&&e.$alert("返回结果："+t.result,{title:"提示",dangerouslyUseHTMLString:!0})})},setDateType:function(){var t=new Date,e=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();if(1==this.filterForm.dateType)this.selectedDate=[e,e];else if(2==this.filterForm.dateType){var a=new Date(t-6048e5),l=a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate();this.selectedDate=[l,e]}else if(3==this.filterForm.dateType){t.setMonth(t.getMonth()-1);var i=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();this.selectedDate=[i,e]}else if(4==this.filterForm.dateType){t.setMonth(t.getMonth()-3);var r=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();this.selectedDate=[r,e]}},search:function(){this.filterForm.pageNum=1,this.getList()},checkLog:function(){this.$router.push({path:"customer-log"})},checkDetails:function(){this.$router.push({path:"complaint-details"})},handleCurrentChange:function(t,e){this.filterForm.pageSize=t,this.filterForm.pageNum=e,this.getList()},download:function(){location.href=SERVER_PATH+"/wallet/app/otc/backmgr/exportExcel?startDate="+this.filterForm.startDate+"&endDate="+this.filterForm.endDate+"&userId="+this.filterForm.userId+"&token="+localStorage.getItem("cus_token")},goComplaint:function(t){this.$router.push({name:"complaintDetails",query:{tradeId:t.trade_id}})}},computed:i()({},Object(r.b)(["coinInfo"])),activated:function(){this.server_path=localStorage.getItem("SERVER_PATH")||SERVER_PATH,this.selectedDate=Object(n.b)(),this.getList()}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"transaction-details"},[a("el-container",[a("div",{staticClass:"main"},[a("el-collapse",{attrs:{value:"filter"}},[a("el-collapse-item",{attrs:{title:"查询条件",name:"filter"}},[a("el-form",{ref:"filterForm",attrs:{inline:!0,model:t.filterForm,size:"mini","label-width":"105px"}},[a("el-form-item",{staticClass:"dateItem",attrs:{label:"时间:"}},[a("el-date-picker",{attrs:{type:"datetimerange","value-format":"yyyy-MM-dd HH:mm:ss","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:function(e){t.filterForm.dateType=""}},model:{value:t.selectedDate,callback:function(e){t.selectedDate=e},expression:"selectedDate"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"订单号:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入单号"},model:{value:t.filterForm.recdId,callback:function(e){t.$set(t.filterForm,"recdId","string"==typeof e?e.trim():e)},expression:"filterForm.recdId"}})],1),t._v(" "),a("br"),t._v(" "),a("el-form-item",{attrs:{label:"账号/用户编号:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入用户账号或用户编号"},model:{value:t.filterForm.account,callback:function(e){t.$set(t.filterForm,"account","string"==typeof e?e.trim():e)},expression:"filterForm.account"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"状态:"}},[a("el-select",{model:{value:t.filterForm.status,callback:function(e){t.$set(t.filterForm,"status",e)},expression:"filterForm.status"}},t._l(t.statusList,function(t,e){return a("el-option",{key:e,attrs:{value:t.label,label:t.value}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"币种:"}},[a("el-select",{model:{value:t.filterForm.coinName,callback:function(e){t.$set(t.filterForm,"coinName",e)},expression:"filterForm.coinName"}},[a("el-option",{attrs:{value:"",label:"全部"}}),t._v(" "),t._l(t.coinInfo,function(t,e){return a("el-option",{key:e,attrs:{value:t.coinName,label:t.coinName}})})],2)],1),t._v(" "),a("br"),t._v(" "),a("el-form-item",{attrs:{label:"支付渠道:"}},[a("el-select",{model:{value:t.filterForm.payType,callback:function(e){t.$set(t.filterForm,"payType",e)},expression:"filterForm.payType"}},[a("el-option",{attrs:{value:"",label:"全部"}}),t._v(" "),t._l(t.payTypes,function(t,e){return a("el-option",{key:e,attrs:{value:e,label:t}})})],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"交易类型:"}},[a("el-select",{model:{value:t.filterForm.advType,callback:function(e){t.$set(t.filterForm,"advType",e)},expression:"filterForm.advType"}},t._l(t.transList,function(t,e){return a("el-option",{key:e,attrs:{value:t.label,label:t.value}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"超时筛选:"}},[a("el-select",{model:{value:t.filterForm.timeOut,callback:function(e){t.$set(t.filterForm,"timeOut",e)},expression:"filterForm.timeOut"}},[a("el-option",{attrs:{value:"",label:"所有"}}),t._v(" "),a("el-option",{attrs:{value:"1",label:"已超时"}}),t._v(" "),a("el-option",{attrs:{value:"2",label:"进行中"}}),t._v(" "),a("el-option",{attrs:{value:"3",label:"已结束"}})],1)],1),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},nativeOn:{click:function(e){return t.search(e)}}},[t._v("搜索")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-document-checked"},nativeOn:{click:function(e){return t.exportExcel(e)}}},[t._v("导出Excel")])],1)],1)],1),t._v(" "),a("el-table",{attrs:{data:t.listData.list,border:"",height:"100%",size:"mini"}},[a("el-table-column",{attrs:{prop:"coin_name",label:"币种",width:"60",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"类型/下单时间",align:"center",width:"140"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("img",{staticStyle:{"vertical-align":"sub",width:"18px"},attrs:{src:"/static/img/paytype/"+e.row.pay_type+".svg",alt:""}}),t._v(" "+t._s(t.advTypeMap[e.row.adv_type])),a("br"),t._v(t._s(t.$fmtDate(e.row.create_time,"full")))]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"商户单号/平台单号",width:"180",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{},[t._v(t._s(e.row.api_trade_id)),a("br"),t._v(t._s(e.row.trade_id))])}}])}),t._v(" "),a("el-table-column",{attrs:{label:"商户用户编号/账户",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{},[t._v(t._s(e.row.taker_nick_name)),a("br"),t._v(t._s(e.row.taker_phone))])}}])}),t._v(" "),a("el-table-column",{attrs:{label:"承兑商用户编号/账户",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{},[t._v(t._s(e.row.nick_name)),a("br"),t._v(t._s(e.row.phone))])}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"tradeTime",label:"状态",width:"120",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.tradeStatusMap[e.row.trade_status]))]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"价格/数量",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[a("span",[t._v(t._s(e.row.taker_price))]),a("br"),t._v(" "),a("span",[t._v(t._s(e.row.taker_amount))])])}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"amount",label:"金额",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"api_user_id",label:"appUserId/收银台ip",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[a("span",[t._v(t._s(e.row.api_user_id))]),a("br"),t._v(" "),a("span",[t._v(t._s(e.row.api_ip))])])}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"fee",label:"手续费",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"payment_name",label:"付款人",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"fee",label:"付款凭证",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return e.row.payment_photo?a("div",{staticClass:"imgBox"},[a("el-image",{attrs:{src:e.row.payment_photo?e.row.payment_photo.split(",")[0]:"","preview-src-list":e.row.payment_photo?e.row.payment_photo.split(","):[]}}),t._v(" "),a("i",[t._v(t._s(e.row.payment_photo.split(",").length))])],1):t._e()}}],null,!0)}),t._v(" "),a("el-table-column",{attrs:{prop:"price",label:"操作",fixed:"right",align:"center",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.trade_status||2==e.row.trade_status?a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){return t.appealClick(e.row)}}},[t._v("申诉")]):t._e(),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},nativeOn:{click:function(a){return t.$router.push({path:"/merchant/merchantTradingFlowDetaile",query:{tradeId:e.row.trade_id}})}}},[t._v("查看详情")]),t._v(" "),5!=e.row.trade_status||4!=e.row.adv_type&&5!=e.row.adv_type?t._e():a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return t.goComplaint(e.row)}}},[t._v("处理")]),t._v(" "),8!=e.row.trade_status&&4!=e.row.trade_status||!t.showActiveBtn(e.row.create_time)?t._e():a("el-button",{attrs:{type:"danger",size:"mini"},nativeOn:{click:function(a){return t.orderActivation(e.row)}}},[t._v("激活订单")]),t._v(" "),2==e.row.trade_status&&1==e.row.isActivation?a("el-button",{attrs:{type:"danger",size:"mini"},nativeOn:{click:function(a){return t.activationLetgo(e.row.trade_id)}}},[t._v("  放   行  ")]):t._e(),t._v(" "),4!=e.row.adv_type&&5!=e.row.adv_type||3!=e.row.trade_status&&6!=e.row.trade_status||3==e.row.trade_type?t._e():a("el-button",{attrs:{type:"warning",size:"mini"},on:{click:function(a){return t.returnApi(e.row)}}},[t._v("异步补发")])]}}])})],1)],1),t._v(" "),a("el-footer",[a("div",{staticClass:"statistics"},[t._v("\n\t\t\t\t\t总数量： "),a("span",[t._v(t._s(t.sumInfo.sumTakerAmount)+" "+t._s(t.$variableCoin))]),t._v("\n\t\t\t\t\t总金额： "),a("span",[t._v(t._s(t.sumInfo.sumAmount)+" CNY")]),t._v("\n\t\t\t\t\t已到账手续费： "),a("span",[t._v(t._s(t.sumInfo.sumFee)+" "+t._s(t.$variableCoin))])]),t._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.handleCurrentChange}})],1)],1),t._v(" "),a("el-dialog",{staticClass:"EntryPrompt",attrs:{title:"申诉",visible:t.showAppeal,width:"460px"},on:{"update:visible":function(e){t.showAppeal=e}}},[a("el-form",{ref:"appealData",attrs:{"label-width":"80px",size:"mini"}},[a("el-form-item",{attrs:{label:"申诉人:"}},[a("el-select",{model:{value:t.appealData.userId,callback:function(e){t.$set(t.appealData,"userId",e)},expression:"appealData.userId"}},t._l(t.appealList,function(t,e){return a("el-option",{key:e,attrs:{value:t.value,label:t.label}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"申诉理由:"}},[a("el-input",{attrs:{type:"textarea"},model:{value:t.appealData.proofTxt,callback:function(e){t.$set(t.appealData,"proofTxt",e)},expression:"appealData.proofTxt"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"上传图片:"}},[t.appealData.proofImg?a("div",{staticClass:"selectImg"},[a("img",{attrs:{src:t.appealData.proofImg}}),t._v(" "),a("span",{on:{click:function(e){t.appealData.proofImg=""}}},[t._v("删除")])]):a("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.server_path+"wallet/backmgr/uploadFile",name:"files","list-type":"picture-card",data:{type:"img",token:t.token},"show-file-list":!1,"on-success":t.upload}},[a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),t._v(" "),a("div",{staticClass:"btns"},[a("el-button",{attrs:{size:"mini"},on:{click:function(e){t.showAppeal=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.submitAppeal}},[t._v("提交申诉")])],1)],1),t._v(" "),a("el-dialog",{staticClass:"EntryPrompt",attrs:{title:"确定手动录单？",visible:t.dialogVisible,width:"420px"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("p",[t._v("录单成功将生成一笔订单状态为完成的单，确认录单？")]),t._v(" "),a("el-form",{ref:"form",attrs:{"label-width":"55px",size:"mini"}},[a("el-form-item",{attrs:{label:"金额："}},[a("el-input",{on:{input:t.moneyInput},model:{value:t.amount,callback:function(e){t.amount="string"==typeof e?e.trim():e},expression:"amount"}},[a("template",{slot:"append"},[t._v("CNY")])],2)],1)],1),t._v(" "),a("p",[t._v("其他信息同订单号："+t._s(t.selectItem.trade_id))]),t._v(" "),a("div",{staticClass:"btns"},[a("el-button",{attrs:{size:"mini"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.addNewRecordAdmin}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var p=a("C7Lr")(c,u,!1,function(t){a("bZgh")},"data-v-726f74e9",null);e.default=p.exports}});