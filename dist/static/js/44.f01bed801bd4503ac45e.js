webpackJsonp([44],{D3Tc:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"tradingFlowDetaile-page"},[a("div",{staticClass:"main"},[a("div",[a("h3",[e._v("订单信息")]),e._v(" "),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.detaileData,size:"small"}},[a("el-form-item",{attrs:{label:"单号:"}},[a("el-input",{attrs:{disabled:""},model:{value:e.detaileData.tradeId,callback:function(t){e.$set(e.detaileData,"tradeId",t)},expression:"detaileData.tradeId"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"类型:"}},[a("el-input",{attrs:{value:3==e.detaileData.advType?"抢单兑出":4==e.detaileData.advType?"抢单兑入":5==e.detaileData.advType?" 派单兑入 ":"派单兑出",disabled:""}})],1),e._v(" "),4!=e.detaileData.advType&&5!=e.detaileData.advType?a("el-form-item",{attrs:{label:"平台审核意见:"}},[a("el-input",{attrs:{disabled:""}})],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"币种:"}},[a("el-input",{attrs:{value:e.detaileData.coinName,disabled:""}})],1),e._v(" "),a("el-form-item",{attrs:{label:"状态"}},[a("el-input",{attrs:{value:e.tradeStatus[e.detaileData.tradeStatus],disabled:""}})],1),e._v(" "),a("el-form-item",{attrs:{label:"订单流转记录"}},[a("el-button",{attrs:{size:"mini"},on:{click:e.queryTradeOptList}},[e._v("查看")])],1)],1),e._v(" "),a("h3",[e._v("交易方")]),e._v(" "),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.detaileData,"label-width":"120px",size:"small"}},[a("el-form-item",{attrs:{label:"商户账户:"}},[a("el-input",{attrs:{disabled:""},model:{value:e.detaileData.takerPhone,callback:function(t){e.$set(e.detaileData,"takerPhone",t)},expression:"detaileData.takerPhone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商户用户编号:"}},[a("el-input",{attrs:{disabled:""},model:{value:e.detaileData.takerName,callback:function(t){e.$set(e.detaileData,"takerName",t)},expression:"detaileData.takerName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商户appid:"}},[a("el-input",{attrs:{disabled:""},model:{value:e.detaileData.appId,callback:function(t){e.$set(e.detaileData,"appId",t)},expression:"detaileData.appId"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商户apiUserId:"}},[a("el-input",{attrs:{value:e.detaileData.apiUserId,disabled:""}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商户订单号:"}},[a("el-input",{attrs:{disabled:""},model:{value:e.detaileData.apiTradeId,callback:function(t){e.$set(e.detaileData,"apiTradeId",t)},expression:"detaileData.apiTradeId"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"交易员账户:"}},[a("el-input",{attrs:{disabled:""},model:{value:e.detaileData.makerPhone,callback:function(t){e.$set(e.detaileData,"makerPhone",t)},expression:"detaileData.makerPhone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"交易员用户编号:"}},[a("el-input",{attrs:{disabled:""},model:{value:e.detaileData.makerName,callback:function(t){e.$set(e.detaileData,"makerName",t)},expression:"detaileData.makerName"}})],1)],1),e._v(" "),a("h3",[e._v("订单金额")]),e._v(" "),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.detaileData,size:"small"}},[a("el-form-item",{attrs:{label:"价格:"}},[a("el-input",{attrs:{disabled:""},model:{value:e.detaileData.makerPrice,callback:function(t){e.$set(e.detaileData,"makerPrice",t)},expression:"detaileData.makerPrice"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"数量:"}},[a("el-input",{attrs:{value:e.detaileData.makerAmount+e.detaileData.coinName,disabled:""}})],1),e._v(" "),a("el-form-item",{attrs:{label:"金额:"}},[a("el-input",{attrs:{disabled:""},model:{value:e.detaileData.amount,callback:function(t){e.$set(e.detaileData,"amount",t)},expression:"detaileData.amount"}})],1),e._v(" "),4==e.detaileData.advType||5==e.detaileData.advType?a("el-form-item",{attrs:{label:"商户到账数量:"}},[3==e.detaileData.tradeStatus||6==e.detaileData.tradeStatus?a("el-input",{attrs:{value:e.detaileData.takerAmount,disabled:""}}):a("el-input",{attrs:{value:"--",disabled:""}})],1):a("el-form-item",{attrs:{label:"商户支付数量:"}},[a("el-input",{attrs:{value:e.detaileData.takerAmount,disabled:""}})],1),e._v(" "),a("el-form-item",{attrs:{label:"手续费:"}},[a("el-input",{attrs:{value:e.detaileData.fee+e.detaileData.coinName,disabled:""}})],1)],1),e._v(" "),a("h3",[e._v("交易奖励")]),e._v(" "),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.detaileData,size:"small"}},[a("el-form-item",{attrs:{label:"交易员方折扣:"}},[a("el-button",{on:{click:e.discountDetaile}},[e._v("查看详情")])],1),e._v(" "),a("el-form-item",{attrs:{label:"平台盈利:"}},[3==e.detaileData.tradeStatus||6==e.detaileData.tradeStatus?a("el-input",{attrs:{value:e.detaileData.sysEarn,disabled:""}},[a("el-button",{attrs:{slot:"append"},slot:"append"},[e._v(e._s(e.detaileData.coinName))])],1):a("el-input",{attrs:{value:"--",disabled:""}})],1),e._v(" "),a("el-form-item",{attrs:{label:"撮合费:"}},[a("el-input",{attrs:{value:e.detaileData.couplingFee,disabled:""}})],1),e._v(" "),4==e.detaileData.advType||5==e.detaileData.advType?a("el-form-item",{attrs:{label:"返佣状态:"}},[a("el-input",{attrs:{value:1==e.detaileData.isReward?"已发佣金":2==e.detaileData.isReward?"已扣除佣金":3==e.detaileData.isReward?"激活未返佣":"未发佣金",disabled:""}})],1):e._e(),e._v(" "),(4==e.detaileData.advType||5==e.detaileData.advType)&&2==e.detaileData.isReward||3==e.detaileData.isReward?a("el-form-item",[a("el-button",{attrs:{type:"primary",plain:""},on:{click:e.fetchReward}},[e._v("补发返佣")])],1):e._e()],1),e._v(" "),a("h3",[e._v("收款信息")]),e._v(" "),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.detaileData,size:"small"}},[a("el-form-item",{attrs:{label:"收款人:"}},[a("el-input",{attrs:{value:e.payList.userName,disabled:""}})],1),e._v(" "),a("el-form-item",{attrs:{label:"收款方式:"}},[a("el-input",{attrs:{value:e._f("payTypeFilter")(e.payList.payType),disabled:""}})],1),e._v(" "),a("el-form-item",{attrs:{label:"收款账号:"}},[a("el-input",{attrs:{value:e.payList.num,disabled:""}})],1),e._v(" "),6==e.detaileData.advType||3==e.detaileData.advType?a("el-form-item",{staticClass:"special",attrs:{label:"付款图片:"}},[e.detaileData.paymentPhoto?a("el-image",{attrs:{src:e.detaileData.paymentPhoto.split(",")[0],"preview-src-list":e.detaileData.paymentPhoto.split(",")}}):e._e(),e._v(" "),e.detaileData.paymentPhoto?a("el-button",{staticStyle:{"vertical-align":"top"},attrs:{size:"mini",type:"danger"},on:{click:e.resetTradeStatus}},[e._v("重置")]):e._e()],1):e._e()],1),e._v(" "),a("h3",[e._v("时间信息")]),e._v(" "),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.detaileData,size:"small"}},[a("el-form-item",{attrs:{label:"发起时间:"}},[a("el-input",{attrs:{value:e.$fmtDate(e.detaileData.createTime,"full"),disabled:""}})],1),e._v(" "),e.detaileData.payTime?a("el-form-item",{attrs:{label:"付款时间:"}},[a("el-input",{attrs:{value:e.$fmtDate(e.detaileData.payTime,"full"),disabled:""}})],1):e._e(),e._v(" "),e.detaileData.letgoTime?a("el-form-item",{attrs:{label:"确认时间:"}},[a("el-input",{attrs:{value:e.$fmtDate(e.detaileData.letgoTime,"full"),disabled:""}})],1):e._e()],1),e._v(" "),a("h3",[e._v("位置信息")]),e._v(" "),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.detaileData,size:"small"}},[a("el-form-item",{attrs:{label:"发起IP:"}},[a("el-input",{attrs:{value:e.detaileData.takerIP,disabled:""}})],1),e._v(" "),a("el-form-item",{attrs:{label:"承兑IP:"}},[a("el-input",{attrs:{value:e.detaileData.makerIP,disabled:""}})],1)],1)],1)]),e._v(" "),a("el-dialog",{attrs:{title:"折扣详情",visible:e.dialogVisible,width:"800px"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-table",{attrs:{border:"",size:"mini",data:e.detaile}},[a("el-table-column",{attrs:{prop:"phone",label:"手机号",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"nickName",label:"昵称",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"rate",label:"返佣比例",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n\t\t\t\t\t"+e._s(Math.floor(1e4*t.row.rate)/100)+"%\n\t\t\t\t")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"amount",label:"返佣",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createTimestamp",label:"时间",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n\t\t\t\t\t"+e._s(e.$fmtDate(t.row.createTimestamp,"full"))+"\n\t\t\t\t")]}}])})],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"订单流转记录",visible:e.dialogVisible2,width:"800px"},on:{"update:visible":function(t){e.dialogVisible2=t}}},[a("el-table",{attrs:{border:"",size:"mini",data:e.tradeOptList}},[a("el-table-column",{attrs:{prop:"phone",label:"操作时间",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n\t\t\t\t\t"+e._s(e.$fmtDate(t.row.createTime,"full"))+"\n\t\t\t\t")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"remark",label:"操作类容",align:"center"}})],1)],1)],1)},staticRenderFns:[]};var i=a("C7Lr")({data:function(){return{detaileData:{},detaile:[],tradeStatus:{1:"未付款",2:"已付款(等待放行)",3:"已完成",4:"人为取消",5:"申诉中",6:"申诉后完成交易",7:"申诉后取消交易",8:"支付超时取消"},payTypeMap:{1:"银行卡",2:"支付宝",3:"微信",4:"宝转卡"},payList:{},dialogVisible:!1,dialogVisible2:!1,tradeOptList:[]}},activated:function(){this.getData(this.$route.query.tradeId)},mounted:function(){},methods:{discountDetaile:function(){this.dialogVisible=!0,this.getInviteRewardCoinChange()},getInviteRewardCoinChange:function(){var e=this;this.detaile=[],this.$http.post("/wallet/invite/backmgr/getInviteRewardCoinChange",{recdId:this.detaileData.tradeId,pageNum:1,pageSize:1e3}).then(function(t){e.detaile=t.result.list})},getData:function(e){var t=this;this.$http.post("/wallet/backmgr/merchant/queryMerchantTradeInfo",{tradeId:e}).then(function(e){200==e.code&&(t.detaileData=e.result.otcApiTradeInfoEx,t.payList=e.result.payList[0])})},fetchReward:function(){var e=this;this.$confirm("确定补发佣金","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(t){e.$http.post("/wallet/invite/backmgr/fetchReward",{recdId:e.detaileData.tradeId}).then(function(t){200==t.code?(e.$message.success("补发成功！"),e.getData(e.$route.query.tradeId)):e.$message.error(t.msg)})})},queryTradeOptList:function(){var e=this;this.$http.post("/wallet/app/otc/backmgr/queryTradeOptList",{tradeId:this.$route.query.tradeId}).then(function(t){e.tradeOptList=t.result.list,e.dialogVisible2=!0})},resetTradeStatus:function(){var e=this;this.$confirm("确定重置并删除当前订单图片？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(t){e.$http.post("/wallet/app/otc/backmgr/resetTradeStatus",{tradeId:e.$route.query.tradeId}).then(function(t){e.$message.success(t.msg),e.getData(e.$route.query.tradeId)})})}},watch:{},computed:{}},l,!1,function(e){a("jb1c")},"data-v-72677c06",null);t.default=i.exports},jb1c:function(e,t){}});