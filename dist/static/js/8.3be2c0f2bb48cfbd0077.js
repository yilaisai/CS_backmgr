webpackJsonp([8],{F4Ra:function(e,t){},dx7h:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("mvHQ"),a=r.n(n),l={name:"banner",data:function(){return{selectedDate:[],filterForm:{bannerType:"None",imgName:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},bannerTypeList:[{value:"",label:"全部"},{value:"SystemMsg",label:"上架"},{value:"SystemMsg",label:"下架"}],isShowAddDialog:!1,ruleForm:{bannerUrl:"",bannerTypeEnName:"",bannerName:"",jumpUrl:"",weight:"",bannerType:"",remark:""},dialogTitle:"",rules:{bannerUrl:[{required:!0,message:"请输入banner图片地址",trigger:"blur"}],bannerName:[{required:!0,message:"请选择banner名称",trigger:"change"}],bannerTypeEnName:[{required:!0,message:"请选择banner类型",trigger:"change"}],jumpUrl:[{required:!1,message:"请输入跳转链接",trigger:"blur"}]},server_path:"",bannerTypeCode:"",options:{inline:!1,button:!1,navbar:!1,title:!1,toolbar:!1,tooltip:!1,movable:!0,zoomable:!0,rotatable:!0,scalable:!1,transition:!0,fullscreen:!0,keyboard:!0,url:"data-source"}}},methods:{resetForm:function(){this.ruleForm={bannerUrl:"",bannerTypeEnName:"",bannerName:"",jumpUrl:"",weight:"",bannerType:"",remark:""},this.bannerTypeCode="",this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},submitForm:function(e){this.filterForm.pageNum=e,this.getAppBannerInfos()},getPaginationChange:function(e,t){this.filterForm.pageSize=e,this.submitForm(t)},getAppBannerInfos:function(){var e=this;this.$http.post("wallet/backmgr/banner/getAppBannerInfos.do",this.filterForm).then(function(t){e.listData.list=t.result.list.list,e.listData.total=t.result.list.total})},remove:function(e){var t=this,r=e.id,n=e.bannerName;this.$confirm("确定删除 "+n+" 吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.post("wallet/backmgr/banner/updateAppBannerInfoSysStatus.do",{sysStatus:"INVALID0",id:r}).then(function(e){t.$notify({title:"成功",message:"删除 "+n+"成功",type:"success"}),t.getAppBannerInfos()})})},switchChange:function(e){var t=this,r=e.isOnshelf,n=e.id,a=e.bannerName;this.$http.post("wallet/backmgr/banner/updateAppBannerInfoOnshelf.do",{isOnshelf:r?"YES":"NO",id:n}).then(function(e){t.$notify({title:"成功",message:a+" "+(r?"上架":"下架")+" 成功",type:"success"}),t.getAppBannerInfos()})},getbannerTypeEnName:function(e){var t=this;this.bannerTypeList.forEach(function(r){r.value==t[e].bannerTypeEnName&&(t.bannerTypeCode=r.code)})},upload:function(e,t,r){this.ruleForm.bannerUrl=e.result.urls[0]},addBanner:function(){this.resetForm(),this.dialogTitle="创建banner",this.isShowAddDialog=!0},modification:function(e){this.resetForm(),this.bannerTypeCode=e.bannerType,this.isShowAddDialog=!0,this.ruleForm=JSON.parse(a()(e)),this.dialogTitle="修改 "+this.ruleForm.bannerName+" 的banner"},determine:function(){var e=this;this.$refs.ruleForm.validate(function(t){if(!t)return!1;if(e.ruleForm.id){var r=e.ruleForm,n=r.bannerTypeEnName,a=r.id,l=r.bannerName,i=r.jumpUrl,s=r.bannerUrl,o=r.weight,m=r.remark;e.$http.post("wallet/backmgr/banner/updateAppBannerInfo.do",{bannerTypeEnName:n,bannerType:e.bannerTypeCode,id:a,bannerName:l,jumpUrl:i||"empty",bannerUrl:s,weight:o,remark:m||"empty"}).then(function(t){e.resetForm(),e.isShowAddDialog=!1,e.$notify({title:"成功",message:"修改 "+l+" banner成功",type:"success"}),e.getAppBannerInfos()})}else e.ruleForm.bannerType=e.bannerTypeCode,e.$http.post("wallet/backmgr/banner/createAppBannerInfo.do",e.ruleForm).then(function(t){e.$notify({title:"成功",message:"创建 "+e.ruleForm.bannerName+" banner成功",type:"success"}),e.isShowAddDialog=!1,e.submitForm(1)})})}},activated:function(){this.server_path=SERVER_PATH,this.getAppBannerInfos()}},i={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"banner"},[r("el-col",{staticStyle:{"text-align":"right"},attrs:{span:22}},[r("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.addBanner}},[e._v("创建banner")])],1),e._v(" "),r("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"100px",model:e.filterForm}},[r("sac-input",{ref:"phone",attrs:{label:"图片名称",prop:"phone"},model:{value:e.filterForm.imgName,callback:function(t){e.$set(e.filterForm,"imgName","string"==typeof t?t.trim():t)},expression:"filterForm.imgName"}}),e._v(" "),r("sac-date",{ref:"selectedDate",attrs:{label:"日　　期"},model:{value:e.selectedDate,callback:function(t){e.selectedDate=t},expression:"selectedDate"}}),e._v(" "),r("sac-select",{attrs:{label:"状态","data-list":e.bannerTypeList},model:{value:e.filterForm.bannerType,callback:function(t){e.$set(e.filterForm,"bannerType",t)},expression:"filterForm.bannerType"}}),e._v(" "),r("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(t){e.submitForm(1)}}})],1),e._v(" "),r("sac-table",{attrs:{data:e.listData.list}},[r("el-table-column",{attrs:{prop:"weight",label:"权重",width:"80"}}),e._v(" "),r("el-table-column",{attrs:{label:"图片"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("viewer",{ref:"viewer",staticClass:"viewer",attrs:{options:e.options}},[t.row.bannerUrl.indexOf("http")?e._e():r("img",{staticStyle:{"max-width":"100%","max-height":"150px"},attrs:{src:t.row.bannerUrl,alt:"图片存储地址不存在"}})]),e._v(" "),t.row.bannerUrl.indexOf("http")?r("span",[e._v(e._s(t.row.bannerUrl))]):e._e()]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"bannerTypeName",label:"banner类型"}}),e._v(" "),r("el-table-column",{attrs:{prop:"bannerName",label:"banner名称"}}),e._v(" "),r("el-table-column",{attrs:{prop:"jumpUrl",label:"跳转链接"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("a",{attrs:{target:"_brank",href:t.row.jumpUrl}},[e._v(e._s(t.row.jumpUrl))])]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"remark",label:"备注"}}),e._v(" "),r("el-table-column",{attrs:{prop:"createTime",label:"创建时间",width:"170"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"primary",disabled:0!=t.row.isOnshelf,size:"small"},nativeOn:{click:function(r){e.modification(t.row)}}},[e._v("修改\n        ")]),e._v(" "),r("el-button",{attrs:{type:"danger",disabled:0!=t.row.isOnshelf,size:"small"},nativeOn:{click:function(r){e.remove(t.row)}}},[e._v("删除\n        ")])]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"上架",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-switch",{attrs:{"inactive-value":0,"active-value":1},nativeOn:{click:function(r){e.switchChange(t.row)}},model:{value:t.row.isOnshelf,callback:function(r){e.$set(t.row,"isOnshelf",r)},expression:"scope.row.isOnshelf"}})]}}])})],1),e._v(" "),r("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.filterForm.pageSize,"current-page":e.filterForm.pageNum},on:{handleChange:e.getPaginationChange}}),e._v(" "),r("el-dialog",{attrs:{title:e.dialogTitle,visible:e.isShowAddDialog},on:{"update:visible":function(t){e.isShowAddDialog=t}}},[r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"140px"}},[r("el-form-item",{attrs:{label:"banner图片:",prop:"bannerUrl"}},[r("el-col",[r("el-input",{attrs:{size:"small",placeholder:"请选择上传"},model:{value:e.ruleForm.bannerUrl,callback:function(t){e.$set(e.ruleForm,"bannerUrl",t)},expression:"ruleForm.bannerUrl"}},[r("el-upload",{attrs:{slot:"append",action:e.server_path+"wallet/util/open/uploadFile.do",multiple:"",name:"files",data:{type:"img"},"show-file-list":!1,"on-success":e.upload},slot:"append"},[r("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1)],1)],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"banner类型",prop:"bannerTypeEnName"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{size:"small",placeholder:"请选择banner类型"},on:{change:function(t){e.getbannerTypeEnName("ruleForm")}},model:{value:e.ruleForm.bannerTypeEnName,callback:function(t){e.$set(e.ruleForm,"bannerTypeEnName",t)},expression:"ruleForm.bannerTypeEnName"}},e._l(e.bannerTypeList,function(e,t){return r("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),r("el-form-item",{attrs:{label:" banner名称:",prop:"bannerName"}},[r("el-col",[r("el-input",{attrs:{size:"small",placeholder:"请输入banner名称"},model:{value:e.ruleForm.bannerName,callback:function(t){e.$set(e.ruleForm,"bannerName",t)},expression:"ruleForm.bannerName"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"跳转链接:",prop:"jumpUrl"}},[r("el-col",[r("el-input",{attrs:{size:"small",placeholder:"请输入跳转链接"},model:{value:e.ruleForm.jumpUrl,callback:function(t){e.$set(e.ruleForm,"jumpUrl",t)},expression:"ruleForm.jumpUrl"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"权重:"}},[r("el-col",[r("el-input-number",{attrs:{size:"small",min:1,label:"请输入权重"},model:{value:e.ruleForm.weight,callback:function(t){e.$set(e.ruleForm,"weight",t)},expression:"ruleForm.weight"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"备注:"}},[r("el-col",[r("el-input",{attrs:{size:"small",placeholder:"请输入备注"},model:{value:e.ruleForm.remark,callback:function(t){e.$set(e.ruleForm,"remark",t)},expression:"ruleForm.remark"}})],1)],1),e._v(" "),r("el-form-item",[r("el-button",{staticStyle:{width:"100px"},attrs:{type:"primary",size:"small"},nativeOn:{click:function(t){return e.determine(t)}}},[e._v("确定")])],1)],1)],1)],1)},staticRenderFns:[]};var s=r("VU/8")(l,i,!1,function(e){r("vRUw"),r("F4Ra")},null,null);t.default=s.exports},vRUw:function(e,t){}});