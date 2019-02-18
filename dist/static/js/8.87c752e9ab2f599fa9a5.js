webpackJsonp([8],{"3eDD":function(t,e){},fohv:function(t,e){},ioFa:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"created"},[a("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"90px",model:t.filterForm}},[a("el-col",{attrs:{inline:!0,span:14}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入"+t.filterForm.key,size:"small"},model:{value:t.filterForm.value,callback:function(e){t.$set(t.filterForm,"value",e)},expression:"filterForm.value"}},[a("el-select",{attrs:{slot:"prepend",placeholder:"请选择"},slot:"prepend",model:{value:t.filterForm.key,callback:function(e){t.$set(t.filterForm,"key",e)},expression:"filterForm.key"}},[a("el-option",{attrs:{label:"appId",value:"appId"}}),t._v(" "),a("el-option",{attrs:{label:"appName",value:"appName"}}),t._v(" "),a("el-option",{attrs:{label:"appNameEn",value:"appNameEn"}})],1)],1),t._v(" "),a("el-button",{staticStyle:{"margin-top":"5px"},attrs:{type:"primary",size:"small"},nativeOn:{click:function(e){return t.queryEvents(e)}}},[t._v("查询")]),t._v(" "),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"将已配置的APPID以邮箱和短信的形式一键发送给第三方",placement:"top"}},[a("el-button",{staticStyle:{"margin-top":"5px"},attrs:{type:"primary",size:"small"},nativeOn:{click:function(e){t.sendAPPID()}}},[t._v("发送")])],1)],1),t._v(" "),a("el-col",{attrs:{inline:!0,span:10,align:"right"}},[a("el-button",{staticStyle:{"margin-top":"5px"},attrs:{size:"small",type:"primary"},on:{click:t.addCreate}},[t._v("创建应用")])],1)],1),t._v(" "),a("sac-table",{attrs:{data:t.listData.list}},[a("el-table-column",{attrs:{prop:"id",label:"序号",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{label:"应用类型"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.appType?a("span",[t._v("游戏")]):t._e(),t._v(" "),1==e.row.appType?a("span",[t._v("社交")]):t._e(),t._v(" "),2==e.row.appType?a("span",[t._v("电商")]):t._e(),t._v(" "),3==e.row.appType?a("span",[t._v("平台")]):t._e(),t._v(" "),4==e.row.appType?a("span",[t._v("媒体")]):t._e(),t._v(" "),5==e.row.appType?a("span",[t._v("其他")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"名称",prop:"appName"}}),t._v(" "),a("el-table-column",{attrs:{label:"英文名称",prop:"appNameEn"}}),t._v(" "),a("el-table-column",{attrs:{prop:"appIcon",label:"图标存储地址"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("viewer",{ref:"viewer",staticClass:"viewer",attrs:{options:t.options}},[e.row.appIcon.indexOf("http")?t._e():a("img",{staticStyle:{"max-width":"100%","max-height":"150px"},attrs:{src:e.row.appIcon,alt:"图标存储地址"}})]),t._v(" "),e.row.appIcon.indexOf("http")?a("span",[t._v(t._s(e.row.appIcon))]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"iosVersion",label:"ios版本号",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"adrVersion",label:"android版本号",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"appId",label:"APPID",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"创建时间",width:"200"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"success",size:"small"},nativeOn:{click:function(a){t.goDetail(e.row)}}},[t._v("查看详情\n        ")]),t._v(" "),a("el-button",{attrs:{type:"warning",disabled:0!=e.row.isShow,size:"small"},nativeOn:{click:function(a){t.modification(e.row)}}},[t._v("修改\n        ")]),t._v(" "),a("el-button",{attrs:{type:"danger",disabled:0!=e.row.isShow,size:"small"},nativeOn:{click:function(a){t.remove(e.row)}}},[t._v("\n          删除\n        ")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"上架",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-switch",{attrs:{"inactive-value":0,"active-value":1},nativeOn:{click:function(a){t.switchChange(e.row)}},model:{value:e.row.isShow,callback:function(a){t.$set(e.row,"isShow",a)},expression:"scope.row.isShow"}})]}}])})],1),t._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.pageSize,"current-page":t.pageNum},on:{handleChange:t.getPaginationChange}})],1)},staticRenderFns:[]};var l=a("VU/8")({name:"created",data:function(){return{filterForm:{value:"",key:"appId"},listData:{total:null,list:[]},pageNum:1,pageSize:20,options:{inline:!1,button:!1,navbar:!1,title:!1,toolbar:!1,tooltip:!1,movable:!0,zoomable:!0,rotatable:!0,scalable:!1,transition:!0,fullscreen:!0,keyboard:!0,url:"data-source"}}},methods:{sendAPPID:function(){var t=this;this.$http.post("wallet/backmgr/thirdAppInfo/sendEmailByAppId.do",{value:this.filterForm.value,key:this.filterForm.key}).then(function(e){t.$notify({title:"成功",message:t.filterForm.key+e.msg,type:"success"})})},queryEvents:function(){var t=this;this.$http.post("wallet/backmgr/thirdAppInfo/findAppByField.do",{value:this.filterForm.value,key:this.filterForm.key}).then(function(e){t.listData=e.result})},getPaginationChange:function(t,e){this.pageSize=t,this.pageNum=e,this.getThirdAppInfoList()},getThirdAppInfoList:function(){var t=this;this.$http.post("wallet/backmgr/thirdAppInfo/getThirdAppInfoList.do",{pageSize:this.pageSize,pageNum:this.pageNum}).then(function(e){t.listData=e.result.list,t.listData.total=e.result.list.total})},switchChange:function(t){var e=this,a=t.isShow,i=t.id,l=t.appName;this.$http.post("wallet/backmgr/thirdAppInfo/updateThirdAppInfoIsShow.do",{isShow:a?"SHOW":"HIDE",id:i}).then(function(t){e.$notify({title:"成功",message:l+" "+(a?"上架":"下架")+" 成功",type:"success"})})},remove:function(t){var e=this,a=t.appName,i=t.id;this.$confirm("确定删除 "+a+" 应用?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$http.post("wallet/backmgr/thirdAppInfo/updateThirdAppInfoSysStatus.do",{sysStatus:"INVALID0",id:i}).then(function(t){e.$notify({title:"成功",message:"删除 "+a+"成功",type:"success"}),e.getThirdAppInfoList()})})},addCreate:function(){this.$router.push({name:"thirdModify"})},modification:function(t){this.$router.push({name:"thirdModify",params:t})},goDetail:function(t){this.$router.push({name:"thirdDetail",params:t})}},activated:function(){this.getThirdAppInfoList()}},i,!1,function(t){a("fohv"),a("3eDD")},null,null);e.default=l.exports}});