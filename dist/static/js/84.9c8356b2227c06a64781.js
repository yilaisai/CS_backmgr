webpackJsonp([84],{FaWo:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("Dd8w"),s=a.n(l),i=(a("s0MJ"),a("NYxO")),r={name:"transaction-details",data:function(){return{selectedDate:[],currentPage:1,filterForm:{pageNum:1,pageSize:10,startDate:"",endDate:"",coinName:"",trade_status:"",tradeType:"3",advType:"",dateType:"1",timeOut:""},advTypeMap:{1:"在线出售",2:"在线求购",3:"抢单兑出",4:"抢单兑入",5:"派单兑入",6:"派单兑出"},tradeTypeList:[{value:"全部",label:""},{value:"派单",label:"0"},{value:"抢单",label:"1"}],statusList:[{value:"全部",label:""},{value:"未付款",label:"1"},{value:"已付款(待放行)",label:"2"},{value:"已完成",label:"3"},{value:"已取消",label:"4"},{value:"申述中",label:"5"}],coinList:[{value:"所有",label:""},{value:"USDT",label:"USDT"},{value:"BTC",label:"BTC"}],transList:[{value:"所有",label:""},{value:"抢单兑出",label:"3"},{value:"抢单兑入",label:"4"},{value:"派单兑入",label:"5"},{value:"派单兑出",label:"6"}],tradeStatusMap:{},dateList:[{value:"今天",label:"1"},{value:"一周",label:"2"},{value:"一个月",label:"3"},{value:"三个月",label:"4"}],listData:{total:null,list:[]},statistics:{}}},methods:{getList:function(){var e=this;2==this.selectedDate.length&&(this.filterForm.startDate=this.selectedDate&&this.$fmtDate(this.selectedDate[0].getTime())+" 00:00:00",this.filterForm.endDate=this.selectedDate&&this.$fmtDate(this.selectedDate[1].getTime())+" 23:59:59"),this.$http.post("/wallet/backmgr/merchant/trade/list",this.filterForm).then(function(t){e.SumTradeRecd();var a=t.result.pageData,l=a.list,s=a.total;e.listData.list=l,e.listData.total=s})},SumTradeRecd:function(){var e=this;2==this.selectedDate.length&&(this.filterForm.startDate=this.selectedDate&&this.$fmtDate(this.selectedDate[0].getTime())+" 00:00:00",this.filterForm.endDate=this.selectedDate&&this.$fmtDate(this.selectedDate[1].getTime())+" 23:59:59"),this.$http.post("/wallet/app/otc/backmgr/SumTradeRecd",this.filterForm).then(function(t){200==t.code&&(e.statistics=t.result)})},setDateType:function(){var e=new Date,t=e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate();if(1==this.filterForm.dateType)this.selectedDate=[t,t];else if(2==this.filterForm.dateType){var a=new Date(e-6048e5),l=a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate();this.selectedDate=[l,t]}else if(3==this.filterForm.dateType){e.setMonth(e.getMonth()-1);var s=e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate();this.selectedDate=[s,t]}else if(4==this.filterForm.dateType){e.setMonth(e.getMonth()-3);var i=e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate();this.selectedDate=[i,t]}},search:function(){this.getList()},checkLog:function(){this.$router.push({path:"customer-log"})},checkDetails:function(){this.$router.push({path:"complaint-details"})},handleCurrentChange:function(e,t){this.filterForm.pageSize=e,this.filterForm.pageNum=t,this.getList()},download:function(){location.href=SERVER_PATH+"/wallet/app/otc/backmgr/exportExcel?startDate="+this.filterForm.startDate+"&endDate="+this.filterForm.endDate+"&userId="+this.filterForm.userId+"&token="+localStorage.getItem("cus_token")}},computed:s()({},Object(i.b)(["coinInfo"])),activated:function(){this.getList()}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"transaction-details"},[a("el-container",[a("div",{staticClass:"main"},[a("el-form",{ref:"filterForm",attrs:{inline:!0,model:e.filterForm,size:"mini","label-width":"80px"}},[a("div",{staticClass:"form-group"},[a("el-form-item",{attrs:{label:"订单号:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入单号"},model:{value:e.filterForm.recdId,callback:function(t){e.$set(e.filterForm,"recdId",t)},expression:"filterForm.recdId"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"账号:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入用户账号"},model:{value:e.filterForm.phone,callback:function(t){e.$set(e.filterForm,"phone",t)},expression:"filterForm.phone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"状态:"}},[a("el-select",{model:{value:e.filterForm.status,callback:function(t){e.$set(e.filterForm,"status",t)},expression:"filterForm.status"}},e._l(e.statusList,function(e,t){return a("el-option",{key:t,attrs:{value:e.label,label:e.value}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"币种:"}},[a("el-select",{model:{value:e.filterForm.coinName,callback:function(t){e.$set(e.filterForm,"coinName",t)},expression:"filterForm.coinName"}},[a("el-option",{attrs:{value:"",label:"全部"}}),e._v(" "),e._l(e.coinInfo,function(e,t){return a("el-option",{key:t,attrs:{value:e.coinName,label:e.coinName}})})],2)],1),e._v(" "),a("el-form-item",{attrs:{label:"交易类型:"}},[a("el-select",{model:{value:e.filterForm.advType,callback:function(t){e.$set(e.filterForm,"advType",t)},expression:"filterForm.advType"}},e._l(e.transList,function(e,t){return a("el-option",{key:t,attrs:{value:e.label,label:e.value}})}),1)],1),e._v(" "),a("el-form-item",{staticClass:"dateItem",attrs:{label:"时间:"}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:function(t){e.filterForm.dateType=""}},model:{value:e.selectedDate,callback:function(t){e.selectedDate=t},expression:"selectedDate"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"超时筛选:"}},[a("el-select",{model:{value:e.filterForm.timeOut,callback:function(t){e.$set(e.filterForm,"timeOut",t)},expression:"filterForm.timeOut"}},[a("el-option",{attrs:{value:"",label:"所有"}}),e._v(" "),a("el-option",{attrs:{value:"1",label:"已超时"}})],1)],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},nativeOn:{click:function(t){return e.search(t)}}},[e._v("搜索")])],1)],1)]),e._v(" "),e.statistics?a("ul",{staticClass:"statistics"},[a("li",[a("p",[e._v("待付款")]),e._v(" "),a("p",[e._v("交易数："+e._s(e.statistics.pendingGoNum))]),e._v(" "),a("p",[e._v("交易额："+e._s(e.statistics.pendingGoAmount)+e._s(e.filterForm.coinName))])]),e._v(" "),a("li",[a("p",[e._v("待放行")]),e._v(" "),a("p",[e._v("交易数："+e._s(e.statistics.pendingNum))]),e._v(" "),a("p",[e._v("交易额："+e._s(e.statistics.pendingAmount)+e._s(e.filterForm.coinName))])]),e._v(" "),a("li",[a("p",[e._v("已完成")]),e._v(" "),a("p",[e._v("交易数："+e._s(e.statistics.completeNum))]),e._v(" "),a("p",[e._v("交易额："+e._s(e.statistics.completeAmount)+e._s(e.filterForm.coinName))])]),e._v(" "),a("li",[a("p",[e._v("申诉中")]),e._v(" "),a("p",[e._v("交易数："+e._s(e.statistics.appealNum))]),e._v(" "),a("p",[e._v("交易额："+e._s(e.statistics.appealAmount)+e._s(e.filterForm.coinName))])])]):e._e(),e._v(" "),a("el-table",{attrs:{data:e.listData.list,border:"",height:"100%",size:"mini"}},[a("el-table-column",{attrs:{label:"类型",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e.advTypeMap[t.row.adv_type]))]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"单号/下单时间",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return a("span",{},[e._v(e._s(t.row.trade_id)),a("br"),e._v(e._s(e.$fmtDate(t.row.create_time,"full")))])}}])}),e._v(" "),a("el-table-column",{attrs:{label:"商户昵称/账户",width:"150",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return a("span",{},[e._v(e._s(t.row.taker_nick_name)),a("br"),e._v(e._s(t.row.taker_phone))])}}])}),e._v(" "),a("el-table-column",{attrs:{label:"承兑商昵称/账户",width:"150",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return a("span",{},[e._v(e._s(t.row.nick_name)),a("br"),e._v(e._s(t.row.phone))])}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"tradeTime",label:"状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return a("div",{},[a("span",[e._v(e._s(1==t.row.trade_status?"未付款":2==t.row.trade_status?"待放行":3==t.row.trade_status?"已完成":4==t.row.trade_status?"已取消":5==t.row.trade_status?"申述":6==t.row.trade_status?"已完成":8==t.row.trade_status?"已取消":""))])])}}])}),e._v(" "),a("el-table-column",{attrs:{label:"价格/数量/金额",width:"120",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return a("div",{},[a("span",[e._v(e._s(t.row.taker_price))]),a("br"),e._v(" "),a("span",[e._v(e._s(t.row.taker_amount))]),a("br"),e._v(" "),a("span",[e._v(e._s(t.row.amount))])])}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"coin_name",label:"币种",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"fee",label:"手续费",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"price",label:"操作",fixed:"right",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text"},nativeOn:{click:function(a){return e.$router.push({path:"/merchant/merchantTradingFlowDetaile",query:{tradeId:t.row.trade_id}})}}},[e._v("查看详情")])]}}])})],1)],1),e._v(" "),a("el-footer",[a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.filterForm.pageSize,"current-page":e.filterForm.pageNum},on:{handleChange:e.handleCurrentChange}})],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")(r,n,!1,function(e){a("In4v")},"data-v-11b3e111",null);t.default=o.exports},In4v:function(e,t){}});