/*
 * @Author: dubbing 
 * @Date: 2018-12-04 16:12:51 
 * @Last Modified by: dubbing
 * @Content 归拢记录
 * @Last Modified time: 2018-12-17 16:11:42
 */

<template>
  <div class='collapse-record'>
    <el-form :inline="true" label-width="120px" ref="filterForm" :model="filterForm">
        <div class="title">
            <sac-coin ref="coinId" v-model="filterForm.coinId"></sac-coin>
            <sac-select ref="tradeType" label="交易类型" v-model="filterForm.type" :dataList="typeData"></sac-select>
            <sac-select ref="status" label="状态" v-model="filterForm.status" :dataList="statusData"></sac-select>
            <sac-date ref="selectedDate" label="日　　期" v-model="selectedDate"></sac-date>
            <sac-submit-form @submitForm="submitForm(1)" :isReset="false"></sac-submit-form>
        </div>
    </el-form>
    <div class="moneyList">
      <el-tag v-for="(item,index) in moneyList" :key="index">{{item.name}}：{{item.value}}</el-tag>
    </div>
    <sac-table :data="listData.list">
        <el-table-column align="center" prop="recdId" label="序号"></el-table-column>
        <el-table-column align="center" prop="type" label="交易类型"></el-table-column>
        <el-table-column align="center" prop="coinName" label="转账币种"></el-table-column>
        <el-table-column align="center" prop="auditAmount" label="申请金额"></el-table-column>
        <el-table-column align="center" prop="realAmount" label="转账金额"></el-table-column>
        <el-table-column align="center" prop="collectFee" label="手续费"></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="编辑完成时间"></el-table-column>
        <el-table-column align="center" prop="status" label="状态"></el-table-column>
        <el-table-column align="center" prop="txId" label="txid或拒绝理由" >
            <template slot-scope="scope">
                <span v-if="scope.row.txId">{{scope.row.txId}}</span>
                <span v-else>{{scope.row.refuseReason}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="timeWarning" label="时间告警" width="120">
            <template slot-scope="scope">
                <span v-if="scope.row.timeWarning==false">无</span>
                <span v-else style="background:#F56C6C;color:#fff;padding:4 0px;border-radius:5px;display:block">编辑告警</span>
                
            </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
            <template slot-scope="scope" prop="sysStatus">
            <el-button  plain size="small" v-if="scope.row.collectStatus==2"
                        @click.native="edit(scope.row)">编辑
            </el-button>
            </template>
        </el-table-column>
    </sac-table>
    <sac-pagination v-show="listData.list.length>0"
                    @handleChange="getPaginationChange"
                    :total="+listData.total"
                    :page-size="filterForm.pageSize"
                    :current-page="filterForm.pageNum">
    </sac-pagination>
    
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%">
        <el-form :inline="true" label-width="90px" ref="ruleForm" :rules="rules" :model="ruleForm">
            <el-form-item label="币 种:" prop="coinId">
                <el-select v-model="ruleForm.coinId" placeholder="请选择币种" >
                    <el-option :label="item.coinName" :value="item.coinId" v-for="(item,index) in coinList" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="充币地址:" style="width:100%" class="item-width-all">
                <div><span>热钱包({{address}})</span></div>
            </el-form-item>
            <el-form-item label="状态:" class="radio-box" prop="status">
                <el-radio-group v-model="ruleForm.status">
                    <el-radio  :label="item.value" v-for="(item,index) in stateData" :key="index">{{item.label}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="充值金额:" prop="amount">
                <el-input v-model="ruleForm.amount" placeholder="请输入充值金额"></el-input>
            </el-form-item>
            <el-form-item label="txid:" prop="txId">
                <el-input v-model="ruleForm.txId" placeholder="请输入txid"></el-input>
            </el-form-item>
            <el-form-item label="拒绝理由:"  prop="refuseReason" v-if="ruleForm.status=='AUDIT_FAIL'">
                <el-input type="textarea" v-model="ruleForm.refuseReason" placeholder="请输入拒绝理由"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogConfirm">确定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  import { dateFormat } from '@/common/util';
  import { transactionType, transferQueryStatus } from '@/common/constants';
import { mapState, mapActions } from 'vuex';
  export default {
    name: 'collapse-record',
    data() {
      return {
          stateData2:[
            {
                label:'失败',
                value:'FAIL',
                key:0
            },
            {
                label:'成功',
                value:'SUCCESS',
                key:1
            },
            {
                label:'待审核',
                value:'AUDITING',
                key:2
            },
            {
                label:'审核失败',
                value:'AUDIT_FAIL',
                key:3
            },
            {
                label:'处理中',
                value:'PROCESSING',
                key:5
            }
          ],
          stateData:[
              {
                label:'成功',
                value:'SUCCESS'
            },
            {
                label:'审核失败',
                value:'AUDIT_FAIL',
            },
          ],
          //coinList:[],
          coinData:[],
        dialogVisible: false,
        dialogTitle:'编辑',
        address:'16UwLL9Risc3QfvKofHmBQ7wMtjvM',
        ruleForm:{
            coinId:'',
            id:'',
            status:'SUCCESS',
            amount:'',
            txId:'',
            refuseReason:''
        },
        rules:{
            coinId: [
                { required: true, message: '请选择币种', trigger: 'change' },
            ],
            status: [
                { required: true, message: '请选择状态', trigger: 'change' },
            ],
            amount: [
                { required: true, message: '请输入充值金额', trigger: 'change' },
            ],
            /* txId: [
                { required: true, message: '请输入txid', trigger: 'change' },
            ], */
            refuseReason: [
                { required: true, message: '请输入拒绝理由', trigger: 'change' },
            ],
            
        },
        filterForm: {
            coinId: '',
            type:'',
            status: '', 
            startDate: '',
            endDate: '',
            pageNum: 1,
            pageSize: 20
        },
        listData: {
          total: null,
          list: [],
        },
        moneyList: [],
        selectedDate: [], //已选日期
        transactionType,  // 交易类型
        transferQueryStatus,  // 交易类型
        typeData:[
            {
                value: '',
                label: '全部',
            },
            {
                value: '0',
                label: '未知类型',
            },
            {
                value: '1',
                label: '用户归拢到钱包',
            },
            {
                value: '2',
                label: '热钱包归拢到冷钱包',
            },
            {
                value: '3',
                label: '冷钱包到热钱包',
            },
            {
                value: '4',
                label: '热钱包转到用户',
            }
            
        ],
        statusData:[
            {
                value: '',
                label: '全部',
            },
            {
                label:'失败',
                value:'FAIL',
                //key:0
            },
            {
                label:'成功',
                value:'SUCCESS',
               // key:1
            },
            {
                label:'待审核',
                value:'AUDITING',
              //  key:2
            },
            {
                label:'审核失败',
                value:'AUDIT_FAIL',
              //  key:3
            },
            {
                label:'处理中',
                value:'PROCESSING',
              //  key:5
            }
        ],
        
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
        //确定
        dialogConfirm(){
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.$http.post("cloud/asset/open/updateCollectionRecd", this.ruleForm).then((res) => {
                        this.$notify({
                            title: '成功',
                            message: `编辑成功`,
                            type: 'success'
                        });
                        this.dialogVisible = false;
                        this.getbill();
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //导出excel
        exportExcel(){
            let param = '';
            for(let v in this.filterForm) {
                param += v + '=' + this.filterForm[v] + '&';
            }
                location.href = SERVER_PATH + 'wallet/backmgr/trade/downTradeList.do?' + param + 'token=' + localStorage.getItem('wallet_token');
            },
        //编辑
        edit(itemData){
            this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
            this.ruleForm.coinId=''
            this.ruleForm.txId = itemData.txId;
            this.ruleForm.refuseReason = itemData.refuseReason;
            this.ruleForm.amount = itemData.realAmount;
            this.ruleForm.id=itemData.recdId;
            this.ruleForm.status='SUCCESS'
            /* this.stateData.filter(v=>{
                if(v.key==itemData.statusCode){
                    this.ruleForm.status=v.value
                }
            }) */
            //this.ruleForm.status=itemData.statusCode.toString();
            this.coinList.filter(v=>{
                if(v.coinName==itemData.coinName){
                    this.ruleForm.coinId=v.coinId;
                    return
                }
            })
            this.dialogVisible=true
        },
      submitForm(num) {
        this.filterForm.pageNum = num;
        this.getbill();
      },
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        this.submitForm(currentPage);
      },
      getbill() {
        this.filterForm.startDate = this.selectedDate && this.selectedDate[0];
        this.filterForm.endDate = this.selectedDate && this.selectedDate[1];
        this.$http.post('cloud/asset/open/getCollectionRecd', this.filterForm).then((res) => {
            const { list,total } = res.result.list;
            this.listData.list = list;
            this.listData.total = total;
        });
      },
        /* getOtherData(){
            //币种
            this.$http.post('wallet/backmgr/coin/getSampleCoinInfo.do', {}).then((res) => {
                this.coinData=res.result.list
            });
        }, */
    },
    activated() {
        const end = dateFormat();
        const start = dateFormat(new Date().getTime() - 3600 * 1000 * 24 * 15);
        this.selectedDate = [start, end];
        this.getbill();
        //this.getOtherData()
        //console.log(this.coinList)
    }
  };
</script>
<style lang="less">
  .collapse-record {
      .radio-box{
              height: auto !important; 
              width:100%;
          .el-form-item__content{
              width:calc(100% - 90px);
              .el-radio{
                 // margin-bottom: 16px;
                 line-height:38px;
              }
          }
      }
    .el-tag {
      margin-right: 10px;
    }
    .el-form-item {
      margin-bottom: 3px;
      line-height: 33px;
      height: 60px;
    }
    .el-form--inline {
      .yh-submit {
        .el-form-item__content {
          width: 80px;
        }
      }
    }
    .item-width-all{
      .el-form-item__content{
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
    /* .is-active {
      height: 80px;
    } */
    .moneyList {
      margin-top: 10px;
    }
  }
</style>
