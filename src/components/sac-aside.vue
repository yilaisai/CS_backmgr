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
      class="el-menu-vertical-demo"
      background-color="#1a2238"
      text-color="#fff"
      unique-opened
      router
    >
      <template v-for="(item, index) in menuList">
        <el-menu-item :index="`${index}`" :route="item.path" :key="index"
                      v-if="item.children.length<2">
          <i class="iconfont" :class="`icon-${item.icon}`"></i>
          <span slot="title">{{item.meta.title}}</span>
        </el-menu-item>
        <el-submenu :index="`${index}`" :key="index" v-else>
          <template slot="title">
            <i class="iconfont" :class="`icon-${item.icon}`"></i>
            <span>{{item.meta.title}}</span>
          </template>
          <template v-for="(itemChildren, itemIndex) in item.children">
            <el-menu-item
              style="padding-left: 65px;"
              :index="`${index}-${itemIndex}`"
              :route="`${item.path}/${itemChildren.path}`"
              :key="itemIndex">{{itemChildren.meta.title}}
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
      // const menuList = JSON.parse(localStorage.getItem('platFormResList'));
      const menuList = appRouter;
      menuList.forEach((item) => {
        const foo = item;
        foo.icon = foo.path.split('/')[1] ? foo.path.split('/')[1] : 'home';
      });
      this.menuList = menuList;
      // 默认显示页面菜单设置
      this.activeIndex = localStorage.getItem('menuDefaultActive') ? localStorage.getItem('menuDefaultActive') : '0';
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
      width: 200px;
      height: calc(~'100vh - 48px');
      border: none;
    }
    .el-menu-item.is-active {
      background: #436bff !important;
      color: #fff;
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
  }
</style>

