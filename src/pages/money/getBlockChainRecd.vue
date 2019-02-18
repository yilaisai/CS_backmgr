/**
*  Created by Hansen
*  On  2018/8/10
*  Content 链上到账审核
*/
<template>
  <div>
    <el-form :inline="true"
             label-width="80px"
             ref="filterForm"
             :model="option">
      <sac-select ref="recdStatus" label="审核状态" v-model="option.recdStatus"
                  :dataList="recdStatusType" @change="onChange"></sac-select>
      <sac-submit-form
        @submitForm="submitForm(1)"
        @resetForm="resetForm"></sac-submit-form>
    </el-form>

    <sac-table :data="listData.list">
      <el-table-column prop="coinName" label="币种"></el-table-column>
      <el-table-column prop="amount" label="数量"></el-table-column>
      <el-table-column prop="recdStatus" label="审核状态">
        <template slot-scope="scope">
          <span v-if="scope.row.recdStatus == 2">待审核</span>
          <span style="color:red" v-if="scope.row.recdStatus == 3">不通过</span>
          <span style="color:green" v-if="scope.row.recdStatus == 4">通过</span>
        </template>
      </el-table-column>
      <el-table-column prop="direction" label="交易方向">
        <template slot-scope="scope">
          <span v-if="scope.row.direction == 0">提币</span>
          <span v-if="scope.row.direction == 1">充币</span>
        </template>
      </el-table-column>
      <el-table-column prop="txStatus" label="上链状态">
        <template slot-scope="scope">
          <span v-if="scope.row.txStatus == 0">成功</span>
          <span v-if="scope.row.txStatus == 1">失败</span>
        </template>
      </el-table-column>
      <el-table-column prop="fromAddr" label="来源地址"></el-table-column>
      <el-table-column prop="toAddr" label="目标地址"></el-table-column>
      <el-table-column prop="txId" label="hash值"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="txTime" label="交易时间">
        <template slot-scope="scope">
          <span>
            {{+scope.row.txTime * 1000 | dateFormat('YYYY-MM-DD HH:mm:ss')}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="审核" width="180">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.recdStatus != 2" type="success" size="small"
                     @click.native="auditTrade(scope.row.recdId,'4')">通过
          </el-button>
          <el-button :disabled="scope.row.recdStatus != 2" type="danger" size="small"
                     @click.native="auditTrade(scope.row.recdId,'3')">不通过
          </el-button>
        </template>
      </el-table-column>
    </sac-table>
    <sac-pagination v-show="listData.list.length>0"
                    @handleChange="getPaginationChange"
                    :total="+listData.total"
                    :page-size="option.pageSize"
                    :current-page="option.pageNum">
    </sac-pagination>
  </div>
</template>

<script>
export default {
  name: 'getBlockChainRecd',
  data: function() {
    return {
      listData: {
          total: null,
          list: [],
        },
        elSwitch:false,
        option:{
          pageSize:20,
          pageNum:1,
          recdStatus:''
        },
        recdStatusType:[
          {value:'',label:'全部'},
          {value:'2',label:'待审核'},
          {value:'3',label:'审核不通过'},
          {value:'4',label:'审核通过'},
        ]
    }
  },
  methods: {
   getList(){
     this.$http.post('/wallet/backmgr/block/getBlockChainRecdList.do',this.option).then(res=>{
       this.listData = res.result.list;
     })
   },
   getPaginationChange(val, currentPage) {
        this.option.pageSize = val;
        this.option.pageNum = num;
        this.getList();
      },
   auditTrade(recdId, tradeStatus) {
        this.$confirm('确认此操作吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let obj = {
            recdStatus:tradeStatus,
            recdId:recdId
          }
          this.$http.post('/wallet/backmgr/block/auditBlockChainRecd.do',obj).then(res=>{
            this.$message({
              type: 'success',
              message: '审核成功!'
            });
            this.getList();
          })
        }).catch(() => {

        });
      },
      submitForm(num) {
        this.option.pageNum = num;
        this.getList();
      },
      resetForm() {
        this.$refs.recdStatus.reset();
        this.$refs.filterForm.resetFields();
        this.option.pageNum = 1;
        this.getList();
      },
      onChange(value){
        // this.option.recdStatus = value;
      }
  },
  mounted(){
    this.getList();
  }
}
</script>

<style scoped>

</style>
