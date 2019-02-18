/**
*  Created by   阿紫
*  On  2018/10/18
*  Content
*/
<template>
  <div class='third-detail'>
    <el-row style="margin-bottom: 20px;">
      <el-col :span="4">
        <el-button size="small" type="primary" plain @click="$router.go(-1)">返回</el-button>
      </el-col>
    </el-row>
    <el-form :inline="true" class="demo-form-inline" label-width="150px">
      <el-form-item label="应用类型:">{{ruleForm.appType}}</el-form-item>
      <el-form-item label="应用名称:">{{ruleForm.appName}}</el-form-item>
      <el-form-item label="应用英文版名称:">{{ruleForm.appNameEn}}</el-form-item>
      <el-form-item label="应用属性介绍:">{{ruleForm.appProp}}</el-form-item>
      <el-form-item label="应用属性英文版介绍:">{{ruleForm.appPropEn}}</el-form-item>
      <el-form-item label="商户类型:">{{ruleForm.transferTypeName}}</el-form-item>
      <el-form-item label="APPID:">{{ruleForm.appId}}</el-form-item>
      <el-form-item label="支付通知Url:">{{ruleForm.notifyUrl}}</el-form-item>
      <el-form-item label="回调地址:">{{ruleForm.hookInjectUrl}}</el-form-item>
      <el-form-item label="iOS 版本号:">{{ruleForm.iosVersion}}</el-form-item>
      <el-form-item label="iOS Scheme协议:">{{ruleForm.iosPackageName}}</el-form-item>
      <el-form-item label="iOS Bundle Identifier:">{{ruleForm.iosSign}}</el-form-item>
      <el-form-item label="iOS 包大小:">{{ruleForm.iosSize}}</el-form-item>
      <el-form-item label="iOS 下载地址:">{{ruleForm.iosDownldUrl}}</el-form-item>
      <el-form-item label="android 版本号:">{{ruleForm.adrVersion}}</el-form-item>
      <el-form-item label="android 包名:">{{ruleForm.adrPackageName}}</el-form-item>
      <el-form-item label="android 包大小:">{{ruleForm.adrSize}}</el-form-item>
      <el-form-item label="android 签名:">{{ruleForm.adrSign}}</el-form-item>
      <el-form-item label="android 下载地址:">{{ruleForm.downloadUrl}}</el-form-item>
      <el-form-item label="跳转地址:">{{ruleForm.jumpUrl}}</el-form-item>
      <el-form-item label="是否自营:">{{ruleForm.ownType?'是':'否'}}</el-form-item>
      <el-form-item label="应用介绍:" class="destext">
        <span v-html="ruleForm.destext"></span>
      </el-form-item>
      <el-form-item label="英文版介绍:" class="destext">
        <span v-html="ruleForm.destextEn"></span>
      </el-form-item>
      <el-form-item label="权重:">{{ruleForm.position}}</el-form-item>
      <el-form-item label="联系邮箱:">{{ruleForm.email}}</el-form-item>
      <el-form-item label="应用图标:" v-if="ruleForm.appIcon">
        <img v-if="!ruleForm.appIcon.indexOf('http')" :src="ruleForm.appIcon"
             style="max-width:100%; width:80px; height: 80px; border-radius:10px;" alt="图标存储地址">
        <span v-if="ruleForm.appIcon.indexOf('http')">{{ruleForm.appIcon}}</span>
      </el-form-item>
      <el-form-item label="应用预览:" v-if="ruleForm.appPreviewPics" class="appPreviewPics">
        <viewer :options="options"
                class="viewer" ref="viewer"
        >
          <img :src="item" v-for="(item,index) in ruleForm.appPreviewPics.split(',')" :key="index" alt="图标存储地址">
        </viewer>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { applicationType } from '@/common/constants';
  export default {
    name: "third-detail",
    data() {
      return {
        ruleForm: {},
        applicationType,  // 应用类型
        options: {
          inline: false,
          button: false,
          navbar: false,
          title: false,
          toolbar: true,
          tooltip: false,
          movable: true,
          zoomable: true,
          rotatable: true,
          scalable: false,
          transition: true,
          fullscreen: true,
          keyboard: true,
          url: 'data-source'
        },
      };
    },
    activated() {
      if (this.$route.params.id) {
        this.ruleForm = this.$route.params;
        this.ruleForm.appType = this.applicationType[this.ruleForm.appType].label;
      } else {
        this.$router.go(-1);
      }
    },
  };
</script>
<style lang="less">
  .third-detail {
    .appPreviewPics {
      .el-form-item__content {
        width: 740px;
        img {
          margin-right: 10px;
          height: 81px;
          width: 152.4px;
          border-radius: 0;
        }
      }
    }
    .destext {
      p {
        margin: 0;
      }
    }
  }
</style>
