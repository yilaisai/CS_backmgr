webpackJsonp([9],{A06x:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=r("d7EF"),s=r.n(l),i=r("W3Iv"),o=r.n(i),a={name:"role",data:function(){return{listData:[],treeData:[],dialogFormVisible:!0,dialogTitle:"创建角色",ruleForm:{name:"",urlId:""},rules:{name:[{required:!0,message:"请输入角色名称",trigger:"blur"}]},defaultProps:{children:"children",label:"name"},currentForm:{}}},methods:{resetFields:function(){this.ruleForm={name:"",urlId:""}},addRole:function(){this.dialogTitle="创建角色",this.dialogFormVisible=!0,this.resetFields(),this.$refs.tree.setCheckedKeys([])},modify:function(e){var t=this;this.dialogTitle="修改 "+e.roleName+" 角色";var r=e.roleId,l=e.roleName;this.ruleForm.name=l,this.ruleForm.id=r,this.currentForm.name=l,this.currentForm.id=r,this.$http.post("wallet/backmgr/privilege/getRoleUrl.do",{roleId:r}).then(function(e){var r=e.result.idsList;t.ruleForm.urlId=r,t.currentForm.urlId=r,t.$refs.tree.setCheckedKeys(r),t.dialogFormVisible=!0})},determine:function(){var e=this;this.$refs.ruleForm.validate(function(t){if(!t)return!1;e.ruleForm.urlId=e.$refs.tree.getCheckedKeys().join(",")||"";var r=e.ruleForm,l=r.id;r.name,r.urlId;if(l||0==l){var i={};o()(e.ruleForm).forEach(function(t){var r=s()(t,2),l=r[0],o=r[1];o!=e.currentForm[l]&&(i[l]=o||"empty")}),o()(i).length>0&&(i.id=e.currentForm.id,e.$http.post("wallet/backmgr/privilege/updateSysRole.do",i).then(function(t){e.$notify({title:"成功",message:"修改"+e.ruleForm.name+"角色成功",type:"success"}),e.resetFields(),e.getSysRoleList()}))}else e.$http.post("wallet/backmgr/privilege/createSysRole.do",e.ruleForm).then(function(t){e.$notify({title:"成功",message:"创建"+e.ruleForm.name+"角色成功",type:"success"}),e.getSysRoleList(),e.resetFields()});e.dialogFormVisible=!1})},remove:function(e){var t=this;this.$confirm("此操作将永久删除 "+e.roleName+" 角色, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.post("wallet/backmgr/privilege/deleteSysRole.do",{roleId:e.roleId}).then(function(r){t.$notify({title:"成功",message:"删除 "+e.roleName+" 角色成功",type:"success"}),t.getSysRoleList()})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},getSysRoleList:function(){var e=this;this.$http.post("wallet/backmgr/privilege/getSysRoleList.do").then(function(t){var r=t.result.roleList;r.forEach(function(e){e.sysUserList&&e.sysUserList.length&&(1==e.sysUserList.length?e.sysUserList=e.sysUserList[0].Name:e.sysUserList=e.sysUserList.reduce(function(e,t){return(e.Name?e.Name:e)+"，"+t.Name}))}),e.listData=r})},getAllSysUrl:function(){var e=this;this.$http.post("wallet/backmgr/privilege/getAllSysUrl.do").then(function(t){var r=t.result.list;e.treeData=r})}},activated:function(){this.getSysRoleList(),this.getAllSysUrl(),this.dialogFormVisible=!1}},n={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"role"},[r("el-col",{staticStyle:{"text-align":"right","margin-bottom":"30px"},attrs:{span:22}},[r("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.addRole}},[e._v("创建角色")])],1),e._v(" "),r("sac-table",{attrs:{data:e.listData}},[r("el-table-column",{attrs:{prop:"roleName",label:"角色名称",width:"130"}}),e._v(" "),r("el-table-column",{attrs:{label:"用户",prop:"sysUserList"}}),e._v(" "),r("el-table-column",{attrs:{prop:"createTime",label:"创建时间",width:"150"}}),e._v(" "),r("el-table-column",{attrs:{prop:"updateTime",label:"更新时间",width:"150"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"danger",size:"small"},nativeOn:{click:function(r){e.modify(t.row)}}},[e._v("修改角色名称或权限")]),e._v(" "),r("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(r){e.remove(t.row)}}},[e._v("删除角色")])]}}])})],1),e._v(" "),r("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"角色名称",prop:"name"}},[r("el-input",{attrs:{size:"small"},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"权限"}},[r("el-tree",{ref:"tree",attrs:{data:e.treeData,"show-checkbox":"","node-key":"id","highlight-current":"",props:e.defaultProps}})],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.determine}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var u=r("VU/8")(a,n,!1,function(e){r("u00f"),r("QQfs")},null,null);t.default=u.exports},QQfs:function(e,t){},u00f:function(e,t){}});