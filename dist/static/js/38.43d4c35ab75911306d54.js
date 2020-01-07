webpackJsonp([38],{FPrG:function(e,t){},GCs9:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={name:"collect-alarm",data:function(){return{list:[],alarmlist:[],ruleForm:{phone:"",rtype:"",name:"",IntervalTime:""},dialogTitle:"",dialogFormVisible:!1,rules:{phone:[{required:!0,message:"请输入手机号",trigger:"blur"}],rtype:[{required:!0,message:"请选择",trigger:"change"}],IntervalTime:[{required:!0,message:"请输入时间间隔",trigger:"blur"},{validator:function(e,t,l){/^[0-9]+.?[0-9]*$/.test(t)?l():l(new Error(e.message))},message:"时间间隔必须为数字"}]}}},methods:{resetForm:function(){this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},getAlarmList:function(){var e=this,t=this.pageNum,l=this.pageSize;this.$http.post("wallet/backmgr/alarm/getAlarmList",{pageNum:t,pageSize:l}).then(function(t){var l=t.result.list;e.list=l})},remove:function(e){var t=this;this.$confirm("确定删除吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.post("wallet/backmgr/alarm/deleteAlarm",{id:e}).then(function(e){t.$notify({title:"成功",message:"删除成功",type:"success"}),t.getAlarmList()})})},handleStatus:function(e,t){var l=this,r={id:e,activeStatus:1==t?0:1};this.$http.post("wallet/backmgr/alarm/addOrUpdateAlarm",r).then(function(e){l.$notify({title:"成功",message:(1==t?"暂停":"生效")+"成功",type:"success"}),l.getAlarmList()})},getSysAlarmType:function(){var e=this;this.alarmlist.length||this.$http.post("/wallet/backmgr/alarm/getSysAlarmType",{}).then(function(t){e.alarmlist=t.result.list})},addSend:function(){this.dialogTitle="创建告警短信",this.dialogFormVisible=!0,this.getSysAlarmType(),this.resetForm()},determine:function(){var e=this;this.$refs.ruleForm.validate(function(t){if(!t)return!1;e.$http.post("wallet/backmgr/alarm/addOrUpdateAlarm",e.ruleForm).then(function(t){e.$notify({title:"成功",message:"创建成功",type:"success"}),e.dialogFormVisible=!1,e.getAlarmList()})})}},activated:function(){this.getAlarmList()}},a={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"collect-alarm"},[l("el-col",{staticStyle:{"text-align":"right","margin-bottom":"30px"},attrs:{span:22}},[l("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.addSend}},[e._v("创建告警短信")])],1),e._v(" "),l("sac-table",{attrs:{data:e.list}},[l("el-table-column",{attrs:{prop:"id",label:"序号"}}),e._v(" "),l("el-table-column",{attrs:{prop:"phone",label:"手机号码"}}),e._v(" "),l("el-table-column",{attrs:{prop:"name",label:"用户姓名"}}),e._v(" "),l("el-table-column",{attrs:{label:"邮件类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.rtype?l("span",[e._v("审核告警")]):e._e(),e._v(" "),1==t.row.rtype?l("span",[e._v("上链异常")]):e._e(),e._v(" "),2==t.row.rtype?l("span",[e._v("到账延时")]):e._e(),e._v(" "),3==t.row.rtype?l("span",[e._v("商户余额")]):e._e()]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"intervalTime",label:"发送间隔"}}),e._v(" "),l("el-table-column",{attrs:{label:"操作",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{type:1==t.row.activeStatus?"danger":"primary",size:"small"},nativeOn:{click:function(l){return e.handleStatus(t.row.id,t.row.activeStatus)}}},[e._v(e._s(1==t.row.activeStatus?"暂停":"生效")+"\n        ")]),e._v(" "),l("el-button",{attrs:{type:"success",size:"small"},nativeOn:{click:function(l){return e.remove(t.row.id)}}},[e._v("删除")])]}}])})],1),e._v(" "),l("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[l("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"130px"}},[l("el-form-item",{attrs:{label:"手机号码：",prop:"phone"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入手机号码"},model:{value:e.ruleForm.phone,callback:function(t){e.$set(e.ruleForm,"phone",t)},expression:"ruleForm.phone"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"告警类型:",prop:"rtype"}},[l("el-select",{staticStyle:{width:"100%"},attrs:{size:"small",placeholder:"请选择"},model:{value:e.ruleForm.rtype,callback:function(t){e.$set(e.ruleForm,"rtype",t)},expression:"ruleForm.rtype"}},e._l(e.alarmlist,function(e,t){return l("el-option",{key:e.code,attrs:{label:e.name,value:e.id}})}),1)],1),e._v(" "),l("el-form-item",{attrs:{label:"用户姓名："}},[l("el-input",{attrs:{size:"small",placeholder:"请输入用户姓名"},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"发生间隔：",prop:"Intervals"}},[l("el-input",{staticStyle:{width:"60%"},attrs:{size:"small",placeholder:"请输入发生间隔"},model:{value:e.ruleForm.IntervalTime,callback:function(t){e.$set(e.ruleForm,"IntervalTime",t)},expression:"ruleForm.IntervalTime"}}),e._v(" "),l("span",{staticStyle:{"margin-left":"10px"}},[e._v(" 分钟")])],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.determine}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var i=l("VU/8")(r,a,!1,function(e){l("FPrG")},null,null);t.default=i.exports}});