webpackJsonp([81],{Y4PS:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=l("Gu7T"),r=l.n(a),s=l("s0MJ"),i=l("EaCm"),o=(l("NYxO"),{name:"collapse-record",data:function(){return{stateData2:[{label:"失败",value:"FAIL",key:0},{label:"成功",value:"SUCCESS",key:1},{label:"待审核",value:"AUDITING",key:2},{label:"审核失败",value:"AUDIT_FAIL",key:3},{label:"处理中",value:"PROCESSING",key:5}],stateData:[{label:"成功",value:"SUCCESS"},{label:"审核失败",value:"AUDIT_FAIL"}],coinData:[],dialogVisible:!1,dialogTitle:"编辑",address:"16UwLL9Risc3QfvKofHmBQ7wMtjvM",ruleForm:{coinId:"",id:"",status:"SUCCESS",amount:"",txId:"",refuseReason:""},rules:{coinId:[{required:!0,message:"请选择币种",trigger:"change"}],status:[{required:!0,message:"请选择状态",trigger:"change"}],amount:[{required:!0,message:"请输入充值金额",trigger:"change"}],refuseReason:[{required:!0,message:"请输入拒绝理由",trigger:"change"}]},filterForm:{coinId:"",type:"",status:"",startDate:"",endDate:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},moneyList:[],selectedDate:[],transactionType:i.e,transferQueryStatus:i.f,typeData:[{value:"",label:"全部"},{value:"0",label:"未知类型"},{value:"1",label:"用户归拢到钱包"},{value:"2",label:"热钱包归拢到冷钱包"},{value:"3",label:"冷钱包到热钱包"},{value:"4",label:"热钱包转到用户"}],statusData:[{value:"",label:"全部"},{label:"失败",value:"FAIL"},{label:"成功",value:"SUCCESS"},{label:"待审核",value:"AUDITING"},{label:"审核失败",value:"AUDIT_FAIL"},{label:"处理中",value:"PROCESSING"}]}},computed:{coinList:function(e){var t=this.$store.state.coinList;return this.isAll?(this.selected="",[{value:"",label:"全部"}].concat(r()(t))):(this.selected=1,t)}},methods:{dialogConfirm:function(){var e=this;this.$refs.ruleForm.validate(function(t){if(!t)return!1;e.$http.post("cloud/asset/open/updateCollectionRecd",e.ruleForm).then(function(t){e.$notify({title:"成功",message:"编辑成功",type:"success"}),e.dialogVisible=!1,e.getbill()})})},exportExcel:function(){var e="";for(var t in this.filterForm)e+=t+"="+this.filterForm[t]+"&";location.href=SERVER_PATH+"wallet/backmgr/trade/downTradeList?"+e+"token="+localStorage.getItem("wallet_token")},edit:function(e){var t=this;this.$refs.ruleForm&&this.$refs.ruleForm.resetFields(),this.ruleForm.coinId="",this.ruleForm.txId=e.txId,this.ruleForm.refuseReason=e.refuseReason,this.ruleForm.amount=e.realAmount,this.ruleForm.id=e.recdId,this.ruleForm.status="SUCCESS",this.coinList.filter(function(l){l.coinName!=e.coinName||(t.ruleForm.coinId=l.coinId)}),this.dialogVisible=!0},submitForm:function(e){this.filterForm.pageNum=e,this.getbill()},getPaginationChange:function(e,t){this.filterForm.pageSize=e,this.submitForm(t)},getbill:function(){var e=this;this.filterForm.startDate=this.selectedDate&&this.selectedDate[0],this.filterForm.endDate=this.selectedDate&&this.selectedDate[1],this.$http.post("cloud/asset/open/getCollectionRecd",this.filterForm).then(function(t){var l=t.result.list,a=l.list,r=l.total;e.listData.list=a,e.listData.total=r})}},activated:function(){var e=Object(s.a)(),t=Object(s.a)((new Date).getTime()-1296e6);this.selectedDate=[t,e],this.getbill()}}),n={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"collapse-record"},[l("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"120px",model:e.filterForm}},[l("div",{staticClass:"title"},[l("sac-coin",{ref:"coinId",model:{value:e.filterForm.coinId,callback:function(t){e.$set(e.filterForm,"coinId",t)},expression:"filterForm.coinId"}}),e._v(" "),l("sac-select",{ref:"tradeType",attrs:{label:"交易类型",dataList:e.typeData},model:{value:e.filterForm.type,callback:function(t){e.$set(e.filterForm,"type",t)},expression:"filterForm.type"}}),e._v(" "),l("sac-select",{ref:"status",attrs:{label:"状态",dataList:e.statusData},model:{value:e.filterForm.status,callback:function(t){e.$set(e.filterForm,"status",t)},expression:"filterForm.status"}}),e._v(" "),l("sac-date",{ref:"selectedDate",attrs:{label:"日　　期"},model:{value:e.selectedDate,callback:function(t){e.selectedDate=t},expression:"selectedDate"}}),e._v(" "),l("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(t){return e.submitForm(1)}}})],1)]),e._v(" "),l("div",{staticClass:"moneyList"},e._l(e.moneyList,function(t,a){return l("el-tag",{key:a},[e._v(e._s(t.name)+"："+e._s(t.value))])}),1),e._v(" "),l("sac-table",{attrs:{data:e.listData.list}},[l("el-table-column",{attrs:{align:"center",prop:"recdId",label:"序号"}}),e._v(" "),l("el-table-column",{attrs:{align:"center",prop:"type",label:"交易类型"}}),e._v(" "),l("el-table-column",{attrs:{align:"center",prop:"coinName",label:"转账币种"}}),e._v(" "),l("el-table-column",{attrs:{align:"center",prop:"auditAmount",label:"申请金额"}}),e._v(" "),l("el-table-column",{attrs:{align:"center",prop:"realAmount",label:"转账金额"}}),e._v(" "),l("el-table-column",{attrs:{align:"center",prop:"collectFee",label:"手续费"}}),e._v(" "),l("el-table-column",{attrs:{align:"center",prop:"createTime",label:"创建时间"}}),e._v(" "),l("el-table-column",{attrs:{align:"center",prop:"updateTime",label:"编辑完成时间"}}),e._v(" "),l("el-table-column",{attrs:{align:"center",prop:"status",label:"状态"}}),e._v(" "),l("el-table-column",{attrs:{align:"center",prop:"txId",label:"txid或拒绝理由"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.txId?l("span",[e._v(e._s(t.row.txId))]):l("span",[e._v(e._s(t.row.refuseReason))])]}}])}),e._v(" "),l("el-table-column",{attrs:{align:"center",prop:"timeWarning",label:"时间告警",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.timeWarning?l("span",[e._v("无")]):l("span",{staticStyle:{background:"#F56C6C",color:"#fff",padding:"4 0px","border-radius":"5px",display:"block"}},[e._v("编辑告警")])]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"操作",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[2==t.row.collectStatus?l("el-button",{attrs:{plain:"",size:"small"},nativeOn:{click:function(l){return e.edit(t.row)}}},[e._v("编辑\n          ")]):e._e()]}}])})],1),e._v(" "),l("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.filterForm.pageSize,"current-page":e.filterForm.pageNum},on:{handleChange:e.getPaginationChange}}),e._v(" "),l("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogVisible,width:"40%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[l("el-form",{ref:"ruleForm",attrs:{inline:!0,"label-width":"90px",rules:e.rules,model:e.ruleForm}},[l("el-form-item",{attrs:{label:"币 种:",prop:"coinId"}},[l("el-select",{attrs:{placeholder:"请选择币种"},model:{value:e.ruleForm.coinId,callback:function(t){e.$set(e.ruleForm,"coinId",t)},expression:"ruleForm.coinId"}},e._l(e.coinList,function(e,t){return l("el-option",{key:t,attrs:{label:e.coinName,value:e.coinId}})}),1)],1),e._v(" "),l("el-form-item",{staticClass:"item-width-all",staticStyle:{width:"100%"},attrs:{label:"充币地址:"}},[l("div",[l("span",[e._v("热钱包("+e._s(e.address)+")")])])]),e._v(" "),l("el-form-item",{staticClass:"radio-box",attrs:{label:"状态:",prop:"status"}},[l("el-radio-group",{model:{value:e.ruleForm.status,callback:function(t){e.$set(e.ruleForm,"status",t)},expression:"ruleForm.status"}},e._l(e.stateData,function(t,a){return l("el-radio",{key:a,attrs:{label:t.value}},[e._v(e._s(t.label))])}),1)],1),e._v(" "),l("el-form-item",{attrs:{label:"充值金额:",prop:"amount"}},[l("el-input",{attrs:{placeholder:"请输入充值金额"},model:{value:e.ruleForm.amount,callback:function(t){e.$set(e.ruleForm,"amount",t)},expression:"ruleForm.amount"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"txid:",prop:"txId"}},[l("el-input",{attrs:{placeholder:"请输入txid"},model:{value:e.ruleForm.txId,callback:function(t){e.$set(e.ruleForm,"txId",t)},expression:"ruleForm.txId"}})],1),e._v(" "),"AUDIT_FAIL"==e.ruleForm.status?l("el-form-item",{attrs:{label:"拒绝理由:",prop:"refuseReason"}},[l("el-input",{attrs:{type:"textarea",placeholder:"请输入拒绝理由"},model:{value:e.ruleForm.refuseReason,callback:function(t){e.$set(e.ruleForm,"refuseReason",t)},expression:"ruleForm.refuseReason"}})],1):e._e()],1),e._v(" "),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:e.dialogConfirm}},[e._v("确定")])],1)],1)],1)},staticRenderFns:[]};var u=l("VU/8")(o,n,!1,function(e){l("z+UY")},null,null);t.default=u.exports},"z+UY":function(e,t){}});