webpackJsonp([49],{dd8O:function(e,t){},ixX9:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=r("mvHQ"),l=r.n(s),i={name:"ruleSetting",data:function(){return{coinList:[],registList:[],dialogTitle:"",dialogFormVisible:!1,ruleForm:{coinId:"",lower:"",middle:"",senior:"",service:"",peers:""},isFix:!1,rules:{coinId:[{required:!0,message:"请选择币种",trigger:"change"}],lower:[{required:!0,message:"请输入初级代理提成",trigger:"blur"}],middle:[{required:!0,message:"请输入中级代理提成",trigger:"blur"}],senior:[{required:!0,message:"请输入高级代理提成",trigger:"blur"}],service:[{required:!0,message:"请输入服务中心提成",trigger:"blur"}],peers:[{required:!0,message:"请输入平级补助",trigger:"blur"}]}}},methods:{remove:function(e){var t=this,r=e.id;this.$confirm("确定删除吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.delete("/wallet/backmgr/shop/deleteAgencyRuleById",{id:r}).then(function(e){t.$notify({title:"成功",message:"删除成功",type:"success"}),t.getList()})})},registerSwitchChange:function(e){var t=this,r=e.state,s=e.id;this.$http.get("/wallet/backmgr/shop/updateRuleStatus",{status:r?"enable":"disable",id:s}).then(function(e){t.$notify({title:"成功",message:(r?"上架":"下架")+" 成功",type:"success"}),t.getList()}).catch(function(){t.getList()})},addSend:function(){this.dialogTitle="新建返佣规则",this.dialogFormVisible=!0,this.isFix=!1,this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},modification:function(e){this.dialogTitle="修改返佣规则",this.dialogFormVisible=!0,this.isFix=!0,this.$refs.ruleForm&&this.$refs.ruleForm.resetFields(),this.ruleForm=JSON.parse(l()(e)),this.ruleForm.lower=100*this.ruleForm.lower,this.ruleForm.middle=100*this.ruleForm.middle,this.ruleForm.senior=100*this.ruleForm.senior,this.ruleForm.service=100*this.ruleForm.service,this.ruleForm.peers=100*this.ruleForm.peers,this.getSampleCoinInfo()},registDetermine:function(){var e=this;this.$refs.ruleForm.validate(function(t){if(!t)return!1;var r=e.ruleForm,s=r.coinId,l=r.id,i=r.lower,o=r.middle,n=r.senior,a=r.service,u=r.peers;e.ruleForm.id?e.$http.put("/wallet/backmgr/shop/updateAgencyRule",{id:l,lower:i/100,middle:o/100,senior:n/100,service:a/100,peers:u/100}).then(function(t){e.$notify({title:"成功",message:"修改成功",type:"success"}),e.dialogFormVisible=!1,e.getList()}):e.$http.post("/wallet/backmgr/shop/addAgencyRule",{coinId:s,lower:i/100,middle:o/100,senior:n/100,service:a/100,peers:u/100}).then(function(t){e.$notify({title:"成功",message:"创建成功",type:"success"}),e.dialogFormVisible=!1,e.getList()})})},getSampleCoinInfo:function(){var e=this;this.$http.post("wallet/backmgr/coin/getSampleCoinInfo",{}).then(function(t){e.coinList=t.result.list})},getList:function(){var e=this;this.$http.post("/wallet/backmgr/shop/listAgencyRule",{pageNum:1,pageSize:200}).then(function(t){e.registList=t.result.list})}},activated:function(){this.getList(),this.getSampleCoinInfo()}},o={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"ruleSetting"},[r("el-col",{staticStyle:{"text-align":"right","margin-bottom":"10px"},attrs:{span:22}},[r("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.addSend}},[e._v("创建规则")])],1),e._v(" "),r("sac-table",{attrs:{data:e.registList}},[r("el-table-column",{attrs:{prop:"coinId",label:"返佣币种"}}),e._v(" "),r("el-table-column",{attrs:{prop:"lower",label:"初级代理提成"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(100*t.row.lower)+"%\n      ")]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"middle",label:"中级代理提成"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(100*t.row.middle)+"%\n      ")]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"senior",label:"高级代理提成"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(100*t.row.senior)+"%\n      ")]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"service",label:"服务中心提成"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(100*t.row.service)+"%\n      ")]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"peers",label:"平级补助"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(100*t.row.peers)+"%\n      ")]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"上架"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-switch",{attrs:{"inactive-value":0,"active-value":1},nativeOn:{click:function(r){return e.registerSwitchChange(t.row)}},model:{value:t.row.state,callback:function(r){e.$set(t.row,"state",r)},expression:"scope.row.state"}})]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"操作",width:"150px"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"success",size:"small",disabled:1==t.row.state},nativeOn:{click:function(r){return e.modification(t.row)}}},[e._v("修改\n        ")]),e._v(" "),r("el-button",{attrs:{type:"danger",size:"small",disabled:1==t.row.state},nativeOn:{click:function(r){return e.remove(t.row)}}},[e._v("删除\n        ")])]}}])})],1),e._v(" "),r("el-dialog",{staticClass:"register_dialog",attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"135px"}},[r("el-form-item",{staticClass:"from_box_item",attrs:{label:"返佣币种：",prop:"coinId",size:"small"}},[r("el-select",{attrs:{placeholder:"请选择返佣币种",disabled:e.isFix},model:{value:e.ruleForm.coinId,callback:function(t){e.$set(e.ruleForm,"coinId",t)},expression:"ruleForm.coinId"}},e._l(e.coinList,function(e){return r("el-option",{key:e.coinId,attrs:{label:e.coinName,value:e.coinId}})}),1)],1),e._v(" "),r("el-form-item",{staticClass:"from_box_item",attrs:{label:"初级代理提成：",prop:"lower"}},[r("el-input",{attrs:{type:"number",size:"small",placeholder:""},model:{value:e.ruleForm.lower,callback:function(t){e.$set(e.ruleForm,"lower",t)},expression:"ruleForm.lower"}},[r("span",{attrs:{slot:"suffix"},slot:"suffix"},[e._v("%")])])],1),e._v(" "),r("el-form-item",{staticClass:"from_box_item",attrs:{label:"中级代理提成：≤",prop:"middle"}},[r("el-input",{attrs:{type:"number",size:"small",placeholder:""},model:{value:e.ruleForm.middle,callback:function(t){e.$set(e.ruleForm,"middle",t)},expression:"ruleForm.middle"}},[r("span",{attrs:{slot:"suffix"},slot:"suffix"},[e._v("%")])])],1),e._v(" "),r("el-form-item",{staticClass:"from_box_item",attrs:{label:"高级代理提成：",prop:"senior"}},[r("el-input",{attrs:{type:"number",size:"small",placeholder:""},model:{value:e.ruleForm.senior,callback:function(t){e.$set(e.ruleForm,"senior",t)},expression:"ruleForm.senior"}},[r("span",{attrs:{slot:"suffix"},slot:"suffix"},[e._v("%")])])],1),e._v(" "),r("el-form-item",{staticClass:"from_box_item",attrs:{label:"服务中心提成：",prop:"service"}},[r("el-input",{attrs:{type:"number",size:"small",placeholder:""},model:{value:e.ruleForm.service,callback:function(t){e.$set(e.ruleForm,"service",t)},expression:"ruleForm.service"}},[r("span",{attrs:{slot:"suffix"},slot:"suffix"},[e._v("%")])])],1),e._v(" "),r("el-form-item",{staticClass:"from_box_item",attrs:{label:"平级补助：",prop:"peers"}},[r("el-input",{attrs:{type:"number",size:"small",placeholder:""},model:{value:e.ruleForm.peers,callback:function(t){e.$set(e.ruleForm,"peers",t)},expression:"ruleForm.peers"}},[r("span",{attrs:{slot:"suffix"},slot:"suffix"},[e._v("%")])])],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.registDetermine}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var n=r("VU/8")(i,o,!1,function(e){r("dd8O")},null,null);t.default=n.exports}});