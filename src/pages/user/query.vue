/**
*  Created by   阿紫
*  On  2018/8/10
*  Content 用户查询
*/
<template>
  <div class='query'>
    <el-form :inline="true"
             label-width="80px"
             ref="filterForm"
             :model="filterForm">
      <sac-input
        ref="phone"
        label="手机号"
        v-model.trim="filterForm.phone"
        prop="phone"></sac-input>
      <sac-input
        ref="nickName"
        label="昵称"
        v-model.trim="filterForm.nickName"
        prop="nickName"></sac-input>
      <sac-input
        ref="cardNo"
        label="身份证"
        v-model.trim="filterForm.cardNo"
        prop="cardNo"></sac-input>
      <sac-input
        ref="toAddr"
        label="收款地址"
        v-model="filterForm.coinAddr"
        prop="coinAddr"></sac-input>
      <sac-submit-form
        @submitForm="submitForm(1)"
        @resetForm="resetForm"></sac-submit-form>
    </el-form>
    <sac-table :data="listData.list">
      <el-table-column prop="userId" label="序号" width="100"></el-table-column>
      <el-table-column prop="phone" label="手机号码" width="130"></el-table-column>
      <el-table-column prop="realName" label="姓名"></el-table-column>
      <el-table-column prop="nickName" label="昵称"></el-table-column>
      <el-table-column prop="cardNo" label="身份证号"></el-table-column>
      <el-table-column prop="registTime" label="注册时间"></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="small" v-show="scope.row.optStatus== 2" type="success"
                     @click="optStatusChange(0,'解冻账号',scope.row)">解冻账号
          </el-button>
          <el-button size="small" v-show="scope.row.optStatus != 2" type="danger"
                     @click="optStatusChange(2,'冻结账号',scope.row)">冻结账号
          </el-button>
          <el-button size="small" v-show="scope.row.optStatus== 1" type="success" plain
                     @click="optStatusChange(0,'解锁账号',scope.row)">解锁账号
          </el-button>
          <el-button size="small" v-show="scope.row.optStatus== 0" type="warning"
                     @click="optStatusChange(1,'锁定账号',scope.row)">锁定账号
          </el-button>
          <el-button type="primary" size="small" @click.native="goDetail(scope.row.phone)">查看详情</el-button>
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
  export default {
    name: 'query',
    data() {
      return {
        filterForm: {
          phone: '',
          nickName: '',
          cardNo: '',
          coinAddr: '',
          pageNum: 1,
          pageSize: 20
        },
        listData: {
          total: null,
          list: [],
        },
      };
    },
    methods: {
      resetForm() {
        this.$refs.phone.reset();
        this.$refs.nickName.reset();
        this.$refs.cardNo.reset();
        this.$refs.coinAddr.reset();
        this.$refs.filterForm.resetFields(); // 重置query的数据
        this.listData.list = [];
      },
      submitForm(num) {
        this.filterForm.pageNum = num;
        const { phone, nickName, cardNo, coinAddr } = this.filterForm;
        if (phone || nickName || cardNo || coinAddr) {
          this.getUserInfoList();
        } else {
          this.$notify.error({
            title: '错误',
            message: '查询内容不能为空'
          });
        }
      },
      getUserInfoList() {
        this.$http.post('/wallet/backmgr/user/getUserInfoList.do', this.filterForm)
          .then((res) => {
            const { list, total } = res.result.list;
            this.listData.list = list;
            this.listData.total = total;
          });
      },
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        // this.filterForm.pageNum = currentPage;
        this.submitForm(currentPage);
      },
      goDetail(phone) {
        this.$router.push({ name: 'queryDetails', query: { phone } });
      },
      /**
       * 冻结/解冻 锁定/解锁 用户   optStatus  用户状态：2表示冻结，1表示锁定，0表示解冻
       * */
      optStatusChange(type, title, data) {
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '确定执行 '),
            h('span', { style: 'color: red' }, `${title} `),
            h('span', { style: 'color: #0a52e0' }, `${data.phone}`),
            h('span', null, ' 吗?'),
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              this.$http.post('wallet/backmgr/user/operatetUser.do', {
                userId: data.userId,
                optStatus: type,
              }).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `${title} ${data.phone} 成功`,
                  type: 'success'
                });
                this.getUserInfoList();
                done();
              })
            } else {
              done();
            }
          }
        })
      },
    }
  };
</script>
<style lang="less">
  .query {
  }
</style>
