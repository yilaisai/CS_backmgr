webpackJsonp([86],{dXZ4:function(e,t){},"pS9/":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("Gu7T"),i=a.n(s),r={name:"transfer-approval",data:function(){return{coinType:[],transactionType:[],recdStatusType:[{value:"0",label:"失败"},{value:"1",label:"成功"},{value:"2",label:"处理中"},{value:"3",label:"超时待支付"}],selectedDate:[],recdStatus:[],filterForm:{coinId:"",fundChangeType:"",recdStatus:"",phone:"",beginTime:"",endTime:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},props:{value:"code",label:"typeName"},propsCoin:{value:"coinId",label:"coinName"},moneyList:[{name:"转入",value:0},{name:"转出",value:0},{name:"余额",value:0}],isShowDetail:!1}},methods:{resetForm:function(){this.filterForm.coinId="",this.filterForm.fundChangeType="",this.filterForm.recdStatus="",this.filterForm.beginTime="",this.filterForm.endTime="",this.filterForm.phone="",this.selectedDate=[],this.recdStatus=[],this.$refs.coinId.reset(),this.$refs.fundChangeType.reset(),this.$refs.recdStatus.reset(),this.$refs.filterForm&&this.$refs.filterForm.resetFields()},getPaginationChange:function(e,t){this.filterForm.pageSize=e,this.submitForm(t)},submitForm:function(e){this.filterForm.pageNum=e,this.getTradeList()},getTradeList:function(){var e=this;this.filterForm.beginTime=this.selectedDate&&this.selectedDate[0],this.filterForm.endTime=this.selectedDate&&this.selectedDate[1],this.filterForm.recdStatus=this.recdStatus.join(","),this.$http.post("supernode/backmgr/fund/list",this.filterForm).then(function(t){var a=t.result.retMap?t.result.retMap:t.result,s=a.list,i=a.total;e.listData.list=s,e.listData.total=i})},getFundChangeTypeList:function(){var e=this;this.$http.post("supernode/backmgr/fund/open/getFundChangeTypeList").then(function(t){e.transactionType=[{code:"",typeName:"全部"}].concat(i()(t.result))})},getCoinInfoList:function(){var e=this;this.$http.post("supernode/coin/open/getCoinInfoList").then(function(t){e.coinType=[{coinId:"",coinName:"全部"}].concat(i()(t.result))})}},activated:function(){this.$route.params&&this.$route.params.phone?(this.filterForm.phone=this.$route.params.phone,this.isShowDetail=!0,this.getTradeList()):(this.isShowDetail=!1,this.getTradeList()),this.resetForm(),this.getFundChangeTypeList(),this.getCoinInfoList()}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"transfer-approval"},[e.isShowDetail?a("el-col",{staticClass:"subsidiary",attrs:{span:24}},[a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(t){return e.$router.go(-1)}}},[e._v("返回\n    ")]),e._v(" "),a("span",{staticClass:"capital"},[e._v(e._s(this.$route.params.phone)+"的资金明细")])],1):e._e(),e._v(" "),a("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"80px",model:e.filterForm}},[a("sac-select",{ref:"coinId",attrs:{label:"币　　种",placeholder:"请选择币种",dataList:e.coinType,props:e.propsCoin},model:{value:e.filterForm.coinId,callback:function(t){e.$set(e.filterForm,"coinId",t)},expression:"filterForm.coinId"}}),e._v(" "),a("sac-select",{ref:"fundChangeType",attrs:{label:"类　　型",placeholder:"请选择类型",dataList:e.transactionType,props:e.props},model:{value:e.filterForm.fundChangeType,callback:function(t){e.$set(e.filterForm,"fundChangeType",t)},expression:"filterForm.fundChangeType"}}),e._v(" "),a("sac-select",{ref:"recdStatus",attrs:{label:"状　　态",placeholder:"请选择状态",multiple:"",dataList:e.recdStatusType},model:{value:e.recdStatus,callback:function(t){e.recdStatus=t},expression:"recdStatus"}}),e._v(" "),e.isShowDetail?e._e():a("el-form-item",{attrs:{label:"用户名:"}},[a("el-input",{attrs:{size:"small",placeholder:"请输入用户名",clearable:""},model:{value:e.filterForm.phone,callback:function(t){e.$set(e.filterForm,"phone","string"==typeof t?t.trim():t)},expression:"filterForm.phone"}})],1),e._v(" "),a("el-form-item",{staticClass:"sac-date",attrs:{label:"日　　期"}},[a("el-date-picker",{attrs:{editable:!1,type:"daterange",align:"center",size:"small","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},model:{value:e.selectedDate,callback:function(t){e.selectedDate=t},expression:"selectedDate"}})],1),e._v(" "),a("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(t){return e.submitForm(1)}}})],1),e._v(" "),a("sac-table",{attrs:{data:e.listData.list}},[a("el-table-column",{attrs:{prop:"phone",label:"用户名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"coinName",label:"币种"}}),e._v(" "),a("el-table-column",{attrs:{label:"类型",prop:"fundTypeName"}}),e._v(" "),a("el-table-column",{attrs:{prop:"amount",label:"金额"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"日期"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("dateFormat")(t.row.createTime,"YYYY-MM-DD")))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"状态",prop:"status"}})],1),e._v(" "),a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.filterForm.pageSize,"current-page":e.filterForm.pageNum},on:{handleChange:e.getPaginationChange}})],1)},staticRenderFns:[]};var n=a("VU/8")(r,l,!1,function(e){a("dXZ4")},null,null);t.default=n.exports}});