webpackJsonp([36],{"9DXB":function(t,e){},eW1u:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("EaCm"),r={name:"home",components:{},data:function(){return{filterForm:{auditStatus:"",phone:"",realName:"",cardNo:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},identityType:i.d}},methods:{resetForm:function(){this.$refs.phone.reset(),this.$refs.realName.reset(),this.$refs.cardNo.reset(),this.filterForm.auditStatus="",this.$refs.filterForm.resetFields(),this.filterForm.pageNum=1,this.getWaittingAuditUser()},submitForm:function(t){this.filterForm.pageNum=t,this.getWaittingAuditUser()},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.submitForm(e)},getWaittingAuditUser:function(){var t=this;this.$http.post("wallet/backmgr/user/getWaittingAuditUser",this.filterForm).then(function(e){var a=e.result.list,i=a.list,r=a.total;t.listData.list=i,t.listData.total=r})},goDetails:function(t){this.$router.push({name:"identityDetails",params:t})},quickAudit:function(){var t=this;this.$confirm("确定一键审核吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.post("/wallet/backmgr/user/quickAudit").then(function(e){t.$notify({title:"成功",message:"一键审核成功",type:"success"})})}).catch(function(){t.$message({type:"info",message:"已取消一键审核"})})}},activated:function(){this.getWaittingAuditUser()}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"sac-home"},[a("div",{staticClass:"sac-queryCondition"},[a("el-form",{ref:"filterForm",staticClass:"filter-container",attrs:{inline:!0,"label-width":"80px",model:t.filterForm}},[a("sac-select",{attrs:{label:"审核状态","data-list":t.identityType},model:{value:t.filterForm.auditStatus,callback:function(e){t.$set(t.filterForm,"auditStatus",e)},expression:"filterForm.auditStatus"}}),t._v(" "),a("sac-input",{ref:"phone",attrs:{label:"手机号",prop:"phone"},model:{value:t.filterForm.phone,callback:function(e){t.$set(t.filterForm,"phone","string"==typeof e?e.trim():e)},expression:"filterForm.phone"}}),t._v(" "),a("sac-input",{ref:"realName",attrs:{label:"姓名",prop:"realName"},model:{value:t.filterForm.realName,callback:function(e){t.$set(t.filterForm,"realName","string"==typeof e?e.trim():e)},expression:"filterForm.realName"}}),t._v(" "),a("sac-input",{ref:"cardNo",attrs:{label:"身份证",prop:"cardNo"},model:{value:t.filterForm.cardNo,callback:function(e){t.$set(t.filterForm,"cardNo","string"==typeof e?e.trim():e)},expression:"filterForm.cardNo"}}),t._v(" "),a("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(e){return t.submitForm(1)},resetForm:t.resetForm}}),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"danger",size:"small"},on:{click:t.quickAudit}},[t._v("一键审核")])],1)],1)],1),t._v(" "),a("sac-table",{attrs:{data:t.listData.list}},[a("el-table-column",{attrs:{prop:"phone",label:"账号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"realName",label:"姓名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"cardNo",label:"身份证号码"}}),t._v(" "),a("el-table-column",{attrs:{label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{directives:[{name:"show",rawName:"v-show",value:-1==e.row.antiMoneyAudit,expression:"scope.row.antiMoneyAudit == -1"}]},[t._v("未申请")]),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:0==e.row.antiMoneyAudit,expression:"scope.row.antiMoneyAudit == 0"}]},[t._v("不通过")]),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:1==e.row.antiMoneyAudit,expression:"scope.row.antiMoneyAudit == 1"}]},[t._v("通过")]),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:2==e.row.antiMoneyAudit,expression:"scope.row.antiMoneyAudit == 2"}]},[t._v("待审核")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",prop:"tradeStatus"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"success",size:"small"},nativeOn:{click:function(a){return t.goDetails(e.row)}}},[t._v("查看详情")])]}}])})],1),t._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}})],1)},staticRenderFns:[]};var o=a("VU/8")(r,s,!1,function(t){a("9DXB")},null,null);e.default=o.exports}});