/*
 * @Author: dubbing 
 * @Date: 2018-12-04 11:34:14 
 * @Last Modified by: dubbing
 * @Content 资产总览
 * @Last Modified time: 2018-12-14 16:12:20
 */
<template>
  <div class="asset-overview">
    <div class="overview">
      <div class="overview_box">
        <p>区块链总资产折合：{{allAsset.blockChainAsset}} RMB</p>
        <p>
          <span>热钱包总资产折合：{{allAsset.warmWalletAsset}} RMB</span>
          <span>冷钱包总资产折合：{{allAsset.coldWalletAsset}} RMB</span>
        </p>
        <p>冷钱包持有人：{{allAsset.coldWalletHolder}}</p>
      </div>  
      <div class="overview_box">
        <el-button type="primary" @click="toHotWattet">归拢到热钱包</el-button>
        <el-button type="primary" @click="toColdWattet">归拢到冷钱包</el-button>
      </div>
    </div>
    <div style="height:calc((100% - 140px)/2)">
      <sac-table :data="listData.list">
        <el-table-column align="center" prop="coinName" label="币种" width="90"></el-table-column>
        <el-table-column align="center" prop="userWalletAsset" label="用户持有总额"></el-table-column>
        <el-table-column align="center" prop="warmWalletAsset" label="热钱包总额"></el-table-column>
        <el-table-column align="center" prop="coldWalletAsset" label="冷钱包总额"></el-table-column>
        <el-table-column align="center" prop="blockChainAsset" label="总额"></el-table-column>
        <el-table-column align="center" prop="warmWalletAddress" label="热钱包地址"></el-table-column>
        <el-table-column align="center" prop="coldWalletAddress" label="冷钱包地址"></el-table-column>

        <el-table-column label="操作" width="100">
          <template slot-scope="scope" prop="sysStatus">
            <el-button plain size="small" @click.native="recharge(scope.row)">充币</el-button>
          </template>
        </el-table-column>
      </sac-table>
    </div>
    <p class="detail_p">中心化总资产折合：{{allAsset.walletAsset}} RMB</p>
    <div style="height:calc((100% - 130px)/2)">
      <sac-table :data="centerData">
        <el-table-column align="center" prop="coinName" label="币种" width="90"></el-table-column>
        <el-table-column align="center" prop="amount" label="用户持有总额"></el-table-column>
      </sac-table>
    </div>
    <!-- <sac-pagination v-show="listData.list.length>0"
                    @handleChange="getPaginationChange"
                    :total="+listData.total"
                    :page-size="filterForm.pageSize"
                    :current-page="filterForm.pageNum">
    </sac-pagination>-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%">
      <el-form :inline="true" label-width="90px" ref="ruleForm" :rules="rules" :model="ruleForm">
        <!-- <sac-coin  ref="coinId"  v-model="ruleForm.coinId"></sac-coin> -->
        <el-form-item label="币        种:" prop="coinId">
          <el-select v-model="ruleForm.coinId" placeholder="请选择币种">
            <el-option :label="item.coinName" :value="item.coinId" v-for="(item,index) in coinList" :key="index"></el-option>
            <!--   <el-option label="ETH" value="2"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="充币地址:" style="width:100%" class="item-width-all">
          <el-col>
            <span>热钱包</span>
            <div id="qrcode">
              <img :src="QC_CodeUrl" alt>
              <div>
                {{address}}
                <el-button
                  class="copy_qrcode"
                  plain
                  size="small"
                  @click.native="copy()"
                  :data-clipboard-text="address"
                >复制</el-button>
              </div>
            </div>
          </el-col>
        </el-form-item>
        <el-form-item label="来源地址:">
          <el-radio-group v-model="radio">
            <el-radio label="1">冷钱包</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="充值金额:" prop="amount" >
          <el-input v-model="ruleForm.amount" placeholder="请输入充值金额"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <div>余额：
            <span class="colorBlue">{{balance}}</span>
            {{coinName}}
            <el-button plain size="small" @click.native="pushAll()">全部</el-button>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">发起申请</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { dateFormat } from "@/common/util";
import { transactionType, transferQueryStatus } from "@/common/constants";
import Clipboard from "clipboard";
import QRCode from "qrcode";
export default {
  name: "asset-overview",
  
  data() {
    const validAmount = (rule, value, callback) => {
        if(value==''){
          callback(new Error('请输入充值金额'));
        }else if (value>this.balance) {
          callback(new Error('余额不足'));
        }  else {
          callback();
        }
      };
    return {
      ColdWalletAsset:{},//各币种冷资产
      coinData: [],
      radio: "1",
      dialogVisible: false,
      dialogTitle: "充币",
      coinName: "",
      QC_CodeUrl: "",
      balance: 0, //余额
      address: "16UwLL9Risc3QfvKofHmBQ7wMtjvM",
      ruleForm: {
        coinId: "",

        //fromAddress:'',
        amount: ""
      },
      allAsset: {},
      rules: {
        /* fromAddress: [
            { required: true, message: '请选择来源地址', trigger: 'change' },
          ], */
        amount: [
          { required: true, trigger: "blur",validator:validAmount }
        ]
      },
      filterForm: {
        pageNum: 1,
        pageSize: 20
      },
      listData: {
        total: null,
        list: []
      },
      centerData: [],
      moneyList: [],
      selectedDate: [], //已选日期
      transactionType, // 交易类型
      transferQueryStatus, // 交易类型
      isContent: false
    };
  },
  computed: {
      coinList(state) {
        const { coinList } = this.$store.state;
        if (this.isAll) {
          this.selected = '';
          return [{
            value: '',
            label: '全部'
          }, ...coinList]
        }
        this.selected = 1; // sac
        return coinList
      }
    },
  methods: {
    //从冷钱包充值到热钱包
    toHotWattet() {
      this.$http
        .post("cloud/asset/open/collectUserAsset", {})
        .then(res => {
          this.$message({
            message: "归拢到热钱包成功",
            type: "success"
          });
        });
    },
    //归拢热钱包资产到冷钱包
    toColdWattet() {
      this.$http
        .post("cloud/asset/open/collectWarmWalletAsset", {})
        .then(res => {
          this.$message({
            message: "归拢到冷钱包成功",
            type: "success"
          });
        });
    },
    //发起申请
    dialogConfirm() {
      //this.ruleForm.amount = this.balance;
      
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$http
            .post("cloud/asset/open/rechargeWarmWalletAsset", this.ruleForm)
            .then(res => {
              this.$notify({
                title: "成功",
                message: `申请成功`,
                type: "success"
              });
              this.dialogFormVisible = false;
              this.getbill();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //复制
    copy() {
      this.$message({
        message: "复制充币地址成功",
        type: "success"
      });
    },
    //全部余额代入
    pushAll() {
      this.ruleForm.amount = this.balance;
    },
    //充币
    recharge(data) {
      this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
      this.ruleForm.coinId = "";
      this.ruleForm.amount = "";
      this.balance = data.coldWalletAsset;
      this.coinList.filter(v => {
        if (v.coinName == data.coinName) {
          this.ruleForm.coinId = v.coinId;
          this.coinName = v.coinName;

          return;
        }
      });

      this.dialogVisible = true;
    },
    //二维码
    qrcode() {
      QRCode.toDataURL(this.address)
        .then(url => {
          //console.log(url)
          this.QC_CodeUrl = url;
        })
        .catch(err => {
          // console.error(err)
        });
    },
    getbill() {
      this.$http.post("cloud/asset/open/getBlockTotalAsset", {}).then(res => {
        const { list } = res.result;
        this.listData.list = list;
      });
      //总资产折合
      this.$http.post("cloud/asset/open/getTotalAsset", this.filterForm).then(res => {
        this.allAsset = res.result;
      });

      //中心化资产总览
      this.$http.post("cloud/asset/open/getCenteringAsset", this.filterForm).then(res => {
        this.centerData = res.result.list;
      });
    },
    getOtherData() {
      //币种
      /* this.$http.post("wallet/backmgr/coin/getSampleCoinInfo.do", {}).then(res => {
        this.coinData = res.result.list;
      }); */

      //获取各币种冷资产
      this.$http.post("cloud/asset/open/getColdWalletAsset", {}).then(res => {
        this.ColdWalletAsset=res.result
      });
      
    },
  },
  watch: {
    "ruleForm.coinId": {
      handler(newVal, oldVal) {
        this.coinList.filter(v => {
          if (v.coinId == newVal) {
            this.coinName = v.coinName;
            this.balance=this.ColdWalletAsset[v.coinName].balance
            this.address=this.ColdWalletAsset[v.coinName].addr
            this.ruleForm.amount=''
            this.$refs.ruleForm && this.$refs.ruleForm.clearValidate()
            this.qrcode()
            return;
          }
        });
      },
      immediate: true
      // deep: true
    }
  },
  activated() {
    const end = dateFormat();
    const start = dateFormat(new Date().getTime() - 3600 * 1000 * 24 * 15);
    this.selectedDate = [start, end];
    this.getbill();
    this.getOtherData();
    this.qrcode();
    new Clipboard(".copy_qrcode");
  }
};
</script>
<style lang="less">
.asset-overview {
  .colorBlue {
    color: #409eff;
  }
  .detail_p {
    color: #606266;
    padding: 3px 10px;
    margin-bottom: 0;
  }
  .overview {
    display: flex;
    padding-bottom: 20px;
    .overview_box:first-child {
      padding-left: 10px;
      flex-grow: 1;
    }
    .overview_box:last-child {
      flex-grow: 1;
    }
    .overview_box {
      p {
        color: #606266;
        margin: 5px 0 0 0;
        span {
          display: inline-block;
          margin-right: 30px;
        }
      }
    }
  }
  .el-tag {
    margin-right: 10px;
  }
  .el-form-item {
    margin-bottom: 3px;
    line-height: 33px;
    /* height: 33px; */
    display: block;
  }
  .el-form--inline {
    .yh-submit {
      .el-form-item__content {
        width: 90px;
      }
    }
  }
  .item-width-all {
    .el-form-item__content {
      width: calc(100% - 90px);
    }
  }
  .changeContent {
    font-size: 14px;
    color: red;
    line-height: 40px;
    display: inline-block;
  }
  .content {
    height: 0;
    overflow: hidden;
    transition: all 0.5s;
  }
  .is-active {
    height: 80px;
  }
  .moneyList {
    margin-top: 10px;
  }
}
</style>
