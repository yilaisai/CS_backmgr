webpackJsonp([53],{XAGq:function(t,e){},"t/iC":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={name:"pagelist",data:function(){return{pageTypeList:[],filterForm:{pageType:"",name:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},dateTime:[]}},methods:{submitForm:function(t){this.filterForm.pageNum=t,this.getPageInfoList()},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.submitForm(e)},getPageInfoList:function(){var t=this;this.$http.post("/supernode/vote/open/getTeamVoteRankList",{teamName:this.filterForm.name,num:this.filterForm.pageType}).then(function(e){t.listData.list=e.result})},getPageType:function(){var t=this;this.$http.post("/supernode/vote/open/getNumGameInfo",{}).then(function(e){e.result.map(function(t){t.dateStr=(t.num?"第"+t.num+"期：":"当前期：")+t.dateStr.substr(0,4)+"."+t.dateStr.substr(4,2)+"."+t.dateStr.substr(6,7)+"."+t.dateStr.substr(13,2)+"."+t.dateStr.substr(15,2)}),t.pageTypeList=e.result})},addNews:function(){this.$router.push("addnews")}},activated:function(){this.getPageInfoList(),this.getPageType()}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pagelist-page"},[a("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"90px",model:t.filterForm}},[a("sac-input",{ref:"name",attrs:{label:"名称",prop:"name"},model:{value:t.filterForm.name,callback:function(e){t.$set(t.filterForm,"name","string"==typeof e?e.trim():e)},expression:"filterForm.name"}}),t._v(" "),a("el-form-item",{attrs:{label:"期　　数：",prop:"pageType"}},[a("el-select",{ref:"pageType",attrs:{size:"small"},model:{value:t.filterForm.pageType,callback:function(e){t.$set(t.filterForm,"pageType",e)},expression:"filterForm.pageType"}},t._l(t.pageTypeList,function(t,e){return a("el-option",{key:e,attrs:{label:t.dateStr,value:t.num}})}))],1),t._v(" "),a("el-form-item",[a("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(e){t.submitForm(1)}}})],1)],1),t._v(" "),a("sac-table",{attrs:{data:t.listData.list}},[a("el-table-column",{attrs:{prop:"rank",label:"排行",width:"170"}}),t._v(" "),a("el-table-column",{attrs:{prop:"teamName",label:"名称",width:"200"}}),t._v(" "),a("el-table-column",{attrs:{prop:"totalAmount",label:"总投票数",width:"200"}}),t._v(" "),a("el-table-column",{attrs:{prop:"memberNum",label:"总人数",width:"200"}}),t._v(" "),a("el-table-column",{attrs:{prop:"scoreRate",label:"得分占比",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s((100*e.row.scoreRate).toFixed(2))+"%\n      ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.teamId?a("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(a){t.$router.push({name:"setprize",query:{teamName:e.row.teamName,teamId:e.row.teamId}})}}},[t._v("\n          配置奖励\n        ")]):t._e()]}}])})],1)],1)},staticRenderFns:[]};var s=a("C7Lr")(r,n,!1,function(t){a("XAGq")},null,null);e.default=s.exports}});