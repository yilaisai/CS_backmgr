webpackJsonp([91],{EbR2:function(t,e){},KOie:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"customer-log"},[a("el-container",[a("el-header",[a("el-button",{attrs:{type:"primary"},on:{click:t.routerReturn}},[t._v("返回")])],1),t._v(" "),a("el-main",[a("el-table",{attrs:{data:t.listData.list,border:"",height:"100%"}},[a("el-table-column",{attrs:{prop:"TradeId",label:"订单号",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"masterUserId",label:"用户id",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{prop:"isBuyer",label:"身份",width:"60"},scopedSlots:t._u([{key:"default",fn:function(e){return[(e.row.isBuyer,a("span",[t._v("卖家")]))]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"appealType",label:"投诉类型",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"slaveUserId",label:"被告ID",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"referNo",label:"付款参考号",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"appealResult",label:"申诉结果",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"buyerResult",label:"处理买方",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"salerResult",label:"处理卖方",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"sysUserId",label:"客服编号",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{prop:"sysUserName",label:"客服姓名",width:"100"}})],1)],1),t._v(" "),a("el-footer",[a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.handleCurrentChange}})],1)],1)],1)},staticRenderFns:[]};var r=a("VU/8")({name:"customer-log",data:function(){return{currentPage:1,filterForm:{pageNum:1,pageSize:20},listData:{total:null,list:[]}}},methods:{getList:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/appealRecdOperHistory",this.filterForm).then(function(e){var a=e.result,l=a.list,r=a.total;t.listData.list=l,t.listData.total=r})},handleCurrentChange:function(t,e){this.filterForm.pageSize=t,this.filterForm.pageNum=e,this.getList()},routerReturn:function(){this.$router.go(-1)}},activated:function(){this.getList()}},l,!1,function(t){a("EbR2")},"data-v-0dcdb942",null);e.default=r.exports}});