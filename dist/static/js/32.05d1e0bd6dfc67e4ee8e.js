webpackJsonp([32],{"4+Qx":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});i("3f40"),i("4qOc"),i("+cgv");var s=i("G0J2"),l=i("yPE/"),r=i.n(l),o={name:"sendEmail",components:{quillEditor:s.quillEditor},data:function(){return{postObj:{receiver:"",subject:"",content:""},rules:{subject:[{required:!0,message:"请输入邮件标题",trigger:"blur"}],content:[{required:!0,message:"请输入邮件内容",trigger:"blur"}]},disabled:!1,originUrl:"",uploadData:{},photoUrl:"",uploadType:"",serverPath:"",fullscreenLoading:!1}},methods:{resetForm:function(){this.postObj={receiver:"",subject:"",content:""},this.isTeamImg=!1,this.isTeamDoc=!1,this.isMarketImg=!1,this.isMarketDoc=!1,this.teamIntroduceUrl="",this.marketingIntroduceUrl="",this.$refs.postObj&&this.$refs.postObj.resetFields()},save:function(){var e=this;this.$refs.postObj.validate(function(t){if(!t)return!1;e.$http.post("supernode/backmgr/team/mail/send",e.postObj).then(function(t){200==t.code&&e.$notify({title:"成功",message:t.msg,type:"success"}),e.$router.go(-1)})})},beforeUpload:function(e){if(e.size>1048576)return this.$notify({title:"提示",message:"图片大小不得超过1M",type:"warning"}),!1},upScuccess:function(e,t,i){this.fullscreenLoading=!1;var s=this,l="";if("image"===this.uploadType?l=t.response.result.urls[0]:this.uploadType,null!=l&&l.length>0){var o=l;s.addRange=s.$refs.myQuillEditor.quill.getSelection(),s.$refs.myQuillEditor.quill.insertEmbed(null!==s.addRange?s.addRange.index:0,s.uploadType,o,r.a.sources.USER)}else this.$message.error(s.uploadType+"插入失败");this.$refs.upload.clearFiles()},imgHandler:function(e){(this.addRange=this.$refs.myQuillEditor.quill.getSelection(),e)&&document.getElementById("imgInput").click();this.uploadType="image"},videoHandler:function(e){(this.addRange=this.$refs.myQuillEditor.quill.getSelection(),e)&&document.getElementById("imgInput").click();this.uploadType="video"}},computed:{editor:function(){return this.$refs.myQuillEditor.quill}},mounted:function(){this.serverPath=window.SERVER_PATH,this.$refs.myQuillEditor.quill.getModule("toolbar").addHandler("image",this.imgHandler),this.$refs.myQuillEditor.quill.getModule("toolbar").addHandler("video",this.videoHandler)},activated:function(){this.resetForm(),this.postObj={url:"",title:"",content:"",pageType:1},this.disabled=!1,this.originUrl=""}},a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"sendEmail"},[i("el-row",{staticStyle:{"margin-bottom":"20px"}},[i("el-col",{attrs:{span:20}},[i("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(t){return e.$router.go(-1)}}},[e._v("返回")])],1),e._v(" "),e.disabled?e._e():i("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[i("el-button",{attrs:{size:"small",type:"primary"},nativeOn:{click:function(t){return e.save(t)}}},[e._v("发送")])],1)],1),e._v(" "),i("el-form",{ref:"postObj",attrs:{inline:!0,"label-width":"100px",rules:e.rules,model:e.postObj}},[i("el-form-item",{attrs:{label:"发件人："}},[i("span",[e._v(" "+e._s(e.$route.params&&e.$route.params.fromName)+" ")])]),e._v(" "),i("el-form-item",{attrs:{size:"small",prop:"receiver",label:"收件人：",rules:[{required:!0,message:"请输入收件人邮箱地址",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:["blur","change"]}]}},[i("el-input",{model:{value:e.postObj.receiver,callback:function(t){e.$set(e.postObj,"receiver",t)},expression:"postObj.receiver"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"邮件主题：",prop:"subject"}},[i("el-input",{attrs:{size:"small",placeholder:"请输入标题",disabled:e.disabled},model:{value:e.postObj.subject,callback:function(t){e.$set(e.postObj,"subject","string"==typeof t?t.trim():t)},expression:"postObj.subject"}})],1),e._v(" "),i("quill-editor",{ref:"myQuillEditor",attrs:{disabled:e.disabled},model:{value:e.postObj.content,callback:function(t){e.$set(e.postObj,"content","string"==typeof t?t.trim():t)},expression:"postObj.content"}}),e._v(" "),i("el-upload",{ref:"upload",staticClass:"upload",staticStyle:{display:"none"},attrs:{action:e.serverPath+"wallet/backmgr/uploadFile",name:"files",data:{type:"html"},"on-success":e.upScuccess,"before-upload":e.beforeUpload}},[i("el-button",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],attrs:{size:"small",type:"primary",id:"imgInput","element-loading-text":"插入中,请稍候"}},[e._v("点击上传\n      ")])],1),e._v(" "),i("el-form-item",{attrs:{label:"",prop:"content"}})],1)],1)},staticRenderFns:[]};var n=i("VU/8")(o,a,!1,function(e){i("GLyE")},null,null);t.default=n.exports},GLyE:function(e,t){}});