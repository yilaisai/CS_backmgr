webpackJsonp([49],{"1bRC":function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=l("mvHQ"),i=l.n(s),r={name:"message",data:function(){return{server_path:"",filterForm:{sendStatues:"",noticeType:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},token:localStorage.getItem("wallet_token"),noticeTypeList:[{value:"",label:"全部消息"},{value:"SystemMsg",label:"系统消息"},{value:"OperationMsg",label:"运营消息"},{value:"TransferMsg",label:"动账消息"},{value:"ThirdAppMsg",label:"第三方应用更新消息"}],sendStatuesList:[{value:"",label:"全部状态"},{value:"YES",label:"已推送"},{value:"NO",label:"未推送"}],pushMessage:!1,dialogTitle:"新增消息模版",dialogFormVisible:!1,ruleForm:{noticeType:"",jumpUrl:"",sendTime:"",title:"",content:"",details:"",timingPush:!1,pushAll:!1,phones:"",minAmount:"",maxAmount:"",coinId:"",picture:""},rules:{type:[{required:!0,message:"请选择消息类型",trigger:"change"}],title:[{required:!0,message:"请输入标题",trigger:"blur"},{min:1,max:15,message:"长度在 1 到 15 个字符",trigger:"blur"}],content:[{required:!0,message:"请输入内容",trigger:"blur"},{min:1,max:50,message:"长度在 1 到 50 个字符",trigger:"blur"}],appName:[{required:!0,message:"请输入应用名称",trigger:"blur"}],jumpUrl:[{required:!1,message:"请输入消息跳转地址",trigger:"change"}],phones:[{required:!0,message:"请输入具体账号",trigger:"blur"}],sendTime:[{required:!0,message:"请选择时间",trigger:"change"}],coinId:[{required:!0,message:"请选择币种",trigger:"change"}]},allAccountValue:"",radioValue:null,currentObj:{},coinList:[]}},methods:{resetForm:function(){this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},submitForm:function(e){this.filterForm.pageNum=e,this.getNoticeInfoList()},getPaginationChange:function(e,t){this.filterForm.pageSize=e,this.submitForm(t)},getNoticeInfoList:function(){var e=this;this.$http.post("wallet/backmgr/noticeInfo/getNoticeInfoList",this.filterForm).then(function(t){var l=t.result.list,s=l.list,i=l.total;s.forEach(function(e){e.isLoading=!1}),e.listData.list=s,e.listData.total=i})},formatSex:function(e,t){return 0==e.type?"系统消息":1==e.type?"运营消息":2==e.type?"动账消息":"第三方应用更新消息"},remove:function(e){var t=this,l=e.id;e.title;this.$confirm("确定删除此条消息吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.post("/wallet/backmgr/noticeInfo/updateNoticeInfoSysStatus",{sysStatus:"INVALID0",id:l}).then(function(e){t.$notify({title:"成功",message:"删除成功",type:"success"}),t.getNoticeInfoList()})})},sendMessage:function(e,t){var l=this;this.listData.list[t].isLoading=!0,this.pushMessage=!0;var s=e.id;e.title;this.$http.post("wallet/backmgr/userNoticeRecd/pushUserAll",{version:"1.0.0",plat:"web",noticeInfoId:s}).then(function(e){var t=l;setTimeout(function(){t.$notify({title:"成功",message:" 推送消息成功",type:"success"}),t.getNoticeInfoList(),t.pushMessage=!1},2e4)}).catch(function(){l.getNoticeInfoList(),l.pushMessage=!1})},detailList:function(e){this.$router.push({name:"messageDetails",query:{id:e.id}})},modification:function(e){switch(this.dialogTitle="修改推送规则",this.dialogFormVisible=!0,this.resetForm(),this.getSampleCoinInfo(),this.ruleForm=JSON.parse(i()(e)),this.ruleForm.timingPush=0!=this.ruleForm.timingPush,1==this.ruleForm.pushAll?(this.radioValue=1,this.ruleForm.coinId=""):this.ruleForm.phones.length>0?(this.radioValue=2,this.ruleForm.coinId=""):this.ruleForm.coinId&&(this.radioValue=3),this.ruleForm.type){case 0:this.ruleForm.noticeType="SystemMsg";break;case 1:this.ruleForm.noticeType="OperationMsg";break;case 2:this.ruleForm.noticeType="TransferMsg";break;case 3:this.ruleForm.noticeType="ThirdAppMsg"}},addMessage:function(){this.radioValue=null,this.dialogTitle="创建消息",this.dialogFormVisible=!0,this.ruleForm={noticeType:"",jumpUrl:"",sendTime:"",title:"",content:"",details:"",timingPush:!1,pushAll:!1,phones:"",minAmount:"",maxAmount:"",coinId:"",picture:""},this.resetForm(),this.getSampleCoinInfo()},getTextareaChange:function(e){var t=!0;this[e].phones.split(",").forEach(function(e){t=!/\D|[,]/g.test(e)}),t||(this.$message({message:"请输入正确的账号信息",type:"warning"}),this.ruleForm.phones=this.allAccountValue),this.allAccountValue=this.ruleForm.phones},getPushType:function(e){switch(e){case 1:return this.ruleForm.phones="",this.allAccountValue="",this.ruleForm.minAmount="",this.ruleForm.maxAmount="",void(this.ruleForm.coinId="");case 2:return this.ruleForm.minAmount="",this.ruleForm.maxAmount="",void(this.ruleForm.coinId="");case 3:return this.ruleForm.phones="",void(this.allAccountValue="")}},getUpdatePushType:function(){switch(this.radioValue){case 1:return this.ruleForm.phones=this.currentObj.phones,this.allAccountValue=this.currentObj.phones,this.ruleForm.minAmount=this.currentObj.minAmount,this.ruleForm.maxAmount=this.currentObj.maxAmount,void(this.ruleForm.coinId=this.currentObj.coinId);case 2:return this.ruleForm.minAmount=this.currentObj.minAmount,this.ruleForm.maxAmount=this.currentObj.maxAmount,void(this.ruleForm.coinId=this.currentObj.coinId);case 3:return this.ruleForm.phones=this.currentObj.phones,void(this.allAccountValue=this.currentObj.phones)}},getSampleCoinInfo:function(){var e=this;this.coinList.length||this.$http.post("wallet/backmgr/coin/getSampleCoinInfo",{}).then(function(t){e.coinList=t.result.list})},determine:function(){var e=this;this.$refs.ruleForm.validate(function(t){if(!t)return!1;var l=JSON.parse(i()(e.ruleForm));l.timingPush=l.timingPush?"YES":"NO",l.pushAll=1==e.radioValue?"YES":"NO",l.isHomeNotice=1==l.isHomeNotice?1:0,e.ruleForm.id?(1==e.radioValue?(l.minAmount="",l.maxAmount="",l.coinId="",l.phones=""):2==e.radioValue?(l.minAmount="",l.maxAmount="",l.coinId=""):3==e.radioValue&&(l.phones="empty"),l.details=l.details||"empty",l.jumpUrl=l.jumpUrl||"empty",e.$http.post("wallet/backmgr/noticeInfo/updateNoticeInfo",l).then(function(t){e.$notify({title:"成功",message:"修改成功",type:"success"}),e.dialogFormVisible=!1,e.getNoticeInfoList()})):e.$http.post("wallet/backmgr/noticeInfo/createNoticeInfo",l).then(function(t){e.$notify({title:"成功",message:"创建成功",type:"success"}),e.dialogFormVisible=!1,e.getNoticeInfoList()})})},openUrl:function(e){e&&window.open(e)},upload:function(e,t,l){this.ruleForm.picture=e.result.urls[0]}},activated:function(){this.server_path=SERVER_PATH,this.getNoticeInfoList()}},a={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"message"},[l("el-col",{staticStyle:{"text-align":"right"},attrs:{span:22}},[l("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.addMessage}},[e._v("创建消息")])],1),e._v(" "),l("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"100px",model:e.filterForm}},[l("sac-select",{ref:"noticeType",attrs:{label:"消息类型",dataList:e.noticeTypeList},model:{value:e.filterForm.noticeType,callback:function(t){e.$set(e.filterForm,"noticeType",t)},expression:"filterForm.noticeType"}}),e._v(" "),l("sac-select",{ref:"sendStatues",attrs:{label:"消息状态",dataList:e.sendStatuesList},model:{value:e.filterForm.sendStatues,callback:function(t){e.$set(e.filterForm,"sendStatues",t)},expression:"filterForm.sendStatues"}}),e._v(" "),l("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(t){return e.submitForm(1)}}})],1),e._v(" "),l("sac-table",{attrs:{data:e.listData.list}},[l("el-table-column",{attrs:{prop:"type",label:"消息类型",formatter:e.formatSex,width:"130px"}}),e._v(" "),l("el-table-column",{attrs:{prop:"sendTime",label:"创建时间",width:"150px"}}),e._v(" "),l("el-table-column",{attrs:{prop:"title",label:"标题"}}),e._v(" "),l("el-table-column",{attrs:{prop:"content",label:"内容"}}),e._v(" "),l("el-table-column",{attrs:{prop:"details",label:"详情"}}),e._v(" "),l("el-table-column",{attrs:{label:"状态",width:"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.sendStatues?l("el-tag",{attrs:{type:"success"}},[e._v("已发送")]):e._e(),e._v(" "),0==t.row.sendStatues?l("el-tag",{attrs:{type:"info"}},[e._v("未发送")]):e._e()]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"操作",width:"240"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.sendStatues?l("el-button",{attrs:{type:"success",size:"small"},nativeOn:{click:function(l){return e.detailList(t.row)}}},[e._v("查看\n        ")]):e._e(),e._v(" "),0==t.row.sendStatues||1==t.row.isHomeNotice?l("el-button",{attrs:{type:"warning",size:"small",disabled:e.pushMessage},nativeOn:{click:function(l){return e.modification(t.row)}}},[e._v("修改\n        ")]):e._e(),e._v(" "),0==t.row.sendStatues?l("el-button",{attrs:{type:"danger",size:"small",disabled:e.pushMessage},nativeOn:{click:function(l){return e.remove(t.row)}}},[e._v("删除\n        ")]):e._e(),e._v(" "),0==t.row.sendStatues?l("el-button",{attrs:{type:"primary",size:"small",disabled:e.pushMessage,loading:t.row.isLoading},nativeOn:{click:function(l){return e.sendMessage(t.row,t.$index)}}},[e._v("推送\n        ")]):e._e()]}}])})],1),e._v(" "),l("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.filterForm.pageSize,"current-page":e.filterForm.pageNum},on:{handleChange:e.getPaginationChange}}),e._v(" "),l("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[l("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,"label-width":"140px",rules:e.rules}},[l("el-form-item",{attrs:{label:"消息类型:",prop:"noticeType",required:""}},[l("el-select",{attrs:{size:"small",placeholder:"请选择"},model:{value:e.ruleForm.noticeType,callback:function(t){e.$set(e.ruleForm,"noticeType",t)},expression:"ruleForm.noticeType"}},[l("el-option",{attrs:{label:"系统消息",value:"SystemMsg"}}),e._v(" "),l("el-option",{attrs:{label:"运营消息",value:"OperationMsg"}}),e._v(" "),l("el-option",{attrs:{label:"动账消息",value:"TransferMsg"}}),e._v(" "),l("el-option",{attrs:{label:"第三方应用更新消息",value:"ThirdAppMsg"}})],1)],1),e._v(" "),l("el-form-item",{attrs:{label:"消息标题:",required:"",prop:"title"}},[l("el-col",{staticStyle:{position:"relative"},attrs:{span:16}},[l("span",{staticClass:"tips tips_input"},[e._v(e._s(e.ruleForm.title.length)+"/15")]),e._v(" "),l("el-input",{attrs:{size:"small",maxlength:"15",placeholder:"请输入消息标题"},model:{value:e.ruleForm.title,callback:function(t){e.$set(e.ruleForm,"title",t)},expression:"ruleForm.title"}})],1)],1),e._v(" "),l("el-form-item",{attrs:{label:"消息内容:",required:"",prop:"content"}},[l("el-col",{staticStyle:{position:"relative"},attrs:{span:16}},[l("span",{staticClass:"tips tips_textarea"},[e._v(e._s(e.ruleForm.content.length)+"/50")]),e._v(" "),l("el-input",{attrs:{size:"small",type:"textarea",width:"100%",maxlength:"50",placeholder:"请输入消息内容"},model:{value:e.ruleForm.content,callback:function(t){e.$set(e.ruleForm,"content",t)},expression:"ruleForm.content"}})],1)],1),e._v(" "),l("el-form-item",{attrs:{label:"详情信息:"}},[l("el-col",{staticStyle:{position:"relative"},attrs:{span:16}},[l("el-input",{attrs:{size:"small",type:"textarea",width:"100%",placeholder:"请输入详情信息"},model:{value:e.ruleForm.details,callback:function(t){e.$set(e.ruleForm,"details",t)},expression:"ruleForm.details"}})],1)],1),e._v(" "),"ThirdAppMsg"==e.ruleForm.noticeType?l("el-form-item",{attrs:{label:"应用名称:",required:"",prop:"appName"}},[l("el-col",{staticStyle:{position:"relative"},attrs:{span:16}},[l("el-input",{attrs:{size:"small",type:"text",width:"100%",placeholder:"请输入应用名称"},model:{value:e.ruleForm.appName,callback:function(t){e.$set(e.ruleForm,"appName",t)},expression:"ruleForm.appName"}})],1)],1):e._e(),e._v(" "),l("el-form-item",{attrs:{label:"消息跳转地址:",prop:"jumpUrl"}},[l("el-col",{attrs:{span:16}},[l("el-input",{attrs:{size:"small",placeholder:"请输入跳转地址"},model:{value:e.ruleForm.jumpUrl,callback:function(t){e.$set(e.ruleForm,"jumpUrl",t)},expression:"ruleForm.jumpUrl"}})],1),e._v(" "),l("el-button",{staticStyle:{"margin-left":"10px"},attrs:{size:"small"},on:{click:function(t){return e.openUrl(e.ruleForm.jumpUrl)}}},[e._v("打开")])],1),e._v(" "),l("el-form-item",{attrs:{label:"消息发送日期:",prop:"sendTime"}},[l("el-date-picker",{attrs:{size:"small",type:"datetime",placeholder:"选择日期时间","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:e.ruleForm.sendTime,callback:function(t){e.$set(e.ruleForm,"sendTime",t)},expression:"ruleForm.sendTime"}}),e._v(" "),l("el-checkbox",{staticStyle:{"margin-left":"10px"},model:{value:e.ruleForm.timingPush,callback:function(t){e.$set(e.ruleForm,"timingPush",t)},expression:"ruleForm.timingPush"}},[e._v("自动推送")])],1),e._v(" "),l("el-form-item",{staticClass:"fixForm",attrs:{label:"推送对象:",required:""}},[l("el-radio-group",{staticClass:"radioGroup",on:{change:e.getPushType},model:{value:e.radioValue,callback:function(t){e.radioValue=t},expression:"radioValue"}},[l("el-col",{attrs:{span:16}},[l("el-radio",{attrs:{label:1}},[e._v("全部")])],1),e._v(" "),l("el-col",{attrs:{span:16}},[l("el-radio",{attrs:{label:2}},[e._v("指定账号推送")]),e._v(" "),2==e.radioValue?l("el-row",{key:"specifyPush",staticClass:"specifyPush",attrs:{span:24}},[l("el-form-item",{attrs:{label:"",required:"",prop:"phones"}},[l("span",{staticClass:"tips tips_textarea"},[e._v(e._s(e.ruleForm.phones.length)+"/500")]),e._v(" "),l("el-input",{attrs:{type:"textarea",size:"small",resize:"none",maxlength:"500",placeholder:"请输入具体账号,多个账号用英文逗号隔开",autosize:{minRows:2,maxRows:4}},on:{change:function(t){return e.getTextareaChange("ruleForm")}},model:{value:e.ruleForm.phones,callback:function(t){e.$set(e.ruleForm,"phones",t)},expression:"ruleForm.phones"}})],1)],1):e._e()],1),e._v(" "),l("el-col",{attrs:{span:24}},[l("el-radio",{attrs:{label:3}},[e._v("持仓范围")]),e._v(" "),3==e.radioValue?l("el-row",{staticClass:"positionScope",attrs:{span:24}},[l("el-col",{attrs:{span:5.5}},[l("el-form-item",{attrs:{prop:"minAmount"}},[l("el-input-number",{attrs:{size:"small","controls-position":"right",min:0},model:{value:e.ruleForm.minAmount,callback:function(t){e.$set(e.ruleForm,"minAmount",t)},expression:"ruleForm.minAmount"}})],1)],1),e._v(" "),l("el-col",{staticClass:"line",staticStyle:{"text-align":"center","font-size":"12px",height:"40px","line-height":"40px"},attrs:{span:2}},[e._v("～\n              ")]),e._v(" "),l("el-col",{attrs:{span:5.5}},[l("el-form-item",{attrs:{prop:"maxAmount"}},[l("el-input-number",{attrs:{size:"small","controls-position":"right",min:0},model:{value:e.ruleForm.maxAmount,callback:function(t){e.$set(e.ruleForm,"maxAmount",t)},expression:"ruleForm.maxAmount"}})],1)],1),e._v(" "),l("el-col",{staticStyle:{"margin-left":"10px"},attrs:{span:8}},[l("el-form-item",{attrs:{label:"币　种:","label-width":"80px",prop:"coinId",size:"mini"}},[l("el-select",{attrs:{size:"small",placeholder:"请选择币种"},model:{value:e.ruleForm.coinId,callback:function(t){e.$set(e.ruleForm,"coinId",t)},expression:"ruleForm.coinId"}},e._l(e.coinList,function(e,t){return l("el-option",{key:t,attrs:{label:e.coinName,value:e.coinId}})}),1)],1)],1)],1):e._e()],1)],1)],1),e._v(" "),l("el-form-item",{attrs:{label:" "}},[l("el-checkbox",{attrs:{label:"是否在首页展示",name:"type"},model:{value:e.ruleForm.isHomeNotice,callback:function(t){e.$set(e.ruleForm,"isHomeNotice",t)},expression:"ruleForm.isHomeNotice"}})],1),e._v(" "),"SystemMsg"!=e.ruleForm.noticeType?l("el-form-item",{attrs:{label:"应用图标:"}},[l("el-input",{staticClass:"picture-input",attrs:{size:"small",placeholder:"请输入应用图标地址"},model:{value:e.ruleForm.picture,callback:function(t){e.$set(e.ruleForm,"picture",t)},expression:"ruleForm.picture"}}),e._v(" "),l("span",{staticClass:"appIcon"},[e._v("图标尺寸：678*260")]),e._v(" "),l("el-upload",{staticClass:"avatar-uploader",attrs:{name:"files",action:e.server_path+"wallet/backmgr/uploadFile","show-file-list":!1,"on-success":e.upload,data:{type:"img",token:e.token}}},[e.ruleForm.picture?l("img",{staticClass:"avatar",attrs:{src:e.ruleForm.picture}}):l("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1):e._e()],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.determine}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var o=l("VU/8")(r,a,!1,function(e){l("awzd")},null,null);t.default=o.exports},awzd:function(e,t){}});