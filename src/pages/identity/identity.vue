/**
*  Created by   阿紫
*  On  2018/8/10
*  Content
*/
<template>
  <div class="sac-home">
    <div class="sac-queryCondition">
      <el-form class="filter-container"
               :inline="true"
               label-width="80px"
               ref="filterForm"
               :model="filterForm">
        <sac-select label="审核状态" v-model="filterForm.auditStatus" :data-list="identityType"></sac-select>
        <sac-input
          ref="phone"
          label="手机号"
          v-model.trim="filterForm.phone"
          prop="phone"></sac-input>
        <sac-input
          ref="realName"
          label="姓名"
          v-model.trim="filterForm.realName"
          prop="realName"></sac-input>
        <sac-input
          ref="cardNo"
          label="身份证"
          v-model.trim="filterForm.cardNo"
          prop="cardNo"></sac-input>
        <sac-submit-form
          :isReset="false"
          @submitForm="submitForm(1)"
          @resetForm="resetForm"></sac-submit-form>
        <el-form-item>
          <el-button type="danger" @click="quickAudit" size="small">一键审核</el-button>
        </el-form-item>
      </el-form>
    </div>
    <sac-table :data="listData.list">
      <el-table-column prop="phone" label="账号"></el-table-column>
      <el-table-column prop="realName" label="姓名"></el-table-column>
      <el-table-column prop="cardNo" label="身份证号码"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-show="scope.row.antiMoneyAudit == -1">未申请</span>
          <span v-show="scope.row.antiMoneyAudit == 0">不通过</span>
          <span v-show="scope.row.antiMoneyAudit == 1">通过</span>
          <span v-show="scope.row.antiMoneyAudit == 2">待审核</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="tradeStatus">
        <template slot-scope="scope" prop="tradeStatus">
          <el-button type="success" size="small" @click.native="goDetails(scope.row)">查看详情</el-button>
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
  import { identityType } from '@/common/constants';

  export default {
    name: 'home',
    components: {},
    data() {
      return {
        filterForm: {
          auditStatus: "",
          phone: "",
          realName: '',
          cardNo: '',
          pageNum: 1,
          pageSize: 20
        },
        listData: {
          total: null,
          list: [],
        },
        identityType
      };
    },
    methods: {
      resetForm() {
        this.$refs.phone.reset();
        this.$refs.realName.reset();
        this.$refs.cardNo.reset();
        this.filterForm.auditStatus = '';
        this.$refs.filterForm.resetFields(); // 重置query的数据
        this.filterForm.pageNum = 1;
        this.getWaittingAuditUser();
      },
      submitForm(num) {
        this.filterForm.pageNum = num;
        this.getWaittingAuditUser();
      },
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        this.submitForm(currentPage);
      },
      getWaittingAuditUser() {
        this.$http.post('wallet/backmgr/user/getWaittingAuditUser.do', this.filterForm)
          .then((res) => {
            const { list, total } = res.result.list;
            this.listData.list = list;
            this.listData.total = total;
          });
      },
      goDetails(itemDate) {
        this.$router.push({
          name: 'identityDetails',
          params: itemDate,
        })
      },
      quickAudit() {
        this.$confirm('确定一键审核吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/wallet/backmgr/user/quickAudit.do').then((res) => {
            this.$notify({
              title: '成功',
              message: '一键审核成功',
              type: 'success'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消一键审核'
          });
        });
      }
    },
    activated() {
      this.getWaittingAuditUser();
    }
  };
</script>
<style lang='less'>
  .sac-home {

  }
</style>
