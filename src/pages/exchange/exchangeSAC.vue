/**
*  Created by   阿紫
*  On  2019/6/26 0026
*  Content  兑换SAC
*/
<template>
    <div class='exchangeSAC'>
      <el-form :inline="true"
               label-width="90px"
               ref="filterForm"
               :model="filterForm">
        <sac-input
          ref="phone"
          label="手机号"
          v-model.trim="filterForm.phone"></sac-input>
        <sac-input
          ref="phone"
          label="兑换币种"
          v-model.trim="filterForm.coinname"></sac-input>
        <sac-submit-form
          :isReset='false'
          @submitForm="getQueryExchangeLogList()"></sac-submit-form>
      </el-form>
      <sac-table :data="listData.list">
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="coinname" label="兑换币种"></el-table-column>
        <el-table-column prop="amount" label="数量"></el-table-column>
        <el-table-column prop="createTime" label="时间">
          <template slot-scope="scope">
            {{scope.row.createTime}}
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
    export default {
        name: "exchangeSAC",
        data() {
            return {
              filterForm: {
                phone: '',
                coinname: '',
                pageNum: 1,
                pageSize: 20,
              },
              listData: {
                total: null,
                list: [],
              },
            };
        },
      methods: {
        getPaginationChange(val, currentPage) {
          this.filterForm.pageSize = val;
          this.filterForm.pageNum = currentPage;
          this.getQueryExchangeLogList();
        },
        // 查询代理用户列表
        getQueryExchangeLogList() {
          this.$http.post("/wallet/backmgr/exchange/queryExchangeLogList", this.filterForm).then((res) => {
            this.listData.list = res.result.list;
            this.listData.total = res.result.count;
          })
        },
      },
      activated() {
        this.getQueryExchangeLogList();      // 查询代理用户列表
      }
    };
</script>
<style lang="">
    .exchangeSAC {
    }
</style>
