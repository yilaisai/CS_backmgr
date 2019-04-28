/**
*  Created by   阿紫
*  On  2018/8/10
*  Content
*/
<template>
  <div class='feedback'>
    <el-form :inline="true"
             label-width="80px"
             ref="filterForm"
             :model="filterForm">
      <sac-select ref="feedbackType" label="反馈类型" v-model="filterForm.feedbackType"
                  :dataList="feedbackTypeList"></sac-select>
      <el-form-item label="日　　期:" class="sac-time">
        <el-date-picker
          size="small"
          v-model="dateTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <sac-submit-form
        :isReset='false'
        @submitForm="submitForm(1)"></sac-submit-form>
      <el-form-item class="fi-add">
        <el-button type="primary"  size="small" @click="addFeedBack">添加</el-button>
      </el-form-item>
    </el-form>
    <sac-table :data="listData.list">
      <el-table-column prop="rtype" label="反馈类型" :formatter="formatSex" width="100"></el-table-column>
      <el-table-column prop="createTime" label="提交日期" width="170"></el-table-column>
      <el-table-column prop="content" label="问题"></el-table-column>
      <el-table-column prop="contactData" label="联系方式"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope" prop="sysStatus">
          <el-tag type="success" v-if="scope.row.opStatus ==1">已处理</el-tag>
          <el-tag type="info" v-if="scope.row.opStatus ==0">未处理</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="success" size="small"
                     @click.native="detailList(scope.row)">查看
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" :model="ruleForm" label-width="140px" :rules="rules">
        <el-form-item label="反馈类型:">
          <el-col :span="16">
            <span>{{ruleForm.title}}</span>
          </el-col>
        </el-form-item>
        <el-form-item label="反馈描述:"  prop="content">
          <el-input type="textarea" v-model="ruleForm.content" placeholder="请输入反馈描述"></el-input>
        </el-form-item>
        <el-form-item label="联系方式:" prop="phone">
          <el-input type="text" v-model.number="ruleForm.phone" placeholder="请输入联系方式"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
         <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" size="medium" @click="determine">提交</el-button>
      </div>

    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'feedback',
    data() {
      return {
        dateTime: [],
        filterForm: {
          feedbackType: '',
          beginTime: '',
          endTime: '',
          pageNum: 1,
          pageSize: 20
        },
        current: '10:00:00',
        listData: {
          total: null,
          list: [],
        },
        feedbackTypeList: [{
          value: '',
          label: '全部',
        }, {
          value: 'Consult',
          label: '咨询',
        }, {
          value: 'Suggest',
          label: '建议',
        }, {
          value: 'Tranfer',
          label: '转账入账补录',
        }, {
          value: 'Other',
          label: '其他',
        }],
        dialogTitle: '添加意见反馈',
        dialogFormVisible: false,
        ruleForm: {
          content:'',
          phone:'',
          title:'转账入账补录'
        },
        rules: {
          content: [
            { required: true, message: '请输入反馈描述', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入联系方式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      //添加意见反馈
      addFeedBack(){
        this.dialogFormVisible=true;
        this.ruleForm.content='';
        this.ruleForm.phone='';
        this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
      },
      submitForm(num) {
        this.filterForm.pageNum = num;
        this.getfeedBackList();
      },
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        this.submitForm(currentPage);
      },
      formatSex(row, column) {
        switch(row.rtype){
          case '':
            return '全部'
            break;
          case null:
            return '全部'
            break;
          case 0:
            return '咨询'
            break;
          case 1:
            return '建议'
            break;
          case 2:
            return '其他'
            break;
          case 3:
            return '转账入账补录'
            break;
          default:
            return '其他'
            break;
        }
        //return row.rtype == 0 ? '咨询' : row.type == 1 ? '建议' : '其他'
      },
      getfeedBackList() {
        this.filterForm.beginTime = this.dateTime[0];
        this.filterForm.endTime = this.dateTime[1];
        this.$http.post("/wallet/backmgr/feedback/getfeedBackList.do", this.filterForm).then((res) => {
          const { list, total } = res.result.pageInfo;
          this.listData.list = list;
          this.listData.total = total;
        })
      },
      // 查看详情
      detailList(data) {
        switch(data.rtype){
          case '':
            data.rtypeName = '全部'
            break;
          case null:
            data.rtypeName = '全部'
            break;
          case 0:
            data.rtypeName = '咨询'
            break;
          case 1:
            data.rtypeName = '建议'
            break;
          case 2:
            data.rtypeName = '其他'
            break;
          case 3:
            data.rtypeName = '转账入账补录'
            break;
          default:
            data.rtypeName = '其他'
            break;
        }
        //data.rtypeName = data.rtype == 0 ? '咨询' : data.type == 1 ? '建议' : '其他';

        const { rtypeName, createTime, contactData, opStatus, content, otherFile, id ,remark} = data;
        console.log(data)
        this.$router.push({
          name: 'feedbackDetails',
          params: {
            rtypeName,
            createTime,
            contactData,
            opStatus,
            content,
            otherFile,
            id,
            remark
          }
        })
      },
      //新增存储
      determine(){
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            const ruleForm = JSON.parse(JSON.stringify(this.ruleForm))
            this.$http.post("wallet/backmgr/feedback/createFeedBack.do", ruleForm).then((res) => {
              this.$notify({
                  title: '成功',
                  message: `添加成功`,
                  type: 'success'
                });
                this.dialogFormVisible = false;
                this.getfeedBackList();
            })
          }
        })
      }
    },
    activated() {
      this.getfeedBackList();
    }
  };
</script>
<style lang="less">
  .feedback {
    .sac-time {
      .el-form-item__content {
        width: 366px;
      }
    }
    .el-date-editor {
      width: 366px;
    }
    .yh-submit .el-form-item__content ,.fi-add .el-form-item__content{
      width:auto
    }
  }
</style>
