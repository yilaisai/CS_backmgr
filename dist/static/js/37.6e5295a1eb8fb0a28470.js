webpackJsonp([37],{Hanr:function(t,e){},mQl1:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("Dd8w"),l=a.n(i),s=a("NYxO"),n=a("EaCm"),r=(a("s0MJ"),a("mw3O")),o=a.n(r),c={data:function(){return{baseUrl:"",filterForm:{status:"1",batchOuttype:"",recdId:"",phoneOrNick:"",startDate:"",endDate:"",pageNum:1,pageSize:20},batchOutType:"",bankStencilPlate:"",selectedDate:[],typeList:[{label:"派单兑入",value:5},{label:"派单兑出",value:6},{label:"抢单兑入",value:4},{label:"抢单兑出",value:3}],listData:{total:null,list:[]},dialogVisible:!1,dialogVisible2:!1,currentItem:{},reason:"",matchResultMap:n.e,sumInfo:{sumApiStock:"--",sumApiAmount:"--",sumFee:"--"},multipleSelection:[]}},activated:function(){this.getCashoutAuditList(),this.baseUrl=localStorage.getItem("SERVER_PATH")||window.SERVER_PATH||window.SERVER_PATH2},methods:{handleSelectionChange:function(t){this.multipleSelection=t},getCashoutAuditList:function(){var t=this;this.selectedDate&&2==this.selectedDate.length?(this.filterForm.startDate=this.selectedDate[0],this.filterForm.endDate=this.selectedDate[1]):(this.filterForm.startDate=null,this.filterForm.endDate=null),this.$http.post("/wallet/app/otc/backmgr/batchOut/mgrQueryBatchOutList",this.filterForm).then(function(e){var a=e.result.pageData,i=a.list,l=a.total;t.listData.list=i,t.listData.total=l,i.length<1?t.sumInfo={sumApiStock:"0",sumApiAmount:"0",sumFee:"0"}:t.sumInfo=e.result.map})},exportExcel:function(){this.selectedDate&&2==this.selectedDate.length?(this.filterForm.startDate=this.selectedDate[0],this.filterForm.endDate=this.selectedDate[1]):(this.$delete(this.filterForm,"startDate"),this.$delete(this.filterForm,"endDate")),this.filterForm.token=localStorage.getItem("wallet_token")||"",window.open(this.baseUrl+"/wallet/app/otc/backmgr/batchOut/queryBatchOutList/export?"+o.a.stringify(this.filterForm))},exportExcel2:function(t,e){var a={redisKey:t,type:e,token:localStorage.getItem("wallet_token")||""};window.open(this.baseUrl+"wallet/app/otc/backmgr/batchOut/manualExcle?"+o.a.stringify(a))},search:function(){this.filterForm.pageNum=1,this.getCashoutAuditList()},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.filterForm.pageNum=e,this.getCashoutAuditList()},open:function(t){this.currentItem=t||"",this.reason="",this.dialogVisible=!0},ConfirmPaymentMethod:function(t){var e=this,a=this.multipleSelection;t?(a=t,this.currentItem=t):this.currentItem="";var i=!1;a.forEach(function(t){6!=t.status&&4!=t.status||(i=!0)}),i?this.$confirm("你所购选订单包含已确认代付过的订单，确定再次确认？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.dialogVisible2=!0,e.batchOutType="",e.bankStencilPlate=""}):(this.dialogVisible2=!0,this.batchOutType="",this.bankStencilPlate="")},chooseBatchOutList:function(){var t=this;if(""!=this.batchOutType)if("MANUAL"!=this.batchOutType||""!=this.bankStencilPlate){var e=this.multipleSelection;this.currentItem.length>0&&(e=this.currentItem);var a=[];e.forEach(function(t){a.push(t.recdId)}),this.$http.post("/wallet/app/otc/backmgr/batchOut/chooseBatchOutList",{batchOutType:this.batchOutType,recdIdlist:a,postDataType:"Bean"}).then(function(e){t.dialogVisible2=!1,t.getCashoutAuditList(),t.$message({type:"success",message:e.msg}),"MANUAL"==t.batchOutType&&t.exportExcel2(e.result,t.bankStencilPlate)}).catch(function(e){t.dialogVisible2=!1})}else this.$message({type:"error",message:"请选择银行模版"});else this.$message({type:"error",message:"请选择代付方式"})},ConfirmPayment:function(t){var e=this,a=this.multipleSelection;t?(a=t,this.currentItem=t):this.currentItem="";var i=!1;a.forEach(function(t){6!=t.status&&3!=t.status||(i=!0)}),i?this.$confirm("你所勾选订单包含待确认、待第三方确认的订单，此操作将跳过这些订单，继续确认付款请按确定按钮？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.confirmBatchOutList()}):this.confirmBatchOutList()},confirmBatchOutList:function(){var t=this,e=this.multipleSelection;this.currentItem.length>0&&(e=this.currentItem);var a=[];e.forEach(function(t){a.push(t.recdId)}),this.$http.post("/wallet/app/otc/backmgr/batchOut/confirmBatchOutList",{recdIdlist:a,manualOrThird:1,postDataType:"Bean"}).then(function(e){t.getCashoutAuditList(),t.$message({type:"success",message:e.msg})}).catch(function(t){})},auditBatchOutList:function(t){var e=this,a=this.multipleSelection;this.currentItem.length>0&&(a=this.currentItem);var i=[];a.forEach(function(t){i.push(t.recdId)}),this.$http.post("/wallet/app/otc/backmgr/batchOut/auditBatchOutList",{recdIdlist:i,remauditCommentark:this.reason,auditStatus:t,postDataType:"Bean"}).then(function(t){e.dialogVisible=!1,e.getCashoutAuditList(),e.$message({type:"success",message:t.msg})}).catch(function(t){e.dialogVisible=!1})}},computed:l()({},Object(s.b)(["coinInfo"]))},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cashOutVerify-page"},[a("el-collapse",{attrs:{value:"filter"}},[a("el-collapse-item",{attrs:{title:"查询条件",name:"filter"}},[a("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"86px",size:"mini",model:t.filterForm}},[a("el-form-item",{staticClass:"dateItem",attrs:{label:"时间:"}},[a("el-date-picker",{attrs:{type:"datetimerange","value-format":"yyyy-MM-dd HH:mm:ss","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.selectedDate,callback:function(e){t.selectedDate=e},expression:"selectedDate"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"账号/昵称:"}},[a("el-input",{attrs:{placeholder:"请输入用户账号/昵称"},model:{value:t.filterForm.phoneOrNick,callback:function(e){t.$set(t.filterForm,"phoneOrNick",e)},expression:"filterForm.phoneOrNick"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"订单号:"}},[a("el-input",{attrs:{placeholder:"请输入订单号"},model:{value:t.filterForm.recdId,callback:function(e){t.$set(t.filterForm,"recdId",e)},expression:"filterForm.recdId"}})],1),t._v(" "),a("el-button",{staticClass:"btn",staticStyle:{"margin-left":"20px"},attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.search()}}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-document-checked"},nativeOn:{click:function(e){return t.exportExcel(e)}}},[t._v("导出Excel")])],1)],1)],1),t._v(" "),a("div",{staticClass:"tabBox"},[a("el-tabs",{on:{"tab-click":t.getCashoutAuditList},model:{value:t.filterForm.status,callback:function(e){t.$set(t.filterForm,"status",e)},expression:"filterForm.status"}},[a("el-tab-pane",{attrs:{label:"待审核",name:"1"}}),t._v(" "),a("el-tab-pane",{attrs:{label:"待确认",name:"3"}})],1),t._v(" "),1==t.filterForm.status?a("div",[a("el-button",{staticClass:"btn",staticStyle:{margin:"0px","margin-left":"20px"},attrs:{type:"primary",disabled:0==t.multipleSelection.length,size:"mini"},on:{click:function(e){return t.open()}}},[t._v("选中单审核")])],1):t._e(),t._v(" "),3==t.filterForm.status?a("div",[a("el-button",{staticClass:"btn",staticStyle:{margin:"0px","margin-left":"20px"},attrs:{type:"primary",disabled:0==t.multipleSelection.length,size:"mini"},on:{click:function(e){return t.ConfirmPaymentMethod()}}},[t._v("选中单确定代付")]),t._v(" "),a("el-button",{staticClass:"btn",staticStyle:{margin:"0px","margin-left":"20px"},attrs:{type:"primary",disabled:0==t.multipleSelection.length,size:"mini"},on:{click:function(e){return t.ConfirmPayment()}}},[t._v("选中单确认付款")])],1):t._e()],1),t._v(" "),a("el-table",{attrs:{height:"auto",size:"mini",border:"",data:t.listData.list},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",align:"center",width:"55"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"coinName",width:"80",label:"币种"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"类型",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[t._v(" "+t._s(e.row.type)+" ")])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"单号/发起时间",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.recdId)),a("br"),t._v(t._s(t.$fmtDate(e.row.createTime,"full")))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"批次号",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.batchNum))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"商户昵称/账户",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.nickName)),a("br"),t._v(t._s(e.row.phone))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"状态",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t\t"+t._s(e.row.statusName)+"\n\t\t\t\t")]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"代付方式",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[t._v(" "+t._s(e.row.newStatusName)+" ")])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"价格/数量"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{staticClass:"price"},[a("p",[t._v("价格:"),a("span",[t._v(t._s(e.row.price))]),t._v(" CNY/"+t._s(e.row.coinName))]),t._v(" "),a("p",[t._v("数量:"),a("span",[t._v(t._s(e.row.amount))]),t._v(" "+t._s(e.row.coinName))])])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"金额",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{staticClass:"price"},[a("p",[a("span",[t._v(t._s(e.row.money))]),t._v(" CNY")])])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"手续费"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{staticClass:"price"},[a("p",[a("span",[t._v(t._s(e.row.fee))]),t._v("  "+t._s(e.row.coinName))])])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"收款人"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{staticClass:"price"},[a("p",[t._v(" "+t._s(e.row.bankUserName))])])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"银行/银行支行"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{staticClass:"price"},[a("p",[t._v(t._s(e.row.bankName)+" "),a("br"),t._v("  "+t._s(e.row.bankBranch||"--"))])])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"银行卡号"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{staticClass:"price"},[a("p",[a("span",[t._v(t._s(e.row.bankCardId))])])])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",fixed:"right",width:3==t.filterForm.status?"150":"70"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==t.filterForm.status?a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){return t.open([e.row])}}},[t._v("审核")]):t._e(),t._v(" "),3==t.filterForm.status?a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){return t.ConfirmPaymentMethod([e.row])}}},[t._v("确定代付")]):t._e(),t._v(" "),3==t.filterForm.status?a("el-button",{directives:[{name:"show",rawName:"v-show",value:4==e.row.status||6==e.row.status,expression:"scope.row.status==4||scope.row.status==6"}],attrs:{size:"mini",type:"text"},on:{click:function(a){return t.ConfirmPayment([e.row])}}},[t._v("确认付款")]):t._e()]}}])})],1),t._v(" "),a("div",{staticClass:"load-more"},[a("div",{staticClass:"count"},[t._v("\n\t\t\t\t总数量： "),a("span",[t._v(t._s(t.sumInfo.sumAmount)+" "+t._s(t.$variableCoin))]),t._v("\n\t\t\t\t总金额： "),a("span",[t._v(t._s(t.sumInfo.sumMoney)+" CNY")]),t._v("\n\t\t\t\t总手续费： "),a("span",[t._v(t._s(t.sumInfo.sumFee)+" "+t._s(t.$variableCoin))])]),t._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"pager-count":5,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}})],1),t._v(" "),a("el-dialog",{attrs:{title:"是否通过审核？",visible:t.dialogVisible,width:"400px"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入审核意见"},model:{value:t.reason,callback:function(e){t.reason=e},expression:"reason"}}),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"danger"},on:{click:function(e){return t.auditBatchOutList(2)}}},[t._v("不通过")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.auditBatchOutList(1)}}},[t._v("通 过")])],1)],1),t._v(" "),a("el-dialog",{attrs:{visible:t.dialogVisible2,width:"400px"},on:{"update:visible":function(e){t.dialogVisible2=e}}},[a("el-form",{attrs:{"label-width":"130px"}},[a("el-form-item",{attrs:{label:"选择代付方式:",prop:"type"}},[a("el-select",{attrs:{placeholder:"请选择代付方式"},model:{value:t.batchOutType,callback:function(e){t.batchOutType=e},expression:"batchOutType"}},[a("el-option",{attrs:{label:"手动",value:"MANUAL"}}),t._v(" "),a("el-option",{attrs:{label:"第三方",value:"THIRD_ONE"}})],1)],1),t._v(" "),a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:"MANUAL"==t.batchOutType,expression:"batchOutType=='MANUAL'"}],attrs:{label:"选择银行模板:",prop:"type"}},[a("el-select",{attrs:{placeholder:"选择银行模板"},model:{value:t.bankStencilPlate,callback:function(e){t.bankStencilPlate=e},expression:"bankStencilPlate"}},[a("el-option",{attrs:{label:"包网",value:"XINGYE"}})],1)],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"danger"},on:{click:function(e){t.dialogVisible2=!1}}},[t._v("关闭")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.chooseBatchOutList()}}},[t._v("确定")])],1)],1)],1)},staticRenderFns:[]};var m=a("VU/8")(c,u,!1,function(t){a("Hanr")},"data-v-aa27ddb4",null);e.default=m.exports}});