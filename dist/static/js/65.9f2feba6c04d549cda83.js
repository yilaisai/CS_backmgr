webpackJsonp([65],{"63PD":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l={name:"complaint-details",data:function(){return{dialogTitle:"结果裁定",dialogVisible:!1,payDetaileShow:!1,tradeId:"",appealId:"",BuyList:[],SaleList:[],BuyProofInfo:{},SaleProofInfo:{},ruleForm:{appealId:"",appealResult:1,buyerResult:0,salerResult:0,appealRemark:""},rules:{appealRemark:[{required:!0,message:"备注不能为空",trigger:"blur"}]},appealResultData:[{label:"买方胜诉（卖家的币放行，直接打给买方）",value:1},{label:"卖方胜诉（卖家的币取消锁定）",value:0}],dealData:[{label:"不惩罚",value:0},{label:"24之内不能交易",value:1},{label:"永远不能交易",value:2}],options:{inline:!1,button:!1,navbar:!1,title:!1,toolbar:!1,tooltip:!1,movable:!0,zoomable:!0,rotatable:!0,scalable:!1,transition:!0,fullscreen:!0,keyboard:!0,url:"data-source"},payItem:{}}},filters:{filterType:function(t){switch(t){case 1:return"对方未付款";case 2:return"对方未放行";case 3:return"对方无应答";case 4:return"对方有欺诈行为";default:return"其他"}}},methods:{getProofInfo:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/proofInfo",{appealId:this.appealId}).then(function(e){e.result.forEach(function(e,a){1==e.isBuyer?t.BuyProofInfo=e:t.SaleProofInfo=e})})},getBuyList:function(){var t=this,e={appealId:this.appealId};this.$http.post("/wallet/app/otc/backmgr/infoBuyList",e).then(function(e){var a=e.result.list;t.BuyList=a;t.appealId,e.list[0].userId})},payDetaile:function(t){this.payItem=t,this.payDetaileShow=!0},getSaleList:function(){var t=this,e={appealId:this.appealId};this.$http.post("/wallet/app/otc/backmgr/infoSaleList",e).then(function(e){var a=e.result.list;t.SaleList=a;t.appealId,e.list[0].userId})},routerReturn:function(){this.$router.go(-1)},routerMore:function(t){this.$router.push({name:"complaint-more",query:{userId:t}})},judgment:function(){this.$refs.ruleForm&&this.$refs.ruleForm.resetFields(),this.dialogVisible=!0},dialogConfirm:function(){var t=this;this.ruleForm.appealId=this.appealId,this.$http.post("/wallet/app/otc/backmgr/adjustAppeal",this.ruleForm).then(function(e){t.$notify({title:"成功",message:"裁决成功",type:"success"}),t.dialogVisible=!1})}},activated:function(){this.tradeId=this.$route.query.tradeId,this.appealId=this.$route.query.appealId,this.getProofInfo(),this.getBuyList(),this.getSaleList()}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"complaint-details"},[a("el-header",[a("el-button",{attrs:{type:"primary"},on:{click:t.routerReturn}},[t._v("返回")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.judgment}},[t._v("判决")])],1),t._v(" "),a("div",{staticClass:"card-all-box clearfix"},[t.BuyList.length>0?a("div",{staticClass:"card-box"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[t._v("买家信息")]),t._v(" "),a("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"},on:{click:function(e){return t.routerMore(t.BuyList[0].userId)}}},[t._v("查看更多")])],1),t._v(" "),a("table",{staticClass:"com-table",attrs:{border:"1",cellpadding:"0",cellspacing:"0",bordercolor:"#dee2e6"}},[a("tr",[a("td",[t._v("订单号："+t._s(t.BuyList[0].tradeId))]),t._v(" "),a("td",[t._v("用户id："+t._s(t.BuyList[0].userId))]),t._v(" "),a("td",[t._v("身份："+t._s(1==t.BuyList[0].isBuyer?"买家":"卖家"))])]),t._v(" "),a("tr",[a("td",[t._v("付款参考号："+t._s(t.BuyList[0].referNo))]),t._v(" "),a("td",[t._v("申诉对接口令："+t._s(t.BuyList[0].code))]),t._v(" "),a("td",[t._v("投诉类型："+t._s(t._f("filterType")(t.BuyList[0].appealType)))])]),t._v(" "),a("tr",[a("td",[t._v("交易金额："+t._s(t.BuyList[0].money))]),t._v(" "),a("td",[t._v("数量："+t._s(t.BuyList[0].amount))]),t._v(" "),a("td",[t._v("价格："+t._s(t.BuyList[0].price))])])])])],1):t._e(),t._v(" "),t.SaleList.length>0?a("div",{staticClass:"card-box"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[t._v("卖家信息")]),t._v(" "),a("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"},on:{click:function(e){return t.routerMore(t.SaleList[0].userId)}}},[t._v("查看更多")])],1),t._v(" "),a("table",{staticClass:"com-table",attrs:{border:"1",cellpadding:"0",cellspacing:"0",bordercolor:"#dee2e6"}},[a("tr",[a("td",[t._v("订单号："+t._s(t.SaleList[0].tradeId))]),t._v(" "),a("td",[t._v("用户id："+t._s(t.SaleList[0].userId))]),t._v(" "),a("td",[t._v("身份："+t._s(1==t.SaleList[0].isBuyer?"买家":"卖家"))])]),t._v(" "),a("tr",[a("td",[t._v("付款参考号："+t._s(t.SaleList[0].referNo))]),t._v(" "),a("td",[t._v("申诉对接口令："+t._s(t.SaleList[0].code))]),t._v(" "),a("td",[t._v("投诉类型："+t._s(t._f("filterType")(t.SaleList[0].appealType)))])]),t._v(" "),a("tr",{staticClass:"payList"},[a("td",[a("div",[a("p",[t._v("支付宝：")]),t._v(" "),a("ul",t._l(t.SaleList[0].aPayList,function(e,l){return a("li",{key:l},[t._v(" 账号 "),a("span",{directives:[{name:"show",rawName:"v-show",value:t.SaleList[0].aPayList.length>1,expression:"SaleList[0].aPayList.length>1"}]},[t._v(t._s(l+1))]),t._v(" ： "+t._s(e.num)+" "),a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.payDetaile(e)}}},[t._v("详情")])],1)}),0)])]),t._v(" "),a("td",[a("div",[a("p",[t._v("微信：")]),t._v(" "),a("ul",t._l(t.SaleList[0].wPayList,function(e,l){return a("li",{key:l},[t._v(" 账号 "),a("span",{directives:[{name:"show",rawName:"v-show",value:t.SaleList[0].wPayList.length>1,expression:"SaleList[0].wPayList.length>1"}]},[t._v(t._s(l+1))]),t._v(" ： "+t._s(e.num)),a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.payDetaile(e)}}},[t._v("详情")])],1)}),0)])]),t._v(" "),a("td",[a("div",[a("p",[t._v("银行：")]),t._v(" "),a("ul",t._l(t.SaleList[0].bankPayList,function(e,l){return a("li",{key:l},[t._v(" 账号 "),a("span",{directives:[{name:"show",rawName:"v-show",value:t.SaleList[0].bankPayList.length>1,expression:"SaleList[0].bankPayList.length>1"}]},[t._v(t._s(l+1))]),t._v(" ： "+t._s(e.num)),a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.payDetaile(e)}}},[t._v("详情")])],1)}),0)])])])])])],1):t._e()]),t._v(" "),a("div",{staticClass:"card-all-box clearfix"},[a("div",{staticClass:"card-box"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[t._v("买家申述证据")])]),t._v(" "),a("table",{staticClass:"com-table",attrs:{border:"1",cellpadding:"0",cellspacing:"0",bordercolor:"#dee2e6"}},[a("tr",[a("th",[t._v("投诉图片")]),t._v(" "),a("th",[t._v("投诉文字")]),t._v(" "),a("th",[t._v("投诉时间")])]),t._v(" "),t.BuyProofInfo.appealRecdId?a("tr",[a("td",{staticStyle:{width:"40%"}},[a("viewer",{attrs:{options:t.options}},[a("img",{staticStyle:{width:"100%"},attrs:{src:t.BuyProofInfo.proofImg,alt:""}})])],1),t._v(" "),a("td",[t._v(t._s(t.BuyProofInfo.proofTxt))]),t._v(" "),a("td",[t._v(t._s(t.$fmtDate(t.BuyProofInfo.createTime,"full")))])]):t._e()])])],1),t._v(" "),a("div",{staticClass:"card-box"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[t._v("卖家申述证据")])]),t._v(" "),a("table",{staticClass:"com-table",attrs:{border:"1",cellpadding:"0",cellspacing:"0",bordercolor:"#dee2e6"}},[a("tr",[a("th",[t._v("投诉图片")]),t._v(" "),a("th",[t._v("投诉文字")]),t._v(" "),a("th",[t._v("投诉时间")])]),t._v(" "),t.SaleProofInfo.appealRecdId?a("tr",[a("td",{staticStyle:{width:"40%"}},[a("viewer",{attrs:{options:t.options}},[a("img",{staticStyle:{width:"100%"},attrs:{src:t.SaleProofInfo.proofImg,alt:""}})])],1),t._v(" "),a("td",[t._v(t._s(t.SaleProofInfo.proofTxt))]),t._v(" "),a("td",[t._v(t._s(t.$fmtDate(t.SaleProofInfo.createTime,"full")))])]):t._e()])])],1)]),t._v(" "),a("el-dialog",{attrs:{title:t.dialogTitle,visible:t.dialogVisible,width:"40%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("el-form",{ref:"ruleForm",attrs:{inline:!0,"label-width":"90px",model:t.ruleForm,rules:t.rules}},[a("div",[a("el-form-item",{staticClass:"judgment-box",attrs:{label:"判断输赢:",prop:"appealResult"}},[a("el-select",{model:{value:t.ruleForm.appealResult,callback:function(e){t.$set(t.ruleForm,"appealResult",e)},expression:"ruleForm.appealResult"}},t._l(t.appealResultData,function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}),1)],1)],1),t._v(" "),a("div",[a("el-form-item",{staticClass:"judgment-box",attrs:{label:"处理买方:",prop:"buyerResult"}},[a("el-select",{model:{value:t.ruleForm.buyerResult,callback:function(e){t.$set(t.ruleForm,"buyerResult",e)},expression:"ruleForm.buyerResult"}},t._l(t.dealData,function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}),1)],1)],1),t._v(" "),a("div",[a("el-form-item",{staticClass:"judgment-box",attrs:{label:"处理卖方:",prop:"salerResult"}},[a("el-select",{model:{value:t.ruleForm.salerResult,callback:function(e){t.$set(t.ruleForm,"salerResult",e)},expression:"ruleForm.salerResult"}},t._l(t.dealData,function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}),1)],1)],1),t._v(" "),a("div",[a("el-form-item",{staticClass:"judgment-box",attrs:{label:"备注",prop:"appealRemark"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入备注信息"},model:{value:t.ruleForm.appealRemark,callback:function(e){t.$set(t.ruleForm,"appealRemark",e)},expression:"ruleForm.appealRemark"}})],1)],1)]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.dialogConfirm}},[t._v("确认")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"收款信息",visible:t.payDetaileShow,width:"500px"},on:{"update:visible":function(e){t.payDetaileShow=e}}},[a("div",[a("p",[t._v("收款姓名："+t._s(t.payItem.userName))]),t._v(" "),1==t.payItem.payType?a("p",[t._v("银行名称："+t._s(t.payItem.bankName))]):t._e(),t._v(" "),1==t.payItem.payType&&t.payItem.bankBranch?a("p",[t._v("支行名称："+t._s(t.payItem.bankBranch))]):t._e(),t._v(" "),a("p",[t._v(" "+t._s(1==t.payItem.payType?"银行卡号码：":"收款账号：")+" "+t._s(t.payItem.num))]),t._v(" "),1!=t.payItem.payType&&t.payItem.qrcode?a("p",[t._v("收款码："),a("img",{staticStyle:{width:"384px","vertical-align":"text-top"},attrs:{src:t.payItem.qrcode,alt:""}})]):t._e()])])],1)},staticRenderFns:[]};var r=a("VU/8")(l,s,!1,function(t){a("kQtr")},null,null);e.default=r.exports},kQtr:function(t,e){}});