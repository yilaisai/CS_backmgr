webpackJsonp([10],{"6BoA":function(t,e){},H7vA:function(t,e){},iZvc:function(t,e){},qq4F:function(t,e){},ulUV:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={props:{formData:{type:Object}},data:function(){return{pickerOptions:{disabledDate:function(t){return t.getTime()>Date.now()},shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}},{text:"最近半年",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-15552e6),t.$emit("pick",[a,e])}},{text:"最近一年",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-31536e6),t.$emit("pick",[a,e])}}]}}},methods:{}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-collapse",{attrs:{value:"1"}},[a("el-collapse-item",{attrs:{title:"查询条件",name:"1"}},[a("el-form",{ref:"form",attrs:{model:t.formData,inline:"",size:"mini","label-width":"100px"}},[a("el-form-item",{attrs:{label:"商户编号："}},[a("el-input",{model:{value:t.formData.nickName,callback:function(e){t.$set(t.formData,"nickName",e)},expression:"formData.nickName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"UserId："}},[a("el-input",{model:{value:t.formData.userId,callback:function(e){t.$set(t.formData,"userId",e)},expression:"formData.userId"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.$emit("getData",t.formData)}}},[t._v("查询")])],1)],1)],1)],1)},staticRenderFns:[]};var o=a("C7Lr")(n,i,!1,function(t){a("qq4F")},"data-v-5ca78d55",null).exports,r={props:{list:{type:Array}},data:function(){return{}},methods:{limitTime:function(t,e){var a=Math.floor((t-e)/1e3);return Math.floor(a/3600)+"小时"+Math.floor(a%3600/60)+"分"+a%60+"秒"}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table-wrap"},[t._m(0),t._v(" "),a("el-table",{staticStyle:{"min-width":"100%"},attrs:{data:t.list,height:"auto",border:"",size:"mini"}},[a("el-table-column",{attrs:{prop:"nickName",label:"用户编号",width:"170",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"userId",label:"UserId",align:"center",width:"200"}}),t._v(" "),a("el-table-column",{attrs:{prop:"updateTime",label:"最近一次下单时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(t._f("dateFormat")(1*e.row.updateTime,"YYYY-MM-DD HH:mm:ss"))+"\n        ")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"amount",label:"已限制时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(t.limitTime(e.row.time,e.row.updateTime))+"\n        ")]}}])}),t._v("+\n      "),a("el-table-column",{attrs:{prop:"amount",label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return t.$emit("openPop",e.row)}}},[t._v("解冻")])]}}])})],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"table-title"},[e("h4",[this._v("限制入金列表")])])}]};var s=a("C7Lr")(r,l,!1,function(t){a("6BoA")},"data-v-e35baefe",null).exports,c={props:{showPop:{type:Boolean,default:!1},id:{type:Number}},data:function(){return{}},computed:{dialogVisible:{set:function(t){return this.$emit("dialogToggle",t)},get:function(){return this.showPop}}},methods:{confirm:function(){var t=this;this.$http.post("wallet/app/otc/backmgr/unCashInLimit",{userId:this.id}).then(function(e){200==e.code&&(t.$message.success(e.msg),t.dialogVisible=!1,t.$emit("getData"))})}}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:"提示",visible:t.dialogVisible,width:"30%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("span",[t._v("是否解冻，解冻后用户可继续下单")]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.confirm}},[t._v("确 定")])],1)])},staticRenderFns:[]};var m={data:function(){return{detail:{total:null,list:[]},formData:{pageNum:1,pageSize:10,startDate:"",endDate:"",create_time:"",userId:"",nickName:""},item:"",showPop:!1}},activated:function(){this.getData()},methods:{getData:function(t){var e=this;t&&(this.formData.pageNum=1),t=t||this.formData,this.$http.post("wallet/app/otc/backmgr/getCashInLimit",t).then(function(t){e.detail=t.result})},handleCurrentChange:function(t){this.formData.pageNum=t,this.getData()},handleSizeChange:function(t){this.formData.pageSize=t,this.getData()},openPop:function(t){this.item=t,this.showPop=!0}},components:{Query:o,Table:s,Pop:a("C7Lr")(c,u,!1,function(t){a("iZvc")},"data-v-6b9d8253",null).exports}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mer-limit-page"},[a("Query",{attrs:{formData:t.formData},on:{getData:t.getData}}),t._v(" "),a("Table",{attrs:{list:t.detail.list},on:{openPop:t.openPop}}),t._v(" "),a("div",{staticClass:"load-more",staticStyle:{display:"flex"}},[a("div",{staticClass:"count"}),t._v(" "),a("el-pagination",{attrs:{"current-page":t.formData.pageNum,"page-sizes":[20,50],"page-size":t.formData.pageSize,"pager-count":5,layout:"total, sizes, prev, pager, next, jumper",total:1*t.detail.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("Pop",{attrs:{showPop:t.showPop,id:t.item.userId},on:{dialogToggle:function(e){t.showPop=!1},getData:t.getData}})],1)},staticRenderFns:[]};var f=a("C7Lr")(m,p,!1,function(t){a("H7vA")},"data-v-73e8b776",null);e.default=f.exports}});