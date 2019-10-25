<template>
  <div class="sac-home">
    <div class="table-wrap">
      <h2 class="t-title">HOMO钱包运营数据</h2>
      <el-table :data="user" border size="mini">
        <el-table-column prop="date" label="日期" align="center"></el-table-column>
        <el-table-column prop="total" label="用户总数" align="center"></el-table-column>
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
    }
    .t-title {
	  text-align: center;
	  font-size: 16px;
    }
  }
</style>
