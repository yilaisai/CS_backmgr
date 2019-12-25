webpackJsonp([30],{"6NTi":function(t,e){},NgY3:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={components:{},data:function(){return{customerInfo:[],otcList:[],walletList:[],otcSumTotalToUsdt:"",walletSumTotalToUsdt:"",userId:"",type:"",coinName:"",list:[],listData:{pageNum:1,pageSize:10,total:"",list:[]},titleTable:[{phoen:"",nickName:"",amount:"",frozenAmount:"",assetCertification:""}]}},activated:function(){this.userId=this.$route.query.userId,this.type=this.$route.query.type,this.list=this.$route.query.list,this.coinName=this.$route.query.coinName,this.titleTable[0].phone=this.$route.query.phone,this.titleTable[0].nickName=this.$route.query.nickName,this.getData()},methods:{selectChange:function(t){this.list.pageNum=1,this.getData()},getData:function(t){var e=this,a=1==this.type?"/wallet/app/otc/backmgr/getUserWalletAssetsRecd":"/wallet/app/otc/backmgr/getUserOtcAssetsRecd";this.$http.post(a,{userId:this.userId,pageNum:this.listData.pageNum,pageSize:this.listData.pageSize,coinName:this.coinName}).then(function(t){200==t.code&&(e.listData.total=t.result.coinChangeRecd.total,e.listData.list=t.result.coinChangeRecd.list,e.titleTable[0].amount=t.result.userCoinAddr.amount,e.titleTable[0].frozenAmount=t.result.userCoinAddr.frozenAmount,e.titleTable[0].assetCertification=t.result.userCoinAddr.assetCertification)})},optType:function(t){if(2==this.type)switch(1*t.optType){case 0:return"创建订单";case 3:return"申诉买方赢，直接放币";case 4:return"申诉卖方赢，出售广告回滚卖家";case 11:return"成为商户";case 12:return"卖家取消订单";case 13:return"取消商家认证";case 14:return"钱包转账到法币";case 15:return"取消订单";case 16:return"完成交易";case 17:return"手续费";case 18:return"申诉买方赢，购买广告回滚卖家的币";case 19:return"解冻金额";case 20:return"法币转账到钱包";case 21:return"一级折扣";case 22:return"二级折扣";case 23:return"三级折扣";case 24:return"鼓励金";case 25:return"otc发起充币";case 26:return"otc发起提币";case 27:return"otc提币失败";case 28:return"激活订单";case 29:return"申诉修改金额";case 30:return"资产证明转入";case 31:return"资产证明转出";default:return"null"}else switch(1*t.optType){case 1:return"提币成功";case 3:return"提币失败";case 4:return"提币";case 5:return"充币";case 7:return"发红包冻结金额";case 8:return"红包过期，解冻金额";case 9:return"领取红包";case 10:return"被领取红包";case 11:return"转账到法币";case 12:return"转账到其他钱包账号";case 13:return"转账-来自其他钱包账号";case 14:return"平台收取手续费";case 15:return"法币转钱包";default:return"null"}},getPaginationChange:function(t,e){this.listData.pageSize=t,this.listData.pageNum=e,this.getData()}},watch:{},computed:{}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"personalAssets-page"},[a("el-header",[a("div",{staticClass:"nav"},[t._v("资产排名>查看个人详情>查看"+t._s(1==t.type?"资产":"法币")+"账户币种流水"),a("span",{directives:[{name:"show",rawName:"v-show",value:t.titleTable.length>0,expression:"titleTable.length>0"}]},[t._v("-"+t._s(t.titleTable[0].nickName))])]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.$router.go(-1)}}},[t._v("返回")])],1),t._v(" "),a("div",{staticClass:"main"},[a("div",{staticClass:"title"},[a("h3",[t._v(t._s(1==t.type?"资产账户币种流水":"法币账户币种流水"))]),t._v("\n\t\t\t切换币种：\n\t\t\t"),a("el-select",{staticClass:"select",on:{change:t.selectChange},model:{value:t.coinName,callback:function(e){t.coinName=e},expression:"coinName"}},t._l(t.list,function(t,e){return a("el-option",{key:e,attrs:{value:t.coinName,label:t.coinName}})}),1),t._v(" "),a("el-table",{attrs:{stripe:"",border:"",data:t.titleTable}},[a("el-table-column",{attrs:{prop:"phone",label:"手机号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"nickName",label:"昵称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"amount",label:"可用("+t.coinName+")"}}),t._v(" "),a("el-table-column",{attrs:{prop:"frozenAmount",label:"冻结("+t.coinName+")"}}),t._v(" "),a("el-table-column",{attrs:{prop:"assetCertification",label:"资产证明余额("+t.coinName+")"}})],1)],1),t._v(" "),a("h3",[t._v("流水明细")]),t._v(" "),a("el-table",{attrs:{stripe:"",border:"",data:t.listData.list}},[a("el-table-column",{attrs:{width:"160",align:"center",prop:"updateTime",label:"时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t\t"+t._s(t.$fmtDate(e.row.updateTime,"full"))+"\n\t\t\t\t")]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"optType",label:"类型"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[t._v("\n\t\t\t\t\t"+t._s(t.optType(e.row))+"\n\t\t\t\t")])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"可用资金变化("+t.coinName+")"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[t._v("\n\t\t\t\t\t"+t._s(1==t.type?e.row.balanceChangeAmount>0?"+"+e.row.balanceChangeAmount:e.row.balanceChangeAmount:e.row.balanceChange>0?"+"+e.row.balanceChange:e.row.balanceChange)+"\n\t\t\t\t")])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"balance",label:"可用余额("+t.coinName+")"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"frozenChangeAmount",label:"冻结资金变化("+t.coinName+")"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[t._v("\n\t\t\t\t\t"+t._s(1==t.type?e.row.frozenChangeAmount:e.row.frozenAmountChange)+"\n\t\t\t\t")])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"frozenAmount",label:"冻结("+t.coinName+")"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"assetCertificationChange",label:"资产证明变化("+t.coinName+")"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.assetCertificationChange>0?"+":"")+t._s(e.row.assetCertificationChange))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"assetCertification",label:"资产证明余额("+t.coinName+")"}})],1),t._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.listData.pageSize,"current-page":t.listData.pageNum},on:{handleChange:t.getPaginationChange}})],1)],1)},staticRenderFns:[]};var s=a("VU/8")(n,r,!1,function(t){a("6NTi")},"data-v-eb8ef514",null);e.default=s.exports}});