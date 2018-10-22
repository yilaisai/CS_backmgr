
<template>
  <div class='query-details'>
    <el-row class="sac-row">
      <el-col :span="4">
        <el-button size="small" type="primary" plain @click="$router.go(-1)">返回</el-button>
      </el-col>
    </el-row>
    <label>13502330693资金明细：</label>
    <sac-table :data="tableData">
      <el-table-column prop="coinName" label="序号" width="120"></el-table-column>
      <el-table-column prop="coinName" label="币种" width="120"></el-table-column>
      <el-table-column prop="coinName" label="类型" width="120"></el-table-column>
      <el-table-column prop="coinName" label="数量" width="120"></el-table-column>
      <el-table-column prop="coinName" label="日期" width="120"></el-table-column>
      <el-table-column prop="coinName" label="状态" width="120"></el-table-column>
      <el-table-column label="收款地址">
        <template slot-scope="scope">
          <span class="coin-addr">{{scope.row.coinAddr}}</span>
        </template>
      </el-table-column>
    </sac-table>
  </div>
</template>
<script>
  export default {
    name: 'capital-detail',
    data() {
      return {
        detais: {},
        tableData: [],
        optStatus: '',
      };
    },
    methods: {
      getDetail(phone) {
        this.$http.post('wallet/backmgr/user/queryUserInfo.do', {
          phone
        })
          .then((res) => {
            const { customerInfo, coins, optStatus } = res.result;
            this.detais = customerInfo;
            this.tableData = coins;
            this.optStatus = optStatus;
          });
      },
      /**
       * 冻结/解冻 锁定/解锁 用户   optStatus  用户状态：2表示冻结，1表示锁定，0表示解冻
       * */
      optStatusChange(type, name) {
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '确定执行 '),
            h('span', { style: 'color: red' }, `${name}`),
            h('span', { style: 'color: #0a52e0' }, `${this.detais.phone}`),
            h('span', null, ' 吗?'),
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              this.$http.post('wallet/backmgr/user/operatetUser.do', {
                userId: this.detais.userId,
                optStatus: type,
              }).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `${name} ${this.detais.phone} 成功`,
                  type: 'success'
                });
                this.getDetail(this.$route.query.phone);
                done();
              })
            } else {
              done();
            }
          }
        })
      },
    },
    activated() {
      this.getDetail(this.$route.query.phone);
    }
  };
</script>
<style lang="less">
  .query-details {
    .sac-row {
      margin-bottom: 20px;
      .el-col {
        margin-top: 20px;
      }
    }
  }
</style>
