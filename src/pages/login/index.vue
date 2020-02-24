/**
*  Created by   阿紫
*  On  2018/5/28
*  Content
*/

<template>
  <div class="login">
    <div class="content">
      <div class="left">
        <img src="@/assets/Proxima_logo.svg" class="left-logo">
        <p class="left-text">欢迎加入区块链<br/>现代货币运动</p>
        <img src="@/assets/login_lefg_img.png"  class="left-img">
        <p class="left-tips">版权所有 © 2019 proxima.com 保留所有权利</p>
      </div>
      <div class="right">
        <h5 class="right-title">Proxima客服后台管理系统</h5>
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
              <el-col :span="24">
                <el-form-item label="" prop="secret">
                  <el-input placeholder="请输入谷歌验证码" v-model="postObj.secret"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <el-button type="primary" class="login-btn" ref="loginbtn" @click="login" autofocus native-type="submit">登录</el-button>
      </div>
      <!-- <img class="logo" src="@/assets/logo_num22.png" alt="">
      <p class="title">NO.22后台管理系统</p>
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
            <el-col :span="24">
              <el-form-item label="" prop="secret">
                <el-input placeholder="请输入谷歌验证码" v-model="postObj.secret"  clearable>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <el-button type="primary"
                 class="login-btn"
                 ref="loginbtn"
                 @click="login" autofocus native-type="submit">
        登录
      </el-button> -->
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
          password: '',
          secret:''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          secret: [
            { required: true, message: '请输入谷歌验证码', trigger: 'blur' },
          ]
        },
        SERVER_PATH: '',
      };
    },
    methods: {
      login() {
        this.$refs.postObj.validate((valid) => {
          if (valid) {
            const postObj = {
              username: this.postObj.username,
              md5Pwd: Md5(this.postObj.password),
              version: '1.0.0',
              plat: 'web',
              secret:this.postObj.secret
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
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    mounted() {
    },
    created() {
      this.SERVER_PATH = SERVER_PATH;
    },
  };
</script>

<style lang="less">
  .login {
    /*background: #F0F3F7;*/
    // background: url('~@/assets/bg.png') no-repeat 10% 20%,
    // url('~@/assets/bg2.png') no-repeat 86% 24%,
    // url('~@/assets/bg3.png') no-repeat 10% 89%,
    // url('~@/assets/bg4.png') no-repeat 89% 89%;
    // background-size: 253px, 66px, 81px, 150px;
    background: url('~@/assets/login_bg.png') no-repeat center/100%;
    background-size: cover;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .content {
      width: 1128px;
      height:600px;
      display: flex;
      box-shadow:0px 10px 20px 0px rgba(0,74,145,0.7);
      border-radius: 8px;
      .left {
        width:428px;
        height:100%;
        display: flex;
        flex-direction: column;
        padding:40px 40px 0;
        box-sizing: border-box;
        background:url('~@/assets/login_left_bg.png') no-repeat bottom/100%,
        linear-gradient(225deg,rgba(0,129,255,1) 0%,rgba(34,204,226,1) 100%);
        border-radius:8px 0 0 8px;
        &-logo {
          width:156px;
          height:26px;
          margin-bottom:54px;
        }
        &-text {
          margin-top:0;
          margin-bottom:50px;
          line-height:48px;
          font-size:36px;
          color:#FFF;
          text-align: center;
        }
        &-img {
          width:320px;
          height:246px;
          margin:0 auto 48px;
        }
        &-tips {
          font-size:12px;
          color:#FFF;
          text-align: center;
        }
      }
      .right {
        width:700px;
        height:100%;
        padding:120px 140px;
        background: #FFF;
        box-sizing: border-box;
        border-radius:0 8px 8px 0;
        &-title {
          margin-top:0;
          margin-bottom:50px;
          line-height: 1em;
          font-size:30px;
          color:#000;
          text-align: center;
        }
        .el-form {
          margin-bottom:28px;
          .el-form-item {
            margin-bottom:20px;
            .el-form-item__content {
              line-height: 48px;
              .el-input__inner {
                height:48px;
              }
              .el-input__prefix {
                top: 3px;
                left: 10px;
              }
              img.icon {
                width: 14px;
                height: 16px;
              }
            }
          }
        }
        .login-btn {
          width: 100%;
          height:48px;
          background:linear-gradient(135deg,rgba(255,61,87,1) 0%,rgba(255,138,72,1) 100%);
          border-radius:6px;
          border:none;
          font-size:14px;
        }
      }
    }
  }
</style>
