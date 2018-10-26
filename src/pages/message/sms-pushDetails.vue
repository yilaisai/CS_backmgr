/**
*  Created by  dubbing
*  On  2018/10/22
*  Content
*/
<template>
  <div class='messageDetails'>
    <el-row style="margin-bottom: 20px;">
      <el-col :span="4">
        <el-button size="small" type="primary" plain @click="$router.go(-1)">返回</el-button>
      </el-col>
    </el-row>


    <el-table ref="multipleTable" height="100%" size="small" :data="listData.list" border>
      <el-table-column prop="failed_count" label="剩余发送数量"></el-table-column>
      <el-table-column prop="finished_count" label="发送成功数量"></el-table-column>
      <el-table-column prop="failed_count" label="发送失败数量">
        <template slot-scope="scope" prop="failed_count">
            
            <span>{{scope.row.failed_count}}</span>
            <el-button type="primary" v-if="status == 4" style="margin-left:10px" size="small" 
                     @click.native="resendSms(scope.row,scope.$index)">重新发送
            </el-button>
        </template>
      </el-table-column>
    </el-table>
    <sac-pagination v-show="listData.list.length>0"
                    @handleChange="getPaginationChange"
                    :total="+listData.total"
                    :page-size="filterForm.pageSize"
                    :current-page="filterForm.pageNum">
    </sac-pagination>
  </div>
</template>
<script>
  export default {
    name: "messageDetails",
    data() {
      return {
        filterForm: {
          id:'',
          pageNum: 1,
          pageSize: 20
        },
        status:0,
        listData: {
          total: 1,
          list: [
              {
                failed_count: "",
                finished_count: '',
                id: '',
                title: '',
                total_count: "",
              }
          ],
        },
        readList: [{
          value: '',
          label: '全部',
        }, {
          value: 'YES',
          label: '已读',
        }, {
          value: 'NO',
          label: '未读',
        }],
      };
    },
    methods: {
      submitForm(num) {
        this.filterForm.pageNum = num;
        this.getUserNoticeRecd();
      },
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        this.submitForm(currentPage);
      },
      getUserNoticeRecd() {
            this.filterForm.id=this.$route.query.id
            this.status=this.$route.query.status
            this.$http.post("wallet/backmgr/push/getMsgPushPlanProgressById.do", this.filterForm).then((res) => {
            const {failed_count,finished_count,id,title,total_count}=res.result;
            this.listData.list[0].failed_count=failed_count
            this.listData.list[0].finished_count=finished_count
            this.listData.list[0].id=id
            this.listData.list[0].title=title
            this.listData.list[0].total_count=total_count
        })
      },
      resendSms(row,column){
        const postdata={
            id:this.filterForm.id
        }
        this.$http.post("wallet/backmgr/push/reExecuteMsgPushPlan.do", postdata).then((res) => {
            this.$notify({
                title: '成功',
                message: `重新推送成功`,
                type: 'success'
            });
            this.getUserNoticeRecd();
        })
      }
    },
    activated() {

      this.getUserNoticeRecd();
    }
  };
</script>
<style lang="less">
  .messageDetails {
  }
</style>
