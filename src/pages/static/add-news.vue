<template>
    <div class="add-news-page">
        <el-row style="margin-bottom: 20px;">
            <el-col :span="20">
                <el-button size="small" type="primary" plain @click="$router.go(-1)">返回</el-button>
            </el-col>
            <el-col :span="4" style="text-align: right" v-if="!disabled">
                <!-- <el-button size="small" type="primary">生成链接</el-button> -->
                <el-button size="small" type="primary" @click.native="save">保存</el-button>
            </el-col>
        </el-row>
        <el-form :inline="true"
            label-width="100px"
            :rules="rules"
            :model="postObj"
            ref="form">
            <el-form-item label="外部URL" prop="realName">
                <el-input v-model.trim="postObj.url" placeholder="请输入外部URL" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="预发布类型" prop="pageType">
                <el-select ref="pageType" v-model="postObj.pageType" :disabled="disabled">
                    <el-option
                        v-for="item,index in pageTypeList"
                        :key="index"
                        :label="item.typeName"
                        :value="item.pageType">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题" prop="title">
                <el-input v-model.trim="postObj.title" placeholder="请输入标题" :disabled="disabled"></el-input>
            </el-form-item>
        </el-form>
        <quill-editor :disabled="disabled" v-model="postObj.content" ref="myQuillEditor"></quill-editor>
    </div>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
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
        disabled: false
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
                    this.$http.post(postUrl, this.postObj).then(res => {
                        console.log(res)
                        if(res.code == 200) {
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
        }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted() {
        this.getPageType()
    },
    activated() {
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
        }
    },
    components: {
        quillEditor
    }
}
</script>

<style lang="less">
.add-news-page {
    .el-form-item__content {
        width: auto;
    }
}
</style>

