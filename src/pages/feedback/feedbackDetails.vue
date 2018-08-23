/**
*  Created by   阿紫
*  On  2018/8/17
*  Content
*/
<template>
    <div class='feedbackDetails'>
      <el-row style="margin-bottom: 20px;">
        <el-col :span="4">
          <el-button size="small" type="primary" plain @click="$router.go(-1)">返回</el-button>
        </el-col>
      </el-row>
      <div class="content">
        <el-row :gutter="20">
          <el-col :span="6"><span>问题类型：</span><span>{{details.rtypeName}}</span></el-col>
          <el-col :span="6"><span>创建日期：</span><span>{{details.createTime}}</span></el-col>
          <el-col :span="6"><span>联系方式：</span><span>{{details.contactData}}</span></el-col>
          <el-col :span="6"><span>状态：</span><span :class="{info:!details.opStatus, success:details.opStatus}">{{details.opStatus?'已处理':'未处理'}}</span>
          </el-col>
        </el-row>

        <el-form ref="form" :inline="true" :model="submitForm" class="submitForm">
          <el-form-item label="备注">
            <el-input v-model="submitForm.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">处理</el-button>
          </el-form-item>
        </el-form>

        <h3>意见反馈：</h3>
        <p class="details">{{details.content}}</p>
        <div v-if="imgArray.length">
          <img :src="item" alt="" v-for="item in imgArray">
        </div>
      </div>
    </div>
</template>
<script>
  export default {
    name: "feedbackDetails",
    data() {
      return {
        details: {
          rtypeName: '',
          createTime: '',
          contactData: '',
          opStatus: '',
          content: '',
        },
        submitForm: {
          remark: '',
          fId: '',
        },
        imgArray: []
      };
    },
    methods: {
      onSubmit() {
        this.$http.post("/wallet/backmgr/feedback/operateFeedback.do", this.submitForm).then((res) => {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.$router.go(-1);
        })
      }
    },
    activated() {
      if (this.$route.params.id) {
        this.details = this.$route.params;
        this.submitForm.fId = this.$route.params.id;
        this.imgArray = this.$route.params.otherFile.split(',');
      } else {
        this.$router.go(-1);
      }
    },
  };
</script>
<style lang="less">
    .feedbackDetails {
      padding: 0 15px;
      .content {
        margin-top: 60px;
        .submitForm {
          margin-top: 30px;
        }
        .success {
          color: #67c23a;
        }
        .info {
          color: #f56c6c;
        }
        h3 {
          margin-top: 60px;
        }
        .details {
          margin-top: 10px;
          text-indent: 24px;
        }
        img {
          max-width: 300px;
          margin: 20px 10px;
          max-height: 150px;
        }
      }
    }
</style>
