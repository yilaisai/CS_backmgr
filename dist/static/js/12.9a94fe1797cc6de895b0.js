webpackJsonp([12],{"3AhC":function(t,e){},FBnG:function(t,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={render:function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"red-envelope-detail"},[l("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"120px",model:t.filterForm}},[l("div",{staticClass:"title"},[l("el-row",{staticStyle:{"margin-bottom":"20px"}},[l("el-col",{attrs:{span:20}},[l("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(e){return t.$router.go(-1)}}},[t._v("返回")])],1)],1),t._v(" "),l("el-row",{staticStyle:{"margin-bottom":"20px"}},[l("div",[l("span",{staticStyle:{"font-size":"20px","font-weight":"bold"}},[t._v("发红包方:  ")]),l("span",{staticStyle:{"margin-left":"10px",color:"red"}},[t._v(t._s(t.phone))])])])],1)]),t._v(" "),l("sac-table",{attrs:{data:t.listData.list}},[l("el-table-column",{attrs:{align:"center",prop:"phone",label:"领红包方"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.search==e.row.phone?l("span",{staticStyle:{color:"red"}},[t._v(t._s(e.row.phone))]):l("span",[t._v(t._s(e.row.phone))])]}}])}),t._v(" "),l("el-table-column",{attrs:{align:"center",prop:"createTime",label:"领取时间"}}),t._v(" "),l("el-table-column",{attrs:{align:"center",prop:"amount",label:"领取金额"}})],1)],1)},staticRenderFns:[]};var r=l("C7Lr")({name:"red-envelope-detail",data:function(){return{search:"",phone:"",listData:{total:null,list:[]},filterForm:{packetId:""}}},methods:{getbill:function(){var t=this;this.$http.post("/wallet/backmgr/queryDrawRecdList",this.filterForm).then(function(e){t.listData.list=e.result.list})}},activated:function(){this.filterForm.packetId=this.$route.query.packetId,this.phone=this.$route.query.phone,this.search=this.$route.query.search,this.getbill()}},a,!1,function(t){l("3AhC")},"data-v-00431b6d",null);e.default=r.exports}});