webpackJsonp([49],{"Aj/w":function(t,e){},QdOt:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"local-ip-filtering"},[a("el-tabs",{attrs:{type:"border-card"}},[a("el-tab-pane",{attrs:{label:t.destxt}},[a("el-input",{attrs:{type:"textarea",rows:10,placeholder:"请输入您允许访问收银台的地区，用“,”号分隔"},model:{value:t.areas,callback:function(e){t.areas=e},expression:"areas"}})],1),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.updateEnableAreas}},[t._v("保存修改")]),t._v(" "),a("p",{staticClass:"tips"},[t._v("输入您允许访问收银台的地区,多个地区之间用 “,” 号分隔")])],1)],1)},staticRenderFns:[]};var r=a("VU/8")({data:function(){return{areas:"",destxt:"地区访问设置"}},activated:function(){this.getEnableAreas()},methods:{getEnableAreas:function(){var t=this;this.$http.post("/wallet/backmgr/sys/getEnableAreas").then(function(e){t.destxt=e.result.destxt,t.areas=e.result.paramValue})},updateEnableAreas:function(){var t=this;this.$http.post("/wallet/backmgr/sys/updateEnableAreas",{areas:this.areas}).then(function(e){t.$notify({title:"成功",message:e.msg,type:"success"}),t.getEnableAreas()})}}},s,!1,function(t){a("Aj/w")},"data-v-683ad589",null);e.default=r.exports}});