/**
*  Created by   阿紫
*  On  2019/6/17 0017
*  Content  代理刷单-刷单流水
*/

<template>
  <div class='flow'>
    <el-form :inline="true"
             label-width="90px"
             ref="filterForm"
             :model="filterForm">
      <el-form-item label="项目：" size="small">
        <el-select v-model="filterForm.projectId" placeholder="请选择项目">
          <el-option
            v-for="(item, index) in project"
            :key="index"
            :label="item.coinName"
            :value="item.coinId">
          </el-option>
        </el-select>
      </el-form-item>
      <sac-input
        ref="phone"
        label="刷单账号"
        v-model.trim="filterForm.userId"
        prop="phone"></sac-input>
      <sac-input
        ref="phone"
        label="订单号"
        v-model.trim="filterForm.orderNo"
        prop="phone"></sac-input>

      <el-form-item label="类型：" size="small" class="from_box_item">
        <el-select v-model="filterForm.type" placeholder="请选择方向">
          <el-option
            v-for="(item, index) in typeList"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
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
        @submitForm="getList()"></sac-submit-form>
    </el-form>

    <sac-table :data="listData.list">
      <el-table-column prop="projectId" label="项目">
      </el-table-column>
      <el-table-column prop="userId" label="刷单账号"></el-table-column>
      <el-table-column prop="orderNo" label="订单号"></el-table-column>
      <el-table-column prop="brushCoinId" label="刷单币种"></el-table-column>
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          {{typeListObj[scope.row.type]}}
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="金额"></el-table-column>
      <el-table-column prop="createTime" label="时间"></el-table-column>
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
    name: "flow",
    data() {
      return {
        filterForm: {
          projectId: '',
          userId: '',
          orderNo: '',
          type: '',
          startTime: '',
          endTime: '',
          pageNum: 1,
          pageSize: 20,
        },
        listData: {
          total: null,
          list: [],
        },
        project: [],
        typeListObj: {
          1: '转账',
          2: '收款',
        },
        typeList: [{
          label: '全部',
          value: ''
        }, {
          label: '转账',
          value: 1
        }, {
          label: '收款',
          value: 2
        }],
        dateTime: [],
      };
    },
    methods: {
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        this.filterForm.pageNum = currentPage;
        this.getList();
      },
      getList() {
        this.filterForm.startTime = this.dateTime && this.dateTime[0];
        this.filterForm.endTime = this.dateTime && this.dateTime[1];
        this.$http.post("/cloud/backmgr/shop/listBrushLog", this.filterForm).then((res) => {
          this.listData.list = res.result.list;
          this.listData.total = res.result.count;
        })
      },
      getSampleCoinInfo() {
        this.$http.post("wallet/backmgr/coin/getSampleCoinInfo.do", {}).then((res) => {
          this.project = res.result.list
        })
      }
    },
    activated() {
      this.getList();
      this.getSampleCoinInfo();
    }
  };
</script>
<style lang="less">
  .flow {
  }
</style>
