webpackJsonp([83],{BsiV:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("mvHQ"),o=r.n(a),l=r("d7EF"),s=r.n(l),i=r("W3Iv"),n=r.n(i),m={name:"node-modify",data:function(){return{server_path:"",currentForm:{},ruleForm:{teamName:"",sacBoxAccount:"",logoUrl:"",email:"",nodeIntroduce:"",teamIntroduce:"",teamIntroduceUrl:"",officialAddr:"",marketingIntroduce:"",marketingIntroduceUrl:""},teamIntroduceUrl:"",isTeamImg:!1,isTeamDoc:!1,isMarketImg:!1,isMarketDoc:!1,loading:!1,uploadTeamLoading:!1,uploadIntroduceLoading:!1,marketingIntroduceUrl:"",rules:{teamName:[{required:!0,message:"请输入节点名称",trigger:"blur"}],sacBoxAccount:[{required:!0,message:"请输入Sacbox账号",trigger:"blur"}],nodeIntroduce:[{required:!0,message:"请输入节点简介",trigger:"blur"}]}}},methods:{resetForm:function(){this.ruleForm={teamName:"",sacBoxAccount:"",logoUrl:"",email:"",nodeIntroduce:"",teamIntroduce:"",teamIntroduceUrl:"",officialAddr:"",marketingIntroduce:"",marketingIntroduceUrl:""},this.isTeamImg=!1,this.isTeamDoc=!1,this.isMarketImg=!1,this.isMarketDoc=!1,this.teamIntroduceUrl="",this.marketingIntroduceUrl="",this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},upload:function(e,t,r){this.ruleForm.logoUrl=e.result.urls[0],this.loading=!1},logoUpload:function(){this.loading=!0},uploadTeamIntroduce:function(e,t,r){this.ruleForm.teamIntroduceUrl=e.result.urls[0],this.teamIntroduceUrl=t.name,t.name.indexOf(".jpg")>-1||t.name.indexOf(".jpeg")>-1||t.name.indexOf(".png")>-1?(this.isTeamImg=!0,this.isTeamDoc=!1):(this.isTeamImg=!1,this.isTeamDoc=!0),this.uploadTeamLoading=!1},teamUpload:function(e){this.beforeUpload(e),this.uploadTeamLoading=!0},uploadIntroduceUrl:function(e,t,r){this.ruleForm.marketingIntroduceUrl=e.result.urls[0],this.marketingIntroduceUrl=t.name,t.name.indexOf(".jpg")>-1||t.name.indexOf(".jpeg")>-1||t.name.indexOf(".png")>-1?(this.isMarketImg=!0,this.isMarketDoc=!1):(this.isMarketImg=!1,this.isMarketDoc=!0),this.uploadIntroduceLoading=!1},introduceUpload:function(e){this.beforeUpload(e),this.uploadIntroduceLoading=!0},beforeUpload:function(e){var t=["application/vnd.openxmlformats-officedocument.wordprocessingmlcument","application/pdf","application/msword","application/vnd.ms-powerpoint","image/jpeg","image/png"].includes(e.type),r=e.size/1024/1024<3;return t||this.$message.error("上传文件类型只能是 pdf/word/ppt/jpg/png  格式!"),r||this.$message.error("上传文件类型大小不能超过 3M!"),t&&r},determine:function(){var e=this;this.$refs.ruleForm.validate(function(t){t&&(e.ruleForm.teamId?(n()(e.ruleForm).forEach(function(t){var r=s()(t,2),a=r[0],o=r[1];o==e.currentForm[a]||o||(e.ruleForm[a]="empty")}),e.$http.post("supernode/backmgr/team/detail/update",e.ruleForm).then(function(t){e.$notify({title:"成功",message:"修改 "+e.ruleForm.teamName+" 节点成功",type:"success"}),e.resetForm(),e.$router.go(-1)})):e.$http.post("supernode/backmgr/team/detail/add",e.ruleForm).then(function(t){e.$notify({title:"成功",message:"创建 "+e.ruleForm.teamName+" 节点成功",type:"success"}),e.resetForm(),e.pageNum=1,e.$router.go(-1)}))})}},activated:function(){var e=this;this.server_path=SERVER_PATH,this.resetForm();var t=this.$route.params;t.teamId&&(this.currentForm=JSON.parse(o()(t)),n()(t).forEach(function(t){var r=s()(t,2),a=r[0],o=r[1];""==e.ruleForm[a]&&(e.ruleForm[a]=o||"")}),this.ruleForm.teamId=t.teamId,this.teamIntroduceUrl=t.teamIntroduceUrl?t.teamIntroduceUrl.split("supersac_doc/")[1]:"",this.marketingIntroduceUrl=t.marketingIntroduceUrl?t.marketingIntroduceUrl.split("supersac_doc/")[1]:"",this.teamIntroduceUrl&&(this.teamIntroduceUrl.indexOf(".jpg")>-1||this.teamIntroduceUrl.indexOf(".jpeg")>-1||this.teamIntroduceUrl.indexOf(".png")>-1?(this.isTeamImg=!0,this.isTeamDoc=!1):(this.isTeamImg=!1,this.isTeamDoc=!0)),this.marketingIntroduceUrl&&(this.marketingIntroduceUrl.indexOf(".jpg")>-1||this.marketingIntroduceUrl.indexOf(".jpeg")>-1||this.marketingIntroduceUrl.indexOf(".png")>-1?(this.isMarketImg=!0,this.isMarketDoc=!1):(this.isMarketImg=!1,this.isMarketDoc=!0)))}},u={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"node-modify"},[r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,inline:!0,rules:e.rules,"label-width":"150px"}},[r("el-form-item",{attrs:{label:"节点名称:",prop:"teamName"}},[r("span",{staticClass:"tips tips_input"},[e._v(e._s(e.ruleForm.teamName?e.ruleForm.teamName.length:0)+"/15")]),e._v(" "),r("el-input",{attrs:{size:"small",width:"100%",placeholder:"请输入节点名称"},model:{value:e.ruleForm.teamName,callback:function(t){e.$set(e.ruleForm,"teamName",t)},expression:"ruleForm.teamName"}})],1),e._v(" "),r("el-form-item",{staticStyle:{position:"relative"},attrs:{label:"节点简介:",prop:"nodeIntroduce"}},[r("span",{staticClass:"tips tips_textarea"},[e._v(e._s(e.ruleForm.nodeIntroduce?e.ruleForm.nodeIntroduce.length:0)+"/500")]),e._v(" "),r("el-input",{attrs:{size:"small",type:"textarea",rows:3,width:"100%",maxlength:"50",placeholder:"请输入节点简介"},model:{value:e.ruleForm.nodeIntroduce,callback:function(t){e.$set(e.ruleForm,"nodeIntroduce",t)},expression:"ruleForm.nodeIntroduce"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"Sacbox账号:",prop:"sacBoxAccount"}},[r("el-input",{attrs:{size:"small",width:"100%",placeholder:"请输入Sacbox账号"},model:{value:e.ruleForm.sacBoxAccount,callback:function(t){e.$set(e.ruleForm,"sacBoxAccount",t)},expression:"ruleForm.sacBoxAccount"}})],1),e._v(" "),r("el-form-item",{attrs:{size:"small",prop:"email",label:"邮箱:",rules:[{required:!0,message:"请输入邮箱地址",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:["blur","change"]}]}},[r("el-input",{model:{value:e.ruleForm.email,callback:function(t){e.$set(e.ruleForm,"email",t)},expression:"ruleForm.email"}})],1),e._v(" "),r("sac-input",{ref:"offcialurl",attrs:{label:"官网地址",prop:"offcialurl"},model:{value:e.ruleForm.officialAddr,callback:function(t){e.$set(e.ruleForm,"officialAddr",t)},expression:"ruleForm.officialAddr"}}),e._v(" "),r("el-form-item",{attrs:{label:"logo:"}},[r("el-upload",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"avatar-uploader",attrs:{name:"files",action:e.server_path+"wallet/backmgr/uploadFile","show-file-list":!1,"on-success":e.upload,"before-upload":e.logoUpload,data:{type:"supersac_img"}}},[r("img",{directives:[{name:"show",rawName:"v-show",value:e.ruleForm.logoUrl,expression:"ruleForm.logoUrl"}],staticClass:"avatar",attrs:{src:e.ruleForm.logoUrl}}),e._v(" "),r("i",{directives:[{name:"show",rawName:"v-show",value:!e.ruleForm.logoUrl,expression:"!ruleForm.logoUrl"}],staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),r("el-form-item",{attrs:{label:"团队介绍:"}},[r("el-input",{attrs:{size:"small",type:"textarea",rows:3,width:"100%",maxlength:"50",placeholder:"请输入团队介绍或上传团队介绍文档"},model:{value:e.ruleForm.teamIntroduce,callback:function(t){e.$set(e.ruleForm,"teamIntroduce",t)},expression:"ruleForm.teamIntroduce"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"上传团队介绍:"}},[r("span",{staticClass:"appIcon"},[e._v("只能上传 pdf/word/ppt/jpg/png文件，且不超过 3M")]),e._v(" "),r("a",{directives:[{name:"show",rawName:"v-show",value:e.isTeamDoc,expression:"isTeamDoc"}],staticClass:"el-upload-list__item-name",attrs:{target:"_blank",href:e.ruleForm.teamIntroduceUrl}},[r("i",{staticClass:"el-icon-document"}),e._v(e._s(e.teamIntroduceUrl)+"\n      ")]),e._v(" "),r("img",{directives:[{name:"show",rawName:"v-show",value:e.isTeamImg,expression:"isTeamImg"},{name:"viewer",rawName:"v-viewer"}],staticClass:"introduce",attrs:{src:e.ruleForm.teamIntroduceUrl}}),e._v(" "),r("el-upload",{directives:[{name:"loading",rawName:"v-loading",value:e.uploadTeamLoading,expression:"uploadTeamLoading"}],staticClass:"upload-demo",attrs:{name:"files",action:e.server_path+"wallet/backmgr/uploadFile","show-file-list":!1,"on-success":e.uploadTeamIntroduce,"before-upload":e.teamUpload,data:{type:"supersac_doc"}}},[r("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"运营及宣传方案:"}},[r("el-input",{attrs:{size:"small",type:"textarea",rows:3,width:"100%",maxlength:"50",placeholder:"请输入运营及宣传方案或上传运营及宣传方案文档"},model:{value:e.ruleForm.marketingIntroduce,callback:function(t){e.$set(e.ruleForm,"marketingIntroduce",t)},expression:"ruleForm.marketingIntroduce\t"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"上传运营及宣传方案:"}},[r("span",{staticClass:"appIcon"},[e._v("只能上传 pdf/word/ppt/jpg/png 文件，且不超过 3M")]),e._v(" "),r("a",{directives:[{name:"show",rawName:"v-show",value:e.isMarketDoc,expression:"isMarketDoc"}],staticClass:"el-upload-list__item-name",attrs:{target:"_blank",href:e.ruleForm.marketingIntroduceUrl}},[r("i",{staticClass:"el-icon-document"}),e._v(e._s(e.marketingIntroduceUrl)+"\n      ")]),e._v(" "),r("img",{directives:[{name:"show",rawName:"v-show",value:e.isMarketImg,expression:"isMarketImg"},{name:"viewer",rawName:"v-viewer"}],staticClass:"introduce",attrs:{src:e.ruleForm.marketingIntroduceUrl}}),e._v(" "),r("el-upload",{directives:[{name:"loading",rawName:"v-loading",value:e.uploadIntroduceLoading,expression:"uploadIntroduceLoading"}],staticClass:"upload-demo",attrs:{name:"files",action:e.server_path+"wallet/backmgr/uploadFile","show-file-list":!1,"before-upload":e.introduceUpload,"on-success":e.uploadIntroduceUrl,data:{type:"supersac_doc"}}},[r("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1)],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer"},[r("el-button",{attrs:{size:"small"},on:{click:function(t){return e.$router.go(-1)}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.determine}},[e._v("确 定")])],1)],1)},staticRenderFns:[]};var c=r("VU/8")(m,u,!1,function(e){r("Eymv")},null,null);t.default=c.exports},Eymv:function(e,t){}});