<template>
  <div class='query-details'>
      <el-header>
        <div class="nav">用户管理>用户查询>查看用户详情</div>
        <!-- <el-button type="primary" @click="$router.go(-1)">返回</el-button> -->
      </el-header>
    <div class="content">
      <label>基本信息：</label>
      <el-row class="sac-row" :gutter="10">
        <el-col :span="12">
          <label>用户账号:</label>
          <span>{{detais.phone}}</span>
        </el-col>
        <el-col :span="12">
          <label>昵称：</label>
          <span>{{detais.nickName}}</span>
        </el-col>
        <el-col :span="12">
          <label>真实姓名：</label>
          <span>{{detais.realName}}</span>
        </el-col>
        <el-col :span="12">
          <label>身份证号：</label>
          <span>{{detais.cardNo}}</span>
        </el-col>
        <el-col :span="12">
          <label>广告商类型:</label>
          <span>{{ detais.isMerchant==1?' 广告商用户 ':'普通用户' }}</span>
        </el-col>
        <el-col :span="12">
          <label>注册时间：</label>
          <span>{{$fmtDate(detais.registTime, 'full') }}</span>
        </el-col>
        <el-col :span="12">
          <label>状态:</label>
          <span>{{detais.optStatus== 0?'正常':detais.optStatus== 1?'已锁定':'被冻结'}}</span>
        </el-col>
        <el-col :span="12">
          <label>锁定/冻结原因:</label>
          <span v-if="detais.optStatus!= 0">{{detais.optReason}}</span>
        </el-col>
        <el-col  :span="12" >
          <label>谷歌密钥:</label>
          <el-button v-if="detais.googleVerifyStatus == 1" size="small" type="danger" @click="deleteGoogle">删除</el-button>
          <span v-else>无</span>
        </el-col>
        <el-col :span="12">
          <label>最后登录时间:</label>
          <span>{{ $fmtDate(detais.lastLoginTime, 'full') }}</span>
        </el-col>
      </el-row>
      <label>资产概况：</label>
      <el-row class="sac-row" :gutter="10">
        <el-col :span="12">
          <label>资产总折合(CNY):</label>
          <span>{{Math.floor(totalToRMB*100)/100}}</span>
        </el-col>
        <el-col :span="12">
          <label>冻结资产折合（CNY）:</label>
          <span>{{Math.floor(totalFrozenToRMB*100)/100}}</span>
        </el-col>
        <el-col :span="12">
          <label>累计充币：</label>
          <span>{{totalRechargeToRMB}}</span>
        </el-col>
        <el-col :span="12">
          <label>累计提币（CNY）:</label>
          <span>{{totalWithdrawToRMB}}</span>
        </el-col>
        
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
    name: 'query-details',
    data() {
      return {
        detais: {},
        totalFrozenToRMB:'',
        totalRechargeToRMB:'',
        totalToRMB:'',
        totalWithdrawToRMB:'',
      };
	},
    methods: {
      getDetail(userId) {
        this.$http.post('wallet/backmgr/user/queryUserInfo', {
          userId:userId
        })
        .then((res) => {
          const { customerInfo, totalFrozenToRMB,totalRechargeToRMB,totalToRMB,totalWithdrawToRMB } = res.result;
          this.detais = customerInfo
          this.totalFrozenToRMB=totalFrozenToRMB
          this.totalRechargeToRMB=totalRechargeToRMB
          this.totalToRMB=totalToRMB
          this.totalWithdrawToRMB=totalWithdrawToRMB
        })
      },
      deleteGoogle(){
        this.$http.post('wallet/backmgr/user/deleteGoogleVerify', {
          userId:this.$route.query.userId
        }).then(res => {
          this.$notify.success({
						title: '提示',
						message: res.msg
          })
          this.getDetail(this.$route.query.userId);
        })
      }
    },
    activated() {
      this.getDetail(this.$route.query.userId);
	},
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
    .content{
      border: 1px solid #EBEEF5;
      box-sizing: border-box;
      padding: 20px;
      &>label{
        font-size: 18px;
        font-weight: 500;
      }
    }
  }
</style>
