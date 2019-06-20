/**
*  Created by   阿紫
*  On  2018/5/28
*  Content
*/
<template>
  <div class="sac-aside">
    <div class="logo">
      <img src="@/assets/logo.png" alt="logo">
    </div>
    <el-menu
      @select="handleSelect"
      :default-active="activeIndex"
      class="el-menu-vertical-demo scroll"
      background-color="#1a2238"
      text-color="#fff"
      unique-opened
      router
    >
      <template v-for="(item, index) in menuList">
        <el-menu-item :index="`${index}`" :route="item.menuUrl" :key="index"
                      v-if="!item.children">
          <i class="iconfont" :class="`icon-${item.icon}`"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
        <el-submenu :index="`${index}`" :key="index" v-else>
          <template slot="title">
            <i class="iconfont" :class="`icon-${item.icon}`"></i>
            <span>{{item.name}}</span>
          </template>
          <template v-for="(itemChildren, itemIndex) in item.children">
            <el-submenu   :index="`${index}-${itemIndex}`" v-if="itemChildren.children">
              <span slot="title"  style="padding-left: 10px;">{{itemChildren.name}}</span>
              <el-menu-item     style="padding-left: 70px;"
                :index="`${index}-${itemIndex}-${itemIndex2}`"
                :key="itemIndex2"
                :route="`${itemChildren2.menuUrl}`"
                v-for="(itemChildren2, itemIndex2) in itemChildren.children">
                {{itemChildren2.name}}
              </el-menu-item>
              <!-- <el-submenu  :index="`${index}-${itemIndex}`"  :route="`${itemChildren.menuUrl}`" v-if="itemChildren.children">
              {{itemChildren.name}}
              </el-submenu> -->
            </el-submenu>
            <el-menu-item
              style="padding-left: 50px;"
              :index="`${index}-${itemIndex}`"
              :route="`${itemChildren.menuUrl}`"
              :key="itemIndex" v-else>{{itemChildren.name}}

            </el-menu-item>
          </template>

        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import { appRouter } from '../router/router';

  export default {
    name: 'sac-aside',
    data() {
      return {
        activeIndex: '0',
        menuList: [],
      };
    },
    methods: {
      handleSelect(key) {
        this.activeIndex = key;
        localStorage.setItem('menuDefaultActive', key);
      },
    },
    mounted() {
      // 默认显示页面菜单设置
      const menuList = JSON.parse(localStorage.getItem('wallet_menuUrls')) || [];
      if (location.hash == '#/home' || !localStorage.getItem('menuDefaultActive')) {
        this.activeIndex = '0';
      } else {
        this.activeIndex = localStorage.getItem('menuDefaultActive');
        const curHref = location.href.split('#');
        const activeIndex = this.activeIndex.split('-');
        let historyRout = '';
        if (activeIndex[1]) {
          historyRout =  menuList[activeIndex[0]].children[activeIndex[1]].menuUrl;
        } else {
          historyRout = menuList[activeIndex[0]].menuUrl
        }
        if (curHref[1] != historyRout) {
          this.$router.push({
            path: historyRout
          })
        }
      }
      menuList.forEach((item) => {
        item.icon = item.menuUrl.split('/')[1] ? item.menuUrl.split('/')[1] : 'home';
      });
      this.menuList = menuList;
    },
  };
</script>

<style lang='less'>
  .sac-aside {
    background: url("~@/assets/bg_top.png");
    .logo {
      width: 100%;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      /*background: #1a2238;*/
      img {
        width: 150px;
      }
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      //width: 200px;
      height: calc(~'100vh - 48px');
      border: none;
    }
    .el-menu-item.is-active {
      background: #436bff !important;
      color: #fff;
    }
    .el-submenu .el-menu-item{
          min-width: 183px;
    }
    .el-submenu.is-active .el-submenu__title {
      background: #242c60 !important;
    }
    .el-menu-item, .el-submenu__title {
      height: 46px;
      line-height: 46px;
    }
    .menuIcon {
      width: 32px;
      height: 32px;
      margin-right: 10px;
      display: inline-block;
    }
    .icon- {
      &home {
        padding-left: 20px;
        background: url("~@/assets/home.png") no-repeat top left;
        background-size: 15px 15px;
      }
      &banner {
        padding-left: 20px;
        background: url("~@/assets/banner.png") no-repeat top left;
        background-size: 16px 16px;
      }
      &configurable {
        padding-left: 20px;
        background: url("~@/assets/configurable.png") no-repeat top left;
        background-size: 14px 15px;
      }
      &currency-increase {
        padding-left: 20px;
        background: url("~@/assets/currency-increase.png") no-repeat top left;
        background-size: 19px;
      }
      &feedback {
        padding-left: 20px;
        background: url("~@/assets/feedback.png") no-repeat top left;
        background-size: 16px 16px;
      }
      &identity {
        padding-left: 20px;
        background: url("~@/assets/identity.png") no-repeat top left;
        background-size: 15px 15px;
      }
      &invite {
        padding-left: 20px;
        background: url("~@/assets/invite.png") no-repeat top left;
        background-size: 16px 16px;
      }
      &message {
        padding-left: 20px;
        background: url("~@/assets/message.png") no-repeat top left;
        background-size: 16px 16px;
      }
      &money {
        padding-left: 20px;
        background: url("~@/assets/money.png") no-repeat top left;
        background-size: 16px;
      }
      &permissions {
        padding-left: 20px;
        background: url("~@/assets/permissions.png") no-repeat top left;
        background-size: 14px 17px;
      }
      &third-application {
        padding-left: 20px;
        background: url("~@/assets/third-application.png") no-repeat top left;
        background-size: 14px 15px;
      }
      &user {
        padding-left: 20px;
        background: url("~@/assets/user.png") no-repeat top left;
        background-size: 16px 15px;
      }
      &static {
        padding-left: 20px;
        background: url("~@/assets/editor.png") no-repeat top left;
        background-size: 16px 15px;
      }
      &supersac {
        padding-left: 20px;
        background: url("~@/assets/supersac.png") no-repeat top left;
        background-size: 17px 17px;
      }
      &asset-statistics {
        padding-left: 20px;
        background: url("~@/assets/asset-statistics.png") no-repeat top left;
        background-size: 17px 17px;
      }
      &finances {
        padding-left: 20px;
        background: url("~@/assets/financial.png") no-repeat top left;
        background-size: 16px 16px;
      }
    }
  }
</style>
