webpackJsonp([36],{BvF0:function(e,t){},"bb+M":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("mvHQ"),l=s.n(i),a={name:"message",data:function(){return{selectedDate:[],filterForm:{sendStatues:"",noticeType:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},noticeTypeList:[{value:"",label:"全部消息"},{value:"SystemMsg",label:"系统消息"},{value:"OperationMsg",label:"运营消息"},{value:"TransferMsg",label:"动账消息"}],sendStatuesList:[{value:"",label:"全部状态"},{value:"YES",label:"已推送"},{value:"NO",label:"未推送"}],pushMessage:!1,dialogTitle:"新增消息模版",dialogFormVisible:!1,ruleForm:{noticeType:"",jumpUrl:"",sendTime:"",title:"",content:"",details:"",timingPush:!1,pushAll:!1,phones:"",minAmount:"",maxAmount:"",coinId:""},rules:{type:[{required:!0,message:"请选择消息类型",trigger:"change"}],title:[{required:!0,message:"请输入标题",trigger:"blur"},{min:1,max:15,message:"长度在 1 到 15 个字符",trigger:"blur"}],content:[{required:!0,message:"请输入内容",trigger:"blur"},{min:1,max:50,message:"长度在 1 到 50 个字符",trigger:"blur"}],jumpUrl:[{required:!1,message:"请输入消息跳转地址",trigger:"change"}],phones:[{required:!0,message:"请输入具体账号",trigger:"blur"}],sendTime:[{required:!0,message:"请选择时间",trigger:"change"}],coinId:[{required:!0,message:"请选择币种",trigger:"change"}]},allAccountValue:"",currentObj:{},coinList:[]}},methods:{resetForm:function(){this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},submitForm:function(e){this.filterForm.pageNum=e,this.getNoticeInfoList()},getPaginationChange:function(e,t){this.filterForm.pageSize=e,this.submitForm(t)},getNoticeInfoList:function(){var e=this;this.$http.post("wallet/backmgr/noticeInfo/getNoticeInfoList.do",this.filterForm).then(function(t){var s=t.result.list,i=s.list,l=s.total;i.forEach(function(e){e.isLoading=!1}),e.listData.list=i,e.listData.total=l})},formatSex:function(e,t){return 0==e.type?"系统消息":1==e.type?"运营消息":"动账消息"},remove:function(e){var t=this,s=e.id,i=e.title;this.$confirm("确定删除 "+i+" 吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.post("/wallet/backmgr/noticeInfo/updateNoticeInfoSysStatus.do",{sysStatus:"INVALID0",id:s}).then(function(e){t.$notify({title:"成功",message:"删除 "+i+"成功",type:"success"}),t.getNoticeInfoList()})})},sendMessage:function(e,t){var s=this;this.listData.list[t].isLoading=!0,this.pushMessage=!0;var i=e.id,l=e.title;this.$http.post("wallet/backmgr/userNoticeRecd/pushUserAll.do",{version:"1.0.0",plat:"web",noticeInfoId:i}).then(function(e){var t=s;setTimeout(function(){t.$notify({title:"成功",message:" 推送 "+l+" 消息成功",type:"success"}),t.getNoticeInfoList(),t.pushMessage=!1},2e4)}).catch(function(){s.getNoticeInfoList(),s.pushMessage=!1})},detailList:function(e){this.$router.push({name:"messageDetails",query:{id:e.id}})},modification:function(e){switch(this.dialogTitle="修改送币规则",this.dialogFormVisible=!0,this.resetForm(),this.getSampleCoinInfo(),this.ruleForm=JSON.parse(l()(e)),this.ruleForm.timingPush=0!=this.ruleForm.timingPush,1==this.ruleForm.pushAll?this.ruleForm.coinId="":this.ruleForm.phones.length>0?this.ruleForm.coinId="":this.ruleForm.coinId,this.ruleForm.type){case 0:this.ruleForm.noticeType="SystemMsg";break;case 1:this.ruleForm.noticeType="OperationMsg";break;case 2:this.ruleForm.noticeType="TransferMsg"}},addMessage:function(){this.dialogTitle="新增公告",this.dialogFormVisible=!0,this.ruleForm={noticeType:"",jumpUrl:"",sendTime:"",title:"",content:"",details:"",timingPush:!1,pushAll:!1,phones:"",minAmount:"",maxAmount:"",coinId:""},this.resetForm(),this.getSampleCoinInfo()},getSampleCoinInfo:function(){var e=this;this.coinList.length||this.$http.post("wallet/backmgr/coin/getSampleCoinInfo.do",{}).then(function(t){e.coinList=t.result.list})},determine:function(){var e=this;this.$refs.ruleForm.validate(function(t){if(!t)return!1;var s=JSON.parse(l()(e.ruleForm));s.timingPush=s.timingPush?"YES":"NO",e.ruleForm.id?(s.details=s.details||"empty",s.jumpUrl=s.jumpUrl||"empty",e.$http.post("wallet/backmgr/noticeInfo/updateNoticeInfo.do",s).then(function(t){e.$notify({title:"成功",message:"修改成功",type:"success"}),e.dialogFormVisible=!1,e.getNoticeInfoList()})):e.$http.post("wallet/backmgr/noticeInfo/createNoticeInfo.do",s).then(function(t){e.$notify({title:"成功",message:"创建成功",type:"success"}),e.dialogFormVisible=!1,e.getNoticeInfoList()})})},openUrl:function(e){e&&window.open(e)}},activated:function(){this.getNoticeInfoList()}},n={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"message"},[s("el-col",{staticStyle:{"text-align":"right"},attrs:{span:22}},[s("el-button",{attrs:{type:"primary"},on:{click:e.addMessage}},[e._v("新增公告")])],1),e._v(" "),s("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"100px",model:e.filterForm}},[s("sac-date",{ref:"selectedDate",attrs:{label:"日　　期"},model:{value:e.selectedDate,callback:function(t){e.selectedDate=t},expression:"selectedDate"}}),e._v(" "),s("sac-select",{ref:"sendStatues",attrs:{label:"消息状态",dataList:e.sendStatuesList},model:{value:e.filterForm.sendStatues,callback:function(t){e.$set(e.filterForm,"sendStatues",t)},expression:"filterForm.sendStatues"}}),e._v(" "),s("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(t){e.submitForm(1)}}})],1),e._v(" "),s("sac-table",{attrs:{data:e.listData.list}},[s("el-table-column",{attrs:{prop:"title",label:"标题"}}),e._v(" "),s("el-table-column",{attrs:{prop:"content",label:"内容"}}),e._v(" "),s("el-table-column",{attrs:{prop:"sendTime",label:"发送日期",width:"150px"}}),e._v(" "),s("el-table-column",{attrs:{label:"状态",width:"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.sendStatues?s("el-tag",{attrs:{type:"success"}},[e._v("已发送")]):e._e(),e._v(" "),0==t.row.sendStatues?s("el-tag",{attrs:{type:"info"}},[e._v("未发送")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"操作",width:"240"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.sendStatues?s("el-button",{attrs:{type:"success",size:"small"},nativeOn:{click:function(s){e.detailList(t.row)}}},[e._v("查看\n        ")]):e._e(),e._v(" "),0==t.row.sendStatues?s("el-button",{attrs:{type:"warning",size:"small",disabled:e.pushMessage},nativeOn:{click:function(s){e.modification(t.row)}}},[e._v("修改\n        ")]):e._e(),e._v(" "),0==t.row.sendStatues?s("el-button",{attrs:{type:"danger",size:"small",disabled:e.pushMessage},nativeOn:{click:function(s){e.remove(t.row)}}},[e._v("删除\n        ")]):e._e(),e._v(" "),0==t.row.sendStatues?s("el-button",{attrs:{type:"primary",size:"small",disabled:e.pushMessage,loading:t.row.isLoading},nativeOn:{click:function(s){e.sendMessage(t.row,t.$index)}}},[e._v("推送\n        ")]):e._e()]}}])})],1),e._v(" "),s("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.filterForm.pageSize,"current-page":e.filterForm.pageNum},on:{handleChange:e.getPaginationChange}}),e._v(" "),s("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[s("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,"label-width":"140px",rules:e.rules}},[s("el-form-item",{attrs:{label:"公告标题:",required:"",prop:"title"}},[s("el-col",{staticStyle:{position:"relative"},attrs:{span:16}},[s("span",{staticClass:"tips tips_input"},[e._v(e._s(e.ruleForm.title.length)+"/15")]),e._v(" "),s("el-input",{attrs:{size:"small",maxlength:"15",placeholder:"请输入公告标题"},model:{value:e.ruleForm.title,callback:function(t){e.$set(e.ruleForm,"title",t)},expression:"ruleForm.title"}})],1)],1),e._v(" "),s("el-form-item",{attrs:{label:"公告内容:",required:"",prop:"content"}},[s("el-col",{staticStyle:{position:"relative"},attrs:{span:16}},[s("span",{staticClass:"tips tips_textarea"},[e._v(e._s(e.ruleForm.content.length)+"/50")]),e._v(" "),s("el-input",{attrs:{size:"small",type:"textarea",rows:4,width:"100%",maxlength:"50",placeholder:"请输入公告内容"},model:{value:e.ruleForm.content,callback:function(t){e.$set(e.ruleForm,"content",t)},expression:"ruleForm.content"}})],1)],1),e._v(" "),s("el-form-item",{attrs:{label:"公告发送日期:",prop:"sendTime"}},[s("el-date-picker",{attrs:{size:"small",type:"datetime",placeholder:"选择日期时间","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:e.ruleForm.sendTime,callback:function(t){e.$set(e.ruleForm,"sendTime",t)},expression:"ruleForm.sendTime"}})],1)],1),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.determine}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var o=s("VU/8")(a,n,!1,function(e){s("BvF0")},null,null);t.default=o.exports}});