webpackJsonp([28],{fYyu:function(t,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={render:function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"position-record"},[l("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"100px",model:t.filterForm}},[l("sac-input",{ref:"phone",attrs:{label:"用户名",prop:"phone"},model:{value:t.filterForm.phone,callback:function(e){t.$set(t.filterForm,"phone","string"==typeof e?e.trim():e)},expression:"filterForm.phone"}}),t._v(" "),l("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(e){return t.submitForm(1)}}})],1),t._v(" "),l("sac-table",{attrs:{data:t.listData.list}},[l("el-table-column",{attrs:{prop:"phone",label:"用户名"}}),t._v(" "),l("el-table-column",{attrs:{prop:"planName",label:"参与计划"}}),t._v(" "),l("el-table-column",{attrs:{prop:"amount",label:"持仓资产"}}),t._v(" "),l("el-table-column",{attrs:{prop:"daylyIncome",label:"每日收益"}}),t._v(" "),l("el-table-column",{attrs:{prop:"income",label:"累计收益"}}),t._v(" "),l("el-table-column",{attrs:{prop:"createTime",label:"申购时间"}}),t._v(" "),l("el-table-column",{attrs:{prop:"endTime",label:"到期时间"}}),t._v(" "),l("el-table-column",{attrs:{prop:"recdNum",label:"期数"}})],1),t._v(" "),l("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}})],1)},staticRenderFns:[]};var n=l("VU/8")({name:"position-record",data:function(){return{filterForm:{phone:"",isTransfer:"INVALID0",pageNum:1,pageSize:20},listData:{total:null,list:[]}}},methods:{submitForm:function(t){this.filterForm.pageNum=t,this.getCoinPlanRecd()},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.submitForm(e)},getCoinPlanRecd:function(){var t=this;this.$http.post("wallet/backmgr/plan/getCoinPlanRecd",this.filterForm).then(function(e){t.listData.list=e.result.list.list,t.listData.total=e.result.list.total})}},activated:function(){this.getCoinPlanRecd()}},a,!1,function(t){l("llMK")},null,null);e.default=n.exports},llMK:function(t,e){}});