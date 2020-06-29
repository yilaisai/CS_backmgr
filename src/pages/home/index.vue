<template>
  <div class="sac-main">
    <el-container style="height: calc(100vh);">
      <sac-aside />
      <el-container>
        <el-header>
          <ul class="sac-header__right">
            <li @click="musicSwitch">
              <a class="music-switch" :class="{'off' : !musicIsOpen}" href="javascript:;"></a>
            </li>
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
          <Tags></Tags>
          <transition name="el-zoom-in-center">
            <keep-alive>
              <router-view class="router-view" @musicPlay="$emit('musicPlay')"></router-view>
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
    <div class="message-box" v-show="appealIngRemind + withdrawIngRemind + bindInfoIngRemind + outIngRemind + merchantApplyIngRemind + auditIngRemind + auditPersonIngRemind + payedOrderIn + payedOrderOut + appealOverIng > 0">
      <div :class="['topbar',{'down' : !messageBoxShow}]" @click="messageBoxShow = !messageBoxShow">
        <span class="blink" v-show="!messageBoxShow">有{{appealIngRemind + withdrawIngRemind + bindInfoIngRemind + outIngRemind + merchantApplyIngRemind + auditIngRemind + auditPersonIngRemind + appealOverIng }}条新的待处理事项，点击展开</span>
        <span v-show="messageBoxShow"><img src="../../../static/img/logo_white.png" alt=""></span>
        <el-button v-show="messageBoxShow" size="mini" @click="noRemind">不再提醒</el-button>
        <i :class="{'down' : messageBoxShow}"></i>
      </div>
      <ul v-show="messageBoxShow">
        <li @click="$router.push('/LegalCurrency/complaint')" v-show="appealIngRemind > 0">
          <span>{{appealIngRemind}}条申诉待处理</span>
          <!-- <i>5分钟前</i> -->
        </li>
        <li @click="$router.push('/LegalCurrency/complaint')" v-show="appealOverIng > 0">
          <span>{{appealOverIng}}条超时申诉待处理</span>
          <!-- <i>5分钟前</i> -->
        </li>
        <li @click="$router.push('/money/withdraw-check')" v-show="withdrawIngRemind > 0"><span>{{withdrawIngRemind}}条提币审核待处理</span></li>
        <li @click="$router.push('/LegalCurrency/paymentMethodVerify')" v-show="bindInfoIngRemind > 0"><span>{{bindInfoIngRemind}}条收款方式审核待处理</span></li>
        <li @click="$router.push({path:'/merchant/cashOutVerify',query: { status: '1' }})" v-show="outIngRemind > 0"><span>{{outIngRemind}}条兑出审核待处理</span></li>
        <li @click="$router.push({path:'/merchant/merchantList',query:{status:'0'}})" v-show="merchantApplyIngRemind > 0"><span>{{merchantApplyIngRemind}}条商户注册审核待处理</span></li>
        <li @click="$router.push('/LegalCurrency/advertisersVerify')" v-show="auditIngRemind > 0"><span>{{auditIngRemind}}条广告商审核待处理</span></li>
        <li @click="$router.push({path:'/user/identityVerify',query:{status:'1'}})" v-show="auditPersonIngRemind > 0"><span>{{auditPersonIngRemind}}条实名审核待处理</span></li>
        <li @click="$router.push({path:'/transactionFlow/CashIn',query:{status:'1'}})" v-show="payedOrderIn > 0"><span>{{payedOrderIn}}条15分钟兑入未确认</span></li>
        <li @click="$router.push({path:'/transactionFlow/CashOut',query:{status:'1'}})" v-show="payedOrderOut > 0"><span>{{payedOrderOut}}条15分钟兑出未确认</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
import SacAside from '@/components/sac-aside';
import Tags from '@/components/Tags';
import Md5 from '../../../static/js/md5';
import {mapState} from 'vuex'
import { dateFormat } from '@/common/util';
export default {
	name: 'homeIndex',
	components: {
		SacAside,
		Tags
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
			// if (!/(?=.*[a-z])(?=.*\d)(?=.*[#@!~%^&*.])[a-z\d#@!~%^&*.]/i.test(value)) {
			//   return callback(new Error('登录密码必须是字母、数字和符号的组合'));
			// }
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
			},
      musicIsOpen: false,
      timer:null,
      messageBoxShow:false,
      appealIngRemind:0,
      appealOverIng:0,
      auditIngRemind:0,
      bindInfoIngRemind:0,
      outIngRemind:0,
      withdrawIngRemind:0,
      auditPersonIngRemind:0,
      merchantApplyIngRemind:0,
      payedOrderIn:0,
      payedOrderOut:0,
      remindTimes:0,        //提醒的次数
      appealOverNumber:0,   //点击不再提醒时的超时待申诉数量
		};
	},
	methods: {
		goLogout() {
			this.$http.post('wallet/backmgr/sysuser/logout', {})
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
				this.$http.post('wallet/backmgr/sysuser/changePwd', {
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
		musicSwitch() {
			this.musicIsOpen = !this.musicIsOpen
			localStorage.setItem('MUSIC_SWITCH', this.musicIsOpen ? 'open' : 'close')
    },
    getNewsList() {
      clearTimeout(this.timer)
      const startDate = localStorage.getItem('NO_REMIND_TIME') || ''
      this.$http.post('/wallet/backmgr/indexInfo', {type: 1, noLoading: true, startDate}).then(res => {
          let result = res.result;
          this.appealIngRemind = result.appealIng
          this.auditIngRemind = result.auditIng
          this.bindInfoIngRemind = result.bindInfoIng
          this.outIngRemind = result.outIng
          this.withdrawIngRemind = result.withdrawIng
          this.auditPersonIngRemind = result.auditPersonIng
          this.merchantApplyIngRemind = result.merchantApplyIng
          if(this.appealIngRemind > 0 || this.auditIngRemind > 0 || this.bindInfoIngRemind > 0 || this.outIngRemind > 0 || this.withdrawIngRemind > 0 || this.auditPersonIngRemind > 0 || this.merchantApplyIngRemind > 0 ) {
            this.$emit('musicPlay')
          }else if(this.payedOrderIn < result.payedOrderIn || this.payedOrderOut < result.payedOrderOut || this.appealOverNumber < result.appealOverIng) {
            this.$emit('musicPlay')
          }
          this.payedOrderIn = result.payedOrderIn
          this.payedOrderOut = result.payedOrderOut
          this.appealOverIng = result.appealOverIng
          this.timer = setTimeout(() => {
            this.getNewsList()
            this.remindTimes++
          }, 60000)
          let This = this
          if (this.remindTimes > 480 || !localStorage.getItem('wallet_token')) {
              clearTimeout(This.timer)
          }
      }).catch(err => {
        this.timer = setTimeout(() => {
          this.getNewsList()
          this.remindTimes++
        }, 60000)
        let This = this
        if (this.remindTimes > 480 || !localStorage.getItem('wallet_token')) {
            clearTimeout(This.timer)
        }
      })
    },
    // 不再提醒
    noRemind() {
      localStorage.setItem('NO_REMIND_TIME', dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss'))
      this.appealOverNumber = this.appealOverIng
      this.getNewsList()
    }
	},
	mounted() {
		this.userName = localStorage.getItem('wallet_username');
		this.roleName = localStorage.getItem('wallet_roleName') || '暂无角色';
    // let musicIsOpen = localStorage.getItem('MUSIC_SWITCH') || 'close'
    // this.musicIsOpen = musicIsOpen == 'open' ? true : false
    localStorage.setItem('MUSIC_SWITCH','close')
    if (localStorage.getItem('wallet_token')) {
      this.getNewsList()
    }
  },
  activated(){
    if (this.timer) clearTimeout(this.timer)
  },
	computed: {
		...mapState(['tagsList'])
  },
  watch:{
    $route(to,from){
      this.remindTimes = 0
    }
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
		.music-switch {
			display: inline-block;
			width: 30px;
			height: 30px;
			background: url(../../../static/img/music_on.png) no-repeat center;
			background-size: 100% 100%;
			margin-top: 10px;
			&.off {
				background: url(../../../static/img/music_off.png) no-repeat center;
				background-size: 100% 100%;
			}
		}
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
    // width: calc(100vw - 200px);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .nav{
      font-size: 14px;
      font-weight: 500;
    }
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
      // padding: 15px;
      background: #fff;
      display: flex;
	  flex-direction: column;
	  overflow: hidden;
      .router-view {
        flex: 1;
        display: flex;
        padding: 15px;
		flex-direction: column;
      }
    }
  }
  .sac-aside {
    height: 100%;
    width: 200px;
    overflow-y: auto;
  }
  .message-box {
		position: fixed;
		bottom: 0;
		right: 2px;
		background-color: #FFFAF5;
		box-shadow: 0px -4px 12px 0px rgba(0,0,0,0.15);
		border-radius:6px;
		overflow: hidden;
    width: 300px;
    z-index:9999;
		.topbar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 14px;
			height: 48px;
			font-size: 16px;
			cursor: pointer;
      background:linear-gradient(135deg,rgba(255,184,101,1) 0%,rgba(255,146,85,1) 21%,rgba(255,62,49,1) 53%,rgba(255,38,38,1) 100%);
      &.down {
        height:26px;
        font-size:14px;
      }
			i {
				width: 14px;
				height: 14px;
				background: url(../../../static/img/up_icon.png) no-repeat center;
				background-size: 100% 100%;
				&.down {
					background: url(../../../static/img/down_icon.png) no-repeat center;
					background-size: 100% 100%;
				}
			}
			span {
				&.blink{
					color: #fff;
					animation: blink 1s linear infinite;  
					/* 其它浏览器兼容性前缀 */
					-webkit-animation: blink 1s linear infinite;
					-moz-animation: blink 1s linear infinite;
					-ms-animation: blink 1s linear infinite;
					-o-animation: blink 1s linear infinite;
				}
				img {
					display: block;
					height: 30px;
				}
			}
		}
		ul {
			margin: 0;
			padding: 0;
			max-height: 300px;
			overflow-y: auto;
			padding: 20px 30px 30px;
			li {
				list-style: none;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 8px;
				height: 30px;
				box-sizing: border-box;
				color: #000000;
				span {
					font-size: 14px;
					text-decoration: underline;
					cursor: pointer;
				}
				i {
					color: #646464;
					font-size: 12px;
					font-style: normal;
				}
			}
		}
	}
</style>

