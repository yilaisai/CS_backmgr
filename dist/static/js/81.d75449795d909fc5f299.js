webpackJsonp([81],{bL1p:function(t,e){},gPRR:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"account"},[n("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"90px",model:t.filterForm}},[n("sac-input",{ref:"phone",attrs:{label:"刷单账号",prop:"phone"},model:{value:t.filterForm.userId,callback:function(e){t.$set(t.filterForm,"userId","string"==typeof e?e.trim():e)},expression:"filterForm.userId"}}),t._v(" "),n("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(e){return t.getList()}}}),t._v(" "),n("el-form-item",{staticStyle:{"text-align":"right"}},[n("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.syncInfo}},[t._v("同步商户信息")])],1)],1),t._v(" "),n("sac-table",{attrs:{data:t.listData.list}},[n("el-table-column",{attrs:{prop:"userId",label:"用户ID"}}),t._v(" "),n("el-table-column",{attrs:{prop:"agencyProfit",label:"代理收益"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.agencyProfit)+" "+t._s(e.row.coinName)+"\n      ")]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"margin",label:"保证金金额"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.margin)+" "+t._s(e.row.payCoinName)+"\n      ")]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"brushed",label:"已刷单"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.brushed)+" "+t._s(e.row.payCoinName)+"\n      ")]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"brushing",label:"待刷单金额"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.brushing)+" "+t._s(e.row.payCoinName)+"\n      ")]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"profit",label:"刷单收益"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.profit)+" "+t._s(e.row.coinName)+"\n      ")]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"state",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(1==e.row.state?"刷单中":"停止")+"\n      ")]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"createTime",label:"时间"}})],1),t._v(" "),n("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}})],1)},staticRenderFns:[]};var r=n("VU/8")({name:"account",data:function(){return{filterForm:{userId:"",pageNum:1,pageSize:20},listData:{total:null,list:[]}}},methods:{getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.filterForm.pageNum=e,this.getList()},getList:function(){var t=this;this.$http.post("/wallet/backmgr/shop/listMarginAccount",this.filterForm).then(function(e){t.listData.list=e.result.list,t.listData.total=e.result.count})},syncInfo:function(){var t=this;this.$http.post("/wallet/backmgr/user/migrationShopUser").then(function(e){t.$notify({title:"成功",message:"同步成功",type:"success"})})}},activated:function(){this.getList()}},a,!1,function(t){n("bL1p")},null,null);e.default=r.exports}});