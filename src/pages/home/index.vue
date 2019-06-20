/**
*  Created by   阿紫
*  On  2018/8/8
*  Content
*/

<template>
  <div class="sac-main">
    <el-container style="height: calc(100vh);">
      <sac-aside />
      <el-container>
        <el-header>
          <ul class="sac-header__right">
            <li>
              <img class="sac-header__img" src="@/assets/head.png" alt="">
              {{userName}}，{{roleName}}
            </li>
            <li class="sac-header__password" @click="dialogFormVisible = true">
              修改密码
            </li>
            <li class="sac-header__logout" @click="goLogout">
              <img src="@/assets/btn_exit.png" alt="退出登录">
            </li>
          </ul>
        </el-header>
        <el-main>
          <transition name="el-zoom-in-center">
            <keep-alive :exclude="/NotAlive$/">
              <router-view class="router-view"></router-view>
            </keep-alive>
          </transition>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px">
        <sac-input type="password" label="旧登录密码" ref="oldPwd" prop="oldPwd" v-model="ruleForm.oldPwd"></sac-input>
        <sac-input type="password" ref="pwd" v-model="ruleForm.pwd" label="新登录密码"
                   placeholder="请输入6-16位密码" prop="pwd"></sac-input>
        <sac-input type="password" label="确认新登录密码" v-model="ruleForm.checkPass" placeholder="请再次输入密码"
                   ref="checkPass" prop="checkPass"></sac-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitFormPwd" size="small">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import SacAside from '@/components/sac-aside';
  import Md5 from '../../../static/js/md5';

  export default {
    name: 'homeIndex',
    components: {
      SacAside,
    },
    data() {
      var checkOldPwd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入旧登录密码'));
        }
        callback();
      };
      var validatePass = (rule, value, callback) => {
        if (!value || value.length < 6 || value.length > 16) {
          return callback(new Error('请输入6-16位密码'));
        }
        if (value == this.ruleForm.oldPwd) {
          callback(new Error('新旧密码不能一致!'));
        }
        if (!/(?=.*[a-z])(?=.*\d)(?=.*[#@!~%^&*.])[a-z\d#@!~%^&*.]/i.test(value)) {
          return callback(new Error('登录密码必须是字母、数字和符号的组合'));
        }
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      };
      var checkPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));

        } else if (value !== this.ruleForm.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        userName: '',
        roleName: '',
        dialogFormVisible: false,
        ruleForm: {
          oldPwd: '',
          pwd: '',
          checkPass: '',
        },
        rules: {
          oldPwd: [
            { validator: checkOldPwd, trigger: 'blur' }
          ],
          pwd: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: checkPass, trigger: 'blur' }
          ]
        }
      };
    },
    computed: {},
    methods: {
      goLogout() {
        this.$http.post('wallet/backmgr/sysuser/logout.do', {})
          .then((res) => {
            localStorage.removeItem('wallet_roleName');
            localStorage.removeItem('wallet_menuUrls');
            localStorage.removeItem('menuDefaultActive');
            localStorage.removeItem('wallet_token');
            localStorage.removeItem('wallet_username');
            this.$router.push('login');
          });
      },
      submitFormPwd() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            const { oldPwd, pwd, checkPass } = this.ruleForm
            const oldMd5Pwd = Md5(oldPwd);
            const newMd5Pwd = Md5(pwd);
            this.$http.post('wallet/backmgr/sysuser/changePwd.do', {
              oldMd5Pwd,
              newMd5Pwd
            }).then((res) => {
              this.$notify({
                title: '成功',
                message: `修改密码成功`,
                type: 'success'
              });
            }).catch((res) => {
              console.error(res);
            })
            this.$refs.oldPwd.reset();
            this.$refs.pwd.reset();
            this.$refs.checkPass.reset();
            this.$refs.ruleForm.resetFields();
            this.dialogFormVisible = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    mounted() {
      this.userName = localStorage.getItem('wallet_username');
      this.roleName = localStorage.getItem('wallet_roleName') || '暂无角色';
    },
  };
</script>

<style lang='less'>
  .sac-header {
    &__right {
      position: absolute;
      height: 50px;
      margin: 0;
      padding: 0;
      top: 0;
      right: 20px;
      li {
        float: left;
        list-style: none;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        padding: 0 20px;
      }
      li:not(.sac-header__logout):after {
        content: '';
        border-right: 1px solid #70739e;
        width: 1px;
        height: 17px;
        position: absolute;
        top: 17px;
        margin-left: 20px;
      }
    }
    &__password {
      cursor: pointer;
    }
    &__logout {
      cursor: pointer;
      img {
        margin-top: 13px;
      }
    }
    &__img {
      width: 32px;
      height: 32px;
      border-radius: 29px;
      vertical-align: middle;
      margin-right: 10px;
    }
    &__title {
      position: absolute;
      display: inline-block;
      height: 29px;
      line-height: 29px;
      font-size: 14px;
      color: #fff;
      top: 9px;
      left: 20px;
    }
  }

  .el-header {
    width: 100%;
    position: relative;
    text-align: right;
    font-size: 12px;
    background: url("~@/assets/bg_top.png");
    color: #fff;
    line-height: 50px;
    height: 50px !important;
    width: calc(100vw - 200px);
  }

  .el-icon-caret-bottom {
    color: #fff;
    margin-right: 15px;
  }

  .el-main {
    width: calc(100vw - 200px);
    padding: 0;
    background: #f2f2f6;
  }

  .el-container.is-vertical {
    display: flex;
    .el-main {
      flex: 1;
      padding: 15px;
      background: #fff;
      .router-view {
        display: flex;
        height: 100%;
        flex-direction: column;
      }
    }
  }
  .sac-aside {
    height: 100%;
    width: 200px;
    overflow-y: auto;
  }
</style>

