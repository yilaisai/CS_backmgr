/**
*  Created by   阿紫
*  On  2018/10/22
*  Content
*/
<template>
  <div class='node-modify'>

    <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="150px">
      <el-form-item label="节点名称:" prop="teamName">
        <span class="tips tips_input">{{ruleForm.teamName?ruleForm.teamName.length:0}}/15</span>
        <el-input size="small" v-model="ruleForm.teamName" width="100%"
                  placeholder="请输入节点名称"></el-input>
      </el-form-item>
      <el-form-item label="节点简介:" prop="nodeIntroduce" style="position: relative;">
        <span class="tips tips_textarea">{{ruleForm.nodeIntroduce?ruleForm.nodeIntroduce.length:0}}/500</span>
        <el-input size="small" type="textarea" :rows="3" v-model="ruleForm.nodeIntroduce" width="100%"
                  maxlength="50"
                  placeholder="请输入节点简介"></el-input>
      </el-form-item>
      <el-form-item label="Sacbox账号:" prop="sacBoxAccount">
        <el-input size="small" v-model="ruleForm.sacBoxAccount" width="100%"
                  placeholder="请输入Sacbox账号"></el-input>
      </el-form-item>
      <el-form-item
        size="small"
        prop="email"
        label="邮箱:"
        :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
      >
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <sac-input ref="offcialurl" v-model="ruleForm.officialAddr" label="官网地址" prop="offcialurl"></sac-input>
      <el-form-item label="logo:">
        <el-upload
          v-loading="loading"
          name="files"
          class="avatar-uploader"
          :action="server_path + 'wallet/util/open/uploadFile.do'"
          :show-file-list="false"
          :on-success="upload"
          :before-upload="logoUpload"
          :data="{type:'supersac_img'}">
          <img v-show="ruleForm.logoUrl" :src="ruleForm.logoUrl" class="avatar">
          <i v-show="!ruleForm.logoUrl" class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="团队介绍:">
        <el-input size="small" type="textarea" :rows="3" v-model="ruleForm.teamIntroduce" width="100%"
                  maxlength="50"
                  placeholder="请输入团队介绍或上传团队介绍文档"></el-input>
      </el-form-item>
      <el-form-item label="上传团队介绍:">
        <span class="appIcon">只能上传 pdf/word/ppt/jpg/png文件，且不超过 3M</span>
        <a v-show="isTeamDoc" target="_blank" :href="ruleForm.teamIntroduceUrl" class="el-upload-list__item-name">
          <i class="el-icon-document"></i>{{teamIntroduceUrl}}
        </a>
        <img v-show="isTeamImg" v-viewer :src="ruleForm.teamIntroduceUrl" class="introduce">
        <el-upload
          name="files"
          class="upload-demo"
          v-loading="uploadTeamLoading"
          :action="server_path + 'wallet/util/open/uploadFile.do'"
          :show-file-list="false"
          :on-success="uploadTeamIntroduce"
          :before-upload="teamUpload"
          :data="{type:'supersac_doc'}">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>

      </el-form-item>
      <el-form-item label="运营及宣传方案:">
        <el-input size="small" type="textarea" :rows="3" v-model="ruleForm.marketingIntroduce	" width="100%"
                  maxlength="50"
                  placeholder="请输入运营及宣传方案或上传运营及宣传方案文档"></el-input>
      </el-form-item>
      <el-form-item label="上传运营及宣传方案:">
        <span class="appIcon">只能上传 pdf/word/ppt/jpg/png 文件，且不超过 3M</span>
        <a v-show="isMarketDoc" target="_blank" :href="ruleForm.marketingIntroduceUrl"
           class="el-upload-list__item-name">
          <i class="el-icon-document"></i>{{marketingIntroduceUrl}}
        </a>
        <img v-show="isMarketImg" v-viewer :src="ruleForm.marketingIntroduceUrl" class="introduce">
        <el-upload
          name="files"
          class="upload-demo"
          v-loading="uploadIntroduceLoading"
          :action="server_path + 'wallet/util/open/uploadFile.do'"
          :show-file-list="false"
          :before-upload="introduceUpload"
          :on-success="uploadIntroduceUrl"
          :data="{type:'supersac_doc'}">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <div class="dialog-footer">
      <el-button @click="$router.go(-1)" size="small">取 消</el-button>
      <el-button type="primary" @click="determine" size="small">确 定</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: "node-modify",
    data() {
      return {
        server_path: "",
        currentForm: {},
        ruleForm: {
          teamName: '',
          sacBoxAccount: '',
          logoUrl: '',
          email: '',
          nodeIntroduce: '',
          teamIntroduce: '',
          teamIntroduceUrl: '',
          officialAddr: '',
          marketingIntroduce: '',
          marketingIntroduceUrl: '',
        },
        teamIntroduceUrl: '',
        isTeamImg: false,
        isTeamDoc: false,
        isMarketImg: false,
        isMarketDoc: false,
        loading: false,
        uploadTeamLoading: false,
        uploadIntroduceLoading: false,
        marketingIntroduceUrl: '',
        rules: {
          teamName: [
            { required: true, message: '请输入节点名称', trigger: 'blur' }
          ],
          sacBoxAccount: [
            { required: true, message: '请输入Sacbox账号', trigger: 'blur' }
          ],
          nodeIntroduce: [
            { required: true, message: '请输入节点简介', trigger: 'blur' }
          ]
        },
      };
    },
    methods: {
      resetForm() {
        this.ruleForm = {
          teamName: '',
          sacBoxAccount: '',
          logoUrl: '',
          email: '',
          nodeIntroduce: '',
          teamIntroduce: '',
          teamIntroduceUrl: '',
          officialAddr: '',
          marketingIntroduce: '',
          marketingIntroduceUrl: '',
        };
        this.isTeamImg = false;
        this.isTeamDoc = false;
        this.isMarketImg = false;
        this.isMarketDoc = false;
        this.teamIntroduceUrl = '';
        this.marketingIntroduceUrl = '';
        this.$refs.ruleForm && this.$refs.ruleForm.resetFields(); // 重置query的数据
      },
      upload(response, file, fileList) {
        this.ruleForm.logoUrl = response.result.urls[0];
        this.loading = false;
      },
      logoUpload() {
        this.loading = true;
      },
      uploadTeamIntroduce(response, file, fileList) {
        this.ruleForm.teamIntroduceUrl = response.result.urls[0];
        this.teamIntroduceUrl = file.name;
        if (file.name.indexOf('.jpg') > -1 || file.name.indexOf('.jpeg') > -1 || file.name.indexOf('.png') > -1) {
          this.isTeamImg = true;
          this.isTeamDoc = false;
        } else {
          this.isTeamImg = false;
          this.isTeamDoc = true;
        }
        this.uploadTeamLoading = false;
      },
      teamUpload(file){
        this.beforeUpload(file);
        this.uploadTeamLoading = true;
      },
      uploadIntroduceUrl(response, file, fileList) {
        this.ruleForm.marketingIntroduceUrl = response.result.urls[0];
        this.marketingIntroduceUrl = file.name;
        if (file.name.indexOf('.jpg') > -1 || file.name.indexOf('.jpeg') > -1 || file.name.indexOf('.png') > -1) {
          this.isMarketImg = true;
          this.isMarketDoc = false;
        } else {
          this.isMarketImg = false;
          this.isMarketDoc = true;
        }
        this.uploadIntroduceLoading = false;
      },
      introduceUpload(file){
        this.beforeUpload(file);
        this.uploadIntroduceLoading = true;
      },
      beforeUpload(file) {
        // 只能上传 pdf/word/ppt/jpg/png 文件，且不超过 3M
        const type = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf', 'application/msword', 'application/vnd.ms-powerpoint', 'image/jpeg', 'image/png']
        const isJPG = type.includes(file.type)
        const isLt3M = file.size / 1024 / 1024 < 3; // 小于3M;

        if (!isJPG) {
          this.$message.error('上传文件类型只能是 pdf/word/ppt/jpg/png  格式!');
        }
        if (!isLt3M) {
          this.$message.error('上传文件类型大小不能超过 3M!');
        }
        return isJPG && isLt3M;
      },
      determine() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (this.ruleForm.teamId) {
              Object.entries(this.ruleForm).forEach(([key, value]) => {
                if (value != this.currentForm[key] && !value) {
                  this.ruleForm[key] = 'empty';
                }
              })
              this.$http.post("supernode/backmgr/team/detail/update", this.ruleForm).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `修改 ${this.ruleForm.teamName} 节点成功`,
                  type: 'success'
                });
                this.resetForm();
                this.$router.go(-1);
              })
            } else {
              this.$http.post("supernode/backmgr/team/detail/add", this.ruleForm).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `创建 ${ this.ruleForm.teamName} 节点成功`,
                  type: 'success'
                });
                this.resetForm();
                this.pageNum = 1;
                this.$router.go(-1);
              })
            }
          }
        })
      }
    },
    activated() {
      this.server_path = SERVER_PATH;
      this.resetForm();
      const res = this.$route.params;
      if (res.teamId) {
        this.currentForm = JSON.parse(JSON.stringify(res));
        Object.entries(res).forEach(([key, value]) => {
          if (this.ruleForm[key] == '') {
            this.ruleForm[key] = value || '';
          }
        });
        this.ruleForm.teamId = res.teamId;
        this.teamIntroduceUrl = res.teamIntroduceUrl ? res.teamIntroduceUrl.split('supersac_doc/')[1] : '';
        this.marketingIntroduceUrl = res.marketingIntroduceUrl ? res.marketingIntroduceUrl.split('supersac_doc/')[1] : '';
        if (this.teamIntroduceUrl) {
          if (this.teamIntroduceUrl.indexOf('.jpg') > -1 || this.teamIntroduceUrl.indexOf('.jpeg') > -1 || this.teamIntroduceUrl.indexOf('.png') > -1) {
            this.isTeamImg = true;
            this.isTeamDoc = false;
          } else {
            this.isTeamImg = false;
            this.isTeamDoc = true;
          }
        }

        if (this.marketingIntroduceUrl) {
          if (this.marketingIntroduceUrl.indexOf('.jpg') > -1 || this.marketingIntroduceUrl.indexOf('.jpeg') > -1 || this.marketingIntroduceUrl.indexOf('.png') > -1) {
            this.isMarketImg = true;
            this.isMarketDoc = false;
          } else {
            this.isMarketImg = false;
            this.isMarketDoc = true;
          }
        }
      }
    }
  };
</script>
<style lang="less">
  .node-modify {
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      margin-left: 10px;
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
    .tips {
      position: absolute;
      color: #b8b8b8;
    }
    .tips_input {
      top: 0px;
      right: 10px;
      z-index: 40;
    }
    .tips_textarea {
      bottom: -10px;
      right: 10px;
    }
    .appIcon {
      margin-left: 5px;
      font-size: 12px;
      color: red;
    }
    .introduce {
      height: 80px;
      display: block;
    }
    .el-upload-list__item-name {
      text-decoration: none
    }
    .dialog-footer {
      margin: 40px auto;
      width: 150px;
    }
    .el-form--inline .el-form-item__content {
      width: 350px;
    }
  }
</style>
