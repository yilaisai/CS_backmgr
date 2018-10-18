/**
*  Created by   阿紫
*  On  2018/8/21
*  Content
*/
<template>
  <div class='identity-modify'>
    <el-row style="margin-bottom: 30px;">
      <el-col :span="20" style="text-align: right;">
        <el-button class="refuse-btn" type="danger" size="small" @click.native="saveData()">保存
        </el-button>
        <el-button size="small" type="primary" @click.native="goBack()">取消
        </el-button>
      </el-col>
    </el-row>
    <el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm" label-width="140px">
      <el-form-item label="账号:">
        <span>{{details.phone}}</span>
      </el-form-item>
      <el-form-item label="姓名:" prop="realName">
        <el-input v-model="ruleForm.realName" size="small" clearable placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码:" prop="cardNo">
        <el-input v-model="ruleForm.cardNo" size="small" clearable placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="身份证正面照片:" prop="frontUrl">
            <div slot="tip" class="attention">*证件照在有效期内，照片文字清晰可见，图片格式支持jpg/png</div>
            <el-upload
              class="avatar-uploader"
              :action="server_path + 'wallet/util/open/uploadFile.do'"
              name="files"
              :data="upData"
              :show-file-list="false"
              :on-success="frontUrlSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="ruleForm.frontUrl" :src="ruleForm.frontUrl">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证反面照片:" prop="backUrl">
            <div slot="tip" class="attention">*证件照在有效期内，照片文字清晰可见，图片格式支持jpg/png</div>
            <el-upload
              class="avatar-uploader"
              :action="server_path + 'wallet/util/open/uploadFile.do'"
              name="files"
              :data="upData"
              :show-file-list="false"
              :on-success="backUrlSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="ruleForm.backUrl" :src="ruleForm.backUrl" class="right-img">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="手持照片:" prop="antiUrl">
        <div slot="tip" class="attention">*证件照在有效期内，照片文字清晰可见，图片格式支持jpg/png</div>
        <el-upload
          class="avatar-uploader"
          :action="server_path + 'wallet/util/open/uploadFile.do'"
          name="files"
          :data="upData"
          :show-file-list="false"
          :on-success="antiUrlSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="ruleForm.antiUrl" :src="ruleForm.antiUrl" class="right-img">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: "identity-modify",
    data() {
      return {
        details: {},
        ruleForm: {
          userId: '',
          realName: '',
          cardNo: '',
          frontUrl: '',
          backUrl: '',
          antiUrl: ''
        },
        server_path: "",
        rules: {
          realName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          cardNo: [
            { required: true, message: '请输入身份证号', trigger: 'blur' },
          ],
          frontUrl: [
            { required: true, message: '身份证正面照片必须上传', trigger: 'blur' },
          ],
          backUrl: [
            { required: true, message: '身份证反面照片必须上传', trigger: 'blur' },
          ],
          antiUrl: [
            { required: true, message: '手持照片必须上传', trigger: 'blur' },
          ],
        },
        upData: {
          userInfo: 'img',
          type: 'userInfo'
        },
      };
    },
    methods: {
      resetForm() {
        this.ruleForm.contractadres = '';
        this.$refs.ruleForm.resetFields();
      },
      saveData() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            const ruleForm = JSON.parse(JSON.stringify(this.ruleForm));
            let data = JSON.parse(JSON.stringify(this.$route.params));
            this.$http.post("wallet/backmgr/user/updateUserInfo.do", ruleForm).then((res) => {
              this.$notify({
                title: '成功',
                message: `${this.details.phone} 修改成功`,
                type: 'success'
              });
              data.cardFrontUrl = ruleForm.frontUrl;
              data.cardBackUrl = ruleForm.backUrl;
              data.antiMoneyUrl = ruleForm.antiUrl;
              data.realName = ruleForm.realName;
              data.cardNo = ruleForm.cardNo;
              setTimeout(() => {
                this.$router.push({
                  name: 'identityDetails',
                  params: data,
                })
              }, 1000)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      beforeAvatarUpload(file) {
        console.log('file.type', file.type);
        const isJPG = file.type == 'image/jpeg' || file.type == 'image/png';
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        return isJPG;
      },
      frontUrlSuccess(response, res, file) {
        this.ruleForm.frontUrl = response.result.urls[0]
      },
      backUrlSuccess(response, res, file) {
        this.ruleForm.backUrl = response.result.urls[0]
      },
      antiUrlSuccess(response, res, file) {
        this.ruleForm.antiUrl = response.result.urls[0]
      },
      goBack() {
        this.$router.push({
          name: 'identityDetails',
          params: this.$route.params,
        })
      },
    },
    activated() {
      this.resetForm();
      this.server_path = SERVER_PATH;
      if (this.$route.params.userId) {
        console.log(this.$route.params, 88);
        this.ruleForm.userId = this.$route.params.userId;
        this.ruleForm.realName = this.$route.params.realName;
        this.ruleForm.cardNo = this.$route.params.cardNo;
        this.ruleForm.frontUrl = this.$route.params.cardFrontUrl;
        this.ruleForm.backUrl = this.$route.params.cardBackUrl;
        this.ruleForm.antiUrl = this.$route.params.antiMoneyUrl;
        this.details = JSON.parse(JSON.stringify(this.ruleForm));
        this.details.phone = this.$route.params.phone;
      } else {
        this.$router.go(-1);
      }
    }
  };
</script>
<style lang="less">
  .identity-modify {
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      width: 400px;
      min-height: 178px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    img {
      max-width: 100%;
      max-height: 300px;
    }
  }
</style>
