webpackJsonp([21],{BYGd:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("Dd8w"),s=a.n(i),l={name:"messageDetails",data:function(){return{filterForm:{isRead:"",sendStatus:"",noticeInfoId:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},readList:[{value:"",label:"全部"},{value:"YES",label:"已读"},{value:"NO",label:"未读"}]}},methods:{submitForm:function(t){this.filterForm.pageNum=t,this.getUserNoticeRecd()},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.submitForm(e)},getUserNoticeRecd:function(){var t=this;this.$http.post("wallet/backmgr/userNoticeRecd/getUserNoticeRecd",s()({},this.filterForm,{noticeInfoId:this.$route.query.id})).then(function(e){var a=e.result.list,i=a.list,s=a.total;t.listData.list=i,t.listData.total=s})},formatIsRead:function(t,e){return 0==t.isRead?"未读":"已读"},formatSendStatus:function(t,e){return 0==t.sendStatues?"发送失败":"发送成功"}},activated:function(){this.filterForm.isRead="",this.$refs.isRead.reset(),this.getUserNoticeRecd()}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"messageDetails"},[a("el-row",{staticStyle:{"margin-bottom":"20px"}},[a("el-col",{attrs:{span:4}},[a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(e){return t.$router.go(-1)}}},[t._v("返回")])],1)],1),t._v(" "),a("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"100px",model:t.filterForm}},[a("sac-select",{ref:"isRead",attrs:{label:"阅读情况",dataList:t.readList},model:{value:t.filterForm.isRead,callback:function(e){t.$set(t.filterForm,"isRead",e)},expression:"filterForm.isRead"}}),t._v(" "),a("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(e){return t.submitForm(1)}}})],1),t._v(" "),a("el-table",{ref:"multipleTable",attrs:{height:"100%",size:"small",data:t.listData.list,border:""}},[a("el-table-column",{attrs:{prop:"phone",label:"用户"}}),t._v(" "),a("el-table-column",{attrs:{prop:"isRead",label:"阅读情况",formatter:t.formatIsRead}}),t._v(" "),a("el-table-column",{attrs:{prop:"sendStatues",label:"发送情况",formatter:t.formatSendStatus}}),t._v(" "),a("el-table-column",{attrs:{prop:"sendTime",label:"发送日期"}})],1),t._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}})],1)},staticRenderFns:[]};var o=a("VU/8")(l,r,!1,function(t){a("cLaC")},null,null);e.default=o.exports},cLaC:function(t,e){}});