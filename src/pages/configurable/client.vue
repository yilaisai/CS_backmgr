/**
*  Created by   阿紫
*  On  2018/8/10
*  Content 客户端版本
*/
<template>
  <div class='client'>
    <sac-table :data="list">
      <el-table-column label="系统">
        <template slot-scope="scope">
          <span>{{scope.row.plat == 2 ? 'iOS' : (scope.row.plat == 1 ? 'android' : '')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="版本号" prop="version"></el-table-column>
      <el-table-column prop="downUrl" label="下载链接"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="100"></el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click.native="modification(scope.row)">修改</el-button>
        </template>
      </el-table-column>
      <el-table-column label="强制更新" width="100">
        <template slot-scope="scope" prop="forceUpdate">
          <el-switch v-model="scope.row.forceUpdate" :inactive-value="0" :active-value="1"
                     @click.native="updateAppversionInfoForceUpdate(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="上架" width="100">
        <template slot-scope="scope" prop="isOnShelf">
          <el-switch v-model="scope.row.isOnShelf" :inactive-value="0" :active-value="1"
                     @click.native="switchChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
    </sac-table>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" ref="ruleForm"  label-width="130px">
        <el-form-item label="版本号：" prop="version">
          <el-input size="small" v-model="ruleForm.version" placeholder="请输入版本号"></el-input>
        </el-form-item>
        <el-form-item label="下载链接：" prop="version">
          <el-input size="small" v-model="ruleForm.downUrl" placeholder="请输入下载链接"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="determine" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'client',
    data() {
      return {
        list: [],
        ruleForm: {
          version: "",
          downUrl: ''
        },
        dialogTitle: '修改',
        dialogFormVisible: false,
      };
    },
    methods: {
      getAppVersionInfoList() {
        const { pageNum, pageSize } = this;
        this.$http.post("wallet/backmgr/version/getAppVersionInfoList.do").then((res) => {
          const { list } = res.result.list;
          this.list = list;
        })
      },
      // 是否强制更新
      updateAppversionInfoForceUpdate(itemData) {
        this.$http.post("wallet/backmgr/version/updateAppversionInfoForceUpdate.do", {
          isForceUpdate: itemData.forceUpdate ? "YES" : "NO",
          versionId: itemData.id
        }).then((res) => {
          this.$notify({
            title: '成功',
            message: res.msg,
            type: 'success'
          });
          this.getAppVersionInfoList();
        })
      },
      // 上下架
      switchChange(itemData) {
        this.$http.post("wallet/backmgr/version/updateAppVersionInfoOnshelf.do", {
          isOnshelf: itemData.isOnShelf ? "YES" : "NO",
          versionId: itemData.id
        }).then((res) => {
          this.$notify({
            title: '成功',
            message: res.msg,
            type: 'success'
          });
          this.getAppVersionInfoList();
        })
      },
      modification(itemData) {
        this.dialogTitle = `修改${itemData.plat == 2?'iOS':'android'}`;
        this.dialogFormVisible = true;
        this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
        this.ruleForm = JSON.parse(JSON.stringify(itemData));
      },
      determine() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$http.post("wallet/backmgr/version/updateAppversionInfo.do", {
              plat: this.ruleForm.plat == 2 ? 'ios' : 'adr',
              versionId: this.ruleForm.id,
              version: this.ruleForm.version || 'empty',
              downUrl: this.ruleForm.downUrl || 'empty'
            }).then((res) => {
              this.$notify({
                title: '成功',
                message: `修改成功`,
                type: 'success'
              });
              this.dialogFormVisible = false;
              this.getAppVersionInfoList();
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }

    },
    activated() {
      this.getAppVersionInfoList();
    }
  };
</script>
<style lang="less">
  .client {
  }
</style>
