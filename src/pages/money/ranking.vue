<template>
    <div class='exchangeSAC'>
      <el-form :inline="true"
               label-width="90px"
               ref="filterForm"
               :model="filterForm">
        <sac-input
          ref="phone"
          label="账号"
          v-model.trim="filterForm.phoneOrEmail"></sac-input>
        <sac-input
          ref="phone"
          label="昵称"
          v-model.trim="filterForm.nickName"></sac-input>
        <sac-submit-form
          :isReset='false'
          @submitForm="getUserRaking()"></sac-submit-form>
      </el-form>
      
       <el-table stripe border class="ExList" size="mini"    :data="ExList">
        <el-table-column prop="phone" label="手机号"  align="center"></el-table-column>
        <el-table-column prop="nickName" label="昵称"  align="center"></el-table-column>
         <el-table-column prop="usdtAmount" :label="$variableCoin">
          <div class="scope" slot-scope="scope">
            <p>可用:{{ scope.row.usdtAmount }}</p>
            <p>冻结:{{ scope.row.usdtFrozenAmount }}</p>
          </div>
        </el-table-column>
        <el-table-column prop="btcAmount"  label="BTC">
          <div class="scope" slot-scope="scope">
            <p>可用:{{ scope.row.btcAmount }}</p>
            <p>冻结:{{ scope.row.btcFrozenAmount }}</p>
          </div>
        </el-table-column>
        <el-table-column prop="ethAmount"  label="ETH">
          <div class="scope" slot-scope="scope">
            <p>可用:{{ scope.row.ethAmount }}</p>
            <p>冻结:{{ scope.row.ethFrozenAmount }}</p>
          </div>
        </el-table-column>
        <el-table-column prop="eosAmount"  label="EOS">
          <div class="scope" slot-scope="scope">
            <p>可用:{{ scope.row.eosAmount }}</p>
            <p>冻结:{{ scope.row.eosFrozenAmount }}</p>
          </div>
        </el-table-column>
         <el-table-column  label="操作" width="80px" fixed="right"  align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="$router.push({path:'/LegalCurrency/personalAssets',query:{userId:scope.row.user_id}})" >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table stripe border height="100%" size="mini"    :default-sort = "{prop: 'usdtAmount', order: 'descending'}" :data="listData.list" @sort-change='sortChange'>
        <el-table-column
          align="center"
          type="index"
          label="序号"
          :index="indexMethod">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="nick_name" label="昵称"  align="center"></el-table-column>
        <el-table-column prop="usdtAmount" sortable='custom' :label="$variableCoin">
          <div class="scope" slot-scope="scope">
            <p>可用:{{ scope.row.usdtAmount }}</p>
            <p>冻结:{{ scope.row.usdtFrozenAmount }}</p>
          </div>
        </el-table-column>
        <el-table-column prop="btcAmount" sortable ='custom' label="BTC">
          <div class="scope" slot-scope="scope">
            <p>可用:{{ scope.row.btcAmount }}</p>
            <p>冻结:{{ scope.row.btcFrozenAmount }}</p>
          </div>
        </el-table-column>
        <el-table-column prop="ethAmount" sortable ='custom' label="ETH">
          <div class="scope" slot-scope="scope">
            <p>可用:{{ scope.row.ethAmount }}</p>
            <p>冻结:{{ scope.row.ethFrozenAmount }}</p>
          </div>
        </el-table-column>
        <el-table-column prop="eosAmount" sortable ='custom' label="EOS">
          <div class="scope" slot-scope="scope">
            <p>可用:{{ scope.row.eosAmount }}</p>
            <p>冻结:{{ scope.row.eosFrozenAmount }}</p>
          </div>
        </el-table-column>
        <!-- <el-table-column prop="userStatusName"  label="状态"></el-table-column>
        <el-table-column prop="registTime" label="时间">
          <template class="scope" slot-scope="scope">
            {{  $fmtDate(scope.row.registTime,'full')}}
          </template> 
        </el-table-column>-->
         <el-table-column  label="操作" width="80px" fixed="right"  align="center">
          <template class="scope" slot-scope="scope">
            <!-- <el-button size="mini" @click="modify(scope.row)" >修改状态</el-button> -->
            <el-button size="mini" @click="$router.push({path:'/LegalCurrency/personalAssets',query:{userId:scope.row.user_id}})" >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <sac-pagination v-show="listData.list.length>0"
        @handleChange="getPaginationChange"
        :total="+listData.total"
        :page-size="filterForm.pageSize"
        :current-page="filterForm.pageNum">
      </sac-pagination>
      <el-dialog title="修改用户状态" :visible.sync="dialogVisible" width="500">
        <el-form :inline="true" label-width="90px" ref="ruleForm"  :model="ruleForm">
          <el-form-item label="状态调整:" prop="status">
              <el-select v-model="ruleForm.status">
                  <el-option :label="item.label" :value="item.value" v-for="(item,index) in ruleState" :key="index"></el-option>
              </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogConfirm">确认</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<script>
    export default {
        name: "exchangeSAC",
        data() {
            return {
              dialogVisible:false,
              ruleForm:{
                userId:'',
                reason:'',
                status:0
              },
              ruleState:[
                {
                    label:'正常状态',
                    value:0
                },
                {
                    label:'24小时冻结',
                    value:1
                },
                {
                    label:'永远冻结',
                    value:2
                }
            ],
            filterForm: {
              nickName: '',
              phoneOrEmail: '',
              pageNum: 1,
              pageSize: 20,
              coinName:'USDT',//'BTC'
              order:'desc'//和asc
            },
            coinType:'BTC',
            coinList:['BTC','USDT','ETH'],
            listData: {
              total: null,
              list: [],
            },
            ExList:[]
          };
        },
      methods: {
        indexMethod(index) {
          return   (this.filterForm.pageNum-1)*this.filterForm.pageSize+index+1
        },
        sortChange(a){
          if(a.order=="ascending"){//上升
            this.filterForm.order = 'asc'
          }else{//下降
            this.filterForm.order = 'desc'
          }
          if(a.prop=="btcAmount"){
            this.filterForm.coinName = 'BTC'
          }else{
            this.filterForm.coinName = 'USDT'
          }
          // this.filterForm.pageSize = 1;
          this.filterForm.pageNum = 1;
          this.getUserRaking();
        },
        dialogConfirm(){
            this.ruleState.forEach(v=>{
                if(v.value==this.ruleForm.status){
                    this.ruleForm.reason=v.label
                    return
                }
            })
            //console.log(this.ruleForm)
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                this.$http.post("/wallet/app/otc/backmgr/setCustomStatus", this.ruleForm).then(res => {
                    this.$notify({
                        title: "成功",
                        message: `修改成功`,
                        type: "success"
                    });
                        this.dialogVisible = false;
                        this.getUserRaking();
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        getPaginationChange(val, currentPage) {
          this.filterForm.pageSize = val;
          this.filterForm.pageNum = currentPage;
          this.getUserRaking();
        },
        modify(itemData){
            this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
            let default_status=0
            this.ruleState.forEach(v=>{
                if(v.label==itemData.userStatusName){
                    default_status=v.value
                    return
                }
            })
            this.ruleForm.userId=itemData.userId
            this.ruleForm.status=default_status
            this.dialogVisible=true
        },
        // 查询代理用户列表
        getUserRaking() {
          this.$http.post("/wallet/backmgr/personalRanking", this.filterForm).then((res) => {
            this.listData.list = res.result.pageInfo.list;
            this.ExList = res.result.sysList
            this.listData.total = res.result.pageInfo.total;
          })
        },
        detail(data){
          console.log(data)
        }
      },
      activated() {
        this.getUserRaking();      // 查询代理用户列表
      }
    };
</script>
<style lang="less">
    .exchangeSAC {
      /deep/.ExList{
        flex: none;
      }
      /deep/ .scope{
        // background: red;
        p{
          margin: 0;
        }
      }
    }
</style>
