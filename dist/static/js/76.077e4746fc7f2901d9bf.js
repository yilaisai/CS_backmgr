webpackJsonp([76],{F25M:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("mvHQ"),l=a.n(r),i={name:"feedback",data:function(){return{dateTime:[],filterForm:{feedbackType:"",beginTime:"",endTime:"",pageNum:1,pageSize:20},current:"10:00:00",listData:{total:null,list:[]},feedbackTypeList:[{value:"",label:"全部"},{value:"Consult",label:"咨询"},{value:"Suggest",label:"建议"},{value:"Tranfer",label:"转账入账补录"},{value:"Other",label:"其他"}],dialogTitle:"添加意见反馈",dialogFormVisible:!1,ruleForm:{content:"",phone:"",title:"转账入账补录"},rules:{content:[{required:!0,message:"请输入反馈描述",trigger:"blur"}],phone:[{required:!0,message:"请输入联系方式",trigger:"blur"}]}}},methods:{addFeedBack:function(){this.dialogFormVisible=!0,this.ruleForm.content="",this.ruleForm.phone="",this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},submitForm:function(e){this.filterForm.pageNum=e,this.getfeedBackList()},getPaginationChange:function(e,t){this.filterForm.pageSize=e,this.submitForm(t)},formatSex:function(e,t){switch(e.rtype){case"":case null:return"全部";case 0:return"咨询";case 1:return"建议";case 2:return"其他";case 3:return"转账入账补录";default:return"其他"}},getfeedBackList:function(){var e=this;this.filterForm.beginTime=this.dateTime[0],this.filterForm.endTime=this.dateTime[1],this.$http.post("/wallet/backmgr/feedback/getfeedBackList",this.filterForm).then(function(t){var a=t.result.pageInfo,r=a.list,l=a.total;e.listData.list=r,e.listData.total=l})},detailList:function(e){switch(e.rtype){case"":case null:e.rtypeName="全部";break;case 0:e.rtypeName="咨询";break;case 1:e.rtypeName="建议";break;case 2:e.rtypeName="其他";break;case 3:e.rtypeName="转账入账补录";break;default:e.rtypeName="其他"}var t=e.rtypeName,a=e.createTime,r=e.contactData,l=e.opStatus,i=e.content,s=e.otherFile,o=e.id,n=e.remark;this.$router.push({name:"feedbackDetails",params:{rtypeName:t,createTime:a,contactData:r,opStatus:l,content:i,otherFile:s,id:o,remark:n}})},determine:function(){var e=this;this.$refs.ruleForm.validate(function(t){if(t){var a=JSON.parse(l()(e.ruleForm));e.$http.post("wallet/backmgr/feedback/createFeedBack",a).then(function(t){e.$notify({title:"成功",message:"添加成功",type:"success"}),e.dialogFormVisible=!1,e.getfeedBackList()})}})}},activated:function(){this.getfeedBackList()}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"feedback"},[a("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"80px",model:e.filterForm}},[a("sac-select",{ref:"feedbackType",attrs:{label:"反馈类型",dataList:e.feedbackTypeList},model:{value:e.filterForm.feedbackType,callback:function(t){e.$set(e.filterForm,"feedbackType",t)},expression:"filterForm.feedbackType"}}),e._v(" "),a("el-form-item",{staticClass:"sac-time",attrs:{label:"日　　期:"}},[a("el-date-picker",{attrs:{size:"small","value-format":"yyyy-MM-dd HH:mm:ss",type:"datetimerange","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.dateTime,callback:function(t){e.dateTime=t},expression:"dateTime"}})],1),e._v(" "),a("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(t){return e.submitForm(1)}}}),e._v(" "),a("el-form-item",{staticClass:"fi-add"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.addFeedBack}},[e._v("添加")])],1)],1),e._v(" "),a("sac-table",{attrs:{data:e.listData.list}},[a("el-table-column",{attrs:{prop:"rtype",label:"反馈类型",formatter:e.formatSex,width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"提交日期",width:"170"}}),e._v(" "),a("el-table-column",{attrs:{prop:"content",label:"问题"}}),e._v(" "),a("el-table-column",{attrs:{prop:"contactData",label:"联系方式"}}),e._v(" "),a("el-table-column",{attrs:{prop:"remark",label:"备注"}}),e._v(" "),a("el-table-column",{attrs:{label:"状态",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.opStatus?a("el-tag",{attrs:{type:"success"}},[e._v("已处理")]):e._e(),e._v(" "),0==t.row.opStatus?a("el-tag",{attrs:{type:"info"}},[e._v("未处理")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"success",size:"small"},nativeOn:{click:function(a){return e.detailList(t.row)}}},[e._v("查看\n        ")])]}}])})],1),e._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.filterForm.pageSize,"current-page":e.filterForm.pageNum},on:{handleChange:e.getPaginationChange}}),e._v(" "),a("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,"label-width":"140px",rules:e.rules}},[a("el-form-item",{attrs:{label:"反馈类型:"}},[a("el-col",{attrs:{span:16}},[a("span",[e._v(e._s(e.ruleForm.title))])])],1),e._v(" "),a("el-form-item",{attrs:{label:"反馈描述:",prop:"content"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入反馈描述"},model:{value:e.ruleForm.content,callback:function(t){e.$set(e.ruleForm,"content",t)},expression:"ruleForm.content"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"联系方式:",prop:"phone"}},[a("el-input",{attrs:{type:"text",placeholder:"请输入联系方式"},model:{value:e.ruleForm.phone,callback:function(t){e.$set(e.ruleForm,"phone",e._n(t))},expression:"ruleForm.phone"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"medium"},on:{click:e.determine}},[e._v("提交")])],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")(i,s,!1,function(e){a("qi66")},null,null);t.default=o.exports},qi66:function(e,t){}});