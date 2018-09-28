
<template>
  <div class='query'>
    <el-row>
      <el-col :span="18">
          <p style="margin:0 0 0 30px;font-weight:bold;">本期PNB总投票数：48952</p>
      </el-col>
      <el-col :span="4" style="text-align:center;margin-bottom: 30px;">
        <el-button size="small" type="primary" @click="addUser">节点申请</el-button>
      </el-col>
    </el-row>
    <el-form :inline="true"
             label-width="80px"
             ref="filterForm"
             :model="filterForm">
      <sac-input
        ref="phone"
        label="账号"
        v-model.trim="filterForm.phone"
        prop="phone"></sac-input>
      <sac-input
        ref="nickName"
        label="节点名"
        v-model.trim="filterForm.nickName"
        prop="nickName"></sac-input>
      <sac-select label="状态" v-model="filterForm.stateType" :data-list="stateList"></sac-select>

      <sac-submit-form
        @submitForm="submitForm(1)"
        @resetForm="resetForm"></sac-submit-form>
    </el-form>
    <sac-table :data="listData.list">
      <el-table-column prop="userId" label="节点名" width="100"></el-table-column>
      <el-table-column prop="phone" label="Sacbox账号" width="130"></el-table-column>
      <el-table-column prop="realName" label="SAC收款地址"></el-table-column>
      <el-table-column prop="nickName" label="SAC持仓数"></el-table-column>
      <el-table-column prop="cardNo" label="PNB投票数"></el-table-column>
      <el-table-column prop="registTime" label="邮箱"></el-table-column>
      <el-table-column prop="registTime" label="节点简介"></el-table-column>
      <el-table-column prop="registTime" label="状态"></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="small" v-show="scope.row.optStatus== 2" type="success"
                     @click="optStatusChange(0,'解冻账号',scope.row)">解冻账号
          </el-button>
          <el-button size="small" v-show="scope.row.optStatus != 2" type="danger"
                     @click="optStatusChange(2,'冻结账号',scope.row)">冻结账号
          </el-button>
          <el-button size="small" v-show="scope.row.optStatus== 1" type="success" plain
                     @click="optStatusChange(0,'解锁账号',scope.row)">解锁账号
          </el-button>
          <el-button size="small" v-show="scope.row.optStatus== 0" type="warning"
                     @click="optStatusChange(1,'锁定账号',scope.row)">锁定账号
          </el-button>
          <el-button type="primary" size="small" @click.native="goDetail(scope.row.phone)">查看详情</el-button>
        </template>
      </el-table-column>
    </sac-table>
    <sac-pagination v-show="listData.list.length>0"
                    @handleChange="getPaginationChange"
                    :total="+listData.total"
                    :page-size="filterForm.pageSize"
                    :current-page="filterForm.pageNum">
    </sac-pagination>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <sac-input ref="phone" v-model="ruleForm.nodeName" label="节点名称" prop="nodeName"></sac-input>
        <sac-input ref="phone" v-model="ruleForm.phone" label="Sacbox账号" prop="phone"></sac-input>
        <sac-input ref="phone" v-model="ruleForm.address" label="Sacbox地址" prop="address"></sac-input>
        <sac-input ref="phone" v-model="ruleForm.sacNumber" label="SAC持仓数量" prop="sacNumber"></sac-input>
        <sac-input ref="phone" v-model="ruleForm.email" label="邮箱" prop="email"></sac-input>
        <el-form-item label="节点简介:" required prop="introduce">
          <el-col :span="16" style="position: relative;">
            <span class="tips tips_textarea">{{11}}/500</span>
            <el-input size="small" type="textarea" :rows="5" v-model="ruleForm.content" width="100%" maxlength="50"
                      placeholder="请输入节点简介"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="团队介绍:">
          <el-col :span="16">
            <el-input size="small" type="textarea" :rows="5" v-model="ruleForm.content" width="100%" maxlength="50"
                      placeholder="请输入团队介绍或上传文档"></el-input>
          </el-col>
        </el-form-item>
        <sac-input ref="offcialurl" v-model="ruleForm.offcialurl" label="官网地址" prop="offcialurl"></sac-input>
        <el-form-item label="运营及宣传方案:">
          <el-col :span="16">
            <el-input size="small" type="textarea" :rows="5" v-model="ruleForm.content" width="100%" maxlength="50"
                      placeholder="请输入运营及宣传方案或上传文档"></el-input>
          </el-col>
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
  import Md5 from '../../../static/js/md5';

  export default {
    name: 'query',
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
      return {
        stateList: [{
          value: '',
          label: '全部',
        }, {
          value: 'SystemMsg',
          label: '未审核',
        },{
          value: 'SystemMsg',
          label: '审核失败',
        },
        {
          value: '',
          label: '审核通过，已分配账号，未发邮件',
        }, {
          value: 'SystemMsg',
          label: '审核通过，已分配账号，已发邮件',
        }],
        filterForm: {
          phone: '',
          nickName: '',
          cardNo: '',
          coinAddr: '',
          pageNum: 1,
          pageSize: 20
        },
        listData: {
          total: null,
          list: [],
        },
        dialogTitle: '节点申请表',
        ruleForm: {
          phone: '',
          pwd: '',
          nickName: '',
        },
        rules: {
          phone: [
            { required: true, validator: checkUserName, trigger: 'blur' },
          ],
          pwd: [
            { required: true, validator: checkPwd, trigger: 'blur' },
          ],
        },
        dialogFormVisible: false,
      };
    },
    methods: {
      resetForm() {
        this.$refs.phone.reset();
        this.$refs.nickName.reset();
        this.$refs.cardNo.reset();
        this.$refs.coinAddr.reset();
        this.$refs.filterForm.resetFields(); // 重置query的数据
        this.listData.list = [];
      },
      submitForm(num) {
        this.filterForm.pageNum = num;
        const { phone, nickName, cardNo, coinAddr } = this.filterForm;
        if (phone || nickName || cardNo || coinAddr) {
          this.getUserInfoList();
        } else {
          this.$notify.error({
            title: '错误',
            message: '查询内容不能为空'
          });
        }
      },
      getUserInfoList() {
        this.$http.post('/wallet/backmgr/user/getUserInfoList.do', this.filterForm)
          .then((res) => {
            const { list, total } = res.result.list;
            this.listData.list = list;
            this.listData.total = total;
          });
      },
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        // this.filterForm.pageNum = currentPage;
        this.submitForm(currentPage);
      },
      goDetail(phone) {
        this.$router.push({ name: 'queryDetails', query: { phone } });
      },
      /**
       * 冻结/解冻 锁定/解锁 用户   optStatus  用户状态：2表示冻结，1表示锁定，0表示解冻
       * */
      optStatusChange(type, title, data) {
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '确定执行 '),
            h('span', { style: 'color: red' }, `${title} `),
            h('span', { style: 'color: #0a52e0' }, `${data.phone}`),
            h('span', null, ' 吗?'),
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              this.$http.post('wallet/backmgr/user/operatetUser.do', {
                userId: data.userId,
                optStatus: type,
              }).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `${title} ${data.phone} 成功`,
                  type: 'success'
                });
                this.getUserInfoList();
                done();
              })
            } else {
              done();
            }
          }
        })
      },
      // 创建用户
      addUser() {
        this.dialogTitle = '节点申请表';
        this.dialogFormVisible = true;
        this.ruleForm = {
          phone: '',
          pwd: '',
          nickName: '',
        };
        this.$refs.ruleForm && this.$refs.ruleForm.resetFields(); // 重置query的数据
      },
      determine() {
        const { phone, nickName } = this.ruleForm;
        const pwd = Md5(this.ruleForm.pwd);
        this.$http.post('wallet/backmgr/user/addUsers.do', {
          pwd,
          phone,
          nickName
        }).then((res) => {
          this.$notify({
            title: '成功',
            message: `创建用户 ${this.ruleForm.phone} 成功`,
            type: 'success'
          });
          this.dialogFormVisible = false;
        });
      }
    }
  };
</script>
<style lang="less">
  .query {
    .tips_textarea {
      bottom: -10px;
      right: 10px;
    }
  }
</style>
