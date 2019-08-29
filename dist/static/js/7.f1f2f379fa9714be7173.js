webpackJsonp([7],{ArvY:function(e,t){},"PjX/":function(e,t){},TAgC:function(e,t){},ctOh:function(e,t){},tZzq:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l={props:{tableData:{type:Array,default:function(){return[]}},btnHandle:{type:Function,default:function(){}}},methods:{handleClick:function(e){}},filters:{recdStatusMap:function(e){switch(e){case 0:return"失败";case 1:return"成功";case 2:return"等待";case 3:return"审核中";case 4:return"审核不通过";default:return e}}},data:function(){return{}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"withdraw-check-table-cpt"},[a("div",{staticClass:"table-title"},[a("h4",[e._v("审核列表")]),e._v(" "),a("div",{staticClass:"btn-wrap"},[a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-circle-plus"},on:{click:function(t){return e.$emit("hideDialogMR",!0)}}},[e._v("手动录单")])],1)]),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",size:"mini"}},[a("el-table-column",{attrs:{prop:"createTime",label:"时间",width:"140",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"account",label:"账号",width:"120",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"coinName",label:"币种",width:"80",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"amount",label:"数量",width:"100",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"blockFee",label:"手续费(BTC)",width:"100",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"recdStatus",label:"状态",width:"80",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("recdStatusMap")(t.row.recdStatus)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"fromAddr",label:"From地址",width:"150",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"toAddr",label:"To地址",width:"150",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"orderId",label:"订单号",width:"150",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"txId",label:"TXID",width:"150",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("a",{attrs:{href:"https://www.omniexplorer.info/search/"+t.row.txId,target:"_blank"}},[e._v(e._s(t.row.txId))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"userRemark",label:"备注",width:"150",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"sysRemark",label:"上链备注",width:"150",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"280",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"success",size:"mini",disabled:2!==t.row.recdStatus},on:{click:function(a){return e.btnHandle("auto",t.row)}}},[e._v("自动放行")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini",disabled:2!==t.row.recdStatus},on:{click:function(a){return e.btnHandle("manual",t.row)}}},[e._v("手动放行")]),e._v(" "),a("el-button",{attrs:{type:"danger",size:"mini",disabled:2!==t.row.recdStatus},on:{click:function(a){return e.btnHandle("reject",t.row)}}},[e._v("拒绝")])]}}])})],1)],1)},staticRenderFns:[]};var i=a("C7Lr")(l,r,!1,function(e){a("ArvY")},"data-v-72dd4ac9",null).exports,o={props:{coins:{default:[],type:Array}},data:function(){return{types:[],pickerOptions:{disabledDate:function(e){return e.getTime()>Date.now()},shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}},{text:"最近半年",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-15552e6),e.$emit("pick",[a,t])}},{text:"最近一年",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-31536e6),e.$emit("pick",[a,t])}}]},filter:{}}},methods:{queryData:function(){this.$emit("queryData",!0)},clear:function(){this.$emit("resetFilter")},fetchFilter:function(){return this.filter}}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-form",{ref:"form",attrs:{model:e.filter,"label-width":"100px",size:"mini",inline:""}},[a("el-form-item",{attrs:{label:"创建时间："}},[a("el-date-picker",{attrs:{id:"createtime",type:"daterange",align:"right","value-format":"yyyy-MM-dd","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions},model:{value:e.filter.create_time,callback:function(t){e.$set(e.filter,"create_time",t)},expression:"filter.create_time"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"币种："}},[a("el-select",{staticStyle:{width:"185px"},attrs:{clearable:""},model:{value:e.filter.coinName,callback:function(t){e.$set(e.filter,"coinName",t)},expression:"filter.coinName"}},[a("el-option",{attrs:{value:null,label:"全部"}}),e._v(" "),e._l(e.coins,function(e,t){return a("el-option",{key:t,attrs:{value:e.coinName,label:e.coinName}})})],2)],1),e._v(" "),a("el-form-item",{attrs:{label:"订单状态："}},[a("el-select",{staticStyle:{width:"185px"},attrs:{placeholder:"选择订单状态",clearable:""},model:{value:e.filter.recdStatus,callback:function(t){e.$set(e.filter,"recdStatus",t)},expression:"filter.recdStatus"}},[a("el-option",{attrs:{value:null,label:"全部"}}),e._v(" "),e._l(e.$config.recdStatus,function(e,t){return a("el-option",{key:t,attrs:{value:t,label:e}})})],2)],1),e._v(" "),a("el-form-item",{attrs:{label:"地址："}},[a("el-input",{attrs:{placeholder:"搜索地址"},model:{value:e.filter.address,callback:function(t){e.$set(e.filter,"address",t)},expression:"filter.address"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"订单号："}},[a("el-input",{attrs:{placeholder:"搜索订单号"},model:{value:e.filter.orderId,callback:function(t){e.$set(e.filter,"orderId",t)},expression:"filter.orderId"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"TXID："}},[a("el-input",{attrs:{placeholder:"搜索TXID"},model:{value:e.filter.txId,callback:function(t){e.$set(e.filter,"txId",t)},expression:"filter.txId"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"ID："}},[a("el-input",{attrs:{placeholder:"ID"},model:{value:e.filter.id,callback:function(t){e.$set(e.filter,"id",t)},expression:"filter.id"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"账号："}},[a("el-input",{attrs:{placeholder:"搜索账号"},model:{value:e.filter.account,callback:function(t){e.$set(e.filter,"account",t)},expression:"filter.account"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"类型："}},[a("el-select",{staticStyle:{width:"185px"},attrs:{placeholder:"选择类型",clearable:""},model:{value:e.filter.transType,callback:function(t){e.$set(e.filter,"transType",t)},expression:"filter.transType"}},[a("el-option",{attrs:{value:"",label:"全部"}}),e._v(" "),e._l(e.$config.fundTypes,function(e,t){return a("el-option",{key:t,attrs:{value:t,label:e}})})],2)],1),e._v(" "),a("el-form-item",[a("el-button",{staticStyle:{"margin-left":"60px"},attrs:{type:"primary"},on:{click:e.queryData}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.clear}},[e._v("清空")])],1)],1)},staticRenderFns:[]};var s=a("C7Lr")(o,n,!1,function(e){a("ctOh")},"data-v-66073571",null).exports,c={examine:[{label:"时间",prop:"createTime",minWidth:"180px",type:"time",format:"YYYY-M-D HH:mm:ss",overflowTip:!0,selectHeader:!0},{label:"账号",prop:"account",minWidth:"100px",overflowTip:!0,selectHeader:!0},{label:"币种",prop:"coinName",minWidth:"90px",overflowTip:!0,selectHeader:!0},{label:"数量",prop:"amount",minWidth:"90px",overflowTip:!0,selectHeader:!0},{label:"手续费",prop:"fee",minWidth:"110px",overflowTip:!0,selectHeader:!0},{label:"状态",prop:"recdStatus",minWidth:"90px",overflowTip:!0,selectHeader:!0,type:"config|recdStatus"},{label:"From地址",prop:"fromAddr",minWidth:"130px",overflowTip:!0,selectHeader:!0},{label:"To地址",prop:"toAddr",minWidth:"120px",overflowTip:!0,selectHeader:!0},{label:"订单号",prop:"orderId",minWidth:"150px",overflowTip:!0,selectHeader:!0},{label:"TXID",prop:"txId",minWidth:"100px",overflowTip:!0,selectHeader:!0},{label:"备注",prop:"userRemark",minWidth:"90px",overflowTip:!0,selectHeader:!0},{label:"上链备注",prop:"sysRemark",minWidth:"120px",overflowTip:!0,selectHeader:!0}],monitoring:[{label:"时间",prop:"createTime",type:"time",format:"YYYY-M-D HH:mm:ss",minWidth:"150px",overflowTip:!0,selectHeader:!0},{label:"转账类型",prop:"transTypeStr",minWidth:"150px",selectHeader:!0},{label:"币种",prop:"coinName",minWidth:"100px",selectHeader:!0},{label:"来源地址",prop:"fromAddr",minWidth:"200px",overflowTip:!0,selectHeader:!0},{label:"目标地址",prop:"toAddr",minWidth:"200px",selectHeader:!0},{label:"到账数量",prop:"blockAmount",minWidth:"120px",overflowTip:!0,selectHeader:!0},{label:"手续费",prop:"blockFee",minWidth:"110px",overflowTip:!0,selectHeader:!0},{label:"TXID",prop:"txId",minWidth:"100px",overflowTip:!0,selectHeader:!0},{label:"操作人",prop:"sysUserId",overflowTip:!0,minWidth:"110px",selectHeader:!0}],platformAccount:[{label:"序号",prop:"index"},{label:"账号",prop:"account"},{label:"昵称",prop:"address"},{label:"USTD",prop:"ustd"},{label:"注册时间",prop:"regist"}],userAccount:[{label:"排名",prop:"rank"},{label:"账号",prop:"account"},{label:"昵称",prop:"address"},{label:"USTD",prop:"ustd"},{label:"注册时间",prop:"regist"}]},d={props:["showDialog","type","item"],data:function(){return{title:"",form:{remark:"",txid:"",blockAmount:"",blockFee:"",reason:""}}},computed:{visible:{get:function(){return this.showDialog},set:function(e){this.$emit("hideDialog",e)}}},methods:{openHandle:function(){this.title={auto:"自动放行",manual:"手动放行",reject:"拒绝订单"}[this.type],this.form={remark:"",txid:"",blockAmount:"",blockFee:"",reason:""}},confirm:function(){var e=this,t={recdId:this.item.recdId},a=this.form;"auto"===this.type?(t.recdStatus="SUCCESS",t.sysRemark=a.remark,this.$http.get("/backmgr/auditOrder",t).then(function(t){0===t.ret?e.$notify.success({title:"提示",message:"放行成功"}):e.$notify.error({title:"提示",message:"放行失败"})}).catch(function(e){})):"manual"===this.type?(t.txId=a.txId,t.blockAmount=a.blockAmount,t.blockFee=a.blockFee,this.$http.get("/backmgr/manualAudit",t).then(function(t){0===t.data.ret?e.$notify.success({title:"提示",message:"放行成功"}):e.$notify.error({title:"提示",message:"放行失败"})}).catch(function(e){})):"reject"===this.type&&(t.recdStatus="AUDIT_FAIL",t.sysRemark=a.reason,this.$http.get("/backmgr/auditOrder",t).then(function(t){200===t.code?e.$notify.success({title:"提示",message:"拒绝成功"}):e.$notify.error({title:"提示",message:"拒绝失败"})}).catch(function(e){}))}}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-dialog",{attrs:{visible:e.visible,title:e.title,width:"400px"},on:{"update:visible":function(t){e.visible=t},open:e.openHandle}},["auto"===e.type?[a("center",{staticStyle:{margin:"0 0 10px 0"}},[e._v("\n                备注\n            ")]),e._v(" "),a("el-input",{attrs:{type:"textarea",placeholder:"请输入备注信息"},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})]:"manual"===e.type?[a("el-form",{attrs:{model:e.form,"label-width":"110px"}},[a("el-form-item",{attrs:{label:"TXID",prop:"txid："}},[a("el-input",{attrs:{size:"small",placeholder:"请输入TXID"},model:{value:e.form.txid,callback:function(t){e.$set(e.form,"txid",t)},expression:"form.txid"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"实际到账金额：",prop:"blockAmount"}},[a("el-input",{attrs:{size:"small",placeholder:"请输入实际到账金额"},model:{value:e.form.blockAmount,callback:function(t){e.$set(e.form,"blockAmount",t)},expression:"form.blockAmount"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"上链手续费：",prop:"blockFee"}},[a("el-input",{attrs:{size:"small",placeholder:"请输入上链手续费"},model:{value:e.form.blockFee,callback:function(t){e.$set(e.form,"blockFee",t)},expression:"form.blockFee"}})],1)],1)]:"reject"===e.type?[a("p",{staticStyle:{"margin-bottom":"10px","font-size":"16px"}},[a("span",{staticClass:"label"},[e._v("\n                    请输入拒绝理由:\n                ")])]),e._v(" "),a("p",[a("el-input",{attrs:{type:"textarea"},model:{value:e.form.reason,callback:function(t){e.$set(e.form,"reason",t)},expression:"form.reason"}})],1)]:e._e(),e._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.confirm}},[e._v(e._s("reject"===e.type?"拒绝":"通过"))]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.visible=!1}}},[e._v("取消")])],1)],2)],1)},staticRenderFns:[]};var p=a("C7Lr")(d,u,!1,function(e){a("PjX/")},null,null).exports,m={props:{showDialogMR:{type:Boolean,default:!1}},data:function(){return{form:{sysUserId:"123456",txId:"",coinName:"USDT",toAddr:"",fromAddr:"",blockFee:"0",blockAmount:""}}},methods:{manualDo:function(){var e=this;for(var t in this.form)if(""===this.form[t])return void this.$notify.error({title:"提示",message:"数据填写不完整"});this.$http.get("/backmgr/manual",this.form).then(function(t){200==t.code?(e.$notify.success({title:"提示",message:"录入成功！"}),e.dialogVisible=!1,e.$emit("getData")):e.$notify.error({title:"提示",message:t.msg})})}},computed:{dialogVisible:{get:function(){return this.showDialogMR},set:function(e){this.$emit("hideDialogMR",e)}}}},f={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:"手动录单",visible:e.dialogVisible,width:"30%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px",size:"mini"}},[a("el-form-item",{attrs:{label:"币种"}},[a("el-select",{attrs:{placeholder:"请选择币种"},model:{value:e.form.coinName,callback:function(t){e.$set(e.form,"coinName",t)},expression:"form.coinName"}},[a("el-option",{attrs:{label:"USDT",value:"USDT"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"TXID"}},[a("el-input",{model:{value:e.form.txId,callback:function(t){e.$set(e.form,"txId","string"==typeof t?t.trim():t)},expression:"form.txId"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"from地址"}},[a("el-input",{model:{value:e.form.fromAddr,callback:function(t){e.$set(e.form,"fromAddr","string"==typeof t?t.trim():t)},expression:"form.fromAddr"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"to地址"}},[a("el-input",{model:{value:e.form.toAddr,callback:function(t){e.$set(e.form,"toAddr","string"==typeof t?t.trim():t)},expression:"form.toAddr"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"数量"}},[a("el-input",{model:{value:e.form.blockAmount,callback:function(t){e.$set(e.form,"blockAmount","string"==typeof t?t.trim():t)},expression:"form.blockAmount"}},[a("template",{slot:"append"},[e._v("USDT")])],2)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.manualDo}},[e._v("确 定")])],1)],1)},staticRenderFns:[]},h={name:"examine",data:function(){return{data:{list:[]},blockSumReAndWdResultDto:{},loading:!1,showDialog:!1,showDialogMR:!1,type:"auto",item:{},coins:[],columns:c.examine,selectConfig:{seleteStyle:{color:"#909399"},selectIconStyle:{color:"#07c4a8"}},tableHeight:"calc(100% - 304px)",activeNames:"filter",pageNum:1,pageSize:20,total:0}},methods:{handleSizeChange:function(e){this.pageSize=e,this.getData()},handleCurrentChange:function(e){this.pageNum=e,this.getData()},handleChange:function(e){this.tableHeight=e.length?"calc(100% - 304px)":"calc(100% - 76px)"},btnHandle:function(e,t,a){switch(this.item=t,e){case"auto":this.type="auto",this.showDialog=!0;break;case"manual":this.type="manual",this.showDialog=!0;break;case"reject":this.type="reject",this.showDialog=!0}},getData:function(){var e=this;this.data=[],this.loading=!0;var t={pageNum:this.pageNum,pageSize:this.pageSize},a=this.$refs.query&&this.$refs.query.fetchFilter()||{};a.create_time&&(t.beginTime=a.create_time[0]+" 00:00:00",t.endTime=a.create_time[1]+" 23:59:59"),a.coinName&&(t.coinName=a.coinName),a.account&&(t.account=a.account),a.id&&(t.recdId=a.id),a.orderId&&(t.orderId=a.orderId),a.txId&&(t.txId=a.txId),a.recdStatus&&(t.recdStatus=a.recdStatus),a.transType&&(t.transType=a.transType),a.address&&(t.address=a.address),this.$http.get("/backmgr/getWithdrawList",t).then(function(t){var a=t.code,l=t.result;200===a?(e.data=l.blockWithdrawDtoPageInfo,e.blockSumReAndWdResultDto=l.blockSumReAndWdResultDto):e.$notify.error({title:"提示",message:"获取列表失败"})}).catch(function(e){}).finally(function(){e.loading=!1})},hideDialog:function(e){this.showDialog=e},hideDialogMR:function(e){this.showDialogMR=e},resetFilter:function(){this.$refs.query.filter={}},getCoins:function(){var e=this;this.$http.get("/backmgr/coin/getAllCoinInfo").then(function(t){var a=t.code,l=t.result;if(200===a){e.coins=l.filter(function(e){return"USDT"===e.coinName&&1===e.sysStatus&&!0,1===e.sysStatus})}else e.$notify.error({title:"提示",message:"查询失败"})}).catch(function(e){})}},created:function(){this.getCoins(),this.getData(!0)},components:{Query:s,Table:i,ReleaseDialog:p,ManualRecordDialog:a("C7Lr")(m,f,!1,null,null,null).exports}},b={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"withdraw-check-page"},[a("el-collapse",{on:{change:e.handleChange},model:{value:e.activeNames,callback:function(t){e.activeNames=t},expression:"activeNames"}},[a("el-collapse-item",{attrs:{title:"查询条件",name:"filter"}},[a("Query",{ref:"query",attrs:{coins:e.coins},on:{queryData:e.getData,resetFilter:e.resetFilter}})],1)],1),e._v(" "),a("Table",{attrs:{tableData:e.data.list,btnHandle:e.btnHandle},on:{hideDialogMR:e.hideDialogMR}}),e._v(" "),a("div",{staticClass:"load-more",staticStyle:{display:"flex"}},[a("div",{staticClass:"count"},[a("span",[e._v("提币数量："),a("i",[e._v(e._s(e.blockSumReAndWdResultDto.withAmount))]),e._v(" USDT")]),e._v(" "),a("span",[e._v("手续费："),a("i",[e._v(e._s(e.blockSumReAndWdResultDto.fee))]),e._v(" USDT")])]),e._v(" "),a("el-pagination",{attrs:{"current-page":e.pageNum,"page-sizes":30,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:1*e.data.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("ReleaseDialog",{attrs:{showDialog:e.showDialog,item:e.item,type:e.type},on:{hideDialog:e.hideDialog}}),e._v(" "),a("ManualRecordDialog",{attrs:{showDialogMR:e.showDialogMR},on:{hideDialogMR:e.hideDialogMR,getData:e.getData}})],1)},staticRenderFns:[]};var v=a("C7Lr")(h,b,!1,function(e){a("TAgC")},"data-v-41b30d8b",null);t.default=v.exports}});