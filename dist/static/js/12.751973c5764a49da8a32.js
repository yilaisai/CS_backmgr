webpackJsonp([12],{"4TDt":function(t,e){},"9yC3":function(t,e){},eXM6:function(t,e){},lXS1:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("4YfN"),o=a.n(r),i=a("48sp"),l={props:{orderStatus:{type:Array}},data:function(){return{pickerOptions:{disabledDate:function(t){return t.getTime()>Date.now()},shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}},{text:"最近半年",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-15552e6),t.$emit("pick",[a,e])}},{text:"最近一年",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-31536e6),t.$emit("pick",[a,e])}}]},formData:{create_time:"",addr:"",coinName:null,startDate:"",endDate:"",name:"",orderId:"",pageNum:"",pageSize:"",status:null,txId:""}}},methods:{queryData:function(){this.formData.create_time?(this.formData.startDate=this.formData.create_time[0],this.formData.endDate=this.formData.create_time[1]):(this.formData.startDate="",this.formData.endDate=""),this.$emit("queryData",this.formData)},exportExcel:function(){this.formData.create_time?(this.formData.startDate=this.formData.create_time[0],this.formData.endDate=this.formData.create_time[1]):(this.formData.startDate="",this.formData.endDate=""),this.$emit("exportExcel",this.formData)},clear:function(){this.formData={create_time:"",addr:"",coinName:null,startDate:"",endDate:"",name:"",orderId:"",pageNum:"",pageSize:"",status:null,txId:""}},fetchFilter:function(){return this.filter}},computed:o()({},Object(i.b)(["coinInfo"]))},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-collapse",{attrs:{value:"filter"}},[a("el-collapse-item",{attrs:{title:"查询条件",name:"filter"}},[a("el-form",{ref:"form",attrs:{model:t.formData,"label-width":"60px",size:"mini",inline:""}},[a("div",[a("el-form-item",{attrs:{label:"账号："}},[a("el-input",{attrs:{placeholder:"账号"},model:{value:t.formData.name,callback:function(e){t.$set(t.formData,"name",e)},expression:"formData.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"地址："}},[a("el-input",{attrs:{placeholder:"搜索地址"},model:{value:t.formData.addr,callback:function(e){t.$set(t.formData,"addr",e)},expression:"formData.addr"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"单号："}},[a("el-input",{attrs:{placeholder:"搜索订单号"},model:{value:t.formData.orderId,callback:function(e){t.$set(t.formData,"orderId",e)},expression:"formData.orderId"}})],1)],1),t._v(" "),a("div",[a("el-form-item",{attrs:{label:"TXID："}},[a("el-input",{attrs:{placeholder:"搜索TXID"},model:{value:t.formData.txId,callback:function(e){t.$set(t.formData,"txId",e)},expression:"formData.txId"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"币种："}},[a("el-select",{attrs:{placeholder:"选择类型",clearable:""},model:{value:t.formData.coinName,callback:function(e){t.$set(t.formData,"coinName",e)},expression:"formData.coinName"}},[a("el-option",{attrs:{value:null,label:"全部"}}),t._v(" "),t._l(t.coinInfo,function(t,e){return a("el-option",{key:e,attrs:{value:t.coinName,label:t.coinName}})})],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"状态："}},[a("el-select",{attrs:{placeholder:"选择订单状态",clearable:""},model:{value:t.formData.status,callback:function(e){t.$set(t.formData,"status",e)},expression:"formData.status"}},[a("el-option",{attrs:{value:null,label:"全部"}}),t._v(" "),t._l(t.orderStatus,function(t,e){return a("el-option",{key:e,attrs:{value:t.val,label:t.name}})})],2)],1)],1),t._v(" "),a("el-form-item",{staticStyle:{width:"466px"},attrs:{label:"时间："}},[a("el-date-picker",{attrs:{id:"createtime",type:"datetimerange",align:"right",width:"auto","value-format":"yyyy-MM-dd HH:mm:ss","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},model:{value:t.formData.create_time,callback:function(e){t.$set(t.formData,"create_time",e)},expression:"formData.create_time"}})],1),t._v(" "),a("el-button",{staticStyle:{"margin-left":"40px"},attrs:{type:"primary",size:"mini"},on:{click:t.queryData}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.clear}},[t._v("清空")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-document-checked"},nativeOn:{click:function(e){return t.exportExcel(e)}}},[t._v("导出Excel")])],1)],1)],1)},staticRenderFns:[]};var s=a("C7Lr")(l,n,!1,function(t){a("9yC3")},"data-v-5b71270d",null).exports,m={props:{showDialogMT:{type:Boolean,default:!1}},data:function(){return{form:{sysUserId:"123456",txId:"",coinName:"USDT",toAddr:"",fromAddr:"",blockFee:"0",blockAmount:""}}},methods:{manualDo:function(){var t=this;for(var e in this.form)if(""===this.form[e])return void this.$notify.error({title:"提示",message:"数据填写不完整"});this.$http.get("/backmgr/manual",this.form).then(function(e){200==e.code?(t.$notify.success({title:"提示",message:"录入成功！"}),t.dialogVisible=!1,t.$emit("getData")):t.$notify.error({title:"提示",message:e.msg})})}},computed:{dialogVisible:{get:function(){return this.showDialogMT},set:function(t){this.$emit("hideDialogMT",t)}}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:"手动打币",visible:t.dialogVisible,width:"30%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px",size:"mini"}},[a("el-form-item",{attrs:{label:"币种"}},[a("el-select",{attrs:{placeholder:"请选择币种"},model:{value:t.form.coinName,callback:function(e){t.$set(t.form,"coinName",e)},expression:"form.coinName"}},[a("el-option",{attrs:{label:"USDT",value:"USDT"}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"TXID"}},[a("el-input",{model:{value:t.form.txId,callback:function(e){t.$set(t.form,"txId","string"==typeof e?e.trim():e)},expression:"form.txId"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"from地址"}},[a("el-input",{model:{value:t.form.fromAddr,callback:function(e){t.$set(t.form,"fromAddr","string"==typeof e?e.trim():e)},expression:"form.fromAddr"}})],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.manualDo}},[t._v("确 定")])],1)],1)},staticRenderFns:[]},u=a("C7Lr")(m,c,!1,null,null,null).exports,f=[],d={props:{list:{type:Array},orderStatus:{type:Array}},created:function(){f=this.orderStatus||[]},data:function(){return{showDialogMT:!1}},filters:{filterStatus:function(t){var e="";return f.forEach(function(a,r){t==a.val&&(e=a.name)}),e},filterType:function(t){return 2==t?"充值":"提币"}},methods:{handleEdit:function(t,e){this.showDialogMT=!0},hideDialogMT:function(t){this.showDialogMT=t}},components:{ManualTransferDialog:u}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table-wrap"},[t._m(0),t._v(" "),a("el-table",{staticStyle:{"min-width":"100%"},attrs:{data:t.list,height:"auto",border:"",size:"mini"}},[a("el-table-column",{attrs:{prop:"create_time",label:"发起时间",width:"140"}}),t._v(" "),a("el-table-column",{attrs:{prop:"nickName",label:"账号|昵称",width:"170",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.phone+" | "+e.row.nickName))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"coin_name",label:"币种",align:"center",width:"60"}}),t._v(" "),a("el-table-column",{attrs:{prop:"amount",label:"数量",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"fee",label:"手续费",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"status",label:"状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{},[t._v(t._s(t._f("filterStatus")(e.row.status,t.orderStatus)))])}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"type",label:"类型",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{},[t._v(t._s(t._f("filterType")(e.row.type,t.orderStatus)))])}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"from_addr",label:"From"}}),t._v(" "),a("el-table-column",{attrs:{prop:"to_addr",label:"To"}}),t._v(" "),a("el-table-column",{attrs:{prop:"id",label:"订单号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tx_id",label:"Txid"},scopedSlots:t._u([{key:"default",fn:function(e){return a("a",{attrs:{href:"https://www.omniexplorer.info/search/"+e.row.tx_id,target:"_blank"}},[t._v(t._s(e.row.tx_id))])}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"sys_remark",label:"备注"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_remark",label:"上链备注"}})],1),t._v(" "),a("ManualTransferDialog",{attrs:{showDialogMT:t.showDialogMT},on:{hideDialogMT:t.hideDialogMT}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"table-title"},[e("h4",[this._v("商户充提记录列表")]),this._v(" "),e("div",{staticClass:"btn-wrap"})])}]};var h=a("C7Lr")(d,p,!1,function(t){a("4TDt")},"data-v-1cf9b70e",null).exports,g={props:{showDialogMR:{type:Boolean,default:!1}},data:function(){return{form:{sysUserId:"123456",txId:"",coinName:"USDT",toAddr:"",fromAddr:"",blockFee:"0",blockAmount:""}}},methods:{manualDo:function(){var t=this;for(var e in this.form)if(""===this.form[e])return void this.$notify.error({title:"提示",message:"数据填写不完整"});this.$http.get("/backmgr/manual",this.form).then(function(e){200==e.code?(t.$notify.success({title:"提示",message:"录入成功！"}),t.dialogVisible=!1,t.$emit("getData")):t.$notify.error({title:"提示",message:e.msg})})}},computed:{dialogVisible:{get:function(){return this.showDialogMR},set:function(t){this.$emit("hideDialogMR",t)}}}},v={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:"手动录单",visible:t.dialogVisible,width:"30%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px",size:"mini"}},[a("el-form-item",{attrs:{label:"币种"}},[a("el-select",{attrs:{placeholder:"请选择币种"},model:{value:t.form.coinName,callback:function(e){t.$set(t.form,"coinName",e)},expression:"form.coinName"}},t._l(["USDT","ETH","BTC","EOS"],function(t,e){return a("el-option",{key:e,attrs:{value:t,label:t}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"TXID"}},[a("el-input",{model:{value:t.form.txId,callback:function(e){t.$set(t.form,"txId","string"==typeof e?e.trim():e)},expression:"form.txId"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"from地址"}},[a("el-input",{model:{value:t.form.fromAddr,callback:function(e){t.$set(t.form,"fromAddr","string"==typeof e?e.trim():e)},expression:"form.fromAddr"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"to地址"}},[a("el-input",{model:{value:t.form.toAddr,callback:function(e){t.$set(t.form,"toAddr","string"==typeof e?e.trim():e)},expression:"form.toAddr"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"数量"}},[a("el-input",{model:{value:t.form.blockAmount,callback:function(e){t.$set(t.form,"blockAmount","string"==typeof e?e.trim():e)},expression:"form.blockAmount"}},[a("template",{slot:"append"},[t._v("USDT")])],2)],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.manualDo}},[t._v("确 定")])],1)],1)},staticRenderFns:[]},D=a("C7Lr")(g,v,!1,null,null,null).exports,_=a("CtzY"),b=a.n(_),y={data:function(){return{pageSize:20,pageNum:1,pageData:{total:0,list:[]},orderStatus:[{name:"失败",val:0},{name:"成功",val:1},{name:"待审核",val:2},{name:"审核不通过",val:3},{name:"审核通过",val:4}],showDialogMR:!1,formData:{},sumInfo:[]}},activated:function(){this.getData()},methods:{getData:function(t){var e=this;t&&(this.pageNum=1),(t=t||this.formData).pageNum=this.pageNum,t.pageSize=this.pageSize,this.formData=t,this.$http.post("/wallet/backmgr/merchant/trade/queryRechargeWithdrawPage",t).then(function(t){200==t.code&&(e.pageData=t.result.pageInfo,e.sumInfo=t.result.sumInfo)})},exportExcel:function(t){(t=t||this.formData).pageNum=this.pageNum,t.pageSize=this.pageSize,t.token=localStorage.getItem("wallet_token")||"";var e=localStorage.getItem("SERVER_PATH")||window.SERVER_PATH;window.open(e+"/wallet/backmgr/merchant/trade/queryRechargeWithdrawPage/export?"+b.a.stringify(t))},handleCurrentChange:function(t){this.pageNum=t,this.getData()},handleSizeChange:function(t){this.pageSize=t,this.getData()},hideDialogMR:function(t){this.showDialogMR=t}},filters:{filterStatus:function(t){this.orderStatus.forEach(function(e,a){if(t==e.val)return e.name})}},components:{Query:s,Table:h,ManualRecordDialog:D}},k={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"recharge-record"},[a("Query",{ref:"query",attrs:{orderStatus:t.orderStatus},on:{queryData:t.getData,exportExcel:t.exportExcel}}),t._v(" "),a("Table",{attrs:{list:t.pageData.list,orderStatus:t.orderStatus},on:{hideDialogMR:t.hideDialogMR}}),t._v(" "),a("div",{staticClass:"load-more",staticStyle:{display:"flex"}},[a("div",{staticClass:"count"},[a("span",[t._v("数量："),t._l(t.sumInfo,function(e,r){return a("i",{key:r},[t._v(t._s(e.sumAmount)+" "+t._s(e.coin_name))])})],2),t._v(" "),a("span",[t._v("手续费："),t._l(t.sumInfo,function(e,r){return a("i",{key:r},[t._v(t._s(e.sumFee)+" "+t._s(e.coin_name))])})],2)]),t._v(" "),a("el-pagination",{attrs:{"current-page":t.pageNum,"page-sizes":[20,50],"page-size":t.pageSize,"pager-count":5,layout:"total, sizes, prev, pager, next, jumper",total:1*t.pageData.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("ManualRecordDialog",{attrs:{showDialogMR:t.showDialogMR},on:{hideDialogMR:t.hideDialogMR,getData:t.getData}})],1)},staticRenderFns:[]};var x=a("C7Lr")(y,k,!1,function(t){a("eXM6")},"data-v-96b53892",null);e.default=x.exports}});