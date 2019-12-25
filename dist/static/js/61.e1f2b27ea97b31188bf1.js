webpackJsonp([61],{"/Rwr":function(e,t){},"1wZV":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=r("mvHQ"),i=r.n(l),a={name:"team-ranking",data:function(){return{list:[],ruleForm:{teamName:"",totalAmount:"",member:""},dialogTitle:"",rules:{teamName:[{required:!0,message:"请输入团队名称",trigger:"blur"}],totalAmount:[{required:!0,message:"请输入总投票数",trigger:"blur"}],member:[{required:!0,message:"请输入总人数",trigger:"blur"}]},isShowAddDialog:!1}},methods:{resetForm:function(){this.ruleForm={teamName:"",totalAmount:"",member:""},this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},getList:function(){var e=this;this.$http.post("supernode/backmgr/mock/list",this.filterForm).then(function(t){e.list=t.result})},remove:function(e){var t=this,r=e.id,l=e.teamName;this.$confirm("确定删除 "+l+" 吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.post("/supernode/backmgr/mock/delete",{id:r}).then(function(e){t.$notify({title:"成功",message:"删除 "+l+"成功",type:"success"}),t.getList()})})},switchChange:function(e){var t=this,r=e.isOnShelf,l=e.id,i=e.teamName;this.$http.post("/supernode/backmgr/mock/updateIsOnShelf",{isOnShelf:r?"1":"0",id:l}).then(function(e){t.$notify({title:"成功",message:i+" "+(r?"上架":"下架")+" 成功",type:"success"}),t.getList()})},addBanner:function(){this.resetForm(),this.dialogTitle="创建团队",this.isShowAddDialog=!0},modification:function(e){this.resetForm(),this.isShowAddDialog=!0,this.ruleForm=JSON.parse(i()(e)),this.ruleForm.member=e.memberNum,this.dialogTitle="修改 "+this.ruleForm.teamName+" 的banner"},determine:function(){var e=this;this.$refs.ruleForm.validate(function(t){if(!t)return!1;if(e.ruleForm.id){var r=e.ruleForm,l=r.id,i=r.teamName,a=r.totalAmount,o=r.member;e.$http.post("/supernode/backmgr/mock/update",{id:l,teamName:i,totalAmount:a,member:o}).then(function(t){e.resetForm(),e.isShowAddDialog=!1,e.$notify({title:"成功",message:"修改 "+i+" 团队信息成功",type:"success"}),e.getList()})}else e.$http.post("/supernode/backmgr/mock/create",e.ruleForm).then(function(t){e.$notify({title:"成功",message:"创建 "+e.ruleForm.teamName+" 团队成功",type:"success"}),e.isShowAddDialog=!1,e.getList()})})}},activated:function(){this.getList()}},o={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"team-ranking"},[r("el-col",{staticStyle:{"text-align":"right"},attrs:{span:22}},[r("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.addBanner}},[e._v("创建团队")])],1),e._v(" "),r("sac-table",{attrs:{data:e.list}},[r("el-table-column",{attrs:{prop:"rank",label:"团队排行"}}),e._v(" "),r("el-table-column",{attrs:{prop:"teamName",label:"团队名称"}}),e._v(" "),r("el-table-column",{attrs:{prop:"totalAmount",label:"总投票数"}}),e._v(" "),r("el-table-column",{attrs:{prop:"memberNum",label:"总人数"}}),e._v(" "),r("el-table-column",{attrs:{prop:"scoreRate",label:"得分占比 "},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s((100*t.row.scoreRate).toFixed(2))+"%\n      ")]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"操作",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"primary",disabled:!t.row.id||"1"==t.row.isOnShelf,size:"small"},nativeOn:{click:function(r){return e.modification(t.row)}}},[e._v("修改\n        ")]),e._v(" "),r("el-button",{attrs:{type:"danger",disabled:!t.row.id||"1"==t.row.isOnShelf,size:"small"},nativeOn:{click:function(r){return e.remove(t.row)}}},[e._v("删除\n        ")])]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"上架",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.id?r("el-switch",{attrs:{"inactive-value":0,"active-value":1},nativeOn:{click:function(r){return e.switchChange(t.row)}},model:{value:t.row.isOnShelf,callback:function(r){e.$set(t.row,"isOnShelf",r)},expression:"scope.row.isOnShelf"}}):e._e()]}}])})],1),e._v(" "),r("el-dialog",{attrs:{title:e.dialogTitle,visible:e.isShowAddDialog},on:{"update:visible":function(t){e.isShowAddDialog=t}}},[r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"140px"}},[r("el-form-item",{attrs:{label:"团队名称:",prop:"teamName"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入团队名称"},model:{value:e.ruleForm.teamName,callback:function(t){e.$set(e.ruleForm,"teamName",t)},expression:"ruleForm.teamName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"总投票数:",prop:"totalAmount"}},[r("el-input-number",{attrs:{size:"small"},model:{value:e.ruleForm.totalAmount,callback:function(t){e.$set(e.ruleForm,"totalAmount",t)},expression:"ruleForm.totalAmount"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"总人数:",prop:"member"}},[r("el-input-number",{attrs:{size:"small"},model:{value:e.ruleForm.member,callback:function(t){e.$set(e.ruleForm,"member",t)},expression:"ruleForm.member"}})],1),e._v(" "),r("el-form-item",[r("el-button",{staticStyle:{width:"100px"},attrs:{type:"primary",size:"small"},nativeOn:{click:function(t){return e.determine(t)}}},[e._v("确定")])],1)],1)],1)],1)},staticRenderFns:[]};var n=r("VU/8")(a,o,!1,function(e){r("/Rwr")},null,null);t.default=n.exports}});