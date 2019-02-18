/**
*  Created by   阿紫
*  On  2018/8/8
*  Content
*/
<template>
  <div class="sac-home">
    <div class="table-wrap">
      <h2 class="t-title">用户信息</h2>
      <el-table :data="user" border>
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="total" label="用户总数"></el-table-column>
        <el-table-column prop="tdCount" label="今日新增"></el-table-column>
        <el-table-column prop="ytdCount" label="昨日新增"></el-table-column>
      </el-table>
    </div>
    <div class="table-wrap">
      <h2 class="t-title">账户信息</h2>
      <el-table :data="account" border>
        <el-table-column prop="name" label="币种"></el-table-column>
        <el-table-column prop="total" label="钱包账户总额"></el-table-column>
        <el-table-column prop="increase" label="昨日新增"></el-table-column>
      </el-table>
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
        this.$http.post('wallet/backmgr/user/selectSysInfo.do')
          .then((res) => {
            const { list, total, tdCount, ytdCount } = res.result;
            this.account = list;
            this.user = [{
              date: dateFormat(new Date, 'YYYY年MM月DD日'),
              total,
              tdCount,
              ytdCount
            }];
          })
      },
    },
    mounted() {
      this.getData();
    },
  };
</script>
<style lang='less'>
  .sac-home {
    .table-wrap {
      margin-top: 40px;
    }
    .t-title {
      text-align: center;
    }
  }
</style>
