webpackJsonp([8],{GImX:function(t,e){},JUI1:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={components:{},props:{show:{type:Boolean,default:!1}},data:function(){return{showWidget:!1,addMerchantShow:!1,merchantFormData:{name:"",pageNum:1,pageSize:10},merchantPageData:{list:[],total:0},multipleSelection:[],selectList:[],isSelectAll:!1}},mounted:function(){},methods:{handleSelectionChange:function(t){this.multipleSelection=t},addMerchantSelectSizeChange:function(t){this.merchantFormData.pageSize=t,this.mergeArray(),this.getMerchantList()},addMerchantSelectCurrentChange:function(t){this.merchantFormData.pageNum=t,this.mergeArray(),this.getMerchantList()},getMerchantList:function(){var t=this;this.$http.post("/wallet/backmgr/merchant/list",this.merchantFormData).then(function(e){if(200==e.code){t.merchantPageData=e.result.page;for(var a=0;a<t.merchantPageData.list.length;a++)if(t.selectList.length>0){for(var i=!1,n=0;n<t.selectList.length;n++)t.merchantPageData.list[a].userId==t.selectList[n].userId&&(i=!0);t.$set(t.merchantPageData.list[a],"check",i)}}})},headerClick:function(t){if("全选"===t.label)if(this.isSelectAll)for(var e=0;e<this.merchantPageData.list.length;e++)this.itemSelect(this.merchantPageData.list[e],!1);else for(var a=0;a<this.merchantPageData.list.length;a++)this.itemSelect(this.merchantPageData.list[a],!0)},itemClick:function(t){t.check?this.itemSelect(t,!1):this.itemSelect(t,!0)},itemSelect:function(t,e){var a=this;this.$set(t,"check",e),t.check?(this.$set(t,"check",!0),this.selectList.push(t)):this.selectList.forEach(function(e,i){t.userId==e.userId&&a.selectList.splice(i,1)});for(var i=!0,n=0;n<this.merchantPageData.list.length;n++)this.merchantPageData.list[n].check||(i=!1);this.isSelectAll=i},mergeArray:function(){for(var t=0;t<this.multipleSelection.length;t++)if(this.selectList.length>0){for(var e=!1,a=0;a<this.selectList.length;a++)this.multipleSelection[t].userId==this.selectList[a].userId&&(e=!0);e||this.selectList.push(this.multipleSelection[t])}else this.selectList.push(this.multipleSelection[t]);return[]}},watch:{show:function(t,e){t&&(this.showWidget=!0,this.merchantFormData={name:"",pageNum:1,pageSize:10},this.getMerchantList())},showWidget:function(t,e){t||this.$emit("change")}},computed:{}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{staticClass:"addMerchant-page",attrs:{title:"增加商户1",visible:t.showWidget},on:{"update:visible":function(e){t.showWidget=e}}},[a("el-form",{attrs:{model:t.merchantFormData,"label-width":"95px",size:"mini",inline:""}},[a("el-form-item",{attrs:{label:"账户/昵称:"}},[a("el-input",{attrs:{placeholder:"请输入账户或者昵称"},model:{value:t.merchantFormData.name,callback:function(e){t.$set(t.merchantFormData,"name",e)},expression:"merchantFormData.name"}})],1),t._v(" "),a("el-form-item",[a("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary"},on:{click:t.getMerchantList}},[t._v("搜索")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){}}},[t._v("确定增加")])],1)],1),t._v(" "),a("el-table",{staticClass:"addMerchantSelect",staticStyle:{"min-width":"100%"},attrs:{data:t.merchantPageData.list,height:"420px",border:"",size:"mini"},on:{"header-click":t.headerClick}},[a("el-table-column",{attrs:{width:"55",label:"全选",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{staticClass:"checkBox",on:{click:function(a){return t.itemClick(e.row)}}},[a("div",{staticClass:"check",class:e.row.check?"isCheck":""})])}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"账号",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"昵称",align:"center"}})],1),t._v(" "),a("el-pagination",{attrs:{"current-page":t.merchantFormData.pageNum,"page-sizes":[10,20],"page-size":t.merchantFormData.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:1*t.merchantPageData.total},on:{"size-change":t.addMerchantSelectSizeChange,"current-change":t.addMerchantSelectCurrentChange}})],1)},staticRenderFns:[]};var l=a("VU/8")(i,n,!1,function(t){a("Z0RF")},"data-v-78b0ba4d",null).exports,s={components:{},props:{show:{type:Boolean,default:!1}},data:function(){return{showWidget:!0,addMerchantShow:!1,filterForm:{account:""},merchantPageData:{list:[],total:0},multipleSelection:[],selectList:[],isSelectAll:!1,userData:[]}},mounted:function(){this.getUserData()},methods:{getUserData:function(t){var e=this;this.$http.post("/wallet/invite/backmgr/findInviteChild",this.filterForm).then(function(a){var i=[];"saerch"==t&&a.result.userId?(i=[a.result],a.result.list&&a.result.list.length>0&&(i[0].hasChildren=!0)):(i=a.result.list).forEach(function(t){t.childNum>0?t.hasChildren=!0:t.hasChildren=!1}),e.userData=[],setTimeout(function(){e.userData=i},100)})},load:function(t,e,a){var i=t.inviteCode;this.$http.post("/wallet/invite/backmgr/findInviteChild",{inviteCode:i}).then(function(t){var e=t.result.list;e.forEach(function(t){t.childNum>0?t.hasChildren=!0:t.hasChildren=!1}),a(e)})},getMerchantList:function(){var t=this;this.$http.post("/wallet/backmgr/merchant/list",this.merchantFormData).then(function(e){if(200==e.code){t.merchantPageData=e.result.page;for(var a=0;a<t.merchantPageData.list.length;a++)if(t.selectList.length>0){for(var i=!1,n=0;n<t.selectList.length;n++)t.merchantPageData.list[a].userId==t.selectList[n].userId&&(i=!0);t.$set(t.merchantPageData.list[a],"check",i)}}})},allCheck:function(t){t.forEach(function(t,e){})},itemClick:function(t){t.check?this.itemSelect(t,!1):this.itemSelect(t,!0)},itemSelect:function(t,e){var a=this;this.$set(t,"check",e),t.check?(this.$set(t,"check",!0),this.selectList.push(t)):this.selectList.forEach(function(e,i){t.userId==e.userId&&a.selectList.splice(i,1)});for(var i=!0,n=0;n<this.merchantPageData.list.length;n++)this.merchantPageData.list[n].check||(i=!1);this.isSelectAll=i},mergeArray:function(){for(var t=0;t<this.multipleSelection.length;t++)if(this.selectList.length>0){for(var e=!1,a=0;a<this.selectList.length;a++)this.multipleSelection[t].userId==this.selectList[a].userId&&(e=!0);e||this.selectList.push(this.multipleSelection[t])}else this.selectList.push(this.multipleSelection[t]);return[]}},watch:{show:function(t,e){t&&(this.showWidget=!0,this.merchantFormData={name:"",pageNum:1,pageSize:10},this.getUserData())},showWidget:function(t,e){t||this.$emit("change")}},computed:{}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{staticClass:"addUser-page",attrs:{title:"增加码商",visible:t.showWidget},on:{"update:visible":function(e){t.showWidget=e}}},[a("el-form",{attrs:{model:t.filterForm,"label-width":"95px",size:"mini",inline:""}},[a("el-form-item",{attrs:{label:"账号:"}},[a("el-input",{attrs:{placeholder:"请输入账户或者昵称"},model:{value:t.filterForm.account,callback:function(e){t.$set(t.filterForm,"account",e)},expression:"filterForm.account"}})],1),t._v(" "),a("el-form-item",[a("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary"},on:{click:t.getMerchantList}},[t._v("搜索")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){}}},[t._v("确定增加")])],1)],1),t._v(" "),a("el-table",{staticStyle:{width:"100%",height:"100%"},attrs:{data:t.userData,height:"420px","row-key":"inviteCode",border:"",lazy:"",load:t.load,"tree-props":{children:"children",hasChildren:"hasChildren"},size:"mini"}},[a("el-table-column",{attrs:{prop:"nickName",label:"姓名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"userId",label:"ID",align:"center",width:"140"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"account",label:"账号",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{width:"55",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{staticClass:"checkBox",on:{click:function(a){return t.itemClick(e.row)}}},[a("div",{staticClass:"check",class:e.row.check?"isCheck":""})])}}])})],1)],1)},staticRenderFns:[]};var c={components:{addMerchant:l,addUser:a("VU/8")(s,r,!1,function(t){a("QQ5v")},"data-v-f8dd8b5e",null).exports},data:function(){return{addMerchantShow:!1,addUserShow:!1,formData:{create_time:"",groupName:"",name:""},pageData:{pageNum:1,pageSzie:20,total:3},multipleSelection:[],total:3,list:[{groupName:"默认",phone:"15179818328"},{groupName:"allbet",phone:"177939729"},{groupName:"ksx",phone:"15792797"},{groupName:"默认ksx",phone:"188397900"}]}},mounted:function(){},methods:{handleSelectionChange:function(t){this.multipleSelection=t},handleCurrentChange:function(t){this.pageNum=t},handleSizeChange:function(t){this.pageSize=t}},watch:{},computed:{}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"AuthorizedMerchantInfo-page"},[a("el-form",{ref:"form",attrs:{model:t.formData,"label-width":"85px",size:"mini",inline:""}},[a("el-form-item",{attrs:{label:"分组名称:"}},[a("el-input",{attrs:{disabled:"",value:"高级组"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"创建时间:"}},[a("el-input",{attrs:{disabled:"",value:"2019.09.21 18:38:09"}})],1)],1),t._v(" "),a("div",{staticClass:"main"},[a("div",[a("div",{staticClass:"title"},[a("span",[t._v("商户列表：")]),t._v(" "),a("p",[a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){}}},[t._v(" 一键删除 ")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){t.addMerchantShow=!0}}},[t._v(" 增加商户 ")])],1)]),t._v(" "),a("el-table",{attrs:{data:t.list,height:"auto",border:"",size:"mini"},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{type:"index",width:"50",label:"序号",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"商户账户",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"groupName",label:"商户昵称",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"date",label:"操作",fixed:"right",width:"110",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(t){}}},[t._v(" 删除 ")])]}}])})],1),t._v(" "),a("el-pagination",{attrs:{"current-page":t.pageData.pageNum,"page-sizes":[20,50],"page-size":t.pageData.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:1*t.pageData.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("div",[a("div",{staticClass:"title"},[a("span",[t._v("码商列表：")]),t._v(" "),a("p",[a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){}}},[t._v(" 一键删除 ")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){t.addUserShow=!0}}},[t._v(" 增加码商 ")])],1)]),t._v(" "),a("el-table",{staticStyle:{"min-width":"100%"},attrs:{data:t.list,height:"auto",border:"",size:"mini"},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{type:"index",width:"50",label:"序号",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"商户账户",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"groupName",label:"商户昵称",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"date",label:"操作",fixed:"right",width:"110",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(t){}}},[t._v(" 删除 ")])]}}])})],1),t._v(" "),a("el-pagination",{attrs:{"current-page":t.pageData.pageNum,"page-sizes":[20,50],"page-size":t.pageData.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:1*t.pageData.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)]),t._v(" "),a("addMerchant",{attrs:{show:t.addMerchantShow},on:{change:function(e){t.addMerchantShow=!1}}}),t._v(" "),a("addUser",{attrs:{show:t.addUserShow},on:{change:function(e){t.addUserShow=!1}}})],1)},staticRenderFns:[]};var h=a("VU/8")(c,o,!1,function(t){a("GImX")},"data-v-49d3b828",null);e.default=h.exports},QQ5v:function(t,e){},Z0RF:function(t,e){}});