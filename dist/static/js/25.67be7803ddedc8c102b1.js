webpackJsonp([25],{"0Gdz":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("Dd8w"),r=a.n(l),s=a("NYxO"),i=(a("s0MJ"),{props:{listData:{type:Array}}}),n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-table",{attrs:{data:t.listData,border:"",height:"100%",size:"mini"}},[a("el-table-column",{attrs:{label:"单号/下单时间",width:"180",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{},[t._v(t._s(e.row.recdId)+" "),a("br"),t._v(t._s(t.$fmtDate(e.row.createStamp,"full")))])}}])}),t._v(" "),a("el-table-column",{attrs:{label:"用户昵称/账户",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{},[t._v(t._s(e.row.takerName)+" "),a("br"),t._v(t._s(e.row.takerPhone))])}}])}),t._v(" "),a("el-table-column",{attrs:{label:"广告商昵称/账户",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{},[t._v(t._s(e.row.makerName)+" "),a("br"),t._v(t._s(e.row.makerPhone))])}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"tradeTime",label:"状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{},[t._v(t._s(1==e.row.tradeStatus?"未付款":2==e.row.tradeStatus?"待放行":3==e.row.tradeStatus?"已完成":4==e.row.tradeStatus?"已取消":5==e.row.tradeStatus?"申述":""))])}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"tradeType",label:"广告类型",width:"80",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.trans?a("span",[t._v("购买")]):a("span",[t._v("出售")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"价格/数量/金额",width:"120",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{},[t._v(t._s(e.row.price)+" "),a("br"),t._v(t._s(e.row.amount)+" "),a("br"),t._v(t._s(e.row.money))])}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"coinName",label:"币种",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"fee",label:"手续费",align:"center"}})],1)},staticRenderFns:[]},o=a("VU/8")(i,n,!1,null,null,null).exports,u={name:"transaction-details",data:function(){return{showSumMap:!1,selectedDate:[],currentPage:1,filterForm:{pageNum:1,pageSize:20,startDate:"",endDate:"",coinName:"",tradeStatus:"",trans:"",recdId:"",account:""},tradeTypeList:[{value:"全部",label:""},{value:"C2C",label:"0"},{value:"派单",label:"1"},{value:"抢单",label:"2"}],statusList:[{value:"全部",label:""},{value:"未付款",label:"1"},{value:"已付款(待放行)",label:"2"},{value:"已完成",label:"3"},{value:"已取消",label:"4"},{value:"申述中",label:"5"}],transList:[{value:"所有",label:""},{value:"购买",label:"1"},{value:"出售",label:"0"}],dateList:[{value:"今天",label:"1"},{value:"一周",label:"2"},{value:"一个月",label:"3"},{value:"三个月",label:"4"}],listData:{total:null,list:[]},sumMap:{applealCount:0,applealMount:0,finishCount:0,finishMount:0,payedCount:0,payedMount:0,waitPayCount:0,waitPayMount:0}}},methods:{getList:function(){var t=this;this.selectedDate&&2==this.selectedDate.length?(this.filterForm.startDate=this.selectedDate[0],this.filterForm.endDate=this.selectedDate[1]):(this.filterForm.startDate="",this.filterForm.endDate=""),this.$http.post("/wallet/app/otc/backmgr/getTradeMainList",this.filterForm).then(function(e){var a=e.result.pageInfo,l=a.list,r=a.total;t.sumMap=e.result.sumMap,t.listData.list=l,t.listData.total=r})},setDateType:function(){var t=new Date,e=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();if(1==this.filterForm.dateType)this.selectedDate=[e,e];else if(2==this.filterForm.dateType){var a=new Date(t-6048e5),l=a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate();this.selectedDate=[l,e]}else if(3==this.filterForm.dateType){t.setMonth(t.getMonth()-1);var r=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();this.selectedDate=[r,e]}else if(4==this.filterForm.dateType){t.setMonth(t.getMonth()-3);var s=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();this.selectedDate=[s,e]}},search:function(){this.getList()},checkLog:function(){this.$router.push({path:"customer-log"})},checkDetails:function(){this.$router.push({path:"complaint-details"})},handleCurrentChange:function(t,e){this.filterForm.pageSize=t,this.filterForm.pageNum=e,this.getList()},download:function(){location.href=SERVER_PATH+"/wallet/app/otc/backmgr/exportExcel?startDate="+this.filterForm.startDate+"&endDate="+this.filterForm.endDate+"&userId="+this.filterForm.userId+"&token="+localStorage.getItem("cus_token")}},computed:r()({},Object(s.b)(["coinInfo"])),activated:function(){this.getList()},components:{Table:o}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"transaction-details"},[a("el-container",[a("el-main",[a("el-form",{ref:"filterForm",attrs:{inline:!0,model:t.filterForm,size:"mini","label-width":"80px"}},[a("div",{staticClass:"form-group"},[a("el-form-item",{attrs:{label:"订单号:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入单号"},model:{value:t.filterForm.recdId,callback:function(e){t.$set(t.filterForm,"recdId","string"==typeof e?e.trim():e)},expression:"filterForm.recdId"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"账号:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入用户账户或昵称"},model:{value:t.filterForm.account,callback:function(e){t.$set(t.filterForm,"account","string"==typeof e?e.trim():e)},expression:"filterForm.account"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"状态:"}},[a("el-select",{model:{value:t.filterForm.tradeStatus,callback:function(e){t.$set(t.filterForm,"tradeStatus",e)},expression:"filterForm.tradeStatus"}},t._l(t.statusList,function(t,e){return a("el-option",{key:e,attrs:{value:t.label,label:t.value}})}),1)],1)],1),t._v(" "),a("div",{staticClass:"form-group"},[a("el-form-item",{attrs:{label:"币种:"}},[a("el-select",{model:{value:t.filterForm.coinName,callback:function(e){t.$set(t.filterForm,"coinName",e)},expression:"filterForm.coinName"}},[a("el-option",{attrs:{value:"",label:"全部"}}),t._v(" "),t._l(t.coinInfo,function(t,e){return a("el-option",{key:e,attrs:{value:t.coinName,label:t.coinName}})})],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"广告类型:"}},[a("el-select",{model:{value:t.filterForm.trans,callback:function(e){t.$set(t.filterForm,"trans",e)},expression:"filterForm.trans"}},t._l(t.transList,function(t,e){return a("el-option",{key:e,attrs:{value:t.label,label:t.value}})}),1)],1)],1),t._v(" "),a("div",{staticClass:"form-group"},[a("el-form-item",{staticClass:"dateItem",attrs:{label:"时间:"}},[a("el-date-picker",{attrs:{type:"datetimerange","value-format":"yyyy-MM-dd HH:mm:ss","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:function(e){t.filterForm.dateType=""}},model:{value:t.selectedDate,callback:function(e){t.selectedDate=e},expression:"selectedDate"}})],1),t._v(" "),a("el-form-item",{staticClass:"dateItem"},[a("el-button",{attrs:{type:"primary",size:"mini"},nativeOn:{click:function(e){return t.search(e)}}},[t._v("搜索")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},nativeOn:{click:function(e){t.showSumMap=!0}}},[t._v("统计查询报表")])],1)],1)]),t._v(" "),a("Table",{attrs:{listData:t.listData.list}})],1),t._v(" "),a("el-footer",[a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.handleCurrentChange}})],1)],1),t._v(" "),t.sumMap?a("el-dialog",{staticClass:"SumMap",attrs:{visible:t.showSumMap},on:{"update:visible":function(e){t.showSumMap=e}}},[a("div",[a("ul",[a("li",[a("p",[t._v("待付款")]),t._v(" "),a("p",[t._v("交易数："+t._s(t.sumMap.waitPayCount))]),t._v(" "),a("p",[t._v("交易额："+t._s(t.sumMap.waitPayMount))])]),t._v(" "),a("li",[a("p",[t._v("待放行")]),t._v(" "),a("p",[t._v("交易数："+t._s(t.sumMap.payedCount))]),t._v(" "),a("p",[t._v("交易额："+t._s(t.sumMap.payedMount))])]),t._v(" "),a("li",[a("p",[t._v("已完成")]),t._v(" "),a("p",[t._v("交易数："+t._s(t.sumMap.finishCount))]),t._v(" "),a("p",[t._v("交易额："+t._s(t.sumMap.finishMount))])]),t._v(" "),a("li",[a("p",[t._v("申诉中")]),t._v(" "),a("p",[t._v("交易数："+t._s(t.sumMap.applealCount))]),t._v(" "),a("p",[t._v("交易额："+t._s(t.sumMap.applealMount))])])])])]):t._e()],1)},staticRenderFns:[]};var p=a("VU/8")(u,c,!1,function(t){a("IQ4e")},"data-v-c542c0cc",null);e.default=p.exports},IQ4e:function(t,e){}});