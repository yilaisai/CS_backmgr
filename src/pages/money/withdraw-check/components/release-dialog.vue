<template>
    <div>
        <el-dialog :visible.sync="visible" @open="openHandle" :title="title" width="400px">
            <template v-if="type === 'auto'">
                <center style="margin: 0 0 10px 0">
                    备注
                </center>
                <el-input type="textarea" v-model="form.remark" placeholder="请输入备注信息"></el-input>
            </template>
            <template v-else-if="type === 'manual'">
                <el-form :model="form" label-width="60px">
                    <el-form-item label="TXID" prop="txid：">
                        <el-input size="small" placeholder="请输入TXID" v-model="form.txid"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="txid：">
                        <el-input size="small" placeholder="请输入备注" v-model="form.memo"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="实际到账金额：" prop="blockAmount">
                        <el-input size="small" v-model="form.blockAmount" placeholder="请输入实际到账金额"></el-input>
                    </el-form-item>
                    <el-form-item label="上链手续费：" prop="blockFee">
                        <el-input size="small" placeholder="请输入上链手续费" v-model="form.blockFee"></el-input>
                    </el-form-item> -->
                </el-form>
            </template>
            <template v-else-if="type === 'reject'">
                <p style="margin-bottom: 10px; font-size: 16px">
                    <span class="label">
                        请输入拒绝理由:
                    </span>
                </p>
                <p>
                    <el-input type="textarea" v-model="form.reason"></el-input>
                </p>
            </template>
            <el-row>
                <el-form :model="form" label-width="85px">
                    <el-form-item label="谷歌验证码" prop="secret">
                        <el-input size="small" placeholder="请输入谷歌验证码" v-model="form.secret"></el-input>
                    </el-form-item>
                </el-form>
            </el-row>
            <div slot="footer">
                <el-button type="primary" size="small" @click="confirm">{{type === 'reject' ? '拒绝' : '通过'}}</el-button>
                <el-button type="primary" size="small" @click="visible=false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: ['showDialog', 'type', 'item'],
    data () {
        return {
            title: '',
            form: {
                remark: '',
                txid: '',
                blockAmount: '',
                blockFee: '',
                reason: '',
                secret:'',
                userRemark:''
            }
        }
    },
    computed: {
        visible: {
            get () {
                return this.showDialog
            },
            set (val) {
                this.$emit('hideDialog', val)
            }
        }
    },
    methods: {
        openHandle () {
            const title = {
                auto: '审核通过',
                manual: '手动放行',
                reject: '拒绝订单'
            }
            this.title = title[this.type]
            this.form = {
                remark: '',
                txid: '',
                blockAmount: '',
                blockFee: '',
                reason: '',
                googleCode:''
            }
        },
        confirm () {
            const form = this.form
            const params = {
                recdId: this.item.recdId,
                secret: form.googleCode
            }
            if (!this.form.secret) {
                this.$notify.error({
                    title: '提示',
                    message: '请输入谷歌验证码'
                })
                return
            }
            if (this.type === 'auto') {
				params.tradeStatus = '4'
				params.tradeId = this.item.id
                params.sysRemark = form.remark
                params.secret = form.secret
                if(this.item.pinchbeck == 1) {
                    this.$confirm('地址已改变，是否仍要通过审核？').then(()=>{
                        this.$http.post('/wallet/backmgr/trade/auditTrade', params).then(res => {
                            if(res.code == 200) {
                                this.$notify.success({
                                    title: '提示',
                                    message: res.msg
                                })
                            }else {
                                this.$notify.error({
                                    title: '提示',
                                    message: res.msg
                                })
                            }
                            this.visible = false
                            this.$emit('getData')
                        }).catch(e => console.warn(e))
                    }).catch(()=>{})
                } else {
                    this.$http.post('/wallet/backmgr/trade/auditTrade', params).then(res => {
                        if(res.code == 200) {
                            this.$notify.success({
                                title: '提示',
                                message: res.msg
                            })
                        }else {
                            this.$notify.error({
                                title: '提示',
                                message: res.msg
                            })
                        }
                        this.visible = false
                        this.$emit('getData')
                    }).catch(e => console.warn(e))
                }
            } else if (this.type === 'manual') {
				params.txId = form.txid
                params.orderId = this.item.id
                params.secret = form.secret
                params.userRemark = form.memo
                if(this.item.pinchbeck == 1) { 
                    this.$confirm('地址已改变，是否仍要放行？').then(()=>{
                        this.$http.post('/wallet/backmgr/trade/updateWithdrawSuccess', params).then((res) => {
                            if(res.code == 200) {
                                this.$notify.success({
                                    title: '提示',
                                    message: res.msg
                                })
                            }else {
                                this.$notify.error({
                                    title: '提示',
                                    message: res.msg
                                })
                            }
                            this.visible = false
                            this.$emit('getData')
                        }).catch(e => console.warn(e))
                    }).catch(()=>{})
                } else {
                    this.$http.post('/wallet/backmgr/trade/updateWithdrawSuccess', params).then((res) => {
                        if(res.code == 200) {
                            this.$notify.success({
                                title: '提示',
                                message: res.msg
                            })
                        }else {
                            this.$notify.error({
                                title: '提示',
                                message: res.msg
                            })
                        }
                        this.visible = false
                        this.$emit('getData')
                    }).catch(e => console.warn(e))
                }
                
            } else if (this.type === 'reject') {
                params.tradeStatus = '3'
				params.sysRemark = form.reason
                params.tradeId = this.item.id
                params.secret = form.secret
                if (!form.reason) {
                    this.$notify.warning({
                        title:'提示',
                        message:'拒绝理由不能为空！'
                    })
                    return
                }
                this.$http.post('/wallet/backmgr/trade/auditTrade', params).then(res => {
					if(res.code == 200) {
						this.$notify.success({
							title: '提示',
							message: res.msg
						})
					}else {
						this.$notify.error({
							title: '提示',
							message: res.msg
						})
					}
					this.visible = false
					this.$emit('getData')
				}).catch(e => console.warn(e))
            }
        }
    }
}
</script>
<style lang="less">
    
</style>