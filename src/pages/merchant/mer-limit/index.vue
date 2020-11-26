<template>
  <div class='mer-limit-page'>
    <Query @getData="getData" :formData="formData"></Query>
    <Table :list="detail.list" @openPop="openPop" ></Table>
    <div class="load-more" style="display: flex;">
      <div class="count">
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formData.pageNum"
        :page-sizes="[20,50]"
        :page-size="formData.pageSize"
        :pager-count="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="detail.total*1">
      </el-pagination>
    </div>
    <Pop :showPop="showPop" @dialogToggle="showPop = false" :id="item.userId" @getData="getData"></Pop>
  </div>
</template>
<script>
  import Query from './components/query'
  import Table from './components/table'
  import Pop from './components/pop'
  export default {
    data() {
      return {
       detail:{
        total: null,
        list: [],
       }, 
       formData:{
         pageNum:1,
         pageSize:10,
         startDate:'',
         endDate:'',
         create_time:'',
         userId:'',
         nickName:''
       },
       item:'',
       showPop:false
      }
    },
    activated(){
      this.getData()
    },
    methods: {
      getData(form){
        if(form) this.formData.pageNum = 1
        form = form || this.formData
        // if(form.create_time.length && form.create_time.length==2) {
        //   form.startDate = form.create_time[0]
        //   form.endDate = form.create_time[1]
        // }
        this.$http.post('wallet/app/otc/backmgr/getCashInLimit',form).then(res => {
          this.detail = res.result
        })
      },
      handleCurrentChange(val) {
        this.formData.pageNum = val
        this.getData()
      },
      handleSizeChange(val) {
        this.formData.pageSize = val
        this.getData()
      },
      openPop(item){
        this.item = item
        this.showPop = true
      }
    },
    components:{
      Query,
      Table,
      Pop
    }
  }
</script>
<style lang='less' scoped>
  .mer-limit-page {
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