/**
*  Created by   阿紫
*  On  2018/10/17
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
      <sac-input
        ref="phone"
        label="banner名称"
        v-model.trim="filterForm.bannerName"
        prop="phone"></sac-input>
      <sac-date ref="selectedDate" label="日　　期" placeholder="请选择日期" v-model="selectedDate"></sac-date>
      <sac-select label="类型" v-model="filterForm.bannerType" :props="typeList" :data-list="bannerTypeList"></sac-select>
      <sac-select label="状态" v-model="filterForm.isOnShelf" :data-list="bannerOnShelfList"></sac-select>
      <sac-submit-form
        :isReset='false'
        @submitForm="submitForm(1)"></sac-submit-form>
    </el-form>
    <sac-table :data="listData.list">
      <el-table-column prop="weight" label="权重" width="80"></el-table-column>
      <el-table-column prop="bannerName" label="banner名称"></el-table-column>
      <el-table-column label="banner图片">
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
      <el-table-column prop="bannerTypeName" label="banner类型"></el-table-column>
      <el-table-column prop="jumpUrl" label="跳转链接">
        <template slot-scope="scope" prop="sysStatus">
          <a target="_brank" :href="scope.row.jumpUrl">{{scope.row.jumpUrl}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="170">
        <template slot-scope="scope">
          {{scope.row.createTime| dateFormat('YYYY-MM-DD HH:mm')}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="primary" :disabled="scope.row.isOnShelf != 0" size="small"
                     @click.native="modification(scope.row)">修改
          </el-button>
          <el-button type="danger" :disabled="scope.row.isOnShelf != 0" size="small"
                     @click.native="remove(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="上架" width="100">
        <template slot-scope="scope" prop="isOnShelf">
          <el-switch v-model="scope.row.isOnShelf" :inactive-value="0" :active-value="1"
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
          <img v-show="ruleForm.bannerUrl" v-viewer :src="ruleForm.bannerUrl" class="introduce">
          <el-upload
            v-loading="loading"
            :action="server_path + 'wallet/util/open/uploadFile.do'"
            multiple
            name="files"
            :before-upload="beforeUpload"
            :data="{type:'img'}"
            :show-file-list="false"
            :on-success="upload">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="banner类型" prop="bannerType">
          <el-select size="small" v-model="ruleForm.bannerType" placeholder="请选择banner类型"
                     style="width:100%;">
            <el-option :label="item.typeName" :value="item.code" v-for="(item, index) in bannerTypeList"
                       :key="index" v-if="index!=0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" banner名称:" prop="bannerName">

          <el-input size="small" v-model="ruleForm.bannerName" placeholder="请输入banner名称"></el-input>

        </el-form-item>
        <el-form-item label="跳转链接:" prop="jumpUrl">

          <el-input size="small" v-model="ruleForm.jumpUrl" placeholder="请输入跳转链接"></el-input>

        </el-form-item>
        <el-form-item label="权重:">

          <el-input-number size="small" v-model="ruleForm.weight" :min="1" label="请输入权重"></el-input-number>

        </el-form-item>
        <el-form-item label="备注:">

          <el-input size="small" v-model="ruleForm.remark" placeholder="请输入备注"></el-input>

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
        selectedDate: [],
        filterForm: {
          bannerType: '',
          bannerName: '',
          beginTime: '',
          endTime: '',
          isOnShelf: '',
          pageNum: 1,
          pageSize: 20
        },
        listData: {
          total: null,
          list: [],
        },
        bannerOnShelfList: [{
          value: '',
          label: '全部',
        }, {
          value: '1',
          label: '上架',
        }, {
          value: '0',
          label: '下架',
        }],
        typeList: {
          value: 'code',
          label: 'typeName',
        },
        bannerTypeList: [],
        isShowAddDialog: false,
        loading: false,
        ruleForm: {
          bannerUrl: "",
          bannerType: "",
          bannerName: "",
          jumpUrl: "",
          weight: "",
          bannerType: "",
          remark: ""
        },
        dialogTitle: '',
        rules: {
          bannerUrl: [
            { required: true, message: '请输入banner图片地址', trigger: 'blur' },
          ],
          bannerName: [
            { required: true, message: '请选择banner名称', trigger: 'change' }
          ],
          bannerType: [
            { required: true, message: '请选择banner类型', trigger: 'change' }
          ],
          jumpUrl: [
            { required: false, message: '请输入跳转链接', trigger: 'blur' }
          ],
        },
        server_path: "",
        // bannerTypeCode: "",
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
          bannerType: "",
          bannerName: "",
          jumpUrl: "",
          weight: "",
          bannerType: "",
          remark: ""
        };
        // this.bannerTypeCode = '';
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
      // banner类型
      getBannerTypeList() {
        this.$http.post("supernode/backmgr/banner/open/getBannerTypeList", this.filterForm).then((res) => {
          this.bannerTypeList = [{
            typeName: '全部',
            code: '',
          }, ...res.result];
        })
      },
      getAppBannerInfos() {
        this.$http.post("supernode/backmgr/banner/open/list", this.filterForm).then((res) => {
          this.listData.list = res.result.list;
          this.listData.total = res.result.total;
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
          this.$http.post("supernode/backmgr/banner/delete", {
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
        const { isOnShelf, id, bannerName } = itemData;
        this.$http.post("supernode/backmgr/banner/isOnShelf", {
          isOnShelf: isOnShelf ? "1" : "0",
          id
        }).then((res) => {
          this.$notify({
            title: '成功',
            message: `${bannerName} ${isOnShelf ? "上架" : "下架"} 成功`,
            type: 'success'
          });
          this.getAppBannerInfos();
        })
      },
      upload(response, file, fileList) {
        this.ruleForm.bannerUrl = response.result.urls[0];
        this.loading = false;
      },
      beforeUpload(){
        this.loading = true;
      },
      addBanner() {
        this.resetForm();
        this.dialogTitle = '创建banner';
        this.isShowAddDialog = true;
      },
      modification(data) {
        this.resetForm();
        this.isShowAddDialog = true;
        this.ruleForm = JSON.parse(JSON.stringify(data));
        this.dialogTitle = `修改 ${this.ruleForm.bannerName} 的banner`;
      },
      determine() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (this.ruleForm.id) {
              const { bannerType, id, bannerName, jumpUrl, bannerUrl, weight, remark } = this.ruleForm;
              this.$http.post("supernode/backmgr/banner/update", {
                bannerType,
                id,
                bannerName,
                jumpUrl: jumpUrl || 'empty',
                bannerUrl,
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
              this.$http.post("supernode/backmgr/banner/create", this.ruleForm).then((res) => {
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
      this.getBannerTypeList();
    }
  };
</script>
<style lang="less">
  .banner {
    .introduce {
      height: 80px;
      display: block;
    }
  }
</style>
