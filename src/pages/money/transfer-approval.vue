/**
*  Created by   阿紫
*  On  2018/8/10
*  Content 转账审批
*/
<template>
  <div class='transfer-approval'>
    <el-form :inline="true"
             label-width="80px"
             ref="filterForm"
             :model="filterForm">
      <sac-select ref="tradeType" label="交易类型" v-model="filterForm.tradeType"
                  :dataList="transactionType"></sac-select>
      <sac-input ref="fromOrToUserPhone" label="用户账号" v-model.trim="filterForm.fromOrToUserPhone"></sac-input>
      <sac-submit-form
        @submitForm="submitForm(1)"
        @resetForm="resetForm"></sac-submit-form>
    </el-form>
    <sac-table :data="listData.list">
      <el-table-column prop="tradeId" label="序号"></el-table-column>
      <el-table-column prop="fromUserPhone" label="用户账号"></el-table-column>
      <el-table-column label="交易类型">
        <template slot-scope="scope">
          <span>{{scope.row.tradeType | convertTransactionType}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="coinName" label="交易币种"></el-table-column>
      <el-table-column prop="amount" label="转账金额"></el-table-column>
      <el-table-column prop="tradeTime" label="创建时间"></el-table-column>
      <el-table-column prop="alarmType" label="时间告警">
        <template slot-scope="scope">
          <span :class="{red: (scope.row.alarmType == '审核告警')}">{{ scope.row.alarmType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审批状态">
        <template slot-scope="scope">
          <span>审核中</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="success" size="small"
                     @click.native="auditTrade(scope.row.tradeId,'AUDIT_SUC')">审核通过
          </el-button>
          <el-button type="danger" size="small"
                     @click.native="auditTrade(scope.row.tradeId,'AUDIT_FAIL')">拒绝
          </el-button>
        </template>
      </el-table-column>
    </sac-table>
    <sac-pagination v-show="listData.list.length>0"
                    @handleChange="getPaginationChange"
                    :total="+listData.total"
                    :page-size="filterForm.pageSize"
                    :current-page="filterForm.pageNum">
    </sac-pagination>
    <el-dialog title="备注" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm" ref="dialogForm">
        <el-form-item prop="desc" :label="`${dialogForm.tradeStatus == 'AUDIT_SUC' ? '审核通过':'拒绝'}理由`">
          <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    v-model="dialogForm.sysRemark" maxlength="50"
                    placeHolder="请输入理由"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="auditSubmit('dialogForm')" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { transactionType } from '@/common/constants';

  export default {
    name: 'transfer-approval',
    data() {
      return {
        filterForm: {
          tradeType: '',
          tradeStatus: 2,
          fromOrToUserPhone: '',
          pageNum: 1,
          pageSize: 20
        },
        listData: {
          total: null,
          list: [],
        },
        transactionType,  // 交易类型
        dialogFormVisible: false,
        dialogForm: {
          sysRemark: '',
          tradeStatus: '',
          tradeId: '',
        }
      };
    },
    methods: {
      resetForm() {
        this.$refs.tradeType.reset();// 重置交易类型
        this.$refs.fromOrToUserPhone.reset(); // 重置用户账号
        this.$refs.filterForm.resetFields(); // 重置query的数据
        this.filterForm.pageNum = 1;
        this.getTradeList();
      },
      submitForm(num) {
        this.filterForm.pageNum = num;
        this.getTradeList();
      },
      getTradeList() {
        this.$http.post('wallet/backmgr/trade/getTradeList.do', this.filterForm)
          .then((res) => {
            const { list, total } = res.result.retMap ? res.result.retMap : res.result;
            this.listData.list = list;
            this.listData.total = total;
          });
      },
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        this.submitForm(currentPage);
      },
      auditTrade(tradeId, tradeStatus) {
        this.dialogFormVisible = true
        this.dialogForm.tradeId = tradeId;
        this.dialogForm.sysRemark = '';
        this.dialogForm.tradeStatus = tradeStatus;
        this.auditTradeData = {
          tradeId: tradeId,
          tradeStatus: tradeStatus
        }
      },
      auditSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) return;
          this.$http.post("wallet/backmgr/trade/auditTrade.do", this.dialogForm).then((res) => {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.dialogFormVisible = false;
            this.getTradeList();
          }).catch(() => {
            this.dialogFormVisible = false;
          })
        })
      },
    },
    activated() {
      this.getTradeList();
    }
  };
</script>
<style lang="less">
  .transfer-approval {
    .red {
      color: red;
    }
    .el-dialog__body {
      .el-form-item__content {
        width: 100%;
      }
    }
  }
</style>
