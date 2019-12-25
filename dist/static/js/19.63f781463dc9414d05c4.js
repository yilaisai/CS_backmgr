webpackJsonp([19],{"7X7X":function(e,t){},VMj2:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=r("d7EF"),i=r.n(l),s=r("W3Iv"),n=r.n(s),o=r("mvHQ"),a=r.n(o),u={name:"menu-title",data:function(){return{treeData:[],dialogFormVisible:!1,ruleForm:{position:0,requestUrl:"",name:"",menuUrl:"",parentId:"",desctext:""},defaultProps:{children:"children",label:"name"},rules:{requestUrl:[{required:!0,message:"请输入请求url",trigger:"blur"}],name:[{required:!0,message:"请输入功能名称",trigger:"blur"}],menuUrl:[{required:!1,message:"请输入页面路由",trigger:"blur"}]},currentNode:"",currentData:"",dialogTitle:"创建一级菜单",currentForm:{}}},methods:{resetFields:function(){this.ruleForm={position:0,requestUrl:"",name:"",menuUrl:"",parentId:"",desctext:""},this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},addMenu:function(){this.dialogTitle="创建一级菜单",this.dialogFormVisible=!0,this.currentNode="",this.resetFields()},append:function(e,t){this.dialogTitle="创建 "+t.name+" 的子菜单",this.dialogFormVisible=!0,this.currentNode=e,this.currentData=t,this.resetFields()},modify:function(e,t){this.dialogTitle="修改 "+t.name+" 菜单",this.dialogFormVisible=!0,this.ruleForm=JSON.parse(a()(t)),this.ruleForm.desctext=this.ruleForm.describe,this.currentForm=JSON.parse(a()(t)),this.currentForm.desctext=this.currentForm.describe},determine:function(){var e=this;this.$refs.ruleForm.validate(function(t){if(!t)return!1;if(e.ruleForm.id){var r={};n()(e.ruleForm).forEach(function(t){var l=i()(t,2),s=l[0],n=l[1];n!=e.currentForm[s]&&"children"!=s&&(r[s]=n||"empty")}),n()(r).length>0&&(r.id=e.ruleForm.id,e.$http.post("wallet/backmgr/privilege/updateSysUrl",r).then(function(t){e.$notify({title:"成功",message:"修改 "+e.ruleForm.name+" 菜单成功",type:"success"}),e.resetFields(),e.getAllSysUrl(),e.dialogFormVisible=!1}))}else{if(e.currentNode){var l=e.currentNode.parent,s=l.data.children||l.data,o=s[s.findIndex(function(t){return t.id===e.currentData.id})];e.ruleForm.parentId=o.id}else e.ruleForm.parentId=0;e.$http.post("wallet/backmgr/privilege/createSysUrl",e.ruleForm).then(function(t){e.$notify({title:"成功",message:"创建"+e.ruleForm.name+"菜单成功",type:"success"}),e.getAllSysUrl(),e.resetFields(),e.dialogFormVisible=!1})}})},remove:function(e,t){var r=this;t.children.length>0?this.$notify.error({title:"错误",message:"请先删除子菜单！"}):this.$confirm("此操作将永久删除该菜单, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){r.$http.post("wallet/backmgr/privilege/deleteSysUrl",{id:t.id}).then(function(e){r.$notify({title:"成功",message:"删除"+t.name+"菜单成功",type:"success"}),r.getAllSysUrl()})}).catch(function(){r.$message({type:"info",message:"已取消删除"})})},getAllSysUrl:function(){var e=this;this.$http.post("wallet/backmgr/privilege/getAllSysUrl").then(function(t){var r=t.result.list;e.treeData=r})},showDescription:function(e){this.$alert(e,"描述",{showClose:!1,closeOnClickModal:!0}).catch(function(){})}},activated:function(){this.getAllSysUrl()}},c={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"menu-title"},[r("el-row",[r("el-col",{staticStyle:{"text-align":"right","margin-bottom":"30px"},attrs:{span:22}},[r("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.addMenu}},[e._v("创建一级菜单")])],1)],1),e._v(" "),r("el-tree",{attrs:{data:e.treeData,"node-key":"id",props:e.defaultProps,"expand-on-click-node":!1},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.node,i=t.data;return r("span",{staticClass:"custom-tree-node"},[r("span",{staticClass:"sac-label"},[e._v(" "+e._s(l.label)+" "),r("i",{directives:[{name:"show",rawName:"v-show",value:i.describe,expression:"data.describe"}],staticClass:"el-icon-info sac-icon",on:{click:function(t){return e.showDescription(i.describe)}}})]),e._v(" "),r("span",{staticClass:"sac-btn"},[r("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(){return e.append(l,i)}}},[e._v("\n          新增\n        ")]),e._v(" "),r("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(){return e.modify(l,i)}}},[e._v("\n          修改\n        ")]),e._v(" "),r("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(){return e.remove(l,i)}}},[e._v("\n          删除\n        ")])],1)])}}])}),e._v(" "),r("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"排序:"}},[r("el-input-number",{attrs:{size:"small",min:0},model:{value:e.ruleForm.position,callback:function(t){e.$set(e.ruleForm,"position",t)},expression:"ruleForm.position"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"接口url:",prop:"requestUrl"}},[r("el-input",{attrs:{size:"small"},model:{value:e.ruleForm.requestUrl,callback:function(t){e.$set(e.ruleForm,"requestUrl",t)},expression:"ruleForm.requestUrl"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"功能名称:",prop:"name"}},[r("el-input",{attrs:{size:"small"},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"页面路由:",prop:"menuUrl"}},[r("el-input",{attrs:{size:"small"},model:{value:e.ruleForm.menuUrl,callback:function(t){e.$set(e.ruleForm,"menuUrl",t)},expression:"ruleForm.menuUrl"}})],1),e._v(" "),r("el-form-item",{staticStyle:{position:"relative"},attrs:{label:"描述:"}},[r("span",{staticClass:"tips_textarea"},[e._v(e._s(e.ruleForm.desctext?e.ruleForm.desctext.length:"0")+"/50")]),e._v(" "),r("el-input",{attrs:{type:"textarea",placeholder:"请输描述",maxlength:"50",size:"small"},model:{value:e.ruleForm.desctext,callback:function(t){e.$set(e.ruleForm,"desctext",t)},expression:"ruleForm.desctext"}})],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.determine}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var m=r("VU/8")(u,c,!1,function(e){r("VxyC"),r("7X7X")},null,null);t.default=m.exports},VxyC:function(e,t){}});