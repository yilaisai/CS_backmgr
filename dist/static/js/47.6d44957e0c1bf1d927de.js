webpackJsonp([47],{Q6lg:function(t,e){},U1ZR:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"data-approval",data:function(){return{searchType:"0",keyWord:"",currentPage:1,option:{pageSize:20,pageNum:1,realName:"",phone:"",email:"",userId:"",auditStatus:"0"},total:0,tableData:[],dialogVisible:!1,remark:"",activeItemData:{}}},methods:{search:function(){this.currentPage=1,this.option.pageSize=10,this.option.pageNum=1,this.keyWord?(this.option[this.searchType]=this.keyWord,this.getList(this.option)):(this.option[this.searchType]="",this.getList(this.option))},handleClick:function(t){this.activeItemData=t,this.dialogVisible=!0},handleCurrentChange:function(t,e){this.option.pageSize=t,this.option.pageNum=e,this.getList(this.option)},getList:function(t){var e=this;this.$http.post("/wallet/app/otc/backmgr/getAuditList",t).then(function(t){e.tableData=t.result.list,e.total=+t.result.total})},updateAuditStatus:function(t){var e=this;""!=this.remark?this.$http.post("/wallet/app/otc/backmgr/updateAuditStatus",{recdId:this.activeItemData.recdId,remark:this.remark,status:t}).then(function(t){e.$notify({title:"成功",message:t.msg,type:"success"}),e.dialogVisible=!1,e.remark=""}):this.$notify.info({title:"消息",message:"请填写备注"})},allAudit:function(){""==this.option.auditStatus?this.option.auditStatus=0:this.option.auditStatus="",this.getList(this.option)},selChange:function(){this.option.realName="",this.option.phone="",this.option.email="",this.option.userId=""}},activated:function(){this.getList(this.option)}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-container",[a("div",{staticClass:"left"},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入内容"},model:{value:t.keyWord,callback:function(e){t.keyWord=e},expression:"keyWord"}},[a("el-select",{staticStyle:{width:"130px"},attrs:{slot:"prepend",placeholder:"请选择"},on:{change:t.selChange},slot:"prepend",model:{value:t.option.auditStatus,callback:function(e){t.$set(t.option,"auditStatus",e)},expression:"option.auditStatus"}},[a("el-option",{attrs:{label:"待审核",value:"0"}}),t._v(" "),a("el-option",{attrs:{label:"审核成功",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"审核未通过",value:"2"}})],1),t._v(" "),a("el-button",{attrs:{slot:"append",icon:"el-icon-search",type:"success"},on:{click:t.search},slot:"append"},[t._v("搜索")])],1)],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",height:"100%",size:"mini"}},[a("el-table-column",{attrs:{align:"center",prop:"phone",label:"账户",width:"130px"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"nickName",label:"昵称",width:"130px"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"保证金"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.amount+" "+e.row.coinName))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(0==e.row.auditStatus?"待审核":1==e.row.auditStatus?"审核成功":"审核失败"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"申请操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(1==e.row.auditType?"取消广告商":2==e.row.auditType?"成为广告商":""))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"createTime",label:"申请时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t.$fmtDate(e.row.createTime,"full")))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"auditComment",label:"备注",width:"130px"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",fixed:"right",label:"操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.auditStatus?a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return t.handleClick(e.row)}}},[t._v("审核")]):t._e()]}}])})],1),t._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.tableData.length>0,expression:"tableData.length>0"}],attrs:{total:+t.total,"page-size":t.option.pageSize,"current-page":t.option.pageNum},on:{handleChange:t.handleCurrentChange}}),t._v(" "),a("el-dialog",{attrs:{title:"审核",visible:t.dialogVisible,width:"30%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("el-form",{ref:"form",attrs:{"label-width":"80px","label-position":"top"}},[a("el-form-item",{attrs:{label:"审核备注"}},[a("el-input",{attrs:{type:"textarea"},model:{value:t.remark,callback:function(e){t.remark="string"==typeof e?e.trim():e},expression:"remark"}})],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:function(e){return t.updateAuditStatus(2)}}},[t._v("不通过")]),t._v(" "),a("el-button",{attrs:{type:"success"},on:{click:function(e){return t.updateAuditStatus(1)}}},[t._v("通 过")])],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")(i,n,!1,function(t){a("Q6lg")},"data-v-774b4f90",null);e.default=o.exports}});