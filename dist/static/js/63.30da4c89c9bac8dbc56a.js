webpackJsonp([63],{"3rr3":function(t,e){},O19P:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={components:{},data:function(){return{list:[]}},mounted:function(){this.getList()},methods:{getList:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/domain/list").then(function(e){200==e.code&&(t.list=e.result.list)})},updateStatus:function(t){var e=this,n=0;this.list.forEach(function(t){1==t.status&&(n+=1)}),1==n&&1==t.status?this.$confirm("当前只有一台服务器开启中，若关闭则无服务器开启，确定关闭？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.update(t)}).catch(function(){}):this.update(t)},update:function(t){var e=this;this.$http.post("/wallet/app/otc/backmgr/domain/updateStatus",{status:1==t.status?0:1,id:t.id}).then(function(t){200==t.code&&(e.$notify({title:"成功",message:"修改成功",type:"success"}),e.getList())})},indexMethod:function(t){return t+1}},watch:{},computed:{}},s={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"domainNameList-page"},[n("el-table",{attrs:{stripe:"",border:"",height:"100%",size:"mini",data:t.list}},[n("el-table-column",{attrs:{type:"index",label:"序号",index:t.indexMethod,align:"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"domainName",label:"服务器域名",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"createTime",label:"添加时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(t.$fmtDate(e.row.createTime,"full"))+"\n\t\t\t")]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"updateTime",label:"上次使用时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(t.$fmtDate(e.row.lastStartTime,"full"))+"\n\t\t\t")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",{class:1==e.row.status?"status1":"status2"},[t._v(t._s(1==e.row.status?"已开启":"已关闭"))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"操作",fixed:"right",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini",type:0==e.row.status?"primary":"warning"},on:{click:function(n){return t.updateStatus(e.row)}}},[t._v(t._s(1==e.row.status?"关闭":"开启"))])]}}])})],1)],1)},staticRenderFns:[]};var i=n("VU/8")(a,s,!1,function(t){n("3rr3")},"data-v-598c964f",null);e.default=i.exports}});