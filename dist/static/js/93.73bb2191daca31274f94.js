webpackJsonp([93],{"26vf":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("s0MJ"),s=a("EaCm"),l={name:"statements",data:function(){return{filterForm:{coinId:"",fromOrToUserPhone:"",teamType:"-1",startDate:"",endDate:"",toAddr:"",fromUserPhone:"",toUserPhone:"",thirdOrderNo:"",tradeType:"",tradeStatus:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},moneyList:[],selectedDate:[],transactionType:s.e,transferQueryStatus:s.f,isContent:!1}},methods:{submitForm:function(t){this.filterForm.pageNum=t;var e=this.filterForm,a=e.tradeType,r=e.tradeStatus;this.isShowTableCol="creceive"!=a,this.isShowHandle="4"===r||"csend"===a||""===a&&""===r,"inner"==a?(this.isShowTableCol=!1,this.isShowPayTime=!1):(this.isShowPayTime=!0,this.isShowTableCol=!0),this.getbill()},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.submitForm(e)},getbill:function(){var t=this;this.filterForm.startDate=this.selectedDate&&this.selectedDate[0],this.filterForm.endDate=this.selectedDate&&this.selectedDate[1],this.$http.post("wallet/backmgr/trade/getbill",this.filterForm).then(function(e){var a=e.result.retMap,r=a.list,s=a.total;t.listData.list=r,t.listData.total=s;var l=[];e.result.sumData.length&&(e.result.sumData.length>1?(l=[],t.moneyList=[{name:"全部",value:0}]):(l=e.result.sumData[0],t.moneyList=[{name:"转入",value:l.inSumAmount||0},{name:"转出",value:l.outSumAmount||0},{name:"余额",value:l.sunAmount||0}]))})},merchantType:function(t,e){return"person"==t.merchantType?"个人":t.merchantType},changeContent:function(){this.isContent=!this.isContent}},activated:function(){var t=Object(r.a)(),e=Object(r.a)((new Date).getTime()-1296e6);this.selectedDate=[e,t],this.getbill()}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"statements"},[a("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"120px",model:t.filterForm}},[a("div",{staticClass:"sac-collapse"},[a("div",{staticClass:"title"},[a("sac-coin",{ref:"coinId",model:{value:t.filterForm.coinId,callback:function(e){t.$set(t.filterForm,"coinId",e)},expression:"filterForm.coinId"}}),t._v(" "),a("sac-teamType",{ref:"teamType",model:{value:t.filterForm.teamType,callback:function(e){t.$set(t.filterForm,"teamType",e)},expression:"filterForm.teamType"}}),t._v(" "),a("sac-select",{ref:"tradeType",attrs:{label:"交易类型",dataList:t.transactionType},model:{value:t.filterForm.tradeType,callback:function(e){t.$set(t.filterForm,"tradeType",e)},expression:"filterForm.tradeType"}}),t._v(" "),a("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(e){return t.submitForm(1)}}}),t._v(" "),a("span",{staticClass:"changeContent",on:{click:t.changeContent}},[t._v("\n          "+t._s(t.isContent?"合并":"展开")+"\n           "),a("i",{class:{"el-icon-arrow-right":!t.isContent,"el-icon-arrow-down":t.isContent}})])],1),t._v(" "),a("div",{staticClass:"content",class:{"is-active":t.isContent}},[a("sac-input",{ref:"fromOrToUserPhone",staticClass:"inputBox",attrs:{label:"用户账号"},model:{value:t.filterForm.fromOrToUserPhone,callback:function(e){t.$set(t.filterForm,"fromOrToUserPhone","string"==typeof e?e.trim():e)},expression:"filterForm.fromOrToUserPhone"}}),t._v(" "),a("sac-input",{ref:"toAddr",staticClass:"inputBox",attrs:{label:"交易地址"},model:{value:t.filterForm.toAddr,callback:function(e){t.$set(t.filterForm,"toAddr","string"==typeof e?e.trim():e)},expression:"filterForm.toAddr"}}),t._v(" "),a("sac-input",{ref:"thirdOrderNo",staticClass:"thirdOrderNo",attrs:{label:"txid"},model:{value:t.filterForm.thirdOrderNo,callback:function(e){t.$set(t.filterForm,"thirdOrderNo","string"==typeof e?e.trim():e)},expression:"filterForm.thirdOrderNo"}}),t._v(" "),a("sac-input",{ref:"toAddr",staticClass:"inputBox",attrs:{label:"付款账号"},model:{value:t.filterForm.fromUserPhone,callback:function(e){t.$set(t.filterForm,"fromUserPhone","string"==typeof e?e.trim():e)},expression:"filterForm.fromUserPhone"}}),t._v(" "),a("sac-input",{ref:"toAddr",staticClass:"inputBox",attrs:{label:"收款账号"},model:{value:t.filterForm.toUserPhone,callback:function(e){t.$set(t.filterForm,"toUserPhone","string"==typeof e?e.trim():e)},expression:"filterForm.toUserPhone"}}),t._v(" "),a("sac-date",{ref:"selectedDate",attrs:{label:"日　　期"},model:{value:t.selectedDate,callback:function(e){t.selectedDate=e},expression:"selectedDate"}})],1)])]),t._v(" "),a("div",{staticClass:"moneyList"},t._l(t.moneyList,function(e,r){return a("el-tag",{key:r},[t._v(t._s(e.name)+"："+t._s(e.value))])}),1),t._v(" "),a("sac-table",{attrs:{data:t.listData.list}},[a("el-table-column",{attrs:{align:"center",prop:"tradeId",label:"序号"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"fromUserPhone",label:"用户账号"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"coinName",label:"币种",width:"90"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tradeType",label:"交易类型",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("convertTransactionType")(e.row.tradeType)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"merchantType",formatter:t.merchantType,label:"商户类型",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"amount",label:"转账金额"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"tradeTime",label:"日期/时间"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"toUserPhone",label:"对方账号"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"tradeStatus",label:"状态",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("transferQueryStatusType")(e.row.tradeStatus)))])]}}])})],1),t._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}})],1)},staticRenderFns:[]};var n=a("VU/8")(l,i,!1,function(t){a("hw+X")},null,null);e.default=n.exports},"hw+X":function(t,e){}});