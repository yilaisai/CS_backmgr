webpackJsonp([17],{OL3q:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"feedbackDetails"},[s("el-row",{staticStyle:{"margin-bottom":"20px"}},[s("el-col",{attrs:{span:4}},[s("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(e){t.$router.go(-1)}}},[t._v("返回")])],1)],1),t._v(" "),s("div",{staticClass:"content"},[s("el-row",{attrs:{gutter:20}},[s("el-col",{attrs:{span:6}},[s("span",[t._v("问题类型：")]),s("span",[t._v(t._s(t.details.rtypeName))])]),t._v(" "),s("el-col",{attrs:{span:6}},[s("span",[t._v("创建日期：")]),s("span",[t._v(t._s(t.details.createTime))])]),t._v(" "),s("el-col",{attrs:{span:6}},[s("span",[t._v("联系方式：")]),s("span",[t._v(t._s(t.details.contactData))])]),t._v(" "),s("el-col",{attrs:{span:6}},[s("span",[t._v("状态：")]),s("span",{class:{info:!t.details.opStatus,success:t.details.opStatus}},[t._v(t._s(t.details.opStatus?"已处理":"未处理"))])])],1),t._v(" "),s("el-form",{ref:"form",staticClass:"submitForm",attrs:{inline:!0,model:t.submitForm}},[s("el-form-item",{attrs:{label:"备注"}},[s("el-input",{model:{value:t.submitForm.remark,callback:function(e){t.$set(t.submitForm,"remark",e)},expression:"submitForm.remark"}})],1),t._v(" "),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("处理")])],1)],1),t._v(" "),s("h3",[t._v("意见反馈：")]),t._v(" "),s("p",{staticClass:"details"},[t._v(t._s(t.details.content))]),t._v(" "),t.imgArray.length?s("div",t._l(t.imgArray,function(t){return s("img",{attrs:{src:t,alt:""}})})):t._e()],1)],1)},staticRenderFns:[]};var r=s("VU/8")({name:"feedbackDetails",data:function(){return{details:{rtypeName:"",createTime:"",contactData:"",opStatus:"",content:""},submitForm:{remark:"",fId:""},imgArray:[]}},methods:{onSubmit:function(){var t=this;this.$http.post("/wallet/backmgr/feedback/operateFeedback.do",this.submitForm).then(function(e){t.$message({message:e.msg,type:"success"}),t.$router.go(-1)})}},activated:function(){this.$route.params.id?(this.details=this.$route.params,this.submitForm.fId=this.$route.params.id,this.imgArray=this.$route.params.otherFile.split(",")):this.$router.go(-1)}},a,!1,function(t){s("zlHz")},null,null);e.default=r.exports},zlHz:function(t,e){}});
//# sourceMappingURL=17.ce92067868e8e8538f2b.js.map