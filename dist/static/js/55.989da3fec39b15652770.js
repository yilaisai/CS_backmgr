webpackJsonp([55],{"B87/":function(t,e){},o92h:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"exchangeSAC",data:function(){return{filterForm:{nickName:"",phoneOrEmail:"",pageNum:1,pageSize:20,coinName:"USDT",order:"desc"},listData:{total:null,list:[]}}},methods:{indexMethod:function(t){return 20*(this.filterForm.pageNum-1)+t+1},sortChange:function(t){"ascending"==t.order?this.filterForm.order="asc":this.filterForm.order="desc","btcAmount"==t.prop?this.filterForm.coinName="BTC":this.filterForm.coinName="USDT",this.filterForm.pageNum=1,this.getUserRaking()},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.filterForm.pageNum=e,this.getUserRaking()},getUserRaking:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/getUserRaking",this.filterForm).then(function(e){t.listData.list=e.result.CustomerInfoExList.list,t.listData.total=e.result.CustomerInfoExList.total})},detail:function(t){}},activated:function(){this.getUserRaking()}},i={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"exchangeSAC"},[r("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"90px",model:t.filterForm}},[r("sac-input",{ref:"phone",attrs:{label:"账号"},model:{value:t.filterForm.phoneOrEmail,callback:function(e){t.$set(t.filterForm,"phoneOrEmail","string"==typeof e?e.trim():e)},expression:"filterForm.phoneOrEmail"}}),t._v(" "),r("sac-input",{ref:"phone",attrs:{label:"昵称"},model:{value:t.filterForm.nickName,callback:function(e){t.$set(t.filterForm,"nickName","string"==typeof e?e.trim():e)},expression:"filterForm.nickName"}}),t._v(" "),r("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(e){return t.getUserRaking()}}})],1),t._v(" "),r("el-table",{attrs:{stripe:"",border:"",height:"100%","default-sort":{prop:"usdtAmount",order:"descending"},data:t.listData.list},on:{"sort-change":t.sortChange}},[r("el-table-column",{attrs:{type:"index",label:"序号",index:t.indexMethod}}),t._v(" "),r("el-table-column",{attrs:{prop:"phone",label:"手机号"}}),t._v(" "),r("el-table-column",{attrs:{prop:"nickName",label:"昵称"}}),t._v(" "),r("el-table-column",{attrs:{prop:"usdtAmount",sortable:"custom",label:"USDT"}}),t._v(" "),r("el-table-column",{attrs:{prop:"btcAmount",sortable:"custom",label:"BTC"}}),t._v(" "),r("el-table-column",{attrs:{prop:"registTime",label:"时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(t.$fmtDate(e.row.registTime,"full"))+"\n      ")]}}])})],1),t._v(" "),r("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}})],1)},staticRenderFns:[]};var n=r("VU/8")(a,i,!1,function(t){r("B87/")},null,null);e.default=n.exports}});