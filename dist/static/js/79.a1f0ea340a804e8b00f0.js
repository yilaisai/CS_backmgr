webpackJsonp([79],{VNY7:function(e,t){},aK9Y:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=r("lvKI"),s={name:"user",data:function(){return{listData:[],dialogFormVisible:!1,dialogFormVisiblePwd:!1,dialogFormVisibleRole:!1,dialogTitle:"创建用户",ruleForm:{userName:"",pwd:"",ownPwd:"",roleId:""},rules:{userName:[{required:!0,validator:function(e,t,r){t||r(new Error("请输入用户名")),r()},trigger:"blur"}],pwd:[{required:!0,validator:function(e,t,r){if(!t||t.length<6||t.length>16)return r(new Error("请输入6-16位密码"));r()},trigger:"blur"}],roleId:[{required:!0,validator:function(e,t,r){""!==t&&void 0!==t||r(new Error("请选择角色")),r()},trigger:"change"}]},roleList:[],currentData:{}}},methods:{addUser:function(){this.dialogTitle="创建用户",this.dialogFormVisible=!0,this.getSysRoleList()},submitForm:function(){var e=this;this.$refs.ruleForm.validate(function(t){if(!t)return!1;var r=e.ruleForm,s=r.roleId,o=r.userName,i=r.pwd,a=Object(l.a)(i);e.$http.post("wallet/backmgr/sysuser/addSysUser",{roleId:s,userName:o,md5Pwd:a}).then(function(t){e.$notify({title:"成功",message:"创建用户"+o+"成功",type:"success"}),e.getSysUserList()}),e.$refs.ruleForm.resetFields(),e.$refs.userName.reset(),e.$refs.pwd.reset(),e.$refs.roleId.reset(),e.dialogFormVisible=!1})},changePassword:function(e){this.dialogTitle="修改 "+e.name+" 的用户密码",this.dialogFormVisiblePwd=!0,this.currentData=e},submitFormPwd:function(){var e=this;this.$refs.ruleForm.validate(function(t){if(!t)return!1;var r=e.ruleForm,s=r.pwd,o=r.ownPwd,i=e.currentData,a=i.id,n=i.name,u=Object(l.a)(s),d=Object(l.a)(o);e.$http.post("wallet/backmgr/sysuser/changeSysUserPwd",{sysUserId:a,Md5Pwd:u,ownMd5Pwd:d}).then(function(t){e.$notify({title:"成功",message:"修改用户 "+n+" 的密码成功",type:"success"})}).catch(function(e){}),e.$refs.ruleForm.resetFields(),e.$refs.pwd.reset(),e.$refs.ownPwd.reset(),e.dialogFormVisiblePwd=!1})},changeRole:function(e){this.dialogTitle="修改 "+e.name+" 的用户角色",this.dialogFormVisibleRole=!0,this.currentData=e,this.ruleForm.roleId=e.roleId||"",this.getSysRoleList()},submitFormRole:function(){var e=this;this.$refs.ruleForm.validate(function(t){if(!t)return!1;var r=e.currentData,l=r.id,s=r.name,o=r.roleId,i=e.ruleForm.roleId;o!=i&&e.$http.post("wallet/backmgr/privilege/setSysRole",{sysUserId:l,roleId:i}).then(function(t){e.$notify({title:"成功",message:"修改用户 "+s+" 的角色成功",type:"success"}),e.getSysUserList()}),e.$refs.ruleForm.resetFields(),e.dialogFormVisibleRole=!1})},goDisable:function(e){var t=this,r=this.$createElement,l=e.sysStatus,s=e.name,o=e.id,i=1==l?0:1;this.$msgbox({title:"提示",message:r("p",null,[r("span",null,"此操作将 "),r("span",{style:"color: red"},1==l?"禁用 ":"启用 "),r("span",{style:"color: #0a52e0"},""+s),r("span",null," 用户, 是否继续?")]),showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",beforeClose:function(e,r,a){"confirm"===e?t.$http.post("wallet/backmgr/sysuser/updateSysUserStatus",{sysUserId:o,status:i}).then(function(e){t.$notify({title:"成功",message:(1==l?"禁用":"启用")+" "+s+" 成功",type:"success"}),t.getSysUserList(),a()}):a()}})},getSysUserList:function(){var e=this;this.$http.post("wallet/backmgr/privilege/getSysUserList").then(function(t){var r=t.result.sysUserList;e.listData=r})},getSysRoleList:function(){var e=this;this.$http.post("wallet/backmgr/privilege/getSysRoleList").then(function(t){var r=t.result.roleList;r.forEach(function(e){e.label=e.roleName,e.value=e.roleId}),e.roleList=r})}},activated:function(){this.getSysUserList()}},o={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"user"},[r("el-col",{staticStyle:{"text-align":"right","margin-bottom":"30px"},attrs:{span:22}},[r("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.addUser}},[e._v("创建用户")])],1),e._v(" "),r("sac-table",{attrs:{data:e.listData}},[r("el-table-column",{attrs:{prop:"name",label:"用户名称"}}),e._v(" "),r("el-table-column",{attrs:{prop:"roleName",label:"角色名称"}}),e._v(" "),r("el-table-column",{attrs:{prop:"createTime",label:"创建时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(e._f("dateFormat")(1*t.row.createTime,"YYYY-MM-DD HH:mm:ss")))])]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"操作",width:"360"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(r){return e.changePassword(t.row)}}},[e._v("修改登录密码")]),e._v(" "),r("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(r){return e.changeRole(t.row)}}},[e._v("分配角色")]),e._v(" "),r("el-button",{attrs:{type:1==t.row.sysStatus?"danger":"warning",size:"small"},nativeOn:{click:function(r){return e.goDisable(t.row)}}},[e._v(e._s(1==t.row.sysStatus?"禁用":"启用")+"\n          ")])]}}])})],1),e._v(" "),r("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[r("sac-input",{ref:"userName",attrs:{label:"用户名称",prop:"userName"},model:{value:e.ruleForm.userName,callback:function(t){e.$set(e.ruleForm,"userName",t)},expression:"ruleForm.userName"}}),e._v(" "),r("sac-input",{ref:"pwd",attrs:{type:"password",label:"登录密码",placeholder:"请输入6-16位密码",prop:"pwd"},model:{value:e.ruleForm.pwd,callback:function(t){e.$set(e.ruleForm,"pwd",t)},expression:"ruleForm.pwd"}}),e._v(" "),r("sac-select",{ref:"roleId",attrs:{label:"所属角色",prop:"roleId",size:"small","data-list":e.roleList},model:{value:e.ruleForm.roleId,callback:function(t){e.$set(e.ruleForm,"roleId",t)},expression:"ruleForm.roleId"}})],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.submitForm}},[e._v("确 定")])],1)],1),e._v(" "),r("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisiblePwd},on:{"update:visible":function(t){e.dialogFormVisiblePwd=t}}},[r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"180px"}},[r("sac-input",{ref:"ownPwd",attrs:{type:"password",label:"验证我的登录密码",placeholder:"我的登录密码",prop:"ownPwd"},model:{value:e.ruleForm.ownPwd,callback:function(t){e.$set(e.ruleForm,"ownPwd",t)},expression:"ruleForm.ownPwd"}}),e._v(" "),r("sac-input",{ref:"pwd",attrs:{type:"password",label:e.currentData.name+"的新登录密码",placeholder:"请输入6-16位密码",prop:"pwd"},model:{value:e.ruleForm.pwd,callback:function(t){e.$set(e.ruleForm,"pwd",t)},expression:"ruleForm.pwd"}})],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogFormVisiblePwd=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.submitFormPwd}},[e._v("确 定")])],1)],1),e._v(" "),r("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisibleRole},on:{"update:visible":function(t){e.dialogFormVisibleRole=t}}},[r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"130px"}},[r("el-form-item",{attrs:{label:"所属角色"}},[r("el-select",{attrs:{placeholder:"请选择所属角色"},model:{value:e.ruleForm.roleId,callback:function(t){e.$set(e.ruleForm,"roleId",t)},expression:"ruleForm.roleId"}},e._l(e.roleList,function(e,t){return r("el-option",{key:t,attrs:{size:"small",label:e.label,value:e.value}})}),1)],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogFormVisibleRole=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.submitFormRole}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var i=r("VU/8")(s,o,!1,function(e){r("VNY7")},null,null);t.default=i.exports}});