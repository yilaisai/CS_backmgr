webpackJsonp([75],{E3dQ:function(r,t){},tEOW:function(r,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("mvHQ"),s=e.n(a),l={name:"identity-modify",data:function(){return{details:{},ruleForm:{userId:"",realName:"",cardNo:"",frontUrl:"",backUrl:"",antiUrl:""},server_path:"",rules:{realName:[{required:!0,message:"请输入姓名",trigger:"blur"}],cardNo:[{required:!0,message:"请输入身份证号",trigger:"blur"}],frontUrl:[{required:!0,message:"身份证正面照片必须上传",trigger:"blur"}],backUrl:[{required:!0,message:"身份证反面照片必须上传",trigger:"blur"}],antiUrl:[{required:!0,message:"手持照片必须上传",trigger:"blur"}]},upData:{userInfo:"img",type:"userInfo"}}},methods:{resetForm:function(){this.ruleForm.contractadres="",this.$refs.ruleForm.resetFields()},saveData:function(){var r=this;this.$refs.ruleForm.validate(function(t){if(!t)return!1;var e=JSON.parse(s()(r.ruleForm)),a=JSON.parse(s()(r.$route.params));r.$http.post("wallet/backmgr/user/updateUserInfo",e).then(function(t){r.$notify({title:"成功",message:r.details.phone+" 修改成功",type:"success"}),a.cardFrontUrl=e.frontUrl,a.cardBackUrl=e.backUrl,a.antiMoneyUrl=e.antiUrl,a.realName=e.realName,a.cardNo=e.cardNo,setTimeout(function(){r.$router.push({name:"identityDetails",params:a})},1e3)})})},beforeAvatarUpload:function(r){var t="image/jpeg"==r.type||"image/png"==r.type;return t||this.$message.error("上传头像图片只能是 JPG/PNG 格式!"),t},frontUrlSuccess:function(r,t,e){this.ruleForm.frontUrl=r.result.urls[0]},backUrlSuccess:function(r,t,e){this.ruleForm.backUrl=r.result.urls[0]},antiUrlSuccess:function(r,t,e){this.ruleForm.antiUrl=r.result.urls[0]},goBack:function(){this.$router.push({name:"identityDetails",params:this.$route.params})}},activated:function(){this.resetForm(),this.server_path=SERVER_PATH,this.$route.params.userId?(this.ruleForm.userId=this.$route.params.userId,this.ruleForm.realName=this.$route.params.realName,this.ruleForm.cardNo=this.$route.params.cardNo,this.ruleForm.frontUrl=this.$route.params.cardFrontUrl,this.ruleForm.backUrl=this.$route.params.cardBackUrl,this.ruleForm.antiUrl=this.$route.params.antiMoneyUrl,this.details=JSON.parse(s()(this.ruleForm)),this.details.phone=this.$route.params.phone):this.$router.go(-1)}},o={render:function(){var r=this,t=r.$createElement,e=r._self._c||t;return e("div",{staticClass:"identity-modify"},[e("el-row",{staticStyle:{"margin-bottom":"30px"}},[e("el-col",{staticStyle:{"text-align":"right"},attrs:{span:20}},[e("el-button",{staticClass:"refuse-btn",attrs:{type:"danger",size:"small"},nativeOn:{click:function(t){return r.saveData()}}},[r._v("保存\n      ")]),r._v(" "),e("el-button",{attrs:{size:"small",type:"primary"},nativeOn:{click:function(t){return r.goBack()}}},[r._v("取消\n      ")])],1)],1),r._v(" "),e("el-form",{ref:"ruleForm",attrs:{model:r.ruleForm,rules:r.rules,inline:!0,"label-width":"140px"}},[e("el-form-item",{attrs:{label:"账号:"}},[e("span",[r._v(r._s(r.details.phone))])]),r._v(" "),e("el-form-item",{attrs:{label:"姓名:",prop:"realName"}},[e("el-input",{attrs:{size:"small",clearable:"",placeholder:"请输入姓名"},model:{value:r.ruleForm.realName,callback:function(t){r.$set(r.ruleForm,"realName",t)},expression:"ruleForm.realName"}})],1),r._v(" "),e("el-form-item",{attrs:{label:"身份证号码:",prop:"cardNo"}},[e("el-input",{attrs:{size:"small",clearable:"",placeholder:"请输入姓名"},model:{value:r.ruleForm.cardNo,callback:function(t){r.$set(r.ruleForm,"cardNo",t)},expression:"ruleForm.cardNo"}})],1),r._v(" "),e("el-row",{attrs:{gutter:24}},[e("el-col",{attrs:{span:12}},[e("el-form-item",{attrs:{label:"身份证正面照片:",prop:"frontUrl"}},[e("div",{staticClass:"attention",attrs:{slot:"tip"},slot:"tip"},[r._v("*证件照在有效期内，照片文字清晰可见，图片格式支持jpg/png")]),r._v(" "),e("el-upload",{staticClass:"avatar-uploader",attrs:{action:r.server_path+"wallet/backmgr/uploadFile",name:"files",data:r.upData,"show-file-list":!1,"on-success":r.frontUrlSuccess,"before-upload":r.beforeAvatarUpload}},[r.ruleForm.frontUrl?e("img",{attrs:{src:r.ruleForm.frontUrl}}):e("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),r._v(" "),e("el-col",{attrs:{span:12}},[e("el-form-item",{attrs:{label:"身份证反面照片:",prop:"backUrl"}},[e("div",{staticClass:"attention",attrs:{slot:"tip"},slot:"tip"},[r._v("*证件照在有效期内，照片文字清晰可见，图片格式支持jpg/png")]),r._v(" "),e("el-upload",{staticClass:"avatar-uploader",attrs:{action:r.server_path+"wallet/backmgr/uploadFile",name:"files",data:r.upData,"show-file-list":!1,"on-success":r.backUrlSuccess,"before-upload":r.beforeAvatarUpload}},[r.ruleForm.backUrl?e("img",{staticClass:"right-img",attrs:{src:r.ruleForm.backUrl}}):e("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1)],1),r._v(" "),e("el-form-item",{attrs:{label:"手持照片:",prop:"antiUrl"}},[e("div",{staticClass:"attention",attrs:{slot:"tip"},slot:"tip"},[r._v("*证件照在有效期内，照片文字清晰可见，图片格式支持jpg/png")]),r._v(" "),e("el-upload",{staticClass:"avatar-uploader",attrs:{action:r.server_path+"wallet/backmgr/uploadFile",name:"files",data:r.upData,"show-file-list":!1,"on-success":r.antiUrlSuccess,"before-upload":r.beforeAvatarUpload}},[r.ruleForm.antiUrl?e("img",{staticClass:"right-img",attrs:{src:r.ruleForm.antiUrl}}):e("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1)],1)},staticRenderFns:[]};var i=e("VU/8")(l,o,!1,function(r){e("E3dQ")},null,null);t.default=i.exports}});