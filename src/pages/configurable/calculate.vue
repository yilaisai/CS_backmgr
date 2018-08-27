/**
*  Created by   阿紫
*  On  2018/8/10
*  Content 算力规则
*/
<template>
  <div class='calculate'>
    <el-col :span="22" style="text-align:right; margin-bottom:30px;">
      <el-button size="small" type="primary" @click="addCalculate">创建算力</el-button>
    </el-col>
    <sac-table :data="listData.list">
      <el-table-column prop="minAmount" label="持币数量" :formatter="formatSex"></el-table-column>
      <el-table-column prop="powerValue" label="初始算力"></el-table-column>
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
        <el-form-item label="初始算力:" prop="powerValue">
          <el-input size="small" v-model="ruleForm.powerValue" placeholder="请输入数额"></el-input>
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
    name: 'calculate',
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
          powerValue: '',
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
          powerValue: [
            { required: true, message: '请输入初始算力', trigger: 'blur' },
            { validator: checkNum, message: '初始算力必须为数字' }
          ]
        }
      };
    },
    methods: {
      resetForm() {
        this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
      },
      getPaginationChange(val, currentPage) {
        this.pageSize = val;
        this.pageNum = currentPage;
        this.getComputePowerRule();
      },
      formatSex: function (row, column) {
        return `>=${row.minAmount}  <=${row.maxAmount}`
      },
      getComputePowerRule() {
        const { pageNum, pageSize } = this;
        this.$http.post("wallet/backmgr/computePower/getComputePowerRule.do", { pageNum, pageSize }).then((res) => {
          const { list, total } = res.result.list;
          this.listData.list = list;
          this.listData.total = total;
        })
      },
      // 上下架
      switchChange(itemData) {
        const { isOnshelf, id } = itemData;
        this.$http.post("wallet/backmgr/computePower/updateComputePowerRuleIsOnShelf.do", {
          isOnShelf: isOnshelf ? "YES" : "NO",
          id
        }).then((res) => {
          this.$notify({
            title: '成功',
            message: `${isOnshelf ? "上架" : "下架"} 成功`,
            type: 'success'
          });
          this.getComputePowerRule();
        })
      },
      // 删除
      remove(itemData) {
        const { id, minAmount } = itemData;
        this.$confirm(`确定删除吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post("wallet/backmgr/computePower/updateComputePowerRuleStatus.do", {
            status: "INVALID0",
            id
          }).then((res) => {
            this.$notify({
              title: '成功',
              message: `删除成功`,
              type: 'success'
            });
            this.getComputePowerRule();
          })
        })
      },
      addCalculate() {
        this.dialogTitle = '创建算力规则';
        this.dialogFormVisible = true;
        this.resetForm();
      },
      modification(itemData) {
        this.dialogTitle = '修改算力规则';
        this.dialogFormVisible = true;
        this.resetForm();
        this.ruleForm = JSON.parse(JSON.stringify(itemData));
      },
      determine() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            console.log(this.ruleForm, 99);
            if(this.ruleForm.id){
              this.$http.post("wallet/backmgr/computePower/updateComputePowerRule.do", this.ruleForm).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `修改成功`,
                  type: 'success'
                });
                this.dialogFormVisible = false;
                this.getComputePowerRule();
              })
            } else {
              this.$http.post("wallet/backmgr/computePower/createComputePowerRule.do", this.ruleForm).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `创建成功`,
                  type: 'success'
                });
                this.dialogFormVisible = false;
                this.getComputePowerRule();
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
      this.getComputePowerRule();
    }
  };
</script>
<style lang="less">
  .calculate {
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
