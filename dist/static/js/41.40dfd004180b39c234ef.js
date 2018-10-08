webpackJsonp([41],{"+aQo":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"set-income"},[i("el-row",{staticStyle:{"margin-bottom":"20px"}},[i("el-col",{attrs:{span:19}},[i("span",{staticStyle:{"font-size":"20px","font-weight":"bold"}},[e._v("收益设置")])])],1),e._v(" "),i("sac-table",{attrs:{data:e.listData.list}},[i("el-table-column",{attrs:{prop:"roleName",label:"会员等级",width:"170"}}),e._v(" "),i("el-table-column",{attrs:{prop:"initRate",label:"起始收益率",width:"170"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s((100*t.row.initRate).toFixed(2))+"%\n      ")]}}])}),e._v(" "),i("el-table-column",{attrs:{prop:"maxRate",label:"收益率上限",width:"170"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s((100*t.row.maxRate).toFixed(2))+"%\n      ")]}}])}),e._v(" "),i("el-table-column",{attrs:{prop:"increaseRate",label:"每邀请1个人增长值",width:"170"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s((100*t.row.increaseRate).toFixed(2))+"%\n      ")]}}])}),e._v(" "),i("el-table-column",{attrs:{prop:"holdAmountLimit",label:"最小持币量限制"}}),e._v(" "),i("el-table-column",{attrs:{prop:"invitedHoldAmountLimit",label:"被邀请者最少持币量"}}),e._v(" "),i("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"primary"},nativeOn:{click:function(i){e.changeInfo(t.row)}}},[e._v("修改\n        ")])]}}])})],1),e._v(" "),i("el-dialog",{attrs:{visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[i("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,inline:!0,"label-width":"170px"}},[i("el-form-item",{attrs:{label:"会员等级:",prop:"roleName"}},[e._v(e._s(e.ruleForm.roleName))]),e._v(" "),i("el-form-item",{attrs:{label:"起始收益率:",prop:"initRate"}},[i("el-input",{attrs:{placeholder:"请输入起始收益率",size:"small"},model:{value:e.ruleForm.initRate,callback:function(t){e.$set(e.ruleForm,"initRate",t)},expression:"ruleForm.initRate"}},[i("template",{slot:"append"},[e._v("%")])],2)],1),e._v(" "),i("el-form-item",{attrs:{label:"收益率上限:",prop:"maxRate"}},[i("el-input",{attrs:{size:"small",placeholder:"请输入收益率上限"},model:{value:e.ruleForm.maxRate,callback:function(t){e.$set(e.ruleForm,"maxRate",t)},expression:"ruleForm.maxRate"}},[i("template",{slot:"append"},[e._v("%")])],2)],1),e._v(" "),i("el-form-item",{attrs:{label:"每邀请1个人增长值:",prop:"increaseRate"}},[i("el-input",{attrs:{placeholder:"请输入每邀请1个人增长值",size:"small"},model:{value:e.ruleForm.increaseRate,callback:function(t){e.$set(e.ruleForm,"increaseRate",t)},expression:"ruleForm.increaseRate"}},[i("template",{slot:"append"},[e._v("%")])],2)],1),e._v(" "),i("el-form-item",{staticClass:"hold-amount-limit",attrs:{label:"升级持币量:",prop:"holdAmountLimit"}},[i("el-input",{attrs:{placeholder:"请输入升级持币量",size:"small"},model:{value:e.ruleForm.holdAmountLimit,callback:function(t){e.$set(e.ruleForm,"holdAmountLimit",t)},expression:"ruleForm.holdAmountLimit"}},[i("template",{slot:"append"},[e._v("PNB")])],2)],1),e._v(" "),i("el-form-item",{staticClass:"invited-hold-amount-limit",attrs:{label:"被邀请者持币量:",prop:"invitedHoldAmountLimit"}},[i("el-input",{attrs:{size:"small",placeholder:"请输入被邀请者持币量"},model:{value:e.ruleForm.invitedHoldAmountLimit,callback:function(t){e.$set(e.ruleForm,"invitedHoldAmountLimit",t)},expression:"ruleForm.invitedHoldAmountLimit"}},[i("template",{slot:"append"},[e._v("PNB")])],2)],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.determine}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var o=i("VU/8")({name:"pagelist",data:function(){return{pageTypeList:[],ruleForm:{maxRate:"",initRate:"",invitedHoldAmountLimit:"",holdAmountLimit:"",increaseRate:""},dialogFormVisible:!1,rules:{initRate:[{required:!0,message:"请输入起始收益率",trigger:"blur"}],maxRate:[{required:!0,message:"请输入收益率上限",trigger:"blur"}],increaseRate:[{required:!0,message:"请输入每邀请1个人增长值",trigger:"blur"}],holdAmountLimit:[{required:!0,message:"请输入升级持币量",trigger:"blur"}],invitedHoldAmountLimit:[{required:!0,message:"请输入被邀请者持币量",trigger:"blur"}]},listData:{list:[]}}},methods:{changeInfo:function(e){this.ruleForm={roleId:e.roleId,roleName:e.roleName,initRate:(100*e.initRate).toFixed(2),maxRate:(100*e.maxRate).toFixed(2),increaseRate:(100*e.increaseRate).toFixed(2),holdAmountLimit:e.holdAmountLimit,invitedHoldAmountLimit:e.invitedHoldAmountLimit},this.dialogFormVisible=!0},getPageInfoList:function(){var e=this;this.$http.post("/supernode/backmgr/role/getRoleInfo",{}).then(function(t){e.listData.list=t.result||[]})},determine:function(){var e=this,t={roleId:this.ruleForm.roleId,roleName:this.ruleForm.roleName,initRate:(this.ruleForm.initRate/100).toFixed(4),maxRate:(this.ruleForm.maxRate/100).toFixed(4),increaseRate:(this.ruleForm.increaseRate/100).toFixed(4),holdAmountLimit:this.ruleForm.holdAmountLimit,invitedHoldAmountLimit:this.ruleForm.invitedHoldAmountLimit};this.$http.post("/supernode/backmgr/role/updateRoleInfo",t).then(function(t){e.$message({type:"success",message:"修改成功！"}),e.getPageInfoList(),e.dialogFormVisible=!1})}},activated:function(){this.getPageInfoList()}},l,!1,function(e){i("uTOp")},null,null);t.default=o.exports},uTOp:function(e,t){}});