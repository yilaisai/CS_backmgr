webpackJsonp([47],{"6upf":function(t,e){},VwgS:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l={name:"accountsReceivableDetaile",data:function(){return{imgurl:"",imgShow:!1,detais:{},tableData:[],otcBindInfoList:[],OtcAuditPayRecdList:[],showRemark:!1,remark:"",userLevel:"",phone:"",nickName:"",obj:{}}},methods:{imgClick:function(t){this.imgurl=t,this.imgShow=!0},refuse:function(t){this.obj=t,this.showRemark=!0},getDetail:function(){var t=this;this.$http.post("/wallet/app/otc/backmgr/getCustomPayDetailInfo",{userId:this.$route.query.userId}).then(function(e){var a=e.result,l=a.otcBindInfoList,s=a.OtcAuditPayRecdList;t.OtcAuditPayRecdList=s,t.otcBindInfoList=l})},updatePayStatus:function(t,e){var a=this;this.$http.post("/wallet/app/otc/backmgr/updatePayStatus",{userId:t.userId,payId:t.recdId,status:e}).then(function(t){a.$message("操作成功"),a.getDetail()})},updateAuditPayStatus:function(t,e){var a=this;this.$http.post("/wallet/app/otc/backmgr/updateAuditPayStatus",{userId:t.userId,recdId:t.recdId,payId:t.payId,remark:this.remark,status:e}).then(function(t){a.$message("操作成功"),a.showRemark=!1,a.getDetail()})}},activated:function(){this.nickName=this.$route.query.nickName,this.phone=this.$route.query.phone,this.userLevel=this.$route.query.userLevel,this.getDetail()}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"query-details"},[a("label",[t._v("当前待审核：")]),t._v(" "),a("sac-table",{attrs:{data:t.OtcAuditPayRecdList}},[a("el-table-column",{attrs:{label:"账号"}},[a("span",[t._v(t._s(t.phone))])]),t._v(" "),a("el-table-column",{attrs:{label:"昵称"}},[a("span",[t._v(t._s(t.nickName))])]),t._v(" "),a("el-table-column",{attrs:{label:"用户类型"}},[a("span",[t._v(t._s(1==t.userLevel?"广告商":"普通用户"))])]),t._v(" "),a("el-table-column",{attrs:{prop:"coinName",label:"支付方式"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{},[t._v(t._s(1==e.row.payType?"银行卡":2==e.row.payType?"支付宝":"微信支付"))])}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"userName",label:"姓名"}}),t._v(" "),a("el-table-column",{attrs:{label:"账户/银行卡信息"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.payType?a("p",[t._v(t._s(e.row.bankBranch))]):t._e(),t._v(" "),a("p",[t._v(t._s(e.row.num))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"收款码",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.payType?a("p",[t._v("无")]):a("div",{staticClass:"qrcode"},[a("img",{attrs:{src:e.row.qrcode,alt:""}}),t._v(" "),a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(a){return t.imgClick(e.row.qrcode)}}},[t._v("查看大图")])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(a){return t.updateAuditPayStatus(e.row,1)}}},[t._v("通过")]),t._v(" "),a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(a){return t.refuse(e.row)}}},[t._v("拒绝")])]}}])})],1),t._v(" "),a("label",[t._v("当前已绑定：")]),t._v(" "),a("sac-table",{attrs:{data:t.otcBindInfoList}},[a("el-table-column",{attrs:{label:"账号"}},[a("span",[t._v(t._s(t.phone))])]),t._v(" "),a("el-table-column",{attrs:{label:"昵称"}},[a("span",[t._v(t._s(t.nickName))])]),t._v(" "),a("el-table-column",{attrs:{label:"用户类型"}},[a("span",[t._v(t._s(1==t.userLevel?"广告商":"普通用户"))])]),t._v(" "),a("el-table-column",{attrs:{prop:"coinName",label:"支付方式"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{},[t._v(t._s(1==e.row.payType?"银行卡":2==e.row.payType?"支付宝":"微信支付"))])}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"userName",label:"姓名"}}),t._v(" "),a("el-table-column",{attrs:{label:"账户/银行卡信息"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.payType?a("p",[t._v(t._s(e.row.bankBranch))]):t._e(),t._v(" "),a("p",[t._v(t._s(e.row.num))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"收款码",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.payType?a("p",[t._v("无")]):a("div",{staticClass:"qrcode"},[a("img",{attrs:{src:e.row.qrcode,alt:""}}),t._v(" "),a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(a){return t.imgClick(e.row.qrcode)}}},[t._v("查看大图")])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"isShow",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{},[t._v(t._s(1==e.row.isShow?"使用中":"已审核"))])}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"auditName",label:"审核人"}}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.isShow?a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(a){return t.updatePayStatus(e.row,2)}}},[t._v("停止使用")]):a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(a){return t.updatePayStatus(e.row,1)}}},[t._v("开始使用")])]}}])})],1),t._v(" "),a("el-dialog",{attrs:{title:"操作理由",visible:t.showRemark,width:"400"},on:{"update:visible":function(e){t.showRemark=e}}},[a("el-form",{ref:"form"},[a("el-form-item",{attrs:{label:"拒绝理由"}},[a("el-input",{attrs:{type:"textarea"},model:{value:t.remark,callback:function(e){t.remark="string"==typeof e?e.trim():e},expression:"remark"}})],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.showRemark=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"success"},on:{click:function(e){return t.updateAuditPayStatus(t.obj,2)}}},[t._v("确认")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"收款码",visible:t.imgShow,width:"500px"},on:{"update:visible":function(e){t.imgShow=e}}},[a("div",{staticStyle:{"padding-left":"20px"}},[a("img",{staticStyle:{width:"100%","vertical-align":"text-top"},attrs:{src:t.imgurl,alt:""}})])])],1)},staticRenderFns:[]};var n=a("VU/8")(l,s,!1,function(t){a("6upf")},null,null);e.default=n.exports}});