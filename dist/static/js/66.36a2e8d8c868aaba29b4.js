webpackJsonp([66],{gLwv:function(t,e){},qu4T:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={components:{},data:function(){return{list:[],payType:4,pageNum:1,pageSize:20,total:0}},mounted:function(){this.getList()},methods:{getList:function(){var t=this;this.list=[],this.$http.post("/wallet/app/otc/backmgr/domain/list",{payType:this.payType,pageNum:this.pageNum,pageSize:this.pageSize}).then(function(e){200==e.code&&(t.list=e.result.list.list,t.total=e.result.list.total)})},handleCurrentChange:function(t){this.pageNum=t,this.getList()},handleSizeChange:function(t){this.pageSize=t,this.getList()},checkedPayType:function(t){this.payType!=t&&(this.payType=t,this.pageNum=1,this.getList())},updateStatus:function(t){var e=this,a=0;this.list.forEach(function(t){1==t.status&&(a+=1)}),1==a&&1==t.status?this.$confirm("当前只有一台服务器开启中，若关闭则无服务器开启，确定关闭？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.update(t)}).catch(function(){}):this.update(t)},update:function(t){var e=this;this.$http.post("/wallet/app/otc/backmgr/domain/updateStatus",{status:1==t.status?0:1,id:t.id}).then(function(t){200==t.code&&(e.$notify({title:"成功",message:"修改成功",type:"success"}),e.getList())})},indexMethod:function(t){return t+1}},watch:{},computed:{}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"domainNameList-page"},[a("ul",{staticClass:"tabs"},[a("li",{class:4==t.payType?"active":"",on:{click:function(e){return t.checkedPayType(4)}}},[t._v("宝转卡中转域名")]),t._v(" "),a("li",{class:3==t.payType?"active":"",on:{click:function(e){return t.checkedPayType(3)}}},[t._v("微信中转域名")]),t._v(" "),a("li",{class:2==t.payType?"active":"",on:{click:function(e){return t.checkedPayType(2)}}},[t._v("支付宝中转域名")])]),t._v(" "),a("el-table",{attrs:{stripe:"",border:"",height:"100%",size:"mini",data:t.list}},[a("el-table-column",{attrs:{type:"index",label:"序号",index:t.indexMethod,align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"domainName",label:"服务器域名",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"添加时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(t.$fmtDate(e.row.createTime,"full"))+"\n\t\t\t")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"updateTime",label:"上次使用时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(t.$fmtDate(e.row.lastStartTime,"full"))+"\n\t\t\t")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{class:1==e.row.status?"status1":"status2"},[t._v(t._s(1==e.row.status?"已开启":"已关闭"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:0==e.row.status?"primary":"warning"},on:{click:function(a){return t.updateStatus(e.row)}}},[t._v(t._s(1==e.row.status?"关闭":"开启"))])]}}])})],1),t._v(" "),a("el-pagination",{attrs:{"current-page":t.pageNum,"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:1*t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)},staticRenderFns:[]};var s=a("VU/8")(n,i,!1,function(t){a("gLwv")},"data-v-1bf63eaa",null);e.default=s.exports}});