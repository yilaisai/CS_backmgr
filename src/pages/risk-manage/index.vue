<template>
    <div class="risk-manage">
        <DefaultSetting></DefaultSetting>
        <el-tabs type="border-card">
            <el-tab-pane label="支付通道设置">
                <el-form ref="form" :model="form" :inline="true" label-width="140px" size="small">
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
                    <el-form-item label="是否启用：">
                        <el-switch
                            v-model="form.isUseCheckout"
                            active-color="#13ce66"
                            active-value="1"
                            inactive-value="0"
                            >
                        </el-switch>
                    </el-form-item>
                    <br/>
                    <el-form-item label="笔数限制：">
                        <el-input type="number" v-model.trim="form.ckLimitNum" min="0"></el-input>
                    </el-form-item>
                    <br/>
                    <el-form-item label="单笔金额上限：">
                        <el-input type="number" v-model.trim="form.ckSingleMax" min="0"></el-input>
                    </el-form-item>
                    <br/>
                    <el-form-item label="每日总金额上限：">
                        <el-input type="number" v-model.trim="form.ckLimitMax" :min="form.ckLimitMin"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-button type="primary" class="save" @click="save">保存修改</el-button>
        </el-tabs>
        <LocalIpFilter></LocalIpFilter>
        <DomainNameList></DomainNameList>      
    </div>
</template>

<script>
    import DomainNameList from './components/domainNameList'
    import LocalIpFilter from './components/localIpFiltering'
    import DefaultSetting from './components/defaultSetting'
    export default {
        data() {
            return {
                otcPayLists: [],
                form: {
                    payType:'',
                    ckLimitNum:'',
                    ckSingleMax:'',
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

            //支付通道设置保存
            save() {
                this.$http.post('/wallet/app/otc/backmgr/modifyPayList',this.form).then(res => {
                    this.$notify.success({
                        title: '提示',
                        message: res.msg
                    })	
                    this.getData()
                })
            },
        },
        components:{
            DomainNameList,
            LocalIpFilter,
            DefaultSetting
        },
        watch:{
            payType(newVal, oldVal) {
                this.otcPayLists.forEach((el,index)=> {
                    if (newVal === el.payType) {
                        this.form.ckLimitNum = this.otcPayLists[index].ckLimitNum
                        this.form.ckSingleMax = this.otcPayLists[index].ckSingleMax
                        this.form.ckLimitMax = this.otcPayLists[index].ckLimitMax
                        this.form.isUseCheckout = this.otcPayLists[index].isUseCheckout.toString()
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-tabs  {
        margin-bottom:20px;
    }
    .el-button {
        display: block;
        margin: 20px auto;
    }
    .risk-manage {
        overflow-y: auto;
        // .defaultForm {
        //     /deep/ .el-form-item  {
        //         display: flex;
        //         .el-form-item__content {
        //             flex:1;
        //             display: flex;
        //             align-items: center;
        //             .radioBox {
        //                 display: flex;
        //                 flex-direction: column;
        //                 align-items: center;
        //                 margin-right:30px;
        //                 img {
        //                     margin-bottom:10px;
        //                 }
        //             }
        //         }
        //     }
        // }
    }
</style>