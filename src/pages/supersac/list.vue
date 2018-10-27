<template>
  <div class='pagelist-page'>
    <el-form :inline="true"
             label-width="90px"
             ref="filterForm"
             :model="filterForm">
      <sac-input
        ref="name"
        label="名称"
        v-model.trim="filterForm.name"
        prop="name"></sac-input>
      <el-form-item label="期　　数：" prop="pageType">
        <el-select ref="pageType" v-model="filterForm.pageType" size="small">
          <el-option
            v-for="item,index in pageTypeList"
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
    <sac-table :data="listData.list">
      <el-table-column prop="rank" label="排行" width="170"></el-table-column>
      <el-table-column prop="teamName" label="名称" width="200"></el-table-column>
      <el-table-column prop="totalAmount" label="总投票数" width="200"></el-table-column>
      <el-table-column prop="memberNum" label="总人数" width="200"></el-table-column>
      <el-table-column prop="scoreRate" label="得分占比" width="200">
        <template slot-scope="scope" prop="sysStatus">
          {{(scope.row.scoreRate*100).toFixed(2)}}%
        </template>
      </el-table-column>
      <!-- <el-table-column prop="update_time" label="出块数量" width="170"></el-table-column> -->

      <el-table-column label="操作">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="primary" size="small" v-if="scope.row.teamId"
                     @click.native="$router.push({name: 'setprize', query: {teamName: scope.row.teamName, teamId: scope.row.teamId}})">
            配置奖励
          </el-button>
        </template>
      </el-table-column>
    </sac-table>
    <!-- <sac-pagination v-show="listData.list.length>0"
                    @handleChange="getPaginationChange"
                    :total="+listData.total"
                    :page-size="filterForm.pageSize"
                    :current-page="filterForm.pageNum">
    </sac-pagination> -->
  </div>
</template>
<script>
  export default {
    name: "pagelist",
    data() {
      return {
        pageTypeList: [],
        filterForm: {
          pageType: '',
          name: '',
          pageNum: 1,
          pageSize: 20
        },
        listData: {
          total: null,
          list: [],
        },
        dateTime: []
      };
    },
    methods: {
      submitForm(num) {
        this.filterForm.pageNum = num;
        this.getPageInfoList();
      },
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        this.submitForm(currentPage);
      },
      getPageInfoList() {
        this.$http.post("/supernode/vote/open/getTeamVoteRankList", {
          'teamName': this.filterForm.name,
          'num': this.filterForm.pageType
        }).then((res) => {
          console.log(res)
          this.listData.list = res.result;
          // this.listData.total = res.result.list.total;
        })
      },
      getPageType() {
        this.$http.post('/supernode/vote/open/getNumGameInfo', {}).then(res => {
          res.result.map((value) => {
            value.dateStr = (value.num ? '第' + value.num + '期：' : '当前期：') + value.dateStr.substr(0, 4) + '.' + value.dateStr.substr(4, 2) + '.' + value.dateStr.substr(6, 7) + '.' + value.dateStr.substr(13, 2) + '.' + value.dateStr.substr(15, 2)
          })
          this.pageTypeList = res.result
        })
      },
      addNews() {
        this.$router.push('addnews')
      },
    },
    activated() {
      this.getPageInfoList();
      this.getPageType()
    }
  };
</script>
<style lang="less">
  .pagelist-page {
    .el-form-item__content {
      width: auto;
    }
  }
</style>
