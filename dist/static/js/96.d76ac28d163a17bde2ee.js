webpackJsonp([96],{Zok6:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"messageDetails"},[i("el-row",{staticStyle:{"margin-bottom":"20px"}},[i("el-col",{attrs:{span:4}},[i("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(e){return t.$router.go(-1)}}},[t._v("返回")])],1)],1),t._v(" "),i("el-table",{ref:"multipleTable",attrs:{height:"100%",size:"small",data:t.listData.list,border:""}},[i("el-table-column",{attrs:{prop:"failed_count",label:"剩余发送数量"}}),t._v(" "),i("el-table-column",{attrs:{prop:"finished_count",label:"发送成功数量"}}),t._v(" "),i("el-table-column",{attrs:{prop:"failed_count",label:"发送失败数量"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.failed_count))]),t._v(" "),4==t.status?i("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",size:"small"},nativeOn:{click:function(i){return t.resendSms(e.row,e.$index)}}},[t._v("重新发送\n          ")]):t._e()]}}])})],1),t._v(" "),i("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}})],1)},staticRenderFns:[]};var s=i("VU/8")({name:"messageDetails",data:function(){return{filterForm:{id:"",pageNum:1,pageSize:20},status:0,listData:{total:1,list:[{failed_count:"",finished_count:"",id:"",title:"",total_count:""}]},readList:[{value:"",label:"全部"},{value:"YES",label:"已读"},{value:"NO",label:"未读"}]}},methods:{submitForm:function(t){this.filterForm.pageNum=t,this.getUserNoticeRecd()},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.submitForm(e)},getUserNoticeRecd:function(){var t=this;this.filterForm.id=this.$route.query.id,this.status=this.$route.query.status,this.$http.post("wallet/backmgr/push/getMsgPushPlanProgressById",this.filterForm).then(function(e){var i=e.result,a=i.failed_count,s=i.finished_count,l=i.id,n=i.title,r=i.total_count;t.listData.list[0].failed_count=a,t.listData.list[0].finished_count=s,t.listData.list[0].id=l,t.listData.list[0].title=n,t.listData.list[0].total_count=r})},resendSms:function(t,e){var i=this,a={id:this.filterForm.id};this.$http.post("wallet/backmgr/push/reExecuteMsgPushPlan",a).then(function(t){i.$notify({title:"成功",message:"重新推送成功",type:"success"}),i.getUserNoticeRecd()})}},activated:function(){this.getUserNoticeRecd()}},a,!1,function(t){i("k7w8")},null,null);e.default=s.exports},k7w8:function(t,e){}});