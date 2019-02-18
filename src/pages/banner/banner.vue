/**
*  Created by   阿紫
*  On  2018/8/10
*  Content
*/
<template>
  <div class='banner'>
    <el-col :span="22" style="text-align:right;">
      <el-button size="small" type="primary" @click="addBanner">创建banner</el-button>
    </el-col>
    <el-form :inline="true"
             label-width="100px"
             ref="filterForm"
             :model="filterForm">
      <!--<el-form-item label="banner类型:">-->
        <!--<el-select v-model="filterForm.bannerType" size="small" placeholder="请选择banner类型">-->
          <!--<el-option-->
            <!--v-for="item in bannerTypeList"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <sac-select label="banner类型" v-model="filterForm.bannerType" :data-list="bannerTypeList"></sac-select>
      <sac-submit-form
        :isReset='false'
        @submitForm="submitForm(1)"></sac-submit-form>
    </el-form>
    <sac-table :data="listData.list">
      <el-table-column prop="weight" label="权重" width="80"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <viewer :options="options"
                  class="viewer" ref="viewer"
          >
            <img v-if="!scope.row.bannerUrl.indexOf('http')" :src="scope.row.bannerUrl"
                 style="max-width:100%; max-height: 150px;" alt="图片存储地址不存在">
          </viewer>
          <span v-if="scope.row.bannerUrl.indexOf('http')">{{scope.row.bannerUrl}}</span>
        </template>
      </el-table-column>
      <el-table-column label="英文版图片">
        <template slot-scope="scope">
          <viewer :options="options"
                  class="viewer" ref="viewer"
          >
            <img v-if="!scope.row.bannerUrlEn.indexOf('http')" :src="scope.row.bannerUrlEn"
                 style="max-width:100%; max-height: 150px;" alt="图片存储地址不存在">
          </viewer>
          <span v-if="scope.row.bannerUrlEn.indexOf('http')">{{scope.row.bannerUrlEn}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="bannerTypeName" label="banner类型"></el-table-column>
      <el-table-column prop="bannerName" label="banner名称"></el-table-column>
      <el-table-column prop="version" label="适用版本范围"></el-table-column>
      <el-table-column prop="plat" label="适用平台"></el-table-column>
      <el-table-column prop="jumpUrl" label="跳转链接">
        <template slot-scope="scope" prop="sysStatus">
          <a target="_brank" :href="scope.row.jumpUrl">{{scope.row.jumpUrl}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="170"></el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="primary" :disabled="scope.row.isOnshelf != 0" size="small"
                     @click.native="modification(scope.row)">修改
          </el-button>
          <el-button type="danger" :disabled="scope.row.isOnshelf != 0" size="small"
                     @click.native="remove(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="上架" width="100">
        <template slot-scope="scope" prop="isOnshelf">
          <el-switch v-model="scope.row.isOnshelf" :inactive-value="0" :active-value="1"
                     @click.native="switchChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
    </sac-table>
    <sac-pagination v-show="listData.list.length>0"
                    @handleChange="getPaginationChange"
                    :total="+listData.total"
                    :page-size="filterForm.pageSize"
                    :current-page="filterForm.pageNum">
    </sac-pagination>
    <el-dialog :title="dialogTitle" :visible.sync="isShowAddDialog">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="140px">
        <el-form-item label="banner图片:" prop="bannerUrl">
          <el-col>
            <el-input size="small" v-model="ruleForm.bannerUrl" placeholder="请选择上传">
              <el-upload
                :action="server_path + 'wallet/util/open/uploadFile.do'"
                multiple
                name="files"
                :data="{type:'img'}"
                :show-file-list="false"
                :on-success="upload" slot="append">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="banner英文版图片:" prop="bannerUrlEn">
          <el-col>
            <el-input size="small" v-model="ruleForm.bannerUrlEn" placeholder="请选择上传">
              <el-upload
                :action="server_path + 'wallet/util/open/uploadFile.do'"
                multiple
                name="files"
                :data="{type:'img'}"
                :show-file-list="false"
                :on-success="uploadEnPic" slot="append">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="banner类型" prop="bannerTypeEnName">
          <el-select size="small" v-model="ruleForm.bannerTypeEnName" placeholder="请选择banner类型"
                     @change="getbannerTypeEnName('ruleForm')" style="width:100%;">
            <el-option :label="item.label" :value="item.value" v-for="(item, index) in bannerTypeList"
                       :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" banner名称:" prop="bannerName">
          <el-col>
            <el-input size="small" v-model="ruleForm.bannerName" placeholder="请输入banner名称"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="适用版本范围:" class="banner-version">
          <el-col>
            <el-input size="small" v-model="ruleForm.bannerVersion1" placeholder="请输入适用版本范围"></el-input> -
            <el-input size="small" v-model="ruleForm.bannerVersion2" placeholder="请输入适用版本范围"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="适用平台:">
            <!-- <el-input size="small" v-model="ruleForm.bannerPlat" placeholder="请输入适用平台"></el-input> -->
            <el-select size="small" v-model="ruleForm.bannerPlat" placeholder="请选择适用平台" @change="getbannerPlat('ruleForm')"  style="width:100%;">
              <el-option
                v-for="(item, index) in platList"
                :value="item" 
                :key="index">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="跳转链接:" prop="jumpUrl">
          <el-col>
            <el-input size="small" v-model="ruleForm.jumpUrl" placeholder="请输入跳转链接"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="权重:">
          <el-col>
            <el-input-number size="small" v-model="ruleForm.weight" :min="1" label="请输入权重"></el-input-number>
          </el-col>
        </el-form-item>
        <el-form-item label="备注:">
          <el-col>
            <el-input size="small" v-model="ruleForm.remark" placeholder="请输入备注"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100px" size="small" @click.native="determine">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<style>

</style>
<script>
  export default {
    name: 'banner',
    data() {
      return {
        filterForm: {
          bannerType: 'None',
          pageNum: 1,
          pageSize: 20
        },
        listData: {
          total: null,
          list: [],
        },
        bannerTypeList: [],
        isShowAddDialog: false,
        ruleForm: {
          bannerUrl: "",
          bannerUrlEn: '',
          bannerTypeEnName: "",
          bannerName: "",
          bannerVersion1: "",
          bannerVersion2: "",
          bannerVersion: "",
          bannerPlat: "",
          jumpUrl: "",
          weight: "",
          bannerType: "",
          remark: ""
        },
        platList: ['all','adr','ios'],
        dialogTitle: '',
        rules: {
          bannerUrl: [
            { required: true, message: '请输入banner图片地址', trigger: 'blur' },
          ],
          bannerUrlEn: [
            { required: true, message: '请输入banner英文版图片地址', trigger: 'blur' },
          ],
          bannerName: [
            { required: true, message: '请选择banner名称', trigger: 'change' }
          ],
          bannerTypeEnName: [
            { required: true, message: '请选择banner类型', trigger: 'change' }
          ],
          jumpUrl: [
            { required: false, message: '请输入跳转链接', trigger: 'blur' }
          ],
        },
        server_path: "",
        bannerTypeCode: "",
        options: {
          inline: false,
          button: false,
          navbar: false,
          title: false,
          toolbar: false,
          tooltip: false,
          movable: true,
          zoomable: true,
          rotatable: true,
          scalable: false,
          transition: true,
          fullscreen: true,
          keyboard: true,
          url: 'data-source'
        }
      };
    },
    methods: {
      resetForm() {
        this.ruleForm = {
          bannerUrl: "",
          bannerUrlEn: "",
          bannerTypeEnName: "",
          bannerName: "",
          bannerVersion1: "",
          bannerVersion2: "",
          bannerVersion: "",
          bannerPlat: "",
          jumpUrl: "",
          weight: "",
          bannerType: "",
          remark: ""
        };
        this.bannerTypeCode = '';
        this.$refs.ruleForm && this.$refs.ruleForm.resetFields(); // 重置query的数据
      },
      submitForm(num) {
        this.filterForm.pageNum = num;
        this.getAppBannerInfos();
      },
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        this.submitForm(currentPage);
      },
      getAppBannerInfos() {
        this.$http.post("wallet/backmgr/banner/getAppBannerInfos.do", this.filterForm).then((res) => {
          this.listData.list = res.result.list.list;
          this.listData.total = res.result.list.total;
        })
      },
      getBannerType() {
        this.$http.post("wallet/backmgr/banner/getBannerType.do", {
          version: '1.0.0',
          plat: 'web',
        }).then((res) => {
          const { list } = res.result;
          list.forEach((item) => {
            item.label = item.name;
            item.value = item.bannerType;
          })
          console.log(list);
          this.bannerTypeList = list;
        })
      },
      // 删除
      remove(itemData) {
        const { id, bannerName } = itemData;
        this.$confirm(`确定删除 ${bannerName} 吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post("wallet/backmgr/banner/updateAppBannerInfoSysStatus.do", {
            sysStatus: "INVALID0",
            id
          }).then((res) => {
            this.$notify({
              title: '成功',
              message: `删除 ${bannerName}成功`,
              type: 'success'
            });
            this.getAppBannerInfos();
          })
        })
      },
      // 上下架
      switchChange(itemData) {
        const { isOnshelf, id, bannerName } = itemData;
        this.$http.post("wallet/backmgr/banner/updateAppBannerInfoOnshelf.do", {
          isOnshelf: isOnshelf ? "YES" : "NO",
          id
        }).then((res) => {
          this.$notify({
            title: '成功',
            message: `${bannerName} ${isOnshelf ? "上架" : "下架"} 成功`,
            type: 'success'
          });
          this.getAppBannerInfos();
        })
      },
      getbannerTypeEnName(type) {
        this.bannerTypeList.forEach((item) => {
          if (item.value == this[type].bannerTypeEnName) {
            this.bannerTypeCode = item.code;
          }
        })
      },
      getbannerPlat(type) {
        console.log(this.ruleForm.bannerPlat);
        // this.ruleForm.bannerPlat = 1111;
        // this.ruleForm.bannerPlat == this[type].bannerPlat;
        // this.platList.forEach((item) => {
        //   if (item == this[type].bannerPlat) {
        //     this.ruleForm.bannerPlat = 111;
            
        //   }
        // })
      },
      upload(response, file, fileList) {
        this.ruleForm.bannerUrl = response.result.urls[0]
      },
      uploadEnPic(response, file, fileList) {
        this.ruleForm.bannerUrlEn = response.result.urls[0]
      },
      addBanner() {
        this.resetForm();
        this.dialogTitle = '创建banner';
        this.isShowAddDialog = true;
      },
      modification(data) {
        this.resetForm();
        this.bannerTypeCode = data.bannerType;
        this.isShowAddDialog = true;
        data.bannerPlat = data.plat;
        this.ruleForm = JSON.parse(JSON.stringify(data));
        this.ruleForm.bannerVersion1 = data.version.split(',')[0];
        this.ruleForm.bannerVersion2 = data.version.split(',')[1];
        this.dialogTitle = `修改 ${this.ruleForm.bannerName} 的banner`;
      },
      determine() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.ruleForm.bannerVersion =  this.ruleForm.bannerVersion1 + ',' +  this.ruleForm.bannerVersion2;
            if (this.ruleForm.id) {
              const { bannerTypeEnName, id, bannerName, bannerVersion, bannerPlat, jumpUrl, bannerUrl, bannerUrlEn,weight, remark } = this.ruleForm;
              this.$http.post("wallet/backmgr/banner/updateAppBannerInfo.do", {
                bannerTypeEnName,
                bannerType: this.bannerTypeCode,
                id,
                bannerName,
                bannerVersion,
                bannerPlat,
                jumpUrl: jumpUrl || 'empty',
                bannerUrl,
                bannerUrlEn,
                weight,
                remark: remark || 'empty',
              }).then((res) => {
                this.resetForm();
                this.isShowAddDialog = false;
                this.$notify({
                  title: '成功',
                  message: `修改 ${bannerName} banner成功`,
                  type: 'success'
                });
                this.getAppBannerInfos();
              })
            } else {
              this.ruleForm.bannerType = this.bannerTypeCode;
              this.$http.post("wallet/backmgr/banner/createAppBannerInfo.do", this.ruleForm).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `创建 ${ this.ruleForm.bannerName} banner成功`,
                  type: 'success'
                });
                this.isShowAddDialog = false
                this.submitForm(1);
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    activated() {
      this.server_path = SERVER_PATH
      this.getAppBannerInfos();
      this.getBannerType();
    }
  };
</script>
<style lang="less">
  .banner {
  }
  .banner-version {
    input {
      width: 143px;
    }
    .el-input {
      display: inline;
    }
  }
</style>
