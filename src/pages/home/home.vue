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
          <div class="top">63条申诉待处理</div>
          <div class="bottom">
            <span>去处理</span>
            <img src="@/assets/down_right.svg" alt="">
          </div>
        </li>
        <li>
          <div class="top">63条申诉待处理</div>
          <div class="bottom">
            <span>去处理</span>
            <img src="@/assets/down_right.svg" alt="">
          </div>
        </li>
        <li>
          <div class="top">63条申诉待处理</div>
          <div class="bottom">
            <span>去处理</span>
            <img src="@/assets/down_right.svg" alt="">
          </div>
        </li>
        <li>
          <div class="top">63条申诉待处理</div>
          <div class="bottom">
            <span>去处理</span>
            <img src="@/assets/down_right.svg" alt="">
          </div>
        </li>
        <li>
          <div class="top">63条申诉待处理</div>
          <div class="bottom">
            <span>去处理</span>
            <img src="@/assets/down_right.svg" alt="">
          </div>
        </li>
        <li>
          <div class="top">63条申诉待处理</div>
          <div class="bottom">
            <span>去处理</span>
            <img src="@/assets/down_right.svg" alt="">
          </div>
        </li>
        <li>
          <div class="top">63条申诉待处理</div>
          <div class="bottom">
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
          <div class="echart"></div>
          <div class="data">
            <div class="title">今日进行中订单数</div>
            <div class="pay"> 
              <div class="pay-left">
                <span>未付款：</span>
                <b>9886</b>
              </div>
              <div class="pay-right">
                <span>已付款：</span>
                <b>132132</b>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="echart"></div>
          <div class="data">
            <div class="title">今日进行中订单数</div>
            <div class="pay"> 
              <div class="pay-left">
                <span>未付款：</span>
                <b>9886</b>
              </div>
              <div class="pay-right">
                <span>已付款：</span>
                <b>132132</b>
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
          <div class="top">兑入冻结</div>
          <div class="bottom">
            <div class="text">
              <div>
                <span>当日已完成兑入 : :</span>
                <span>6,123.4889 USDT</span>
              </div>
              <div>
                <span>昨日已完成兑入 : :</span>
                <span>6,123.4889 USDT</span>
              </div>
            </div>
            <img src="@/assets/line1.svg" alt="">
          </div>
        </li>
        <li>
          <div class="top">兑入冻结</div>
          <div class="bottom">
            <div class="text">
              <div>
                <span>当日已完成兑入 : :</span>
                <span>6,123.4889 USDT</span>
              </div>
              <div>
                <span>昨日已完成兑入 : :</span>
                <span>6,123.4889 USDT</span>
              </div>
            </div>
            <img src="@/assets/line2.svg" alt="">
          </div>
        </li>
        <li>
          <div class="top">兑入冻结</div>
          <div class="bottom">
            <div class="text">
              <div>
                <span>当日已完成兑入 : :</span>
                <span>6,123.4889 USDT</span>
              </div>
              <div>
                <span>昨日已完成兑入 : :</span>
                <span>6,123.4889 USDT</span>
              </div>
            </div>
            <img src="@/assets/line1.svg" alt="">
          </div>
        </li>
        <li>
          <div class="top">兑入冻结</div>
          <div class="bottom">
            <div class="text">
              <div>
                <span>当日已完成兑入 : :</span>
                <span>6,123.4889 USDT</span>
              </div>
              <div>
                <span>昨日已完成兑入 : :</span>
                <span>6,123.4889 USDT</span>
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
                <span>当日已完成兑入 : :</span>
                <span>6,123.4889 USDT</span>
              </div>
              <div>
                <span>昨日已完成兑入 : :</span>
                <span>6,123.4889 USDT</span>
              </div>
            </div>
            <img src="@/assets/line1.svg" alt="">
          </div>
        </li>
        <li>
          <div class="top">兑入冻结</div>
          <div class="bottom">
            <div class="text">
              <div>
                <span>当日已完成兑入 : :</span>
                <span>6,123.4889 USDT</span>
              </div>
              <div>
                <span>昨日已完成兑入 : :</span>
                <span>6,123.4889 USDT</span>
              </div>
            </div>
            <img src="@/assets/line2.svg" alt="">
          </div>
        </li>
        <li>
          <div class="top">兑入冻结</div>
          <div class="bottom">
            <div class="text">
              <div>
                <span>当日已完成兑入 : :</span>
                <span>6,123.4889 USDT</span>
              </div>
              <div>
                <span>昨日已完成兑入 : :</span>
                <span>6,123.4889 USDT</span>
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

  export default {
    name: 'home',
    data() {
      return {
        user: [],
        account: [],
      };
    },
    methods: {
      getData() {
        this.$http.post('wallet/backmgr/user/selectSysInfo')
          .then((res) => {
            const { list, total, tdCount, ytdCount, onlineNum } = res.result;
            this.account = list;
            this.user = [{
              date: dateFormat(new Date, 'YYYY年MM月DD日'),
              total,
              tdCount,
              ytdCount,
              onlineNum
            }];
          })
      },
    },
  	activated() {
  		this.getData()
  	}
  };
</script>
<style lang='less'>
  .sac-home {
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
            padding:24px 0 24px 24px;
            font-size:14px;
            color:#242A38;
            background:rgba(219,231,238,0.25);
            border-bottom:1px solid #DBDEE5;
            &::before {
              position: absolute;
              content:'';
              width:6px;
              height:6px;
              top:31px;
              left:12px;
              background: #FF3D57;
              border-radius: 50%;
            }
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
          padding:0 60px;
          height:160px;
          display: flex;
          .echart {
            width:160px;
            height:160px;
            margin-right:42px;
          }
          .data {
            flex:1;
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
                flex:1;
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
