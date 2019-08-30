webpackJsonp([34],{NrPY:function(t,e){},RAXW:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=o("lvKI"),i={name:"query",data:function(){return{filterForm:{phone:"",nickName:"",cardNo:"",coinAddr:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},dialogTitle:"创建用户",ruleForm:{phone:"",pwd:"",nickName:""},rules:{phone:[{required:!0,validator:function(t,e,o){e||o(new Error("请输入用户名")),o()},trigger:"blur"}],pwd:[{required:!0,validator:function(t,e,o){return!e||e.length<6||e.length>16?o(new Error("请输入6-16位密码")):/(?=.*[a-z])(?=.*\d)(?=.*[#@!~%^&*.])[a-z\d#@!~%^&*.]/i.test(e)?void o():o(new Error("登录密码必须是字母、数字和符号的组合"))},trigger:"blur"}]},optRules:{optReason:[{required:!0,message:"请输入理由",trigger:"blur"}]},dialogForm:{userId:"",optStatus:"",phone:"",optReason:""},dialogFormVisible:!1,optDialogFormVisible:!1}},methods:{resetForm:function(){this.$refs.phone.reset(),this.$refs.nickName.reset(),this.$refs.cardNo.reset(),this.$refs.coinAddr.reset(),this.$refs.filterForm.resetFields(),this.listData.list=[]},submitForm:function(t){this.filterForm.pageNum=t;var e=this.filterForm,o=e.phone,r=e.nickName,i=e.cardNo,a=e.coinAddr;o||r||i||a?this.getUserInfoList():this.$notify.error({title:"错误",message:"查询内容不能为空"})},getUserInfoList:function(){var t=this;this.$http.post("/wallet/backmgr/user/getUserInfoList",this.filterForm).then(function(e){var o=e.result.list,r=o.list,i=o.total;t.listData.list=r,t.listData.total=i})},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.submitForm(e)},goDetail:function(t){this.$router.push({name:"queryDetails",query:{phone:t}})},optStatusHandle:function(t,e,o){this.optDialogFormVisible=!0,this.dialogForm={userId:o.userId,optStatus:t,phone:o.phone,optReason:""}},optStatusChange:function(t,e,o){var r=this,i=this.$createElement;this.$msgbox({title:"提示",message:i("p",null,[i("span",null,"确定执行 "),i("span",{style:"color: red"},e+" "),i("span",{style:"color: #0a52e0"},""+o.phone),i("span",null," 吗?")]),showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",beforeClose:function(i,a,s){"confirm"===i?r.$http.post("wallet/backmgr/user/operatetUser",{userId:o.userId,optStatus:t}).then(function(t){r.$notify({title:"成功",message:e+" "+o.phone+" 成功",type:"success"}),r.getUserInfoList(),s()}):s()}})},optSubmit:function(t){var e=this;this.$refs[t].validate(function(t){if(t){var o=1==e.dialogForm.optStatus?"锁定":"冻结";e.$http.post("wallet/backmgr/user/operatetUser",e.dialogForm).then(function(t){e.$notify({title:"成功",message:o+" "+e.dialogForm.phone+" 成功",type:"success"}),e.optDialogFormVisible=!1,e.getUserInfoList()})}})},addUser:function(){this.dialogTitle="创建用户",this.dialogFormVisible=!0,this.ruleForm={phone:"",pwd:"",nickName:""},this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},determine:function(){var t=this,e=this.ruleForm,o=e.phone,i=e.nickName,a=Object(r.a)(this.ruleForm.pwd);this.$http.post("wallet/backmgr/user/addUsers",{pwd:a,phone:o,nickName:i}).then(function(e){t.$notify({title:"成功",message:"创建用户 "+t.ruleForm.phone+" 成功",type:"success"}),t.dialogFormVisible=!1})}}},a={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"query"},[o("el-col",{staticStyle:{"text-align":"right","margin-bottom":"30px"},attrs:{span:22}},[o("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.addUser}},[t._v("创建用户")])],1),t._v(" "),o("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"80px",model:t.filterForm}},[o("sac-input",{ref:"phone",attrs:{label:"手机号",prop:"phone"},model:{value:t.filterForm.phone,callback:function(e){t.$set(t.filterForm,"phone","string"==typeof e?e.trim():e)},expression:"filterForm.phone"}}),t._v(" "),o("sac-input",{ref:"nickName",attrs:{label:"昵称",prop:"nickName"},model:{value:t.filterForm.nickName,callback:function(e){t.$set(t.filterForm,"nickName","string"==typeof e?e.trim():e)},expression:"filterForm.nickName"}}),t._v(" "),o("sac-input",{ref:"cardNo",attrs:{label:"身份证",prop:"cardNo"},model:{value:t.filterForm.cardNo,callback:function(e){t.$set(t.filterForm,"cardNo","string"==typeof e?e.trim():e)},expression:"filterForm.cardNo"}}),t._v(" "),o("sac-input",{ref:"coinAddr",attrs:{label:"收款地址",prop:"coinAddr"},model:{value:t.filterForm.coinAddr,callback:function(e){t.$set(t.filterForm,"coinAddr",e)},expression:"filterForm.coinAddr"}}),t._v(" "),o("sac-submit-form",{on:{submitForm:function(e){return t.submitForm(1)},resetForm:t.resetForm}})],1),t._v(" "),o("sac-table",{attrs:{data:t.listData.list}},[o("el-table-column",{attrs:{prop:"userId",label:"序号",width:"100"}}),t._v(" "),o("el-table-column",{attrs:{prop:"phone",label:"手机号码",width:"130"}}),t._v(" "),o("el-table-column",{attrs:{prop:"realName",label:"姓名"}}),t._v(" "),o("el-table-column",{attrs:{prop:"nickName",label:"昵称"}}),t._v(" "),o("el-table-column",{attrs:{prop:"cardNo",label:"身份证号"}}),t._v(" "),o("el-table-column",{attrs:{prop:"registTime",label:"注册时间"}}),t._v(" "),o("el-table-column",{attrs:{label:"操作",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{directives:[{name:"show",rawName:"v-show",value:2==e.row.optStatus,expression:"scope.row.optStatus== 2"}],attrs:{size:"small",type:"success"},on:{click:function(o){return t.optStatusChange(0,"解冻账号",e.row)}}},[t._v("解冻账号\n        ")]),t._v(" "),o("el-button",{directives:[{name:"show",rawName:"v-show",value:2!=e.row.optStatus,expression:"scope.row.optStatus != 2"}],attrs:{size:"small",type:"danger"},on:{click:function(o){return t.optStatusHandle(2,"冻结账号",e.row)}}},[t._v("冻结账号\n        ")]),t._v(" "),o("el-button",{directives:[{name:"show",rawName:"v-show",value:1==e.row.optStatus,expression:"scope.row.optStatus== 1"}],attrs:{size:"small",type:"success",plain:""},on:{click:function(o){return t.optStatusChange(0,"解锁账号",e.row)}}},[t._v("解锁账号\n        ")]),t._v(" "),o("el-button",{directives:[{name:"show",rawName:"v-show",value:0==e.row.optStatus,expression:"scope.row.optStatus== 0"}],attrs:{size:"small",type:"warning"},on:{click:function(o){return t.optStatusHandle(1,"锁定账号",e.row)}}},[t._v("锁定账号\n        ")]),t._v(" "),o("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(o){return t.goDetail(e.row.phone)}}},[t._v("查看详情")])]}}])})],1),t._v(" "),o("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}}),t._v(" "),o("el-dialog",{attrs:{title:t.dialogTitle,visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[o("el-form",{ref:"ruleForm",attrs:{model:t.ruleForm,rules:t.rules,"label-width":"100px"}},[o("sac-input",{ref:"phone",attrs:{label:"手机号",prop:"phone"},model:{value:t.ruleForm.phone,callback:function(e){t.$set(t.ruleForm,"phone",e)},expression:"ruleForm.phone"}}),t._v(" "),o("sac-input",{ref:"nickName",attrs:{label:"昵称",prop:"nickName"},model:{value:t.ruleForm.nickName,callback:function(e){t.$set(t.ruleForm,"nickName",e)},expression:"ruleForm.nickName"}}),t._v(" "),o("sac-input",{ref:"pwd",attrs:{type:"password",label:"登录密码",placeholder:"请输入6-16位密码",prop:"pwd"},model:{value:t.ruleForm.pwd,callback:function(e){t.$set(t.ruleForm,"pwd",e)},expression:"ruleForm.pwd"}})],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{size:"small"},on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.determine}},[t._v("确 定")])],1)],1),t._v(" "),o("el-dialog",{staticClass:"opt-dialog-wrap",attrs:{title:"备注",visible:t.optDialogFormVisible},on:{"update:visible":function(e){t.optDialogFormVisible=e}}},[o("el-form",{ref:"dialogForm",attrs:{model:t.dialogForm,rules:t.optRules}},[o("el-form-item",{attrs:{prop:"optReason",label:(1==t.dialogForm.optStatus?"锁定":"冻结")+"账号"+t.dialogForm.phone+"理由："}},[o("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:6},maxlength:"50",placeHolder:"请输入理由"},model:{value:t.dialogForm.optReason,callback:function(e){t.$set(t.dialogForm,"optReason",e)},expression:"dialogForm.optReason"}})],1)],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{size:"small"},on:{click:function(e){t.optDialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(e){return t.optSubmit("dialogForm")}}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var s=o("VU/8")(i,a,!1,function(t){o("NrPY")},null,null);e.default=s.exports}});