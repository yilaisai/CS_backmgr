<template>
  <div class='merchantReport'>
    <!-- 筛选条件 -->
		<Query ref="query" @queryData='getData' @exportExcel="exportExcel" @clear="clear" :formData="formData"/>

    <!-- 表格 -->
		<Table :list="pageData.list" @sort="getData"></Table>

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
          createDate: getYesterdayTime(),
          account: '', //账号
          type:'0',  //类型 0 兑入 1 兑出
					pageNum: '', //页码
					pageSize: '', //页数
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
        this.$http.post('/wallet/app/otc/backmgr/merchantReportForm', formData).then(res => {
          if(res.code == 200) {
            this.pageData = res.result
          }
        })
      },
      exportExcel(formData) {
        formData = formData || this.formData
        formData.pageNum = 0
        formData.pageSize = 10000
        formData.token = localStorage.getItem('wallet_token') || ""
        const baseUrl = localStorage.getItem('SERVER_PATH') || window.SERVER_PATH
        window.open(baseUrl + '/wallet/app/otc/backmgr/merchantReportForm/export?' + qs.stringify(formData))
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
					createDate: getYesterdayTime(),
          account: '', //账号
          type:'0',  //类型 0 兑入 1 兑出
					pageNum: '', //页码
					pageSize: '', //页数
				}
      },
    },
    components:{
      Query,
      Table
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