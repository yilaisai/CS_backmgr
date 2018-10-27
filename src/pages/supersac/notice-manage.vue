<template>
  <div class='message'>
    <el-col :span="22" style="text-align:right;">
      <el-button type="primary" @click="addMessage" size="small">新增公告</el-button>
    </el-col>
    <el-form :inline="true"
             label-width="100px"
             ref="filterForm"
             :model="filterForm">
      <sac-select ref="type" label="公告类型" v-model="filterForm.type"
                  :dataList="noticeTypeList"></sac-select>
      <sac-select ref="type" label="状态" v-model="filterForm.status"
                  :dataList="statusList"></sac-select>
      <sac-submit-form
        :isReset='false'
        @submitForm="submitForm(1)"></sac-submit-form>
    </el-form>
    <sac-table :data="listData.list">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="type" label="公告类型">
        <template slot-scope="scope" prop="type">
          {{scope.row.type=='2'?'动账消息': scope.row.type=='1'?'运营消息':'系统消息'}}
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column label="发送日期" width="150px">
        <template slot-scope="scope" prop="sysStatus">
          {{scope.row.createTime| dateFormat('YYYY-MM-DD HH:mm')}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="primary" :disabled="scope.row.lockStatus == 1" size="small"
                     :loading="scope.row.isLoading"
                     @click.native="modification(scope.row,scope.$index)">修改
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="上架" width="100">
        <template slot-scope="scope" prop="type">
          <el-switch v-model="scope.row.lockStatus" :inactive-value="0" :active-value="1"
                     @click.native="switchChange(scope.row)"></el-switch>
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
        <el-form-item label="公告标题:" required prop="title">
          <el-col :span="16" style=" position: relative;">
            <span class="tips tips_input">{{ruleForm.title.length}}/15</span>
            <el-input size="small" v-model="ruleForm.title" maxlength="15" placeholder="请输入公告标题"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="公告内容:" required prop="content">
          <el-col :span="16" style=" position: relative;">
            <span class="tips tips_textarea">{{ruleForm.content.length}}/50</span>
            <el-input size="small" type="textarea" :rows="4" v-model="ruleForm.content" width="100%" maxlength="50"
                      placeholder="请输入公告内容"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="公告类型:" prop="type" required>
          <el-select size="small" v-model="ruleForm.type" placeholder="请选择公告类型">
            <el-option label="系统消息" value='0'></el-option>
            <el-option label="运营消息" value='1'></el-option>
            <el-option label="动账消息" value='2'></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="determine" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'message',
    data() {
      return {
        filterForm: {
          type: '',
          status: '',
          curPage: 1,
          pageSize: 20
        },
        listData: {
          total: null,
          list: [],
        },
        noticeTypeList: [{
          value: '',
          label: '全部消息',
        }, {
          value: '0',
          label: '系统消息',
        }, {
          value: '1',
          label: '运营消息',
        }, {
          value: '2',
          label: '动账消息',
        }],
        statusList: [{
          value: '',
          label: '全部状态',
        }, {
          value: '1',
          label: '上架',
        }, {
          value: '0',
          label: '下架',
        }],
        dialogTitle: '新增公告',
        dialogFormVisible: false,
        ruleForm: {
          type: '',
          title: '',
          content: '',
        },
        rules: {
          type: [
            { required: true, message: '请选择公告类型', trigger: 'change' },
          ],
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
        },
        coinList: [],
      };
    },
    methods: {
      resetForm() {
        this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
      },
      submitForm(num) {
        this.filterForm.curPage = num;
        this.getNoticeInfoList();
      },
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        this.submitForm(currentPage);
      },
      getNoticeInfoList() {
        this.$http.post("supernode/backmgr/notice/getNoticeList", this.filterForm).then((res) => {
          const { list, total } = res.result;
          list.forEach((item) => {
            item.isLoading = false;
          });
          this.listData.list = list;
          this.listData.total = total;
        })
      },
      // 上下架
      switchChange(itemData) {
        const { lockStatus, id, title } = itemData;
        this.$http.post("supernode/backmgr/notice/updateNoticeStatus", {
          status: lockStatus ? "1" : "0",
          id
        }).then((res) => {
          this.$notify({
            title: '成功',
            message: `${lockStatus ? "上架" : "下架"} 成功`,
            type: 'success'
          });
          this.getNoticeInfoList();
        })
      },
      addMessage() {
        this.dialogTitle = '新增公告';
        this.dialogFormVisible = true;
        this.ruleForm = {
          type: '',
          title: '',
          content: '',
        };
        this.resetForm();
      },
      modification(itemData) {
        this.dialogTitle = '修改公告';
        this.dialogFormVisible = true;
        this.resetForm();
        itemData = JSON.parse(JSON.stringify(itemData));
        this.ruleForm = {
          id: itemData.id,
          type: `${itemData.type}`,
          title: itemData.title,
          content: itemData.content,
        };
      },
      determine() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            const ruleForm = JSON.parse(JSON.stringify(this.ruleForm))
            if (this.ruleForm.id) {
              this.$http.post("supernode/backmgr/notice/updateNotice", ruleForm).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `修改成功`,
                  type: 'success'
                });
                this.dialogFormVisible = false;
                this.getNoticeInfoList();
              })
            } else {
              this.$http.post("supernode/backmgr/notice/createNotice", ruleForm).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `创建成功`,
                  type: 'success'
                });
                this.dialogFormVisible = false;
                this.getNoticeInfoList();
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    activated() {
      this.getNoticeInfoList();
    }
  };
</script>
<style lang="less">
  .message {
    .el-dialog {
      width: 854px;
      .el-dialog__body {
        padding: 10px;
      }
      textarea {
        width: 100%;
      }
      .fixForm {
        .radioGroup, .positionScope {
          width: 100%;
          margin-top: 10px;
        }
        .el-col-16 {
          min-height: 30px;
        }
        .specifyPush {
          margin: 10px 0;
        }
      }
      .tips {
        position: absolute;
        color: #b8b8b8;
      }
      .tips_input {
        top: 0px;
        right: 10px;
        z-index: 40;
      }
      .tips_textarea {
        bottom: -10px;
        right: 10px;
      }
    }
  }
</style>
