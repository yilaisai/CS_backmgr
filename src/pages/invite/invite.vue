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

    <span>邀请成功的1级好友</span>
    <el-table height="50%" :data="firstList" border size="small">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column prop="phone" label="好友账户"></el-table-column>
      <el-table-column prop="registTime" label="注册时间"></el-table-column>
      <el-table-column prop="inviteGiveAmount" label="邀请收益"></el-table-column>
    </el-table>
    <span style="margin-top: 20px;">邀请成功的2级好友</span>
    <el-table height="50%" :data="secondList" border size="small">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column prop="phone" label="好友账户"></el-table-column>
      <el-table-column prop="registTime" label="注册时间"></el-table-column>
      <el-table-column prop="inviteGiveAmount" label="邀请收益"></el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    name: "invite",
    data() {
      return {
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
      .el-form-item__content {
        width: 366px;
      }
    }
    .el-date-editor {
      width: 366px;
    }
  }
</style>
