webpackJsonp([98],{FZOI:function(e,t){},PvMZ:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=r("EaCm"),a={name:"exchangeSAC",data:function(){return{dialogVisible:!1,ruleForm:{userId:"",reason:"",status:0},ruleState:[{label:"正常状态",value:0},{label:"24小时冻结",value:1},{label:"永远冻结",value:2}],filterForm:{nickName:"",phoneOrEmail:"",pageNum:1,pageSize:20,userType:null,order:"desc"},coinType:"BTC",listData:{total:null,list:[]},ExList:[],totalData:[],userTypes:l.i}},methods:{exportExcel:function(){var e="";for(var t in this.filterForm)this.filterForm[t]&&"pageNum"!==t&&"pageSize"!==t&&(e+=t+"="+this.filterForm[t]+"&");var r=localStorage.getItem("SERVER_PATH")||SERVER_PATH;window.open(r+"/wallet/app/otc/backmgr/getUserRaking/export?"+e+"token="+localStorage.getItem("wallet_token"))},indexMethod:function(e){return(this.filterForm.pageNum-1)*this.filterForm.pageSize+e+1},sortChange:function(e){"ascending"==e.order?this.filterForm.order="asc":this.filterForm.order="desc","btcAmount"==e.prop?this.filterForm.coinName="BTC":this.filterForm.coinName=this.$variableCoin,this.filterForm.pageNum=1,this.getUserRaking()},dialogConfirm:function(){var e=this;this.ruleState.forEach(function(t){t.value!=e.ruleForm.status||(e.ruleForm.reason=t.label)}),this.$refs.ruleForm.validate(function(t){if(!t)return!1;e.$http.post("/wallet/app/otc/backmgr/setCustomStatus",e.ruleForm).then(function(t){e.$notify({title:"成功",message:"修改成功",type:"success"}),e.dialogVisible=!1,e.getUserRaking()})})},getPaginationChange:function(e,t){this.filterForm.pageSize=e,this.filterForm.pageNum=t,this.getUserRaking()},modify:function(e){this.$refs.ruleForm&&this.$refs.ruleForm.resetFields();var t=0;this.ruleState.forEach(function(r){r.label!=e.userStatusName||(t=r.value)}),this.ruleForm.userId=e.userId,this.ruleForm.status=t,this.dialogVisible=!0},getUserRaking:function(){var e=this;this.$http.post("/wallet/app/otc/backmgr/getUserRaking",this.filterForm).then(function(t){e.totalData=t.result.sumInfo,e.listData.list=t.result.CustomerInfoExList.list,e.ExList=t.result.sysCustomerInfoExList,e.listData.total=t.result.CustomerInfoExList.total})},detail:function(e){}},activated:function(){}},i={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"exchangeSAC"},[r("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"90px",model:e.filterForm,size:"mini"}},[r("sac-input",{ref:"phone",attrs:{label:"账号"},model:{value:e.filterForm.phoneOrEmail,callback:function(t){e.$set(e.filterForm,"phoneOrEmail","string"==typeof t?t.trim():t)},expression:"filterForm.phoneOrEmail"}}),e._v(" "),r("sac-input",{ref:"phone",attrs:{label:"昵称"},model:{value:e.filterForm.nickName,callback:function(t){e.$set(e.filterForm,"nickName","string"==typeof t?t.trim():t)},expression:"filterForm.nickName"}}),e._v(" "),r("el-form-item",{attrs:{label:"用户类型："}},[r("el-select",{staticStyle:{width:"178px"},attrs:{placeholder:"选择订单状态",clearable:""},model:{value:e.filterForm.userType,callback:function(t){e.$set(e.filterForm,"userType",t)},expression:"filterForm.userType"}},[r("el-option",{attrs:{value:null,label:"全部"}}),e._v(" "),e._l(e.userTypes,function(e,t){return r("el-option",{key:t,attrs:{value:t,label:e}})})],2)],1),e._v(" "),r("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(t){return e.getUserRaking()}}}),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.exportExcel}},[e._v("导出EXCEL")])],1)],1),e._v(" "),r("el-table",{attrs:{stripe:"",border:"",height:"100%",size:"mini","default-sort":{prop:"usdtAmount",order:"descending"},data:e.listData.list},on:{"sort-change":e.sortChange}},[r("el-table-column",{attrs:{type:"index",label:"序号",index:e.indexMethod,align:"center"}}),e._v(" "),r("el-table-column",{attrs:{prop:"phone",label:"手机号",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{prop:"nickName",label:"昵称",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{label:"用户类型",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._f("userTypesFilter")(t.row.userType)))]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"usdtAmount",sortable:"custom",label:e.$variableCoin,align:"center"}}),e._v(" "),r("el-table-column",{attrs:{prop:"btcAmount",sortable:"custom",label:"BTC",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{prop:"userStatusName",label:"状态",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{prop:"registTime",label:"时间",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n\t\t\t\t\t"+e._s(e.$fmtDate(t.row.registTime,"full"))+"\n\t\t\t\t")]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"操作",width:"180px",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(r){return e.$router.push({path:"/LegalCurrency/personalAssets",query:{userId:t.row.userId}})}}},[e._v("详情")]),e._v(" "),r("el-button",{attrs:{size:"mini",type:"warning"},on:{click:function(r){return e.modify(t.row)}}},[e._v("修改状态")])]}}])})],1),e._v(" "),r("div",{staticClass:"footer"},[r("div",{staticClass:"total"},e._l(e.totalData,function(t,l){return r("p",{key:l},[r("span",{staticClass:"coinName"},[e._v(e._s(t.coin_name))]),e._v(" :可用"+e._s(t.sumAmount)+" "),r("span",{directives:[{name:"show",rawName:"v-show",value:"RMT"!==t.coin_name,expression:"item.coin_name!=='RMT'"}]},[e._v("冻结"+e._s(t.sumFrozenAmount))])])}),0),e._v(" "),r("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.filterForm.pageSize,"current-page":e.filterForm.pageNum},on:{handleChange:e.getPaginationChange}})],1),e._v(" "),r("el-dialog",{attrs:{title:"修改用户状态",visible:e.dialogVisible,width:"500"},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("el-form",{ref:"ruleForm",attrs:{inline:!0,"label-width":"90px",model:e.ruleForm}},[r("el-form-item",{attrs:{label:"状态调整:",prop:"status"}},[r("el-select",{model:{value:e.ruleForm.status,callback:function(t){e.$set(e.ruleForm,"status",t)},expression:"ruleForm.status"}},e._l(e.ruleState,function(e,t){return r("el-option",{key:t,attrs:{label:e.label,value:e.value}})}),1)],1)],1),e._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:e.dialogConfirm}},[e._v("确认")])],1)],1)],1)},staticRenderFns:[]};var o=r("C7Lr")(a,i,!1,function(e){r("FZOI")},null,null);t.default=o.exports}});