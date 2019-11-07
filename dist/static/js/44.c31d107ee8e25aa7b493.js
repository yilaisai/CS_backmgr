webpackJsonp([44],{M0PH:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("lvKI");var i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"node-manage"},[a("el-row",[a("el-col",{attrs:{span:18}},[a("p",{staticStyle:{margin:"0 0 0 30px","font-weight":"bold"}},[t._v("本期PNB总投票数："+t._s(t.pNBAmount))])]),t._v(" "),a("el-col",{staticStyle:{"text-align":"center","margin-bottom":"30px"},attrs:{span:4}},[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.createNode}},[t._v("节点申请")])],1)],1),t._v(" "),a("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"100px",model:t.filterForm}},[a("sac-input",{ref:"phone",attrs:{label:"Sacbox账号",prop:"phone"},model:{value:t.filterForm.sacBoxAccount,callback:function(e){t.$set(t.filterForm,"sacBoxAccount","string"==typeof e?e.trim():e)},expression:"filterForm.sacBoxAccount"}}),t._v(" "),a("sac-input",{ref:"nickName",attrs:{label:"节点名",prop:"nickName"},model:{value:t.filterForm.teamName,callback:function(e){t.$set(t.filterForm,"teamName","string"==typeof e?e.trim():e)},expression:"filterForm.teamName"}}),t._v(" "),a("sac-select",{attrs:{label:"状态","data-list":t.stateList},model:{value:t.filterForm.status,callback:function(e){t.$set(t.filterForm,"status",e)},expression:"filterForm.status"}}),t._v(" "),a("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(e){return t.submitForm(1)}}})],1),t._v(" "),a("sac-table",{attrs:{data:t.listData.list}},[a("el-table-column",{attrs:{prop:"teamName",label:"节点名",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"sacBoxAccount",label:"Sacbox账号",width:"130"}}),t._v(" "),a("el-table-column",{attrs:{prop:"sacBoxAddr",label:"SAC收款地址"}}),t._v(" "),a("el-table-column",{attrs:{prop:"sacAmount",label:"SAC持仓数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"pnbAmount",label:"PNB投票数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"email",label:"邮箱"}}),t._v(" "),a("el-table-column",{attrs:{prop:"nodeIntroduce",label:"节点简介"}}),t._v(" "),a("el-table-column",{attrs:{prop:"status",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s("2"==e.row.status?"审核中":"1"==e.row.status?"审核成功":"审核失败")+"\n      ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"350"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.lockStatus?a("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(a){return t.optStatusChange(0,"解锁节点",e.row)}}},[t._v("解锁节点\n        ")]):t._e(),t._v(" "),0==e.row.lockStatus?a("el-button",{attrs:{size:"small",type:"warning"},on:{click:function(a){return t.optStatusChange(1,"锁定节点",e.row)}}},[t._v("锁定节点\n        ")]):t._e(),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(a){return t.goDetail(e.row)}}},[t._v("查看详情")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(a){return t.goModifyDetail(e.row)}}},[t._v("修改")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(e){return t.sendEmail()}}},[t._v("发邮件")])]}}])})],1),t._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.curPage},on:{handleChange:t.getPaginationChange}}),t._v(" "),a("el-dialog",{attrs:{"close-on-click-modal":!1,title:t.dialogVisibleTitle,visible:t.dialogVisible,width:"60%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("el-form",{ref:"details",attrs:{model:t.details,inline:!0,"label-width":"150px"}},[a("el-form-item",{attrs:{label:"logo:"}},[t.details.logoUrl?a("img",{directives:[{name:"viewer",rawName:"v-viewer"}],staticClass:"avatar",attrs:{src:t.details.logoUrl,alt:""}}):t._e()]),t._v(" "),a("el-form-item",{attrs:{label:"状态:"}},[a("span",[t._v(t._s("2"==t.details.status?"审核中":"1"==t.details.status?"审核成功":"审核失败"))])]),t._v(" "),a("el-form-item",{attrs:{label:"节点名称:"}},[a("span",[t._v(t._s(t.details.teamName))])]),t._v(" "),a("el-form-item",{attrs:{label:"节点简介:"}},[a("span",[t._v(t._s(t.details.nodeIntroduce))])]),t._v(" "),a("el-form-item",{attrs:{label:"Sacbox账号:"}},[a("span",[t._v(t._s(t.details.sacBoxAccount))])]),t._v(" "),a("el-form-item",{attrs:{label:"SAC收款地址:"}},[a("span",[t._v(t._s(t.details.sacBoxAddr))])]),t._v(" "),a("el-form-item",{attrs:{label:"SAC持仓数:"}},[a("span",[t._v(t._s(t.details.sacAmount))])]),t._v(" "),a("el-form-item",{attrs:{label:"PNB投票数:"}},[a("span",[t._v(t._s(t.details.pnbAmount))])]),t._v(" "),a("el-form-item",{attrs:{label:"邮箱:"}},[a("span",[t._v(t._s(t.details.email))])]),t._v(" "),a("el-form-item",{attrs:{label:"官网地址:"}},[a("span",[t._v(t._s(t.details.officialAddr))])]),t._v(" "),a("el-form-item",{attrs:{label:"团队介绍:"}},[a("span",[t._v(t._s(t.details.teamIntroduce))]),t._v(" "),a("a",{directives:[{name:"show",rawName:"v-show",value:t.isTeamDoc,expression:"isTeamDoc"}],staticClass:"el-upload-list__item-name",attrs:{target:"_blank",href:t.details.teamIntroduceUrl}},[a("i",{staticClass:"el-icon-document"}),t._v(t._s(t.teamIntroduceUrl)+"\n        ")]),t._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:t.isTeamImg,expression:"isTeamImg"},{name:"viewer",rawName:"v-viewer"}],staticClass:"introduce",attrs:{src:t.details.teamIntroduceUrl}})]),t._v(" "),a("el-form-item",{attrs:{label:"运营及宣传方案:"}},[a("span",[t._v(t._s(t.details.marketingIntroduce))]),t._v(" "),a("a",{directives:[{name:"show",rawName:"v-show",value:t.isMarketDoc,expression:"isMarketDoc"}],staticClass:"el-upload-list__item-name",attrs:{target:"_blank",href:t.details.marketingIntroduceUrl}},[a("i",{staticClass:"el-icon-document"}),t._v(t._s(t.marketingIntroduceUrl)+"\n        ")]),t._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:t.isMarketImg,expression:"isMarketImg"},{name:"viewer",rawName:"v-viewer"}],staticClass:"introduce",attrs:{src:t.details.marketingIntroduceUrl}})])],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(e){return t.isApproved(0,t.details.teamId)}}},[t._v("不通过审核")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.isApproved(1,t.details.teamId)}}},[t._v("通过审核并分配账号")])],1),t._v(" "),a("el-dialog",{attrs:{width:"40%",title:t.innerVisibleTitle,"append-to-body":"",visible:t.innerVisible},on:{"update:visible":function(e){t.innerVisible=e}}},[a("el-input",{attrs:{size:"small",type:"textarea",rows:3,width:"100%",placeholder:"请输入原因"},model:{value:t.info,callback:function(e){t.info=e},expression:"info"}}),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(e){t.innerVisible=!1}}},[t._v("取消")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.approved("不通过审核原因"==t.innerVisibleTitle?0:1)}}},[t._v("确定")])],1)],1)],1)],1)},staticRenderFns:[]};var s=a("VU/8")({name:"node-manage",data:function(){return{stateList:[{value:"",label:"全部"},{value:"2",label:"审核中"},{value:"0",label:"审核失败"},{value:"1",label:"审核成功"}],filterForm:{sacBoxAccount:"",teamName:"",status:"",curPage:1,pageSize:20},listData:{total:null,list:[]},pNBAmount:"",dialogVisibleTitle:"",dialogVisible:!1,details:{},isTeamImg:!1,isTeamDoc:!1,isMarketImg:!1,isMarketDoc:!1,teamIntroduceUrl:"",marketingIntroduceUrl:"",innerVisible:!1,innerVisibleTitle:"",info:"",fromName:""}},methods:{submitForm:function(t){this.filterForm.curPage=t,this.getList()},getList:function(){var t=this;this.$http.post("supernode/backmgr/team/detail/list",this.filterForm).then(function(e){var a=e.result.list,i=a.list,s=a.total;t.listData.list=i,t.listData.total=s,t.pNBAmount=e.result.pNBAmount,t.fromName="【"+e.result.fromName+"】 "+e.result.from})},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.filterForm.curPage=e,this.submitForm(e)},createNode:function(){this.$router.push({name:"nodeModify"})},goModifyDetail:function(t){this.$router.push({name:"nodeModify",params:t})},goDetail:function(t){this.dialogVisibleTitle="查看"+t.teamName+"节点详情",this.dialogVisible=!0,this.details=t,this.teamIntroduceUrl=t.teamIntroduceUrl?t.teamIntroduceUrl.split("supersac_doc/")[1]:"",this.marketingIntroduceUrl=t.marketingIntroduceUrl?t.marketingIntroduceUrl.split("supersac_doc/")[1]:"",this.teamIntroduceUrl?this.teamIntroduceUrl.indexOf(".jpg")>-1||this.teamIntroduceUrl.indexOf(".jpeg")>-1||this.teamIntroduceUrl.indexOf(".png")>-1?(this.isTeamImg=!0,this.isTeamDoc=!1):(this.isTeamImg=!1,this.isTeamDoc=!0):(this.isTeamImg=!1,this.isTeamDoc=!1),this.marketingIntroduceUrl?this.marketingIntroduceUrl.indexOf(".jpg")>-1||this.marketingIntroduceUrl.indexOf(".jpeg")>-1||this.marketingIntroduceUrl.indexOf(".png")>-1?(this.isMarketImg=!0,this.isMarketDoc=!1):(this.isMarketImg=!1,this.isMarketDoc=!0):(this.isMarketImg=!1,this.isMarketDoc=!1)},optStatusChange:function(t,e,a){var i=this,s=this.$createElement;this.$msgbox({title:"提示",message:s("p",null,[s("span",null,"确定执行 "),s("span",{style:"color: red"},e+" "),s("span",{style:"color: #0a52e0"},""+a.teamName),s("span",null," 吗?")]),showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",beforeClose:function(s,l,r){"confirm"===s?i.$http.post("supernode/backmgr/team/detail/lock",{teamId:a.teamId,status:t}).then(function(t){i.$notify({title:"成功",message:e+" "+a.teamName+" 成功",type:"success"}),i.getList(),r()}):r()}})},isApproved:function(t,e){this.innerVisible=!0,this.innerVisibleTitle=t?"通过审核原因":"不通过审核原因"},approved:function(t){var e=this;this.$http.post("supernode/backmgr/team/detail/audit",{status:t,teamId:this.details.teamId,info:this.info}).then(function(a){e.$notify({title:"成功",message:(t?"通过审核并分配账号给节点"+e.details.teamName:"节点"+e.details.teamName+"不通过审核")+"  处理成功",type:"success"}),e.innerVisible=!1,e.dialogVisible=!1,e.getList()})},sendEmail:function(){this.$router.push({name:"sendEmail",params:{fromName:this.fromName}})}},activated:function(){this.getList()}},i,!1,function(t){a("UigF")},null,null);e.default=s.exports},UigF:function(t,e){}});