/**
*  Created by   阿紫
*  On  2018/8/20
*  Content
*/
<template>
  <div class='currency-set'>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="190px">
      <el-form-item label="币种:" prop="coinName">
        <el-input v-model="ruleForm.coinName" size="small" clearable placeholder="请输入币种"></el-input>
      </el-form-item>
      <el-form-item label="应用图标:" prop="iconUrl">
        <el-input style="width:80%" v-model="ruleForm.iconUrl" clearable size="small" placeholder="请输入应用图标地址">
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
      </el-form-item>
      <el-form-item label="合约地址:">
        <el-input style="width:80%" clearable v-model="ruleForm.contractadres" size="small"
                  placeholder="请输入合约地址"></el-input>
      </el-form-item>
      <el-form-item label="未身份认证每日转账限额:" prop="tranLimitNRealNameAmount">
        <el-input style="width:80%" v-model="ruleForm.tranLimitNRealNameAmount" size="small"
                  placeholder="请输入数额" clearable></el-input>
      </el-form-item>
      <el-form-item label="是否是ETH代币:" prop="isErc20">
        <el-radio-group v-model="ruleForm.isErc20">
          <el-radio v-model="ruleForm.isErc20" label="YES">是</el-radio>
          <el-radio v-model="ruleForm.isErc20" label="NO">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="最小转账数额:" required>
        <el-col :span="11">
          <el-form-item prop="tranInMinAmount">
            <span class="input-before-lable1">站内</span>
            <el-input v-model="ruleForm.tranInMinAmount" clearable size="small" placeholder="请输入最小转账数额"
                      class="min-input"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2"></el-col>
        <el-col :span="11">
          <el-form-item prop="tranOutMinAmount">
            <span class="input-before-lable">站外</span>
            <el-input v-model="ruleForm.tranOutMinAmount" clearable size="small" placeholder="请输入最小转账数额"
                      class="min-input"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="转账手续费:" required>
        <el-col :span="11">
          <el-form-item prop="tranInFee">
            <span class="input-before-lable1">站内</span>
            <el-input v-model="ruleForm.tranInFee" clearable size="small" placeholder="请输入手续费"
                      class="min-input"></el-input>
            <el-select v-model="tranInFeeUnit" placeholder="请选择" size="small" class="charge-select">
              <el-option label="固定值" value=""></el-option>
              <el-option label="百分比" value="%"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2"></el-col>
        <el-col :span="11">
          <el-form-item prop="tranOutFee">
            <span class="input-before-lable">站外</span>
            <el-input v-model="ruleForm.tranOutFee" clearable size="small" placeholder="请输入手续费"
                      class="min-input"></el-input>
            <el-select v-model="tranOutFeeUnit" placeholder="请选择" size="small" class="charge-select">
              <el-option label="固定值" value=""></el-option>
              <el-option label="百分比" value="%"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="后台审核转账限额:" required>
        <el-col :span="11">
          <el-form-item prop="auditInMinAmount">
            <span class="input-before-lable1">站内</span>
            <el-input v-model="ruleForm.auditInMinAmount" clearable size="small" placeholder="请输入数额"
                      class="min-input"></el-input>
            <el-tag>RMB</el-tag>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2"></el-col>
        <el-col :span="11">
          <el-form-item prop="auditOutMinAmount">
            <span class="input-before-lable">站外</span>
            <el-input v-model="ruleForm.auditOutMinAmount" clearable size="small" placeholder="请输入数额"
                      class="min-input"></el-input>
            <el-tag>RMB</el-tag>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="短信验证限额:" required>
        <el-col :span="11">
          <el-form-item prop="smsCkInMinAmount">
            <span class="input-before-lable1">站内</span>
            <el-input v-model="ruleForm.smsCkInMinAmount" clearable size="small" placeholder="请输入数额"
                      class="min-input"></el-input>
            <el-tag>RMB</el-tag>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2"></el-col>
        <el-col :span="11">
          <el-form-item prop="smsCkOutMinAmount">
            <span class="input-before-lable">站外</span>
            <el-input v-model="ruleForm.smsCkOutMinAmount" clearable size="small" placeholder="请输入数额"
                      class="min-input"></el-input>
            <el-tag>RMB</el-tag>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="短信通知限额:" required>
        <el-col :span="11">
          <el-form-item prop="smsInNoticeMinAmount">
            <span class="input-before-lable1">站内</span>
            <el-input v-model="ruleForm.smsInNoticeMinAmount" clearable size="small" placeholder="请输入数额"
                      class="min-input"></el-input>
            <el-tag>RMB</el-tag>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2"></el-col>
        <el-col :span="11">
          <el-form-item prop="smsOutNoticeMinAmount">
            <span class="input-before-lable">站外</span>
            <el-input v-model="ruleForm.smsOutNoticeMinAmount" clearable size="small" placeholder="请输入数额"
                      class="min-input"></el-input>
            <el-tag>RMB</el-tag>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="币种介绍:" prop="chineseDesc">
        <el-input style="width:80%" type="textarea" :rows="2" size="small" placeholder="请输入币种介绍"
                  v-model="ruleForm.chineseDesc"></el-input>
      </el-form-item>
      <el-form-item size="small" style="text-align:center; width:80%; margin-top:60px;">
        <el-button type="primary" style="width: 100px" @click="onSubmit">{{buttonTitle}}</el-button>
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
          coinName: "",
          chineseDesc: "",
          iconUrl: "",
          contractadres: "",
          isErc20: "",
          tranInMinAmount: "",
          tranOutMinAmount: "",
          tranInFee: "",
          tranOutFee: "",
          tranLimitNRealNameAmount: '',
          auditInMinAmount: "",
          auditOutMinAmount: "",
          smsCkInMinAmount: "",
          smsCkOutMinAmount: "",
          smsInNoticeMinAmount: '',
          smsOutNoticeMinAmount: '',
        },
        server_path: "",
        tranInFeeUnit: '',
        tranOutFeeUnit: '',
        buttonTitle: '创建币种',
        rules: {
          coinName: [
            { required: true, message: '请输入币种', trigger: 'blur' },
          ],
          iconUrl: [
            { required: true, message: '请输入应用图标地址', trigger: 'blur' },
          ],
          contractadres: [
            { required: true, message: '请输入合约地址', trigger: 'blur' },
          ],
          tranLimitNRealNameAmount: [
            { required: true, message: '请输入数额', trigger: 'blur' },
            { validator: checkNum, message: '转账限额必须为数字' }
          ],
          isErc20: [
            { required: true, message: '请选择是否是ETH代币', trigger: 'change' },
          ],
          tranInMinAmount: [
            { required: true, message: '请输入最小转账数额', trigger: 'blur' },
            { validator: checkNum, message: '账数额必须为数字' }
          ],
          tranOutMinAmount: [
            { required: true, message: '请输入最小转账数额', trigger: 'blur' },
            { validator: checkNum, message: '账数额必须为数字' }
          ],
          tranInFee: [
            { required: true, message: '请输入手续费', trigger: 'blur' },
            { validator: checkNum, message: '手续费必须为数字' }
          ],
          tranOutFee: [
            { required: true, message: '请输入手续费', trigger: 'blur' },
            { validator: checkNum, message: '手续费必须为数字' }
          ],
          auditInMinAmount: [
            { required: true, message: '请输入数额', trigger: 'blur' },
            { validator: checkNum, message: '转账限额必须为数字' }
          ],
          auditOutMinAmount: [
            { required: true, message: '请输入数额', trigger: 'blur' },
            { validator: checkNum, message: '转账限额必须为数字' }
          ],
          smsCkInMinAmount: [
            { required: true, message: '请输入数额', trigger: 'blur' },
            { validator: checkNum, message: '短信验证限额必须为数字' }
          ],
          smsCkOutMinAmount: [
            { required: true, message: '请输入数额', trigger: 'blur' },
            { validator: checkNum, message: '短信验证限额必须为数字' }
          ],
          smsInNoticeMinAmount: [
            { required: true, message: '请输入数额', trigger: 'blur' },
            { validator: checkNum, message: '短信通知限额必须为数字' }
          ],
          smsOutNoticeMinAmount: [
            { required: true, message: '请输入数额', trigger: 'blur' },
            { validator: checkNum, message: '短信通知限额必须为数字' }
          ],
          chineseDesc: [
            { required: true, message: '请输入币种介绍', trigger: 'blur' },
          ]
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
      upload(response, file, fileList) {
        this.ruleForm.iconUrl = response.result.urls[0]
      },
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
        this.ruleForm.isErc20 = this.ruleForm.isErc20 == 0 ? 'NO' : 'YES';
        this.ruleForm.tranLimitNRealNameAmount = this.ruleForm.tranLimitNrealName;
        this.buttonTitle = '修改币种';
      } else {
        this.buttonTitle = '创建币种';
      }
    }
  };
</script>
<style lang="less">
  .currency-set {
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
  }
</style>
