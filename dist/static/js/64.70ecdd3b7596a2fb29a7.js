webpackJsonp([64],{aMDj:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("Dd8w"),s=a.n(i),l={name:"application-details",data:function(){return{listData:{total:null,list:[]},pageNum:1,pageSize:20,recdStatus:"AUDITING",appId:"",appName:"",details:"",filterForm:{phone:"",startDate:"",beginTime:"",endDate:"",endTime:""},dateTime:[]}},methods:{submitForm:function(t){this.pageNum=t,2==this.details&&this.getThirdAppTradeRecds(),3==this.details&&this.getThirdAppStats()},getPaginationChange:function(t,e){this.pageSize=t,this.submitForm(e)},getThirdAppTradeForSac:function(){var t=this,e=this.recdStatus,a=this.appId,i=this.pageSize,s=this.pageNum;this.$http.post("wallet/backmgr/thirdAppInfo/getThirdAppTradeForSac",{recdStatus:e,appId:a,pageSize:i,pageNum:s}).then(function(e){t.listData=e.result.list})},auditTrade:function(t,e){var a=this,i=t.tradeId,s=t.phone;this.$confirm("确定"+(3==e?"拒绝":"通过")+" "+s+"的审批吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.$http.post("wallet/backmgr/trade/auditTrade",{tradeId:i,tradeStatus:e}).then(function(t){a.$notify({title:"成功",message:"已"+(3==e?"拒绝":"通过")+" 审批",type:"success"}),a.getThirdAppTradeForSac()})})},getThirdAppTradeRecds:function(){var t=this;this.filterForm.startDate=this.dateTime&&this.dateTime[0],this.filterForm.endDate=this.dateTime&&this.dateTime[1];var e=this.appId,a=this.pageNum,i=this.pageSize;this.$http.post("wallet/backmgr/thirdAppInfo/getThirdAppTradeRecds",s()({appid:e,pageNum:a,pageSize:i},this.filterForm)).then(function(e){t.listData=e.result.list})},getThirdAppStats:function(){var t=this;this.filterForm.beginTime=this.dateTime&&this.dateTime[0],this.filterForm.endTime=this.dateTime&&this.dateTime[1];var e=this.appId,a=this.pageNum,i=this.pageSize;this.$http.post("wallet/backmgr/thirdAppInfo/getThirdAppStats",s()({appid:e,pageNum:a,pageSize:i},this.filterForm)).then(function(e){t.listData=e.result.list})}},activated:function(){var t=this.$route.params,e=t.details,a=t.appId;t.appName;a?(this.appId=a,this.appName=a,this.details=e,1==e?this.getThirdAppTradeForSac():2==e?this.getThirdAppTradeRecds():this.getThirdAppStats()):this.$router.go(-1)}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"application-details"},[a("el-row",{staticStyle:{"margin-bottom":"20px"}},[a("el-col",{attrs:{span:4}},[a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(e){return t.$router.go(-1)}}},[t._v("返回")])],1),t._v(" "),a("el-col",{staticStyle:{"text-align":"center"},attrs:{span:16}},[a("span",[t._v("应用名："+t._s(t.appName))])]),t._v(" "),a("el-col",{attrs:{span:4}})],1),t._v(" "),1==t.details?[a("el-radio-group",{staticStyle:{"margin-bottom":"30px","text-align":"center"},attrs:{size:"small"},on:{change:t.getThirdAppTradeForSac},model:{value:t.recdStatus,callback:function(e){t.recdStatus=e},expression:"recdStatus"}},[a("el-radio-button",{attrs:{label:"AUDITING"}},[t._v("待审批")]),t._v(" "),a("el-radio-button",{attrs:{label:"PROCESSING"}},[t._v("已审批")])],1),t._v(" "),a("sac-table",{attrs:{data:t.listData.list}},[a("el-table-column",{attrs:{prop:"id",label:"序号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"用户名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"coinName",label:"兑换币种"}}),t._v(" "),a("el-table-column",{attrs:{prop:"amount",label:"申请兑换金额"}}),t._v(" "),a("el-table-column",{attrs:{prop:"recdTime",label:"创建时间"}}),t._v(" "),"AUDITING"===t.recdStatus?a("el-table-column",{attrs:{label:"操作",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"success",size:"small"},nativeOn:{click:function(a){return t.auditTrade(e.row,4)}}},[t._v("通过")]),t._v(" "),a("el-button",{attrs:{type:"danger",size:"small"},nativeOn:{click:function(a){return t.auditTrade(e.row,3)}}},[t._v("拒绝")])]}}],null,!1,2374860157)}):t._e()],1),t._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.pageSize,"current-page":t.pageNum},on:{handleChange:t.getPaginationChange}})]:t._e(),t._v(" "),2==t.details?[a("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"130px",model:t.filterForm}},[a("el-form-item",{staticClass:"sac-time",attrs:{label:"日　　期:"}},[a("el-date-picker",{attrs:{size:"small","value-format":"yyyy-MM-dd HH:mm:ss",type:"datetimerange","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.dateTime,callback:function(e){t.dateTime=e},expression:"dateTime"}})],1),t._v(" "),a("sac-input",{ref:"phone",attrs:{label:"户名",prop:"phone"},model:{value:t.filterForm.phone,callback:function(e){t.$set(t.filterForm,"phone","string"==typeof e?e.trim():e)},expression:"filterForm.phone"}}),t._v(" "),a("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(e){return t.submitForm(1)}}})],1),t._v(" "),a("sac-table",{attrs:{data:t.listData.list}},[a("el-table-column",{attrs:{prop:"recdTime",label:"日期"}}),t._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"用户名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"amount",label:"兑换金额"}})],1),t._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.pageSize,"current-page":t.pageNum},on:{handleChange:t.getPaginationChange}})]:t._e(),t._v(" "),3==t.details?[a("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"130px",model:t.filterForm}},[a("el-form-item",{staticClass:"sac-time",attrs:{label:"日　　期:"}},[a("el-date-picker",{attrs:{size:"small","value-format":"yyyy-MM-dd HH:mm:ss",type:"datetimerange","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.dateTime,callback:function(e){t.dateTime=e},expression:"dateTime"}})],1),t._v(" "),a("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(e){return t.submitForm(1)}}})],1),t._v(" "),a("sac-table",{attrs:{data:t.listData.list}},[a("el-table-column",{attrs:{prop:"dayTime",label:"日期"}}),t._v(" "),a("el-table-column",{attrs:{prop:"transferOutAmount",label:"转出金额"}}),t._v(" "),a("el-table-column",{attrs:{prop:"transferInAmount",label:"转入金额"}})],1),t._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.pageSize,"current-page":t.pageNum},on:{handleChange:t.getPaginationChange}})]:t._e()],2)},staticRenderFns:[]};var n=a("VU/8")(l,r,!1,function(t){a("t8ua")},null,null);e.default=n.exports},t8ua:function(t,e){}});