webpackJsonp([4],{JUI1:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("r/Zx"),n=a("Xrgp"),s=a("M4fv"),r={components:{addUser:i.a,MerchantList:n.a,UserList:s.a},data:function(){return{addUserShow:!1,formData:{create_time:"",groupName:"",name:""},pageData:{pageNum:1,pageSzie:20,total:3},multipleSelection:[],total:3,list:[{groupName:"默认",phone:"15179818328"},{groupName:"allbet",phone:"177939729"},{groupName:"ksx",phone:"15792797"},{groupName:"默认ksx",phone:"188397900"}],groupId:"",createTime:"",groupName:""}},activated:function(){this.groupId=this.$route.query.id+"",this.createTime=this.$route.query.createTime,this.groupName=this.$route.query.groupName},methods:{handleSelectionChange:function(t){this.multipleSelection=t},handleCurrentChange:function(t){this.pageNum=t},handleSizeChange:function(t){this.pageSize=t}},watch:{},computed:{}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"AuthorizedMerchantInfo-page"},[a("el-form",{ref:"form",attrs:{model:t.formData,"label-width":"85px",size:"mini",inline:""}},[a("el-form-item",{attrs:{label:"分组名称:"}},[a("el-input",{attrs:{disabled:"",value:t.groupName}})],1),t._v(" "),a("el-form-item",{attrs:{label:"创建时间:"}},[a("el-input",{attrs:{disabled:"",value:t.createTime}})],1)],1),t._v(" "),a("div",{staticClass:"main"},[a("MerchantList",{attrs:{groupId:t.groupId}}),t._v(" "),a("UserList",{attrs:{groupId:t.groupId}})],1),t._v(" "),a("addUser",{attrs:{show:t.addUserShow},on:{change:function(e){t.addUserShow=!1}}})],1)},staticRenderFns:[]};var l=a("VU/8")(r,c,!1,function(t){a("ScHp")},"data-v-7dcc957c",null);e.default=l.exports},"LI/t":function(t,e){},M4fv:function(t,e,a){"use strict";var i={components:{AddUser:a("r/Zx").a},props:{groupId:{type:String,default:""}},data:function(){return{pageData:{groupId:"",pageNum:1,pageSize:20},multipleSelection:[],total:3,list:[]}},activated:function(){var t=this;this.list=[],setTimeout(function(){""!==t.groupId&&(t.pageData.groupId=t.groupId,t.getData())},100)},methods:{getList:function(){return this.list},addData:function(t){this.list=this.list.concat(t)},getData:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/checkUserGroupRecdInfo",this.pageData).then(function(e){t.list=e.result.list,t.total=e.result.total})},checkedDelete:function(){var t="";this.multipleSelection.forEach(function(e){t+=e.userId+","}),this.subUserToGroup(t.substring(0,t.length-1))},subUserToGroup:function(t){var e=this;if(""!==this.groupId)this.$confirm("此操作将会将用户移出该分组，确定删除？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$http.post("/wallet/app/otc/backmgr/subUserToGroup",{groupId:e.groupId,userIds:t}).then(function(t){200==t.code?(e.$message.success(t.msg),e.getData()):e.$message.error(t.msg)})}).catch(function(){});else{var a=[];a=(t+"").indexOf(",")>-1?t.split(","):[t];var i=[];this.list.forEach(function(t,e){var n=!1;a.forEach(function(e){t.userId==e&&(n=!0)}),n||i.push(t)}),this.list=i}},handleSelectionChange:function(t){this.multipleSelection=t},handleCurrentChange:function(t){this.pageData.pageNum=t,this.getData()},handleSizeChange:function(t){this.pageData.pageSize=t,this.getData()}},watch:{},computed:{}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"userList-page"},[a("div",{staticClass:"title"},[a("span",[t._v("码商列表：")]),t._v(" "),a("p",[a("el-button",{attrs:{size:"mini",type:"danger",disabled:0==t.multipleSelection.length},on:{click:function(e){return t.checkedDelete()}}},[t._v(" 一键删除 ")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){return t.$refs.AddUser.show(t.list,t.groupId)}}},[t._v(" 增加码商 ")])],1)]),t._v(" "),a("el-table",{attrs:{data:t.list,height:"auto",border:"",size:"mini"},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{type:"index",width:"50",label:"序号",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"码商账户",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.phone||e.row.account))]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"nickName",label:"码商昵称",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"date",label:"操作",fixed:"right",width:"110",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){return t.subUserToGroup(e.row.userId)}}},[t._v(" 删除 ")])]}}])})],1),t._v(" "),a("el-pagination",{attrs:{"current-page":t.pageData.pageNum,"page-size":t.pageData.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:1*t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}),t._v(" "),a("AddUser",{ref:"AddUser",on:{addData:t.addData,success:t.getData}})],1)},staticRenderFns:[]};var s=a("VU/8")(i,n,!1,function(t){a("TMIc")},"data-v-4ac15878",null);e.a=s.exports},ScHp:function(t,e){},TMIc:function(t,e){},Xrgp:function(t,e,a){"use strict";var i={components:{},props:{list:{type:Array,default:function(){return[]}}},data:function(){return{groupId:"",showWidget:!1,addMerchantShow:!1,merchantFormData:{name:"",groupId:"",pageNum:1,pageSize:10},merchantPageData:{list:[],total:0},multipleSelection:[],selectList:[],checkedList:[],isSelectAll:!1}},mounted:function(){},methods:{handleSelectionChange:function(t){this.multipleSelection=t},addMerchantSelectSizeChange:function(t){this.merchantFormData.pageSize=t,this.mergeArray(),this.getMerchantList()},addMerchantSelectCurrentChange:function(t){this.merchantFormData.pageNum=t,this.mergeArray(),this.getMerchantList()},addMerchantToGroup:function(){var t=this;if(this.selectList.length<1)this.$message.error("请选择商户");else if(""!==this.groupId){var e="";this.selectList.forEach(function(t){e+=t.userId+","}),this.$http.post("/wallet/app/otc/backmgr/addMerchantToGroup",{groupId:this.groupId,userIds:e.substring(0,e.length-1)}).then(function(e){200==e.code&&(t.showWidget=!1,t.$message.success(e.msg),t.$emit("success"))})}else this.showWidget=!1,this.$emit("addData",this.selectList)},getMerchantList:function(){var t=this;this.merchantFormData.groupId=this.groupId,this.$http.post("/wallet/app/otc/backmgr/listByGroup",this.merchantFormData).then(function(e){if(200==e.code){t.merchantPageData=e.result.page;for(var a=0;a<t.merchantPageData.list.length;a++){var i=!1,n=!1;if(t.selectList.length>0)for(var s=0;s<t.selectList.length;s++)t.merchantPageData.list[a].userId==t.selectList[s].userId&&(n=!0);if(t.checkedList.length>0&&""==t.groupId)for(var r=0;r<t.checkedList.length;r++)t.merchantPageData.list[a].userId==t.checkedList[r].userId&&(i=!0);t.$set(t.merchantPageData.list[a],"hasItem",i),t.$set(t.merchantPageData.list[a],"check",n)}}})},headerClick:function(t){if("全选"===t.label)if(this.isSelectAll)for(var e=0;e<this.merchantPageData.list.length;e++)this.hasItem||this.itemSelect(this.merchantPageData.list[e],!1);else for(var a=0;a<this.merchantPageData.list.length;a++)this.hasItem||this.itemSelect(this.merchantPageData.list[a],!0)},itemClick:function(t){t.check?this.itemSelect(t,!1):this.itemSelect(t,!0)},itemSelect:function(t,e){var a=this;this.$set(t,"check",e),t.check?(this.$set(t,"check",!0),this.selectList.push(t)):this.selectList.forEach(function(e,i){t.userId==e.userId&&a.selectList.splice(i,1)});for(var i=!0,n=0;n<this.merchantPageData.list.length;n++)this.merchantPageData.list[n].check||(i=!1);this.isSelectAll=i},mergeArray:function(){for(var t=0;t<this.multipleSelection.length;t++)if(this.selectList.length>0){for(var e=!1,a=0;a<this.selectList.length;a++)this.multipleSelection[t].userId==this.selectList[a].userId&&(e=!0);e||this.selectList.push(this.multipleSelection[t])}else this.selectList.push(this.multipleSelection[t])},show:function(t,e){this.showWidget=!0,this.merchantFormData={name:"",pageNum:1,pageSize:10},this.checkedList=t,this.selectList=[],this.groupId=e||"",this.getMerchantList()}},watch:{showWidget:function(t,e){}},computed:{}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{staticClass:"addMerchant-page",attrs:{title:"增加商户",visible:t.showWidget},on:{"update:visible":function(e){t.showWidget=e}}},[a("el-form",{attrs:{model:t.merchantFormData,"label-width":"95px",size:"mini",inline:""}},[a("el-form-item",{attrs:{label:"账户/昵称:"}},[a("el-input",{attrs:{placeholder:"请输入账户或者昵称"},model:{value:t.merchantFormData.name,callback:function(e){t.$set(t.merchantFormData,"name",e)},expression:"merchantFormData.name"}})],1),t._v(" "),a("el-form-item",[a("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary"},on:{click:t.getMerchantList}},[t._v("搜索")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.addMerchantToGroup}},[t._v("确定增加")])],1)],1),t._v(" "),a("el-table",{staticClass:"addMerchantSelect",staticStyle:{"min-width":"100%"},attrs:{data:t.merchantPageData.list,height:"420px",border:"",size:"mini"},on:{"header-click":t.headerClick}},[a("el-table-column",{attrs:{prop:"phone",label:"账号",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"昵称",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{width:"55",label:"全选",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{staticClass:"checkBox",on:{click:function(a){return t.itemClick(e.row)}}},[e.row.hasItem||1==e.row.inGroup?a("div",[t._v("已选")]):a("div",{staticClass:"check",class:e.row.check?"isCheck":""})])}}])})],1),t._v(" "),a("el-pagination",{attrs:{"current-page":t.merchantFormData.pageNum,"page-sizes":[10,20],"page-size":t.merchantFormData.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:1*t.merchantPageData.total},on:{"size-change":t.addMerchantSelectSizeChange,"current-change":t.addMerchantSelectCurrentChange}})],1)},staticRenderFns:[]};var s={components:{AddMerchant:a("VU/8")(i,n,!1,function(t){a("rWpE")},"data-v-5de47a83",null).exports},props:{groupId:{type:String,default:""}},data:function(){return{pageData:{groupId:"",pageNum:1,pageSize:20},multipleSelection:[],total:3,list:[]}},activated:function(){var t=this;this.list=[],setTimeout(function(){""!==t.groupId&&(t.pageData.groupId=t.groupId,t.getData())},100)},methods:{getList:function(){return this.list},addMerchant:function(){this.$refs.AddMerchant.show(this.list,this.groupId)},addData:function(t){this.list=this.list.concat(t)},getData:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/checkMerchantGroupRecdInfo",this.pageData).then(function(e){t.list=e.result.list,t.total=e.result.total})},checkedDelete:function(){var t="";this.multipleSelection.forEach(function(e){t+=e.userId+","}),this.subMerchantToGroup(t.substring(0,t.length-1))},subMerchantToGroup:function(t){var e=this;if(""!==this.groupId)this.$confirm("此操作将会将用户移出该分组，确定删除？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$http.post("/wallet/app/otc/backmgr/subMerchantToGroup",{groupId:e.groupId,userIds:t}).then(function(t){200==t.code?(e.$message.success(t.msg),e.getData()):e.$message.error(t.msg)})}).catch(function(){});else{var a=[];a=(t+"").indexOf(",")>-1?t.split(","):[t];var i=[];this.list.forEach(function(t,e){var n=!1;a.forEach(function(e){t.userId==e&&(n=!0)}),n||i.push(t)}),this.list=i}},handleSelectionChange:function(t){this.multipleSelection=t},handleCurrentChange:function(t){this.pageData.pageNum=t,this.getData()},handleSizeChange:function(t){this.pageData.pageSize=t,this.getData()}},watch:{},computed:{}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"merchantList-page"},[a("div",{staticClass:"title"},[a("span",[t._v("商户列表：")]),t._v(" "),a("p",[a("el-button",{attrs:{size:"mini",type:"danger",disabled:0==t.multipleSelection.length},on:{click:function(e){return t.checkedDelete()}}},[t._v(" 一键删除 ")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.addMerchant}},[t._v(" 增加商户 ")])],1)]),t._v(" "),a("el-table",{attrs:{data:t.list,height:"auto",border:"",size:"mini"},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{type:"index",width:"50",label:"序号",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"商户账户",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"nickName",label:"商户昵称",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.nickName||e.row.name))]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"date",label:"操作",fixed:"right",width:"110",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){return t.subMerchantToGroup(e.row.userId)}}},[t._v(" 删除 ")])]}}])})],1),t._v(" "),a("el-pagination",{attrs:{"current-page":t.pageData.pageNum,"page-size":t.pageData.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:1*t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}),t._v(" "),a("AddMerchant",{ref:"AddMerchant",on:{addData:t.addData,success:t.getData}})],1)},staticRenderFns:[]};var c=a("VU/8")(s,r,!1,function(t){a("LI/t")},"data-v-20ba034e",null);e.a=c.exports},kCna:function(t,e){},"r/Zx":function(t,e,a){"use strict";var i={components:{},props:{},data:function(){return{showWidget:!1,addMerchantShow:!1,filterForm:{account:"",groupId:""},merchantPageData:{list:[],total:0},multipleSelection:[],selectList:[],checkedList:[],isSelectAll:!1,userData:[],groupId:""}},mounted:function(){},methods:{addUser:function(){var t=this;if(this.selectList.length<1)this.$message.error("请选择码商");else if(""!==this.groupId){var e="";this.selectList.forEach(function(t){e+=t.userId+","}),this.$http.post("/wallet/app/otc/backmgr/addUserToGroup",{groupId:this.groupId,userIds:e.substring(0,e.length-1)}).then(function(e){200==e.code&&(t.showWidget=!1,t.$message.success(e.msg),t.$emit("success"))})}else this.showWidget=!1,this.$emit("addData",this.selectList)},getUserData:function(t){var e=this;this.filterForm.groupId=this.groupId,this.$http.post("/wallet/invite/backmgr/findInviteChildByGroup",this.filterForm).then(function(a){var i=[];"saerch"==t&&a.result.userId?(i=[a.result],e.mergeArray(i),a.result.list&&a.result.list.length>0&&(i[0].hasChildren=!0)):((i=a.result.list).forEach(function(t){t.childNum>0?t.hasChildren=!0:t.hasChildren=!1}),e.mergeArray(i)),e.userData=[],setTimeout(function(){e.userData=i},100)})},load:function(t,e,a){var i=this,n=t.inviteCode;this.$http.post("/wallet/invite/backmgr/findInviteChildByGroup",{inviteCode:n,groupId:this.groupId}).then(function(t){var e=t.result.list;e.forEach(function(t){t.childNum>0?t.hasChildren=!0:t.hasChildren=!1,i.checkedList.length>0&&i.checkedList.forEach(function(e){e.userId==t.userId&&i.$set(t,"hasItem",!0)})}),a(e)})},mergeArray:function(t){var e=this;""===this.groupId&&t.forEach(function(t){e.checkedList.length>0&&e.checkedList.forEach(function(a){a.userId==t.userId&&e.$set(t,"hasItem",!0)})})},allCheck:function(t){t.forEach(function(t,e){})},itemClick:function(t){t.check?this.itemSelect(t,!1):this.itemSelect(t,!0)},itemSelect:function(t,e){var a=this;this.$set(t,"check",e),t.check?(this.$set(t,"check",!0),this.selectList.push(t)):this.selectList.forEach(function(e,i){t.userId==e.userId&&a.selectList.splice(i,1)});for(var i=!0,n=0;n<this.merchantPageData.list.length;n++)this.merchantPageData.list[n].check||(i=!1);this.isSelectAll=i},show:function(t,e){this.showWidget=!0,this.merchantFormData={account:""},this.selectList=[],this.checkedList=t,this.groupId=e||"",this.getUserData()}},watch:{showWidget:function(t,e){t||this.$emit("change")}},computed:{}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{staticClass:"addUser-page",attrs:{title:"增加码商",visible:t.showWidget},on:{"update:visible":function(e){t.showWidget=e}}},[a("el-form",{attrs:{model:t.filterForm,"label-width":"95px",size:"mini",inline:""}},[a("el-form-item",{attrs:{label:"账号:"}},[a("el-input",{attrs:{placeholder:"请输入账号"},model:{value:t.filterForm.account,callback:function(e){t.$set(t.filterForm,"account",e)},expression:"filterForm.account"}})],1),t._v(" "),a("el-form-item",[a("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary"},on:{click:function(e){return t.getUserData("saerch")}}},[t._v("搜索")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.addUser}},[t._v("确定增加")])],1)],1),t._v(" "),a("el-table",{staticStyle:{width:"100%",height:"100%"},attrs:{data:t.userData,height:"420px","row-key":"inviteCode",border:"",lazy:"",load:t.load,"tree-props":{children:"children",hasChildren:"hasChildren"},size:"mini"}},[a("el-table-column",{attrs:{prop:"nickName",label:"姓名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"userId",label:"ID",align:"center",width:"140"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"account",label:"账号",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{width:"55",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{staticClass:"checkBox",on:{click:function(a){return t.itemClick(e.row)}}},[e.row.hasItem||1==e.row.inGroup?a("div",[t._v("已选")]):a("div",{staticClass:"check",class:e.row.check?"isCheck":""})])}}])})],1)],1)},staticRenderFns:[]};var s=a("VU/8")(i,n,!1,function(t){a("kCna")},"data-v-2f430525",null);e.a=s.exports},rWpE:function(t,e){}});