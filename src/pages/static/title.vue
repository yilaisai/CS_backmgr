/**
*  Created by   阿紫
*  On  2018/8/30
*  Content
*/
<template>
  <div class='pagelist-page'>
    <el-col :span="24" style="text-align:right;">
      <el-button size="small" type="primary" @click="addNews">创建新闻</el-button>
    </el-col>
    <el-form :inline="true"
      label-width="90px"
      ref="filterForm"
      :model="filterForm">
      <el-form-item label="预发布类型" prop="pageType">
        <el-select ref="pageType" v-model="filterForm.pageType">
          <el-option
              v-for="item,index in pageTypeList"
              :key="index"
              :label="item.typeName"
              :value="item.pageType">
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
      <el-form-item>
        <sac-submit-form :isReset='false' @submitForm="submitForm(1)"></sac-submit-form>
      </el-form-item>
    </el-form>
    <sac-table :data="listData.list">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="page_type" label="预发布类型">
        <template slot-scope="scope">
          <span>{{pageTypeMate(scope.row.page_type)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="链接地址">
        <template slot-scope="scope">
          <a target="_brank" :href="scope.row.url">{{scope.row.url}}</a>
        </template>
      </el-table-column>

      <el-table-column prop="create_time" label="创建时间" width="170"></el-table-column>
      <el-table-column prop="update_time" label="更新时间" width="170"></el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="primary" :disabled="scope.row.status != 0" size="small"
                     @click.native="$router.push({name: 'addnews', params: {data: scope.row, type: 'view'}})">查看
          </el-button>
          <el-button type="danger" :disabled="scope.row.status != 0" size="small"
                     @click.native="$router.push({name: 'addnews', params: {data: scope.row, type: 'amend'}})">修改
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="上架" width="160">
        <template slot-scope="scope" prop="status">
          <el-switch v-model="scope.row.status" :inactive-value="0" :active-value="1"
                     @click.native="switchChange(scope.row)"></el-switch>
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
        this.filterForm.startTime = this.dateTime[0]
        this.filterForm.endTime = this.dateTime[1]
        this.$http.post("/cloud/backmgr/page/open/getPageInfoList", this.filterForm).then((res) => {
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
