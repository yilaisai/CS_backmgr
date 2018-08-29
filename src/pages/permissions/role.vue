/**
*  Created by   阿紫
*  On  2018/8/10
*  Content 角色管理
*/
<template>
  <div class='role'>
    <el-col :span="22" style="text-align:right; margin-bottom: 30px;">
      <el-button size="small" type="primary" @click="addRole">创建角色</el-button>
    </el-col>
    <sac-table :data="listData">
      <el-table-column prop="roleName" label="角色名称" width="130"></el-table-column>
      <el-table-column label="用户" prop="sysUserList"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="150"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="150"></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click.native="modify(scope.row)">修改角色名称或权限</el-button>
          <el-button type="primary" size="small" @click.native="remove(scope.row)">删除角色</el-button>
        </template>
      </el-table-column>
    </sac-table>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="ruleForm.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-tree
            :data="treeData"
            show-checkbox
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps">
          </el-tree>
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
    name: 'role',
    data() {
      return {
        listData: [],
        treeData: [],
        dialogFormVisible: true,
        dialogTitle: '创建角色',
        ruleForm: {
          name: '',
          urlId: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
          ]
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        currentForm: {},
      };
    },
    methods: {
      resetFields() {
        this.ruleForm = {
          name: '',
          urlId: '',
        };
      },
      addRole() {
        this.dialogTitle = '创建角色';
        this.dialogFormVisible = true;
        this.resetFields();
        this.$refs.tree.setCheckedKeys([]);
      },
      modify(data) {
        this.dialogTitle = `修改 ${data.roleName} 角色`;
        const { roleId, roleName } = data;
        this.ruleForm.name = roleName;
        this.ruleForm.id = roleId;
        this.currentForm.name = roleName;
        this.currentForm.id = roleId;
        this.$http.post('wallet/backmgr/privilege/getRoleUrl.do', {
          roleId
        }).then((res) => {
          const { idsList } = res.result
          this.ruleForm.urlId = idsList;
          this.currentForm.urlId = idsList;
          this.$refs.tree.setCheckedKeys(idsList);
          this.dialogFormVisible = true;
        })
      },
      determine() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.ruleForm.urlId = this.$refs.tree.getCheckedKeys().join(',') || '';
            const { id, name, urlId } = this.ruleForm;
            if (id || id == 0) {
              const obj = {};
              Object.entries(this.ruleForm).forEach(([key, value]) => {
                if (value != this.currentForm[key]) {
                  obj[key] = value || 'empty';
                }
              })
              if (Object.entries(obj).length > 0) {
                obj.id = this.currentForm.id
                this.$http.post('wallet/backmgr/privilege/updateSysRole.do', obj).then((res) => {
                  this.$notify({
                    title: '成功',
                    message: `修改${this.ruleForm.name}角色成功`,
                    type: 'success'
                  });
                  this.resetFields();
                  this.getSysRoleList();
                })
              }
            } else {
              this.$http.post('wallet/backmgr/privilege/createSysRole.do', this.ruleForm).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `创建${this.ruleForm.name}角色成功`,
                  type: 'success'
                });
                this.getSysRoleList();
                this.resetFields();
              })
            }
            this.dialogFormVisible = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      remove(data) {
        this.$confirm(`此操作将永久删除 ${data.roleName} 角色, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('wallet/backmgr/privilege/deleteSysRole.do', {
            roleId: data.roleId
          }).then((res) => {
            this.$notify({
              title: '成功',
              message: `删除 ${data.roleName} 角色成功`,
              type: 'success'
            });
            this.getSysRoleList();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      getSysRoleList() {
        this.$http.post('wallet/backmgr/privilege/getSysRoleList.do').then((res) => {
          const { roleList } = res.result;
          roleList.forEach((item) => {
            if (item.sysUserList && item.sysUserList.length) {
              if (item.sysUserList.length == 1) {
                item.sysUserList = item.sysUserList[0].Name;
              } else {
                item.sysUserList = item.sysUserList.reduce((prev, next) => `${prev.Name ? prev.Name : prev}，${next.Name}`);
              }
            }
          });
          this.listData = roleList;
        })
      },
      getAllSysUrl() {
        this.$http.post('wallet/backmgr/privilege/getAllSysUrl.do').then((res) => {
          const { list } = res.result;
          this.treeData = list;
        })
      },
    },
    activated() {
      this.getSysRoleList();
      this.getAllSysUrl();
      this.dialogFormVisible = false;
    }
  };
</script>
<style lang="less">
  .role {
  }
</style>
