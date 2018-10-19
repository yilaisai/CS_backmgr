/**
*  Created by   阿紫
*  On  2018/8/21
*  Content
*/
<template>
  <div class='identity-details'>
    <el-row style="margin-bottom: 30px;">
      <el-col :span="4">
        <el-button size="small" type="primary" plain @click="$router.go(-1)">返回</el-button>
      </el-col>
      <el-col :span="16" style="text-align: right;">
        <el-button class="refuse-btn" type="danger" :disabled="details.antiMoneyAudit == 0" size="small"
                   @click.native="modifyState('refuse')">拒绝
        </el-button>
        <el-button class="success-btn" type="success" :disabled="details.antiMoneyAudit == 1" size="small"
                   @click.native="modifyState('success')">通过审核
        </el-button>
        <el-button size="small" type="primary" @click.native="fixContent">修改</el-button>
      </el-col>
    </el-row>
    <div class="content">
      <el-row :gutter="24">
        <el-col :span="8"><span>账号：</span><span>{{details.phone}}</span></el-col>
        <el-col :span="8"><span>姓名：</span><span>{{details.realName}}</span></el-col>
        <el-col :span="8"><span>身份证号码：</span><span>{{details.cardNo}}</span></el-col>
      </el-row>
      <el-row :gutter="24" style="margin-top:20px;">
        <el-col :span="8"><span>证件照审核：</span>
          <span :class="[details.cardBackAudit ==1 || CardAudit == 1 ?'green':'red']">
            {{CardAudit == 1 ?'通过' : details.cardBackAudit ==-1?'未申请':cardBackAuditArr[details.cardBackAudit]}}</span>
        </el-col>
        <el-col :span="8">
          <span>三要素审核：</span>
          <span :class="[(details.autoVerifyDesc =='通过')||(details.autoVerifyDesc =='快速通过')?'green':'red']">
            {{details.autoVerifyDesc}}</span>
        </el-col>
        <el-col :span="8">
          <el-button type="warning" size="small" class="check-idenfity" @click.native="checkThreeIdenfity">校验三元素
          </el-button>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <viewer :options="options"
                class="viewer" ref="viewer"
        >
          <el-col :span="8">
            <span>正面：</span>
            <img :src="details.cardFrontUrl">
          </el-col>
          <el-col :span="8">
            <span>反面：</span> <img :src="details.cardBackUrl" alt="">
          </el-col>
          <el-col :span="8">
            <span>手持照片：</span> <img :src="details.antiMoneyUrl" alt="">
          </el-col>
        </viewer>
      </el-row>
    </div>
    <span>审核记录详情：</span>
    <sac-table :data="list" v-if="list.length">
      <el-table-column prop="auditUserName" label="审核人"></el-table-column>
      <el-table-column prop="antiMoneyAudit" label="审核结果" :formatter="formatAntiMoneyAudit"></el-table-column>
      <el-table-column prop="custServiceRemark" label="备注"></el-table-column>
      <el-table-column prop="updateTime" label="审核时间"></el-table-column>
    </sac-table>
    <el-dialog title="备注" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm" ref="dialogForm" :rules="details.antiMoneyAudit == '1'?rules:{}">
        <el-form-item prop="reason"
                      :label="`${details.antiMoneyAudit == '-1'||details.antiMoneyAudit == '2' ? (isAuditPass ? '审核通过': '拒绝') : (details.antiMoneyAudit == '0' ? '审核通过': '拒绝')}理由`">
          <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    v-model="dialogForm.reason" maxlength="50"
                    placeHolder="请输入理由"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="updateAuditStatus" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: "identity-details",
    data() {
      return {
        details: {},
        cardBackAuditArr: {
          0: '未通过',
          1: '通过',
          2: '未通过',
        },
        CardAudit: '',//判断是否通过
        list: [],
        dialogFormVisible: false,
        dialogForm: {
          reason: '',
        },
        rules: {
          reason: [
            { required: true, message: '请输入拒绝理由', trigger: 'blur' },
          ]
        },
        options: {
          inline: false,
          button: false,
          navbar: false,
          title: false,
          toolbar: true,
          tooltip: false,
          movable: true,
          zoomable: true,
          rotatable: true,
          scalable: false,
          transition: true,
          fullscreen: true,
          keyboard: true,
          url: 'data-source'
        },
        isAuditPass: true
      };
    },
    methods: {
      resetForm() {
        this.$refs.dialogForm && this.$refs.dialogForm.resetFields();
      },
      fixContent() {
        this.$router.push({
          name: 'identityModify',
          params: this.details
        })
      },
      formatAntiMoneyAudit(row, column) {
        return row.antiMoneyAudit == 0 ? '不通过' : '通过'
      },
      // 校验三元素
      checkThreeIdenfity() {
        this.$confirm('请小心确认，每次需要花费0.5元哟～', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post("/wallet/backmgr/user/checkRealInfo.do", {
            userId: this.details.userId,
          }).then((res) => {
            if (res.result.verifyMsg && res.result.verifyMsg.indexOf(':') > -1) {
              this.details.autoVerifyDesc = res.result.verifyMsg.split(':')[1];
            } else {
              this.details.autoVerifyDesc = res.result.verifyMsg;
            }
            this.CardAudit = res.result.CardAudit;
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      getAuditRecdList() {
        this.$http.post("/wallet/backmgr/user/getAuditRecdList.do", {
          userId: this.details.userId,
        }).then((res) => {
          this.list = res.result.list;
        })
      },
      modifyState(id) {
        if (id == 'refuse') {
          this.isAuditPass = false;
        } else {
          this.isAuditPass = true;
        }
        this.dialogFormVisible = true;
        this.resetForm();
      },
      updateAuditStatus() {

        this.$refs.dialogForm.validate((valid) => {
          if (valid) {
            const { userId, antiMoneyAudit } = this.details; // auditStatus 状态0表示不通过，1表示通过  auditType 1表示实名认证，2表示高级认证
            const { reason } = this.dialogForm;
            this.$http.post("wallet/backmgr/user/updateAuditStatus.do", {
              userId,
              auditStatus: antiMoneyAudit == '-1' || antiMoneyAudit == '2' ? (this.isAuditPass ? '1' : '0') : (antiMoneyAudit == '1' ? '0' : '1'),
              auditType: 1,
              reason: reason || 'empty'
            }).then((res) => {
              this.dialogFormVisible = false;
              this.$router.go(-1);
            })
          }
        })
      }
    },
    activated() {
      if (this.$route.params.userId) {
        this.resetForm();
        this.details = this.$route.params;
        this.details.autoVerifyDesc = this.details.autoVerifyDesc && this.details.autoVerifyDesc.indexOf(':') > -1 ? this.details.autoVerifyDesc.split(':')[1] : this.details.autoVerifyDesc;
        this.getAuditRecdList();
      } else {
        this.$router.go(-1);
      }
    }
  };
</script>
<style lang="less">
  .identity-details {
    .green {
      color: green;
    }
    .red {
      color: red;
    }
    img {
      max-height: 250px;
      max-width: 350px;
      margin: 20px 0;
    }
    .content {
      margin-bottom: 20px;
    }
  }
</style>
