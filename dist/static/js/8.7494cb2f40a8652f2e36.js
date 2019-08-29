webpackJsonp([8],{EnNe:function(e,t){},ZYzB:function(e,t){},fghR:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("vvfS"),s=a("ZLEe"),r=a.n(s),n=a("hRKE"),l=a.n(n),o=a("ARhN"),c=a.n(o),h={name:"sac-bar",props:{width:{type:String,default:"100%"},height:{type:String,default:"100%"},seriesData:{type:[Array,Object],default:null}},data:function(){return{chart:null,scale:1,defaultOption:{tooltip:{trigger:"item",formatter:"{b}: {c} ({d}%)"},title:{text:"",top:20,x:10},legend:{type:"scroll",left:10,right:20,top:70,bottom:70,data:[]},grid:{top:"7%",left:"2%",right:"4%",bottom:"3%",containLabel:!0},series:[{name:"",type:"pie",radius:"40%",center:["50%","70%"],data:[],label:{normal:{formatter:"\n{b|{b}：} {c} {d|{d}%}\n",rich:{b:{align:"left",padding:4},hr:{borderColor:"red",width:"100%",borderWidth:1,height:0},d:{align:"left",padding:4}}}}}]}}},watch:{seriesData:{handler:function(e,t){this.seriesData?this.initSeries():this.initSeries(!0)},deep:!0}},methods:{initChart:function(){var e=this.$refs.sacBar;e&&(this.chart=c.a.init(e),this.chart.setOption(this.defaultOption),this.seriesData&&this.initSeries())},initSeries:function(e){if(this.chart){var t={};if("object"===l()(this.seriesData)){if(this.seriesData&&Array.isArray(this.seriesData.series)&&this.seriesData.series.length>0){var a=this.seriesData.series.slice();t.series=[{data:a}],t.legend={data:a.map(function(e){return e.name})}}this.seriesData.title&&(t.title={text:this.seriesData.title.text}),t.series&&this.seriesData.center&&(t.series[0].center=this.seriesData.center),t.series&&this.seriesData.radius&&(t.series[0].radius=this.seriesData.radius)}r()(t).length>0&&this.chart.setOption(t)}}},mounted:function(){this.initChart()},destroyed:function(){this.chart&&this.chart.dispose&&this.chart.dispose()}},m={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{ref:"sacBar",staticClass:"sac-bar",style:{width:this.width,height:this.height}})},staticRenderFns:[]};var d=a("C7Lr")(h,m,!1,function(e){a("EnNe")},null,null).exports,u=a("s0MJ"),p={name:"money-monitor",components:{SacLine:i.a,SacBar:d},data:function(){return{filterForm:{coinId:1,account:"",type:0,startTime:"",endTime:""},selectedDate:[],content:{coinName:"SAC",teamTypeName:"全部"},seriesData:{title:{text:""},legend:{data:["收入","支出"]},xAxis:{data:[]},series:[{name:"收入",type:"line",data:[],itemStyle:{normal:{label:{show:!1}}}},{name:"支出",type:"line",data:[],itemStyle:{normal:{label:{show:!1}}}}]},seriesDataBalance:{legend:{data:["余额"]},xAxis:{data:[]},series:[{name:"余额",type:"line",data:[],itemStyle:{normal:{label:{show:!1}}}}]},seriesDataAll:{title:{text:"资产分布"},series:[],center:["50%","50%"]},seriesDataCompany:{title:{text:"公司分布"},series:[]},seriesDataMerchant:{title:{text:"商户分布"},series:[],center:["50%","70%"],radius:"30%"},seriesDataRollInOut:{title:{text:""},legend:{data:["收入","支出"]},xAxis:{data:[]},series:[{name:"收入",type:"line",data:[],itemStyle:{normal:{label:{show:!1}}}},{name:"支出",type:"line",data:[],itemStyle:{normal:{label:{show:!1}}}}]}}},methods:{submitForm:function(){0==this.filterForm.type?this.getAllAsset():(-1==this.filterForm.type&&this.getRollInOut(),this.getStatics())},teamTypeChange:function(e,t){0==this.filterForm.type?this.getAllAsset():(-1==this.filterForm.type&&this.getRollInOut(),this.getStatics()),this.content.teamTypeName=t},coinChange:function(e,t){0==this.filterForm.type?this.getAllAsset():(-1==this.filterForm.type&&this.getRollInOut(),this.getStatics()),this.content.coinName=t},getStatics:function(){var e=this;this.selectedDate&&(this.filterForm.startTime=this.selectedDate[0].split("-").join(""),this.filterForm.endTime=this.selectedDate[1].split("-").join("")),this.$http.post("cloud/backmgr/statics",this.filterForm).then(function(t){var a=t.result,i=a.left,s=a.out,r=t.result.in,n=e.content,l=n.teamTypeName,o=n.coinName,c=[];r.forEach(function(e){c.push(e.createDate.toString().substr(0,4)+"-"+e.createDate.toString().substr(4,2)+"-"+e.createDate.toString().substr(6,2))});var h=r.map(function(e){return e.amount}),m=s.map(function(e){return e.amount}),d=i.map(function(e){return e.amount});e.seriesData.title.text=l+"资产（"+o+"）",e.seriesData.xAxis.data=c,e.seriesData.series[0].data=h,e.seriesData.series[1].data=m,e.seriesDataBalance.series[0].data=d,e.seriesDataBalance.xAxis.data=c})},getAllAsset:function(){var e=this,t=this.filterForm.coinId;this.$http.post("cloud/backmgr/statics/allAsset",{coinId:t}).then(function(t){var a=t.result,i=a.company,s=a.merchant,r=a.personal;e.seriesDataAll.title.text="资产分布（"+e.content.coinName+"）",e.seriesDataCompany.title.text="公司分布（"+e.content.coinName+"）",e.seriesDataMerchant.title.text="商户分布（"+e.content.coinName+"）",e.seriesDataAll.series=[{name:i.name,value:i.amount||0},{name:s.name,value:s.amount||0},{name:r.name,value:r.amount||0}],i.children.forEach(function(e){e.name=e.name||"",e.value=e.amount||0}),s.children.forEach(function(e){e.name=e.name||"",e.value=e.amount||0}),e.seriesDataCompany.series=i.children,e.seriesDataMerchant.series=s.children})},getRollInOut:function(){var e=this;this.selectedDate&&(this.filterForm.startTime=this.selectedDate[0].split("-").join(""),this.filterForm.endTime=this.selectedDate[1].split("-").join("")),this.$http.post("cloud/backmgr/statics/rollInOut",this.filterForm).then(function(t){var a=t.result.out,i=t.result.in,s=e.content.coinName,r=[];i.forEach(function(e){r.push(e.createDate.toString().substr(0,4)+"-"+e.createDate.toString().substr(4,2)+"-"+e.createDate.toString().substr(6,2))});var n=i.map(function(e){return e.amount}),l=a.map(function(e){return e.amount});e.seriesDataRollInOut.title.text="链上转账资金（"+s+"）",e.seriesDataRollInOut.xAxis.data=r,e.seriesDataRollInOut.series[0].data=n,e.seriesDataRollInOut.series[1].data=l})}},activated:function(){var e=Object(u.a)(),t=Object(u.a)((new Date).getTime()-1296e6);this.selectedDate=[t,e],this.getAllAsset()}},f={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"money-monitor"},[a("el-form",{ref:"filterForm",attrs:{inline:!0,"label-width":"80px",model:e.filterForm}},[a("sac-coin",{ref:"coinId",attrs:{isAll:!1},on:{change:e.coinChange},model:{value:e.filterForm.coinId,callback:function(t){e.$set(e.filterForm,"coinId",t)},expression:"filterForm.coinId"}}),e._v(" "),a("sac-teamType",{ref:"type",attrs:{isAll:!0},on:{change:e.teamTypeChange},model:{value:e.filterForm.type,callback:function(t){e.$set(e.filterForm,"type",t)},expression:"filterForm.type"}}),e._v(" "),a("sac-input",{directives:[{name:"show",rawName:"v-show",value:0!=e.filterForm.type,expression:"filterForm.type!=0"}],ref:"account",attrs:{label:"用户账号"},model:{value:e.filterForm.account,callback:function(t){e.$set(e.filterForm,"account","string"==typeof t?t.trim():t)},expression:"filterForm.account"}}),e._v(" "),a("sac-date",{directives:[{name:"show",rawName:"v-show",value:0!=e.filterForm.type,expression:"filterForm.type!=0"}],ref:"selectedDate",attrs:{label:"日　　期"},model:{value:e.selectedDate,callback:function(t){e.selectedDate=t},expression:"selectedDate"}}),e._v(" "),a("sac-submit-form",{attrs:{isReset:!1},on:{submitForm:function(t){return e.submitForm()}}})],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:0==e.filterForm.type,expression:"filterForm.type==0"}]},[a("sac-bar",{directives:[{name:"show",rawName:"v-show",value:e.seriesDataAll.series.length>0,expression:"seriesDataAll.series.length>0"}],attrs:{"series-data":e.seriesDataAll,width:"calc((100vw - 220px))",height:"calc(100vh - 220px)"}}),e._v(" "),a("sac-bar",{directives:[{name:"show",rawName:"v-show",value:e.seriesDataCompany.series.length>0,expression:"seriesDataCompany.series.length>0"}],attrs:{"series-data":e.seriesDataCompany,width:"calc((100vw - 220px))",height:"calc(100vh - 220px)"}}),e._v(" "),a("sac-bar",{directives:[{name:"show",rawName:"v-show",value:e.seriesDataMerchant.series.length>0,expression:"seriesDataMerchant.series.length>0"}],attrs:{"series-data":e.seriesDataMerchant,width:"calc((100vw - 220px))",height:"calc(100vh + 100px)"}})],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:0!=e.filterForm.type,expression:"filterForm.type!=0"}]},[a("sac-line",{attrs:{"series-data":e.seriesData,height:"calc((100vh - 220px)/2)",width:"calc(100vw - 220px)"}}),e._v(" "),a("sac-line",{attrs:{"series-data":e.seriesDataBalance,height:"calc((100vh - 220px)/2)",width:"calc(100vw - 220px)"}}),e._v(" "),a("sac-line",{directives:[{name:"show",rawName:"v-show",value:-1==e.filterForm.type,expression:"filterForm.type==-1"}],attrs:{"series-data":e.seriesDataRollInOut,height:"calc((100vh - 220px)/2)",width:"calc(100vw - 220px)"}})],1)],1)},staticRenderFns:[]};var v=a("C7Lr")(p,f,!1,function(e){a("ZYzB")},null,null);t.default=v.exports},i4Mg:function(e,t){},vvfS:function(e,t,a){"use strict";var i=a("ZLEe"),s=a.n(i),r=a("hRKE"),n=a.n(r),l=a("ARhN"),o=a.n(l),c={name:"sac-line",props:{width:{type:String,default:"100%"},height:{type:String,default:"100%"},seriesData:{type:[Array,Object],default:null}},data:function(){return{chart:null,defaultOption:{tooltip:{trigger:"axis",axisPointer:{type:"line",lineStyle:{opacity:0}},confine:!0},title:{text:"",top:20,x:"4%"},grid:{top:"70",left:"50",right:"30",bottom:"30",containLabel:!0},legend:{data:[],top:20,type:"plain"},xAxis:{type:"category",boundaryGap:[0,.01],data:[],axisTick:{alignWithLabel:!0},axisLabel:{formatter:function(e,t){var a=new Date(e);return 0===t?e:[a.getMonth()+1,a.getDate()].join("-")}}},yAxis:{type:"value",boundaryGap:[0,.01]},series:[]}}},methods:{initChart:function(){var e=this.$refs.sacLine;e&&(this.chart=o.a.init(e),this.initSeries())},initSeries:function(e){if(this.chart)if(e)this.chart.setOption({series:[{data:[]}],xAxis:[{data:[]}]});else{var t=this.defaultOption;Array.isArray(this.seriesData)?t={series:[{data:this.seriesData.slice()}]}:"object"===n()(this.seriesData)&&(this.seriesData.title&&(t.title.text=this.seriesData.title.text),this.seriesData.legend&&(t.legend.data=this.seriesData.legend.data),this.seriesData.xAxis&&(t.xAxis.data=this.seriesData.xAxis.data),this.seriesData.series&&Array.isArray(this.seriesData.series)&&(t.series=this.seriesData.series.slice())),s()(t).length>0&&this.chart.setOption(t,!0)}}},mounted:function(){this.initChart()},watch:{seriesData:{handler:function(e,t){this.seriesData?this.initSeries():this.initSeries(!0)},deep:!0}}},h={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{ref:"sacLine",staticClass:"sac-line",style:{width:this.width,height:this.height}})},staticRenderFns:[]};var m=a("C7Lr")(c,h,!1,function(e){a("i4Mg")},null,null);t.a=m.exports}});