webpackJsonp([49],{"12wl":function(t,e){},PvMZ:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l={name:"exchangeSAC",data:function(){return{dialogVisible:!1,ruleForm:{userId:"",reason:"",status:0},ruleState:[{label:"正常状态",value:0},{label:"24小时冻结",value:1},{label:"永远冻结",value:2}],filterForm:{nickName:"",phoneOrEmail:"",pageNum:1,pageSize:20,order:"desc"},coinType:"BTC",listData:{total:null,list:[]},ExList:[],totalData:[]}},methods:{exportExcel:function(){var t="";for(var e in this.filterForm)this.filterForm[e]&&"pageNum"!==e&&"pageSize"!==e&&(t+=e+"="+this.filterForm[e]+"&");var r=localStorage.getItem("SERVER_PATH")||SERVER_PATH;window.open(r+"/wallet/app/otc/backmgr/getUserRaking/export?"+t+"token="+localStorage.getItem("wallet_token"))},indexMethod:function(t){return(this.filterForm.pageNum-1)*this.filterForm.pageSize+t+1},sortChange:function(t){"ascending"==t.order?this.filterForm.order="asc":this.filterForm.order="desc","btcAmount"==t.prop?this.filterForm.coinName="BTC":this.filterForm.coinName=this.$variableCoin,this.filterForm.pageNum=1,this.getUserRaking()},dialogConfirm:function(){var t=this;this.ruleState.forEach(function(e){e.value!=t.ruleForm.status||(t.ruleForm.reason=e.label)}),this.$refs.ruleForm.validate(function(e){if(!e)return!1;t.$http.post("/wallet/app/otc/backmgr/setCustomStatus",t.ruleForm).then(function(e){t.$notify({title:"成功",message:"修改成功",type:"success"}),t.dialogVisible=!1,t.getUserRaking()})})},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.filterForm.pageNum=e,this.getUserRaking()},modify:function(t){this.$refs.ruleForm&&this.$refs.ruleForm.resetFields();var e=0;this.ruleState.forEach(function(r){r.label!=t.userStatusName||(e=r.value)}),this.ruleForm.userId=t.userId,this.ruleForm.status=e,this.dialogVisible=!0},getUserRaking:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/getUserRaking",this.filterForm).then(function(e){t.totalData=e.result.sumInfo,t.listData.list=e.result.CustomerInfoExList.list,t.ExList=e.result.sysCustomerInfoExList,t.listData.total=e.result.CustomerInfoExList.total})},detail:function(t){}},activated:function(){}},a={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"exchangeSAC"},[r("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"90px",model:t.filterForm}},[r("sac-input",{ref:"phone",attrs:{label:"账号"},model:{value:t.filterForm.phoneOrEmail,callback:function(e){t.$set(t.filterForm,"phoneOrEmail","string"==typeof e?e.trim():e)},expression:"filterForm.phoneOrEmail"}}),t._v(" "),r("sac-input",{ref:"phone",attrs:{label:"昵称"},model:{value:t.filterForm.nickName,callback:function(e){t.$set(t.filterForm,"nickName","string"==typeof e?e.trim():e)},expression:"filterForm.nickName"}}),t._v(" "),r("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(e){return t.getUserRaking()}}}),t._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.exportExcel}},[t._v("导出EXCEL")])],1)],1),t._v(" "),r("el-table",{staticClass:"ExList",attrs:{stripe:"",border:"",size:"mini",data:t.ExList}},[r("el-table-column",{attrs:{prop:"phone",label:"手机号",align:"center"}}),t._v(" "),r("el-table-column",{attrs:{prop:"nickName",label:"昵称",align:"center"}}),t._v(" "),r("el-table-column",{attrs:{prop:"usdtAmount",label:t.$variableCoin,align:"center"}}),t._v(" "),r("el-table-column",{attrs:{prop:"btcAmount",label:"BTC",align:"center"}}),t._v(" "),r("el-table-column",{attrs:{prop:"registTime",label:"时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t\t"+t._s(t.$fmtDate(e.row.registTime,"full"))+"\n\t\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"操作",width:"180px",fixed:"right",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(r){return t.$router.push({path:"/LegalCurrency/personalAssets",query:{userId:e.row.userId}})}}},[t._v("详情")])]}}])})],1),t._v(" "),r("el-table",{attrs:{stripe:"",border:"",height:"100%",size:"mini","default-sort":{prop:"usdtAmount",order:"descending"},data:t.listData.list},on:{"sort-change":t.sortChange}},[r("el-table-column",{attrs:{type:"index",label:"序号",index:t.indexMethod,align:"center"}}),t._v(" "),r("el-table-column",{attrs:{prop:"phone",label:"手机号",align:"center"}}),t._v(" "),r("el-table-column",{attrs:{prop:"nickName",label:"昵称",align:"center"}}),t._v(" "),r("el-table-column",{attrs:{prop:"usdtAmount",sortable:"custom",label:t.$variableCoin,align:"center"}}),t._v(" "),r("el-table-column",{attrs:{prop:"btcAmount",sortable:"custom",label:"BTC",align:"center"}}),t._v(" "),r("el-table-column",{attrs:{prop:"userStatusName",label:"状态",align:"center"}}),t._v(" "),r("el-table-column",{attrs:{prop:"registTime",label:"时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t\t"+t._s(t.$fmtDate(e.row.registTime,"full"))+"\n\t\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"操作",width:"180px",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(r){return t.$router.push({path:"/LegalCurrency/personalAssets",query:{userId:e.row.userId}})}}},[t._v("详情")]),t._v(" "),r("el-button",{attrs:{size:"mini",type:"warning"},on:{click:function(r){return t.modify(e.row)}}},[t._v("修改状态")])]}}])})],1),t._v(" "),r("div",{staticClass:"footer"},[r("div",{staticClass:"total"},t._l(t.totalData,function(e,l){return r("p",{key:l},[r("span",[t._v(t._s(e.coin_name))]),t._v(" :可用"+t._s(e.sumAmount)+" 冻结"+t._s(e.sumFrozenAmount))])}),0),t._v(" "),r("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}})],1),t._v(" "),r("el-dialog",{attrs:{title:"修改用户状态",visible:t.dialogVisible,width:"500"},on:{"update:visible":function(e){t.dialogVisible=e}}},[r("el-form",{ref:"ruleForm",attrs:{inline:!0,"label-width":"90px",model:t.ruleForm}},[r("el-form-item",{attrs:{label:"状态调整:",prop:"status"}},[r("el-select",{model:{value:t.ruleForm.status,callback:function(e){t.$set(t.ruleForm,"status",e)},expression:"ruleForm.status"}},t._l(t.ruleState,function(t,e){return r("el-option",{key:e,attrs:{label:t.label,value:t.value}})}),1)],1)],1),t._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:t.dialogConfirm}},[t._v("确认")])],1)],1)],1)},staticRenderFns:[]};var i=r("VU/8")(l,a,!1,function(t){r("12wl")},null,null);e.default=i.exports}});