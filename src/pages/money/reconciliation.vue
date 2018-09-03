/**
*  Created by   阿紫
*  On  2018/8/10
*  Content 总额对账
*/
<template>
  <div class='reconciliation'>
    <el-form :inline="true"
             label-width="80px"
             ref="filterForm"
             :model="filterForm">
      <sac-coin ref="coinId" :isAll="false" v-model="filterForm.coinId" @change="coinChange"></sac-coin>
      <sac-teamType ref="teamType" :isAll="true" v-model="filterForm.teamType" @change="teamTypeChange"></sac-teamType>
      <sac-input ref="fromOrToUserPhone" label="用户账号" v-model.trim="filterForm.fromOrToUserPhone"></sac-input>
      <sac-date ref="selectedDate" label="日　　期" v-model="selectedDate"></sac-date>
      <sac-submit-form
        @submitForm="submitForm()"
        :isReset="false"></sac-submit-form>
    </el-form>
    <div class="content">
      <el-row :gutter="24">
        <el-col :span="8"><span>币种：</span><span class="sac-red">{{list.coinName}}</span></el-col>
        <el-col :span="8"><span>区块链{{list.teamTypeName}}余额：</span><span class="sac-red">{{list.sumBlockAmount}}</span>
        </el-col>
        <el-col :span="8"><span>钱包{{list.teamTypeName}}余额：</span><span class="sac-red">{{list.amount}}</span></el-col>
      </el-row>
    </div>
    <div v-if="!seriesData" class="reminder">暂无数据</div>
    <sac-line v-else :height="sacLineHeight" :series-data='seriesData'></sac-line>
  </div>
</template>
<script>
  import SacLine from '@/components/sac-line.vue';
  import { dateFormat } from '@/common/util';

  export default {
    name: 'reconciliation',
    components: {
      SacLine,
    },
    data() {
      return {
        filterForm: {
          coinId: 1,//1表示SAC,2表示BTC,3表示ETH
          fromOrToUserPhone: '',
          teamType: '0', // 全部
          beginCreateDate: '',
          endCreateDate: '',
        },
        selectedDate: [], //已选日期
        list: {},
        content: {
          coinName: 'SAC',
          teamTypeName: '全部',
        },
        sacLineHeight: '100%',
        // sacLineHeight: `${document.body.offsetHeight - 110}px`,
        seriesData: null,
      };
    },
    methods: {
      submitForm(num) {
        this.getBlockChainBillToInsiteBill();
      },
      teamTypeChange(val, name) {
        this.content.teamTypeName = name;
      },
      coinChange(val, name) {
        this.content.coinName = name;
      },
      getBlockChainBillToInsiteBill() {
        this.filterForm.beginCreateDate = this.selectedDate && this.selectedDate[0];
        this.filterForm.endCreateDate = this.selectedDate && this.selectedDate[1];
        this.$http.post('wallet/backmgr/trade/blockChainBillToInsiteBill.do', this.filterForm)
          .then((res) => {
            const { nowSumData, historyData } = res.result
            const { teamTypeName, coinName } = this.content;
            this.list = nowSumData[0];
            this.list.teamTypeName = teamTypeName;
            this.list.coinName = coinName;
            const amount = [];
            const blockBalance = [];
            const createDate = [];
            historyData.forEach((item) => {
              amount.push(item.amount);
              blockBalance.push(item.blockBalance);
              createDate.push(`${item.createDate.toString().substr(0, 4)}-${item.createDate.toString().substr(4, 2)}-${item.createDate.toString().substr(6, 2)}`);
            })
            this.seriesData = {
              title: {
                text: `${teamTypeName}资产（${coinName}）`,
              },
              legend: {
                data: ['区块链余额', '钱包余额']
              },
              xAxis: {
                data: createDate
              },
              series: [{
                name: '区块链余额',
                type: 'line',
                data: blockBalance,
                itemStyle: { normal: { label: { show: false } } }
              }, {
                name: '钱包余额',
                type: 'line',
                data: amount,
                itemStyle: { normal: { label: { show: false } } }
              }]
            }
          });
      }
    },
    activated() {
      const end = dateFormat();
      const start = dateFormat(new Date().getTime() - 3600 * 1000 * 24 * 15);
      this.selectedDate = [start, end];
      this.getBlockChainBillToInsiteBill();
    },
  };
</script>
<style lang="less">
  .reconciliation {
    .content {
      margin: 20px 0;
      color: #606266;
      font-size: 14px;
      .sac-red {
        color: red;
      }
    }
    .reminder {
      color: #606266;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      display: flex;
    }
  }
</style>
