/**
*  Created by   阿紫
*  On  2018/10/23
*  Content
*/
<template>
  <div class='sendEmail'>
    <el-row style="margin-bottom: 20px;">
      <el-col :span="20">
        <el-button size="small" type="primary" plain @click="$router.go(-1)">返回</el-button>
      </el-col>
      <el-col :span="4" style="text-align: right" v-if="!disabled">
        <el-button size="small" type="primary" @click.native="save">发送</el-button>
      </el-col>
    </el-row>
    <el-form :inline="true"
             label-width="100px"
             :rules="rules"
             :model="postObj"
             ref="postObj">
      <el-form-item label="发件人：">
        <span> {{$route.params&&$route.params.fromName}} </span>
      </el-form-item>
      <el-form-item
        size="small"
        prop="receiver"
        label="收件人："
        :rules="[
      { required: true, message: '请输入收件人邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
      >
        <el-input v-model="postObj.receiver"></el-input>
      </el-form-item>

      <el-form-item label="邮件主题：" prop="subject">
        <el-input v-model.trim="postObj.subject" size="small" placeholder="请输入标题" :disabled="disabled"></el-input>
      </el-form-item>
      <quill-editor :disabled="disabled" v-model.trim="postObj.content" ref="myQuillEditor"></quill-editor>
      <el-upload class="upload"
                 :action="serverPath+'wallet/util/open/uploadFile.do'"
                 name="files"
                 :data="{type:'html'}"
                 :on-success='upScuccess'
                 :before-upload="beforeUpload"
                 ref="upload" style="display:none">
        <el-button size="small" type="primary" id="imgInput" v-loading.fullscreen.lock="fullscreenLoading"
                   element-loading-text="插入中,请稍候">点击上传
        </el-button>
      </el-upload>
      <el-form-item label="" prop="content"></el-form-item>
    </el-form>
  </div>
</template>
<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  import { quillEditor } from 'vue-quill-editor'
  import Quill from 'quill'

  export default {
    name: "sendEmail",
    components: {
      quillEditor,
    },
    data() {
      return {
        postObj: {
          receiver: '',
          subject: '',
          content: '',
        },
        rules: {
          subject: [
            { required: true, message: '请输入邮件标题', trigger: 'blur' },
          ],
          content: [
            { required: true, message: '请输入邮件内容', trigger: 'blur' },
          ]
        },
        disabled: false,
        originUrl: '',
        uploadData: {},
        photoUrl: '',         // 上传图片地址
        uploadType: '',    // 上传的文件类型（图片、视频）
        serverPath: '',
        fullscreenLoading: false
      };
    },
    // manually control the data synchronization
    // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
    methods: {
      resetForm() {
        this.postObj = {
          receiver: '',
          subject: '',
          content: '',
        };
        this.isTeamImg = false;
        this.isTeamDoc = false;
        this.isMarketImg = false;
        this.isMarketDoc = false;
        this.teamIntroduceUrl = '';
        this.marketingIntroduceUrl = '';
        this.$refs.postObj && this.$refs.postObj.resetFields(); // 重置query的数据
      },
      save() {
        this.$refs.postObj.validate((valid) => {
          if (valid) {
            let postUrl = 'supernode/backmgr/team/mail/send'
            this.$http.post(postUrl, this.postObj).then(res => {
              if (res.code == 200) {
                this.$notify({
                  title: '成功',
                  message: res.msg,
                  type: 'success'
                });
              }
              this.$router.go(-1)
            })
          } else {
            return false;
          }
        });
      },
      // 图片大小限制
      beforeUpload(file) {
        if (file.size > 1048576) {
          this.$notify({
            title: '提示',
            message: '图片大小不得超过1M',
            type: 'warning'
          });
          return false
        }
      },
      // 图片上传成功回调   插入到编辑器中
      upScuccess(e, file, fileList) {
        this.fullscreenLoading = false
        let vm = this
        let url = ''
        if (this.uploadType === 'image') {    // 获得文件上传后的URL地址
          url = file.response.result.urls[0]
        } else if (this.uploadType === 'video') {
          // url = STATVIDEO + e.key
        }
        if (url != null && url.length > 0) {  // 将文件上传后的URL地址插入到编辑器文本中
          let value = url
          vm.addRange = vm.$refs.myQuillEditor.quill.getSelection()
          vm.$refs.myQuillEditor.quill.insertEmbed(vm.addRange !== null ? vm.addRange.index : 0, vm.uploadType, value, Quill.sources.USER)   // 调用编辑器的 insertEmbed 方法，插入URL
        } else {
          this.$message.error(`${vm.uploadType}插入失败`)
        }
        this.$refs['upload'].clearFiles()    // 插入成功后清除input的内容
      },
      // 点击图片ICON触发事件
      imgHandler(state) {
        this.addRange = this.$refs.myQuillEditor.quill.getSelection()
        if (state) {
          let fileInput = document.getElementById('imgInput')
          fileInput.click() // 加一个触发事件
        }
        this.uploadType = 'image'
      },
      // 点击视频ICON触发事件
      videoHandler(state) {
        this.addRange = this.$refs.myQuillEditor.quill.getSelection()
        if (state) {
          let fileInput = document.getElementById('imgInput')
          fileInput.click() // 加一个触发事件
        }
        this.uploadType = 'video'
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted() {
      this.serverPath = window.SERVER_PATH
      // 为图片ICON绑定事件  getModule 为编辑器的内部属性
      this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
      this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('video', this.videoHandler)  // 为视频ICON绑定事件

    },
    activated() {
      this.resetForm();
      this.postObj = {
        url: '',
        title: '',
        content: '',
        pageType: 1
      }
      this.disabled = false
      this.originUrl = '';
    },
  };
</script>
<style lang="less">
  .sendEmail {
    .el-form--inline .el-form-item__content {
      width: 350px;
    }
    .el-form--inline {
      display: flex;
      flex-direction: column;
      height: 100%;
      .quill-editor {
        height: 100%;
      }
    }
  }
</style>
