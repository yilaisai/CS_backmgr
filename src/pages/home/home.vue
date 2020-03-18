<template>
  <div class="sac-home">
    <!-- <div class="table-wrap">
      <h2 class="t-title">运营数据</h2>
      <el-table :data="user" border size="mini">
        <el-table-column prop="date" label="日期" align="center"></el-table-column>
        <el-table-column prop="total" label="用户总数" align="center"></el-table-column>
		    <el-table-column prop="onlineNum" label="当前在线人数" align="center"></el-table-column>
        <el-table-column prop="tdCount" label="今日新增" align="center"></el-table-column>
        <el-table-column prop="ytdCount" label="昨日新增" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="table-wrap">
      <h2 class="t-title">钱包账户资产信息</h2>
      <el-table :data="account" border size="mini">
        <el-table-column prop="name" label="币种" align="center"></el-table-column>
        <el-table-column prop="total" label="钱包账户总额" align="center"></el-table-column>
        <el-table-column prop="total" label="昨日充值额" align="center"></el-table-column>
        <el-table-column prop="total" label="昨日成功提现额" align="center"></el-table-column>
        <el-table-column prop="total" label="提现中金额" align="center"></el-table-column>
        <el-table-column prop="total" label="资金净流入" align="center"></el-table-column>
      </el-table>
    </div> -->
    <div class="ToDoList">
      <div class="title">待办事项</div>
      <ul>
        <li>
          <div class="top">
            <span>{{appealIng}}条申诉待处理</span>
          </div>
          <div class="bottom" @click="$router.push('/LegalCurrency/complaint')">
            <span>去处理</span>
            <img src="@/assets/down_right.svg" alt="">
          </div>
        </li>
        <li>
          <div class="top">
            <span>{{withdrawIng}}条提币审核待处理</span>
          </div>
          <div class="bottom" @click="$router.push('/money/withdraw-check')">
            <span>去处理</span>
            <img src="@/assets/down_right.svg" alt="">
          </div>
        </li>
        <li>
          <div class="top"><span>{{bindInfoIng}}条收款方式审核待处理</span></div>
          <div class="bottom" @click="$router.push('/LegalCurrency/paymentMethodVerify')">
            <span>去处理</span>
            <img src="@/assets/down_right.svg" alt="">
          </div>
        </li>
        <li>
          <div class="top"><span>{{outIng}}条兑出审核待处理</span></div>
          <div class="bottom" @click="$router.push('/merchant/cashOutVerify')">
            <span>去处理</span>
            <img src="@/assets/down_right.svg" alt="">
          </div>
        </li>
        <li>
          <div class="top"><span>{{merchantApplyIng}}条商户注册审核待处理</span></div>
          <div class="bottom" @click="$router.push('/merchant/merchantList')">
            <span>去处理</span>
            <img src="@/assets/down_right.svg" alt="">
          </div>
        </li>
        <li>
          <div class="top"><span>{{auditIng}}条广告商审核待处理</span></div>
          <div class="bottom" @click="$router.push('/LegalCurrency/advertisersVerify')">
            <span>去处理</span>
            <img src="@/assets/down_right.svg" alt="">
          </div>
        </li>
        <li>
          <div class="top"><span>{{auditPersonIng}}条实名审核待处理</span></div>
          <div class="bottom" @click="$router.push('/user/identityVerify')">
            <span>去处理</span>
            <img src="@/assets/down_right.svg" alt="">
          </div>
        </li>
      </ul>
    </div>
    <div class="totalOrder">
      <div class="title">订单统计</div>
      <div class="content">
        <div class="left">
          <div class="echart" id="echart1"></div>
          <div class="data">
            <div class="title">今日进行中订单数</div>
            <div class="pay"> 
              <div class="pay-left">
                <span>未付款：</span>
                <b>{{payIngOrder}}</b>
              </div>
              <div class="pay-right">
                <span>已付款：</span>
                <b>{{payedOrder}}</b>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="echart" id="echart2"></div>
          <div class="data">
            <div class="title">今日完成订单数</div>
            <div class="pay"> 
              <div class="pay-left">
                <span>已完成：</span>
                <b>{{finishOrder}}</b>
              </div>
              <div class="pay-right">
                <span>已取消：</span>
                <b>{{cancelOrder}}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="totalData">
      <div class="title">统计数据</div>
      <ul class="content">
        <li>
          <div class="top">兑入</div>
          <div class="bottom">
            <div class="text">
              <div>
                <span>当日已完成兑入 :</span>
                <span>{{sumInToday}} USDT</span>
              </div>
              <div>
                <span>昨日已完成兑入 :</span>
                <span>{{sumInYesterday}} USDT</span>
              </div>
            </div>
            <img src="@/assets/line1.svg" alt="">
          </div>
        </li>
        <li>
          <div class="top">兑出</div>
          <div class="bottom">
            <div class="text">
              <div>
                <span>当日已完成兑出 :</span>
                <span>{{sumOutToday}} USDT</span>
              </div>
              <div>
                <span>昨日已完成兑出 :</span>
                <span>{{sumInYesterday}} USDT</span>
              </div>
            </div>
            <img src="@/assets/line2.svg" alt="">
          </div>
        </li>
        <li>
          <div class="top">提币</div>
          <div class="bottom">
            <div class="text">
              <div>
                <span>当日已完成提币 :</span>
                <span>{{todayWithdrawAmount}} USDT</span>
              </div>
              <div>
                <span>昨日已完成提币 :</span>
                <span>{{yesterdayWithdrawAmount}} USDT</span>
              </div>
            </div>
            <img src="@/assets/line1.svg" alt="">
          </div>
        </li>
        <li>
          <div class="top">充币</div>
          <div class="bottom">
            <div class="text">
              <div>
                <span>当日充币 :</span>
                <span>{{todayRechargeAmount}} USDT</span>
              </div>
              <div>
                <span>昨日充币 :</span>
                <span>{{yesterdayRechargeAmount}} USDT</span>
              </div>
            </div>
            <img src="@/assets/line3.svg" alt="">
          </div>
        </li>
        <li>
          <div class="top">兑入冻结</div>
          <div class="bottom">
            <div class="text">
              <div>
                <span>当日兑入冻结 : </span>
                <span>{{inFrozen}} USDT</span>
              </div>
            </div>
            <img src="@/assets/line1.svg" alt="">
          </div>
        </li>
        <li>
          <div class="top">兑出冻结</div>
          <div class="bottom">
            <div class="text">
              <div>
                <span>当日兑出冻结 :</span>
                <span>{{outFrozen}} USDT</span>
              </div>
            </div>
            <img src="@/assets/line2.svg" alt="">
          </div>
        </li>
        <li>
          <div class="top">提币冻结</div>
          <div class="bottom">
            <div class="text">
              <div>
                <span>当日提币冻结 :</span>
                <span>{{withdrawFrozen}} USDT</span>
              </div>
            </div>
            <img src="@/assets/line1.svg" alt="">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { dateFormat } from '@/common/util';
  import echarts from "@/assets/js/echarts"
  export default {
    name: 'home',
    data() {
      return {
        user: [],
        account: [],
        appealIng:0,
        auditIng:0,
        bindInfoIng:0,
        outIng:0,
        withdrawIng:0,
        auditPersonIng:0,
        merchantApplyIng:0,
        payIngOrder:0,
        payedOrder:0,
        finishOrder:0,
        cancelOrder:0,
        sumInToday:0,
        sumInYesterday:0,
        sumOutToday:0,
        sumOutYesterday:0,
        todayWithdrawAmount:0,
        yesterdayWithdrawAmount:0,
        todayRechargeAmount:0,
        yesterdayRechargeAmount:0,
        inFrozen:0,
        outFrozen:0,
        withdrawFrozen:0,
      };
    },
    methods: {
      getData() {
        this.$http.post('/wallet/backmgr/indexInfo').then(res => {
          let result = res.result;
          this.appealIng = result.appealIng
          this.auditIng = result.auditIng
          this.bindInfoIng = result.bindInfoIng
          this.outIng = result.outIng
          this.withdrawIng = result.withdrawIng
          this.auditPersonIng = result.auditPersonIng
          this.merchantApplyIng = result.merchantApplyIng
          this.payIngOrder = result.payIngOrder
          this.payedOrder = result.payedOrder
          this.finishOrder = result.finishOrder
          this.cancelOrder = result.cancelOrder
          this.sumInToday = result.sumInToday
          this.sumInYesterday = result.sumInYesterday
          this.sumOutToday = result.sumOutToday
          this.sumInYesterday =result.sumInYesterday
          this.todayWithdrawAmount = result.todayWithdrawAmount || 0
          this.yesterdayWithdrawAmount = result.yesterdayWithdrawAmount || 0
          this.todayRechargeAmount = result.todayRechargeAmount || 0
          this.yesterdayRechargeAmount = result.yesterdayRechargeAmount || 0
          this.inFrozen = result.inFrozen
          this.outFrozen = result.outFrozen
          this.withdrawFrozen = result.withdrawFrozen
          let data1 = [{value:this.payIngOrder,name:"未付款"},{value:this.payedOrder,name:"已付款"}]
          let data2 = [{value:this.cancelOrder,name:"已取消"},{value:this.finishOrder,name:"已完成"}]
          this.intCanvas(data1,data2)
        })
      },
      intCanvas(data1,data2) {
        let color = ['#FDBF5E','#0081FF']
        this.drawLine('echart1',data1,color)
        this.drawLine('echart2',data2,color)
      },
      drawLine(id, data, color) {
        var myChart = echarts.init(document.getElementById(id));
        let option = {
          tooltip: {
              trigger: 'item',
              formatter: '{b}<br/>{c} ({d}%)'
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['0', '100%'],
              hoverAnimation:false,
              label: {
                normal:{
                  position:'inner',
                  fontSize:'12',
                },
                emphasis: {
                  textStyle: {
                    fontSize: '14',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: data,
              color:color
            }
          ],
        }
        myChart.setOption(option)
      }
    },
  	activated() {
  		this.getData()
    },
  };
</script>
<style lang='less'>
  .sac-home {
    min-width:1230px;
    background: #F1F1F1;
    overflow-y: auto;
    .table-wrap {
    }
    .t-title {
	  text-align: center;
	  font-size: 16px;
    }
    .ToDoList {
      margin-bottom:20px;
      border:1px solid #F1F1F1;
      border-radius:6px;
      background: #FFF;
      .title {
        padding:22px 20px;
        line-height: 1em;
        font-size:16px;
        color:#000;
        font-weight: 600;
        border-bottom:1px solid rgba(130,145,169,.24);
      }
      ul {
        padding:20px;
        display: flex;
        align-items: center;
        li {
          list-style: none;
          flex:1;
          margin-right:10px;
          border-radius:6px;
          border:1px solid rgba(130,145,169,0.25);
          &:last-of-type {
            margin-right:0;
          }
          display: flex;
          flex-direction: column;
          .top {
            position: relative;
            height:62px;
            padding:0 24px;
            font-size:14px;
            color:#242A38;
            background:rgba(219,231,238,0.25);
            border-bottom:1px solid #DBDEE5;
            display: flex;
            align-items: center;
            span {
              position: relative;
               &::before {
                position: absolute;
                content:'';
                width:6px;
                height:6px;
                top:7px;
                left:-12px;
                background: #FF3D57;
                border-radius: 50%;
              }
            }
            // &::before {
            //   position: absolute;
            //   content:'';
            //   width:6px;
            //   height:6px;
            //   top:31px;
            //   left:12px;
            //   background: #FF3D57;
            //   border-radius: 50%;
            // }
          }
          .bottom {
            padding:14px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            span {
              margin-right:7px;
              color:#0081FF;
              font-size:12px;
            }
          }
        }
      }
    }
    .totalOrder {
      margin-bottom:20px;
      background:rgba(255,255,255,1);
      border-radius:6px;
      >.title {
        padding:22px 20px;
        line-height: 1em;
        font-size:16px;
        color:#000;
        font-weight: 600;
        border-bottom:1px solid rgba(130,145,169,.24);
      }
      .content {
        display: flex;
        padding:40px 0;
        >div {
          flex:1;
          height:160px;
          display: flex;
          justify-content: center;
          .echart {
            width:160px;
            height:160px;
            margin-right:42px;
          }
          .data {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            .title {
              font-size:16px;
              color:#000;
              margin-bottom:20px;
            }
            .pay {
              width:100%;
              display: flex;
              >div {
                min-width:150px;
                height:74px;
                background: rgba(241,241,241,.3);
                border-radius: 6px;
                padding-left:20px;
                display: flex;
                align-items: center;
                span {
                  font-size:14px;
                  color:#323232;
                }
                b {
                  font-size:16px;
                }
              }
              &-left {
                margin-right:30px; 
                b {
                  color:#5E93FF;
                }
              }
              &-right {
                b {
                  color:#0DB97E;
                }
              }
            }
          }
        }
        .left {
          position: relative;
          &::after {
            position: absolute;
            content:"";
            width:1px;
            height:160px;
            top:0;
            right:0;
            background:rgba(130,145,169,.25);;
          }
        }
      }
    }
    .totalData {
      background:rgba(255,255,255,1);
      border-radius:6px;
      .title {
        padding:22px 20px;
        line-height: 1em;
        font-size:16px;
        color:#000;
        font-weight: 600;
        border-bottom:1px solid rgba(130,145,169,.24);
      }
      .content {
        padding:20px;
        display: flex;
        flex-wrap: wrap;
        li {
          width:24%;
          list-style: none;
          height:163px;
          margin-right:1%;
          margin-bottom:20px;
          border-radius:4px;
          border:1px solid rgba(219,222,229,1);
          display:flex;
          justify-content: space-between;
          flex-direction: column;
          &:nth-of-type(4n) {
            margin-right:0;
          }
          .top {
            padding:14px 13px;
            border-bottom:1px solid #DBDEE5;
            font-size:14px;
            color:#323232;
          }
          .bottom {
            flex:1;
            background:linear-gradient(360deg,rgba(255,255,255,1) 0%,rgba(250,251,252,1) 100%);
            border-radius:0px 0px 3px 3px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .text {
              padding:25px 12px 0;
              display: flex;
              flex-direction:column;
              div {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom:14px;
                span {
                  &:first-of-type {
                    color:#646464;
                    font-size:12px;
                    line-height: 1em;
                  }
                  &:last-of-type {
                    color:#323232;
                    font-size:14px;
                    line-height: 1em;
                  }
                }
              }
            }
            img {
              width:100%;
            }
          }
        }
      }
    }
  }
</style>
