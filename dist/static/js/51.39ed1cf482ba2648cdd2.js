webpackJsonp([51],{GNDt:function(e,t){},x68E:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=l("//Fk"),a=l.n(i),r=l("mvHQ"),s=l.n(r),o=l("Xxa5"),n=l.n(o),u=l("exGp"),m=l.n(u),c=(l("s0MJ"),{name:"send-money",data:function(){return{activeName2:"first",pageNum:1,pageSize:20,listData:{total:null,list:[]},dialogTitle:"",registerDialogTitle:"",dialogFormVisible:!1,registerDialogFormVisible:!1,ruleForm:{coinId:"",coinName:"",roleCoinId:"",directInvitedAmount:"",secInvitedAmount:"",effectSec:"",inviteAmount:"",inviteAuthState:"",invitedAuthState:"",inviteCount:"",loginDay:"",maxInviteAmount:"",remainAmount:"",sysStatus:"",totalAmount:"",tranStatus:"",beginDate:"",endDate:"",isOnshelf:"",sendCount:"",registAmount:"",personCount:"",personNub:""},rules:{coinId:[{required:!0,message:"请选择币种",trigger:"change"}],amount:[{required:!0,message:"请输入送币数量",trigger:"blur"},{validator:function(e,t,l){/^[0-9]+.?[0-9]*$/.test(t)?l():l(new Error(e.message))},message:"送币数量必须为数字"}],startTime:[{required:!0,message:"请选择生效时间",trigger:"change"}],endTime:[{required:!0,message:"请选择失效时间",trigger:"change"}]},effectSecData:[{value:0,text:"不给予"},{value:1,text:"给予"}],needData:[{value:0,text:"不需要"},{value:1,text:"需要"}],sysStatusData:[{value:0,text:"失效"},{value:1,text:"生效"}],isOnshelfData:[{value:0,text:"下架"},{value:1,text:"上架"}],tranStatusData:[{value:0,text:"不需要"},{value:1,text:"需要"},{value:2,text:"链上"}],coinList:[],ruleCoinList:[],registList:[],registRuleForm:{coinId:"",amount:"",startTime:"",endTime:""},rulelist:[]}},methods:{InvitePrizes:function(){var e={};e.personCount=this.ruleForm.personCount,e.personNub=this.ruleForm.personNub,e.roleCoinId=this.ruleForm.roleCoinId,e.coinName=this.ruleForm.coinName,this.rulelist.push(e)},selectGetCoinName:function(e){var t;t=this.ruleCoinList.find(function(t){return t.coinId===e}),this.ruleForm.coinName=t.coinName},deleteRule:function(e){this.rulelist.splice(e,1)},resetForm:function(){this.ruleForm={coinId:"",directInvitedAmount:"",secInvitedAmount:"",effectSec:"",inviteAmount:"",inviteAuthState:"",invitedAuthState:"",inviteCount:"",loginDay:"",maxInviteAmount:"",remainAmount:"",sysStatus:"",totalAmount:"",tranStatus:"",beginDate:"",endDate:"",isOnshelf:""},this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},formatSex:function(e,t){return">="+e.minAmount+"  <="+e.maxAmount},getRegistInviteRule:function(){var e=this;return m()(n.a.mark(function t(){var l,i;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getSampleCoinInfo();case 2:l=e.pageNum,i=e.pageSize,e.$http.post("wallet/backmgr/registInviteRule/getRegistInviteRule",{pageNum:l,pageSize:i}).then(function(t){var l=t.result.list,i=t.result.list.length;e.listData.list=l,e.listData.total=i});case 4:case"end":return t.stop()}},t,e)}))()},switchChange:function(e){var t=this;if(e.sysStatus){var l=e.isOnshelf,i=e.id;this.$http.post("wallet/backmgr/registInviteRule/updateRegistInviteRuleIsOnShelf",{isOnShelf:l?"YES":"NO",id:i}).then(function(e){t.$notify({title:"成功",message:(l?"上架":"下架")+" 成功",type:"success"}),t.getRegistInviteRule()})}},switchSysStatusChange:function(e){var t=this,l=e.sysStatus,i=e.id;this.$http.post("wallet/backmgr/registInviteRule/updateRegistInviteRuleStatue",{status:l,id:i}).then(function(e){t.$notify({title:"成功",message:(l?"生效":"失效")+" 成功",type:"success"}),t.getRegistInviteRule()})},remove:function(e){var t=this,l=e.id;this.$confirm("确定删除吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.post("wallet/backmgr/registInviteRule/delRegistInviteRule",{id:l}).then(function(e){t.$notify({title:"成功",message:"删除成功",type:"success"}),t.getRegistInviteRule()})})},addSend:function(){this.dialogTitle="创建邀请规则",this.dialogFormVisible=!0,this.resetForm()},modification:function(e){this.dialogTitle="修改邀请规则",this.dialogFormVisible=!0,this.resetForm(),this.ruleForm=JSON.parse(s()(e)),this.ruleForm.beginDate=new Date(this.ruleForm.beginDate),this.ruleForm.endDate=new Date(this.ruleForm.endDate)},determine:function(){var e=this;this.$refs.ruleForm.validate(function(t){if(!t)return!1;if(e.ruleForm.id){var l=e.ruleForm;delete l.beginTime,delete l.endTime,delete l.createTime,delete l.updateTime,l.endDate=e.formatDateTime(new Date(l.endDate)),l.beginDate=e.formatDateTime(new Date(l.beginDate)),e.$http.post("wallet/backmgr/registInviteRule/updateRegistInviteRule",l).then(function(t){e.$notify({title:"成功",message:"修改成功",type:"success"}),e.dialogFormVisible=!1,e.getRegistInviteRule()})}else{var i=e.ruleForm;i.endDate=e.formatDateTime(new Date(i.endDate)),i.beginDate=e.formatDateTime(new Date(i.beginDate)),e.$http.post("wallet/backmgr/registInviteRule/createRegistInviteRule",i).then(function(t){e.$notify({title:"成功",message:"创建成功",type:"success"}),e.dialogFormVisible=!1,e.getRegistInviteRule()})}})},getSampleCoinInfo:function(){var e=this;return new a.a(function(t,l){e.$http.post("wallet/backmgr/coin/getSampleCoinInfo",{}).then(function(l){e.coinList=l.result.list,e.ruleCoinList=l.result.list,t()})})},formatDateTime:function(e){var t=e.getFullYear(),l=e.getMonth()+1;l=l<10?"0"+l:l;var i=e.getDate();i=i<10?"0"+i:i;var a=e.getHours();a=a<10?"0"+a:a;var r=e.getMinutes();r=r<10?"0"+r:r;var s=e.getSeconds();return t+"-"+l+"-"+i+" "+a+":"+r+":"+(s=s<10?"0"+s:s)},foo:function(e,t){var l=t.column;if(l.className)return e("el-tooltip",{class:"item",attrs:{effect:"dark",content:l.className,placement:"bottom"}},[e("span",[l.label,e("i",{class:"el-icon-question"})])])},resetRegistRuleForm:function(){this.registRuleForm={coinId:"",amount:"",startTime:"",endTime:""},this.$refs.registRuleForm&&this.$refs.registRuleForm.resetFields()},registerAddSend:function(){this.registerDialogTitle="创建注册送币规则",this.registerDialogFormVisible=!0,this.resetRegistRuleForm()},registerModification:function(e){this.resetRegistRuleForm(),this.registerDialogTitle="修改注册送币规则",this.registerDialogFormVisible=!0,this.registRuleForm=JSON.parse(s()(e))},getRegistRewardRuleList:function(){var e=this;this.$http.post("wallet/backmgr/reward/getRegistRewardRuleList",{pageNum:1,pageSize:200}).then(function(t){e.registList=t.result.list})},registerSwitchChange:function(e){var t=this,l=e.isShow,i=e.id;this.$http.post("wallet/backmgr/reward/updateRegistRewardRuleShowType",{isShow:l?"SHOW":"HIDE",id:i}).then(function(e){t.$notify({title:"成功",message:(l?"上架":"下架")+" 成功",type:"success"}),t.getRegistRewardRuleList()}).catch(function(){t.getRegistRewardRuleList()})},registerRemove:function(e){var t=this,l=e.id;this.$confirm("确定删除吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.post("wallet/backmgr/reward/deleteRegistRewardRule",{id:l}).then(function(e){t.$notify({title:"成功",message:"删除成功",type:"success"}),t.getRegistRewardRuleList()})})},registDetermine:function(){var e=this;this.$refs.registRuleForm.validate(function(t){if(!t)return!1;var l=e.registRuleForm,i=l.coinId,a=l.id,r=l.amount,s=l.startTime,o=l.endTime;e.registRuleForm.id?e.$http.post("wallet/backmgr/reward/updateRegistRewardRule",{coinId:i,id:a,amount:r,startTime:s,endTime:o}).then(function(t){e.$notify({title:"成功",message:"修改成功",type:"success"}),e.registerDialogFormVisible=!1,e.getRegistRewardRuleList()}):e.$http.post("wallet/backmgr/reward/createRegistRewardRule",{coinId:i,amount:r,startTime:s,endTime:o}).then(function(t){e.$notify({title:"成功",message:"创建成功",type:"success"}),e.registerDialogFormVisible=!1,e.getRegistRewardRuleList()})})}},activated:function(){this.getRegistInviteRule(),this.getRegistRewardRuleList()}}),d={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"send-money"},[l("el-tabs",{attrs:{type:"border-card"},model:{value:e.activeName2,callback:function(t){e.activeName2=t},expression:"activeName2"}},[l("el-tab-pane",{attrs:{label:"邀请好友送币",name:"first"}},[l("el-col",{staticStyle:{"text-align":"right","margin-bottom":"10px"},attrs:{span:22}},[l("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.addSend}},[e._v("创建规则")])],1),e._v(" "),l("sac-table",{attrs:{data:e.listData.list}},[l("el-table-column",{attrs:{prop:"createTime",label:"创建时间",width:"140"}}),e._v(" "),l("el-table-column",{attrs:{prop:"coinId",label:"币种","class-name":"选择送出的币类型","render-header":e.foo},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(e.coinList,function(i){return t.row.coinId==i.coinId?l("div",{key:i.coinId},[e._v(e._s(i.coinName))]):e._e()})}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"directInvitedAmount",label:"邀请奖励",width:"100","class-name":"邀请单个好友时，给予邀请人的奖励","render-header":e.foo}}),e._v(" "),l("el-table-column",{attrs:{prop:"registAmount",label:"被邀请人奖励",width:"100"}}),e._v(" "),l("el-table-column",{attrs:{prop:"secInvitedAmount",label:"父奖励","class-name":"邀请单个好友时，给予父邀请人的奖励","render-header":e.foo}}),e._v(" "),l("el-table-column",{attrs:{prop:"effectSec",label:"父奖励状态",width:"100","class-name":"是否给予邀请单个好友时，父邀请人的奖励","render-header":e.foo},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(e.effectSecData,function(i){return t.row.effectSec==i.value?l("div",{key:i.coinId},[e._v(e._s(i.text))]):e._e()})}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"inviteAmount",label:"邀请数奖励",width:"100","class-name":"邀请人邀请用户数达到一定数量奖励多少币，与邀请单个好友冲突","render-header":e.foo}}),e._v(" "),l("el-table-column",{attrs:{prop:"inviteAuthState",label:"邀请人实名",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(e.needData,function(i){return t.row.inviteAuthState==i.value?l("div",{key:i.coinId},[e._v(e._s(i.text))]):e._e()})}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"inviteCount",label:"邀请人数"}}),e._v(" "),l("el-table-column",{attrs:{prop:"invitedAuthState",label:"被邀请人实名",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(e.needData,function(i){return t.row.invitedAuthState==i.value?l("div",{key:i.coinId},[e._v(e._s(i.text))]):e._e()})}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"loginDay",label:"登录天数"}}),e._v(" "),l("el-table-column",{attrs:{prop:"maxInviteAmount",label:"送币上限"}}),e._v(" "),l("el-table-column",{attrs:{prop:"remainAmount",label:"奖池余额"}}),e._v(" "),l("el-table-column",{attrs:{prop:"totalAmount",label:"奖池总额",width:"100","class-name":"0表示不限制","render-header":e.foo}}),e._v(" "),l("el-table-column",{attrs:{prop:"tranStatus",label:"转账"},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(e.tranStatusData,function(i){return t.row.tranStatus==i.value?l("div",{key:i.tranStatus},[e._v(e._s(i.text))]):e._e()})}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"beginDate",label:"生效时间",width:"140"}}),e._v(" "),l("el-table-column",{attrs:{prop:"endDate",label:"失效时间",width:"140"}}),e._v(" "),l("el-table-column",{attrs:{prop:"sendCount",label:"数/天","class-name":"每天送币次数，0表示不限制","render-header":e.foo}}),e._v(" "),l("el-table-column",{attrs:{prop:"sendDay",label:"分发天数"}}),e._v(" "),l("el-table-column",{attrs:{label:"操作",width:"150",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{type:"success",disabled:0!=t.row.isOnshelf,size:"small"},nativeOn:{click:function(l){return e.modification(t.row)}}},[e._v("修改\n            ")]),e._v(" "),l("el-button",{attrs:{type:"danger",size:"small",disabled:0!=t.row.sysStatus},nativeOn:{click:function(l){return e.remove(t.row)}}},[e._v("删除\n            ")])]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"系统状态",width:"100",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-switch",{attrs:{"inactive-value":0,"active-value":1,aaa:t.row.sysStatus},nativeOn:{click:function(l){return e.switchSysStatusChange(t.row)}},model:{value:t.row.sysStatus,callback:function(l){e.$set(t.row,"sysStatus",l)},expression:"scope.row.sysStatus"}})]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"上架",width:"100",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-switch",{attrs:{disabled:0==t.row.sysStatus,"inactive-value":0,"active-value":1},nativeOn:{click:function(l){return e.switchChange(t.row)}},model:{value:t.row.isOnshelf,callback:function(l){e.$set(t.row,"isOnshelf",l)},expression:"scope.row.isOnshelf"}})]}}])})],1)],1),e._v(" "),l("el-tab-pane",{attrs:{label:"注册送币",name:"second"}},[l("el-col",{staticStyle:{"text-align":"right","margin-bottom":"10px"},attrs:{span:22}},[l("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.registerAddSend}},[e._v("创建规则")])],1),e._v(" "),l("sac-table",{attrs:{data:e.registList}},[l("el-table-column",{attrs:{prop:"coinType",label:"币种"}}),e._v(" "),l("el-table-column",{attrs:{prop:"amount",label:"送币量"}}),e._v(" "),l("el-table-column",{attrs:{prop:"startTime",label:"生效时间"}}),e._v(" "),l("el-table-column",{attrs:{prop:"endTime",label:"失效时间"}}),e._v(" "),l("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{type:"success",disabled:0!=t.row.isShow,size:"small"},nativeOn:{click:function(l){return e.registerModification(t.row)}}},[e._v("修改\n            ")]),e._v(" "),l("el-button",{attrs:{type:"danger",size:"small",disabled:0!=t.row.isShow},nativeOn:{click:function(l){return e.registerRemove(t.row)}}},[e._v("删除\n            ")])]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"上架"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-switch",{attrs:{"inactive-value":0,"active-value":1},nativeOn:{click:function(l){return e.registerSwitchChange(t.row)}},model:{value:t.row.isShow,callback:function(l){e.$set(t.row,"isShow",l)},expression:"scope.row.isShow"}})]}}])})],1)],1)],1),e._v(" "),l("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[l("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,"label-width":"130px"}},[l("div",{staticClass:"from_box"},[l("el-form-item",{staticClass:"from_box_item",attrs:{label:"币种:",prop:"coinId"}},[l("el-select",{attrs:{placeholder:"请选择",size:"small"},model:{value:e.ruleForm.coinId,callback:function(t){e.$set(e.ruleForm,"coinId",t)},expression:"ruleForm.coinId"}},e._l(e.coinList,function(e){return l("el-option",{key:e.coinId,attrs:{label:e.coinName,value:e.coinId}})}),1)],1),e._v(" "),l("el-form-item",{staticClass:"from_box_item",attrs:{label:"邀请奖励:",prop:"directInvitedAmount"}},[l("el-input",{attrs:{type:"number",size:"small",placeholder:""},model:{value:e.ruleForm.directInvitedAmount,callback:function(t){e.$set(e.ruleForm,"directInvitedAmount",t)},expression:"ruleForm.directInvitedAmount"}})],1)],1),e._v(" "),l("div",{staticClass:"from_box"},[l("el-form-item",{staticClass:"from_box_item",attrs:{label:"父奖励:",prop:"secInvitedAmount"}},[l("el-input",{attrs:{type:"number",size:"small",placeholder:""},model:{value:e.ruleForm.secInvitedAmount,callback:function(t){e.$set(e.ruleForm,"secInvitedAmount",t)},expression:"ruleForm.secInvitedAmount"}})],1),e._v(" "),l("el-form-item",{staticClass:"from_box_item",attrs:{label:"父奖励状态:",prop:"effectSec"}},[l("el-select",{attrs:{size:"small",placeholder:"请选择"},model:{value:e.ruleForm.effectSec,callback:function(t){e.$set(e.ruleForm,"effectSec",t)},expression:"ruleForm.effectSec"}},e._l(e.effectSecData,function(e){return l("el-option",{key:e.value,attrs:{label:e.text,value:e.value}})}),1)],1)],1),e._v(" "),l("div",{staticClass:"from_box"},[l("el-form-item",{staticClass:"from_box_item",attrs:{label:"邀请数奖励:",prop:"inviteAmount"}},[l("el-input",{attrs:{type:"number",size:"small",placeholder:""},model:{value:e.ruleForm.inviteAmount,callback:function(t){e.$set(e.ruleForm,"inviteAmount",t)},expression:"ruleForm.inviteAmount"}})],1),e._v(" "),l("el-form-item",{staticClass:"from_box_item",attrs:{label:"邀请人实名:",prop:"inviteAuthState"}},[l("el-select",{attrs:{size:"small",placeholder:"请选择"},model:{value:e.ruleForm.inviteAuthState,callback:function(t){e.$set(e.ruleForm,"inviteAuthState",t)},expression:"ruleForm.inviteAuthState"}},e._l(e.needData,function(e){return l("el-option",{key:e.value,attrs:{label:e.text,value:e.value}})}),1)],1)],1),e._v(" "),l("div",{staticClass:"from_box"},[l("el-form-item",{staticClass:"from_box_item",attrs:{label:"被邀请人实名:",prop:"invitedAuthState"}},[l("el-select",{attrs:{size:"small",placeholder:"请选择"},model:{value:e.ruleForm.invitedAuthState,callback:function(t){e.$set(e.ruleForm,"invitedAuthState",t)},expression:"ruleForm.invitedAuthState"}},e._l(e.needData,function(e){return l("el-option",{key:e.value,attrs:{label:e.text,value:e.value}})}),1)],1),e._v(" "),l("el-form-item",{staticClass:"from_box_item",attrs:{label:"邀请人数:",prop:"inviteCount"}},[l("el-input",{attrs:{size:"small",type:"number",placeholder:""},model:{value:e.ruleForm.inviteCount,callback:function(t){e.$set(e.ruleForm,"inviteCount",t)},expression:"ruleForm.inviteCount"}})],1)],1),e._v(" "),l("div",{staticClass:"from_box"},[l("el-form-item",{staticClass:"from_box_item",attrs:{label:"登录天数:",prop:"loginDay"}},[l("el-input",{attrs:{size:"small",type:"number",placeholder:""},model:{value:e.ruleForm.loginDay,callback:function(t){e.$set(e.ruleForm,"loginDay",t)},expression:"ruleForm.loginDay"}})],1),e._v(" "),l("el-form-item",{staticClass:"from_box_item",attrs:{label:"送币上限:",prop:"maxInviteAmount"}},[l("el-input",{attrs:{size:"small",type:"number",placeholder:""},model:{value:e.ruleForm.maxInviteAmount,callback:function(t){e.$set(e.ruleForm,"maxInviteAmount",t)},expression:"ruleForm.maxInviteAmount"}})],1)],1),e._v(" "),l("div",{staticClass:"from_box"},[l("el-form-item",{staticClass:"from_box_item",attrs:{label:"奖池余额:",prop:"remainAmount"}},[l("el-input",{attrs:{size:"small",type:"number",placeholder:""},model:{value:e.ruleForm.remainAmount,callback:function(t){e.$set(e.ruleForm,"remainAmount",t)},expression:"ruleForm.remainAmount"}})],1),e._v(" "),l("el-form-item",{staticClass:"from_box_item",attrs:{label:"系统状态:",prop:"sysStatus"}},[l("el-select",{attrs:{size:"small",placeholder:"请选择"},model:{value:e.ruleForm.sysStatus,callback:function(t){e.$set(e.ruleForm,"sysStatus",t)},expression:"ruleForm.sysStatus"}},e._l(e.sysStatusData,function(e){return l("el-option",{key:e.value,attrs:{label:e.text,value:e.value}})}),1)],1)],1),e._v(" "),l("div",{staticClass:"from_box"},[l("el-form-item",{staticClass:"from_box_item",attrs:{label:"奖池总额:",prop:"totalAmount"}},[l("el-input",{attrs:{type:"number",size:"small",placeholder:""},model:{value:e.ruleForm.totalAmount,callback:function(t){e.$set(e.ruleForm,"totalAmount",t)},expression:"ruleForm.totalAmount"}})],1),e._v(" "),l("el-form-item",{staticClass:"from_box_item",attrs:{label:"转账:",prop:"tranStatus"}},[l("el-select",{attrs:{size:"small",placeholder:"请选择"},model:{value:e.ruleForm.tranStatus,callback:function(t){e.$set(e.ruleForm,"tranStatus",t)},expression:"ruleForm.tranStatus"}},e._l(e.tranStatusData,function(e){return l("el-option",{key:e.value,attrs:{label:e.text,value:e.value}})}),1)],1)],1),e._v(" "),l("div",{staticClass:"from_box"},[l("el-form-item",{staticClass:"from_box_item",attrs:{label:"生效时间:",prop:"beginDate"}},[l("el-date-picker",{attrs:{size:"small",type:"datetime",placeholder:"选择生效时间"},model:{value:e.ruleForm.beginDate,callback:function(t){e.$set(e.ruleForm,"beginDate",t)},expression:"ruleForm.beginDate"}})],1),e._v(" "),l("el-form-item",{staticClass:"from_box_item",attrs:{label:"失效时间:",prop:"endDate"}},[l("el-date-picker",{attrs:{size:"small",type:"datetime",placeholder:"选择失效时间"},model:{value:e.ruleForm.endDate,callback:function(t){e.$set(e.ruleForm,"endDate",t)},expression:"ruleForm.endDate"}})],1)],1),e._v(" "),l("div",{staticClass:"from_box"},[l("el-form-item",{staticClass:"from_box_item",attrs:{label:"数/天:",prop:"sendCount"}},[l("el-input",{attrs:{size:"small",type:"number",placeholder:""},model:{value:e.ruleForm.sendCount,callback:function(t){e.$set(e.ruleForm,"sendCount",t)},expression:"ruleForm.sendCount"}})],1),e._v(" "),l("el-form-item",{staticClass:"from_box_item",attrs:{label:"被邀请人奖励:",prop:"registAmount",formatter:e.formatSex}},[l("el-input",{attrs:{size:"small",type:"number",placeholder:""},model:{value:e.ruleForm.registAmount,callback:function(t){e.$set(e.ruleForm,"registAmount",t)},expression:"ruleForm.registAmount"}})],1)],1),e._v(" "),l("div",{staticClass:"from_box"},[l("el-form-item",{staticClass:"from_box_item",attrs:{label:"分发天数:",prop:"sendDay"}},[l("el-input",{attrs:{size:"small",type:"number",placeholder:""},model:{value:e.ruleForm.sendDay,callback:function(t){e.$set(e.ruleForm,"sendDay",t)},expression:"ruleForm.sendDay"}})],1)],1),e._v(" "),l("el-card",{staticClass:"box-card",staticStyle:{overflow:"hidden",padding:"20px 20px 10px"}},[l("div",{staticStyle:{width:"50%",float:"left"}},[l("div",{staticClass:"from_box"},[l("el-form-item",{staticClass:"from_box_item noWidth",attrs:{label:"累计邀请大于等于:",prop:"personNub"}},[l("el-input",{attrs:{size:"small",type:"number",placeholder:"请输入"},model:{value:e.ruleForm.personNub,callback:function(t){e.$set(e.ruleForm,"personNub",t)},expression:"ruleForm.personNub"}})],1)],1),e._v(" "),l("div",{staticClass:"from_box"},[l("el-form-item",{staticClass:"from_box_item noWidth",attrs:{label:"用户额外送:",prop:"personCount"}},[l("el-input",{attrs:{size:"small",type:"number",placeholder:"请输入"},model:{value:e.ruleForm.personCount,callback:function(t){e.$set(e.ruleForm,"personCount",t)},expression:"ruleForm.personCount"}})],1)],1),e._v(" "),l("div",{staticClass:"from_box"},[l("el-form-item",{staticClass:"from_box_item noWidth",attrs:{label:"币种:",prop:"roleCoinId"}},[l("el-select",{attrs:{placeholder:"请选择",size:"small"},on:{change:e.selectGetCoinName},model:{value:e.ruleForm.roleCoinId,callback:function(t){e.$set(e.ruleForm,"roleCoinId",t)},expression:"ruleForm.roleCoinId"}},e._l(e.ruleCoinList,function(e){return l("el-option",{key:e.coinId,attrs:{label:e.coinName,value:e.coinId}})}),1)],1)],1),e._v(" "),l("div",{staticClass:"from_box",staticStyle:{"text-align":"center"}},[l("el-button",{attrs:{size:"small"},on:{click:e.InvitePrizes}},[e._v("增加")])],1)]),e._v(" "),l("div",{staticClass:"elCard_left"},e._l(e.rulelist,function(t,i){return e.rulelist.length>0?l("div",{key:i,staticClass:"text item"},[l("i",{staticClass:"el-icon-circle-close-outline",on:{click:function(t){return e.deleteRule(i)}}}),e._v("\n              "+e._s("累计邀请大于等于"+t.personNub+"个用户额外送"+t.personCount+"个"+t.coinName)+"\n            ")]):e._e()}),0)])],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.determine}},[e._v("确 定")])],1)],1),e._v(" "),l("el-dialog",{staticClass:"register_dialog",attrs:{title:e.registerDialogTitle,visible:e.registerDialogFormVisible},on:{"update:visible":function(t){e.registerDialogFormVisible=t}}},[l("el-form",{ref:"registRuleForm",attrs:{model:e.registRuleForm,rules:e.rules,"label-width":"135px"}},[l("div",{staticClass:"from_box"},[l("el-form-item",{staticClass:"from_box_item",attrs:{label:"币种:",prop:"coinId",size:"small"}},[l("el-select",{attrs:{placeholder:"请选择"},model:{value:e.registRuleForm.coinId,callback:function(t){e.$set(e.registRuleForm,"coinId",t)},expression:"registRuleForm.coinId"}},e._l(e.coinList,function(e){return l("el-option",{key:e.coinId,attrs:{label:e.coinName,value:e.coinId}})}),1)],1)],1),e._v(" "),l("div",{staticClass:"from_box"},[l("el-form-item",{staticClass:"from_box_item",attrs:{label:"送币量:",prop:"amount"}},[l("el-input",{attrs:{size:"small",placeholder:""},model:{value:e.registRuleForm.amount,callback:function(t){e.$set(e.registRuleForm,"amount",t)},expression:"registRuleForm.amount"}})],1)],1),e._v(" "),l("div",{staticClass:"from_box"},[l("el-form-item",{staticClass:"from_box_item",attrs:{label:"生效时间:",prop:"startTime"}},[l("el-date-picker",{attrs:{size:"small","value-format":"yyyy-MM-dd HH:mm:ss",type:"datetime",placeholder:"选择生效时间"},model:{value:e.registRuleForm.startTime,callback:function(t){e.$set(e.registRuleForm,"startTime",t)},expression:"registRuleForm.startTime"}})],1),e._v(" "),l("el-form-item",{staticClass:"from_box_item",attrs:{label:"失效时间:",prop:"endTime"}},[l("el-date-picker",{attrs:{size:"small","value-format":"yyyy-MM-dd HH:mm:ss",type:"datetime",placeholder:"选择失效时间"},model:{value:e.registRuleForm.endTime,callback:function(t){e.$set(e.registRuleForm,"endTime",t)},expression:"registRuleForm.endTime"}})],1)],1)]),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.registDetermine}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var p=l("VU/8")(c,d,!1,function(e){l("GNDt")},null,null);t.default=p.exports}});