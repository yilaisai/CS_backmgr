webpackJsonp([21],{BRyt:function(t,e){},h1Sq:function(t,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=l("3cXf"),s=l.n(i),r={name:"message",data:function(){return{filterForm:{status:"",noticeType:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},noticeTypeList:[{value:"",label:"全部消息"},{value:"SystemMsg",label:"系统消息"},{value:"OperationMsg",label:"运营消息"},{value:"TransferMsg",label:"动账消息"}],sendStatuesList:[{value:"",label:"全部状态"},{value:"0",label:"未推送"},{value:"1",label:"审核中"},{value:"2",label:"推送中"},{value:"3",label:"部分推送"},{value:"4",label:"推送失败"},{value:"5",label:"推送成功"}],pushMessage:!1,dialogTitle:"新增消息模版",dialogFormVisible:!1,ruleForm:{title:"",text:"",targetId:"",targetPhone:"",coinId:"",minAmount:"",maxAmount:"",executeTime:"",isAuto:!1,id:""},ruleForm2:{tplId:"",auditResult:"pass",id:""},rules2:{tplId:[{required:!1,message:"请输入模板id",trigger:"blur"}]},rules:{targetId:[{required:!0,message:"请选择推送对象",trigger:"blur"}],text:[{required:!0,message:"请输入内容",trigger:"blur"},{min:1,max:50,message:"长度在 1 到 50 个字符",trigger:"blur"}],executeTime:[{required:!0,message:"请选择发送日期",trigger:"blur"}],coinId:[{required:!0,message:"请选择币种",trigger:"change"}],targetPhone:[{required:!0,validator:function(t,e,l){""===e?l(new Error("请输入具体账号,多个账号用英文逗号隔开")):e.indexOf("，")>-1?l(new Error("请使用英文逗号隔开")):l()},trigger:"blur"}]},allAccountValue:"",targetId:null,currentObj:{},coinList:[],dialogTplVisible:!1,dialogTplTitle:"",dialogTplBtnText:"",executeTimeDisabled:!1}},methods:{resetForm:function(){this.$refs.ruleForm&&this.$refs.ruleForm.clearValidate(),this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},submitForm:function(t){this.filterForm.pageNum=t,this.getNoticeInfoList()},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.submitForm(e)},getNoticeInfoList:function(){var t=this;this.$http.post("wallet/backmgr/push/getMsgPushPlanList.do",this.filterForm).then(function(e){var l=e.result.list,i=l.list,s=l.total;i.forEach(function(t){t.isLoading=!1}),t.listData.list=i,t.listData.total=s})},remove:function(t){var e=this,l=t.id;t.title;this.$confirm("确定删除此条消息吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$http.post("wallet/backmgr/push/deleteMsgPushPlan.do",{id:l}).then(function(t){e.$notify({title:"成功",message:"删除成功",type:"success"}),e.getNoticeInfoList()})})},sendMessage:function(t,e){var l=this;this.listData.list[e].isLoading=!0,this.pushMessage=!0;var i=t.id;t.title;this.$http.post("wallet/backmgr/push/executeMsgPushPlan.do",{id:i}).then(function(t){var e=l;setTimeout(function(){e.$notify({title:"成功",message:" 启动推送消息成功",type:"success"}),e.getNoticeInfoList(),e.pushMessage=!1},2e3)}).catch(function(){l.getNoticeInfoList(),l.pushMessage=!1})},detailList:function(t){this.$router.push({name:"sms-pushDetails",query:{id:t.id,status:t.status}})},modification:function(t){this.dialogTitle="修改短信推送",this.dialogFormVisible=!0,this.resetForm(),this.getSampleCoinInfo(),this.ruleForm=JSON.parse(s()(t)),this.ruleForm.isAuto=0!=this.ruleForm.isAuto,""!==this.ruleForm.coinRange&&(this.ruleForm.minAmount=this.ruleForm.coinRange.split(",")[0],this.ruleForm.maxAmount=this.ruleForm.coinRange.split(",")[1])},addMessage:function(){this.dialogTitle="创建消息",this.ruleForm={title:"",text:"",targetId:"",targetPhone:"",coinId:"",minAmount:"",maxAmount:"",executeTime:"",isAuto:!1},this.resetForm(),this.getSampleCoinInfo(),this.dialogFormVisible=!0},getTextareaChange:function(t){},getPushType:function(t){switch(t){case 1:return this.ruleForm.targetPhone="",this.ruleForm.minAmount="",this.ruleForm.maxAmount="",void(this.ruleForm.coinId="");case 2:return this.ruleForm.minAmount="",this.ruleForm.maxAmount="",void(this.ruleForm.coinId="");case 3:return void(this.ruleForm.targetPhone="")}},getSampleCoinInfo:function(){var t=this;this.coinList.length||this.$http.post("wallet/backmgr/coin/getSampleCoinInfo.do",{}).then(function(e){t.coinList=e.result.list})},determine:function(){var t=this;this.$refs.ruleForm.validate(function(e){if(e){JSON.parse(s()(t.ruleForm));var l=void 0,i=void 0,r=void 0;t.ruleForm.id?(l="wallet/backmgr/push/updateMsgPushPlan.do",i="修改成功"):(l="wallet/backmgr/push/createMsgPushPlan.do",i="新增成功"),1==t.ruleForm.targetId?(r={msgTitle:t.ruleForm.title,msgText:t.ruleForm.text,targetId:t.ruleForm.targetId,time:t.ruleForm.executeTime,isAuto:1==t.ruleForm.isAuto?1:0,id:t.ruleForm.id},t.$http.post(l,r).then(function(e){t.$notify({title:"成功",message:i,type:"success"}),t.dialogFormVisible=!1,t.getNoticeInfoList()})):2==t.ruleForm.targetId?(r={msgTitle:t.ruleForm.title,msgText:t.ruleForm.text,targetId:t.ruleForm.targetId,targetPhone:t.ruleForm.targetPhone,time:t.ruleForm.executeTime,isAuto:1==t.ruleForm.isAuto?1:0,id:t.ruleForm.id},t.$http.post(l,r).then(function(e){t.$notify({title:"成功",message:i,type:"success"}),t.dialogFormVisible=!1,t.getNoticeInfoList()})):3==t.ruleForm.targetId&&(r={msgTitle:t.ruleForm.title,msgText:t.ruleForm.text,targetId:t.ruleForm.targetId,coinRange:t.ruleForm.minAmount+","+t.ruleForm.maxAmount,coinId:t.ruleForm.coinId,time:t.ruleForm.executeTime,isAuto:1==t.ruleForm.isAuto?1:0,id:t.ruleForm.id},t.$http.post(l,r).then(function(e){t.$notify({title:"成功",message:i,type:"success"}),t.dialogFormVisible=!1,t.getNoticeInfoList()}))}})},openUrl:function(t){t&&window.open(t)},changeTplId:function(t){this.dialogTplVisible=!0,this.ruleForm2.id=t.id,this.ruleForm2.tplId=0!==t.tplId?t.tplId:"",0==t.status||4==t.status?(this.dialogTplTitle="修改模板id",this.dialogTplBtnText="确认修改"):1==t.status&&(this.dialogTplBtnText="确定",this.dialogTplTitle="编辑模板id")},TlpDetermine:function(){var t=this;this.$refs.ruleForm2.validate(function(e){if(e){var l=JSON.parse(s()(t.ruleForm2));l.auditResult=l.tplId?"pass":"not_pass",t.$http.post("wallet/backmgr/push/updateTplAuditStatus.do",l).then(function(e){t.$notify({title:"成功",message:"修改成功",type:"success"}),t.dialogTplVisible=!1,t.getNoticeInfoList()})}})}},activated:function(){this.getNoticeInfoList()}},a={render:function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"sms-push"},[l("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"100px",model:t.filterForm}},[l("sac-select",{ref:"sendStatues",attrs:{label:"消息状态",dataList:t.sendStatuesList},model:{value:t.filterForm.status,callback:function(e){t.$set(t.filterForm,"status",e)},expression:"filterForm.status"}}),t._v(" "),l("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(e){t.submitForm(1)}}}),t._v(" "),l("el-form-item",{staticClass:"fi-add"},[l("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.addMessage}},[t._v("创建消息")])],1)],1),t._v(" "),l("sac-table",{attrs:{data:t.listData.list}},[l("el-table-column",{attrs:{prop:"executeTime",label:"发送时间",width:"150px"}}),t._v(" "),l("el-table-column",{attrs:{prop:"title",label:"主题"}}),t._v(" "),l("el-table-column",{attrs:{prop:"text",label:"内容"}}),t._v(" "),l("el-table-column",{attrs:{label:"状态",width:"100px"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.status?l("el-tag",{attrs:{type:"info"}},[t._v("未推送")]):t._e(),t._v(" "),1==e.row.status?l("el-tag",{attrs:{type:"info"}},[t._v("审核中")]):t._e(),t._v(" "),2==e.row.status?l("el-tag",{attrs:{type:"info"}},[t._v("推送中")]):t._e(),t._v(" "),3==e.row.status?l("el-tag",{attrs:{type:"success"}},[t._v("部分推送")]):t._e(),t._v(" "),4==e.row.status?l("el-tag",{attrs:{type:"warn"}},[t._v("推送失败")]):t._e(),t._v(" "),5==e.row.status?l("el-tag",{attrs:{type:"success"}},[t._v("推送成功")]):t._e()]}}])}),t._v(" "),l("el-table-column",{attrs:{prop:"tplId",label:"模板id"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("span",[t._v(t._s(0!==e.row.tplId?e.row.tplId:""))]),t._v(" "),1==e.row.status?l("el-button",{staticStyle:{float:"right"},attrs:{type:"warning",size:"small"},nativeOn:{click:function(l){t.changeTplId(e.row)}}},[t._v("模板编辑\n        ")]):t._e(),t._v(" "),0==e.row.status||4==e.row.status?l("el-button",{staticStyle:{float:"right"},attrs:{type:"warning",size:"small"},nativeOn:{click:function(l){t.changeTplId(e.row)}}},[t._v("模板修改\n        ")]):t._e()]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"操作",width:"240"},scopedSlots:t._u([{key:"default",fn:function(e){return[0!==e.row.status&&1!==e.row.status?l("el-button",{attrs:{type:"success",size:"small"},nativeOn:{click:function(l){t.detailList(e.row)}}},[t._v("查看\n        ")]):t._e(),t._v(" "),0==e.row.status||1==e.row.status?l("el-button",{attrs:{type:"warning",size:"small",disabled:t.pushMessage},nativeOn:{click:function(l){t.modification(e.row)}}},[t._v("修改\n        ")]):t._e(),t._v(" "),0==e.row.status||1==e.row.status?l("el-button",{attrs:{type:"danger",size:"small",disabled:t.pushMessage},nativeOn:{click:function(l){t.remove(e.row)}}},[t._v("删除\n        ")]):t._e(),t._v(" "),0==e.row.status?l("el-button",{attrs:{type:"primary",size:"small",disabled:t.pushMessage,loading:e.row.isLoading},nativeOn:{click:function(l){t.sendMessage(e.row,e.$index)}}},[t._v("推送\n        ")]):t._e()]}}])})],1),t._v(" "),l("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}}),t._v(" "),l("el-dialog",{attrs:{title:t.dialogTplTitle,visible:t.dialogTplVisible},on:{"update:visible":function(e){t.dialogTplVisible=e}}},[l("el-form",{ref:"ruleForm2",attrs:{model:t.ruleForm2,"label-width":"140px",rules:t.rules2}},[l("el-form-item",{attrs:{label:"模板ID:",prop:"tplId"}},[l("el-col",{staticStyle:{position:"relative"},attrs:{span:16}},[l("el-input",{attrs:{size:"small",placeholder:"请输入模板ID"},model:{value:t.ruleForm2.tplId,callback:function(e){t.$set(t.ruleForm2,"tplId",e)},expression:"ruleForm2.tplId"}})],1)],1)],1),t._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{size:"small"},on:{click:function(e){t.dialogTplVisible=!1}}},[t._v("取 消")]),t._v(" "),l("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.TlpDetermine}},[t._v(t._s(t.dialogTplBtnText))])],1)],1),t._v(" "),l("el-dialog",{attrs:{title:t.dialogTitle,visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[l("el-form",{ref:"ruleForm",attrs:{model:t.ruleForm,"label-width":"140px",rules:t.rules}},[l("el-form-item",{attrs:{label:"短信主题:",prop:"title"}},[l("el-col",{staticStyle:{position:"relative"},attrs:{span:16}},[l("span",{staticClass:"tips tips_input"},[t._v(t._s(t.ruleForm.title.length)+"/15")]),t._v(" "),l("el-input",{attrs:{size:"small",maxlength:"15",placeholder:"请输入短信主题"},model:{value:t.ruleForm.title,callback:function(e){t.$set(t.ruleForm,"title",e)},expression:"ruleForm.title"}})],1)],1),t._v(" "),l("el-form-item",{attrs:{label:"短信内容:",required:"",prop:"text"}},[l("el-col",{staticStyle:{position:"relative"},attrs:{span:16}},[l("span",{staticClass:"tips tips_textarea"},[t._v(t._s(t.ruleForm.text.length)+"/50")]),t._v(" "),l("el-input",{attrs:{size:"small",type:"textarea",width:"100%",maxlength:"50",placeholder:"请输入短信内容",disabled:""!==t.ruleForm.id&&void 0!==t.ruleForm.id},model:{value:t.ruleForm.text,callback:function(e){t.$set(t.ruleForm,"text",e)},expression:"ruleForm.text"}})],1)],1),t._v(" "),l("el-form-item",{staticClass:"fixForm",attrs:{label:"推送对象:",required:"",prop:"targetId"}},[l("el-radio-group",{staticClass:"radioGroup",on:{change:t.getPushType},model:{value:t.ruleForm.targetId,callback:function(e){t.$set(t.ruleForm,"targetId",e)},expression:"ruleForm.targetId"}},[l("el-col",{attrs:{span:16}},[l("el-radio",{attrs:{label:1}},[t._v("全部")])],1),t._v(" "),l("el-col",{attrs:{span:16}},[l("el-radio",{attrs:{label:2}},[t._v("指定账号推送")]),t._v(" "),2==t.ruleForm.targetId?l("el-row",{key:"specifyPush",staticClass:"specifyPush",staticStyle:{"margin-bottom":"17px"},attrs:{span:24}},[l("el-form-item",{attrs:{label:"",required:"",prop:"targetPhone"}},[l("span",{staticClass:"tips tips_textarea"},[t._v(t._s(t.ruleForm.targetPhone.length)+"/500")]),t._v(" "),l("el-input",{attrs:{type:"textarea",size:"small",resize:"none",maxlength:"500",placeholder:"请输入具体账号,多个账号用英文逗号隔开（非大陆账号请输入“+区号”）",autosize:{minRows:2,maxRows:4}},on:{change:function(e){t.getTextareaChange("ruleForm")}},model:{value:t.ruleForm.targetPhone,callback:function(e){t.$set(t.ruleForm,"targetPhone",e)},expression:"ruleForm.targetPhone"}})],1)],1):t._e()],1),t._v(" "),l("el-col",{attrs:{span:24}},[l("el-radio",{attrs:{label:3}},[t._v("持仓范围")]),t._v(" "),3==t.ruleForm.targetId?l("el-row",{staticClass:"positionScope",attrs:{span:24}},[l("el-col",{attrs:{span:5.5}},[l("el-form-item",{attrs:{prop:"minAmount"}},[l("el-input-number",{attrs:{size:"small","controls-position":"right",min:0},model:{value:t.ruleForm.minAmount,callback:function(e){t.$set(t.ruleForm,"minAmount",e)},expression:"ruleForm.minAmount"}})],1)],1),t._v(" "),l("el-col",{staticClass:"line",staticStyle:{"text-align":"center","font-size":"12px",height:"40px","line-height":"40px"},attrs:{span:2}},[t._v("～\n              ")]),t._v(" "),l("el-col",{attrs:{span:5.5}},[l("el-form-item",{attrs:{prop:"maxAmount"}},[l("el-input-number",{attrs:{size:"small","controls-position":"right",min:0},model:{value:t.ruleForm.maxAmount,callback:function(e){t.$set(t.ruleForm,"maxAmount",e)},expression:"ruleForm.maxAmount"}})],1)],1),t._v(" "),l("el-col",{staticStyle:{"margin-left":"10px"},attrs:{span:8}},[l("el-form-item",{attrs:{label:"币　种:","label-width":"80px",prop:"coinId",size:"mini"}},[l("el-select",{attrs:{size:"small",placeholder:"请选择币种"},model:{value:t.ruleForm.coinId,callback:function(e){t.$set(t.ruleForm,"coinId",e)},expression:"ruleForm.coinId"}},t._l(t.coinList,function(t,e){return l("el-option",{key:e,attrs:{label:t.coinName,value:t.coinId}})}))],1)],1)],1):t._e()],1)],1)],1),t._v(" "),l("el-form-item",{attrs:{label:"消息发送日期:",prop:"executeTime"}},[l("el-date-picker",{attrs:{size:"small",type:"datetime",placeholder:"选择日期时间","value-format":"yyyy-MM-dd HH:mm:ss",disabled:t.executeTimeDisabled},model:{value:t.ruleForm.executeTime,callback:function(e){t.$set(t.ruleForm,"executeTime",e)},expression:"ruleForm.executeTime"}}),t._v(" "),l("el-checkbox",{staticStyle:{"margin-left":"10px"},model:{value:t.ruleForm.isAuto,callback:function(e){t.$set(t.ruleForm,"isAuto",e)},expression:"ruleForm.isAuto"}},[t._v("自动推送")])],1)],1),t._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{size:"small"},on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),l("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.determine}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var o=l("C7Lr")(r,a,!1,function(t){l("BRyt")},null,null);e.default=o.exports}});