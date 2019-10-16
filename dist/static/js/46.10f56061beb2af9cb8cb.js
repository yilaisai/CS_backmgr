webpackJsonp([46],{"6P5V":function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"capitalFlow-page"},[l("div",[l("div",[l("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"80px",model:e.filterForm}},[l("el-form-item",{attrs:{label:"订单号:"}},[l("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入单号"},model:{value:e.filterForm.userId,callback:function(t){e.$set(e.filterForm,"userId",t)},expression:"filterForm.userId"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"账号:"}},[l("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入用户账号"},model:{value:e.filterForm.userId,callback:function(t){e.$set(e.filterForm,"userId",t)},expression:"filterForm.userId"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"状态:"}},[l("el-select",{model:{value:e.filterForm.tradeStatus,callback:function(t){e.$set(e.filterForm,"tradeStatus",t)},expression:"filterForm.tradeStatus"}},e._l(e.statusList,function(e,t){return l("el-option",{key:t,attrs:{value:e.label,label:e.value}})}),1)],1),e._v(" "),l("el-form-item",{attrs:{label:"币种:"}},[l("el-select",{model:{value:e.filterForm.coinName,callback:function(t){e.$set(e.filterForm,"coinName",t)},expression:"filterForm.coinName"}},e._l(e.coinList,function(e,t){return l("el-option",{key:t,attrs:{value:e.label,label:e.value}})}),1)],1),e._v(" "),l("el-form-item",{attrs:{label:"广告类型:"}},[l("el-select",{model:{value:e.filterForm.trans,callback:function(t){e.$set(e.filterForm,"trans",t)},expression:"filterForm.trans"}},e._l(e.transList,function(e,t){return l("el-option",{key:t,attrs:{value:e.label,label:e.value}})}),1)],1),e._v(" "),l("el-form-item",{staticClass:"dateItem",attrs:{label:"时间:"}},[l("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:function(t){e.filterForm.dateType=""}},model:{value:e.selectedDate,callback:function(t){e.selectedDate=t},expression:"selectedDate"}})],1),e._v(" "),l("el-button",{staticClass:"btn",attrs:{type:"primary",size:"small"},nativeOn:{click:function(t){return e.search(t)}}},[e._v("搜索\n\t\t\t\t")])],1)],1),e._v(" "),l("div",[l("el-table",{attrs:{data:e.listData.list,border:"",height:"100%"}},[l("el-table-column",{attrs:{label:"单号/下单时间",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return l("div",{},[l("p",[e._v(e._s(t.row.recdId))]),e._v(" "),l("p",[e._v(e._s(e.$fmtDate(t.row.createStamp,"full")))])])}}])}),e._v(" "),l("el-table-column",{attrs:{label:"taker昵称/账户",width:"150",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return l("div",{},[l("p",[e._v(e._s(t.row.takerName))]),e._v(" "),l("p",[e._v(e._s(t.row.takerPhone))])])}}])}),e._v(" "),l("el-table-column",{attrs:{label:"maker昵称/账户",width:"150",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return l("div",{},[l("p",[e._v(e._s(t.row.makerName))]),e._v(" "),l("p",[e._v(e._s(t.row.makerPhone))])])}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"tradeTime",label:"状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return l("div",{},[l("span",[e._v(e._s(1==t.row.tradeStatus?"未付款":2==t.row.tradeStatus?"待放行":3==t.row.tradeStatus?"已完成":4==t.row.tradeStatus?"已取消":5==t.row.tradeStatus?"申述":""))])])}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"tradeType",label:"广告类型",width:"80",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.trans?l("span",[e._v("购买")]):l("span",[e._v("出售")])]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"价格/数量/金额",width:"120",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return l("div",{},[l("p",[e._v(e._s(t.row.price))]),e._v(" "),l("p",[e._v(e._s(t.row.amount))]),e._v(" "),l("p",[e._v(e._s(t.row.money))])])}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"coinName",label:"币种",align:"center"}}),e._v(" "),l("el-table-column",{attrs:{prop:"fee",label:"手续费",align:"center"}})],1)],1),e._v(" "),l("div",[l("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.filterForm.pageSize,"current-page":e.filterForm.pageNum},on:{handleChange:e.handleCurrentChange}})],1)])])},staticRenderFns:[]};var r=l("VU/8")({components:{},data:function(){return{selectedDate:[],filterForm:{pageNum:1,pageSize:20,startDate:"",endDate:"",coinName:"",tradeStatus:"",tradeType:"0",trans:"",dateType:"1"},listData:{total:null,list:[]},statusList:[{value:"全部",label:""},{value:"未付款",label:"1"},{value:"已付款(待放行)",label:"2"},{value:"已完成",label:"3"},{value:"已取消",label:"4"},{value:"申述中",label:"5"}],coinList:[{value:"所有",label:""},{value:"USDT",label:"USDT"},{value:"BTC",label:"BTC"}],transList:[{value:"所有",label:""},{value:"购买",label:"1"},{value:"出售",label:"0"}]}},mounted:function(){},methods:{handleCurrentChange:function(){}},watch:{},computed:{}},a,!1,function(e){l("eSwf")},"data-v-6023c448",null);t.default=r.exports},eSwf:function(e,t){}});