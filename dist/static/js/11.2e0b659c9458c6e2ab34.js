webpackJsonp([11],{"4GB5":function(e,t){},EaCm:function(e,t,a){"use strict";a.d(t,"b",function(){return l}),a.d(t,"a",function(){return s}),a.d(t,"c",function(){return i});var r=a("lRwf"),l=(a.n(r),[{value:"",label:"全部"},{value:"inner",label:"个人互转"},{value:"msend",label:"转出商户"},{value:"mreceive",label:"转入商户"},{value:"csend",label:"链上转出"},{value:"creceive",label:"链上转入"}]),s=[{value:0,label:"审核告警"},{value:1,label:"上链告警"},{value:2,label:"到账延迟"}],i=[{value:"",label:"全部"},{value:"0",label:"失败"},{value:"1",label:"成功"},{value:"2",label:"待审核"},{value:"3",label:"审核不通过"},{value:"4",label:"审核通过"},{value:"5",label:"处理中"},{value:"7",label:"已发送"}]},m0eQ:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("EaCm"),l={name:"transfer-query",data:function(){return{alarmType:[],filterForm:{coinId:"",tradeType:"",alarmType:"",tradeStatus:"",thirdOrderNo:"",fromOrToUserPhone:"",startDate:"",endDate:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},selectedDate:[],transactionType:r.b,alarmConditionType:r.a,transferQueryStatus:r.c,isShowPayTime:!0,isShowTableCol:!0,isShowHandle:!0}},methods:{submitForm:function(e){this.filterForm.pageNum=e;var t=this.filterForm,a=t.tradeType,r=t.tradeStatus;this.isShowTableCol="creceive"!=a,this.isShowHandle="4"===r||"csend"===a||""===a&&""===r,"inner"==a?(this.isShowTableCol=!1,this.isShowPayTime=!1):(this.isShowPayTime=!0,this.isShowTableCol=!0),this.getTradeList()},getTradeList:function(){var e=this;this.filterForm.startDate=this.selectedDate&&this.selectedDate[0],this.filterForm.endDate=this.selectedDate&&this.selectedDate[1],this.filterForm.alarmType=this.alarmType.join(","),this.$http.post("wallet/backmgr/trade/getTradeList.do",this.filterForm).then(function(t){var a=t.result.retMap?t.result.retMap:t.result,r=a.list,l=a.total;e.listData.list=r,e.listData.total=l})},getPaginationChange:function(e,t){this.filterForm.pageSize=e,this.submitForm(t)},transferRecordHandle:function(e,t){var a=this,r=3==t?"取消操作：":"打币操作：";this.$http.post("wallet/backmgr/trade/operateTransferOutCoin.do",{recdId:e,recdStatus:t}).then(function(e){a.$message({message:""+r+e.msg,type:"success"});var t=a;setTimeout(function(){t.onSubmit()},1e3)})}},activated:function(){this.getTradeList()}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"transfer-query"},[a("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"80px",model:e.filterForm}},[a("sac-coin",{ref:"coinId",model:{value:e.filterForm.coinId,callback:function(t){e.$set(e.filterForm,"coinId",t)},expression:"filterForm.coinId"}}),e._v(" "),a("sac-select",{ref:"tradeType",attrs:{label:"交易类型",dataList:e.transactionType},model:{value:e.filterForm.tradeType,callback:function(t){e.$set(e.filterForm,"tradeType",t)},expression:"filterForm.tradeType"}}),e._v(" "),a("sac-select",{ref:"alarmType",attrs:{label:"告警情况",multiple:"",dataList:e.alarmConditionType},model:{value:e.alarmType,callback:function(t){e.alarmType=t},expression:"alarmType"}}),e._v(" "),a("sac-select",{ref:"tradeStatus",attrs:{label:"状　　态",dataList:e.transferQueryStatus},model:{value:e.filterForm.tradeStatus,callback:function(t){e.$set(e.filterForm,"tradeStatus",t)},expression:"filterForm.tradeStatus"}}),e._v(" "),a("sac-input",{ref:"fromOrToUserPhone",attrs:{label:"用户账号"},model:{value:e.filterForm.fromOrToUserPhone,callback:function(t){e.$set(e.filterForm,"fromOrToUserPhone","string"==typeof t?t.trim():t)},expression:"filterForm.fromOrToUserPhone"}}),e._v(" "),a("sac-date",{ref:"selectedDate",attrs:{label:"日　　期"},model:{value:e.selectedDate,callback:function(t){e.selectedDate=t},expression:"selectedDate"}}),e._v(" "),a("sac-input",{ref:"thirdOrderNo",attrs:{label:"txid"},model:{value:e.filterForm.thirdOrderNo,callback:function(t){e.$set(e.filterForm,"thirdOrderNo","string"==typeof t?t.trim():t)},expression:"filterForm.thirdOrderNo"}}),e._v(" "),a("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(t){e.submitForm(1)}}})],1),e._v(" "),a("sac-table",{attrs:{data:e.listData.list}},[a("el-table-column",{attrs:{prop:"tradeId",label:"序号","min-width":"163",fixed:"left"}}),e._v(" "),a("el-table-column",{attrs:{label:"收款方","min-width":"123"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.toUserPhone?a("span",[e._v(e._s(t.row.toUserPhone))]):a("span",[e._v(e._s(t.row.targetCoinAddr))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"付款方","min-width":"123"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.fromUserPhone?a("span",[e._v(e._s(t.row.fromUserPhone))]):a("span",[e._v(e._s(t.row.fromAddr))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"coinName",label:"币种","min-width":"60"}}),e._v(" "),a("el-table-column",{attrs:{prop:"tradeType",label:"交易类型","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("convertTransactionType")(t.row.tradeType)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"amount",label:"转账金额","min-width":"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"thirdOrderNo",label:"txid","min-width":"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"confirmTime",label:"到账时间","min-width":"153"}}),e._v(" "),e.isShowPayTime?a("div",[a("el-table-column",{attrs:{prop:"payTime",label:"上链时间","min-width":"153"}})],1):e._e(),e._v(" "),a("el-table-column",{attrs:{prop:"alarmType",label:"时间告警","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{color:"red"}},[e._v(e._s(t.row.alarmType))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"",width:"0"}}),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.isShowTableCol,expression:"isShowTableCol"}],key:"isShowTableCol"},[a("el-table-column",{attrs:{prop:"tradeTime",label:"创建时间","min-width":"153"}}),e._v(" "),a("el-table-column",{attrs:{prop:"auditTime",label:"审核时间","min-width":"153"}}),e._v(" "),a("el-table-column",{attrs:{prop:"sysRemark",label:"备注","min-width":"150"}})],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.isShowHandle,expression:"isShowHandle"}],key:"isShowHandle"},[a("el-table-column",{attrs:{label:"操作","min-width":"150",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"danger",disabled:4!=t.row.tradeStatus||"csend"!=t.row.tradeType,size:"small"},nativeOn:{click:function(a){e.transferRecordHandle(t.row.tradeId,4)}}},[e._v("打币\n          ")]),e._v(" "),a("el-button",{attrs:{type:"primary",disabled:4!=t.row.tradeStatus||"csend"!=t.row.tradeType,size:"small"},nativeOn:{click:function(a){e.transferRecordHandle(t.row.tradeId,3)}}},[e._v("取消\n          ")])]}}])})],1),e._v(" "),a("el-table-column",{attrs:{label:"状态","min-width":"110",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[0===t.row.tradeStatus?a("el-tag",{attrs:{type:"info"}},[e._v("失败")]):e._e(),e._v(" "),1===t.row.tradeStatus?a("el-tag",{attrs:{type:"success"}},[e._v("成功")]):e._e(),e._v(" "),2===t.row.tradeStatus?a("el-tag",[e._v("待审核")]):e._e(),e._v(" "),3===t.row.tradeStatus?a("el-tag",{attrs:{type:"warning"}},[e._v("审核不通过")]):e._e(),e._v(" "),4===t.row.tradeStatus?a("el-tag",{attrs:{type:"danger"}},[e._v("审核通过")]):e._e(),e._v(" "),5===t.row.tradeStatus?a("el-tag",[e._v("处理中")]):e._e(),e._v(" "),7===t.row.tradeStatus?a("el-tag",[e._v("已发送")]):e._e()]}}])})],1),e._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.filterForm.pageSize,"current-page":e.filterForm.pageNum},on:{handleChange:e.getPaginationChange}})],1)},staticRenderFns:[]};var i=a("VU/8")(l,s,!1,function(e){a("4GB5")},null,null);t.default=i.exports}});
//# sourceMappingURL=11.2e0b659c9458c6e2ab34.js.map