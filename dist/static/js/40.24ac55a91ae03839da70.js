webpackJsonp([40],{PEe0:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("4YfN"),s=a.n(i),l=a("48sp"),r=a("EaCm"),n=a("s0MJ"),o=a("CtzY"),c=a.n(o),u={data:function(){return{filterForm:{coinName:this.$variableCoin,advType:"",apiOrderId:"",phoneOrEmail:"",startDate:"",endDate:"",pageNum:1,pageSize:20,matchResult:""},selectedDate:[],typeList:[{label:"派单兑入",value:5},{label:"派单兑出",value:6},{label:"抢单兑入",value:4},{label:"抢单兑出",value:3}],listData:{total:null,list:[]},dialogVisible:!1,dialogVisible2:!1,dialogVisible3:!1,currentItem:{},reason:"",matchResultMap:r.d,sumInfo:{sumApiStock:"--",sumApiAmount:"--",sumFee:"--"},tabs:0,selectList:[],loading:!1}},activated:function(){this.$route.query.status&&(this.tabs=this.$route.query.status,this.chooseTabs()),this.$route.query.advType&&this.$route.query.matchResult&&(this.filterForm.advType=this.$route.query.advType,this.filterForm.matchResult=this.$route.query.matchResult),this.selectedDate=Object(n.b)(),this.$route.query.advType&&this.$route.query.matchResult&&(this.filterForm.advType=this.$route.query.advType,this.filterForm.matchResult=this.$route.query.matchResult,this.selectedDate=[]),this.getCashoutAuditList()},methods:{getCashoutAuditList:function(){var t=this;this.selectedDate&&2==this.selectedDate.length?(this.filterForm.startDate=this.selectedDate[0],this.filterForm.endDate=this.selectedDate[1]):(this.filterForm.startDate=null,this.filterForm.endDate=null),this.$http.post("/wallet/backmgr/merchant/getCashoutAuditList",this.filterForm).then(function(e){var a=e.result.pageInfo,i=a.list,s=a.total;t.listData.list=i,t.listData.total=s,i.length<1?t.sumInfo={sumApiStock:"0",sumApiAmount:"0",sumFee:"0"}:t.sumInfo=e.result.sumInfo})},exportExcel:function(){this.selectedDate&&2==this.selectedDate.length&&(this.filterForm.startDate=this.selectedDate[0],this.filterForm.endDate=this.selectedDate[1]),this.filterForm.token=localStorage.getItem("wallet_token")||"";var t=localStorage.getItem("SERVER_PATH")||window.SERVER_PATH;window.open(t+"/wallet/backmgr/merchant/getCashoutAuditList/export?"+c.a.stringify(this.filterForm))},search:function(){this.filterForm.pageNum=1,this.getCashoutAuditList()},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.filterForm.pageNum=e,this.getCashoutAuditList()},open:function(t){this.currentItem=t,this.reason="",this.dialogVisible=!0},close:function(t){this.currentItem=t,this.reason="",this.dialogVisible2=!0},showIP:function(t){this.currentItem=t,this.dialogVisible3=!0},cancelAdv:function(){var t=this;this.$http.post("/wallet/backmgr/merchant/cancelAdv",{advId:this.currentItem.advId,remake:this.reason}).then(function(e){t.dialogVisible2=!1,t.getCashoutAuditList(),t.$message({type:"success",message:e.msg})}).catch(function(e){t.dialogVisible2=!1})},verify:function(t){var e=this;if(this.currentItem.recdId)this.$http.post("/wallet/backmgr/merchant/updateCashoutAuditStatus",{recdId:this.currentItem.recdId,remark:this.reason,status:t}).then(function(t){e.dialogVisible=!1,e.getCashoutAuditList(),e.$message({type:"success",message:t.msg})}).catch(function(t){e.dialogVisible=!1});else{var a=[];this.selectList.forEach(function(t){a.push(t.recdId)}),this.loading=!0,this.$http.post("wallet/backmgr/merchant/updateCashoutAuditStatusBatch",{recdIds:a.join(","),remark:this.reason,status:t}).then(function(t){e.dialogVisible=!1,setTimeout(function(){e.loading=!1,e.getCashoutAuditList(),e.$message({type:"success",message:t.msg})},3e3)}).catch(function(t){e.dialogVisible=!1,e.loading=!1})}},chooseTabs:function(){0==this.tabs?(this.filterForm.matchResult="",this.getCashoutAuditList()):(this.filterForm.advType="",this.filterForm.matchResult="0",this.getCashoutAuditList())},handleSelectionChange:function(t){this.selectList=t},batchAudit:function(){this.currentItem={},this.selectList.length?this.dialogVisible=!0:this.$message.warning("请选择待审核订单！")}},computed:s()({},Object(l.b)(["coinInfo"]))},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"cashOutVerify-page"},[a("el-collapse",{attrs:{value:"filter"}},[a("el-collapse-item",{attrs:{title:"查询条件",name:"filter"}},[a("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"86px",size:"mini",model:t.filterForm}},[a("el-form-item",{attrs:{label:"账号/用户编号:","label-width":"110px"}},[a("el-input",{attrs:{placeholder:"请输入账号或用户编号"},model:{value:t.filterForm.phoneOrEmail,callback:function(e){t.$set(t.filterForm,"phoneOrEmail",e)},expression:"filterForm.phoneOrEmail"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"类型:"}},[a("el-select",{attrs:{disabled:1==t.tabs},model:{value:t.filterForm.advType,callback:function(e){t.$set(t.filterForm,"advType",e)},expression:"filterForm.advType"}},[a("el-option",{attrs:{value:"",label:"所有"}}),t._v(" "),t._l(t.typeList,function(t,e){return a("el-option",{key:e,attrs:{value:t.value,label:t.label}})})],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"商户订单号:"}},[a("el-input",{attrs:{placeholder:"请输入商户订单号"},model:{value:t.filterForm.apiOrderId,callback:function(e){t.$set(t.filterForm,"apiOrderId",e)},expression:"filterForm.apiOrderId"}})],1),t._v(" "),a("br"),t._v(" "),a("el-form-item",{staticClass:"dateItem",attrs:{label:"时间:"}},[a("el-date-picker",{attrs:{type:"datetimerange","value-format":"yyyy-MM-dd HH:mm:ss","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.selectedDate,callback:function(e){t.selectedDate=e},expression:"selectedDate"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"状态:"}},[a("el-select",{attrs:{disabled:1==t.tabs},model:{value:t.filterForm.matchResult,callback:function(e){t.$set(t.filterForm,"matchResult",e)},expression:"filterForm.matchResult"}},[a("el-option",{attrs:{value:"",label:"所有"}}),t._v(" "),t._l(t.matchResultMap,function(t,e){return a("el-option",{key:e,attrs:{value:e,label:t}})})],2)],1),t._v(" "),a("el-button",{staticClass:"btn",staticStyle:{"margin-left":"20px"},attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.search()}}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-document-checked"},nativeOn:{click:function(e){return t.exportExcel(e)}}},[t._v("导出Excel")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini",disabled:1!=t.tabs},nativeOn:{click:function(e){return t.batchAudit(e)}}},[t._v("批量审核")])],1)],1)],1),t._v(" "),a("el-tabs",{on:{"tab-click":t.chooseTabs},model:{value:t.tabs,callback:function(e){t.tabs=e},expression:"tabs"}},[a("el-tab-pane",{attrs:{label:"全部",name:"0"}}),t._v(" "),a("el-tab-pane",{attrs:{label:"兑出待审核",name:"1"}})],1),t._v(" "),a("el-table",{attrs:{height:"auto",size:"mini",border:"",data:t.listData.list},on:{"selection-change":t.handleSelectionChange}},[1==t.tabs?a("el-table-column",{attrs:{type:"selection",align:"center"}}):t._e(),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"类型",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[t._v(" "+t._s(3==e.row.advType?"抢单兑出":4==e.row.advType?"抢单兑入":5==e.row.advType?"派单兑入":6==e.row.advType?"派单兑出":"")+" ")])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"商户订单号/发起时间",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.apiOrderId)),a("br"),t._v(t._s(t.$fmtDate(e.row.createTime,"full")))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"商户用户编号/账户",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.nickName)),a("br"),t._v(t._s(e.row.phoneOrEmail))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"状态",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(t.matchResultMap[e.row.matchResult])+"\n\t\t\t")]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"数量/金额"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{staticClass:"price"},[a("p",[t._v("数量:"),a("span",[t._v(t._s(e.row.apiStock))]),t._v(" "+t._s(e.row.coinName))]),t._v(" "),a("p",[t._v("金额:"),a("span",[t._v(t._s(e.row.apiAmount))]),t._v(" CNY")])])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"价格",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{staticClass:"price"},[a("p",[a("span",[t._v(t._s(e.row.apiPrice))]),t._v(" CNY/"+t._s(e.row.coinName))])])}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"api_user_id",label:"appUserId/收银台ip",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[a("span",[t._v(t._s(e.row.apiUserId))]),a("br"),t._v(" "),a("span",[t._v(t._s(e.row.apiIp))])])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"coinName",width:"80",label:"币种"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"fee",label:"手续费"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"payType",label:"付款方式",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[t._v("\n\t\t\t\t"+t._s(1==e.row.payType?"银行卡":2==e.row.payType?"支付宝":3==e.row.payType?"微信":4==e.row.payType?"宝转卡":5==e.row.payType?"支付宝":"新的支付方式")+"\n\t\t\t")])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"bankUserName",label:"收款人",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"bankCardId",label:"收款账号",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"bankInfo",label:"银行信息",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[t._v("\n\t\t\t\t"+t._s(e.row.bankName)+t._s(e.row.bankBranch)+"\n\t\t\t")])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",fixed:"right",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{disabled:!(0==e.row.matchResult&&(3==e.row.advType||6==e.row.advType)),size:"mini",type:"text"},on:{click:function(a){return t.open(e.row)}}},[t._v("审核")]),t._v(" "),a("el-button",{attrs:{disabled:1!=e.row.matchResult,size:"mini",type:"text"},on:{click:function(a){return t.close(e.row)}}},[t._v("取消订单")])]}}])})],1),t._v(" "),a("div",{staticClass:"load-more"},[a("div",{staticClass:"count"},[t._v("\n\t\t\t总数量： "),a("span",[t._v(t._s(t.sumInfo.sumApiStock)+" "+t._s(t.$variableCoin))]),t._v("\n\t\t\t总金额： "),a("span",[t._v(t._s(t.sumInfo.sumApiAmount)+" CNY")]),t._v("\n\t\t\t总手续费： "),a("span",[t._v(t._s(t.sumInfo.sumFee)+" "+t._s(t.$variableCoin))])]),t._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"pager-count":5,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}})],1),t._v(" "),a("el-dialog",{attrs:{title:"提示",visible:t.dialogVisible,width:"400px"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入不通过理由"},model:{value:t.reason,callback:function(e){t.reason=e},expression:"reason"}}),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"danger"},on:{click:function(e){return t.verify(2)}}},[t._v("不通过")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.verify(1)}}},[t._v("通 过")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"提示",visible:t.dialogVisible2,width:"400px"},on:{"update:visible":function(e){t.dialogVisible2=e}}},[a("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入取消原因"},model:{value:t.reason,callback:function(e){t.reason=e},expression:"reason"}}),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"danger"},on:{click:function(e){t.dialogVisible2=!1}}},[t._v("关闭")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.cancelAdv()}}},[t._v("确定取消")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"提示",visible:t.dialogVisible3,width:"400px"},on:{"update:visible":function(e){t.dialogVisible3=e}}},[a("div",{staticClass:"ipInfo"},[a("p",[a("span",[t._v("商户用户IP：")]),t._v(t._s(this.currentItem.apiIp)+"\n\t\t\t\t")]),t._v(" "),a("p",[a("span",[t._v("IP地址：")]),t._v(t._s(this.currentItem.apiLocal)+"\n\t\t\t\t")])]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"danger"},on:{click:function(e){t.dialogVisible3=!1}}},[t._v("关闭")])],1)])],1)},staticRenderFns:[]};var p=a("C7Lr")(u,d,!1,function(t){a("nrMa")},"data-v-7bd8df5a",null);e.default=p.exports},nrMa:function(t,e){}});