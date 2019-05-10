webpackJsonp([21],{Tqh9:function(e,t){},bb03:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=l("mvHQ"),i=l.n(a),r={name:"activity",data:function(){var e=this,t=function(e,t,l){/^[0-9]+.?[0-9]*$/.test(t)?l():l(new Error(e.message))};return{pageNum:1,pageSize:20,listData:{total:null,list:[]},dialogTitle:"",dialogFormVisible:!1,ruleForm:{planName:"",yearIncome:"",totalAmount:"",limitTime:"",description:"",beginTime:"",endTime:"",buyMax:"",buyMin:""},dateTime:[],rules:{planName:[{required:!0,message:"请输入活动名称",trigger:"blur"}],beginTime:[{required:!0,message:"请选择认购时间",trigger:"blur"}],totalAmount:[{required:!0,message:"请输入活动资金",trigger:"blur"},{validator:t,message:"活动资金必须为数字"},{validator:function(t,l,a){""!==e.ruleForm.buyMin&&e.$refs.ruleForm.validateField("buyMin"),a()}}],limitTime:[{required:!0,message:"请输入锁仓期限",trigger:"blur"},{validator:t,message:"锁仓期限必须为数字"}],yearIncome:[{required:!0,message:"请输入年化收益",trigger:"blur"},{validator:function(e,t,l){/^[0-9]+.?[0-9]*$/.test(t)?t>9?l(new Error("年化收益值必须小于9")):(t+"").length>5?l(new Error("年化收益值精确到毫")):l():l(new Error("年化收益必须为数字"))}}],buyMin:[{required:!0,message:"请输入起购额度",trigger:"blur"},{validator:t,message:"起购额度必须为数字"}],buyMax:[{required:!0,message:"请输入限购额度",trigger:"blur"},{validator:t,message:"限购额度必须为数字"},{validator:function(t,l,a){l>e.ruleForm.totalAmount?a(new Error("活动资金必须大于限购额度")):a()}}],description:[{required:!0,message:"请输入活动详情",trigger:"blur"}]}}},methods:{resetForm:function(){this.ruleForm={planName:"",yearIncome:"",totalAmount:"",limitTime:"",description:"",beginTime:"",endTime:"",buyMax:"",buyMin:""},this.dateTime=[],this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},getPaginationChange:function(e,t){this.pageSize=e,this.pageNum=t,this.getCoinPlanInfo()},getCoinPlanInfo:function(){var e=this,t=this.pageNum,l=this.pageSize;this.$http.post("wallet/backmgr/plan/getCoinPlanInfo.do",{pageNum:t,pageSize:l}).then(function(t){var l=t.result.list,a=l.list,i=l.total;e.listData.list=a,e.listData.total=i})},switchChange:function(e){var t=this,l=e.isOnshelf,a=e.id,i=e.planName;this.$http.post("wallet/backmgr/plan/updateCoinPlanOnshelf.do",{isOnshelf:l?"YES":"NO",planId:a}).then(function(e){t.$notify({title:"成功",message:i+" "+(l?"上架":"下架")+" 成功",type:"success"}),t.getCoinPlanInfo()})},remove:function(e){var t=this,l=e.id,a=e.planName,i=e.sysStatus;this.$confirm("确定删除 "+a+" 吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.post("wallet/backmgr/plan/updateCoinPlanSysStatus.do",{sysStatus:1==i?"INVALID0":"VALID1",planId:l}).then(function(e){t.$notify({title:"成功",message:"删除 "+a+"成功",type:"success"}),t.getCoinPlanInfo()})})},addActivity:function(){this.dialogTitle="创建活动",this.resetForm(),this.dialogFormVisible=!0},modification:function(e){this.resetForm(),this.dialogFormVisible=!0,this.ruleForm=JSON.parse(i()(e)),this.dateTime=[this.ruleForm.beginTime,this.ruleForm.endTime],this.dialogTitle="修改 "+this.ruleForm.appName+" 活动"},getDateTime:function(){this.ruleForm.beginTime=this.dateTime&&this.dateTime[0],this.ruleForm.endTime=this.dateTime&&this.dateTime[1]},determine:function(){var e=this;this.$refs.ruleForm.validate(function(t){t&&(e.ruleForm.id?(e.ruleForm.planId=e.ruleForm.id,e.$http.post("wallet/backmgr/plan/updateCoinPlanInfo.do",e.ruleForm).then(function(t){e.dialogFormVisible=!1,e.resetForm(),e.$notify({title:"成功",message:"修改 "+e.ruleForm.planName+" 活动成功",type:"success"}),e.getCoinPlanInfo()})):e.$http.post("wallet/backmgr/plan/createCoinPlanInfo.do",e.ruleForm).then(function(t){e.dialogFormVisible=!1,e.resetForm(),e.$notify({title:"成功",message:"创建 "+e.ruleForm.planName+" 活动成功",type:"success"}),e.pageNum=1,e.getCoinPlanInfo()}))})}},activated:function(){this.getCoinPlanInfo()}},o={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"activity"},[l("el-col",{staticStyle:{"text-align":"right","margin-bottom":"30px"},attrs:{span:22}},[l("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.addActivity}},[e._v("创建活动")])],1),e._v(" "),l("sac-table",{attrs:{data:e.listData.list}},[l("el-table-column",{attrs:{prop:"planName",label:"活动名称"}}),e._v(" "),l("el-table-column",{attrs:{label:"认购时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.beginTime)+" 至 "+e._s(t.row.endTime)+"\n      ")]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"totalAmount",label:"活动资金",width:"100"}}),e._v(" "),l("el-table-column",{attrs:{prop:"limitTime",label:"锁仓期限",width:"100"}}),e._v(" "),l("el-table-column",{attrs:{prop:"yearIncome",label:"年化收益",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(100*t.row.yearIncome)+"%\n      ")]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"buyMin",label:"起购额度",width:"100"}}),e._v(" "),l("el-table-column",{attrs:{prop:"buyMax",label:"最大购买额度",width:"120"}}),e._v(" "),l("el-table-column",{attrs:{prop:"description",label:"活动详情"}}),e._v(" "),l("el-table-column",{attrs:{label:"操作",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{type:"success",disabled:0!=t.row.isOnshelf,size:"small"},nativeOn:{click:function(l){e.modification(t.row)}}},[e._v("修改\n        ")]),e._v(" "),l("el-button",{attrs:{type:"danger",disabled:0!=t.row.isOnshelf,size:"small"},nativeOn:{click:function(l){e.remove(t.row)}}},[e._v("\n          删除\n        ")])]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"上架",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-switch",{attrs:{"inactive-value":0,"active-value":1},nativeOn:{click:function(l){e.switchChange(t.row)}},model:{value:t.row.isOnshelf,callback:function(l){e.$set(t.row,"isOnshelf",l)},expression:"scope.row.isOnshelf"}})]}}])})],1),e._v(" "),l("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.pageSize,"current-page":e.pageNum},on:{handleChange:e.getPaginationChange}}),e._v(" "),l("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[l("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,inline:!0,"label-width":"130px"}},[l("el-form-item",{attrs:{label:"活动名称:",prop:"planName"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入活动名称"},model:{value:e.ruleForm.planName,callback:function(t){e.$set(e.ruleForm,"planName",t)},expression:"ruleForm.planName"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"认购时间:",prop:"beginTime"}},[l("el-date-picker",{attrs:{size:"small","value-format":"yyyy-MM-dd HH:mm:ss",type:"datetimerange","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:function(t){e.getDateTime()}},model:{value:e.dateTime,callback:function(t){e.dateTime=t},expression:"dateTime"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"活动资金:",prop:"totalAmount"}},[l("el-input",{attrs:{placeholder:"请输入活动资金",size:"small"},model:{value:e.ruleForm.totalAmount,callback:function(t){e.$set(e.ruleForm,"totalAmount",t)},expression:"ruleForm.totalAmount"}},[l("template",{slot:"append"},[e._v("SAC")])],2)],1),e._v(" "),l("el-form-item",{attrs:{label:"锁仓期限:",prop:"limitTime"}},[l("el-input",{attrs:{placeholder:"请输入锁仓期限",size:"small"},model:{value:e.ruleForm.limitTime,callback:function(t){e.$set(e.ruleForm,"limitTime",t)},expression:"ruleForm.limitTime"}},[l("template",{slot:"append"},[e._v("天")])],2)],1),e._v(" "),l("el-form-item",{attrs:{label:"年化收益:",prop:"yearIncome"}},[l("el-input",{attrs:{size:"small",placeholder:"请输入年化收益"},model:{value:e.ruleForm.yearIncome,callback:function(t){e.$set(e.ruleForm,"yearIncome",t)},expression:"ruleForm.yearIncome"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"起购额度:",prop:"buyMin"}},[l("el-input",{attrs:{placeholder:"请输入起购额度",size:"small"},model:{value:e.ruleForm.buyMin,callback:function(t){e.$set(e.ruleForm,"buyMin",t)},expression:"ruleForm.buyMin"}},[l("template",{slot:"append"},[e._v("SAC")])],2)],1),e._v(" "),l("el-form-item",{attrs:{label:"限购额度:",prop:"buyMax"}},[l("el-input",{attrs:{placeholder:"请输入限购额度",size:"small"},model:{value:e.ruleForm.buyMax,callback:function(t){e.$set(e.ruleForm,"buyMax",t)},expression:"ruleForm.buyMax"}},[l("template",{slot:"append"},[e._v("SAC")])],2)],1),e._v(" "),l("el-form-item",{attrs:{label:"活动详情:",prop:"description"}},[l("el-input",{attrs:{type:"textarea",rows:2,size:"small",placeholder:"请输入活动详情"},model:{value:e.ruleForm.description,callback:function(t){e.$set(e.ruleForm,"description",t)},expression:"ruleForm.description"}})],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.determine}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var n=l("VU/8")(r,o,!1,function(e){l("Tqh9")},null,null);t.default=n.exports}});