webpackJsonp([46],{FpK8:function(e,t){},"t/iC":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={name:"pagelist",data:function(){return{pageTypeList:[],filterForm:{pageType:"",name:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},dateTime:[]}},methods:{submitForm:function(e){this.filterForm.pageNum=e,this.getPageInfoList()},getPaginationChange:function(e,t){this.filterForm.pageSize=e,this.submitForm(t)},getPageInfoList:function(){var e=this;this.$http.post("/supernode/vote/open/getTeamVoteRankList",{teamName:this.filterForm.name,num:this.filterForm.pageType}).then(function(t){e.listData.list=t.result})},getPageType:function(){var e=this;this.$http.post("/supernode/vote/open/getNumGameInfo",{}).then(function(t){e.pageTypeList=t.result})},addNews:function(){this.$router.push("addnews")}},activated:function(){this.getPageInfoList(),this.getPageType()}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pagelist-page"},[a("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"90px",model:e.filterForm}},[a("sac-input",{ref:"name",attrs:{label:"名称",prop:"name"},model:{value:e.filterForm.name,callback:function(t){e.$set(e.filterForm,"name","string"==typeof t?t.trim():t)},expression:"filterForm.name"}}),e._v(" "),a("el-form-item",{attrs:{label:"时间",prop:"pageType"}},[a("el-select",{ref:"pageType",model:{value:e.filterForm.pageType,callback:function(t){e.$set(e.filterForm,"pageType",t)},expression:"filterForm.pageType"}},e._l(e.pageTypeList,function(e,t){return a("el-option",{key:t,attrs:{label:e.dateStr,value:e.num}})}))],1),e._v(" "),a("el-form-item",[a("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(t){e.submitForm(1)}}})],1)],1),e._v(" "),a("sac-table",{attrs:{data:e.listData.list}},[a("el-table-column",{attrs:{prop:"rank",label:"排行",width:"170"}}),e._v(" "),a("el-table-column",{attrs:{prop:"teamName",label:"名称",width:"200"}}),e._v(" "),a("el-table-column",{attrs:{prop:"totalAmount",label:"总投票数",width:"200"}}),e._v(" "),a("el-table-column",{attrs:{prop:"memberNum",label:"总人数",width:"200"}}),e._v(" "),a("el-table-column",{attrs:{prop:"scoreRate",label:"得分占比",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(100*t.row.scoreRate)+"%\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary"},nativeOn:{click:function(a){e.$router.push({name:"setprize",query:{teamName:t.row.teamName,teamId:t.row.teamId}})}}},[e._v("配置奖励\n        ")])]}}])})],1)],1)},staticRenderFns:[]};var i=a("C7Lr")(r,n,!1,function(e){a("FpK8")},null,null);t.default=i.exports}});