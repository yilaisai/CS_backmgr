webpackJsonp([20],{"5/vh":function(t,a){},aZgJ:function(t,a){},pKT2:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"shelf-application"},[e("sac-table",{attrs:{data:t.listData.list}},[e("el-table-column",{attrs:{label:"图标",align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("viewer",{ref:"viewer",staticClass:"viewer",attrs:{options:t.options}},[a.row.appIcon.indexOf("http")?t._e():e("img",{staticStyle:{"max-width":"100%","max-height":"150px"},attrs:{src:a.row.appIcon,alt:"图标存储地址"}})]),t._v(" "),a.row.appIcon.indexOf("http")?e("span",[t._v(t._s(a.row.appIcon))]):t._e()]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"appName",label:"名称",align:"center"}}),t._v(" "),e("el-table-column",{attrs:{label:"用户兑换申请",width:"140",align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-button",{attrs:{size:"small",type:"primary"},nativeOn:{click:function(e){return t.$router.push({name:"applicationDetails",params:{appId:a.row.appId,appName:a.row.appName,details:1}})}}},[t._v("查看\n        ")])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"操作",width:"280",align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-button",{attrs:{size:"small",type:"primary"},nativeOn:{click:function(e){return t.$router.push({name:"applicationDetails",params:{appId:a.row.appId,appName:a.row.appName,details:2}})}}},[t._v("\n          详细账单查询\n        ")]),t._v(" "),e("el-button",{attrs:{size:"small",type:"primary"},nativeOn:{click:function(e){return t.$router.push({name:"applicationDetails",params:{appId:a.row.appId,appName:a.row.appName,details:3}})}}},[t._v("\n          总账单查询\n        ")])]}}])})],1),t._v(" "),e("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.pageSize,"current-page":t.pageNum},on:{handleChange:t.getPaginationChange}})],1)},staticRenderFns:[]};var i=e("C7Lr")({name:"shelf-application",data:function(){return{listData:{total:null,list:[]},pageNum:1,pageSize:20,options:{inline:!1,button:!1,navbar:!1,title:!1,toolbar:!1,tooltip:!1,movable:!0,zoomable:!0,rotatable:!0,scalable:!1,transition:!0,fullscreen:!0,keyboard:!0,url:"data-source"}}},methods:{getPaginationChange:function(t,a){this.pageSize=t,this.pageNum=a,this.getThirdAppInfoList()},getThirdAppInfoList:function(){var t=this;this.$http.post("wallet/backmgr/thirdAppInfo/getThirdAppInfoList",{pageSize:this.pageSize,pageNum:this.pageNum,isShow:"SHOW"}).then(function(a){t.listData=a.result.list})}},activated:function(){this.getThirdAppInfoList()}},n,!1,function(t){e("aZgJ"),e("5/vh")},null,null);a.default=i.exports}});