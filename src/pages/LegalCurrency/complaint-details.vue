/*
 * @Author: dubbing 
 * @Date: 2018-12-13 13:45:18 
 * @Last Modified by: dubbing
 * @Content: 投诉查看详情
 * @Last Modified time: 2018-12-16 10:10:12
 */
<template>
    <div class="complaint-details">
        <el-header>
            <!-- <el-button type="primary" @click="routerReturn">返回</el-button> -->
            <p>
            </p>
            <el-button type="primary" @click="judgment" v-if="appealStatus+'' == '0'">判决</el-button>
            <el-button type="primary" @click="$router.go(-1)" v-else>返回</el-button>
        </el-header>
        <div class="card-all-box clearfix">
            <div class="card-box" v-if="SaleList.length>0">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>商户信息</span>
                        <!-- <el-button style="float: right; padding: 3px 0" type="text" @click="routerMore(SaleList[0].userId)">查看更多</el-button> -->
                    </div>
                    <table border="1" cellpadding="0" cellspacing="0" bordercolor="#dee2e6" class="com-table">
                        <tr>
                            <td>订单号：{{SaleList[0].tradeId}}</td>
                            <td>用户id：{{SaleList[0].userId}}</td>
                            <td>账号：{{SaleList[0].phone}}</td>
                        </tr>
                        <tr>
                            <td>昵称：{{SaleList[0].nickName}}</td>
                            <td>交易类型：{{SaleList[0].advType | advTypeFilter}}</td>
                            <td>投诉时间：{{$fmtDate(SaleList[0].createTime,'full') }}</td>
                        </tr>
                        <tr>
                            <td>交易金额：{{SaleList[0].money}} <el-button v-if="appealStatus+'' == '0'" class="edit" type="text" @click="showEdit()">修改</el-button> </td>
                            <td>数量：{{SaleList[0].amount}}</td>
                            <td>价格：{{SaleList[0].price}}</td>
                        </tr>
                        <tr class="payList">
                            <td  v-show="SaleList[0].aPayList&&SaleList[0].aPayList.length>0 ">
                                <div>
                                    <p>支付宝：</p>
                                    <ul>
                                        <li v-for=" (item,index) in SaleList[0].aPayList " :key="index"> 账号 <span>{{index+1}}</span> ： {{  item.num }} <el-button  type="text" @click="payDetaile(item)">详情</el-button></li>
                                    </ul>
                                </div>
                            </td>
                            <td v-show="SaleList[0].wPayList&&SaleList[0].wPayList.length>0">
                                <div>
                                    <p>微信：</p>
                                    <ul>
                                        <li v-for=" (item,index) in SaleList[0].wPayList " :key="index"> 账号 <span >{{index+1}}</span> ： {{  item.num }}<el-button  type="text" @click="payDetaile(item)">详情</el-button></li>
                                    </ul>
                                </div>
                            </td>
                            <td v-show="SaleList[0].bankPayList&&SaleList[0].bankPayList.length>0">
                                <div>
                                    <p>银行：</p>
                                    <ul>
                                        <li v-for=" (item,index) in SaleList[0].bankPayList " :key="index"> 账号 <span >{{index+1}}</span> ： {{  item.num }}<el-button  type="text" @click="payDetaile(item)">详情</el-button></li>
                                    </ul>
                                </div>
                            </td>
                            <td v-show="SaleList[0].atobPayList&&SaleList[0].atobPayList.length>0">
                                <div>
                                    <p>宝转卡：</p>
                                    <ul>
                                        <li v-for=" (item,index) in SaleList[0].atobPayList " :key="index"> 账号 <span >{{index+1}}</span> ： {{  item.num }}<el-button  type="text" @click="payDetaile(item)">详情</el-button></li>
                                    </ul>
                                </div>
                            </td>
                            
                        </tr>
                    </table>
                </el-card>
            </div>
            <div class="card-box" v-if="BuyList.length>0">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>码商信息</span>
                        <!-- <el-button style="float: right; padding: 3px 0" type="text" @click="routerMore(BuyList[0].userId)">查看更多</el-button> -->
                    </div>
                    <table border="1" cellpadding="0" cellspacing="0" bordercolor="#dee2e6" class="com-table">
                        <tr>
                            <td>订单号：{{BuyList[0].tradeId}}</td>
                            <td>用户id：{{BuyList[0].userId}}</td>
                            <td>账号：{{BuyList[0].phone}}</td>
                        </tr>
                        <tr>
                            <td>昵称：{{BuyList[0].nickName}}</td>
                            <td>交易类型：{{BuyList[0].advType | advTypeFilter}}</td>
                            <td>投诉时间：{{$fmtDate(BuyList[0].createTime,'full') }}</td>
                        </tr>
                         <tr class="payList">
                            <td v-show="BuyList[0].aPayList&&BuyList[0].aPayList.length>0">
                                <div>
                                    <p>支付宝：</p>
                                    <ul>
                                        <li v-for=" (item,index) in BuyList[0].aPayList " :key="index"> 账号 <span >{{index+1}}</span> ： {{  item.num }} <el-button  type="text" @click="payDetaile(item)">详情</el-button></li>
                                    </ul>
                                </div>
                            </td>
                            <td v-show="BuyList[0].wPayList&&BuyList[0].wPayList.length>0">
                                <div>
                                    <p>微信：</p>
                                    <ul>
                                        <li v-for=" (item,index) in BuyList[0].wPayList " :key="index"> 账号 <span >{{index+1}}</span> ： {{  item.num }}<el-button  type="text" @click="payDetaile(item)">详情</el-button></li>
                                    </ul>
                                </div>
                            </td>
                            <td v-show="BuyList[0].bankPayList&&BuyList[0].bankPayList.length>0">
                                <div>
                                    <p>银行卡：</p>
                                    <ul>
                                        <li v-for=" (item,index) in BuyList[0].bankPayList " :key="index"> 账号 <span >{{index+1}}</span> ： {{  item.num }}<el-button  type="text" @click="payDetaile(item)">详情</el-button></li>
                                    </ul>
                                </div>
                            </td>
                            <td v-show="BuyList[0].atobPayList&&BuyList[0].atobPayList.length>0">
                                <div>
                                    <p>宝转卡：</p>
                                    <ul>
                                        <li v-for=" (item,index) in BuyList[0].atobPayList " :key="index"> 账号 <span >{{index+1}}</span> ： {{  item.num }}<el-button  type="text" @click="payDetaile(item)">详情</el-button></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </table>
                </el-card>
            </div>
            
        </div>
        <div class="card-all-box clearfix">
            <div class="card-box">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>买家申述证据</span>
                    </div>
                    <table border="1" cellpadding="0" cellspacing="0" bordercolor="#dee2e6" class="com-table">
                        <tr>
                            <th>投诉图片</th>
                            <th>投诉文字</th>
                            <th>投诉时间</th>
                        </tr>
                        <tr v-if="BuyProofInfo.appealRecdId">
                            <td style="width:40%">
                            <viewer :options="options">
                                <img :src="BuyProofInfo.proofImg" alt="" style="width:100%">
                            </viewer>
                            </td>
                            <td>{{BuyProofInfo.proofTxt}}</td>
                            <td>{{  $fmtDate(BuyProofInfo.createTime,'full') }}</td>
                        </tr>
                    </table>
                </el-card>
            </div>
            <div class="card-box">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>卖家申述证据</span>
                    </div>
                    <table border="1" cellpadding="0" cellspacing="0" bordercolor="#dee2e6" class="com-table">
                        <tr>
                            <th>投诉图片</th>
                            <th>投诉文字</th>
                            <th>投诉时间</th>
                        </tr>
                        <tr v-if="SaleProofInfo.appealRecdId">
                            <td style="width:40%">
                                <viewer :options="options">
                                    <img :src="SaleProofInfo.proofImg" alt="" style="width:100%">
                                </viewer>
                            </td>
                            <td>{{SaleProofInfo.proofTxt}}</td>
                            <td>{{ $fmtDate(SaleProofInfo.createTime,'full') }}</td>
                        </tr>
                    </table>
                </el-card>
            </div>
        </div>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="470">
            <el-form :inline="true" label-width="100px" ref="ruleForm"  :model="ruleForm" :rules="rules">
                <div>
                    <el-form-item label="判断输赢:" prop="appealResult" class="judgment-box">
                        <el-select v-model="ruleForm.appealResult">
                            <el-option :label="item.label" :value="item.value" v-for="(item,index) in appealResultData" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                 <div>
                    <el-form-item label="处理买方:" prop="buyerResult"  class="judgment-box">
                        <el-select v-model="ruleForm.buyerResult">
                            <el-option :label="item.label" :value="item.value" v-for="(item,index) in dealData" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="处理卖方:" prop="salerResult"  class="judgment-box">
                        <el-select v-model="ruleForm.salerResult">
                            <el-option :label="item.label" :value="item.value" v-for="(item,index) in dealData" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="备注" prop="appealRemark" class="judgment-box">
                        <el-input type="textarea" v-model="ruleForm.appealRemark" placeholder="请输入备注信息"></el-input>
                    </el-form-item>
                </div>
                <div v-if="ruleForm.appealResult == 2">
                    <el-form-item label="谷歌验证码" prop="secret"  class="judgment-box">
                        <el-input  v-model="ruleForm.secret" placeholder="请输入谷歌验证码"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogConfirm">确认</el-button>
            </span>
        </el-dialog>
		<el-dialog title="收款信息" :visible.sync="payDetaileShow" width="500px">
			<div>
			<p>收款姓名：{{payItem.userName}}</p>
			<p v-if="payItem.payType==1">银行名称：{{payItem.bankName}}</p>
			<p v-if="payItem.payType==1&&payItem.bankBranch">支行名称：{{payItem.bankBranch}}</p>
			<p> {{ payItem.payType==1?'银行卡号码：':'收款账号：' }} {{payItem.num}}</p>
			<p  v-if="payItem.payType!=1&&payItem.qrcode">收款码：<img style="width:384px;vertical-align: text-top;" :src="payItem.qrcode" alt=""></p>
			</div>
		</el-dialog>
		<el-dialog class="EditPrompt" title="确认修改金额？" :visible.sync="dialogVisible2" width="420px">
			<p>修改后，订单金额将发生变化，确认修改？</p>
			<el-form ref="form" label-width="55px" size="mini">
				<el-form-item label="金额：">
					<el-input v-model.trim="money" @input="moneyInput">
						<template slot="append">CNY</template>
					</el-input>
				</el-form-item>
			</el-form>
			<div class="btns">
				<el-button @click="dialogVisible2 = false" size="mini">取 消</el-button>
				<el-button type="primary" size="mini" @click="appealChangeMoney">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>
<script>
export default {
    name:'complaint-details',
    data(){
        return{
            appealStatus:'',
            money:'',
            dialogTitle:'结果裁定',
            dialogVisible:false,
            dialogVisible2:false,
            payDetaileShow:false,
            tradeId:'',
            appealId:'',
            BuyList:[],
            SaleList:[],
            BuyProofInfo: {},
            SaleProofInfo: {},
            ruleForm:{
                appealId:'',
                appealResult:1,    //判断输赢
                buyerResult:0,     //处理买方
                salerResult:0,     //处理卖方
                appealRemark:'',   //备注
                secret:'',     //谷歌验证码 
            },
            rules: {
                appealRemark: [
                    { required: true, message: '备注不能为空', trigger: 'blur' },
                ]
            },
            appealResultData:[
                {
                    label:'买方胜诉（卖家的币放行，直接打给买方）',
                    value:2
                },
                {
                    label:'卖方胜诉（卖家的币取消锁定）',
                    value:1
                }
            ],
            dealData:[
                {
                    label:'不惩罚',
                    value:0
                },
                {
                    label:'24之内不能交易',
                    value:1
                },
                {
                    label:'永远不能交易',
                    value:2
                }
            ],
            options: {
                inline: false,
                button: false,
                navbar: false,
                title: false,
                toolbar: false,
                tooltip: false,
                movable: true,
                zoomable: true,
                rotatable: true,
                scalable: false,
                transition: true,
                fullscreen: true,
                keyboard: true,
                url: 'data-source'
            },
            payItem:{}
        }
    },
    filters: {
        filterType(val) {
            switch(val){
                case 1:
                    return '对方未付款'
                case 2:
                    return '对方未放行'
                case 3:
                    return '对方无应答'
                case 4:
                    return '对方有欺诈行为'
                default:
                    return '其他'
            }
        }
    },
    methods:{
		getProofInfo() {
			this.$http.post('/wallet/app/otc/backmgr/proofInfo', {
				appealId: this.appealId
			}).then(res=>{
				
				res.result.forEach((val, idx) => {
					if(val.isBuyer == 1) {
						this.BuyProofInfo = val
					}else {
						this.SaleProofInfo = val
					}
				})
			})
        },
        showEdit(){
            this.dialogVisible2=true
            this.money = ''
        },
        moneyInput(){
			this.money = this.money + ""
			this.money = this.money.replace(/^\.$/g,"")  //清除第一个“.”   
			this.money = this.money.replace(/[^\d.]/g,"")  //清除“数字”和“.”以外的字符   
			this.money = this.money.replace(/\.{2,}/g,".") //只保留第一个. 清除多余的   
			this.money = this.money.replace(".","$#$").replace(/\./g,"").replace("$#$",".")  
			this.money = this.money.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3') //只能输入2个小数   
			if(this.money.indexOf(".") < 0 && this.money != ""){ //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
				this.money = parseFloat(this.money)
			}
		},
        appealChangeMoney(){
            if( !(this.money>0) ){
                this.$notify({
                    title: "提示",
                    message: `请输入金额`,
                    type: "error"
                });
                return
            }
            this.$http.post('/wallet/app/otc/backmgr/appealChangeMoney', {
                appealId: this.appealId,
                money:Number(this.money)
			}).then(res=>{
				if(res.code == 200){
                    this.getBuyList()
                    this.$notify({
                        title: "成功",
                        message: res.msg,
                        type: "success"
                    });
                    this.dialogVisible2 = false
                }
                
			})
        },
        getBuyList(){
            const postdata={
                appealId:this.appealId
            }
            this.$http.post('/wallet/app/otc/backmgr/infoBuyList',postdata).then(res=>{
                //console.log(res)
                this.appealStatus = res.result.appealStatus
                const {makerMap,takerMap} = res.result;
                this.BuyList = [makerMap];
                this.SaleList = [takerMap]
                // const postdata2={
                //     appealId:this.appealId,
                //     userId:res.result.list[0].userId
                // }
                // this.$http.post('/wallet/app/otc/backmgr/proofInfo',postdata2).then(res2=>{
                //     this.BuyProofInfo = res2;
                // })
            })
        },
        payDetaile(data){
            console.log(data)
            this.payItem = data
            this.payDetaileShow = true
        },
        
        getSaleList(){
            const postdata={
                appealId:this.appealId
            }
            this.$http.post('/wallet/app/otc/backmgr/infoSaleList',postdata).then(res=>{
                const { list} = res.result;
                this.SaleList = list;
                const postdata2={
                    appealId:this.appealId,
                    userId:res.result.list[0].userId
                }
                // this.$http.post('/wallet/app/otc/backmgr/proofInfo',postdata2).then(res2=>{
                    
                //     this.SaleProofInfo = res2;
                // })
            })
        },
        routerReturn(){
            this.$router.go(-1)
        },
        routerMore(userId){
            this.$router.push({
                name:'complaint-more',
                query:{
                    userId:userId
                }
            })
        },
        judgment(){
            this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
            this.dialogVisible=true
        },
        dialogConfirm(){
            this.ruleForm.appealId=this.appealId;
            if (this.ruleForm.appealResult == 2 &&  !this.ruleForm.secret) {
                this.$notify.error({
                    title: '提示',
                    message: '请输入谷歌验证码'
                })
                return
            }
            this.$http.post('/wallet/app/otc/backmgr/adjustAppeal',this.ruleForm).then(res2=>{
                this.$notify({
                    title: "成功",
                    message: `裁决成功`,
                    type: "success"
                });
                this.dialogVisible=false
                this.getBuyList()
            })
        }
    },
    activated(){
        this.BuyProofInfo={}
        this.SaleProofInfo= {}
        this.tradeId=this.$route.query.tradeId
        this.appealId=this.$route.query.appealId
		this.getProofInfo()
		this.getBuyList()
		// this.getSaleList()
    }
}
</script>
<style lang="less">
.complaint-details{
	overflow-y: auto;
    .card-all-box{
		margin: 15px 0;
        .box-card{
            width: 700px;
            float:left;
            margin:0 1%;
            .three-width{
                width:33.3%
            }
            .com-table{
                width:100%;
                tr{
                    th{
                        
                        color:#000;
                        font-size:13px;
                        padding:8px 5px;
                        line-height:25px;
                    }
                    td{
                        font-weight: normal;
                        color:#000;
                        font-size:13px;
                        padding:8px 5px;
                        line-height:25px;
                        text-align: center;
                    }
                    &.payList{
                        td{
                            div{
                                p{
                                    text-align: left;
                                }
                                ul{
                                    list-style: none;
                                    flex: 1;
                                    margin: 0;
                                    padding: 0;
                                    li{
                                        text-align: left;
                                    }
                                }
                            }

                            
                        }
                        
                    }
                }
            }
        }
    }
    
    .clearfix:before,.clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .judgment-box{
        width:100%;
        .el-form-item__content{
            min-width:310px !important;
            
            .el-select{
                width:100%
            }
            .el-textarea textarea{
                min-height:100px !important;
            }
        }
    }
    .edit{
        padding: 3px 5px;
    }
    .EditPrompt{
        /deep/.el-dialog__body{
            padding-top: 0;
        }
        .btns{
            text-align: right;
        }
    }
}
</style>


 
