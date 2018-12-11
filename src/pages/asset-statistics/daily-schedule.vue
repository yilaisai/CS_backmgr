/*
 * @Author: dubbing 
 * @Date: 2018-12-04 17:30:53 
 * @Last Modified by: dubbing
 * @Content 日总表统计图
 * @Last Modified time: 2018-12-11 13:51:31
 */


<template>
  <div class='daily-schedule'>
    <el-form :inline="true" label-width="120px" ref="filterForm" :model="filterForm">
      <div class="title">
        <sac-coin ref="coinId" v-model="filterForm.coinId"></sac-coin>
        <sac-date ref="selectedDate" label="日　　期" v-model="selectedDate"></sac-date>
        <sac-submit-form @submitForm="submitForm(1)" :isReset="false"></sac-submit-form>
        <!-- <div class="el-form-item__content" style="width:100px">
            <el-button  type="primary"  size="small"
                @click.native="exportExcel">导出excel
            </el-button>
        </div> -->
        <div class="el-form-item__content" style="width:100px">
            <el-button  type="primary"  size="small"
                @click.native="goChart">统计图
            </el-button>
        </div>
      </div>
    </el-form>
    <div class="moneyList">
      <el-tag v-for="(item,index) in moneyList" :key="index">{{item.name}}：{{item.value}}</el-tag>
    </div>
    <sac-table :data="listData.list">
      <el-table-column align="center" prop="date" label="创建时间"></el-table-column>
      <el-table-column align="center" prop="coinName" label="币种"></el-table-column>
      <el-table-column label="钱包">
        <el-table-column align="center" prop="walletInCount" label="充币记录数"></el-table-column>
        <el-table-column align="center" prop="walletInAmount" label="充币金额"></el-table-column>
        <el-table-column align="center" prop="walletOutCount" label="提币记录数"></el-table-column>
        <el-table-column align="center" prop="walletOutAmount" label="提币金额"></el-table-column>
        <el-table-column align="center" prop="walletAmount" label="存量金额"></el-table-column>
      </el-table-column>
      <el-table-column label="区块链">
        <el-table-column align="center" prop="chainInCount" label="充币记录数"></el-table-column>
        <el-table-column align="center" prop="chainInAmount" label="充币金额"></el-table-column>
        <el-table-column align="center" prop="chainOutCount" label="提币记录数"></el-table-column>
        <el-table-column align="center" prop="chainOutAmount" label="提币金额"></el-table-column>
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
  import { dateFormat } from '@/common/util';
  import { transactionType, transferQueryStatus } from '@/common/constants';

  export default {
    name: 'daily-schedule',
    data() {
      return {
        dialogVisible: false,
        filterForm: {
          coinId: '',
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
        moneyList: [],
      };
    },
    methods: {
        //图表详情
        goChart(){
          this.$router.push({
            name: 'daily-chart',
          })
        },
        //导出excel
        exportExcel(){
          this.filterForm.startDate = this.selectedDate && this.selectedDate[0];
          this.filterForm.endDate = this.selectedDate && this.selectedDate[1]; 
            /* let param = '';
            for(let v in this.filterForm) {
                param += v + '=' + this.filterForm[v] + '&';
            } */
            /* let baseUrl
            if(SERVER_PATH=='http://api.test.sacbox.net/'){
              baseUrl='http://47.75.14.176:7002/'
            }else{
              baseUrl=SERVER_PATH
            }
            location.href = baseUrl + 'cloud/asset/open/exportDailyStatisticRecd' + param + 'token=' + localStorage.getItem('wallet_token'); */
            this.$http.post('cloud/asset/open/exportDailyStatisticRecd', this.filterForm)
            .then((res) => {
              /* const { list } = res.result.list;
              this.listData.list = list; */
            });
        },
        //编辑
        edit(data){
            this.dialogVisible=true
        },
      submitForm(num) {
        this.filterForm.pageNum = num;
        this.getbill();
      },
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        this.submitForm(currentPage);
      },
      getbill() {
        this.filterForm.startDate = this.selectedDate && this.selectedDate[0];
        this.filterForm.endDate = this.selectedDate && this.selectedDate[1]; 
        this.$http.post('cloud/asset/open/getDailyStatisticRecd', this.filterForm)
          .then((res) => {
            const { list ,total} = res.result.list;
            this.listData.list = list;
            this.listData.total = total;
            
          });
      }
    },
    activated() {
      const end = dateFormat();
      const start = dateFormat(new Date().getTime() - 3600 * 1000 * 24 * 15);
      this.selectedDate = [start, end];
      this.getbill();
    }
  };
</script>
<style lang="less">
  .daily-schedule {
    .el-tag {
      margin-right: 10px;
    }
    .el-form-item {
      margin-bottom: 3px;
      line-height: 33px;
      height: 47px;
    }
    .el-form--inline {
      .yh-submit {
        .el-form-item__content {
          width: 80px;
        }
      }
    }
    .item-width-all{
      .el-form-item__content{
        width: calc(100% - 90px);
      }
    }
    .changeContent {
      font-size: 14px;
      color: red;
      line-height: 40px;
      display: inline-block;
    }
    .content {
      height: 0;
      overflow: hidden;
      transition: all 0.5s;
    }
    /* .is-active {
      height: 80px;
    } */
    .moneyList {
      margin-top: 10px;
    }
  }
</style>
