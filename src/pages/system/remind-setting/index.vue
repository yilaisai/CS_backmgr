<template>
	<div class="init-settings">
		<div class="content-wrap">
			<h3>提醒参数设置：</h3>
			<el-tabs type="border-card">
				<el-tab-pane label="交易员（开启接单状态下）提醒配置：">
					<el-form ref="form" :model="form" label-width="0" size="small">
						<el-form-item>
              <span>总持币量低于</span>
              <el-input type="number" v-model="form.CB_TOTAL_AMOUNT_MIN"></el-input> 
              <span>USDT</span>
						</el-form-item>
            <br/>
            <el-form-item>
              <span>持币量</span>
              <el-input type="number" v-model="form.CB_AMOUNT_MIN"></el-input> 
              <span>USDT以上的交易员小于</span>
              <el-input type="number" v-model="form.CB_AMOUNT_COUNT_MIN"></el-input>
              <span>人</span>
						</el-form-item>
            <br/>
            <el-form-item>
              <span>开启接单交易员小于</span>
              <el-input type="number" v-model="form.CB_COUNT_MIN"></el-input> 
              <span>人</span>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
			<el-tabs type="border-card">
				<el-tab-pane label="订单提醒配置">
					<el-form ref="form" :model="form"   size="small">
						<el-form-item>
              <el-form-item label="兑入订单已付款时间未确认提醒时间：">
                <el-input type="number" v-model="form.WARN_PAYED_IN"></el-input> 
                <span>min</span>
              </el-form-item>
						</el-form-item>
						<br />
            <el-form-item>
              <el-form-item label="兑入订单已付款时间未确认提醒时间：">
                <el-input type="number" v-model="form.WARN_PAYED_TRADE_IN"></el-input> 
                <span>min</span>
              </el-form-item>
						</el-form-item>
            <br />
            <el-form-item>
              <el-form-item label="兑出订单已付款时间未确认提醒时间：">
                <el-input type="number" v-model="form.WARN_PAYED_OUT"></el-input> 
                <span>min</span>
              </el-form-item>
						</el-form-item>
            <el-form-item>
              <el-form-item label="申诉超时提醒时间：">
                <el-input type="number" v-model="form.WARN_APPLEAL"></el-input> 
                <span>min</span>
              </el-form-item>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
			<el-button type="primary" class="save" @click="save">保存修改</el-button>
		</div>
	</div>
</template>

<script>
export default {
	data() { 
		return {
      form:{}
		}
	},
	activated() {
		this.getData()
	},
	methods: {
		getData(){
      this.$http.post('/wallet/backmgr/indexInfo').then(res => {
        this.form = res.result
        console.log(this.form)
      })
    },
    save(){
      this.$http.post('/wallet/backmgr/indexInfoSetConfig',this.form).then(res => {
        if(res.code === 200) {
          this.$message.success(res.msg)
          this.getData()
        }
      })
    },
	},
	watch: {

  },
}
</script>

<style lang="less" scoped>
.init-settings{
	overflow-y: auto;
	h3 {
		margin: 0;
		font-size: 16px;
	}
	.content-wrap {
		h3 {
			margin: 10px 0;
		}
	}
	.el-input {
    width: 100px;
    /deep/ .el-input__inner {
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
	}
	.el-tabs {
		margin-bottom: 20px;
	}
	.tips {
		color: #999;
		font-size: 14px;
	}
	.save {
		display: block;
		width: 30%;
		margin: 0 auto 20px;
	}
	.big>p{
		color: red;
	}
	/deep/.bold{
		.el-form-item__label{
			font-weight: 600;
		}
	}
}
</style>