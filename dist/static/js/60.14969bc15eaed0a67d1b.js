webpackJsonp([60],{"Ao/1":function(t,e){},f1g4:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=o("EaCm"),l={name:"exchangeSAC",data:function(){return{dialogVisible:!1,ruleForm:{userId:"",reason:"",status:0},ruleState:[{label:"正常状态",value:0},{label:"24小时冻结",value:1},{label:"永远冻结",value:2}],filterForm:{nickName:"",phoneOrEmail:"",phone:"",pageNum:1,pageSize:20,account:"",coinName:"RMT",order:"desc",userType:null},coinType:"BTC",listData:{total:null,list:[]},ExList:[],rmtAmount:0,rmtFrozenAmount:0,eosAmount:0,eosFrozenAmount:0,btcAmount:0,btcFrozenAmount:0,ethAmount:0,ethFrozenAmount:0,userTypes:r.h}},methods:{exportExcel:function(){var t="";for(var e in this.filterForm)this.filterForm[e]&&"pageNum"!==e&&"pageSize"!==e&&(t+=e+"="+this.filterForm[e]+"&");var o=localStorage.getItem("SERVER_PATH")||SERVER_PATH;window.open(o+"/wallet/backmgr/personalRanking/export?"+t+"token="+localStorage.getItem("wallet_token"))},indexMethod:function(t){return(this.filterForm.pageNum-1)*this.filterForm.pageSize+t+1},sortChange:function(t){"ascending"==t.order?this.filterForm.order="asc":this.filterForm.order="desc","btcAmount"==t.prop?this.filterForm.coinName="BTC":this.filterForm.coinName="RMT",this.filterForm.pageNum=1,this.getUserRaking()},dialogConfirm:function(){var t=this;this.ruleState.forEach(function(e){e.value!=t.ruleForm.status||(t.ruleForm.reason=e.label)}),this.$refs.ruleForm.validate(function(e){if(!e)return!1;t.$http.post("/wallet/app/otc/backmgr/setCustomStatus",t.ruleForm).then(function(e){t.$notify({title:"成功",message:"修改成功",type:"success"}),t.dialogVisible=!1,t.getUserRaking()})})},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.filterForm.pageNum=e,this.getUserRaking()},modify:function(t){this.$refs.ruleForm&&this.$refs.ruleForm.resetFields();var e=0;this.ruleState.forEach(function(o){o.label!=t.userStatusName||(e=o.value)}),this.ruleForm.userId=t.userId,this.ruleForm.status=e,this.dialogVisible=!0},getUserRaking:function(){var t=this;this.$http.post("/wallet/backmgr/personalRanking",this.filterForm).then(function(e){t.listData.list=e.result.pageInfo.list,t.ExList=e.result.sysList,t.listData.total=e.result.pageInfo.total,t.rmtAmount=e.result.rmtAmount,t.rmtFrozenAmount=e.result.rmtFrozenAmount,t.eosAmount=e.result.eosAmount,t.eosFrozenAmount=e.result.eosFrozenAmount,t.btcAmount=e.result.btcAmount,t.btcFrozenAmount=e.result.btcFrozenAmount,t.ethAmount=e.result.ethAmount,t.ethFrozenAmount=e.result.ethFrozenAmount})}},activated:function(){this.getUserRaking()}},n={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"exchangeSAC"},[o("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"105px",model:t.filterForm,size:"mini"}},[o("sac-input",{ref:"phone",attrs:{label:"账号/用户编号"},model:{value:t.filterForm.account,callback:function(e){t.$set(t.filterForm,"account","string"==typeof e?e.trim():e)},expression:"filterForm.account"}}),t._v(" "),o("el-form-item",{attrs:{label:"用户类型："}},[o("el-select",{staticStyle:{width:"178px"},attrs:{placeholder:"选择订单状态",clearable:""},model:{value:t.filterForm.userType,callback:function(e){t.$set(t.filterForm,"userType",e)},expression:"filterForm.userType"}},[o("el-option",{attrs:{value:null,label:"全部"}}),t._v(" "),t._l(t.userTypes,function(t,e){return o("el-option",{key:e,attrs:{value:e,label:t}})})],2)],1),t._v(" "),o("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(e){return t.getUserRaking()}}}),t._v(" "),o("el-form-item",[o("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.exportExcel}},[t._v("导出EXCEL")])],1)],1),t._v(" "),o("el-table",{attrs:{stripe:"",border:"",height:"100%",size:"mini","default-sort":{prop:"rmtAmount",order:"descending"},data:t.listData.list},on:{"sort-change":t.sortChange}},[o("el-table-column",{attrs:{align:"center",type:"index",label:"序号",index:t.indexMethod}}),t._v(" "),o("el-table-column",{attrs:{prop:"phone",label:"账号",align:"center"}}),t._v(" "),o("el-table-column",{attrs:{prop:"nick_name",label:"用户编号",align:"center"}}),t._v(" "),o("el-table-column",{attrs:{prop:"nick_name",label:"用户类型",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("userTypesFilter")(e.row.user_type)))]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"rmtAmount",sortable:"custom",label:t.$variableCoin},scopedSlots:t._u([{key:"default",fn:function(e){return o("div",{staticClass:"scope"},[o("p",[t._v("可用:"+t._s(e.row.usdtAmount))]),t._v(" "),o("p",[t._v("冻结:"+t._s(e.row.usdtFrozenAmount))])])}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"btcAmount",sortable:"custom",label:"BTC"},scopedSlots:t._u([{key:"default",fn:function(e){return o("div",{staticClass:"scope"},[o("p",[t._v("可用:"+t._s(e.row.btcAmount))]),t._v(" "),o("p",[t._v("冻结:"+t._s(e.row.btcFrozenAmount))])])}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"ethAmount",sortable:"custom",label:"ETH"},scopedSlots:t._u([{key:"default",fn:function(e){return o("div",{staticClass:"scope"},[o("p",[t._v("可用:"+t._s(e.row.ethAmount))]),t._v(" "),o("p",[t._v("冻结:"+t._s(e.row.ethFrozenAmount))])])}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"eosAmount",sortable:"custom",label:"EOS"},scopedSlots:t._u([{key:"default",fn:function(e){return o("div",{staticClass:"scope"},[o("p",[t._v("可用:"+t._s(e.row.eosAmount))]),t._v(" "),o("p",[t._v("冻结:"+t._s(e.row.eosFrozenAmount))])])}}])}),t._v(" "),o("el-table-column",{attrs:{label:"操作",width:"80px",fixed:"right",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{size:"mini"},on:{click:function(o){return t.$router.push({path:"/LegalCurrency/personalAssets",query:{userId:e.row.user_id}})}}},[t._v("详情")])]}}])})],1),t._v(" "),o("div",{staticClass:"load-more"},[o("p",{staticClass:"total"},[o("span",[t._v(t._s(this.$variableCoin)+"：")]),t._v(" 可用"+t._s(t.rmtAmount)+"   冻结"+t._s(t.rmtFrozenAmount)+"    "),o("span",[t._v("BTC：")]),t._v(" 可用"+t._s(t.btcAmount)+"    冻结"+t._s(t.btcFrozenAmount)+"      "),o("span",[t._v("ETH：")]),t._v("可用"+t._s(t.ethAmount)+"   冻结"+t._s(t.ethFrozenAmount)+"    "),o("span",[t._v("EOS：")]),t._v("可用"+t._s(t.eosAmount)+"   冻结"+t._s(t.eosFrozenAmount)+" ")]),t._v(" "),o("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length > 0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}})],1),t._v(" "),o("el-dialog",{attrs:{title:"修改用户状态",visible:t.dialogVisible,width:"500"},on:{"update:visible":function(e){t.dialogVisible=e}}},[o("el-form",{ref:"ruleForm",attrs:{inline:!0,"label-width":"90px",model:t.ruleForm}},[o("el-form-item",{attrs:{label:"状态调整:",prop:"status"}},[o("el-select",{model:{value:t.ruleForm.status,callback:function(e){t.$set(t.ruleForm,"status",e)},expression:"ruleForm.status"}},t._l(t.ruleState,function(t,e){return o("el-option",{key:e,attrs:{label:t.label,value:t.value}})}),1)],1)],1),t._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.dialogConfirm}},[t._v("确认")])],1)],1)],1)},staticRenderFns:[]};var s=o("C7Lr")(l,n,!1,function(t){o("Ao/1")},null,null);e.default=s.exports}});