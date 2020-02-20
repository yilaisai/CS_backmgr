<template>
  <div class='setCheckstand'>
    <div class="title"><h3>收银台设置</h3></div>
			<el-form ref="defaultForm" :model="defaultForm" :inline="true" label-width="140px" size="small" class="defaultForm">
					<el-form-item label="默认皮肤：">
							<div class="radioBox">
									<img src="@/assets/head.png" alt="" style="width:100px">
									<el-radio label="1" v-model="defaultForm.CHECK_STAND_SKIN_TYPE" @change="changeSetting('CHECK_STAND_SKIN_TYPE',1)">皮肤1</el-radio>
							</div>
							<div class="radioBox">
									<img src="@/assets/head.png" alt="" style="width:100px">
									<el-radio label="2" v-model="defaultForm.CHECK_STAND_SKIN_TYPE" @change="changeSetting('CHECK_STAND_SKIN_TYPE',2)">皮肤2</el-radio>
							</div>
					</el-form-item>
					<el-form-item label="收银台支付入口：">
						<el-checkbox-group 
							v-model="defaultForm.CHECK_STAND_PAY_TYPE"
							:min="1">
							<el-checkbox v-for="item in payList" :label="item.value" :key="item.label">{{item.label}}</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item label="默认验证方式：">
								<el-radio-group v-model="defaultForm.CHECK_STAND_CHECK_TYPE" >
									<el-radio  v-for="(item,index) in modes" :label="item.value" :key="item.value" @change="changeSetting('CHECK_STAND_CHECK_TYPE',index+1)">{{item.label}}</el-radio>
							</el-radio-group>
					</el-form-item>
					<el-form-item label="是否标记已付款：">
								<el-radio-group v-model="defaultForm.CHECK_STAND_SIGN_TYPE" >
									<el-radio  v-for="(item,index) in payModes" :label="item.value" :key="item.value" @change="changeSetting('CHECK_STAND_SIGN_TYPE',index+1)">{{item.label}}</el-radio>
							</el-radio-group>
					</el-form-item>
					<p class="tips">注：商户收银台支付入口单独设置后，全局风控配置将不再生效</p>
			</el-form>
  </div>
</template>
<script>
  export default {
    props:['pageData'],
    data() {
      return { 
        defaultForm:{
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
        payList:[
          {
            label:'银行卡',
            value:"1"
          },{
            label:'支付宝',
            value:"2"
          },{
            label:'收银台',
            value:"3"
          }
        ]
      }
    },
    activated() {
      console.log(this.pageData)
    },
    methods: {
      // 修改收银台设置
      changeSetting(type,value) {

      }
    },
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