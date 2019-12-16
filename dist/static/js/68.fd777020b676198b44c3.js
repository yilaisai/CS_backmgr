webpackJsonp([68],{IRYy:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={name:"getBlockChainRecd",data:function(){return{listData:{total:null,list:[]},elSwitch:!1,option:{pageSize:20,pageNum:1,recdStatus:""},recdStatusType:[{value:"",label:"全部"},{value:"2",label:"待审核"},{value:"3",label:"审核不通过"},{value:"4",label:"审核通过"}]}},methods:{getList:function(){var t=this;this.$http.post("/wallet/backmgr/block/getBlockChainRecdList",this.option).then(function(e){t.listData=e.result.list})},getPaginationChange:function(t,e){this.option.pageSize=t,this.option.pageNum=num,this.getList()},auditTrade:function(t,e){var a=this;this.$confirm("确认此操作吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var n={recdStatus:e,recdId:t};a.$http.post("/wallet/backmgr/block/auditBlockChainRecd",n).then(function(t){a.$message({type:"success",message:"审核成功!"}),a.getList()})}).catch(function(){})},submitForm:function(t){this.option.pageNum=t,this.getList()},resetForm:function(){this.$refs.recdStatus.reset(),this.$refs.filterForm.resetFields(),this.option.pageNum=1,this.getList()},onChange:function(t){}},mounted:function(){this.getList()}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"80px",model:t.option}},[a("sac-select",{ref:"recdStatus",attrs:{label:"审核状态",dataList:t.recdStatusType},on:{change:t.onChange},model:{value:t.option.recdStatus,callback:function(e){t.$set(t.option,"recdStatus",e)},expression:"option.recdStatus"}}),t._v(" "),a("sac-submit-form",{on:{submitForm:function(e){return t.submitForm(1)},resetForm:t.resetForm}})],1),t._v(" "),a("sac-table",{attrs:{data:t.listData.list}},[a("el-table-column",{attrs:{prop:"coinName",label:"币种"}}),t._v(" "),a("el-table-column",{attrs:{prop:"amount",label:"数量"}}),t._v(" "),a("el-table-column",{attrs:{prop:"recdStatus",label:"审核状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[2==e.row.recdStatus?a("span",[t._v("待审核")]):t._e(),t._v(" "),3==e.row.recdStatus?a("span",{staticStyle:{color:"red"}},[t._v("不通过")]):t._e(),t._v(" "),4==e.row.recdStatus?a("span",{staticStyle:{color:"green"}},[t._v("通过")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"direction",label:"交易方向"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.direction?a("span",[t._v("提币")]):t._e(),t._v(" "),1==e.row.direction?a("span",[t._v("充币")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"txStatus",label:"上链状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.txStatus?a("span",[t._v("成功")]):t._e(),t._v(" "),1==e.row.txStatus?a("span",[t._v("失败")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"fromAddr",label:"来源地址"}}),t._v(" "),a("el-table-column",{attrs:{prop:"toAddr",label:"目标地址"}}),t._v(" "),a("el-table-column",{attrs:{prop:"txId",label:"hash值"}}),t._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"创建时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"txTime",label:"交易时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v("\n          "+t._s(t._f("dateFormat")(1e3*+e.row.txTime,"YYYY-MM-DD HH:mm:ss"))+"\n        ")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"审核",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{disabled:2!=e.row.recdStatus,type:"success",size:"small"},nativeOn:{click:function(a){return t.auditTrade(e.row.recdId,"4")}}},[t._v("通过\n        ")]),t._v(" "),a("el-button",{attrs:{disabled:2!=e.row.recdStatus,type:"danger",size:"small"},nativeOn:{click:function(a){return t.auditTrade(e.row.recdId,"3")}}},[t._v("不通过\n        ")])]}}])})],1),t._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.option.pageSize,"current-page":t.option.pageNum},on:{handleChange:t.getPaginationChange}})],1)},staticRenderFns:[]};var s=a("VU/8")(n,o,!1,function(t){a("u4xf")},"data-v-569ff668",null);e.default=s.exports},u4xf:function(t,e){}});