/**
*  Created by   阿紫
*  On  2018/10/24
*  Content
*/
<template>
  <div class='revenue-management'>
    <el-form label-width="90px"
             :inline="true"
             ref="filterForm"
             :model="filterForm">
      <el-form-item label="期　　数：" prop="pageType">
        <el-select ref="pageType" v-model="filterForm.num" size="small">
          <el-option
            v-for="item,index in numGameInfoList"
            :key="index"
            :label="item.dateStr"
            :value="item.num">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <sac-submit-form :isReset='false' @submitForm="submitForm(1)"></sac-submit-form>
      </el-form-item>
    </el-form>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="团队收益" name="first">
        <div class="totalRevenue">
          本期总收益：<span>{{totalIncome}} </span>PNB
        </div>
        <sac-table :data="teamIncome">
          <el-table-column prop="teamName" label="商户名"></el-table-column>
          <el-table-column prop="member" label="总人数"></el-table-column>
          <el-table-column prop="pnbAmount" label="PNB投票数"></el-table-column>
          <el-table-column prop="pnbIncome" label="团队总收益（PNB）"></el-table-column>
        </sac-table>
      </el-tab-pane>
      <el-tab-pane label="个人收益" name="second">
        <sac-table :data="userIncome">
          <el-table-column prop="phone" label="用户名"></el-table-column>
          <el-table-column prop="teamName" label="节点"></el-table-column>
          <el-table-column prop="roleName" label="当前等级"></el-table-column>
          <el-table-column prop="pnbAmount" label="PNB投票数"></el-table-column>
          <el-table-column prop="pnbIncome" label="收益（PNB）"></el-table-column>
        </sac-table>
        <sac-pagination v-show="userIncome.length>0"
                        @handleChange="getPaginationChange"
                        :total="filterForm.total"
                        :page-size="filterForm.pageSize"
                        :current-page="filterForm.pageSize">
        </sac-pagination>
      </el-tab-pane>
      <el-tab-pane label="商户情况" name="third">
        <div>
          <span class="amount"> SAC汇率：<span class="red">{{sacRate}}</span></span>
        </div>
        <el-table :data="teamMonEarn" border show-summary size="small">
          <el-table-column prop="teamName" label="商户名称"></el-table-column>
          <el-table-column prop="sacAmount" label="SAC投票净消耗数"></el-table-column>
          <el-table-column prop="pnbbitgoAmount" label="PNBBITGO投票净消耗数"></el-table-column>
          <el-table-column prop="currentPnb" label="当月PNB总票数"></el-table-column>
          <el-table-column prop="pnbIncome" label="PNB利息"></el-table-column>
          <el-table-column label="奖励">
            <template slot-scope="scope">
              {{scope.row.rewardStr}}
            </template>
          </el-table-column>
          <el-table-column prop="toSacAmount" label="PNB折合SAC">
            <template slot-scope="scope" prop="sysStatus">
              <span
                :style="{color:scope.row.toSacAmount<scope.row.sacAmount?'red': scope.row.toSacAmount>scope.row.sacAmount? '#02bb02':''}">{{scope.row.toSacAmount}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
  export default {
    name: "revenue-management",
    data() {
      return {
        filterForm: {
          num: null,
          pageNum: 1,
          pageSize: 20,
          total: 0,
        },
        numGameInfoList: [],
        activeName: 'first',
        totalIncome: '0',
        teamIncome: [],
        userIncome: [],
        teamMonEarn: [],
        pnbAmount: '0',
        sacAmount: '0',
        sacRate: '0',
      };
    },
    methods: {
      submitForm(num) {
        this.filterForm.pageNum = num;
        this.handleClick();
      },
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        this.filterForm.pageNum = currentPage;
        this.submitForm(currentPage);
      },
      getNumGameInfo() {
        this.$http.post('/supernode/vote/open/getNumGameInfo').then(res => {
          res.result.map((value) => {
            value.dateStr = (value.num ? '第' + value.num + '期：' : '当前期：') + value.dateStr.substr(0, 4) + '.' + value.dateStr.substr(4, 2) + '.' + value.dateStr.substr(6, 7) + '.' + value.dateStr.substr(13, 2) + '.' + value.dateStr.substr(15, 2)
          })
          this.numGameInfoList = res.result;
        })
      },
      getTotalIncome() {
        this.$http.post('supernode/backmgr/income/getTotalIncome', {
          num: this.filterForm.num
        }).then(res => {
          this.totalIncome = res.result || 0
        })
      },
      getTeamIncome() {
        this.$http.post('supernode/backmgr/income/getTeamIncome', {
          num: this.filterForm.num
        }).then(res => {
          this.teamIncome = res.result;
        })
      },
      getUserIncome() {
        this.$http.post('supernode/backmgr/income/getUserIncome', {
          num: this.filterForm.num,
          pageNum: this.filterForm.pageNum,
          pageSize: this.filterForm.pageSize,
        }).then(res => {
          const { list, total } = res.result;
          this.userIncome = list;
          this.filterForm.total = total;
        })
      },
      getTeamMonEarn() {
        this.$http.post('supernode/backmgr/income/getTeamMonEarn', {
          num: this.filterForm.num
        }).then(res => {
          const { list, pnbAmount, sacAmount, sacRate } = res.result;
          this.teamMonEarn = list;
          this.pnbAmount = pnbAmount || '0';
          this.sacAmount = sacAmount || '0';
          this.sacRate = sacRate || '0';
        })
      },
      handleClick() {
        const obj = {
          // 'first': this.getTotalIncome, // 总收益
          'first': this.getTeamIncome, // 团队
          'second': this.getUserIncome, // 个人
          'third': this.getTeamMonEarn // 商户
        }
        obj[this.activeName]();
        this.activeName == 'first' ? this.getTotalIncome() : '';
      },
    },
    activated() {
      this.getNumGameInfo();
      this.getTotalIncome();
      this.getTeamIncome();
    }
  };
</script>
<style lang="less">
  .revenue-management {
    .el-form--inline .el-form-item__content {
      width: 240px;
    }
    .el-tabs__nav-scroll {
      display: flex;
      justify-content: center;
    }
    .totalRevenue {
      margin: 10px auto;
      width: 500px;
      text-align: center;
      font-size: 20px;
      span {
        color: red;
        font-weight: 600;
        font-size: 30px;
      }
    }
    .amount {
      margin-right: 20px;
      font-size: 14px;
      span {
        color: red;
        font-size: 16px;
        font-weight: 600;
      }
    }
    .el-tabs {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .el-tabs__content, .el-tab-pane {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    #pane-fourth {
      display: block;
    }
  }
</style>
