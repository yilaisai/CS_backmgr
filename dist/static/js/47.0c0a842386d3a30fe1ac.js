webpackJsonp([47],{"3W05":function(t,e){},GyCF:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"query-details"},[s("el-row",{staticClass:"sac-row"},[s("el-col",{attrs:{span:4}},[s("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(e){t.$router.go(-1)}}},[t._v("返回")])],1),t._v(" "),s("el-col",{staticStyle:{"text-align":"right"},attrs:{span:18}},[s("el-button",{directives:[{name:"show",rawName:"v-show",value:2==this.optStatus,expression:"this.optStatus== 2"}],attrs:{size:"small",type:"success"},on:{click:function(e){t.optStatusChange(0,"解冻账号")}}},[t._v("解冻账号\n      ")]),t._v(" "),s("el-button",{directives:[{name:"show",rawName:"v-show",value:2!=this.optStatus,expression:"this.optStatus!= 2"}],attrs:{size:"small",type:"danger"},on:{click:function(e){t.optStatusChange(2,"冻结账号")}}},[t._v("冻结账号\n      ")]),t._v(" "),s("el-button",{directives:[{name:"show",rawName:"v-show",value:1==this.optStatus,expression:"this.optStatus== 1"}],attrs:{size:"small",type:"success",plain:""},on:{click:function(e){t.optStatusChange(0,"解锁账号")}}},[t._v("解锁账号\n      ")]),t._v(" "),s("el-button",{directives:[{name:"show",rawName:"v-show",value:0==this.optStatus,expression:"this.optStatus== 0"}],attrs:{size:"small",type:"warning"},on:{click:function(e){t.optStatusChange(1,"锁定账号")}}},[t._v("锁定账号\n      ")])],1)],1),t._v(" "),s("el-row",{staticClass:"sac-row",attrs:{gutter:10}},[s("el-col",{attrs:{span:8}},[s("label",[t._v("用户账号:")]),t._v(" "),s("span",[t._v(t._s(t.detais.phone))])]),t._v(" "),s("el-col",{attrs:{span:8}},[s("label",[t._v("姓名：")]),t._v(" "),s("span",[t._v(t._s(t.detais.realName))])]),t._v(" "),s("el-col",{attrs:{span:8}},[s("label",[t._v("昵称：")]),t._v(" "),s("span",[t._v(t._s(t.detais.nickName))])]),t._v(" "),s("el-col",{attrs:{span:8}},[s("label",[t._v("系统ID:")]),t._v(" "),s("span",[t._v(t._s(t.detais.userId))])]),t._v(" "),s("el-col",{attrs:{span:8}},[s("label",[t._v("身份证号：")]),t._v(" "),s("span",[t._v(t._s(t.detais.cardNo))])]),t._v(" "),s("el-col",{attrs:{span:8}},[s("label",[t._v("注册时间：")]),t._v(" "),s("span",[t._v(t._s(t.detais.registTime))])]),t._v(" "),s("el-col",{attrs:{span:8}},[s("label",[t._v("最后登录时间:")]),t._v(" "),s("span",[t._v(t._s(t.detais.lastLoginTime))])])],1),t._v(" "),s("label",[t._v("持币信息：")]),t._v(" "),s("sac-table",{attrs:{data:t.tableData}},[s("el-table-column",{attrs:{prop:"coinName",label:"持币名称",width:"120"}}),t._v(" "),s("el-table-column",{attrs:{prop:"amount",label:"持币量"}}),t._v(" "),s("el-table-column",{attrs:{label:"收款地址"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",{staticClass:"coin-addr"},[t._v(t._s(e.row.coinAddr))])]}}])})],1)],1)},staticRenderFns:[]};var n=s("VU/8")({name:"query-details",data:function(){return{detais:{},tableData:[],optStatus:""}},methods:{getDetail:function(t){var e=this;this.$http.post("wallet/backmgr/user/queryUserInfo.do",{phone:t}).then(function(t){var s=t.result,a=s.customerInfo,n=s.coins,l=s.optStatus;e.detais=a,e.tableData=n,e.optStatus=l})},optStatusChange:function(t,e){var s=this,a=this.$createElement;this.$msgbox({title:"提示",message:a("p",null,[a("span",null,"确定执行 "),a("span",{style:"color: red"},""+e),a("span",{style:"color: #0a52e0"},""+this.detais.phone),a("span",null," 吗?")]),showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",beforeClose:function(a,n,l){"confirm"===a?s.$http.post("wallet/backmgr/user/operatetUser.do",{userId:s.detais.userId,optStatus:t}).then(function(t){s.$notify({title:"成功",message:e+" "+s.detais.phone+" 成功",type:"success"}),s.getDetail(s.$route.query.phone),l()}):l()}})}},activated:function(){this.getDetail(this.$route.query.phone)}},a,!1,function(t){s("3W05")},null,null);e.default=n.exports}});