<template>
  <div class='merchantReport'>
    <!-- 筛选条件 -->
		<Query ref="query" @queryData='getData' @exportExcel="exportExcel" @clear="clear" :orderStatus="orderStatus" :formData="formData"/>

    <!-- 表格 -->
		<Table :list="pageData.list" :orderStatus="orderStatus"  @sort="getData"></Table>

    <div class="load-more" style="display: flex;">
      <div class="count">
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[20,50]"
        :page-size="pageSize"
        :pager-count="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.total*1">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import Query from './components/query.vue'
  import Table from './components/table.vue'
  export default {
    data() {
      return { 
        orderStatus: [
          {name: '失败', val: 0},
          {name: '成功', val: 1},
          {name: '待审核', val: 2},
          {name: '审核不通过', val: 3},
          {name: '审核通过', val: 4},
        ],
        pageData: {
          total: 0,
          list: []
        },
        formData: {
          create_time: '',
					addr: '', //地址
					coinName: null, //币种名称
					startDate: '', //起始时间
					endDate: '', //结束时间
					name: '', //账号
					orderId: '', //订单号
					pageNum: '', //页码
					pageSize: '', //页数
					status: null, //状态0-失败,1-成功,2-待审核,3-审核不通过,4-审核通过
					txId: '' //txid
        },
        pageNum:1,
        pageSize:20,
        sumInfo:'',
      }
    },
    activated(){
      this.getData()
    },
    methods: {
      getData(formData) {
        if(formData) this.pageNum = 1
        formData = formData || this.formData
        formData.pageNum = this.pageNum
        formData.pageSize = this.pageSize
        this.formData = formData
        this.$http.post('/wallet/backmgr/merchant/trade/queryRechargeWithdrawPage', formData).then(res => {
          if(res.code == 200) {
            this.pageData = res.result.pageInfo
            this.sumInfo = res.result.sumInfo
          }
        })
      },
      exportExcel(formData) {
        formData = formData || this.formData
        formData.pageNum = this.pageNum
        formData.pageSize = this.pageSize
        formData.token = localStorage.getItem('wallet_token') || ""
        const baseUrl = localStorage.getItem('SERVER_PATH') || window.SERVER_PATH
        window.open(baseUrl + '/wallet/backmgr/merchant/trade/queryRechargeWithdrawPage/export?' + qs.stringify(formData))
      },
      handleCurrentChange(val) {
        this.pageNum = val
        this.getData()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getData()
      },
      clear() {
        this.formData = {
					create_time: '',
					addr: '', //地址
					coinName: null, //币种名称
					startDate: '', //起始时间
					endDate: '', //结束时间
					name: '', //账号
					orderId: '', //订单号
					pageNum: '', //页码
					pageSize: '', //页数
					status: null, //状态0-失败,1-成功,2-待审核,3-审核不通过,4-审核通过
					txId: '' //txid
				}
      },
    },
    components:{
      Query,
      Table
    },
    watch:{
      formData:{
        handler(newVal,oldVal){
          console.log(newVal)
        },
        deep:true
      }
    }
  }
</script>
<style lang="less" scoped>
.merchantReport{
	overflow: hidden;
	.load-more {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .count {
            font-size: 14px;
            span {
                margin-right: 20px;
                i {
					display: inline-block;
					margin-right: 10px;
                    font-style: normal;
                    color: #409EFF;
                    font-weight: 600;
                }
            }
        }
	}
}
</style>