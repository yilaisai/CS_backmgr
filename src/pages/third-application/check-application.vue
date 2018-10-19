<template>
  <div class='created'>
    <sac-table :data="listData.list">
      <el-table-column prop="id" label="序号" width="100"></el-table-column>
      <el-table-column label="应用名称" prop="appName"></el-table-column>
      <el-table-column prop="app_icon" label="应用图标">
        <template slot-scope="scope">
          <viewer :options="options"
                  class="viewer" ref="viewer"
          >
            <img v-if="!scope.row.appIcon.indexOf('http')" :src="scope.row.appIcon"
                 style="max-width:100%; max-height: 150px;" alt="图标存储地址">
          </viewer>
          <span v-if="scope.row.appIcon.indexOf('http')">{{scope.row.appIcon}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="iosVersion" label="ios版本号" width="120"></el-table-column>
      <el-table-column prop="adrVersion" label="android版本号" width="120"></el-table-column>

      <el-table-column prop="appId" label="APPID" width="180"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="success" size="small"
                     @click.native="goDetail(scope.row)">查看详情
          </el-button>
          <el-button type="warning" size="small"
                     @click.native="modification(scope.row)">修改
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="success" size="small"
                     @click.native="passCheck(scope.row)">审核通过
          </el-button>
          <el-button type="danger" size="small"
                     @click.native="showNoPassCheck(scope.row)" :disabled="scope.row.auditStatus == 0">拒绝
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
    <el-dialog title="拒绝原因" :visible.sync="dialogReasonVisibleView" width="600px">
      <el-input type="textarea" :rows="3" size="small" placeholder="请输入拒绝原因" v-model="failReason"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogReasonVisibleView = false" size="small">取 消</el-button>
        <el-button @click="passCheck(refuseData,1)" type="primary" size="small">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>

</style>
<script>
  export default {
    name: 'check-application',
    data() {
      return {
        failReason: '',
        listData: {
          total: null,
          list: [],
        },
        refuseData: '',
        pageNum: 1,
        pageSize: 20,
        dialogTitle: '创建应用',
        server_path: "",
        transferTypeInfoList: [],
        currentForm: {},
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
        },
        dialogReasonVisibleView: false,
      };
    },
    methods: {
      goDetail(params) {
        this.$router.push({
          name: 'thirdDetail',
          params
        })
      },
      getPaginationChange(val, currentPage) {
        this.pageSize = val;
        this.pageNum = currentPage;
        this.getThirdAppInfoList();
      },
      // 获取未审核/待审核列表
      getThirdAppInfoList() {
        this.$http.post("/wallet/backmgr/thirdAppInfo/getWaitingThirdAppList.do", {
          pageSize: this.pageSize,
          pageNum: this.pageNum
        }).then((res) => {
          this.listData = res.result.list
          this.listData.total = res.result.list.total
        })
      },
      // 审核通过/审核不通过
      passCheck(itemData, i) {
        console.log('itemData', itemData);
        const { appName, id } = itemData;
        let postData = { id }
        if (i == 1 && (this.failReason + '').trim() == '') {
          this.$notify({
            message: '请先输入拒绝原因！',
            type: 'warning'
          });
          return
        }
        if (i == 1) {
          postData.auditStatus = 'not_pass'
          postData.failReason = this.failReason
        } else {
          postData.auditStatus = 'pass'
        }
        this.$http.post("/wallet/backmgr/thirdAppInfo/updateThirdAppInfoAuditStatus.do", postData).then((res) => {
          this.$notify({
            title: '成功',
            message: `处理 ${appName}成功`,
            type: 'success'
          });
          this.dialogReasonVisibleView = false
          this.getThirdAppInfoList()
        })
      },
      showNoPassCheck(data) {
        console.log('data', data);
        this.dialogReasonVisibleView = true
        this.refuseData = data
      },
      modification(params) {
        this.$router.push({
          name: 'thirdModify',
          params
        })
      },
    },
    activated() {
      this.server_path = SERVER_PATH;
      this.getThirdAppInfoList();
    }
  };
</script>
<style lang="less">
  .created {
    .el-dialog {
      width: 843px;
      .el-form--inline .el-form-item__content {
        width: 240px;
      }
    }
  }
</style>
