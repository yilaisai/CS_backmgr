webpackJsonp([18],{"64Ub":function(e,r){throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: Cannot find module 'tslib'\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:594:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:520:25)\n    at Module.require (internal/modules/cjs/loader.js:650:17)\n    at require (internal/modules/cjs/helpers.js:20:18)\n    at Object.<anonymous> (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_less@3.11.0@less\\dist\\less.cjs.js:3:13)\n    at Module._compile (internal/modules/cjs/loader.js:702:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)\n    at Module.load (internal/modules/cjs/loader.js:612:32)\n    at tryModuleLoad (internal/modules/cjs/loader.js:551:12)\n    at Function.Module._load (internal/modules/cjs/loader.js:543:3)\n    at Module.require (internal/modules/cjs/loader.js:650:17)\n    at require (internal/modules/cjs/helpers.js:20:18)\n    at Object.<anonymous> (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_less@3.11.0@less\\index.js:1:80)\n    at Module._compile (internal/modules/cjs/loader.js:702:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)\n    at Module.load (internal/modules/cjs/loader.js:612:32)\n    at runLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:195:19)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:367:11\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:172:11\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:32:11)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:165:10)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:176:18\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:47:3)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:165:10)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:176:18\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:47:3)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at runLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:365:2)\n    at NormalModule.doBuild (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:182:3)\n    at NormalModule.build (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:275:15)")},b9oY:function(e,r){},dx7h:function(e,r,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=n("3cXf"),t=n.n(a),l=n("IHPB"),o=n.n(l),s=n("a3Yh"),i=n.n(s),u={name:"banner",data:function(){var e;return{selectedDate:[],filterForm:{bannerType:"",bannerName:"",beginTime:"",endTime:"",isOnShelf:"",pageNum:1,pageSize:20},token:localStorage.getItem("wallet_token"),listData:{total:null,list:[]},bannerOnShelfList:[{value:"",label:"全部"},{value:"1",label:"上架"},{value:"0",label:"下架"}],typeList:{value:"code",label:"typeName"},bannerTypeList:[],isShowAddDialog:!1,loading:!1,ruleForm:(e={bannerUrl:"",bannerType:"",bannerName:"",jumpUrl:"",weight:""},i()(e,"bannerType",""),i()(e,"remark",""),e),dialogTitle:"",rules:{bannerUrl:[{required:!0,message:"请输入banner图片地址",trigger:"blur"}],bannerName:[{required:!0,message:"请选择banner名称",trigger:"change"}],bannerType:[{required:!0,message:"请选择banner类型",trigger:"change"}],jumpUrl:[{required:!1,message:"请输入跳转链接",trigger:"blur"}]},server_path:"",options:{inline:!1,button:!1,navbar:!1,title:!1,toolbar:!1,tooltip:!1,movable:!0,zoomable:!0,rotatable:!0,scalable:!1,transition:!0,fullscreen:!0,keyboard:!0,url:"data-source"}}},methods:{resetForm:function(){var e;this.ruleForm=(e={bannerUrl:"",bannerType:"",bannerName:"",jumpUrl:"",weight:""},i()(e,"bannerType",""),i()(e,"remark",""),e),this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},submitForm:function(e){this.filterForm.pageNum=e,this.getAppBannerInfos()},getPaginationChange:function(e,r){this.filterForm.pageSize=e,this.submitForm(r)},getBannerTypeList:function(){var e=this;this.$http.post("supernode/backmgr/banner/open/getBannerTypeList",this.filterForm).then(function(r){e.bannerTypeList=[{typeName:"全部",code:""}].concat(o()(r.result))})},getAppBannerInfos:function(){var e=this;this.$http.post("supernode/backmgr/banner/open/list",this.filterForm).then(function(r){e.listData.list=r.result.list,e.listData.total=r.result.total})},remove:function(e){var r=this,n=e.id,a=e.bannerName;this.$confirm("确定删除 "+a+" 吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){r.$http.post("supernode/backmgr/banner/delete",{id:n}).then(function(e){r.$notify({title:"成功",message:"删除 "+a+"成功",type:"success"}),r.getAppBannerInfos()})})},switchChange:function(e){var r=this,n=e.isOnShelf,a=e.id,t=e.bannerName;this.$http.post("supernode/backmgr/banner/isOnShelf",{isOnShelf:n?"1":"0",id:a}).then(function(e){r.$notify({title:"成功",message:t+" "+(n?"上架":"下架")+" 成功",type:"success"}),r.getAppBannerInfos()})},upload:function(e,r,n){this.ruleForm.bannerUrl=e.result.urls[0],this.loading=!1},beforeUpload:function(){this.loading=!0},addBanner:function(){this.resetForm(),this.dialogTitle="创建banner",this.isShowAddDialog=!0},modification:function(e){this.resetForm(),this.isShowAddDialog=!0,this.ruleForm=JSON.parse(t()(e)),this.dialogTitle="修改 "+this.ruleForm.bannerName+" 的banner"},determine:function(){var e=this;this.$refs.ruleForm.validate(function(r){if(!r)return!1;if(e.ruleForm.id){var n=e.ruleForm,a=n.bannerType,t=n.id,l=n.bannerName,o=n.jumpUrl,s=n.bannerUrl,i=n.weight,u=n.remark;e.$http.post("supernode/backmgr/banner/update",{bannerType:a,id:t,bannerName:l,jumpUrl:o||"empty",bannerUrl:s,weight:i,remark:u||"empty"}).then(function(r){e.resetForm(),e.isShowAddDialog=!1,e.$notify({title:"成功",message:"修改 "+l+" banner成功",type:"success"}),e.getAppBannerInfos()})}else e.$http.post("supernode/backmgr/banner/create",e.ruleForm).then(function(r){e.$notify({title:"成功",message:"创建 "+e.ruleForm.bannerName+" banner成功",type:"success"}),e.isShowAddDialog=!1,e.submitForm(1)})})}},activated:function(){this.server_path=SERVER_PATH,this.getAppBannerInfos(),this.getBannerTypeList()}},d={render:function(){var e=this,r=e.$createElement,n=e._self._c||r;return n("div",{staticClass:"banner"},[n("el-col",{staticStyle:{"text-align":"right"},attrs:{span:22}},[n("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.addBanner}},[e._v("创建banner")])],1),e._v(" "),n("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"100px",model:e.filterForm}},[n("sac-input",{ref:"phone",attrs:{label:"banner名称",prop:"phone"},model:{value:e.filterForm.bannerName,callback:function(r){e.$set(e.filterForm,"bannerName","string"==typeof r?r.trim():r)},expression:"filterForm.bannerName"}}),e._v(" "),n("sac-date",{ref:"selectedDate",attrs:{label:"日　　期",placeholder:"请选择日期"},model:{value:e.selectedDate,callback:function(r){e.selectedDate=r},expression:"selectedDate"}}),e._v(" "),n("sac-select",{attrs:{label:"类型",props:e.typeList,"data-list":e.bannerTypeList},model:{value:e.filterForm.bannerType,callback:function(r){e.$set(e.filterForm,"bannerType",r)},expression:"filterForm.bannerType"}}),e._v(" "),n("sac-select",{attrs:{label:"状态","data-list":e.bannerOnShelfList},model:{value:e.filterForm.isOnShelf,callback:function(r){e.$set(e.filterForm,"isOnShelf",r)},expression:"filterForm.isOnShelf"}}),e._v(" "),n("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(r){return e.submitForm(1)}}})],1),e._v(" "),n("sac-table",{attrs:{data:e.listData.list}},[n("el-table-column",{attrs:{prop:"weight",label:"权重",width:"80"}}),e._v(" "),n("el-table-column",{attrs:{prop:"bannerName",label:"banner名称"}}),e._v(" "),n("el-table-column",{attrs:{label:"banner图片"},scopedSlots:e._u([{key:"default",fn:function(r){return[n("viewer",{ref:"viewer",staticClass:"viewer",attrs:{options:e.options}},[r.row.bannerUrl.indexOf("http")?e._e():n("img",{staticStyle:{"max-width":"100%","max-height":"150px"},attrs:{src:r.row.bannerUrl,alt:"图片存储地址不存在"}})]),e._v(" "),r.row.bannerUrl.indexOf("http")?n("span",[e._v(e._s(r.row.bannerUrl))]):e._e()]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"bannerTypeName",label:"banner类型"}}),e._v(" "),n("el-table-column",{attrs:{prop:"jumpUrl",label:"跳转链接"},scopedSlots:e._u([{key:"default",fn:function(r){return[n("a",{attrs:{target:"_brank",href:r.row.jumpUrl}},[e._v(e._s(r.row.jumpUrl))])]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"remark",label:"备注"}}),e._v(" "),n("el-table-column",{attrs:{prop:"createTime",label:"创建时间",width:"170"},scopedSlots:e._u([{key:"default",fn:function(r){return[e._v("\n        "+e._s(e._f("dateFormat")(r.row.createTime,"YYYY-MM-DD HH:mm"))+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"操作",width:"160"},scopedSlots:e._u([{key:"default",fn:function(r){return[n("el-button",{attrs:{type:"primary",disabled:0!=r.row.isOnShelf,size:"small"},nativeOn:{click:function(n){return e.modification(r.row)}}},[e._v("修改\n        ")]),e._v(" "),n("el-button",{attrs:{type:"danger",disabled:0!=r.row.isOnShelf,size:"small"},nativeOn:{click:function(n){return e.remove(r.row)}}},[e._v("删除\n        ")])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"上架",width:"100"},scopedSlots:e._u([{key:"default",fn:function(r){return[n("el-switch",{attrs:{"inactive-value":0,"active-value":1},nativeOn:{click:function(n){return e.switchChange(r.row)}},model:{value:r.row.isOnShelf,callback:function(n){e.$set(r.row,"isOnShelf",n)},expression:"scope.row.isOnShelf"}})]}}])})],1),e._v(" "),n("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.filterForm.pageSize,"current-page":e.filterForm.pageNum},on:{handleChange:e.getPaginationChange}}),e._v(" "),n("el-dialog",{attrs:{title:e.dialogTitle,visible:e.isShowAddDialog},on:{"update:visible":function(r){e.isShowAddDialog=r}}},[n("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"140px"}},[n("el-form-item",{attrs:{label:"banner图片:",prop:"bannerUrl"}},[n("img",{directives:[{name:"show",rawName:"v-show",value:e.ruleForm.bannerUrl,expression:"ruleForm.bannerUrl"},{name:"viewer",rawName:"v-viewer"}],staticClass:"introduce",attrs:{src:e.ruleForm.bannerUrl}}),e._v(" "),n("el-upload",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{action:e.server_path+"wallet/backmgr/uploadFile",multiple:"",name:"files","before-upload":e.beforeUpload,data:{type:"img",token:e.token},"show-file-list":!1,"on-success":e.upload}},[n("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1)],1),e._v(" "),n("el-form-item",{attrs:{label:"banner类型",prop:"bannerType"}},[n("el-select",{staticStyle:{width:"100%"},attrs:{size:"small",placeholder:"请选择banner类型"},model:{value:e.ruleForm.bannerType,callback:function(r){e.$set(e.ruleForm,"bannerType",r)},expression:"ruleForm.bannerType"}},e._l(e.bannerTypeList,function(r,a){return 0!=a?n("el-option",{key:a,attrs:{label:r.typeName,value:r.code}}):e._e()}),1)],1),e._v(" "),n("el-form-item",{attrs:{label:" banner名称:",prop:"bannerName"}},[n("el-input",{attrs:{size:"small",placeholder:"请输入banner名称"},model:{value:e.ruleForm.bannerName,callback:function(r){e.$set(e.ruleForm,"bannerName",r)},expression:"ruleForm.bannerName"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"跳转链接:",prop:"jumpUrl"}},[n("el-input",{attrs:{size:"small",placeholder:"请输入跳转链接"},model:{value:e.ruleForm.jumpUrl,callback:function(r){e.$set(e.ruleForm,"jumpUrl",r)},expression:"ruleForm.jumpUrl"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"权重:"}},[n("el-input-number",{attrs:{size:"small",min:1,label:"请输入权重"},model:{value:e.ruleForm.weight,callback:function(r){e.$set(e.ruleForm,"weight",r)},expression:"ruleForm.weight"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"备注:"}},[n("el-input",{attrs:{size:"small",placeholder:"请输入备注"},model:{value:e.ruleForm.remark,callback:function(r){e.$set(e.ruleForm,"remark",r)},expression:"ruleForm.remark"}})],1),e._v(" "),n("el-form-item",[n("el-button",{staticStyle:{width:"100px"},attrs:{type:"primary",size:"small"},nativeOn:{click:function(r){return e.determine(r)}}},[e._v("确定")])],1)],1)],1)],1)},staticRenderFns:[]};var m=n("C7Lr")(u,d,!1,function(e){n("b9oY"),n("64Ub")},null,null);r.default=m.exports}});