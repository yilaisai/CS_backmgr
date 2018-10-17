webpackJsonp([42],{hRkD:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"currency"},[n("el-col",{staticStyle:{"text-align":"right","margin-bottom":"30px"},attrs:{span:22}},[n("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.addCoin}},[t._v("创建币种")])],1),t._v(" "),n("sac-table",{attrs:{data:t.listData.list}},[n("el-table-column",{attrs:{prop:"coinName",label:"币种",width:"70"}}),t._v(" "),n("el-table-column",{attrs:{prop:"tranInMinAmount",label:"最小转账数额",formatter:t.formatSex}}),t._v(" "),n("el-table-column",{attrs:{prop:"tranOutFee",label:"转账手续费",formatter:t.formatTranOutFee}}),t._v(" "),n("el-table-column",{attrs:{prop:"tranLimitNrealName",label:"未身份认证每日转账限额",formatter:t.formatTranLimitNrealName,width:"120"}}),t._v(" "),n("el-table-column",{attrs:{prop:"auditInMinAmount",label:"后台审核转账限额",formatter:t.formatMinAmount}}),t._v(" "),n("el-table-column",{attrs:{prop:"smsCkInMinAmount",label:"短信验证限额",formatter:t.formatSmsCkAmount}}),t._v(" "),n("el-table-column",{attrs:{prop:"smsInNoticeMinAmount",label:"短信通知限额",formatter:t.formatSmsNoticeAmount}}),t._v(" "),n("el-table-column",{attrs:{label:"操作",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"success",size:"small"},nativeOn:{click:function(n){t.modification(e.row)}}},[t._v("修改")])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"充值",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-switch",{attrs:{"inactive-value":0,"active-value":1},nativeOn:{click:function(n){t.updateCoinInfo(e.row)}},model:{value:e.row.isDeposit,callback:function(n){t.$set(e.row,"isDeposit",n)},expression:"scope.row.isDeposit"}})]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"提币",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-switch",{attrs:{"inactive-value":0,"active-value":1},nativeOn:{click:function(n){t.switchChange(e.row)}},model:{value:e.row.isWithdraw,callback:function(n){t.$set(e.row,"isWithdraw",n)},expression:"scope.row.isWithdraw"}})]}}])})],1),t._v(" "),n("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:t.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+t.listData.total,"page-size":t.pageSize,"current-page":t.pageNum},on:{handleChange:t.getPaginationChange}})],1)},staticRenderFns:[]};var i=n("VU/8")({name:"currency",data:function(){return{pageNum:1,pageSize:20,listData:{total:null,list:[]}}},methods:{addCoin:function(){this.$router.push({name:"currencySet",params:{}})},getPaginationChange:function(t,e){this.pageSize=t,this.pageNum=e,this.getCoinInfoList()},formatSex:function(t,e){return"站内"+t.tranInMinAmount+t.coinName+"  站外"+t.tranOutMinAmount+t.coinName},formatTranOutFee:function(t,e){return"站内"+t.tranInFee+t.coinName+"  站外"+t.tranOutFee+t.coinName},formatTranLimitNrealName:function(t,e){return""+t.tranLimitNrealName+t.coinName},formatMinAmount:function(t,e){return"站内"+t.auditInMinAmount+"RMB  站外"+t.auditOutMinAmount+"RMB"},formatSmsCkAmount:function(t,e){return"站内"+t.smsCkInMinAmount+"RMB  站外"+t.smsCkOutMinAmount+"RMB"},formatSmsNoticeAmount:function(t,e){return"站内"+t.smsInNoticeMinAmount+"RMB  站外"+t.smsOutNoticeMinAmount+"RMB"},getCoinInfoList:function(){var t=this,e=this.pageNum,n=this.pageSize;this.$http.post("wallet/backmgr/coin/getCoinInfoList.do",{pageNum:e,pageSize:n}).then(function(e){var n=e.result.list,a=n.list,i=n.total;t.listData.list=a,t.listData.total=i})},updateCoinInfo:function(t){var e=this,n=t.coinId,a=t.isDeposit,i=t.coinName;this.$http.post("wallet/backmgr/coin/updateCoinInfoIsDeposit.do",{isDeposit:a?"YES":"NO",id:n}).then(function(t){e.$notify({title:"成功",message:i+" "+(a?"开启充值":"关闭充值")+" 成功",type:"success"}),e.getCoinInfoList()})},switchChange:function(t){var e=this,n=t.coinId,a=t.isWithdraw,i=t.coinName;this.$http.post("wallet/backmgr/coin/updateCoinInfoIsWithdraw.do",{isWithdraw:a?"YES":"NO",id:n}).then(function(t){e.$notify({title:"成功",message:i+" "+(a?"开启提币":"关闭提币")+" 成功",type:"success"}),e.getCoinInfoList()})},modification:function(t){this.$router.push({name:"currencySet",params:t})}},activated:function(){this.getCoinInfoList()}},a,!1,function(t){n("tES5")},null,null);e.default=i.exports},tES5:function(t,e){}});