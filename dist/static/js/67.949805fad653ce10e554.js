webpackJsonp([67],{MNZj:function(e,t){throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: Cannot find module 'tslib'\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:594:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:520:25)\n    at Module.require (internal/modules/cjs/loader.js:650:17)\n    at require (internal/modules/cjs/helpers.js:20:18)\n    at Object.<anonymous> (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_less@3.11.0@less\\dist\\less.cjs.js:3:13)\n    at Module._compile (internal/modules/cjs/loader.js:702:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)\n    at Module.load (internal/modules/cjs/loader.js:612:32)\n    at tryModuleLoad (internal/modules/cjs/loader.js:551:12)\n    at Function.Module._load (internal/modules/cjs/loader.js:543:3)\n    at Module.require (internal/modules/cjs/loader.js:650:17)\n    at require (internal/modules/cjs/helpers.js:20:18)\n    at Object.<anonymous> (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_less@3.11.0@less\\index.js:1:80)\n    at Module._compile (internal/modules/cjs/loader.js:702:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)\n    at Module.load (internal/modules/cjs/loader.js:612:32)\n    at runLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:195:19)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:367:11\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:172:11\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:32:11)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:165:10)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:176:18\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:47:3)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:165:10)\n    at E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:176:18\n    at loadLoader (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\loadLoader.js:47:3)\n    at iteratePitchingLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:169:2)\n    at runLoaders (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_loader-runner@2.4.0@loader-runner\\lib\\LoaderRunner.js:365:2)\n    at NormalModule.doBuild (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:182:3)\n    at NormalModule.build (E:\\20200210\\new\\wallet-backmgr\\node_modules\\_webpack@3.12.0@webpack\\lib\\NormalModule.js:275:15)")},h1Sq:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=l("3cXf"),a=l.n(r),o={name:"message",data:function(){return{filterForm:{status:"",noticeType:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},noticeTypeList:[{value:"",label:"全部消息"},{value:"SystemMsg",label:"系统消息"},{value:"OperationMsg",label:"运营消息"},{value:"TransferMsg",label:"动账消息"}],sendStatuesList:[{value:"",label:"全部状态"},{value:"0",label:"未推送"},{value:"1",label:"审核中"},{value:"2",label:"推送中"},{value:"3",label:"部分推送"},{value:"4",label:"推送失败"},{value:"5",label:"推送成功"}],pushMessage:!1,dialogTitle:"新增消息模版",dialogFormVisible:!1,ruleForm:{title:"",text:"",targetId:"",targetPhone:"",coinId:"",minAmount:"",maxAmount:"",executeTime:"",isAuto:!1,id:""},ruleForm2:{tplId:"",auditResult:"pass",id:""},rules2:{tplId:[{required:!1,message:"请输入模板id",trigger:"blur"}]},rules:{targetId:[{required:!0,message:"请选择推送对象",trigger:"blur"}],text:[{required:!0,message:"请输入内容",trigger:"blur"}],executeTime:[{required:!0,message:"请选择发送日期",trigger:"blur"}],coinId:[{required:!0,message:"请选择币种",trigger:"change"}],targetPhone:[{required:!0,validator:function(e,t,l){""===t?l(new Error("请输入具体账号,多个账号用英文逗号隔开")):t.indexOf("，")>-1?l(new Error("请使用英文逗号隔开")):l()},trigger:"blur"}]},allAccountValue:"",targetId:null,currentObj:{},coinList:[],dialogTplVisible:!1,dialogTplTitle:"",dialogTplBtnText:"",executeTimeDisabled:!1}},methods:{resetForm:function(){this.$refs.ruleForm&&this.$refs.ruleForm.clearValidate(),this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},submitForm:function(e){this.filterForm.pageNum=e,this.getNoticeInfoList()},getPaginationChange:function(e,t){this.filterForm.pageSize=e,this.submitForm(t)},getNoticeInfoList:function(){var e=this;this.$http.post("wallet/backmgr/push/getMsgPushPlanList",this.filterForm).then(function(t){var l=t.result.list,r=l.list,a=l.total;r.forEach(function(e){e.isLoading=!1}),e.listData.list=r,e.listData.total=a})},remove:function(e){var t=this,l=e.id;e.title;this.$confirm("确定删除此条消息吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.post("wallet/backmgr/push/deleteMsgPushPlan",{id:l}).then(function(e){t.$notify({title:"成功",message:"删除成功",type:"success"}),t.getNoticeInfoList()})})},sendMessage:function(e,t){var l=this;this.listData.list[t].isLoading=!0,this.pushMessage=!0;var r=e.id;e.title;this.$http.post("wallet/backmgr/push/executeMsgPushPlan",{id:r}).then(function(e){var t=l;setTimeout(function(){t.$notify({title:"成功",message:" 启动推送消息成功",type:"success"}),t.getNoticeInfoList(),t.pushMessage=!1},2e3)}).catch(function(){l.getNoticeInfoList(),l.pushMessage=!1})},detailList:function(e){this.$router.push({name:"sms-pushDetails",query:{id:e.id,status:e.status}})},modification:function(e){this.dialogTitle="修改短信推送",this.dialogFormVisible=!0,this.resetForm(),this.getSampleCoinInfo(),this.ruleForm=JSON.parse(a()(e)),this.ruleForm.isAuto=0!=this.ruleForm.isAuto,""!==this.ruleForm.coinRange&&(this.ruleForm.minAmount=this.ruleForm.coinRange.split(",")[0],this.ruleForm.maxAmount=this.ruleForm.coinRange.split(",")[1])},addMessage:function(){this.dialogTitle="创建消息",this.ruleForm={title:"",text:"",targetId:"",targetPhone:"",coinId:"",minAmount:"",maxAmount:"",executeTime:"",isAuto:!1},this.resetForm(),this.getSampleCoinInfo(),this.dialogFormVisible=!0},getTextareaChange:function(e){},getPushType:function(e){switch(e){case 1:return this.ruleForm.targetPhone="",this.ruleForm.minAmount="",this.ruleForm.maxAmount="",void(this.ruleForm.coinId="");case 2:return this.ruleForm.minAmount="",this.ruleForm.maxAmount="",void(this.ruleForm.coinId="");case 3:return void(this.ruleForm.targetPhone="")}},getSampleCoinInfo:function(){var e=this;this.coinList.length||this.$http.post("wallet/backmgr/coin/getSampleCoinInfo",{}).then(function(t){e.coinList=t.result.list})},determine:function(){var e=this;this.$refs.ruleForm.validate(function(t){if(t){JSON.parse(a()(e.ruleForm));var l=void 0,r=void 0,o=void 0;e.ruleForm.id?(l="wallet/backmgr/push/updateMsgPushPlan",r="修改成功"):(l="wallet/backmgr/push/createMsgPushPlan",r="新增成功"),1==e.ruleForm.targetId?(o={msgTitle:e.ruleForm.title,msgText:e.ruleForm.text,targetId:e.ruleForm.targetId,time:e.ruleForm.executeTime,isAuto:1==e.ruleForm.isAuto?1:0,id:e.ruleForm.id},e.$http.post(l,o).then(function(t){e.$notify({title:"成功",message:r,type:"success"}),e.dialogFormVisible=!1,e.getNoticeInfoList()})):2==e.ruleForm.targetId?(o={msgTitle:e.ruleForm.title,msgText:e.ruleForm.text,targetId:e.ruleForm.targetId,targetPhone:e.ruleForm.targetPhone,time:e.ruleForm.executeTime,isAuto:1==e.ruleForm.isAuto?1:0,id:e.ruleForm.id},e.$http.post(l,o).then(function(t){e.$notify({title:"成功",message:r,type:"success"}),e.dialogFormVisible=!1,e.getNoticeInfoList()})):3==e.ruleForm.targetId&&(o={msgTitle:e.ruleForm.title,msgText:e.ruleForm.text,targetId:e.ruleForm.targetId,coinRange:e.ruleForm.minAmount+","+e.ruleForm.maxAmount,coinId:e.ruleForm.coinId,time:e.ruleForm.executeTime,isAuto:1==e.ruleForm.isAuto?1:0,id:e.ruleForm.id},e.$http.post(l,o).then(function(t){e.$notify({title:"成功",message:r,type:"success"}),e.dialogFormVisible=!1,e.getNoticeInfoList()}))}})},openUrl:function(e){e&&window.open(e)},changeTplId:function(e){this.dialogTplVisible=!0,this.ruleForm2.id=e.id,this.ruleForm2.tplId=0!==e.tplId?e.tplId:"",0==e.status||4==e.status?(this.dialogTplTitle="修改模板id",this.dialogTplBtnText="确认修改"):1==e.status&&(this.dialogTplBtnText="确定",this.dialogTplTitle="编辑模板id")},TlpDetermine:function(){var e=this;this.$refs.ruleForm2.validate(function(t){if(t){var l=JSON.parse(a()(e.ruleForm2));l.auditResult=l.tplId?"pass":"not_pass",e.$http.post("wallet/backmgr/push/updateTplAuditStatus",l).then(function(t){e.$notify({title:"成功",message:"修改成功",type:"success"}),e.dialogTplVisible=!1,e.getNoticeInfoList()})}})}},activated:function(){this.getNoticeInfoList()}},s={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"sms-push"},[l("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"100px",model:e.filterForm}},[l("sac-select",{ref:"sendStatues",attrs:{label:"消息状态",dataList:e.sendStatuesList},model:{value:e.filterForm.status,callback:function(t){e.$set(e.filterForm,"status",t)},expression:"filterForm.status"}}),e._v(" "),l("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(t){return e.submitForm(1)}}}),e._v(" "),l("el-form-item",{staticClass:"fi-add"},[l("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.addMessage}},[e._v("创建消息")])],1)],1),e._v(" "),l("sac-table",{attrs:{data:e.listData.list}},[l("el-table-column",{attrs:{prop:"executeTime",label:"发送时间",width:"150px"}}),e._v(" "),l("el-table-column",{attrs:{prop:"title",label:"主题"}}),e._v(" "),l("el-table-column",{attrs:{prop:"text",label:"内容"}}),e._v(" "),l("el-table-column",{attrs:{label:"状态",width:"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.status?l("el-tag",{attrs:{type:"info"}},[e._v("未推送")]):e._e(),e._v(" "),1==t.row.status?l("el-tag",{attrs:{type:"info"}},[e._v("审核中")]):e._e(),e._v(" "),2==t.row.status?l("el-tag",{attrs:{type:"info"}},[e._v("推送中")]):e._e(),e._v(" "),3==t.row.status?l("el-tag",{attrs:{type:"success"}},[e._v("部分推送")]):e._e(),e._v(" "),4==t.row.status?l("el-tag",{attrs:{type:"warn"}},[e._v("推送失败")]):e._e(),e._v(" "),5==t.row.status?l("el-tag",{attrs:{type:"success"}},[e._v("推送成功")]):e._e()]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"tplId",label:"模板id"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(0!==t.row.tplId?t.row.tplId:""))]),e._v(" "),1==t.row.status?l("el-button",{staticStyle:{float:"right"},attrs:{type:"warning",size:"small"},nativeOn:{click:function(l){return e.changeTplId(t.row)}}},[e._v("模板编辑\n          ")]):e._e(),e._v(" "),0==t.row.status||4==t.row.status?l("el-button",{staticStyle:{float:"right"},attrs:{type:"warning",size:"small"},nativeOn:{click:function(l){return e.changeTplId(t.row)}}},[e._v("模板修改\n          ")]):e._e()]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"操作",width:"240"},scopedSlots:e._u([{key:"default",fn:function(t){return[0!==t.row.status&&1!==t.row.status?l("el-button",{attrs:{type:"success",size:"small"},nativeOn:{click:function(l){return e.detailList(t.row)}}},[e._v("查看\n          ")]):e._e(),e._v(" "),0==t.row.status||1==t.row.status?l("el-button",{attrs:{type:"warning",size:"small",disabled:e.pushMessage},nativeOn:{click:function(l){return e.modification(t.row)}}},[e._v("修改\n          ")]):e._e(),e._v(" "),0==t.row.status||1==t.row.status?l("el-button",{attrs:{type:"danger",size:"small",disabled:e.pushMessage},nativeOn:{click:function(l){return e.remove(t.row)}}},[e._v("删除\n          ")]):e._e(),e._v(" "),0==t.row.status?l("el-button",{attrs:{type:"primary",size:"small",disabled:e.pushMessage,loading:t.row.isLoading},nativeOn:{click:function(l){return e.sendMessage(t.row,t.$index)}}},[e._v("推送\n          ")]):e._e()]}}])})],1),e._v(" "),l("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.filterForm.pageSize,"current-page":e.filterForm.pageNum},on:{handleChange:e.getPaginationChange}}),e._v(" "),l("el-dialog",{attrs:{title:e.dialogTplTitle,visible:e.dialogTplVisible},on:{"update:visible":function(t){e.dialogTplVisible=t}}},[l("el-form",{ref:"ruleForm2",attrs:{model:e.ruleForm2,"label-width":"140px",rules:e.rules2}},[l("el-form-item",{attrs:{label:"模板ID:",prop:"tplId"}},[l("el-col",{staticStyle:{position:"relative"},attrs:{span:16}},[l("el-input",{attrs:{size:"small",placeholder:"请输入模板ID"},model:{value:e.ruleForm2.tplId,callback:function(t){e.$set(e.ruleForm2,"tplId",t)},expression:"ruleForm2.tplId"}})],1)],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogTplVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.TlpDetermine}},[e._v(e._s(e.dialogTplBtnText))])],1)],1),e._v(" "),l("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[l("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,"label-width":"140px",rules:e.rules}},[l("el-form-item",{attrs:{label:"短信主题:",prop:"title"}},[l("el-col",{staticStyle:{position:"relative"},attrs:{span:16}},[l("el-input",{attrs:{size:"small",placeholder:"请输入短信主题"},model:{value:e.ruleForm.title,callback:function(t){e.$set(e.ruleForm,"title",t)},expression:"ruleForm.title"}})],1)],1),e._v(" "),l("el-form-item",{attrs:{label:"短信内容:",required:"",prop:"text"}},[l("el-col",{staticStyle:{position:"relative"},attrs:{span:16}},[l("el-input",{attrs:{size:"small",type:"textarea",width:"100%",placeholder:"请输入短信内容",disabled:""!==e.ruleForm.id&&void 0!==e.ruleForm.id},model:{value:e.ruleForm.text,callback:function(t){e.$set(e.ruleForm,"text",t)},expression:"ruleForm.text"}})],1)],1),e._v(" "),l("el-form-item",{staticClass:"fixForm",attrs:{label:"推送对象:",required:"",prop:"targetId"}},[l("el-radio-group",{staticClass:"radioGroup",on:{change:e.getPushType},model:{value:e.ruleForm.targetId,callback:function(t){e.$set(e.ruleForm,"targetId",t)},expression:"ruleForm.targetId"}},[l("el-col",{attrs:{span:16}},[l("el-radio",{attrs:{label:1}},[e._v("全部")])],1),e._v(" "),l("el-col",{attrs:{span:16}},[l("el-radio",{attrs:{label:2}},[e._v("指定账号推送")]),e._v(" "),2==e.ruleForm.targetId?l("el-row",{key:"specifyPush",staticClass:"specifyPush",staticStyle:{"margin-bottom":"17px"},attrs:{span:24}},[l("el-form-item",{attrs:{label:"",required:"",prop:"targetPhone"}},[l("el-input",{attrs:{type:"textarea",size:"small",resize:"none",placeholder:"请输入具体账号,多个账号用英文逗号隔开（非大陆账号请输入“+区号”）",autosize:{minRows:2,maxRows:4}},on:{change:function(t){return e.getTextareaChange("ruleForm")}},model:{value:e.ruleForm.targetPhone,callback:function(t){e.$set(e.ruleForm,"targetPhone",t)},expression:"ruleForm.targetPhone"}})],1)],1):e._e()],1),e._v(" "),l("el-col",{attrs:{span:24}},[l("el-radio",{attrs:{label:3}},[e._v("持仓范围")]),e._v(" "),3==e.ruleForm.targetId?l("el-row",{staticClass:"positionScope",attrs:{span:24}},[l("el-col",{attrs:{span:5.5}},[l("el-form-item",{attrs:{prop:"minAmount"}},[l("el-input-number",{attrs:{size:"small","controls-position":"right",min:0},model:{value:e.ruleForm.minAmount,callback:function(t){e.$set(e.ruleForm,"minAmount",t)},expression:"ruleForm.minAmount"}})],1)],1),e._v(" "),l("el-col",{staticClass:"line",staticStyle:{"text-align":"center","font-size":"12px",height:"40px","line-height":"40px"},attrs:{span:2}},[e._v("～\n                ")]),e._v(" "),l("el-col",{attrs:{span:5.5}},[l("el-form-item",{attrs:{prop:"maxAmount"}},[l("el-input-number",{attrs:{size:"small","controls-position":"right",min:0},model:{value:e.ruleForm.maxAmount,callback:function(t){e.$set(e.ruleForm,"maxAmount",t)},expression:"ruleForm.maxAmount"}})],1)],1),e._v(" "),l("el-col",{staticStyle:{"margin-left":"10px"},attrs:{span:8}},[l("el-form-item",{attrs:{label:"币　种:","label-width":"80px",prop:"coinId",size:"mini"}},[l("el-select",{attrs:{size:"small",placeholder:"请选择币种"},model:{value:e.ruleForm.coinId,callback:function(t){e.$set(e.ruleForm,"coinId",t)},expression:"ruleForm.coinId"}},e._l(e.coinList,function(e,t){return l("el-option",{key:t,attrs:{label:e.coinName,value:e.coinId}})}),1)],1)],1)],1):e._e()],1)],1)],1),e._v(" "),l("el-form-item",{attrs:{label:"消息发送日期:",prop:"executeTime"}},[l("el-date-picker",{attrs:{size:"small",type:"datetime",placeholder:"选择日期时间","value-format":"yyyy-MM-dd HH:mm:ss",disabled:e.executeTimeDisabled},model:{value:e.ruleForm.executeTime,callback:function(t){e.$set(e.ruleForm,"executeTime",t)},expression:"ruleForm.executeTime"}}),e._v(" "),l("el-checkbox",{staticStyle:{"margin-left":"10px"},model:{value:e.ruleForm.isAuto,callback:function(t){e.$set(e.ruleForm,"isAuto",t)},expression:"ruleForm.isAuto"}},[e._v("自动推送")])],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.determine}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var i=l("C7Lr")(o,s,!1,function(e){l("MNZj")},null,null);t.default=i.exports}});