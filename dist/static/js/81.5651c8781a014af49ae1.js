webpackJsonp([81],{RAXW:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=l("lvKI"),a={name:"query",data:function(){return{selectedDate:[],dialogVisible:!1,ruleState:[{label:"正常状态",value:0},{label:"24小时冻结",value:1},{label:"永远冻结",value:2}],advList:[{value:"普通用户",label:"0"},{value:"普通广告商",label:"1"},{value:"高级广告商",label:"2"},{value:"企业广告商",label:"3"}],companyType:[{value:"非企业",label:"0"},{value:"企业号",label:"1"}],filterForm:{userLevel:"",company:"",phone:"",nickName:"",cardNo:"",coinAddr:"",pageNum:1,pageSize:10},listData:{total:null,list:[]},dialogTitle:"创建用户",ruleForm:{phone:"",pwd:"",nickName:""},rules:{phone:[{required:!0,validator:function(e,t,l){t||l(new Error("请输入用户名")),l()},trigger:"blur"}],pwd:[{required:!0,validator:function(e,t,l){if(!t||t.length<6||t.length>16)return l(new Error("请输入6-16位密码"));l()},trigger:"blur"}]},optRules:{optReason:[{required:!0,message:"请输入理由",trigger:"blur"}]},dialogForm:{userId:"",optStatus:"",phone:"",optReason:""},dialogFormVisible:!1,optDialogFormVisible:!1}},mounted:function(){this.getUserInfoList()},methods:{indexMethod:function(e){return 10*(this.filterForm.pageNum-1)+(e+1)},dialogConfirm:function(){var e=this;this.ruleState.forEach(function(t){t.value!=e.ruleForm.status||(e.ruleForm.reason=t.label)}),this.$refs.ruleForm.validate(function(t){if(!t)return!1;e.$http.post("/wallet/app/otc/backmgr/setCustomStatus",e.ruleForm).then(function(t){e.$notify({title:"成功",message:"修改成功",type:"success"}),e.dialogVisible=!1})})},modify:function(e){this.$refs.ruleForm&&this.$refs.ruleForm.resetFields();var t=0;this.ruleState.forEach(function(l){l.label!=e.reason||(t=l.value)}),this.ruleForm.userId=e.userId,this.ruleForm.status=t,this.dialogVisible=!0},submitForm:function(e){2==this.selectedDate.length&&(this.filterForm.startDate=this.selectedDate&&this.$fmtDate(this.selectedDate[0].getTime())+" 00:00:00",this.filterForm.endDate=this.selectedDate&&this.$fmtDate(this.selectedDate[1].getTime())+" 23:59:59"),this.filterForm.pageNum=e;var t=this.filterForm,l=t.phone,o=t.nickName,a=t.userLevel,r=t.company,i=t.endDate;l||o||a||r||i?this.getUserInfoList():this.$notify.error({title:"错误",message:"查询内容不能为空"})},getUserInfoList:function(){var e=this;this.$http.post("/wallet/backmgr/user/getUserInfoList",this.filterForm).then(function(t){var l=t.result.list,o=l.list,a=l.total;e.listData.list=o,e.listData.total=a})},getPaginationChange:function(e,t){this.filterForm.pageSize=e,this.filterForm.pageNum=t,this.getUserInfoList()},goDetail:function(e){this.$router.push({name:"queryDetails",query:{userId:e}})},optStatusHandle:function(e,t,l){this.optDialogFormVisible=!0,this.dialogForm={userId:l.userId,optStatus:e,phone:l.phone,optReason:""}},optStatusChange:function(e,t,l){var o=this,a=this.$createElement;this.$msgbox({title:"提示",message:a("p",null,[a("span",null,"确定执行 "),a("span",{style:"color: red"},t+" "),a("span",{style:"color: #0a52e0"},""+l.phone),a("span",null," 吗?")]),showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",beforeClose:function(a,r,i){"confirm"===a?o.$http.post("wallet/backmgr/user/operatetUser",{userId:l.userId,optStatus:e}).then(function(e){o.$notify({title:"成功",message:t+" "+l.phone+" 成功",type:"success"}),o.getUserInfoList(),i()}):i()}})},optSubmit:function(e){var t=this;this.$refs[e].validate(function(e){if(e){var l=1==t.dialogForm.optStatus?"锁定":"冻结";t.$http.post("wallet/backmgr/user/operatetUser",t.dialogForm).then(function(e){t.$notify({title:"成功",message:l+" "+t.dialogForm.phone+" 成功",type:"success"}),t.optDialogFormVisible=!1,t.getUserInfoList()})}})},addUser:function(){this.dialogTitle="创建用户",this.dialogFormVisible=!0,this.ruleForm={phone:"",pwd:"",nickName:""},this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},determine:function(){var e=this,t=this.ruleForm,l=t.phone,a=t.nickName,r=Object(o.a)(this.ruleForm.pwd);this.$http.post("wallet/backmgr/user/addUsers",{pwd:r,phone:l,nickName:a}).then(function(t){e.$notify({title:"成功",message:"创建用户 "+e.ruleForm.phone+" 成功",type:"success"}),e.dialogFormVisible=!1})}}},r={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"query"},[l("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"86px",model:e.filterForm,size:"mini"}},[l("el-form-item",{staticClass:"dateItem",attrs:{label:"时间:"}},[l("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期",format:"yyyy-MM-dd ","end-placeholder":"结束日期"},model:{value:e.selectedDate,callback:function(t){e.selectedDate=t},expression:"selectedDate"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"账号:"}},[l("el-input",{attrs:{placeholder:"请输入用户账号"},model:{value:e.filterForm.phone,callback:function(t){e.$set(e.filterForm,"phone",t)},expression:"filterForm.phone"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"昵称:"}},[l("el-input",{attrs:{placeholder:"请输入用户昵称"},model:{value:e.filterForm.nickName,callback:function(t){e.$set(e.filterForm,"nickName",t)},expression:"filterForm.nickName"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"广告商类型:"}},[l("el-select",{model:{value:e.filterForm.userLevel,callback:function(t){e.$set(e.filterForm,"userLevel",t)},expression:"filterForm.userLevel"}},[l("el-option",{attrs:{value:"",label:"所有"}}),e._v(" "),e._l(e.advList,function(e,t){return l("el-option",{key:t,attrs:{value:e.label,label:e.value}})})],2)],1),e._v(" "),l("el-form-item",{attrs:{label:"企业类型:"}},[l("el-select",{model:{value:e.filterForm.company,callback:function(t){e.$set(e.filterForm,"company",t)},expression:"filterForm.company"}},[l("el-option",{attrs:{value:"",label:"所有"}}),e._v(" "),e._l(e.companyType,function(e,t){return l("el-option",{key:t,attrs:{value:e.label,label:e.value}})})],2)],1),e._v(" "),l("el-form-item",[l("el-button",{staticClass:"search",attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.submitForm(1)}}},[e._v("搜索")])],1)],1),e._v(" "),l("sac-table",{attrs:{data:e.listData.list}},[l("el-table-column",{attrs:{align:"center",label:"序号",type:"index",index:e.indexMethod,width:"50"}}),e._v(" "),l("el-table-column",{attrs:{align:"center",prop:"phone",label:"账号",width:"130"}}),e._v(" "),l("el-table-column",{attrs:{align:"center",prop:"nickName",label:"昵称"}}),e._v(" "),l("el-table-column",{attrs:{align:"center",prop:"realName",label:"真实姓名"}}),e._v(" "),l("el-table-column",{attrs:{align:"center",prop:"cardNo",label:"身份证号",width:"160px"}}),e._v(" "),l("el-table-column",{attrs:{align:"center",prop:"nickStatus",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(0==t.row.optStatus?"正常":1==t.row.optStatus?"已锁定":"被冻结"))])]}}])}),e._v(" "),l("el-table-column",{attrs:{align:"center",prop:"registTime",label:"注册时间",width:"138"},scopedSlots:e._u([{key:"default",fn:function(t){return l("div",{},[e._v(" "+e._s(e.$fmtDate(t.row.registTime,"full"))+" ")])}}])}),e._v(" "),l("el-table-column",{attrs:{align:"center",label:"操作",fixed:"right",width:"220px"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{directives:[{name:"show",rawName:"v-show",value:2==t.row.optStatus,expression:"scope.row.optStatus== 2"}],attrs:{size:"mini",type:"text"},on:{click:function(l){return e.optStatusChange(0,"解冻账号",t.row)}}},[e._v("解冻账号\n          ")]),e._v(" "),l("el-button",{directives:[{name:"show",rawName:"v-show",value:2!=t.row.optStatus,expression:"scope.row.optStatus != 2"}],attrs:{size:"mini",type:"text"},on:{click:function(l){return e.optStatusHandle(2,"冻结账号",t.row)}}},[e._v("冻结账号\n          ")]),e._v(" "),l("el-button",{directives:[{name:"show",rawName:"v-show",value:1==t.row.optStatus,expression:"scope.row.optStatus== 1"}],attrs:{size:"mini",type:"text",plain:""},on:{click:function(l){return e.optStatusChange(0,"解锁账号",t.row)}}},[e._v("解锁账号\n          ")]),e._v(" "),l("el-button",{directives:[{name:"show",rawName:"v-show",value:0==t.row.optStatus,expression:"scope.row.optStatus== 0"}],attrs:{size:"mini",type:"text"},on:{click:function(l){return e.optStatusHandle(1,"锁定账号",t.row)}}},[e._v("锁定账号\n          ")]),e._v(" "),l("el-button",{attrs:{type:"text",size:"mini"},nativeOn:{click:function(l){return e.goDetail(t.row.userId)}}},[e._v("查看详情")])]}}])})],1),e._v(" "),l("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.filterForm.pageSize,"current-page":e.filterForm.pageNum},on:{handleChange:e.getPaginationChange}}),e._v(" "),l("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[l("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[l("sac-input",{ref:"phone",attrs:{label:"手机号",prop:"phone"},model:{value:e.ruleForm.phone,callback:function(t){e.$set(e.ruleForm,"phone",t)},expression:"ruleForm.phone"}}),e._v(" "),l("sac-input",{ref:"nickName",attrs:{label:"昵称",prop:"nickName"},model:{value:e.ruleForm.nickName,callback:function(t){e.$set(e.ruleForm,"nickName",t)},expression:"ruleForm.nickName"}}),e._v(" "),l("sac-input",{ref:"pwd",attrs:{type:"password",label:"登录密码",placeholder:"请输入6-16位密码",prop:"pwd"},model:{value:e.ruleForm.pwd,callback:function(t){e.$set(e.ruleForm,"pwd",t)},expression:"ruleForm.pwd"}})],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.determine}},[e._v("确 定")])],1)],1),e._v(" "),l("el-dialog",{staticClass:"opt-dialog-wrap",attrs:{title:"备注",visible:e.optDialogFormVisible},on:{"update:visible":function(t){e.optDialogFormVisible=t}}},[l("el-form",{ref:"dialogForm",attrs:{model:e.dialogForm,rules:e.optRules}},[l("el-form-item",{attrs:{prop:"optReason",label:(1==e.dialogForm.optStatus?"锁定":"冻结")+"账号"+e.dialogForm.phone+"理由："}},[l("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:6},maxlength:"50",placeHolder:"请输入理由"},model:{value:e.dialogForm.optReason,callback:function(t){e.$set(e.dialogForm,"optReason",t)},expression:"dialogForm.optReason"}})],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{size:"small"},on:{click:function(t){e.optDialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(t){return e.optSubmit("dialogForm")}}},[e._v("确 定")])],1)],1),e._v(" "),l("el-dialog",{attrs:{title:"修改用户状态",visible:e.dialogVisible,width:"40%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[l("el-form",{ref:"ruleForm",attrs:{inline:!0,"label-width":"90px",model:e.ruleForm}},[l("el-form-item",{attrs:{label:"状态调整:",prop:"status"}},[l("el-select",{model:{value:e.ruleForm.status,callback:function(t){e.$set(e.ruleForm,"status",t)},expression:"ruleForm.status"}},e._l(e.ruleState,function(e,t){return l("el-option",{key:t,attrs:{label:e.label,value:e.value}})}),1)],1)],1),e._v(" "),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:e.dialogConfirm}},[e._v("确认")])],1)],1)],1)},staticRenderFns:[]};var i=l("VU/8")(a,r,!1,function(e){l("eOaX")},"data-v-14270f17",null);t.default=i.exports},eOaX:function(e,t){}});