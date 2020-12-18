<template>
  <div class="sac-home">
    <div class="ToDoList">
      <div class="title">
        <span class="title-left">待办事项</span>
      </div>
      <ul>
        <li>
          <div class="top" @click="$router.push('/LegalCurrency/complaint')">
            <span>{{toDoList.appealIng}}条申诉待处理</span>
          </div>
        </li>
        <li>
          <div class="top" @click="$router.push('/money/withdraw-check')">
            <span>{{toDoList.withdrawIng}}条提币审核待处理</span>
          </div>
        </li>
        <li>
          <div class="top" @click="$router.push('/LegalCurrency/paymentMethodVerify')">
            <span>{{toDoList.bindInfoIng}}条收款方式审核待处理</span>
          </div>
        </li>
        <li>
          <div class="top" @click="$router.push({path:'/merchant/cashOutVerify',query: { status: '1' }})">
            <span>{{toDoList.outIng}}条兑出审核待处理</span>
          </div>
        </li>
        <li @click="$router.push({path:'/user/identityVerify',query:{status:'1'}})">
          <div class="top"><span>{{toDoList.auditPersonIng}}条实名审核待处理</span></div>
        </li>
      </ul>
    </div>
    <div class="totalData">
      <div class="title">
        <div class="title-left">统计数据</div>
        <div class="title-right">
          <span :class="[{'active':activeTotal == 0},'btn']" @click="activeTotal = 0;getSumData()">实时</span>
          <span class="line" v-if="activeTotal == 2"></span>
          <span :class="[{'active':activeTotal == 1},'btn']" @click="activeTotal = 1;getSumData()">本周</span>
          <span class="line" v-if="activeTotal == 0"></span>
          <span :class="[{'active':activeTotal == 2},'btn']" @click="activeTotal = 2;getSumData()">本月</span>
        </div>
      </div>
      <div class="content">
        <ul>
          <li>
            <span>0</span>
            <span>兑入订单金额(已完成)</span>
          </li>
          <li>
            <span>0</span>
            <span>兑出订单金额(已完成)</span>
          </li>
          <li>
            <span>0</span>
            <span>兑入订单数量(已完成)</span>
          </li>
          <li>
            <span>0</span>
            <span>平均订单金额</span>
          </li>
          <li>
            <span>0</span>
            <span>万元以上订单数量占比(%)</span>
          </li>
          <li>
            <span>0</span>
            <span>万元以上订单金额占比(%)</span>
          </li>
          <li>
            <span>0</span>
            <span>接单人数</span>
          </li>
          <li>
            <span>0</span>
            <span>人均接单金额</span>
          </li>
          <li>
            <span>0</span>
            <span>兑入匹配失败(笔)</span>
          </li>
          <li>
            <span>0</span>
            <span>充币</span>
          </li>
          <li>
            <span>0</span>
            <span>提币</span>
          </li>
          <li>
            <span>0</span>
            <span>人均接单量</span>
          </li>
        </ul>
        <div class="canvas" id="echart"></div>
      </div>
    </div>
    <div class="merchantData">
      <div class="title">
        <div class="title-left">商户统计</div>
        <div class="title-right">
          <span :class="[{'active':activeMerchant == 0},'btn']" @click="activeMerchant = 0;getSumMerchant()">实时</span>
          <span class="line" v-if="activeMerchant == 2"></span>
          <span :class="[{'active':activeMerchant == 1},'btn']" @click="activeMerchant = 1;getSumMerchant()">本周</span>
          <span class="line" v-if="activeMerchant == 0"></span>
          <span :class="[{'active':activeMerchant == 2},'btn']" @click="activeMerchant = 2;getSumMerchant()">本月</span>
        </div>
      </div>
      <ul class="table">
        <li class="table-title">
          <span></span>
          <span>商户编号</span>
          <span>商户订单金额(CNY)</span>
          <span>订单金额占比(%)</span>
          <span>商户订单量</span>
          <span>订单量占比(%)</span>
          <span>兑出订单金额(CNY)</span>
        </li>
        <li v-for="(item,index) in merchantList" :key="index" class="item">
          <span>{{index>8?index+1:'0'+(index+1)}}</span>
          <span>{{item.nickName}}</span>
          <span>{{item.cashIn}}</span>
          <span>{{bigNumber(item.cashInRate).times(100) }} %</span>
          <span>{{item.cashInNum}}</span>
          <span>{{item.cashInNumRate}}</span>
          <span>{{bigNumber(item.cashOut).times(100)}} %</span>
        </li>
      </ul>
    </div>
    <div class="container">
      <div class="traderData">
        <div class="title">
          <div class="title-left">交易员统计</div>
          <div class="title-right">
            <span :class="[{'active':activeTrader == 0},'btn']" @click="activeTrader = 0;getSumTrader()">实时</span>
            <span class="line" v-if="activeTrader == 2"></span>
            <span :class="[{'active':activeTrader == 1},'btn']" @click="activeTrader = 1;getSumTrader()">本周</span>
            <span class="line" v-if="activeTrader == 0"></span>
            <span :class="[{'active':activeTrader == 2},'btn']" @click="activeTrader = 2;getSumTrader()">本月</span>
          </div>
        </div>
        <ul class="table">
          <li class="table-title">
            <span></span>
            <span>姓名</span>
            <span>编号</span>
            <span>订单金额</span>
            <span>订单量</span>
            <span>充币量</span>
          </li>
          <li v-for="(item,index) in traderList" :key="index" class="item">
            <span>{{index>8?index+1:'0'+(index+1)}}</span>
            <span>{{item.nickName}}</span>
            <span>{{item.userId}}</span>
            <span>{{item.totalAmount}}</span>
            <span>{{item.totalNum}}</span>
            <span>{{item.recharge}}</span>
          </li>
        </ul>
      </div>
      <div class="totalAmount">
        <div class="title">
          <div class="title-left">
            <span class="text">开启接单人数总持币量(USDT)</span>
            <span class="blue">{{totalAmount}}</span>
          </div>
          <div class="title-right">
            <span class="text">当前开启接单人数(人)</span>
            <span class="blue">{{activeUser}}</span>
          </div>
        </div>
        <ul class="table">
          <li class="table-title">
            <span></span>
            <span>姓名</span>
            <span>编号</span>
          </li>
          <li v-for="(item,index) in userList" :key="index" class="item">
            <span>{{index>8?index+1:'0'+(index+1)}}</span>
            <span>{{item.nickName}}</span>
            <span>{{item.userId}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import { dateFormat } from '@/common/util';
  import echarts from "@/assets/js/echarts"
  import bigNumber from 'bignumber.js'
  export default {
    name: 'home',
    data() {
      return {
        user: [],
        account: [],
        toDoList:'',         // 待办事项
        activeTotal:1,       // 统计数据激活 0 实时 1 本周 2 本月 
        sumData:'',          // 统计数据  
        xData:[],
        yData:{
          cashIn:[],
          cashOut:[],
          recharge:[],
          withdraw:[]
        },
        activeMerchant:1,    // 商户统计激活  0 实时 1 本周 2 本月 
        merchantList:[],     // 商户统计列表
        activeTrader:1,      // 交易员统计激活  0 实时 1 本周 2 本月 
        traderList:[],       // 交易员统计列表
        activeUser:'',       // 开启接单人数
        totalAmount:'',    
        userList:'',         // 开启接单人数列表
        myChart:null
      };
    },
    methods: {
      // 代办事项
      getData() {
        this.$http.post('/wallet/backmgr/indexInfo').then(res => {
          this.toDoList = res.result;
          this.intCanvas()
        })
      },
      // 统计数据
      getSumData(){
        this.$http.post('/wallet/backmgr/sumIndexTypeDtoList',{
          pageNum:1,
          pageSize:1000,
          type:this.activeTotal
        }).then( res => {
          let result = res.result
          
        })
      },
      // canvas表格数据
      getAmountData(){
        this.$http.post('/wallet/backmgr/sumIndexDtoList',{
          pageNum:1,
          pageSize:7
        }).then(res => {
          if(res.code === 200 ) {
            let list = res.result.list
            this.xData = []
            this.yData = {
              cashIn:[],
              cashOut:[],
              recharge:[],
              withdraw:[]
            }
            list.forEach((el,index) => {
              switch(index) {
                case 0:
                  this.xData.push('MON')
                  break;
                case 1:
                  this.xData.push('TUE')
                  break;
                case 2:
                  this.xData.push('WED')
                  break;
                case 3:
                  this.xData.push('THU')
                  break;
                case 4:
                  this.xData.push('FRI')
                  break;
                case 5:
                  this.xData.push('SAT')
                  break;
                case 6:
                  this.xData.push('SUN')
                  break;
                default:
                  break;
              }
              this.yData.cashIn.push(el.cashIn)
              this.yData.cashOut.push(el.cashOut)
              this.yData.recharge.push(el.recharge)
              this.yData.withdraw.push(el.withdraw)
            })
            this.intCanvas()
          }
        })
      },
      // 商户统计
      getSumMerchant(){
        this.$http.post('/wallet/backmgr/merchantSumDtoList',{
          pageNum:1,
          pageSize:20,
          type:this.activeMerchant
        }).then(res => {
          this.merchantList = res.result.list
        })
      },
      // 交易员统计
      getSumTrader(){
        this.$http.post('/wallet/backmgr/userSumList',{
          pageNum:1,
          pageSize:20,
          type:this.activeTrader
        }).then(res => {
          this.traderList = res.result.list
        })
      },
      // 开启接单人数统计
      getActiveUser(){
        this.$http.post('/wallet/backmgr/cashInUsers',{
          pageNum:1,
          pageSize:20
        }).then(res => {
          let result = res.result
          this.activeUser = result.pageInfo.total
          this.totalAmount = result.totalAmount
          this.userList = result.pageInfo.list
        })
      },
      intCanvas() {
        this.drawLine()
      },
      drawLine() {
        this.myChart = echarts.init(document.getElementById('echart'));
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'none',        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            bottom:20,
            itemGap: 100,
            itemWidth: 14,
            itemHeight: 14,
            textStyle: {
              color: '#000',
              fontSize: 12,
              fontWeight: 500
            }
          },
          grid: {
            top:'45px',
            left: '40px',
            right: '40px',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: this.xData,
              axisTick:{
                show:false
              },
              axisLine: {
                lineStyle:{
                  color:'#ccc'
                }
              },
              axisLabel: {
                color:'#000',
                fontSize:14,
                margin:12,
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisTick: {
                show:false
              },
              axisLine: {
                lineStyle:{
                  color:'#ccc'
                }
              },
              axisLabel: {
                color:'#000',
                fontSize:14,
                margin:12,
              },
              splitLine: {
                lineStyle: {
                  color:'#ddd',
                  type:'dashed',

                }
              }
            }
          ],
          series: [
            {
              name: '兑入金额',
              type: 'bar',
              itemStyle:{
                color: new echarts.graphic.LinearGradient(
                  0, 0, 1, 1,             //渐变方向依次为  右/下/左/上
                  [
                      {offset: 0, color: '#09B66D'},
                      {offset: 1, color: '#22CCE2'}
                  ]
                ),
                barBorderRadius:[7,7,0,0],
                
              },
              barWidth:14,
              data: this.yData.cashIn,
            },
            {
              name: '兑出金额',
              type: 'bar',
              itemStyle:{
                color: new echarts.graphic.LinearGradient(
                  0, 0, 1, 1,
                  [
                      {offset: 0, color: '#FF8A48'},
                      {offset: 1, color: '#FDBF5E'}
                  ]
                ),
                barBorderRadius:[7,7,0,0],
                
              },
              barWidth:14,
              data: this.yData.cashOut
            },
            {
              name: '充币',
              type: 'bar',
              itemStyle:{
                color: new echarts.graphic.LinearGradient(
                  0, 0, 1, 1,
                  [
                      {offset: 0, color: '#4969FF'},
                      {offset: 1, color: '#0ACFFE'}
                  ]
                ),
                barBorderRadius:[7,7,0,0],
                
              },
              barWidth:14,
              data: this.yData.recharge
            },
            {
              name: '提币',
              type: 'bar',
              itemStyle:{
                color: new echarts.graphic.LinearGradient(
                  0, 0, 1, 1,
                  [
                      {offset: 0, color: '#FF3D57'},
                      {offset: 1, color: '#FF8A48'}
                  ]
                ),
                barBorderRadius:[7,7,0,0],
              },
              barWidth:14,
              barGap:'15%',
              data: this.yData.withdraw
            },
          ],
        }
        this.myChart.setOption(option)
      },
      resizeInt(){
        if(this.myChart) {
          this.myChart.resize()
        }
      },
      bigNumber(val){
        return bigNumber(val)
      }
    },
  	activated() {
      this.getData()
      this.getSumData()
      this.getAmountData()
      this.getSumMerchant()
      this.getSumTrader()
      this.getActiveUser()
      window.addEventListener('resize',this.resizeInt)
    },
    deactivated(){
      if(this.myChart) {
        window.removeEventListener('resize',this.resizeInt)
        this.myChart.dispose()
      }
    },
  };
</script>
<style lang='less'>
  .sac-home {
    min-width:1400px;
    background:#DBE7EE;
    overflow-y: auto;
    .title {
      position: relative;
      height:60px;
      padding:0 25px;
      line-height: 1em;
      background: #FFF;
      border-radius: 6px 6px 0 0;
      font-size:16px;
      color:#000;
      font-weight: 600;
      border-bottom:1px solid rgba(130,145,169,.24);
      display: flex;
      align-items: center;
      justify-content: space-between;
      &::before {
        position: absolute;
        content:'';
        left:0;
        top:50%;
        transform: translateY(-50%);
        width:4px;
        height:24px;
        background: linear-gradient(135deg, #0081FF 0%, #22CCE2 100%);
        border-radius: 0px 5px 5px 0px;
      }
      &-left {
        display: flex;
        align-items: center;
        .blue {
          margin-left:10px;
          color:#409EFF;
        }
      }
      &-right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .btn {
          width:64px;
          height:30px;
          line-height: 30px;
          font-size:12px;
          color:#646464;
          background: transparent;
          border-radius: 4px;
          text-align: center;
          cursor: pointer;
          &.active {
            background: #409EFF;
            box-shadow: 0px 2px 6px 0px rgba(0, 129, 255, 0.35);
            color:#FFF;
            &:hover {
              color:#FFF;
            }
          }
          &:hover {
            color:#409EFF;
          }
        }
        .line {
          width:1px;
          height:14px;
          background: #8291A9;
        }
        .blue {
          margin-left:10px;
          color:#409EFF;
        }
      }
    }
    .ToDoList {
      margin-bottom:10px;
      border-radius:6px;
      background: #FFF;
      ul {
        margin:0;
        padding:25px;
        display: flex;
        align-items: center;
        li {
          list-style: none;
          flex:1;
          margin-right:25px;
          border-radius:6px;
          border:1px solid rgba(130,145,169,0.25);
          &:hover {
            box-shadow: 0px 8px 8px 0px rgba(130, 145, 169, 0.1);
          }
          .top {
            position: relative;
            height:54px;
            padding:0 24px;
            font-size:14px;
            font-weight: 500;
            color:#242A38;
            background:rgba(219,231,238,0.25);
            display: flex;
            align-items: center;
            cursor: pointer;
            &::before {
              position: absolute;
              content:'';
              width:8px;
              height:8px;
              top:23px;
              left:7px;
              background: #FF3D57;
              border-radius: 50%;
            }
          }
          &:last-of-type {
            margin-right:0;
          }
          &:nth-of-type(2) {
            .top {
              &::before {
                background: #2AE33E;
              }
            }
          }
          &:nth-of-type(3) {
            .top {
              &::before {
                background:#FA6400;
              }
            }
          }
          &:nth-of-type(4) {
            .top {
              &::before {
                background: #6236FF;
              }
            }
          }
          &:nth-of-type(5) {
            .top {
              &::before {
                background: #EB00FF;
              }
            }
          }
        }
      }
    }
    .totalData {
      margin-bottom:10px;
      border-radius:6px;
      background: #FFF;
      .content {
        padding:25px;
        ul {
          padding:0;
          margin:0 0 10px 0;
          display: flex;
          flex-wrap: wrap;
          li {
            width:200px;
            height:76px;
            padding:20px;
            margin-right:25px;
            margin-bottom:15px;
            background: #FCFDFE;
            border-radius: 4px;
            border: 1px solid #DBDEE5;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            span {
              &:first-of-type {
                line-height: 1em;
                color:#323232;
                font-size:14px;
                font-weight: 500;
              }
              &:last-of-type {
                line-height: 1em;
                color:#646464;
                font-size:12px;
              }
            }
          }
        }
        .canvas {
          width:100%;
          height:388px;
          background: #FFF;
          border-radius: 6px;
          border: 1px solid #DBDEE5;
        }
      }
    }
    .merchantData {
      margin-bottom:10px;
      flex:none;
      overflow: hidden;
      ul.table {
        height:288px;
        padding:0;
        margin:0;
        background: #FFF;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        &::-webkit-scrollbar { /*滚动条整体样式*/
            width: 6px ; /*高宽分别对应横竖滚动条的尺寸*/
            height: 6px ;
            background: #ffffff;;
            cursor: pointer;

        }

        &::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(240, 240, 240, .5) ;;
            background: rgba(63, 98, 131, 0.8) ;;
            cursor: pointer ;
        }

        &::-webkit-scrollbar-track { /*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(240, 240, 240, .5) ;
            border-radius: 0 ;
            background: rgba(240, 240, 240, 0.5) ;
            cursor: pointer;
        }
        li {
          display: flex;
          height:40px;
          line-height: 40px;
          border-bottom:1px solid #E0E3E9;
          box-sizing: border-box;
          span {
            flex:1;
            text-align: center;
            color:#646464;
            font-size:14px;
            border-right:1px solid #E0E3E9;
            &:nth-of-type(1) {
              flex:none;
              width:100px;
            }
              &:nth-of-type(2) {

              }
              &:nth-of-type(3) {
                
              }
              &:nth-of-type(4) {
                
              }
              &:nth-of-type(5) {
                
              }
              &:nth-of-type(6) {
                
              }
            &:nth-of-type(7) {
              border-right:none;
            }
          }
        }
        .table-title {
          height:48px;
          line-height: 48px;
          span {
            color:#000000;
          }
        }
        .item {

        }
      }
    }
    .container {
      display: flex;
      >div {
        flex:1;
        ul.table {
          height:288px;
          padding:0;
          margin:0;
          background: #FFF;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          &::-webkit-scrollbar { /*滚动条整体样式*/
              width: 6px ; /*高宽分别对应横竖滚动条的尺寸*/
              height: 6px ;
              background: #ffffff;;
              cursor: pointer;
          }
          &::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
              border-radius: 5px;
              -webkit-box-shadow: inset 0 0 5px rgba(240, 240, 240, .5) ;;
              background: rgba(63, 98, 131, 0.8) ;;
              cursor: pointer ;
          }
          &::-webkit-scrollbar-track { /*滚动条里面轨道*/
              -webkit-box-shadow: inset 0 0 5px rgba(240, 240, 240, .5) ;
              border-radius: 0 ;
              background: rgba(240, 240, 240, 0.5) ;
              cursor: pointer;
          }
          li {
            display: flex;
            height:40px;
            line-height: 40px;
            border-bottom:1px solid #E0E3E9;
            box-sizing: border-box;
            span {
              flex:1;
              text-align: center;
              color:#646464;
              font-size:14px;
              border-right:1px solid #E0E3E9;
              &:nth-of-type(1) {
                flex:none;
                width:100px;
              }
              &:last-of-type {
                border-right:none;
              }
            }
          }
          .table-title {
            height:48px;
            line-height: 48px;
            span {
              color:#000000;
            }
          }
        }
      }
      .traderData {
        margin-right:10px;
      }

    }
  }
</style>
