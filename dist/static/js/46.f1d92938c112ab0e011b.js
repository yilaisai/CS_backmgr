webpackJsonp([46],{J3Ru:function(t,e){},OL3q:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={name:"feedbackDetails",data:function(){return{details:{rtypeName:"",createTime:"",contactData:"",opStatus:"",content:"",remark:""},submitForm:{remark:"",fId:""},imgArray:[],options:{inline:!1,button:!1,navbar:!1,title:!1,toolbar:!0,tooltip:!1,movable:!0,zoomable:!0,rotatable:!0,scalable:!1,transition:!0,fullscreen:!0,keyboard:!0,url:"data-source"}}},methods:{onSubmit:function(){var t=this,e={remark:this.details.remark,fId:this.submitForm.fId};this.$http.post("/wallet/backmgr/feedback/operateFeedback",e).then(function(e){t.$message({message:e.msg,type:"success"}),t.$router.go(-1)})}},activated:function(){this.$route.params.id?(this.details=this.$route.params,this.submitForm.fId=this.$route.params.id,this.imgArray=this.$route.params.otherFile.split(",")):this.$router.go(-1)}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"feedbackDetails"},[a("el-row",{staticStyle:{"margin-bottom":"20px"}},[a("el-col",{attrs:{span:4}},[a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(e){return t.$router.go(-1)}}},[t._v("返回")])],1)],1),t._v(" "),a("div",{staticClass:"content"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:6}},[a("span",[t._v("问题类型：")]),a("span",[t._v(t._s(t.details.rtypeName))])]),t._v(" "),a("el-col",{attrs:{span:6}},[a("span",[t._v("创建日期：")]),a("span",[t._v(t._s(t.details.createTime))])]),t._v(" "),a("el-col",{attrs:{span:6}},[a("span",[t._v("联系方式：")]),a("span",[t._v(t._s(t.details.contactData))])]),t._v(" "),a("el-col",{attrs:{span:6}},[a("span",[t._v("状态：")]),a("span",{class:{info:!t.details.opStatus,success:t.details.opStatus}},[t._v(t._s(t.details.opStatus?"已处理":"未处理"))])])],1),t._v(" "),a("el-form",{ref:"form",staticClass:"submitForm",attrs:{inline:!0,model:t.submitForm}},[a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{model:{value:t.details.remark,callback:function(e){t.$set(t.details,"remark",e)},expression:"details.remark"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",disabled:1==t.details.opStatus},on:{click:t.onSubmit}},[t._v("处理")])],1)],1),t._v(" "),a("h3",[t._v("意见反馈：")]),t._v(" "),a("p",{staticClass:"details"},[t._v(t._s(t.details.content))]),t._v(" "),t.imgArray.length?a("div",[a("viewer",{ref:"viewer",staticClass:"viewer",attrs:{options:t.options}},t._l(t.imgArray,function(t){return a("img",{attrs:{src:t,alt:""}})}),0)],1):t._e()],1)],1)},staticRenderFns:[]};var i=a("VU/8")(s,r,!1,function(t){a("J3Ru")},null,null);e.default=i.exports}});