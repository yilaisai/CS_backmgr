webpackJsonp([74],{"/6+U":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("s0MJ");var l={name:"merchantList",data:function(){return{selectedDate:[],currentPage:1,filterForm:{pageNum:1,pageSize:20,startDate:"",endDate:"",status:""},userTypeForm:{userLevel:"1",userRole:"1"},statusList:[{value:"待审核",label:"0"},{value:"已审核",label:"1"}],listData:{total:null,list:[]}}},mounted:function(){this.getList()},methods:{getList:function(){var t=this;2==this.selectedDate.length&&(this.filterForm.startDate=this.selectedDate&&this.$fmtDate(this.selectedDate[0].getTime())+" 00:00:00",this.filterForm.endDate=this.selectedDate&&this.$fmtDate(this.selectedDate[1].getTime())+" 23:59:59"),this.$http.post("/wallet/backmgr/merchant/apply/list",this.filterForm).then(function(e){var a=e.result.page,l=a.list,r=a.total;t.listData.list=l,t.listData.total=r})},setDateType:function(){var t=new Date,e=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();this.selectedDate=[e,e]},search:function(){this.getList()},handleCurrentChange:function(t,e){this.filterForm.pageSize=t,this.filterForm.pageNum=e,this.getList()}},activated:function(){this.getList()}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"merchant-page"},[a("el-container",[a("el-main",[a("el-form",{ref:"filterForm",attrs:{inline:!0,model:t.filterForm,size:"mini"}},[a("div",{staticClass:"form-group"},[a("el-form-item",{staticClass:"dateItem",attrs:{label:"时间:"}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:function(e){t.filterForm.dateType=""}},model:{value:t.selectedDate,callback:function(e){t.selectedDate=e},expression:"selectedDate"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"状态:"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.filterForm.status,callback:function(e){t.$set(t.filterForm,"status",e)},expression:"filterForm.status"}},[a("el-option",{attrs:{value:"",label:"全部"}}),t._v(" "),t._l(t.statusList,function(t,e){return a("el-option",{key:e,attrs:{label:t.value,value:t.label}})})],2)],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},nativeOn:{click:function(e){return t.search(e)}}},[t._v("搜索")])],1)],1)]),t._v(" "),a("el-table",{attrs:{data:t.listData.list,border:"",size:"mini"}},[a("el-table-column",{attrs:{label:"商户名称",prop:"name",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"手机号",prop:"phone",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"邮箱",prop:"email",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"手机号",prop:"phone",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(1==e.row.status?"已审核":2==e.row.status?"审核失败":"待审核")+"\n\t\t\t\t\t\t\t\t")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"注册时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(t.$fmtDate(e.row.createTime,"full"))+"\n\t\t\t\t\t\t\t\t")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"price",label:"操作",fixed:"right",width:"120",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},nativeOn:{click:function(a){return t.$router.push({path:"/merchant/merchantDetaile",query:{data:e.row}})}}},[t._v(t._s(0==e.row.status?"审核":"查看详情"))])]}}])})],1)],1),t._v(" "),a("el-footer",[a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.handleCurrentChange}})],1)],1)],1)},staticRenderFns:[]};var s=a("VU/8")(l,r,!1,function(t){a("Cciz")},"data-v-47a11f4f",null);e.default=s.exports},Cciz:function(t,e){}});