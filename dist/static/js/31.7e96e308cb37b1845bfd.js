webpackJsonp([31],{"1kk5":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"personalAssets-page"},[o("el-header",[o("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.$router.go(-1)}}},[t._v("返回")])],1),t._v(" "),o("div",{staticClass:"main"},[o("div",{staticClass:"title"},[o("h3",[t._v("个人资产")]),t._v(" "),o("el-table",{attrs:{stripe:"",border:"",data:t.customerInfo}},[o("el-table-column",{attrs:{prop:"phone",label:"手机号"}}),t._v(" "),o("el-table-column",{attrs:{prop:"nickName",label:"昵称"}}),t._v(" "),o("el-table-column",{attrs:{prop:"totalToUsdt",label:"资产总折合（USDT）"}}),t._v(" "),o("el-table-column",{attrs:{prop:"registTime",label:"注册时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t\t\t"+t._s(t.$fmtDate(e.row.registTime,"full"))+"\n\t\t\t\t\t")]}}])})],1)],1),t._v(" "),o("div",{staticClass:"tableBox"},[o("div",[o("h3",[t._v("钱包账户资产表")]),t._v(" "),o("p",[o("span",[t._v("资产总折合（USDT）")]),t._v(" "),o("span",[t._v(t._s(t.walletSumTotalToUsdt))])]),t._v(" "),o("el-table",{attrs:{stripe:"",border:"",data:t.walletList}},[o("el-table-column",{attrs:{prop:"coinName",label:"币种"}}),t._v(" "),o("el-table-column",{attrs:{prop:"amount",label:"可用（USDT）"}}),t._v(" "),o("el-table-column",{attrs:{prop:"frozenAmount",label:"冻结（USDT）"}}),t._v(" "),o("el-table-column",{attrs:{prop:"registTime",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{size:"mini"},on:{click:function(o){return t.$router.push({path:"/LegalCurrency/billingRecord",query:{nickName:t.customerInfo[0].nickName,phone:t.customerInfo[0].phone,userId:t.userId,type:1,coinName:e.row.coinName,list:t.walletList}})}}},[t._v("查看详情")])]}}])})],1)],1),t._v(" "),o("div",[o("h3",[t._v("法币账户资产表")]),t._v(" "),o("p",[o("span",[t._v("资产总折合（USDT）")]),t._v(" "),o("span",[t._v(t._s(t.otcSumTotalToUsdt))])]),t._v(" "),o("el-table",{attrs:{stripe:"",border:"",data:t.otcList}},[o("el-table-column",{attrs:{prop:"coinName",label:"币种"}}),t._v(" "),o("el-table-column",{attrs:{prop:"amount",label:"可用（USDT）"}}),t._v(" "),o("el-table-column",{attrs:{prop:"frozenAmount",label:"冻结（USDT）"}}),t._v(" "),o("el-table-column",{attrs:{prop:"registTime",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{size:"mini"},on:{click:function(o){return t.$router.push({path:"/LegalCurrency/billingRecord",query:{nickName:t.customerInfo[0].nickName,phone:t.customerInfo[0].phone,userId:t.userId,type:2,coinName:e.row.coinName,list:t.otcList}})}}},[t._v("查看详情")])]}}])})],1)],1)])])],1)},staticRenderFns:[]};var a=o("VU/8")({components:{},data:function(){return{customerInfo:[],otcList:[],walletList:[],otcSumTotalToUsdt:"",walletSumTotalToUsdt:"",userId:""}},activated:function(){this.userId=this.$route.query.userId,this.getData()},methods:{getData:function(t){var e=this;this.$http.post("/wallet/app/otc/backmgr/getUserAssets",{userId:this.userId}).then(function(t){if(200==t.code){var o=t.result,l=o.otcList,a=o.walletList;e.otcList=l,e.walletList=a,e.customerInfo=[{totalToUsdt:t.result.totalToUsdt,nickName:t.result.customerInfo.nickName,phone:t.result.customerInfo.phone,registTime:t.result.customerInfo.registTime}],e.otcSumTotalToUsdt=t.result.otcSumTotalToUsdt,e.walletSumTotalToUsdt=t.result.walletSumTotalToUsdt}})}},watch:{},computed:{}},l,!1,function(t){o("lmqw")},"data-v-7daa8431",null);e.default=a.exports},lmqw:function(t,e){}});