webpackJsonp([31],{AAVL:function(t,e){},WiLG:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"assetCertification-page"},[a("el-form",{ref:"form",attrs:{model:t.formData,"label-width":"85px",size:"mini",inline:""}},[a("el-form-item",{attrs:{label:"状态:"}},[a("el-select",{model:{value:t.formData.status,callback:function(e){t.$set(t.formData,"status",e)},expression:"formData.status"}},t._l(t.stateData,function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"账户/昵称:"}},[a("el-input",{attrs:{placeholder:"请输入账户或者昵称"},model:{value:t.formData.phone,callback:function(e){t.$set(t.formData,"phone",e)},expression:"formData.phone"}})],1),t._v(" "),a("el-select",{model:{value:t.formData.optType,callback:function(e){t.$set(t.formData,"optType",e)},expression:"formData.optType"}},[a("el-option",{attrs:{value:"",label:"全部"}}),t._v(" "),a("el-option",{attrs:{value:"1",label:"充值资产证明"}}),t._v(" "),a("el-option",{attrs:{value:"2",label:"申请取出"}})],1),t._v(" "),a("el-form-item",[a("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary"},on:{click:t.getData}},[t._v("查询")])],1)],1),t._v(" "),a("el-table",{staticStyle:{"min-width":"100%"},attrs:{data:t.list,height:"auto",border:"",size:"mini","show-overflow-tooltip":!0}},[a("el-table-column",{attrs:{label:"账户/昵称",align:"center",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{staticClass:"nickName"},[a("p",[t._v(t._s(e.row.phone))]),t._v(" "),a("p",[t._v(t._s(e.row.nickName))])])}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"amount",label:"资产证明",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"auditStatus",label:"状态",align:"center",width:"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(0==e.row.auditStatus?"待审核":1==e.row.auditStatus?"审核通过":2==e.row.auditStatus?"审核失败":"资产证明已释放"))]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"申请操作",align:"center",width:"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(1==e.row.optType?"充值资产证明":"申请取出"))]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"申请时间",width:"160",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.$fmtDate(e.row.createTime,"full")))]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"auditComment",label:"备注",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.auditStatus?a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){return t.updateAuditAssetCeRecdStatus(e.row.recdId,1)}}},[t._v(" 通过审核 ")]):t._e(),t._v(" "),0==e.row.auditStatus?a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){return t.Refuse(e.row.recdId)}}},[t._v(" 拒绝审核 ")]):t._e(),t._v(" "),1==e.row.auditStatus&&1!=e.row.optType?a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){return t.updateAuditAssetCeRecdStatus(e.row.recdId,3)}}},[t._v(" 释放资产证明 ")]):t._e()]}}])})],1),t._v(" "),a("el-pagination",{attrs:{"current-page":t.formData.pageNum,"page-sizes":[20,50],"page-size":t.formData.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:1*t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}),t._v(" "),a("el-dialog",{attrs:{title:"操作理由",visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("p",[t._v("拒绝理由：")]),t._v(" "),a("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请输入内容"},model:{value:t.dialogForm.auditComment,callback:function(e){t.$set(t.dialogForm,"auditComment",e)},expression:"dialogForm.auditComment"}}),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.updateAuditAssetCeRecdStatus(t.newRecdId,2)}}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")({components:{},data:function(){return{dialogForm:{auditComment:"",recdId:"",status:""},dialogVisible:!1,list:[],formData:{optType:"",phone:"",pageSize:20,pageNum:1,status:""},stateData:[{label:"全部",value:""},{label:"待审核",value:0},{label:"审核通过",value:1},{label:"审核失败",value:2},{label:"资产证明已释放",value:3}],total:0,newRecdId:""}},mounted:function(){this.getData()},methods:{getData:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/checkAuditAssetCeRecd",this.formData).then(function(e){t.list=e.result.list,t.total=e.result.total})},Refuse:function(t){this.newRecdId=t,this.dialogVisible=!0},updateAuditAssetCeRecdStatus:function(t,e){var a=this;this.dialogForm.recdId=t,this.dialogForm.status=e,this.$http.post("/wallet/app/otc/backmgr/updateAuditAssetCeRecdStatus",this.dialogForm).then(function(t){a.getData(),a.dialogVisible=!1,200==t.code?a.$message.success(t.msg):a.$message.error(t.msg)})},handleCurrentChange:function(t){this.formData.pageNum=t},handleSizeChange:function(t){this.formData.pageSize=t}},watch:{},computed:{}},l,!1,function(t){a("AAVL")},"data-v-b9495524",null);e.default=o.exports}});