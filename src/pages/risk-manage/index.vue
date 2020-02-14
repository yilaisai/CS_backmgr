<template>
    <div class="risk-manage">
        <div class="pay-setting">
            <div class="title">
				<h3>支付通道设置</h3>
			</div>
            <el-tabs type="border-card">
				<el-tab-pane label="支付通道设置">
					<el-form ref="form" :model="form" :inline="true" label-width="155px" size="small">
						<el-form-item label="支付方式：">
							<el-select v-model="form.payType" placeholder="请选择">
								<el-option
									v-for="item in otcPayLists"
									:key="item.payType"
									:label="item.description"
									:value="item.payType">
								</el-option>
							</el-select>
						</el-form-item>
                        <br/>
                        <el-form-item label="笔数限制：">
                            <el-input type="number" v-model.trim="form.ckLimitNum" min="0"></el-input>
                        </el-form-item>
                        <br/>
                        <el-form-item label="金额限制：">
                            <el-col class="line" :span="11">
                                <el-input type="number" v-model.trim="form.ckLimitMin" min="0"></el-input>
                            </el-col>
                            <el-col class="line" :span="2" style="text-align: center;">~</el-col>
                            <el-col class="line" :span="11">
                                <el-input type="number" v-model.trim="form.ckLimitMax" :min="form.ckLimitMin"></el-input>
                            </el-col>
                        </el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
        </div>

        <el-button type="primary" class="save" @click="save">保存修改</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                otcPayLists: [],
                form: {
                    payType:'',
                    ckLimitNum:'',
                    ckLimitMin:'',
                    ckLimitMax:'',
                    isUseCheckout:'', 
                },
            }
        },
        activated() {
            this.getData()
        },
        computed:{
            payType() {
                return this.form.payType
            }
        },
        methods: {
            getData() {
                this.$http.post('/wallet/app/otc/backmgr/getPayList').then(res => {
                    this.otcPayLists = res.result
                    this.form.payType = this.form.payType || this.otcPayLists[0].payType
                })
            },
            save() {
                this.$http.post('/wallet/app/otc/backmgr/modifyPayList',this.form).then(res => {
                    this.$notify.success({
                        title: '提示',
                        message: res.msg
                    })	
                    this.getData()
                })
            }
        },
        watch:{
            payType(newVal, oldVal) {
                this.otcPayLists.forEach((el,index)=> {
                    if (newVal === el.payType) {
                        this.form.ckLimitNum = this.otcPayLists[index].ckLimitNum
                        this.form.ckLimitMin = this.otcPayLists[index].ckLimitMin
                        this.form.ckLimitMax = this.otcPayLists[index].ckLimitMax
                        this.form.isUseCheckout = this.otcPayLists[index].isUseCheckout
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .risk-manage {
        .save {
            display: block;
            width: 30%;
            margin: 20px auto;
        }
    }
    /deep/ .el-form-item {
        .el-form-item__content {
            
        }
    }
</style>