webpackJsonp([17],{"/bsS":function(t,e){},vLT0:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"check-application",data:function(){return{failReason:"",listData:{total:null,list:[]},refuseData:"",pageNum:1,pageSize:20,dialogTitle:"创建应用",server_path:"",transferTypeInfoList:[],currentForm:{},options:{inline:!1,button:!1,navbar:!1,title:!1,toolbar:!1,tooltip:!1,movable:!0,zoomable:!0,rotatable:!0,scalable:!1,transition:!0,fullscreen:!0,keyboard:!0,url:"data-source"},dialogReasonVisibleView:!1}},methods:{goDetail:function(t){this.$router.push({name:"thirdDetail",params:t})},getPaginationChange:function(t,e){this.pageSize=t,this.pageNum=e,this.getThirdAppInfoList()},getThirdAppInfoList:function(){var t=this;this.$http.post("/wallet/backmgr/thirdAppInfo/getWaitingThirdAppList",{pageSize:this.pageSize,pageNum:this.pageNum}).then(function(e){t.listData=e.result.list,t.listData.total=e.result.list.total})},passCheck:function(t,e){var a=this,i=t.appName,s={id:t.id};1!=e||""!=(this.failReason+"").trim()?(1==e?(s.auditStatus="not_pass",s.failReason=this.failReason):s.auditStatus="pass",this.$http.post("/wallet/backmgr/thirdAppInfo/updateThirdAppInfoAuditStatus",s).then(function(t){a.$notify({title:"成功",message:"处理 "+i+"成功",type:"success"}),a.dialogReasonVisibleView=!1,a.getThirdAppInfoList()})):this.$notify({message:"请先输入拒绝原因！",type:"warning"})},showNoPassCheck:function(t){this.dialogReasonVisibleView=!0,this.refuseData=t},modification:function(t){this.$router.push({name:"thirdModify",params:t})}},activated:function(){this.server_path=SERVER_PATH,this.getThirdAppInfoList()}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"created"},[a("sac-table",{attrs:{data:t.listData.list}},[a("el-table-column",{attrs:{prop:"id",label:"序号",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{label:"应用名称",prop:"appName"}}),t._v(" "),a("el-table-column",{attrs:{prop:"app_icon",label:"应用图标"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("viewer",{ref:"viewer",staticClass:"viewer",attrs:{options:t.options}},[e.row.appIcon.indexOf("http")?t._e():a("img",{staticStyle:{"max-width":"100%","max-height":"150px"},attrs:{src:e.row.appIcon,alt:"图标存储地址"}})]),t._v(" "),e.row.appIcon.indexOf("http")?a("span",[t._v(t._s(e.row.appIcon))]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"iosVersion",label:"ios版本号",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"adrVersion",label:"android版本号",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"appId",label:"APPID",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"创建时间",width:"200"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"success",size:"small"},nativeOn:{click:function(a){return t.goDetail(e.row)}}},[t._v("查看详情\n        ")]),t._v(" "),a("el-button",{attrs:{type:"warning",size:"small"},nativeOn:{click:function(a){return t.modification(e.row)}}},[t._v("修改\n        ")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"success",size:"small"},nativeOn:{click:function(a){return t.passCheck(e.row)}}},[t._v("审核通过\n        ")]),t._v(" "),a("el-button",{attrs:{type:"danger",size:"small",disabled:0==e.row.auditStatus},nativeOn:{click:function(a){return t.showNoPassCheck(e.row)}}},[t._v("拒绝\n        ")])]}}])})],1),t._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.pageSize,"current-page":t.pageNum},on:{handleChange:t.getPaginationChange}}),t._v(" "),a("el-dialog",{attrs:{title:"拒绝原因",visible:t.dialogReasonVisibleView,width:"600px"},on:{"update:visible":function(e){t.dialogReasonVisibleView=e}}},[a("el-input",{attrs:{type:"textarea",rows:3,size:"small",placeholder:"请输入拒绝原因"},model:{value:t.failReason,callback:function(e){t.failReason=e},expression:"failReason"}}),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(e){t.dialogReasonVisibleView=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.passCheck(t.refuseData,1)}}},[t._v("确定")])],1)],1)],1)},staticRenderFns:[]};var n=a("VU/8")(i,s,!1,function(t){a("/bsS"),a("zI6m")},null,null);e.default=n.exports},zI6m:function(t,e){}});