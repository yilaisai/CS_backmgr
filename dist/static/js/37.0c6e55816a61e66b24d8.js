webpackJsonp([37],{ClIP:function(t,e){},Xb1m:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("Dd8w"),l=a.n(i),s=a("NYxO"),r={data:function(){return{filterForm:{coinName:"RMT",tradeType:"",apiOrderId:"",phoneOrEmail:"",startDate:"",endDate:"",pageNum:1,pageSize:20},selectedDate:[],typeList:[{label:"匹配兑出",value:6},{label:"抢单兑出",value:3}],listData:{total:null,list:[]},dialogVisible:!1,dialogVisible2:!1,dialogVisible3:!1,currentItem:{},reason:""}},activated:function(){this.getCashoutAuditList()},methods:{getCashoutAuditList:function(){var t=this;this.$http.post("/wallet/backmgr/merchant/getCashoutAuditList",this.filterForm).then(function(e){var a=e.result,i=a.list,l=a.total;t.listData.list=i,t.listData.total=l})},search:function(){2==this.selectedDate.length&&(this.filterForm.startDate=this.selectedDate&&this.$fmtDate(this.selectedDate[0].getTime())+" 00:00:00",this.filterForm.endDate=this.selectedDate&&this.$fmtDate(this.selectedDate[1].getTime())+" 23:59:59"),this.filterForm.pageNum=1,this.getCashoutAuditList()},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.filterForm.pageNum=e,this.getCashoutAuditList()},open:function(t){this.currentItem=t,this.reason="",this.dialogVisible=!0},close:function(t){this.currentItem=t,this.reason="",this.dialogVisible2=!0},showIP:function(t){this.currentItem=t,this.dialogVisible3=!0},cancelAdv:function(){var t=this;this.$http.post("/wallet/backmgr/merchant/cancelAdv",{advId:this.currentItem.advId,remake:this.reason}).then(function(e){t.dialogVisible2=!1,t.getCashoutAuditList(),t.$message({type:"success",message:e.msg})}).catch(function(e){t.dialogVisible2=!1})},verify:function(t){var e=this;this.$http.post("/wallet/backmgr/merchant/updateCashoutAuditStatus",{recdId:this.currentItem.recdId,remark:this.reason,status:t}).then(function(t){e.dialogVisible=!1,e.getCashoutAuditList(),e.$message({type:"success",message:t.msg})}).catch(function(t){e.dialogVisible=!1})}},watch:{},computed:l()({},Object(s.b)(["coinInfo"]))},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cashOutVerify-page"},[a("el-collapse",{attrs:{value:"filter"}},[a("el-collapse-item",{attrs:{title:"查询条件",name:"filter"}},[a("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"86px",size:"mini",model:t.filterForm}},[a("el-form-item",{attrs:{label:"账号:"}},[a("el-input",{attrs:{placeholder:"请输入用户账号"},model:{value:t.filterForm.phoneOrEmail,callback:function(e){t.$set(t.filterForm,"phoneOrEmail",e)},expression:"filterForm.phoneOrEmail"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"类型:"}},[a("el-select",{model:{value:t.filterForm.tradeType,callback:function(e){t.$set(t.filterForm,"tradeType",e)},expression:"filterForm.tradeType"}},[a("el-option",{attrs:{value:"",label:"所有"}}),t._v(" "),t._l(t.typeList,function(t,e){return a("el-option",{key:e,attrs:{value:t.value,label:t.label}})})],2)],1),t._v(" "),a("el-form-item",{staticClass:"dateItem",attrs:{label:"时间:"}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期",format:"yyyy-MM-dd ","end-placeholder":"结束日期"},model:{value:t.selectedDate,callback:function(e){t.selectedDate=e},expression:"selectedDate"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"商户订单号:"}},[a("el-input",{attrs:{placeholder:"请输入商户订单号"},model:{value:t.filterForm.apiOrderId,callback:function(e){t.$set(t.filterForm,"apiOrderId",e)},expression:"filterForm.apiOrderId"}})],1),t._v(" "),a("el-button",{staticClass:"btn",staticStyle:{"margin-left":"20px"},attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.search()}}},[t._v("查询")])],1)],1)],1),t._v(" "),a("el-table",{attrs:{height:"auto",size:"mini",border:"",data:t.listData.list}},[a("el-table-column",{attrs:{align:"center",label:"类型",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[t._v(" "+t._s(3==e.row.advType?"抢单兑出":4==e.row.advType?"抢单兑入":5==e.row.advType?"派单兑入":6==e.row.advType?"派单兑出":"")+" ")])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"商户订单号/发起时间",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.apiOrderId)),a("br"),t._v(t._s(t.$fmtDate(e.row.createTime,"full")))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"商户昵称/账户",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.nickName)),a("br"),t._v(t._s(e.row.phoneOrEmail))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"状态",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[t._v("\n\t\t\t\t\t"+t._s(0==e.row.matchResult?"待审核":1==e.row.matchResult?"匹配中":2==e.row.matchResult?"匹配成功":3==e.row.matchResult?"匹配失败":4==e.row.matchResult?"发起中断":5==e.row.matchResult?"IP不匹配":"审核失败")+"\n\t\t\t\t")])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"价格/数量/金额"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{staticClass:"price"},[a("p",[t._v("价格:"),a("span",[t._v(t._s(e.row.apiPrice))]),t._v(" CNY/"+t._s(e.row.coinName))]),t._v(" "),a("p",[t._v("数量:"),a("span",[t._v(t._s(e.row.apiStock))]),t._v(" "+t._s(e.row.coinName))]),t._v(" "),a("p",[t._v("金额:"),a("span",[t._v(t._s(e.row.apiAmount))]),t._v(" CNY")])])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"coinName",width:"80",label:"币种"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"fee",label:"手续费"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{directives:[{name:"show",rawName:"v-show",value:4==e.row.advType||5==e.row.advType,expression:"scope.row.advType==4||scope.row.advType==5"}],attrs:{type:"text"},on:{click:function(a){return t.showIP(e.row)}}},[t._v("查看")]),t._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:0==e.row.matchResult&&(3==e.row.advType||6==e.row.advType),expression:"scope.row.matchResult==0&&(scope.row.advType==3||scope.row.advType==6)"}],attrs:{size:"mini",type:"text"},on:{click:function(a){return t.open(e.row)}}},[t._v("审核")]),t._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:1==e.row.matchResult,expression:"scope.row.matchResult==1"}],attrs:{size:"mini",type:"text"},on:{click:function(a){return t.close(e.row)}}},[t._v("取消订单")])]}}])})],1),t._v(" "),a("div",{staticClass:"load-more"},[a("div"),t._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}})],1),t._v(" "),a("el-dialog",{attrs:{title:"提示",visible:t.dialogVisible,width:"400px"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入不通过理由"},model:{value:t.reason,callback:function(e){t.reason=e},expression:"reason"}}),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"danger"},on:{click:function(e){return t.verify(2)}}},[t._v("不通过")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.verify(1)}}},[t._v("通 过")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"提示",visible:t.dialogVisible2,width:"400px"},on:{"update:visible":function(e){t.dialogVisible2=e}}},[a("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入取消原因"},model:{value:t.reason,callback:function(e){t.reason=e},expression:"reason"}}),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"danger"},on:{click:function(e){t.dialogVisible2=!1}}},[t._v("关闭")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.cancelAdv()}}},[t._v("确定取消")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"提示",visible:t.dialogVisible3,width:"400px"},on:{"update:visible":function(e){t.dialogVisible3=e}}},[a("div",{staticClass:"ipInfo"},[a("p",[a("span",[t._v("商户用户IP：")]),t._v(t._s(this.currentItem.apiIp)+"\n\t\t\t\t\t")]),t._v(" "),a("p",[a("span",[t._v("IP地址：")]),t._v(t._s(this.currentItem.apiLocal)+"\n\t\t\t\t\t")])]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"danger"},on:{click:function(e){t.dialogVisible3=!1}}},[t._v("关闭")])],1)])],1)},staticRenderFns:[]};var n=a("VU/8")(r,o,!1,function(t){a("ClIP")},"data-v-8f4f88a8",null);e.default=n.exports}});