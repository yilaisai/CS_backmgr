webpackJsonp([95],{cPKX:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("s0MJ"),a=(i("EaCm"),i("XLwt")),n=i.n(a),l={name:"daily-chart",data:function(){return{wltExtAmount:[],wltRecAmount:[],wltDiffAmount:[],wltExtNum:[],wltRecNum:[],wltDiffNum:[],blkExtAmount:[],blkRecAmount:[],blkDiffAmount:[],blkExtNum:[],blkRecNum:[],blkDiffNum:[],chart:null,chart2:null,option:{title:{text:"交易金額"},tooltip:{trigger:"axis"},legend:{data:[]},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},toolbox:{feature:{}},xAxis:{type:"category",boundaryGap:!1,data:[]},yAxis:{type:"value"},series:[]},direction:"0",option2:{title:{text:"交易笔数"},tooltip:{trigger:"axis"},legend:{data:[]},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},toolbox:{feature:{}},xAxis:{type:"category",boundaryGap:!1,data:[]},yAxis:{type:"value"},series:[]},dialogVisible:!1,dialogTitle:"编辑",directionData:[{value:"0",label:"全部"},{value:"1",label:"充币"},{value:"2",label:"提币"},{value:"3",label:"净值"}],timeData:[{value:"",label:"过去30天"},{value:"1",label:"过去60天"},{value:"2",label:"过去90天"}],filterForm:{coinId:"",startDate:"",endDate:"",time:"",pageNum:1,pageSize:20},selectedDate:[]}},watch:{"filterForm.time":{handler:function(t,e){var i=Object(s.a)(new Date),a=void 0;switch(t){case"":a=Object(s.a)((new Date).getTime()-2592e6),this.selectedDate=[a,i];break;case"1":a=Object(s.a)((new Date).getTime()-5184e6),this.selectedDate=[a,i];break;case"2":a=Object(s.a)((new Date).getTime()-7776e6),this.selectedDate=[a,i]}},immediate:!0},direction:function(t){this.initSeries(t)}},methods:{returnRouter:function(){this.$router.go(-1)},initChart:function(){var t=this.$refs.chart;t&&(this.chart=n.a.init(t));var e=this.$refs.chart2;e&&(this.chart2=n.a.init(e))},initSeries:function(t,e){switch(this.option.series=[],this.option2.series=[],t){case"0":this.option.series.push({name:"钱包提币",type:"line",data:this.wltExtAmount}),this.option.series.push({name:"钱包充币",type:"line",data:this.wltRecAmount}),this.option.series.push({name:"钱包净值",type:"line",data:this.wltDiffAmount}),this.option.series.push({name:"区块链提币",type:"line",data:this.blkExtAmount}),this.option.series.push({name:"区块链充币",type:"line",data:this.blkRecAmount}),this.option.series.push({name:"区块链净值",type:"line",data:this.blkDiffAmount}),this.option.legend.data=["钱包提币","钱包充币","钱包净值","区块链提币","区块链充币","区块链净值"],this.option2.series.push({name:"钱包提币",type:"line",data:this.wltExtNum}),this.option2.series.push({name:"钱包充币",type:"line",data:this.wltRecNum}),this.option2.series.push({name:"钱包净值",type:"line",data:this.wltDiffNum}),this.option2.series.push({name:"区块链提币",type:"line",data:this.blkExtNum}),this.option2.series.push({name:"区块链充币",type:"line",data:this.blkRecNum}),this.option2.series.push({name:"区块链净值",type:"line",data:this.blkDiffNum}),this.option2.legend.data=["钱包提币","钱包充币","钱包净值","区块链提币","区块链充币","区块链净值"];break;case"1":this.option.series.push({name:"钱包充币",type:"line",data:this.wltRecAmount}),this.option.series.push({name:"区块链充币",type:"line",data:this.blkRecAmount}),this.option2.series.push({name:"钱包充币",type:"line",data:this.wltRecNum}),this.option2.series.push({name:"区块链充币",type:"line",data:this.blkRecNum}),this.option.legend.data=["钱包充币","区块链充币"],this.option2.legend.data=["钱包充币","区块链充币"];break;case"2":this.option.series.push({name:"钱包提币",type:"line",data:this.wltExtAmount}),this.option.series.push({name:"区块链提币",type:"line",data:this.blkExtAmount}),this.option2.series.push({name:"钱包提币",type:"line",data:this.wltExtNum}),this.option2.series.push({name:"区块链提币",type:"line",data:this.blkExtNum}),this.option.legend.data=["钱包提币","区块链提币"],this.option2.legend.data=["钱包提币","区块链提币"];break;case"3":this.option.series.push({name:"钱包净值",type:"line",data:this.wltDiffAmount}),this.option.series.push({name:"区块链净值",type:"line",data:this.blkDiffAmount}),this.option2.series.push({name:"钱包净值",type:"line",data:this.wltDiffNum}),this.option2.series.push({name:"区块链净值",type:"line",data:this.blkDiffNum}),this.option.legend.data=["钱包净值","区块链净值"],this.option2.legend.data=["钱包净值","区块链净值"]}e||(this.chart.setOption(this.option,!0),this.chart2.setOption(this.option2,!0))},exportExcel:function(){var t="";for(var e in this.filterForm)t+=e+"="+this.filterForm[e]+"&";location.href=SERVER_PATH+"wallet/backmgr/trade/downTradeList?"+t+"token="+localStorage.getItem("wallet_token")},edit:function(t){this.dialogVisible=!0},submitForm:function(t){this.filterForm.pageNum=t,this.getbill()},getPaginationChange:function(t,e){this.filterForm.pageSize=t,this.submitForm(e)},initCharData:function(){this.option.series=[],this.option2.series=[],this.blkDiffAmount=[],this.blkDiffNum=[],this.blkExtAmount=[],this.blkExtNum=[],this.blkRecAmount=[],this.blkRecNum=[],this.wltDiffAmount=[],this.wltDiffNum=[],this.wltExtAmount=[],this.wltExtNum=[],this.wltRecAmount=[],this.wltRecNum=[]},getbill:function(){var t=this;this.filterForm.startDate=this.selectedDate&&this.selectedDate[0],this.filterForm.endDate=this.selectedDate&&this.selectedDate[1],this.$http.post("cloud/asset/open/getDailyStatisticTrendRecd",this.filterForm).then(function(e){var i=e.result.list,s=[];t.initCharData();for(var a=0;a<i.length;a++)for(var n in i[a])s.push(n),t.blkDiffAmount.push(i[a][n].blkDiffAmount),t.blkDiffNum.push(i[a][n].blkDiffNum),t.blkExtAmount.push(i[a][n].blkExtAmount),t.blkExtNum.push(i[a][n].blkExtNum),t.blkRecAmount.push(i[a][n].blkRecAmount),t.blkRecNum.push(i[a][n].blkRecNum),t.wltDiffAmount.push(i[a][n].wltDiffAmount),t.wltDiffNum.push(i[a][n].wltDiffNum),t.wltExtAmount.push(i[a][n].wltExtAmount),t.wltExtNum.push(i[a][n].wltExtNum),t.wltRecAmount.push(i[a][n].wltRecAmount),t.wltRecNum.push(i[a][n].wltRecNum);t.initSeries(t.direction,1),t.option.xAxis.data=s,t.option2.xAxis.data=s,t.chart.setOption(t.option),t.chart2.setOption(t.option2)})}},mounted:function(){var t=Object(s.a)(new Date),e=Object(s.a)((new Date).getTime()-2592e6);this.selectedDate=[e,t],this.initChart(),this.getbill()}},o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"daily-chart"},[i("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"120px",model:t.filterForm}},[i("div",{staticClass:"title"},[i("sac-coin",{ref:"coinId",model:{value:t.filterForm.coinId,callback:function(e){t.$set(t.filterForm,"coinId",e)},expression:"filterForm.coinId"}}),t._v(" "),i("sac-select",{ref:"direction",attrs:{label:"方向",dataList:t.directionData},model:{value:t.direction,callback:function(e){t.direction=e},expression:"direction"}}),t._v(" "),i("sac-date",{ref:"selectedDate",attrs:{label:"日 期"},model:{value:t.selectedDate,callback:function(e){t.selectedDate=e},expression:"selectedDate"}}),t._v(" "),i("el-form-item",{attrs:{label:" "}},[i("el-select",{attrs:{placeholder:"请选择时间"},model:{value:t.filterForm.time,callback:function(e){t.$set(t.filterForm,"time",e)},expression:"filterForm.time"}},t._l(t.timeData,function(t,e){return i("el-option",{key:e,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),i("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(e){return t.submitForm(1)}}}),t._v(" "),i("div",{staticClass:"el-form-item__content",staticStyle:{width:"100px"}},[i("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(e){return t.returnRouter(e)}}},[t._v("返回\n            ")])],1)],1),t._v(" "),i("div",{ref:"chart",staticClass:"daily-chart-cn",staticStyle:{width:"100%",height:"400px"}}),t._v(" "),i("div",{ref:"chart2",staticClass:"daily-chart-cn",staticStyle:{width:"100%",height:"400px"}})])],1)},staticRenderFns:[]};var r=i("VU/8")(l,o,!1,function(t){i("szLs")},null,null);e.default=r.exports},szLs:function(t,e){}});