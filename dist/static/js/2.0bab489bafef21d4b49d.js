webpackJsonp([2],{"3KIl":function(t,e){},eVrs:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"exchangeSAC",data:function(){return{showNumList:!1,numList:[],filterForm:{phoneOrEmail:"",pageNum:1,pageSize:20,status:"",order:"desc"},listData:{total:null,list:[]},stateList:[{name:"全部",value:""},{name:"待审核",value:"0"},{name:"已审核",value:"1"}],payList:[],stopType:"0",stopWindon:!1,QRcodeWindow:!1,dialogVisible:!0,obj:{}}},methods:{showPayNum:function(t){this.numList=t,this.showNumList=!0},showStopWindow:function(t){this.obj=t.row,this.stopType=0,this.payList=[],this.obj.wechat&&this.payList.unshift({name:"微信支付",value:this.obj.wechatId}),this.obj.alipay&&this.payList.unshift({name:"支付宝",value:this.obj.alipayId}),this.obj.bank&&this.payList.unshift({name:"银行卡",value:this.obj.bankId}),this.payList.length>1&&this.payList.unshift({name:"全部",value:"0"}),this.payList.length>0?(this.stopType=this.payList[0].value,this.stopWindon=!0):this.$alert("当前未使用支付方式",{dangerouslyUseHTMLString:!0})},stop:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/updatePayStatus",{userId:this.obj.userId,payId:this.stopType,status:2}).then(function(e){t.$message("操作成功"),t.stopWindon=!1,t.getUserRaking()})},goDetaile:function(t){this.$router.push({name:"accountsReceivableDetaile",query:{userId:t.row.userId,nickName:t.row.nickName,phone:t.row.phone,userLevel:t.row.userLevel}})},showQRcode:function(t){this.obj=t.row,this.QRcodeWindow=!0},sortChange:function(t){"ascending"==t.order?this.filterForm.order="asc":this.filterForm.order="desc","btcAmount"==t.prop?this.filterForm.coinName="BTC":this.filterForm.coinName="RMT",this.filterForm.pageNum=1,this.getUserRaking()},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.filterForm.pageNum=e,this.getUserRaking()},getUserRaking:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/getCustomPayInfo",this.filterForm).then(function(e){t.listData.list=e.result.list,t.listData.total=e.result.total})},detail:function(t){}},activated:function(){this.getUserRaking()}},s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"exchangeSAC"},[i("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"90px",model:t.filterForm,size:"mini"}},[i("sac-input",{ref:"phone",attrs:{label:"账号"},model:{value:t.filterForm.phoneOrEmail,callback:function(e){t.$set(t.filterForm,"phoneOrEmail","string"==typeof e?e.trim():e)},expression:"filterForm.phoneOrEmail"}}),t._v(" "),i("el-form-item",{attrs:{label:"状态"}},[i("el-select",{staticClass:"select",model:{value:t.filterForm.status,callback:function(e){t.$set(t.filterForm,"status",e)},expression:"filterForm.status"}},t._l(t.stateList,function(t,e){return i("el-option",{key:e,attrs:{value:t.value,label:t.name}})}),1)],1),t._v(" "),i("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(e){return t.getUserRaking()}}})],1),t._v(" "),i("el-table",{attrs:{stripe:"",border:"",height:"100%","default-sort":{prop:"usdtAmount",order:"descending"},data:t.listData.list,size:"mini"},on:{"sort-change":t.sortChange}},[i("el-table-column",{attrs:{align:"center",prop:"phone",label:"账号",width:"100"}}),t._v(" "),i("el-table-column",{attrs:{align:"center",prop:"nickName",label:"昵称",width:"140"}}),t._v(" "),i("el-table-column",{attrs:{align:"center",prop:"userLevel",label:"企业类型",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t\t\t"+t._s(0==e.row.userEnterprise?"非企业账号":"企业账号")+"\n\t\t\t\t\t")]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"支付宝"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.alipayList&&e.row.alipayList.length>0?i("div",{staticClass:"listData",staticStyle:{color:"#409EFF"}},[e.row.alipayList.length>1?i("p",{staticClass:"btn",on:{click:function(i){return t.showPayNum(e.row.alipayList)}}},[t._v(" 查看更多")]):i("p",[t._v(t._s(e.row.alipayList[0].num))])]):i("span",[t._v(" 当前未使用 ")])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"微信支付"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.wechatList&&e.row.wechatList.length>0?i("div",{staticClass:"listData",staticStyle:{color:"#409EFF"}},[e.row.wechatList.length>1?i("p",{staticClass:"btn",on:{click:function(i){return t.showPayNum(e.row.wechatList)}}},[t._v(" 查看更多")]):i("p",[t._v(t._s(e.row.wechatList[0].num))])]):i("span",[t._v(" 当前未使用 ")])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"银行卡"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.bankExList&&e.row.bankExList.length>0?i("div",{staticClass:"listData",staticStyle:{color:"#409EFF"}},[e.row.bankExList.length>1?i("p",{staticClass:"btn",on:{click:function(i){return t.showPayNum(e.row.bankExList)}}},[t._v(" 查看更多")]):i("p",[t._v(t._s(e.row.bankExList[0].num))])]):i("span",[t._v(" 当前未使用 ")])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"宝转卡"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.alipayToBankList&&e.row.alipayToBankList.length>0?i("div",{staticClass:"listData",staticStyle:{color:"#409EFF"}},[e.row.alipayToBankList.length>1?i("p",{staticClass:"btn",on:{click:function(i){return t.showPayNum(e.row.alipayToBankList)}}},[t._v(" 查看更多")]):i("p",[t._v(t._s(e.row.alipayToBankList[0].num))])]):i("span",[t._v(" 当前未使用 ")])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"状态",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t\t\t"+t._s(1==e.row.payAuditStatus?"已审核":"待审核")+"\n\t\t\t\t\t")]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",fixed:"right",label:"操作",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(i){return t.goDetaile(e)}}},[t._v("查看审核")]),t._v(" "),i("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(i){return t.showQRcode(e)}}},[t._v("收款测试")]),t._v(" "),i("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(i){return t.showStopWindow(e)}}},[t._v("停止使用")])]}}])})],1),t._v(" "),i("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.filterForm.pageSize,"current-page":t.filterForm.pageNum},on:{handleChange:t.getPaginationChange}}),t._v(" "),i("el-dialog",{attrs:{title:"停止使用",visible:t.stopWindon,width:"30%"},on:{"update:visible":function(e){t.stopWindon=e}}},[i("p",[t._v("点击后，用户该收款方式将下架，确认操作？")]),t._v(" "),i("el-form",{ref:"form"},[i("el-form-item",{attrs:{label:"停止类型"}},[i("el-select",{staticClass:"select",model:{value:t.stopType,callback:function(e){t.stopType=e},expression:"stopType"}},t._l(t.payList,function(t,e){return i("el-option",{key:e,attrs:{value:t.value,label:t.name}})}),1)],1)],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.stopWindon=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"success"},on:{click:t.stop}},[t._v("停 止")])],1)],1),t._v(" "),i("el-dialog",{attrs:{title:"当前使用",visible:t.QRcodeWindow,width:"400"},on:{"update:visible":function(e){t.QRcodeWindow=e}}},[t.obj.alipayQrcode||t.obj.wechatQrcode?i("div",{staticClass:"qr-box"},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.obj.alipayQrcode,expression:"obj.alipayQrcode"}]},[i("img",{attrs:{src:t.obj.alipayQrcode,alt:""}}),t._v(" "),i("p",[t._v("支付宝收款码")])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.obj.wechatQrcode,expression:"obj.wechatQrcode"}]},[i("img",{attrs:{src:t.obj.wechatQrcode,alt:""}}),t._v(" "),i("p",[t._v("微信收款码")])])]):i("p",{staticStyle:{"text-align":"center"}},[t._v("暂未使用二维码收款码")])]),t._v(" "),i("el-dialog",{staticClass:"numList",attrs:{title:"账号列表",visible:t.showNumList,width:"400"},on:{"update:visible":function(e){t.showNumList=e}}},[i("div",t._l(t.numList,function(e,a){return i("p",{key:a},[t._v(" 账号"+t._s(a+1)+": "),i("span",[t._v(t._s(e.num))])])}),0)])],1)},staticRenderFns:[]};var n=i("VU/8")(a,s,!1,function(t){i("3KIl")},null,null);e.default=n.exports}});