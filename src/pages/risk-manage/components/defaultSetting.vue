<template>
  <div class='default-setting'>
    <el-tabs type="border-card" >
      <el-tab-pane label="收银台默认设置">
          <el-form ref="defaultForm" :model="defaultForm" :inline="true" label-width="140px" size="small" class="defaultForm">
              <el-form-item label="默认皮肤：">
                  <div class="radioBox">
                      <img src="@/assets/head.png" alt="" style="width:100px">
                      <el-radio label="1" v-model="defaultForm.CHECK_STAND_SKIN_TYPE" @change="change('CHECK_STAND_SKIN_TYPE',1)">皮肤1</el-radio>
                  </div>
                  <div class="radioBox">
                      <img src="@/assets/head.png" alt="" style="width:100px">
                      <el-radio label="2" v-model="defaultForm.CHECK_STAND_SKIN_TYPE" @change="change('CHECK_STAND_SKIN_TYPE',2)">皮肤2</el-radio>
                  </div>
                  <div class="radioBox">
                      <img src="@/assets/head.png" alt="" style="width:100px">
                      <el-radio label="3" v-model="defaultForm.CHECK_STAND_SKIN_TYPE" @change="change('CHECK_STAND_SKIN_TYPE',3)">皮肤3</el-radio>
                  </div>
              </el-form-item>
              <el-form-item label="默认LOGO：">
                  <div class="radioBox">
                      <!-- <img src="@/assets/head.png" alt="" style="width:100px"> -->
                      <el-radio label="1" v-model="defaultForm.CHECK_STAND_LOGO_TYPE" @change="change('CHECK_STAND_LOGO_TYPE',1)">FlashEx</el-radio>
                  </div>
                  <div class="radioBox">
                      <!-- <img src="@/assets/head.png" alt="" style="width:100px"> -->
                      <el-radio label="2" v-model="defaultForm.CHECK_STAND_LOGO_TYPE" @change="change('CHECK_STAND_LOGO_TYPE',2)">OTC-Flash</el-radio>
                  </div>
                  <div class="radioBox">
                      <!-- <img src="@/assets/head.png" alt="" style="width:100px"> -->
                      <el-radio label="3" v-model="defaultForm.CHECK_STAND_LOGO_TYPE" @change="change('CHECK_STAND_LOGO_TYPE',3)">RouteOtc</el-radio>
                  </div>
              </el-form-item>
              <el-form-item label="默认验证方式：">
                    <el-radio-group v-model="defaultForm.CHECK_STAND_CHECK_TYPE" >
                      <el-radio  v-for="(item,index) in modes" :label="item.value" :key="item.value" @change="change('CHECK_STAND_CHECK_TYPE',index+1)">{{item.label}}</el-radio>
                  </el-radio-group>
              </el-form-item>
              <el-form-item label="是否标记已付款：">
                    <el-radio-group v-model="defaultForm.CHECK_STAND_SIGN_TYPE" >
                      <el-radio  v-for="(item,index) in payModes" :label="item.value" :key="item.value" @change="change('CHECK_STAND_SIGN_TYPE',index+1)">{{item.label}}</el-radio>
                  </el-radio-group>
              </el-form-item>
          </el-form>
          <p class="tips">注：默认收银台支持全部启用中的支付通道</p>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return { 
        defaultForm:{
            CHECK_STAND_SKIN_TYPE:"",
            CHECK_STAND_CHECK_TYPE:"",
            CHECK_STAND_SIGN_TYPE:""
        },
        modes:[{
            label:'无验证',
            value:"1"
        },{
            label:'手机号验证',
            value:"2"
        },{
            label:'【付费】银行卡要素验证',
            value:"3"
        }],
        payModes:[{
            label:'需要标记',
            value:"1"
        },{
            label:'不需要标记',
            value:"2"
        },{
            label:'关联抢派单模式',
            value:"3"
        }],
      }
    },
    activated(){
      this.getList()
    },
    methods: {

      getList() {
        this.$http.post('/backmgr/checkStand/defaultInfo').then(res => {
          this.defaultForm = res.result
        })
      },
      //改变默认皮肤
      change(type,value) {
          this.$http.post('/backmgr/checkStand/updateDefaultInfo',{
            key:type,
            value:value
          }).then(res => {
            this.$notify({
              title: '成功',
              message: res.msg,
              type: 'success'
            })
          })
      }
    },
  }
</script>
<style lang='less' scoped>
.default-setting {
  margin-bottom:20px;
  .defaultForm {
      /deep/ .el-form-item  {
          display: flex;
          .el-form-item__content {
              flex:1;
              display: flex;
              align-items: center;
              .radioBox {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  margin-right:30px;
                  img {
                      margin-bottom:10px;
                  }
              }
          }
      }
  }
}
</style>