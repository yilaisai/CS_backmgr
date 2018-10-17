/**
*  Created by   阿紫
*  On  2018/10/17
*  Content
*/
<template>
  <div class='third-modify'>
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
    <el-button @click="router.go(-1)" size="small">取 消</el-button>
    <el-button type="primary" @click="determine" size="small">确 定</el-button>
  </div>
</template>
<script>
  export default {
    name: "third-modify",
    data() {
      return {
        transferTypeInfoList: [],
        server_path: "",
        currentForm: {},
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
      },
      upload(response, file, fileList) {
        this.ruleForm.appIcon = response.result.urls[0]
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
                this.$router.go(-1);
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
                this.$router.go(-1);
              })
            }
          }
        })
      },

    },
    activated() {
      this.server_path = SERVER_PATH;
      this.resetForm();
      this.getTransferTypeInfoList();
      if (this.$route.param.id) {
        this.ruleForm = JSON.parse(JSON.stringify(data));
        this.currentForm = JSON.parse(JSON.stringify(data));
        this.ruleForm.appid = data.appId;
        this.currentForm.appid = data.appId;
      } else {

      }
    }
  };
</script>
<style lang="less">
  .modify {
  }
</style>
