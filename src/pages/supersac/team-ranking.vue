/**
*  Created by   阿紫
*  On  2018/10/25
*  Content
*/
<template>
  <div class='team-ranking'>
    <el-col :span="22" style="text-align:right;">
      <el-button size="small" type="primary" @click="addBanner">创建团队</el-button>
    </el-col>
    <sac-table :data="list">
      <el-table-column prop="rank" label="团队排行"></el-table-column>
      <el-table-column prop="teamName" label="团队名称"></el-table-column>
      <el-table-column prop="totalAmount" label="总投票数"></el-table-column>
      <el-table-column prop="memberNum" label="总人数"></el-table-column>
      <el-table-column prop="scoreRate" label="得分占比 ">
        <template slot-scope="scope" prop="sysStatus">
          {{(scope.row.scoreRate*100).toFixed(2)}}%
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="primary" :disabled="!scope.row.id||scope.row.isOnShelf=='1'" size="small"
                     @click.native="modification(scope.row)">修改
          </el-button>
          <el-button type="danger" :disabled="!scope.row.id||scope.row.isOnShelf=='1'" size="small"
                     @click.native="remove(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="上架" width="100">
        <template slot-scope="scope" prop="isOnShelf">
          <el-switch v-if="scope.row.id" v-model="scope.row.isOnShelf" :inactive-value="0" :active-value="1"
                     @click.native="switchChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
    </sac-table>
    <el-dialog :title="dialogTitle" :visible.sync="isShowAddDialog">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="140px">
        <el-form-item label="团队名称:" prop="teamName">
          <el-input size="small" v-model="ruleForm.teamName" placeholder="请输入团队名称"></el-input>
        </el-form-item>
        <el-form-item label="总投票数:" prop="totalAmount">
          <el-input-number v-model="ruleForm.totalAmount" size="small"></el-input-number>
        </el-form-item>
        <el-form-item label="总人数:" prop="member">
          <el-input-number v-model="ruleForm.member" size="small"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100px" size="small" @click.native="determine">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: "team-ranking",
    data() {
      return {
        list: [],
        ruleForm: {
          teamName: "",
          totalAmount: "",
          member: "",
        },
        dialogTitle: '',
        rules: {
          teamName: [
            { required: true, message: '请输入团队名称', trigger: 'blur' },
          ],
          totalAmount: [
            { required: true, message: '请输入总投票数', trigger: 'blur' }
          ],
          member: [
            { required: true, message: '请输入总人数', trigger: 'blur' }
          ],
        },
        isShowAddDialog: false
      };
    },
    methods: {
      resetForm() {
        this.ruleForm = {
          teamName: "",
          totalAmount: "",
          member: "",
        };
        this.$refs.ruleForm && this.$refs.ruleForm.resetFields(); // 重置query的数据
      },
      getList() {
        this.$http.post("supernode/backmgr/mock/list", this.filterForm).then((res) => {
          this.list = res.result;
        })
      },
      // 删除
      remove(itemData) {
        console.log(itemData, 8888);
        const { id, teamName } = itemData;
        this.$confirm(`确定删除 ${teamName} 吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post("/supernode/backmgr/mock/delete", {
            id
          }).then((res) => {
            this.$notify({
              title: '成功',
              message: `删除 ${teamName}成功`,
              type: 'success'
            });
            this.getList();
          })
        })
      },
      // 上下架
      switchChange(itemData) {
        const { isOnShelf, id, teamName } = itemData;
        this.$http.post("/supernode/backmgr/mock/updateIsOnShelf", {
          isOnShelf: isOnShelf ? "1" : "0",
          id
        }).then((res) => {
          this.$notify({
            title: '成功',
            message: `${teamName} ${isOnShelf ? "上架" : "下架"} 成功`,
            type: 'success'
          });
          this.getList();
        })
      },
      addBanner() {
        this.resetForm();
        this.dialogTitle = '创建团队';
        this.isShowAddDialog = true;
      },
      modification(data) {
        this.resetForm();
        this.isShowAddDialog = true;
        this.ruleForm = JSON.parse(JSON.stringify(data));
        this.ruleForm.member = data.memberNum;
        this.dialogTitle = `修改 ${this.ruleForm.teamName} 的banner`;
      },
      determine() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (this.ruleForm.id) {
              const { id, teamName, totalAmount, member } = this.ruleForm;
              this.$http.post("/supernode/backmgr/mock/update", {
                id,
                teamName,
                totalAmount,
                member,
              }).then((res) => {
                this.resetForm();
                this.isShowAddDialog = false;
                this.$notify({
                  title: '成功',
                  message: `修改 ${teamName} 团队信息成功`,
                  type: 'success'
                });
                this.getList();
              })
            } else {
              this.$http.post("/supernode/backmgr/mock/create", this.ruleForm).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `创建 ${ this.ruleForm.teamName} 团队成功`,
                  type: 'success'
                });
                this.isShowAddDialog = false
                this.getList();
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    activated() {
      this.getList();
    }
  };
</script>
<style lang="less">
  .team-ranking {
    .el-input-number {
      width: 100%;
    }
  }
</style>
