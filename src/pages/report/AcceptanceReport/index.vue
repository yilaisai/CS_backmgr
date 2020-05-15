<template>
  <div class='AcceptanceReport'>
    <!-- 筛选条件 -->
		<Query ref="query" @queryData='searchData' @exportExcel="exportExcel" @clear="clear" :formData="formData" />

    <!-- 表格 -->
		<Table :list="pageData.list"  @hideDialogMR="hideDialogMR" :activeUser="activeUser"></Table>

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
  import qs from 'qs'
  import {getYesterdayTime} from '@/common/util'
  export default {
    data() {
      return { 
        pageData: {
          total: 0,
          list: []
        },
        formData: {
          createDate:[getYesterdayTime(),getYesterdayTime()],
          startDate:getYesterdayTime(),
				  endDate:getYesterdayTime(),
					type: '0', //订单类型
					realName:'', //真实姓名
					account: '', //账号
					pageNum: '', //页码
					pageSize: '', //页数
				},
        showDialogMR:false,
        pageNum:1,
        pageSize:20,
        activeUser:0
      }
    },
    activated(){
      this.getData()
      this.getActiveUser()
    },
    methods: {
      getData(formData) {
        if(this.formData.createDate && this.formData.createDate.length==2){
          this.formData.startDate = this.formData.createDate[0]
          this.formData.endDate = this.formData.createDate[1]
        }else {
          this.formData.startDate = getYesterdayTime()
          this.formData.endDate = getYesterdayTime()
        }
        if(formData) this.pageNum = 1
        formData = formData || this.formData
        formData.pageNum = this.pageNum
        formData.pageSize = this.pageSize
        this.formData = formData
        this.$http.post('/wallet/app/otc/backmgr/coinMerchantReportForm', formData).then(res => {
          if(res.code == 200) {
            this.pageData = res.result
          }
        })
      },
      getActiveUser(){

        this.$http.post('/wallet/app/otc/backmgr/activeBS',{
          startTime:this.changeDateFormat(this.formData.startDate),
          endTime:this.changeDateFormat(this.formData.endDate),
        }).then(res => {
          if(res.code == 200) {
            this.activeUser = res.result
          }
        })
      },
      searchData(formData) {
        this.getData(formData)
        this.getActiveUser()
      },
      exportExcel(formData) {
        formData = formData || this.formData
        formData.pageNum = 1
        formData.pageSize = 10000
        formData.token = localStorage.getItem('wallet_token') || ""
        if(this.formData.createDate && this.formData.createDate.length==2){
          formData.startDate = this.formData.createDate[0]
          formData.endDate = this.formData.createDate[1]
        }else {
          formData.startDate = getYesterdayTime()
          formData.endDate = getYesterdayTime()
        }
        const baseUrl = localStorage.getItem('SERVER_PATH') || window.SERVER_PATH
        window.open(baseUrl + '/wallet/app/otc/backmgr/coinMerchantReportForm/export?' + qs.stringify(formData))
      },
      handleCurrentChange(val) {
        this.pageNum = val
        this.getData()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getData()
      },
      hideDialogMR(b) {
        this.showDialogMR = b
      },
      clear(){
        this.formData =  {
          createDate:[getYesterdayTime(),getYesterdayTime()],
          startDate:getYesterdayTime(),
				  endDate:getYesterdayTime(),
					type: '0', //订单类型
					realName:'', //真实姓名
					account: '', //账号
					pageNum: '', //页码
					pageSize: '', //页数
				}
      },
      changeDateFormat(date) {
        let year = date.toString().slice(0,4)
        let month = date.toString().slice(4,6)
        let day = date.toString().slice(6)
        return year + '-' + month + '-' + day + ' 00:00:00'
      }
    },
    components:{
      Query,
      Table
    }
  }
</script>
<style lang="less" scoped>
.AcceptanceReport{
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