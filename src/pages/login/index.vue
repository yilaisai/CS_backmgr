/**
*  Created by   阿紫
*  On  2018/5/28
*  Content
*/

<template>
  <div class="login">
    <div class="content">
      <img src="@/assets/login_logo.png" alt="">
      <p class="title">Sacbox后台管理系统</p>
      <el-form :model="postObj" :rules="rules" ref="postObj"
               label-width="0px" class="demo-ruleForm">
        <div class="form">
          <el-row class="input-wrap">
            <el-col :span="24">
              <el-form-item label="" prop="username">
                <el-input placeholder="请输入用户名" v-model="postObj.username" clearable>
                  <img slot="prefix" class="icon" src="@/assets/Group.png" alt="">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="input-wrap">
            <el-col :span="24">
              <el-form-item label="" prop="password">
                <el-input placeholder="请输入密码" v-model="postObj.password" type="password" clearable>
                  <img slot="prefix" class="icon" src="@/assets/password.png" alt="">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="input-wrap">
            <el-col :span="16">
              <el-form-item label="" prop="validateCode">
                <el-input placeholder="请输入验证码" v-model="postObj.validateCode" clearable>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="">
              <img @click="getImgCode" ref="imgcode" class="imgcode"
                   :src="SERVER_PATH +'/wallet/backmgr/sysuser/open/getValidateCode'" alt="验证码">
            </el-col>
          </el-row>
        </div>
      </el-form>
      <el-button type="primary"
                 class="login-btn"
                 ref="loginbtn"
                 @click="login" autofocus native-type="submit">
        登录
      </el-button>
    </div>
  </div>
</template>

<script>
  import Md5 from '../../../static/js/md5';

  export default {
    name: 'login',
    data() {
      return {
        postObj: {
          username: '',
          md5Pwd: '',
          validateCode: '',
          password: '',
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          validateCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
        },
        SERVER_PATH: '',
      };
    },
    methods: {
      getImgCode() {
        this.$refs.imgcode.src = `${SERVER_PATH}/wallet/backmgr/sysuser/open/getValidateCode?${Math.random()}`;
      },
      login() {
        this.$refs.postObj.validate((valid) => {
          if (valid) {
            const postObj = {
              username: this.postObj.username,
              md5Pwd: Md5(this.postObj.password),
              validateCode: this.postObj.validateCode,
              version: '1.0.0',
              plat: 'web',
            };
            this.$http.post('wallet/backmgr/sysuser/open/sysUserLogin', postObj).then((res) => {
              const { token, userName, roleName, menuUrls } = res.result;
              const { msg } = res;
              localStorage.setItem('wallet_token', token);
              localStorage.setItem('wallet_username', userName);
              localStorage.setItem('wallet_roleName', roleName);
              localStorage.setItem('wallet_menuUrls', JSON.stringify(menuUrls));
              this.$message({
                message: msg,
                type: 'success',
              });
              setTimeout(() => {
                this.$router.replace('/');
              }, 500);
            }).catch((res) => {
              this.getImgCode(); // 重新获取图片验证码
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    mounted() {
      this.postObj.validateCode = '';
      this.getImgCode();
    },
    created() {
      this.SERVER_PATH = SERVER_PATH;
    },
  };
</script>

<style lang="less">
  .login {
    /*background: #F0F3F7;*/
    background: url('~@/assets/bg.png') no-repeat 10% 20%,
    url('~@/assets/bg2.png') no-repeat 86% 24%,
    url('~@/assets/bg3.png') no-repeat 10% 89%,
    url('~@/assets/bg4.png') no-repeat 89% 89%;
    background-size: 253px, 66px, 81px, 150px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .content {
      width: 368px;
      text-align: center;
      img.icon {
        width: 14px;
        height: 16px;
      }
      .el-col-8 {
        text-align: right;
      }
      img.imgcode {
        width: 100px;
        height: 40px;
        border-radius: 3px;
      }
      .el-input__prefix {
        top: 3px;
        left: 10px;
      }
      img {
        width: 160px;
        height: 36px;
        display: inline-block;
      }
      p {
        color: #B4B4B4;
        font-size: 18px;
      }
      .login-btn {
        width: 100%;
      }
    }
  }
</style>
