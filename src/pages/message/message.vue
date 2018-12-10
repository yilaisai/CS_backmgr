/**
*  Created by   阿紫
*  On  2018/8/10
*  Content 消息推送
*/
<template>
  <div class='message'>
    <el-col :span="22" style="text-align:right;">
      <el-button size="small" type="primary" @click="addMessage">创建消息</el-button>
    </el-col>
    <el-form :inline="true"
             label-width="100px"
             ref="filterForm"
             :model="filterForm">
      <sac-select ref="noticeType" label="消息类型" v-model="filterForm.noticeType"
                  :dataList="noticeTypeList"></sac-select>
      <sac-select ref="sendStatues" label="消息状态" v-model="filterForm.sendStatues"
                  :dataList="sendStatuesList"></sac-select>
      <sac-submit-form
        :isReset='false'
        @submitForm="submitForm(1)"></sac-submit-form>
    </el-form>
    <sac-table :data="listData.list">
      <el-table-column prop="type" label="消息类型" :formatter="formatSex" width="130px"></el-table-column>
      <el-table-column prop="sendTime" label="创建时间" width="150px"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="details" label="详情"></el-table-column>
      <el-table-column label="状态" width="100px">
        <template slot-scope="scope" prop="sysStatus">
          <el-tag type="success" v-if="scope.row.sendStatues ==1">已发送</el-tag>
          <el-tag type="info" v-if="scope.row.sendStatues ==0">未发送</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="success" v-if="scope.row.sendStatues ==1" size="small"
                     @click.native="detailList(scope.row)">查看
          </el-button>
          <el-button type="warning" v-if="scope.row.sendStatues == 0 || scope.row.isHomeNotice == true" size="small"
                     @click.native="modification(scope.row)" :disabled="pushMessage">修改
          </el-button>
          <el-button type="danger" v-if="scope.row.sendStatues == 0" size="small" :disabled="pushMessage"
                     @click.native="remove(scope.row)">删除
          </el-button>
          <el-button type="primary" v-if="scope.row.sendStatues == 0" size="small" :disabled="pushMessage"
                     :loading="scope.row.isLoading"
                     @click.native="sendMessage(scope.row,scope.$index)">推送
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
        <el-form-item label="消息类型:" prop="noticeType" required>
          <el-select size="small" v-model="ruleForm.noticeType" placeholder="请选择">
            <el-option label="系统消息" value='SystemMsg'></el-option>
            <el-option label="运营消息" value='OperationMsg'></el-option>
            <el-option label="动账消息" value='TransferMsg'></el-option>
            <el-option label="第三方应用更新消息" value='ThirdAppMsg'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消息标题:" required prop="title">
          <el-col :span="16" style=" position: relative;">
            <span class="tips tips_input">{{ruleForm.title.length}}/15</span>
            <el-input size="small" v-model="ruleForm.title" maxlength="15" placeholder="请输入消息标题"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="消息内容:" required prop="content">
          <el-col :span="16" style=" position: relative;">
            <span class="tips tips_textarea">{{ruleForm.content.length}}/50</span>
            <el-input size="small" type="textarea" v-model="ruleForm.content" width="100%" maxlength="50"
                      placeholder="请输入消息内容"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="详情信息:">
          <el-col :span="16" style=" position: relative;">
            <el-input size="small" type="textarea" v-model="ruleForm.details" width="100%"
                      placeholder="请输入详情信息"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="应用名称:" required prop="appName" v-if="ruleForm.noticeType == 'ThirdAppMsg'">
          <el-col :span="16" style=" position: relative;">
            <el-input size="small" type="text" v-model="ruleForm.appName" width="100%"
                      placeholder="请输入应用名称"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="消息跳转地址:" prop="jumpUrl">
          <el-col :span="16">
            <el-input size="small" v-model="ruleForm.jumpUrl" placeholder="请输入跳转地址"></el-input>
          </el-col>
          <el-button @click="openUrl(ruleForm.jumpUrl)" size="small" style="margin-left: 10px;">打开</el-button>
        </el-form-item>
        <el-form-item label="消息发送日期:" prop="sendTime">
          <el-date-picker size="small" v-model="ruleForm.sendTime" type="datetime" placeholder="选择日期时间"
                          value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          <el-checkbox v-model="ruleForm.timingPush" style="margin-left: 10px;">自动推送</el-checkbox>
        </el-form-item>
        <el-form-item label="推送对象:" required class="fixForm">
          <el-radio-group v-model="radioValue" @change="getPushType" class="radioGroup">
            <el-col :span="16">
              <el-radio :label="1">全部</el-radio>
            </el-col>
            <el-col :span="16">
              <el-radio :label="2">指定账号推送</el-radio>
              <el-row :span="24" v-if="radioValue == 2" key="specifyPush" class="specifyPush">
                <el-form-item label="" required prop="phones">
                  <span class="tips tips_textarea">{{ruleForm.phones.length}}/500</span>
                  <el-input type="textarea"
                            size="small"
                            resize="none"
                            maxlength="500"
                            placeholder="请输入具体账号,多个账号用英文逗号隔开"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            @change="getTextareaChange('ruleForm')"
                            v-model="ruleForm.phones"></el-input>
                  </el-input>
                </el-form-item>
              </el-row>
            </el-col>
            <el-col :span="24">
              <el-radio :label="3">持仓范围</el-radio>
              <el-row :span="24" v-if="radioValue == 3" class="positionScope">
                <el-col :span="5.5">
                  <el-form-item prop="minAmount">
                    <el-input-number size="small" v-model="ruleForm.minAmount" controls-position="right"
                                     :min="0"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="2" class="line"
                        style="text-align:center; font-size: 12px; height:40px; line-height:40px; ">～
                </el-col>
                <el-col :span="5.5">
                  <el-form-item prop="maxAmount">
                    <el-input-number size="small" v-model="ruleForm.maxAmount" controls-position="right"
                                     :min="0"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col style="margin-left: 10px;" :span="8">
                  <el-form-item label="币　种:" label-width="80px" prop="coinId" size="mini">
                    <el-select size="small" v-model="ruleForm.coinId" placeholder="请选择币种">
                      <el-option v-for="(item,index) in coinList" :key="index" :label="item.coinName"
                                 :value="item.coinId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-radio-group>
        </el-form-item>
        </el-form-item>
          <el-form-item label=" ">
          <el-checkbox label="是否在首页展示" name="type" v-model="ruleForm.isHomeNotice"></el-checkbox>
        </el-form-item>
        <el-form-item label="应用图标:" v-if="ruleForm.noticeType != 'SystemMsg'">
          <el-input v-model="ruleForm.picture" size="small" placeholder="请输入应用图标地址" class="picture-input">
          </el-input>
          <span class="appIcon">图标尺寸：678*260</span>
          <el-upload
            name="files"
            class="avatar-uploader"
            :action="server_path + 'wallet/util/open/uploadFile.do'"
            :show-file-list="false"
            :on-success="upload"
            :data="{type:'img'}">
            <img v-if="ruleForm.picture" :src="ruleForm.picture" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
        server_path: "",
        filterForm: {
          sendStatues: '',
          noticeType: '',
          pageNum: 1,
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
          value: 'SystemMsg',
          label: '系统消息',
        }, {
          value: 'OperationMsg',
          label: '运营消息',
        }, {
          value: 'TransferMsg',
          label: '动账消息',
        }, {
          value: 'ThirdAppMsg',
          label: '第三方应用更新消息',
        }],
        sendStatuesList: [{
          value: '',
          label: '全部状态',
        }, {
          value: 'YES',
          label: '已推送',
        }, {
          value: 'NO',
          label: '未推送',
        }],
        pushMessage: false,
        dialogTitle: '新增消息模版',
        dialogFormVisible: false,
        ruleForm: {
          noticeType: '',
          jumpUrl: '',
          sendTime: '',
          title: '',
          content: '',
          details: '',
          timingPush: false, // 自动推送
          pushAll: false, // 全部对象
          phones: '',
          minAmount: '',
          maxAmount: '',
          coinId: '', // 币种
          picture: ''
        },
        rules: {
          type: [
            { required: true, message: '请选择消息类型', trigger: 'change' },
          ],
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          appName: [
            { required: true, message: '请输入应用名称', trigger: 'blur' }
          ],
          jumpUrl: [
            { required: false, message: '请输入消息跳转地址', trigger: 'change' }
          ],
          phones: [
            { required: true, message: '请输入具体账号', trigger: 'blur' }
          ],
          sendTime: [
            { required: true, message: '请选择时间', trigger: 'change' }
          ],
          coinId: [
            { required: true, message: '请选择币种', trigger: 'change' }
          ],
        },
        allAccountValue: '', // 暂存所以新增账号
        radioValue: null,
        currentObj: {},
        coinList: [],
      };
    },
    methods: {
      resetForm() {
        this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
      },
      submitForm(num) {
        this.filterForm.pageNum = num;
        this.getNoticeInfoList();
      },
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        this.submitForm(currentPage);
      },
      getNoticeInfoList() {
        this.$http.post("wallet/backmgr/noticeInfo/getNoticeInfoList.do", this.filterForm).then((res) => {
          const { list, total } = res.result.list;
          list.forEach((item) => {
            item.isLoading = false;
          });
          this.listData.list = list;
          this.listData.total = total;
        })
      },
      formatSex: function (row, column) {
        return row.type == 0 ? '系统消息' : row.type == 1 ? '运营消息' : row.type == 2 ? '动账消息' : '第三方应用更新消息'
      },
      // 删除
      remove(itemData) {
        const { id, title } = itemData;
        this.$confirm(`确定删除此条消息吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post("/wallet/backmgr/noticeInfo/updateNoticeInfoSysStatus.do", {
            sysStatus: 'INVALID0',
            id
          }).then((res) => {
            this.$notify({
              title: '成功',
              message: `删除成功`,
              type: 'success'
            });
            this.getNoticeInfoList();
          })
        })
      },
      // 推送消息
      sendMessage(itemData, index) {
        this.listData.list[index].isLoading = true;
        this.pushMessage = true;
        const { id, title } = itemData;
        this.$http.post("wallet/backmgr/userNoticeRecd/pushUserAll.do", {
          version: '1.0.0',
          plat: 'web',
          noticeInfoId: id,
        }).then((res) => {
          const self = this;
          setTimeout(() => {
            self.$notify({
              title: '成功',
              message: ` 推送消息成功`,
              type: 'success'
            });
            self.getNoticeInfoList()
            self.pushMessage = false;
          }, 20000)
        }).catch(() => {
          this.getNoticeInfoList()
          this.pushMessage = false;
        })
      },
      // 查看详情
      detailList(data) {
        this.$router.push({
          name: 'messageDetails',
          query: {
            id: data.id
          }
        })
      },
      modification(itemData) {
        this.dialogTitle = '修改推送规则';
        this.dialogFormVisible = true;
        this.resetForm();
        this.getSampleCoinInfo();
        this.ruleForm = JSON.parse(JSON.stringify(itemData));
        this.ruleForm.timingPush = this.ruleForm.timingPush == 0 ? false : true;
        if (this.ruleForm.pushAll == 1) {
          this.radioValue = 1;
          this.ruleForm.coinId = '';
        } else if (this.ruleForm.phones.length > 0) {
          this.radioValue = 2;
          this.ruleForm.coinId = '';
        } else if (this.ruleForm.coinId) {
          this.radioValue = 3;
        }
        switch (this.ruleForm.type) {
          case 0:
            this.ruleForm.noticeType = 'SystemMsg';
            break;
          case 1:
            this.ruleForm.noticeType = 'OperationMsg';
            break;
          case 2:
            this.ruleForm.noticeType = 'TransferMsg';
            break;
          case 3:
            this.ruleForm.noticeType = 'ThirdAppMsg';
            break;
        }
      },
      addMessage() {
        this.radioValue = null;
        this.dialogTitle = '创建消息';
        this.dialogFormVisible = true;
        this.ruleForm = {
          noticeType: '',
          jumpUrl: '',
          sendTime: '',
          title: '',
          content: '',
          details: '',
          timingPush: false, // 自动推送
          pushAll: false, // 全部对象
          phones: '',
          minAmount: '',
          maxAmount: '',
          coinId: '', // 币种
          picture:''
        };
        this.resetForm();
        this.getSampleCoinInfo();
      },
      getTextareaChange(data) {
        const phones = this[data].phones.split(',')
        let addTextareaValue = true;
        phones.forEach((item) => {
          addTextareaValue = !/\D|[,]/g.test(item);
        })
        if (!addTextareaValue) {
          this.$message({
            message: '请输入正确的账号信息',
            type: 'warning'
          });
          this.ruleForm.phones = this.allAccountValue;
        }
        this.allAccountValue = this.ruleForm.phones;
      },
      getPushType(type) {
        switch (type) {
          case 1 :
            this.ruleForm.phones = '';
            this.allAccountValue = '';
            this.ruleForm.minAmount = '';
            this.ruleForm.maxAmount = '';
            this.ruleForm.coinId = '';
            return
          case 2:
            this.ruleForm.minAmount = '';
            this.ruleForm.maxAmount = '';
            this.ruleForm.coinId = '';
            return
          case 3:
            this.ruleForm.phones = '';
            this.allAccountValue = '';
            return
        }
      },
      getUpdatePushType() {
        switch (this.radioValue) {
          case 1 :
            this.ruleForm.phones = this.currentObj.phones;
            this.allAccountValue = this.currentObj.phones;
            this.ruleForm.minAmount = this.currentObj.minAmount;
            this.ruleForm.maxAmount = this.currentObj.maxAmount;
            this.ruleForm.coinId = this.currentObj.coinId;
            return
          case 2:
            this.ruleForm.minAmount = this.currentObj.minAmount;
            this.ruleForm.maxAmount = this.currentObj.maxAmount;
            this.ruleForm.coinId = this.currentObj.coinId;
            return
          case 3:
            this.ruleForm.phones = this.currentObj.phones;
            this.allAccountValue = this.currentObj.phones;
            return
        }
      },
      getSampleCoinInfo() {
        if (!this.coinList.length) {
          this.$http.post("wallet/backmgr/coin/getSampleCoinInfo.do", {}).then((res) => {
            this.coinList = res.result.list
          })
        }
      },
      determine() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            const ruleForm = JSON.parse(JSON.stringify(this.ruleForm))
            ruleForm.timingPush = ruleForm.timingPush ? 'YES' : 'NO';
            ruleForm.pushAll = this.radioValue == 1 ? 'YES' : 'NO';
            ruleForm.isHomeNotice = ruleForm.isHomeNotice == true ? 1 : 0;
            if (this.ruleForm.id) {
              if (this.radioValue == 1) {
                ruleForm.minAmount = '';
                ruleForm.maxAmount = '';
                ruleForm.coinId = '';
                ruleForm.phones = '';
              } else if (this.radioValue == 2) {
                ruleForm.minAmount = '';
                ruleForm.maxAmount = '';
                ruleForm.coinId = '';
              } else if (this.radioValue == 3) {
                ruleForm.phones = 'empty';
              }
              ruleForm.details = ruleForm.details || 'empty';
              ruleForm.jumpUrl = ruleForm.jumpUrl || 'empty';
              this.$http.post("wallet/backmgr/noticeInfo/updateNoticeInfo.do", ruleForm).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `修改成功`,
                  type: 'success'
                });
                this.dialogFormVisible = false;
                this.getNoticeInfoList();
              })
            } else {
              this.$http.post("wallet/backmgr/noticeInfo/createNoticeInfo.do", ruleForm).then((res) => {
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
      openUrl(url) {
        if (url) window.open(url);
      },
      upload(response, file, fileList) {
        
        this.ruleForm.picture = response.result.urls[0];
        console.log(this.ruleForm.picture);
      }
    },
    activated() {
      this.server_path = SERVER_PATH;
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
  .appIcon {
    margin-left: 5px;
    font-size: 12px;
    color: red;
  }
  .el-upload--picture-card {
    height: 67.5px;
    width: 127px;
    line-height: 67.5px;
  }
  .el-upload-list__item {
    height: 67.5px;
    width: 127px;
    line-height: 67.5px;
  }
  .picture-input {
    input {
      width: 220px;
    }
  }
</style>
