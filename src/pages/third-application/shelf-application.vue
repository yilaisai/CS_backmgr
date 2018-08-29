/**
*  Created by   阿紫
*  On  2018/8/10
*  Content 已上架应用
*/
<template>
  <div class='shelf-application'>
    <sac-table :data="listData.list">
      <el-table-column label="图标">
        <template slot-scope="scope" prop="updateTime">
          <viewer :options="options"
                  class="viewer" ref="viewer"
          >
            <img v-if="!scope.row.appIcon.indexOf('http')" :src="scope.row.appIcon"
                 style="max-width:100%; max-height: 150px;" alt="图标存储地址">
          </viewer>
          <span v-if="scope.row.appIcon.indexOf('http')">{{scope.row.appIcon}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="appName" label="名称"></el-table-column>
      <el-table-column label="用户兑换申请" width="140">
        <template slot-scope="scope">
          <el-button size="small" type="primary"
                     @click.native="$router.push({name: 'applicationDetails', params:{
          'appId': scope.row.appId,
          'appName': scope.row.appName,
          'details': 1
          } })">查看
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click.native="$router.push({name: 'applicationDetails', params: {
          'appId': scope.row.appId,
           'appName': scope.row.appName,
          'details': 2
          }})">
            详细账单查询
          </el-button>
          <el-button size="small" type="primary" @click.native="$router.push({name: 'applicationDetails',params:  {
          'appId': scope.row.appId,
           'appName': scope.row.appName,
          'details': 3
          }})">
            总账单查询
          </el-button>
        </template>
      </el-table-column>
    </sac-table>
    <sac-pagination v-show="listData.list.length>0"
                    @handleChange="getPaginationChange"
                    :total="+listData.total"
                    :page-size="pageSize"
                    :current-page="pageNum">
    </sac-pagination>
  </div>
</template>
<style>

</style>
<script>
  export default {
    name: 'shelf-application',
    data() {
      return {
        listData: {
          total: null,
          list: [],
        },
        pageNum: 1,
        pageSize: 20,
        options: {
          inline: false,
          button: false,
          navbar: false,
          title: false,
          toolbar: false,
          tooltip: false,
          movable: true,
          zoomable: true,
          rotatable: true,
          scalable: false,
          transition: true,
          fullscreen: true,
          keyboard: true,
          url: 'data-source'
        }
      };
    },
    methods: {
      getPaginationChange(val, currentPage) {
        this.pageSize = val;
        this.pageNum = currentPage;
        this.getThirdAppInfoList();
      },
      getThirdAppInfoList() {
        this.$http.post("wallet/backmgr/thirdAppInfo/getThirdAppInfoList.do", {
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          isShow: 'SHOW'
        }).then((res) => {
          this.listData = res.result.list
        })
      },
    },
    activated() {
      this.getThirdAppInfoList();
    }
  };
</script>
<style lang="less">
  .shelf-application {
  }
</style>
