webpackJsonp([24],{XGXv:function(t,e){},nU8l:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("s0MJ"),n={name:"home",data:function(){return{user:[],account:[]}},methods:{getData:function(){var t=this;this.$http.post("wallet/backmgr/user/selectSysInfo").then(function(e){var a=e.result,n=a.list,r=a.total,s=a.tdCount,o=a.ytdCount;t.account=n,t.user=[{date:Object(l.a)(new Date,"YYYY年MM月DD日"),total:r,tdCount:s,ytdCount:o}]})}},mounted:function(){this.getData()}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"sac-home"},[a("div",{staticClass:"table-wrap"},[a("h2",{staticClass:"t-title"},[t._v("用户信息")]),t._v(" "),a("el-table",{attrs:{data:t.user,border:""}},[a("el-table-column",{attrs:{prop:"date",label:"日期",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"total",label:"用户总数",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tdCount",label:"今日新增",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"ytdCount",label:"昨日新增",align:"center"}})],1)],1),t._v(" "),a("div",{staticClass:"table-wrap"},[a("h2",{staticClass:"t-title"},[t._v("账户信息")]),t._v(" "),a("el-table",{attrs:{data:t.account,border:""}},[a("el-table-column",{attrs:{prop:"name",label:"币种",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"total",label:"钱包账户总额",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"increase",label:"昨日新增",align:"center"}})],1)],1)])},staticRenderFns:[]};var s=a("VU/8")(n,r,!1,function(t){a("XGXv")},null,null);e.default=s.exports}});