/**
*  Created by   阿紫
*  On  2018/8/10
*  Content 资金监控
*/
<template>
  <div class='money-monitor'>
    <el-form :inline="true"
             label-width="80px"
             ref="filterForm"
             :model="filterForm">
      <sac-coin ref="coinId" :isAll="false" v-model="filterForm.coinId" @change="coinChange"></sac-coin>
      <sac-teamType ref="type" :isAll="true" v-model="filterForm.type" @change="teamTypeChange"></sac-teamType>
      <sac-input v-show="filterForm.type!=0" ref="account" label="用户账号"
                 v-model.trim="filterForm.account"></sac-input>

      <sac-date v-show="filterForm.type!=0" ref="selectedDate" label="日　　期" v-model="selectedDate"></sac-date>

      <sac-submit-form
        @submitForm="submitForm()"
        :isReset="false"></sac-submit-form>
    </el-form>
    <div v-show="filterForm.type==0">
      <!--全部-->
      <sac-bar v-show="seriesDataAll.series.length>0" :series-data='seriesDataAll'
               :width="'calc((100vw - 220px))'"
               :height="'calc(100vh - 220px)'"></sac-bar>
      <!--公司-->
      <sac-bar v-show="seriesDataCompany.series.length>0" :series-data='seriesDataCompany'
               :width="'calc((100vw - 220px))'"
               :height="'calc(100vh - 220px)'"></sac-bar>
      <!--商户-->
      <sac-bar v-show="seriesDataMerchant.series.length>0" :series-data='seriesDataMerchant'
               :width="'calc((100vw - 220px))'"
               :height="'calc(100vh + 100px)'"></sac-bar>

    </div>
    <div v-show="filterForm.type!=0">
      <sac-line :series-data='seriesData'
                :height="'calc((100vh - 220px)/2)'"
                :width="'calc(100vw - 220px)'"></sac-line>
      <sac-line :series-data='seriesDataBalance'
                :height="'calc((100vh - 220px)/2)'"
                :width="'calc(100vw - 220px)'"></sac-line>
      <sac-line v-show="filterForm.type==-1" :series-data='seriesDataRollInOut'
                :height="'calc((100vh - 220px)/2)'"
                :width="'calc(100vw - 220px)'"></sac-line>
    </div>
  </div>
</template>
<script>
  import SacLine from '@/components/sac-line.vue';
  import SacBar from '@/components/sac-bar.vue';
  import { dateFormat } from '@/common/util';

  export default {
    name: 'money-monitor',
    components: {
      SacLine,
      SacBar,
    },
    data() {
      return {
        filterForm: {
          coinId: 1,//1表示SAC,2表示BTC,3表示ETH
          account: '',
          type: 0, // 全部
          startTime: '',
          endTime: '',
        },
        selectedDate: [], //已选日期
        content: {
          coinName: 'SAC',
          teamTypeName: '全部',
        },
        seriesData: {
          title: {
            text: '',
          },
          legend: {
            data: ['收入', '支出']
          },
          xAxis: {
            data: []
          },
          series: [{
            name: '收入',
            type: 'line',
            data: [],
            itemStyle: { normal: { label: { show: false } } }
          }, {
            name: '支出',
            type: 'line',
            data: [],
            itemStyle: { normal: { label: { show: false } } }
          }]
        },
        seriesDataBalance: {
          legend: {
            data: ['余额']
          },
          xAxis: {
            data: []
          },
          series: [{
            name: '余额',
            type: 'line',
            data: [],
            itemStyle: { normal: { label: { show: false } } }
          }]
        },
        seriesDataAll: {
          title: {
            text: '资产分布'
          },
          series: [],
          center: ['50%', '50%'],
        },
        seriesDataCompany: {
          title: {
            text: '公司分布'
          },
          series: [],
        },
        seriesDataMerchant: {
          title: {
            text: '商户分布'
          },
          series: [],
          center: ['50%', '70%'],
          radius: '30%',
        },
        seriesDataRollInOut: {
          title: {
            text: '',
          },
          legend: {
            data: ['收入', '支出']
          },
          xAxis: {
            data: []
          },
          series: [{
            name: '收入',
            type: 'line',
            data: [],
            itemStyle: { normal: { label: { show: false } } }
          }, {
            name: '支出',
            type: 'line',
            data: [],
            itemStyle: { normal: { label: { show: false } } }
          }]
        },
      };
    },
    methods: {
      submitForm() {
        if (this.filterForm.type == 0) {
          this.getAllAsset();
        } else {
          if (this.filterForm.type == -1) {
            this.getRollInOut();
          }
          this.getStatics();
        }
      },
      teamTypeChange(val, name) {
        if (this.filterForm.type == 0) {
          this.getAllAsset();
        } else {
          if (this.filterForm.type == -1) {
            this.getRollInOut();
          }
          this.getStatics();
        }
        this.content.teamTypeName = name;
      },
      coinChange(val, name) {
        if (this.filterForm.type == 0) {
          this.getAllAsset();
        } else {
          if (this.filterForm.type == -1) {
            this.getRollInOut();
          }
          this.getStatics();
        }
        this.content.coinName = name;
      },
      getStatics() {
        if (this.selectedDate) {
          this.filterForm.startTime = this.selectedDate[0].split('-').join('');
          this.filterForm.endTime = this.selectedDate[1].split('-').join('');
        }
        this.$http.post('cloud/backmgr/statics', this.filterForm)
          .then((res) => {
            const { left, out } = res.result;
            const inData = res.result.in;
            const { teamTypeName, coinName } = this.content;
            const createDate = [];
            inData.forEach((item) => {
              createDate.push(`${item.createDate.toString().substr(0, 4)}-${item.createDate.toString().substr(4, 2)}-${item.createDate.toString().substr(6, 2)}`);
            })
            const inDataList = inData.map((item) => item.amount);
            const outList = out.map((item) => item.amount);
            const leftList = left.map((item) => item.amount);
            this.seriesData.title.text = `${teamTypeName}资产（${coinName}）`;
            this.seriesData.xAxis.data = createDate;
            this.seriesData.series[0].data = inDataList;
            this.seriesData.series[1].data = outList;
            // 余额
            this.seriesDataBalance.series[0].data = leftList;
            this.seriesDataBalance.xAxis.data = createDate;
          });
      },
      getAllAsset() {
        const { coinId } = this.filterForm;
        this.$http.post("cloud/backmgr/statics/allAsset", {
          coinId
        }).then((res) => {
          const { company, merchant, personal } = res.result;
          this.seriesDataAll.title.text = `资产分布（${this.content.coinName}）`;
          this.seriesDataCompany.title.text = `公司分布（${this.content.coinName}）`;
          this.seriesDataMerchant.title.text = `商户分布（${this.content.coinName}）`;
          this.seriesDataAll.series = [{
            name: company.name,
            value: company.amount || 0
          }, {
            name: merchant.name,
            value: merchant.amount || 0
          }, {
            name: personal.name,
            value: personal.amount || 0
          }];
          company.children.forEach((item) => {
            item.name = item.name || '';
            item.value = item.amount || 0;
          })
          merchant.children.forEach((item) => {
            item.name = item.name || '';
            item.value = item.amount || 0;
          })
          this.seriesDataCompany.series = company.children;
          this.seriesDataMerchant.series = merchant.children;
        })
      },
      getRollInOut() {
        if (this.selectedDate) {
          this.filterForm.startTime = this.selectedDate[0].split('-').join('');
          this.filterForm.endTime = this.selectedDate[1].split('-').join('');
        }
        this.$http.post("cloud/backmgr/statics/rollInOut", this.filterForm).then((res) => {
          const { out } = res.result;
          const inData = res.result.in;
          const { coinName } = this.content;
          const createDate = [];
          inData.forEach((item) => {
            createDate.push(`${item.createDate.toString().substr(0, 4)}-${item.createDate.toString().substr(4, 2)}-${item.createDate.toString().substr(6, 2)}`);
          })
          const inDataList = inData.map((item) => item.amount);
          const outList = out.map((item) => item.amount);
          this.seriesDataRollInOut.title.text = `链上转账资金（${coinName}）`;
          this.seriesDataRollInOut.xAxis.data = createDate;
          this.seriesDataRollInOut.series[0].data = inDataList;
          this.seriesDataRollInOut.series[1].data = outList;
        })
      },
    },
    activated() {
      const end = dateFormat();
      const start = dateFormat(new Date().getTime() - 3600 * 1000 * 24 * 15);
      this.selectedDate = [start, end];
      this.getAllAsset();
    },
  };
</script>
<style lang="less">
  .money-monitor {
    .reminder {
      color: #606266;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      display: flex;
    }
  }
</style>
