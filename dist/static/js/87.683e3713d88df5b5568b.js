webpackJsonp([87],{OL3q:function(e,a,r){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n={name:"feedbackDetails",data:function(){return{details:{rtypeName:"",createTime:"",contactData:"",opStatus:"",content:"",remark:""},submitForm:{remark:"",fId:""},imgArray:[],options:{inline:!1,button:!1,navbar:!1,title:!1,toolbar:!0,tooltip:!1,movable:!0,zoomable:!0,rotatable:!0,scalable:!1,transition:!0,fullscreen:!0,keyboard:!0,url:"data-source"}}},methods:{onSubmit:function(){var e=this,a={remark:this.details.remark,fId:this.submitForm.fId};this.$http.post("/wallet/backmgr/feedback/operateFeedback",a).then(function(a){e.$message({message:a.msg,type:"success"}),e.$router.go(-1)})}},activated:function(){this.$route.params.id?(this.details=this.$route.params,this.submitForm.fId=this.$route.params.id,this.imgArray=this.$route.params.otherFile.split(",")):this.$router.go(-1)}},l={render:function(){var e=this,a=e.$createElement,r=e._self._c||a;return r("div",{staticClass:"feedbackDetails"},[r("el-row",{staticStyle:{"margin-bottom":"20px"}},[r("el-col",{attrs:{span:4}},[r("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(a){return e.$router.go(-1)}}},[e._v("返回")])],1)],1),e._v(" "),r("div",{staticClass:"content"},[r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:6}},[r("span",[e._v("问题类型：")]),r("span",[e._v(e._s(e.details.rtypeName))])]),e._v(" "),r("el-col",{attrs:{span:6}},[r("span",[e._v("创建日期：")]),r("span",[e._v(e._s(e.details.createTime))])]),e._v(" "),r("el-col",{attrs:{span:6}},[r("span",[e._v("联系方式：")]),r("span",[e._v(e._s(e.details.contactData))])]),e._v(" "),r("el-col",{attrs:{span:6}},[r("span",[e._v("状态：")]),r("span",{class:{info:!e.details.opStatus,success:e.details.opStatus}},[e._v(e._s(e.details.opStatus?"已处理":"未处理"))])])],1),e._v(" "),r("el-form",{ref:"form",staticClass:"submitForm",attrs:{inline:!0,model:e.submitForm}},[r("el-form-item",{attrs:{label:"备注"}},[r("el-input",{model:{value:e.details.remark,callback:function(a){e.$set(e.details,"remark",a)},expression:"details.remark"}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary",disabled:1==e.details.opStatus},on:{click:e.onSubmit}},[e._v("处理")])],1)],1),e._v(" "),r("h3",[e._v("意见反馈：")]),e._v(" "),r("p",{staticClass:"details"},[e._v(e._s(e.details.content))]),e._v(" "),e.imgArray.length?r("div",[r("viewer",{ref:"viewer",staticClass:"viewer",attrs:{options:e.options}},e._l(e.imgArray,function(e){return r("img",{attrs:{src:e,alt:""}})}),0)],1):e._e()],1)],1)},staticRenderFns:[]};var t=r("C7Lr")(n,l,!1,function(e){r("iBZm")},null,null);a.default=t.exports},iBZm:function(e,a){throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: Cannot find module 'tslib'\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:594:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:520:25)\n    at Module.require (internal/modules/cjs/loader.js:650:17)\n    at require (internal/modules/cjs/helpers.js:20:18)\n    at Object.<anonymous> (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_less@3.11.0@less\\dist\\less.cjs.js:3:13)\n    at Module._compile (internal/modules/cjs/loader.js:702:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)\n    at Module.load (internal/modules/cjs/loader.js:612:32)\n    at tryModuleLoad (internal/modules/cjs/loader.js:551:12)\n    at Function.Module._load (internal/modules/cjs/loader.js:543:3)\n    at Module.require (internal/modules/cjs/loader.js:650:17)\n    at require (internal/modules/cjs/helpers.js:20:18)\n    at Object.<anonymous> (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_less@3.11.0@less\\index.js:1:80)\n    at Module._compile (internal/modules/cjs/loader.js:702:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)\n    at Module.load (internal/modules/cjs/loader.js:612:32)\n    at runLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:195:19)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:367:11\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:172:11\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:32:11)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:165:10)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:176:18\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:47:3)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:165:10)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:176:18\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:47:3)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at runLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:365:2)\n    at NormalModule.doBuild (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:182:3)\n    at NormalModule.build (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:275:15)")}});