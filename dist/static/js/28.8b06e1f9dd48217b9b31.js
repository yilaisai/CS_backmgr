webpackJsonp([28],{"26vf":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("s0MJ"),l={name:"statements",data:function(){return{filterForm:{coinId:"",fromOrToUserPhone:"",teamType:"-1",startDate:"",endDate:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},moneyList:[],selectedDate:[]}},methods:{submitForm:function(e){this.filterForm.pageNum=e,this.getTradeList()},getPaginationChange:function(e,t){this.filterForm.pageSize=e,this.submitForm(t)},getTradeList:function(){var e=this;this.filterForm.startDate=this.selectedDate&&this.selectedDate[0],this.filterForm.endDate=this.selectedDate&&this.selectedDate[1],this.$http.post("wallet/backmgr/trade/getTradeList.do",this.filterForm).then(function(t){var a=t.result.retMap,r=a.list,l=a.total;e.listData.list=r,e.listData.total=l;var n=t.result.sumData.length&&t.result.sumData[0],s=-1==e.filterForm.teamType;e.moneyList=[{name:s?"链上转入":"转入",value:n.inSumAmount||0},{name:s?"链上转出":"转出",value:n.outSumAmount||0},{name:"余额",value:n.sunAmount||0}]})},merchantType:function(e,t){return"person"==e.merchantType?"个人":e.merchantType}},activated:function(){var e=Object(r.a)(),t=Object(r.a)((new Date).getTime()-1296e6);this.selectedDate=[t,e],this.getTradeList()}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"statements"},[a("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"80px",model:e.filterForm}},[a("sac-coin",{ref:"coinId",model:{value:e.filterForm.coinId,callback:function(t){e.$set(e.filterForm,"coinId",t)},expression:"filterForm.coinId"}}),e._v(" "),a("sac-teamType",{ref:"teamType",model:{value:e.filterForm.teamType,callback:function(t){e.$set(e.filterForm,"teamType",t)},expression:"filterForm.teamType"}}),e._v(" "),a("sac-input",{ref:"fromOrToUserPhone",attrs:{label:"用户账号"},model:{value:e.filterForm.fromOrToUserPhone,callback:function(t){e.$set(e.filterForm,"fromOrToUserPhone","string"==typeof t?t.trim():t)},expression:"filterForm.fromOrToUserPhone"}}),e._v(" "),a("sac-date",{ref:"selectedDate",attrs:{label:"日　　期"},model:{value:e.selectedDate,callback:function(t){e.selectedDate=t},expression:"selectedDate"}}),e._v(" "),a("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(t){e.submitForm(1)}}})],1),e._v(" "),a("div",{staticClass:"moneyList"},e._l(e.moneyList,function(t,r){return a("el-tag",{key:r},[e._v(e._s(t.name)+"："+e._s(t.value))])})),e._v(" "),a("sac-table",{attrs:{data:e.listData.list}},[a("el-table-column",{attrs:{align:"center",prop:"tradeId",label:"序号"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"fromUserPhone",label:"用户账号"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"coinName",label:"币种",width:"90"}}),e._v(" "),a("el-table-column",{attrs:{prop:"tradeType",label:"交易类型",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("convertTransactionType")(t.row.tradeType)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"merchantType",formatter:e.merchantType,label:"商户类型",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"amount",label:"转账金额"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"tradeTime",label:"日期/时间"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"toUserPhone",label:"对方账号"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"tradeStatus",label:"状态",width:"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("transferQueryStatusType")(t.row.tradeStatus)))])]}}])})],1),e._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.filterForm.pageSize,"current-page":e.filterForm.pageNum},on:{handleChange:e.getPaginationChange}})],1)},staticRenderFns:[]};var s=a("VU/8")(l,n,!1,function(e){a("Oa09")},null,null);t.default=s.exports},Oa09:function(e,t){}});