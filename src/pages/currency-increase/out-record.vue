/**
*  Created by   阿紫
*  On  2018/8/10
*  Content 出仓记录
*/
<template>
    <div class='out-record'>
      <el-form :inline="true"
               label-width="100px"
               ref="filterForm"
               :model="filterForm">
        <sac-input
          ref="phone"
          label="用户名"
          v-model.trim="filterForm.phone"
          prop="phone"></sac-input>
        <sac-submit-form
          :isReset='false'
          @submitForm="submitForm(1)"></sac-submit-form>
      </el-form>
      <sac-table :data="listData.list">
        <el-table-column prop="phone" label="用户名"></el-table-column>
        <el-table-column prop="planName" label="参与计划"></el-table-column>
        <el-table-column prop="amount" label="转入资产"></el-table-column>
        <el-table-column prop="income" label="总收益"></el-table-column>
        <el-table-column prop="transferAmount" label="转出资产"></el-table-column>
        <el-table-column prop="createTime" label="申购时间"></el-table-column>
        <el-table-column prop="endTime" label="到期时间"></el-table-column>
        <el-table-column prop="recdNum" label="期数"></el-table-column>
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
  export default {
    name: 'out-record',
    data() {
      return {
        filterForm: {
          phone: '',
          isTransfer: "VALID1",
          pageNum: 1,
          pageSize: 20
        },
        listData: {
          total: null,
          list: [],
        },
      };
    },
    methods: {
      submitForm(num) {
        this.filterForm.pageNum = num;
        this.getCoinPlanRecd();
      },
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        this.submitForm(currentPage);
      },
      getCoinPlanRecd() {
        this.$http.post("wallet/backmgr/plan/getCoinPlanRecd.do", this.filterForm).then((res) => {
          this.listData.list = res.result.list.list;
          this.listData.total = res.result.list.total;
        })
      },
    },
    activated() {
      this.getCoinPlanRecd();
    }
  };
</script>
<style lang="less">
    .out-record {
    }
</style>
