/**
*  Created by   阿紫
*  On  2018/8/17
*  Content
*/
<template>
  <div class='messageDetails'>
    <el-row style="margin-bottom: 20px;">
      <el-col :span="4">
        <el-button size="small" type="primary" plain @click="$router.go(-1)">返回</el-button>
      </el-col>
    </el-row>
    <el-form :inline="true"
             label-width="100px"
             ref="filterForm"
             :model="filterForm">
      <sac-select ref="isRead" label="阅读情况" v-model="filterForm.isRead"
                  :dataList="readList"></sac-select>
      <sac-submit-form
        :isReset='false'
        @submitForm="submitForm(1)"></sac-submit-form>
    </el-form>

    <el-table ref="multipleTable" height="100%" size="small" :data="listData.list" border>
      <el-table-column prop="phone" label="用户"></el-table-column>
      <el-table-column prop="isRead" label="阅读情况" :formatter="formatIsRead"></el-table-column>
      <el-table-column prop="sendStatues" label="发送情况" :formatter="formatSendStatus"></el-table-column>
      <el-table-column prop="sendTime" label="发送日期"></el-table-column>
    </el-table>
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
    name: "messageDetails",
    data() {
      return {
        filterForm: {
          isRead: '',
          sendStatus: '',
          noticeInfoId: '',
          pageNum: 1,
          pageSize: 20
        },
        listData: {
          total: null,
          list: [],
        },
        readList: [{
          value: '',
          label: '全部',
        }, {
          value: 'YES',
          label: '已读',
        }, {
          value: 'NO',
          label: '未读',
        }],
      };
    },
    methods: {
      submitForm(num) {
        this.filterForm.pageNum = num;
        this.getUserNoticeRecd();
      },
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        this.submitForm(currentPage);
      },
      getUserNoticeRecd() {
        this.$http.post("wallet/backmgr/userNoticeRecd/getUserNoticeRecd.do", {
          ...this.filterForm,
          noticeInfoId: this.$route.query.id,
        }).then((res) => {
          const { list, total } = res.result.list;
          this.listData.list = list;
          this.listData.total = total;
        })
      },
      formatIsRead: function (row, column) {
        return row.isRead == 0 ? '未读' : '已读'
      },
      formatSendStatus(row, column) {
        return row.sendStatues == 0 ? '发送失败' : '发送成功'
      },
    },
    activated() {
      this.filterForm.isRead = '';
      this.$refs.isRead.reset(); // 重置
      this.getUserNoticeRecd();
    }
  };
</script>
<style lang="less">
  .messageDetails {
  }
</style>
