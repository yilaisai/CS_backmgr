
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
        <el-form-item label="联系邮箱:" prop="email">
          <el-input v-model="ruleForm.email" size="small" placeholder="请输入联系邮箱"></el-input>
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
        <el-form-item label="联系邮箱:">{{ruleForm.email}}</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleView = false" size="small">取 消</el-button>
      </div>
    </el-dialog>

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
          email: '',
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
          email: [
            { required: true, message: '请输入联系邮箱', trigger: 'blur' }
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
        },
        dialogReasonVisibleView: false,
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
          email: '',
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
      passCheck(itemData,i) {
        console.log('itemData', itemData);
        const { appName, id } = itemData;
        let postData = {id}
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
      showNoPassCheck(data){
        console.log('data',data);
        this.dialogReasonVisibleView = true
        this.refuseData = data
      },
      upload(response, file, fileList) {
        this.ruleForm.appIcon = response.result.urls[0]
      },
      // 修改应用
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
      // 重新修改提交
      determine() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (this.ruleForm.id) {
              Object.entries(this.ruleForm).forEach(([key, value]) => {
                if (value != this.currentForm[key] && !value) {
                  this.ruleForm[key] = 'empty';
                }
              })
              this.$http.post("/wallet/backmgr/thirdAppInfo/updateThirdAppInfo.do", this.ruleForm).then((res) => {
                this.dialogFormVisible = false;
                this.resetForm();
                this.$notify({
                  title: '成功',
                  message: `修改 ${ this.ruleForm.appName} 应用成功`,
                  type: 'success'
                });
                this.getThirdAppInfoList();
              })
            }
          }
        })
      },
      // 获取商户类型
      getTransferTypeInfoList() {
        if (!this.transferTypeInfoList.length) {
          this.$http.post("wallet/backmgr/transferType/getTransferTypeInfoList.do", {
            version: '1.0.0',
            plat: 'web'
          }).then((res) => {
            const date = res.result.list.list;
            date.forEach((item) => {
              item.label = item.transferTypeName;
              item.value = (item.id).toString();
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
