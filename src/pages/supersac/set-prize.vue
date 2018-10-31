
<template>
  <div class='set-prize'>
    <el-row style="margin-bottom: 20px;">
        <el-col :span="8">
            <el-button size="small" type="primary" plain @click="$router.go(-1)">返回</el-button>
        </el-col>
        <h2>{{teamName}}奖励设置</h2>
    </el-row>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="230px">
      <el-form-item :label="teamName+'总奖励:'" v-for="(teamReward,index) in sacTeamRewardList" :key="index" required>
        <el-col :span="8">
          <el-form-item prop="coinType">
            <el-select ref="coinType" v-model="teamReward.coinId">
              <el-option
                  v-for="item,index in pageTypeList"
                  :key="index"
                  :label="item.coinName"
                  :value="item.coinId"
                  >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1"></el-col>
        <el-col :span="7">
          <el-form-item prop="coinNumber">
            <el-input v-model="teamReward.amount" clearable size="small" placeholder="请输入数量"
                      class="min-input"></el-input>
          </el-form-item>
        </el-col>
        <el-button type="danger" size="small" style="width: 100px" @click="deletePrize(teamReward,index)" v-show="!teamReward.type">删除</el-button>
        <el-button type="primary" size="small" style="width: 100px" @click="addPrize(teamReward,index)" v-show="index == sacTeamRewardList.length - 1">添加</el-button>
      </el-form-item>
      <el-form-item label="王者奖励百分比:" prop="kingRewardRate">
        <el-input style="width:80%" clearable v-model="ruleForm.kingRewardRate" size="small" placeholder="请输入百分比">
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <el-form-item label="钻石+铂金奖励百分比:" prop="goldSilverRate" required>
        <el-input style="width:80%" v-model="ruleForm.goldSilverRate" size="small"
                  placeholder="请输入百分比" clearable>
            <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <el-form-item label="黄金奖励百分比:" prop="bronzeRewardRate">
        <el-input style="width:80%" clearable v-model="ruleForm.bronzeRewardRate" size="small"
                  placeholder="请输入百分比">
            <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <el-form-item label="总人数奖励百分比:" prop="eachOneRate">
        <el-input style="width:80%" clearable v-model="ruleForm.eachOneRate" size="small"
                  placeholder="请输入百分比">
            <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <p class="total-prize">*各奖励百分比相加等于100%</p>
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
        coinValue: '',
        ruleForm: {
          coinType: "",
          kingRewardRate: '',
          goldSilverRate: '',
          bronzeRewardRate: '',
          eachOneRate: '',
        },
        sacTeamRewardList: [],
        tapIndex: '',
        teamName: '',
        teamId: '',
        server_path: "",
        pageTypeList: [],
        rules: {
          bronzeRewardRate: [
            { required: true, message: '请输入数额', trigger: 'blur' },
            { validator: checkNum, message: '必须为数字' }
          ],
          goldSilverRate: [
            { required: true, message: '请输入数额', trigger: 'blur' },
            { validator: checkNum, message: '必须为数字' }
          ],
          kingRewardRate: [
            { required: true, message: '请输入数额', trigger: 'blur' },
            { validator: checkNum, message: '必须为数字' }
          ],
          // coinType: [
          //   { required: true, message: '请选择币种', trigger: 'change' },
          //   { message: '必须为数字' }
          // ],
          eachOneRate: [
            { required: true, message: '请输入数额', trigger: 'blur' },
            { validator: checkNum, message: '必须为数字' }
          ],
        }
      };
    },
    methods: {
      // 提交/修改团队配置信息
      onSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            console.log(Number(this.ruleForm.kingRewardRate) + Number(this.ruleForm.goldSilverRate) + Number(this.ruleForm.bronzeRewardRate) + Number(this.ruleForm.eachOneRate));
            if (Number(this.ruleForm.kingRewardRate) + Number(this.ruleForm.goldSilverRate) + Number(this.ruleForm.bronzeRewardRate) + Number(this.ruleForm.eachOneRate) != 100) {
              this.$notify({
                message: '各奖励百分比相加必须等于100%！',
                type: 'error'
              });
              return
            }
            const ruleForm = JSON.parse(JSON.stringify(this.ruleForm))
            console.log('this.teamId', this.teamId);
            this.$http.post("/supernode/backmgr/team/teamRewardSeting",{
              'teamId': this.teamId,
              'kingRewardRate': (this.ruleForm.kingRewardRate/100).toFixed(2),
              'goldRewardRate': (this.ruleForm.goldSilverRate/100).toFixed(2),
              'bronzeRewardRate': (this.ruleForm.bronzeRewardRate/100).toFixed(2),
              'eachOneRate': (this.ruleForm.eachOneRate/100).toFixed(2),
            }).then((res) => {
              console.log(res)
              this.$message({
                type: 'success',
                message: '修改成功！'
              });
              this.$router.go(-1)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 添加币种
      addPrize(data,index) {
        console.log('data', data);
        if (!data.coinId || data.coinId == '') {
          this.$notify({
            message: '请选择币种类型',
            type: 'error'
          });
          return
        }
        if ((data.amount + '').trim() == '') {
          this.$notify({
            message: '请输入币种的数量',
            type: 'error'
          });
          return
        }
        // if (index == this.tapIndex -1 ) {
        //   this.sacTeamRewardList.push({'coinName':'','amount': '','type':1})
        //   return
        // }
        this.$http.post("/supernode/backmgr/team/teamCoinSeting",{
          'teamId': this.teamId,
          'coinId': data.coinId,
           'id': data.id,
          'amount': data.amount
        }).then((res) => {
          console.log(res)
          if (res.code == 200) {
            this.sacTeamRewardList[this.sacTeamRewardList.length -1].type = 0
            console.log('this.sacTeamRewardList11111',this.sacTeamRewardList);
            this.getTeamRewardSeting(this.teamId).then(() => {
              this.sacTeamRewardList.push({'coinName':'','amount': '','type':1})
            })
          }
        })
      },
      // 删除币种
      deletePrize(data,index){
        let coinId = data.coinName
        if (typeof coinId != 'number') {
          coinId = data.coinId
        }
        this.$http.post("/supernode/backmgr/team/delTeamCoinSeting",{
          'teamId': this.teamId,
          'coinId': coinId,
        }).then((res) => {
          this.getTeamRewardSeting(this.teamId)
        })
      },
      filter(data) {
        if (data == undefined) {
          return ''
        } else {
          return data*100
        }
      },
      // 获取奖励配置
      getTeamRewardSeting(teamId){
        return this.$http.post("/supernode/backmgr/team/getTeamRewardSeting",{
          'teamId': teamId
        }).then((res) => {
          console.log(res)
          // debugger
          let data = res.result || {}
          this.ruleForm = {
            eachOneRate: this.filter(data.eachOneRate),
            goldSilverRate: this.filter(data.goldSilverRate),
            kingRewardRate: this.filter(data.kingRewardRate),
            bronzeRewardRate: this.filter(data.bronzeRewardRate),
            sacTeamRewardCoinResultDtoList: data.sacTeamRewardCoinResultDtoList,
            teamId: data.teamId,
            id: data.id
          }
          if (!(res.result || {}).sacTeamRewardCoinResultDtoList ||((res.result || {}).sacTeamRewardCoinResultDtoList).length == 0) {
            this.sacTeamRewardList = [{'coinName':'','amount': '','type':1}]
            this.tapIndex = ''
          } else {
            this.sacTeamRewardList = (res.result || {}).sacTeamRewardCoinResultDtoList
            this.tapIndex = (res.result || {}).sacTeamRewardCoinResultDtoList.length
          }
          console.log('this.sacTeamRewardList', this.sacTeamRewardList);
          this.ruleForm.coinType = (this.sacTeamRewardList[0] || {}).coinName
          // this.$refs.coinType[0].lable = this.sacTeamRewardList[0].coinName
        })
      },
      // 获取币种类型
      getCoinInfoList(){
        this.$http.post("/supernode/coin/open/getCoinInfoList",{}).then((res) => {
          console.log(res)
          // debugger
          this.pageTypeList = res.result;
        })
      },
    },
    activated() {
      this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
      this.getCoinInfoList();
      this.server_path = SERVER_PATH;
      if(this.$route.query) {
          this.teamName = this.$route.query.teamName
          this.teamId = this.$route.query.teamId
          this.getTeamRewardSeting(this.teamId)
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
      margin: 35px 0 0 81px;
    }
    .el-input--suffix .el-input__inner {
      height: 32px!important;
    }
  }
</style>
