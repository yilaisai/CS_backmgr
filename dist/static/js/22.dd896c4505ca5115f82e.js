webpackJsonp([22],{SHhH:function(e,t){},zc4h:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("mvHQ"),i=a.n(r),s={name:"currency-set",data:function(){var e=function(e,t,a){/^[0-9]+.?[0-9]*$/.test(t)?a():a(new Error(e.message))};return{coinValue:"",ruleForm:{coinType:"",kingRewardRate:"",goldSilverRate:"",bronzeRewardRate:"",eachOneRate:""},sacTeamRewardList:[],tapIndex:"",teamName:"",teamId:"",server_path:"",pageTypeList:[],rules:{bronzeRewardRate:[{required:!0,message:"请输入数额",trigger:"blur"},{validator:e,message:"必须为数字"}],goldSilverRate:[{required:!0,message:"请输入数额",trigger:"blur"},{validator:e,message:"必须为数字"}],kingRewardRate:[{required:!0,message:"请输入数额",trigger:"blur"},{validator:e,message:"必须为数字"}],eachOneRate:[{required:!0,message:"请输入数额",trigger:"blur"},{validator:e,message:"必须为数字"}]}}},methods:{onSubmit:function(){var e=this;this.$refs.ruleForm.validate(function(t){if(!t)return!1;if(Number(e.ruleForm.kingRewardRate)+Number(e.ruleForm.goldSilverRate)+Number(e.ruleForm.bronzeRewardRate)+Number(e.ruleForm.eachOneRate)==100){JSON.parse(i()(e.ruleForm));e.$http.post("/supernode/backmgr/team/teamRewardSeting",{teamId:e.teamId,kingRewardRate:(e.ruleForm.kingRewardRate/100).toFixed(2),goldRewardRate:(e.ruleForm.goldSilverRate/100).toFixed(2),bronzeRewardRate:(e.ruleForm.bronzeRewardRate/100).toFixed(2),eachOneRate:(e.ruleForm.eachOneRate/100).toFixed(2)}).then(function(t){e.$message({type:"success",message:"修改成功！"}),e.$router.go(-1)})}else e.$notify({message:"各奖励百分比相加必须等于100%！",type:"error"})})},addPrize:function(e,t){var a=this;e.coinId&&""!=e.coinId?""!=(e.amount+"").trim()?t!=this.tapIndex-1?this.$http.post("/supernode/backmgr/team/teamCoinSeting",{teamId:this.teamId,coinId:e.coinId,amount:e.amount}).then(function(e){200==e.code&&(a.sacTeamRewardList[a.sacTeamRewardList.length-1].type=0,a.sacTeamRewardList.push({coinName:"",amount:"",type:1}))}):this.sacTeamRewardList.push({coinName:"",amount:"",type:1}):this.$notify({message:"请输入币种的数量",type:"error"}):this.$notify({message:"请选择币种类型",type:"error"})},deletePrize:function(e,t){var a=this,r=e.coinName;"number"!=typeof r&&(r=e.coinId),this.$http.post("/supernode/backmgr/team/delTeamCoinSeting",{teamId:this.teamId,coinId:r}).then(function(e){a.getTeamRewardSeting(a.teamId)})},filter:function(e){return void 0==e?"":100*e},getTeamRewardSeting:function(e){var t=this;this.$http.post("/supernode/backmgr/team/getTeamRewardSeting",{teamId:e}).then(function(e){var a=e.result||{};t.ruleForm={eachOneRate:t.filter(a.eachOneRate),goldSilverRate:t.filter(a.goldSilverRate),kingRewardRate:t.filter(a.kingRewardRate),bronzeRewardRate:t.filter(a.bronzeRewardRate),sacTeamRewardCoinResultDtoList:a.sacTeamRewardCoinResultDtoList,teamId:a.teamId,id:a.id},(e.result||{}).sacTeamRewardCoinResultDtoList&&0!=(e.result||{}).sacTeamRewardCoinResultDtoList.length?(t.sacTeamRewardList=(e.result||{}).sacTeamRewardCoinResultDtoList,t.tapIndex=(e.result||{}).sacTeamRewardCoinResultDtoList.length):(t.sacTeamRewardList=[{coinName:"",amount:"",type:1}],t.tapIndex=""),t.ruleForm.coinType=(t.sacTeamRewardList[0]||{}).coinName})},getCoinInfoList:function(){var e=this;this.$http.post("/supernode/coin/open/getCoinInfoList",{}).then(function(t){e.pageTypeList=t.result})}},activated:function(){this.getCoinInfoList(),this.server_path=SERVER_PATH,this.$route.query&&(this.teamName=this.$route.query.teamName,this.teamId=this.$route.query.teamId,this.getTeamRewardSeting(this.teamId))}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"set-prize"},[a("el-row",{staticStyle:{"margin-bottom":"20px"}},[a("el-col",{attrs:{span:8}},[a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(t){e.$router.go(-1)}}},[e._v("返回")])],1),e._v(" "),a("h2",[e._v(e._s(e.teamName)+"奖励设置")])],1),e._v(" "),a("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"230px"}},[e._l(e.sacTeamRewardList,function(t,r){return a("el-form-item",{key:r,attrs:{label:e.teamName+"总奖励:",required:""}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{prop:"coinType"}},[a("el-select",{ref:"coinType",refInFor:!0,model:{value:t.coinId,callback:function(a){e.$set(t,"coinId",a)},expression:"teamReward.coinId"}},e._l(e.pageTypeList,function(e,t){return a("el-option",{key:t,attrs:{label:e.coinName,value:e.coinId}})}))],1)],1),e._v(" "),a("el-col",{staticClass:"line",attrs:{span:1}}),e._v(" "),a("el-col",{attrs:{span:7}},[a("el-form-item",{attrs:{prop:"coinNumber"}},[a("el-input",{staticClass:"min-input",attrs:{clearable:"",size:"small",placeholder:"请输入数量"},model:{value:t.amount,callback:function(a){e.$set(t,"amount",a)},expression:"teamReward.amount"}})],1)],1),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:!t.type,expression:"!teamReward.type"}],staticStyle:{width:"100px"},attrs:{type:"danger",size:"small"},on:{click:function(a){e.deletePrize(t,r)}}},[e._v("删除")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:r==e.sacTeamRewardList.length-1,expression:"index == sacTeamRewardList.length - 1"}],staticStyle:{width:"100px"},attrs:{type:"primary",size:"small"},on:{click:function(a){e.addPrize(t,r)}}},[e._v("添加")])],1)}),e._v(" "),a("el-form-item",{attrs:{label:"王者奖励百分比:",prop:"kingRewardRate"}},[a("el-input",{staticStyle:{width:"80%"},attrs:{clearable:"",size:"small",placeholder:"请输入百分比"},model:{value:e.ruleForm.kingRewardRate,callback:function(t){e.$set(e.ruleForm,"kingRewardRate",t)},expression:"ruleForm.kingRewardRate"}},[a("template",{slot:"append"},[e._v("%")])],2)],1),e._v(" "),a("el-form-item",{attrs:{label:"钻石+铂金奖励百分比:",prop:"goldSilverRate",required:""}},[a("el-input",{staticStyle:{width:"80%"},attrs:{size:"small",placeholder:"请输入百分比",clearable:""},model:{value:e.ruleForm.goldSilverRate,callback:function(t){e.$set(e.ruleForm,"goldSilverRate",t)},expression:"ruleForm.goldSilverRate"}},[a("template",{slot:"append"},[e._v("%")])],2)],1),e._v(" "),a("el-form-item",{attrs:{label:"黄金奖励百分比:",prop:"bronzeRewardRate"}},[a("el-input",{staticStyle:{width:"80%"},attrs:{clearable:"",size:"small",placeholder:"请输入百分比"},model:{value:e.ruleForm.bronzeRewardRate,callback:function(t){e.$set(e.ruleForm,"bronzeRewardRate",t)},expression:"ruleForm.bronzeRewardRate"}},[a("template",{slot:"append"},[e._v("%")])],2)],1),e._v(" "),a("el-form-item",{attrs:{label:"总人数奖励百分比:",prop:"eachOneRate"}},[a("el-input",{staticStyle:{width:"80%"},attrs:{clearable:"",size:"small",placeholder:"请输入百分比"},model:{value:e.ruleForm.eachOneRate,callback:function(t){e.$set(e.ruleForm,"eachOneRate",t)},expression:"ruleForm.eachOneRate"}},[a("template",{slot:"append"},[e._v("%")])],2)],1),e._v(" "),a("p",{staticClass:"total-prize"},[e._v("*各奖励百分比相加等于100%")]),e._v(" "),a("el-form-item",{staticStyle:{"text-align":"center",width:"80%","margin-top":"60px"},attrs:{size:"small"}},[a("el-button",{staticStyle:{width:"100px"},attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("提交")]),e._v(" "),a("el-button",{staticStyle:{width:"100px"},attrs:{type:"danger"},on:{click:function(t){e.$router.go(-1)}}},[e._v("取消")])],1)],2)],1)},staticRenderFns:[]};var l=a("VU/8")(s,o,!1,function(e){a("SHhH")},null,null);t.default=l.exports}});