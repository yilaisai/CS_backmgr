webpackJsonp([45],{"6P5V":function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"capitalFlow-page"},[l("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"80px",model:e.filterForm,size:"mini"}},[l("el-form-item",{attrs:{label:"订单号:"}},[l("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入单号"},model:{value:e.filterForm.userId,callback:function(t){e.$set(e.filterForm,"userId",t)},expression:"filterForm.userId"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"账号:"}},[l("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入用户账号"},model:{value:e.filterForm.userId,callback:function(t){e.$set(e.filterForm,"userId",t)},expression:"filterForm.userId"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"币种:"}},[l("el-select",{model:{value:e.filterForm.coinName,callback:function(t){e.$set(e.filterForm,"coinName",t)},expression:"filterForm.coinName"}},e._l(e.coinList,function(e,t){return l("el-option",{key:t,attrs:{value:e.label,label:e.value}})}),1)],1),e._v(" "),l("el-form-item",{staticClass:"dateItem",attrs:{label:"时间:"}},[l("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:function(t){e.filterForm.dateType=""}},model:{value:e.selectedDate,callback:function(t){e.selectedDate=t},expression:"selectedDate"}})],1),e._v(" "),l("el-form-item",[l("el-button",{attrs:{type:"primary"},nativeOn:{click:function(t){return e.search(t)}}},[e._v("搜索")])],1)],1),e._v(" "),l("div",{staticStyle:{height:"100%"}},[l("el-table",{attrs:{data:e.listData.list,border:"",height:"100%",size:"mini"}},[l("el-table-column",{attrs:{label:"时间",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return l("div",{},[l("p",[e._v(e._s(e.$fmtDate(t.row.createTime,"full")))])])}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"coinName",label:"币种",align:"center"}}),e._v(" "),l("el-table-column",{attrs:{prop:"phone",label:"账号",align:"center"}}),e._v(" "),l("el-table-column",{attrs:{prop:"nickName",label:"昵称",align:"center"}}),e._v(" "),l("el-table-column",{attrs:{prop:"tradeType",label:"类型",width:"120",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(e._f("optType")(t.row.optType)))])]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"balanceChange",label:"可用资金变化",width:"120",align:"center"}}),e._v(" "),l("el-table-column",{attrs:{prop:"balance",label:"可用资金余额",width:"120",align:"center"}}),e._v(" "),l("el-table-column",{attrs:{label:"冻结资金变化",prop:"frozenAmountChange",width:"120",align:"center"}}),e._v(" "),l("el-table-column",{attrs:{label:"冻结资金余额",prop:"frozenAmount",width:"120",align:"center"}})],1)],1),e._v(" "),l("div",[l("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.filterForm.pageSize,"current-page":e.filterForm.pageNum},on:{handleChange:e.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var r=l("VU/8")({components:{},data:function(){return{selectedDate:[],filterForm:{pageNum:1,pageSize:20,startDate:"",endDate:"",coinName:""},listData:{total:null,list:[]},coinList:[{value:"所有",label:""},{value:"USDT",label:"USDT"},{value:"BTC",label:"BTC"},{value:"ETH",label:"ETH"}]}},mounted:function(){this.getList()},methods:{search:function(){this.filterForm.pageNum=1,this.getList()},handleCurrentChange:function(e,t){this.filterForm.pageSize=e,this.filterForm.pageNum=t,this.getList()},getList:function(){var e=this;2==this.selectedDate.length&&(this.filterForm.startDate=this.selectedDate&&this.$fmtDate(this.selectedDate[0].getTime())+" 00:00:00",this.filterForm.endDate=this.selectedDate&&this.$fmtDate(this.selectedDate[1].getTime())+" 23:59:59"),this.$http.post("/wallet/app/otc/backmgr/queryOtcMoneyChangeInfo",this.filterForm).then(function(t){var l=t.result,a=l.list,r=l.total;e.listData.list=a,e.listData.total=r})}},watch:{},computed:{}},a,!1,function(e){l("YuOy")},"data-v-5a296fec",null);t.default=r.exports},YuOy:function(e,t){}});