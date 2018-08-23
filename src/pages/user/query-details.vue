/**
*  Created by   阿紫
*  On  2018/8/12
*  Content
*/
<template>
  <div class='query-details'>
    <el-row class="sac-row">
      <el-col :span="4">
        <el-button size="small" type="primary" plain @click="$router.go(-1)">返回</el-button>
      </el-col>
      <el-col :span="18" style="text-align:right">
        <el-button size="small" v-show="this.optStatus== 2" type="danger" @click="optStatusChange(0,'解冻账号')">解冻账号
        </el-button>
        <el-button size="small" v-show="this.optStatus== 1" type="warning" @click="optStatusChange(0,'解锁账号')">解锁账号
        </el-button>
        <el-button size="small" v-show="this.optStatus== 0" type="danger" @click="optStatusChange(2,'冻结账号')">冻结账号
        </el-button>
        <el-button size="small" v-show="this.optStatus== 0" type="warning" @click="optStatusChange(1,'锁定账号')">锁定账号
        </el-button>
      </el-col>
    </el-row>
    <el-row class="sac-row" :gutter="10">
      <el-col :span="8">
        <label>用户账号:</label>
        <span>{{detais.phone}}</span>
      </el-col>
      <el-col :span="8">
        <label>姓名：</label>
        <span>{{detais.realName}}</span>
      </el-col>
      <el-col :span="8">
        <label>昵称：</label>
        <span>{{detais.nickName}}</span>
      </el-col>
      <el-col :span="8">
        <label>系统ID:</label>
        <span>{{detais.userId}}</span>
      </el-col>
      <el-col :span="8">
        <label>身份证号：</label>
        <span>{{detais.cardNo}}</span>
      </el-col>
      <el-col :span="8">
        <label>注册时间：</label>
        <span>{{detais.registTime}}</span>
      </el-col>
      <el-col :span="8">
        <label>最后登录时间:</label>
        <span>{{detais.lastLoginTime}}</span>
      </el-col>
      <el-col :span="8">
        <label>最后登录IP地址：</label>
        <span>{{detais.cardNo}}</span>
      </el-col>
    </el-row>
    <label>持币信息：</label>
    <sac-table :data="tableData">
      <el-table-column prop="coinName" label="持币名称" width="120"></el-table-column>
      <el-table-column prop="amount" label="持币量"></el-table-column>
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
    name: 'query-details',
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
