webpackJsonp([27],{"+aQo":function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=l("mvHQ"),o=l.n(i),a={name:"pagelist",data:function(){return{pageTypeList:[],ruleForm:{maxRate:"",initRate:"",invitedHoldAmountLimit:"",holdAmountLimit:"",increaseRate:""},dialogFormVisible:!1,rules:{initRate:[{required:!0,message:"请输入起始收益率",trigger:"blur"}],maxRate:[{required:!0,message:"请输入收益率上限",trigger:"blur"}],increaseRate:[{required:!0,message:"请输入每邀请1个人增长值",trigger:"blur"}],holdAmountLimit:[{required:!0,message:"请输入升级持币量",trigger:"blur"}],invitedHoldAmountLimit:[{required:!0,message:"请输入被邀请者持币量",trigger:"blur"}]},listData:{list:[]}}},methods:{changeInfo:function(e){this.ruleForm=JSON.parse(o()(e)),this.dialogFormVisible=!0},getPageInfoList:function(){var e=this;this.$http.post("/supernode/backmgr/role/getRoleInfo",{}).then(function(t){e.listData.list=t.result||[]})},determine:function(){var e=this,t=this.ruleForm;this.$http.post("/supernode/backmgr/role/updateRoleInfo",t).then(function(t){e.$message({type:"success",message:"修改成功！"}),e.getPageInfoList(),e.dialogFormVisible=!1})}},activated:function(){this.getPageInfoList()}},r={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"set-income"},[l("el-row",{staticStyle:{"margin-bottom":"20px"}},[l("el-col",{attrs:{span:19}},[l("span",{staticStyle:{"font-size":"20px","font-weight":"bold"}},[e._v("收益设置")])])],1),e._v(" "),l("sac-table",{attrs:{data:e.listData.list}},[l("el-table-column",{attrs:{prop:"roleName",label:"会员等级",width:"170"}}),e._v(" "),l("el-table-column",{attrs:{prop:"initRate",label:"起始收益率",width:"170"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s((100*t.row.initRate).toFixed(2))+"%\n      ")]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"maxRate",label:"收益率上限",width:"170"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s((100*t.row.maxRate).toFixed(2))+"%\n      ")]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"increaseRate",label:"每邀请1个人增长值",width:"170"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s((100*t.row.increaseRate).toFixed(2))+"%\n      ")]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"holdAmountLimit",label:"最小持币量限制"}}),e._v(" "),l("el-table-column",{attrs:{prop:"invitedHoldAmountLimit",label:"被邀请者最少持币量"}}),e._v(" "),l("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{type:"primary"},nativeOn:{click:function(l){e.changeInfo(t.row)}}},[e._v("修改\n        ")])]}}])})],1),e._v(" "),l("el-dialog",{attrs:{visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[l("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,inline:!0,"label-width":"170px"}},[l("el-form-item",{attrs:{label:"会员等级:",prop:"roleName"}},[e._v(e._s(e.ruleForm.roleName))]),e._v(" "),l("el-form-item",{attrs:{label:"起始收益率:",prop:"initRate"}},[l("el-input",{attrs:{placeholder:"请输入起始收益率",size:"small"},model:{value:(100*e.ruleForm.initRate).toFixed(2),callback:function(t){e.$set(100*e.ruleForm.initRate,"toFixed(2)",t)},expression:"(ruleForm.initRate*100).toFixed(2)"}},[l("template",{slot:"append"},[e._v("%")])],2)],1),e._v(" "),l("el-form-item",{attrs:{label:"收益率上限:",prop:"maxRate"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入收益率上限"},model:{value:(100*e.ruleForm.maxRate).toFixed(2),callback:function(t){e.$set(100*e.ruleForm.maxRate,"toFixed(2)",t)},expression:"(ruleForm.maxRate*100).toFixed(2)"}},[l("template",{slot:"append"},[e._v("%")])],2)],1),e._v(" "),l("el-form-item",{attrs:{label:"每邀请1个人增长值:",prop:"increaseRate"}},[l("el-input",{attrs:{placeholder:"请输入每邀请1个人增长值",size:"small"},model:{value:(100*e.ruleForm.increaseRate).toFixed(2),callback:function(t){e.$set(100*e.ruleForm.increaseRate,"toFixed(2)",t)},expression:"(ruleForm.increaseRate*100).toFixed(2)"}},[l("template",{slot:"append"},[e._v("%")])],2)],1),e._v(" "),l("el-form-item",{attrs:{label:"升级持币量:",prop:"holdAmountLimit"}},[l("el-input",{attrs:{placeholder:"请输入升级持币量",size:"small"},model:{value:e.ruleForm.holdAmountLimit,callback:function(t){e.$set(e.ruleForm,"holdAmountLimit",t)},expression:"ruleForm.holdAmountLimit"}},[l("template",{slot:"append"},[e._v("PNB")])],2)],1),e._v(" "),l("el-form-item",{attrs:{label:"被邀请者持币量:",prop:"invitedHoldAmountLimit"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入被邀请者持币量"},model:{value:e.ruleForm.invitedHoldAmountLimit,callback:function(t){e.$set(e.ruleForm,"invitedHoldAmountLimit",t)},expression:"ruleForm.invitedHoldAmountLimit"}},[l("template",{slot:"append"},[e._v("PNB")])],2)],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:e.determine}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var n=l("VU/8")(a,r,!1,function(e){l("B9oz")},null,null);t.default=n.exports},B9oz:function(e,t){}});