/**
*  Created by   阿紫
*  On  2018/10/17
*  Content
*/
<template>
  <div class='third-modify'>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :inline="true" label-width="150px">
      <el-form-item label="应用名称:" prop="appName">
        <el-input v-model="ruleForm.appName" size="small" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="应用英文名称:" prop="appNameEn">
        <el-input v-model="ruleForm.appNameEn" size="small" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="应用属性介绍:" prop="appProp">
        <el-input v-model="ruleForm.appProp" size="small" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="应用属性英文介绍:" prop="appPropEn">
        <el-input v-model="ruleForm.appPropEn" size="small" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="商户手机号:" prop="phone" v-if="!ruleForm.id">
        <el-input v-model="ruleForm.phone" size="small" placeholder="请输入商户手机号"></el-input>
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
      <el-form-item label="iOS 版本号:">
        <el-input v-model="ruleForm.iosVersion" size="small" placeholder="请输入版本号"></el-input>
      </el-form-item>
      <el-form-item label="iOS Scheme协议:">
        <el-input v-model="ruleForm.iosPackageName" size="small" placeholder="请输入iOS Scheme协议"></el-input>
      </el-form-item>
      <el-form-item label="iOS Bundle Identifier:">
        <el-input v-model="ruleForm.iosSign" size="small" placeholder="请输入iOS 签名"></el-input>
      </el-form-item>
      <el-form-item label="iOS 包大小:">
        <el-input v-model="ruleForm.iosSize" size="small" placeholder="请输入iOS 包大小"></el-input>
      </el-form-item>
      <el-form-item label="iOS 下载地址:">
        <el-input v-model="ruleForm.iosDownldUrl" size="small" placeholder="请输入ios下载地址"></el-input>
      </el-form-item>
      <el-form-item label="android 版本号:">
        <el-input v-model="ruleForm.adrVersion" size="small" placeholder="请输入版本号"></el-input>
      </el-form-item>
      <el-form-item label="android 包名:">
        <el-input v-model="ruleForm.adrPackageName" size="small" placeholder="请输入android 包名"></el-input>
      </el-form-item>
      <el-form-item label="android 包大小:">
        <el-input v-model="ruleForm.adrSize" size="small" placeholder="请输入android 包大小"></el-input>
      </el-form-item>
      <el-form-item label="android 签名:">
        <el-input v-model="ruleForm.adrSign" size="small" placeholder="请输入android 签名"></el-input>
      </el-form-item>
      <el-form-item label="android下载地址:">
        <el-input v-model="ruleForm.downloadUrl" size="small" placeholder="请输入android下载地址"></el-input>
      </el-form-item>

      <el-form-item label="跳转地址:">
        <el-input v-model="ruleForm.jumpUrl" size="small" placeholder="请输入跳转地址"></el-input>
      </el-form-item>
      <el-form-item label="应用介绍:" prop="destext">
        <el-button type="primary" size="small" @click.native="destextHandle()">添加</el-button>
      </el-form-item>
      <el-form-item label="应用英文版介绍:" prop="destextEn">
        <el-button type="primary" size="small" @click.native="destextHandle('en')">添加</el-button>
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
      <el-form-item label="应用图标:" prop="appIcon">
        <el-input v-model="ruleForm.appIcon" size="small" placeholder="请输入应用图标地址">
        </el-input>
        <span class="appIcon">图标尺寸：120*120</span>
        <el-upload
          name="files"
          class="avatar-uploader"
          :action="server_path + 'wallet/util/open/uploadFile.do'"
          :show-file-list="false"
          :on-success="upload"
          :data="{type:'img'}">
          <img v-if="ruleForm.appIcon" :src="ruleForm.appIcon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="应用预览:" prop="appPreviewPics" class="appPreviewPics">
        <el-input v-model="ruleForm.appPreviewPics" @change="getAppPreviewPics" size="small" placeholder="多个预览地址以逗号隔开">
        </el-input>
        <span class="appIcon">预览尺寸：横：508*284 竖：320*569，最多上传4张</span>
        <el-upload
          multiple
          name="files"
          :action="server_path + 'wallet/util/open/uploadFile.do'"
          :data="{type:'img'}"
          :on-success="uploadSuccess"
          :file-list="fileList"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :before-upload="eachFile"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
              <el-form-item label=" " prop="disclaimerType">

          <el-checkbox label="是否免责声明" name="type" v-model="ruleForm.disclaimerType"></el-checkbox>

      </el-form-item>
    </el-form>
    <div class="determine">
      <el-button @click="$router.go(-1)" size="small">取 消</el-button>
      <el-button type="primary" @click="determine" size="small">确 定</el-button>
    </div>

    <el-dialog :title="destextDialogTitle" :visible.sync="destextDialogVisible" :close-on-click-modal="false">
      <quill-editor v-model.trim="destext" :options="editorOption" ref="myQuillEditor"></quill-editor>
      <div slot="footer" class="dialog-footer">
        <el-button @click="destextDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="destextDetermine" size="small">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'
  import Quill from 'quill'

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
          appNameEn: "",
          appProp: "",
          appPropEn: "",
          appIcon: "",
          appPreviewPics: "",
          notifyUrl: "",
          hookInjectUrl: "",
          iosVersion: "",
          iosSize: "",
          adrVersion: "",
          destext: "",
          destextEn: "",
          jumpUrl: "",
          iosPackageName: "",
          iosSign: "",
          adrSign: "",
          adrSize: "",
          adrPackageName: "",
          downloadUrl: "",
          iosDownldUrl: "",
          transferTypeId: '',
          ownType: 1,
          position: 0,
          disclaimerType:false
        },
        rules: {
          transferTypeId: [
            { required: true, message: '请选择商户类型', trigger: 'change' }
          ],
          appid: [
            { required: true, message: '请输入APPID', trigger: 'blur' }
          ],
          appName: [
            { required: true, message: '请输入应用名称', trigger: 'blur' }
          ],
          appNameEn: [
            { required: true, message: '请输入应用英文名称', trigger: 'blur' }
          ],
          appProp: [
            { required: true, message: '请输入应用属性介绍', trigger: 'blur' }
          ],
          appPropEn: [
            { required: true, message: '请输入应用属性英文介绍', trigger: 'blur' }
          ],
          appIcon: [
            { required: true, message: '请输入应用图标地址', trigger: 'blur' }
          ],
          appPreviewPics: [
            { required: true, message: '请输入应用预览地址', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入商户手机号', trigger: 'blur' }
          ],
          destext: [
            { required: true, message: '请输入应用介绍', trigger: 'blur' }
          ],
          destextEn: [
            { required: true, message: '请输入应用英文介绍', trigger: 'blur' }
          ],
          ownType: [
            { required: true, message: '请选择是否自营', trigger: 'blur' }
          ],
        },
        dialogVisible: false,
        dialogImageUrl: '',
        maxCount: 4, // 最大上传图片数量
        fileList: [],
        appPreviewPics: [],
        destextDialogVisible: false,
        destextDialogTitle: '',
        destext: '',
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic'],        // toggled buttons
            ]
          }
        }
      };
    },
    components: {
      quillEditor,
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    methods: {
      resetForm() {
        this.destext = '';
        this.ruleForm = {
          appid: "",
          phone: "",
          appName: "",
          appNameEn: "",
          appProp: "",
          appPropEn: "",
          appIcon: "",
          appPreviewPics: "",
          notifyUrl: "",
          hookInjectUrl: "",
          iosVersion: "",
          iosSize: "",
          adrVersion: "",
          destext: "",
          destextEn: "",
          jumpUrl: "",
          iosPackageName: "",
          iosSign: "",
          adrSign: "",
          adrSize: "",
          adrPackageName: "",
          downloadUrl: "",
          iosDownldUrl: "",
          transferTypeId: '',
          ownType: 1,
          position: 0,
          disclaimerType:false
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
        this.ruleForm.appIcon = response.result.urls[0];
      },
      uploadSuccess(response, file, fileList) {
        if (this.ruleForm.appPreviewPics) {
          this.ruleForm.appPreviewPics += ',' + response.result.urls[0];
        } else {
          this.ruleForm.appPreviewPics = response.result.urls[0];
        }
      },
      eachFile(file, fileList) {
        if (!file) return false;
        if (this.appPreviewPics.length > 3) return false;
        this.appPreviewPics.push({
          file
        });
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleRemove(file, fileList) {
        if (this.appPreviewPics.length > fileList.length) {
          let appPreviewPics = this.ruleForm.appPreviewPics.split(',');
          appPreviewPics.forEach((item, index) => {
            if (this.fileList.length) {
              if (item == file.url) {
                appPreviewPics.splice(index, 1);
                this.fileList.splice(index, 1);
              }
            } else {
              if (item == file.response.result.urls[0]) {
                appPreviewPics.splice(index, 1);
              }
            }
          })
          this.ruleForm.appPreviewPics = appPreviewPics.join(',');
          this.appPreviewPics.pop();
        }
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
              this.ruleForm.disclaimerType=this.ruleForm.disclaimerType==true?1:0
              this.$http.post("wallet/backmgr/thirdAppInfo/updateThirdAppInfo.do", this.ruleForm).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `修改 ${this.ruleForm.appName} 应用成功`,
                  type: 'success'
                });
                this.resetForm();
                this.$router.go(-1);
              })
            } else {
              this.ruleForm.disclaimerType=this.ruleForm.disclaimerType==true?1:0
              this.$http.post("wallet/backmgr/thirdAppInfo/createThirdAppInfo.do", this.ruleForm).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `创建 ${ this.ruleForm.appName} 应用成功`,
                  type: 'success'
                });
                this.resetForm();
                this.pageNum = 1;
                this.$router.go(-1);
              })
            }
          }
        })
      },
      destextHandle(language = '') {
        if (language == 'en') {
          this.destextDialogTitle = '添加应用英文版介绍';
          this.destext = this.ruleForm.destextEn.replace(/<\/?[^>]*>/g, "");
        } else {
          this.destextDialogTitle = '添加应用介绍';
          this.destext = this.ruleForm.destext.replace(/<\/?[^>]*>/g, "");
        }
        this.destextDialogVisible = true;
      },
      destextDetermine() {
        if (this.destextDialogTitle.indexOf('应用介绍') > -1) {
          this.ruleForm.destext = this.destext.replace(/<\/?[^>]*>/g, "");
        } else {
          this.ruleForm.destextEn = this.destext.replace(/<\/?[^>]*>/g, "");
        }
        this.destextDialogVisible = false;
      },
      getAppPreviewPics(e) {
        this.appPreviewPics = e.split(',') || [];
        this.appPreviewPics.forEach((item, index) => {
          if (!this.fileList.some(itemList => item == itemList.url)) {
            this.fileList.push({
              url: item
            })
          }
        })
      }
    },
    activated() {
      this.server_path = SERVER_PATH;
      this.resetForm();
      this.getTransferTypeInfoList();
      this.fileList = [];
      const res = this.$route.params;
      if (this.$route.params.id) {
        this.ruleForm = JSON.parse(JSON.stringify(res));
        this.currentForm = JSON.parse(JSON.stringify(res));
        this.ruleForm.appid = res.appId;
        this.currentForm.appid = res.appId;
        this.appPreviewPics = res.appPreviewPics ? res.appPreviewPics.split(',') : [];
        this.ruleForm.disclaimerType=this.ruleForm.disclaimerType==1?true:false
        this.appPreviewPics.forEach((item, index) => {
          this.fileList.push({
            url: item
          })
        })
      }
    }
  };
</script>
<style lang="less">
  .third-modify {
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
    }
    .avatar {
      width: 80px;
      height: 80px;
      display: block;
    }
    .appIcon {
      margin-left: 5px;
      font-size: 12px;
      color: red;
    }
    .el-upload--picture-card {
      height: 67.5px;
      width: 127px;
      line-height: 67.5px;
    }
    .el-upload-list__item {
      height: 67.5px;
      width: 127px;
      line-height: 67.5px;
    }
    .appPreviewPics {
      .el-form-item__content {
        width: 540px;
      }
    }
    .determine {
      height: 32px;
      margin: 10px auto 40px auto;
      width: 300px;
    }
  }
</style>
