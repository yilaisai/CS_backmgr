webpackJsonp([34],{"8c1O":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"invite-detail"},[a("el-row",{},[a("el-col",{attrs:{span:4}},[a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(e){return t.$router.go(-1)}}},[t._v("返回")])],1),t._v(" "),a("el-col",{attrs:{span:16}},[a("h3",{staticStyle:{"text-align":"center"}},[t._v(t._s(t.filterForm.phone)+"的邀请详情")])])],1),t._v(" "),a("div",{staticClass:"invite"},[t._v("\n    邀请Ta的人："+t._s(t.parent)+"（"+t._s(t.level)+"）\n  ")]),t._v(" "),a("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"100px"}},[a("sac-select",{ref:"noticeType",attrs:{label:"状态类型",dataList:t.noticeTypeList},model:{value:t.filterForm.status,callback:function(e){t.$set(t.filterForm,"status",e)},expression:"filterForm.status"}}),t._v(" "),a("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(e){return t.submitForm(1)}}})],1),t._v(" "),a("sac-table",{attrs:{data:t.detais.list}},[a("el-table-column",{attrs:{prop:"phone",label:"用户名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"currentLevel",label:"等级"}}),t._v(" "),a("el-table-column",{attrs:{prop:"pNBAmount",label:"PNB"}}),t._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"注册时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("dateFormat")(e.row.createTime,"YYYY-MM-DD HH:mm")))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"status",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return["0"==e.row.status?a("span",{staticStyle:{color:"#409EFF"}},[t._v("正常")]):t._e(),t._v(" "),"1"==e.row.status?a("span",{staticStyle:{color:"red"}},[t._v("锁定中")]):t._e()]}}])})],1),t._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.detais.list.length>0,expression:"detais.list.length>0"}],attrs:{total:+t.detais.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.curPage},on:{handleChange:t.getPaginationChange}})],1)},staticRenderFns:[]};var i=a("VU/8")({name:"invite-detail",data:function(){return{detais:{list:[],total:""},filterForm:{phone:"",status:"",curPage:1,pageSize:20},parent:"15017908530",level:"王者",noticeTypeList:[{value:"",label:"全部"},{value:"1",label:"锁定中"},{value:"0",label:"正常"}]}},methods:{getDetail:function(){var t=this;this.$http.post("supernode/backmgr/user/invite/list",this.filterForm).then(function(e){var a=e.result,l=a.details,i=a.level,r=a.parent;t.detais.list=l.list?l.list:[],t.detais.total=l.total,t.level=i,t.parent=r})},submitForm:function(t){this.filterForm.curPage=t,this.getDetail()},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.filterForm.curPage=e,this.submitForm(e)}},activated:function(){this.filterForm.phone=this.$route.query.phone,this.getDetail()}},l,!1,function(t){a("r5Ty")},null,null);e.default=i.exports},r5Ty:function(t,e){}});