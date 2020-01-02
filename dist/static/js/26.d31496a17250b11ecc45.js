webpackJsonp([26],{"4jJs":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={data:function(){return{form:{otcPayLists:[]},inFee:0,outFee:0,coinName:"RMT",payType:""}},activated:function(){this.getData()},methods:{getData:function(){var e=this;this.$http.post("/wallet/backmgr/merchant/trade/config",{coinName:this.coinName}).then(function(t){e.form=t.result,e.form.otcPayLists.length>0&&(e.payType=e.form.otcPayLists[0].payType)})},open:function(){var e=this;this.$prompt("请输入谷歌验证码","安全验证",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(t){var a=t.value;e.save(a)}).catch(function(){e.$message({type:"info",message:"取消修改"})})},save:function(e){var t=this;""!=e.trim()?(this.form.secret=e,this.form.inFee=(this.inFee/100).toFixed(4),this.form.outFee=(this.outFee/100).toFixed(4),this.form.payType=this.payType,this.$http.post("/wallet/backmgr/merchant/trade/updateConfig",this.form).then(function(e){t.$notify.success({title:"提示",message:e.msg}),t.getData()})):this.$message({type:"info",message:"谷歌验证码不能为空"})}},watch:{coinName:function(){this.getData()},payType:function(e,t){var a=this;this.form.otcPayLists.forEach(function(e,t){e.payType==a.payType&&(a.inFee=Math.floor(1e4*e.inFee)/100,a.outFee=Math.floor(1e4*e.outFee)/100)})}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"init-settings"},[a("div",{staticClass:"current"},[a("div",{staticClass:"title"},[a("h3",[e._v("当前参数")]),e._v(" "),a("div",{staticClass:"select-wrap"},[a("label",[e._v("币种：")]),e._v(" "),a("el-select",{attrs:{placeholder:"请选择",size:"small"},model:{value:e.coinName,callback:function(t){e.coinName=t},expression:"coinName"}},[a("el-option",{attrs:{label:"RMT",value:"RMT"}}),e._v(" "),a("el-option",{attrs:{label:"USDT",value:"USDT"}})],1)],1)]),e._v(" "),a("ul",[a("li",[a("label",[e._v(e._s(e.coinName)+"当前市价:")]),a("span",[e._v(e._s(e.form.toRMBPrice))])]),e._v(" "),1==e.form.MERCHANT_RATE_TYPE?a("li",[a("label",[e._v(e._s(e.coinName)+"当前兑入价格:")]),a("span",[e._v(e._s(Math.floor(e.form.toRMBPrice*e.form.MERCHANT_IN_PRICE_FLOAT*1e6)/1e6))])]):a("li",[a("label",[e._v(e._s(e.coinName)+"当前兑入价格:")]),a("span",[e._v(e._s(e.form.MERCHANT_IN_PRICE))])]),e._v(" "),1==e.form.MERCHANT_RATE_TYPE?a("li",[a("label",[e._v(e._s(e.coinName)+"当前兑出价格:")]),a("span",[e._v(e._s(Math.floor(e.form.toRMBPrice*e.form.MERCHANT_OUT_PRICE_FLOAT*1e6)/1e6))])]):a("li",[a("label",[e._v(e._s(e.coinName)+"当前兑出价格:")]),a("span",[e._v(e._s(e.form.MERCHANT_OUT_PRICE))])])])]),e._v(" "),a("div",{staticClass:"content-wrap"},[a("h3",[e._v("商户设置")]),e._v(" "),a("el-tabs",{attrs:{type:"border-card"}},[a("el-tab-pane",{attrs:{label:"兑入兑出价格设置"}},[a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"100px",size:"small"}},[a("el-form-item",{attrs:{label:"类型："}},[a("el-radio-group",{model:{value:e.form.MERCHANT_RATE_TYPE,callback:function(t){e.$set(e.form,"MERCHANT_RATE_TYPE",t)},expression:"form.MERCHANT_RATE_TYPE"}},[a("el-radio",{attrs:{label:"1"}},[e._v("系统")]),e._v(" "),a("el-radio",{attrs:{label:"2"}},[e._v("手动")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"货币："}},[a("el-input",{staticStyle:{width:"100px"},attrs:{disabled:!0},model:{value:e.form.MERCHANT_COIN_NAME,callback:function(t){e.$set(e.form,"MERCHANT_COIN_NAME","string"==typeof t?t.trim():t)},expression:"form.MERCHANT_COIN_NAME"}})],1),e._v(" "),1==e.form.MERCHANT_RATE_TYPE?a("el-form-item",{attrs:{label:"兑入价格："}},[a("el-input",{staticStyle:{width:"100px"},attrs:{disabled:!0},model:{value:e.form.toRMBPrice,callback:function(t){e.$set(e.form,"toRMBPrice","string"==typeof t?t.trim():t)},expression:"form.toRMBPrice"}}),e._v("　*　"),a("el-input",{attrs:{placeholder:"输入倍数（如0.9）"},model:{value:e.form.MERCHANT_IN_PRICE_FLOAT,callback:function(t){e.$set(e.form,"MERCHANT_IN_PRICE_FLOAT","string"==typeof t?t.trim():t)},expression:"form.MERCHANT_IN_PRICE_FLOAT"}})],1):a("el-form-item",{attrs:{label:"兑入价格："}},[a("el-input",{model:{value:e.form.MERCHANT_IN_PRICE,callback:function(t){e.$set(e.form,"MERCHANT_IN_PRICE","string"==typeof t?t.trim():t)},expression:"form.MERCHANT_IN_PRICE"}})],1),e._v(" "),1==e.form.MERCHANT_RATE_TYPE?a("el-form-item",{attrs:{label:"兑出价格："}},[a("el-input",{staticStyle:{width:"100px"},attrs:{disabled:!0},model:{value:e.form.toRMBPrice,callback:function(t){e.$set(e.form,"toRMBPrice","string"==typeof t?t.trim():t)},expression:"form.toRMBPrice"}}),e._v("　*　"),a("el-input",{attrs:{placeholder:"输入倍数（如1.1）"},model:{value:e.form.MERCHANT_OUT_PRICE_FLOAT,callback:function(t){e.$set(e.form,"MERCHANT_OUT_PRICE_FLOAT","string"==typeof t?t.trim():t)},expression:"form.MERCHANT_OUT_PRICE_FLOAT"}})],1):a("el-form-item",{attrs:{label:"兑出价格："}},[a("el-input",{model:{value:e.form.MERCHANT_OUT_PRICE,callback:function(t){e.$set(e.form,"MERCHANT_OUT_PRICE","string"==typeof t?t.trim():t)},expression:"form.MERCHANT_OUT_PRICE"}})],1)],1),e._v(" "),a("p",{staticClass:"tips"},[e._v("提示：价格默认使用系统设置的价格，开启手动设置的价格，则自动关闭系统价格，关闭手动设置的价格，则自动开启系统价格。")])],1)],1),e._v(" "),a("el-tabs",{attrs:{type:"border-card"}},[a("el-tab-pane",{attrs:{label:"商户初始化设置"}},[a("el-form",{ref:"form",attrs:{model:e.form,inline:!0,"label-width":"155px",size:"small"}},[a("el-form-item",{attrs:{label:"支付方式："}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.payType,callback:function(t){e.payType=t},expression:"payType"}},e._l(e.form.otcPayLists,function(e){return a("el-option",{key:e.payType,attrs:{label:e.description,value:e.payType}})}),1)],1),e._v(" "),a("br"),e._v(" "),a("el-form-item",{attrs:{label:"商户兑入手续费比例："}},[a("el-input",{attrs:{type:"number",placeholder:"未设置默认1.5%"},on:{input:function(t){e.inFee=e.inFee.replace(/^(\-)*(\d+)\.(\d\d).*$/,"$1$2.$3")}},model:{value:e.inFee,callback:function(t){e.inFee="string"==typeof t?t.trim():t},expression:"inFee"}},[a("template",{slot:"append"},[e._v("%")])],2)],1),e._v(" "),a("el-form-item",{attrs:{label:"商户兑出手续费比例："}},[a("el-input",{attrs:{type:"number",placeholder:"未设置默认0.3%"},on:{input:function(t){e.outFee=e.outFee.replace(/^(\-)*(\d+)\.(\d\d).*$/,"$1$2.$3")}},model:{value:e.outFee,callback:function(t){e.outFee="string"==typeof t?t.trim():t},expression:"outFee"}},[a("template",{slot:"append"},[e._v("%")])],2)],1),e._v(" "),a("br"),e._v(" "),a("el-form-item",{attrs:{label:"商户最小兑入额度："}},[a("el-input",{attrs:{type:"number"},model:{value:e.form.MERCHANT_MIN_IN_AMOUNT,callback:function(t){e.$set(e.form,"MERCHANT_MIN_IN_AMOUNT","string"==typeof t?t.trim():t)},expression:"form.MERCHANT_MIN_IN_AMOUNT"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商户最大兑入额度："}},[a("el-input",{attrs:{type:"number"},model:{value:e.form.MERCHANT_MAX_IN_AMOUNT,callback:function(t){e.$set(e.form,"MERCHANT_MAX_IN_AMOUNT","string"==typeof t?t.trim():t)},expression:"form.MERCHANT_MAX_IN_AMOUNT"}})],1),e._v(" "),a("br"),e._v(" "),a("el-form-item",{attrs:{label:"商户最小兑出额度："}},[a("el-input",{attrs:{type:"number"},model:{value:e.form.MERCHANT_MIN_OUT_AMOUNT,callback:function(t){e.$set(e.form,"MERCHANT_MIN_OUT_AMOUNT","string"==typeof t?t.trim():t)},expression:"form.MERCHANT_MIN_OUT_AMOUNT"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商户最大兑出额度："}},[a("el-input",{attrs:{type:"number"},model:{value:e.form.MERCHANT_MAX_OUT_AMOUNT,callback:function(t){e.$set(e.form,"MERCHANT_MAX_OUT_AMOUNT","string"==typeof t?t.trim():t)},expression:"form.MERCHANT_MAX_OUT_AMOUNT"}})],1)],1),e._v(" "),a("p",{staticClass:"tips"},[e._v("提示：商户默认该参数，可在商户查询模块单独配置该参数。初始化设置修改后只对新增商户生效。")])],1)],1),e._v(" "),a("el-tabs",{attrs:{type:"border-card"}},[a("el-tab-pane",{attrs:{label:"全局设置"}},[a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"100px",size:"small"}},[a("el-form-item",{attrs:{label:"提币手续费："}},[a("el-input",{attrs:{type:"number"},model:{value:e.form.MERCHANT_WITHDRAW_RATE,callback:function(t){e.$set(e.form,"MERCHANT_WITHDRAW_RATE","string"==typeof t?t.trim():t)},expression:"form.MERCHANT_WITHDRAW_RATE"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"转账手续费："}},[a("el-input",{attrs:{type:"number"},model:{value:e.form.MERCHANT_TRADE_RATE,callback:function(t){e.$set(e.form,"MERCHANT_TRADE_RATE","string"==typeof t?t.trim():t)},expression:"form.MERCHANT_TRADE_RATE"}})],1)],1)],1)],1),e._v(" "),a("el-button",{staticClass:"save",attrs:{type:"primary"},on:{click:e.open}},[e._v("保存修改")])],1)])},staticRenderFns:[]};var l=a("VU/8")(o,r,!1,function(e){a("czjw")},"data-v-ecfd53ee",null);t.default=l.exports},czjw:function(e,t){}});