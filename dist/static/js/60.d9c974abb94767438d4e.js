webpackJsonp([60],{"3qsG":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n("lvKI");var a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"query"},[n("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"80px",model:t.filterForm}},[n("sac-input",{ref:"phone",attrs:{label:"用户名",prop:"phone"},model:{value:t.filterForm.phone,callback:function(e){t.$set(t.filterForm,"phone","string"==typeof e?e.trim():e)},expression:"filterForm.phone"}}),t._v(" "),n("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(e){return t.submitForm(1)}}})],1),t._v(" "),n("sac-table",{attrs:{data:t.listData.list}},[n("el-table-column",{attrs:{prop:"phone",label:"用户名",width:"130"}}),t._v(" "),n("el-table-column",{attrs:{label:"注册时间",width:"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(t._f("dateFormat")(e.row.createTime,"YYYY-MM-DD HH:mm"))+"\n      ")]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"teamName",label:"节点"}}),t._v(" "),n("el-table-column",{attrs:{prop:"currentLevel",label:"当前等级"}}),t._v(" "),n("el-table-column",{attrs:{prop:"maxLevel",label:"最高等级"}}),t._v(" "),n("el-table-column",{attrs:{prop:"pNBAmount",label:"PNB"}}),t._v(" "),n("el-table-column",{attrs:{prop:"sACAmount",label:"SAC"}}),t._v(" "),n("el-table-column",{attrs:{label:"资金明细",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(n){return t.goDetail(e.row.phone)}}},[t._v("查看详情")])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"邀请详情",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(n){return t.goInviteDetail(e.row.phone)}}},[t._v("查看详情")])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"操作",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.status?n("el-button",{attrs:{size:"small",type:"success"},on:{click:function(n){return t.optStatusChange(0,"解锁账号",e.row)}}},[t._v("解锁账号\n        ")]):t._e(),t._v(" "),0==e.row.status?n("el-button",{attrs:{size:"small",type:"warning"},on:{click:function(n){return t.optStatusChange(1,"锁定账号",e.row)}}},[t._v("锁定账号\n        ")]):t._e()]}}])})],1),t._v(" "),n("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.curPage},on:{handleChange:t.getPaginationChange}})],1)},staticRenderFns:[]};var l=n("VU/8")({name:"user",data:function(){return{filterForm:{phone:"",curPage:1,pageSize:20},listData:{total:null,list:[]}}},methods:{submitForm:function(t){this.filterForm.curPage=t,this.getUserInfoList()},getUserInfoList:function(){var t=this;this.$http.post("supernode/backmgr/user/list",this.filterForm).then(function(e){var n=e.result,a=n.list,l=n.total;t.listData.list=a,t.listData.total=l})},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.filterForm.curPage=e,this.submitForm(e)},goDetail:function(t){this.$router.push({name:"money-manage",params:{phone:t}})},goInviteDetail:function(t){this.$router.push({name:"invite-detail",query:{phone:t}})},optStatusChange:function(t,e,n){var a=this,l=this.$createElement;this.$msgbox({title:"提示",message:l("p",null,[l("span",null,"确定执行 "),l("span",{style:"color: red"},e+" "),l("span",{style:"color: #0a52e0"},""+n.phone),l("span",null," 吗?")]),showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",beforeClose:function(l,o,r){"confirm"===l?a.$http.post("supernode/backmgr/user/lock",{phone:n.phone,status:t}).then(function(t){a.$notify({title:"成功",message:e+" "+n.phone+" 成功",type:"success"}),a.getUserInfoList(),r()}):r()}})}},activated:function(){this.getUserInfoList()}},a,!1,function(t){n("XQI0")},null,null);e.default=l.exports},XQI0:function(t,e){}});