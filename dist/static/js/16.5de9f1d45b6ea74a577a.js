webpackJsonp([16],{GU0w:function(e,a){},vLT0:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n={name:"check-application",data:function(){return{failReason:"",listData:{total:null,list:[]},refuseData:"",pageNum:1,pageSize:20,dialogTitle:"创建应用",server_path:"",transferTypeInfoList:[],currentForm:{},options:{inline:!1,button:!1,navbar:!1,title:!1,toolbar:!1,tooltip:!1,movable:!0,zoomable:!0,rotatable:!0,scalable:!1,transition:!0,fullscreen:!0,keyboard:!0,url:"data-source"},dialogReasonVisibleView:!1}},methods:{goDetail:function(e){this.$router.push({name:"thirdDetail",params:e})},getPaginationChange:function(e,a){this.pageSize=e,this.pageNum=a,this.getThirdAppInfoList()},getThirdAppInfoList:function(){var e=this;this.$http.post("/wallet/backmgr/thirdAppInfo/getWaitingThirdAppList",{pageSize:this.pageSize,pageNum:this.pageNum}).then(function(a){e.listData=a.result.list,e.listData.total=a.result.list.total})},passCheck:function(e,a){var t=this,n=e.appName,l={id:e.id};1!=a||""!=(this.failReason+"").trim()?(1==a?(l.auditStatus="not_pass",l.failReason=this.failReason):l.auditStatus="pass",this.$http.post("/wallet/backmgr/thirdAppInfo/updateThirdAppInfoAuditStatus",l).then(function(e){t.$notify({title:"成功",message:"处理 "+n+"成功",type:"success"}),t.dialogReasonVisibleView=!1,t.getThirdAppInfoList()})):this.$notify({message:"请先输入拒绝原因！",type:"warning"})},showNoPassCheck:function(e){this.dialogReasonVisibleView=!0,this.refuseData=e},modification:function(e){this.$router.push({name:"thirdModify",params:e})}},activated:function(){this.server_path=SERVER_PATH,this.getThirdAppInfoList()}},l={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"created"},[t("sac-table",{attrs:{data:e.listData.list}},[t("el-table-column",{attrs:{prop:"id",label:"序号",width:"100"}}),e._v(" "),t("el-table-column",{attrs:{label:"应用名称",prop:"appName"}}),e._v(" "),t("el-table-column",{attrs:{prop:"app_icon",label:"应用图标"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("viewer",{ref:"viewer",staticClass:"viewer",attrs:{options:e.options}},[a.row.appIcon.indexOf("http")?e._e():t("img",{staticStyle:{"max-width":"100%","max-height":"150px"},attrs:{src:a.row.appIcon,alt:"图标存储地址"}})]),e._v(" "),a.row.appIcon.indexOf("http")?t("span",[e._v(e._s(a.row.appIcon))]):e._e()]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"iosVersion",label:"ios版本号",width:"120"}}),e._v(" "),t("el-table-column",{attrs:{prop:"adrVersion",label:"android版本号",width:"120"}}),e._v(" "),t("el-table-column",{attrs:{prop:"appId",label:"APPID",width:"180"}}),e._v(" "),t("el-table-column",{attrs:{prop:"createTime",label:"创建时间",width:"200"}}),e._v(" "),t("el-table-column",{attrs:{label:"操作",width:"200"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-button",{attrs:{type:"success",size:"small"},nativeOn:{click:function(t){return e.goDetail(a.row)}}},[e._v("查看详情\n        ")]),e._v(" "),t("el-button",{attrs:{type:"warning",size:"small"},nativeOn:{click:function(t){return e.modification(a.row)}}},[e._v("修改\n        ")])]}}])}),e._v(" "),t("el-table-column",{attrs:{label:"操作",width:"200"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-button",{attrs:{type:"success",size:"small"},nativeOn:{click:function(t){return e.passCheck(a.row)}}},[e._v("审核通过\n        ")]),e._v(" "),t("el-button",{attrs:{type:"danger",size:"small",disabled:0==a.row.auditStatus},nativeOn:{click:function(t){return e.showNoPassCheck(a.row)}}},[e._v("拒绝\n        ")])]}}])})],1),e._v(" "),t("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.pageSize,"current-page":e.pageNum},on:{handleChange:e.getPaginationChange}}),e._v(" "),t("el-dialog",{attrs:{title:"拒绝原因",visible:e.dialogReasonVisibleView,width:"600px"},on:{"update:visible":function(a){e.dialogReasonVisibleView=a}}},[t("el-input",{attrs:{type:"textarea",rows:3,size:"small",placeholder:"请输入拒绝原因"},model:{value:e.failReason,callback:function(a){e.failReason=a},expression:"failReason"}}),e._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{size:"small"},on:{click:function(a){e.dialogReasonVisibleView=!1}}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return e.passCheck(e.refuseData,1)}}},[e._v("确定")])],1)],1)],1)},staticRenderFns:[]};var o=t("C7Lr")(n,l,!1,function(e){t("GU0w"),t("yXEG")},null,null);a.default=o.exports},yXEG:function(e,a){throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: Cannot find module 'tslib'\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:594:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:520:25)\n    at Module.require (internal/modules/cjs/loader.js:650:17)\n    at require (internal/modules/cjs/helpers.js:20:18)\n    at Object.<anonymous> (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_less@3.11.0@less\\dist\\less.cjs.js:3:13)\n    at Module._compile (internal/modules/cjs/loader.js:702:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)\n    at Module.load (internal/modules/cjs/loader.js:612:32)\n    at tryModuleLoad (internal/modules/cjs/loader.js:551:12)\n    at Function.Module._load (internal/modules/cjs/loader.js:543:3)\n    at Module.require (internal/modules/cjs/loader.js:650:17)\n    at require (internal/modules/cjs/helpers.js:20:18)\n    at Object.<anonymous> (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_less@3.11.0@less\\index.js:1:80)\n    at Module._compile (internal/modules/cjs/loader.js:702:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)\n    at Module.load (internal/modules/cjs/loader.js:612:32)\n    at runLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:195:19)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:367:11\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:172:11\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:32:11)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:165:10)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:176:18\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:47:3)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:165:10)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:176:18\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:47:3)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at runLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:365:2)\n    at NormalModule.doBuild (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:182:3)\n    at NormalModule.build (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:275:15)")}});