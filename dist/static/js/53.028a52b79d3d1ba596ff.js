webpackJsonp([53],{gyBe:function(e,t){},uRMq:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=l("Xxa5"),i=l.n(a),r=l("exGp"),s=l.n(r),o=l("mvHQ"),n=l.n(o),u=(l("s0MJ"),{name:"margin",data:function(){return{activeName:"first",dateTime:[],filterForm:{userId:"",type:"",startTime:"",endTime:"",pageNum:1,pageSize:20},listData:{total:null,list:[]},registList:[],coinList:[],gradeListObj:{0:"铜卡",1:"银卡",2:"金卡",3:"钻石卡"},gradeList:[{label:"铜卡",value:0},{label:"银卡",value:1},{label:"金卡",value:2},{label:"钻石卡",value:3}],directionList:[{label:"全部",value:""},{label:"充值",value:1},{label:"提取",value:2}],dialogTitle:"",dialogFormVisible:!1,ruleForm:{coinId:"",level:"",amount:"",payCoinId:"",brushNumber:"",brushRate:"",coinDetail:""},rules:{coinId:[{required:!0,message:"请选择币种",trigger:"change"}],level:[{required:!0,message:"请选择等级",trigger:"change"}],amount:[{required:!0,message:"请输入金额",trigger:"blur"}],brushNumber:[{required:!0,message:"请输入刷单数",trigger:"blur"}],brushRate:[{required:!0,message:"请输入刷单数",trigger:"blur"}],payCoinId:[{required:!0,message:"请选择收益币种",trigger:"change"}],coinDetail:[{required:!0,message:"请输入项目URL",trigger:"blur"}]},isFix:!1,coinName:""}},methods:{getPaginationChange:function(e,t){this.filterForm.pageSize=e,this.filterForm.pageNum=t,this.getRegistInviteRule()},modification:function(e){this.dialogTitle="修改保证金规则",this.dialogFormVisible=!0,this.isFix=!0,this.resetRuleForm(),this.ruleForm=JSON.parse(n()(e)),this.ruleForm.brushRate=100*this.ruleForm.brushRate,this.getCoinName(e.coinId)},remove:function(e){var t=this,l=e.id;this.$confirm("确定删除吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.delete("/cloud/backmgr/shop/deleteMarginRuleById",{id:l}).then(function(e){t.$notify({title:"成功",message:"删除成功",type:"success"}),t.getRegistRewardRuleList()})})},addSend:function(){this.dialogTitle="新建保证金规则",this.dialogFormVisible=!0,this.isFix=!1,this.resetRuleForm()},resetRuleForm:function(){this.ruleForm={coinId:"",level:"",amount:"",payCoinId:"",brushNumber:"",brushRate:"",coinDetail:""},this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},getRegistInviteRule:function(){var e=this;return s()(i.a.mark(function t(){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.filterForm.startTime=e.dateTime&&e.dateTime[0],e.filterForm.endTime=e.dateTime&&e.dateTime[1],e.$http.post("/cloud/backmgr/shop/listMarginLog",e.filterForm).then(function(t){e.listData.list=t.result.list,e.listData.total=t.result.count});case 3:case"end":return t.stop()}},t,e)}))()},getRegistRewardRuleList:function(){var e=this,t=this.dateTime&&this.dateTime[0],l=this.dateTime&&this.dateTime[1],a=this.filterForm.userId;this.$http.post("/cloud/backmgr/shop/listMarginRule",{pageNum:1,pageSize:200,userId:a,startTime:t,endTime:l}).then(function(t){e.registList=t.result.list})},registDetermine:function(){var e=this;this.$refs.ruleForm.validate(function(t){if(!t)return!1;var l=e.ruleForm,a=l.coinId,i=l.id,r=l.level,s=l.amount,o=l.payCoinId,n=l.brushNumber,u=l.brushRate,m=l.coinDetail;e.ruleForm.id?e.$http.put("/cloud/backmgr/shop/updateMarginRule",{coinId:a,id:i,level:r,amount:s,payCoinId:o,brushNumber:n,brushRate:u/100,coinDetail:m}).then(function(t){e.$notify({title:"成功",message:"修改成功",type:"success"}),e.dialogFormVisible=!1,e.getRegistRewardRuleList()}):e.$http.post("/cloud/backmgr/shop/addMarginRule",{coinId:a,level:r,amount:s,payCoinId:o,brushNumber:n,brushRate:u/100,coinDetail:m}).then(function(t){e.$notify({title:"成功",message:"创建成功",type:"success"}),e.dialogFormVisible=!1,e.getRegistRewardRuleList()})})},getSampleCoinInfo:function(){var e=this;this.$http.post("wallet/backmgr/coin/getSampleCoinInfo.do",{}).then(function(t){e.coinList=t.result.list})},getCoinName:function(e){var t=this;this.coinList.forEach(function(l){l.coinId==e&&(t.coinName=l.coinName)})},getLevel:function(){}},activated:function(){this.getRegistInviteRule(),this.getRegistRewardRuleList(),this.getSampleCoinInfo()}}),m={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"margin"},[l("el-form",{directives:[{name:"show",rawName:"v-show",value:"first"==e.activeName,expression:"activeName=='first'"}],ref:"filterForm",attrs:{inline:!0,"label-width":"90px",rules:e.rules,model:e.filterForm}},[l("sac-input",{ref:"phone",attrs:{label:"账号",prop:"phone"},model:{value:e.filterForm.userId,callback:function(t){e.$set(e.filterForm,"userId","string"==typeof t?t.trim():t)},expression:"filterForm.userId"}}),e._v(" "),l("el-form-item",{staticClass:"from_box_item",attrs:{label:"方向：",size:"small"}},[l("el-select",{attrs:{placeholder:"请选择方向"},model:{value:e.filterForm.type,callback:function(t){e.$set(e.filterForm,"type",t)},expression:"filterForm.type"}},e._l(e.directionList,function(e,t){return l("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),l("el-form-item",{staticClass:"sac-time",attrs:{label:"日　　期:"}},[l("el-date-picker",{attrs:{size:"small","value-format":"yyyy-MM-dd HH:mm:ss",type:"datetimerange","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.dateTime,callback:function(t){e.dateTime=t},expression:"dateTime"}})],1),e._v(" "),l("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(t){e.getRegistInviteRule()}}})],1),e._v(" "),l("el-col",{directives:[{name:"show",rawName:"v-show",value:"second"==e.activeName,expression:"activeName=='second'"}],staticStyle:{"text-align":"right","margin-bottom":"10px"},attrs:{span:22}},[l("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.addSend}},[e._v("创建规则")])],1),e._v(" "),l("div",{staticClass:"margin-main"},[l("el-tabs",{attrs:{type:"border-card"},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[l("el-tab-pane",{attrs:{label:"记录",name:"first"}},[l("sac-table",{attrs:{data:e.listData.list}},[l("el-table-column",{attrs:{prop:"type",label:"方向"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n              "+e._s(1===t.row.type?"充值 ":"提取")+"\n            ")]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"userId",label:"账号"}}),e._v(" "),l("el-table-column",{attrs:{prop:"amount",label:"金额"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n              "+e._s(t.row.amount)+" "+e._s(t.row.coinName)+"\n            ")]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"createTime",label:"时间"}})],1)],1),e._v(" "),l("el-tab-pane",{attrs:{label:"规则",name:"second"}},[l("sac-table",{attrs:{data:e.registList}},[l("el-table-column",{attrs:{prop:"levelName",label:"等级"}}),e._v(" "),l("el-table-column",{attrs:{prop:"amount",label:"金额"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n              "+e._s(t.row.amount)+" "+e._s(t.row.payCoinName)+"\n            ")]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"brushNumber",label:"刷单数"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n              "+e._s(t.row.brushNumber)+" "+e._s(t.row.payCoinName)+"\n            ")]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"brushRate",label:"刷单收益"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n              "+e._s(100*t.row.brushRate)+"%\n            ")]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"coinName",label:"收益币种"}}),e._v(" "),l("el-table-column",{attrs:{prop:"coinDetail",label:"项目URL"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("a",{attrs:{href:t.row.coinDetail,target:"_blank"}},[e._v(e._s(t.row.coinDetail))])]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"createTime",width:"150px",label:"创建时间"}}),e._v(" "),l("el-table-column",{attrs:{label:"操作",width:"150px"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{type:"success",size:"small"},nativeOn:{click:function(l){e.modification(t.row)}}},[e._v("修改\n              ")]),e._v(" "),l("el-button",{attrs:{type:"danger",size:"small"},nativeOn:{click:function(l){e.remove(t.row)}}},[e._v("删除\n              ")])]}}])})],1)],1)],1)],1),e._v(" "),l("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:"first"==e.activeName&&e.listData.list.length>0,expression:"activeName=='first'&&listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.filterForm.pageSize,"current-page":e.filterForm.pageNum},on:{handleChange:e.getPaginationChange}}),e._v(" "),l("el-dialog",{staticClass:"register_dialog",attrs:{title:e.dialogTitle,visible:e.dialogFormVisible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[l("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"135px"}},[l("el-form-item",{staticClass:"from_box_item",attrs:{label:"充值币种：",prop:"payCoinId",size:"small"}},[l("el-select",{attrs:{placeholder:"请选择充值币种"},on:{change:e.getCoinName},model:{value:e.ruleForm.payCoinId,callback:function(t){e.$set(e.ruleForm,"payCoinId",t)},expression:"ruleForm.payCoinId"}},e._l(e.coinList,function(e){return l("el-option",{key:e.coinId,attrs:{label:e.coinName,value:e.coinId}})}))],1),e._v(" "),l("el-form-item",{staticClass:"from_box_item",attrs:{label:"等级：",prop:"level",size:"small"}},[l("el-select",{attrs:{placeholder:"请选择等级",disabled:e.isFix},model:{value:e.ruleForm.level,callback:function(t){e.$set(e.ruleForm,"level",t)},expression:"ruleForm.level"}},e._l(e.gradeList,function(e,t){return l("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),l("el-form-item",{staticClass:"from_box_item",attrs:{label:"金额：",prop:"amount"}},[l("el-input",{attrs:{type:"number",size:"small",placeholder:""},model:{value:e.ruleForm.amount,callback:function(t){e.$set(e.ruleForm,"amount",t)},expression:"ruleForm.amount"}})],1),e._v(" "),l("el-form-item",{staticClass:"from_box_item",attrs:{label:"刷单数：≤",prop:"brushNumber"}},[l("el-input",{attrs:{type:"number",size:"small",placeholder:""},model:{value:e.ruleForm.brushNumber,callback:function(t){e.$set(e.ruleForm,"brushNumber",t)},expression:"ruleForm.brushNumber"}},[l("span",{attrs:{slot:"suffix"},slot:"suffix"},[e._v(e._s(e.coinName))])])],1),e._v(" "),l("el-form-item",{staticClass:"from_box_item",attrs:{label:"刷单收益：",prop:"brushRate"}},[l("el-input",{attrs:{type:"number",size:"small",placeholder:""},model:{value:e.ruleForm.brushRate,callback:function(t){e.$set(e.ruleForm,"brushRate",t)},expression:"ruleForm.brushRate"}},[l("span",{attrs:{slot:"suffix"},slot:"suffix"},[e._v("%")])])],1),e._v(" "),l("el-form-item",{staticClass:"from_box_item",attrs:{label:"收益币种：",prop:"coinId",size:"small"}},[l("el-select",{attrs:{placeholder:"请选择收益币种"},model:{value:e.ruleForm.coinId,callback:function(t){e.$set(e.ruleForm,"coinId",t)},expression:"ruleForm.coinId"}},e._l(e.coinList,function(e){return l("el-option",{key:e.coinId,attrs:{label:e.coinName,value:e.coinId}})}))],1),e._v(" "),l("el-form-item",{attrs:{label:"项目URL：",prop:"coinDetail"}},[l("el-input",{model:{value:e.ruleForm.coinDetail,callback:function(t){e.$set(e.ruleForm,"coinDetail",t)},expression:"ruleForm.coinDetail"}})],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.registDetermine}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var c=l("VU/8")(u,m,!1,function(e){l("gyBe")},null,null);t.default=c.exports}});