webpackJsonp([68],{K2Uv:function(t,e){},Xb1m:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("Dd8w"),i=a.n(l),s=a("NYxO"),r=a("EaCm"),o=a("s0MJ"),n=a("mw3O"),c=a.n(n),u={data:function(){return{filterForm:{coinName:"RMT",advType:"",apiOrderId:"",phoneOrEmail:"",startDate:"",endDate:"",pageNum:1,pageSize:20,matchResult:""},selectedDate:[],typeList:[{label:"派单兑入",value:5},{label:"派单兑出",value:6},{label:"抢单兑入",value:4},{label:"抢单兑出",value:3}],listData:{total:null,list:[]},dialogVisible:!1,dialogVisible2:!1,dialogVisible3:!1,currentItem:{},reason:"",matchResultMap:r.e,sumInfo:{sumApiStock:"--",sumApiAmount:"--",sumFee:"--"}}},activated:function(){this.selectedDate=Object(o.b)(),this.getCashoutAuditList()},methods:{getCashoutAuditList:function(){var t=this;this.selectedDate&&2==this.selectedDate.length?(this.filterForm.startDate=this.selectedDate[0],this.filterForm.endDate=this.selectedDate[1]):(this.filterForm.startDate=null,this.filterForm.endDate=null),this.$http.post("/wallet/backmgr/merchant/getCashoutAuditList",this.filterForm).then(function(e){var a=e.result.pageInfo,l=a.list,i=a.total;t.listData.list=l,t.listData.total=i,l.length<1?t.sumInfo={sumApiStock:"0",sumApiAmount:"0",sumFee:"0"}:t.sumInfo=e.result.sumInfo})},exportExcel:function(){2==this.selectedDate.length&&(this.filterForm.startDate=this.selectedDate&&this.$fmtDate(this.selectedDate[0].getTime())+" 00:00:00",this.filterForm.endDate=this.selectedDate&&this.$fmtDate(this.selectedDate[1].getTime())+" 23:59:59"),this.filterForm.token=localStorage.getItem("wallet_token")||"";var t=localStorage.getItem("SERVER_PATH")||window.SERVER_PATH;window.open(t+"/wallet/backmgr/merchant/getCashoutAuditList/export?"+c.a.stringify(this.filterForm))},search:function(){this.filterForm.pageNum=1,this.getCashoutAuditList()},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.filterForm.pageNum=e,this.getCashoutAuditList()},open:function(t){this.currentItem=t,this.reason="",this.dialogVisible=!0},close:function(t){this.currentItem=t,this.reason="",this.dialogVisible2=!0},showIP:function(t){this.currentItem=t,this.dialogVisible3=!0},cancelAdv:function(){var t=this;this.$http.post("/wallet/backmgr/merchant/cancelAdv",{advId:this.currentItem.advId,remake:this.reason}).then(function(e){t.dialogVisible2=!1,t.getCashoutAuditList(),t.$message({type:"success",message:e.msg})}).catch(function(e){t.dialogVisible2=!1})},verify:function(t){var e=this;this.$http.post("/wallet/backmgr/merchant/updateCashoutAuditStatus",{recdId:this.currentItem.recdId,remark:this.reason,status:t}).then(function(t){e.dialogVisible=!1,e.getCashoutAuditList(),e.$message({type:"success",message:t.msg})}).catch(function(t){e.dialogVisible=!1})}},computed:i()({},Object(s.b)(["coinInfo"]))},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cashOutVerify-page"},[a("el-collapse",{attrs:{value:"filter"}},[a("el-collapse-item",{attrs:{title:"查询条件",name:"filter"}},[a("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"86px",size:"mini",model:t.filterForm}},[a("el-form-item",{attrs:{label:"账号:"}},[a("el-input",{attrs:{placeholder:"请输入用户账号"},model:{value:t.filterForm.phoneOrEmail,callback:function(e){t.$set(t.filterForm,"phoneOrEmail",e)},expression:"filterForm.phoneOrEmail"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"类型:"}},[a("el-select",{model:{value:t.filterForm.advType,callback:function(e){t.$set(t.filterForm,"advType",e)},expression:"filterForm.advType"}},[a("el-option",{attrs:{value:"",label:"所有"}}),t._v(" "),t._l(t.typeList,function(t,e){return a("el-option",{key:e,attrs:{value:t.value,label:t.label}})})],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"商户订单号:"}},[a("el-input",{attrs:{placeholder:"请输入商户订单号"},model:{value:t.filterForm.apiOrderId,callback:function(e){t.$set(t.filterForm,"apiOrderId",e)},expression:"filterForm.apiOrderId"}})],1),t._v(" "),a("br"),t._v(" "),a("el-form-item",{staticClass:"dateItem",attrs:{label:"时间:"}},[a("el-date-picker",{attrs:{type:"datetimerange","value-format":"yyyy-MM-dd HH:mm:ss","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.selectedDate,callback:function(e){t.selectedDate=e},expression:"selectedDate"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"状态:"}},[a("el-select",{model:{value:t.filterForm.matchResult,callback:function(e){t.$set(t.filterForm,"matchResult",e)},expression:"filterForm.matchResult"}},[a("el-option",{attrs:{value:"",label:"所有"}}),t._v(" "),t._l(t.matchResultMap,function(t,e){return a("el-option",{key:e,attrs:{value:e,label:t}})})],2)],1),t._v(" "),a("el-button",{staticClass:"btn",staticStyle:{"margin-left":"20px"},attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.search()}}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-document-checked"},nativeOn:{click:function(e){return t.exportExcel(e)}}},[t._v("导出Excel")])],1)],1)],1),t._v(" "),a("el-table",{attrs:{height:"auto",size:"mini",border:"",data:t.listData.list}},[a("el-table-column",{attrs:{align:"center",label:"类型",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[t._v(" "+t._s(3==e.row.advType?"抢单兑出":4==e.row.advType?"抢单兑入":5==e.row.advType?"派单兑入":6==e.row.advType?"派单兑出":"")+" ")])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"商户订单号/发起时间",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.apiOrderId)),a("br"),t._v(t._s(t.$fmtDate(e.row.createTime,"full")))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"商户昵称/账户",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.nickName)),a("br"),t._v(t._s(e.row.phoneOrEmail))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"状态",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t\t"+t._s(t.matchResultMap[e.row.matchResult])+"\n\t\t\t\t")]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"数量/金额"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{staticClass:"price"},[a("p",[t._v("数量:"),a("span",[t._v(t._s(e.row.apiStock))]),t._v(" "+t._s(e.row.coinName))]),t._v(" "),a("p",[t._v("金额:"),a("span",[t._v(t._s(e.row.apiAmount))]),t._v(" CNY")])])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"价格",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{staticClass:"price"},[a("p",[a("span",[t._v(t._s(e.row.apiPrice))]),t._v(" CNY/"+t._s(e.row.coinName))])])}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"api_user_id",label:"appUserId/收银台ip",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[a("span",[t._v(t._s(e.row.apiUserId))]),a("br"),t._v(" "),a("span",[t._v(t._s(e.row.apiIp))])])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"coinName",width:"80",label:"币种"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"fee",label:"手续费"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{disabled:!(0==e.row.matchResult&&(3==e.row.advType||6==e.row.advType)),size:"mini",type:"text"},on:{click:function(a){return t.open(e.row)}}},[t._v("审核")]),t._v(" "),a("el-button",{attrs:{disabled:1!=e.row.matchResult,size:"mini",type:"text"},on:{click:function(a){return t.close(e.row)}}},[t._v("取消订单")])]}}])})],1),t._v(" "),a("div",{staticClass:"load-more"},[a("div",{staticClass:"count"},[t._v("\n\t\t\t\t总数量： "),a("span",[t._v(t._s(t.sumInfo.sumApiStock)+" "+t._s(t.$variableCoin))]),t._v("\n\t\t\t\t总金额： "),a("span",[t._v(t._s(t.sumInfo.sumApiAmount)+" CNY")]),t._v("\n\t\t\t\t总手续费： "),a("span",[t._v(t._s(t.sumInfo.sumFee)+" "+t._s(t.$variableCoin))])]),t._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"pager-count":5,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}})],1),t._v(" "),a("el-dialog",{attrs:{title:"提示",visible:t.dialogVisible,width:"400px"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入不通过理由"},model:{value:t.reason,callback:function(e){t.reason=e},expression:"reason"}}),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"danger"},on:{click:function(e){return t.verify(2)}}},[t._v("不通过")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.verify(1)}}},[t._v("通 过")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"提示",visible:t.dialogVisible2,width:"400px"},on:{"update:visible":function(e){t.dialogVisible2=e}}},[a("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入取消原因"},model:{value:t.reason,callback:function(e){t.reason=e},expression:"reason"}}),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"danger"},on:{click:function(e){t.dialogVisible2=!1}}},[t._v("关闭")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.cancelAdv()}}},[t._v("确定取消")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"提示",visible:t.dialogVisible3,width:"400px"},on:{"update:visible":function(e){t.dialogVisible3=e}}},[a("div",{staticClass:"ipInfo"},[a("p",[a("span",[t._v("商户用户IP：")]),t._v(t._s(this.currentItem.apiIp)+"\n\t\t\t\t\t")]),t._v(" "),a("p",[a("span",[t._v("IP地址：")]),t._v(t._s(this.currentItem.apiLocal)+"\n\t\t\t\t\t")])]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"danger"},on:{click:function(e){t.dialogVisible3=!1}}},[t._v("关闭")])],1)])],1)},staticRenderFns:[]};var p=a("VU/8")(u,d,!1,function(t){a("K2Uv")},"data-v-4d16ec50",null);e.default=p.exports}});