webpackJsonp([86],{TIPH:function(t,e){},j1O4:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r("Gu7T"),l=r.n(a),n={data:function(){return{routerList:[],dialogVisible:!0}},mounted:function(){var t=this;this.$router.options.routes.forEach(function(e,r){e.children&&e.children.length>0?t.routerList=[].concat(l()(t.routerList),l()(t.arrFilter(e.children,e.path))):t.routerList.push({title:e.meta.title||"",path:e.path})})},methods:{arrFilter:function(t,e){e="/"==e?"":e;var r=[];return t.forEach(function(t,a){r.push({title:t.meta.title||"",path:e+"/"+t.path})}),r}}},i={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"router-list"},[r("el-table",{staticStyle:{width:"100%"},attrs:{data:t.routerList,border:"",height:"100%"}},[r("el-table-column",{attrs:{label:"序号",width:"80",type:"index",align:"center"}}),t._v(" "),r("el-table-column",{attrs:{prop:"title",label:"名称"}}),t._v(" "),r("el-table-column",{attrs:{prop:"path",label:"路径"}}),t._v(" "),r("el-table-column",{attrs:{prop:"address",label:"描述"}}),t._v(" "),r("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{type:"text"},on:{click:function(r){return t.$router.push(e.row.path)}}},[t._v("跳转查看")])]}}])})],1)],1)},staticRenderFns:[]};var o=r("VU/8")(n,i,!1,function(t){r("TIPH")},"data-v-136fccc2",null);e.default=o.exports}});