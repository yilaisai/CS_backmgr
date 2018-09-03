/**
*  Created by   阿紫
*  On  2018/8/10
*  Content 对账单
*/
<template>
  <div class='statements'>
    <el-form :inline="true"
             label-width="80px"
             ref="filterForm"
             :model="filterForm">
      <sac-coin ref="coinId" v-model="filterForm.coinId"></sac-coin>
      <sac-teamType ref="teamType" v-model="filterForm.teamType"></sac-teamType>
      <sac-input ref="fromOrToUserPhone" label="用户账号" v-model.trim="filterForm.fromOrToUserPhone"></sac-input>
      <sac-date ref="selectedDate" label="日　　期" v-model="selectedDate"></sac-date>
      <sac-submit-form
        @submitForm="submitForm(1)"
        :isReset="false"></sac-submit-form>
    </el-form>
    <div class="moneyList">
      <el-tag v-for="(item,index) in moneyList" :key="index">{{item.name}}：{{item.value}}</el-tag>
    </div>
    <sac-table :data="listData.list">
      <el-table-column align="center" prop="tradeId" label="序号"></el-table-column>
      <el-table-column align="center" prop="fromUserPhone" label="用户账号"></el-table-column>
      <el-table-column align="center" prop="coinName" label="币种" width="90"></el-table-column>
      <el-table-column prop="tradeType" label="交易类型" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.tradeType | convertTransactionType}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="merchantType" :formatter="merchantType" label="商户类型"
                       width="100"></el-table-column>
      <el-table-column align="center" prop="amount" label="转账金额"></el-table-column>
      <el-table-column align="center" prop="tradeTime" label="日期/时间"></el-table-column>
      <el-table-column align="center" prop="toUserPhone" label="对方账号"></el-table-column>
      <el-table-column align="center" prop="tradeStatus" label="状态" width="130">
        <template slot-scope="scope">
          <span>{{scope.row.tradeStatus | transferQueryStatusType}}</span>
        </template>
      </el-table-column>
    </sac-table>
    <sac-pagination v-show="listData.list.length>0"
                    @handleChange="getPaginationChange"
                    :total="+listData.total"
                    :page-size="filterForm.pageSize"
                    :current-page="filterForm.pageNum">
    </sac-pagination>
  </div>
</template>
<script>
  import { dateFormat } from '@/common/util';

  export default {
    name: 'statements',
    data() {
      return {
        filterForm: {
          coinId: '',
          fromOrToUserPhone: '',
          teamType: '-1', // 个人
          startDate: '',
          endDate: '',
          pageNum: 1,
          pageSize: 20
        },
        listData: {
          total: null,
          list: [],
        },
        moneyList: [],
        selectedDate: [], //已选日期
      };
    },
    methods: {
      submitForm(num) {
        this.filterForm.pageNum = num;
        this.getTradeList();
      },
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        this.submitForm(currentPage);
      },
      getTradeList() {
        this.filterForm.startDate = this.selectedDate && this.selectedDate[0];
        this.filterForm.endDate = this.selectedDate && this.selectedDate[1];
        this.$http.post('wallet/backmgr/trade/getTradeList.do', this.filterForm)
          .then((res) => {
            const { list, total } = res.result.retMap;
            this.listData.list = list;
            this.listData.total = total;
            const sumData = res.result.sumData.length && res.result.sumData[0];
            const isSelf = this.filterForm.teamType == -1;
            this.moneyList = [{
              name: isSelf ? '链上转入' : '转入',
              value: sumData.inSumAmount || 0
            }, {
              name: isSelf ? '链上转出' : '转出',
              value: sumData.outSumAmount || 0
            }, {
              name: '余额',
              value: sumData.sunAmount || 0
            }]
          });
      },
      merchantType(row, col) {
        return row.merchantType == 'person' ? '个人' : row.merchantType;
      },
    },
    activated() {
      const end = dateFormat();
      const start = dateFormat(new Date().getTime() - 3600 * 1000 * 24 * 15);
      this.selectedDate = [start, end];
      this.getTradeList();
    }
  };
</script>
<style lang="less">
  .statements {
    .el-tag {
      margin-right: 10px;
    }
  }
</style>
