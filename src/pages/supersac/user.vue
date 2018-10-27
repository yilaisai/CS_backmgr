<template>
  <div class='query'>
    <el-form :inline="true"
             label-width="80px"
             ref="filterForm"
             :model="filterForm">
      <sac-input
        ref="phone"
        label="用户名"
        v-model.trim="filterForm.phone"
        prop="phone"></sac-input>
      <sac-submit-form
        :isReset='false'
        @submitForm="submitForm(1)"></sac-submit-form>
    </el-form>
    <sac-table :data="listData.list">
      <el-table-column prop="phone" label="用户名" width="130"></el-table-column>
      <el-table-column label="注册时间" width="150px">
        <template slot-scope="scope" prop="createTime">
          {{scope.row.createTime| dateFormat('YYYY-MM-DD HH:mm')}}
        </template>
      </el-table-column>
      <el-table-column prop="teamName" label="节点"></el-table-column>
      <el-table-column prop="currentLevel" label="当前等级"></el-table-column>
      <el-table-column prop="maxLevel" label="最高等级"></el-table-column>
      <el-table-column prop="pNBAmount" label="PNB"></el-table-column>
      <el-table-column prop="sACAmount" label="SAC"></el-table-column>
      <el-table-column label="资金明细" width="100">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click.native="goDetail(scope.row.phone)">查看详情</el-button>
        </template>
      </el-table-column>
      <el-table-column label="邀请详情" width="100">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click.native="goInviteDetail(scope.row.phone)">查看详情</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130">
        <template slot-scope="scope">
          <el-button size="small" v-if="scope.row.status== 1" type="success"
                     @click="optStatusChange(0,'解锁账号',scope.row)">解锁账号
          </el-button>
          <el-button size="small" v-if="scope.row.status== 0" type="warning"
                     @click="optStatusChange(1,'锁定账号',scope.row)">锁定账号
          </el-button>
        </template>
      </el-table-column>
    </sac-table>
    <sac-pagination v-show="listData.list.length>0"
                    @handleChange="getPaginationChange"
                    :total="+listData.total"
                    :page-size="filterForm.pageSize"
                    :current-page="filterForm.curPage">
    </sac-pagination>
  </div>
</template>
<script>
  import Md5 from '../../../static/js/md5';

  export default {
    name: 'user',
    data() {
      return {
        filterForm: {
          phone: '',
          curPage: 1,
          pageSize: 20
        },
        listData: {
          total: null,
          list: [],
        },
      };
    },
    methods: {
      submitForm(num) {
        this.filterForm.curPage = num;
        this.getUserInfoList();
      },
      getUserInfoList() {
        this.$http.post('supernode/backmgr/user/list', this.filterForm)
          .then((res) => {
            const { list, total } = res.result;
            this.listData.list = list;
            this.listData.total = total;
          });
      },
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        this.filterForm.curPage = currentPage;
        this.submitForm(currentPage);
      },
      goDetail(phone) {
        this.$router.push({ name: 'money-manage', params: { phone } });
      },
      goInviteDetail(phone) {
        this.$router.push({ name: 'invite-detail', query: { phone } });
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
              this.$http.post('supernode/backmgr/user/lock', {
                phone: data.phone,
                status: type,
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
    },
    activated() {
      this.getUserInfoList()
    }
  };
</script>
<style lang="less">
  .query {
  }
</style>
