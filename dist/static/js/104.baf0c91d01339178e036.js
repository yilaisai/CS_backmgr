webpackJsonp([104],{"88K4":function(e,r){},Lape:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l=t("EaCm"),a={name:"third-detail",data:function(){return{ruleForm:{},applicationType:l.b,options:{inline:!1,button:!1,navbar:!1,title:!1,toolbar:!0,tooltip:!1,movable:!0,zoomable:!0,rotatable:!0,scalable:!1,transition:!0,fullscreen:!0,keyboard:!0,url:"data-source"}}},activated:function(){this.$route.params.id?(this.ruleForm=this.$route.params,this.ruleForm.appType=this.applicationType[this.ruleForm.appType].label):this.$router.go(-1)}},o={render:function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"third-detail"},[t("el-row",{staticStyle:{"margin-bottom":"20px"}},[t("el-col",{attrs:{span:4}},[t("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(r){return e.$router.go(-1)}}},[e._v("返回")])],1)],1),e._v(" "),t("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,"label-width":"150px"}},[t("el-form-item",{attrs:{label:"应用类型:"}},[e._v(e._s(e.ruleForm.appType))]),e._v(" "),t("el-form-item",{attrs:{label:"应用名称:"}},[e._v(e._s(e.ruleForm.appName))]),e._v(" "),t("el-form-item",{attrs:{label:"应用英文版名称:"}},[e._v(e._s(e.ruleForm.appNameEn))]),e._v(" "),t("el-form-item",{attrs:{label:"应用属性介绍:"}},[e._v(e._s(e.ruleForm.appProp))]),e._v(" "),t("el-form-item",{attrs:{label:"应用属性英文版介绍:"}},[e._v(e._s(e.ruleForm.appPropEn))]),e._v(" "),t("el-form-item",{attrs:{label:"商户类型:"}},[e._v(e._s(e.ruleForm.transferTypeName))]),e._v(" "),t("el-form-item",{attrs:{label:"APPID:"}},[e._v(e._s(e.ruleForm.appId))]),e._v(" "),t("el-form-item",{attrs:{label:"支付通知Url:"}},[e._v(e._s(e.ruleForm.notifyUrl))]),e._v(" "),t("el-form-item",{attrs:{label:"回调地址:"}},[e._v(e._s(e.ruleForm.hookInjectUrl))]),e._v(" "),t("el-form-item",{attrs:{label:"iOS 版本号:"}},[e._v(e._s(e.ruleForm.iosVersion))]),e._v(" "),t("el-form-item",{attrs:{label:"iOS Scheme协议:"}},[e._v(e._s(e.ruleForm.iosPackageName))]),e._v(" "),t("el-form-item",{attrs:{label:"iOS Bundle Identifier:"}},[e._v(e._s(e.ruleForm.iosSign))]),e._v(" "),t("el-form-item",{attrs:{label:"iOS 包大小:"}},[e._v(e._s(e.ruleForm.iosSize))]),e._v(" "),t("el-form-item",{attrs:{label:"iOS 下载地址:"}},[e._v(e._s(e.ruleForm.iosDownldUrl))]),e._v(" "),t("el-form-item",{attrs:{label:"android 版本号:"}},[e._v(e._s(e.ruleForm.adrVersion))]),e._v(" "),t("el-form-item",{attrs:{label:"android 包名:"}},[e._v(e._s(e.ruleForm.adrPackageName))]),e._v(" "),t("el-form-item",{attrs:{label:"android 包大小:"}},[e._v(e._s(e.ruleForm.adrSize))]),e._v(" "),t("el-form-item",{attrs:{label:"android 签名:"}},[e._v(e._s(e.ruleForm.adrSign))]),e._v(" "),t("el-form-item",{attrs:{label:"android 下载地址:"}},[e._v(e._s(e.ruleFormwnloadUrl))]),e._v(" "),t("el-form-item",{attrs:{label:"跳转地址:"}},[e._v(e._s(e.ruleForm.jumpUrl))]),e._v(" "),t("el-form-item",{attrs:{label:"是否自营:"}},[e._v(e._s(e.ruleForm.ownType?"是":"否"))]),e._v(" "),t("el-form-item",{staticClass:"destext",attrs:{label:"应用介绍:"}},[t("span",{domProps:{innerHTML:e._s(e.ruleForm.destext)}})]),e._v(" "),t("el-form-item",{staticClass:"destext",attrs:{label:"英文版介绍:"}},[t("span",{domProps:{innerHTML:e._s(e.ruleForm.destextEn)}})]),e._v(" "),t("el-form-item",{attrs:{label:"权重:"}},[e._v(e._s(e.ruleForm.position))]),e._v(" "),t("el-form-item",{attrs:{label:"联系邮箱:"}},[e._v(e._s(e.ruleForm.email))]),e._v(" "),e.ruleForm.appIcon?t("el-form-item",{attrs:{label:"应用图标:"}},[e.ruleForm.appIcon.indexOf("http")?e._e():t("img",{staticStyle:{"max-width":"100%",width:"80px",height:"80px","border-radius":"10px"},attrs:{src:e.ruleForm.appIcon,alt:"图标存储地址"}}),e._v(" "),e.ruleForm.appIcon.indexOf("http")?t("span",[e._v(e._s(e.ruleForm.appIcon))]):e._e()]):e._e(),e._v(" "),e.ruleForm.appPreviewPics?t("el-form-item",{staticClass:"appPreviewPics",attrs:{label:"应用预览:"}},[t("viewer",{ref:"viewer",staticClass:"viewer",attrs:{options:e.options}},e._l(e.ruleForm.appPreviewPics.split(","),function(e,r){return t("img",{key:r,attrs:{src:e,alt:"图标存储地址"}})}),0)],1):e._e()],1)],1)},staticRenderFns:[]};var s=t("VU/8")(a,o,!1,function(e){t("88K4")},null,null);r.default=s.exports}});