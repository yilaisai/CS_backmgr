webpackJsonp([43],{"+YGt":function(t,a){},GyCF:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"query-details"},[e("el-header",[e("div",{staticClass:"nav"},[t._v("用户管理>用户查询>查看用户详情")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:function(a){return t.$router.go(-1)}}},[t._v("返回")])],1),t._v(" "),e("div",{staticClass:"content"},[e("label",[t._v("基本信息：")]),t._v(" "),e("el-row",{staticClass:"sac-row",attrs:{gutter:10}},[e("el-col",{attrs:{span:12}},[e("label",[t._v("用户账号:")]),t._v(" "),e("span",[t._v(t._s(t.detais.phone))])]),t._v(" "),e("el-col",{attrs:{span:12}},[e("label",[t._v("昵称：")]),t._v(" "),e("span",[t._v(t._s(t.detais.nickName))])]),t._v(" "),e("el-col",{attrs:{span:12}},[e("label",[t._v("真实姓名：")]),t._v(" "),e("span",[t._v(t._s(t.detais.realName))])]),t._v(" "),e("el-col",{attrs:{span:12}},[e("label",[t._v("身份证号：")]),t._v(" "),e("span",[t._v(t._s(t.detais.cardNo))])]),t._v(" "),e("el-col",{attrs:{span:12}},[e("label",[t._v("广告商类型:")]),t._v(" "),e("span",[t._v(t._s(1==t.detais.isMerchant?" 广告商用户 ":"普通用户"))])]),t._v(" "),e("el-col",{attrs:{span:12}},[e("label",[t._v("注册时间：")]),t._v(" "),e("span",[t._v(t._s(t.$fmtDate(t.detais.registTime,"full")))])]),t._v(" "),e("el-col",{attrs:{span:12}},[e("label",[t._v("状态:")]),t._v(" "),e("span",[t._v(t._s(0==t.detais.optStatus?"正常":1==t.detais.optStatus?"已锁定":"被冻结"))])]),t._v(" "),e("el-col",{attrs:{span:12}},[e("label",[t._v("锁定/冻结原因:")]),t._v(" "),0!=t.detais.optStatus?e("span",[t._v(t._s(t.detais.optReason))]):t._e()]),t._v(" "),e("el-col",{attrs:{span:12}},[e("label",[t._v("谷歌密钥:")]),t._v(" "),1==t.detais.googleVerifyStatus?e("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(a){return t.$router.go(-1)}}},[t._v("删除")]):e("span",[t._v("无")])],1),t._v(" "),e("el-col",{attrs:{span:12}},[e("label",[t._v("最后登录时间:")]),t._v(" "),e("span",[t._v(t._s(t.$fmtDate(t.detais.lastLoginTime,"full")))])])],1),t._v(" "),e("label",[t._v("资产概况：")]),t._v(" "),e("el-row",{staticClass:"sac-row",attrs:{gutter:10}},[e("el-col",{attrs:{span:12}},[e("label",[t._v("资产总折合(CNY):")]),t._v(" "),e("span",[t._v(t._s(Math.floor(100*t.totalToRMB)/100))])]),t._v(" "),e("el-col",{attrs:{span:12}},[e("label",[t._v("冻结资产折合（CNY）:")]),t._v(" "),e("span",[t._v(t._s(Math.floor(100*t.totalFrozenToRMB)/100))])]),t._v(" "),e("el-col",{attrs:{span:12}},[e("label",[t._v("累计充币：")]),t._v(" "),e("span",[t._v(t._s(t.totalRechargeToRMB))])]),t._v(" "),e("el-col",{attrs:{span:12}},[e("label",[t._v("累计提币（CNY）:")]),t._v(" "),e("span",[t._v(t._s(t.totalWithdrawToRMB))])])],1)],1)],1)},staticRenderFns:[]};var l=e("VU/8")({name:"query-details",data:function(){return{detais:{},totalFrozenToRMB:"",totalRechargeToRMB:"",totalToRMB:"",totalWithdrawToRMB:""}},methods:{getDetail:function(t){var a=this;this.$http.post("wallet/backmgr/user/queryUserInfo",{userId:t}).then(function(t){var e=t.result,s=e.customerInfo,l=e.totalFrozenToRMB,o=e.totalRechargeToRMB,r=e.totalToRMB,_=e.totalWithdrawToRMB;a.detais=s,a.totalFrozenToRMB=l,a.totalRechargeToRMB=o,a.totalToRMB=r,a.totalWithdrawToRMB=_})}},activated:function(){this.getDetail(this.$route.query.userId)}},s,!1,function(t){e("+YGt")},null,null);a.default=l.exports}});