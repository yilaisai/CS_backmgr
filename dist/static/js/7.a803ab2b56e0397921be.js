webpackJsonp([7],{NQwl:function(t,e){},NYR9:function(t,e,a){t.exports=a.p+"static/img/skin1.3a2ea1c.png"},ZMqY:function(t,e){},a9NR:function(t,e){},aj5a:function(t,e){},mFrx:function(t,e,a){t.exports=a.p+"static/img/skin2.2a2310e.png"},mRuS:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"domainNameList-page"},[a("ul",{staticClass:"tabs"},[a("li",{class:4==t.payType?"active":"",on:{click:function(e){return t.checkedPayType(4)}}},[t._v("宝转卡中转域名")]),t._v(" "),a("li",{class:3==t.payType?"active":"",on:{click:function(e){return t.checkedPayType(3)}}},[t._v("微信中转域名")]),t._v(" "),a("li",{class:2==t.payType?"active":"",on:{click:function(e){return t.checkedPayType(2)}}},[t._v("支付宝中转域名")]),t._v(" "),a("li",{class:1==t.payType?"active":"",on:{click:function(e){return t.checkedPayType(1)}}},[t._v("收银台域名")])]),t._v(" "),a("el-table",{attrs:{stripe:"",border:"",height:"600px",size:"mini",data:t.list}},[a("el-table-column",{attrs:{type:"index",label:"序号",index:t.indexMethod,align:"center"}}),t._v(" "),1==t.payType?a("el-table-column",{attrs:{prop:"url",label:"服务器域名",align:"center"}}):a("el-table-column",{attrs:{prop:"domainName",label:"服务器域名",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"添加时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(t.$fmtDate(e.row.createTime,"full"))+"\n\t\t\t")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"updateTime",label:"上次使用时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(1==t.payType?t.$fmtDate(e.row.updateTime,"full"):t.$fmtDate(e.row.lastStartTime,"full"))+"\n\t\t\t")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==t.payType?a("span",{class:1==e.row.type?"status1":"status2"},[t._v(t._s(1==e.row.type?"已开启":"已关闭"))]):a("span",{class:1==e.row.status?"status1":"status2"},[t._v(t._s(1==e.row.status?"已开启":"已关闭"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==t.payType?a("el-button",{attrs:{size:"mini",type:0==e.row.type?"primary":"warning"},on:{click:function(a){return t.updateStatus2(e.row)}}},[t._v(t._s(1==e.row.type?"关闭":"开启"))]):a("el-button",{attrs:{size:"mini",type:0==e.row.status?"primary":"warning"},on:{click:function(a){return t.updateStatus(e.row)}}},[t._v(t._s(1==e.row.status?"关闭":"开启"))])]}}])})],1),t._v(" "),a("el-pagination",{attrs:{"current-page":t.pageNum,"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:1*t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)},staticRenderFns:[]};var s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"local-ip-filtering"},[a("el-tabs",{attrs:{type:"border-card"}},[a("el-tab-pane",{attrs:{label:t.destxt}},[a("el-input",{attrs:{type:"textarea",rows:10,placeholder:"请输入您允许访问收银台的地区，用“,”号分隔"},model:{value:t.areas,callback:function(e){t.areas=e},expression:"areas"}})],1),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.updateEnableAreas}},[t._v("保存修改")]),t._v(" "),a("p",{staticClass:"tips"},[t._v("输入您允许访问收银台的地区,多个地区之间用 “,” 号分隔")])],1)],1)},staticRenderFns:[]};var n={data:function(){return{imgList:[a("NYR9"),a("mFrx"),a("pJAj")],defaultForm:{CHECK_STAND_SKIN_TYPE:"",CHECK_STAND_CHECK_TYPE:"",CHECK_STAND_SIGN_TYPE:""},modes:[{label:"无验证",value:"1"},{label:"手机号验证",value:"2"},{label:"【付费】银行卡要素验证",value:"3"}],payModes:[{label:"需要标记",value:"1"},{label:"不需要标记",value:"2"},{label:"关联抢派单模式",value:"3"}]}},activated:function(){this.getList()},methods:{getList:function(){var t=this;this.$http.post("/backmgr/checkStand/defaultInfo").then(function(e){t.defaultForm=e.result})},change:function(t,e){var a=this;this.$http.post("/backmgr/checkStand/updateDefaultInfo",{key:t,value:e}).then(function(t){a.$notify({title:"成功",message:t.msg,type:"success"})})}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"default-setting"},[a("el-tabs",{attrs:{type:"border-card"}},[a("el-tab-pane",{attrs:{label:"收银台默认设置"}},[a("el-form",{ref:"defaultForm",staticClass:"defaultForm",attrs:{model:t.defaultForm,inline:!0,"label-width":"140px",size:"small"}},[a("el-form-item",{attrs:{label:"默认皮肤："}},[a("div",{staticClass:"radioBox"},[a("el-image",{staticStyle:{width:"100px"},attrs:{src:t.imgList[0],"preview-src-list":[t.imgList[0]]}}),t._v(" "),a("el-radio",{attrs:{label:"1"},on:{change:function(e){return t.change("CHECK_STAND_SKIN_TYPE",1)}},model:{value:t.defaultForm.CHECK_STAND_SKIN_TYPE,callback:function(e){t.$set(t.defaultForm,"CHECK_STAND_SKIN_TYPE",e)},expression:"defaultForm.CHECK_STAND_SKIN_TYPE"}},[t._v("皮肤1")])],1),t._v(" "),a("div",{staticClass:"radioBox"},[a("el-image",{staticStyle:{width:"100px"},attrs:{src:t.imgList[1],"preview-src-list":[t.imgList[1]]}}),t._v(" "),a("el-radio",{attrs:{label:"2"},on:{change:function(e){return t.change("CHECK_STAND_SKIN_TYPE",2)}},model:{value:t.defaultForm.CHECK_STAND_SKIN_TYPE,callback:function(e){t.$set(t.defaultForm,"CHECK_STAND_SKIN_TYPE",e)},expression:"defaultForm.CHECK_STAND_SKIN_TYPE"}},[t._v("皮肤2")])],1),t._v(" "),a("div",{staticClass:"radioBox"},[a("el-image",{staticStyle:{width:"100px"},attrs:{src:t.imgList[2],"preview-src-list":[t.imgList[2]]}}),t._v(" "),a("el-radio",{attrs:{label:"3"},on:{change:function(e){return t.change("CHECK_STAND_SKIN_TYPE",3)}},model:{value:t.defaultForm.CHECK_STAND_SKIN_TYPE,callback:function(e){t.$set(t.defaultForm,"CHECK_STAND_SKIN_TYPE",e)},expression:"defaultForm.CHECK_STAND_SKIN_TYPE"}},[t._v("皮肤3")])],1)]),t._v(" "),a("el-form-item",{attrs:{label:"默认LOGO："}},[a("div",{staticClass:"radioBox"},[a("el-radio",{attrs:{label:"1"},on:{change:function(e){return t.change("CHECK_STAND_LOGO_TYPE",1)}},model:{value:t.defaultForm.CHECK_STAND_LOGO_TYPE,callback:function(e){t.$set(t.defaultForm,"CHECK_STAND_LOGO_TYPE",e)},expression:"defaultForm.CHECK_STAND_LOGO_TYPE"}},[t._v("FlashEx")])],1),t._v(" "),a("div",{staticClass:"radioBox"},[a("el-radio",{attrs:{label:"2"},on:{change:function(e){return t.change("CHECK_STAND_LOGO_TYPE",2)}},model:{value:t.defaultForm.CHECK_STAND_LOGO_TYPE,callback:function(e){t.$set(t.defaultForm,"CHECK_STAND_LOGO_TYPE",e)},expression:"defaultForm.CHECK_STAND_LOGO_TYPE"}},[t._v("OTC-Flash")])],1),t._v(" "),a("div",{staticClass:"radioBox"},[a("el-radio",{attrs:{label:"3"},on:{change:function(e){return t.change("CHECK_STAND_LOGO_TYPE",3)}},model:{value:t.defaultForm.CHECK_STAND_LOGO_TYPE,callback:function(e){t.$set(t.defaultForm,"CHECK_STAND_LOGO_TYPE",e)},expression:"defaultForm.CHECK_STAND_LOGO_TYPE"}},[t._v("RouteOtc")])],1)]),t._v(" "),a("el-form-item",{attrs:{label:"默认验证方式："}},[a("el-radio-group",{model:{value:t.defaultForm.CHECK_STAND_CHECK_TYPE,callback:function(e){t.$set(t.defaultForm,"CHECK_STAND_CHECK_TYPE",e)},expression:"defaultForm.CHECK_STAND_CHECK_TYPE"}},t._l(t.modes,function(e,i){return a("el-radio",{key:e.value,attrs:{label:e.value},on:{change:function(e){return t.change("CHECK_STAND_CHECK_TYPE",i+1)}}},[t._v(t._s(e.label))])}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"是否标记已付款："}},[a("el-radio-group",{model:{value:t.defaultForm.CHECK_STAND_SIGN_TYPE,callback:function(e){t.$set(t.defaultForm,"CHECK_STAND_SIGN_TYPE",e)},expression:"defaultForm.CHECK_STAND_SIGN_TYPE"}},t._l(t.payModes,function(e,i){return a("el-radio",{key:e.value,attrs:{label:e.value},on:{change:function(e){return t.change("CHECK_STAND_SIGN_TYPE",i+1)}}},[t._v(t._s(e.label))])}),1)],1)],1),t._v(" "),a("p",{staticClass:"tips"},[t._v("注：默认收银台支持全部启用中的支付通道")])],1)],1)],1)},staticRenderFns:[]};var r={data:function(){return{otcPayLists:[],form:{payType:"",ckLimitNum:"",ckSingleMax:"",ckLimitMax:"",isUseCheckout:""}}},activated:function(){this.getData()},computed:{payType:function(){return this.form.payType}},methods:{getData:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/getPayList").then(function(e){t.otcPayLists=e.result,t.form.payType=t.form.payType||t.otcPayLists[0].payType})},save:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/modifyPayList",this.form).then(function(e){t.$notify.success({title:"提示",message:e.msg}),t.getData()})}},components:{DomainNameList:a("C7Lr")({components:{},data:function(){return{list:[],payType:4,pageNum:1,pageSize:20,total:0}},mounted:function(){this.getList()},methods:{getList:function(){var t=this;this.list=[],1==this.payType?this.$http.post("/wallet/app/otc/backmgr/getOtcUrlRecd",{pageNum:this.pageNum,pageSize:this.pageSize}).then(function(e){t.list=e.result.list,t.total=e.result.total}):this.$http.post("/wallet/app/otc/backmgr/domain/list",{payType:this.payType,pageNum:this.pageNum,pageSize:this.pageSize}).then(function(e){200==e.code&&(t.list=e.result.list.list,t.total=e.result.list.total)})},handleCurrentChange:function(t){this.pageNum=t,this.getList()},handleSizeChange:function(t){this.pageSize=t,this.getList()},checkedPayType:function(t){this.payType!=t&&(this.payType=t,this.pageNum=1,this.getList())},updateStatus:function(t){var e=this,a=0;this.list.forEach(function(t){1==t.status&&(a+=1)}),1==a&&1==t.status?this.$confirm("当前只有一台服务器开启中，若关闭则无服务器开启，确定关闭？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.update(t)}).catch(function(){}):this.update(t)},updateStatus2:function(t){var e=this,a=0;this.list.forEach(function(t){1==t.type&&(a+=1)}),1==a&&1==t.type?this.$confirm("当前只有一台服务器开启中，若关闭则无服务器开启，确定关闭？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.update2(t)}).catch(function(){}):this.update2(t)},update:function(t){var e=this;this.$http.post("/wallet/app/otc/backmgr/domain/updateStatus",{status:1==t.status?0:1,id:t.id}).then(function(t){200==t.code&&(e.$notify({title:"成功",message:"修改成功",type:"success"}),e.getList())})},update2:function(t){var e=this;this.$http.post("/wallet/app/otc/backmgr/optOtcUrlRecd",{id:t.id,type:1==t.type?0:1}).then(function(t){200==t.code&&(e.$notify({title:"成功",message:"修改成功",type:"success"}),e.getList())})},indexMethod:function(t){return t+1}},watch:{},computed:{}},i,!1,function(t){a("ZMqY")},"data-v-76b7928a",null).exports,LocalIpFilter:a("C7Lr")({data:function(){return{areas:"",destxt:"地区访问设置"}},activated:function(){this.getEnableAreas()},methods:{getEnableAreas:function(){var t=this;this.$http.post("/wallet/backmgr/sys/getEnableAreas").then(function(e){t.destxt=e.result.destxt,t.areas=e.result.paramValue})},updateEnableAreas:function(){var t=this;this.$http.post("/wallet/backmgr/sys/updateEnableAreas",{areas:this.areas}).then(function(e){t.$notify({title:"成功",message:e.msg,type:"success"}),t.getEnableAreas()})}}},s,!1,function(t){a("NQwl")},"data-v-56bc7273",null).exports,DefaultSetting:a("C7Lr")(n,l,!1,function(t){a("aj5a")},"data-v-efe23298",null).exports},watch:{payType:function(t,e){var a=this;this.otcPayLists.forEach(function(e,i){t===e.payType&&(a.form.ckLimitNum=a.otcPayLists[i].ckLimitNum,a.form.ckSingleMax=a.otcPayLists[i].ckSingleMax,a.form.ckLimitMax=a.otcPayLists[i].ckLimitMax,a.form.isUseCheckout=a.otcPayLists[i].isUseCheckout.toString())})}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"risk-manage"},[a("DefaultSetting"),t._v(" "),a("el-tabs",{attrs:{type:"border-card"}},[a("el-tab-pane",{attrs:{label:"支付通道设置"}},[a("el-form",{ref:"form",attrs:{model:t.form,inline:!0,"label-width":"140px",size:"small"}},[a("el-form-item",{attrs:{label:"支付方式："}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.form.payType,callback:function(e){t.$set(t.form,"payType",e)},expression:"form.payType"}},t._l(t.otcPayLists,function(t){return a("el-option",{key:t.payType,attrs:{label:t.description,value:t.payType}})}),1)],1),t._v(" "),a("br"),t._v(" "),a("el-form-item",{attrs:{label:"是否启用："}},[a("el-switch",{attrs:{"active-color":"#13ce66","active-value":"1","inactive-value":"0"},model:{value:t.form.isUseCheckout,callback:function(e){t.$set(t.form,"isUseCheckout",e)},expression:"form.isUseCheckout"}})],1),t._v(" "),a("br"),t._v(" "),a("el-form-item",{attrs:{label:"笔数限制："}},[a("el-input",{attrs:{type:"number",min:"0"},model:{value:t.form.ckLimitNum,callback:function(e){t.$set(t.form,"ckLimitNum","string"==typeof e?e.trim():e)},expression:"form.ckLimitNum"}})],1),t._v(" "),a("br"),t._v(" "),a("el-form-item",{attrs:{label:"单笔金额上限："}},[a("el-input",{attrs:{type:"number",min:"0"},model:{value:t.form.ckSingleMax,callback:function(e){t.$set(t.form,"ckSingleMax","string"==typeof e?e.trim():e)},expression:"form.ckSingleMax"}})],1),t._v(" "),a("br"),t._v(" "),a("el-form-item",{attrs:{label:"每日总金额上限："}},[a("el-input",{attrs:{type:"number",min:t.form.ckLimitMin},model:{value:t.form.ckLimitMax,callback:function(e){t.$set(t.form,"ckLimitMax","string"==typeof e?e.trim():e)},expression:"form.ckLimitMax"}})],1)],1)],1),t._v(" "),a("el-button",{staticClass:"save",attrs:{type:"primary"},on:{click:t.save}},[t._v("保存修改")])],1),t._v(" "),a("LocalIpFilter"),t._v(" "),a("DomainNameList")],1)},staticRenderFns:[]};var c=a("C7Lr")(r,o,!1,function(t){a("a9NR")},"data-v-7313deb5",null);e.default=c.exports},pJAj:function(t,e,a){t.exports=a.p+"static/img/skin3.33233fb.png"}});