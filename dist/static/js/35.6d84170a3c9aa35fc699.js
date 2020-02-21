webpackJsonp([35],{WvAM:function(t,e){},a3Yh:function(t,e,l){"use strict";e.__esModule=!0;var a,s=l("liLe"),i=(a=s)&&a.__esModule?a:{default:a};e.default=function(t,e,l){return e in t?(0,i.default)(t,e,{value:l,enumerable:!0,configurable:!0,writable:!0}):t[e]=l,t}},"c+R8":function(t,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=l("a3Yh"),s=l.n(a),i=l("4YfN"),r=l.n(i),o=(l("s0MJ"),{name:"user-processing",data:function(){return{ruleForm:{userId:"",reason:"",status:0},ruleState:[{label:"正常状态",value:0},{label:"24小时冻结",value:1},{label:"永远冻结",value:2}],dialogTitle:"修改用户状态",dialogVisible:!1,currentPage:1,status:"0",filter_text:"",filterForm:{pageNum:1,pageSize:20},placeWord:"用户ID",stateData:[{label:"用户ID",value:"0",key:"userId"},{label:"订单ID",value:"1",key:"tradeId"},{label:"邮箱",value:"2",key:"email"},{label:"姓名",value:"3",key:"realName"},{label:"手机号",value:"4",key:"phone"}],listData:{total:null,list:[]}}},methods:{getList:function(){var t=this,e=r()({},this.filterForm);""!==this.filter_text&&this.stateData.forEach(function(l){l.value==t.status&&(e=r()({},e,s()({},l.key,t.filter_text)))}),this.$http.post("/wallet/app/otc/backmgr/getCustomList",e).then(function(e){var l=e.result,a=l.list,s=l.total;t.listData.list=a,t.listData.total=s})},search:function(){this.getList()},modify:function(t){this.$refs.ruleForm&&this.$refs.ruleForm.resetFields();var e=0;this.ruleState.forEach(function(l){l.label!=t.reason||(e=l.value)}),this.ruleForm.userId=t.userId,this.ruleForm.status=e,this.dialogVisible=!0},selChange:function(t){var e=this;this.stateData.forEach(function(l,a){l.value!=t||(e.placeWord=l.label)})},dialogConfirm:function(){var t=this;this.ruleState.forEach(function(e){e.value!=t.ruleForm.status||(t.ruleForm.reason=e.label)}),this.$refs.ruleForm.validate(function(e){if(!e)return!1;t.$http.post("/wallet/app/otc/backmgr/setCustomStatus",t.ruleForm).then(function(e){t.$notify({title:"成功",message:"修改成功",type:"success"}),t.dialogVisible=!1,t.getList()})})},handleCurrentChange:function(t,e){this.filterForm.pageSize=t,this.filterForm.pageNum=e,this.getList()},checkLog:function(){this.$router.push({name:"user-history"})}},activated:function(){this.getList()}}),n={render:function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"user-processing"},[l("el-container",[l("el-header",{staticClass:"filter-header"},[l("div",{staticClass:"left"},[l("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入"+t.placeWord},model:{value:t.filter_text,callback:function(e){t.filter_text=e},expression:"filter_text"}},[l("el-select",{staticStyle:{width:"130px"},attrs:{slot:"prepend"},on:{change:t.selChange},slot:"prepend",model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},t._l(t.stateData,function(t,e){return l("el-option",{key:e,attrs:{label:t.label,value:t.value}})}),1),t._v(" "),l("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.search},slot:"append"},[t._v("搜索")])],1)],1),t._v(" "),l("div",{staticClass:"right"},[l("el-button",{on:{click:t.checkLog}},[t._v("查看历史处理记录")])],1)]),t._v(" "),l("el-main",[l("el-table",{staticStyle:{width:"100%"},attrs:{data:t.listData.list,border:"",height:"100%"}},[l("el-table-column",{attrs:{prop:"userId",label:"用户id"}}),t._v(" "),l("el-table-column",{attrs:{prop:"userName",label:"用户名"}}),t._v(" "),l("el-table-column",{attrs:{prop:"reason",label:"当前状态"}}),t._v(" "),l("el-table-column",{attrs:{label:"操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("el-button",{attrs:{plain:"",size:"small"},nativeOn:{click:function(l){return t.modify(e.row)}}},[t._v("修改\n                        ")])]}}])})],1)],1),t._v(" "),l("el-footer",[l("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.handleCurrentChange}})],1),t._v(" "),l("el-dialog",{attrs:{title:t.dialogTitle,visible:t.dialogVisible,width:"40%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[l("el-form",{ref:"ruleForm",attrs:{inline:!0,"label-width":"90px",model:t.ruleForm}},[l("el-form-item",{attrs:{label:"状态调整:",prop:"status"}},[l("el-select",{model:{value:t.ruleForm.status,callback:function(e){t.$set(t.ruleForm,"status",e)},expression:"ruleForm.status"}},t._l(t.ruleState,function(t,e){return l("el-option",{key:e,attrs:{label:t.label,value:t.value}})}),1)],1)],1),t._v(" "),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:t.dialogConfirm}},[t._v("确认")])],1)],1)],1)],1)},staticRenderFns:[]};var u=l("C7Lr")(o,n,!1,function(t){l("WvAM")},"data-v-621ac0a0",null);e.default=u.exports}});