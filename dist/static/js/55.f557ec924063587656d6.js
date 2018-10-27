webpackJsonp([55],{LzkE:function(e,t){},RAXW:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("lvKI"),s={name:"query",data:function(){return{filterForm:{phone:"",nickName:"",cardNo:"",coinAddr:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},dialogTitle:"创建用户",ruleForm:{phone:"",pwd:"",nickName:""},rules:{phone:[{required:!0,validator:function(e,t,r){t||r(new Error("请输入用户名")),r()},trigger:"blur"}],pwd:[{required:!0,validator:function(e,t,r){return!t||t.length<6||t.length>16?r(new Error("请输入6-16位密码")):/(?=.*[a-z])(?=.*\d)(?=.*[#@!~%^&*.])[a-z\d#@!~%^&*.]/i.test(t)?void r():r(new Error("登录密码必须是字母、数字和符号的组合"))},trigger:"blur"}]},dialogFormVisible:!1}},methods:{resetForm:function(){this.$refs.phone.reset(),this.$refs.nickName.reset(),this.$refs.cardNo.reset(),this.$refs.coinAddr.reset(),this.$refs.filterForm.resetFields(),this.listData.list=[]},submitForm:function(e){this.filterForm.pageNum=e;var t=this.filterForm,r=t.phone,o=t.nickName,s=t.cardNo,a=t.coinAddr;r||o||s||a?this.getUserInfoList():this.$notify.error({title:"错误",message:"查询内容不能为空"})},getUserInfoList:function(){var e=this;this.$http.post("/wallet/backmgr/user/getUserInfoList.do",this.filterForm).then(function(t){var r=t.result.list,o=r.list,s=r.total;e.listData.list=o,e.listData.total=s})},getPaginationChange:function(e,t){this.filterForm.pageSize=e,this.submitForm(t)},goDetail:function(e){this.$router.push({name:"queryDetails",query:{phone:e}})},optStatusChange:function(e,t,r){var o=this,s=this.$createElement;this.$msgbox({title:"提示",message:s("p",null,[s("span",null,"确定执行 "),s("span",{style:"color: red"},t+" "),s("span",{style:"color: #0a52e0"},""+r.phone),s("span",null," 吗?")]),showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",beforeClose:function(s,a,i){"confirm"===s?o.$http.post("wallet/backmgr/user/operatetUser.do",{userId:r.userId,optStatus:e}).then(function(e){o.$notify({title:"成功",message:t+" "+r.phone+" 成功",type:"success"}),o.getUserInfoList(),i()}):i()}})},addUser:function(){this.dialogTitle="创建用户",this.dialogFormVisible=!0,this.ruleForm={phone:"",pwd:"",nickName:""},this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},determine:function(){var e=this,t=this.ruleForm,r=t.phone,s=t.nickName,a=Object(o.a)(this.ruleForm.pwd);this.$http.post("wallet/backmgr/user/addUsers.do",{pwd:a,phone:r,nickName:s}).then(function(t){e.$notify({title:"成功",message:"创建用户 "+e.ruleForm.phone+" 成功",type:"success"}),e.dialogFormVisible=!1})}}},a={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"query"},[r("el-col",{staticStyle:{"text-align":"right","margin-bottom":"30px"},attrs:{span:22}},[r("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.addUser}},[e._v("创建用户")])],1),e._v(" "),r("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"80px",model:e.filterForm}},[r("sac-input",{ref:"phone",attrs:{label:"手机号",prop:"phone"},model:{value:e.filterForm.phone,callback:function(t){e.$set(e.filterForm,"phone","string"==typeof t?t.trim():t)},expression:"filterForm.phone"}}),e._v(" "),r("sac-input",{ref:"nickName",attrs:{label:"昵称",prop:"nickName"},model:{value:e.filterForm.nickName,callback:function(t){e.$set(e.filterForm,"nickName","string"==typeof t?t.trim():t)},expression:"filterForm.nickName"}}),e._v(" "),r("sac-input",{ref:"cardNo",attrs:{label:"身份证",prop:"cardNo"},model:{value:e.filterForm.cardNo,callback:function(t){e.$set(e.filterForm,"cardNo","string"==typeof t?t.trim():t)},expression:"filterForm.cardNo"}}),e._v(" "),r("sac-input",{ref:"coinAddr",attrs:{label:"收款地址",prop:"coinAddr"},model:{value:e.filterForm.coinAddr,callback:function(t){e.$set(e.filterForm,"coinAddr",t)},expression:"filterForm.coinAddr"}}),e._v(" "),r("sac-submit-form",{on:{submitForm:function(t){e.submitForm(1)},resetForm:e.resetForm}})],1),e._v(" "),r("sac-table",{attrs:{data:e.listData.list}},[r("el-table-column",{attrs:{prop:"userId",label:"序号",width:"100"}}),e._v(" "),r("el-table-column",{attrs:{prop:"phone",label:"手机号码",width:"130"}}),e._v(" "),r("el-table-column",{attrs:{prop:"realName",label:"姓名"}}),e._v(" "),r("el-table-column",{attrs:{prop:"nickName",label:"昵称"}}),e._v(" "),r("el-table-column",{attrs:{prop:"cardNo",label:"身份证号"}}),e._v(" "),r("el-table-column",{attrs:{prop:"registTime",label:"注册时间"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{directives:[{name:"show",rawName:"v-show",value:2==t.row.optStatus,expression:"scope.row.optStatus== 2"}],attrs:{size:"small",type:"success"},on:{click:function(r){e.optStatusChange(0,"解冻账号",t.row)}}},[e._v("解冻账号\n        ")]),e._v(" "),r("el-button",{directives:[{name:"show",rawName:"v-show",value:2!=t.row.optStatus,expression:"scope.row.optStatus != 2"}],attrs:{size:"small",type:"danger"},on:{click:function(r){e.optStatusChange(2,"冻结账号",t.row)}}},[e._v("冻结账号\n        ")]),e._v(" "),r("el-button",{directives:[{name:"show",rawName:"v-show",value:1==t.row.optStatus,expression:"scope.row.optStatus== 1"}],attrs:{size:"small",type:"success",plain:""},on:{click:function(r){e.optStatusChange(0,"解锁账号",t.row)}}},[e._v("解锁账号\n        ")]),e._v(" "),r("el-button",{directives:[{name:"show",rawName:"v-show",value:0==t.row.optStatus,expression:"scope.row.optStatus== 0"}],attrs:{size:"small",type:"warning"},on:{click:function(r){e.optStatusChange(1,"锁定账号",t.row)}}},[e._v("锁定账号\n        ")]),e._v(" "),r("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(r){e.goDetail(t.row.phone)}}},[e._v("查看详情")])]}}])})],1),e._v(" "),r("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.filterForm.pageSize,"current-page":e.filterForm.pageNum},on:{handleChange:e.getPaginationChange}}),e._v(" "),r("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[r("sac-input",{ref:"phone",attrs:{label:"手机号",prop:"phone"},model:{value:e.ruleForm.phone,callback:function(t){e.$set(e.ruleForm,"phone",t)},expression:"ruleForm.phone"}}),e._v(" "),r("sac-input",{ref:"nickName",attrs:{label:"昵称",prop:"nickName"},model:{value:e.ruleForm.nickName,callback:function(t){e.$set(e.ruleForm,"nickName",t)},expression:"ruleForm.nickName"}}),e._v(" "),r("sac-input",{ref:"pwd",attrs:{type:"password",label:"登录密码",placeholder:"请输入6-16位密码",prop:"pwd"},model:{value:e.ruleForm.pwd,callback:function(t){e.$set(e.ruleForm,"pwd",t)},expression:"ruleForm.pwd"}})],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.determine}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var i=r("VU/8")(s,a,!1,function(e){r("LzkE")},null,null);t.default=i.exports}});