/**
*  Created by   阿紫
*  On  2019/6/17 0017
*  Content  代理刷单-用户管理
*/

<template>
  <div class='brushUser'>
    <el-form :inline="true"
             label-width="90px"
             ref="filterForm"
             :model="filterForm">
      <sac-input
        ref="phone"
        label="用户ID"
        v-model.trim="filterForm.userId"
        prop="phone"></sac-input>
      <sac-submit-form
        :isReset='false'
        @submitForm="getListAgencyUser()"></sac-submit-form>
    </el-form>
    <sac-table :data="listData.list">
      <el-table-column prop="userId" label="用户ID"></el-table-column>
      <el-table-column prop="phone" label="用户名"></el-table-column>
      <el-table-column prop="parentId" label="上级用户ID"></el-table-column>
      <el-table-column prop="grade" label="等级">
        <template slot-scope="scope">
          {{gradeListObj[scope.row.grade]}}
        </template>
      </el-table-column>
      <el-table-column prop="userId" label="操作" width="250px">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="primary" size="small"
                     v-if="+scope.row.grade !==4"
                     @click.native="incident(scope.row, 'enable' )">指定服务中心
          </el-button>
          <el-button type="danger" size="small"
                     v-else
                     @click.native="incident(scope.row, 'disable')">取消服务中心
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
    name: "brushUser",
    data() {
      return {
        filterForm: {
          userId: '',
          pageNum: 1,
          pageSize: 20,
        },
        listData: {
          total: null,
          list: [],
        },
        gradeListObj: {
          0: '刷单员',
          1: '初级代理',
          2: '中级代理',
          3: '高级代理',
          4: '服务中心',
        },
      };
    },
    methods: {
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        this.filterForm.pageNum = currentPage;
        this.getListAgencyUser();
      },
      incident(itemData, state) {
        const {userId} = itemData;
        const text = state === 'disable' ? '取消服务中心' : '指定服务中心';
        this.$confirm(`确取${text}吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post("/cloud/backmgr/shop/updateShopForService", {
            userId,
            state
          }).then((res) => {
            this.$notify({
              title: '成功',
              message: `${text}成功`,
              type: 'success'
            });
            this.getListAgencyUser();
          })
        })
      },
      // 查询代理用户列表
      getListAgencyUser() {
        this.$http.post("/cloud/backmgr/shop/listAgencyUser", this.filterForm).then((res) => {
          this.listData.list = res.result.list;
          this.listData.total = res.result.count;
        })
      },
    },
    activated() {
      this.getListAgencyUser();      // 查询代理用户列表
    }
  };
</script>
<style lang="less">
  .brushUser {

  }
</style>
