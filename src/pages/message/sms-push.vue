/**
*  Created by dubbing
*  On  2018/10/16
*  Content 短信推送
*/
<template>
  <div class='sms-push'>
    <!-- <el-col :span="22" style="text-align:right;">
      <el-button size="small" type="primary" @click="addMessage">创建消息</el-button>
    </el-col> -->
    <el-form :inline="true"
             label-width="100px"
             ref="filterForm"
             :model="filterForm">
        <!-- <sac-select ref="noticeType" label="消息类型" v-model="filterForm.noticeType"
                    :dataList="noticeTypeList"></sac-select> -->
        <sac-select ref="sendStatues" label="消息状态" v-model="filterForm.status"
                    :dataList="sendStatuesList"></sac-select>
        <sac-submit-form
            :isReset='false'
            @submitForm="submitForm(1)"></sac-submit-form>
        <el-form-item class="fi-add">
            <el-button size="small" type="primary" @click="addMessage">创建消息</el-button>
        </el-form-item>
    </el-form>
    <sac-table :data="listData.list">
      <el-table-column prop="executeTime" label="发送时间" width="150px"></el-table-column>
      <el-table-column prop="title" label="主题"></el-table-column>
      <el-table-column prop="text" label="内容"></el-table-column>

      <el-table-column label="状态" width="100px">
        <template slot-scope="scope" prop="status">
          <el-tag type="info" v-if="scope.row.status ==0">未推送</el-tag>
          <el-tag type="info" v-if="scope.row.status ==1">审核中</el-tag>
          <el-tag type="info" v-if="scope.row.status ==2">推送中</el-tag>
          <el-tag type="success" v-if="scope.row.status ==3">部分推送</el-tag>
          <el-tag type="warn" v-if="scope.row.status ==4">推送失败</el-tag>
          <el-tag type="success" v-if="scope.row.status ==5">推送成功</el-tag>

        </template>
      </el-table-column>
      <el-table-column prop="tplId" label="模板id">
        <template slot-scope="scope" prop="tplId">
          <span>{{scope.row.tplId!==0?scope.row.tplId:''}}</span>
          <el-button type="warning" size="small" style="float:right"
                     @click.native="changeTplId(scope.row)" v-if="scope.row.status ==1">模板编辑
          </el-button>
          <el-button type="warning" size="small" style="float:right"
                     @click.native="changeTplId(scope.row)" v-if="scope.row.status ==0 || scope.row.status ==4">模板修改
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="success" v-if="scope.row.status !==0 &&scope.row.status !==1" size="small"
                     @click.native="detailList(scope.row)">查看
          </el-button>
          <el-button type="warning" v-if="scope.row.status == 0||scope.row.status == 1" size="small"
                     @click.native="modification(scope.row)" :disabled="pushMessage">修改
          </el-button>
          <el-button type="danger" v-if="scope.row.status == 0||scope.row.status == 1" size="small" :disabled="pushMessage"
                     @click.native="remove(scope.row)">删除
          </el-button>
          <el-button type="primary" v-if="scope.row.status == 0" size="small" :disabled="pushMessage"
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
    <el-dialog :title="dialogTplTitle" :visible.sync="dialogTplVisible">
      <el-form ref="ruleForm2" :model="ruleForm2" label-width="140px" :rules="rules2">
        <el-form-item label="模板ID:"  prop="tplId">
          <el-col :span="16" style=" position: relative;">
            <el-input size="small" v-model="ruleForm2.tplId"  placeholder="请输入模板ID">

            </el-input>
          </el-col>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTplVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="TlpDetermine" size="small">{{dialogTplBtnText}}</el-button>
        </div>
    </el-dialog>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" :model="ruleForm" label-width="140px" :rules="rules">
        <el-form-item label="短信主题:"  prop="title">
          <el-col :span="16" style=" position: relative;">
<!--            <span class="tips tips_input">{{ruleForm.title.length}}/15</span>-->
            <el-input size="small" v-model="ruleForm.title"  placeholder="请输入短信主题"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="短信内容:" required prop="text">
          <el-col :span="16" style=" position: relative;">
<!--            <span class="tips tips_textarea">{{ruleForm.text.length}}/50</span>-->
            <el-input size="small" type="textarea" v-model="ruleForm.text" width="100%"
                      placeholder="请输入短信内容" :disabled="ruleForm.id!==''&&ruleForm.id!==undefined"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="推送对象:" required class="fixForm" prop="targetId">

          <el-radio-group v-model="ruleForm.targetId" @change="getPushType" class="radioGroup">
            <el-col :span="16">
              <el-radio :label="1">全部</el-radio>
            </el-col>
            <el-col :span="16">
              <el-radio :label="2">指定账号推送</el-radio>
              <el-row :span="24" v-if="ruleForm.targetId == 2" key="specifyPush" class="specifyPush" style="margin-bottom:17px">
                <el-form-item label="" required prop="targetPhone">
<!--                  <span class="tips tips_textarea">{{ruleForm.targetPhone.length}}/500</span>-->
                  <el-input type="textarea"
                            size="small"
                            resize="none"
                            placeholder="请输入具体账号,多个账号用英文逗号隔开（非大陆账号请输入“+区号”）"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            @change="getTextareaChange('ruleForm')"
                            v-model="ruleForm.targetPhone">
                  </el-input>
                </el-form-item>
              </el-row>
            </el-col>
            <el-col :span="24">
              <el-radio :label="3">持仓范围</el-radio>
              <el-row :span="24" v-if="ruleForm.targetId == 3" class="positionScope">
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
        <el-form-item label="消息发送日期:" prop="executeTime">
          <el-date-picker size="small" v-model="ruleForm.executeTime" type="datetime" placeholder="选择日期时间"
                          value-format="yyyy-MM-dd HH:mm:ss" :disabled="executeTimeDisabled"></el-date-picker>
          <el-checkbox v-model="ruleForm.isAuto" style="margin-left: 10px;">自动推送</el-checkbox>
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
      var validateTargetPhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入具体账号,多个账号用英文逗号隔开'));
        } else if (value.indexOf('，')>-1) {
          callback(new Error('请使用英文逗号隔开'));
        }else {
          callback();
        }
      };
      return {
        filterForm: {
          status: '',
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
        }],
        sendStatuesList: [{
          value: '',
          label: '全部状态',
        }, {
          value: '0',
          label: '未推送',
        }, {
          value: '1',
          label: '审核中',
        }, {
          value: '2',
          label: '推送中',
        }, {
          value: '3',
          label: '部分推送',
        }, {
          value: '4',
          label: '推送失败',
        }, {
          value: '5',
          label: '推送成功',
        }],
        pushMessage: false,
        dialogTitle: '新增消息模版',
        dialogFormVisible: false,
        ruleForm: {
            title: '',
            text:'',
            targetId:'',
            targetPhone:'',
            coinId:'',
            minAmount: '',
            maxAmount: '',
            executeTime:'',
            isAuto:false,
            id:''
        },
        ruleForm2: {
          tplId:'',
          auditResult:'pass',
          id:''
        },
        rules2: {
          tplId: [
            { required: false, message: '请输入模板id', trigger: 'blur' }
          ],
        },
        rules: {
          // title: [
          //   { required: true, message: '请输入短信主题', trigger: 'blur' },
          //   { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
          // ],
          targetId:[
            {  required: true,message: '请选择推送对象', trigger: 'blur' }
          ],
          text: [
            { required: true, message: '请输入内容', trigger: 'blur' },
          ],
          executeTime: [
            {  required: true,message: '请选择发送日期', trigger: 'blur' }
          ],
          coinId: [
            { required: true, message: '请选择币种', trigger: 'change' }
          ],
          targetPhone: [
            { required: true,validator:validateTargetPhone, trigger: 'blur' }
          ],
        },
        allAccountValue: '', // 暂存所以新增账号
        targetId: null,
        currentObj: {},
        coinList: [],
        dialogTplVisible:false,
        dialogTplTitle:'',
        dialogTplBtnText:'',
        executeTimeDisabled:false
      };
    },
    methods: {
      resetForm() {
        this.$refs.ruleForm && this.$refs.ruleForm.clearValidate()
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
        this.$http.post("wallet/backmgr/push/getMsgPushPlanList.do", this.filterForm).then((res) => {
          const { list, total } = res.result.list;
          list.forEach((item) => {
            item.isLoading = false;
          });
          this.listData.list = list;
          this.listData.total = total;
        })
      },

      // 删除
      remove(itemData) {
        const { id, title } = itemData;
        this.$confirm(`确定删除此条消息吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post("wallet/backmgr/push/deleteMsgPushPlan.do", {
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
        this.$http.post("wallet/backmgr/push/executeMsgPushPlan.do", {
          id
        }).then((res) => {
          const self = this;
          setTimeout(() => {
            self.$notify({
              title: '成功',
              message: ` 启动推送消息成功`,
              type: 'success'
            });
            self.getNoticeInfoList()
            self.pushMessage = false;
          }, 2000)
        }).catch(() => {
          this.getNoticeInfoList()
          this.pushMessage = false;
        })
      },
      // 查看详情
      detailList(data) {
        //alert(data.id)
        this.$router.push({
          name: 'sms-pushDetails',
          query: {
            id: data.id,
            status:data.status
          }
        })
      },
      modification(itemData) {
        this.dialogTitle = '修改短信推送';
        this.dialogFormVisible = true;
        this.resetForm();
        this.getSampleCoinInfo();
        this.ruleForm = JSON.parse(JSON.stringify(itemData));
        this.ruleForm.isAuto = this.ruleForm.isAuto == 0 ? false : true;
        if(this.ruleForm.coinRange!==""){
          this.ruleForm.minAmount=this.ruleForm.coinRange.split(',')[0];
          this.ruleForm.maxAmount=this.ruleForm.coinRange.split(',')[1];
        }
      },
      addMessage() {
        this.dialogTitle = '创建消息';
        this.ruleForm = {
            title: '',
            text:'',
            targetId:'',
            targetPhone:'',
            coinId:'',
            minAmount: '',
            maxAmount: '',
            executeTime:'',
            isAuto:false,
        };
        this.resetForm();
        this.getSampleCoinInfo();
        this.dialogFormVisible = true;
      },
      getTextareaChange(data) {
      },
      getPushType(type) {
        switch (type) {
          case 1 :
            this.ruleForm.targetPhone = '';
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
            this.ruleForm.targetPhone = '';
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
            let posturl,postmsg,postdata
            if (this.ruleForm.id) {
              posturl='wallet/backmgr/push/updateMsgPushPlan.do'
              postmsg='修改成功'
            }else{
              posturl='wallet/backmgr/push/createMsgPushPlan.do'
              postmsg='新增成功'
            }

            //1为全部，2为指定用户，3为指定币种范围内的用户
            if (this.ruleForm.targetId == 1) {
                postdata={
                    msgTitle:this.ruleForm.title,
                    msgText:this.ruleForm.text,
                    targetId:this.ruleForm.targetId,
                    time:this.ruleForm.executeTime,
                    isAuto:this.ruleForm.isAuto==true? 1 : 0,
                    id:this.ruleForm.id
                }
                this.$http.post(posturl, postdata).then((res) => {
                    this.$notify({
                    title: '成功',
                    message: postmsg,
                    type: 'success'
                    });
                    this.dialogFormVisible = false;
                    this.getNoticeInfoList();
                })
            }else if (this.ruleForm.targetId == 2) {
                postdata={
                    msgTitle:this.ruleForm.title,
                    msgText:this.ruleForm.text,
                    targetId:this.ruleForm.targetId,
                    targetPhone:this.ruleForm.targetPhone,
                    time:this.ruleForm.executeTime,
                    isAuto:this.ruleForm.isAuto==true? 1 : 0,
                    id:this.ruleForm.id
                }
                this.$http.post(posturl, postdata).then((res) => {
                    this.$notify({
                    title: '成功',
                    message: postmsg,
                    type: 'success'
                    });
                    this.dialogFormVisible = false;
                    this.getNoticeInfoList();
                })
            }else if (this.ruleForm.targetId == 3) {
                postdata={
                    msgTitle:this.ruleForm.title,
                    msgText:this.ruleForm.text,
                    targetId:this.ruleForm.targetId,
                    coinRange:this.ruleForm.minAmount+','+this.ruleForm.maxAmount,
                    coinId:this.ruleForm.coinId,
                    time:this.ruleForm.executeTime,
                    isAuto:this.ruleForm.isAuto==true? 1 : 0,
                    id:this.ruleForm.id
                }
                this.$http.post(posturl, postdata).then((res) => {
                    this.$notify({
                    title: '成功',
                    message: postmsg,
                    type: 'success'
                    });
                    this.dialogFormVisible = false;
                    this.getNoticeInfoList();
                })
            }
          }
        });
      },
      openUrl(url) {
        if (url) window.open(url);
      },
      //打开修改模板ID
      changeTplId(data){
        console.log(data.tolId)
        this.dialogTplVisible=true;
        this.ruleForm2.id=data.id
        this.ruleForm2.tplId=data.tplId!==0?data.tplId:''
        if(data.status==0 || data.status==4){
          //未发送
          this.dialogTplTitle='修改模板id'
          this.dialogTplBtnText='确认修改'

        }else if(data.status==1){
          //审核中
          this.dialogTplBtnText='确定'
          this.dialogTplTitle='编辑模板id'
        }

      },
      //存储模板ID
      TlpDetermine(){
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            const ruleForm2 = JSON.parse(JSON.stringify(this.ruleForm2))
            console.log(ruleForm2);
            ruleForm2.auditResult = ruleForm2.tplId ? 'pass' : 'not_pass'
            this.$http.post("wallet/backmgr/push/updateTplAuditStatus.do", ruleForm2).then((res) => {
              this.$notify({
                title: '成功',
                message: `修改成功`,
                type: 'success'
              });
              this.dialogTplVisible = false;
              this.getNoticeInfoList();
            })
          }
        })
      },
      //
      /*changeIsAuto(){
       // this.$refs.executeTimeForm.resetField();
        if(this.ruleForm.isAuto){
          this.ruleForm.executeTime=''
          this.executeTimeDisabled=true
        }else{
          this.executeTimeDisabled=false
        }
      }*/
    },
    activated() {
      this.getNoticeInfoList();
    }
  };
</script>
<style lang="less">
  .sms-push {
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
    .yh-submit .el-form-item__content ,.fi-add .el-form-item__content{
      width:auto
    }
  }
</style>
