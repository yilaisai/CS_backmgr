/**
*  Created by   阿紫
*  On  2018/8/10
*  Content 菜单管理
*/
<template>
  <div class='menu-title'>
    <el-row>
      <el-col :span="22" style="text-align:right; margin-bottom: 30px;">
        <el-button size="small" type="primary" @click="addMenu">创建一级菜单</el-button>
      </el-col>
    </el-row>
    <el-tree
      :data="treeData"
      node-key="id"
      :props="defaultProps"
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span class="sac-label"> {{ node.label }} <i class="el-icon-info sac-icon" v-show="data.describe"
                                                     @click="showDescription(data.describe)"></i></span>
        <span class="sac-btn">
          <el-button
            type="text"
            size="mini"
            @click="() => append( node, data)">
            新增
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => modify( node, data)">
            修改
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="排序:">
          <el-input-number v-model="ruleForm.position" size="small" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="接口url:" prop="requestUrl">
          <el-input v-model="ruleForm.requestUrl" size="small"></el-input>
        </el-form-item>
        <el-form-item label="功能名称:" prop="name">
          <el-input v-model="ruleForm.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="页面路由:" prop="menuUrl">
          <el-input v-model="ruleForm.menuUrl" size="small"></el-input>
        </el-form-item>
        <el-form-item label="描述:" style=" position: relative;">
          <span class="tips_textarea">{{ruleForm.desctext?ruleForm.desctext.length:'0'}}/50</span>
          <el-input type="textarea" placeholder="请输描述" maxlength="50" v-model="ruleForm.desctext"
                    size="small"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="determine" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>

</style>
<script>
  export default {
    name: 'menu-title',
    data() {
      return {
        treeData: [],
        dialogFormVisible: false,
        ruleForm: {
          position: 0,
          requestUrl: '',
          name: '',
          menuUrl: '',
          parentId: '',
          desctext: '',
        },
        defaultProps: {
          children: 'children',
          label: 'name',
        },
        rules: {
          requestUrl: [
            { required: true, message: '请输入请求url', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入功能名称', trigger: 'blur' },
          ],
          menuUrl: [
            { required: false, message: '请输入页面路由', trigger: 'blur' },
          ]
        },
        currentNode: '',
        currentData: '',
        dialogTitle: '创建一级菜单',
        currentForm: {},
      };
    },
    methods: {
      resetFields() {
        this.ruleForm = {
          position: 0,
          requestUrl: '',
          name: '',
          menuUrl: '',
          parentId: '',
          desctext: '',
        };
        this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
      },
      addMenu() {
        this.dialogTitle = '创建一级菜单';
        this.dialogFormVisible = true;
        this.currentNode = '';
        this.resetFields();
      },
      append(node, data) {
        this.dialogTitle = `创建 ${data.name} 的子菜单`;
        this.dialogFormVisible = true;
        this.currentNode = node;
        this.currentData = data;
        this.resetFields();
      },
      modify(node, data) {
        this.dialogTitle = `修改 ${data.name} 菜单`;
        this.dialogFormVisible = true;
        this.ruleForm = JSON.parse(JSON.stringify(data));
        this.ruleForm.desctext = this.ruleForm.describe;
        this.currentForm = JSON.parse(JSON.stringify(data));
        this.currentForm.desctext = this.currentForm.describe;
      },
      determine() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (this.ruleForm.id) {
              const obj = {};
              Object.entries(this.ruleForm).forEach(([key, value]) => {
                if (value != this.currentForm[key] && key != 'children') {
                  obj[key] = value || 'empty';
                }
              })
              if (Object.entries(obj).length > 0) {
                obj.id = this.ruleForm.id
                this.$http.post('wallet/backmgr/privilege/updateSysUrl.do', obj).then((res) => {
                  this.$notify({
                    title: '成功',
                    message: `修改 ${this.ruleForm.name} 菜单成功`,
                    type: 'success'
                  });
                  this.resetFields();
                  this.getAllSysUrl();
                  this.dialogFormVisible = false;
                })
              }
            } else {
              // 新增二级
              if (this.currentNode) {
                const parent = this.currentNode.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === this.currentData.id);
                const currentChildren = children[index];
                this.ruleForm.parentId = currentChildren.id;
              } else {
                // 新增一级
                this.ruleForm.parentId = 0;
              }

              this.$http.post('wallet/backmgr/privilege/createSysUrl.do', this.ruleForm).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `创建${this.ruleForm.name}菜单成功`,
                  type: 'success'
                });
                this.getAllSysUrl();
                this.resetFields();
                this.dialogFormVisible = false;
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      remove(node, data) {
        if (data.children.length > 0) {
          this.$notify.error({
            title: '错误',
            message: '请先删除子菜单！'
          });
          return;
        }
        this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('wallet/backmgr/privilege/deleteSysUrl.do', {
            id: data.id
          }).then((res) => {
            this.$notify({
              title: '成功',
              message: `删除${data.name}菜单成功`,
              type: 'success'
            });
            this.getAllSysUrl();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      getAllSysUrl() {
        this.$http.post('wallet/backmgr/privilege/getAllSysUrl.do').then((res) => {
          const { list } = res.result;
          this.treeData = list;
        })
      },
      showDescription(describe) {
        this.$alert(describe, '描述', {
          showClose: false,
          closeOnClickModal: true,
        }).catch(() => {
        });
      },
    },
    activated() {
      this.getAllSysUrl();
    }
  };
</script>
<style lang="less">
  .menu-title {
    .sac-label {
      display: inline-block;
      width: 180px;
    }
    .sac-btn {
      margin-left: 50px;
    }
    .el-tree {
      width: 600px;
      margin: 0 auto;
      .el-tree-node__content {
        height: 30px;
      }
    }
    .tips_textarea {
      position: absolute;
      color: #b8b8b8;
      bottom: -10px;
      right: 10px;
    }
    .sac-icon {
      margin-left: 20px;
      color: #afaeae;
    }
  }
</style>
