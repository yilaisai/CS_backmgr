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
							<el-select v-model="payType" placeholder="请选择">
								<el-option
									v-for="item in form.otcPayLists"
									:key="item.payType"
									:label="item.description"
									:value="item.payType">
								</el-option>
							</el-select>
						</el-form-item>
                        <br/>
                        <el-form-item label="笔数限制：">
                            <el-input type="number" v-model.trim="form.limitNum" min="0"></el-input>
                        </el-form-item>
                        <br/>
                        <el-form-item label="金额限制：">
                            <el-col class="line" :span="11">
                                <el-input type="number" v-model.trim="form.limit_MIN" min="0"></el-input>
                            </el-col>
                            <el-col class="line" :span="2" style="text-align: center;">~</el-col>
                            <el-col class="line" :span="11">
                                <el-input type="number" v-model.trim="form.limit_MAX" :min="form.limit_MIN"></el-input>
                            </el-col>
                        </el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    otcPayLists: [],
                    limitNum:'',
                    limit_MIN:0,
                    limit_MAX:1
                },
                payType:""
            }
        },
        activated() {
            this.getData()
        },
        methods: {
            getData() {
                // this.$http.post('/wallet/app/otc/backmgr/getPayList').then(res => {
                //     this.form = res.result
                //     this.form.BATCHOUT_RATIO_FEE = Math.floor(this.form.BATCHOUT_RATIO_FEE*10000)/100
                //     if(this.form.otcPayLists.length > 0) {
                //         this.payType = this.form.otcPayLists[0].payType
                //     }
                // })
            }
        }
    }
</script>

<style lang="less" scoped>
    .risk-manage {
        
        
        
    }
    /deep/ .el-form-item {
        .el-form-item__content {
            
        }
    }
</style>