/**
*  Created by   阿紫
*  On  2018/8/13
*  Content 用户管理
*/
<template>
  <div class='user'>
    <el-col :span="22" style="text-align:right; margin-bottom: 30px;">
      <el-button size="small" type="primary" @click="addUser">创建用户</el-button>
    </el-col>
    <sac-table :data="listData">
      <el-table-column prop="name" label="用户名称"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column label="操作" width="360">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="primary" size="small" @click.native="changePassword(scope.row)">修改登录密码</el-button>
          <el-button type="primary" size="small" @click.native="changeRole(scope.row)">分配角色</el-button>
          <el-button :type="scope.row.sysStatus==1?'danger':'warning'" size="small"
                     @click.native="goDisable(scope.row)">{{scope.row.sysStatus==1?'禁用':'启用'}}
          </el-button>
        </template>
      </el-table-column>
    </sac-table>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <sac-input ref="userName" v-model="ruleForm.userName" label="用户名称" prop="userName"></sac-input>
        <sac-input ref="pwd" type="password" v-model="ruleForm.pwd" label="登录密码" placeholder="请输入6-16位密码"
                   prop="pwd"></sac-input>
        <sac-select ref="roleId" label="所属角色" v-model="ruleForm.roleId" prop="roleId" size="small"
                    :data-list="roleList"></sac-select>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitForm" size="small">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisiblePwd">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px">
        <sac-input type="password" label="验证我的登录密码" placeholder="我的登录密码" v-model="ruleForm.ownPwd" prop="ownPwd"
                   ref="ownPwd"></sac-input>
        <sac-input type="password" ref="pwd" v-model="ruleForm.pwd" :label="`${currentData.name}的新登录密码`"
                   placeholder="请输入6-16位密码" prop="pwd"></sac-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisiblePwd = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitFormPwd" size="small">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisibleRole">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px">
        <el-form-item label="所属角色">
          <el-select v-model="ruleForm.roleId" placeholder="请选择所属角色">
            <el-option v-for="(item, index) in roleList"
                       size="small"
                       :label="item.label"
                       :value="item.value"
                       :key="index"></el-option>
          </el-select>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitFormRole" size="small">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import Md5 from '../../../static/js/md5';

  export default {
    name: "user",
    data() {
      const checkUserName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入用户名'));
        }
        callback();
      }
      const checkPwd = (rule, value, callback) => {
        if (!value || value.length < 6 || value.length > 16) {
          return callback(new Error('请输入6-16位密码'));
        }
        if (!/(?=.*[a-z])(?=.*\d)(?=.*[#@!~%^&*.])[a-z\d#@!~%^&*.]/i.test(value)) {
          return callback(new Error('登录密码必须是字母、数字和符号的组合'));
        }
        callback();
      };
      const checkRole = (rule, value, callback) => {
        if (value===''||value===undefined) {
          callback(new Error('请选择角色'));
        }
        callback();
      }
      return {
        listData: [],
        dialogFormVisible: false,
        dialogFormVisiblePwd: false, // 修改密码
        dialogFormVisibleRole: false, // 修改角色
        dialogTitle: '创建用户',
        ruleForm: {
          userName: '',
          pwd: '',
          ownPwd: '',
          roleId: '',
        },
        rules: {
          userName: [
            {required: true, validator: checkUserName, trigger: 'blur' },
          ],
          pwd: [
            {required: true, validator: checkPwd, trigger: 'blur' },
          ],
          roleId: [
            {required: true, validator: checkRole, trigger: 'change' },
          ]
        },
        roleList: [],
        currentData: {},
      };
    },
    methods: {
      // 创建用户
      addUser() {
        this.dialogTitle = '创建用户';
        this.dialogFormVisible = true;
        this.getSysRoleList();
      },
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            const { roleId, userName, pwd } = this.ruleForm;
            const md5Pwd = Md5(pwd);
            this.$http.post('wallet/backmgr/sysuser/addSysUser.do', {
              roleId,
              userName,
              md5Pwd
            }).then((res) => {
              this.$notify({
                title: '成功',
                message: `创建用户${userName}成功`,
                type: 'success'
              });
              this.getSysUserList();
            })
            // 重置
            this.$refs.ruleForm.resetFields();
            this.$refs.userName.reset();
            this.$refs.pwd.reset();
            this.$refs.roleId.reset();
            this.dialogFormVisible = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 修改密码
      changePassword(data) {
        this.dialogTitle = `修改 ${data.name} 的用户密码`;
        this.dialogFormVisiblePwd = true;
        this.currentData = data;
      },
      submitFormPwd() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            const { pwd, ownPwd } = this.ruleForm;
            const { id, name } = this.currentData;
            const Md5Pwd = Md5(pwd);
            const ownMd5Pwd = Md5(ownPwd);
            this.$http.post('wallet/backmgr/sysuser/changeSysUserPwd.do', {
              sysUserId: id,
              Md5Pwd,
              ownMd5Pwd,
            }).then((res) => {
              this.$notify({
                title: '成功',
                message: `修改用户 ${name} 的密码成功`,
                type: 'success'
              });
            }).catch((res) => {
              console.error(res);
            })
            // 重置
            this.$refs.ruleForm.resetFields();
            this.$refs.pwd.reset();
            this.$refs.ownPwd.reset();
            this.dialogFormVisiblePwd = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      // 修改角色
      changeRole(data) {
        this.dialogTitle = `修改 ${data.name} 的用户角色`;
        this.dialogFormVisibleRole = true;
        this.currentData = data;
        this.ruleForm.roleId = data.roleId || '';
        this.getSysRoleList();
      },
      submitFormRole() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            const { id, name, roleId } = this.currentData;
            const roleIdNew = this.ruleForm.roleId;
            if (roleId != roleIdNew) {
              this.$http.post('wallet/backmgr/privilege/setSysRole.do', {
                sysUserId: id,
                roleId: roleIdNew,
              }).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `修改用户 ${name} 的角色成功`,
                  type: 'success'
                });
                this.getSysUserList();
              })
            }
            // 重置
            this.$refs.ruleForm.resetFields();
            this.dialogFormVisibleRole = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      // 解禁&启用
      goDisable(data) {
        const h = this.$createElement;
        const { sysStatus, name, id } = data;
        const status = sysStatus == 1 ? 0 : 1;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '此操作将 '),
            h('span', { style: 'color: red' }, sysStatus == 1 ? `禁用 ` : `启用 `),
            h('span', { style: 'color: #0a52e0' }, `${name}`),
            h('span', null, ' 用户, 是否继续?'),
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              this.$http.post('wallet/backmgr/sysuser/updateSysUserStatus.do', {
                sysUserId: id,
                status,
              }).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `${sysStatus == 1 ? '禁用' : '启用'} ${name} 成功`,
                  type: 'success'
                });
                this.getSysUserList();
                done();
              })
            } else {
              done();
            }
          }
        })
      },
      // 获取用户列表
      getSysUserList() {
        this.$http.post('wallet/backmgr/privilege/getSysUserList.do').then((res) => {
          const { sysUserList } = res.result;
          this.listData = sysUserList;
        })
      },
      // 获取角色
      getSysRoleList() {
        this.$http.post('wallet/backmgr/privilege/getSysRoleList.do').then((res) => {
          const { roleList } = res.result;
          roleList.forEach((item) => {
            item.label = item.roleName;
            item.value = item.roleId;
          })
          this.roleList = roleList;
        })
      },
    },
    activated() {
      this.getSysUserList();
    }
  };
</script>
<style lang="less">
  .user {
  }
</style>
