webpackJsonp([2],{HhF9:function(e,t){},a3Yh:function(e,t,r){"use strict";t.__esModule=!0;var n,a=r("liLe"),l=(n=a)&&n.__esModule?n:{default:n};t.default=function(e,t,r){return t in e?(0,l.default)(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}},dx7h:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("3cXf"),a=r.n(n),l=r("IHPB"),i=r.n(l),s=r("a3Yh"),o=r.n(s),u={name:"banner",data:function(){var e;return{selectedDate:[],filterForm:{bannerType:"",bannerName:"",beginTime:"",endTime:"",isOnShelf:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},bannerOnShelfList:[{value:"",label:"全部"},{value:"1",label:"上架"},{value:"0",label:"下架"}],typeList:{value:"code",label:"typeName"},bannerTypeList:[],isShowAddDialog:!1,loading:!1,ruleForm:(e={bannerUrl:"",bannerType:"",bannerName:"",jumpUrl:"",weight:""},o()(e,"bannerType",""),o()(e,"remark",""),e),dialogTitle:"",rules:{bannerUrl:[{required:!0,message:"请输入banner图片地址",trigger:"blur"}],bannerName:[{required:!0,message:"请选择banner名称",trigger:"change"}],bannerType:[{required:!0,message:"请选择banner类型",trigger:"change"}],jumpUrl:[{required:!1,message:"请输入跳转链接",trigger:"blur"}]},server_path:"",options:{inline:!1,button:!1,navbar:!1,title:!1,toolbar:!1,tooltip:!1,movable:!0,zoomable:!0,rotatable:!0,scalable:!1,transition:!0,fullscreen:!0,keyboard:!0,url:"data-source"}}},methods:{resetForm:function(){var e;this.ruleForm=(e={bannerUrl:"",bannerType:"",bannerName:"",jumpUrl:"",weight:""},o()(e,"bannerType",""),o()(e,"remark",""),e),this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},submitForm:function(e){this.filterForm.pageNum=e,this.getAppBannerInfos()},getPaginationChange:function(e,t){this.filterForm.pageSize=e,this.submitForm(t)},getBannerTypeList:function(){var e=this;this.$http.post("supernode/backmgr/banner/open/getBannerTypeList",this.filterForm).then(function(t){e.bannerTypeList=[{typeName:"全部",code:""}].concat(i()(t.result))})},getAppBannerInfos:function(){var e=this;this.$http.post("supernode/backmgr/banner/open/list",this.filterForm).then(function(t){e.listData.list=t.result.list,e.listData.total=t.result.total})},remove:function(e){var t=this,r=e.id,n=e.bannerName;this.$confirm("确定删除 "+n+" 吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.post("supernode/backmgr/banner/delete",{id:r}).then(function(e){t.$notify({title:"成功",message:"删除 "+n+"成功",type:"success"}),t.getAppBannerInfos()})})},switchChange:function(e){var t=this,r=e.isOnShelf,n=e.id,a=e.bannerName;this.$http.post("supernode/backmgr/banner/isOnShelf",{isOnShelf:r?"1":"0",id:n}).then(function(e){t.$notify({title:"成功",message:a+" "+(r?"上架":"下架")+" 成功",type:"success"}),t.getAppBannerInfos()})},upload:function(e,t,r){this.ruleForm.bannerUrl=e.result.urls[0],this.loading=!1},beforeUpload:function(){this.loading=!0},addBanner:function(){this.resetForm(),this.dialogTitle="创建banner",this.isShowAddDialog=!0},modification:function(e){this.resetForm(),this.isShowAddDialog=!0,this.ruleForm=JSON.parse(a()(e)),this.dialogTitle="修改 "+this.ruleForm.bannerName+" 的banner"},determine:function(){var e=this;this.$refs.ruleForm.validate(function(t){if(!t)return!1;if(e.ruleForm.id){var r=e.ruleForm,n=r.bannerType,a=r.id,l=r.bannerName,i=r.jumpUrl,s=r.bannerUrl,o=r.weight,u=r.remark;e.$http.post("supernode/backmgr/banner/update",{bannerType:n,id:a,bannerName:l,jumpUrl:i||"empty",bannerUrl:s,weight:o,remark:u||"empty"}).then(function(t){e.resetForm(),e.isShowAddDialog=!1,e.$notify({title:"成功",message:"修改 "+l+" banner成功",type:"success"}),e.getAppBannerInfos()})}else e.$http.post("supernode/backmgr/banner/create",e.ruleForm).then(function(t){e.$notify({title:"成功",message:"创建 "+e.ruleForm.bannerName+" banner成功",type:"success"}),e.isShowAddDialog=!1,e.submitForm(1)})})}},activated:function(){this.server_path=SERVER_PATH,this.getAppBannerInfos(),this.getBannerTypeList()}},m={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"banner"},[r("el-col",{staticStyle:{"text-align":"right"},attrs:{span:22}},[r("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.addBanner}},[e._v("创建banner")])],1),e._v(" "),r("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"100px",model:e.filterForm}},[r("sac-input",{ref:"phone",attrs:{label:"banner名称",prop:"phone"},model:{value:e.filterForm.bannerName,callback:function(t){e.$set(e.filterForm,"bannerName","string"==typeof t?t.trim():t)},expression:"filterForm.bannerName"}}),e._v(" "),r("sac-date",{ref:"selectedDate",attrs:{label:"日　　期",placeholder:"请选择日期"},model:{value:e.selectedDate,callback:function(t){e.selectedDate=t},expression:"selectedDate"}}),e._v(" "),r("sac-select",{attrs:{label:"类型",props:e.typeList,"data-list":e.bannerTypeList},model:{value:e.filterForm.bannerType,callback:function(t){e.$set(e.filterForm,"bannerType",t)},expression:"filterForm.bannerType"}}),e._v(" "),r("sac-select",{attrs:{label:"状态","data-list":e.bannerOnShelfList},model:{value:e.filterForm.isOnShelf,callback:function(t){e.$set(e.filterForm,"isOnShelf",t)},expression:"filterForm.isOnShelf"}}),e._v(" "),r("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(t){return e.submitForm(1)}}})],1),e._v(" "),r("sac-table",{attrs:{data:e.listData.list}},[r("el-table-column",{attrs:{prop:"weight",label:"权重",width:"80"}}),e._v(" "),r("el-table-column",{attrs:{prop:"bannerName",label:"banner名称"}}),e._v(" "),r("el-table-column",{attrs:{label:"banner图片"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("viewer",{ref:"viewer",staticClass:"viewer",attrs:{options:e.options}},[t.row.bannerUrl.indexOf("http")?e._e():r("img",{staticStyle:{"max-width":"100%","max-height":"150px"},attrs:{src:t.row.bannerUrl,alt:"图片存储地址不存在"}})]),e._v(" "),t.row.bannerUrl.indexOf("http")?r("span",[e._v(e._s(t.row.bannerUrl))]):e._e()]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"bannerTypeName",label:"banner类型"}}),e._v(" "),r("el-table-column",{attrs:{prop:"jumpUrl",label:"跳转链接"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("a",{attrs:{target:"_brank",href:t.row.jumpUrl}},[e._v(e._s(t.row.jumpUrl))])]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"remark",label:"备注"}}),e._v(" "),r("el-table-column",{attrs:{prop:"createTime",label:"创建时间",width:"170"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(e._f("dateFormat")(t.row.createTime,"YYYY-MM-DD HH:mm"))+"\n      ")]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"操作",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"primary",disabled:0!=t.row.isOnShelf,size:"small"},nativeOn:{click:function(r){return e.modification(t.row)}}},[e._v("修改\n        ")]),e._v(" "),r("el-button",{attrs:{type:"danger",disabled:0!=t.row.isOnShelf,size:"small"},nativeOn:{click:function(r){return e.remove(t.row)}}},[e._v("删除\n        ")])]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"上架",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-switch",{attrs:{"inactive-value":0,"active-value":1},nativeOn:{click:function(r){return e.switchChange(t.row)}},model:{value:t.row.isOnShelf,callback:function(r){e.$set(t.row,"isOnShelf",r)},expression:"scope.row.isOnShelf"}})]}}])})],1),e._v(" "),r("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.filterForm.pageSize,"current-page":e.filterForm.pageNum},on:{handleChange:e.getPaginationChange}}),e._v(" "),r("el-dialog",{attrs:{title:e.dialogTitle,visible:e.isShowAddDialog},on:{"update:visible":function(t){e.isShowAddDialog=t}}},[r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"140px"}},[r("el-form-item",{attrs:{label:"banner图片:",prop:"bannerUrl"}},[r("img",{directives:[{name:"show",rawName:"v-show",value:e.ruleForm.bannerUrl,expression:"ruleForm.bannerUrl"},{name:"viewer",rawName:"v-viewer"}],staticClass:"introduce",attrs:{src:e.ruleForm.bannerUrl}}),e._v(" "),r("el-upload",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{action:e.server_path+"wallet/util/open/uploadFile",multiple:"",name:"files","before-upload":e.beforeUpload,data:{type:"img"},"show-file-list":!1,"on-success":e.upload}},[r("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"banner类型",prop:"bannerType"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{size:"small",placeholder:"请选择banner类型"},model:{value:e.ruleForm.bannerType,callback:function(t){e.$set(e.ruleForm,"bannerType",t)},expression:"ruleForm.bannerType"}},e._l(e.bannerTypeList,function(t,n){return 0!=n?r("el-option",{key:n,attrs:{label:t.typeName,value:t.code}}):e._e()}),1)],1),e._v(" "),r("el-form-item",{attrs:{label:" banner名称:",prop:"bannerName"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入banner名称"},model:{value:e.ruleForm.bannerName,callback:function(t){e.$set(e.ruleForm,"bannerName",t)},expression:"ruleForm.bannerName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"跳转链接:",prop:"jumpUrl"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入跳转链接"},model:{value:e.ruleForm.jumpUrl,callback:function(t){e.$set(e.ruleForm,"jumpUrl",t)},expression:"ruleForm.jumpUrl"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"权重:"}},[r("el-input-number",{attrs:{size:"small",min:1,label:"请输入权重"},model:{value:e.ruleForm.weight,callback:function(t){e.$set(e.ruleForm,"weight",t)},expression:"ruleForm.weight"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"备注:"}},[r("el-input",{attrs:{size:"small",placeholder:"请输入备注"},model:{value:e.ruleForm.remark,callback:function(t){e.$set(e.ruleForm,"remark",t)},expression:"ruleForm.remark"}})],1),e._v(" "),r("el-form-item",[r("el-button",{staticStyle:{width:"100px"},attrs:{type:"primary",size:"small"},nativeOn:{click:function(t){return e.determine(t)}}},[e._v("确定")])],1)],1)],1)],1)},staticRenderFns:[]};var p=r("C7Lr")(u,m,!1,function(e){r("hvnU"),r("HhF9")},null,null);t.default=p.exports},hvnU:function(e,t){},lbsL:function(e,t,r){r("ngi5");var n=r("Rv9F").Object;e.exports=function(e,t,r){return n.defineProperty(e,t,r)}},liLe:function(e,t,r){e.exports={default:r("lbsL"),__esModule:!0}},ngi5:function(e,t,r){var n=r("8leu");n(n.S+n.F*!r("berT"),"Object",{defineProperty:r("Mr+r").f})}});