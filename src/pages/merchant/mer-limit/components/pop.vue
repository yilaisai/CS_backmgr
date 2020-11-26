<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    >
    <span>是否解冻，解冻后用户可继续下单</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    props:{
      showPop:{
        type:Boolean,
        default:false
      },
      id:{
        type:Number
      }
    },
    data() {
      return { 

      }
    },
    computed:{
      dialogVisible:{
        set(val){
          return this.$emit('dialogToggle',val)
        },
        get(){
          return this.showPop
        }
      }
    },
    methods: {
      confirm(){
        this.$http.post('wallet/app/otc/backmgr/unCashInLimit',{
          userId : this.id 
        }).then(res => {
          if(res.code == 200) {
            this.$message.success(res.msg)
            this.dialogVisible = false
            this.$emit('getData')
          }
        })
      }
    },
  }
</script>
<style lang='less' scoped>
</style>