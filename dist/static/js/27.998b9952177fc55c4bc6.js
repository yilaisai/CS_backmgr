webpackJsonp([27],{"bb+M":function(t,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=l("mvHQ"),a=l.n(i),s={name:"message",data:function(){return{filterForm:{type:"",status:"",curPage:1,pageSize:20},listData:{total:null,list:[]},noticeTypeList:[{value:"",label:"全部消息"},{value:"0",label:"系统消息"},{value:"1",label:"运营消息"},{value:"2",label:"动账消息"}],statusList:[{value:"",label:"全部状态"},{value:"1",label:"上架"},{value:"0",label:"下架"}],dialogTitle:"新增公告",dialogFormVisible:!1,ruleForm:{type:"",title:"",content:""},rules:{type:[{required:!0,message:"请选择公告类型",trigger:"change"}],title:[{required:!0,message:"请输入标题",trigger:"blur"},{min:1,max:15,message:"长度在 1 到 15 个字符",trigger:"blur"}],content:[{required:!0,message:"请输入内容",trigger:"blur"},{min:1,max:50,message:"长度在 1 到 50 个字符",trigger:"blur"}]},coinList:[]}},methods:{resetForm:function(){this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},submitForm:function(t){this.filterForm.curPage=t,this.getNoticeInfoList()},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.submitForm(e)},getNoticeInfoList:function(){var t=this;this.$http.post("supernode/backmgr/notice/getNoticeList",this.filterForm).then(function(e){var l=e.result,i=l.list,a=l.total;i.forEach(function(t){t.isLoading=!1}),t.listData.list=i,t.listData.total=a})},switchChange:function(t){var e=this,l=t.lockStatus,i=t.id;t.title;this.$http.post("supernode/backmgr/notice/updateNoticeStatus",{status:l?"1":"0",id:i}).then(function(t){e.$notify({title:"成功",message:(l?"上架":"下架")+" 成功",type:"success"}),e.getNoticeInfoList()})},addMessage:function(){this.dialogTitle="新增公告",this.dialogFormVisible=!0,this.ruleForm={type:"",title:"",content:""},this.resetForm()},modification:function(t){this.dialogTitle="修改公告",this.dialogFormVisible=!0,this.resetForm(),t=JSON.parse(a()(t)),this.ruleForm={id:t.id,type:""+t.type,title:t.title,content:t.content}},determine:function(){var t=this;this.$refs.ruleForm.validate(function(e){if(!e)return!1;var l=JSON.parse(a()(t.ruleForm));t.ruleForm.id?t.$http.post("supernode/backmgr/notice/updateNotice",l).then(function(e){t.$notify({title:"成功",message:"修改成功",type:"success"}),t.dialogFormVisible=!1,t.getNoticeInfoList()}):t.$http.post("supernode/backmgr/notice/createNotice",l).then(function(e){t.$notify({title:"成功",message:"创建成功",type:"success"}),t.dialogFormVisible=!1,t.getNoticeInfoList()})})}},activated:function(){this.getNoticeInfoList()}},r={render:function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"message"},[l("el-col",{staticStyle:{"text-align":"right"},attrs:{span:22}},[l("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.addMessage}},[t._v("新增公告")])],1),t._v(" "),l("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"100px",model:t.filterForm}},[l("sac-select",{ref:"type",attrs:{label:"公告类型",dataList:t.noticeTypeList},model:{value:t.filterForm.type,callback:function(e){t.$set(t.filterForm,"type",e)},expression:"filterForm.type"}}),t._v(" "),l("sac-select",{ref:"type",attrs:{label:"状态",dataList:t.statusList},model:{value:t.filterForm.status,callback:function(e){t.$set(t.filterForm,"status",e)},expression:"filterForm.status"}}),t._v(" "),l("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(e){return t.submitForm(1)}}})],1),t._v(" "),l("sac-table",{attrs:{data:t.listData.list}},[l("el-table-column",{attrs:{prop:"title",label:"标题"}}),t._v(" "),l("el-table-column",{attrs:{prop:"type",label:"公告类型"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s("2"==e.row.type?"动账消息":"1"==e.row.type?"运营消息":"系统消息")+"\n      ")]}}])}),t._v(" "),l("el-table-column",{attrs:{prop:"content",label:"内容"}}),t._v(" "),l("el-table-column",{attrs:{label:"发送日期",width:"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(t._f("dateFormat")(e.row.createTime,"YYYY-MM-DD HH:mm"))+"\n      ")]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"操作",width:"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("el-button",{attrs:{type:"primary",disabled:1==e.row.lockStatus,size:"small",loading:e.row.isLoading},nativeOn:{click:function(l){return t.modification(e.row,e.$index)}}},[t._v("修改\n        ")])]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"上架",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("el-switch",{attrs:{"inactive-value":0,"active-value":1},nativeOn:{click:function(l){return t.switchChange(e.row)}},model:{value:e.row.lockStatus,callback:function(l){t.$set(e.row,"lockStatus",l)},expression:"scope.row.lockStatus"}})]}}])})],1),t._v(" "),l("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}}),t._v(" "),l("el-dialog",{attrs:{title:t.dialogTitle,visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[l("el-form",{ref:"ruleForm",attrs:{model:t.ruleForm,"label-width":"140px",rules:t.rules}},[l("el-form-item",{attrs:{label:"公告标题:",required:"",prop:"title"}},[l("el-col",{staticStyle:{position:"relative"},attrs:{span:16}},[l("span",{staticClass:"tips tips_input"},[t._v(t._s(t.ruleForm.title.length)+"/15")]),t._v(" "),l("el-input",{attrs:{size:"small",maxlength:"15",placeholder:"请输入公告标题"},model:{value:t.ruleForm.title,callback:function(e){t.$set(t.ruleForm,"title",e)},expression:"ruleForm.title"}})],1)],1),t._v(" "),l("el-form-item",{attrs:{label:"公告内容:",required:"",prop:"content"}},[l("el-col",{staticStyle:{position:"relative"},attrs:{span:16}},[l("span",{staticClass:"tips tips_textarea"},[t._v(t._s(t.ruleForm.content.length)+"/50")]),t._v(" "),l("el-input",{attrs:{size:"small",type:"textarea",rows:4,width:"100%",maxlength:"50",placeholder:"请输入公告内容"},model:{value:t.ruleForm.content,callback:function(e){t.$set(t.ruleForm,"content",e)},expression:"ruleForm.content"}})],1)],1),t._v(" "),l("el-form-item",{attrs:{label:"公告类型:",prop:"type",required:""}},[l("el-select",{attrs:{size:"small",placeholder:"请选择公告类型"},model:{value:t.ruleForm.type,callback:function(e){t.$set(t.ruleForm,"type",e)},expression:"ruleForm.type"}},[l("el-option",{attrs:{label:"系统消息",value:"0"}}),t._v(" "),l("el-option",{attrs:{label:"运营消息",value:"1"}}),t._v(" "),l("el-option",{attrs:{label:"动账消息",value:"2"}})],1)],1)],1),t._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{size:"small"},on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),l("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.determine}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var o=l("VU/8")(s,r,!1,function(t){l("xbaZ")},null,null);e.default=o.exports},xbaZ:function(t,e){}});