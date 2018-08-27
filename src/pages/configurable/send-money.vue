/**
*  Created by   阿紫
*  On  2018/8/10
*  Content 送币规则
*/
<template>
  <div class='send-money'>
    <el-col :span="22" style="text-align:right; margin-bottom:30px;">
      <el-button size="small" type="primary" @click="addSend">创建送币规则</el-button>
    </el-col>
    <sac-table :data="listData.list">
      <el-table-column prop="minAmount" label="持币数量" :formatter="formatSex"></el-table-column>
      <el-table-column prop="amount" label="送币数量"></el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="success" :disabled="scope.row.isOnshelf != 0" size="small"
                     @click.native="modification(scope.row)">修改
          </el-button>
          <el-button type="danger" :disabled="scope.row.isOnshelf != 0" size="small" @click.native="remove(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="上架" width="100">
        <template slot-scope="scope" prop="isOnshelf">
          <el-switch v-model="scope.row.isOnshelf" :inactive-value="0" :active-value="1"
                     @click.native="switchChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
    </sac-table>
    <sac-pagination v-show="listData.list.length>0"
                    @handleChange="getPaginationChange"
                    :total="+listData.total"
                    :page-size="pageSize"
                    :current-page="pageNum">
    </sac-pagination>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="130px">
        <el-form-item label="持币数量:" required>
          <el-col :span="11">
            <el-form-item prop="minAmount">
              <span class="input-before-lable1">大于等于</span>
              <el-input style="width:130px" v-model="ruleForm.minAmount" clearable size="small" placeholder="请输入数额"
                        class="min-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item prop="maxAmount">
              <span class="input-before-lable">小于等于</span>
              <el-input style="width:130px" v-model="ruleForm.maxAmount" clearable size="small" placeholder="请输入数额"
                        class="min-input"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="送币数量:" prop="amount">
          <el-input size="small" v-model="ruleForm.amount" placeholder="请输入数额"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="determine" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'send-money',
    data() {
      const checkNum = (rule, value, callback) => {
        if (!/^[0-9]+.?[0-9]*$/.test(value)) {
          callback(new Error(rule.message));
        } else {
          callback();
        }
      };
      return {
        pageNum: 1,
        pageSize: 20,
        listData: {
          total: null,
          list: [],
        },
        dialogTitle: '',
        dialogFormVisible: false,
        ruleForm: {
          minAmount: '',
          maxAmount: '',
          amount: '',
        },
        rules: {
          minAmount: [
            { required: true, message: '请输入数额', trigger: 'blur' },
            { validator: checkNum, message: '大于等于必须为数字' }
          ],
          maxAmount: [
            { required: true, message: '请输入数额', trigger: 'blur' },
            { validator: checkNum, message: '小于等于必须为数字' }
          ],
          amount: [
            { required: true, message: '请输入送币数量', trigger: 'blur' },
            { validator: checkNum, message: '送币数量必须为数字' }
          ]
        }
      };
    },
    methods: {
      resetForm() {
        this.ruleForm = {
          minAmount: '',
          maxAmount: '',
          amount: ''
        };
        this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
      },
      getPaginationChange(val, currentPage) {
        this.pageSize = val;
        this.pageNum = currentPage;
        this.getRegistInviteRule();
      },
      formatSex: function (row, column) {
        return `>=${row.minAmount}  <=${row.maxAmount}`
      },
      getRegistInviteRule() {
        const { pageNum, pageSize } = this;
        this.$http.post("wallet/backmgr/registInviteRule/getRegistInviteRule.do", { pageNum, pageSize }).then((res) => {
          const { list, total } = res.result.list;
          this.listData.list = list;
          this.listData.total = total;
        })
      },
      // 上下架
      switchChange(itemData) {
        const { isOnshelf, id } = itemData;
        this.$http.post("wallet/backmgr/registInviteRule/updateRegistInviteRuleIsOnShelf.do", {
          isOnShelf: isOnshelf ? "YES" : "NO",
          id
        }).then((res) => {
          this.$notify({
            title: '成功',
            message: `${isOnshelf ? "上架" : "下架"} 成功`,
            type: 'success'
          });
          this.getRegistInviteRule();
        })
      },
      // 删除
      remove(itemData) {
        const { id } = itemData;
        this.$confirm(`确定删除吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post("wallet/backmgr/registInviteRule/updateRegistInviteRuleStatue.do", {
            sysStatus: "INVALID0",
            id
          }).then((res) => {
            this.$notify({
              title: '成功',
              message: `删除成功`,
              type: 'success'
            });
            this.getRegistInviteRule();
          })
        })
      },
      addSend() {
        this.dialogTitle = '创建送币规则';
        this.dialogFormVisible = true;
        this.resetForm();
      },
      modification(itemData) {
        this.dialogTitle = '修改送币规则';
        this.dialogFormVisible = true;
        this.resetForm();
        this.ruleForm = JSON.parse(JSON.stringify(itemData));
      },
      determine() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if(this.ruleForm.id){
              this.$http.post("wallet/backmgr/registInviteRule/updatecreateRegistInviteRule.do", this.ruleForm).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `修改成功`,
                  type: 'success'
                });
                this.dialogFormVisible = false;
                this.getRegistInviteRule();
              })
            } else {
              this.$http.post("wallet/backmgr/registInviteRule/createRegistInviteRule.do", this.ruleForm).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `创建成功`,
                  type: 'success'
                });
                this.dialogFormVisible = false;
                this.getRegistInviteRule();
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    activated() {
      this.getRegistInviteRule();
    }
  };
</script>
<style lang="less">
  .send-money {
    .el-dialog {
      width: 700px;
    }
    .input-before-lable1 {
      color: #606266;
      margin-left: 10px;
    }
    .input-before-lable {
      color: #606266;
      margin-left: 30px;
    }
  }
</style>
