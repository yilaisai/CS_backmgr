webpackJsonp([40],{"33GM":function(e,a){},"87/h":function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var l={data:function(){return{detaileData:{},detaile:[],tradeStatus:{1:"未付款",2:"已付款(等待放行)",3:"已完成",4:"人为取消",5:"申诉中",6:"申诉后完成交易",7:"申诉后取消交易",8:"支付超时取消"},payTypeMap:{1:"银行卡",2:"支付宝",3:"微信",4:"宝转卡"},payList:{},dialogVisible:!1}},activated:function(){this.getData(this.$route.query.tradeId)},mounted:function(){},methods:{discountDetaile:function(){this.dialogVisible=!0,this.getInviteRewardCoinChange()},getInviteRewardCoinChange:function(){var e=this;this.detaile=[],this.$http.post("/wallet/invite/backmgr/getInviteRewardCoinChange",{recdId:this.detaileData.tradeId,pageNum:1,pageSize:1e3}).then(function(a){e.detaile=a.result.list})},getData:function(e){var a=this;this.$http.post("/wallet/backmgr/merchant/queryMerchantTradeInfo",{tradeId:e}).then(function(e){200==e.code&&(a.detaileData=e.result.otcApiTradeInfoEx,a.payList=e.result.payList[0])})}},watch:{},computed:{}},i={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"tradingFlowDetaile-page"},[t("div",{staticClass:"main"},[t("div",[t("h3",[e._v("订单信息")]),e._v(" "),t("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.detaileData,size:"small"}},[t("el-form-item",{attrs:{label:"单号:"}},[t("el-input",{attrs:{disabled:""},model:{value:e.detaileData.tradeId,callback:function(a){e.$set(e.detaileData,"tradeId",a)},expression:"detaileData.tradeId"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"类型:"}},[t("el-input",{attrs:{value:3==e.detaileData.advType?"抢单兑出":4==e.detaileData.advType?"抢单兑入":5==e.detaileData.advType?" 派单兑入 ":"派单兑出",disabled:""}})],1),e._v(" "),4!=e.detaileData.advType&&5!=e.detaileData.advType?t("el-form-item",{attrs:{label:"平台审核意见:"}},[t("el-input",{attrs:{disabled:""}})],1):e._e(),e._v(" "),t("el-form-item",{attrs:{label:"币种:"}},[t("el-input",{attrs:{value:e.detaileData.coinName,disabled:""}})],1),e._v(" "),t("el-form-item",{attrs:{label:"状态"}},[t("el-input",{attrs:{value:e.tradeStatus[e.detaileData.tradeStatus],disabled:""}})],1)],1),e._v(" "),t("h3",[e._v("交易方")]),e._v(" "),t("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.detaileData,"label-width":"120px",size:"small"}},[t("el-form-item",{attrs:{label:"商户账户:"}},[t("el-input",{attrs:{disabled:""},model:{value:e.detaileData.takerPhone,callback:function(a){e.$set(e.detaileData,"takerPhone",a)},expression:"detaileData.takerPhone"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"商户用户编号:"}},[t("el-input",{attrs:{disabled:""},model:{value:e.detaileData.takerName,callback:function(a){e.$set(e.detaileData,"takerName",a)},expression:"detaileData.takerName"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"商户appid:"}},[t("el-input",{attrs:{disabled:""},model:{value:e.detaileData.appId,callback:function(a){e.$set(e.detaileData,"appId",a)},expression:"detaileData.appId"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"商户apiUserId:"}},[t("el-input",{attrs:{value:e.detaileData.apiUserId,disabled:""}})],1),e._v(" "),t("el-form-item",{attrs:{label:"商户订单号:"}},[t("el-input",{attrs:{disabled:""},model:{value:e.detaileData.apiTradeId,callback:function(a){e.$set(e.detaileData,"apiTradeId",a)},expression:"detaileData.apiTradeId"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"承兑商账户:"}},[t("el-input",{attrs:{disabled:""},model:{value:e.detaileData.makerPhone,callback:function(a){e.$set(e.detaileData,"makerPhone",a)},expression:"detaileData.makerPhone"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"承兑商用户编号:"}},[t("el-input",{attrs:{disabled:""},model:{value:e.detaileData.makerName,callback:function(a){e.$set(e.detaileData,"makerName",a)},expression:"detaileData.makerName"}})],1)],1),e._v(" "),t("h3",[e._v("订单金额")]),e._v(" "),t("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.detaileData,size:"small"}},[t("el-form-item",{attrs:{label:"价格:"}},[t("el-input",{attrs:{disabled:""},model:{value:e.detaileData.makerPrice,callback:function(a){e.$set(e.detaileData,"makerPrice",a)},expression:"detaileData.makerPrice"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"数量:"}},[t("el-input",{attrs:{value:e.detaileData.makerAmount+e.detaileData.coinName,disabled:""}})],1),e._v(" "),t("el-form-item",{attrs:{label:"金额:"}},[t("el-input",{attrs:{disabled:""},model:{value:e.detaileData.amount,callback:function(a){e.$set(e.detaileData,"amount",a)},expression:"detaileData.amount"}})],1),e._v(" "),4==e.detaileData.advType||5==e.detaileData.advType?t("el-form-item",{attrs:{label:"商户到账数量:"}},[3==e.detaileData.tradeStatus||6==e.detaileData.tradeStatus?t("el-input",{attrs:{value:e.detaileData.takerAmount,disabled:""}}):t("el-input",{attrs:{value:"--",disabled:""}})],1):t("el-form-item",{attrs:{label:"商户支付数量:"}},[t("el-input",{attrs:{value:e.detaileData.takerAmount,disabled:""}})],1),e._v(" "),t("el-form-item",{attrs:{label:"手续费:"}},[t("el-input",{attrs:{value:e.detaileData.fee+e.detaileData.coinName,disabled:""}})],1)],1),e._v(" "),t("h3",[e._v("交易奖励")]),e._v(" "),t("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.detaileData,size:"small"}},[t("el-form-item",{staticClass:"big",attrs:{label:"商户方奖励:"}},[t("el-input",{attrs:{value:"直接 0"+e.detaileData.coinName+", 间接 0"+e.detaileData.coinName,disabled:""}})],1),e._v(" "),t("el-form-item",{attrs:{label:"承兑商方折扣:"}},[t("el-button",{on:{click:e.discountDetaile}},[e._v("查看详情")])],1),e._v(" "),t("el-form-item",{attrs:{label:"平台盈利:"}},[3==e.detaileData.tradeStatus||6==e.detaileData.tradeStatus?t("el-input",{attrs:{value:e.detaileData.sysEarn,disabled:""}},[t("el-button",{attrs:{slot:"append"},slot:"append"},[e._v(e._s(e.detaileData.coinName))])],1):t("el-input",{attrs:{value:"--",disabled:""}})],1)],1),e._v(" "),t("h3",[e._v("收款信息")]),e._v(" "),t("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.detaileData,size:"small"}},[t("el-form-item",{attrs:{label:"收款人:"}},[t("el-input",{attrs:{value:e.payList.userName,disabled:""}})],1),e._v(" "),t("el-form-item",{attrs:{label:"收款方式:"}},[t("el-input",{attrs:{value:e._f("payTypeFilter")(e.payList.payType),disabled:""}})],1),e._v(" "),t("el-form-item",{attrs:{label:"收款账号:"}},[t("el-input",{attrs:{value:e.payList.num,disabled:""}})],1),e._v(" "),t("el-form-item",{attrs:{label:"付款图片:"}},[t("el-image",{staticStyle:{width:"100px",height:"100px"},attrs:{src:e.payList.qrcode,"preview-src-list":[e.payList.qrcode]}})],1)],1),e._v(" "),t("h3",[e._v("时间信息")]),e._v(" "),t("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.detaileData,size:"small"}},[t("el-form-item",{attrs:{label:"发起时间:"}},[t("el-input",{attrs:{value:e.$fmtDate(e.detaileData.createTime,"full"),disabled:""}})],1),e._v(" "),e.detaileData.payTime?t("el-form-item",{attrs:{label:"付款时间:"}},[t("el-input",{attrs:{value:e.$fmtDate(e.detaileData.payTime,"full"),disabled:""}})],1):e._e(),e._v(" "),e.detaileData.letgoTime?t("el-form-item",{attrs:{label:"确认时间:"}},[t("el-input",{attrs:{value:e.$fmtDate(e.detaileData.letgoTime,"full"),disabled:""}})],1):e._e()],1),e._v(" "),t("h3",[e._v("位置信息")]),e._v(" "),t("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.detaileData,size:"small"}},[t("el-form-item",{attrs:{label:"发起IP:"}},[t("el-input",{attrs:{value:e.detaileData.takerIP,disabled:""}})],1),e._v(" "),t("el-form-item",{attrs:{label:"承兑IP:"}},[t("el-input",{attrs:{value:e.detaileData.makerIP,disabled:""}})],1)],1)],1)]),e._v(" "),t("el-dialog",{attrs:{title:"折扣详情",visible:e.dialogVisible,width:"800px"},on:{"update:visible":function(a){e.dialogVisible=a}}},[t("el-table",{attrs:{border:"",size:"mini",data:e.detaile}},[t("el-table-column",{attrs:{prop:"phone",label:"手机号",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"nickName",label:"昵称",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"rate",label:"返佣比例",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v("\n\t\t\t\t\t"+e._s(Math.floor(1e4*a.row.rate)/100)+"%\n\t\t\t\t")]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"amount",label:"返佣",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"createTimestamp",label:"时间",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v("\n\t\t\t\t\t"+e._s(e.$fmtDate(a.row.createTimestamp,"full"))+"\n\t\t\t\t")]}}])})],1)],1)],1)},staticRenderFns:[]};var s=t("C7Lr")(l,i,!1,function(e){t("33GM")},"data-v-c3b20d96",null);a.default=s.exports}});