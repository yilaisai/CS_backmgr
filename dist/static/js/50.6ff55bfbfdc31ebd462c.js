webpackJsonp([50],{"+aQo":function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={name:"pagelist",data:function(){return{pageTypeList:[],ruleForm:{maxRate:"",initRate:"",invitedHoldAmountLimit:"",holdAmountLimit:"",increaseRate:""},dialogFormVisible:!1,dialogForm2Visible:!1,tapIndex:1,rules:{initRate:[{required:!0,message:"请输入起始收益率",trigger:"blur"}],maxRate:[{required:!0,message:"请输入收益率上限",trigger:"blur"}],increaseRate:[{required:!0,message:"请输入每邀请1个人增长值",trigger:"blur"}],holdAmountLimit:[{required:!0,message:"请输入升级持币量",trigger:"blur"}],invitedHoldAmountLimit:[{required:!0,message:"请输入被邀请者持币量",trigger:"blur"}]},listData:{list:[]}}},methods:{showButton:function(e){this.tapIndex=e},change1Info:function(e){this.ruleForm={roleId:e.roleId,roleName:e.roleName,initRate:(100*e.initRate).toFixed(2),maxRate:(100*e.maxRate).toFixed(2),increaseRate:(100*e.increaseRate).toFixed(2),holdAmountLimit:e.holdAmountLimit,invitedHoldAmountLimit:e.invitedHoldAmountLimit},this.dialogFormVisible=!0},change2Info:function(e){this.ruleForm={roleId:e.roleId,roleName:e.roleName,initRate:(100*e.initRate).toFixed(2),maxRate:(100*e.maxRate).toFixed(2),increaseRate:(100*e.increaseRate).toFixed(2),holdAmountLimit:e.holdAmountLimit,invitedHoldAmountLimit:e.invitedHoldAmountLimit},this.dialogForm2Visible=!0},getPageInfoList:function(){var e=this;this.$http.post("/supernode/backmgr/role/getRoleInfo",{}).then(function(t){e.listData.list=t.result||[]})},determine:function(){var e=this;this.$refs.ruleForm.validate(function(t){if(!t)return!1;var l={roleId:e.ruleForm.roleId,roleName:e.ruleForm.roleName,initRate:(e.ruleForm.initRate/100).toFixed(4),maxRate:(e.ruleForm.maxRate/100).toFixed(4)};e.$http.post("/supernode/backmgr/role/update/bonus",l).then(function(t){e.$message({type:"success",message:"修改成功！"}),e.getPageInfoList(),e.dialogFormVisible=!1})})},determine2:function(){var e=this;this.$refs.ruleForm2.validate(function(t){if(!t)return!1;var l={roleId:e.ruleForm.roleId,roleName:e.ruleForm.roleName,increaseRate:(e.ruleForm.increaseRate/100).toFixed(4),holdAmountLimit:e.ruleForm.holdAmountLimit,invitedHoldAmountLimit:e.ruleForm.invitedHoldAmountLimit};e.$http.post("/supernode/backmgr/role/update/condition",l).then(function(t){e.$message({type:"success",message:"修改成功！"}),e.getPageInfoList(),e.dialogForm2Visible=!1})})}},activated:function(){this.getPageInfoList()}},o={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"set-income"},[l("el-row",{staticStyle:{"margin-bottom":"20px"}},[l("el-col",{staticStyle:{"text-align":"center"},attrs:{span:19}},[l("el-button",{class:1==e.tapIndex?"":"empty",attrs:{type:"primary",size:"small"},on:{click:function(t){e.showButton(1)}}},[e._v("收益设置")]),e._v(" "),l("el-button",{class:2==e.tapIndex?"":"empty",attrs:{type:"primary",size:"small"},on:{click:function(t){e.showButton(2)}}},[e._v("等级条件设置")])],1)],1),e._v(" "),l("sac-table",{directives:[{name:"show",rawName:"v-show",value:1==e.tapIndex,expression:"tapIndex == 1"}],attrs:{data:e.listData.list}},[l("el-table-column",{attrs:{prop:"roleName",label:"会员等级",width:"170"}}),e._v(" "),l("el-table-column",{attrs:{prop:"initRate",label:"起始收益率",width:"170"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s((100*t.row.initRate).toFixed(2))+"%\n      ")]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"maxRate",label:"收益率上限",width:"170"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s((100*t.row.maxRate).toFixed(2))+"%\n      ")]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(l){e.change1Info(t.row)}}},[e._v("修改\n        ")])]}}])})],1),e._v(" "),l("sac-table",{directives:[{name:"show",rawName:"v-show",value:2==e.tapIndex,expression:"tapIndex == 2"}],attrs:{data:e.listData.list}},[l("el-table-column",{attrs:{prop:"roleName",label:"会员等级",width:"170"}}),e._v(" "),l("el-table-column",{attrs:{prop:"increaseRate",label:"每邀请1个人增长值",width:"170"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s((100*t.row.increaseRate).toFixed(2))+"%\n      ")]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"holdAmountLimit",label:"最小持币量限制"}}),e._v(" "),l("el-table-column",{attrs:{prop:"invitedHoldAmountLimit",label:"被邀请者最少持币量"}}),e._v(" "),l("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(l){e.change2Info(t.row)}}},[e._v("修改\n        ")])]}}])})],1),e._v(" "),l("el-dialog",{attrs:{visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[l("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,inline:!0,"label-width":"170px"}},[l("el-form-item",{attrs:{label:"会员等级:",prop:"roleName"}},[e._v(e._s(e.ruleForm.roleName))]),e._v(" "),l("el-form-item",{attrs:{label:"起始收益率:",prop:"initRate"}},[l("el-input",{attrs:{placeholder:"请输入起始收益率",size:"small"},model:{value:e.ruleForm.initRate,callback:function(t){e.$set(e.ruleForm,"initRate",t)},expression:"ruleForm.initRate"}},[l("template",{slot:"append"},[e._v("%")])],2)],1),e._v(" "),l("el-form-item",{attrs:{label:"收益率上限:",prop:"maxRate"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入收益率上限"},model:{value:e.ruleForm.maxRate,callback:function(t){e.$set(e.ruleForm,"maxRate",t)},expression:"ruleForm.maxRate"}},[l("template",{slot:"append"},[e._v("%")])],2)],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.determine}},[e._v("确 定")])],1)],1),e._v(" "),l("el-dialog",{attrs:{visible:e.dialogForm2Visible},on:{"update:visible":function(t){e.dialogForm2Visible=t}}},[l("el-form",{ref:"ruleForm2",attrs:{model:e.ruleForm,rules:e.rules,inline:!0,"label-width":"170px"}},[l("el-form-item",{attrs:{label:"会员等级:",prop:"roleName"}},[e._v(e._s(e.ruleForm.roleName))]),e._v(" "),l("el-form-item",{attrs:{label:"每邀请1个人增长值:",prop:"increaseRate"}},[l("el-input",{attrs:{placeholder:"请输入每邀请1个人增长值",size:"small"},model:{value:e.ruleForm.increaseRate,callback:function(t){e.$set(e.ruleForm,"increaseRate",t)},expression:"ruleForm.increaseRate"}},[l("template",{slot:"append"},[e._v("%")])],2)],1),e._v(" "),l("el-form-item",{staticClass:"hold-amount-limit",attrs:{label:"最小持币量限制:",prop:"holdAmountLimit"}},[l("el-input",{attrs:{placeholder:"请输入最小持币量限制",size:"small"},model:{value:e.ruleForm.holdAmountLimit,callback:function(t){e.$set(e.ruleForm,"holdAmountLimit",t)},expression:"ruleForm.holdAmountLimit"}},[l("template",{slot:"append"},[e._v("PNB")])],2)],1),e._v(" "),l("el-form-item",{staticClass:"invited-hold-amount-limit",attrs:{label:"被邀请者最少持币量:",prop:"invitedHoldAmountLimit"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入被邀请者最少持币量"},model:{value:e.ruleForm.invitedHoldAmountLimit,callback:function(t){e.$set(e.ruleForm,"invitedHoldAmountLimit",t)},expression:"ruleForm.invitedHoldAmountLimit"}},[l("template",{slot:"append"},[e._v("PNB")])],2)],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogForm2Visible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.determine2}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var a=l("VU/8")(i,o,!1,function(e){l("8NAh")},null,null);t.default=a.exports},"8NAh":function(e,t){}});