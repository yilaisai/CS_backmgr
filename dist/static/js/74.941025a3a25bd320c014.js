webpackJsonp([74],{"6g6W":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("s0MJ"),i={name:"ranking",data:function(){return{filterForm:{coinId:1,orderBy:"desc",curPage:1,pageSize:20},listData:{total:null,list:[]},coinRand:"持有的全部"}},methods:{coinChange:function(t,e){this.coinRand="持有的"+e},resetForm:function(){this.$refs.coinId.reset(),this.$refs.filterForm.resetFields(),this.filterForm.curPage=1,this.getPersonalRanking()},submitForm:function(){this.filterForm.curPage=1,this.getPersonalRanking()},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.filterForm.curPage=e,this.getPersonalRanking()},getPersonalRanking:function(){var t=this;this.$http.post("/wallet/backmgr/personalRanking",this.filterForm).then(function(e){var n=e.result,i=n.list,l=n.total;i.forEach(function(t){t.lastLoginTime=t.lastLoginTime?Object(a.a)(1*t.lastLoginTime,"YYYY-MM-DD HH:mm:ss"):t.lastLoginTime}),t.listData.list=i,t.listData.total=l})},goDetail:function(t){this.$router.push({name:"queryDetails",query:{phone:t}})}},activated:function(){this.getPersonalRanking()}},l={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"ranking"},[n("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"80px",model:t.filterForm}},[n("sac-coin",{ref:"coinId",attrs:{isAll:!0},on:{change:t.coinChange},model:{value:t.filterForm.coinId,callback:function(e){t.$set(t.filterForm,"coinId",e)},expression:"filterForm.coinId"}}),t._v(" "),n("sac-submit-form",{on:{submitForm:t.submitForm,resetForm:t.resetForm}})],1),t._v(" "),n("el-table",{attrs:{height:"100%",border:"",size:"small",data:t.listData.list}},[n("el-table-column",{attrs:{prop:"rank",label:"排名",width:"100",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"phone",label:"账号",width:"130",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"amount",label:t.coinRand,align:"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"coinAddr",label:"收款地址"}}),t._v(" "),n("el-table-column",{attrs:{prop:"lastLoginTime",label:"最后登录时间",width:"140"}}),t._v(" "),n("el-table-column",{attrs:{label:"操作",width:"130",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(n){return t.goDetail(e.row.phone)}}},[t._v("查看详情")])]}}])})],1),t._v(" "),n("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.curPage},on:{handleChange:t.getPaginationChange}})],1)},staticRenderFns:[]};var r=n("VU/8")(i,l,!1,function(t){n("vnvW")},null,null);e.default=r.exports},vnvW:function(t,e){}});