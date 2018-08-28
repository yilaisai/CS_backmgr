/**
*  Created by   阿紫
*  On  2018/8/10
*  Content 用户排行
*/
<template>
  <div class='ranking'>
    <el-form :inline="true"
             label-width="80px"
             ref="filterForm"
             :model="filterForm">
      <sac-coin ref="coinId" :isAll="false" v-model="filterForm.coinId" @change="coinChange"></sac-coin>
      <sac-submit-form
        @submitForm="submitForm"
        @resetForm="resetForm"></sac-submit-form>
    </el-form>
    <el-table height="100%" border size="small" :data="listData.list">
      <el-table-column prop="rank" label="排名" width="100"></el-table-column>
      <el-table-column prop="phone" label="账号" width="130"></el-table-column>
      <el-table-column prop="amount" :label="coinRand">
      </el-table-column>
      <el-table-column prop="coinAddr" label="收款地址"></el-table-column>
      <el-table-column prop="lastLoginTime" label="最后登录时间" width="140">
      </el-table-column>
      <el-table-column label="操作" width="130">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="primary" size="small" @click.native="goDetail(scope.row.phone)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <sac-pagination v-show="listData.list.length>0"
                    @handleChange="getPaginationChange"
                    :total="+listData.total"
                    :page-size="filterForm.pageSize"
                    :current-page="filterForm.curPage">
    </sac-pagination>
  </div>
</template>
<script>
  import { dateFormat } from '@/common/util';

  export default {
    name: 'ranking',
    data() {
      return {
        filterForm: {
          coinId: 1, // sac
          orderBy: 'desc',
          curPage: 1,
          pageSize: 20
        },
        listData: {
          total: null,
          list: [],
        },
        coinRand: '持有的全部'
      };
    },
    methods: {
      coinChange(val, name) {
        this.coinRand = `持有的${name}`
      },
      resetForm() {
        this.$refs.coinId.reset();
        this.$refs.filterForm.resetFields(); // 重置query的数据
        this.filterForm.curPage = 1;
        this.getPersonalRanking();
      },
      submitForm() {
        this.filterForm.curPage = 1;
        this.getPersonalRanking();
      },
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        this.filterForm.curPage = currentPage;
        this.getPersonalRanking();
      },
      getPersonalRanking() {
        this.$http.post("cloud/backmgr/statics/personalRanking", this.filterForm).then((res) => {
          const { list, total } = res.result;
          list.forEach((item) => {
            item.lastLoginTime = item.lastLoginTime ? dateFormat(item.lastLoginTime, 'YYYY-MM-DD HH:mm:ss') : item.lastLoginTime;
          })
          this.listData.list = list;
          this.listData.total = total
        })
      },
      goDetail(phone) {
        this.$router.push({ name: 'queryDetails', query: { phone } });
      },
      // sortChange(column, prop, order) {
      //   const obj = {
      //     ascending: 'asc',
      //     descending: 'desc',
      //   }
      //   this.filterForm.orderBy = obj[column.order];
      //   this.getPersonalRanking();
      // },
    },
    activated() {
      this.getPersonalRanking();
    }
  };
</script>
<style lang="less">
  .ranking {
  }
</style>
