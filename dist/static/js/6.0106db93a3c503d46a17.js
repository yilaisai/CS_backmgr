webpackJsonp([6],{EJqt:function(t,e){},Z6OX:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("EaCm"),l={name:"transfer-approval",data:function(){return{filterForm:{tradeType:"",tradeStatus:2,fromOrToUserPhone:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},transactionType:r.g,dialogFormVisible:!1,dialogForm:{sysRemark:"",tradeStatus:"",tradeId:""}}},methods:{resetForm:function(){this.$refs.tradeType.reset(),this.$refs.fromOrToUserPhone.reset(),this.$refs.filterForm.resetFields(),this.filterForm.pageNum=1,this.getTradeList()},submitForm:function(t){this.filterForm.pageNum=t,this.getTradeList()},getTradeList:function(){var t=this;this.$http.post("wallet/backmgr/trade/getTradeList",this.filterForm).then(function(e){var a=e.result.retMap?e.result.retMap:e.result,r=a.list,l=a.total;t.listData.list=r,t.listData.total=l})},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.submitForm(e)},auditTrade:function(t,e){this.dialogFormVisible=!0,this.dialogForm.tradeId=t,this.dialogForm.sysRemark="",this.dialogForm.tradeStatus=e,this.auditTradeData={tradeId:t,tradeStatus:e}},auditSubmit:function(t){var e=this;this.$refs[t].validate(function(t){t&&e.$http.post("wallet/backmgr/trade/auditTrade",e.dialogForm).then(function(t){e.$message({message:t.msg,type:"success"}),e.dialogFormVisible=!1,e.getTradeList()}).catch(function(){e.dialogFormVisible=!1})})}},activated:function(){this.getTradeList()}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"transfer-approval"},[a("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"80px",model:t.filterForm}},[a("sac-select",{ref:"tradeType",attrs:{label:"交易类型",dataList:t.transactionType},model:{value:t.filterForm.tradeType,callback:function(e){t.$set(t.filterForm,"tradeType",e)},expression:"filterForm.tradeType"}}),t._v(" "),a("sac-input",{ref:"fromOrToUserPhone",attrs:{label:"用户账号"},model:{value:t.filterForm.fromOrToUserPhone,callback:function(e){t.$set(t.filterForm,"fromOrToUserPhone","string"==typeof e?e.trim():e)},expression:"filterForm.fromOrToUserPhone"}}),t._v(" "),a("sac-submit-form",{on:{submitForm:function(e){return t.submitForm(1)},resetForm:t.resetForm}})],1),t._v(" "),a("sac-table",{attrs:{data:t.listData.list}},[a("el-table-column",{attrs:{prop:"tradeId",label:"序号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"fromUserPhone",label:"用户账号"}}),t._v(" "),a("el-table-column",{attrs:{label:"交易类型"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("convertTransactionType")(e.row.tradeType)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"coinName",label:"交易币种"}}),t._v(" "),a("el-table-column",{attrs:{prop:"amount",label:"转账金额"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tradeTime",label:"创建时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"alarmType",label:"时间告警"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{class:{red:"审核告警"==e.row.alarmType}},[t._v(t._s(e.row.alarmType))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"审批状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v("审核中")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"success",size:"small"},nativeOn:{click:function(a){return t.auditTrade(e.row.tradeId,"AUDIT_SUC")}}},[t._v("审核通过\n        ")]),t._v(" "),a("el-button",{attrs:{type:"danger",size:"small"},nativeOn:{click:function(a){return t.auditTrade(e.row.tradeId,"AUDIT_FAIL")}}},[t._v("拒绝\n        ")])]}}])})],1),t._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}}),t._v(" "),a("el-dialog",{attrs:{title:"备注",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{ref:"dialogForm",attrs:{model:t.dialogForm}},[a("el-form-item",{attrs:{prop:"desc",label:("AUDIT_SUC"==t.dialogForm.tradeStatus?"审核通过":"拒绝")+"理由"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:6},maxlength:"50",placeHolder:"请输入理由"},model:{value:t.dialogForm.sysRemark,callback:function(e){t.$set(t.dialogForm,"sysRemark",e)},expression:"dialogForm.sysRemark"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(e){return t.auditSubmit("dialogForm")}}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var s=a("C7Lr")(l,o,!1,function(t){a("EJqt")},null,null);e.default=s.exports}});