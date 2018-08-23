/**
*  Created by   阿紫
*  On  2018/8/19
*  Content
*/
<template>
  <div class='application-details'>
    <el-row style="margin-bottom: 20px;">
      <el-col :span="4">
        <el-button size="small" type="primary" plain @click="$router.go(-1)">返回</el-button>
      </el-col>
      <el-col :span="16" style="text-align:center;">
        <span>应用名：{{appName}}</span>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
    <template v-if="details==1">
      <el-radio-group v-model="recdStatus" size="small" @change="getThirdAppTradeForSac"
                      style="margin-bottom: 30px; text-align:center;">
        <el-radio-button label="AUDITING">待审批</el-radio-button>
        <el-radio-button label="PROCESSING">已审批</el-radio-button>
      </el-radio-group>
      <sac-table :data="listData.list">
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="phone" label="用户名"></el-table-column>
        <el-table-column prop="coinName" label="兑换币种"></el-table-column>
        <el-table-column prop="amount" label="申请兑换金额"></el-table-column>
        <el-table-column prop="recdTime" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="180" v-if="recdStatus === 'AUDITING'">
          <template slot-scope="scope" prop="sysStatus">
            <el-button type="success" size="small" @click.native="auditTrade(scope.row, 4)">通过</el-button>
            <el-button type="danger" size="small" @click.native="auditTrade(scope.row, 3)">拒绝</el-button>
          </template>
        </el-table-column>
      </sac-table>
      <sac-pagination v-show="listData.list.length>0"
                      @handleChange="getPaginationChange"
                      :total="+listData.total"
                      :page-size="pageSize"
                      :current-page="pageNum">
      </sac-pagination>
    </template>
    <template v-if="details==2">
      <el-form :inline="true"
               label-width="130px"
               ref="filterForm"
               :model="filterForm">
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
        <sac-input
          ref="phone"
          label="户名"
          v-model.trim="filterForm.phone"
          prop="phone"></sac-input>
        <sac-submit-form
          :isReset='false'
          @submitForm="submitForm(1)"></sac-submit-form>
      </el-form>
      <sac-table :data="listData.list">
        <el-table-column prop="recdTime" label="日期"></el-table-column>
        <el-table-column prop="phone" label="用户名"></el-table-column>
        <el-table-column prop="amount" label="兑换金额"></el-table-column>
      </sac-table>
      <sac-pagination v-show="listData.list.length>0"
                      @handleChange="getPaginationChange"
                      :total="+listData.total"
                      :page-size="pageSize"
                      :current-page="pageNum">
      </sac-pagination>
    </template>
    <template v-if="details==3">
      <el-form :inline="true"
               label-width="130px"
               ref="filterForm"
               :model="filterForm">
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
          @submitForm="submitForm(1)"></sac-submit-form>
      </el-form>
      <sac-table :data="listData.list">
        <el-table-column prop="dayTime" label="日期"></el-table-column>
        <el-table-column prop="transferOutAmount" label="转出金额"></el-table-column>
        <el-table-column prop="transferInAmount" label="转入金额"></el-table-column>
      </sac-table>
      <sac-pagination v-show="listData.list.length>0"
                      @handleChange="getPaginationChange"
                      :total="+listData.total"
                      :page-size="pageSize"
                      :current-page="pageNum">
      </sac-pagination>
    </template>
  </div>
</template>
<script>
  export default {
    name: "application-details",
    data() {
      return {
        listData: {
          total: null,
          list: [],
        },
        pageNum: 1,
        pageSize: 20,
        recdStatus: "AUDITING",
        appId: '',
        appName: '',
        details: '',
        filterForm: {
          phone: '',
          startDate: '',
          beginTime: '',
          endDate: '',
          endTime: '',
        },
        dateTime: [],
      };
    },
    methods: {
      submitForm(num) {
        this.pageNum = num;
        if (this.details == 2) {
          this.getThirdAppTradeRecds();
        }
        if (this.details == 3) {
          this.getThirdAppStats();
        }
      },
      getPaginationChange(val, currentPage) {
        this.pageSize = val;
        this.submitForm(currentPage);
      },
      getThirdAppTradeForSac() {
        const { recdStatus, appId, pageSize, pageNum } = this;
        this.$http.post("wallet/backmgr/thirdAppInfo/getThirdAppTradeForSac.do", {
          recdStatus,
          appId,
          pageSize,
          pageNum,
        }).then((res) => {
          this.listData = res.result.list
        })
      },
      auditTrade(itemData, tradeStatus) {
        const { tradeId, phone } = itemData;
        this.$confirm(`确定${tradeStatus == 3 ? "拒绝" : "通过"} ${phone}的审批吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post("wallet/backmgr/trade/auditTrade.do", {
            tradeId,
            tradeStatus
          }).then((res) => {
            this.$notify({
              title: '成功',
              message: `已${tradeStatus == 3 ? "拒绝" : "通过"} 审批`,
              type: 'success'
            });
            this.getThirdAppTradeForSac();
          })
        });
      },
      getThirdAppTradeRecds() {
        this.filterForm.startDate = this.dateTime && this.dateTime[0];
        this.filterForm.endDate = this.dateTime && this.dateTime[1];
        const { appId, pageNum, pageSize } = this;
        this.$http.post("wallet/backmgr/thirdAppInfo/getThirdAppTradeRecds.do", {
          appid: appId,
          pageNum,
          pageSize,
          ...this.filterForm
        }).then((res) => {
          this.listData = res.result.list
        })
      },
      getThirdAppStats() {
        this.filterForm.beginTime = this.dateTime && this.dateTime[0];
        this.filterForm.endTime = this.dateTime && this.dateTime[1];
        const { appId, pageNum, pageSize } = this;
        this.$http.post("wallet/backmgr/thirdAppInfo/getThirdAppStats.do", {
          appid: appId,
          pageNum,
          pageSize,
          ...this.filterForm
        }).then((res) => {
          this.listData = res.result.list
        })
      }
    },
    activated() {
      const { details, appId, appName } = this.$route.params;
      if (appId) {
        this.appId = appId;
        this.appName = appId;
        this.details = details;
        if (details == 1) {
          this.getThirdAppTradeForSac();
        } else if (details == 2) {
          this.getThirdAppTradeRecds();
        } else {
          this.getThirdAppStats();
        }
      } else {
        this.$router.go(-1)
      }
    }
  };
</script>
<style lang="less">
  .application-details {
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
