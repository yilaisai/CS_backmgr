/**
*  Created by   阿紫
*  On  2018/8/10
*  Content 应用管理
*/
<template>
  <div class='created'>
    <el-col :span="22" style="text-align:right; margin-bottom: 30px;">
      <el-button size="small" type="primary" @click="addCreate">创建应用</el-button>
    </el-col>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :inline="true" label-width="130px">
        <el-form-item label="应用名称:" prop="appName">
          <el-input v-model="ruleForm.appName" size="small" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="应用英文名称:">
          <el-input v-model="ruleForm.appNameEn" size="small" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="商户手机号:" prop="phone" v-if="!ruleForm.id">
          <el-input v-model="ruleForm.phone" size="small" placeholder="请输入商户手机号"></el-input>
        </el-form-item>
        <el-form-item label="应用图标:" prop="appIcon">
          <el-input v-model="ruleForm.appIcon" size="small" placeholder="请输入应用图标">
            <el-upload
              :action="server_path + 'wallet/util/open/uploadFile.do'"
              multiple
              name="files"
              :data="{type:'img'}"
              :show-file-list="false"
              :on-success="upload" slot="append">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-input>
        </el-form-item>
        <el-form-item label="商户类型：" prop="transferTypeId">
          <el-select v-model="ruleForm.transferTypeId" size="small" placeholder="请选择商户类型">
            <el-option
              v-for="item in transferTypeInfoList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="APPID:" prop="appid">
          <el-input v-model="ruleForm.appid" size="small" placeholder="请输入APPID"></el-input>
        </el-form-item>
        <el-form-item label="支付通知Url:">
          <el-input v-model="ruleForm.notifyUrl" size="small" placeholder="请输入支付通知Url"></el-input>
        </el-form-item>
        <el-form-item label="回调地址:">
          <el-input v-model="ruleForm.hookInjectUrl" size="small" placeholder="请输入回调地址"></el-input>
        </el-form-item>
        <el-form-item label="ios版本号:" prop="iosVersion">
          <el-input v-model="ruleForm.iosVersion" size="small" placeholder="请输入版本号"></el-input>
        </el-form-item>
        <el-form-item label="android版本号:" prop="adrVersion">
          <el-input v-model="ruleForm.adrVersion" size="small" placeholder="请输入版本号"></el-input>
        </el-form-item>
        <el-form-item label="iOS Scheme协议:">
          <el-input v-model="ruleForm.iosPackageName" size="small" placeholder="请输入iOS Scheme协议"></el-input>
        </el-form-item>
        <el-form-item label="iOS 签名:">
          <el-input v-model="ruleForm.iosSign" size="small" placeholder="请输入iOS 签名"></el-input>
        </el-form-item>
        <el-form-item label="android 包名:">
          <el-input v-model="ruleForm.adrPackageName" size="small" placeholder="请输入android 包名"></el-input>
        </el-form-item>
        <el-form-item label="android 签名:">
          <el-input v-model="ruleForm.adrSign" size="small" placeholder="请输入android 签名"></el-input>
        </el-form-item>
        <el-form-item label="android下载地址:">
          <el-input v-model="ruleForm.downloadUrl" size="small" placeholder="请输入android下载地址"></el-input>
        </el-form-item>
        <el-form-item label="ios下载地址:">
          <el-input v-model="ruleForm.iosDownldUrl" size="small" placeholder="请输入ios下载地址"></el-input>
        </el-form-item>
        <el-form-item label="跳转地址:">
          <el-input v-model="ruleForm.jumpUrl" size="small" placeholder="请输入跳转地址"></el-input>
        </el-form-item>
        <el-form-item label="应用介绍:" prop="destext">
          <el-input type="textarea" :rows="2" size="small" placeholder="请输入应用介绍" v-model="ruleForm.destext"></el-input>
        </el-form-item>
        <el-form-item label="英文版介绍:">
          <el-input type="textarea" :rows="2" size="small" placeholder="请输入应用介绍" v-model="ruleForm.destextEn"></el-input>
        </el-form-item>
        <el-form-item label="是否自营" prop="ownType">
          <el-radio-group v-model="ruleForm.ownType">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="权重:">
          <el-input-number v-model="ruleForm.position" size="small" :min="0"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="determine" size="small">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog :title="`应用 ${ruleForm.appName} 的详情`" :visible.sync="dialogFormVisibleView">
      <el-form :inline="true" class="demo-form-inline" label-width="130px">
        <el-form-item label="名称:">{{ruleForm.appName}}</el-form-item>
        <el-form-item label="英文版名称:">{{ruleForm.appNameEn}}</el-form-item>
        <el-form-item label="应用图标:">
          <img v-if="!ruleForm.appIcon.indexOf('http')" :src="ruleForm.appIcon"
               style="max-width:100%; max-height: 100px;" alt="图标存储地址">
          <span v-if="ruleForm.appIcon.indexOf('http')">{{ruleForm.appIcon}}</span>
        </el-form-item>
        <el-form-item label="商户类型:">{{ruleForm.transferTypeName}}</el-form-item>
        <el-form-item label="APPID:">{{ruleForm.appId}}</el-form-item>
        <el-form-item label="支付通知Url:">{{ruleForm.notifyUrl}}</el-form-item>
        <el-form-item label="回调地址:">{{ruleForm.hookInjectUrl}}</el-form-item>
        <el-form-item label="ios版本号:">{{ruleForm.iosVersion}}</el-form-item>
        <el-form-item label="android版本号:">{{ruleForm.adrVersion}}</el-form-item>
        <el-form-item label="iOS Scheme协议:">{{ruleForm.iosPackageName}}</el-form-item>
        <el-form-item label="iOS 签名:">{{ruleForm.iosSign}}</el-form-item>
        <el-form-item label="android 签名:">{{ruleForm.adrSign}}</el-form-item>
        <el-form-item label="android 包名:">{{ruleForm.adrPackageName}}</el-form-item>
        <el-form-item label="android下载地址:">{{ruleForm.downloadUrl}}</el-form-item>
        <el-form-item label="ios下载地址:">{{ruleForm.iosDownldUrl}}</el-form-item>
        <el-form-item label="跳转地址:">{{ruleForm.jumpUrl}}</el-form-item>
        <el-form-item label="是否自营:">{{ruleForm.ownType?'是':'否'}}</el-form-item>
        <el-form-item label="应用介绍:">{{ruleForm.destext}}</el-form-item>
        <el-form-item label="英文版介绍:">{{ruleForm.destextEn}}</el-form-item>
        <el-form-item label="权重:">{{ruleForm.position}}</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleView = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>

</style>
<script>
  export default {
    name: 'created',
    data() {
      return {
        listData: {
          total: null,
          list: [],
        },
        pageNum: 1,
        pageSize: 20,
        dialogTitle: '创建应用',
        dialogFormVisible: false,
        dialogFormVisibleView: false,
        ruleForm: {
          appid: "",
          phone: "",
          appName: "",
          appNameEn:"",
          appIcon: "",
          notifyUrl: "",
          hookInjectUrl: "",
          iosVersion: "",
          adrVersion: "",
          destext: "",
          destextEn: "",
          jumpUrl: "",
          iosPackageName: "",
          iosSign:"",
          adrSign:"",
          adrPackageName: "",
          downloadUrl: "",
          iosDownldUrl: "",
          transferTypeId: '',
          ownType: 1,
          position: 0,
        },
        server_path: "",
        rules: {
          transferTypeId: [
            { required: true, message: '请选择商户类型', trigger: 'change' }
          ],
          appid: [
            { required: true, message: '请输入APPID', trigger: 'blur' }
          ],
          appName: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          appIcon: [
            { required: true, message: '请输入应用图标地址', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入商户手机号', trigger: 'blur' }
          ],
          iosVersion: [
            { required: true, message: '请输入ios版本号', trigger: 'blur' }
          ],
          adrVersion: [
            { required: true, message: '请输入android版本号', trigger: 'blur' }
          ],
          destext: [
            { required: true, message: '请输入应用介绍', trigger: 'blur' }
          ],
          ownType: [
            { required: true, message: '请选择是否自营', trigger: 'blur' }
          ],
        },
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
        }
      };
    },
    methods: {
      resetForm() {
        this.ruleForm = {
          appid: "",
          phone: "",
          appName: "",
          appIcon: "",
          notifyUrl: "",
          hookInjectUrl: "",
          iosVersion: "",
          adrVersion: "",
          destext: "",
          jumpUrl: "",
          iosPackageName: "",
          adrPackageName: "",
          downloadUrl: "",
          iosDownldUrl: "",
          transferTypeId: '',
          ownType: 1,
          appNameEn:"",
          iosSign:"",
          adrSign:"",
          destextEn: "",
          position: 0,
        };
        this.$refs.ruleForm && this.$refs.ruleForm.resetFields(); // 重置query的数据
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
      upload(response, file, fileList) {
        this.ruleForm.appIcon = response.result.urls[0]
      },
      addCreate() {
        this.resetForm();
        this.dialogFormVisible = true;
        this.dialogTitle = '创建应用';
        this.getTransferTypeInfoList();
      },
      modification(data) {
        this.resetForm();
        this.dialogFormVisible = true;
        this.ruleForm = JSON.parse(JSON.stringify(data));
        this.currentForm = JSON.parse(JSON.stringify(data));
        this.ruleForm.appid = data.appId;
        this.currentForm.appid = data.appId;
        this.dialogTitle = `修改 ${this.ruleForm.appName} 应用`;
        this.getTransferTypeInfoList();
      },
      determine() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (this.ruleForm.id) {
              Object.entries(this.ruleForm).forEach(([key, value]) => {
                if (value != this.currentForm[key] && !value) {
                  this.ruleForm[key] = 'empty';
                }
              })
              this.$http.post("wallet/backmgr/thirdAppInfo/updateThirdAppInfo.do", this.ruleForm).then((res) => {
                this.dialogFormVisible = false;
                this.resetForm();
                this.$notify({
                  title: '成功',
                  message: `修改 ${ this.ruleForm.appName} 应用成功`,
                  type: 'success'
                });
                this.getThirdAppInfoList();
              })
            } else {
              this.$http.post("wallet/backmgr/thirdAppInfo/createThirdAppInfo.do", this.ruleForm).then((res) => {
                this.dialogFormVisible = false;
                this.resetForm();
                this.$notify({
                  title: '成功',
                  message: `创建 ${ this.ruleForm.appName} 应用成功`,
                  type: 'success'
                });
                this.pageNum = 1;
                this.getThirdAppInfoList();
              })
            }
          }
        })
      },
      getTransferTypeInfoList() {
        if (!this.transferTypeInfoList.length) {
          this.$http.post("wallet/backmgr/transferType/getTransferTypeInfoList.do", {
            version: '1.0.0',
            plat: 'web'
          }).then((res) => {
            const date = res.result.list.list;
            date.forEach((item) => {
              item.label = item.transferTypeName;
              item.value = item.id;
            });
            this.transferTypeInfoList = date;
          })
        }
      }
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
