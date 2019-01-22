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
        <label>注册IP:</label>
        <span>{{detais.registerIp}}</span>
      </el-col>
      <el-col :span="8">
        <label>锁定原因:</label>
        <span>{{detais.optReason}}</span>
      </el-col>
      <!--FIXME 后端暂时没有返回-->
      <!--<el-col :span="8">-->
      <!--<label>最后登录IP地址：</label>-->
      <!--<span>{{detais.cardNo}}</span>-->
      <!--</el-col>-->
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
      }
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
