<template>
  <div class='invite-detail'>
    <el-row class="">
      <el-col :span="4">
        <el-button size="small" type="primary" plain @click="$router.go(-1)">返回</el-button>
      </el-col>
      <el-col :span="16">
        <h3 style="text-align:center">{{filterForm.phone}}的邀请详情</h3>
      </el-col>
    </el-row>
    <div class="invite">
      邀请Ta的人：{{parent}}（{{level}}）
    </div>
    <el-form :inline="true"
             label-width="100px"
             ref="filterForm">
      <sac-select ref="noticeType" label="状态类型" v-model="filterForm.status"
                  :dataList="noticeTypeList"></sac-select>
      <sac-submit-form
        :isReset='false'
        @submitForm="submitForm(1)"></sac-submit-form>
    </el-form>
    <sac-table :data="detais.list">
      <el-table-column prop="phone" label="用户名"></el-table-column>
      <el-table-column prop="currentLevel" label="等级"></el-table-column>
      <el-table-column prop="pNBAmount" label="PNB"></el-table-column>
      <el-table-column prop="createTime" label="注册时间">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | dateFormat('YYYY-MM-DD HH:mm')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status=='0'" style="color:#409EFF;">正常</span>
          <span v-if="scope.row.status=='1'" style="color:red;">锁定中</span>
        </template>
      </el-table-column>
    </sac-table>
    <sac-pagination v-show="detais.list.length>0"
                    @handleChange="getPaginationChange"
                    :total="+detais.total"
                    :page-size="filterForm.pageSize"
                    :current-page="filterForm.curPage">
    </sac-pagination>
  </div>
</template>
<script>
  export default {
    name: 'invite-detail',
    data() {
      return {
        detais: {
          list: [],
          total: ''
        },
        filterForm: {
          phone: '',
          status: '', // 0:正常 1:锁定
          curPage: 1,
          pageSize: 20
        },
        parent: '15017908530', // 给个默认值，防止出现 {{}}
        level: '王者',
        noticeTypeList: [{
          value: '',
          label: '全部',
        }, {
          value: '1',
          label: '锁定中',
        }, {
          value: '0',
          label: '正常',
        }],
      };
    },
    methods: {
      getDetail() {
        this.$http.post('supernode/backmgr/user/invite/list', this.filterForm)
          .then((res) => {
            const { details, level, parent } = res.result;
            this.detais.list = details.list ? details.list : [];
            this.detais.total = details.total;
            this.level = level;
            this.parent = parent;
          });
      },
      submitForm(num) {
        this.filterForm.curPage = num;
        this.getDetail();
      },
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        this.filterForm.curPage = currentPage;
        this.submitForm(currentPage);
      },
    },
    activated() {
      this.filterForm.phone = this.$route.query.phone;
      this.getDetail();
    }
  };
</script>
<style lang="less">
  .invite-detail {
    .sac-row {
      margin-bottom: 20px;
      .el-col {
        margin-top: 20px;
      }
    }
    .invite {
      margin: 0px 0 20px 0;
    }
  }
</style>
