webpackJsonp([106],{S0qv:function(e,l){throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: Cannot find module 'tslib'\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:594:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:520:25)\n    at Module.require (internal/modules/cjs/loader.js:650:17)\n    at require (internal/modules/cjs/helpers.js:20:18)\n    at Object.<anonymous> (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_less@3.11.0@less\\dist\\less.cjs.js:3:13)\n    at Module._compile (internal/modules/cjs/loader.js:702:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)\n    at Module.load (internal/modules/cjs/loader.js:612:32)\n    at tryModuleLoad (internal/modules/cjs/loader.js:551:12)\n    at Function.Module._load (internal/modules/cjs/loader.js:543:3)\n    at Module.require (internal/modules/cjs/loader.js:650:17)\n    at require (internal/modules/cjs/helpers.js:20:18)\n    at Object.<anonymous> (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_less@3.11.0@less\\index.js:1:80)\n    at Module._compile (internal/modules/cjs/loader.js:702:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)\n    at Module.load (internal/modules/cjs/loader.js:612:32)\n    at runLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:195:19)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:367:11\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:172:11\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:32:11)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:165:10)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:176:18\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:47:3)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:165:10)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:176:18\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:47:3)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at runLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:365:2)\n    at NormalModule.doBuild (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:182:3)\n    at NormalModule.build (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:275:15)")},ndKW:function(e,l,n){"use strict";Object.defineProperty(l,"__esModule",{value:!0});var r=n("3cXf"),o=n.n(r),t={name:"client",data:function(){return{list:[],ruleForm:{version:"",downUrl:""},dialogTitle:"修改",dialogFormVisible:!1}},methods:{getAppVersionInfoList:function(){var e=this;this.pageNum,this.pageSize;this.$http.post("wallet/backmgr/version/getAppVersionInfoList").then(function(l){var n=l.result.list.list;e.list=n})},updateAppversionInfoForceUpdate:function(e){var l=this;this.$http.post("wallet/backmgr/version/updateAppversionInfoForceUpdate",{isForceUpdate:e.forceUpdate?"YES":"NO",versionId:e.id}).then(function(e){l.$notify({title:"成功",message:e.msg,type:"success"}),l.getAppVersionInfoList()})},switchChange:function(e){var l=this;this.$http.post("wallet/backmgr/version/updateAppVersionInfoOnshelf",{isOnshelf:e.isOnShelf?"YES":"NO",versionId:e.id}).then(function(e){l.$notify({title:"成功",message:e.msg,type:"success"}),l.getAppVersionInfoList()})},modification:function(e){this.dialogTitle="修改"+(2==e.plat?"iOS":"android"),this.dialogFormVisible=!0,this.$refs.ruleForm&&this.$refs.ruleForm.resetFields(),this.ruleForm=JSON.parse(o()(e))},determine:function(){var e=this;this.$refs.ruleForm.validate(function(l){if(!l)return!1;e.$http.post("wallet/backmgr/version/updateAppversionInfo",{plat:2==e.ruleForm.plat?"ios":"adr",versionId:e.ruleForm.id,version:e.ruleForm.version||"empty",downUrl:e.ruleFormwnUrl||"empty"}).then(function(l){e.$notify({title:"成功",message:"修改成功",type:"success"}),e.dialogFormVisible=!1,e.getAppVersionInfoList()})})}},activated:function(){this.getAppVersionInfoList()}},a={render:function(){var e=this,l=e.$createElement,n=e._self._c||l;return n("div",{staticClass:"client"},[n("sac-table",{attrs:{data:e.list}},[n("el-table-column",{attrs:{label:"系统"},scopedSlots:e._u([{key:"default",fn:function(l){return[n("span",[e._v(e._s(2==l.row.plat?"iOS":1==l.row.plat?"android":""))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"版本号",prop:"version"}}),e._v(" "),n("el-table-column",{attrs:{prop:"downUrl",label:"下载链接"}}),e._v(" "),n("el-table-column",{attrs:{prop:"updateTime",label:"更新时间",width:"100"}}),e._v(" "),n("el-table-column",{attrs:{label:"操作",width:"160"},scopedSlots:e._u([{key:"default",fn:function(l){return[n("el-button",{attrs:{type:"success",size:"small"},nativeOn:{click:function(n){return e.modification(l.row)}}},[e._v("修改")])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"强制更新",width:"100"},scopedSlots:e._u([{key:"default",fn:function(l){return[n("el-switch",{attrs:{"inactive-value":0,"active-value":1},nativeOn:{click:function(n){return e.updateAppversionInfoForceUpdate(l.row)}},model:{value:l.row.forceUpdate,callback:function(n){e.$set(l.row,"forceUpdate",n)},expression:"scope.row.forceUpdate"}})]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"上架",width:"100"},scopedSlots:e._u([{key:"default",fn:function(l){return[n("el-switch",{attrs:{"inactive-value":0,"active-value":1},nativeOn:{click:function(n){return e.switchChange(l.row)}},model:{value:l.row.isOnShelf,callback:function(n){e.$set(l.row,"isOnShelf",n)},expression:"scope.row.isOnShelf"}})]}}])})],1),e._v(" "),n("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(l){e.dialogFormVisible=l}}},[n("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,"label-width":"130px"}},[n("el-form-item",{attrs:{label:"版本号：",prop:"version"}},[n("el-input",{attrs:{size:"small",placeholder:"请输入版本号"},model:{value:e.ruleForm.version,callback:function(l){e.$set(e.ruleForm,"version",l)},expression:"ruleForm.version"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"下载链接：",prop:"version"}},[n("el-input",{attrs:{size:"small",placeholder:"请输入下载链接"},model:{value:e.ruleFormwnUrl,callback:function(l){e.ruleFormwnUrl=l},expression:"ruleFormwnUrl"}})],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{size:"small"},on:{click:function(l){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.determine}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var s=n("C7Lr")(t,a,!1,function(e){n("S0qv")},null,null);l.default=s.exports}});