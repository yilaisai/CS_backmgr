webpackJsonp([28],{"PG/X":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l={name:"complaint",data:function(){return{currentPage:1,filterForm:{appealStatus:"0",tradeId:"",pageNum:1,pageSize:20},stateData:[{label:"处理中",value:"0"},{label:"已处理",value:"1"},{label:"全部",value:"2"}],listData:{total:null,list:[]}}},methods:{getList:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/infoShortList",this.filterForm).then(function(e){var a=e.result,l=a.list,r=a.total;t.listData.list=l,t.listData.total=r})},search:function(){this.getList()},checkLog:function(){this.$router.push({name:"customer-log"})},checkDetails:function(t){this.$router.push({name:"complaint-details",query:{tradeId:t.tradeId,appealId:t.appealId}})},handleCurrentChange:function(t,e){this.filterForm.pageSize=t,this.filterForm.pageNum=e,this.getList()}},activated:function(){this.getList()}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"complaint"},[a("el-container",[a("el-header",[a("div",{staticClass:"left"},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入订单号"},model:{value:t.filterForm.tradeId,callback:function(e){t.$set(t.filterForm,"tradeId",e)},expression:"filterForm.tradeId"}},[a("el-select",{staticStyle:{width:"130px"},attrs:{slot:"prepend"},slot:"prepend",model:{value:t.filterForm.appealStatus,callback:function(e){t.$set(t.filterForm,"appealStatus",e)},expression:"filterForm.appealStatus"}},t._l(t.stateData,function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}),1),t._v(" "),a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.search},slot:"append"},[t._v("搜索")])],1)],1),t._v(" "),a("div",{staticClass:"right"},[a("el-button",{on:{click:t.checkLog}},[t._v("查看客服操作日志")])],1)]),t._v(" "),a("el-main",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.listData.list,border:"",height:"100%"}},[a("el-table-column",{attrs:{prop:"tradeId",label:"订单号",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"userId",label:"用户id",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{prop:"appealType",label:"投诉类型",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.appealType?a("span",[t._v("其他")]):t._e(),t._v(" "),1==e.row.appealType?a("span",[t._v("对方未付款")]):t._e(),t._v(" "),2==e.row.appealType?a("span",[t._v("对方未放行")]):t._e(),t._v(" "),3==e.row.appealType?a("span",[t._v("对方无应答")]):t._e(),t._v(" "),4==e.row.appealType?a("span",[t._v("对方有欺诈行为")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"isBuyer",label:"身份",width:"60"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.isBuyer?a("span",[t._v("卖家")]):a("span",[t._v("买家")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"referNo",label:"付款参考号",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"appealCode",label:"申诉对接口令",width:"130"}}),t._v(" "),a("el-table-column",{attrs:{prop:"appealId",label:"申诉号",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tradeTime",label:"投诉时间",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"100",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{plain:"",size:"small"},nativeOn:{click:function(a){return t.checkDetails(e.row)}}},[t._v("查看详情\n                        ")])]}}])})],1)],1),t._v(" "),a("el-footer",[a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length > 0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.handleCurrentChange}})],1)],1)],1)},staticRenderFns:[]};var i=a("VU/8")(l,r,!1,function(t){a("nZF0")},"data-v-a10dcd80",null);e.default=i.exports},nZF0:function(t,e){}});