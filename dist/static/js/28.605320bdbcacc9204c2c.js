webpackJsonp([28],{TYL1:function(t,e){},eW1u:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("bOdI"),r=i.n(a),l=i("EaCm"),n={name:"home",components:{},data:function(){var t;return{filterForm:{auditStatus:"",phone:"",realName:"",cardNo:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},antiMoneyAuditMap:(t={},r()(t,-1,"未申请"),r()(t,0,"不通过"),r()(t,1,"通过"),r()(t,2,"待审核"),t),identityType:l.d}},methods:{resetForm:function(){this.$refs.phone.reset(),this.$refs.realName.reset(),this.$refs.cardNo.reset(),this.filterForm.auditStatus="",this.$refs.filterForm.resetFields(),this.filterForm.pageNum=1,this.getWaittingAuditUser()},submitForm:function(t){this.filterForm.pageNum=t,this.getWaittingAuditUser()},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.submitForm(e)},getWaittingAuditUser:function(){var t=this;this.$http.post("wallet/backmgr/user/getWaittingAuditUser",this.filterForm).then(function(e){var i=e.result.list,a=i.list,r=i.total;t.listData.list=a,t.listData.total=r})},goDetails:function(t){this.$router.push({path:"/identity/identity-details",query:t})},quickAudit:function(){var t=this;this.$confirm("确定一键审核吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.post("/wallet/backmgr/user/quickAudit").then(function(e){t.$notify({title:"成功",message:"一键审核成功",type:"success"})})}).catch(function(){t.$message({type:"info",message:"已取消一键审核"})})}},activated:function(){this.getWaittingAuditUser()}},s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"sac-home"},[i("div",{staticClass:"sac-queryCondition"},[i("el-form",{ref:"filterForm",staticClass:"filter-container",attrs:{inline:!0,"label-width":"80px",model:t.filterForm,size:"mini"}},[i("el-form-item",{attrs:{label:"审核状态"}},[i("el-select",{attrs:{placeholder:"请选择"},model:{value:t.filterForm.auditStatus,callback:function(e){t.$set(t.filterForm,"auditStatus",e)},expression:"filterForm.auditStatus"}},t._l(t.identityType,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),i("el-form-item",{attrs:{label:"手机号"}},[i("el-input",{attrs:{placeholder:"请输入",clearable:""},model:{value:t.filterForm.phone,callback:function(e){t.$set(t.filterForm,"phone","string"==typeof e?e.trim():e)},expression:"filterForm.phone"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"姓名"}},[i("el-input",{attrs:{placeholder:"请输入",clearable:""},model:{value:t.filterForm.realName,callback:function(e){t.$set(t.filterForm,"realName","string"==typeof e?e.trim():e)},expression:"filterForm.realName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"身份证"}},[i("el-input",{attrs:{placeholder:"请输入",clearable:""},model:{value:t.filterForm.cardNo,callback:function(e){t.$set(t.filterForm,"cardNo","string"==typeof e?e.trim():e)},expression:"filterForm.cardNo"}})],1),t._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitForm(1)}}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"danger"},on:{click:t.quickAudit}},[t._v("一键审核")])],1)],1)],1),t._v(" "),i("sac-table",{attrs:{data:t.listData.list,size:"mini"}},[i("el-table-column",{attrs:{prop:"phone",label:"账号",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{prop:"realName",label:"姓名",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{prop:"cardNo",label:"身份证号码",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{label:"状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.antiMoneyAuditMap[e.row.antiMoneyAudit]))]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"操作",prop:"tradeStatus",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"success",size:"mini"},nativeOn:{click:function(i){return t.goDetails(e.row)}}},[t._v("查看详情")])]}}])})],1),t._v(" "),i("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}})],1)},staticRenderFns:[]};var o=i("VU/8")(n,s,!1,function(t){i("TYL1")},null,null);e.default=o.exports}});