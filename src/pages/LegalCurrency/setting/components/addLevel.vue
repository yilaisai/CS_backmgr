<template>
  <el-dialog
  title="设置持币等级"
  :visible.sync="dialogVisible"
  width="400px"
  @opened="getItem"
  @close="resetForm"
  center>
    <el-form label-width="80px" :rules="rules" size="mini" :model="form" ref="form">
      <el-form-item label="持币量" prop="holdAmount">
        <el-input v-model="form.holdAmount" ></el-input>
      </el-form-item>
      <el-form-item label="接单下限" prop="amount">
        <el-input v-model="form.amount" ></el-input>
      </el-form-item>
    </el-form>
    <div class="btns">
      <el-button type="primary" @click="confirm">确定</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    props:['visible','type','formItem'],
    data() {
      return { 
        form:{
          holdAmount:'',
          amount:''
        },
        rules: {
          holdAmount: [
            { required: true, message: "请输入持币量",  trigger: 'blur' }
          ],
          amount: [
            { required: true, message: "请输入接单下限", trigger: 'blur'}
          ],
        }
      }
    },
    mounted(){

    },
    activated(){

    },
    computed:{
      dialogVisible:{
        set(newVal){
          this.$emit('setVisible',newVal)
        },
        get(){
          return this.visible
        }
      }
    },
    methods: {
      getItem(){
        this.form.holdAmount = this.formItem.holdAmount
        this.form.amount = this.formItem.amount
      },
      resetForm(){
        this.form.holdAmount = ''
        this.form.amount = ''
      },
      confirm(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.type == 1) { 
              this.$emit('submitAdd',this.form)
            } else if (this.type == 2) {
              this.$emit('submitEdit',this.form)
            }
          } 
        });
      }
    },
  }
</script>
<style lang='less' scoped>
  .btns {
    text-align: center;
  }
</style>