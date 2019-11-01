webpackJsonp([77],{"Dq+7":function(t,e){},FaWo:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("Dd8w"),s=a.n(l),r=(a("s0MJ"),a("NYxO")),i={name:"transaction-details",data:function(){return{selectedDate:[],currentPage:1,filterForm:{pageNum:1,pageSize:10,startDate:"",endDate:"",coinName:"",trade_status:"",tradeType:"3",advType:"",dateType:"1",timeOut:""},advTypeMap:{1:"在线出售",2:"在线求购",3:"抢单兑出",4:"抢单兑入",5:"派单兑入",6:"派单兑出"},tradeTypeList:[{value:"全部",label:""},{value:"派单",label:"0"},{value:"抢单",label:"1"}],statusList:[{value:"全部",label:""},{value:"未付款",label:"1"},{value:"已付款(待放行)",label:"2"},{value:"已完成",label:"3"},{value:"已取消",label:"4"},{value:"申述中",label:"5"}],transList:[{value:"所有",label:""},{value:"抢单兑出",label:"3"},{value:"抢单兑入",label:"4"},{value:"派单兑入",label:"5"},{value:"派单兑出",label:"6"}],tradeStatusMap:{},dateList:[{value:"今天",label:"1"},{value:"一周",label:"2"},{value:"一个月",label:"3"},{value:"三个月",label:"4"}],listData:{total:null,list:[]},statistics:{}}},methods:{getList:function(){var t=this;2==this.selectedDate.length&&(this.filterForm.startDate=this.selectedDate&&this.$fmtDate(this.selectedDate[0].getTime())+" 00:00:00",this.filterForm.endDate=this.selectedDate&&this.$fmtDate(this.selectedDate[1].getTime())+" 23:59:59"),this.$http.post("/wallet/backmgr/merchant/trade/list",this.filterForm).then(function(e){t.SumTradeRecd();var a=e.result.pageData,l=a.list,s=a.total;t.listData.list=l,t.listData.total=s})},SumTradeRecd:function(){var t=this;2==this.selectedDate.length&&(this.filterForm.startDate=this.selectedDate&&this.$fmtDate(this.selectedDate[0].getTime())+" 00:00:00",this.filterForm.endDate=this.selectedDate&&this.$fmtDate(this.selectedDate[1].getTime())+" 23:59:59"),this.$http.post("/wallet/app/otc/backmgr/SumTradeRecd",this.filterForm).then(function(e){200==e.code&&(t.statistics=e.result)})},returnApi:function(t){var e=this;this.$http.post("/wallet/backmgr/merchant/returnApi",{tradeId:t.trade_id,userId:t.taker_user_id}).then(function(t){200==t.code&&e.$notify({title:"成功",message:t.msg,type:"success"})})},setDateType:function(){var t=new Date,e=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();if(1==this.filterForm.dateType)this.selectedDate=[e,e];else if(2==this.filterForm.dateType){var a=new Date(t-6048e5),l=a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate();this.selectedDate=[l,e]}else if(3==this.filterForm.dateType){t.setMonth(t.getMonth()-1);var s=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();this.selectedDate=[s,e]}else if(4==this.filterForm.dateType){t.setMonth(t.getMonth()-3);var r=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();this.selectedDate=[r,e]}},search:function(){this.getList()},checkLog:function(){this.$router.push({path:"customer-log"})},checkDetails:function(){this.$router.push({path:"complaint-details"})},handleCurrentChange:function(t,e){this.filterForm.pageSize=t,this.filterForm.pageNum=e,this.getList()},download:function(){location.href=SERVER_PATH+"/wallet/app/otc/backmgr/exportExcel?startDate="+this.filterForm.startDate+"&endDate="+this.filterForm.endDate+"&userId="+this.filterForm.userId+"&token="+localStorage.getItem("cus_token")}},computed:s()({},Object(r.b)(["coinInfo"])),activated:function(){this.getList()}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"transaction-details"},[a("el-container",[a("div",{staticClass:"main"},[a("el-form",{ref:"filterForm",attrs:{inline:!0,model:t.filterForm,size:"mini","label-width":"80px"}},[a("div",{staticClass:"form-group"},[a("el-form-item",{attrs:{label:"订单号:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入单号"},model:{value:t.filterForm.recdId,callback:function(e){t.$set(t.filterForm,"recdId",e)},expression:"filterForm.recdId"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"账号:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入用户账号"},model:{value:t.filterForm.phone,callback:function(e){t.$set(t.filterForm,"phone",e)},expression:"filterForm.phone"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"状态:"}},[a("el-select",{model:{value:t.filterForm.status,callback:function(e){t.$set(t.filterForm,"status",e)},expression:"filterForm.status"}},t._l(t.statusList,function(t,e){return a("el-option",{key:e,attrs:{value:t.label,label:t.value}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"币种:"}},[a("el-select",{model:{value:t.filterForm.coinName,callback:function(e){t.$set(t.filterForm,"coinName",e)},expression:"filterForm.coinName"}},[a("el-option",{attrs:{value:"",label:"全部"}}),t._v(" "),t._l(t.coinInfo,function(t,e){return a("el-option",{key:e,attrs:{value:t.coinName,label:t.coinName}})})],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"交易类型:"}},[a("el-select",{model:{value:t.filterForm.advType,callback:function(e){t.$set(t.filterForm,"advType",e)},expression:"filterForm.advType"}},t._l(t.transList,function(t,e){return a("el-option",{key:e,attrs:{value:t.label,label:t.value}})}),1)],1),t._v(" "),a("el-form-item",{staticClass:"dateItem",attrs:{label:"时间:"}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:function(e){t.filterForm.dateType=""}},model:{value:t.selectedDate,callback:function(e){t.selectedDate=e},expression:"selectedDate"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"超时筛选:"}},[a("el-select",{model:{value:t.filterForm.timeOut,callback:function(e){t.$set(t.filterForm,"timeOut",e)},expression:"filterForm.timeOut"}},[a("el-option",{attrs:{value:"",label:"所有"}}),t._v(" "),a("el-option",{attrs:{value:"1",label:"已超时"}})],1)],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},nativeOn:{click:function(e){return t.search(e)}}},[t._v("搜索")])],1)],1)]),t._v(" "),t.statistics?a("ul",{staticClass:"statistics"},[a("li",[a("p",[t._v("待付款")]),t._v(" "),a("p",[t._v("交易数："+t._s(t.statistics.pendingGoNum))]),t._v(" "),a("p",[t._v("交易额："+t._s(t.statistics.pendingGoAmount)+t._s(t.filterForm.coinName))])]),t._v(" "),a("li",[a("p",[t._v("待放行")]),t._v(" "),a("p",[t._v("交易数："+t._s(t.statistics.pendingNum))]),t._v(" "),a("p",[t._v("交易额："+t._s(t.statistics.pendingAmount)+t._s(t.filterForm.coinName))])]),t._v(" "),a("li",[a("p",[t._v("已完成")]),t._v(" "),a("p",[t._v("交易数："+t._s(t.statistics.completeNum))]),t._v(" "),a("p",[t._v("交易额："+t._s(t.statistics.completeAmount)+t._s(t.filterForm.coinName))])]),t._v(" "),a("li",[a("p",[t._v("申诉中")]),t._v(" "),a("p",[t._v("交易数："+t._s(t.statistics.appealNum))]),t._v(" "),a("p",[t._v("交易额："+t._s(t.statistics.appealAmount)+t._s(t.filterForm.coinName))])])]):t._e(),t._v(" "),a("el-table",{attrs:{data:t.listData.list,border:"",height:"100%",size:"mini"}},[a("el-table-column",{attrs:{label:"类型",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.advTypeMap[e.row.adv_type]))]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"商户单号/平台单号/下单时间",width:"180",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{},[t._v(t._s(e.row.api_trade_id)),a("br"),t._v(t._s(e.row.trade_id)),a("br"),t._v(t._s(t.$fmtDate(e.row.create_time,"full")))])}}])}),t._v(" "),a("el-table-column",{attrs:{label:"商户昵称/账户",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{},[t._v(t._s(e.row.taker_nick_name)),a("br"),t._v(t._s(e.row.taker_phone))])}}])}),t._v(" "),a("el-table-column",{attrs:{label:"承兑商昵称/账户",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{},[t._v(t._s(e.row.nick_name)),a("br"),t._v(t._s(e.row.phone))])}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"tradeTime",label:"状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[a("span",[t._v(t._s(1==e.row.trade_status?"未付款":2==e.row.trade_status?"待放行":3==e.row.trade_status?"已完成":4==e.row.trade_status?"已取消":5==e.row.trade_status?"申述":6==e.row.trade_status?"已完成":8==e.row.trade_status?"已取消":""))])])}}])}),t._v(" "),a("el-table-column",{attrs:{label:"价格/数量/金额",width:"120",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[a("span",[t._v(t._s(e.row.taker_price))]),a("br"),t._v(" "),a("span",[t._v(t._s(e.row.taker_amount))]),a("br"),t._v(" "),a("span",[t._v(t._s(e.row.amount))])])}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"coin_name",label:"币种",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"fee",label:"手续费",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"price",label:"操作",fixed:"right",align:"center",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"mini"},nativeOn:{click:function(a){return t.$router.push({path:"/merchant/merchantTradingFlowDetaile",query:{tradeId:e.row.trade_id}})}}},[t._v("查看详情")]),t._v(" "),4!=e.row.adv_type&&5!=e.row.adv_type||3!=e.row.trade_status&&6!=e.row.trade_status?t._e():a("el-button",{attrs:{type:"warning",size:"mini"},on:{click:function(a){return t.returnApi(e.row)}}},[t._v("异步补发")])]}}])})],1)],1),t._v(" "),a("el-footer",[a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.handleCurrentChange}})],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")(i,n,!1,function(t){a("Dq+7")},"data-v-1eec8d46",null);e.default=o.exports}});