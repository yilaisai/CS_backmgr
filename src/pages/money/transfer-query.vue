/**
*  Created by   阿紫
*  On  2018/8/10
*  Content 转账记录查询
*/
<template>
  <div class='transfer-query'>
    <el-form :inline="true"
             label-width="80px"
             ref="filterForm">
      <div class="sac-collapse">
        <div class="title">
          <sac-coin ref="coinId" v-model="filterForm.coinId"></sac-coin>
          <sac-select ref="tradeType" label="交易类型" v-model="filterForm.tradeType"
                      :dataList="transactionType"></sac-select>
          <sac-select ref="tradeStatus" label="状　　态" v-model="filterForm.tradeStatus"
                      :dataList="transferQueryStatus"></sac-select>
          <sac-submit-form
            @submitForm="submitForm(1)"
            :isReset="false"></sac-submit-form>
          <el-button type="primary" @click="exportExcel" size="small">导出Excel</el-button> 
          <span @click="changeContent" class="changeContent">
            {{isContent?'合并':'展开'}}
             <i :class="{'el-icon-arrow-right':!isContent,'el-icon-arrow-down':isContent}"></i>
          </span>
        </div>
        <div class="content" :class="{'is-active2': isContent&isActive,'is-active1': isContent&!isActive}">
          <sac-input ref="fromOrToUserPhone" label="用户账号" v-model.trim="filterForm.fromOrToUserPhone"></sac-input>
          <el-form-item ref="selectedDate" label="日　　期" class="sac-date">
            <el-date-picker
              v-model="selectedDate"
              :editable="false"
              type="datetimerange"
              align="center"
              size="small"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
          <sac-input ref="thirdOrderNo" label="txid" v-model.trim="filterForm.thirdOrderNo"
                     class="thirdOrderNo"></sac-input>
          <sac-input ref="toAddr" label="交易地址" v-model.trim="filterForm.toAddr" class="toAddr"></sac-input>
          <sac-select ref="alarmType" label="告警情况" multiple v-model="alarmType"
                      :dataList="alarmConditionType" class="alarmType"></sac-select>
        </div>
      </div>
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
          <el-tag v-if='scope.row.tradeStatus === 6'>已支付</el-tag>
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
  import { dateFormat } from '@/common/util';

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
          toAddr: '',
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
        isContent: false,
        isActive: false,
      };
    },
    methods: {
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
      exportExcel() {
        let param = '';
        for(let v in this.filterForm) {
          param += v + '=' + this.filterForm[v] + '&';
        }
        location.href = SERVER_PATH + 'wallet/backmgr/trade/downTradeList.do?' + param + 'token=' + localStorage.getItem('wallet_token');
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
      changeContent() {
        this.isContent = !this.isContent;
        if (this.isContent) {
          this.isActive = window.outerWidth > 1584 ? true : false;
        }
      }
    },
    activated() {
      const end = dateFormat(new Date, 'YYYY-MM-DD HH:mm:ss');
      const start = dateFormat(new Date().getTime() - 3600 * 1000 * 24 * 7, 'YYYY-MM-DD HH:mm:ss');
      this.selectedDate = [start, end];
      this.getTradeList();
    }
  };
</script>
<style lang="less">
  .transfer-query {
    .el-collapse {
      border-top: none;
      border-bottom: none;
    }
    .el-collapse-item__wrap {
      border-bottom: none;
    }
    .el-collapse-item__header {
      border-bottom: none;
    }
    .el-form-item {
      margin-bottom: 3px;
    }
    .el-collapse-item__header {
      line-height: 40px;
    }
    .changeContent {
      font-size: 14px;
      color: red;
      display: inline-block;
      line-height: 40px;
    }
    .content {
      height: 0;
      overflow: hidden;
      transition: all 0.5s;
    }
    .is-active1 {
      height: 80px;
    }
    .is-active2 {
      height: 40px;
    }
    .sac-date {
      .el-form-item__content {
        width: 365px!important;
      }
    }
  }
</style>
