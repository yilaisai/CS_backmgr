/**
*  Created by   阿紫
*  On  2018/8/10
*  Content 应用管理
*/
<template>
  <div class='created'>
    <el-form :inline="true" label-width="90px" ref="filterForm" :model="filterForm">
      <el-col :inline="true" :span="14">
        <sac-input label="APPID" v-model="filterForm.appId"></sac-input>
        <el-tooltip class="item" effect="dark" content="将已配置的APPID以邮箱和短信的形式一键发送给第三方" placement="top">
          <el-button type="primary" size="small" @click.native="sendAPPID()" style="margin-top: 5px;">发送</el-button>
        </el-tooltip>
      </el-col>
      <el-col :inline="true" :span="10" align="right">
        <el-button size="small" type="primary" @click="addCreate" style="margin-top: 5px;">创建应用</el-button>
      </el-col>
    </el-form>
    <sac-table :data="listData.list">
      <el-table-column prop="id" label="序号" width="100"></el-table-column>
      <el-table-column label="名称" prop="appName"></el-table-column>
      <el-table-column label="英文名称" prop="appNameEn"></el-table-column>
      <el-table-column prop="appIcon" label="图标存储地址">
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
      <el-table-column label="操作" width="250">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="success" size="small"
                     @click.native="goDetail(scope.row)">查看详情
          </el-button>
          <el-button type="warning" :disabled="scope.row.isShow != 0" size="small"
                     @click.native="modification(scope.row)">修改
          </el-button>
          <el-button type="danger" :disabled="scope.row.isShow != 0" size="small" @click.native="remove(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="上架" width="100">
        <template slot-scope="scope" prop="isShow">
          <el-switch v-model="scope.row.isShow" :inactive-value="0" :active-value="1"
                     @click.native="switchChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
    </sac-table>
    <sac-pagination v-show="listData.list.length>0"
                    @handleChange="getPaginationChange"
                    :total="+listData.total"
                    :page-size="pageSize"
                    :current-page="pageNum">
    </sac-pagination>

    <!--<el-dialog :title="`应用 ${ruleForm.appName} 的详情`" :visible.sync="dialogFormVisibleView">-->
    <!--<el-form :inline="true" class="demo-form-inline" label-width="130px">-->
    <!--<el-form-item label="名称:">{{ruleForm.appName}}</el-form-item>-->
    <!--<el-form-item label="英文版名称:">{{ruleForm.appNameEn}}</el-form-item>-->
    <!--<el-form-item label="应用图标:">-->
    <!--<img v-if="!ruleForm.appIcon.indexOf('http')" :src="ruleForm.appIcon"-->
    <!--style="max-width:100%; max-height: 100px;" alt="图标存储地址">-->
    <!--<span v-if="ruleForm.appIcon.indexOf('http')">{{ruleForm.appIcon}}</span>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="商户类型:">{{ruleForm.transferTypeName}}</el-form-item>-->
    <!--<el-form-item label="APPID:">{{ruleForm.appId}}</el-form-item>-->
    <!--<el-form-item label="支付通知Url:">{{ruleForm.notifyUrl}}</el-form-item>-->
    <!--<el-form-item label="回调地址:">{{ruleForm.hookInjectUrl}}</el-form-item>-->
    <!--<el-form-item label="ios版本号:">{{ruleForm.iosVersion}}</el-form-item>-->
    <!--<el-form-item label="android版本号:">{{ruleForm.adrVersion}}</el-form-item>-->
    <!--<el-form-item label="iOS Scheme协议:">{{ruleForm.iosPackageName}}</el-form-item>-->
    <!--<el-form-item label="iOS 签名:">{{ruleForm.iosSign}}</el-form-item>-->
    <!--<el-form-item label="android 签名:">{{ruleForm.adrSign}}</el-form-item>-->
    <!--<el-form-item label="android 包名:">{{ruleForm.adrPackageName}}</el-form-item>-->
    <!--<el-form-item label="android下载地址:">{{ruleForm.downloadUrl}}</el-form-item>-->
    <!--<el-form-item label="ios下载地址:">{{ruleForm.iosDownldUrl}}</el-form-item>-->
    <!--<el-form-item label="跳转地址:">{{ruleForm.jumpUrl}}</el-form-item>-->
    <!--<el-form-item label="是否自营:">{{ruleForm.ownType?'是':'否'}}</el-form-item>-->
    <!--<el-form-item label="应用介绍:">{{ruleForm.destext}}</el-form-item>-->
    <!--<el-form-item label="英文版介绍:">{{ruleForm.destextEn}}</el-form-item>-->
    <!--<el-form-item label="权重:">{{ruleForm.position}}</el-form-item>-->
    <!--</el-form>-->
    <!--<div slot="footer" class="dialog-footer">-->
    <!--<el-button @click="dialogFormVisibleView = false" size="small">取 消</el-button>-->
    <!--</div>-->
    <!--</el-dialog>-->
  </div>
</template>
<style>

</style>
<script>
  export default {
    name: 'created',
    data() {
      return {
        filterForm: {
          appId: ''
        },
        listData: {
          total: null,
          list: [],
        },
        pageNum: 1,
        pageSize: 20,
        dialogTitle: '创建应用',
        dialogFormVisible: false,
        dialogFormVisibleView: false,


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
      sendAPPID() {
        this.$http.post("wallet/backmgr/thirdAppInfo/sendEmailByAppId.do", {
          appId: this.filterForm.appId
        }).then((res) => {
          this.$notify({
            title: '成功',
            message: 'appId' + res.msg,
            type: 'success'
          });
        })
      },
      goDetail(data) {
        this.resetForm();
        this.dialogFormVisibleView = true;
        this.ruleForm = JSON.parse(JSON.stringify(data));
      },
      getPaginationChange(val, currentPage) {
        this.pageSize = val;
        this.pageNum = currentPage;
        this.getThirdAppInfoList();
      },
      getThirdAppInfoList() {
        this.$http.post("wallet/backmgr/thirdAppInfo/getThirdAppInfoList.do", {
          pageSize: this.pageSize,
          pageNum: this.pageNum
        }).then((res) => {
          this.listData = res.result.list
          this.listData.total = res.result.list.total
        })
      },
      // 上下架
      switchChange(itemData) {
        const { isShow, id, appName } = itemData;
        this.$http.post("wallet/backmgr/thirdAppInfo/updateThirdAppInfoIsShow.do", {
          isShow: isShow ? "SHOW" : "HIDE",
          id: id
        }).then((res) => {
          this.$notify({
            title: '成功',
            message: `${appName} ${isShow ? "上架" : "下架"} 成功`,
            type: 'success'
          });
        })
      },
      // 删除
      remove(itemData) {
        const { appName, id } = itemData;
        this.$confirm(`确定删除 ${appName} 应用?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post("wallet/backmgr/thirdAppInfo/updateThirdAppInfoSysStatus.do", {
            sysStatus: "INVALID0",
            id
          }).then((res) => {
            this.$notify({
              title: '成功',
              message: `删除 ${appName}成功`,
              type: 'success'
            });
            this.getThirdAppInfoList()
          })
        })
      },
      addCreate() {
        this.$router.push({
          name: 'thirdModify'
        })
      },
      modification(param) {
        this.$router.push({
          name: 'thirdModify',
          param
        })
      }
    },
    activated() {
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
