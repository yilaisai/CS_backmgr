webpackJsonp([43],{m0eQ:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("Dd8w"),i=a.n(r),s=a("EaCm"),l=(a("s0MJ"),a("NYxO")),n={name:"transfer-query",data:function(){return{alarmType:[],filterForm:{coinId:"",tradeType:"",alarmType:"",tradeStatus:"",thirdOrderNo:"",fromOrToUserPhone:"",startDate:"",endDate:"",toAddr:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},selectedDate:[],transactionType:s.f,alarmConditionType:s.a,transferQueryStatus:s.g,isShowPayTime:!0,isShowTableCol:!0,isShowHandle:!0}},methods:{submitForm:function(t){this.filterForm.pageNum=t;var e=this.filterForm,a=e.tradeType,r=e.tradeStatus;this.isShowTableCol="creceive"!=a,this.isShowHandle="4"===r||"csend"===a||""===a&&""===r,"inner"==a?(this.isShowTableCol=!1,this.isShowPayTime=!1):(this.isShowPayTime=!0,this.isShowTableCol=!0),this.getTradeList()},exportExcel:function(){var t="";for(var e in this.filterForm)t+=e+"="+this.filterForm[e]+"&";location.href=SERVER_PATH+"wallet/backmgr/trade/downTradeList?"+t+"token="+localStorage.getItem("wallet_token")},getTradeList:function(){var t=this;this.filterForm.startDate=this.selectedDate&&this.selectedDate[0],this.filterForm.endDate=this.selectedDate&&this.selectedDate[1],this.filterForm.alarmType=this.alarmType.join(","),this.$http.post("wallet/backmgr/trade/getTradeList",this.filterForm).then(function(e){var a=e.result.retMap?e.result.retMap:e.result,r=a.list,i=a.total;t.listData.list=r,t.listData.total=i})},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.submitForm(e)},transferRecordHandle:function(t,e){var a=this,r=3==e?"取消操作：":"打币操作：";this.$http.post("wallet/backmgr/trade/operateTransferOutCoin",{recdId:t,recdStatus:e}).then(function(t){a.$message({message:""+r+t.msg,type:"success"});var e=a;setTimeout(function(){e.onSubmit()},1e3)})}},computed:i()({},Object(l.b)(["coinInfo"])),activated:function(){this.getTradeList()}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"transfer-query"},[a("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"86px",size:"mini"}},[a("el-form-item",{ref:"selectedDate",staticClass:"sac-date",attrs:{label:"日　　期:"}},[a("el-date-picker",{attrs:{editable:!1,type:"datetimerange",align:"center",size:"mini","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:t.selectedDate,callback:function(e){t.selectedDate=e},expression:"selectedDate"}})],1),t._v(" "),a("sac-input",{ref:"fromOrToUserPhone",attrs:{label:"用户账号"},model:{value:t.filterForm.fromOrToUserPhone,callback:function(e){t.$set(t.filterForm,"fromOrToUserPhone","string"==typeof e?e.trim():e)},expression:"filterForm.fromOrToUserPhone"}}),t._v(" "),a("sac-coin",{ref:"coinId",model:{value:t.filterForm.coinId,callback:function(e){t.$set(t.filterForm,"coinId",e)},expression:"filterForm.coinId"}}),t._v(" "),a("sac-select",{ref:"tradeStatus",attrs:{label:"状　　态",dataList:t.transferQueryStatus},model:{value:t.filterForm.tradeStatus,callback:function(e){t.$set(t.filterForm,"tradeStatus",e)},expression:"filterForm.tradeStatus"}}),t._v(" "),a("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(e){return t.submitForm(1)}}})],1),t._v(" "),a("sac-table",{attrs:{data:t.listData.list}},[a("el-table-column",{attrs:{align:"center",prop:"tradeTime",label:"创建时间","min-width":"153"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"coinName",label:"币种","min-width":"60"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"amount",label:"数量","min-width":"150"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"fee",label:"手续费","min-width":"150"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"tradeType",label:"交易类型","min-width":"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("convertTransactionType")(e.row.tradeType)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"fromUserPhone",label:"from账号","min-width":"150"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"fromNickName",label:"from昵称","min-width":"150"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"toUserPhone",label:"to账号","min-width":"150"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"toNickName",label:"to昵称","min-width":"150"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"状态","min-width":"110",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.tradeStatus?a("el-tag",{attrs:{type:"info",size:"mini"}},[t._v("失败")]):t._e(),t._v(" "),1===e.row.tradeStatus?a("el-tag",{attrs:{type:"success",size:"mini"}},[t._v("成功")]):t._e(),t._v(" "),2===e.row.tradeStatus?a("el-tag",{attrs:{size:"mini"}},[t._v("待审核")]):t._e(),t._v(" "),3===e.row.tradeStatus?a("el-tag",{attrs:{type:"warning",size:"mini"}},[t._v("审核不通过")]):t._e(),t._v(" "),4===e.row.tradeStatus?a("el-tag",{attrs:{type:"danger",size:"mini"}},[t._v("审核通过")]):t._e(),t._v(" "),5===e.row.tradeStatus?a("el-tag",{attrs:{size:"mini"}},[t._v("处理中")]):t._e(),t._v(" "),6===e.row.tradeStatus?a("el-tag",{attrs:{size:"mini"}},[t._v("已支付")]):t._e(),t._v(" "),7===e.row.tradeStatus?a("el-tag",{attrs:{size:"mini"}},[t._v("已发送")]):t._e()]}}])})],1),t._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}})],1)},staticRenderFns:[]};var m=a("VU/8")(n,o,!1,function(t){a("oW8Y")},null,null);e.default=m.exports},oW8Y:function(t,e){}});