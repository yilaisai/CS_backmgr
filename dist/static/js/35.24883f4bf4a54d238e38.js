webpackJsonp([35],{"60xH":function(t,e){},tIze:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"identity-details"},[a("el-row",{staticStyle:{"margin-bottom":"30px"}},[a("el-col",{attrs:{span:4}},[a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(e){t.$router.go(-1)}}},[t._v("返回")])],1),t._v(" "),a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:16}},[a("el-button",{staticClass:"refuse-btn",attrs:{type:"danger",disabled:0==t.details.antiMoneyAudit,size:"small"},nativeOn:{click:function(e){t.modifyState()}}},[t._v("拒绝\n      ")]),t._v(" "),a("el-button",{staticClass:"success-btn",attrs:{type:"success",disabled:1==t.details.antiMoneyAudit,size:"small"},nativeOn:{click:function(e){t.modifyState()}}},[t._v("通过审核\n      ")]),t._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},nativeOn:{click:function(e){return t.fixContent(e)}}},[t._v("修改")])],1)],1),t._v(" "),a("div",{staticClass:"content"},[a("el-row",{attrs:{gutter:24}},[a("el-col",{attrs:{span:8}},[a("span",[t._v("账号：")]),a("span",[t._v(t._s(t.details.phone))])]),t._v(" "),a("el-col",{attrs:{span:8}},[a("span",[t._v("姓名：")]),a("span",[t._v(t._s(t.details.realName))])]),t._v(" "),a("el-col",{attrs:{span:8}},[a("span",[t._v("身份证号码：")]),a("span",[t._v(t._s(t.details.cardNo))])])],1),t._v(" "),a("el-row",{staticStyle:{"margin-top":"20px"},attrs:{gutter:24}},[a("el-col",{attrs:{span:8}},[a("span",[t._v("证件照审核：")]),t._v(" "),a("span",{class:[1==t.details.cardBackAudit||1==t.CardAudit?"green":"red"]},[t._v("\n          "+t._s(1==t.CardAudit?"通过":-1==t.details.cardBackAudit?"未申请":t.cardBackAuditArr[t.details.cardBackAudit]))])]),t._v(" "),a("el-col",{attrs:{span:8}},[a("span",[t._v("三要素审核：")]),t._v(" "),a("span",{class:["通过"==t.details.autoVerifyDesc||"快速通过"==t.details.autoVerifyDesc?"green":"red"]},[t._v("\n          "+t._s(t.details.autoVerifyDesc))])]),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-button",{staticClass:"check-idenfity",attrs:{type:"warning",size:"small"},nativeOn:{click:function(e){return t.checkThreeIdenfity(e)}}},[t._v("校验三元素\n        ")])],1)],1),t._v(" "),a("el-row",{attrs:{gutter:24}},[a("viewer",{ref:"viewer",staticClass:"viewer",attrs:{options:t.options}},[a("el-col",{attrs:{span:8}},[a("span",[t._v("正面：")]),t._v(" "),a("img",{attrs:{src:t.details.cardFrontUrl}})]),t._v(" "),a("el-col",{attrs:{span:8}},[a("span",[t._v("反面：")]),t._v(" "),a("img",{attrs:{src:t.details.cardBackUrl,alt:""}})]),t._v(" "),a("el-col",{attrs:{span:8}},[a("span",[t._v("手持照片：")]),t._v(" "),a("img",{attrs:{src:t.details.antiMoneyUrl,alt:""}})])],1)],1)],1),t._v(" "),a("span",[t._v("审核记录详情：")]),t._v(" "),t.list.length?a("sac-table",{attrs:{data:t.list}},[a("el-table-column",{attrs:{prop:"auditUserName",label:"审核人"}}),t._v(" "),a("el-table-column",{attrs:{prop:"antiMoneyAudit",label:"审核结果",formatter:t.formatAntiMoneyAudit}}),t._v(" "),a("el-table-column",{attrs:{prop:"custServiceRemark",label:"备注"}}),t._v(" "),a("el-table-column",{attrs:{prop:"updateTime",label:"审核时间"}})],1):t._e(),t._v(" "),a("el-dialog",{attrs:{title:"备注",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{ref:"dialogForm",attrs:{model:t.dialogForm,rules:"1"==t.details.antiMoneyAudit?t.rules:{}}},[a("el-form-item",{attrs:{prop:"reason",label:("0"==t.details.antiMoneyAudit?"审核通过":"拒绝")+"理由"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:6},maxlength:"50",placeHolder:"请输入理由"},model:{value:t.dialogForm.reason,callback:function(e){t.$set(t.dialogForm,"reason",e)},expression:"dialogForm.reason"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(e){return t.updateAuditStatus(e)}}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var i=a("VU/8")({name:"identity-details",data:function(){return{details:{},cardBackAuditArr:{0:"未通过",1:"通过",2:"未通过"},CardAudit:"",list:[],dialogFormVisible:!1,dialogForm:{reason:""},rules:{reason:[{required:!0,message:"请输入拒绝理由",trigger:"blur"}]},options:{inline:!1,button:!1,navbar:!1,title:!1,toolbar:!0,tooltip:!1,movable:!0,zoomable:!0,rotatable:!0,scalable:!1,transition:!0,fullscreen:!0,keyboard:!0,url:"data-source"}}},methods:{resetForm:function(){this.$refs.dialogForm&&this.$refs.dialogForm.resetFields()},fixContent:function(){this.$router.push({name:"identityModify",params:this.details})},formatAntiMoneyAudit:function(t,e){return 0==t.antiMoneyAudit?"不通过":"通过"},checkThreeIdenfity:function(){var t=this;this.$confirm("请小心确认，每次需要花费0.5元哟～","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.post("/wallet/backmgr/user/checkRealInfo.do",{userId:t.details.userId}).then(function(e){e.result.verifyMsg&&e.result.verifyMsg.indexOf(":")>-1?t.details.autoVerifyDesc=e.result.verifyMsg.split(":")[1]:t.details.autoVerifyDesc=e.result.verifyMsg,t.CardAudit=e.result.CardAudit})}).catch(function(){t.$message({type:"info",message:"已取消"})})},getAuditRecdList:function(){var t=this;this.$http.post("/wallet/backmgr/user/getAuditRecdList.do",{userId:this.details.userId}).then(function(e){t.list=e.result.list})},modifyState:function(){this.dialogFormVisible=!0,this.resetForm()},updateAuditStatus:function(){var t=this;this.$refs.dialogForm.validate(function(e){if(e){var a=t.details,s=a.userId,i=a.antiMoneyAudit,r=t.dialogForm.reason;t.$http.post("wallet/backmgr/user/updateAuditStatus.do",{userId:s,auditStatus:"1"==i?"0":"1",auditType:1,reason:r||"empty"}).then(function(e){t.dialogFormVisible=!1,t.$router.go(-1)})}})}},activated:function(){this.$route.params.userId?(this.resetForm(),this.details=this.$route.params,this.details.autoVerifyDesc=this.details.autoVerifyDesc&&this.details.autoVerifyDesc.indexOf(":")>-1?this.details.autoVerifyDesc.split(":")[1]:this.details.autoVerifyDesc,this.getAuditRecdList()):this.$router.go(-1)}},s,!1,function(t){a("60xH")},null,null);e.default=i.exports}});