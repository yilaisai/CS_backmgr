webpackJsonp([79],{YcvG:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("Dd8w"),s=a.n(i),l=a("NYxO"),n={data:function(){return{account:"",rate:"",buyRate:"",showDialog:!1,showDialog2:!1,filterForm:{coinName:"RMT",userId:""},sysRushMatchSwitch:!1,sysRushCashoutSwitch:!1,sysMatchSwitch:!1,sysCashoutSwitch:!1,listData:{pageSize:10,pageNum:1,total:"",list:[]},defaultProps:{},currItem:{},inviteList:[],detaileData:{},MatchConfig:{}}},activated:function(){this.filterForm.userId=this.$route.query.userId,this.getData(),this.queryUserMatchConfig(),this.findInviteTree()},methods:{selectCoin:function(){this.getData()},handleCurrentChange:function(t,e){this.listData.pageSize=t,this.listData.pageNum=e,this.getList()},saerch:function(){this.listData.pageNum=1,this.getList()},findInviteTree:function(){var t=this;this.inviteList=[],this.$http.post("/wallet/invite/backmgr/findInviteTree",{inviteeId:this.filterForm.userId}).then(function(e){200==e.code&&e.result&&(t.inviteList=[e.result])})},EditRate:function(t){this.currItem=t,this.buyRate=100*t.buyRate,this.rate=100*t.rate,this.showDialog=!0},brokerage:function(t){this.currItem=t,this.showDialog2=!0,this.listData.pageNum=1,this.getList()},updateInviteShip:function(t){var e=this;this.$confirm("确定要执行迁移操作吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$http.post("/wallet/invite/backmgr/updateInviteShip",{inviterId:t,inviteeId:e.currItem.inviteeId}).then(function(t){200==t.code&&(e.showDialog2=!1,e.findInviteTree(),e.$message.success("迁移成功"))})}).catch(function(){})},updateRewardRate:function(){var t=this;this.$http.post("/wallet/invite/backmgr/updateRewardRate",{buyRate:Math.floor(10*this.buyRate)/1e3,rate:Math.floor(10*this.rate)/1e3,inviteeId:this.currItem.inviteeId}).then(function(e){200==e.code&&(t.showDialog=!1,t.findInviteTree())})},getList:function(){var t=this;this.$http.post("/wallet/invite/backmgr/queryInviteShip",{account:this.account,inviteeId:this.currItem.inviteeId,pageNum:this.listData.pageNum,pageSize:this.listData.pageSize}).then(function(e){200==e.code&&(t.listData.list=e.result.list,t.listData.total=e.result.total,t.findInviteTree())})},getData:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/queryOtcUserDetail",this.filterForm).then(function(e){200==e.code&&(t.detaileData=e.result)})},queryUserMatchConfig:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/queryUserMatchConfig",this.filterForm).then(function(e){200==e.code&&(t.MatchConfig=e.result,t.sysRushMatchSwitch=1==e.result.sysRushMatchSwitch,t.sysRushCashoutSwitch=1==e.result.sysRushCashoutSwitch,t.sysMatchSwitch=1==e.result.sysMatchSwitch,t.sysCashoutSwitch=1==e.result.sysCashoutSwitch)})},onSysCashoutSwitch:function(t){this.updateSysSwitch("sysCashoutSwitch",t?"1":"0")},onSysRushMatchSwitch:function(t){this.updateSysSwitch("sysRushMatchSwitch",t?"1":"0")},onSysRushCashoutSwitch:function(t){this.updateSysSwitch("sysRushCashoutSwitch",t?"1":"0")},onSysMatchSwitch:function(t){this.updateSysSwitch("sysMatchSwitch",t?"1":"0")},updateSysSwitch:function(t,e){var a=this,i={coinName:this.filterForm.coinName,userId:this.filterForm.userId};i[t]=e,this.$http.post("/wallet/app/otc/backmgr/updateSysSwitch",i).then(function(t){200==t.code?a.$message.success(t.msg):a.$message.error(t.msg),a.queryUserMatchConfig()})}},computed:s()({},Object(l.b)(["coinInfo"]))},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"userQueryDetaile-page"},[a("el-header",[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.$router.go(-1)}}},[t._v("返回")])],1),t._v(" "),a("div",{staticClass:"main"},[a("div",[a("div",{staticClass:"title"},[a("h3",[t._v("用户信息")]),t._v(" "),a("div",{staticClass:"select-wrap"},[a("label",[t._v("币种：")]),t._v(" "),a("el-select",{attrs:{placeholder:"请选择币种"},on:{change:t.selectCoin},model:{value:t.filterForm.coinName,callback:function(e){t.$set(t.filterForm,"coinName",e)},expression:"filterForm.coinName"}},t._l(t.coinInfo,function(t,e){return a("el-option",{key:e,attrs:{label:t.coinName,value:t.coinName}})}),1)],1)]),t._v(" "),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.detaileData}},[a("el-form-item",{attrs:{label:"账号:"}},[a("el-input",{attrs:{disabled:""},model:{value:t.detaileData.account,callback:function(e){t.$set(t.detaileData,"account",e)},expression:"detaileData.account"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"昵称:"}},[a("el-input",{attrs:{disabled:""},model:{value:t.detaileData.nickName,callback:function(e){t.$set(t.detaileData,"nickName",e)},expression:"detaileData.nickName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"广告商类型:"}},[a("el-input",{attrs:{value:0==t.detaileData.userLevel?"普通用户":1==t.detaileData.userLevel?"普通广告商":2==t.detaileData.userLevel?"高级广告商":3==t.detaileData.userLevel?"企业广告商":"",disabled:""}})],1),t._v(" "),a("el-form-item",{attrs:{label:"企业类型:"}},[a("el-input",{attrs:{value:0==t.detaileData.userEnterprise?"非企业号":1==t.detaileData.userEnterprise?"企业号":"",disabled:""}})],1),t._v(" "),a("el-form-item",{attrs:{label:"购买交易额:"}},[a("el-input",{attrs:{value:t.detaileData.buyAmount+t.filterForm.coinName,disabled:""}})],1),t._v(" "),a("el-form-item",{attrs:{label:"购买成交数:"}},[a("el-input",{attrs:{value:t.detaileData.buyNum,disabled:""}})],1),t._v(" "),a("el-form-item",{attrs:{label:"出售交易额:"}},[a("el-input",{attrs:{value:t.detaileData.saleAmount+t.filterForm.coinName,disabled:""}})],1),t._v(" "),a("el-form-item",{attrs:{label:"出售成交数:"}},[a("el-input",{attrs:{value:t.detaileData.saleNum,disabled:""}})],1),t._v(" "),0!=t.detaileData.userLevel?a("div",[a("el-form-item",{attrs:{label:"申请商家时间:"}},[a("el-input",{attrs:{value:t.$fmtDate(t.detaileData.certificationTimeStamp,"full"),disabled:""}})],1),t._v(" "),a("el-form-item",{attrs:{label:"保证金:"}},[a("el-input",{attrs:{value:t.detaileData.frozen+t.filterForm.coinName,disabled:""}})],1),t._v(" "),a("el-form-item",{attrs:{label:"放币时效:"}},[a("el-input",{attrs:{value:t.detaileData.paymentAveTime+"s",disabled:""}})],1),t._v(" "),a("el-form-item",{attrs:{label:"成交率:"}},[a("el-input",{attrs:{value:Math.floor(1e4*t.detaileData.succRate)/100+"%",disabled:""}})],1),t._v(" "),a("el-form-item",{attrs:{label:"确认时效:"}},[a("el-input",{attrs:{value:t.detaileData.letgoAveTime+"s",disabled:""}})],1),t._v(" "),a("el-form-item",{attrs:{label:"广告商状态:"}},[a("el-input",{attrs:{value:0==t.detaileData.sysStatus?"失效":"有效",disabled:""}})],1)],1):t._e()],1)],1),t._v(" "),a("div",[a("h3",[t._v("抢派单参数")]),t._v(" "),a("el-form",{staticClass:"panicBuying",attrs:{inline:!0,"label-width":"200px",model:t.MatchConfig}},[a("el-form-item",{attrs:{label:"派单兑入开关("+t.filterForm.coinName+")："}},[a("el-switch",{on:{change:t.onSysMatchSwitch},model:{value:t.sysMatchSwitch,callback:function(e){t.sysMatchSwitch=e},expression:"sysMatchSwitch"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"派单兑出开关("+t.filterForm.coinName+")："}},[a("el-switch",{on:{change:t.onSysCashoutSwitch},model:{value:t.sysCashoutSwitch,callback:function(e){t.sysCashoutSwitch=e},expression:"sysCashoutSwitch"}})],1),t._v(" "),a("br"),t._v(" "),a("el-form-item",{attrs:{label:"抢单兑入开关("+t.filterForm.coinName+")："}},[a("el-switch",{on:{change:t.onSysRushMatchSwitch},model:{value:t.sysRushMatchSwitch,callback:function(e){t.sysRushMatchSwitch=e},expression:"sysRushMatchSwitch"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"抢单兑出开关("+t.filterForm.coinName+")："}},[a("el-switch",{on:{change:t.onSysRushCashoutSwitch},model:{value:t.sysRushCashoutSwitch,callback:function(e){t.sysRushCashoutSwitch=e},expression:"sysRushCashoutSwitch"}})],1),t._v(" "),a("br"),t._v(" "),a("el-form-item",{attrs:{label:"派单兑入最小额度("+t.filterForm.coinName+")："}},[a("el-input",{attrs:{disabled:""},model:{value:t.MatchConfig.matchMin,callback:function(e){t.$set(t.MatchConfig,"matchMin",e)},expression:" MatchConfig.matchMin"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"派单兑入最大额度("+t.filterForm.coinName+")："}},[a("el-input",{attrs:{disabled:""},model:{value:t.MatchConfig.matchMax,callback:function(e){t.$set(t.MatchConfig,"matchMax",e)},expression:" MatchConfig.matchMax"}})],1),t._v(" "),a("br"),t._v(" "),a("el-form-item",{attrs:{label:"派单兑出最小额度("+t.filterForm.coinName+")："}},[a("el-input",{attrs:{disabled:""},model:{value:t.MatchConfig.cashoutMin,callback:function(e){t.$set(t.MatchConfig,"cashoutMin",e)},expression:" MatchConfig.cashoutMin"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"派单兑出最大额度("+t.filterForm.coinName+")："}},[a("el-input",{attrs:{disabled:""},model:{value:t.MatchConfig.cashoutMax,callback:function(e){t.$set(t.MatchConfig,"cashoutMax",e)},expression:" MatchConfig.cashoutMax"}})],1)],1)],1),t._v(" "),a("div",[a("h3",[t._v("邀请关系")]),t._v(" "),a("el-table",{staticStyle:{width:"100%","margin-bottom":"20px"},attrs:{data:t.inviteList,"row-key":"inviteeId",border:"","default-expand-all":"","tree-props":{children:"children",hasChildren:"hasChildren"}}},[a("el-table-column",{attrs:{prop:"inviteeName",label:"昵称"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"reward",label:"买入佣金费率"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[t._v("\n\t\t\t\t\t\t"+t._s(Math.floor(1e3*e.row.buyRate)/10)+"%\n\t\t\t\t\t")])}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"reward",label:"卖出佣金费率"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[t._v("\n\t\t\t\t\t\t"+t._s(Math.floor(1e3*e.row.rate)/10)+"%\n\t\t\t\t\t")])}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(a){return t.EditRate(e.row)}}},[t._v("修改佣金")]),t._v(" "),a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(a){return t.brokerage(e.row)}}},[t._v("迁移")])]}}])})],1)],1)]),t._v(" "),a("el-dialog",{attrs:{title:"修改佣金",visible:t.showDialog},on:{"update:visible":function(e){t.showDialog=e}}},[a("div",{staticClass:" inputGroup "},[a("span",[t._v("买入佣金费率：")]),t._v(" "),a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:t.buyRate,callback:function(e){t.buyRate=e},expression:"buyRate"}},[a("template",{slot:"append"},[t._v("%")])],2)],1),t._v(" "),a("div",{staticClass:" inputGroup "},[a("span",[t._v("卖出佣金费率：")]),t._v(" "),a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:t.rate,callback:function(e){t.rate=e},expression:"rate"}},[a("template",{slot:"append"},[t._v("%")])],2)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.showDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.updateRewardRate()}}},[t._v("确认修改")])],1)]),t._v(" "),a("el-dialog",{staticClass:"brokerageTable",attrs:{title:"迁移关系",visible:t.showDialog2,width:"650px"},on:{"update:visible":function(e){t.showDialog2=e}}},[a("div",{staticClass:" inputGroup "},[a("span",[t._v("账号/昵称：")]),t._v(" "),a("el-input",{attrs:{placeholder:"请输入账号/昵称"},model:{value:t.account,callback:function(e){t.account=e},expression:"account"}}),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.saerch}},[t._v("搜索")])],1),t._v(" "),a("el-table",{attrs:{size:"mini",data:t.listData.list,border:"",height:"500px"}},[a("el-table-column",{attrs:{prop:"account",label:"账号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"nickName",label:"昵称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"account",label:"操作",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text"},nativeOn:{click:function(a){return t.updateInviteShip(e.row.userId)}}},[t._v("迁移至该账号下")])]}}])})],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.listData.pageSize,"current-page":t.listData.pageNum},on:{handleChange:t.handleCurrentChange}})],1)],1)],1)},staticRenderFns:[]};var r=a("VU/8")(n,o,!1,function(t){a("ybnr")},"data-v-14c19a6b",null);e.default=r.exports},ybnr:function(t,e){}});