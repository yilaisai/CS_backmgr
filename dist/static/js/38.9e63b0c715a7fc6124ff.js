webpackJsonp([38],{"+PDj":function(e,r,l){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=l("mvHQ"),i=l.n(t),a=l("d7EF"),o=l.n(a),s=l("W3Iv"),p=l.n(s),n=(l("3f40"),l("4qOc"),l("+cgv"),l("G0J2")),m=(l("yPE/"),l("EaCm")),u={name:"third-modify",data:function(){return{transferTypeInfoList:[],server_path:"",currentForm:{},ruleForm:{appType:"",appid:"",phone:"",appName:"",appNameEn:"",appProp:"",appPropEn:"",appIcon:"",appPreviewPics:"",notifyUrl:"",hookInjectUrl:"",iosVersion:"",iosSize:"",adrVersion:"",destext:"",destextEn:"",jumpUrl:"",iosPackageName:"",iosSign:"",adrSign:"",adrSize:"",adrPackageName:"",downloadUrl:"",iosDownldUrl:"",transferTypeId:"",ownType:1,position:0,disclaimerType:!1,isRecommend:!1},applicationType:m.b,rules:{transferTypeId:[{required:!0,message:"请选择商户类型",trigger:"change"}],appid:[{required:!0,message:"请输入APPID",trigger:"blur"}],appName:[{required:!0,message:"请输入应用名称",trigger:"blur"}],appNameEn:[{required:!0,message:"请输入应用英文名称",trigger:"blur"}],appProp:[{required:!0,message:"请输入应用属性介绍",trigger:"blur"}],appPropEn:[{required:!0,message:"请输入应用属性英文介绍",trigger:"blur"}],appIcon:[{required:!0,message:"请输入应用图标地址",trigger:"blur"}],appPreviewPics:[{required:!0,message:"请输入应用预览地址",trigger:"blur"}],phone:[{required:!0,message:"请输入商户手机号",trigger:"blur"}],destext:[{required:!0,message:"请输入应用介绍",trigger:"blur"}],destextEn:[{required:!0,message:"请输入应用英文介绍",trigger:"blur"}],ownType:[{required:!0,message:"请选择是否自营",trigger:"blur"}],appType:[{required:!0,message:"请选择应用类型",trigger:"blur"}]},dialogVisible:!1,dialogImageUrl:"",maxCount:4,fileList:[],appPreviewPics:[],destextDialogVisible:!1,destextDialogTitle:"",destext:"",editorOption:{modules:{toolbar:[["bold","italic"]]}}}},components:{quillEditor:n.quillEditor},computed:{editor:function(){return this.$refs.myQuillEditor.quill}},methods:{resetForm:function(){this.destext="",this.ruleForm={appType:"",appid:"",phone:"",appName:"",appNameEn:"",appProp:"",appPropEn:"",appIcon:"",appPreviewPics:"",notifyUrl:"",hookInjectUrl:"",iosVersion:"",iosSize:"",adrVersion:"",destext:"",destextEn:"",jumpUrl:"",iosPackageName:"",iosSign:"",adrSign:"",adrSize:"",adrPackageName:"",downloadUrl:"",iosDownldUrl:"",transferTypeId:"",ownType:1,position:0,disclaimerType:!1,isRecommend:!1},this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},getTransferTypeInfoList:function(){var e=this;this.transferTypeInfoList.length||this.$http.post("wallet/backmgr/transferType/getTransferTypeInfoList.do",{version:"1.0.0",plat:"web"}).then(function(r){var l=r.result.list.list;l.forEach(function(e){e.label=e.transferTypeName,e.value=e.id.toString()}),e.transferTypeInfoList=l})},upload:function(e,r,l){this.ruleForm.appIcon=e.result.urls[0]},uploadSuccess:function(e,r,l){this.ruleForm.appPreviewPics?this.ruleForm.appPreviewPics+=","+e.result.urls[0]:this.ruleForm.appPreviewPics=e.result.urls[0]},eachFile:function(e,r){return!!e&&(!(this.appPreviewPics.length>3)&&void this.appPreviewPics.push({file:e}))},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},handleRemove:function(e,r){var l=this;if(this.appPreviewPics.length>r.length){var t=this.ruleForm.appPreviewPics.split(",");t.forEach(function(r,i){l.fileList.length?r==e.url&&(t.splice(i,1),l.fileList.splice(i,1)):r==e.response.result.urls[0]&&t.splice(i,1)}),this.ruleForm.appPreviewPics=t.join(","),this.appPreviewPics.pop()}},determine:function(){var e=this;this.$refs.ruleForm.validate(function(r){r&&(e.ruleForm.id?(p()(e.ruleForm).forEach(function(r){var l=o()(r,2),t=l[0],i=l[1];i==e.currentForm[t]||i||(e.ruleForm[t]="empty")}),e.ruleForm.disclaimerType=1==e.ruleForm.disclaimerType?1:0,e.ruleForm.isRecommend=1==e.ruleForm.isRecommend?1:0,e.$http.post("wallet/backmgr/thirdAppInfo/updateThirdAppInfo.do",e.ruleForm).then(function(r){e.$notify({title:"成功",message:"修改 "+e.ruleForm.appName+" 应用成功",type:"success"}),e.resetForm(),e.$router.go(-1)})):(e.ruleForm.disclaimerType=1==e.ruleForm.disclaimerType?1:0,e.ruleForm.isRecommend=1==e.ruleForm.isRecommend?1:0,e.$http.post("wallet/backmgr/thirdAppInfo/createThirdAppInfo.do",e.ruleForm).then(function(r){e.$notify({title:"成功",message:"创建 "+e.ruleForm.appName+" 应用成功",type:"success"}),e.resetForm(),e.pageNum=1,e.$router.go(-1)})))})},destextHandle:function(){"en"==(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"")?(this.destextDialogTitle="添加应用英文版介绍",this.destext=this.ruleForm.destextEn.replace(/<\/?[^>]*>/g,"")):(this.destextDialogTitle="添加应用介绍",this.destext=this.ruleForm.destext.replace(/<\/?[^>]*>/g,"")),this.destextDialogVisible=!0},destextDetermine:function(){this.destextDialogTitle.indexOf("应用介绍")>-1?this.ruleForm.destext=this.destext.replace(/<\/?[^>]*>/g,""):this.ruleForm.destextEn=this.destext.replace(/<\/?[^>]*>/g,""),this.ruleForm.destextEn.indexOf("&gt;")>-1||this.ruleForm.destextEn.indexOf("&lt;")>-1||this.ruleForm.destext.indexOf("&gt;")>-1||this.ruleForm.destext.indexOf("&lt;")>-1?this.$notify({title:"提示",message:"不可输入特殊符号",type:"error"}):this.destextDialogVisible=!1},getAppPreviewPics:function(e){var r=this;this.appPreviewPics=e.split(",")||[],this.appPreviewPics.forEach(function(e,l){r.fileList.some(function(r){return e==r.url})||r.fileList.push({url:e})})}},activated:function(){var e=this;this.server_path=SERVER_PATH,this.resetForm(),this.getTransferTypeInfoList(),this.fileList=[];var r=this.$route.params;this.$route.params.id&&(this.ruleForm=JSON.parse(i()(r)),this.currentForm=JSON.parse(i()(r)),this.ruleForm.appType=this.applicationType[r.appType].label,this.ruleForm.appid=r.appId,this.currentForm.appid=r.appId,this.appPreviewPics=r.appPreviewPics?r.appPreviewPics.split(","):[],this.ruleForm.disclaimerType=1==this.ruleForm.disclaimerType,this.ruleForm.isRecommend=1==this.ruleForm.isRecommend,this.appPreviewPics.forEach(function(r,l){e.fileList.push({url:r})}))}},c={render:function(){var e=this,r=e.$createElement,l=e._self._c||r;return l("div",{staticClass:"third-modify"},[l("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,inline:!0,"label-width":"150px"}},[l("el-form-item",{attrs:{label:"应用类型",prop:"appType"}},[l("el-select",{attrs:{size:"small",placeholder:"请选择应用类型"},model:{value:e.ruleForm.appType,callback:function(r){e.$set(e.ruleForm,"appType",r)},expression:"ruleForm.appType"}},e._l(e.applicationType,function(e,r){return l("el-option",{key:r,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),l("el-form-item",{attrs:{label:"应用名称:",prop:"appName"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入名称"},model:{value:e.ruleForm.appName,callback:function(r){e.$set(e.ruleForm,"appName",r)},expression:"ruleForm.appName"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"应用英文名称:",prop:"appNameEn"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入名称"},model:{value:e.ruleForm.appNameEn,callback:function(r){e.$set(e.ruleForm,"appNameEn",r)},expression:"ruleForm.appNameEn"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"应用属性介绍:",prop:"appProp"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入名称"},model:{value:e.ruleForm.appProp,callback:function(r){e.$set(e.ruleForm,"appProp",r)},expression:"ruleForm.appProp"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"应用属性英文介绍:",prop:"appPropEn"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入名称"},model:{value:e.ruleForm.appPropEn,callback:function(r){e.$set(e.ruleForm,"appPropEn",r)},expression:"ruleForm.appPropEn"}})],1),e._v(" "),e.ruleForm.id?e._e():l("el-form-item",{attrs:{label:"商户手机号:",prop:"phone"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入商户手机号"},model:{value:e.ruleForm.phone,callback:function(r){e.$set(e.ruleForm,"phone",r)},expression:"ruleForm.phone"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"商户类型：",prop:"transferTypeId"}},[l("el-select",{attrs:{size:"small",placeholder:"请选择商户类型"},model:{value:e.ruleForm.transferTypeId,callback:function(r){e.$set(e.ruleForm,"transferTypeId",r)},expression:"ruleForm.transferTypeId"}},e._l(e.transferTypeInfoList,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),l("el-form-item",{attrs:{label:"APPID:",prop:"appid"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入APPID"},model:{value:e.ruleForm.appid,callback:function(r){e.$set(e.ruleForm,"appid",r)},expression:"ruleForm.appid"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"支付通知Url:"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入支付通知Url"},model:{value:e.ruleForm.notifyUrl,callback:function(r){e.$set(e.ruleForm,"notifyUrl",r)},expression:"ruleForm.notifyUrl"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"回调地址:"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入回调地址"},model:{value:e.ruleForm.hookInjectUrl,callback:function(r){e.$set(e.ruleForm,"hookInjectUrl",r)},expression:"ruleForm.hookInjectUrl"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"iOS 版本号:"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入版本号"},model:{value:e.ruleForm.iosVersion,callback:function(r){e.$set(e.ruleForm,"iosVersion",r)},expression:"ruleForm.iosVersion"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"iOS Scheme协议:"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入iOS Scheme协议"},model:{value:e.ruleForm.iosPackageName,callback:function(r){e.$set(e.ruleForm,"iosPackageName",r)},expression:"ruleForm.iosPackageName"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"iOS Bundle Identifier:"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入iOS 签名"},model:{value:e.ruleForm.iosSign,callback:function(r){e.$set(e.ruleForm,"iosSign",r)},expression:"ruleForm.iosSign"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"iOS 包大小:"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入iOS 包大小"},model:{value:e.ruleForm.iosSize,callback:function(r){e.$set(e.ruleForm,"iosSize",r)},expression:"ruleForm.iosSize"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"iOS 下载地址:"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入ios下载地址"},model:{value:e.ruleForm.iosDownldUrl,callback:function(r){e.$set(e.ruleForm,"iosDownldUrl",r)},expression:"ruleForm.iosDownldUrl"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"android 版本号:"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入版本号"},model:{value:e.ruleForm.adrVersion,callback:function(r){e.$set(e.ruleForm,"adrVersion",r)},expression:"ruleForm.adrVersion"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"android 包名:"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入android 包名"},model:{value:e.ruleForm.adrPackageName,callback:function(r){e.$set(e.ruleForm,"adrPackageName",r)},expression:"ruleForm.adrPackageName"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"android 包大小:"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入android 包大小"},model:{value:e.ruleForm.adrSize,callback:function(r){e.$set(e.ruleForm,"adrSize",r)},expression:"ruleForm.adrSize"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"android 签名:"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入android 签名"},model:{value:e.ruleForm.adrSign,callback:function(r){e.$set(e.ruleForm,"adrSign",r)},expression:"ruleForm.adrSign"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"android下载地址:"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入android下载地址"},model:{value:e.ruleForm.downloadUrl,callback:function(r){e.$set(e.ruleForm,"downloadUrl",r)},expression:"ruleForm.downloadUrl"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"跳转地址:"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入跳转地址"},model:{value:e.ruleForm.jumpUrl,callback:function(r){e.$set(e.ruleForm,"jumpUrl",r)},expression:"ruleForm.jumpUrl"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"应用介绍:",prop:"destext"}},[l("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(r){e.destextHandle()}}},[e._v("添加")])],1),e._v(" "),l("el-form-item",{attrs:{label:"应用英文版介绍:",prop:"destextEn"}},[l("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(r){e.destextHandle("en")}}},[e._v("添加")])],1),e._v(" "),l("el-form-item",{attrs:{label:"是否自营",prop:"ownType"}},[l("el-radio-group",{model:{value:e.ruleForm.ownType,callback:function(r){e.$set(e.ruleForm,"ownType",r)},expression:"ruleForm.ownType"}},[l("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),l("el-radio",{attrs:{label:0}},[e._v("否")])],1)],1),e._v(" "),l("el-form-item",{attrs:{label:"权重:"}},[l("el-input-number",{attrs:{size:"small",min:0},model:{value:e.ruleForm.position,callback:function(r){e.$set(e.ruleForm,"position",r)},expression:"ruleForm.position"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"联系邮箱:",prop:"email"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入联系邮箱"},model:{value:e.ruleForm.email,callback:function(r){e.$set(e.ruleForm,"email",r)},expression:"ruleForm.email"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"应用图标:",prop:"appIcon"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入应用图标地址"},model:{value:e.ruleForm.appIcon,callback:function(r){e.$set(e.ruleForm,"appIcon",r)},expression:"ruleForm.appIcon"}}),e._v(" "),l("span",{staticClass:"appIcon"},[e._v("图标尺寸：120*120")]),e._v(" "),l("el-upload",{staticClass:"avatar-uploader",attrs:{name:"files",action:e.server_path+"wallet/util/open/uploadFile.do","show-file-list":!1,"on-success":e.upload,data:{type:"img"}}},[e.ruleForm.appIcon?l("img",{staticClass:"avatar",attrs:{src:e.ruleForm.appIcon}}):l("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),l("el-form-item",{staticClass:"appPreviewPics",attrs:{label:"应用预览:",prop:"appPreviewPics"}},[l("el-input",{attrs:{size:"small",placeholder:"多个预览地址以逗号隔开"},on:{change:e.getAppPreviewPics},model:{value:e.ruleForm.appPreviewPics,callback:function(r){e.$set(e.ruleForm,"appPreviewPics",r)},expression:"ruleForm.appPreviewPics"}}),e._v(" "),l("span",{staticClass:"appIcon"},[e._v("预览尺寸：横：508*284 竖：320*569，最多上传4张")]),e._v(" "),l("el-upload",{attrs:{multiple:"",name:"files",action:e.server_path+"wallet/util/open/uploadFile.do",data:{type:"img"},"on-success":e.uploadSuccess,"file-list":e.fileList,"list-type":"picture-card","on-preview":e.handlePictureCardPreview,"before-upload":e.eachFile,"on-remove":e.handleRemove}},[l("i",{staticClass:"el-icon-plus"})]),e._v(" "),l("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(r){e.dialogVisible=r}}},[l("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1),e._v(" "),l("el-form-item",{attrs:{label:" ",prop:"disclaimerType"}},[l("el-checkbox",{attrs:{label:"是否免责声明",name:"type"},model:{value:e.ruleForm.disclaimerType,callback:function(r){e.$set(e.ruleForm,"disclaimerType",r)},expression:"ruleForm.disclaimerType"}})],1),e._v(" "),l("el-form-item",{attrs:{label:" ",prop:"isRecommend"}},[l("el-checkbox",{attrs:{label:"是否推荐应用",name:"type"},model:{value:e.ruleForm.isRecommend,callback:function(r){e.$set(e.ruleForm,"isRecommend",r)},expression:"ruleForm.isRecommend"}})],1)],1),e._v(" "),l("div",{staticClass:"determine"},[l("el-button",{attrs:{size:"small"},on:{click:function(r){e.$router.go(-1)}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.determine}},[e._v("确 定")])],1),e._v(" "),l("el-dialog",{attrs:{title:e.destextDialogTitle,visible:e.destextDialogVisible,"close-on-click-modal":!1},on:{"update:visible":function(r){e.destextDialogVisible=r}}},[l("quill-editor",{ref:"myQuillEditor",attrs:{options:e.editorOption},model:{value:e.destext,callback:function(r){e.destext="string"==typeof r?r.trim():r},expression:"destext"}}),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{size:"small"},on:{click:function(r){e.destextDialogVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.destextDetermine}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d=l("VU/8")(u,c,!1,function(e){l("7epy")},null,null);r.default=d.exports},"7epy":function(e,r){}});