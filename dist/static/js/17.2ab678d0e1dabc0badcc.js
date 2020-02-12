webpackJsonp([17],{"0mD5":function(e,r){},VMj2:function(e,r,l){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=l("KH7x"),n=l.n(t),a=l("Q+Ik"),o=l.n(a),s=l("3cXf"),i=l.n(s),d={name:"menu-title",data:function(){return{treeData:[],dialogFormVisible:!1,ruleForm:{position:0,requestUrl:"",name:"",menuUrl:"",parentId:"",desctext:""},defaultProps:{children:"children",label:"name"},rules:{requestUrl:[{required:!0,message:"请输入请求url",trigger:"blur"}],name:[{required:!0,message:"请输入功能名称",trigger:"blur"}],menuUrl:[{required:!1,message:"请输入页面路由",trigger:"blur"}]},currentNode:"",currentData:"",dialogTitle:"创建一级菜单",currentForm:{}}},methods:{resetFields:function(){this.ruleForm={position:0,requestUrl:"",name:"",menuUrl:"",parentId:"",desctext:""},this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},addMenu:function(){this.dialogTitle="创建一级菜单",this.dialogFormVisible=!0,this.currentNode="",this.resetFields()},append:function(e,r){this.dialogTitle="创建 "+r.name+" 的子菜单",this.dialogFormVisible=!0,this.currentNode=e,this.currentData=r,this.resetFields()},modify:function(e,r){this.dialogTitle="修改 "+r.name+" 菜单",this.dialogFormVisible=!0,this.ruleForm=JSON.parse(i()(r)),this.ruleForm.desctext=this.ruleForm.describe,this.currentForm=JSON.parse(i()(r)),this.currentForm.desctext=this.currentForm.describe},determine:function(){var e=this;this.$refs.ruleForm.validate(function(r){if(!r)return!1;if(e.ruleForm.id){var l={};o()(e.ruleForm).forEach(function(r){var t=n()(r,2),a=t[0],o=t[1];o!=e.currentForm[a]&&"children"!=a&&(l[a]=o||"empty")}),o()(l).length>0&&(l.id=e.ruleForm.id,e.$http.post("wallet/backmgr/privilege/updateSysUrl",l).then(function(r){e.$notify({title:"成功",message:"修改 "+e.ruleForm.name+" 菜单成功",type:"success"}),e.resetFields(),e.getAllSysUrl(),e.dialogFormVisible=!1}))}else{if(e.currentNode){var t=e.currentNode.parent,a=t.data.children||t.data,s=a[a.findIndex(function(r){return r.id===e.currentData.id})];e.ruleForm.parentId=s.id}else e.ruleForm.parentId=0;e.$http.post("wallet/backmgr/privilege/createSysUrl",e.ruleForm).then(function(r){e.$notify({title:"成功",message:"创建"+e.ruleForm.name+"菜单成功",type:"success"}),e.getAllSysUrl(),e.resetFields(),e.dialogFormVisible=!1})}})},remove:function(e,r){var l=this;r.children.length>0?this.$notify.error({title:"错误",message:"请先删除子菜单！"}):this.$confirm("此操作将永久删除该菜单, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){l.$http.post("wallet/backmgr/privilege/deleteSysUrl",{id:r.id}).then(function(e){l.$notify({title:"成功",message:"删除"+r.name+"菜单成功",type:"success"}),l.getAllSysUrl()})}).catch(function(){l.$message({type:"info",message:"已取消删除"})})},getAllSysUrl:function(){var e=this;this.$http.post("wallet/backmgr/privilege/getAllSysUrl").then(function(r){var l=r.result.list;e.treeData=l})},showDescription:function(e){this.$alert(e,"描述",{showClose:!1,closeOnClickModal:!0}).catch(function(){})}},activated:function(){this.getAllSysUrl()}},u={render:function(){var e=this,r=e.$createElement,l=e._self._c||r;return l("div",{staticClass:"menu-title"},[l("el-row",[l("el-col",{staticStyle:{"text-align":"right","margin-bottom":"30px"},attrs:{span:22}},[l("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.addMenu}},[e._v("创建一级菜单")])],1)],1),e._v(" "),l("el-tree",{attrs:{data:e.treeData,"node-key":"id",props:e.defaultProps,"expand-on-click-node":!1},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.node,n=r.data;return l("span",{staticClass:"custom-tree-node"},[l("span",{staticClass:"sac-label"},[e._v(" "+e._s(t.label)+" "),l("i",{directives:[{name:"show",rawName:"v-show",value:n.describe,expression:"data.describe"}],staticClass:"el-icon-info sac-icon",on:{click:function(r){return e.showDescription(n.describe)}}})]),e._v(" "),l("span",{staticClass:"sac-btn"},[l("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(){return e.append(t,n)}}},[e._v("\n          新增\n        ")]),e._v(" "),l("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(){return e.modify(t,n)}}},[e._v("\n          修改\n        ")]),e._v(" "),l("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(){return e.remove(t,n)}}},[e._v("\n          删除\n        ")])],1)])}}])}),e._v(" "),l("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(r){e.dialogFormVisible=r}}},[l("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[l("el-form-item",{attrs:{label:"排序:"}},[l("el-input-number",{attrs:{size:"small",min:0},model:{value:e.ruleForm.position,callback:function(r){e.$set(e.ruleForm,"position",r)},expression:"ruleForm.position"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"接口url:",prop:"requestUrl"}},[l("el-input",{attrs:{size:"small"},model:{value:e.ruleForm.requestUrl,callback:function(r){e.$set(e.ruleForm,"requestUrl",r)},expression:"ruleForm.requestUrl"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"功能名称:",prop:"name"}},[l("el-input",{attrs:{size:"small"},model:{value:e.ruleForm.name,callback:function(r){e.$set(e.ruleForm,"name",r)},expression:"ruleForm.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"页面路由:",prop:"menuUrl"}},[l("el-input",{attrs:{size:"small"},model:{value:e.ruleForm.menuUrl,callback:function(r){e.$set(e.ruleForm,"menuUrl",r)},expression:"ruleForm.menuUrl"}})],1),e._v(" "),l("el-form-item",{staticStyle:{position:"relative"},attrs:{label:"描述:"}},[l("span",{staticClass:"tips_textarea"},[e._v(e._s(e.ruleForm.desctext?e.ruleForm.desctext.length:"0")+"/50")]),e._v(" "),l("el-input",{attrs:{type:"textarea",placeholder:"请输描述",maxlength:"50",size:"small"},model:{value:e.ruleForm.desctext,callback:function(r){e.$set(e.ruleForm,"desctext",r)},expression:"ruleForm.desctext"}})],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{size:"small"},on:{click:function(r){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.determine}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var c=l("C7Lr")(d,u,!1,function(e){l("0mD5"),l("l5qt")},null,null);r.default=c.exports},l5qt:function(e,r){throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: Cannot find module 'tslib'\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:594:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:520:25)\n    at Module.require (internal/modules/cjs/loader.js:650:17)\n    at require (internal/modules/cjs/helpers.js:20:18)\n    at Object.<anonymous> (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_less@3.11.0@less\\dist\\less.cjs.js:3:13)\n    at Module._compile (internal/modules/cjs/loader.js:702:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)\n    at Module.load (internal/modules/cjs/loader.js:612:32)\n    at tryModuleLoad (internal/modules/cjs/loader.js:551:12)\n    at Function.Module._load (internal/modules/cjs/loader.js:543:3)\n    at Module.require (internal/modules/cjs/loader.js:650:17)\n    at require (internal/modules/cjs/helpers.js:20:18)\n    at Object.<anonymous> (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_less@3.11.0@less\\index.js:1:80)\n    at Module._compile (internal/modules/cjs/loader.js:702:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)\n    at Module.load (internal/modules/cjs/loader.js:612:32)\n    at runLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:195:19)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:367:11\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:172:11\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:32:11)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:165:10)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:176:18\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:47:3)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:165:10)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:176:18\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:47:3)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at runLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:365:2)\n    at NormalModule.doBuild (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:182:3)\n    at NormalModule.build (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:275:15)")}});