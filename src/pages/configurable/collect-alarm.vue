/**
*  Created by   阿紫
*  On  2018/8/10
*  Content 收告警短信设置
*/
<template>
  <div class='collect-alarm'>
    <el-col :span="22" style="text-align:right; margin-bottom:30px;">
      <el-button size="small" type="primary" @click="addSend">创建告警短信</el-button>
    </el-col>
    <sac-table :data="list">
      <el-table-column prop="id" label="序号"></el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column prop="name" label="用户姓名"></el-table-column>
      <el-table-column label="邮件类型">
        <template slot-scope="scope">
          <span v-if="scope.row.rtype == 0">审核告警</span>
          <span v-if="scope.row.rtype == 1">上链异常</span>
          <span v-if="scope.row.rtype == 2">到账延时</span>
          <span v-if="scope.row.rtype == 3">商户余额</span>
        </template>
      </el-table-column>
      <el-table-column prop="intervalTime" label="发送间隔"></el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button :type="scope.row.activeStatus == 1? 'danger' : 'primary'" size="small"
                     @click.native="handleStatus(scope.row.id,scope.row.activeStatus)">{{scope.row.activeStatus == 1?
            '暂停' : '生效'}}
          </el-button>
          <el-button type="success" size="small" @click.native="remove(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </sac-table>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="130px">
        <el-form-item label="手机号码：" prop="phone">
          <el-input size="small" v-model="ruleForm.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="告警类型:" prop="rtype">
          <el-select v-model="ruleForm.rtype" size="small" style="width:100%;" placeholder="请选择">
            <el-option v-for="(item,index) in alarmlist" :key="item.code" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户姓名：">
          <el-input size="small" v-model="ruleForm.name" placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="发生间隔：" prop="Intervals">
          <el-input size="small" style="width:60%;" v-model="ruleForm.IntervalTime" placeholder="请输入发生间隔"></el-input>
          <span style="margin-left:10px;"> 分钟</span>
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
    name: 'collect-alarm',
    data() {
      const checkNum = (rule, value, callback) => {
        if (!/^[0-9]+.?[0-9]*$/.test(value)) {
          callback(new Error(rule.message));
        } else {
          callback();
        }
      };
      return {
        list: [],
        alarmlist: [],
        ruleForm: {
          phone: "",
          rtype: '',
          name: '',
          IntervalTime: ''
        },
        dialogTitle: '',
        dialogFormVisible: false,
        rules: {
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
          ],
          rtype: [
            { required: true, message: '请选择', trigger: 'change' },
          ],
          IntervalTime: [
            { required: true, message: '请输入时间间隔', trigger: 'blur' },
            { validator: checkNum, message: '时间间隔必须为数字' }
          ]
        }
      };
    },
    methods: {
      resetForm() {
        this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
      },
      getAlarmList() {
        const { pageNum, pageSize } = this;
        this.$http.post("wallet/backmgr/alarm/getAlarmList.do", { pageNum, pageSize }).then((res) => {
          const { list } = res.result;
          this.list = list;
        })
      },
      // 删除
      remove(id) {
        this.$confirm(`确定删除吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post("wallet/backmgr/alarm/deleteAlarm.do", {
            id
          }).then((res) => {
            this.$notify({
              title: '成功',
              message: `删除成功`,
              type: 'success'
            });
            this.getAlarmList();
          })
        })
      },
      handleStatus(id, activeStatus) {
        const opt = {
          id: id,
          activeStatus: activeStatus == 1 ? 0 : 1
        }
        this.$http.post("wallet/backmgr/alarm/addOrUpdateAlarm.do", opt).then((res) => {
          this.$notify({
            title: '成功',
            message: `${activeStatus == 1 ? '暂停' : '生效'}成功`,
            type: 'success'
          });
          this.getAlarmList();
        })
      },
      getSysAlarmType() {
        if (!this.alarmlist.length) {
          this.$http.post("/wallet/backmgr/alarm/getSysAlarmType.do", {}).then((res) => {
            this.alarmlist = res.result.list
          })
        }
      },
      addSend() {
        this.dialogTitle = '创建告警短信';
        this.dialogFormVisible = true;
        this.getSysAlarmType();
        this.resetForm();
      },
      determine() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$http.post("wallet/backmgr/alarm/addOrUpdateAlarm.do", this.ruleForm).then((res) => {
              this.$notify({
                title: '成功',
                message: `创建成功`,
                type: 'success'
              });
              this.dialogFormVisible = false;
              this.getAlarmList();
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    activated() {
      this.getAlarmList();
    }
  };
</script>
<style lang="less">
  .collect-alarm {
  }
</style>
