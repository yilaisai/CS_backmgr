webpackJsonp([10],{"7OT2":function(e,l){},uuXZ:function(e,l){},vLT0:function(e,l,r){"use strict";Object.defineProperty(l,"__esModule",{value:!0});var t=r("KH7x"),a=r.n(t),o=r("Q+Ik"),i=r.n(o),s=r("3cXf"),n=r.n(s),m={name:"check-application",data:function(){return{reason:"",listData:{total:null,list:[]},pageNum:1,pageSize:20,dialogTitle:"创建应用",dialogFormVisible:!1,dialogFormVisibleView:!1,ruleForm:{appid:"",phone:"",appName:"",appNameEn:"",appIcon:"",notifyUrl:"",hookInjectUrl:"",iosVersion:"",adrVersion:"",destext:"",destextEn:"",jumpUrl:"",iosPackageName:"",iosSign:"",adrSign:"",adrPackageName:"",downloadUrl:"",iosDownldUrl:"",transferTypeId:"",ownType:1,position:0},server_path:"",rules:{transferTypeId:[{required:!0,message:"请选择商户类型",trigger:"change"}],appid:[{required:!0,message:"请输入APPID",trigger:"blur"}],appName:[{required:!0,message:"请输入名称",trigger:"blur"}],appIcon:[{required:!0,message:"请输入应用图标地址",trigger:"blur"}],phone:[{required:!0,message:"请输入商户手机号",trigger:"blur"}],iosVersion:[{required:!0,message:"请输入ios版本号",trigger:"blur"}],adrVersion:[{required:!0,message:"请输入android版本号",trigger:"blur"}],destext:[{required:!0,message:"请输入应用介绍",trigger:"blur"}],ownType:[{required:!0,message:"请选择是否自营",trigger:"blur"}],email:[{required:!0,message:"请输入联系邮箱",trigger:"blur"}]},transferTypeInfoList:[],currentForm:{},options:{inline:!1,button:!1,navbar:!1,title:!1,toolbar:!1,tooltip:!1,movable:!0,zoomable:!0,rotatable:!0,scalable:!1,transition:!0,fullscreen:!0,keyboard:!0,url:"data-source"},dialogReasonVisibleView:!1}},methods:{resetForm:function(){this.ruleForm={appid:"",phone:"",appName:"",appIcon:"",notifyUrl:"",hookInjectUrl:"",iosVersion:"",adrVersion:"",destext:"",jumpUrl:"",iosPackageName:"",adrPackageName:"",downloadUrl:"",iosDownldUrl:"",transferTypeId:"",ownType:1,appNameEn:"",iosSign:"",adrSign:"",destextEn:"",position:0},this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},goDetail:function(e){this.resetForm(),this.dialogFormVisibleView=!0,this.ruleForm=JSON.parse(n()(e))},getPaginationChange:function(e,l){this.pageSize=e,this.pageNum=l,this.getThirdAppInfoList()},getThirdAppInfoList:function(){var e=this;this.$http.post("/wallet/backmgr/thirdAppInfo/getWaitingThirdAppList.do",{pageSize:this.pageSize,pageNum:this.pageNum}).then(function(l){e.listData=l.result.list,e.listData.total=l.result.list.total})},passCheck:function(e){var l=this,r=e.appName,t=e.id;this.$http.post("/wallet/backmgr/thirdAppInfo/updateThirdAppInfoAuditStatus.do",{sysStatus:"INVALID0",id:t}).then(function(e){l.$notify({title:"成功",message:"删除 "+r+"成功",type:"success"}),l.getThirdAppInfoList()})},showNoPassCheck:function(){this.dialogReasonVisibleView=!0},upload:function(e,l,r){this.ruleForm.appIcon=e.result.urls[0]},modification:function(e){this.resetForm(),this.dialogFormVisible=!0,this.ruleForm=JSON.parse(n()(e)),this.currentForm=JSON.parse(n()(e)),this.ruleForm.appid=e.appId,this.currentForm.appid=e.appId,this.dialogTitle="修改 "+this.ruleForm.appName+" 应用",this.getTransferTypeInfoList()},determine:function(){var e=this;this.$refs.ruleForm.validate(function(l){l&&e.ruleForm.id&&(i()(e.ruleForm).forEach(function(l){var r=a()(l,2),t=r[0],o=r[1];o==e.currentForm[t]||o||(e.ruleForm[t]="empty")}),e.$http.post("/wallet/backmgr/thirdAppInfo/updateThirdAppInfo.do",e.ruleForm).then(function(l){e.dialogFormVisible=!1,e.resetForm(),e.$notify({title:"成功",message:"修改 "+e.ruleForm.appName+" 应用成功",type:"success"}),e.getThirdAppInfoList()}))})},getTransferTypeInfoList:function(){var e=this;this.transferTypeInfoList.length||this.$http.post("wallet/backmgr/transferType/getTransferTypeInfoList.do",{version:"1.0.0",plat:"web"}).then(function(l){var r=l.result.list.list;r.forEach(function(e){e.label=e.transferTypeName,e.value=e.id}),e.transferTypeInfoList=r})}},activated:function(){this.server_path=SERVER_PATH,this.getThirdAppInfoList()}},p={render:function(){var e=this,l=e.$createElement,r=e._self._c||l;return r("div",{staticClass:"created"},[r("sac-table",{attrs:{data:e.listData.list}},[r("el-table-column",{attrs:{prop:"id",label:"序号",width:"100"}}),e._v(" "),r("el-table-column",{attrs:{label:"应用名称",prop:"app_name"}}),e._v(" "),r("el-table-column",{attrs:{label:"英文名称",prop:"appNameEn"}}),e._v(" "),r("el-table-column",{attrs:{prop:"app_icon",label:"应用图标"},scopedSlots:e._u([{key:"default",fn:function(l){return[r("viewer",{ref:"viewer",staticClass:"viewer",attrs:{options:e.options}},[l.row.appIcon.indexOf("http")?e._e():r("img",{staticStyle:{"max-width":"100%","max-height":"150px"},attrs:{src:l.row.appIcon,alt:"图标存储地址"}})]),e._v(" "),l.row.appIcon.indexOf("http")?r("span",[e._v(e._s(l.row.appIcon))]):e._e()]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"ios_version",label:"ios版本号",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"adr_version",label:"android版本号",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"app_id",label:"APPID",width:"180"}}),e._v(" "),r("el-table-column",{attrs:{prop:"createTime",label:"创建时间",width:"200"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作",width:"200"},scopedSlots:e._u([{key:"default",fn:function(l){return[r("el-button",{attrs:{type:"success",size:"small"},nativeOn:{click:function(r){e.goDetail(l.row)}}},[e._v("查看详情\n        ")]),e._v(" "),r("el-button",{attrs:{type:"warning",disabled:0!=l.row.isShow,size:"small"},nativeOn:{click:function(r){e.modification(l.row)}}},[e._v("修改\n        ")])]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"操作",width:"200"},scopedSlots:e._u([{key:"default",fn:function(l){return[r("el-button",{attrs:{type:"success",size:"small"},nativeOn:{click:function(r){e.passCheck(l.row)}}},[e._v("审核通过\n        ")]),e._v(" "),r("el-button",{attrs:{type:"danger",disabled:0!=l.row.isShow,size:"small"},nativeOn:{click:function(r){e.showNoPassCheck(l.row)}}},[e._v("拒绝\n        ")])]}}])})],1),e._v(" "),r("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.pageSize,"current-page":e.pageNum},on:{handleChange:e.getPaginationChange}}),e._v(" "),r("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible,"close-on-click-modal":!1},on:{"update:visible":function(l){e.dialogFormVisible=l}}},[r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,inline:!0,"label-width":"130px"}},[r("el-form-item",{attrs:{label:"应用名称:",prop:"appName"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入名称"},model:{value:e.ruleForm.appName,callback:function(l){e.$set(e.ruleForm,"appName",l)},expression:"ruleForm.appName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"应用英文名称:"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入名称"},model:{value:e.ruleForm.appNameEn,callback:function(l){e.$set(e.ruleForm,"appNameEn",l)},expression:"ruleForm.appNameEn"}})],1),e._v(" "),e.ruleForm.id?e._e():r("el-form-item",{attrs:{label:"商户手机号:",prop:"phone"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入商户手机号"},model:{value:e.ruleForm.phone,callback:function(l){e.$set(e.ruleForm,"phone",l)},expression:"ruleForm.phone"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"应用图标:",prop:"appIcon"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入应用图标"},model:{value:e.ruleForm.appIcon,callback:function(l){e.$set(e.ruleForm,"appIcon",l)},expression:"ruleForm.appIcon"}},[r("el-upload",{attrs:{slot:"append",action:e.server_path+"wallet/util/open/uploadFile.do",multiple:"",name:"files",data:{type:"img"},"show-file-list":!1,"on-success":e.upload},slot:"append"},[r("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1)],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"商户类型：",prop:"transferTypeId"}},[r("el-select",{attrs:{size:"small",placeholder:"请选择商户类型"},model:{value:e.ruleForm.transferTypeId,callback:function(l){e.$set(e.ruleForm,"transferTypeId",l)},expression:"ruleForm.transferTypeId"}},e._l(e.transferTypeInfoList,function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),r("el-form-item",{attrs:{label:"APPID:",prop:"appid"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入APPID"},model:{value:e.ruleForm.appid,callback:function(l){e.$set(e.ruleForm,"appid",l)},expression:"ruleForm.appid"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"支付通知Url:"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入支付通知Url"},model:{value:e.ruleForm.notifyUrl,callback:function(l){e.$set(e.ruleForm,"notifyUrl",l)},expression:"ruleForm.notifyUrl"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"回调地址:"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入回调地址"},model:{value:e.ruleForm.hookInjectUrl,callback:function(l){e.$set(e.ruleForm,"hookInjectUrl",l)},expression:"ruleForm.hookInjectUrl"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"ios版本号:",prop:"iosVersion"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入版本号"},model:{value:e.ruleForm.iosVersion,callback:function(l){e.$set(e.ruleForm,"iosVersion",l)},expression:"ruleForm.iosVersion"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"android版本号:",prop:"adrVersion"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入版本号"},model:{value:e.ruleForm.adrVersion,callback:function(l){e.$set(e.ruleForm,"adrVersion",l)},expression:"ruleForm.adrVersion"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"iOS Scheme协议:"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入iOS Scheme协议"},model:{value:e.ruleForm.iosPackageName,callback:function(l){e.$set(e.ruleForm,"iosPackageName",l)},expression:"ruleForm.iosPackageName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"iOS 签名:"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入iOS 签名"},model:{value:e.ruleForm.iosSign,callback:function(l){e.$set(e.ruleForm,"iosSign",l)},expression:"ruleForm.iosSign"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"android 包名:"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入android 包名"},model:{value:e.ruleForm.adrPackageName,callback:function(l){e.$set(e.ruleForm,"adrPackageName",l)},expression:"ruleForm.adrPackageName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"android 签名:"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入android 签名"},model:{value:e.ruleForm.adrSign,callback:function(l){e.$set(e.ruleForm,"adrSign",l)},expression:"ruleForm.adrSign"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"android下载地址:"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入android下载地址"},model:{value:e.ruleForm.downloadUrl,callback:function(l){e.$set(e.ruleForm,"downloadUrl",l)},expression:"ruleForm.downloadUrl"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"ios下载地址:"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入ios下载地址"},model:{value:e.ruleForm.iosDownldUrl,callback:function(l){e.$set(e.ruleForm,"iosDownldUrl",l)},expression:"ruleForm.iosDownldUrl"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"跳转地址:"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入跳转地址"},model:{value:e.ruleForm.jumpUrl,callback:function(l){e.$set(e.ruleForm,"jumpUrl",l)},expression:"ruleForm.jumpUrl"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"应用介绍:",prop:"destext"}},[r("el-input",{attrs:{type:"textarea",rows:2,size:"small",placeholder:"请输入应用介绍"},model:{value:e.ruleForm.destext,callback:function(l){e.$set(e.ruleForm,"destext",l)},expression:"ruleForm.destext"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"英文版介绍:"}},[r("el-input",{attrs:{type:"textarea",rows:2,size:"small",placeholder:"请输入应用介绍"},model:{value:e.ruleForm.destextEn,callback:function(l){e.$set(e.ruleForm,"destextEn",l)},expression:"ruleForm.destextEn"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"是否自营",prop:"ownType"}},[r("el-radio-group",{model:{value:e.ruleForm.ownType,callback:function(l){e.$set(e.ruleForm,"ownType",l)},expression:"ruleForm.ownType"}},[r("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),r("el-radio",{attrs:{label:0}},[e._v("否")])],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"权重:"}},[r("el-input-number",{attrs:{size:"small",min:0},model:{value:e.ruleForm.position,callback:function(l){e.$set(e.ruleForm,"position",l)},expression:"ruleForm.position"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"联系邮箱:",prop:"email"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入联系邮箱"},model:{value:e.ruleForm.email,callback:function(l){e.$set(e.ruleForm,"email",l)},expression:"ruleForm.email"}})],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{size:"small"},on:{click:function(l){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.determine}},[e._v("确 定")])],1)],1),e._v(" "),r("el-dialog",{attrs:{title:"应用 "+e.ruleForm.appName+" 的详情",visible:e.dialogFormVisibleView},on:{"update:visible":function(l){e.dialogFormVisibleView=l}}},[r("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,"label-width":"130px"}},[r("el-form-item",{attrs:{label:"名称:"}},[e._v(e._s(e.ruleForm.appName))]),e._v(" "),r("el-form-item",{attrs:{label:"英文版名称:"}},[e._v(e._s(e.ruleForm.appNameEn))]),e._v(" "),r("el-form-item",{attrs:{label:"应用图标:"}},[e.ruleForm.appIcon.indexOf("http")?e._e():r("img",{staticStyle:{"max-width":"100%","max-height":"100px"},attrs:{src:e.ruleForm.appIcon,alt:"图标存储地址"}}),e._v(" "),e.ruleForm.appIcon.indexOf("http")?r("span",[e._v(e._s(e.ruleForm.appIcon))]):e._e()]),e._v(" "),r("el-form-item",{attrs:{label:"商户类型:"}},[e._v(e._s(e.ruleForm.transferTypeName))]),e._v(" "),r("el-form-item",{attrs:{label:"APPID:"}},[e._v(e._s(e.ruleForm.appId))]),e._v(" "),r("el-form-item",{attrs:{label:"支付通知Url:"}},[e._v(e._s(e.ruleForm.notifyUrl))]),e._v(" "),r("el-form-item",{attrs:{label:"回调地址:"}},[e._v(e._s(e.ruleForm.hookInjectUrl))]),e._v(" "),r("el-form-item",{attrs:{label:"ios版本号:"}},[e._v(e._s(e.ruleForm.iosVersion))]),e._v(" "),r("el-form-item",{attrs:{label:"android版本号:"}},[e._v(e._s(e.ruleForm.adrVersion))]),e._v(" "),r("el-form-item",{attrs:{label:"iOS Scheme协议:"}},[e._v(e._s(e.ruleForm.iosPackageName))]),e._v(" "),r("el-form-item",{attrs:{label:"iOS 签名:"}},[e._v(e._s(e.ruleForm.iosSign))]),e._v(" "),r("el-form-item",{attrs:{label:"android 签名:"}},[e._v(e._s(e.ruleForm.adrSign))]),e._v(" "),r("el-form-item",{attrs:{label:"android 包名:"}},[e._v(e._s(e.ruleForm.adrPackageName))]),e._v(" "),r("el-form-item",{attrs:{label:"android下载地址:"}},[e._v(e._s(e.ruleForm.downloadUrl))]),e._v(" "),r("el-form-item",{attrs:{label:"ios下载地址:"}},[e._v(e._s(e.ruleForm.iosDownldUrl))]),e._v(" "),r("el-form-item",{attrs:{label:"跳转地址:"}},[e._v(e._s(e.ruleForm.jumpUrl))]),e._v(" "),r("el-form-item",{attrs:{label:"是否自营:"}},[e._v(e._s(e.ruleForm.ownType?"是":"否"))]),e._v(" "),r("el-form-item",{attrs:{label:"应用介绍:"}},[e._v(e._s(e.ruleForm.destext))]),e._v(" "),r("el-form-item",{attrs:{label:"英文版介绍:"}},[e._v(e._s(e.ruleForm.destextEn))]),e._v(" "),r("el-form-item",{attrs:{label:"权重:"}},[e._v(e._s(e.ruleForm.position))]),e._v(" "),r("el-form-item",{attrs:{label:"联系邮箱:"}},[e._v(e._s(e.ruleForm.email))])],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{size:"small"},on:{click:function(l){e.dialogFormVisibleView=!1}}},[e._v("取 消")])],1)],1),e._v(" "),r("el-dialog",{attrs:{title:"拒绝原因",visible:e.dialogReasonVisibleView},on:{"update:visible":function(l){e.dialogReasonVisibleView=l}}},[r("el-input",{attrs:{type:"textarea",rows:2,size:"small",placeholder:"请输入拒绝原因"},model:{value:e.reason,callback:function(l){e.reason=l},expression:"reason"}}),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{size:"small"},on:{click:function(l){e.dialogFormVisibleView=!1}}},[e._v("取 消")])],1)],1)],1)},staticRenderFns:[]};var u=r("C7Lr")(m,p,!1,function(e){r("uuXZ"),r("7OT2")},null,null);l.default=u.exports}});