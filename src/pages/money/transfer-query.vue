/**
*  Created by   阿紫
*  On  2018/8/10
*  Content 转账记录查询
*/
<template>
  <div class='transfer-query'>
    <el-form :inline="true"
             label-width="80px"
             ref="filterForm"
             :model="filterForm">
      <sac-coin ref="coinId" v-model="filterForm.coinId"></sac-coin>
      <sac-select ref="tradeType" label="交易类型" v-model="filterForm.tradeType"
                  :dataList="transactionType"></sac-select>
      <sac-select ref="alarmType" label="告警情况" multiple v-model="alarmType"
                  :dataList="alarmConditionType"></sac-select>
      <sac-select ref="tradeStatus" label="状　　态" v-model="filterForm.tradeStatus"
                  :dataList="transferQueryStatus"></sac-select>
      <sac-input ref="fromOrToUserPhone" label="用户账号" v-model.trim="filterForm.fromOrToUserPhone"></sac-input>
      <sac-date ref="selectedDate" label="日　　期" v-model="selectedDate"></sac-date>
      <sac-input ref="thirdOrderNo" label="txid" v-model.trim="filterForm.thirdOrderNo"></sac-input>
      <sac-submit-form
        @submitForm="submitForm(1)"
        :isReset="false"></sac-submit-form>
    </el-form>
    <sac-table :data="listData.list">
      <el-table-column prop="tradeId" label="序号" min-width="163" fixed="left"></el-table-column>
      <el-table-column label="收款方" min-width="123">
        <template slot-scope="scope">
          <span v-if="scope.row.toUserPhone">{{scope.row.toUserPhone}}</span>
          <span v-else>{{scope.row.targetCoinAddr}}</span>
        </template>
      </el-table-column>
      <el-table-column label="付款方" min-width="123">
        <template slot-scope="scope">
          <span v-if="scope.row.fromUserPhone">{{scope.row.fromUserPhone}}</span>
          <span v-else>{{scope.row.fromAddr}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="coinName" label="币种" min-width="60"></el-table-column>
      <el-table-column prop="tradeType" label="交易类型" min-width="80">
        <template slot-scope="scope">
          <span>{{scope.row.tradeType | convertTransactionType}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="转账金额" min-width="150"></el-table-column>
      <el-table-column prop="thirdOrderNo" label="txid" min-width="150"></el-table-column>
      <el-table-column prop="confirmTime" label="到账时间" min-width="153"></el-table-column>
      <div v-if="isShowPayTime">
        <el-table-column prop="payTime" label="上链时间" min-width="153"></el-table-column>
      </div>
      <el-table-column prop="alarmType" label="时间告警" min-width="80">
        <template slot-scope="scope">
          <span style="color: red;">{{ scope.row.alarmType }}</span>
        </template>
      </el-table-column>
      <!--解决乱序问题-->
      <el-table-column label="" width="0">
      </el-table-column>
      <div v-show="isShowTableCol" key="isShowTableCol">
        <el-table-column prop="tradeTime" label="创建时间" min-width="153"></el-table-column>
        <el-table-column prop="auditTime" label="审核时间" min-width="153"></el-table-column>
        <el-table-column prop="sysRemark" label="备注" min-width="150"></el-table-column>
      </div>
      <div v-show="isShowHandle" key="isShowHandle">
        <el-table-column label="操作" min-width="150" fixed="right">
          <template slot-scope="scope" prop="tradeStatus">
            <el-button type="danger" :disabled="scope.row.tradeStatus != 4 || scope.row.tradeType != 'csend'"
                       size="small" @click.native="transferRecordHandle(scope.row.tradeId, 4)">打币
            </el-button>
            <el-button type="primary" :disabled="scope.row.tradeStatus != 4 || scope.row.tradeType != 'csend'"
                       size="small" @click.native="transferRecordHandle(scope.row.tradeId, 3)">取消
            </el-button>
          </template>
        </el-table-column>
      </div>
      <el-table-column label="状态" min-width="110" fixed="right">
        <template slot-scope="scope">
          <el-tag v-if='scope.row.tradeStatus === 0' type="info">失败</el-tag>
          <el-tag v-if='scope.row.tradeStatus === 1' type="success">成功</el-tag>
          <el-tag v-if='scope.row.tradeStatus === 2'>待审核</el-tag>
          <el-tag v-if='scope.row.tradeStatus === 3' type="warning">审核不通过</el-tag>
          <el-tag v-if='scope.row.tradeStatus === 4' type="danger">审核通过</el-tag>
          <el-tag v-if='scope.row.tradeStatus === 5'>处理中</el-tag>
          <el-tag v-if='scope.row.tradeStatus === 7'>已发送</el-tag>
        </template>
      </el-table-column>

    </sac-table>
    <sac-pagination v-show="listData.list.length>0"
                    @handleChange="getPaginationChange"
                    :total="+listData.total"
                    :page-size="filterForm.pageSize"
                    :current-page="filterForm.pageNum">
    </sac-pagination>
  </div>
</template>
<script>
  import { transactionType, alarmConditionType, transferQueryStatus } from '@/common/constants';

  export default {
    name: 'transfer-query',
    data() {
      return {
        alarmType: [],
        filterForm: {
          coinId: '',
          tradeType: '',
          alarmType: '',
          tradeStatus: '',
          thirdOrderNo: '',
          fromOrToUserPhone: '',
          startDate: '',
          endDate: '',
          pageNum: 1,
          pageSize: 20
        },
        listData: {
          total: null,
          list: [],
        },
        selectedDate: [], //已选日期
        transactionType,  // 交易类型
        alarmConditionType,  //  告警情况
        transferQueryStatus,  //  告警情况
        isShowPayTime: true,
        isShowTableCol: true,
        isShowHandle: true,
      };
    },
    methods: {
      // resetForm() {
      //   this.alarmType = [];
      //   this.$refs.coinId.reset(); // 重置币种
      //   this.$refs.tradeType.reset();// 重置交易类型
      //   this.$refs.alarmType.reset(); // 重置告警情况
      //   this.$refs.tradeStatus.reset(); // 重置状　　态
      //   this.$refs.fromOrToUserPhone.reset(); // 重置用户账号
      //   this.$refs.selectedDate.reset(); // 重置日期
      //   this.$refs.filterForm.resetFields(); // 重置query的数据
      //   this.filterForm.pageNum = 1;
      //   this.getTradeList();
      // },
      submitForm(num) {
        this.filterForm.pageNum = num;
        const { tradeType, tradeStatus } = this.filterForm;
        // 链上转入
        if (tradeType == 'creceive') {
          this.isShowTableCol = false;
        } else {
          this.isShowTableCol = true;
        }
        // 审核通过
        if (tradeStatus === '4' || tradeType === 'csend' || tradeType === '' && tradeStatus === '') {
          this.isShowHandle = true;
        } else {
          this.isShowHandle = false;
        }
        // 个人互转
        if (tradeType == 'inner') {
          this.isShowTableCol = false;
          this.isShowPayTime = false;
        } else {
          this.isShowPayTime = true;
          this.isShowTableCol = true;
        }
        this.getTradeList();
      },
      getTradeList() {
        this.filterForm.startDate = this.selectedDate && this.selectedDate[0];
        this.filterForm.endDate = this.selectedDate && this.selectedDate[1];
        this.filterForm.alarmType = this.alarmType.join(',');
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
      transferRecordHandle(recdId, recdStatus) {
        const msg = recdStatus == 3 ? '取消操作：' : '打币操作：';
        this.$http.post('wallet/backmgr/trade/operateTransferOutCoin.do', {
          recdId,
          recdStatus
        })
          .then((res) => {
            this.$message({
              message: `${msg}${res.msg}`,
              type: 'success'
            });
            const self = this;
            setTimeout(() => {
              self.onSubmit();
            }, 1000);
          });
      },
    },
    activated() {
      this.getTradeList();
    }
  };
</script>
<style lang="less">
  .transfer-query {
  }
</style>
