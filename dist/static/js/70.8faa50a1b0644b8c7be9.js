webpackJsonp([70],{dHku:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={data:function(){return{account:"",showDialog:!1,showDialogParent:!1,filterForm:{account:"",inviteCode:"",nickName:""},listData:{list:[],total:0,pageSize:10,pageNum:1},inviteData:[],currItem:{},queryParentList:[]}},activated:function(){this.filterForm={account:"",inviteCode:"",nickName:""},this.getInviteData()},methods:{tabChange:function(t){this.queryType=t,this.getInviteData()},handleCurrentChange:function(t,e){this.listData.pageSize=t,this.listData.pageNum=e,this.getList()},brokerage:function(t){this.currItem=t,this.account="",this.showDialog=!0,this.listData.amount="",this.listData.pageNum=1,this.getList()},queryParent:function(){var t=this;this.$http.post("/wallet/invite/backmgr/getFaInviteRecd",this.filterForm).then(function(e){t.queryParentList=e.result,t.showDialogParent=!0})},queryParentLoad:function(t,e,a){this.$http.post("/wallet/invite/backmgr/getFaInviteRecd",{account:t.account}).then(function(t){a(t.result)})},saerch:function(){this.listData.pageNum=1,this.getList()},getInviteData:function(t){var e=this;this.$http.post("/wallet/invite/backmgr/findInviteChild",this.filterForm).then(function(a){var i=[];"saerch"==t&&a.result.userId?(i=[a.result],a.result.list&&a.result.list.length>0&&(i[0].hasChildren=!0)):(i=a.result.list||[]).length&&i.forEach(function(t){t.childNum>0?t.hasChildren=!0:t.hasChildren=!1}),e.inviteData=[],setTimeout(function(){e.inviteData=i},100)})},getList:function(){var t=this;this.$http.post("/wallet/invite/backmgr/queryInviteShip",{account:this.account,inviteeId:this.currItem.userId,pageNum:this.listData.pageNum,pageSize:this.listData.pageSize}).then(function(e){200==e.code&&(t.listData.list=e.result.list,t.listData.list.length<1&&t.$message.error("不允许迁移至自己的下级或该账号不存在"),t.listData.total=e.result.total)})},updateInviteShip:function(t){var e=this;this.$confirm("确定要执行迁移操作吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$http.post("/wallet/invite/backmgr/updateInviteShip",{inviterId:t,inviteeId:e.currItem.userId}).then(function(t){200==t.code&&(e.showDialog2=!1,e.filterForm={account:"",inviteCode:"",nickName:""},e.showDialog=!1,e.getInviteData(),e.$message.success("迁移成功"))})}).catch(function(){})},load:function(t,e,a){var i=t.inviteCode;this.$http.post("/wallet/invite/backmgr/findInviteChild",{inviteCode:i}).then(function(t){var e=t.result.list;e.forEach(function(t){t.childNum>0?t.hasChildren=!0:t.hasChildren=!1}),a(e)})}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"invite-page"},[a("div",{staticClass:"header"},[a("el-form",{ref:"filterForm",attrs:{inline:!0,model:t.filterForm,size:"mini"}},[a("el-form-item",{attrs:{label:"账号:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入用户账号",clearable:""},model:{value:t.filterForm.account,callback:function(e){t.$set(t.filterForm,"account","string"==typeof e?e.trim():e)},expression:"filterForm.account"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"用户编号:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入用户编号",clearable:""},model:{value:t.filterForm.nickName,callback:function(e){t.$set(t.filterForm,"nickName","string"==typeof e?e.trim():e)},expression:"filterForm.nickName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"邀请码:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入邀请码",clearable:""},model:{value:t.filterForm.inviteCode,callback:function(e){t.$set(t.filterForm,"inviteCode","string"==typeof e?e.trim():e)},expression:"filterForm.inviteCode"}})],1),t._v(" "),a("el-button",{staticClass:"btn",attrs:{type:"primary",size:"mini"},nativeOn:{click:function(e){return t.getInviteData("saerch")}}},[t._v("查询")]),t._v(" "),a("el-button",{staticClass:"btn",attrs:{type:"primary",size:"mini"},nativeOn:{click:function(e){return t.queryParent(e)}}},[t._v("查父级")])],1)],1),t._v(" "),a("el-table",{staticStyle:{width:"100%",height:"100%"},attrs:{data:t.inviteData,height:"100%","row-key":"inviteCode",border:"",lazy:"",load:t.load,"tree-props":{children:"children",hasChildren:"hasChildren"},size:"mini"}},[a("el-table-column",{attrs:{prop:"nickName",label:"用户编号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"userId",label:"兑出佣金费率",align:"center",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[a("ul",{staticClass:"rate"},[a("li",[a("p",[t._v("银行卡")]),t._v(" "),a("p",[t._v(t._s(t.$fmtNumber("%2",e.row.cardBuyRate))+"% ")])])])])}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"userId",label:"兑入佣金费率",align:"center",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[a("ul",{staticClass:"rate"},[a("li",[a("p",[t._v("银行卡")]),t._v(" "),a("p",[t._v(t._s(Math.floor(1e4*e.row.cardSaleRate)/100)+"% ")])])])])}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"realName",label:"姓名",align:"center",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"account",label:"账号",width:"140"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"inviteCode",label:"邀请码",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(a){return t.$router.push({path:"/LegalCurrency/userQueryDetaile",query:{userId:e.row.userId}})}}},[t._v("查看佣金费率")]),t._v(" "),a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(a){return t.brokerage(e.row)}}},[t._v("迁移")])]}}])})],1),t._v(" "),a("el-dialog",{staticClass:"brokerageTable",attrs:{title:"迁移关系",visible:t.showDialog,width:"650px"},on:{"update:visible":function(e){t.showDialog=e}}},[a("div",{staticClass:" inputGroup "},[a("span",[t._v("账号/昵称：")]),t._v(" "),a("el-input",{attrs:{placeholder:"请输入账号/昵称",size:"small"},model:{value:t.account,callback:function(e){t.account=e},expression:"account"}}),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.saerch}},[t._v("搜索")])],1),t._v(" "),a("el-table",{attrs:{size:"mini",data:t.listData.list,border:"",height:"500px"}},[a("el-table-column",{attrs:{prop:"account",label:"账号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"nickName",label:"昵称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"account",label:"操作",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text"},nativeOn:{click:function(a){return t.updateInviteShip(e.row.userId)}}},[t._v("迁移至该账号下")])]}}])})],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.listData.pageSize,"current-page":t.listData.pageNum},on:{handleChange:t.handleCurrentChange}})],1)],1),t._v(" "),a("el-dialog",{staticClass:"query-parent-dialog",attrs:{title:"父级关系",visible:t.showDialogParent,width:"650px"},on:{"update:visible":function(e){t.showDialogParent=e}}},[a("el-table",{attrs:{size:"mini",data:t.queryParentList,"row-key":"userId",lazy:"",load:t.queryParentLoad,"tree-props":{children:"children",hasChildren:"havaFather"},height:"500px"}},[a("el-table-column",{attrs:{prop:"account",label:"账号",align:"left"}}),t._v(" "),a("el-table-column",{attrs:{prop:"nickName",label:"昵称",align:"left"}})],1)],1)],1)},staticRenderFns:[]};var n=a("C7Lr")(i,l,!1,function(t){a("lYQl")},"data-v-154afa6e",null);e.default=n.exports},lYQl:function(t,e){}});