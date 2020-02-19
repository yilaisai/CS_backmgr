<template>
    <div class="risk-manage">
        <el-tabs type="border-card" >
            <el-tab-pane label="收银台默认设置">
                <el-form ref="defaultForm" :model="defaultForm" :inline="true" label-width="140px" size="small" class="defaultForm">
                    <el-form-item label="默认皮肤：">
                        <div class="radioBox">
                            <img src="@/assets/head.png" alt="" style="width:100px">
                            <el-radio :label="1" v-model="defaultForm.bg" @change="changeBg">皮肤1</el-radio>
                        </div>
                        <div class="radioBox">
                            <img src="@/assets/head.png" alt="" style="width:100px">
                            <el-radio :label="2" v-model="defaultForm.bg" @change="changeBg">皮肤2</el-radio>
                        </div>
                    </el-form-item>
                    <el-form-item label="默认验证方式：">
                         <el-radio-group v-model="defaultForm.verificationMode" @change="changeMode">
                            <el-radio  v-for="item in modes" :label="item.value" :key="item.value">{{item.label}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="是否标记已付款：">
                         <el-radio-group v-model="defaultForm.payType" @change="changePayType">
                            <el-radio  v-for="item in payModes" :label="item.value" :key="item.value">{{item.label}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <p class="tips">注：默认收银台支持全部启用中的支付通道</p>
            </el-tab-pane>
        </el-tabs>
            
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
                    <!-- <el-form-item label="金额限制：">
                        <el-col class="line" :span="11">
                            <el-input type="number" v-model.trim="form.ckLimitMin" min="0"></el-input>
                        </el-col>
                        <el-col class="line" :span="2" style="text-align: center;">~</el-col>
                        <el-col class="line" :span="11">
                            <el-input type="number" v-model.trim="form.ckLimitMax" :min="form.ckLimitMin"></el-input>
                        </el-col>
                    </el-form-item> -->
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

        <el-tabs type="border-card">
			<el-tab-pane label="地区访问设置">
				<el-input
					type="textarea"
					:rows="10"
					placeholder="请输入您允许访问收银台的地区，用“,”号分隔"
					v-model="areas">
				</el-input>
			</el-tab-pane>
			<el-button type="primary" @click="updateEnableAreas">保存修改</el-button>
			<p class="tips">输入您允许访问收银台的地区,多个地区之间用 “,” 号分隔</p>
		</el-tabs>
        <div class="domainNameList-page">
            <ul class="tabs">
                <li :class="type == 4?'active':''" @click="checkedPayType(4)">宝转卡中转域名</li>
                <li :class="type == 3?'active':''" @click="checkedPayType(3)">微信中转域名</li>
                <li :class="type == 2?'active':''" @click="checkedPayType(2)">支付宝中转域名</li>
            </ul>
            <el-table stripe border height="500px" size="mini" :data="list" >
                <el-table-column type="index" label="序号" :index="indexMethod" align="center"></el-table-column>
                <el-table-column prop="domainName" label="服务器域名" align="center"></el-table-column>
                <el-table-column prop="createTime" label="添加时间" align="center">
                    <template slot-scope="scope">
                        {{  $fmtDate(scope.row.createTime,'full')}}
                    </template>
                </el-table-column>
                <el-table-column prop="updateTime" label="上次使用时间" align="center">
                    <template slot-scope="scope">
                        {{  $fmtDate(scope.row.lastStartTime,'full')}}
                    </template>
                </el-table-column>
                <el-table-column  label="状态" align="center">
                    <template slot-scope="scope">
                        <span :class="scope.row.status == 1?'status1':'status2'">{{ scope.row.status == 1?'已开启':'已关闭' }}</span>
                    </template>
                </el-table-column>
                
                <el-table-column  label="操作"  fixed="right" align="center" >
                    <template slot-scope="scope">
                        <el-button size="mini" @click="updateStatus(scope.row)" :type=" scope.row.status == 0?'primary':'warning'">{{ scope.row.status == 1?'关闭':'开启' }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total*1">
            </el-pagination>
        </div>       
    </div>
</template>

<script>
    export default {
        data() {
            return {
                defaultForm:{
                    bg:1,
                    verificationMode:1,
                    payType:1
                },
                modes:[{
                    label:'无验证',
                    value:1
                },{
                    label:'手机号验证',
                    value:2
                },{
                    label:'【付费】银行卡要素验证',
                    value:3
                }],
                payModes:[{
                    label:'需要标记',
                    value:1 
                },{
                    label:'不需要标记',
                    value:2 
                },{
                    label:'关联抢派单模式',
                    value:3
                }],
                otcPayLists: [],
                form: {
                    payType:'',
                    ckLimitNum:'',
                    ckSingleMax:'',
                    ckLimitMax:'',
                    isUseCheckout:'', 
                },
                areas: '',
                list:[],
                type:4,
                pageNum:1,
                pageSize:20,
                total:0
            }
        },
        activated() {
            this.getData()
            this.getEnableAreas()
            this.getList()
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

            // 获取收银台允许访问地址
            getEnableAreas() {
                this.$http.post("/wallet/backmgr/sys/getEnableAreas").then(res => {
                    this.destxt = res.result.destxt
                    this.areas = res.result.paramValue
                })
            },

            // 更新允许访问地址
            updateEnableAreas() {
                this.$http.post("/wallet/backmgr/sys/updateEnableAreas", {
                    areas: this.areas
                }).then(res => {
                    this.$notify({
                        title: '成功',
                        message: res.msg,
                        type: 'success'
                    })
                    this.getEnableAreas()
                })
            },
            getList(){
                this.list = []
                this.$http.post("/wallet/app/otc/backmgr/domain/list",{payType:this.type,pageNum:this.pageNum,pageSize:this.pageSize}).then(res => {
                    if(res.code == 200){
                        console.log(res)
                        this.list = res.result.list.list
                        this.total = res.result.list.total
                    }
                })
            },
            handleCurrentChange(val) {
                this.pageNum = val
                this.getList()
            },
            handleSizeChange(val) {
                this.pageSize = val
                this.getList()
            },
            checkedPayType(payType){
                
                if(this.type == payType){
                    return
                }else{
                    this.type = payType
                    this.pageNum = 1
                    this.getList()
                }
            },
            updateStatus(data){
                let num = 0
                this.list.forEach((e)=>{
                    if(e.status == 1){
                        num+=1
                    }
                })
                console.log(num==1&&data.status==1)
                if(num==1&&data.status==1){
                    this.$confirm(`当前只有一台服务器开启中，若关闭则无服务器开启，确定关闭？`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.update(data)
                    }).catch(()=>{

                    })
                }else{
                    this.update(data)
                }
            },
            update(data){
                this.$http.post("/wallet/app/otc/backmgr/domain/updateStatus",{status:data.status==1?0:1,id:data.id}).then(res => {
                    if(res.code == 200){
                        this.$notify({
                            title: "成功",
                            message: `修改成功`,
                            type: "success"
                        });
                        this.getList()
                    }
                })
            },
            indexMethod(index) {
                return   index+1
            },

            //改变默认皮肤
            changeBg(value) {
                console.log(value)
            },

            //改变默认验证方式
            changeMode(value) {
                console.log(value)
            },

            //改变是否已付款
            changePayType(value) {
                console.log(value)
            }
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
        
        .domainNameList-page{
            .status1{
                color: #409EFF;
            }
            .status2{
                color: #E6A23C;
            }
            .tabs{
                height: 40px;
                line-height: 40px;
                margin: 0;
                display: flex;
                flex-direction: row;
                // justify-content: space-between;
                align-items: center;
                background: #F5F7FA;
                border: 1px solid #E4E7ED;
                padding: 0;
                li{
                    list-style: none;
                    height: 100%;
                    padding: 0 10px;
                    border: 1px solid transparent;
                    cursor: pointer;
                    font-size: 14px;
                    &:hover{
                        color: #409EFF;
                    }
                    &.active{
                        color: #409EFF;
                        background: #fff;
                        border-right-color: #E4E7ED;
                        border-left-color: #E4E7ED;
                        border-top-color:#E4E7ED; 
                        cursor: no-drop;
                    }
                }
            }
            .el-pagination{
                margin: 0;
            }
            .el-table{
                margin: 0;
            }
        }
    }
    /deep/ .el-form-item {
        
    }
</style>