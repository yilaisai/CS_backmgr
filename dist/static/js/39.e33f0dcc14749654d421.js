webpackJsonp([39],{"26vf":function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r("s0MJ"),l=r("EaCm"),s={name:"statements",data:function(){return{filterForm:{coinId:"",fromOrToUserPhone:"",teamType:"-1",startDate:"",endDate:"",toAddr:"",fromUserId:"",toUserId:"",fromUserPhone:"",toUserPhone:"",thirdOrderNo:"",tradeType:"",tradeStatus:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},moneyList:[],selectedDate:[],transactionType:l.c,transferQueryStatus:l.d}},methods:{submitForm:function(t){this.filterForm.pageNum=t;var e=this.filterForm,r=e.tradeType,a=e.tradeStatus;this.isShowTableCol="creceive"!=r,this.isShowHandle="4"===a||"csend"===r||""===r&&""===a,"inner"==r?(this.isShowTableCol=!1,this.isShowPayTime=!1):(this.isShowPayTime=!0,this.isShowTableCol=!0),this.getbill()},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.submitForm(e)},getbill:function(){var t=this;this.filterForm.startDate=this.selectedDate&&this.selectedDate[0],this.filterForm.endDate=this.selectedDate&&this.selectedDate[1],this.$http.post("wallet/backmgr/trade/getbill.do",this.filterForm).then(function(e){var r=e.result.retMap,a=r.list,l=r.total;t.listData.list=a,t.listData.total=l;var s=e.result.sumData.length&&e.result.sumData[0],o=-1==t.filterForm.teamType;t.moneyList=[{name:o?"链上转入":"转入",value:s.inSumAmount||0},{name:o?"链上转出":"转出",value:s.outSumAmount||0},{name:"余额",value:s.sunAmount||0}]})},merchantType:function(t,e){return"person"==t.merchantType?"个人":t.merchantType}},activated:function(){var t=Object(a.a)(),e=Object(a.a)((new Date).getTime()-1296e6);this.selectedDate=[e,t],this.getbill()}},o={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"statements"},[r("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"120px",model:t.filterForm}},[r("sac-coin",{ref:"coinId",model:{value:t.filterForm.coinId,callback:function(e){t.$set(t.filterForm,"coinId",e)},expression:"filterForm.coinId"}}),t._v(" "),r("sac-teamType",{ref:"teamType",model:{value:t.filterForm.teamType,callback:function(e){t.$set(t.filterForm,"teamType",e)},expression:"filterForm.teamType"}}),t._v(" "),r("sac-select",{ref:"tradeType",attrs:{label:"交易类型",dataList:t.transactionType},model:{value:t.filterForm.tradeType,callback:function(e){t.$set(t.filterForm,"tradeType",e)},expression:"filterForm.tradeType"}}),t._v(" "),r("sac-date",{ref:"selectedDate",attrs:{label:"日　　期"},model:{value:t.selectedDate,callback:function(e){t.selectedDate=e},expression:"selectedDate"}}),t._v(" "),r("sac-select",{ref:"tradeStatus",attrs:{label:"状　　态",dataList:t.transferQueryStatus},model:{value:t.filterForm.tradeStatus,callback:function(e){t.$set(t.filterForm,"tradeStatus",e)},expression:"filterForm.tradeStatus"}}),t._v(" "),r("sac-input",{ref:"fromOrToUserPhone",staticClass:"inputBox",attrs:{label:"用户账号"},model:{value:t.filterForm.fromOrToUserPhone,callback:function(e){t.$set(t.filterForm,"fromOrToUserPhone","string"==typeof e?e.trim():e)},expression:"filterForm.fromOrToUserPhone"}}),t._v(" "),r("sac-input",{ref:"toAddr",staticClass:"inputBox",attrs:{label:"交易地址"},model:{value:t.filterForm.toAddr,callback:function(e){t.$set(t.filterForm,"toAddr","string"==typeof e?e.trim():e)},expression:"filterForm.toAddr"}}),t._v(" "),r("sac-input",{ref:"thirdOrderNo",staticClass:"thirdOrderNo",attrs:{label:"txid"},model:{value:t.filterForm.thirdOrderNo,callback:function(e){t.$set(t.filterForm,"thirdOrderNo","string"==typeof e?e.trim():e)},expression:"filterForm.thirdOrderNo"}}),t._v(" "),r("sac-input",{ref:"toAddr",staticClass:"inputBox",attrs:{label:"转出方用户编号"},model:{value:t.filterForm.fromUserId,callback:function(e){t.$set(t.filterForm,"fromUserId","string"==typeof e?e.trim():e)},expression:"filterForm.fromUserId"}}),t._v(" "),r("sac-input",{ref:"toAddr",staticClass:"inputBox",attrs:{label:"转入方用户编号"},model:{value:t.filterForm.toUserId,callback:function(e){t.$set(t.filterForm,"toUserId","string"==typeof e?e.trim():e)},expression:"filterForm.toUserId"}}),t._v(" "),r("sac-input",{ref:"toAddr",staticClass:"inputBox",attrs:{label:"转出方用户手机"},model:{value:t.filterForm.fromUserPhone,callback:function(e){t.$set(t.filterForm,"fromUserPhone","string"==typeof e?e.trim():e)},expression:"filterForm.fromUserPhone"}}),t._v(" "),r("sac-input",{ref:"toAddr",staticClass:"inputBox",attrs:{label:"转入方用户手机"},model:{value:t.filterForm.toUserPhone,callback:function(e){t.$set(t.filterForm,"toUserPhone","string"==typeof e?e.trim():e)},expression:"filterForm.toUserPhone"}}),t._v(" "),r("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(e){t.submitForm(1)}}})],1),t._v(" "),r("div",{staticClass:"moneyList"},t._l(t.moneyList,function(e,a){return r("el-tag",{key:a},[t._v(t._s(e.name)+"："+t._s(e.value))])})),t._v(" "),r("sac-table",{attrs:{data:t.listData.list}},[r("el-table-column",{attrs:{align:"center",prop:"tradeId",label:"序号"}}),t._v(" "),r("el-table-column",{attrs:{align:"center",prop:"fromUserPhone",label:"用户账号"}}),t._v(" "),r("el-table-column",{attrs:{align:"center",prop:"coinName",label:"币种",width:"90"}}),t._v(" "),r("el-table-column",{attrs:{prop:"tradeType",label:"交易类型",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("span",[t._v(t._s(t._f("convertTransactionType")(e.row.tradeType)))])]}}])}),t._v(" "),r("el-table-column",{attrs:{align:"center",prop:"merchantType",formatter:t.merchantType,label:"商户类型",width:"100"}}),t._v(" "),r("el-table-column",{attrs:{align:"center",prop:"amount",label:"转账金额"}}),t._v(" "),r("el-table-column",{attrs:{align:"center",prop:"tradeTime",label:"日期/时间"}}),t._v(" "),r("el-table-column",{attrs:{align:"center",prop:"toUserPhone",label:"对方账号"}}),t._v(" "),r("el-table-column",{attrs:{align:"center",prop:"tradeStatus",label:"状态",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("span",[t._v(t._s(t._f("transferQueryStatusType")(e.row.tradeStatus)))])]}}])})],1),t._v(" "),r("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}})],1)},staticRenderFns:[]};var i=r("VU/8")(s,o,!1,function(t){r("vXX5")},null,null);e.default=i.exports},vXX5:function(t,e){}});