webpackJsonp([44],{DGiW:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"local-ip-filtering"},[a("el-tabs",{attrs:{type:"border-card"}},[a("el-tab-pane",{attrs:{label:e.destxt}},[a("el-input",{attrs:{type:"textarea",rows:10,placeholder:"请输入您允许访问收银台的地区，用“,”号分隔"},model:{value:e.areas,callback:function(t){e.areas=t},expression:"areas"}})],1),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.updateEnableAreas}},[e._v("保存修改")]),e._v(" "),a("p",{staticClass:"tips"},[e._v("输入您允许访问收银台的地区,多个地区之间用 “,” 号分隔")])],1)],1)},staticRenderFns:[]};var r=a("C7Lr")({data:function(){return{areas:"",destxt:"地区访问设置"}},activated:function(){this.getEnableAreas()},methods:{getEnableAreas:function(){var e=this;this.$http.post("/wallet/backmgr/sys/getEnableAreas").then(function(t){e.destxt=t.result.destxt,e.areas=t.result.paramValue})},updateEnableAreas:function(){var e=this;this.$http.post("/wallet/backmgr/sys/updateEnableAreas",{areas:this.areas}).then(function(t){e.$notify({title:"成功",message:t.msg,type:"success"}),e.getEnableAreas()})}}},s,!1,function(e){a("KXyw")},"data-v-a2eccf9e",null);t.default=r.exports},KXyw:function(e,t){}});