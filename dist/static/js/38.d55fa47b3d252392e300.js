webpackJsonp([38],{Q5oN:function(t,e){},h1Sq:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("mvHQ"),l=s.n(i),a={name:"message",data:function(){return{filterForm:{sendStatues:"",noticeType:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},noticeTypeList:[{value:"",label:"全部消息"},{value:"SystemMsg",label:"系统消息"},{value:"OperationMsg",label:"运营消息"},{value:"TransferMsg",label:"动账消息"}],sendStatuesList:[{value:"",label:"全部状态"},{value:0,label:"未推送"},{value:1,label:"审核中"},{value:2,label:"正在发送"},{value:3,label:"部分完成"},{value:4,label:"完成"}],pushMessage:!1,dialogTitle:"新增消息模版",dialogFormVisible:!1,ruleForm:{title:"",text:"",target_id:"",target_phone:"",coinid:"",minAmount:"",maxAmount:"",execute_time:"",is_auto:!1},rules:{title:[{required:!0,message:"短信主题",trigger:"blur"},{min:1,max:15,message:"长度在 1 到 15 个字符",trigger:"blur"}],text:[{required:!0,message:"请输入内容",trigger:"blur"},{min:1,max:50,message:"长度在 1 到 50 个字符",trigger:"blur"}],execute_time:[{required:!0,message:"请选择时间",trigger:"change"}],coinid:[{required:!0,message:"请选择币种",trigger:"change"}]},allAccountValue:"",radioValue:null,currentObj:{},coinList:[]}},methods:{resetForm:function(){this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},submitForm:function(t){this.filterForm.pageNum=t,this.getNoticeInfoList()},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.submitForm(e)},getNoticeInfoList:function(){var t=this;this.$http.post("wallet/backmgr/push/getMsgPushPlanList.do",this.filterForm).then(function(e){var s=e.result.list,i=s.list,l=s.total;i.forEach(function(t){t.isLoading=!1}),t.listData.list=i,t.listData.total=l})},formatSex:function(t,e){return 0==t.type?"系统消息":1==t.type?"运营消息":"动账消息"},remove:function(t){var e=this,s=t.id,i=t.title;this.$confirm("确定删除 "+i+" 吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$http.post("/wallet/backmgr/noticeInfo/updateNoticeInfoSysStatus.do",{sysStatus:"INVALID0",id:s}).then(function(t){e.$notify({title:"成功",message:"删除 "+i+"成功",type:"success"}),e.getNoticeInfoList()})})},sendMessage:function(t,e){var s=this;this.listData.list[e].isLoading=!0,this.pushMessage=!0;var i=t.id,l=t.title;this.$http.post("wallet/backmgr/userNoticeRecd/pushUserAll.do",{version:"1.0.0",plat:"web",noticeInfoId:i}).then(function(t){var e=s;setTimeout(function(){e.$notify({title:"成功",message:" 推送 "+l+" 消息成功",type:"success"}),e.getNoticeInfoList(),e.pushMessage=!1},2e4)}).catch(function(){s.getNoticeInfoList(),s.pushMessage=!1})},detailList:function(t){this.$router.push({name:"messageDetails",query:{id:t.id}})},modification:function(t){switch(this.dialogTitle="修改送币规则",this.dialogFormVisible=!0,this.resetForm(),this.getSampleCoinInfo(),this.ruleForm=JSON.parse(l()(t)),this.ruleForm.timingPush=0!=this.ruleForm.timingPush,1==this.ruleForm.pushAll?(this.radioValue=1,this.ruleForm.coinId=""):this.ruleForm.phones.length>0?(this.radioValue=2,this.ruleForm.coinId=""):this.ruleForm.coinId&&(this.radioValue=3),this.ruleForm.type){case 0:this.ruleForm.noticeType="SystemMsg";break;case 1:this.ruleForm.noticeType="OperationMsg";break;case 2:this.ruleForm.noticeType="TransferMsg"}},addMessage:function(){this.radioValue=null,this.dialogTitle="创建消息",this.dialogFormVisible=!0,this.ruleForm={title:"",text:"",target_id:"",target_phone:"",coinid:"",minAmount:"",maxAmount:"",execute_time:"",is_auto:!1},this.resetForm(),this.getSampleCoinInfo()},getTextareaChange:function(t){var e=!0;this[t].phones.split(",").forEach(function(t){e=!/\D|[,]/g.test(t)}),e||(this.$message({message:"请输入正确的账号信息",type:"warning"}),this.ruleForm.phones=this.allAccountValue),this.allAccountValue=this.ruleForm.phones},getPushType:function(t){switch(t){case 1:return this.ruleForm.phones="",this.allAccountValue="",this.ruleForm.minAmount="",this.ruleForm.maxAmount="",void(this.ruleForm.coinId="");case 2:return this.ruleForm.minAmount="",this.ruleForm.maxAmount="",void(this.ruleForm.coinId="");case 3:return this.ruleForm.phones="",void(this.allAccountValue="")}},getUpdatePushType:function(){switch(this.radioValue){case 1:return this.ruleForm.phones=this.currentObj.phones,this.allAccountValue=this.currentObj.phones,this.ruleForm.minAmount=this.currentObj.minAmount,this.ruleForm.maxAmount=this.currentObj.maxAmount,void(this.ruleForm.coinId=this.currentObj.coinId);case 2:return this.ruleForm.minAmount=this.currentObj.minAmount,this.ruleForm.maxAmount=this.currentObj.maxAmount,void(this.ruleForm.coinId=this.currentObj.coinId);case 3:return this.ruleForm.phones=this.currentObj.phones,void(this.allAccountValue=this.currentObj.phones)}},getSampleCoinInfo:function(){var t=this;this.coinList.length||this.$http.post("wallet/backmgr/coin/getSampleCoinInfo.do",{}).then(function(e){t.coinList=e.result.list})},determine:function(){var t=this;this.$refs.ruleForm.validate(function(e){if(e){JSON.parse(l()(t.ruleForm));1==t.radioValue&&{msgTitle:1}}})},openUrl:function(t){t&&window.open(t)}},activated:function(){this.getNoticeInfoList()}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"sms-push"},[s("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"100px",model:t.filterForm}},[s("sac-select",{ref:"noticeType",attrs:{label:"消息类型",dataList:t.noticeTypeList},model:{value:t.filterForm.noticeType,callback:function(e){t.$set(t.filterForm,"noticeType",e)},expression:"filterForm.noticeType"}}),t._v(" "),s("sac-select",{ref:"sendStatues",attrs:{label:"消息状态",dataList:t.sendStatuesList},model:{value:t.filterForm.sendStatues,callback:function(e){t.$set(t.filterForm,"sendStatues",e)},expression:"filterForm.sendStatues"}}),t._v(" "),s("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(e){t.submitForm(1)}}}),t._v(" "),s("el-form-item",{staticClass:"fi-add"},[s("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.addMessage}},[t._v("创建消息")])],1)],1),t._v(" "),s("sac-table",{attrs:{data:t.listData.list}},[s("el-table-column",{attrs:{prop:"executeTime",label:"发送时间",width:"150px"}}),t._v(" "),s("el-table-column",{attrs:{prop:"title",label:"主题"}}),t._v(" "),s("el-table-column",{attrs:{prop:"text",label:"内容"}}),t._v(" "),s("el-table-column",{attrs:{label:"状态",width:"100px"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.status?s("el-tag",{attrs:{type:"info"}},[t._v("未推送")]):t._e(),t._v(" "),1==e.row.status?s("el-tag",{attrs:{type:"info"}},[t._v("审核中")]):t._e(),t._v(" "),2==e.row.status?s("el-tag",{attrs:{type:"info"}},[t._v("正在发送")]):t._e(),t._v(" "),3==e.row.status?s("el-tag",{attrs:{type:"success"}},[t._v("部分完成")]):t._e(),t._v(" "),4==e.row.status?s("el-tag",{attrs:{type:"success"}},[t._v("完成")]):t._e()]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"操作",width:"240"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.sendStatues?s("el-button",{attrs:{type:"success",size:"small"},nativeOn:{click:function(s){t.detailList(e.row)}}},[t._v("查看\n        ")]):t._e(),t._v(" "),0==e.row.sendStatues?s("el-button",{attrs:{type:"warning",size:"small",disabled:t.pushMessage},nativeOn:{click:function(s){t.modification(e.row)}}},[t._v("修改\n        ")]):t._e(),t._v(" "),0==e.row.sendStatues?s("el-button",{attrs:{type:"danger",size:"small",disabled:t.pushMessage},nativeOn:{click:function(s){t.remove(e.row)}}},[t._v("删除\n        ")]):t._e(),t._v(" "),0==e.row.sendStatues?s("el-button",{attrs:{type:"primary",size:"small",disabled:t.pushMessage,loading:e.row.isLoading},nativeOn:{click:function(s){t.sendMessage(e.row,e.$index)}}},[t._v("推送\n        ")]):t._e()]}}])})],1),t._v(" "),s("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}}),t._v(" "),s("el-dialog",{attrs:{title:t.dialogTitle,visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[s("el-form",{ref:"ruleForm",attrs:{model:t.ruleForm,"label-width":"140px",rules:t.rules}},[s("el-form-item",{attrs:{label:"短信主题:",prop:"title"}},[s("el-col",{staticStyle:{position:"relative"},attrs:{span:16}},[s("span",{staticClass:"tips tips_input"},[t._v(t._s(t.ruleForm.title.length)+"/15")]),t._v(" "),s("el-input",{attrs:{size:"small",maxlength:"15",placeholder:"请输入短信主题"},model:{value:t.ruleForm.title,callback:function(e){t.$set(t.ruleForm,"title",e)},expression:"ruleForm.title"}})],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"短信内容:",required:"",prop:"text"}},[s("el-col",{staticStyle:{position:"relative"},attrs:{span:16}},[s("span",{staticClass:"tips tips_textarea"},[t._v(t._s(t.ruleForm.text.length)+"/50")]),t._v(" "),s("el-input",{attrs:{size:"small",type:"textarea",width:"100%",maxlength:"50",placeholder:"请输入短信内容"},model:{value:t.ruleForm.text,callback:function(e){t.$set(t.ruleForm,"text",e)},expression:"ruleForm.text"}})],1)],1),t._v(" "),s("el-form-item",{staticClass:"fixForm",attrs:{label:"推送对象:",required:""}},[s("el-radio-group",{staticClass:"radioGroup",on:{change:t.getPushType},model:{value:t.radioValue,callback:function(e){t.radioValue=e},expression:"radioValue"}},[s("el-col",{attrs:{span:16}},[s("el-radio",{attrs:{label:1}},[t._v("全部")])],1),t._v(" "),s("el-col",{attrs:{span:16}},[s("el-radio",{attrs:{label:2}},[t._v("指定账号推送")]),t._v(" "),2==t.radioValue?s("el-row",{key:"specifyPush",staticClass:"specifyPush",attrs:{span:24}},[s("el-form-item",{attrs:{label:"",required:"",prop:"target_phone"}},[s("span",{staticClass:"tips tips_textarea"},[t._v(t._s(t.ruleForm.target_phone.length)+"/500")]),t._v(" "),s("el-input",{attrs:{type:"textarea",size:"small",resize:"none",maxlength:"500",placeholder:"请输入具体账号,多个账号用逗号隔开",autosize:{minRows:2,maxRows:4}},on:{change:function(e){t.getTextareaChange("ruleForm")}},model:{value:t.ruleForm.target_phone,callback:function(e){t.$set(t.ruleForm,"target_phone",e)},expression:"ruleForm.target_phone"}})],1)],1):t._e()],1),t._v(" "),s("el-col",{attrs:{span:24}},[s("el-radio",{attrs:{label:3}},[t._v("持仓范围")]),t._v(" "),3==t.radioValue?s("el-row",{staticClass:"positionScope",attrs:{span:24}},[s("el-col",{attrs:{span:5.5}},[s("el-form-item",{attrs:{prop:"minAmount"}},[s("el-input-number",{attrs:{size:"small","controls-position":"right",min:0},model:{value:t.ruleForm.minAmount,callback:function(e){t.$set(t.ruleForm,"minAmount",e)},expression:"ruleForm.minAmount"}})],1)],1),t._v(" "),s("el-col",{staticClass:"line",staticStyle:{"text-align":"center","font-size":"12px",height:"40px","line-height":"40px"},attrs:{span:2}},[t._v("～\n              ")]),t._v(" "),s("el-col",{attrs:{span:5.5}},[s("el-form-item",{attrs:{prop:"maxAmount"}},[s("el-input-number",{attrs:{size:"small","controls-position":"right",min:0},model:{value:t.ruleForm.maxAmount,callback:function(e){t.$set(t.ruleForm,"maxAmount",e)},expression:"ruleForm.maxAmount"}})],1)],1),t._v(" "),s("el-col",{staticStyle:{"margin-left":"10px"},attrs:{span:8}},[s("el-form-item",{attrs:{label:"币　种:","label-width":"80px",prop:"coinid",size:"mini"}},[s("el-select",{attrs:{size:"small",placeholder:"请选择币种"},model:{value:t.ruleForm.coinId,callback:function(e){t.$set(t.ruleForm,"coinId",e)},expression:"ruleForm.coinId"}},t._l(t.coinList,function(t,e){return s("el-option",{key:e,attrs:{label:t.coinName,value:t.coinId}})}))],1)],1)],1):t._e()],1)],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"消息发送日期:",prop:"execute_time"}},[s("el-date-picker",{attrs:{size:"small",type:"datetime",placeholder:"选择日期时间","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:t.ruleForm.execute_time,callback:function(e){t.$set(t.ruleForm,"execute_time",e)},expression:"ruleForm.execute_time"}}),t._v(" "),s("el-checkbox",{staticStyle:{"margin-left":"10px"},model:{value:t.ruleForm.is_auto,callback:function(e){t.$set(t.ruleForm,"is_auto",e)},expression:"ruleForm.is_auto"}},[t._v("自动推送")])],1)],1),t._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{size:"small"},on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),s("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.determine}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var o=s("VU/8")(a,r,!1,function(t){s("Q5oN")},null,null);e.default=o.exports}});