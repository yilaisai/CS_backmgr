webpackJsonp([32],{bvF5:function(t,e){},m0eQ:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("EaCm"),s=a("s0MJ"),i={name:"transfer-query",data:function(){return{alarmType:[],filterForm:{coinId:"",tradeType:"",alarmType:"",tradeStatus:"",thirdOrderNo:"",fromOrToUserPhone:"",startDate:"",endDate:"",toAddr:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},selectedDate:[],transactionType:r.c,alarmConditionType:r.a,transferQueryStatus:r.d,isShowPayTime:!0,isShowTableCol:!0,isShowHandle:!0,isContent:!1,isActive:!1}},methods:{submitForm:function(t){this.filterForm.pageNum=t;var e=this.filterForm,a=e.tradeType,r=e.tradeStatus;this.isShowTableCol="creceive"!=a,this.isShowHandle="4"===r||"csend"===a||""===a&&""===r,"inner"==a?(this.isShowTableCol=!1,this.isShowPayTime=!1):(this.isShowPayTime=!0,this.isShowTableCol=!0),this.getTradeList()},getTradeList:function(){var t=this;this.filterForm.startDate=this.selectedDate&&this.selectedDate[0],this.filterForm.endDate=this.selectedDate&&this.selectedDate[1],this.filterForm.alarmType=this.alarmType.join(","),this.$http.post("wallet/backmgr/trade/getTradeList.do",this.filterForm).then(function(e){var a=e.result.retMap?e.result.retMap:e.result,r=a.list,s=a.total;t.listData.list=r,t.listData.total=s})},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.submitForm(e)},transferRecordHandle:function(t,e){var a=this,r=3==e?"取消操作：":"打币操作：";this.$http.post("wallet/backmgr/trade/operateTransferOutCoin.do",{recdId:t,recdStatus:e}).then(function(t){a.$message({message:""+r+t.msg,type:"success"});var e=a;setTimeout(function(){e.onSubmit()},1e3)})},changeContent:function(){this.isContent=!this.isContent,this.isContent&&(this.isActive=window.outerWidth>1584)}},activated:function(){var t=Object(s.a)(new Date,"YYYY-MM-DD HH:mm:ss"),e=Object(s.a)((new Date).getTime()-2592e6,"YYYY-MM-DD HH:mm:ss");this.selectedDate=[e,t],this.getTradeList()}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"transfer-query"},[a("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"80px"}},[a("div",{staticClass:"sac-collapse"},[a("div",{staticClass:"title"},[a("sac-coin",{ref:"coinId",model:{value:t.filterForm.coinId,callback:function(e){t.$set(t.filterForm,"coinId",e)},expression:"filterForm.coinId"}}),t._v(" "),a("sac-select",{ref:"tradeType",attrs:{label:"交易类型",dataList:t.transactionType},model:{value:t.filterForm.tradeType,callback:function(e){t.$set(t.filterForm,"tradeType",e)},expression:"filterForm.tradeType"}}),t._v(" "),a("sac-select",{ref:"tradeStatus",attrs:{label:"状　　态",dataList:t.transferQueryStatus},model:{value:t.filterForm.tradeStatus,callback:function(e){t.$set(t.filterForm,"tradeStatus",e)},expression:"filterForm.tradeStatus"}}),t._v(" "),a("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(e){t.submitForm(1)}}}),t._v(" "),a("span",{staticClass:"changeContent",on:{click:t.changeContent}},[t._v("\n          "+t._s(t.isContent?"合并":"展开")+"\n           "),a("i",{class:{"el-icon-arrow-right":!t.isContent,"el-icon-arrow-down":t.isContent}})])],1),t._v(" "),a("div",{staticClass:"content",class:{"is-active2":t.isContent&t.isActive,"is-active1":t.isContent&!t.isActive}},[a("sac-input",{ref:"fromOrToUserPhone",attrs:{label:"用户账号"},model:{value:t.filterForm.fromOrToUserPhone,callback:function(e){t.$set(t.filterForm,"fromOrToUserPhone","string"==typeof e?e.trim():e)},expression:"filterForm.fromOrToUserPhone"}}),t._v(" "),a("el-form-item",{ref:"selectedDate",staticClass:"sac-date",attrs:{label:"日　　期"}},[a("el-date-picker",{attrs:{editable:!1,type:"datetimerange",align:"center",size:"small","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:t.selectedDate,callback:function(e){t.selectedDate=e},expression:"selectedDate"}})],1),t._v(" "),a("sac-input",{ref:"thirdOrderNo",staticClass:"thirdOrderNo",attrs:{label:"txid"},model:{value:t.filterForm.thirdOrderNo,callback:function(e){t.$set(t.filterForm,"thirdOrderNo","string"==typeof e?e.trim():e)},expression:"filterForm.thirdOrderNo"}}),t._v(" "),a("sac-input",{ref:"toAddr",staticClass:"toAddr",attrs:{label:"交易地址"},model:{value:t.filterForm.toAddr,callback:function(e){t.$set(t.filterForm,"toAddr","string"==typeof e?e.trim():e)},expression:"filterForm.toAddr"}}),t._v(" "),a("sac-select",{ref:"alarmType",staticClass:"alarmType",attrs:{label:"告警情况",multiple:"",dataList:t.alarmConditionType},model:{value:t.alarmType,callback:function(e){t.alarmType=e},expression:"alarmType"}})],1)])]),t._v(" "),a("sac-table",{attrs:{data:t.listData.list}},[a("el-table-column",{attrs:{prop:"tradeId",label:"序号","min-width":"163",fixed:"left"}}),t._v(" "),a("el-table-column",{attrs:{label:"收款方","min-width":"123"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.toUserPhone?a("span",[t._v(t._s(e.row.toUserPhone))]):a("span",[t._v(t._s(e.row.targetCoinAddr))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"付款方","min-width":"123"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.fromUserPhone?a("span",[t._v(t._s(e.row.fromUserPhone))]):a("span",[t._v(t._s(e.row.fromAddr))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"coinName",label:"币种","min-width":"60"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tradeType",label:"交易类型","min-width":"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("convertTransactionType")(e.row.tradeType)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"amount",label:"转账金额","min-width":"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"thirdOrderNo",label:"txid","min-width":"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"confirmTime",label:"到账时间","min-width":"153"}}),t._v(" "),t.isShowPayTime?a("div",[a("el-table-column",{attrs:{prop:"payTime",label:"上链时间","min-width":"153"}})],1):t._e(),t._v(" "),a("el-table-column",{attrs:{prop:"alarmType",label:"时间告警","min-width":"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticStyle:{color:"red"}},[t._v(t._s(e.row.alarmType))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"",width:"0"}}),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowTableCol,expression:"isShowTableCol"}],key:"isShowTableCol"},[a("el-table-column",{attrs:{prop:"tradeTime",label:"创建时间","min-width":"153"}}),t._v(" "),a("el-table-column",{attrs:{prop:"auditTime",label:"审核时间","min-width":"153"}}),t._v(" "),a("el-table-column",{attrs:{prop:"sysRemark",label:"备注","min-width":"150"}})],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowHandle,expression:"isShowHandle"}],key:"isShowHandle"},[a("el-table-column",{attrs:{label:"操作","min-width":"150",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"danger",disabled:4!=e.row.tradeStatus||"csend"!=e.row.tradeType,size:"small"},nativeOn:{click:function(a){t.transferRecordHandle(e.row.tradeId,4)}}},[t._v("打币\n          ")]),t._v(" "),a("el-button",{attrs:{type:"primary",disabled:4!=e.row.tradeStatus||"csend"!=e.row.tradeType,size:"small"},nativeOn:{click:function(a){t.transferRecordHandle(e.row.tradeId,3)}}},[t._v("取消\n          ")])]}}])})],1),t._v(" "),a("el-table-column",{attrs:{label:"状态","min-width":"110",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.tradeStatus?a("el-tag",{attrs:{type:"info"}},[t._v("失败")]):t._e(),t._v(" "),1===e.row.tradeStatus?a("el-tag",{attrs:{type:"success"}},[t._v("成功")]):t._e(),t._v(" "),2===e.row.tradeStatus?a("el-tag",[t._v("待审核")]):t._e(),t._v(" "),3===e.row.tradeStatus?a("el-tag",{attrs:{type:"warning"}},[t._v("审核不通过")]):t._e(),t._v(" "),4===e.row.tradeStatus?a("el-tag",{attrs:{type:"danger"}},[t._v("审核通过")]):t._e(),t._v(" "),5===e.row.tradeStatus?a("el-tag",[t._v("处理中")]):t._e(),t._v(" "),6===e.row.tradeStatus?a("el-tag",[t._v("已支付")]):t._e(),t._v(" "),7===e.row.tradeStatus?a("el-tag",[t._v("已发送")]):t._e()]}}])})],1),t._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}})],1)},staticRenderFns:[]};var o=a("VU/8")(i,l,!1,function(t){a("bvF5")},null,null);e.default=o.exports}});