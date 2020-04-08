webpackJsonp([40],{"8CmZ":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"personalAssets-page"},[a("el-header",[a("div",{staticClass:"nav"},[t._v("资产排名>查看个人详情"),t.customerInfo.length>0?a("span",[t._v("-"+t._s(t.customerInfo[0].nickName))]):t._e()])]),t._v(" "),a("div",{staticClass:"main"},[a("div",{staticClass:"title"},[a("h3",[t._v("个人资产")]),t._v(" "),a("el-table",{directives:[{name:"show",rawName:"v-show",value:t.customerInfo.length>0,expression:"customerInfo.length>0"}],attrs:{stripe:"",border:"",data:t.customerInfo}},[a("el-table-column",{attrs:{prop:"phone",label:"手机号",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"nickName",label:"昵称",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"totalToRmb",label:"资产总折合（CNY）",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"registTime",label:"注册时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t\t\t"+t._s(t.$fmtDate(e.row.registTime,"full"))+"\n\t\t\t\t\t")]}}])})],1)],1),t._v(" "),a("div",{staticClass:"tableBox"},[a("div",[a("h3",[t._v("资产账户资产表")]),t._v(" "),a("p",[a("span",[t._v("资产总折合（CNY）")]),t._v(" "),a("span",[t._v(t._s(t.walletSumAmount))])]),t._v(" "),a("el-table",{attrs:{stripe:"",border:"",data:t.walletList}},[a("el-table-column",{attrs:{prop:"coinName",label:"币种",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"amount",label:"可用",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"frozenAmount",label:"冻结",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"registTime",label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return t.$router.push({path:"/LegalCurrency/billingRecord",query:{nickName:t.customerInfo[0].nickName,phone:t.customerInfo[0].phone,userId:t.userId,type:1,coinName:e.row.coinName,list:t.walletList}})}}},[t._v("查看详情")])]}}])})],1)],1),t._v(" "),a("div",[a("h3",[t._v("法币账户资产表")]),t._v(" "),a("p",[a("span",[t._v("资产总折合（CNY）")]),t._v(" "),a("span",[t._v(t._s(t.otcSumTotalToRmb))])]),t._v(" "),a("el-table",{attrs:{stripe:"",border:"",data:t.otcList}},[a("el-table-column",{attrs:{prop:"coinName",label:"币种",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"amount",label:"可用",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"frozenAmount",label:"冻结",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"assetCertification",label:"资产证明",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"registTime",label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return t.$router.push({path:"/LegalCurrency/billingRecord",query:{nickName:t.customerInfo[0].nickName,phone:t.customerInfo[0].phone,userId:t.userId,type:2,coinName:e.row.coinName,list:t.otcList}})}}},[t._v("查看详情")])]}}])})],1)],1)])])],1)},staticRenderFns:[]};var n=a("C7Lr")({components:{},data:function(){return{customerInfo:[],otcList:[],walletList:[],otcSumTotalToRmb:"",walletSumAmount:"",userId:""}},activated:function(){this.userId=this.$route.query.userId,this.getData()},methods:{getData:function(t){var e=this;this.$http.post("/wallet/app/otc/backmgr/getUserAssets",{userId:this.userId}).then(function(t){if(200==t.code){var a=t.result,l=a.otcList,n=a.walletList;e.otcList=l,e.walletList=n.filter(function(t){return"USD"!=t.coinName}),e.customerInfo=[{totalToRmb:t.result.totalToRmb,nickName:t.result.customerInfo.nickName,phone:t.result.customerInfo.phone,registTime:t.result.customerInfo.registTime}],e.otcSumTotalToRmb=t.result.otcSumTotalToRmb,e.walletSumAmount=t.result.walletSumTotalToRmb}})}},watch:{},computed:{}},l,!1,function(t){a("UMMW")},"data-v-5f05aca4",null);e.default=n.exports},UMMW:function(t,e){}});