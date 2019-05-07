<template>
  <div class="finances">
    <yh-filter :filterParams="filterParams" :coinArr="coinArr" @search="search"/>
    <div class="finances-container">
      <el-tabs v-model="activeName" type="card" @tab-click="tabChange">
        <el-tab-pane label="活期" name="currency">
          <div class="button-group">
            <el-button size="small" type="primary" @click="createCurrency">创建活期项目</el-button>
          </div>
          <currency-table ref="currencyTable" :listQuery="listQuery" :coinArr="coinArr" @modify="modifyCurrency" @setTotal="count => total = count"/>
        </el-tab-pane>
        <el-tab-pane label="定期" name="regular">定期</el-tab-pane>
        <el-tab-pane label="项目详情" name="detail">
          <div class="button-group">
            <el-button size="small" type="primary" @click="createDetail">创建项目详情</el-button>
          </div>
          <detail-table v-if="activeName === 'detail'" ref="detailTable" :listQuery="listQuery" :coinArr="coinArr" @modify="modifyDetail" @setTotal="count => total = count"/>
        </el-tab-pane>
      </el-tabs>
      <!-- <sac-pagination
        @handleChange="getPaginationChange"
        :total="total"
        :page-size="listQuery.pageSize"
        :currency-page="listQuery.pageNum" /> -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listQuery.pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="listQuery.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total" />
  </div>
    <currency-dialog
      ref="currencyDialog"
      :visible.sync="currencyDialog"
      :status="currencyStatus"
      :coinArr="coinArr"
      :currencyParams="currencyParams"
      @createSuccess="resetCurrencyTable"/>
    <detail-dialog
      ref="detailDialog"
      :visible.sync="detailDialog"
      :status="detailStatus"
      :coinArr="coinArr"
      :detailParams="detailParams"
      @createSuccess="resetDetailTable"/>
  </div>
</template>

<script>
import yhFilter from './filter'
import CurrencyTable from './currencyTable'
import CurrencyDialog from './currencyDialog'
import DetailTable from './detailTable'
import DetailDialog from './detailDialog'
export default {
  name: 'finances',
  components: {
    yhFilter,
    CurrencyTable,
    CurrencyDialog,
    DetailTable,
    DetailDialog
  },
  data () {
    return {
      filterParams: {
        coinId: null,
        dateTime: null
      },
      listQuery: {
        pageNum: 1,
        pageSize: 20
      },
      total: null,
      activeName: 'currency',
      // 所有币种的信息
      coinArr: [],
      // coinObj: {},
      // 活期dialog
      currencyParams: {
        coinId: null,
        rate: '',
        minAmount: '',
        weight: ''
      },
      currencyStatus: 'create',
      currencyDialog: false,
      // 项目详情
      detailParams: {
        coinId: null,
        detailUrl: ''
      },
      detailStatus: 'create',
      detailDialog: false
    }
  },
  methods: {
    search () {
      this.listQuery.coinId = this.filterParams.coinId
      if (this.filterParams.dateTime && this.filterParams.dateTime.length > 0) {
        this.listQuery.startTime = this.filterParams.dateTime[0]
        this.listQuery.endTime = this.filterParams.dateTime[1]
      } else {
        delete this.listQuery.startTime
        delete this.listQuery.endTime
      }
      this.resetTable()
    },
    resetCurrencyParams () {
      this.$refs.currencyDialog && this.$refs.currencyDialog.resetFields()
      this.currencyParams = {
        coinId: null,
        rate: '',
        minAmount: '',
        weight: ''
      }
    },
    resetDetailParams () {
      this.$refs.detailDialog && this.$refs.detailDialog.resetFields()
      this.detailParams = {
        coinId: null,
        detailUrl: ''
      }
    },
    // 切换tab
    tabChange () {
      this.filterParams.coinId = null
      this.filterParams.dateTime = null
      this.listQuery = {
        pageNum: 1,
        pageSize: 20
      }
      if (this.activeName === 'currency') {
        this.$nextTick(() => {
          this.resetCurrencyTable()
        })
      }

    },
    async getAllCoinList () {
      let { result } = await this.$http.get('/cloud/backmgr/financial/getAllCoinList')
      this.coinArr = result.coinInfoList
    },
    // 创建活期
    createCurrency () {
      this.resetCurrencyParams()
      this.currencyStatus = 'create'
      this.currencyDialog = true
    },
    // 修改活期内容
    modifyCurrency (currencyInfo) {
      this.resetCurrencyParams()
      this.currencyStatus = 'modify'
      this.currencyParams = {
        id: currencyInfo.id,
        coinId: currencyInfo.getCoinId,
        rate: currencyInfo.rate,
        minAmount: currencyInfo.minAmount,
        weight: currencyInfo.weight
      }
      this.currencyDialog = true
    },
    // 创建项目详情
    createDetail () {
      this.resetDetailParams()
      this.detailStatus = 'create'
      this.detailDialog = true
    },
    // 修改项目详情
    modifyDetail (detailInfo) {
      this.resetDetailParams()
      this.detailStatus = 'modify'
      this.detailParams = {
        id: detailInfo.detailId,
        coinId: detailInfo.coinId,
        detailUrl: (/.*id=(\d*).*/).exec(detailInfo.detailUrl)[1]
        // url: detailInfo.detailUrl
      }
      this.detailDialog = true
    },
    // 刷新活期表格
    resetCurrencyTable () {
      this.$refs.currencyTable.fetchData()
    },
    // 刷新项目详情表格
    resetDetailTable () {
      this.$refs.detailTable.fetchData()
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1
      this.listQuery.pageSize = val
      this.resetTable()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.resetTable()
    },
    resetTable () {
      switch(this.activeName) {
        case 'currency': this.resetCurrencyTable(); break;
        case 'detail': this.resetDetailTable(); break;
      }
    }
  },
  mounted () {
    this.getAllCoinList()
  }
}
</script>

<style lang="less" scoped>
.finances-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.el-tabs {
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  /deep/ &__content {
    flex: 1;
    .el-tab-pane {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }
}
</style>
