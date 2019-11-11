webpackJsonp([86],{"5hQs":function(e,t){},sxjN:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});a("s0MJ");var l={name:"transaction-details",data:function(){return{dialogFormVisible:!1,selectedDate:[],currentPage:1,filterForm:{pageNum:1,pageSize:20,startDate:"",company:"",endDate:"",account:"",nickName:"",userLevel:"",userRole:""},userTypeForm:{userLevel:"1",userEnterprise:"1"},advList:[{value:"普通用户",label:"0"},{value:"普通广告商",label:"1"},{value:"高级广告商",label:"2"},{value:"企业广告商",label:"3"}],companyType:[{value:"非企业",label:"0"},{value:"企业号",label:"1"}],listData:{total:null,list:[]}}},methods:{getList:function(){var e=this;2==this.selectedDate.length&&(this.filterForm.startDate=this.selectedDate&&this.$fmtDate(this.selectedDate[0].getTime())+" 00:00:00",this.filterForm.endDate=this.selectedDate&&this.$fmtDate(this.selectedDate[1].getTime())+" 23:59:59"),this.$http.post("/wallet/app/otc/backmgr/queryOtcUser",this.filterForm).then(function(t){var a=t.result,l=a.list,r=a.total;e.listData.list=l,e.listData.total=r})},updateOtcUserLevel:function(e){var t=this;this.$http.post("/wallet/app/otc/backmgr/updateOtcUserLevel",this.userTypeForm).then(function(e){t.$message.success("类型修改成功"),t.dialogFormVisible=!1,t.getList()})},dateChange:function(){},editType:function(e){this.userTypeForm={userLevel:e.userLevel+"",userEnterprise:e.userEnterprise+"",userId:e.userId},this.dialogFormVisible=!0},setDateType:function(){var e=new Date,t=e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate();this.selectedDate=[t,t]},search:function(){this.getList()},checkLog:function(){this.$router.push({path:"customer-log"})},checkDetails:function(){this.$router.push({path:"complaint-details"})},handleCurrentChange:function(e,t){this.filterForm.pageSize=e,this.filterForm.pageNum=t,this.getList()},download:function(){location.href=SERVER_PATH+"/wallet/app/otc/backmgr/exportExcel?startDate="+this.filterForm.startDate+"&endDate="+this.filterForm.endDate+"&userId="+this.filterForm.userId+"&token="+localStorage.getItem("cus_token")}},activated:function(){this.getList()}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"userQuery-page"},[a("el-container",[a("el-main",[a("el-form",{ref:"filterForm",attrs:{inline:!0,model:e.filterForm,"label-width":"86px",size:"mini"}},[a("div",{staticClass:"form-group"},[a("el-form-item",{attrs:{label:"账号:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入用户账号"},model:{value:e.filterForm.account,callback:function(t){e.$set(e.filterForm,"account",t)},expression:"filterForm.account"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"昵称:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入用户昵称"},model:{value:e.filterForm.nickName,callback:function(t){e.$set(e.filterForm,"nickName",t)},expression:"filterForm.nickName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"企业类型:"}},[a("el-select",{model:{value:e.filterForm.company,callback:function(t){e.$set(e.filterForm,"company",t)},expression:"filterForm.company"}},[a("el-option",{attrs:{value:"",label:"所有"}}),e._v(" "),e._l(e.companyType,function(e,t){return a("el-option",{key:t,attrs:{value:e.label,label:e.value}})})],2)],1)],1),e._v(" "),a("div",{staticClass:"form-group"},[a("el-form-item",{staticClass:"dateItem",attrs:{label:"时间:"}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期",format:"yyyy-MM-dd ","end-placeholder":"结束日期"},on:{change:e.dateChange},model:{value:e.selectedDate,callback:function(t){e.selectedDate=t},expression:"selectedDate"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},nativeOn:{click:function(t){return e.search(t)}}},[e._v("搜索")])],1)],1)]),e._v(" "),a("el-table",{attrs:{data:e.listData.list,border:"",size:"mini",height:"100%"}},[a("el-table-column",{attrs:{label:"账户/昵称"},scopedSlots:e._u([{key:"default",fn:function(t){return a("div",{staticClass:"scope"},[e._v(e._s(t.row.account)+" -- "+e._s(t.row.nickName))])}}])}),e._v(" "),a("el-table-column",{attrs:{label:"企业类型",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return a("div",{staticClass:"scope"},[0==t.row.userEnterprise?a("span",[e._v("非企业号")]):e._e(),e._v(" "),1==t.row.userEnterprise?a("span",[e._v("企业号")]):e._e()])}}])}),e._v(" "),a("el-table-column",{attrs:{label:"卖出佣金费率",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(Math.floor(1e4*t.row.firstRate)/100)+"%")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"price",label:"授权商户",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"price",label:"注册时间",width:"140"},scopedSlots:e._u([{key:"default",fn:function(t){return a("div",{},[e._v(e._s(e.$fmtDate(t.row.registTimeStamp,"full")))])}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"price",label:"操作",fixed:"right",width:"190"},scopedSlots:e._u([{key:"default",fn:function(t){return a("div",{staticClass:"scope"},[a("el-button",{attrs:{type:"primary",size:"mini"},nativeOn:{click:function(a){return e.$router.push({path:"/LegalCurrency/userQueryDetaile",query:{userId:t.row.userId}})}}},[e._v("查看详情")]),e._v(" "),a("el-button",{attrs:{type:"warning",size:"mini"},nativeOn:{click:function(a){return e.editType(t.row)}}},[e._v("修改类型")])],1)}}])})],1)],1),e._v(" "),a("el-footer",[a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.filterForm.pageSize,"current-page":e.filterForm.pageNum},on:{handleChange:e.handleCurrentChange}})],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"修改用户类型",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{model:e.userTypeForm}},[a("el-form-item",{attrs:{label:"企业类型调整：","label-width":"140px"}},[a("el-select",{attrs:{placeholder:"请选择企业类型"},model:{value:e.userTypeForm.userEnterprise,callback:function(t){e.$set(e.userTypeForm,"userEnterprise",t)},expression:"userTypeForm.userEnterprise"}},e._l(e.companyType,function(e,t){return a("el-option",{key:t,attrs:{label:e.value,value:e.label}})}),1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.updateOtcUserLevel}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var s=a("VU/8")(l,r,!1,function(e){a("5hQs")},"data-v-0e5e599a",null);t.default=s.exports}});