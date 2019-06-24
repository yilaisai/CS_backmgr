/**
*  Created by   阿紫
*  On  2019/6/19 0019
*  Content  代理刷单-刷单账户管理
*/
<template>
  <div class='account'>
    <el-form :inline="true"
             label-width="90px"
             ref="filterForm"
             :model="filterForm">
      <sac-input
        ref="phone"
        label="刷单账号"
        v-model.trim="filterForm.userId"
        prop="phone"></sac-input>
      <sac-submit-form
        :isReset='false'
        @submitForm="getList()"></sac-submit-form>
      <el-form-item  style="text-align: right">
        <el-button type="primary" size="small" @click="syncInfo">同步商户信息</el-button>
      </el-form-item>
    </el-form>
    <sac-table :data="listData.list">
      <el-table-column prop="userId" label="用户ID">
      </el-table-column>
      <el-table-column prop="agencyProfit" label="代理收益">
        <template slot-scope="scope">
          {{ scope.row.agencyProfit }} {{scope.row.coinName }}
        </template>
      </el-table-column>
      <el-table-column prop="margin" label="保证金金额">
        <template slot-scope="scope">
          {{ scope.row.margin }} {{scope.row.payCoinName }}
        </template>
      </el-table-column>
      <el-table-column prop="brushed" label="已刷单">
        <template slot-scope="scope">
          {{ scope.row.brushed }} {{scope.row.payCoinName }}
        </template>
      </el-table-column>
      <el-table-column prop="brushing" label="待刷单金额">
        <template slot-scope="scope">
          {{ scope.row.brushing }} {{scope.row.payCoinName }}
        </template>
      </el-table-column>
      <el-table-column prop="profit" label="刷单收益">
        <template slot-scope="scope">
          {{ scope.row.profit }} {{scope.row.coinName }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          {{ scope.row.state == 1?'刷单中':'停止' }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="时间"></el-table-column>
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
    name: "account",
    data() {
      return {
        filterForm: {
          userId: '',
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
        this.getList();
      },
      getList() {
        this.$http.post("/cloud/backmgr/shop/listMarginAccount", this.filterForm).then((res) => {
          this.listData.list = res.result.list;
          this.listData.total = res.result.count;
        })
      },
      syncInfo() {
        this.$http.post("/wallet/backmgr/user/migrationShopUser.do").then((res) => {
          this.$notify({
            title: '成功',
            message: `同步成功`,
            type: 'success'
          });
        })
      }
    },
    activated() {
      this.getList();
    }
  };
</script>
<style lang="less">
  .account {
  }
</style>
