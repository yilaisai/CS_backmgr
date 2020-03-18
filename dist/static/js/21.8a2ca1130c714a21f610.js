webpackJsonp([21],{SO7J:function(t,e){},a3Yh:function(t,e,a){"use strict";e.__esModule=!0;var i,r=a("liLe"),l=(i=r)&&i.__esModule?i:{default:i};e.default=function(t,e,a){return e in t?(0,l.default)(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}},tbim:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("a3Yh"),r=a.n(i),l=a("EaCm"),n={name:"home",components:{},data:function(){var t;return{filterForm:{auditStatus:"",phone:"",realName:"",cardNo:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},antiMoneyAuditMap:(t={},r()(t,-1,"未申请"),r()(t,0,"不通过"),r()(t,1,"通过"),r()(t,2,"待审核"),t),identityType:l.c}},methods:{resetForm:function(){this.$refs.phone.reset(),this.$refs.realName.reset(),this.$refs.cardNo.reset(),this.filterForm.auditStatus="",this.$refs.filterForm.resetFields(),this.filterForm.pageNum=1,this.getWaittingAuditUser()},submitForm:function(t){this.filterForm.pageNum=t,this.getWaittingAuditUser()},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.submitForm(e)},getWaittingAuditUser:function(){var t=this;this.$http.post("wallet/backmgr/user/getWaittingAuditUser",this.filterForm).then(function(e){var a=e.result.list,i=a.list,r=a.total;t.listData.list=i,t.listData.total=r})},goDetails:function(t){this.$router.push({path:"/user/identityDetails",query:t})},quickAudit:function(){var t=this;this.$confirm("确定一键审核吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.post("/wallet/backmgr/user/quickAudit").then(function(e){t.$notify({title:"成功",message:"一键审核成功",type:"success"})})}).catch(function(){t.$message({type:"info",message:"已取消一键审核"})})}},activated:function(){this.$route.query.status&&(this.filterForm.auditStatus=this.$route.query.status),this.getWaittingAuditUser()}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"identity-page"},[a("div",{staticClass:"sac-queryCondition"},[a("el-form",{ref:"filterForm",staticClass:"filter-container",attrs:{inline:!0,"label-width":"80px",model:t.filterForm,size:"mini"}},[a("el-form-item",{attrs:{label:"审核状态"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.filterForm.auditStatus,callback:function(e){t.$set(t.filterForm,"auditStatus",e)},expression:"filterForm.auditStatus"}},t._l(t.identityType,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"手机号"}},[a("el-input",{attrs:{placeholder:"请输入",clearable:""},model:{value:t.filterForm.phone,callback:function(e){t.$set(t.filterForm,"phone","string"==typeof e?e.trim():e)},expression:"filterForm.phone"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"姓名"}},[a("el-input",{attrs:{placeholder:"请输入",clearable:""},model:{value:t.filterForm.realName,callback:function(e){t.$set(t.filterForm,"realName","string"==typeof e?e.trim():e)},expression:"filterForm.realName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"身份证"}},[a("el-input",{attrs:{placeholder:"请输入",clearable:""},model:{value:t.filterForm.cardNo,callback:function(e){t.$set(t.filterForm,"cardNo","string"==typeof e?e.trim():e)},expression:"filterForm.cardNo"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitForm(1)}}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:t.quickAudit}},[t._v("一键审核")])],1)],1)],1),t._v(" "),a("sac-table",{attrs:{data:t.listData.list,size:"mini"}},[a("el-table-column",{attrs:{prop:"phone",label:"账号",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"realName",label:"姓名",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"cardNo",label:"身份证号码",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.antiMoneyAuditMap[e.row.antiMoneyAudit]))]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",prop:"tradeStatus",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"success",size:"mini"},nativeOn:{click:function(a){return t.goDetails(e.row)}}},[t._v("查看详情")])]}}])})],1),t._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}})],1)},staticRenderFns:[]};var o=a("C7Lr")(n,s,!1,function(t){a("SO7J")},"data-v-38c6903a",null);e.default=o.exports}});