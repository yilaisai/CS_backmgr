webpackJsonp([29],{P5et:function(t,e){},d105:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"brushUser"},[n("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"90px",model:t.filterForm}},[n("sac-input",{ref:"phone",attrs:{label:"用户ID",prop:"phone"},model:{value:t.filterForm.userId,callback:function(e){t.$set(t.filterForm,"userId","string"==typeof e?e.trim():e)},expression:"filterForm.userId"}}),t._v(" "),n("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(e){return t.getListAgencyUser()}}})],1),t._v(" "),n("sac-table",{attrs:{data:t.listData.list}},[n("el-table-column",{attrs:{prop:"userId",label:"用户ID"}}),t._v(" "),n("el-table-column",{attrs:{prop:"phone",label:"用户名"}}),t._v(" "),n("el-table-column",{attrs:{prop:"parentId",label:"上级用户ID"}}),t._v(" "),n("el-table-column",{attrs:{prop:"grade",label:"等级"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(t.gradeListObj[e.row.grade])+"\n      ")]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"userId",label:"操作",width:"250px"},scopedSlots:t._u([{key:"default",fn:function(e){return[4!=+e.row.grade?n("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(n){return t.incident(e.row,"enable")}}},[t._v("指定服务中心\n        ")]):n("el-button",{attrs:{type:"danger",size:"small"},nativeOn:{click:function(n){return t.incident(e.row,"disable")}}},[t._v("取消服务中心\n        ")])]}}])})],1),t._v(" "),n("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}})],1)},staticRenderFns:[]};var a=n("VU/8")({name:"brushUser",data:function(){return{filterForm:{userId:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},gradeListObj:{0:"刷单员",1:"初级代理",2:"中级代理",3:"高级代理",4:"服务中心"}}},methods:{getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.filterForm.pageNum=e,this.getListAgencyUser()},incident:function(t,e){var n=this,r=t.userId,a="disable"===e?"取消服务中心":"指定服务中心";this.$confirm("确取"+a+"吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){n.$http.post("/wallet/backmgr/shop/updateShopForService",{userId:r,state:e}).then(function(t){n.$notify({title:"成功",message:a+"成功",type:"success"}),n.getListAgencyUser()})})},getListAgencyUser:function(){var t=this;this.$http.post("/wallet/backmgr/shop/listAgencyUser",this.filterForm).then(function(e){t.listData.list=e.result.list,t.listData.total=e.result.count})}},activated:function(){this.getListAgencyUser()}},r,!1,function(t){n("P5et")},null,null);e.default=a.exports}});