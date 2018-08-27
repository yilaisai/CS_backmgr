/**
*  Created by   阿紫
*  On  2018/8/10
*  Content 活动管理
*/
<template>
  <div class='activity'>
    <el-col :span="22" style="text-align:right; margin-bottom: 30px;">
      <el-button size="small" type="primary" @click="addActivity">创建活动</el-button>
    </el-col>
    <sac-table :data="listData.list">
      <el-table-column prop="planName" label="活动名称"></el-table-column>
      <el-table-column label="认购时间">
        <template slot-scope="scope" prop="updateTime">
          {{scope.row.beginTime}} 至 {{scope.row.endTime}}
        </template>
      </el-table-column>
      <el-table-column prop="totalAmount" label="活动资金" width="100"></el-table-column>
      <el-table-column prop="limitTime" label="锁仓期限" width="100"></el-table-column>
      <el-table-column prop="yearIncome" label="年化收益" width="100">
        <template slot-scope="scope" prop="yearIncome">
          {{scope.row.yearIncome * 100}}%
        </template>
      </el-table-column>
      <el-table-column prop="buyMin" label="起购额度" width="100"></el-table-column>
      <el-table-column prop="buyMax" label="最大购买额度" width="120"></el-table-column>
      <el-table-column prop="description" label="活动详情"></el-table-column>
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
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" :inline="true" label-width="130px">
        <el-form-item label="活动名称:" prop="planName">
          <el-input v-model="ruleForm.planName" size="small" placeholder="请输入活动名称"></el-input>
        </el-form-item>
        <el-form-item label="认购时间:" prop="beginTime">
          <el-date-picker
            size="small"
            v-model="dateTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="getDateTime()"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动资金:" prop="totalAmount">
          <el-input placeholder="请输入活动资金" size="small" v-model="ruleForm.totalAmount">
            <template slot="append">SAC</template>
          </el-input>
        </el-form-item>
        <el-form-item label="锁仓期限:" prop="limitTime">
          <el-input placeholder="请输入锁仓期限" size="small" v-model="ruleForm.limitTime">
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
        <el-form-item label="年化收益:" prop="yearIncome">
          <el-input v-model="ruleForm.yearIncome" size="small" placeholder="请输入年化收益"></el-input>
        </el-form-item>
        <el-form-item label="起购额度:" prop="buyMin">
          <el-input placeholder="请输入起购额度" size="small" v-model="ruleForm.buyMin">
            <template slot="append">SAC</template>
          </el-input>
        </el-form-item>
        <el-form-item label="限购额度:" prop="buyMax">
          <el-input placeholder="请输入限购额度" size="small" v-model="ruleForm.buyMax">
            <template slot="append">SAC</template>
          </el-input>
        </el-form-item>
        <el-form-item label="活动详情:" prop="description">
          <el-input type="textarea" :rows="2" size="small" placeholder="请输入活动详情"
                    v-model="ruleForm.description"></el-input>
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
    name: 'activity',
    data() {
      const checkNum = (rule, value, callback) => {
        if (!/^[0-9]+.?[0-9]*$/.test(value)) {
          callback(new Error(rule.message));
        } else {
          callback();
        }
      };
      const checkYearIncome = (rule, value, callback) => {
        if (!/^[0-9]+.?[0-9]*$/.test(value)) {
          callback(new Error('年化收益必须为数字'));
        } else if (value > 9) {
          callback(new Error('年化收益值必须小于9'));
        } else if ((value + '').length > 5) {
          callback(new Error('年化收益值精确到毫'));
        } else {
          callback();
        }
      };
      const checkTotalAmount = (rule, value, callback) => {
        if (this.ruleForm.buyMin !== '') {
          this.$refs.ruleForm.validateField('buyMin');
        }
        callback();
      };
      const checkBuyMax = (rule, value, callback) => {
        if (value > this.ruleForm.totalAmount) {
          callback(new Error('活动资金必须大于限购额度'));
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
          planName: '',
          yearIncome: '',
          totalAmount: "",
          limitTime: '',
          description: '',
          beginTime: '',
          endTime: '',
          buyMax: '',
          buyMin: ''
        },
        dateTime: [],
        rules: {
          planName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          beginTime: [
            { required: true, message: '请选择认购时间', trigger: 'blur' }
          ],
          totalAmount: [
            { required: true, message: '请输入活动资金', trigger: 'blur' },
            { validator: checkNum, message: '活动资金必须为数字' },
            { validator: checkTotalAmount },
          ],
          limitTime: [
            { required: true, message: '请输入锁仓期限', trigger: 'blur' },
            { validator: checkNum, message: '锁仓期限必须为数字' }
          ],
          yearIncome: [
            { required: true, message: '请输入年化收益', trigger: 'blur' },
            { validator: checkYearIncome },
          ],
          buyMin: [
            { required: true, message: '请输入起购额度', trigger: 'blur' },
            { validator: checkNum, message: '起购额度必须为数字' }
          ],
          buyMax: [
            { required: true, message: '请输入限购额度', trigger: 'blur' },
            { validator: checkNum, message: '限购额度必须为数字' },
            { validator: checkBuyMax },
          ],
          description: [
            { required: true, message: '请输入活动详情', trigger: 'blur' }
          ],
        },
      };
    },
    methods: {
      resetForm() {
        this.ruleForm = {
          planName: '',
          yearIncome: '',
          totalAmount: "",
          limitTime: '',
          description: '',
          beginTime: '',
          endTime: '',
          buyMax: '',
          buyMin: ''
        };
        this.dateTime = [];
        this.$refs.ruleForm && this.$refs.ruleForm.resetFields(); // 重置query的数据
      },
      getPaginationChange(val, currentPage) {
        this.pageSize = val;
        this.pageNum = currentPage;
        this.getCoinPlanInfo();
      },
      getCoinPlanInfo() {
        const { pageNum, pageSize } = this;
        this.$http.post("wallet/backmgr/plan/getCoinPlanInfo.do", { pageNum, pageSize }).then((res) => {
          const { list, total } = res.result.list;
          this.listData.list = list;
          this.listData.total = total;
        })
      },
      // 上下架
      switchChange(itemData) {
        const { isOnshelf, id, planName } = itemData;
        this.$http.post("wallet/backmgr/plan/updateCoinPlanOnshelf.do", {
          isOnshelf: isOnshelf ? "YES" : "NO",
          planId: id
        }).then((res) => {
          this.$notify({
            title: '成功',
            message: `${planName} ${isOnshelf ? "上架" : "下架"} 成功`,
            type: 'success'
          });
          this.getCoinPlanInfo();
        })
      },
      // 删除
      remove(itemData) {
        const { id, planName, sysStatus } = itemData;
        this.$confirm(`确定删除 ${planName} 吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post("wallet/backmgr/plan/updateCoinPlanSysStatus.do", {
            sysStatus: sysStatus == 1 ? "INVALID0" : "VALID1",
            planId: id
          }).then((res) => {
            this.$notify({
              title: '成功',
              message: `删除 ${planName}成功`,
              type: 'success'
            });
            this.getCoinPlanInfo();
          })
        })
      },
      addActivity() {
        this.dialogTitle = '创建活动';
        this.resetForm();
        this.dialogFormVisible = true;
      },
      modification(data) {
        this.resetForm();
        this.dialogFormVisible = true;
        this.ruleForm = JSON.parse(JSON.stringify(data));
        this.dateTime = [this.ruleForm.beginTime, this.ruleForm.endTime];
        this.dialogTitle = `修改 ${this.ruleForm.appName} 活动`;
      },
      getDateTime() {
        this.ruleForm.beginTime = this.dateTime && this.dateTime[0];
        this.ruleForm.endTime = this.dateTime && this.dateTime[1];
      },
      determine() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (this.ruleForm.id) {
              this.ruleForm.planId = this.ruleForm.id;
              this.$http.post("wallet/backmgr/plan/updateCoinPlanInfo.do", this.ruleForm).then((res) => {
                this.dialogFormVisible = false;
                this.resetForm();
                this.$notify({
                  title: '成功',
                  message: `修改 ${ this.ruleForm.planName} 活动成功`,
                  type: 'success'
                });
                this.getCoinPlanInfo();
              })
            } else {
              this.$http.post("wallet/backmgr/plan/createCoinPlanInfo.do", this.ruleForm).then((res) => {
                this.dialogFormVisible = false;
                this.resetForm();
                this.$notify({
                  title: '成功',
                  message: `创建 ${ this.ruleForm.planName} 活动成功`,
                  type: 'success'
                });
                this.pageNum = 1;
                this.getCoinPlanInfo();
              })
            }
          }
        })
      },
    },
    activated() {
      this.getCoinPlanInfo();
    }
  };
</script>
<style lang="less">
  .activity {
    .el-dialog {
      width: 643px;
      .el-form--inline .el-form-item__content {
        width: 366px;
      }
    }
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
