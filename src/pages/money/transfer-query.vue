<template>
	<div class='transfer-query'>
		<el-form :inline="true" label-width="86px" ref="filterForm" size="mini">
			<el-form-item ref="selectedDate" label="日　　期:" class="sac-date">
				<el-date-picker
					v-model="selectedDate"
					:editable="false"
					type="datetimerange"
					align="center"
					size="mini"
					unlink-panels
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					value-format="yyyy-MM-dd HH:mm:ss">
				</el-date-picker>
			</el-form-item>
			<sac-input ref="fromOrToUserPhone" label="用户账号" v-model.trim="filterForm.fromOrToUserPhone"></sac-input>
			<sac-coin ref="coinId" v-model="filterForm.coinId"></sac-coin>
			<sac-select ref="tradeStatus" label="状　　态" v-model="filterForm.tradeStatus" :dataList="transferQueryStatus"></sac-select>
			<sac-submit-form @submitForm="submitForm(1)" :isReset="false"></sac-submit-form>
		<!-- <el-button type="primary" @click="exportExcel" size="small">导出Excel</el-button>  -->
		</el-form>
		<sac-table :data="listData.list">
		<el-table-column align="center" prop="tradeTime" label="创建时间" min-width="153"></el-table-column>
		<el-table-column align="center" prop="coinName" label="币种" min-width="60"></el-table-column>
		<el-table-column align="center" prop="amount" label="数量" min-width="150"></el-table-column>
		<el-table-column align="center" prop="fee" label="手续费" min-width="150"></el-table-column>
		<el-table-column align="center" prop="tradeType" label="交易类型" min-width="80">
			<template slot-scope="scope">
			<span>{{scope.row.tradeType | convertTransactionType}}</span>
			</template>
		</el-table-column>
		<el-table-column align="center" prop="fromUserPhone" label="from账号" min-width="150"></el-table-column>
		<el-table-column align="center" prop="fromNickName" label="from昵称" min-width="150"></el-table-column>
		<el-table-column align="center" prop="toUserPhone" label="to账号" min-width="150"></el-table-column>
		<el-table-column align="center" prop="toNickName" label="to昵称" min-width="150"></el-table-column>
		<el-table-column align="center" label="状态" min-width="110" fixed="right">
			<template slot-scope="scope">
			<el-tag v-if='scope.row.tradeStatus === 0' type="info" size="mini">失败</el-tag>
			<el-tag v-if='scope.row.tradeStatus === 1' type="success" size="mini">成功</el-tag>
			<el-tag v-if='scope.row.tradeStatus === 2' size="mini">待审核</el-tag>
			<el-tag v-if='scope.row.tradeStatus === 3' type="warning" size="mini">审核不通过</el-tag>
			<el-tag v-if='scope.row.tradeStatus === 4' type="danger" size="mini">审核通过</el-tag>
			<el-tag v-if='scope.row.tradeStatus === 5' size="mini">处理中</el-tag>
			<el-tag v-if='scope.row.tradeStatus === 6' size="mini">已支付</el-tag>
			<el-tag v-if='scope.row.tradeStatus === 7' size="mini">已发送</el-tag>
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
	import {mapState} from 'vuex'
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
        location.href = SERVER_PATH + 'wallet/backmgr/trade/downTradeList?' + param + 'token=' + localStorage.getItem('wallet_token');
      },
      getTradeList() {
        this.filterForm.startDate = this.selectedDate && this.selectedDate[0];
        this.filterForm.endDate = this.selectedDate && this.selectedDate[1];
        this.filterForm.alarmType = this.alarmType.join(',');
        this.$http.post('wallet/backmgr/trade/getTradeList', this.filterForm)
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
        this.$http.post('wallet/backmgr/trade/operateTransferOutCoin', {
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
	computed: {
		...mapState(['coinInfo'])
	},
    activated() {
      // const end = dateFormat(new Date, 'YYYY-MM-DD HH:mm:ss');
      // const start = dateFormat(new Date().getTime() - 3600 * 1000 * 24 * 7, 'YYYY-MM-DD HH:mm:ss');
      // this.selectedDate = [start, end];
      this.getTradeList();
    }
  };
</script>
<style lang="less">
  .transfer-query {
	  overflow: hidden;
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
      margin-bottom: 15px;
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
      overflow: hidden;
      transition: all 0.5s;
    }
    .sac-date {
      .el-form-item__content {
        width: 430px!important;
      }
    }
  }
</style>
