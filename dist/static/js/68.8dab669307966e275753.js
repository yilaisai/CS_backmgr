webpackJsonp([68],{V9h7:function(e,r){throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: Cannot find module 'tslib'\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:594:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:520:25)\n    at Module.require (internal/modules/cjs/loader.js:650:17)\n    at require (internal/modules/cjs/helpers.js:20:18)\n    at Object.<anonymous> (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_less@3.11.0@less\\dist\\less.cjs.js:3:13)\n    at Module._compile (internal/modules/cjs/loader.js:702:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)\n    at Module.load (internal/modules/cjs/loader.js:612:32)\n    at tryModuleLoad (internal/modules/cjs/loader.js:551:12)\n    at Function.Module._load (internal/modules/cjs/loader.js:543:3)\n    at Module.require (internal/modules/cjs/loader.js:650:17)\n    at require (internal/modules/cjs/helpers.js:20:18)\n    at Object.<anonymous> (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_less@3.11.0@less\\index.js:1:80)\n    at Module._compile (internal/modules/cjs/loader.js:702:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)\n    at Module.load (internal/modules/cjs/loader.js:612:32)\n    at runLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:195:19)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:367:11\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:172:11\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:32:11)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:165:10)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:176:18\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:47:3)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:165:10)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:176:18\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:47:3)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at runLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:365:2)\n    at NormalModule.doBuild (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:182:3)\n    at NormalModule.build (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:275:15)")},ixX9:function(e,r,l){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=l("3cXf"),o=l.n(t),s={name:"ruleSetting",data:function(){return{coinList:[],registList:[],dialogTitle:"",dialogFormVisible:!1,ruleForm:{coinId:"",lower:"",middle:"",senior:"",service:"",peers:""},isFix:!1,rules:{coinId:[{required:!0,message:"请选择币种",trigger:"change"}],lower:[{required:!0,message:"请输入初级代理提成",trigger:"blur"}],middle:[{required:!0,message:"请输入中级代理提成",trigger:"blur"}],senior:[{required:!0,message:"请输入高级代理提成",trigger:"blur"}],service:[{required:!0,message:"请输入服务中心提成",trigger:"blur"}],peers:[{required:!0,message:"请输入平级补助",trigger:"blur"}]}}},methods:{remove:function(e){var r=this,l=e.id;this.$confirm("确定删除吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){r.$http.delete("/wallet/backmgr/shop/deleteAgencyRuleById",{id:l}).then(function(e){r.$notify({title:"成功",message:"删除成功",type:"success"}),r.getList()})})},registerSwitchChange:function(e){var r=this,l=e.state,t=e.id;this.$http.get("/wallet/backmgr/shop/updateRuleStatus",{status:l?"enable":"disable",id:t}).then(function(e){r.$notify({title:"成功",message:(l?"上架":"下架")+" 成功",type:"success"}),r.getList()}).catch(function(){r.getList()})},addSend:function(){this.dialogTitle="新建折扣规则",this.dialogFormVisible=!0,this.isFix=!1,this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},modification:function(e){this.dialogTitle="修改折扣规则",this.dialogFormVisible=!0,this.isFix=!0,this.$refs.ruleForm&&this.$refs.ruleForm.resetFields(),this.ruleForm=JSON.parse(o()(e)),this.ruleForm.lower=100*this.ruleForm.lower,this.ruleForm.middle=100*this.ruleForm.middle,this.ruleForm.senior=100*this.ruleForm.senior,this.ruleForm.service=100*this.ruleForm.service,this.ruleForm.peers=100*this.ruleForm.peers,this.getSampleCoinInfo()},registDetermine:function(){var e=this;this.$refs.ruleForm.validate(function(r){if(!r)return!1;var l=e.ruleForm,t=l.coinId,o=l.id,s=l.lower,n=l.middle,a=l.senior,i=l.service,u=l.peers;e.ruleForm.id?e.$http.put("/wallet/backmgr/shop/updateAgencyRule",{id:o,lower:s/100,middle:n/100,senior:a/100,service:i/100,peers:u/100}).then(function(r){e.$notify({title:"成功",message:"修改成功",type:"success"}),e.dialogFormVisible=!1,e.getList()}):e.$http.post("/wallet/backmgr/shop/addAgencyRule",{coinId:t,lower:s/100,middle:n/100,senior:a/100,service:i/100,peers:u/100}).then(function(r){e.$notify({title:"成功",message:"创建成功",type:"success"}),e.dialogFormVisible=!1,e.getList()})})},getSampleCoinInfo:function(){var e=this;this.$http.post("wallet/backmgr/coin/getSampleCoinInfo",{}).then(function(r){e.coinList=r.result.list})},getList:function(){var e=this;this.$http.post("/wallet/backmgr/shop/listAgencyRule",{pageNum:1,pageSize:200}).then(function(r){e.registList=r.result.list})}},activated:function(){this.getList(),this.getSampleCoinInfo()}},n={render:function(){var e=this,r=e.$createElement,l=e._self._c||r;return l("div",{staticClass:"ruleSetting"},[l("el-col",{staticStyle:{"text-align":"right","margin-bottom":"10px"},attrs:{span:22}},[l("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.addSend}},[e._v("创建规则")])],1),e._v(" "),l("sac-table",{attrs:{data:e.registList}},[l("el-table-column",{attrs:{prop:"coinId",label:"折扣币种"}}),e._v(" "),l("el-table-column",{attrs:{prop:"lower",label:"初级代理提成"},scopedSlots:e._u([{key:"default",fn:function(r){return[e._v("\n        "+e._s(100*r.row.lower)+"%\n      ")]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"middle",label:"中级代理提成"},scopedSlots:e._u([{key:"default",fn:function(r){return[e._v("\n        "+e._s(100*r.row.middle)+"%\n      ")]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"senior",label:"高级代理提成"},scopedSlots:e._u([{key:"default",fn:function(r){return[e._v("\n        "+e._s(100*r.row.senior)+"%\n      ")]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"service",label:"服务中心提成"},scopedSlots:e._u([{key:"default",fn:function(r){return[e._v("\n        "+e._s(100*r.row.service)+"%\n      ")]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"peers",label:"平级补助"},scopedSlots:e._u([{key:"default",fn:function(r){return[e._v("\n        "+e._s(100*r.row.peers)+"%\n      ")]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"上架"},scopedSlots:e._u([{key:"default",fn:function(r){return[l("el-switch",{attrs:{"inactive-value":0,"active-value":1},nativeOn:{click:function(l){return e.registerSwitchChange(r.row)}},model:{value:r.row.state,callback:function(l){e.$set(r.row,"state",l)},expression:"scope.row.state"}})]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"操作",width:"150px"},scopedSlots:e._u([{key:"default",fn:function(r){return[l("el-button",{attrs:{type:"success",size:"small",disabled:1==r.row.state},nativeOn:{click:function(l){return e.modification(r.row)}}},[e._v("修改\n        ")]),e._v(" "),l("el-button",{attrs:{type:"danger",size:"small",disabled:1==r.row.state},nativeOn:{click:function(l){return e.remove(r.row)}}},[e._v("删除\n        ")])]}}])})],1),e._v(" "),l("el-dialog",{staticClass:"register_dialog",attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(r){e.dialogFormVisible=r}}},[l("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"135px"}},[l("el-form-item",{staticClass:"from_box_item",attrs:{label:"折扣币种：",prop:"coinId",size:"small"}},[l("el-select",{attrs:{placeholder:"请选择折扣币种",disabled:e.isFix},model:{value:e.ruleForm.coinId,callback:function(r){e.$set(e.ruleForm,"coinId",r)},expression:"ruleForm.coinId"}},e._l(e.coinList,function(e){return l("el-option",{key:e.coinId,attrs:{label:e.coinName,value:e.coinId}})}),1)],1),e._v(" "),l("el-form-item",{staticClass:"from_box_item",attrs:{label:"初级代理提成：",prop:"lower"}},[l("el-input",{attrs:{type:"number",size:"small",placeholder:""},model:{value:e.ruleForm.lower,callback:function(r){e.$set(e.ruleForm,"lower",r)},expression:"ruleForm.lower"}},[l("span",{attrs:{slot:"suffix"},slot:"suffix"},[e._v("%")])])],1),e._v(" "),l("el-form-item",{staticClass:"from_box_item",attrs:{label:"中级代理提成：≤",prop:"middle"}},[l("el-input",{attrs:{type:"number",size:"small",placeholder:""},model:{value:e.ruleForm.middle,callback:function(r){e.$set(e.ruleForm,"middle",r)},expression:"ruleForm.middle"}},[l("span",{attrs:{slot:"suffix"},slot:"suffix"},[e._v("%")])])],1),e._v(" "),l("el-form-item",{staticClass:"from_box_item",attrs:{label:"高级代理提成：",prop:"senior"}},[l("el-input",{attrs:{type:"number",size:"small",placeholder:""},model:{value:e.ruleForm.senior,callback:function(r){e.$set(e.ruleForm,"senior",r)},expression:"ruleForm.senior"}},[l("span",{attrs:{slot:"suffix"},slot:"suffix"},[e._v("%")])])],1),e._v(" "),l("el-form-item",{staticClass:"from_box_item",attrs:{label:"服务中心提成：",prop:"service"}},[l("el-input",{attrs:{type:"number",size:"small",placeholder:""},model:{value:e.ruleForm.service,callback:function(r){e.$set(e.ruleForm,"service",r)},expression:"ruleForm.service"}},[l("span",{attrs:{slot:"suffix"},slot:"suffix"},[e._v("%")])])],1),e._v(" "),l("el-form-item",{staticClass:"from_box_item",attrs:{label:"平级补助：",prop:"peers"}},[l("el-input",{attrs:{type:"number",size:"small",placeholder:""},model:{value:e.ruleForm.peers,callback:function(r){e.$set(e.ruleForm,"peers",r)},expression:"ruleForm.peers"}},[l("span",{attrs:{slot:"suffix"},slot:"suffix"},[e._v("%")])])],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.registDetermine}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var a=l("C7Lr")(s,n,!1,function(e){l("V9h7")},null,null);r.default=a.exports}});