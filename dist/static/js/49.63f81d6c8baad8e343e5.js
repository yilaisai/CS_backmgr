webpackJsonp([49],{S37y:function(e,t){},ndKW:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=i("mvHQ"),o=i.n(l),r={name:"client",data:function(){return{list:[],ruleForm:{version:"",downUrl:""},dialogTitle:"修改",dialogFormVisible:!1}},methods:{getAppVersionInfoList:function(){var e=this;this.pageNum,this.pageSize;this.$http.post("wallet/backmgr/version/getAppVersionInfoList").then(function(t){var i=t.result.list.list;e.list=i})},updateAppversionInfoForceUpdate:function(e){var t=this;this.$http.post("wallet/backmgr/version/updateAppversionInfoForceUpdate",{isForceUpdate:e.forceUpdate?"YES":"NO",versionId:e.id}).then(function(e){t.$notify({title:"成功",message:e.msg,type:"success"}),t.getAppVersionInfoList()})},switchChange:function(e){var t=this;this.$http.post("wallet/backmgr/version/updateAppVersionInfoOnshelf",{isOnshelf:e.isOnShelf?"YES":"NO",versionId:e.id}).then(function(e){t.$notify({title:"成功",message:e.msg,type:"success"}),t.getAppVersionInfoList()})},modification:function(e){this.dialogTitle="修改"+(2==e.plat?"iOS":"android"),this.dialogFormVisible=!0,this.$refs.ruleForm&&this.$refs.ruleForm.resetFields(),this.ruleForm=JSON.parse(o()(e))},determine:function(){var e=this;this.$refs.ruleForm.validate(function(t){if(!t)return!1;e.$http.post("wallet/backmgr/version/updateAppversionInfo",{plat:2==e.ruleForm.plat?"ios":"adr",versionId:e.ruleForm.id,version:e.ruleForm.version||"empty",downUrl:e.ruleFormwnUrl||"empty"}).then(function(t){e.$notify({title:"成功",message:"修改成功",type:"success"}),e.dialogFormVisible=!1,e.getAppVersionInfoList()})})}},activated:function(){this.getAppVersionInfoList()}},n={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"client"},[i("sac-table",{attrs:{data:e.list}},[i("el-table-column",{attrs:{label:"系统"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(2==t.row.plat?"iOS":1==t.row.plat?"android":""))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"版本号",prop:"version"}}),e._v(" "),i("el-table-column",{attrs:{prop:"downUrl",label:"下载链接"}}),e._v(" "),i("el-table-column",{attrs:{prop:"updateTime",label:"更新时间",width:"100"}}),e._v(" "),i("el-table-column",{attrs:{label:"操作",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"success",size:"small"},nativeOn:{click:function(i){return e.modification(t.row)}}},[e._v("修改")])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"强制更新",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-switch",{attrs:{"inactive-value":0,"active-value":1},nativeOn:{click:function(i){return e.updateAppversionInfoForceUpdate(t.row)}},model:{value:t.row.forceUpdate,callback:function(i){e.$set(t.row,"forceUpdate",i)},expression:"scope.row.forceUpdate"}})]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"上架",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-switch",{attrs:{"inactive-value":0,"active-value":1},nativeOn:{click:function(i){return e.switchChange(t.row)}},model:{value:t.row.isOnShelf,callback:function(i){e.$set(t.row,"isOnShelf",i)},expression:"scope.row.isOnShelf"}})]}}])})],1),e._v(" "),i("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[i("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,"label-width":"130px"}},[i("el-form-item",{attrs:{label:"版本号：",prop:"version"}},[i("el-input",{attrs:{size:"small",placeholder:"请输入版本号"},model:{value:e.ruleForm.version,callback:function(t){e.$set(e.ruleForm,"version",t)},expression:"ruleForm.version"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"下载链接：",prop:"version"}},[i("el-input",{attrs:{size:"small",placeholder:"请输入下载链接"},model:{value:e.ruleFormwnUrl,callback:function(t){e.ruleFormwnUrl=t},expression:"ruleFormwnUrl"}})],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.determine}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var s=i("VU/8")(r,n,!1,function(e){i("S37y")},null,null);t.default=s.exports}});