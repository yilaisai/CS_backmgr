webpackJsonp([53],{Xb1m:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cashOutVerify-page"},[a("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"86px",size:"mini",model:t.filterForm}},[a("el-form-item",{staticClass:"dateItem",attrs:{label:"时间:"}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期",format:"yyyy-MM-dd ","end-placeholder":"结束日期"},model:{value:t.selectedDate,callback:function(e){t.selectedDate=e},expression:"selectedDate"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"账号:"}},[a("el-input",{attrs:{placeholder:"请输入用户账号"},model:{value:t.filterForm.phoneOrEmail,callback:function(e){t.$set(t.filterForm,"phoneOrEmail",e)},expression:"filterForm.phoneOrEmail"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"商户订单号:"}},[a("el-input",{attrs:{placeholder:"请输入商户订单号"},model:{value:t.filterForm.apiOrderId,callback:function(e){t.$set(t.filterForm,"apiOrderId",e)},expression:"filterForm.apiOrderId"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"类型:"}},[a("el-select",{model:{value:t.filterForm.tradeType,callback:function(e){t.$set(t.filterForm,"tradeType",e)},expression:"filterForm.tradeType"}},[a("el-option",{attrs:{value:"",label:"所有"}}),t._v(" "),t._l(t.typeList,function(t,e){return a("el-option",{key:e,attrs:{value:t.value,label:t.label}})})],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"币种:"}},[a("el-select",{model:{value:t.filterForm.coinName,callback:function(e){t.$set(t.filterForm,"coinName",e)},expression:"filterForm.coinName"}},[a("el-option",{attrs:{value:"",label:"所有"}}),t._v(" "),t._l(t.coinList,function(t,e){return a("el-option",{key:e,attrs:{value:t,label:t}})})],2)],1),t._v(" "),a("el-form-item",[a("el-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:function(e){return t.search()}}},[t._v("搜索")])],1)],1),t._v(" "),a("el-table",{attrs:{height:"auto",size:"mini",border:"",data:t.listData.list}},[a("el-table-column",{attrs:{align:"center",label:"类型",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[t._v(" "+t._s(1==e.row.type?"匹配兑出":2==e.row.type?"抢单兑出":"")+" ")])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"商户订单号/发起时间",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.apiOrderId)),a("br"),t._v(t._s(t.$fmtDate(e.row.createTime,"full")))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"商户昵称/账户",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.nickName)),a("br"),t._v(t._s(e.row.phoneOrEmail))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"状态",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[a("p",[t._v(t._s(0==e.row.auditStatus?"待审核":1==e.row.auditStatus?"通过审核":2==e.row.auditStatus?"审核不通过":""))])])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"价格/数量/金额",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.apiPrice)),a("br"),t._v(t._s(e.row.apiStock)),a("br"),t._v(t._s(e.row.apiAmount))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"coinName",label:"币种"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"fee",label:"手续费"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{directives:[{name:"show",rawName:"v-show",value:0==e.row.auditStatus,expression:"scope.row.auditStatus==0"}],attrs:{size:"mini",type:"text"},on:{click:function(a){return t.open(e.row)}}},[t._v("审核")])]}}])})],1),t._v(" "),a("div",{staticClass:"load-more"},[a("div"),t._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}})],1),t._v(" "),a("el-dialog",{attrs:{title:"提示",visible:t.dialogVisible,width:"30%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入不通过理由"},model:{value:t.reason,callback:function(e){t.reason=e},expression:"reason"}}),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"danger"},on:{click:function(e){return t.verify(2)}}},[t._v("不通过")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.verify(1)}}},[t._v("通 过")])],1)],1)],1)},staticRenderFns:[]};var i=a("VU/8")({components:{},data:function(){return{filterForm:{coinName:"",tradeType:"",apiOrderId:"",phoneOrEmail:"",startDate:"",endDate:"",pageNum:1,pageSize:10},selectedDate:[],typeList:[{label:"匹配兑出",value:1},{label:"抢单兑出",value:2}],coinList:["USDT","BTC"],listData:{total:null,list:[]},dialogVisible:!1,currentItem:{},reason:""}},mounted:function(){this.getCashoutAuditList()},methods:{getCashoutAuditList:function(){var t=this;this.$http.post("/wallet/backmgr/merchant/getCashoutAuditList",this.filterForm).then(function(e){var a=e.result,l=a.list,i=a.total;t.listData.list=l,t.listData.total=i})},search:function(){2==this.selectedDate.length&&(this.filterForm.startDate=this.selectedDate&&this.$fmtDate(this.selectedDate[0].getTime())+" 00:00:00",this.filterForm.endDate=this.selectedDate&&this.$fmtDate(this.selectedDate[1].getTime())+" 23:59:59"),this.filterForm.pageNum=1,this.getCashoutAuditList()},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.filterForm.pageNum=e,this.getCashoutAuditList()},open:function(t){this.currentItem=t,this.dialogVisible=!0},verify:function(t){var e=this;this.$http.post("/wallet/backmgr/merchant/updateCashoutAuditStatus",{recdId:this.currentItem.recdId,remark:this.reason,status:t}).then(function(t){e.getCashoutAuditList(),e.$message({type:"success",message:t.msg})})}},watch:{},computed:{}},l,!1,function(t){a("kMhi")},"data-v-4a95a0b6",null);e.default=i.exports},kMhi:function(t,e){}});