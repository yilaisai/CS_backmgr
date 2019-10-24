webpackJsonp([85],{SUAA:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("s0MJ"),r={name:"transaction-details",data:function(){return{selectedDate:[],currentPage:1,filterForm:{pageNum:1,pageSize:20,coinName:"",startDate:"",endDate:"",userId:""},stateData:[{label:"处理中",value:"0"},{label:"已处理",value:"1"},{label:"全部",value:"2"}],listData:{total:null,list:[]}}},methods:{getList:function(){var t=this;this.filterForm.startDate=this.selectedDate&&this.selectedDate[0],this.filterForm.endDate=this.selectedDate&&this.selectedDate[1],this.$http.post("/wallet/app/otc/backmgr/getTradeList",this.filterForm).then(function(e){var a=e.result,l=a.list,r=a.total;t.listData.list=l,t.listData.total=r})},search:function(){this.getList()},checkLog:function(){this.$router.push({path:"customer-log"})},checkDetails:function(){this.$router.push({path:"complaint-details"})},handleCurrentChange:function(t,e){this.filterForm.pageSize=t,this.filterForm.pageNum=e,this.getList()},download:function(){location.href=SERVER_PATH+"/wallet/app/otc/backmgr/exportExcel?startDate="+this.filterForm.startDate+"&endDate="+this.filterForm.endDate+"&userId="+this.filterForm.userId+"&token="+localStorage.getItem("cus_token")}},activated:function(){var t=Object(l.a)(new Date);this.selectedDate=[t,t],this.getList()}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"transaction-details"},[a("el-container",[a("el-header",{staticClass:"filter-header"},[a("el-form",{ref:"filterForm",attrs:{inline:!0,model:t.filterForm}},[a("div",{staticClass:"title"},[a("el-form-item",{staticClass:"dateItem",attrs:{label:"时间:"}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.selectedDate,callback:function(e){t.selectedDate=e},expression:"selectedDate"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"币种:"}},[a("el-input",{attrs:{placeholder:"请输入币种"},model:{value:t.filterForm.coinName,callback:function(e){t.$set(t.filterForm,"coinName",e)},expression:"filterForm.coinName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"用户ID:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入用户ID"},model:{value:t.filterForm.userId,callback:function(e){t.$set(t.filterForm,"userId",e)},expression:"filterForm.userId"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.search},slot:"append"},[t._v("搜索")])],1)],1),t._v(" "),a("div",{staticClass:"el-form-item__content",staticStyle:{width:"100px"}},[a("el-button",{attrs:{type:"primary"},nativeOn:{click:function(e){return t.download(e)}}},[t._v("下载全部\n                        ")])],1)],1)])],1),t._v(" "),a("el-main",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.listData.list,border:"",height:"100%"}},[a("el-table-column",{attrs:{prop:"ctUserId",label:"交易方ID",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"ctRealName",label:"交易方姓名",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"ctPhone",label:"交易方手机号",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"userId",label:"广告方ID",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"realName",label:"广告方姓名",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"广告方手机号",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"coinName",label:"币种",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tradeTime",label:"交易时间",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tradeType",label:"交易类型",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.tradeType?a("span",[t._v("买入")]):a("span",[t._v("卖出")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"tradeId",label:"交易号",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tradeStatus",label:"交易状态",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.tradeStatus?a("span",[t._v("未付款")]):t._e(),t._v(" "),2==e.row.tradeStatus?a("span",[t._v("已付款")]):t._e(),t._v(" "),3==e.row.tradeStatus?a("span",[t._v("已完成")]):t._e(),t._v(" "),4==e.row.tradeStatus?a("span",[t._v("人为取消")]):t._e(),t._v(" "),5==e.row.tradeStatus?a("span",[t._v("申诉中")]):t._e(),t._v(" "),6==e.row.tradeStatus?a("span",[t._v("申诉后完成交易")]):t._e(),t._v(" "),7==e.row.tradeStatus?a("span",[t._v("申诉后取消交易")]):t._e(),t._v(" "),8==e.row.tradeStatus?a("span",[t._v("支付超时取消")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"amount",label:"交易金额",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"counts",label:"交易数量",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"price",label:"交易价格",width:"180"}})],1)],1),t._v(" "),a("el-footer",[a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.handleCurrentChange}})],1)],1)],1)},staticRenderFns:[]};var i=a("VU/8")(r,s,!1,function(t){a("Tjk8")},"data-v-0f942c3a",null);e.default=i.exports},Tjk8:function(t,e){}});