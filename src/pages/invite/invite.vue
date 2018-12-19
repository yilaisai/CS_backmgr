/**
*  Created by   阿紫
*  On  2018/8/23
*  Content
*/
<template>
  <div class='invite'>
    <el-form :inline="true"
             label-width="90px"
             ref="filterForm"
             :rules="rules"
             :model="filterForm">
      <sac-input
        ref="phone"
        label="用户账户"
        v-model.trim="filterForm.phone"
        prop="phone"></sac-input>
      <el-form-item label="日　　期:" class="sac-time">
        <el-date-picker
          size="small"
          v-model="dateTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <sac-submit-form
        :isReset='false'
        @submitForm="submitForm()"></sac-submit-form>
    </el-form>
    <el-tabs v-model="activeName2" type="border-card">
      <el-tab-pane label="邀请成功的1级好友" name="first">
        <el-table height="100%" :data="firstList" border size="small">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column prop="phone" label="好友账户"></el-table-column>
          <el-table-column label="实名状态">
            <template slot-scope="scope">
              <span v-show="scope.row.moneyAudit == -1">未申请</span>
              <span v-show="scope.row.moneyAudit == 0">不通过</span>
              <span v-show="scope.row.moneyAudit == 1">通过</span>
              <span v-show="scope.row.moneyAudit == 2">审核中</span>
            </template>
          </el-table-column>
          <el-table-column prop="registTime" label="注册时间"></el-table-column>
          <el-table-column prop="inviteGiveAmount" label="邀请收益"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="邀请成功的2级好友" name="second">
        <el-table height="100%" :data="secondList" border size="small">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column prop="phone" label="好友账户"></el-table-column>
          <el-table-column label="实名状态">
            <template slot-scope="scope">
              <span v-show="scope.row.moneyAudit == -1">未申请</span>
              <span v-show="scope.row.moneyAudit == 0">不通过</span>
              <span v-show="scope.row.moneyAudit == 1">通过</span>
              <span v-show="scope.row.moneyAudit == 2">审核中</span>
            </template>
          </el-table-column>
          <el-table-column prop="registTime" label="注册时间"></el-table-column>
          <el-table-column prop="inviteGiveAmount" label="邀请收益"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>
<script>
  export default {
    name: "invite",
    data() {
      return {
        activeName2: 'first',
        dateTime: [],
        rules: {
          phone: [
            { required: true, message: '请输入用户账户', trigger: 'blur' },
          ]
        },
        filterForm: {
          phone: '',
          updateStartTime: '',
          updateEndTime: '',
        },
        firstList: [],
        secondList: [],
      };
    },
    methods: {
      getUserInviteReward() {
        this.filterForm.updateStartTime = this.dateTime[0];
        this.filterForm.updateEndTime = this.dateTime[1];
        this.$http.post("wallet/backmgr/registInviteRecd/getUserInviteReward.do", this.filterForm).then((res) => {
          const { firstList, secondList } = res.result;
          this.firstList = firstList;
          this.secondList = secondList;
        })
      },
      submitForm() {
        this.$refs.filterForm.validate((valid) => {
          if (valid) {
            this.getUserInviteReward();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
  };
</script>
<style lang="less">
  .invite {
    .sac-time {
         width: 366px;
      .el-form-item__content {
     
      }
    }
    .el-date-editor {
      width: 366px;
    }
    .el-tabs--border-card{
      height:80%
    }
    .el-tab-pane{
      height:calc(100% - 70px)
    }
    .el-tabs--border-card>.el-tabs__content{
      height:100% !important
    }
  }
</style>
