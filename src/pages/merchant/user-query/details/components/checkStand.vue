<template>
  <div class='setCheckstand'>
    <div class="title"><h3>收银台设置</h3></div>
			<el-form ref="defaultForm" :model="defaultForm" :inline="true" label-width="140px" size="small" class="defaultForm">
          <el-form-item label="开启单独设置：" >
            <el-switch
              v-model="defaultForm.CHECK_STAND_SWITCH"
              active-color="#13ce66"
              @change="changeSetting(8)">
            </el-switch>
          </el-form-item>
					<el-form-item label="默认皮肤：" v-if="defaultForm.CHECK_STAND_SWITCH">
							<div class="radioBox">
									<img src="@/assets/head.png" alt="" style="width:100px">
									<el-radio label="1" v-model="defaultForm.CHECK_STAND_SKIN_TYPE" @change="changeSetting(4)">皮肤1</el-radio>
							</div>
							<div class="radioBox">
									<img src="@/assets/head.png" alt="" style="width:100px">
									<el-radio label="2" v-model="defaultForm.CHECK_STAND_SKIN_TYPE" @change="changeSetting(4)">皮肤2</el-radio>
							</div>
					</el-form-item>
					<el-form-item label="收银台支付入口：" v-if="defaultForm.CHECK_STAND_SWITCH">
						<el-checkbox-group 
							v-model="defaultForm.CHECK_STAND_PAY_TYPE"
							:min="1"
              @change="changeSetting(5)">

							<el-checkbox v-for="item in payList" :label="item.payType" :key="item.payType">{{item.description}}</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item label="默认验证方式：" v-if="defaultForm.CHECK_STAND_SWITCH">
								<el-radio-group v-model="defaultForm.CHECK_STAND_CHECK_TYPE" >
									<el-radio  v-for="item in modes" :label="item.value" :key="item.value" @change="changeSetting(6)">{{item.label}}</el-radio>
							</el-radio-group>
					</el-form-item>
					<el-form-item label="是否标记已付款：" v-if="defaultForm.CHECK_STAND_SWITCH">
								<el-radio-group v-model="defaultForm.CHECK_STAND_SIGN_TYPE" >
									<el-radio  v-for="item in payModes" :label="item.value" :key="item.value" @change="changeSetting(7)">{{item.label}}</el-radio>
							</el-radio-group>
					</el-form-item>
					<p class="tips">注：商户收银台支付入口单独设置后，全局风控配置将不再生效</p>
			</el-form>
  </div>
</template>
<script>
  export default {
    props:['data'],
    data() {
      return { 
        defaultForm:{
          CHECK_STAND_SWITCH:'',
          CHECK_STAND_SKIN_TYPE:"",
          CHECK_STAND_CHECK_TYPE:"",
          CHECK_STAND_SIGN_TYPE:"",
          CHECK_STAND_PAY_TYPE:[]
        },
        modes:[
          {
            label:'无验证',
            value:"1"
          },{
              label:'手机号验证',
              value:"2"
          },{
              label:'【付费】银行卡要素验证',
              value:"3"
          }
        ],
        payModes:[
          {
            label:'需要标记',
            value:"1"
          },{
              label:'不需要标记',
              value:"2"
          },{
              label:'关联抢派单模式',
              value:"3"
          }
        ],
        payList:[]
      }
    },
    activated() {

    },
    methods: {
      // 修改收银台设置
      changeSetting(type) {
        let value3 = '';
        let value4 = ''
        switch (type) {
          case 4:
            value3 = this.defaultForm.CHECK_STAND_SKIN_TYPE
          case 5:
            value4 = this.defaultForm.CHECK_STAND_PAY_TYPE.join(',')
            break
          case 6:
            value3 = this.defaultForm.CHECK_STAND_CHECK_TYPE
            break
          case 7:
            value3 = this.defaultForm.CHECK_STAND_SIGN_TYPE
            break 
          case 8:
            value3 = this.defaultForm.CHECK_STAND_SWITCH?1:0
            break
          default:
            break
        }
        this.$http.post('/wallet/backmgr/merchant/updateMerchantInfo',{
          userId:this.$route.query.id,
          type:type,
          value3:value3,
          value4:value4,
        }).then(res => {
          this.$notify.success({
            title: '提示',
            message: res.msg
          })
        })
      }
    },
    watch:{
      data(newVal,oldVal) {
        this.defaultForm.CHECK_STAND_SWITCH = newVal.info.checkStandSwitch == 1?true:false
        this.defaultForm.CHECK_STAND_SKIN_TYPE = newVal.info.checkStandSkinType && newVal.info.checkStandSkinType.toString()
        this.defaultForm.CHECK_STAND_CHECK_TYPE = newVal.info.checkStandCheckType && newVal.info.checkStandCheckType.toString()
        this.defaultForm.CHECK_STAND_SIGN_TYPE = newVal.info.checkStandSignType && newVal.info.checkStandSignType.toString()
        let list = newVal.info.payList?newVal.info.payList.split(','):[]
        this.defaultForm.CHECK_STAND_PAY_TYPE = []
        list.forEach(element => {
          this.defaultForm.CHECK_STAND_PAY_TYPE.push(Number(element))
        });
        // this.defaultForm.CHECK_STAND_PAY_TYPE = newVal.info.payList.split(',')
        console.log(newVal)
        this.payList = newVal.payList
      }
      
    }
  }
</script>
<style lang='less' scoped>
  .setCheckstand {
		.el-form {
			flex-wrap: wrap;
			box-shadow: 0 0 2px #999;
			padding: 10px;
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