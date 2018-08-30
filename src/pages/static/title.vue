/**
*  Created by   阿紫
*  On  2018/8/30
*  Content
*/
<template>
  <div class='title'>
    <el-col :span="22" style="text-align:right;">
      <el-button size="small" type="primary" @click="addNews">创建新闻</el-button>
    </el-col>
    <el-form :inline="true"
             label-width="50px"
             ref="filterForm"
             :model="filterForm">
      <sac-select label="预发布路径" v-model="filterForm.pageType" :data-list="typeList"></sac-select>
      <sac-input label="标题" v-model="filterForm.title"></sac-input>
      <sac-submit-form
        :isReset='false'
        @submitForm="submitForm(1)"></sac-submit-form>
    </el-form>
    <sac-table :data="listData.list">
      <el-table-column prop="bannerTypeName" label="标题"></el-table-column>
      <el-table-column prop="bannerName" label="预发布类型"></el-table-column>
      <el-table-column prop="jumpUrl" label="链接地址">
        <template slot-scope="scope" prop="sysStatus">
          <a target="_brank" :href="scope.row.jumpUrl">{{scope.row.jumpUrl}}</a>
        </template>
      </el-table-column>

      <el-table-column prop="createTime" label="创建时间" width="170"></el-table-column>
      <el-table-column prop="createTime" label="更新时间" width="170"></el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="primary" :disabled="scope.row.isOnshelf != 0" size="small"
                     @click.native="modification(scope.row)">修改
          </el-button>
          <el-button type="danger" :disabled="scope.row.isOnshelf != 0" size="small"
                     @click.native="remove(scope.row)">删除
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
    name: "title",
    data() {
      return {
        typeList: [{
          value: '',
          label: '全部',
        }, {
          value: '1',
          label: '未发布',
        }, {
          value: '2',
          label: '已发布',
        }],
        filterForm: {
          pageType: '',
          title: '',
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
      submitForm(num) {
        this.filterForm.pageNum = num;
        this.getPageInfoList();
      },
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        this.submitForm(currentPage);
      },
      getPageInfoList() {
        this.$http.post("wallet/backgmr/page/open/getPageInfoList.do", this.filterForm).then((res) => {
          this.listData.list = res.result.list.list;
          this.listData.total = res.result.list.total;
        })
      },
      // 删除
      remove(itemData) {
        const { id, bannerName } = itemData;
        this.$confirm(`确定删除 ${bannerName} 吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post("wallet/backmgr/banner/updateAppBannerInfoSysStatus.do", {
            sysStatus: "INVALID0",
            id
          }).then((res) => {
            this.$notify({
              title: '成功',
              message: `删除 ${bannerName}成功`,
              type: 'success'
            });
            this.getPageInfoList();
          })
        })
      },
      addNews() {
        console.log('addNews');
      },
      modification(data) {
        console.log('modification');
      },
    },
    activated() {
      this.getPageInfoList();
    }
  };
</script>
<style lang="less">
  .title {
  }
</style>
