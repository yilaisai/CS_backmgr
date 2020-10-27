<template>
  <div class='huobiToken-page'>
    <el-tabs type="border-card">
      <el-tab-pane label="火币Token">
        <el-form ref="form" :model="form" size="small" label-width="150px">
          <el-form-item label="当前火币Token：">
            <el-input v-model="form.currentToken" :disabled="true"></el-input> 
          </el-form-item>
          <br/>
          <el-form-item label="火币Token更改为：">
            <el-input v-model="form.token"></el-input> 
          </el-form-item>
          <br/>
        </el-form>
        <el-button type="primary" class="save" @click="setToken" :disabled="!this.form.token">保存修改</el-button>
      </el-tab-pane>
      
    </el-tabs>
    
  </div>
</template>
<script>
  export default {
    data() {
      return { 
        form:{
          currentToken:'',
          token:''
        }
      }
    },
    mounted(){
      this.getToken()
    },
    methods: {
      getToken(){
        this.$http.post('/wallet/app/otc/backmgr/queryHoubiTokenSetConfig').then(res => {
          this.form.currentToken = res.result
        })
      },
      setToken(){
        this.$http.post('/wallet/app/otc/backmgr/setHoubiTokenConfig',{
          houbiToken:this.form.token
        }).then(res => {
          this.$message.success(res.msg)
          this.form.token = ''
          this.getToken()
        })
      }
    },
  }
</script>
<style lang='less' scoped>
  .huobiToken-page {
    overflow: hidden;
    .el-button {
      display: block;
      width:200px;
      margin:30px auto 0;
    }
  }
</style>