webpackJsonp([48],{"2Lbq":function(t,e){},TcDv:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"identity-details"},[s("el-row",{staticStyle:{"margin-bottom":"30px"}},[s("el-col",[s("el-button",{staticClass:"refuse-btn",attrs:{type:"danger",disabled:0==t.details.antiMoneyAudit,size:"small"},nativeOn:{click:function(e){return t.modifyState("refuse")}}},[t._v("拒绝\n      ")]),t._v(" "),s("el-button",{staticClass:"success-btn",attrs:{type:"success",disabled:1==t.details.antiMoneyAudit,size:"small"},nativeOn:{click:function(e){return t.modifyState("success")}}},[t._v("通过审核\n      ")]),t._v(" "),s("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.fixContent}},[t._v("修改")])],1)],1),t._v(" "),s("div",{staticClass:"content"},[s("el-row",{attrs:{gutter:24}},[s("el-col",{attrs:{span:8}},[s("span",[t._v("账号：")]),s("span",[t._v(t._s(t.details.phone))])]),t._v(" "),s("el-col",{attrs:{span:8}},[s("span",[t._v("姓名：")]),s("span",[t._v(t._s(t.details.realName))])]),t._v(" "),s("el-col",{attrs:{span:8}},[s("span",[t._v("身份证号码：")]),s("span",[t._v(t._s(t.details.cardNo))])])],1),t._v(" "),s("el-row",{staticStyle:{"margin-top":"20px"},attrs:{gutter:24}},[s("el-col",{attrs:{span:8}},[s("span",[t._v("证件照审核：")]),t._v(" "),s("span",{class:[1==t.details.cardBackAudit||1==t.CardAudit?"green":"red"]},[t._v("\n          "+t._s(1==t.CardAudit?"通过":-1==t.details.cardBackAudit?"未申请":t.cardBackAuditArr[t.details.cardBackAudit]))])]),t._v(" "),s("el-col",{attrs:{span:8}},[s("span",[t._v("三要素审核：")]),t._v(" "),s("span",{class:["通过"==t.details.autoVerifyDesc||"快速通过"==t.details.autoVerifyDesc?"green":"red"]},[t._v("\n          "+t._s(t.details.autoVerifyDesc))])]),t._v(" "),s("el-col",{attrs:{span:8}},[s("el-button",{staticClass:"check-idenfity",attrs:{type:"warning",size:"small"},nativeOn:{click:function(e){return t.checkThreeIdenfity(e)}}},[t._v("校验三元素\n        ")])],1)],1),t._v(" "),s("el-row",{attrs:{gutter:24}},[s("viewer",{ref:"viewer",staticClass:"viewer",attrs:{options:t.options}},[s("el-col",{attrs:{span:8}},[s("span",[t._v("正面：")]),t._v(" "),s("img",{attrs:{src:t.details.cardFrontUrl}})]),t._v(" "),s("el-col",{attrs:{span:8}},[s("span",[t._v("反面：")]),t._v(" "),s("img",{attrs:{src:t.details.cardBackUrl,alt:""}})]),t._v(" "),s("el-col",{attrs:{span:8}},[s("span",[t._v("手持照片：")]),t._v(" "),s("img",{attrs:{src:t.details.antiMoneyUrl,alt:""}})])],1)],1)],1),t._v(" "),s("span",[t._v("审核记录详情：")]),t._v(" "),t.list.length?s("sac-table",{attrs:{data:t.list}},[s("el-table-column",{attrs:{prop:"auditUserName",label:"审核人"}}),t._v(" "),s("el-table-column",{attrs:{prop:"antiMoneyAudit",label:"审核结果",formatter:t.formatAntiMoneyAudit}}),t._v(" "),s("el-table-column",{attrs:{prop:"custServiceRemark",label:"备注"}}),t._v(" "),s("el-table-column",{attrs:{prop:"updateTime",label:"审核时间"}})],1):t._e(),t._v(" "),s("el-dialog",{attrs:{title:"备注",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[s("el-form",{ref:"dialogForm",attrs:{model:t.dialogForm,rules:"1"==t.details.antiMoneyAudit?t.rules:{}}},[s("el-form-item",{attrs:{prop:"reason",label:("-1"==t.details.antiMoneyAudit||"2"==t.details.antiMoneyAudit?t.isAuditPass?"审核通过":"拒绝":"0"==t.details.antiMoneyAudit?"审核通过":"拒绝")+"理由"}},[s("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:6},maxlength:"50",placeHolder:"请输入理由"},model:{value:t.dialogForm.reason,callback:function(e){t.$set(t.dialogForm,"reason",e)},expression:"dialogForm.reason"}})],1)],1),t._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(e){return t.updateAuditStatus(e)}}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var i=s("C7Lr")({name:"identity-details",data:function(){return{details:{},cardBackAuditArr:{0:"未通过",1:"通过",2:"未通过"},CardAudit:"",list:[],dialogFormVisible:!1,dialogForm:{reason:""},rules:{reason:[{required:!0,message:"请输入拒绝理由",trigger:"blur"}]},options:{inline:!1,button:!1,navbar:!1,title:!1,toolbar:!0,tooltip:!1,movable:!0,zoomable:!0,rotatable:!0,scalable:!1,transition:!0,fullscreen:!0,keyboard:!0,url:"data-source"},isAuditPass:!0}},methods:{resetForm:function(){this.$refs.dialogForm&&this.$refs.dialogForm.resetFields()},fixContent:function(){this.$router.push({name:"identityModify",params:this.details})},formatAntiMoneyAudit:function(t,e){return 0==t.antiMoneyAudit?"不通过":"通过"},checkThreeIdenfity:function(){var t=this;this.$confirm("请小心确认，每次需要花费0.5元哟～","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.post("wallet/backmgr/user/checkRealInfo",{userId:t.details.userId}).then(function(e){e.result.verifyMsg&&e.result.verifyMsg.indexOf(":")>-1?t.details.autoVerifyDesc=e.result.verifyMsg.split(":")[1]:t.details.autoVerifyDesc=e.result.verifyMsg,t.CardAudit=e.result.CardAudit})}).catch(function(){t.$message({type:"info",message:"已取消"})})},getAuditRecdList:function(){var t=this;this.$http.post("/wallet/backmgr/user/getAuditRecdList",{userId:this.details.userId}).then(function(e){t.list=e.result.list})},modifyState:function(t){this.isAuditPass="refuse"!=t,this.dialogFormVisible=!0,this.resetForm()},updateAuditStatus:function(){var t=this;this.$refs.dialogForm.validate(function(e){if(e){var s=t.details,a=s.userId,i=s.antiMoneyAudit,r=t.dialogForm.reason;t.$http.post("wallet/backmgr/user/updateAuditStatus",{userId:a,auditStatus:"-1"==i||"2"==i?t.isAuditPass?"1":"0":"1"==i?"0":"1",auditType:1,reason:r||"empty"}).then(function(e){t.dialogFormVisible=!1,t.$router.go(-1)})}})}},activated:function(){this.resetForm(),this.details=this.$route.query,this.details.autoVerifyDesc=this.details.autoVerifyDesc&&this.details.autoVerifyDesc.indexOf(":")>-1?this.details.autoVerifyDesc.split(":")[1]:this.details.autoVerifyDesc,this.getAuditRecdList()}},a,!1,function(t){s("2Lbq")},null,null);e.default=i.exports}});