webpackJsonp([10],{Kv7E:function(t,e){},bzwV:function(t,e){},oVP9:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("Dd8w"),r=a.n(i),n=a("NYxO"),l={props:{orderStatus:{type:Array}},data:function(){return{pickerOptions:{disabledDate:function(t){return t.getTime()>Date.now()},shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}},{text:"最近半年",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-15552e6),t.$emit("pick",[a,e])}},{text:"最近一年",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-31536e6),t.$emit("pick",[a,e])}}]},formData:{create_time:"",addr:"",coinName:null,startDate:"",endDate:"",name:"",orderId:"",pageNum:"",pageSize:"",status:null,txId:""}}},methods:{queryData:function(){this.formData.create_time?(this.formData.startDate=this.formData.create_time[0],this.formData.endDate=this.formData.create_time[1]):(this.formData.startDate="",this.formData.endDate=""),this.$emit("queryData",this.formData)},clear:function(){this.formData={create_time:"",addr:"",coinName:null,startDate:"",endDate:"",name:"",orderId:"",pageNum:"",pageSize:"",status:null,txId:""}},fetchFilter:function(){return this.filter}},computed:r()({},Object(n.b)(["coinInfo"]))},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-collapse",[a("el-collapse-item",{attrs:{title:"查询条件",name:"filter"}},[a("el-form",{ref:"form",attrs:{model:t.formData,"label-width":"50px",size:"mini",inline:""}},[a("div",[a("el-form-item",{attrs:{label:"账号："}},[a("el-input",{attrs:{placeholder:"账号"},model:{value:t.formData.name,callback:function(e){t.$set(t.formData,"name",e)},expression:"formData.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"昵称："}},[a("el-input",{attrs:{placeholder:"搜索地址"},model:{value:t.formData.nickName,callback:function(e){t.$set(t.formData,"nickName",e)},expression:"formData.nickName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"币种："}},[a("el-select",{staticStyle:{width:"185px"},attrs:{placeholder:"选择类型",clearable:""},model:{value:t.formData.coinName,callback:function(e){t.$set(t.formData,"coinName",e)},expression:"formData.coinName"}},[a("el-option",{attrs:{value:null,label:"全部"}}),t._v(" "),t._l(t.coinInfo,function(t,e){return a("el-option",{key:e,attrs:{value:t.coinName,label:t.coinName}})})],2)],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"时间："}},[a("el-date-picker",{attrs:{id:"createtime",type:"datetimerange",align:"right",width:"auto","value-format":"yyyy-MM-dd HH:mm:ss","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},model:{value:t.formData.create_time,callback:function(e){t.$set(t.formData,"create_time",e)},expression:"formData.create_time"}})],1),t._v(" "),a("el-form-item",[a("el-button",{staticStyle:{"margin-left":"60px"},attrs:{type:"primary"},on:{click:t.queryData}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.clear}},[t._v("清空")])],1)],1)],1)],1)},staticRenderFns:[]};var s=a("VU/8")(l,o,!1,function(t){a("Kv7E")},"data-v-340c02be",null).exports,m=[],c={props:{list:{type:Array},orderStatus:{type:Array}},created:function(){m=this.orderStatus||[]},data:function(){return{showDialogMT:!1}},filters:{filterStatus:function(t){var e="";return m.forEach(function(a,i){t==a.val&&(e=a.name)}),e},filterType:function(t){return 2==t?"充值":"提币"}},methods:{handleEdit:function(t,e){this.showDialogMT=!0},hideDialogMT:function(t){this.showDialogMT=t}}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table-wrap"},[t._m(0),t._v(" "),a("el-table",{staticStyle:{"min-width":"100%"},attrs:{data:t.list,height:"auto",border:"",size:"mini"}},[a("el-table-column",{attrs:{prop:"create_time",label:"时间",width:"140"}}),t._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"账号",width:"140",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"nick_name",label:"昵称",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"coin_name",label:"币种",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"type_name",label:"描述",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"balance_change",label:"可用资金变化",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"balance",label:"可用资金余额",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"frozen_amount_change",label:"冻结资金变化",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"frozen_amount",label:"冻结资金余额",align:"center"}})],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"table-title"},[e("h4",[this._v("商户资金流水列表")]),this._v(" "),e("div",{staticClass:"btn-wrap"})])}]};var f=a("VU/8")(c,u,!1,function(t){a("uDXA")},"data-v-143edde9",null).exports,d={props:{showDialogMR:{type:Boolean,default:!1}},data:function(){return{form:{sysUserId:"123456",txId:"",coinName:"USDT",toAddr:"",fromAddr:"",blockFee:"0",blockAmount:""}}},methods:{manualDo:function(){var t=this;for(var e in this.form)if(""===this.form[e])return void this.$notify.error({title:"提示",message:"数据填写不完整"});this.$http.get("/backmgr/manual",this.form).then(function(e){200==e.code?(t.$notify.success({title:"提示",message:"录入成功！"}),t.dialogVisible=!1,t.$emit("getData")):t.$notify.error({title:"提示",message:e.msg})})}},computed:{dialogVisible:{get:function(){return this.showDialogMR},set:function(t){this.$emit("hideDialogMR",t)}}}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:"手动录单",visible:t.dialogVisible,width:"30%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px",size:"mini"}},[a("el-form-item",{attrs:{label:"币种"}},[a("el-select",{attrs:{placeholder:"请选择币种"},model:{value:t.form.coinName,callback:function(e){t.$set(t.form,"coinName",e)},expression:"form.coinName"}},t._l(["USDT","ETH","BTC","EOS"],function(t,e){return a("el-option",{key:e,attrs:{value:t,label:t}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"TXID"}},[a("el-input",{model:{value:t.form.txId,callback:function(e){t.$set(t.form,"txId","string"==typeof e?e.trim():e)},expression:"form.txId"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"from地址"}},[a("el-input",{model:{value:t.form.fromAddr,callback:function(e){t.$set(t.form,"fromAddr","string"==typeof e?e.trim():e)},expression:"form.fromAddr"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"to地址"}},[a("el-input",{model:{value:t.form.toAddr,callback:function(e){t.$set(t.form,"toAddr","string"==typeof e?e.trim():e)},expression:"form.toAddr"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"数量"}},[a("el-input",{model:{value:t.form.blockAmount,callback:function(e){t.$set(t.form,"blockAmount","string"==typeof e?e.trim():e)},expression:"form.blockAmount"}},[a("template",{slot:"append"},[t._v("USDT")])],2)],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.manualDo}},[t._v("确 定")])],1)],1)},staticRenderFns:[]},h={data:function(){return{pageSize:20,pageNum:1,pageData:{total:0,list:[]},orderStatus:[{name:"创建订单",val:0},{name:"未知",val:1},{name:"未知",val:2},{name:"申诉买方赢，直接放币",val:3},{name:"申诉卖方赢，出售广告回滚卖家的币",val:4},{name:"未知",val:5},{name:"未知",val:6},{name:"未知",val:7},{name:"未知",val:8},{name:"未知",val:9},{name:"未知",val:10},{name:"成为商户",val:11},{name:"未知",val:12},{name:"未知",val:13},{name:"未知",val:14},{name:"未知",val:15},{name:"未知",val:16},{name:"未知",val:17}],showDialogMR:!1,formData:{}}},activated:function(){this.getData()},methods:{getData:function(t){var e=this;t&&(this.pageNum=1),(t=t||this.formData).pageNum=this.pageNum,t.pageSize=this.pageSize,this.formData=t,this.$http.post("/wallet/backmgr/merchant/trade/queryAmountFlowPage",t).then(function(t){200==t.code&&(e.pageData=t.result.pageInfo)})},handleCurrentChange:function(t){this.pageNum=t,this.getData()},handleSizeChange:function(t){this.pageSize=t,this.getData()},hideDialogMR:function(t){this.showDialogMR=t}},filters:{filterStatus:function(t){this.orderStatus.forEach(function(e,a){if(t==e.val)return e.name})}},components:{Query:s,Table:f,ManualRecordDialog:a("VU/8")(d,p,!1,null,null,null).exports}},v={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"recharge-record"},[a("Query",{ref:"query",attrs:{orderStatus:t.orderStatus},on:{queryData:t.getData}}),t._v(" "),a("Table",{attrs:{list:t.pageData.list,orderStatus:t.orderStatus},on:{hideDialogMR:t.hideDialogMR}}),t._v(" "),a("div",{staticClass:"load-more",staticStyle:{display:"flex"}},[a("div",{staticClass:"count"}),t._v(" "),a("el-pagination",{attrs:{"current-page":t.pageNum,"page-sizes":[20,50],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:1*t.pageData.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("ManualRecordDialog",{attrs:{showDialogMR:t.showDialogMR},on:{hideDialogMR:t.hideDialogMR,getData:t.getData}})],1)},staticRenderFns:[]};var g=a("VU/8")(h,v,!1,function(t){a("bzwV")},"data-v-3c168695",null);e.default=g.exports},uDXA:function(t,e){}});