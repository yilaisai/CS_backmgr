webpackJsonp([63],{A7I7:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"user-history"},[a("el-container",[a("el-header",[a("el-button",{attrs:{type:"primary"},on:{click:t.routerReturn}},[t._v("返回")])],1),t._v(" "),a("el-main",[a("el-table",{attrs:{data:t.listData.list,border:"",height:"100%"}},[a("el-table-column",{attrs:{prop:"userId",label:"用户id"}}),t._v(" "),a("el-table-column",{attrs:{prop:"userName",label:"用户名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"result",label:"客服操作行为"}}),t._v(" "),a("el-table-column",{attrs:{prop:"sysUserName",label:"处理客服"}}),t._v(" "),a("el-table-column",{attrs:{prop:"sysUserId",label:"处理客服ID"}}),t._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"处理时间"}})],1)],1),t._v(" "),a("el-footer",[a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.handleCurrentChange}})],1)],1)],1)},staticRenderFns:[]};var l=a("VU/8")({name:"user-history",data:function(){return{currentPage:1,filterForm:{pageNum:1,pageSize:20},listData:{total:null,list:[]}}},methods:{getList:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/customInfoOperHistory",this.filterForm).then(function(e){var a=e.result,r=a.list,l=a.total;t.listData.list=r,t.listData.total=l})},handleCurrentChange:function(t,e){this.filterForm.pageSize=t,this.filterForm.pageNum=e,this.getList()},routerReturn:function(){this.$router.go(-1)}},activated:function(){this.getList()}},r,!1,function(t){a("bQZ/")},"data-v-4947cd6c",null);e.default=l.exports},"bQZ/":function(t,e){}});