<template>
  <div class='transfer-approval'>
    <el-col :span="24" class="subsidiary" v-if="isShowDetail">
      <el-button
        size="small" type="primary" plain
        @click="$router.go(-1)">返回
      </el-button>
      <span class="capital">{{this.$route.params.phone}}的资金明细</span>
    </el-col>
    <el-form :inline="true"
             label-width="80px"
             ref="filterForm"
             :model="filterForm">
      <sac-select ref="coinId" label="币　　种" placeholder="请选择币种" v-model="filterForm.coinId"
                  :dataList="coinType" :props="propsCoin"></sac-select>
      <sac-select ref="fundChangeType" label="类　　型" placeholder="请选择类型" v-model="filterForm.fundChangeType"
                  :dataList="transactionType" :props="props"></sac-select>
      <sac-select ref="recdStatus" label="状　　态" placeholder="请选择状态" v-model="recdStatus" multiple
                  :dataList="recdStatusType"></sac-select>
      <el-form-item label="用户名:" v-if="!isShowDetail">
        <el-input v-model.trim="filterForm.phone"
                  size="small"
                  placeholder="请输入用户名"
                  clearable></el-input>
      </el-form-item>
      <el-form-item label="日　　期" class="sac-date">
        <el-date-picker
          v-model="selectedDate"
          :editable="false"
          type="daterange"
          align="center"
          size="small"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>

      <sac-submit-form
        :isReset='false'
        @submitForm="submitForm(1)"></sac-submit-form>
    </el-form>
    <!--<div class="moneyList" v-if="isShowMoneyAll">-->
      <!--<el-tag v-for="(item,index) in moneyList" :key="index">{{item.name}}：{{item.value}}</el-tag>-->
    <!--</div>-->
    <sac-table :data="listData.list">
      <el-table-column prop="phone" label="用户名"></el-table-column>
      <el-table-column prop="coinName" label="币种"></el-table-column>
      <el-table-column label="类型" prop="fundTypeName"></el-table-column>
      <el-table-column prop="amount" label="金额"></el-table-column>
      <el-table-column prop="createTime" label="日期">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | dateFormat('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status"></el-table-column>
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
  export default {
    name: 'transfer-approval',
    data() {
      return {
        coinType: [],
        transactionType: [],  // 交易类型
        recdStatusType: [{
          value: '0',
          label: '失败'
        }, {
          value: '1',
          label: '成功'
        }, {
          value: '2',
          label: '处理中'
        }, {
          value: '3',
          label: '超时待支付'
        }],
        selectedDate: [],
        recdStatus: [],
        filterForm: {
          coinId: '',
          fundChangeType: '',
          recdStatus: '',
          phone: '',
          beginTime: '',
          endTime: '',
          pageNum: 1,
          pageSize: 20
        },
        listData: {
          total: null,
          list: [],
        },
        props: {
          value: 'code',
          label: 'typeName'
        },
        propsCoin: {
          value: 'coinId',
          label: 'coinName'
        },
        moneyList: [{
          name: '转入',
          value: 0
        }, {
          name: '转出',
          value: 0
        }, {
          name: '余额',
          value: 0
        }],
        // isShowMoneyAll: false,
        isShowDetail: false,
      };
    },
    methods: {
      resetForm() {
        this.filterForm.coinId = '';
        this.filterForm.fundChangeType = '';
        this.filterForm.recdStatus = '';
        this.filterForm.beginTime = '';
        this.filterForm.endTime = '';
        this.filterForm.phone = '';
        this.selectedDate = [];
        this.recdStatus = [];
        this.$refs.coinId.reset();
        this.$refs.fundChangeType.reset();
        this.$refs.recdStatus.reset();
        this.$refs.filterForm && this.$refs.filterForm.resetFields(); // 重置query的数据
      },
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        this.submitForm(currentPage);
      },
      submitForm(num) {
        this.filterForm.pageNum = num;
        // this.isShowMoneyAll = this.filterForm.coinId ? true : false;
        this.getTradeList();
      },
      getTradeList() {
        this.filterForm.beginTime = this.selectedDate && this.selectedDate[0];
        this.filterForm.endTime = this.selectedDate && this.selectedDate[1];
        this.filterForm.recdStatus = this.recdStatus.join(',');
        this.$http.post('supernode/backmgr/fund/list', this.filterForm)
          .then((res) => {
            const { list, total } = res.result.retMap ? res.result.retMap : res.result;
            this.listData.list = list;
            this.listData.total = total;
          });
      },
      getFundChangeTypeList() {
        this.$http.post('supernode/backmgr/fund/open/getFundChangeTypeList')
          .then((res) => {
            this.transactionType = [{
              code: '',
              typeName: '全部',
            }, ...res.result];
          });
      },
      getCoinInfoList() {
        this.$http.post('supernode/coin/open/getCoinInfoList')
          .then((res) => {
            this.coinType = [{
              coinId: '',
              coinName: '全部',
            }, ...res.result];
          });
      }
    },
    activated() {
      if (this.$route.params && this.$route.params.phone) {
        this.filterForm.phone = this.$route.params.phone;
        this.isShowDetail = true;
        this.getTradeList();
      } else {
        this.isShowDetail = false;
        this.getTradeList();
      }
      this.resetForm();
      // this.isShowMoneyAll = false;
      this.getFundChangeTypeList();
      this.getCoinInfoList();
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
    .el-tag {
      margin-right: 10px;
    }
    .subsidiary {
      display: flex;
      margin-bottom: 20px;
      .capital {
        width: 250px;
        margin: 0 auto;
        display: inline-block;
        font-size: 20px;
      }
    }
    .el-date-editor--daterange.el-input__inner {
      width: 240px;
    }
    .el-form-item__content {
      width: 240px;
    }
  }
</style>
