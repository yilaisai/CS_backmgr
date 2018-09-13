
<template>
  <div class='pagelist-page'>
    <el-form :inline="true"
      label-width="90px"
      ref="filterForm"
      :model="filterForm">
      <sac-input
        ref="phone"
        label="名称"
        v-model.trim="filterForm.phone"
        prop="phone"></sac-input>
      <el-form-item label="时间" prop="pageType">
        <el-select ref="pageType" v-model="filterForm.pageType">
          <el-option
              v-for="item,index in pageTypeList"
              :key="index"
              :label="item.typeName"
              :value="item.pageType">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <sac-submit-form :isReset='false' @submitForm="submitForm(1)"></sac-submit-form>
      </el-form-item>
    </el-form>
    <sac-table :data="listData.list">
      <el-table-column prop="title" label="排行" width="170"></el-table-column>
      <!-- <el-table-column prop="page_type" label="预发布类型">
        <template slot-scope="scope">
          <span>{{pageTypeMate(scope.row.page_type)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="链接地址">
        <template slot-scope="scope">
          <a target="_brank" :href="scope.row.url">{{scope.row.url}}</a>
        </template>
      </el-table-column> -->

      <el-table-column prop="create_time" label="名称" width="200"></el-table-column>
      <el-table-column prop="update_time" label="总投票数" width="200"></el-table-column>
      <el-table-column prop="update_time" label="总人数" width="200"></el-table-column>
      <el-table-column prop="update_time" label="得分占比" width="200"></el-table-column>
      <!-- <el-table-column prop="update_time" label="出块数量" width="170"></el-table-column> -->

      <el-table-column label="操作">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="primary"
                     @click.native="$router.push({name: 'setprize', params: {data: scope.row, type: 'view'}})">配置奖励
          </el-button>
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
    name: "pagelist",
    data() {
      return {
        pageTypeList: [],
        filterForm: {
          pageType: '',
          title: '',
          startTime: '',
          endTime: '',
          version: '1.0.0',
          plat: 'web',
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
        this.$http.post("/cloud/vote/open/getTeamVoteRankList",{}).then((res) => {
          console.log(res)
          debugger
          this.listData.list = res.result.list.list;
          this.listData.total = res.result.list.total;
        })
      },
      getPageType() {
        this.$http.post('/cloud/backmgr/page/open/getPageTypeList',{
          version: '1.0.0',
          plat: 'web',
        }).then(res => {
            this.pageTypeList = res.result.list
        })
      },
      pageTypeMate(typeNumber) {
        let typeText = ''
        this.pageTypeList.forEach((value, index) => {
          if(value.pageType == typeNumber) {
            typeText = value.typeName
          }
        })
        return typeText
      },
      addNews() {
        this.$router.push('addnews')
      },
      modification(data) {
        console.log('modification');
      },
      switchChange(data) {
        this.$http.post('/cloud/backmgr/page/updatePageInfoStatus', {
          id: data.id,
          status: ['INVALID0', 'VALID1'][data.status]
        }).then(res => {
          this.$notify({
            title: '成功',
            message: res.msg,
            type: 'success'
          });
        })
      }
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
