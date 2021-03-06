webpackJsonp([41],{njsb:function(t,e){},pfw9:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={components:{},data:function(){return{filterForm:{appId:"",pageNum:1,pageSize:20},formData:{appId:"",appUserId:"",foreverOrLimited:"2",ip:""},list:[],total:0,showDialog:!1}},mounted:function(){this.getList()},methods:{addItem:function(){this.formData={appId:"",appUserId:"",foreverOrLimited:"2",ip:""},this.showDialog=!0},handleCurrentChange:function(t){this.filterForm.pageNum=t,this.getList()},handleSizeChange:function(t){this.filterForm.pageSize=t,this.getList()},getList:function(){var t=this;this.list=[],this.$http.post("/wallet/backmgr/merchant/getCheckoutBlacklist",this.filterForm).then(function(e){200==e.code&&(t.list=e.result.list,t.total=e.result.total)})},addCheckoutBlacklist:function(){var t=this;""!=this.formData.appId.trim()?""!=this.formData.appUserId.trim()||""!=this.formData.ip.trim()?this.$confirm("增加后，满足该条件的用户将不可以发单，确定增加？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.post("/wallet/backmgr/merchant/addCheckoutBlacklist",t.formData).then(function(e){200==e.code?(t.$message({type:"success",message:"添加成功"}),t.filterForm.pageNum=1,t.getList(),t.showDialog=!1):t.$message({type:"info",message:e.msg})})}):this.$message({type:"info",message:"请填写userid/ip"}):this.$message({type:"info",message:"请输入appId"})},subCheckoutBlacklist:function(t){var e=this,a={appId:t.appId,appUserId:"--"!=t.appUserId?t.appUserId:"",ip:"--"!=t.ip?t.ip:""};this.$http.post("/wallet/backmgr/merchant/subCheckoutBlacklist",a).then(function(t){200==t.code?(e.$message({type:"success",message:"解封成功"}),e.getList()):e.$message({type:"info",message:t.msg})})},search:function(){this.filterForm.pageNum=1,this.getList()}},watch:{},computed:{}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"blacklist-page"},[a("el-form",{ref:"filterForm",attrs:{inline:!0,model:t.filterForm,"label-width":"86px",size:"mini"}},[a("el-form-item",{attrs:{label:"appid:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入appid"},model:{value:t.filterForm.appId,callback:function(e){t.$set(t.filterForm,"appId",e)},expression:"filterForm.appId"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},nativeOn:{click:function(e){return t.search(e)}}},[t._v("查询")]),a("el-button",{attrs:{type:"primary",size:"mini"},nativeOn:{click:function(e){return t.addItem(e)}}},[t._v("新增")])],1)],1),t._v(" "),a("el-table",{attrs:{stripe:"",border:"",height:"100%",size:"mini",data:t.list}},[a("el-table-column",{attrs:{prop:"createTime",label:"添加时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(t.$fmtDate(e.row.createTimestamp,"full"))+"\n\t\t\t")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"appId",label:"appid",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"appUserId",label:"userid",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"ip",label:"ip",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"status"},[t._v(t._s(1==e.row.foreverOrLimited?"24小时":"永久"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return t.subCheckoutBlacklist(e.row)}}},[t._v("解封")])]}}])})],1),t._v(" "),a("el-pagination",{attrs:{"current-page":t.filterForm.pageNum,"page-size":t.filterForm.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:1*t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}),t._v(" "),a("el-dialog",{attrs:{title:"增加黑名单",visible:t.showDialog,width:"700px"},on:{"update:visible":function(e){t.showDialog=e}}},[a("el-form",{ref:"form",attrs:{inline:!0,model:t.formData,"label-width":"86px",size:"mini"}},[a("el-form-item",{attrs:{label:"appId:"}},[a("el-input",{attrs:{placeholder:"请输入appId"},on:{input:function(e){t.formData.appId=t.formData.appId.replace(/[^\d]/g,"")}},model:{value:t.formData.appId,callback:function(e){t.$set(t.formData,"appId",e)},expression:"formData.appId"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"userid:"}},[a("el-input",{attrs:{placeholder:"请输入userid"},model:{value:t.formData.appUserId,callback:function(e){t.$set(t.formData,"appUserId",e)},expression:"formData.appUserId"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"状态:"}},[a("el-select",{model:{value:t.formData.foreverOrLimited,callback:function(e){t.$set(t.formData,"foreverOrLimited",e)},expression:"formData.foreverOrLimited"}},[a("el-option",{attrs:{value:"1",label:"24小时"}}),t._v(" "),a("el-option",{attrs:{value:"2",label:"永久"}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"ip:"}},[a("el-input",{attrs:{placeholder:"请输入ip"},model:{value:t.formData.ip,callback:function(e){t.$set(t.formData,"ip",e)},expression:"formData.ip"}})],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.showDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"success"},on:{click:t.addCheckoutBlacklist}},[t._v("确定增加")])],1)],1)],1)},staticRenderFns:[]};var l=a("C7Lr")(i,r,!1,function(t){a("njsb")},"data-v-7e6a6624",null);e.default=l.exports}});