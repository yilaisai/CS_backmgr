webpackJsonp([23],{LBav:function(e,n){},bMLt:function(e,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=r("3cXf"),a=r.n(t),l={name:"banner",data:function(){return{filterForm:{bannerType:"None",pageNum:1,pageSize:20},listData:{total:null,list:[]},bannerTypeList:[],isShowAddDialog:!1,ruleForm:{bannerUrl:"",bannerUrlEn:"",bannerTypeEnName:"",bannerName:"",bannerVersion1:"",bannerVersion2:"",bannerVersion:"",bannerPlat:"",jumpUrl:"",weight:"",bannerType:"",remark:""},platList:["all","adr","ios"],dialogTitle:"",rules:{bannerUrl:[{required:!0,message:"请输入banner图片地址",trigger:"blur"}],bannerUrlEn:[{required:!0,message:"请输入banner英文版图片地址",trigger:"blur"}],bannerName:[{required:!0,message:"请选择banner名称",trigger:"change"}],bannerTypeEnName:[{required:!0,message:"请选择banner类型",trigger:"change"}],jumpUrl:[{required:!1,message:"请输入跳转链接",trigger:"blur"}]},server_path:"",bannerTypeCode:"",options:{inline:!1,button:!1,navbar:!1,title:!1,toolbar:!1,tooltip:!1,movable:!0,zoomable:!0,rotatable:!0,scalable:!1,transition:!0,fullscreen:!0,keyboard:!0,url:"data-source"},token:localStorage.getItem("wallet_token")}},methods:{resetForm:function(){this.ruleForm={bannerUrl:"",bannerUrlEn:"",bannerTypeEnName:"",bannerName:"",bannerVersion1:"",bannerVersion2:"",bannerVersion:"",bannerPlat:"",jumpUrl:"",weight:"",bannerType:"",remark:""},this.bannerTypeCode="",this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},submitForm:function(e){this.filterForm.pageNum=e,this.getAppBannerInfos()},getPaginationChange:function(e,n){this.filterForm.pageSize=e,this.submitForm(n)},getAppBannerInfos:function(){var e=this;this.$http.post("wallet/backmgr/banner/getAppBannerInfos",this.filterForm).then(function(n){e.listData.list=n.result.list.list,e.listData.total=n.result.list.total})},getBannerType:function(){var e=this;this.$http.post("wallet/backmgr/banner/getBannerType",{version:"1.0.0",plat:"web"}).then(function(n){var r=n.result.list;r.forEach(function(e){e.label=e.name,e.value=e.bannerType}),e.bannerTypeList=r})},remove:function(e){var n=this,r=e.id,t=e.bannerName;this.$confirm("确定删除 "+t+" 吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){n.$http.post("wallet/backmgr/banner/updateAppBannerInfoSysStatus",{sysStatus:"INVALID0",id:r}).then(function(e){n.$notify({title:"成功",message:"删除 "+t+"成功",type:"success"}),n.getAppBannerInfos()})})},switchChange:function(e){var n=this,r=e.isOnshelf,t=e.id,a=e.bannerName;this.$http.post("wallet/backmgr/banner/updateAppBannerInfoOnshelf",{isOnshelf:r?"YES":"NO",id:t}).then(function(e){n.$notify({title:"成功",message:a+" "+(r?"上架":"下架")+" 成功",type:"success"}),n.getAppBannerInfos()})},getbannerTypeEnName:function(e){var n=this;this.bannerTypeList.forEach(function(r){r.value==n[e].bannerTypeEnName&&(n.bannerTypeCode=r.code)})},getbannerPlat:function(e){},upload:function(e,n,r){this.ruleForm.bannerUrl=e.result.urls[0]},uploadEnPic:function(e,n,r){this.ruleForm.bannerUrlEn=e.result.urls[0]},addBanner:function(){this.resetForm(),this.dialogTitle="创建banner",this.isShowAddDialog=!0},modification:function(e){this.resetForm(),this.bannerTypeCode=e.bannerType,this.isShowAddDialog=!0,e.bannerPlat=e.plat,this.ruleForm=JSON.parse(a()(e)),this.ruleForm.bannerVersion1=e.version.split(",")[0],this.ruleForm.bannerVersion2=e.version.split(",")[1],this.dialogTitle="修改 "+this.ruleForm.bannerName+" 的banner"},determine:function(){var e=this;this.$refs.ruleForm.validate(function(n){if(!n)return!1;if(e.ruleForm.bannerVersion=e.ruleForm.bannerVersion1+","+e.ruleForm.bannerVersion2,e.ruleForm.id){var r=e.ruleForm,t=r.bannerTypeEnName,a=r.id,l=r.bannerName,o=r.bannerVersion,s=r.bannerPlat,i=r.jumpUrl,u=r.bannerUrl,m=r.bannerUrlEn,p=r.weight,b=r.remark;e.$http.post("wallet/backmgr/banner/updateAppBannerInfo",{bannerTypeEnName:t,bannerType:e.bannerTypeCode,id:a,bannerName:l,bannerVersion:o,bannerPlat:s,jumpUrl:i||"empty",bannerUrl:u,bannerUrlEn:m,weight:p,remark:b||"empty"}).then(function(n){e.resetForm(),e.isShowAddDialog=!1,e.$notify({title:"成功",message:"修改 "+l+" banner成功",type:"success"}),e.getAppBannerInfos()})}else e.ruleForm.bannerType=e.bannerTypeCode,e.$http.post("wallet/backmgr/banner/createAppBannerInfo",e.ruleForm).then(function(n){e.$notify({title:"成功",message:"创建 "+e.ruleForm.bannerName+" banner成功",type:"success"}),e.isShowAddDialog=!1,e.submitForm(1)})})}},activated:function(){this.server_path=SERVER_PATH,this.getAppBannerInfos(),this.getBannerType()}},o={render:function(){var e=this,n=e.$createElement,r=e._self._c||n;return r("div",{staticClass:"banner"},[r("el-col",{staticStyle:{"text-align":"right"},attrs:{span:22}},[r("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.addBanner}},[e._v("创建banner")])],1),e._v(" "),r("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"100px",model:e.filterForm}},[r("sac-select",{attrs:{label:"banner类型","data-list":e.bannerTypeList},model:{value:e.filterForm.bannerType,callback:function(n){e.$set(e.filterForm,"bannerType",n)},expression:"filterForm.bannerType"}}),e._v(" "),r("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(n){return e.submitForm(1)}}})],1),e._v(" "),r("sac-table",{attrs:{data:e.listData.list}},[r("el-table-column",{attrs:{prop:"weight",label:"权重",width:"80"}}),e._v(" "),r("el-table-column",{attrs:{label:"图片"},scopedSlots:e._u([{key:"default",fn:function(n){return[r("viewer",{ref:"viewer",staticClass:"viewer",attrs:{options:e.options}},[n.row.bannerUrl.indexOf("http")?e._e():r("img",{staticStyle:{"max-width":"100%","max-height":"150px"},attrs:{src:n.row.bannerUrl,alt:"图片存储地址不存在"}})]),e._v(" "),n.row.bannerUrl.indexOf("http")?r("span",[e._v(e._s(n.row.bannerUrl))]):e._e()]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"英文版图片"},scopedSlots:e._u([{key:"default",fn:function(n){return[r("viewer",{ref:"viewer",staticClass:"viewer",attrs:{options:e.options}},[n.row.bannerUrlEn.indexOf("http")?e._e():r("img",{staticStyle:{"max-width":"100%","max-height":"150px"},attrs:{src:n.row.bannerUrlEn,alt:"图片存储地址不存在"}})]),e._v(" "),n.row.bannerUrlEn.indexOf("http")?r("span",[e._v(e._s(n.row.bannerUrlEn))]):e._e()]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"bannerTypeName",label:"banner类型"}}),e._v(" "),r("el-table-column",{attrs:{prop:"bannerName",label:"banner名称"}}),e._v(" "),r("el-table-column",{attrs:{prop:"version",label:"适用版本范围"}}),e._v(" "),r("el-table-column",{attrs:{prop:"plat",label:"适用平台"}}),e._v(" "),r("el-table-column",{attrs:{prop:"jumpUrl",label:"跳转链接"},scopedSlots:e._u([{key:"default",fn:function(n){return[r("a",{attrs:{target:"_brank",href:n.row.jumpUrl}},[e._v(e._s(n.row.jumpUrl))])]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"remark",label:"备注"}}),e._v(" "),r("el-table-column",{attrs:{prop:"createTime",label:"创建时间",width:"170"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作",width:"160"},scopedSlots:e._u([{key:"default",fn:function(n){return[r("el-button",{attrs:{type:"primary",disabled:0!=n.row.isOnshelf,size:"small"},nativeOn:{click:function(r){return e.modification(n.row)}}},[e._v("修改\n        ")]),e._v(" "),r("el-button",{attrs:{type:"danger",disabled:0!=n.row.isOnshelf,size:"small"},nativeOn:{click:function(r){return e.remove(n.row)}}},[e._v("删除\n        ")])]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"上架",width:"100"},scopedSlots:e._u([{key:"default",fn:function(n){return[r("el-switch",{attrs:{"inactive-value":0,"active-value":1},nativeOn:{click:function(r){return e.switchChange(n.row)}},model:{value:n.row.isOnshelf,callback:function(r){e.$set(n.row,"isOnshelf",r)},expression:"scope.row.isOnshelf"}})]}}])})],1),e._v(" "),r("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.filterForm.pageSize,"current-page":e.filterForm.pageNum},on:{handleChange:e.getPaginationChange}}),e._v(" "),r("el-dialog",{attrs:{title:e.dialogTitle,visible:e.isShowAddDialog},on:{"update:visible":function(n){e.isShowAddDialog=n}}},[r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"140px"}},[r("el-form-item",{attrs:{label:"banner图片:",prop:"bannerUrl"}},[r("el-col",[r("el-input",{attrs:{size:"small",placeholder:"请选择上传"},model:{value:e.ruleForm.bannerUrl,callback:function(n){e.$set(e.ruleForm,"bannerUrl",n)},expression:"ruleForm.bannerUrl"}},[r("el-upload",{attrs:{slot:"append",action:e.server_path+"wallet/backmgr/uploadFile",multiple:"",name:"files",data:{type:"img",token:e.token},"show-file-list":!1,"on-success":e.upload},slot:"append"},[r("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1)],1)],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"banner英文版图片:",prop:"bannerUrlEn"}},[r("el-col",[r("el-input",{attrs:{size:"small",placeholder:"请选择上传"},model:{value:e.ruleForm.bannerUrlEn,callback:function(n){e.$set(e.ruleForm,"bannerUrlEn",n)},expression:"ruleForm.bannerUrlEn"}},[r("el-upload",{attrs:{slot:"append",action:e.server_path+"wallet/backmgr/uploadFile",multiple:"",name:"files",data:{type:"img",token:e.token},"show-file-list":!1,"on-success":e.uploadEnPic},slot:"append"},[r("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1)],1)],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"banner类型",prop:"bannerTypeEnName"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{size:"small",placeholder:"请选择banner类型"},on:{change:function(n){return e.getbannerTypeEnName("ruleForm")}},model:{value:e.ruleForm.bannerTypeEnName,callback:function(n){e.$set(e.ruleForm,"bannerTypeEnName",n)},expression:"ruleForm.bannerTypeEnName"}},e._l(e.bannerTypeList,function(e,n){return r("el-option",{key:n,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),r("el-form-item",{attrs:{label:" banner名称:",prop:"bannerName"}},[r("el-col",[r("el-input",{attrs:{size:"small",placeholder:"请输入banner名称"},model:{value:e.ruleForm.bannerName,callback:function(n){e.$set(e.ruleForm,"bannerName",n)},expression:"ruleForm.bannerName"}})],1)],1),e._v(" "),r("el-form-item",{staticClass:"banner-version",attrs:{label:"适用版本范围:"}},[r("el-col",[r("el-input",{attrs:{size:"small",placeholder:"请输入适用版本范围"},model:{value:e.ruleForm.bannerVersion1,callback:function(n){e.$set(e.ruleForm,"bannerVersion1",n)},expression:"ruleForm.bannerVersion1"}}),e._v(" -\n          "),r("el-input",{attrs:{size:"small",placeholder:"请输入适用版本范围"},model:{value:e.ruleForm.bannerVersion2,callback:function(n){e.$set(e.ruleForm,"bannerVersion2",n)},expression:"ruleForm.bannerVersion2"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"适用平台:"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{size:"small",placeholder:"请选择适用平台"},on:{change:function(n){return e.getbannerPlat("ruleForm")}},model:{value:e.ruleForm.bannerPlat,callback:function(n){e.$set(e.ruleForm,"bannerPlat",n)},expression:"ruleForm.bannerPlat"}},e._l(e.platList,function(e,n){return r("el-option",{key:n,attrs:{value:e}})}),1)],1),e._v(" "),r("el-form-item",{attrs:{label:"跳转链接:",prop:"jumpUrl"}},[r("el-col",[r("el-input",{attrs:{size:"small",placeholder:"请输入跳转链接"},model:{value:e.ruleForm.jumpUrl,callback:function(n){e.$set(e.ruleForm,"jumpUrl",n)},expression:"ruleForm.jumpUrl"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"权重:"}},[r("el-col",[r("el-input-number",{attrs:{size:"small",min:1,label:"请输入权重"},model:{value:e.ruleForm.weight,callback:function(n){e.$set(e.ruleForm,"weight",n)},expression:"ruleForm.weight"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"备注:"}},[r("el-col",[r("el-input",{attrs:{size:"small",placeholder:"请输入备注"},model:{value:e.ruleForm.remark,callback:function(n){e.$set(e.ruleForm,"remark",n)},expression:"ruleForm.remark"}})],1)],1),e._v(" "),r("el-form-item",[r("el-button",{staticStyle:{width:"100px"},attrs:{type:"primary",size:"small"},nativeOn:{click:function(n){return e.determine(n)}}},[e._v("确定")])],1)],1)],1)],1)},staticRenderFns:[]};var s=r("C7Lr")(l,o,!1,function(e){r("zALz"),r("LBav")},null,null);n.default=s.exports},zALz:function(e,n){}});