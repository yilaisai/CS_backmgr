webpackJsonp([37],{QzCf:function(t,e){},"w/xU":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"merchantDetaile-page"},[a("div",{staticClass:"main"},[a("div",[t._m(0),t._v(" "),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.detaileData,size:"small"}},[a("el-form-item",{attrs:{label:"用户编号:"}},[a("el-input",{attrs:{disabled:""},model:{value:t.detaileData.name,callback:function(e){t.$set(t.detaileData,"name",e)},expression:"detaileData.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"手机号:"}},[a("el-input",{attrs:{disabled:""},model:{value:t.detaileData.phone,callback:function(e){t.$set(t.detaileData,"phone",e)},expression:"detaileData.phone"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"邮箱:"}},[a("el-input",{attrs:{disabled:""},model:{value:t.detaileData.email,callback:function(e){t.$set(t.detaileData,"email",e)},expression:"detaileData.email"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"状态:"}},[a("el-input",{attrs:{value:1==t.detaileData.status?"已审核":2==t.detaileData.status?"审核失败":"待审核",disabled:""}})],1),t._v(" "),t.detaileData.remark?a("el-form-item",{attrs:{label:"审核意见:"}},[a("el-input",{attrs:{disabled:""},model:{value:t.detaileData.remark,callback:function(e){t.$set(t.detaileData,"remark",e)},expression:"detaileData.remark"}})],1):t._e()],1)],1),t._v(" "),0==t.detaileData.status?a("div",[t._m(1),t._v(" "),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.desc}},[a("el-form-item",{attrs:{label:"审核意见:"}},[a("el-input",{attrs:{placeholder:"请输入审核意见"},model:{value:t.desc,callback:function(e){t.desc=e},expression:"desc"}})],1),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.merchantCheck(1)}}},[t._v("通过")]),t._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:function(e){return t.merchantCheck(2)}}},[t._v("不通过")])],1)],1):t._e()])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("h3",[this._v("用户信息")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("h3",[this._v("审核意见")])])}]};var l=a("C7Lr")({data:function(){return{detaileData:{},desc:""}},activated:function(){this.detaileData=this.$route.query.data},methods:{selectCoin:function(){this.getData()},getData:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/queryOtcUserDetail",this.filterForm).then(function(e){200==e.code&&(t.detaileData=e.result)})},merchantCheck:function(t){var e=this;this.$http.post("/wallet/backmgr/merchant/apply/check",{applyId:this.detaileData.id,desc:this.desc,status:t}).then(function(t){200==t.code&&(e.$notify.success({title:"提示",message:t.msg}),e.$router.go(-1))})}}},i,!1,function(t){a("QzCf")},"data-v-fca2cbb6",null);e.default=l.exports}});