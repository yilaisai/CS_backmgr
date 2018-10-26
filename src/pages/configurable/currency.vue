/**
*  Created by   阿紫
*  On  2018/8/10
*  Content 币种设置
*/
<template>
  <div class='currency'>
    <el-col :span="22" style="text-align:right; margin-bottom:30px;">
      <el-button size="small" type="primary" @click="addCoin">创建币种</el-button>
    </el-col>
    <sac-table :data="listData.list">
      <el-table-column prop="coinName" label="币种" width="70"></el-table-column>
      <el-table-column prop="tranInMinAmount" label="最小转账数额" :formatter="formatSex"></el-table-column>
      <el-table-column prop="tranOutFee" label="转账手续费" :formatter="formatTranOutFee"></el-table-column>
      <el-table-column prop="tranLimitNrealName" label="未身份认证每日转账限额" :formatter="formatTranLimitNrealName"
                       width="120"></el-table-column>
      <el-table-column prop="auditInMinAmount" label="后台审核转账限额" :formatter="formatMinAmount"></el-table-column>
      <el-table-column prop="smsCkInMinAmount" label="短信验证限额" :formatter="formatSmsCkAmount"></el-table-column>
      <el-table-column prop="smsInNoticeMinAmount" label="短信通知限额" :formatter="formatSmsNoticeAmount"></el-table-column>
      <el-table-column label="操作" width="90">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="success" size="small" @click.native="modification(scope.row)">修改</el-button>
        </template>
      </el-table-column>
      <el-table-column label="充值" width="90">
        <template slot-scope="scope" prop="isShow">
          <el-switch v-model="scope.row.isDeposit" :inactive-value="0" :active-value="1"
                     @click.native="updateCoinInfo(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="提币" width="90">
        <template slot-scope="scope" prop="isShow">
          <el-switch v-model="scope.row.isWithdraw" :inactive-value="0" :active-value="1"
                     @click.native="withdrawCoin(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="上架" width="100">
        <template slot-scope="scope" prop="isShow">
          <el-switch v-model="scope.row.sysStatus" :inactive-value="0" :active-value="1"
                     @click.native="updateCoinInfoStatus(scope.row)"></el-switch>
        </template>
      </el-table-column>
    </sac-table>
    <sac-pagination v-show="listData.list.length>0"
                    @handleChange="getPaginationChange"
                    :total="+listData.total"
                    :page-size="pageSize"
                    :current-page="pageNum">
    </sac-pagination>
  </div>
</template>

<script>
  export default {
    name: 'currency',
    data() {
      return {
        pageNum: 1,
        pageSize: 20,
        listData: {
          total: null,
          list: [],
        },
      };
    },
    methods: {
      addCoin() {
        this.$router.push({ name: 'currencySet', params: {} });
      },
      getPaginationChange(val, currentPage) {
        this.pageSize = val;
        this.pageNum = currentPage;
        this.getCoinInfoList();
      },
      formatSex: function (row, column) {
        return `站内${row.tranInMinAmount}${row.coinName}  站外${row.tranOutMinAmount}${row.coinName}`
      },
      formatTranOutFee(row, column) {
        return `站内${row.tranInFee}${row.coinName}  站外${row.tranOutFee}${row.coinName}`
      },
      formatTranLimitNrealName(row, column) {
        return `${row.tranLimitNrealName}${row.coinName}`
      },
      formatMinAmount(row, column) {
        return `站内${row.auditInMinAmount}RMB  站外${row.auditOutMinAmount}RMB`
      },
      formatSmsCkAmount(row, column) {
        return `站内${row.smsCkInMinAmount}RMB  站外${row.smsCkOutMinAmount}RMB`
      },
      formatSmsNoticeAmount(row, column) {
        return `站内${row.smsInNoticeMinAmount}RMB  站外${row.smsOutNoticeMinAmount}RMB`
      },
      getCoinInfoList() {
        const { pageNum, pageSize } = this;
        this.$http.post("wallet/backmgr/coin/getCoinInfoList.do", { pageNum, pageSize }).then((res) => {
          const { list, total } = res.result.list;
          this.listData.list = list;
          this.listData.total = total;
        })
      },
      // 收款充值
      updateCoinInfo(itemData) {
        const { coinId, isDeposit, coinName } = itemData;
        this.$http.post("wallet/backmgr/coin/updateCoinInfoIsDeposit.do", {
          isDeposit: isDeposit ? "YES" : "NO",
          id: coinId
        }).then((res) => {
          this.$notify({
            title: '成功',
            message: `${coinName} ${isDeposit ? "开启充值" : "关闭充值"} 成功`,
            type: 'success'
          });
          this.getCoinInfoList();
        })
      },
      // 转账提币提取
      withdrawCoin(itemData) {
        const { coinId, isWithdraw, coinName } = itemData;
        this.$http.post("wallet/backmgr/coin/updateCoinInfoIsWithdraw.do", {
          isWithdraw: isWithdraw ? "YES" : "NO",
          id: coinId
        }).then((res) => {
          this.$notify({
            title: '成功',
            message: `${coinName} ${isWithdraw ? "开启提币" : "关闭提币"} 成功`,
            type: 'success'
          });
          this.getCoinInfoList();
        })
      },
      // 上下架
      updateCoinInfoStatus(itemData) {
        console.log(itemData);
        const { sysStatus, coinId, coinName } = itemData;
        this.$http.post("wallet/backmgr/coin/updateCoinInfoStatus.do", {
          status: sysStatus ? "VALID1" : "INVALID0",
          coinId: coinId,
          version: '10.24',
          plat: 'web'
        }).then((res) => {
          this.$notify({
            title: '成功',
            message: `${coinName} ${sysStatus ? "上架" : "下架"} 成功`,
            type: 'success'
          });
        })
      },
      modification(itemData) {
        this.$router.push({ name: 'currencySet', params: itemData });
      },
    },
    activated() {
      this.getCoinInfoList();
    }
  };
</script>
<style lang="less">
  .currency {
  }
</style>
