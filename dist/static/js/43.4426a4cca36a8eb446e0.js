webpackJsonp([43],{hF6i:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"complaint-more"},[r("el-container",[r("el-header",[r("el-button",{attrs:{type:"primary"},on:{click:e.routerReturn}},[e._v("返回")])],1),e._v(" "),r("el-main",[r("el-table",{attrs:{data:e.listData.list,border:"",height:"100%"}},[r("el-table-column",{attrs:{prop:"tradeId",label:"订单号",width:"180"}}),e._v(" "),r("el-table-column",{attrs:{prop:"userId",label:"用户ID",width:"80"}}),e._v(" "),r("el-table-column",{attrs:{prop:"isBuyer",label:"身份",width:"60"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(e._f("filterIsBuyer")(t.row.isBuyer)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"appealType",label:"投诉类型",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(e._f("filterAppealType")(t.row.appealType)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"appealId",label:"申诉ID",width:"180"}}),e._v(" "),r("el-table-column",{attrs:{prop:"appealResult",label:"申述处理",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(e._f("filterAppealResult")(t.row.appealResult)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"sellerResult",label:"卖家处罚",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(e._f("filterSellerResult")(t.row.sellerResult)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"TradeId",label:"买家处罚",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(e._f("filterSellerResult")(t.row.buyerResult)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"referNo",label:"参考号",width:"180"}})],1)],1),e._v(" "),r("el-footer",[r("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.filterForm.pageSize,"current-page":e.filterForm.pageNum},on:{handleChange:e.handleCurrentChange}})],1)],1)],1)},staticRenderFns:[]};var a=r("VU/8")({name:"complaint-more",data:function(){return{currentPage:1,filterForm:{pageNum:1,pageSize:20,userId:"",appealStatus:2},listData:{total:null,list:[]}}},filters:{filterAppealType:function(e){switch(e){case 1:return"对方未付款";case 2:return"对方未放行";case 3:return"对方无应答";case 4:return"对方有欺诈行为";default:return"其他"}},filterIsBuyer:function(e){switch(e){case 0:return"卖家";case 1:return"买家";default:return"其他"}},filterAppealResult:function(e){switch(e){case 0:return"未确定";case 1:return"胜诉";case 2:return"败诉";case 3:return"取消";default:return"其他"}},filterSellerResult:function(e){switch(e){case 0:return"不惩罚";case 1:return"24之内不能交易";case 2:return"永远不能交易";default:return"其他"}}},methods:{getList:function(){var e=this;this.$http.post("/wallet/app/otc/backmgr/infoShortList",this.filterForm).then(function(t){var r=t.list,l=t.total;e.listData.list=r,e.listData.total=l})},handleCurrentChange:function(e,t){this.filterForm.pageSize=e,this.filterForm.pageNum=t,this.getList()},routerReturn:function(){this.$router.go(-1)}},activated:function(){this.filterForm.userId=this.$route.query.userId,this.getList()}},l,!1,function(e){r("v2vX")},"data-v-713f914d",null);t.default=a.exports},v2vX:function(e,t){}});