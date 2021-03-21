<template>
  <el-dialog
    title="入账"
    :visible.sync="dialogVisible"
    width="40%"
    align="center"
    @close="handleClose">
    <el-form :model="form" label-width="100px" ref="form">
      <el-form-item label="TXID：">
        <el-input v-model="form.txId" placeholder="输入监控中对应的txid"></el-input>
      </el-form-item>
      <el-form-item label="谷歌验证码：">
        <el-input v-model="form.secret" placeholder="输入谷歌验证码"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="$emit('confirmTxid',form)">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    props:['visible'],
    data() {
      return { 
        form:{
          txId:'',
          secret:''
        }
      }
    },
    computed:{
      dialogVisible:{
        get(){
          return this.visible
        },
        set(val){
          this.$emit('setVisible',val)
        }
      }
    },
    methods: {
      handleClose(){
        this.form.txId = ''
        this.form.secret = ''
      }
    },
  }
</script>
<style lang='less' scoped>
</style>