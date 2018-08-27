webpackJsonp([8],{"Gx/7":function(e,t){},ioFa:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=r("d7EF"),a=r.n(l),o=r("W3Iv"),i=r.n(o),s=r("mvHQ"),n=r.n(s),p={name:"created",data:function(){return{listData:{total:null,list:[]},pageNum:1,pageSize:20,dialogTitle:"创建应用",dialogFormVisible:!1,dialogFormVisibleView:!1,ruleForm:{appid:"",phone:"",appName:"",appIcon:"",notifyUrl:"",hookInjectUrl:"",appVersion:"",destext:"",jumpUrl:"",iosPackageName:"",adrPackageName:"",downloadUrl:"",iosDownldUrl:"",transferTypeId:"",ownType:1},server_path:"",rules:{transferTypeId:[{required:!0,message:"请选择商户类型",trigger:"change"}],appid:[{required:!0,message:"请输入APPID",trigger:"blur"}],appName:[{required:!0,message:"请输入名称",trigger:"blur"}],appIcon:[{required:!0,message:"请输入应用图标地址",trigger:"blur"}],phone:[{required:!0,message:"请输入商户手机号",trigger:"blur"}],appVersion:[{required:!0,message:"请输入版本号",trigger:"blur"}],destext:[{required:!0,message:"请输入应用介绍",trigger:"blur"}],ownType:[{required:!0,message:"请选择是否自营",trigger:"blur"}]},transferTypeInfoList:[],currentForm:{}}},methods:{resetForm:function(){this.ruleForm={appid:"",phone:"",appName:"",appIcon:"",notifyUrl:"",hookInjectUrl:"",appVersion:"",destext:"",jumpUrl:"",iosPackageName:"",adrPackageName:"",downloadUrl:"",iosDownldUrl:"",transferTypeId:"",ownType:1},this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},goDetail:function(e){this.resetForm(),this.dialogFormVisibleView=!0,this.ruleForm=JSON.parse(n()(e))},getPaginationChange:function(e,t){this.pageSize=e,this.pageNum=t,this.getThirdAppInfoList()},getThirdAppInfoList:function(){var e=this;this.$http.post("wallet/backmgr/thirdAppInfo/getThirdAppInfoList.do",{pageSize:this.pageSize,pageNum:this.pageNum}).then(function(t){e.listData=t.result.list,e.listData.total=t.result.list.total})},switchChange:function(e){var t=this,r=e.isShow,l=e.id,a=e.appName;this.$http.post("wallet/backmgr/thirdAppInfo/updateThirdAppInfoIsShow.do",{isShow:r?"SHOW":"HIDE",id:l}).then(function(e){t.$notify({title:"成功",message:a+" "+(r?"上架":"下架")+" 成功",type:"success"})})},remove:function(e){var t=this,r=e.appName,l=e.id;this.$confirm("确定删除 "+r+" 应用?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.post("wallet/backmgr/thirdAppInfo/updateThirdAppInfoSysStatus.do",{sysStatus:"INVALID0",id:l}).then(function(e){t.$notify({title:"成功",message:"删除 "+r+"成功",type:"success"}),t.getThirdAppInfoList()})})},upload:function(e,t,r){this.ruleForm.appIcon=e.result.urls[0]},addCreate:function(){this.resetForm(),this.dialogFormVisible=!0,this.dialogTitle="创建应用",this.getTransferTypeInfoList()},modification:function(e){this.resetForm(),this.dialogFormVisible=!0,this.ruleForm=JSON.parse(n()(e)),this.currentForm=JSON.parse(n()(e)),this.ruleForm.appid=e.appId,this.currentForm.appid=e.appId,this.dialogTitle="修改 "+this.ruleForm.appName+" 应用",this.getTransferTypeInfoList()},determine:function(){var e=this;this.$refs.ruleForm.validate(function(t){t&&(e.ruleForm.id?(i()(e.ruleForm).forEach(function(t){var r=a()(t,2),l=r[0],o=r[1];o==e.currentForm[l]||o||(e.ruleForm[l]="empty")}),e.$http.post("wallet/backmgr/thirdAppInfo/updateThirdAppInfo.do",e.ruleForm).then(function(t){e.dialogFormVisible=!1,e.resetForm(),e.$notify({title:"成功",message:"修改 "+e.ruleForm.appName+" 应用成功",type:"success"}),e.getThirdAppInfoList()})):e.$http.post("wallet/backmgr/thirdAppInfo/createThirdAppInfo.do",e.ruleForm).then(function(t){e.dialogFormVisible=!1,e.resetForm(),e.$notify({title:"成功",message:"创建 "+e.ruleForm.appName+" 应用成功",type:"success"}),e.pageNum=1,e.getThirdAppInfoList()}))})},getTransferTypeInfoList:function(){var e=this;this.transferTypeInfoList.length||this.$http.post("wallet/backmgr/transferType/getTransferTypeInfoList.do",{version:"1.0.0",plat:"web"}).then(function(t){var r=t.result.list.list;r.forEach(function(e){e.label=e.transferTypeName,e.value=e.id}),e.transferTypeInfoList=r})}},activated:function(){this.server_path=SERVER_PATH,this.getThirdAppInfoList()}},m={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"created"},[r("el-col",{staticStyle:{"text-align":"right","margin-bottom":"30px"},attrs:{span:22}},[r("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.addCreate}},[e._v("创建应用")])],1),e._v(" "),r("sac-table",{attrs:{data:e.listData.list}},[r("el-table-column",{attrs:{prop:"id",label:"序号",width:"100"}}),e._v(" "),r("el-table-column",{attrs:{label:"名称",prop:"appName"}}),e._v(" "),r("el-table-column",{attrs:{prop:"appIcon",label:"图标存储地址"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.appIcon.indexOf("http")?e._e():r("img",{staticStyle:{"max-width":"100%","max-height":"150px"},attrs:{src:t.row.appIcon,alt:"图标存储地址"}}),e._v(" "),t.row.appIcon.indexOf("http")?r("span",[e._v(e._s(t.row.appIcon))]):e._e()]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"appVersion",label:"版本号",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"appId",label:"APPID",width:"180"}}),e._v(" "),r("el-table-column",{attrs:{prop:"createTime",label:"创建时间",width:"200"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"success",size:"small"},nativeOn:{click:function(r){e.goDetail(t.row)}}},[e._v("查看详情\n        ")]),e._v(" "),r("el-button",{attrs:{type:"warning",disabled:0!=t.row.isShow,size:"small"},nativeOn:{click:function(r){e.modification(t.row)}}},[e._v("修改\n        ")]),e._v(" "),r("el-button",{attrs:{type:"danger",disabled:0!=t.row.isShow,size:"small"},nativeOn:{click:function(r){e.remove(t.row)}}},[e._v("\n          删除\n        ")])]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"上架",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-switch",{attrs:{"inactive-value":0,"active-value":1},nativeOn:{click:function(r){e.switchChange(t.row)}},model:{value:t.row.isShow,callback:function(r){e.$set(t.row,"isShow",r)},expression:"scope.row.isShow"}})]}}])})],1),e._v(" "),r("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.pageSize,"current-page":e.pageNum},on:{handleChange:e.getPaginationChange}}),e._v(" "),r("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,inline:!0,"label-width":"130px"}},[r("el-form-item",{attrs:{label:"名称:",prop:"appName"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入名称"},model:{value:e.ruleForm.appName,callback:function(t){e.$set(e.ruleForm,"appName",t)},expression:"ruleForm.appName"}})],1),e._v(" "),e.ruleForm.appName?e._e():r("el-form-item",{attrs:{label:"商户手机号:",prop:"phone"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入商户手机号"},model:{value:e.ruleForm.phone,callback:function(t){e.$set(e.ruleForm,"phone",t)},expression:"ruleForm.phone"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"应用图标:",prop:"appIcon"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入应用图标"},model:{value:e.ruleForm.appIcon,callback:function(t){e.$set(e.ruleForm,"appIcon",t)},expression:"ruleForm.appIcon"}},[r("el-upload",{attrs:{slot:"append",action:e.server_path+"wallet/util/open/uploadFile.do",multiple:"",name:"files",data:{type:"img"},"show-file-list":!1,"on-success":e.upload},slot:"append"},[r("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1)],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"商户类型：",prop:"transferTypeId"}},[r("el-select",{attrs:{size:"small",placeholder:"请选择商户类型"},model:{value:e.ruleForm.transferTypeId,callback:function(t){e.$set(e.ruleForm,"transferTypeId",t)},expression:"ruleForm.transferTypeId"}},e._l(e.transferTypeInfoList,function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),r("el-form-item",{attrs:{label:"APPID:",prop:"appid"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入APPID"},model:{value:e.ruleForm.appid,callback:function(t){e.$set(e.ruleForm,"appid",t)},expression:"ruleForm.appid"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"支付通知Url:"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入支付通知Url"},model:{value:e.ruleForm.notifyUrl,callback:function(t){e.$set(e.ruleForm,"notifyUrl",t)},expression:"ruleForm.notifyUrl"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"回调地址:"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入回调地址"},model:{value:e.ruleForm.hookInjectUrl,callback:function(t){e.$set(e.ruleForm,"hookInjectUrl",t)},expression:"ruleForm.hookInjectUrl"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"版本号:",prop:"appVersion"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入版本号"},model:{value:e.ruleForm.appVersion,callback:function(t){e.$set(e.ruleForm,"appVersion",t)},expression:"ruleForm.appVersion"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"iOS Scheme协议:"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入iOS Scheme协议"},model:{value:e.ruleForm.iosPackageName,callback:function(t){e.$set(e.ruleForm,"iosPackageName",t)},expression:"ruleForm.iosPackageName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"android 包名:"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入android 包名"},model:{value:e.ruleForm.adrPackageName,callback:function(t){e.$set(e.ruleForm,"adrPackageName",t)},expression:"ruleForm.adrPackageName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"android下载地址:"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入android下载地址"},model:{value:e.ruleForm.downloadUrl,callback:function(t){e.$set(e.ruleForm,"downloadUrl",t)},expression:"ruleForm.downloadUrl"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"ios下载地址:"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入ios下载地址"},model:{value:e.ruleForm.iosDownldUrl,callback:function(t){e.$set(e.ruleForm,"iosDownldUrl",t)},expression:"ruleForm.iosDownldUrl"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"跳转地址:"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入跳转地址"},model:{value:e.ruleForm.jumpUrl,callback:function(t){e.$set(e.ruleForm,"jumpUrl",t)},expression:"ruleForm.jumpUrl"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"应用介绍:",prop:"destext"}},[r("el-input",{attrs:{type:"textarea",rows:2,size:"small",placeholder:"请输入应用介绍"},model:{value:e.ruleForm.destext,callback:function(t){e.$set(e.ruleForm,"destext",t)},expression:"ruleForm.destext"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"是否自营",prop:"ownType"}},[r("el-radio-group",{model:{value:e.ruleForm.ownType,callback:function(t){e.$set(e.ruleForm,"ownType",t)},expression:"ruleForm.ownType"}},[r("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),r("el-radio",{attrs:{label:0}},[e._v("否")])],1)],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.determine}},[e._v("确 定")])],1)],1),e._v(" "),r("el-dialog",{attrs:{title:"应用 "+e.ruleForm.appName+" 的详情",visible:e.dialogFormVisibleView},on:{"update:visible":function(t){e.dialogFormVisibleView=t}}},[r("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,"label-width":"130px"}},[r("el-form-item",{attrs:{label:"名称:"}},[e._v(e._s(e.ruleForm.appName))]),e._v(" "),r("el-form-item",{attrs:{label:"应用图标:"}},[e.ruleForm.appIcon.indexOf("http")?e._e():r("img",{staticStyle:{"max-width":"100%","max-height":"100px"},attrs:{src:e.ruleForm.appIcon,alt:"图标存储地址"}}),e._v(" "),e.ruleForm.appIcon.indexOf("http")?r("span",[e._v(e._s(e.ruleForm.appIcon))]):e._e()]),e._v(" "),r("el-form-item",{attrs:{label:"商户类型:"}},[e._v(e._s(e.ruleForm.transferTypeName))]),e._v(" "),r("el-form-item",{attrs:{label:"APPID:"}},[e._v(e._s(e.ruleForm.appId))]),e._v(" "),r("el-form-item",{attrs:{label:"支付通知Url:"}},[e._v(e._s(e.ruleForm.notifyUrl))]),e._v(" "),r("el-form-item",{attrs:{label:"回调地址:"}},[e._v(e._s(e.ruleForm.hookInjectUrl))]),e._v(" "),r("el-form-item",{attrs:{label:"版本号:"}},[e._v(e._s(e.ruleForm.appVersion))]),e._v(" "),r("el-form-item",{attrs:{label:"iOS Scheme协议:"}},[e._v(e._s(e.ruleForm.iosPackageName))]),e._v(" "),r("el-form-item",{attrs:{label:"android 包名:"}},[e._v(e._s(e.ruleForm.adrPackageName))]),e._v(" "),r("el-form-item",{attrs:{label:"android下载地址:"}},[e._v(e._s(e.ruleForm.downloadUrl))]),e._v(" "),r("el-form-item",{attrs:{label:"ios下载地址:"}},[e._v(e._s(e.ruleForm.iosDownldUrl))]),e._v(" "),r("el-form-item",{attrs:{label:"跳转地址:"}},[e._v(e._s(e.ruleForm.jumpUrl))]),e._v(" "),r("el-form-item",{attrs:{label:"是否自营:"}},[e._v(e._s(e.ruleForm.ownType?"是":"否"))]),e._v(" "),r("el-form-item",{attrs:{label:"应用介绍:"}},[e._v(e._s(e.ruleForm.destext))])],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogFormVisibleView=!1}}},[e._v("取 消")])],1)],1)],1)},staticRenderFns:[]};var u=r("VU/8")(p,m,!1,function(e){r("Gx/7"),r("kyhp")},null,null);t.default=u.exports},kyhp:function(e,t){}});
//# sourceMappingURL=8.bc0875168253afeae979.js.map