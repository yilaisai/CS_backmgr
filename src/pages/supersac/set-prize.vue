
<template>
  <div class='set-prize'>
    <el-row style="margin-bottom: 20px;">
        <el-col :span="8">
            <el-button size="small" type="primary" plain @click="$router.go(-1)">返回</el-button>
        </el-col>
        <h2>team a奖励设置</h2>
    </el-row>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="230px">
      <el-form-item label="team a总奖励:" required>
        <el-col :span="8">
          <el-form-item prop="coinType">
            <el-select ref="coinType" v-model="ruleForm.coinType">
              <el-option
                  v-for="item,index in pageTypeList"
                  :key="index"
                  :label="item.typeName"
                  :value="item.coinType">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1"></el-col>
        <el-col :span="7">
          <el-form-item prop="coinNumber">
            <el-input v-model="ruleForm.coinNumber" clearable size="small" placeholder="请输入数量"
                      class="min-input"></el-input>
          </el-form-item>
        </el-col>
        <el-button type="primary" style="width: 100px" @click="addPrize">添加</el-button>
        <el-button type="primary" style="width: 100px" @click="deletePrize">删除</el-button>
      </el-form-item>
      <el-form-item label="最强王者奖励百分比:" prop="kingRate">
        <el-input style="width:80%" clearable v-model="ruleForm.kingRate" size="small"
                  placeholder="请输入百分比"></el-input>
      </el-form-item>
      <el-form-item label="荣耀黄金+持续白银奖励百分比:" prop="goldRate" required>
        <el-input style="width:80%" v-model="ruleForm.goldRate" size="small"
                  placeholder="请输入百分比" clearable></el-input>
      </el-form-item>
      <el-form-item label="倔强青铜奖励百分比:" prop="bronzeRate">
        <el-input style="width:80%" clearable v-model="ruleForm.bronzeRate" size="small"
                  placeholder="请输入百分比"></el-input>
      </el-form-item>
      <el-form-item label="总人数奖励百分比:" prop="totalPrize">
        <el-input style="width:80%" clearable v-model="ruleForm.totalPrize" size="small"
                  placeholder="请输入百分比"></el-input>
      </el-form-item>
      <p class="total-prize">*各奖励百分比相加等于总奖励</p>
      <el-form-item size="small" style="text-align:center; width:80%; margin-top:60px;">
        <el-button type="primary" style="width: 100px" @click="onSubmit">提交</el-button>
        <el-button type="danger" style="width: 100px;" @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: "currency-set",
    data() {
      const checkNum = (rule, value, callback) => {
        if (!/^[0-9]+.?[0-9]*$/.test(value)) {
          callback(new Error(rule.message));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          coinType: "",
          coinNumber: "",
          kingRate: '',
          goldRate: '',
          bronzeRate: '',
          totalPrize: '',
        },
        server_path: "",
        pageTypeList: [],
        rules: {
          bronzeRate: [
            { required: true, message: '请输入数额', trigger: 'blur' },
            { validator: checkNum, message: '转账限额必须为数字' }
          ],
          goldRate: [
            { required: true, message: '请输入数额', trigger: 'blur' },
            { validator: checkNum, message: '转账限额必须为数字' }
          ],
          bronzeRate: [
            { required: true, message: '请选择是否是ETH代币', trigger: 'change' },
          ],
          coinType: [
            { required: true, message: '请输入最小转账数额', trigger: 'blur' },
            { validator: checkNum, message: '账数额必须为数字' }
          ],
          coinNumber: [
            { required: true, message: '请输入最小转账数额', trigger: 'blur' },
            { validator: checkNum, message: '账数额必须为数字' }
          ],
          totalPrize: [
            { required: true, message: '请输入数额', trigger: 'blur' },
            { validator: checkNum, message: '短信通知限额必须为数字' }
          ],
        }
      };
    },
    methods: {
      resetForm() {
        this.ruleForm.contractadres = '';
        this.$refs.ruleForm.resetFields();
      },
      onSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            const ruleForm = JSON.parse(JSON.stringify(this.ruleForm))
            ruleForm.tranInFee = (this.ruleForm.tranInFee + this.tranInFeeUnit).trim();
            ruleForm.tranOutFee = (this.ruleForm.tranOutFee + this.tranOutFeeUnit).trim();
            if (ruleForm.coinId) {
              ruleForm.contractadres = ruleForm.contractadres || 'empty';
              this.$http.post("wallet/backmgr/coin/updateCoinInfo.do", ruleForm).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `${ruleForm.coinName} 修改成功`,
                  type: 'success'
                });
                setTimeout(() => {
                  this.$router.push({
                    path: '/configurable/currency',
                  })
                }, 1000)
                this.$store.commit('setCoinList', []);
                this.$store.dispatch('getSampleCoinInfo');
              })
            } else {
              this.$http.post("wallet/backmgr/coin/createCoinInfo.do", ruleForm).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `${ruleForm.coinName} 创建成功`,
                  type: 'success'
                });
                setTimeout(() => {
                  this.$router.push({
                    path: '/configurable/currency',
                  })
                }, 1000)
                this.$store.commit('setCoinList', []);
                this.$store.dispatch('getSampleCoinInfo');
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addPrize() {

      },
      deletePrize(){

      }
    },
    activated() {
      this.resetForm();
      this.server_path = SERVER_PATH;
      if (this.$route.params.coinId) {
        this.ruleForm = JSON.parse(JSON.stringify(this.$route.params));
        const tranInFee = this.ruleForm.tranInFee.split('%');
        const tranOutFee = this.ruleForm.tranOutFee.split('%');
        this.ruleForm.tranInFee = tranInFee[0];
        this.tranInFeeUnit = tranInFee.length > 1 ? '%' : '';
        this.ruleForm.tranOutFee = tranOutFee[0];
        this.tranOutFeeUnit = tranOutFee.length > 1 ? '%' : '';
        this.ruleForm.bronzeRate = this.ruleForm.bronzeRate == 0 ? 'NO' : 'YES';
        this.ruleForm.goldRate = this.ruleForm.tranLimitNrealName;
        this.buttonTitle = '修改币种';
      } else {
        this.buttonTitle = '创建币种';
      }
    }
  };
</script>
<style lang="less">
  .set-prize {
    position: relative;
    .el-form {
      width: 1000px;
    }
    .el-input {
      width: auto;
    }
    .input-before-lable1 {
      color: #606266;
      margin-left: 10px;
    }
    .input-before-lable {
      color: #606266;
      margin-left: 30px;
    }

    .charge-select {
      width: 95px;
      margin-left: 1px;
    }
    .el-tag {
      background-color: transparent;
      border: none;
    }
    .total-prize {
      color: red;
      font-size: 15px;
      margin-left: 81px;
    }
    .el-input--suffix .el-input__inner {
      height: 32px!important;
    }
  }
</style>
