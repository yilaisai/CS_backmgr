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
                <el-form :model="form" label-width="110px">
                    <el-form-item label="TXID" prop="txid：">
                        <el-input size="small" placeholder="请输入TXID" v-model="form.txid"></el-input>
                    </el-form-item>
                    <el-form-item label="实际到账金额：" prop="blockAmount">
                        <el-input size="small" v-model="form.blockAmount" placeholder="请输入实际到账金额"></el-input>
                    </el-form-item>
                    <el-form-item label="上链手续费：" prop="blockFee">
                        <el-input size="small" placeholder="请输入上链手续费" v-model="form.blockFee"></el-input>
                    </el-form-item>
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
            <div slot="footer">
                <el-button type="primary" size="small" @click="confirm">{{type === 'reject' ? '拒绝' : '通过'}}</el-button>
                <el-button type="primary" size="small" @click="visible=false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { tokenHandler } from '@/common/util'
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
                reason: ''
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
                auto: '自动放行',
                manual: '手动放行',
                reject: '拒绝订单'
            }
            this.title = title[this.type]
            this.form = {
                remark: '',
                txid: '',
                blockAmount: '',
                blockFee: '',
                reason: ''
            }
        },
        confirm () {
            const params = {
                sysUserId: tokenHandler('sysUserId'),
                recdId: this.item.recdId
            }
            const form = this.form
            if (this.type === 'auto') {
                params.recdStatus = 'SUCCESS'
                params.sysRemark = form.remark
                this.$http.get('/backmgr/auditOrder', params)
                    .then(data => {
                        if (data.ret === 0) {
                            this.$notify.success({
                                title: '提示',
                                message: '放行成功'
                            })
                        } else {
                            this.$notify.error({
                                title: '提示',
                                message: '放行失败'
                            })
                        }
                    })
                    .catch(e => console.warn(e))
            } else if (this.type === 'manual') {
                params.txId = form.txId
                params.blockAmount = form.blockAmount
                params.blockFee = form.blockFee
                this.$http
                    .get('/backmgr/manualAudit', params)
                    .then(({ data }) => {
                        if (data.ret === 0) {
                            this.$notify.success({
                                title: '提示',
                                message: '放行成功'
                            })
                        } else {
                            this.$notify.error({
                                title: '提示',
                                message: '放行失败'
                            })
                        }
                    })
                    .catch(e => console.warn(e))
            } else if (this.type === 'reject') {
                params.recdStatus = 'AUDIT_FAIL'
                params.sysRemark = form.reason
                this.$http
                    .get('/backmgr/auditOrder', params)
                    .then(({ code }) => {
                        if (code === 200) {
                            this.$notify.success({
                                title: '提示',
                                message: '拒绝成功'
                            })
                        } else {
                            this.$notify.error({
                                title: '提示',
                                message: '拒绝失败'
                            })
                        }
                    })
                    .catch(e => console.warn(e))
            }
        }
    }
}
</script>
<style lang="less">
    
</style>