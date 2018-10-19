<template>
    <div class="add-news-page">
        <el-row style="margin-bottom: 20px;">
            <el-col :span="20">
                <el-button size="small" type="primary" plain @click="$router.go(-1)">返回</el-button>
            </el-col>
            <el-col :span="4" style="text-align: right" v-if="!disabled">
                <el-button size="small" type="primary" @click.native="save">保存</el-button>
            </el-col>
        </el-row>
        <el-form :inline="true"
            label-width="100px"
            :rules="rules"
            :model="postObj"
            ref="form">
            <el-form-item label="外部URL" prop="realName">
                <el-input v-model.trim="postObj.url" size="small" placeholder="请输入外部URL" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="预发布类型" prop="pageType">
                <el-select ref="pageType" v-model="postObj.pageType" size="small" :disabled="disabled">
                    <el-option
                        v-for="item,index in pageTypeList"
                        :key="index"
                        :label="item.typeName"
                        :value="item.pageType">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题" prop="title">
                <el-input v-model.trim="postObj.title" size="small" placeholder="请输入标题" :disabled="disabled"></el-input>
            </el-form-item>
        </el-form>
        <quill-editor :disabled="disabled" v-model.trim="postObj.content" ref="myQuillEditor"></quill-editor>
        <el-upload class="upload"
            :action="serverPath+'wallet/util/open/uploadFile.do'"
            name="files"
            :data="{type:'html'}"
            :on-success='upScuccess'
						:before-upload="beforeUpload"
            ref="upload" style="display:none">
            <el-button size="small" type="primary" id="imgInput" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="插入中,请稍候">点击上传</el-button>
        </el-upload>
    </div>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import Quill from 'quill'
export default {
    data () {
      return {
        pageTypeList: [],
        postObj: {
            url: '',
            title: '',
            content: '',
            pageType: 1
        },
        rules: {
          pageType: [
            { required: true, message: '请输入用户账户', trigger: 'change' },
          ],
          title: [
            { required: true, message: '请输入用标题', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ]
        },
        disabled: false,
        originUrl: '',
        uploadData : {},
        photoUrl : '',         // 上传图片地址
        uploadType : '',    // 上传的文件类型（图片、视频）
        serverPath: '',
        fullscreenLoading: false
      }
    },
    // manually control the data synchronization
    // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
    methods: {

        save() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let postUrl = '/cloud/backmgr/page/createPageInfo'
                    if(this.postObj.id) {
                        postUrl = '/cloud/backmgr/page/updatePageInfo'
                    }
                    if(this.postObj.url.trim() != '' && this.postObj.url !== this.originUrl && this.postObj.content.trim() != '') {
                        // 修改过url
                        this.$confirm('修改外部URL后将清空自定义内容并保存，确定继续操作？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.postObj.content = ""
                            this.saveSubmit(postUrl)
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        })

                    }else {
                        this.saveSubmit(postUrl)
                    }
                } else {
                    return false;
                }
            });
        },
        getPageType() {
            this.$http.post('/cloud/backmgr/page/open/getPageTypeList').then(res => {
                this.pageTypeList = res.result.list
            })
        },
        getContent(id) {
            this.$http.post('/cloud/backmgr/page/open/getPageInfo', {
                id: id
            }).then(res => {
                this.postObj.content = res.result.appPageInfo.content || ''
            })
        },
        /**
         * 提交修改或保存
         */
        saveSubmit(postUrl) {
            this.$http.post(postUrl, this.postObj).then(res => {
                if(res.code == 200) {
                    this.$notify({
                        title: '成功',
                        message: res.msg,
                        type: 'success'
                    });
                }
                this.$router.go(-1)
            })
        },
				// 图片大小限制
				beforeUpload(file) {
					if(file.size > 1048576) {
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
        this.getPageType()
        if(this.$route.params && this.$route.params.data) {
            const paramsData = this.$route.params.data
            let obj = {
                url: paramsData.url,
                title: paramsData.title,
                content: paramsData.content,
                pageType: paramsData.page_type,
                id: paramsData.id
            }
            this.postObj = obj
            this.originUrl = paramsData.url
            if(this.$route.params.type == 'view') {
                this.disabled = true
            }else {
                this.disabled = false
            }
            this.getContent(paramsData.id)
        }else {
            this.postObj = {
                url: '',
                title: '',
                content: '',
                pageType: 1
            }
            this.disabled = false
            this.originUrl = ''
        }
    },
    components: {
        quillEditor,
    }
}
</script>

<style lang="less">
.add-news-page {
    .el-form-item__content {
        width: auto;
    }
    .ql-video {
        display: none !important;
    }
}
</style>

