webpackJsonp([66],{XSGQ:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("4YfN"),s=a.n(l),r=a("48sp"),i=a("EaCm"),n=a("s0MJ"),o=a("CtzY"),c=a.n(o),u={data:function(){return{filterForm:{tabs:0,status:"",batchOuttype:"",coinName:"RMT",recdId:"",phoneOrNick:"",startDate:"",endDate:"",pageNum:1,pageSize:20},selectedDate:[],typeList:[{label:"派单兑入",value:5},{label:"派单兑出",value:6},{label:"抢单兑入",value:4},{label:"抢单兑出",value:3}],listData:{total:null,list:[]},currentItem:{},reason:"",matchResultMap:i.e,sumInfo:{sumApiStock:"--",sumApiAmount:"--",sumFee:"--"},baseUrl:""}},activated:function(){this.selectedDate=Object(n.b)(),this.getCashoutAuditList(),this.baseUrl=localStorage.getItem("SERVER_PATH")||window.SERVER_PATH||window.SERVER_PATH2},methods:{getCashoutAuditList:function(){var t=this;0==this.filterForm.tabs?this.filterForm.status="":this.filterForm.status=this.filterForm.tabs,this.selectedDate&&2==this.selectedDate.length?(this.filterForm.startDate=this.selectedDate[0],this.filterForm.endDate=this.selectedDate[1]):(this.filterForm.startDate=null,this.filterForm.endDate=null),this.$http.post("/wallet/app/otc/backmgr/batchOut/mgrQueryBatchOutList",this.filterForm).then(function(e){var a=e.result.pageData,l=a.list,s=a.total;t.listData.list=l,t.listData.total=s,l.length<1?t.sumInfo={sumApiStock:"0",sumApiAmount:"0",sumFee:"0"}:t.sumInfo=e.result.map})},exportExcel:function(){this.selectedDate&&2==this.selectedDate.length?(this.filterForm.startDate=this.selectedDate[0],this.filterForm.endDate=this.selectedDate[1]):(this.$delete(this.filterForm,"startDate"),this.$delete(this.filterForm,"endDate")),this.filterForm.token=localStorage.getItem("wallet_token")||"",window.open(this.baseUrl+"/wallet/app/otc/backmgr/batchOut/queryBatchOutList/export?"+c.a.stringify(this.filterForm))},search:function(){this.filterForm.pageNum=1,this.getCashoutAuditList()},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.filterForm.pageNum=e,this.getCashoutAuditList()}},computed:s()({},Object(r.b)(["coinInfo"]))},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cashOutVerify-page"},[a("el-collapse",{attrs:{value:"filter"}},[a("el-collapse-item",{attrs:{title:"查询条件",name:"filter"}},[a("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"105px",size:"mini",model:t.filterForm}},[a("el-form-item",{staticClass:"dateItem",attrs:{label:"时间:"}},[a("el-date-picker",{attrs:{type:"datetimerange","value-format":"yyyy-MM-dd HH:mm:ss","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.selectedDate,callback:function(e){t.selectedDate=e},expression:"selectedDate"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"账号/用户编号:"}},[a("el-input",{attrs:{placeholder:"请输入用户账号/用户编号"},model:{value:t.filterForm.phoneOrNick,callback:function(e){t.$set(t.filterForm,"phoneOrNick",e)},expression:"filterForm.phoneOrNick"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"订单号:"}},[a("el-input",{attrs:{placeholder:"请输入订单号"},model:{value:t.filterForm.recdId,callback:function(e){t.$set(t.filterForm,"recdId",e)},expression:"filterForm.recdId"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"代付方式:"}},[a("el-select",{model:{value:t.filterForm.batchOuttype,callback:function(e){t.$set(t.filterForm,"batchOuttype",e)},expression:"filterForm.batchOuttype"}},[a("el-option",{attrs:{value:"",label:"所有"}}),t._v(" "),a("el-option",{attrs:{value:"1",label:"手动"}}),t._v(" "),a("el-option",{attrs:{value:"2",label:"第三方"}})],1)],1),t._v(" "),a("el-button",{staticClass:"btn",staticStyle:{"margin-left":"20px"},attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.search()}}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-document-checked"},nativeOn:{click:function(e){return t.exportExcel(e)}}},[t._v("导出Excel")])],1)],1)],1),t._v(" "),a("el-tabs",{on:{"tab-click":t.getCashoutAuditList},model:{value:t.filterForm.tabs,callback:function(e){t.$set(t.filterForm,"tabs",e)},expression:"filterForm.tabs"}},[a("el-tab-pane",{attrs:{label:"所有",name:""}}),t._v(" "),a("el-tab-pane",{attrs:{label:"已完成",name:"4"}}),t._v(" "),a("el-tab-pane",{attrs:{label:"审核不通过",name:"2"}})],1),t._v(" "),a("el-table",{attrs:{height:"auto",size:"mini",border:"",data:t.listData.list}},[a("el-table-column",{attrs:{align:"center",prop:"coinName",width:"80",label:"币种"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"类型",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[t._v(" "+t._s(e.row.type)+" ")])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"单号/发起时间",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.recdId)),a("br"),t._v(t._s(t.$fmtDate(e.row.createTime,"full")))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"商户用户编号/账户",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.nickName)),a("br"),t._v(t._s(e.row.phone))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"状态",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t\t"+t._s(e.row.statusName)+"\n\t\t\t\t")]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"代付方式",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[t._v(" "+t._s(e.row.newStatusName)+" ")])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"价格/数量"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{staticClass:"price"},[a("p",[t._v("价格:"),a("span",[t._v(t._s(e.row.price))]),t._v(" CNY/"+t._s(e.row.coinName))]),t._v(" "),a("p",[t._v("数量:"),a("span",[t._v(t._s(e.row.amount))]),t._v(" "+t._s(e.row.coinName))])])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"金额",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{staticClass:"price"},[a("p",[a("span",[t._v(t._s(e.row.money))]),t._v(" CNY")])])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"手续费"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{staticClass:"price"},[a("p",[a("span",[t._v(t._s(e.row.fee))]),t._v("  "+t._s(e.row.coinName))])])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"收款人"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{staticClass:"price"},[a("p",[t._v(" "+t._s(e.row.bankUserName))])])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"银行/银行支行"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{staticClass:"price"},[a("p",[t._v(t._s(e.row.bankName)+" "),a("br"),t._v("  "+t._s(e.row.bankBranch||"--"))])])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"银行卡号"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{staticClass:"price"},[a("p",[a("span",[t._v(t._s(e.row.bankCardId))])])])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"批次号",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.batchNum))])]}}])})],1),t._v(" "),a("div",{staticClass:"load-more"},[a("div",{staticClass:"count"},[t._v("\n\t\t\t\t总数量： "),a("span",[t._v(t._s(t.sumInfo.sumAmount)+" "+t._s(t.$variableCoin))]),t._v("\n\t\t\t\t总金额： "),a("span",[t._v(t._s(t.sumInfo.sumMoney)+" CNY")]),t._v("\n\t\t\t\t总手续费： "),a("span",[t._v(t._s(t.sumInfo.sumFee)+" "+t._s(t.$variableCoin))])]),t._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"pager-count":5,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}})],1)],1)},staticRenderFns:[]};var d=a("C7Lr")(u,m,!1,function(t){a("nBFd")},"data-v-52db8776",null);e.default=d.exports},nBFd:function(t,e){}});