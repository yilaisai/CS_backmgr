/**
*  Created by   阿紫
*  On  2019/6/17 0017
*  Content 代理刷单-返佣规则设置
*/
<template>
  <div class='ruleSetting'>
    <el-col :span="22" style="text-align:right;margin-bottom: 10px;">
      <el-button size="small" type="primary" @click="addSend">创建规则</el-button>
    </el-col>
    <sac-table :data="registList">
      <el-table-column prop="coinId" label="返佣币种"></el-table-column>
      <el-table-column prop="lower" label="初级代理提成"></el-table-column>
      <el-table-column prop="middle" label="中级代理提成"></el-table-column>
      <el-table-column prop="senior" label="高级代理提成"></el-table-column>
      <el-table-column prop="service" label="服务中心提成"></el-table-column>
      <el-table-column prop="peers" label="平级补助"></el-table-column>
      <el-table-column label="上架">
        <template slot-scope="scope" prop="isShow">
          <el-switch v-model="scope.row.state" :inactive-value="0" :active-value="1"
                     @click.native="registerSwitchChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="success" size="small"
                     @click.native="modification(scope.row)">修改
          </el-button>
          <el-button type="danger" size="small"
                     @click.native="remove(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </sac-table>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" class="register_dialog">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="135px">
        <el-form-item label="返佣币种：" prop="coinId" size="small" class="from_box_item">
          <el-select v-model="ruleForm.coinId" placeholder="请选择返佣币种">
            <el-option
              v-for="item in coinList"
              :key="item.coinId"
              :label="item.coinName"
              :value="item.coinId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="初级代理提成：" prop="lower" class="from_box_item">
          <el-input type="number" size="small" v-model="ruleForm.lower" placeholder="">
            <span slot="suffix">%</span>
          </el-input>
        </el-form-item>
        <el-form-item label="中级代理提成：≤" prop="middle" class="from_box_item">
          <el-input type="number" size="small" v-model="ruleForm.middle" placeholder="">
            <span slot="suffix">%</span>
          </el-input>
        </el-form-item>
        <el-form-item label="高级代理提成：" prop="senior" class="from_box_item">
          <el-input type="number" size="small" v-model="ruleForm.senior" placeholder="">
            <span slot="suffix">%</span>
          </el-input>
        </el-form-item>
        <el-form-item label="服务中心提成：" prop="service" class="from_box_item">
          <el-input type="number" size="small" v-model="ruleForm.service" placeholder="">
            <span slot="suffix">%</span>
          </el-input>
        </el-form-item>
        <el-form-item label="平级补助：" prop="peers" class="from_box_item">
          <el-input type="number" size="small" v-model="ruleForm.peers" placeholder="">
            <span slot="suffix">%</span>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="registDetermine" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: "ruleSetting",
    data() {
      return {
        coinList: [],
        registList: [],
        dialogTitle: '',
        dialogFormVisible: false,
        ruleForm: {
          coinId: '', // 项目币种id
          lower: '', // 初级代理提成
          middle: '', // 中级代理提成
          senior: '', // 高级代理提成
          service: '', // 服务中心
          peers: '', // 平级补助
        },
        rules: {
          coinId: [
            {required: true, message: '请选择币种', trigger: 'change'},
          ],
          lower: [
            {required: true, message: '请输入初级代理提成', trigger: 'blur'},
          ],
          middle: [
            {required: true, message: '请输入中级代理提成', trigger: 'blur'},
          ],
          senior: [
            {required: true, message: '请输入高级代理提成', trigger: 'blur'},
          ],
          service: [
            {required: true, message: '请输入服务中心提成', trigger: 'blur'},
          ],
          peers: [
            {required: true, message: '请输入平级补助', trigger: 'blur'},
          ],
        },
      };
    },
    methods: {
      remove(itemData) {
        const {id} = itemData;
        this.$confirm(`确定删除吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete("/cloud/backmgr/shop/deleteAgencyRuleById", {
            id
          }).then((res) => {
            this.$notify({
              title: '成功',
              message: `删除成功`,
              type: 'success'
            });
            this.getList();
          })
        })
      },
      registerSwitchChange(itemData) {
        const {state, id} = itemData;
        this.$http.get("/cloud/backmgr/shop/updateRuleStatus", {
          status: state ? "enable" : "disable",
          id
        }).then((res) => {
          this.$notify({
            title: '成功',
            message: `${state ? "上架" : "下架"} 成功`,
            type: 'success'
          });
          this.getList();
        }).catch(() => {
          this.getList();
        })
      },
      addSend() {
        this.dialogTitle = '新建返佣规则';
        this.dialogFormVisible = true;
        this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
      },
      modification(itemData) {
        this.dialogTitle = '修改返佣规则';
        this.dialogFormVisible = true;
        this.isFix = true;
        this.ruleForm = JSON.parse(JSON.stringify(itemData));
        this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
        this.getSampleCoinInfo();
      },
      registDetermine() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            const {coinId, id, lower, middle, senior, service, peers} = this.ruleForm;
            if (this.ruleForm.id) {
              this.$http.put("/cloud/backmgr/shop/updateAgencyRule", {
                coinId, id, lower, middle, senior, service, peers
              }).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `修改成功`,
                  type: 'success'
                });
                this.dialogFormVisible = false;
                this.getList();
              })
            } else {
              this.$http.post("/cloud/backmgr/shop/addAgencyRule", {
                coinId, lower, middle, senior, service, peers
              }).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `创建成功`,
                  type: 'success'
                });
                this.dialogFormVisible = false;
                this.getList();
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getSampleCoinInfo() {
        this.$http.post("wallet/backmgr/coin/getSampleCoinInfo.do", {}).then((res) => {
          this.coinList = res.result.list
        })
      },
      getList() {
        this.$http.post("/cloud/backmgr/shop/listAgencyRule", {
          pageNum: 1,
          pageSize: 200,
        }).then((res) => {
          this.registList = res.result.list;
        })
      }
    },
    activated() {
      this.getList();      // 获取记录
      this.getSampleCoinInfo(); // 币种
    }
  };
</script>
<style lang="less">
  .ruleSetting {
  }
</style>
