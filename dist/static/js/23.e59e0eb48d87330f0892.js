webpackJsonp([23],{"5M6E":function(e,t){},sxjN:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});a("s0MJ");var l={name:"transaction-details",components:{EditBalance:a("zVN5").a},data:function(){return{dialogFormVisible:!1,selectUserId:"",selectedDate:[],currentPage:1,filterForm:{pageNum:1,pageSize:20,startDate:"",userEnterprise:"",endDate:"",account:"",nickName:"",userLevel:"",userRole:""},userTypeForm:{userLevel:"1",userEnterprise:"1"},advList:[{value:"普通用户",label:"0"},{value:"普通广告商",label:"1"},{value:"高级广告商",label:"2"},{value:"企业广告商",label:"3"}],companyType:[{value:"法币账户",label:"0"},{value:"资产账户",label:"1"}],listData:{total:null,list:[]}}},methods:{getList:function(){var e=this;this.selectedDate&&2==this.selectedDate.length?(this.filterForm.startDate=this.selectedDate&&this.$fmtDate(this.selectedDate[0].getTime())+" 00:00:00",this.filterForm.endDate=this.selectedDate&&this.$fmtDate(this.selectedDate[1].getTime())+" 23:59:59"):(this.filterForm.startDate="",this.filterForm.endDate=""),this.$http.post("/wallet/app/otc/backmgr/queryOtcUser",this.filterForm).then(function(t){var a=t.result,l=a.list,s=a.total;e.listData.list=l,e.listData.total=s})},updateOtcUserLevel:function(e){var t=this;this.$http.post("/wallet/app/otc/backmgr/updateOtcUserLevel",this.userTypeForm).then(function(e){t.$message.success("类型修改成功"),t.dialogFormVisible=!1,t.getList()})},dateChange:function(){},editType:function(e){this.userTypeForm={userLevel:e.userLevel+"",userEnterprise:e.userEnterprise+"",userId:e.userId},this.dialogFormVisible=!0},setDateType:function(){var e=new Date,t=e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate();this.selectedDate=[t,t]},search:function(){this.getList()},checkLog:function(){this.$router.push({path:"customer-log"})},checkDetails:function(){this.$router.push({path:"complaint-details"})},handleCurrentChange:function(e,t){this.filterForm.pageSize=e,this.filterForm.pageNum=t,this.getList()},download:function(){location.href=SERVER_PATH+"/wallet/app/otc/backmgr/exportExcel?startDate="+this.filterForm.startDate+"&endDate="+this.filterForm.endDate+"&userId="+this.filterForm.userId+"&token="+localStorage.getItem("cus_token")}},activated:function(){this.getList()}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"userQuery-page"},[a("el-container",[a("el-main",[a("el-form",{ref:"filterForm",attrs:{inline:!0,model:e.filterForm,"label-width":"86px",size:"mini"}},[a("div",{staticClass:"form-group"},[a("el-form-item",{attrs:{label:"账号:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入用户账号"},model:{value:e.filterForm.account,callback:function(t){e.$set(e.filterForm,"account",t)},expression:"filterForm.account"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"用户编号:"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入用户编号"},model:{value:e.filterForm.nickName,callback:function(t){e.$set(e.filterForm,"nickName",t)},expression:"filterForm.nickName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"企业类型:"}},[a("el-select",{model:{value:e.filterForm.userEnterprise,callback:function(t){e.$set(e.filterForm,"userEnterprise",t)},expression:"filterForm.userEnterprise"}},[a("el-option",{attrs:{value:"",label:"所有"}}),e._v(" "),e._l(e.companyType,function(e,t){return a("el-option",{key:t,attrs:{value:e.label,label:e.value}})})],2)],1)],1),e._v(" "),a("div",{staticClass:"form-group"},[a("el-form-item",{staticClass:"dateItem",attrs:{label:"时间:"}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期",format:"yyyy-MM-dd ","end-placeholder":"结束日期"},on:{change:e.dateChange},model:{value:e.selectedDate,callback:function(t){e.selectedDate=t},expression:"selectedDate"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},nativeOn:{click:function(t){return e.search(t)}}},[e._v("搜索")])],1)],1)]),e._v(" "),a("el-table",{attrs:{data:e.listData.list,border:"",size:"mini",height:"100%"}},[a("el-table-column",{attrs:{label:"账户/用户编号"},scopedSlots:e._u([{key:"default",fn:function(t){return a("div",{staticClass:"scope"},[e._v(e._s(t.row.account)+" -- "+e._s(t.row.nickName))])}}])}),e._v(" "),a("el-table-column",{attrs:{label:"企业类型",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return a("div",{staticClass:"scope"},[0==t.row.userEnterprise?a("span",[e._v("非企业号")]):e._e(),e._v(" "),1==t.row.userEnterprise?a("span",[e._v("企业号")]):e._e()])}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"price",label:"卖出佣金费",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(t.row.inviteRateDtoList,function(t,l){return a("span",{key:l},[e._v(e._s(t.payTypeName)+": "+e._s(Math.floor(1e4*t.saleFee)/100)+"% ")])})}}])}),e._v(" "),a("el-table-column",{attrs:{label:"注册时间",width:"140"},scopedSlots:e._u([{key:"default",fn:function(t){return a("div",{},[e._v(e._s(e.$fmtDate(t.row.registTimeStamp,"full")))])}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"price",label:"操作",fixed:"right",width:"290"},scopedSlots:e._u([{key:"default",fn:function(t){return a("div",{staticClass:"scope"},[a("el-button",{attrs:{type:"primary",size:"mini"},nativeOn:{click:function(a){return e.$router.push({path:"/LegalCurrency/userQueryDetaile",query:{userId:t.row.userId}})}}},[e._v("查看详情")]),e._v(" "),a("el-button",{attrs:{type:"warning",size:"mini"},nativeOn:{click:function(a){return e.editType(t.row)}}},[e._v("修改类型")]),e._v(" "),a("el-button",{attrs:{type:"danger",size:"mini"},nativeOn:{click:function(a){return e.$refs.editBalance.editBalance(t.row.userId)}}},[e._v("修改余额")])],1)}}])})],1)],1),e._v(" "),a("el-footer",[a("sac-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listData.list.length>0,expression:"listData.list.length>0"}],attrs:{total:+e.listData.total,"page-size":e.filterForm.pageSize,"current-page":e.filterForm.pageNum},on:{handleChange:e.handleCurrentChange}})],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"修改用户类型",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{model:e.userTypeForm}},[a("el-form-item",{attrs:{label:"企业类型调整：","label-width":"140px"}},[a("el-select",{attrs:{placeholder:"请选择企业类型"},model:{value:e.userTypeForm.userEnterprise,callback:function(t){e.$set(e.userTypeForm,"userEnterprise",t)},expression:"userTypeForm.userEnterprise"}},e._l(e.companyType,function(e,t){return a("el-option",{key:t,attrs:{label:e.value,value:e.label}})}),1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.updateOtcUserLevel}},[e._v("确 定")])],1)],1),e._v(" "),a("EditBalance",{ref:"editBalance"})],1)},staticRenderFns:[]};var r=a("VU/8")(l,s,!1,function(e){a("5M6E")},"data-v-68bc5268",null);t.default=r.exports},zVN5:function(e,t,a){"use strict";var l={props:{},data:function(){return{editBalanceShow:!1,balanceData:{userId:"",amount:"",assetsAmount:"",otcAmount:"",otcOrWallet:"",remarks:"",subOrAdd:""}}},methods:{modifyAmount:function(){var e=this;""!=this.balanceData.otcOrWallet?""!=this.balanceData.subOrAdd?""!=this.balanceData.amount?""!=this.balanceData.remarks?this.$http.post("/wallet/app/otc/backmgr/modifyAmount",this.balanceData).then(function(t){200==t.code?(e.$message.success(t.msg),e.editBalanceShow=!1):e.$message.error(t.msg)}):this.$message.error("请输入操作理由"):this.$message.error("请输入修改数量"):this.$message.error("请选择修改类型"):this.$message.error("请选择账户类型")},amountInput:function(){this.balanceData.amount=this.balanceData.amount+"",this.balanceData.amount=this.balanceData.amount.replace(/^\.$/g,""),this.balanceData.amount=this.balanceData.amount.replace(/[^\d.]/g,""),this.balanceData.amount=this.balanceData.amount.replace(/\.{2,}/g,"."),this.balanceData.amount=this.balanceData.amount.replace(".","$#$").replace(/\./g,"").replace("$#$","."),this.balanceData.amount=this.balanceData.amount.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,"$1$2.$3"),this.balanceData.amount.indexOf(".")<0&&""!=this.balanceData.amount&&(this.balanceData.amount=parseFloat(this.balanceData.amount))},editBalance:function(e){var t=this;this.$http.post("/wallet/app/otc/backmgr/queryUserBalance",{userId:e}).then(function(a){200==a.code?(t.balanceData={userId:e,amount:"",assetsAmount:a.result.amount,otcAmount:a.result.otcAmount,otcOrWallet:"",remarks:"",subOrAdd:""},t.editBalanceShow=!0):t.$message.error(a.msg)})}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:"修改用户余额",visible:e.editBalanceShow},on:{"update:visible":function(t){e.editBalanceShow=t}}},[a("p",[e._v("当前用户资产账户余额："+e._s(e.balanceData.assetsAmount)+" RMT")]),e._v(" "),a("p",[e._v("当前用户法币账户余额："+e._s(e.balanceData.otcAmount)+" RMT")]),e._v(" "),a("el-form",{attrs:{model:e.balanceData}},[a("el-form-item",{attrs:{label:"修改账户类型：","label-width":"110px"}},[a("el-select",{attrs:{placeholder:"请选择账户类型"},model:{value:e.balanceData.otcOrWallet,callback:function(t){e.$set(e.balanceData,"otcOrWallet",t)},expression:"balanceData.otcOrWallet"}},[a("el-option",{attrs:{label:"资产账户",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"法币账户",value:"2"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"修改数量：","label-width":"110px"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入内容"},on:{input:e.amountInput},model:{value:e.balanceData.amount,callback:function(t){e.$set(e.balanceData,"amount",t)},expression:"balanceData.amount"}},[a("el-select",{attrs:{slot:"prepend",placeholder:"请选择"},slot:"prepend",model:{value:e.balanceData.subOrAdd,callback:function(t){e.$set(e.balanceData,"subOrAdd",t)},expression:"balanceData.subOrAdd"}},[a("el-option",{attrs:{label:"减少",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"增加",value:"1"}})],1),e._v(" "),a("span",{attrs:{slot:"append"},slot:"append"},[e._v("RMT")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"操作理由：","label-width":"110px"}},[a("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入内容"},model:{value:e.balanceData.remarks,callback:function(t){e.$set(e.balanceData,"remarks",t)},expression:"balanceData.remarks"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.editBalanceShow=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.modifyAmount}},[e._v("确 定")])],1)],1)},staticRenderFns:[]},r=a("VU/8")(l,s,!1,null,null,null);t.a=r.exports}});