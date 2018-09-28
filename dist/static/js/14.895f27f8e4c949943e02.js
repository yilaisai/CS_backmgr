webpackJsonp([14],{M0PH:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=r("lvKI"),o={name:"query",data:function(){return{stateList:[{value:"",label:"全部"},{value:"SystemMsg",label:"未审核"},{value:"SystemMsg",label:"审核失败"},{value:"",label:"审核通过，已分配账号，未发邮件"},{value:"SystemMsg",label:"审核通过，已分配账号，已发邮件"}],filterForm:{phone:"",nickName:"",cardNo:"",coinAddr:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},dialogTitle:"节点申请表",ruleForm:{phone:"",pwd:"",nickName:""},rules:{phone:[{required:!0,validator:function(e,t,r){t||r(new Error("请输入用户名")),r()},trigger:"blur"}],pwd:[{required:!0,validator:function(e,t,r){return!t||t.length<6||t.length>16?r(new Error("请输入6-16位密码")):/(?=.*[a-z])(?=.*\d)(?=.*[#@!~%^&*.])[a-z\d#@!~%^&*.]/i.test(t)?void r():r(new Error("登录密码必须是字母、数字和符号的组合"))},trigger:"blur"}]},dialogFormVisible:!1}},methods:{resetForm:function(){this.$refs.phone.reset(),this.$refs.nickName.reset(),this.$refs.cardNo.reset(),this.$refs.coinAddr.reset(),this.$refs.filterForm.resetFields(),this.listData.list=[]},submitForm:function(e){this.filterForm.pageNum=e;var t=this.filterForm,r=t.phone,l=t.nickName,o=t.cardNo,a=t.coinAddr;r||l||o||a?this.getUserInfoList():this.$notify.error({title:"错误",message:"查询内容不能为空"})},getUserInfoList:function(){var e=this;this.$http.post("/wallet/backmgr/user/getUserInfoList.do",this.filterForm).then(function(t){var r=t.result.list,l=r.list,o=r.total;e.listData.list=l,e.listData.total=o})},getPaginationChange:function(e,t){this.filterForm.pageSize=e,this.submitForm(t)},goDetail:function(e){this.$router.push({name:"queryDetails",query:{phone:e}})},optStatusChange:function(e,t,r){var l=this,o=this.$createElement;this.$msgbox({title:"提示",message:o("p",null,[o("span",null,"确定执行 "),o("span",{style:"color: red"},t+" "),o("span",{style:"color: #0a52e0"},""+r.phone),o("span",null," 吗?")]),showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",beforeClose:function(o,a,s){"confirm"===o?l.$http.post("wallet/backmgr/user/operatetUser.do",{userId:r.userId,optStatus:e}).then(function(e){l.$notify({title:"成功",message:t+" "+r.phone+" 成功",type:"success"}),l.getUserInfoList(),s()}):s()}})},addUser:function(){this.dialogTitle="节点申请表",this.dialogFormVisible=!0,this.ruleForm={phone:"",pwd:"",nickName:""},this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},determine:function(){var e=this,t=this.ruleForm,r=t.phone,o=t.nickName,a=Object(l.a)(this.ruleForm.pwd);this.$http.post("wallet/backmgr/user/addUsers.do",{pwd:a,phone:r,nickName:o}).then(function(t){e.$notify({title:"成功",message:"创建用户 "+e.ruleForm.phone+" 成功",type:"success"}),e.dialogFormVisible=!1})}}},a={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"query"},[r("el-row",[r("el-col",{attrs:{span:18}},[r("p",{staticStyle:{margin:"0 0 0 30px","font-weight":"bold"}},[e._v("本期PNB总投票数：48952")])]),e._v(" "),r("el-col",{staticStyle:{"text-align":"center","margin-bottom":"30px"},attrs:{span:4}},[r("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.addUser}},[e._v("节点申请")])],1)],1),e._v(" "),r("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"80px",model:e.filterForm}},[r("sac-input",{ref:"phone",attrs:{label:"账号",prop:"phone"},model:{value:e.filterForm.phone,callback:function(t){e.$set(e.filterForm,"phone","string"==typeof t?t.trim():t)},expression:"filterForm.phone"}}),e._v(" "),r("sac-input",{ref:"nickName",attrs:{label:"节点名",prop:"nickName"},model:{value:e.filterForm.nickName,callback:function(t){e.$set(e.filterForm,"nickName","string"==typeof t?t.trim():t)},expression:"filterForm.nickName"}}),e._v(" "),r("sac-select",{attrs:{label:"状态","data-list":e.stateList},model:{value:e.filterForm.stateType,callback:function(t){e.$set(e.filterForm,"stateType",t)},expression:"filterForm.stateType"}}),e._v(" "),r("sac-submit-form",{on:{submitForm:function(t){e.submitForm(1)},resetForm:e.resetForm}})],1),e._v(" "),r("sac-table",{attrs:{data:e.listData.list}},[r("el-table-column",{attrs:{prop:"userId",label:"节点名",width:"100"}}),e._v(" "),r("el-table-column",{attrs:{prop:"phone",label:"Sacbox账号",width:"130"}}),e._v(" "),r("el-table-column",{attrs:{prop:"realName",label:"SAC收款地址"}}),e._v(" "),r("el-table-column",{attrs:{prop:"nickName",label:"SAC持仓数"}}),e._v(" "),r("el-table-column",{attrs:{prop:"cardNo",label:"PNB投票数"}}),e._v(" "),r("el-table-column",{attrs:{prop:"registTime",label:"邮箱"}}),e._v(" "),r("el-table-column",{attrs:{prop:"registTime",label:"节点简介"}}),e._v(" "),r("el-table-column",{attrs:{prop:"registTime",label:"状态"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{directives:[{name:"show",rawName:"v-show",value:2==t.row.optStatus,expression:"scope.row.optStatus== 2"}],attrs:{size:"small",type:"success"},on:{click:function(r){e.optStatusChange(0,"解冻账号",t.row)}}},[e._v("解冻账号\n        ")]),e._v(" "),r("el-button",{directives:[{name:"show",rawName:"v-show",value:2!=t.row.optStatus,expression:"scope.row.optStatus != 2"}],attrs:{size:"small",type:"danger"},on:{click:function(r){e.optStatusChange(2,"冻结账号",t.row)}}},[e._v("冻结账号\n        ")]),e._v(" "),r("el-button",{directives:[{name:"show",rawName:"v-show",value:1==t.row.optStatus,expression:"scope.row.optStatus== 1"}],attrs:{size:"small",type:"success",plain:""},on:{click:function(r){e.optStatusChange(0,"解锁账号",t.row)}}},[e._v("解锁账号\n        ")]),e._v(" "),r("el-button",{directives:[{name:"show",rawName:"v-show",value:0==t.row.optStatus,expression:"scope.row.optStatus== 0"}],attrs:{size:"small",type:"warning"},on:{click:function(r){e.optStatusChange(1,"锁定账号",t.row)}}},[e._v("锁定账号\n        ")]),e._v(" "),r("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(r){e.goDetail(t.row.phone)}}},[e._v("查看详情")])]}}])})],1),e._v(" "),r("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.filterForm.pageSize,"current-page":e.filterForm.pageNum},on:{handleChange:e.getPaginationChange}}),e._v(" "),r("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[r("sac-input",{ref:"phone",attrs:{label:"节点名称",prop:"nodeName"},model:{value:e.ruleForm.nodeName,callback:function(t){e.$set(e.ruleForm,"nodeName",t)},expression:"ruleForm.nodeName"}}),e._v(" "),r("sac-input",{ref:"phone",attrs:{label:"Sacbox账号",prop:"phone"},model:{value:e.ruleForm.phone,callback:function(t){e.$set(e.ruleForm,"phone",t)},expression:"ruleForm.phone"}}),e._v(" "),r("sac-input",{ref:"phone",attrs:{label:"Sacbox地址",prop:"address"},model:{value:e.ruleForm.address,callback:function(t){e.$set(e.ruleForm,"address",t)},expression:"ruleForm.address"}}),e._v(" "),r("sac-input",{ref:"phone",attrs:{label:"SAC持仓数量",prop:"sacNumber"},model:{value:e.ruleForm.sacNumber,callback:function(t){e.$set(e.ruleForm,"sacNumber",t)},expression:"ruleForm.sacNumber"}}),e._v(" "),r("sac-input",{ref:"phone",attrs:{label:"邮箱",prop:"email"},model:{value:e.ruleForm.email,callback:function(t){e.$set(e.ruleForm,"email",t)},expression:"ruleForm.email"}}),e._v(" "),r("el-form-item",{attrs:{label:"节点简介:",required:"",prop:"introduce"}},[r("el-col",{staticStyle:{position:"relative"},attrs:{span:16}},[r("span",{staticClass:"tips tips_textarea"},[e._v(e._s(11)+"/500")]),e._v(" "),r("el-input",{attrs:{size:"small",type:"textarea",rows:5,width:"100%",maxlength:"50",placeholder:"请输入节点简介"},model:{value:e.ruleForm.content,callback:function(t){e.$set(e.ruleForm,"content",t)},expression:"ruleForm.content"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"团队介绍:"}},[r("el-col",{attrs:{span:16}},[r("el-input",{attrs:{size:"small",type:"textarea",rows:5,width:"100%",maxlength:"50",placeholder:"请输入团队介绍或上传文档"},model:{value:e.ruleForm.content,callback:function(t){e.$set(e.ruleForm,"content",t)},expression:"ruleForm.content"}})],1)],1),e._v(" "),r("sac-input",{ref:"offcialurl",attrs:{label:"官网地址",prop:"offcialurl"},model:{value:e.ruleForm.offcialurl,callback:function(t){e.$set(e.ruleForm,"offcialurl",t)},expression:"ruleForm.offcialurl"}}),e._v(" "),r("el-form-item",{attrs:{label:"运营及宣传方案:"}},[r("el-col",{attrs:{span:16}},[r("el-input",{attrs:{size:"small",type:"textarea",rows:5,width:"100%",maxlength:"50",placeholder:"请输入运营及宣传方案或上传文档"},model:{value:e.ruleForm.content,callback:function(t){e.$set(e.ruleForm,"content",t)},expression:"ruleForm.content"}})],1)],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.determine}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var s=r("VU/8")(o,a,!1,function(e){r("O7oM")},null,null);t.default=s.exports},O7oM:function(e,t){}});