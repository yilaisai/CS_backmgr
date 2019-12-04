webpackJsonp([101],{AAYe:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"revenue-management"},[a("el-form",{ref:"filterForm",attrs:{"label-width":"90px",inline:!0,model:t.filterForm}},[a("el-form-item",{attrs:{label:"期　　数：",prop:"pageType"}},[a("el-select",{ref:"pageType",attrs:{size:"small"},model:{value:t.filterForm.num,callback:function(e){t.$set(t.filterForm,"num",e)},expression:"filterForm.num"}},t._l(t.numGameInfoList,function(t,e){return a("el-option",{key:e,attrs:{label:t.dateStr,value:t.num}})}),1)],1),t._v(" "),a("el-form-item",[a("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(e){return t.submitForm(1)}}})],1)],1),t._v(" "),a("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"团队收益",name:"first"}},[a("div",{staticClass:"totalRevenue"},[t._v("\n        本期总收益："),a("span",[t._v(t._s(t.totalIncome)+" ")]),t._v("PNB\n      ")]),t._v(" "),a("sac-table",{attrs:{data:t.teamIncome}},[a("el-table-column",{attrs:{prop:"teamName",label:"商户名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"member",label:"总人数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"pnbAmount",label:"PNB投票数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"pnbIncome",label:"团队总收益（PNB）"}})],1)],1),t._v(" "),a("el-tab-pane",{attrs:{label:"个人收益",name:"second"}},[a("sac-table",{attrs:{data:t.userIncome}},[a("el-table-column",{attrs:{prop:"phone",label:"用户名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"teamName",label:"节点"}}),t._v(" "),a("el-table-column",{attrs:{prop:"roleName",label:"当前等级"}}),t._v(" "),a("el-table-column",{attrs:{prop:"pnbAmount",label:"PNB投票数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"pnbIncome",label:"收益（PNB）"}})],1),t._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.userIncome.length>0,expression:"userIncome.length>0"}],attrs:{total:t.filterForm.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageSize},on:{handleChange:t.getPaginationChange}})],1),t._v(" "),a("el-tab-pane",{attrs:{label:"商户情况",name:"third"}},[a("div",[a("span",{staticClass:"amount"},[t._v(" SAC汇率："),a("span",{staticClass:"red"},[t._v(t._s(t.sacRate))])])]),t._v(" "),a("el-table",{attrs:{data:t.teamMonEarn,border:"","show-summary":"",size:"small"}},[a("el-table-column",{attrs:{prop:"teamName",label:"商户名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"sacAmount",label:"SAC投票净消耗数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"pnbbitgoAmount",label:"PNBBITGO投票净消耗数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"currentPnb",label:"当月PNB总票数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"pnbIncome",label:"PNB利息"}}),t._v(" "),a("el-table-column",{attrs:{label:"奖励"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n            "+t._s(e.row.rewardStr)+"\n          ")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"toSacAmount",label:"PNB折合SAC"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{style:{color:e.row.toSacAmount<e.row.sacAmount?"red":e.row.toSacAmount>e.row.sacAmount?"#02bb02":""}},[t._v(t._s(e.row.toSacAmount))])]}}])})],1)],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")({name:"revenue-management",data:function(){return{filterForm:{num:null,pageNum:1,pageSize:20,total:0},numGameInfoList:[],activeName:"first",totalIncome:"0",teamIncome:[],userIncome:[],teamMonEarn:[],pnbAmount:"0",sacAmount:"0",sacRate:"0"}},methods:{submitForm:function(t){this.filterForm.pageNum=t,this.handleClick()},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.filterForm.pageNum=e,this.submitForm(e)},getNumGameInfo:function(){var t=this;this.$http.post("/supernode/vote/open/getNumGameInfo").then(function(e){e.result.map(function(t){t.dateStr=(t.num?"第"+t.num+"期：":"当前期：")+t.dateStr.substr(0,4)+"."+t.dateStr.substr(4,2)+"."+t.dateStr.substr(6,7)+"."+t.dateStr.substr(13,2)+"."+t.dateStr.substr(15,2)}),t.numGameInfoList=e.result})},getTotalIncome:function(){var t=this;this.$http.post("supernode/backmgr/income/getTotalIncome",{num:this.filterForm.num}).then(function(e){t.totalIncome=e.result||0})},getTeamIncome:function(){var t=this;this.$http.post("supernode/backmgr/income/getTeamIncome",{num:this.filterForm.num}).then(function(e){t.teamIncome=e.result})},getUserIncome:function(){var t=this;this.$http.post("supernode/backmgr/income/getUserIncome",{num:this.filterForm.num,pageNum:this.filterForm.pageNum,pageSize:this.filterForm.pageSize}).then(function(e){var a=e.result,n=a.list,o=a.total;t.userIncome=n,t.filterForm.total=o})},getTeamMonEarn:function(){var t=this;this.$http.post("supernode/backmgr/income/getTeamMonEarn",{num:this.filterForm.num}).then(function(e){var a=e.result,n=a.list,o=a.pnbAmount,r=a.sacAmount,l=a.sacRate;t.teamMonEarn=n,t.pnbAmount=o||"0",t.sacAmount=r||"0",t.sacRate=l||"0"})},handleClick:function(){({first:this.getTeamIncome,second:this.getUserIncome,third:this.getTeamMonEarn})[this.activeName](),"first"==this.activeName&&this.getTotalIncome()}},activated:function(){this.getNumGameInfo(),this.getTotalIncome(),this.getTeamIncome()}},n,!1,function(t){a("dgyA")},null,null);e.default=o.exports},dgyA:function(t,e){}});