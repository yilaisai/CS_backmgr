webpackJsonp([15],{"8R5A":function(t,e){},nU8l:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("s0MJ"),l={name:"home",data:function(){return{user:[],account:[]}},methods:{getData:function(){var t=this;this.$http.post("wallet/backmgr/user/selectSysInfo.do").then(function(e){var a=e.result,l=a.list,n=a.total,o=a.ytdCount;t.account=l,t.user=[{date:Object(s.a)(new Date,"YYYY年MM月DD日"),total:n,ytdCount:o}]})}},mounted:function(){this.getData()}},n={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"sac-home"},[e("div",{staticClass:"table-wrap"},[e("h2",{staticClass:"t-title"},[this._v("用户信息")]),this._v(" "),e("el-table",{attrs:{data:this.user,border:""}},[e("el-table-column",{attrs:{prop:"date",label:"日期"}}),this._v(" "),e("el-table-column",{attrs:{prop:"total",label:"用户总数"}}),this._v(" "),e("el-table-column",{attrs:{prop:"ytdCount",label:"昨日新增"}})],1)],1)])},staticRenderFns:[]};var o=a("VU/8")(l,n,!1,function(t){a("8R5A")},null,null);e.default=o.exports}});