webpackJsonp([75],{FmG1:function(e,t){},cfy2:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l={name:"complaint",data:function(){return{currentPage:1,filterForm:{appealStatus:"0",tradeId:"",advType:"",pageNum:1,pageSize:20},stateData:[{label:"全部",value:"2"},{label:"处理中",value:"0"},{label:"已处理",value:"1"}],advTypeList:[{value:"",label:"全部"},{value:"1",label:"普通交易"},{value:"3",label:"抢单兑出"},{value:"4",label:"抢单兑入"},{value:"6",label:"派单兑出"},{value:"5",label:"派单兑入"}],listData:{total:null,list:[]}}},methods:{getList:function(){var e=this;this.$http.post("/wallet/app/otc/backmgr/infoShortList",this.filterForm).then(function(t){var a=t.result,l=a.list,r=a.total;e.listData.list=l,e.listData.total=r})},search:function(){this.getList()},checkLog:function(){this.$router.push({name:"customer-log"})},checkDetails:function(e){this.$router.push({name:"complaint-details",query:{tradeId:e.tradeId,appealId:e.appealId,appealResult:e.appealResult}})},handleCurrentChange:function(e,t){this.filterForm.pageSize=e,this.filterForm.pageNum=t,this.getList()}},activated:function(){this.getList()}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"complaint"},[a("el-container",[a("el-header",[a("el-form",{ref:"filterForm",attrs:{inline:!0,model:e.filterForm,size:"mini","label-width":"80px"}},[a("el-form-item",{attrs:{label:"订单号:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入单号"},model:{value:e.filterForm.tradeId,callback:function(t){e.$set(e.filterForm,"tradeId","string"==typeof t?t.trim():t)},expression:"filterForm.tradeId"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"交易类型:"}},[a("el-select",{model:{value:e.filterForm.advType,callback:function(t){e.$set(e.filterForm,"advType",t)},expression:"filterForm.advType"}},e._l(e.advTypeList,function(e,t){return a("el-option",{key:t,attrs:{value:e.value,label:e.label}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"交易状态:"}},[a("el-select",{model:{value:e.filterForm.appealStatus,callback:function(t){e.$set(e.filterForm,"appealStatus",t)},expression:"filterForm.appealStatus"}},e._l(e.stateData,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("搜索")]),e._v(" "),a("el-button",{on:{click:e.checkLog}},[e._v("查看客服操作日志")])],1)],1),e._v(" "),a("el-main",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.listData.list,border:"",height:"100%",size:"mini"}},[a("el-table-column",{attrs:{prop:"tradeId",label:"订单号",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"userId",label:"用户id",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"appealType",align:"center",width:"90",label:"交易类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("advTypeFilter")(t.row.advType)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"isBuyer",label:"身份",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.taker?a("span",[e._v("商户")]):a("span",[e._v("码商")])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"appealId",label:"申诉号",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"tradeTime",label:"投诉时间",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{plain:"",size:"small"},nativeOn:{click:function(a){return e.checkDetails(t.row)}}},[e._v("查看详情\n                        ")])]}}])})],1)],1),e._v(" "),a("el-footer",[a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length > 0"}],attrs:{total:+e.listData.total,"page-size":e.filterForm.pageSize,"current-page":e.filterForm.pageNum},on:{handleChange:e.handleCurrentChange}})],1)],1)],1)},staticRenderFns:[]};var i=a("VU/8")(l,r,!1,function(e){a("FmG1")},"data-v-32172b73",null);t.default=i.exports}});