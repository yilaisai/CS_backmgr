webpackJsonp([23],{IUaF:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("mw3O"),i=n.n(a),o=(n("s0MJ"),{props:{filter:{default:function(){},type:Object},currentCoin:{default:function(){return""},type:String}},data:function(){return{open:!0,visible:!1,isSimple:!0,count:{}}},computed:{extract:function(){if(void 0===this.count.cfoRemain||void 0===this.count.coolToCfoAmount)return!1;var t=100*this.count.cfoRemain/this.count.coolToCfoAmount,e="0%",n="0";return(t=t>0?t:0)<10&&!isNaN(t)&&(e=t.toFixed(2)+"%",n=this.$config.percent*this.count.coolRemain-this.count.cfoRemain),{percent:e,amount:n}}},methods:{showDetail:function(t){this.visible=!0},clickHandle:function(t){this.isSimple=!this.isSimple},onCopy:function(){this.$message.success("复制成功")},getData:function(){var t=this,e={},n=this.filter;n.create_time&&(e.startTime=n.create_time[0]+" 00:00:00",e.endTime=n.create_time[1]+" 23:59:59"),n.coinName&&(e.coinName=n.coinName),this.$http.get("/wallet/block/backmgr/getDailySumInfo",e).then(function(e){var n=e.code,a=e.result;200===n?t.count=a:t.$notify.error({title:"提示",message:"获取数据失败"})}).catch(function(t){})},switchTransType:function(){},onError:function(){this.$message.error("浏览器不支持复制，请选择后右键复制")}}}),r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"summary-bar"},[n("el-steps",{attrs:{"align-center":"",simple:t.isSimple}},[n("el-step",{attrs:{title:"充币",icon:"el-icon-sold-out"}},[n("el-card",{staticClass:"box-card",attrs:{slot:"description"},nativeOn:{click:function(e){return t.$emit("switchTransType","in")}},slot:"description"},[n("ul",[n("li",[n("label",[t._v("充币笔数：")]),t._v(" "),n("span",[t._v(t._s(t.count.transInNum))])]),t._v(" "),n("li",[n("label",[t._v("充币金额：")]),t._v(" "),n("span",[t._v(t._s(t.count.transInAmount))])]),t._v(" "),n("li",[n("label",[t._v("未归拢：")]),t._v(" "),n("span",[t._v(t._s(t.count.transInRemain))])])])])],1),t._v(" "),n("el-step",{attrs:{title:"冷钱包",icon:"el-icon-wallet"}},[n("el-card",{staticClass:"box-card",attrs:{slot:"description"},nativeOn:{click:function(e){return t.$emit("switchTransType","cool")}},slot:"description"},[n("ul",[n("li",[n("label",[t._v("已归拢笔数：")]),t._v(" "),n("span",[t._v(t._s(t.count.collectInNum))])]),t._v(" "),n("li",[n("label",[t._v("已归拢金额：")]),t._v(" "),n("span",[t._v(t._s(t.count.collectInAmount))])]),t._v(" "),n("li",[n("label",[t._v("可用余额：")]),t._v(" "),n("span",[t._v(t._s(t.count.coolRemain))])])]),t._v(" "),n("div",{staticClass:"address-wrap"},[n("label",[t._v("地址：")]),t._v(" "),n("el-popover",{attrs:{placement:"top-start",width:"200",trigger:"hover",content:t.count.coolAddr},nativeOn:{click:function(e){return t.$window.open("https://www.omniexplorer.info/search/"+t.count.coolAddr)}}},[n("span",{attrs:{slot:"reference"},slot:"reference"},[t._v(t._s(t.count.coolAddr))])]),t._v(" "),n("a",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:t.count.coolAddr,expression:"count.coolAddr",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:t.onCopy,expression:"onCopy",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:t.onError,expression:"onError",arg:"error"}],staticClass:"copy-link",attrs:{href:"javascript:void 0"},on:{click:function(t){t.stopPropagation()}}},[n("i",{staticClass:"el-icon-document-copy"})])],1)])],1),t._v(" "),n("el-step",{attrs:{title:"CFO",icon:"el-icon-user"}},[n("el-card",{staticClass:"box-card",staticStyle:{"min-width":"180px"},attrs:{slot:"description"},nativeOn:{click:function(e){return t.$emit("switchTransType","out")}},slot:"description"},[n("p",[n("el-row",{attrs:{span:24}},[n("el-col",{attrs:{span:12}},[t._v("\n                                充币笔数："+t._s(t.count.coolToCfoNum)+"\n                            ")]),t._v(" "),n("el-col",{attrs:{span:12}},[t._v("\n                                提币笔数："+t._s(t.count.cfoOutNum)+"\n                            ")])],1)],1),t._v(" "),n("p",[n("el-row",{attrs:{span:24}},[n("el-col",{attrs:{span:12}},[t._v("\n                                充币金额："+t._s(t.count.coolToCfoAmount)+"\n                            ")]),t._v(" "),n("el-col",{attrs:{span:12}},[t._v("\n                                提币金额："+t._s(t.count.cfoOutAmount)+"\n                            ")])],1)],1),t._v(" "),n("p",[n("el-row",{attrs:{span:24}},[n("el-col",{attrs:{span:12}},[t._v("\n                                当前余额："+t._s(t.count.cfoRemain)+"\n                            ")])],1)],1),t._v(" "),n("div",{staticClass:"address-wrap"},[n("label",[t._v("地址：")]),t._v(" "),n("el-popover",{attrs:{placement:"top-start",width:"200",trigger:"hover",content:t.count.cfoAddr},nativeOn:{click:function(e){return t.$window.open("https://www.omniexplorer.info/search/"+t.count.cfoAddr)}}},[n("span",{attrs:{slot:"reference"},slot:"reference"},[t._v(t._s(t.count.cfoAddr))])]),t._v(" "),n("a",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:t.count.cfoAddr,expression:"count.cfoAddr",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:t.onCopy,expression:"onCopy",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:t.onError,expression:"onError",arg:"error"}],staticClass:"copy-link",attrs:{href:"javascript:void 0"},on:{click:function(t){t.stopPropagation()}}},[n("i",{staticClass:"el-icon-document-copy"})])],1)])],1),t._v(" "),n("el-step",{attrs:{title:"手动打币",icon:"el-icon-monitor"}},[n("el-card",{staticClass:"box-card",attrs:{slot:"description"},nativeOn:{click:function(e){return t.$emit("switchTransType","manual")}},slot:"description"},[n("ul",[n("li",[n("label",[t._v("已打币笔数：")]),t._v(" "),n("span",[t._v(t._s(t.count.manualOutNum))])]),t._v(" "),n("li",[n("label",[t._v("已打币金额：")]),t._v(" "),n("span",[t._v(t._s(t.count.manualOutAmount))])])])])],1),t._v(" "),n("el-step",{attrs:{title:"小结",icon:"el-icon-tickets"}},[n("el-card",{staticClass:"box-card",attrs:{slot:"description"},nativeOn:{click:function(e){return t.$emit("switchTransType","manual")}},slot:"description"},[n("ul",[n("li",[n("label",[t._v("净入：")]),t._v(" "),n("span",[t._v(t._s(t.count.earn))])]),t._v(" "),n("li",[n("label",[t._v("实际余额：")]),t._v(" "),n("span",[t._v(t._s(t.count.realRemain))])])])])],1),t._v(" "),n("el-step",{attrs:{title:"手续费(BTC)",icon:"el-icon-price-tag"}},[n("el-card",{staticClass:"box-card",attrs:{slot:"description"},nativeOn:{click:function(e){return t.$emit("switchTransType","fee")}},slot:"description"},[n("ul",[n("li",[n("label",[t._v("笔数：")]),t._v(" "),n("span",[t._v(t._s(t.count.feeNum))])]),t._v(" "),n("li",[n("label",[t._v("金额：")]),t._v(" "),n("span",[t._v(t._s(t.count.feeAmount))])]),t._v(" "),n("li",[n("label",[t._v("余额：")]),t._v(" "),n("span",[t._v(t._s(t.count.feeRemain))])])]),t._v(" "),n("div",{staticClass:"address-wrap"},[n("label",[t._v("地址：")]),t._v(" "),n("el-popover",{attrs:{placement:"top-start",width:"200",trigger:"hover",content:t.count.feeAddr},nativeOn:{click:function(e){return t.$window.open("https://www.omniexplorer.info/search/"+t.count.feeAddr)}}},[n("span",{attrs:{slot:"reference"},slot:"reference"},[t._v(t._s(t.count.feeAddr))])]),t._v(" "),n("a",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:t.count.feeAddr,expression:"count.feeAddr",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:t.onCopy,expression:"onCopy",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:t.onError,expression:"onError",arg:"error"}],staticClass:"copy-link",attrs:{href:"javascript:void 0"},on:{click:function(t){t.stopPropagation()}}},[n("i",{staticClass:"el-icon-document-copy"})])],1)])],1)],1),t._v(" "),n("div",{staticClass:"series"},[n("span",{staticClass:"label"},[t._v("总充币金额：")]),t._v(" "),n("span",{staticClass:"props"},[n("i",[t._v(t._s(t.count.totalRecharge))]),t._v(" USDT")]),t._v(" "),n("span",{staticClass:"label"},[t._v("总可用余额：")]),t._v(" "),n("span",{staticClass:"props"},[n("i",[t._v(t._s(t.count.totalRealRemain))]),t._v(" USDT")])]),t._v(" "),n("a",{staticClass:"unfold-btn",attrs:{href:"javascript:;"},on:{click:function(e){return e.stopPropagation(),t.clickHandle(e)}}},[n("i",{class:t.isSimple?"el-icon-bottom":"el-icon-top"}),t._v(" "),n("span",{domProps:{textContent:t._s(t.isSimple?"展开":"收起")}})])],1)},staticRenderFns:[]};var s=n("VU/8")(o,r,!1,function(t){n("XF89")},"data-v-35fbbfbe",null).exports,c=n("EaCm"),l={name:"monotoring",data:function(){return{data:[],coins:[{coinName:"USDT"}],defaultCoin:"USDT",tableData:[],pageSize:20,loading:!1,pageNum:1,total:0,fundTypes:c.c,filter:{coinName:"",create_time:null,transType:null,feeCoinName:""},selectConfig:{seleteStyle:{color:"#909399"},selectIconStyle:{color:"#07c4a8"}},rowHeight:"auto",loadEnd:!1,pickerOptions:{disabledDate:function(t){return t.getTime()>Date.now()},shortcuts:[{text:"最近一日",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-864e5),t.$emit("pick",[n,e])}},{text:"最近两日",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-1728e5),t.$emit("pick",[n,e])}},{text:"最近一周",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-6048e5),t.$emit("pick",[n,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-2592e6),t.$emit("pick",[n,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-7776e6),t.$emit("pick",[n,e])}},{text:"最近半年",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-158112e5),t.$emit("pick",[n,e])}}]}}},methods:{handleSizeChange:function(t){this.pageSize=t,this.getData()},handleCurrentChange:function(t){this.pageNum=t,this.getData()},getData:function(t){var e=this;t&&(this.pageNum=1,this.$refs.count.getData());var n=this.filter;this.loading=!0,this.data=[];var a={pageNum:this.pageNum,pageSize:this.pageSize};n.create_time&&(a.startTime=n.create_time[0]+" 00:00:00",a.endTime=n.create_time[1]+" 23:59:59"),n.coinName&&(a.feeCoinName=n.coinName),n.transType&&(a.transType=n.transType),this.$http.get("/wallet/block/backmgr/getBlockTransList",a).then(function(t){var n=t.code,a=t.result;200===n?(e.total=a.total,e.tableData=a.list):e.$notify.error({title:"提示",message:"获取列表失败"})}).catch(function(t){}).finally(function(){e.loading=!1})},downloadExcel:function(){var t=this.filter,e={pageNum:this.pageNum,pageSize:this.pageSize};t.create_time&&(e.startTime=t.create_time[0]+" 00:00:00",e.endTime=t.create_time[1]+" 23:59:59"),t.coinName&&(e.feeCoinName=t.coinName),t.transType&&(e.transType=t.transType),e.token=localStorage.getItem("token"),window.open("/wallet/block/backmgr/opsExportBlockRecdList?"+i.a.stringify(e))},hideCount:function(t){this.rowHeight=t?"500px":"30px"},allCoins:function(){var t=this;this.$http.get("/wallet/block/backmgr/coin/getAllCoinInfo").then(function(e){var n=e.code,a=e.result;if(200===n){var i=!1;t.coins=a.filter(function(t){return"USDT"===t.coinName&&1===t.sysStatus&&(i=!0),1===t.sysStatus}),t.filter.coinName=i?"USDT":t.coins.length?t.coins[0].coinName:""}else t.$notify.error({title:"提示",message:"查询失败"})}).catch(function(t){}).finally(function(e){t.getData(!0)})},coinNameChange:function(){this.$refs.count.getData(),this.getData()},transTypeChange:function(){this.pageNum=1,this.filter.feeCoinName="USDT"===this.filter.coinName&&"fee"===this.filter.transType?"BTC":"",this.getData()},switchTransType:function(t){this.filter.transType=t,this.transTypeChange()},datePickerChange:function(){}},filters:{transTypeMap:function(t){switch(t){case 0:return"入金";case 1:return"提币";case 2:return"入金归拢";case 3:return"CFO归拢到冷钱包";case 4:return"CFO充值";case 5:return"其他地址转入CFO";case 6:return"手续费转入";case 7:return"手续费转出";case 8:return"手动打币";default:return t}}},created:function(){var t=new Date,e=t.getMonth()+1;e=e<10?"0"+e:e;var n=t.getDate();n=n<10?"0"+n:n;var a=t.getFullYear()+"-"+e+"-"+n,i=t.getFullYear()+"-"+e+"-"+n;this.filter.create_time=[a,i]},activated:function(){this.allCoins()},components:{SummaryBar:s}},p={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"blockchain-monotoring"},[n("el-form",{ref:"form",attrs:{model:t.filter,"label-width":"40px",size:"mini","label-position":"left",inline:""}},[n("el-form-item",{attrs:{label:"时间"}},[n("el-date-picker",{ref:"datePicker",attrs:{"value-format":"yyyy-MM-dd",type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},model:{value:t.filter.create_time,callback:function(e){t.$set(t.filter,"create_time",e)},expression:"filter.create_time"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"币种"}},[n("el-select",{staticClass:"select",on:{change:t.coinNameChange},model:{value:t.filter.coinName,callback:function(e){t.$set(t.filter,"coinName",e)},expression:"filter.coinName"}},t._l(t.coins,function(t,e){return n("el-option",{key:e,attrs:{value:t.coinName,label:t.coinName}})}),1)],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.getData(!0)}}},[t._v("查询")])],1)],1),t._v(" "),n("SummaryBar",{ref:"count",attrs:{currentCoin:t.filter.coinName,filter:t.filter},on:{hideCount:t.hideCount,switchTransType:t.switchTransType}}),t._v(" "),n("div",{staticClass:"action"},[n("span",{staticClass:"title"},[t._v("操作记录")]),t._v(" "),n("span",{staticClass:"type"},[t._v("\n                类型\n                "),n("el-select",{attrs:{size:"mini",clearable:"",placeholder:"选择类型"},on:{change:t.transTypeChange},model:{value:t.filter.transType,callback:function(e){t.$set(t.filter,"transType",e)},expression:"filter.transType"}},[n("el-option",{attrs:{value:null,label:"全部"}}),t._v(" "),t._l(t.fundTypes,function(t,e){return n("el-option",{key:e,attrs:{value:e,label:t}})})],2)],1),t._v(" "),n("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-download"},on:{click:t.downloadExcel}},[t._v("导出Excel")])],1),t._v(" "),n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",size:"mini"}},[n("el-table-column",{attrs:{prop:"txTime",label:"时间",width:"140",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"transTypeStr",label:"转账类型",width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.transTypeStr))])]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"coinName",label:"币种",width:"80",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"fromAddr",label:"来源地址",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"toAddr",label:"目标地址",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"blockAmount",label:"到账数量",width:"100",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"blockFee",label:"手续费(BTC)",width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.transType||4==e.row.transType||8==e.row.transType?n("span",[t._v("0")]):n("span",[t._v(t._s(e.row.blockFee))])]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"txId",label:"TXID",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("a",{attrs:{href:"https://www.omniexplorer.info/search/"+e.row.txId,target:"_blank"}},[t._v(t._s(e.row.txId))])]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"sysUserName",label:"操作人",width:"80",align:"center"}})],1),t._v(" "),n("el-pagination",{attrs:{"current-page":t.pageNum,"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:1*t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}),t._v(" "),t._m(0)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"remark"},[this._v("\n\t\t\t备注："),e("br"),this._v("\n\t\t\t1、净入 = 入金金额 - CFO提币金额 - 手工提币金额 "),e("br"),this._v("\n\t\t\t2、实际余额 = 入金当前未归拢+冷钱包当前余额 + CFO当前余额 "),e("br"),this._v("\n\t\t\t3、冷钱包当前余额 = 截至日期上一天快照余额 + 截止日期当天金额 - CFO充币金额 - 手工提币金额 "),e("br"),this._v("\n\t\t\t4、CFO当前余额 = CFO地址当前余额 "),e("br"),this._v("\n\t\t\t5、手续费金额 = 所有记录手续费之和（入金、CFO充值、手工打币手续费为0） "),e("br"),this._v("\n\t\t\t6、手续费余额 = 手续费地址BTC余额 "),e("br")])}]};var u=n("VU/8")(l,p,!1,function(t){n("qg+/")},"data-v-6d080f3d",null);e.default=u.exports},XF89:function(t,e){},"qg+/":function(t,e){}});