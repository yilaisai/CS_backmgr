
<template>
  <div class='query-details'>
    <el-row class="">
      <el-col :span="4">
        <el-button size="small" type="primary" plain @click="$router.go(-1)">返回</el-button>
      </el-col>
      <el-col :span="16">
        <h3 style="text-align:center">13502330693的邀请详情</h3>
      </el-col>
    </el-row>
    <div class="">
      邀请Ta的人：1590233999（持续白银）
    </div>
    <el-form :inline="true"
             label-width="100px"
             ref="filterForm">
      <el-form-item>
          <label>Ta 邀请的人：</label>
      </el-form-item>
      <sac-select ref="noticeType" label="状态类型" v-model="stateType"
                  :dataList="noticeTypeList"></sac-select>
      <sac-submit-form
        :isReset='false'
        @submitForm="submitForm(1)"></sac-submit-form>
    </el-form>
    <sac-table :data="tableData">
      <el-table-column prop="coinName" label="用户名" width="120"></el-table-column>
      <el-table-column prop="coinName" label="等级" width="120"></el-table-column>
      <el-table-column prop="coinName" label="PNB" width="120"></el-table-column>
      <el-table-column prop="coinName" label="邀请时间" width="120"></el-table-column>
      <el-table-column prop="coinName" label="注册时间" width="120"></el-table-column>
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
    name: 'invite-detail',
    data() {
      return {
        detais: {},
        tableData: [],
        optStatus: '',
        stateType: '',
        noticeTypeList: [{
          value: '',
          label: '全部',
        }, {
          value: 'SystemMsg',
          label: '注册',
        }, {
          value: 'OperationMsg',
          label: '未注册',
        }],
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
