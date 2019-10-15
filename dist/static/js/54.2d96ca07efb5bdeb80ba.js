webpackJsonp([54],{"+T31":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={components:{},data:function(){return{account:"",showDialog:!1,filterForm:{account:"",inviteCode:"",nickName:""},listData:{list:[],total:0,pageSize:10,pageNum:1},inviteData:[],currItem:{}}},mounted:function(){this.getInviteData()},methods:{handleCurrentChange:function(t,e){this.listData.pageSize=t,this.listData.pageNum=e,this.getList()},rowKey:function(t,e){return t.id},brokerage:function(t){this.currItem=t,this.showDialog=!0,this.listData.amount="",this.listData.pageNum=1,this.getList()},saerch:function(){this.listData.pageNum=1,this.getList()},getInviteData:function(){var t=this;this.$http.post("/wallet/invite/backmgr/findInviteChild",this.filterForm).then(function(e){var i=e.result.list;i.forEach(function(t){t.childNum>0?t.hasChildren=!0:t.hasChildren=!1}),t.inviteData=i})},getList:function(){var t=this;this.$http.post("/wallet/invite/backmgr/queryInviteShip",{account:this.account,inviteeId:this.currItem.userId,pageNum:this.listData.pageNum,pageSize:this.listData.pageSize}).then(function(e){200==e.code&&(t.listData.list=e.result.list,t.listData.total=e.result.total)})},updateInviteShip:function(t){var e=this;this.$confirm("确定要执行迁移操作吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$http.post("/wallet/invite/backmgr/updateInviteShip",{inviterId:t,inviteeId:e.currItem.userId}).then(function(t){200==t.code&&(e.showDialog2=!1,e.getInviteData(),e.$message.success("迁移成功"))})}).catch(function(){})},load:function(t,e,i){var a=t.inviteCode;this.$http.post("/wallet/invite/backmgr/findInviteChild",{inviteCode:a}).then(function(t){var e=t.result.list;e.forEach(function(t){t.childNum>0?t.hasChildren=!0:t.hasChildren=!1}),i(e)})}},watch:{},computed:{}},n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"invite-page"},[i("div",{staticClass:"header"},[i("el-form",{ref:"filterForm",attrs:{inline:!0,model:t.filterForm}},[i("el-form-item",{attrs:{label:"账号:"}},[i("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入用户账号"},model:{value:t.filterForm.account,callback:function(e){t.$set(t.filterForm,"account",e)},expression:"filterForm.account"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"昵称:"}},[i("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入用户昵称"},model:{value:t.filterForm.nickName,callback:function(e){t.$set(t.filterForm,"nickName",e)},expression:"filterForm.nickName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"邀请码:"}},[i("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入邀请码"},model:{value:t.filterForm.inviteCode,callback:function(e){t.$set(t.filterForm,"inviteCode",e)},expression:"filterForm.inviteCode"}})],1),t._v(" "),i("el-button",{staticClass:"btn",attrs:{type:"primary",size:"mini"},nativeOn:{click:function(e){return t.getInviteData(e)}}},[t._v("查询\n        ")])],1)],1),t._v(" "),i("div",{staticClass:"table"},[i("el-table",{staticStyle:{width:"100%",height:"100%"},attrs:{data:t.inviteData,height:"100%","row-key":"inviteCode",border:"",lazy:"",load:t.load,"tree-props":{children:"children",hasChildren:"hasChildren"}}},[i("el-table-column",{attrs:{prop:"userId",label:"ID"}}),t._v(" "),i("el-table-column",{attrs:{align:"center",prop:"nickName",label:"姓名",width:"180"}}),t._v(" "),i("el-table-column",{attrs:{align:"center",prop:"account",label:"账号",width:"180"}}),t._v(" "),i("el-table-column",{attrs:{align:"center",prop:"inviteCode",label:"邀请码",width:"80"}}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"操作",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(i){return t.brokerage(e.row)}}},[t._v("迁移")])]}}])})],1)],1),t._v(" "),i("el-dialog",{staticClass:"brokerageTable",attrs:{title:"迁移关系",visible:t.showDialog,width:"650px"},on:{"update:visible":function(e){t.showDialog=e}}},[i("div",{staticClass:" inputGroup "},[i("span",[t._v("账号/昵称：")]),t._v(" "),i("el-input",{attrs:{placeholder:"请输入账号/昵称"},model:{value:t.account,callback:function(e){t.account=e},expression:"account"}}),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.saerch}},[t._v("搜索")])],1),t._v(" "),i("el-table",{attrs:{size:"mini",data:t.listData.list,border:"",height:"500px"}},[i("el-table-column",{attrs:{prop:"account",label:"账号"}}),t._v(" "),i("el-table-column",{attrs:{prop:"nickName",label:"昵称"}}),t._v(" "),i("el-table-column",{attrs:{prop:"account",label:"操作",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"text"},nativeOn:{click:function(i){return t.updateInviteShip(e.row.userId)}}},[t._v("迁移至该账号下")])]}}])})],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.listData.pageSize,"current-page":t.listData.pageNum},on:{handleChange:t.handleCurrentChange}})],1)],1)],1)},staticRenderFns:[]};var l=i("VU/8")(a,n,!1,function(t){i("e+gi")},"data-v-59f4d3fe",null);e.default=l.exports},"e+gi":function(t,e){}});