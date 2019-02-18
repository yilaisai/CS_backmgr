/*
 * @Author: dubbing 
 * @Date: 2018-12-04 18:07:58 
 * @Last Modified by: dubbing
 * @Content 日总表统计图(图表)
 * @Last Modified time: 2018-12-11 11:23:26
 */

<template>
    <div class='daily-chart'>
        <el-form :inline="true" label-width="120px" ref="filterForm" :model="filterForm">
            <div class="title">
                <sac-coin ref="coinId" v-model="filterForm.coinId"></sac-coin>
                <sac-select ref="direction"  label="方向" v-model="direction" :dataList="directionData"></sac-select>
                <sac-date ref="selectedDate" label="日 期" v-model="selectedDate"></sac-date>
                <el-form-item label=" ">
                    <el-select v-model="filterForm.time" placeholder="请选择时间">
                        <el-option :label="item.label" :value="item.value" v-for="(item,index) in timeData" :key="index"></el-option>
                    </el-select>
                </el-form-item>
            <sac-submit-form @submitForm="submitForm(1)" :isReset="false"></sac-submit-form>
            <!-- <div class="el-form-item__content" style="width:100px">
                <el-button  type="primary"  size="small"
                    @click.native="exportExcel">导出excel
                </el-button>
            </div> -->
            <div class="el-form-item__content" style="width:100px">
                <el-button  type="primary"  size="small"
                    @click.native="returnRouter">返回
                </el-button>
            </div> 
            </div>
            <div ref="chart" class='daily-chart-cn' style="width: 100%;height:400px;"></div>
            <div ref="chart2" class='daily-chart-cn' style="width: 100%;height:400px;"></div>
        </el-form>
    </div>
</template>
<script>
  import { dateFormat } from '@/common/util';
  import { transactionType, transferQueryStatus } from '@/common/constants';
    import echarts from 'echarts';
  export default {
    name: 'daily-chart',
    data() {
      return {
            wltExtAmount:[],//钱包提币金额
            wltRecAmount:[],//钱包充币金额
            wltDiffAmount:[],//钱包净值金额
            wltExtNum:[],//钱包提币数量
            wltRecNum:[],//钱包充币数量
            wltDiffNum:[],//钱包净值数量

            blkExtAmount:[],//区块链提币金额
            blkRecAmount:[],//区块链充币金额
            blkDiffAmount:[],//区块链净值金额
            blkExtNum:[],//区块链提币数量
            blkRecNum:[],//区块链充币数量
            blkDiffNum:[],//区块链净值数量
        chart: null,
        chart2: null,
        option : {
            title: {
                text: '交易金額'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                //data:['钱包提币金额','钱包充币金额','钱包净值金额','区块链提币金额','区块链充币金额','区块链净值金额']
                data:[]
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                   // saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data:[]
                //data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value'
            },
            series:[]
            /* series: [
                {
                    name:'邮件营销',
                    type:'line',
                    stack: '总量',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'联盟广告',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'视频广告',
                    type:'line',
                    stack: '总量',
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name:'直接访问',
                    type:'line',
                    stack: '总量',
                    data:[320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name:'搜索引擎',
                    type:'line',
                    stack: '总量',
                    data:[820, 932, 901, 934, 1290, 1330, 1320]
                }
            ] */
        },
        direction:'0',
        option2 : {
            title: {
                text: '交易笔数'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:[]
                //data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                   // saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data:[]
                //data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value'
            },
            series:[]
            /* series: [
                {
                    name:'邮件营销',
                    type:'line',
                    stack: '总量',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'联盟广告',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'视频广告',
                    type:'line',
                    stack: '总量',
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name:'直接访问',
                    type:'line',
                    stack: '总量',
                    data:[320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name:'搜索引擎',
                    type:'line',
                    stack: '总量',
                    data:[820, 932, 901, 934, 1290, 1330, 1320]
                }
            ] */
        },
        dialogVisible: false,
        dialogTitle:'编辑',
        directionData:[
            {
                value: '0',
                label: '全部',
            },
            {
                value: '1',
                label: '充币',
            },
            {
                value: '2',
                label: '提币',
            },
            {
                value: '3',
                label: '净值',
            },
        ],
        timeData:[
            {
                value: '',
                label: '过去30天',
            },
            {
                value: '1',
                label: '过去60天',
            },
            {
                value: '2',
                label: '过去90天',
            }
        ],
        
        filterForm: {
            coinId: '',
            startDate: '',
            endDate: '',
            time:'',
            pageNum: 1,
            pageSize: 20
        },
        selectedDate: [], //已选日期
        
      };
    },
    watch:{
        'filterForm.time': {
            handler(newVal, oldVal) {
                let time_end = dateFormat(new Date());
                let start
                switch(newVal){
                    case '':
                        
                        start = dateFormat(new Date().getTime() - 3600 * 1000 * 24 * 30);
                        this.selectedDate = [start, time_end];
                        break;
                    case '1':
                    
                        start = dateFormat(new Date().getTime() - 3600 * 1000 * 24 * 60);
                        this.selectedDate = [start, time_end];
                        break;
                    case '2':
                        
                        start = dateFormat(new Date().getTime() - 3600 * 1000 * 24 * 90);
                        this.selectedDate = [start, time_end];
                        break;
                }
                
                /* this.timeData.filter(v=>{
                    if(v.value==newVal){

                    }
                }) */
            },
            immediate: true,
            // deep: true
        },
        direction(val){
            //console.log(val)
            this.initSeries(val)
        }

    },
    methods: {
        returnRouter(){
            this.$router.go(-1)
        },
        //初始化图表1
        initChart() {
            let chart1 = this.$refs['chart'];
             if (chart1) {
                this.chart = echarts.init(chart1);
                //this.initSeries1();
            } 
            let chart2 = this.$refs['chart2'];
             if (chart2) {
                this.chart2 = echarts.init(chart2);
                //this.initSeries2();
            } 
        },
        initSeries(type,reload){
            //0全部
            //1充币
            //2充币
            //3净值
            this.option.series=[]
            this.option2.series=[]
            switch(type){
                case '0':
                
                    //金额
                    this.option.series.push({
                        name:'钱包提币',
                        type:'line',
                        //stack: '总量',
                        data:this.wltExtAmount
                    })
                    this.option.series.push({
                        name:'钱包充币',
                        type:'line',
                        //stack: '总量',
                        data:this.wltRecAmount
                    })
                    this.option.series.push({
                        name:'钱包净值',
                        type:'line',
                        //stack: '总量',
                        data:this.wltDiffAmount
                    })
                    this.option.series.push({
                        name:'区块链提币',
                        type:'line',
                        //stack: '总量',
                        data:this.blkExtAmount
                    })
                    this.option.series.push({
                        name:'区块链充币',
                        type:'line',
                        //stack: '总量',
                        data:this.blkRecAmount
                    })
                    this.option.series.push({
                        name:'区块链净值',
                        type:'line',
                        //stack: '总量',
                        data:this.blkDiffAmount
                    })
                    this.option.legend.data=['钱包提币','钱包充币','钱包净值','区块链提币','区块链充币','区块链净值']
                    
                    //笔数
                    this.option2.series.push({
                        name:'钱包提币',
                        type:'line',
                        //stack: '总量',
                        data:this.wltExtNum
                    })
                    this.option2.series.push({
                        name:'钱包充币',
                        type:'line',
                        //stack: '总量',
                        data:this.wltRecNum
                    })
                    this.option2.series.push({
                        name:'钱包净值',
                        type:'line',
                        //stack: '总量',
                        data:this.wltDiffNum
                    })
                    this.option2.series.push({
                        name:'区块链提币',
                        type:'line',
                        //stack: '总量',
                        data:this.blkExtNum
                    })
                    this.option2.series.push({
                        name:'区块链充币',
                        type:'line',
                        //stack: '总量',
                        data:this.blkRecNum
                    })
                    this.option2.series.push({
                        name:'区块链净值',
                        type:'line',
                        //stack: '总量',
                        data:this.blkDiffNum
                    })
                    this.option2.legend.data=['钱包提币','钱包充币','钱包净值','区块链提币','区块链充币','区块链净值']
                    
                    break;
                case '1':
                    this.option.series.push({
                        name:'钱包充币',
                        type:'line',
                        //stack: '总量',
                        data:this.wltRecAmount
                    })
                    this.option.series.push({
                        name:'区块链充币',
                        type:'line',
                        //stack: '总量',
                        data:this.blkRecAmount
                    })
                    this.option2.series.push({
                        name:'钱包充币',
                        type:'line',
                        //stack: '总量',
                        data:this.wltRecNum
                    })
                    this.option2.series.push({
                        name:'区块链充币',
                        type:'line',
                        //stack: '总量',
                        data:this.blkRecNum
                    })
                    this.option.legend.data=['钱包充币','区块链充币']
                    this.option2.legend.data=['钱包充币','区块链充币']
                    
                    break;
                case '2':
                    this.option.series.push({
                        name:'钱包提币',
                        type:'line',
                        //stack: '总量',
                        data:this.wltExtAmount
                    })
                    this.option.series.push({
                        name:'区块链提币',
                        type:'line',
                        //stack: '总量',
                        data:this.blkExtAmount
                    })
                    this.option2.series.push({
                        name:'钱包提币',
                        type:'line',
                        //stack: '总量',
                        data:this.wltExtNum
                    })
                    this.option2.series.push({
                        name:'区块链提币',
                        type:'line',
                        //stack: '总量',
                        data:this.blkExtNum
                    })
                    this.option.legend.data=['钱包提币','区块链提币']
                    this.option2.legend.data=['钱包提币','区块链提币']
                    
                    break;
                case '3':
                    this.option.series.push({
                        name:'钱包净值',
                        type:'line',
                        //stack: '总量',
                        data:this.wltDiffAmount
                    })
                    this.option.series.push({
                        name:'区块链净值',
                        type:'line',
                        //stack: '总量',
                        data:this.blkDiffAmount
                    })
                    this.option2.series.push({
                        name:'钱包净值',
                        type:'line',
                        //stack: '总量',
                        data:this.wltDiffNum
                    })
                    this.option2.series.push({
                        name:'区块链净值',
                        type:'line',
                        //stack: '总量',
                        data:this.blkDiffNum
                    })
                    this.option.legend.data=['钱包净值','区块链净值']
                    this.option2.legend.data=['钱包净值','区块链净值']
                    break;
            }
            if(!reload){
                this.chart.setOption(this.option,true)
                this.chart2.setOption(this.option2,true)
            }
        },
        //导出excel
        exportExcel(){
            let param = '';
            for(let v in this.filterForm) {
                param += v + '=' + this.filterForm[v] + '&';
            }
            location.href = SERVER_PATH + 'wallet/backmgr/trade/downTradeList.do?' + param + 'token=' + localStorage.getItem('wallet_token');
        },
        //编辑
        edit(data){
            this.dialogVisible=true
        },
        submitForm(num) {
            this.filterForm.pageNum = num;

            /* const { tradeType, tradeStatus } = this.filterForm;
            // 链上转入
            if (tradeType == 'creceive') {
            this.isShowTableCol = false;
            } else {
            this.isShowTableCol = true;
            }
            // 审核通过
            if (tradeStatus === '4' || tradeType === 'csend' || tradeType === '' && tradeStatus === '') {
            this.isShowHandle = true;
            } else {
            this.isShowHandle = false;
            }
            // 个人互转
            if (tradeType == 'inner') {
            this.isShowTableCol = false;
            this.isShowPayTime = false;
            } else {
            this.isShowPayTime = true;
            this.isShowTableCol = true;
            } */

            this.getbill();
        },
        getPaginationChange(val, currentPage) {
            this.filterForm.pageSize = val;
            this.submitForm(currentPage);
        },
        initCharData(){
            this.option.series=[]
            this.option2.series=[]
            this.blkDiffAmount=[]
            this.blkDiffNum=[]
            this.blkExtAmount=[]
            this.blkExtNum=[]
            this.blkRecAmount=[]
            this.blkRecNum=[]
            
            this.wltDiffAmount=[]
            this.wltDiffNum=[]
            this.wltExtAmount=[]
            this.wltExtNum=[]
            this.wltRecAmount=[]
            this.wltRecNum=[]
        },
        getbill() {
            //alert(1)
            this.filterForm.startDate = this.selectedDate && this.selectedDate[0];
            this.filterForm.endDate = this.selectedDate && this.selectedDate[1];
            this.$http.post('cloud/asset/open/getDailyStatisticTrendRecd', this.filterForm)
            .then((res) => {
                let charData=res.result.list
                let timeData=[]
                let series1=[]
                /* {
                    name:'邮件营销',
                    type:'line',
                    stack: '总量',
                    data:[120, 132, 101, 134, 90, 230, 210]
                }, */
                this.initCharData()
                for(var i=0;i<charData.length;i++){
                    for(var k in charData[i]){ 
                        //console.log(k); 
                        timeData.push(k)
                         //alert(charData[i][k].blkDiffAmount)
                         this.blkDiffAmount.push(charData[i][k].blkDiffAmount)
                        this.blkDiffNum.push(charData[i][k].blkDiffNum)
                        this.blkExtAmount.push(charData[i][k].blkExtAmount)
                        this.blkExtNum.push(charData[i][k].blkExtNum)
                        this.blkRecAmount.push(charData[i][k].blkRecAmount)
                        this.blkRecNum.push(charData[i][k].blkRecNum)
                    
                        this.wltDiffAmount.push(charData[i][k].wltDiffAmount)
                        this.wltDiffNum.push(charData[i][k].wltDiffNum)
                        this.wltExtAmount.push(charData[i][k].wltExtAmount)
                        this.wltExtNum.push(charData[i][k].wltExtNum)
                        this.wltRecAmount.push(charData[i][k].wltRecAmount)
                        this.wltRecNum.push(charData[i][k].wltRecNum)
                    }
                }
                
                /* this.option.series.push({
                    name:'钱包提币',
                    type:'line',
                    //stack: '总量',
                    data:this.wltExtAmount
                })
                this.option.series.push({
                    name:'钱包充币',
                    type:'line',
                    //stack: '总量',
                    data:this.wltRecAmount
                })
                this.option.series.push({
                    name:'钱包净值',
                    type:'line',
                    //stack: '总量',
                    data:this.wltDiffAmount
                })
                this.option.series.push({
                    name:'区块链提币',
                    type:'line',
                    //stack: '总量',
                    data:this.blkExtAmount
                })
                this.option.series.push({
                    name:'区块链充币',
                    type:'line',
                    //stack: '总量',
                    data:this.blkRecAmount
                })
                this.option.series.push({
                    name:'区块链净值',
                    type:'line',
                    //stack: '总量',
                    data:this.blkDiffAmount
                })
                this.option.legend.data=['钱包提币','钱包充币','钱包净值','区块链提币','区块链充币','区块链净值'] */
                this.initSeries(this.direction,1)
                this.option.xAxis.data=timeData
                this.option2.xAxis.data=timeData
                this.chart.setOption(this.option)
                this.chart2.setOption(this.option2)
            });
        }
    },
    mounted() {
        const end = dateFormat(new Date())
        const start = dateFormat(new Date().getTime() - 3600 * 1000 * 24 * 30);
        this.selectedDate = [start, end];
        this.initChart()
        this.getbill();
    }
  };
</script>
<style lang="less">
  .daily-chart {
    
    .el-tag {
      margin-right: 10px;
    }
    .el-form-item {
      margin-bottom: 3px;
      line-height: 33px;
      height: 47px;
    }
    .el-form--inline {
      .yh-submit {
        .el-form-item__content {
          width: 80px;
        }
      }
    }
    .item-width-all{
      .el-form-item__content{
        width: calc(100% - 90px);
      }
    }
    .changeContent {
      font-size: 14px;
      color: red;
      line-height: 40px;
      display: inline-block;
    }
    .content {
      height: 0;
      overflow: hidden;
      transition: all 0.5s;
    }
    /* .is-active {
      height: 80px;
    } */
    .moneyList {
      margin-top: 10px;
    }
  }
</style>
