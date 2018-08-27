webpackJsonp([27],{ZaII:function(e,t){},lf17:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=r("mvHQ"),a=r.n(l),s={name:"currency-set",data:function(){var e=function(e,t,r){/^[0-9]+.?[0-9]*$/.test(t)?r():r(new Error(e.message))};return{ruleForm:{coinName:"",chineseDesc:"",iconUrl:"",contractadres:"",isErc20:"",tranInMinAmount:"",tranOutMinAmount:"",tranInFee:"",tranOutFee:"",tranLimitNRealNameAmount:"",auditInMinAmount:"",auditOutMinAmount:"",smsCkInMinAmount:"",smsCkOutMinAmount:"",smsInNoticeMinAmount:"",smsOutNoticeMinAmount:""},server_path:"",tranInFeeUnit:"",tranOutFeeUnit:"",buttonTitle:"创建币种",rules:{coinName:[{required:!0,message:"请输入币种",trigger:"blur"}],iconUrl:[{required:!0,message:"请输入应用图标地址",trigger:"blur"}],contractadres:[{required:!0,message:"请输入合约地址",trigger:"blur"}],tranLimitNRealNameAmount:[{required:!0,message:"请输入数额",trigger:"blur"},{validator:e,message:"转账限额必须为数字"}],isErc20:[{required:!0,message:"请选择是否是ETH代币",trigger:"change"}],tranInMinAmount:[{required:!0,message:"请输入最小转账数额",trigger:"blur"},{validator:e,message:"账数额必须为数字"}],tranOutMinAmount:[{required:!0,message:"请输入最小转账数额",trigger:"blur"},{validator:e,message:"账数额必须为数字"}],tranInFee:[{required:!0,message:"请输入手续费",trigger:"blur"},{validator:e,message:"手续费必须为数字"}],tranOutFee:[{required:!0,message:"请输入手续费",trigger:"blur"},{validator:e,message:"手续费必须为数字"}],auditInMinAmount:[{required:!0,message:"请输入数额",trigger:"blur"},{validator:e,message:"转账限额必须为数字"}],auditOutMinAmount:[{required:!0,message:"请输入数额",trigger:"blur"},{validator:e,message:"转账限额必须为数字"}],smsCkInMinAmount:[{required:!0,message:"请输入数额",trigger:"blur"},{validator:e,message:"短信验证限额必须为数字"}],smsCkOutMinAmount:[{required:!0,message:"请输入数额",trigger:"blur"},{validator:e,message:"短信验证限额必须为数字"}],smsInNoticeMinAmount:[{required:!0,message:"请输入数额",trigger:"blur"},{validator:e,message:"短信通知限额必须为数字"}],smsOutNoticeMinAmount:[{required:!0,message:"请输入数额",trigger:"blur"},{validator:e,message:"短信通知限额必须为数字"}],chineseDesc:[{required:!0,message:"请输入币种介绍",trigger:"blur"}]}}},methods:{resetForm:function(){this.ruleForm.contractadres="",this.$refs.ruleForm.resetFields()},onSubmit:function(){var e=this;this.$refs.ruleForm.validate(function(t){if(!t)return!1;var r=JSON.parse(a()(e.ruleForm));r.tranInFee=(e.ruleForm.tranInFee+e.tranInFeeUnit).trim(),r.tranOutFee=(e.ruleForm.tranOutFee+e.tranOutFeeUnit).trim(),r.coinId?(r.contractadres=r.contractadres||"empty",e.$http.post("wallet/backmgr/coin/updateCoinInfo.do",r).then(function(t){e.$notify({title:"成功",message:r.coinName+" 修改成功",type:"success"}),setTimeout(function(){e.$router.push({path:"/configurable/currency"})},1e3)})):e.$http.post("wallet/backmgr/coin/createCoinInfo.do",r).then(function(t){e.$notify({title:"成功",message:r.coinName+" 创建成功",type:"success"}),setTimeout(function(){e.$router.push({path:"/configurable/currency"})},1e3)})})},upload:function(e,t,r){this.postObj.iconUrl=e.result.urls[0]}},activated:function(){if(this.resetForm(),this.server_path=SERVER_PATH,this.$route.params.coinId){this.ruleForm=JSON.parse(a()(this.$route.params));var e=this.ruleForm.tranInFee.split("%"),t=this.ruleForm.tranOutFee.split("%");this.ruleForm.tranInFee=e[0],this.tranInFeeUnit=e.length>1?"%":"",this.ruleForm.tranOutFee=t[0],this.tranOutFeeUnit=t.length>1?"%":"",this.ruleForm.isErc20=0==this.ruleForm.isErc20?"NO":"YES",this.ruleForm.tranLimitNRealNameAmount=this.ruleForm.tranLimitNrealName,this.buttonTitle="修改币种"}else this.buttonTitle="创建币种"}},n={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"currency-set"},[r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"190px"}},[r("el-form-item",{attrs:{label:"币种:",prop:"coinName"}},[r("el-input",{attrs:{size:"small",clearable:"",placeholder:"请输入币种"},model:{value:e.ruleForm.coinName,callback:function(t){e.$set(e.ruleForm,"coinName",t)},expression:"ruleForm.coinName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"应用图标:",prop:"iconUrl"}},[r("el-input",{staticStyle:{width:"80%"},attrs:{clearable:"",size:"small",placeholder:"请输入应用图标地址"},model:{value:e.ruleForm.iconUrl,callback:function(t){e.$set(e.ruleForm,"iconUrl",t)},expression:"ruleForm.iconUrl"}},[r("el-upload",{attrs:{slot:"append",action:e.server_path+"wallet/util/open/uploadFile.do",multiple:"",name:"files",data:{type:"img"},"show-file-list":!1,"on-success":e.upload},slot:"append"},[r("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1)],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"合约地址:"}},[r("el-input",{staticStyle:{width:"80%"},attrs:{clearable:"",size:"small",placeholder:"请输入合约地址"},model:{value:e.ruleForm.contractadres,callback:function(t){e.$set(e.ruleForm,"contractadres",t)},expression:"ruleForm.contractadres"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"未身份认证每日转账限额:",prop:"tranLimitNRealNameAmount"}},[r("el-input",{staticStyle:{width:"80%"},attrs:{size:"small",placeholder:"请输入数额",clearable:""},model:{value:e.ruleForm.tranLimitNRealNameAmount,callback:function(t){e.$set(e.ruleForm,"tranLimitNRealNameAmount",t)},expression:"ruleForm.tranLimitNRealNameAmount"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"是否是ETH代币:",prop:"isErc20"}},[r("el-radio-group",{model:{value:e.ruleForm.isErc20,callback:function(t){e.$set(e.ruleForm,"isErc20",t)},expression:"ruleForm.isErc20"}},[r("el-radio",{attrs:{label:"YES"},model:{value:e.ruleForm.isErc20,callback:function(t){e.$set(e.ruleForm,"isErc20",t)},expression:"ruleForm.isErc20"}},[e._v("是")]),e._v(" "),r("el-radio",{attrs:{label:"NO"},model:{value:e.ruleForm.isErc20,callback:function(t){e.$set(e.ruleForm,"isErc20",t)},expression:"ruleForm.isErc20"}},[e._v("否")])],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"最小转账数额:",required:""}},[r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"tranInMinAmount"}},[r("span",{staticClass:"input-before-lable1"},[e._v("站内")]),e._v(" "),r("el-input",{staticClass:"min-input",attrs:{clearable:"",size:"small",placeholder:"请输入最小转账数额"},model:{value:e.ruleForm.tranInMinAmount,callback:function(t){e.$set(e.ruleForm,"tranInMinAmount",t)},expression:"ruleForm.tranInMinAmount"}})],1)],1),e._v(" "),r("el-col",{staticClass:"line",attrs:{span:2}}),e._v(" "),r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"tranOutMinAmount"}},[r("span",{staticClass:"input-before-lable"},[e._v("站外")]),e._v(" "),r("el-input",{staticClass:"min-input",attrs:{clearable:"",size:"small",placeholder:"请输入最小转账数额"},model:{value:e.ruleForm.tranOutMinAmount,callback:function(t){e.$set(e.ruleForm,"tranOutMinAmount",t)},expression:"ruleForm.tranOutMinAmount"}})],1)],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"转账手续费:",required:""}},[r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"tranInFee"}},[r("span",{staticClass:"input-before-lable1"},[e._v("站内")]),e._v(" "),r("el-input",{staticClass:"min-input",attrs:{clearable:"",size:"small",placeholder:"请输入手续费"},model:{value:e.ruleForm.tranInFee,callback:function(t){e.$set(e.ruleForm,"tranInFee",t)},expression:"ruleForm.tranInFee"}}),e._v(" "),r("el-select",{staticClass:"charge-select",attrs:{placeholder:"请选择",size:"small"},model:{value:e.tranInFeeUnit,callback:function(t){e.tranInFeeUnit=t},expression:"tranInFeeUnit"}},[r("el-option",{attrs:{label:"固定值",value:""}}),e._v(" "),r("el-option",{attrs:{label:"百分比",value:"%"}})],1)],1)],1),e._v(" "),r("el-col",{staticClass:"line",attrs:{span:2}}),e._v(" "),r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"tranOutFee"}},[r("span",{staticClass:"input-before-lable"},[e._v("站外")]),e._v(" "),r("el-input",{staticClass:"min-input",attrs:{clearable:"",size:"small",placeholder:"请输入手续费"},model:{value:e.ruleForm.tranOutFee,callback:function(t){e.$set(e.ruleForm,"tranOutFee",t)},expression:"ruleForm.tranOutFee"}}),e._v(" "),r("el-select",{staticClass:"charge-select",attrs:{placeholder:"请选择",size:"small"},model:{value:e.tranOutFeeUnit,callback:function(t){e.tranOutFeeUnit=t},expression:"tranOutFeeUnit"}},[r("el-option",{attrs:{label:"固定值",value:""}}),e._v(" "),r("el-option",{attrs:{label:"百分比",value:"%"}})],1)],1)],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"后台审核转账限额:",required:""}},[r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"auditInMinAmount"}},[r("span",{staticClass:"input-before-lable1"},[e._v("站内")]),e._v(" "),r("el-input",{staticClass:"min-input",attrs:{clearable:"",size:"small",placeholder:"请输入数额"},model:{value:e.ruleForm.auditInMinAmount,callback:function(t){e.$set(e.ruleForm,"auditInMinAmount",t)},expression:"ruleForm.auditInMinAmount"}}),e._v(" "),r("el-tag",[e._v("RMB")])],1)],1),e._v(" "),r("el-col",{staticClass:"line",attrs:{span:2}}),e._v(" "),r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"auditOutMinAmount"}},[r("span",{staticClass:"input-before-lable"},[e._v("站外")]),e._v(" "),r("el-input",{staticClass:"min-input",attrs:{clearable:"",size:"small",placeholder:"请输入数额"},model:{value:e.ruleForm.auditOutMinAmount,callback:function(t){e.$set(e.ruleForm,"auditOutMinAmount",t)},expression:"ruleForm.auditOutMinAmount"}}),e._v(" "),r("el-tag",[e._v("RMB")])],1)],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"短信验证限额:",required:""}},[r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"smsCkInMinAmount"}},[r("span",{staticClass:"input-before-lable1"},[e._v("站内")]),e._v(" "),r("el-input",{staticClass:"min-input",attrs:{clearable:"",size:"small",placeholder:"请输入数额"},model:{value:e.ruleForm.smsCkInMinAmount,callback:function(t){e.$set(e.ruleForm,"smsCkInMinAmount",t)},expression:"ruleForm.smsCkInMinAmount"}}),e._v(" "),r("el-tag",[e._v("RMB")])],1)],1),e._v(" "),r("el-col",{staticClass:"line",attrs:{span:2}}),e._v(" "),r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"smsCkOutMinAmount"}},[r("span",{staticClass:"input-before-lable"},[e._v("站外")]),e._v(" "),r("el-input",{staticClass:"min-input",attrs:{clearable:"",size:"small",placeholder:"请输入数额"},model:{value:e.ruleForm.smsCkOutMinAmount,callback:function(t){e.$set(e.ruleForm,"smsCkOutMinAmount",t)},expression:"ruleForm.smsCkOutMinAmount"}}),e._v(" "),r("el-tag",[e._v("RMB")])],1)],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"短信通知限额:",required:""}},[r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"smsInNoticeMinAmount"}},[r("span",{staticClass:"input-before-lable1"},[e._v("站内")]),e._v(" "),r("el-input",{staticClass:"min-input",attrs:{clearable:"",size:"small",placeholder:"请输入数额"},model:{value:e.ruleForm.smsInNoticeMinAmount,callback:function(t){e.$set(e.ruleForm,"smsInNoticeMinAmount",t)},expression:"ruleForm.smsInNoticeMinAmount"}}),e._v(" "),r("el-tag",[e._v("RMB")])],1)],1),e._v(" "),r("el-col",{staticClass:"line",attrs:{span:2}}),e._v(" "),r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"smsOutNoticeMinAmount"}},[r("span",{staticClass:"input-before-lable"},[e._v("站外")]),e._v(" "),r("el-input",{staticClass:"min-input",attrs:{clearable:"",size:"small",placeholder:"请输入数额"},model:{value:e.ruleForm.smsOutNoticeMinAmount,callback:function(t){e.$set(e.ruleForm,"smsOutNoticeMinAmount",t)},expression:"ruleForm.smsOutNoticeMinAmount"}}),e._v(" "),r("el-tag",[e._v("RMB")])],1)],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"币种介绍:",prop:"chineseDesc"}},[r("el-input",{staticStyle:{width:"80%"},attrs:{type:"textarea",rows:2,size:"small",placeholder:"请输入币种介绍"},model:{value:e.ruleForm.chineseDesc,callback:function(t){e.$set(e.ruleForm,"chineseDesc",t)},expression:"ruleForm.chineseDesc"}})],1),e._v(" "),r("el-form-item",{staticStyle:{"text-align":"center",width:"80%","margin-top":"100px"},attrs:{size:"small"}},[r("el-button",{staticStyle:{width:"100px"},attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v(e._s(e.buttonTitle))]),e._v(" "),r("el-button",{staticStyle:{width:"100px"},attrs:{type:"danger"},on:{click:function(t){e.$router.go(-1)}}},[e._v("取消")])],1)],1)],1)},staticRenderFns:[]};var i=r("VU/8")(s,n,!1,function(e){r("ZaII")},null,null);t.default=i.exports}});
//# sourceMappingURL=27.58a154f306b591084633.js.map