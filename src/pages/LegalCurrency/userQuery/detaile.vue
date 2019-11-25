<template>
	<div class="userQueryDetaile-page">
		<!-- <el-header>
			<el-button type="primary" @click="$router.go(-1)">返回</el-button>
		</el-header> -->
		<!-- <el-main></el-main> -->
		<div class="main">
			<div>
				<div class="title">
					<h3>用户信息</h3>
					<div class="select-wrap">
						<label>币种：</label>
						<el-select v-model="filterForm.coinName" @change="selectCoin" placeholder="请选择币种" >
							<el-option v-for="(item,index) in coinInfo" :key = 'index' :label="item.coinName" :value="item.coinName"></el-option>
						</el-select>
					</div>
				</div>
				<el-form :inline="true" :model="detaileData" class="demo-form-inline">
					<el-form-item label="账号:">
						<el-input v-model="detaileData.account"  disabled></el-input>
					</el-form-item>
					<el-form-item label="昵称:">
						<el-input v-model="detaileData.nickName"  disabled></el-input>
					</el-form-item>
					<el-form-item label="广告商类型:">
						<el-input :value=" detaileData.userLevel==0?'普通用户':detaileData.userLevel==1?'普通广告商':detaileData.userLevel==2?'高级广告商':detaileData.userLevel==3?'企业广告商':''" disabled></el-input>
					</el-form-item>
					<el-form-item label="企业类型:">
						<el-input :value=" detaileData.userEnterprise==0?'非企业号':detaileData.userEnterprise==1?'企业号':''" disabled></el-input>
					</el-form-item>
					<el-form-item label="购买交易额:">
						<el-input :value=" detaileData.buyAmount + filterForm.coinName" disabled></el-input>
					</el-form-item>
					<el-form-item label="购买成交数:">
						<el-input :value=" detaileData.buyNum" disabled></el-input>
					</el-form-item>
					<el-form-item label="出售交易额:">
						<el-input :value=" detaileData.saleAmount + filterForm.coinName" disabled></el-input>
					</el-form-item>
					<el-form-item label="出售成交数:">
						<el-input :value=" detaileData.saleNum" disabled></el-input>
					</el-form-item>
					<div v-if="detaileData.userLevel!=0">
						<el-form-item label="申请商家时间:">
							<el-input :value=" $fmtDate(detaileData.certificationTimeStamp,'full') " disabled></el-input>
						</el-form-item>
						<el-form-item label="保证金:">
							<el-input :value=" detaileData.frozen+ filterForm.coinName" disabled></el-input>
						</el-form-item>
						<el-form-item label="放币时效:">
							<el-input :value=" detaileData.paymentAveTime+'s'" disabled></el-input>
						</el-form-item>
						<el-form-item label="成交率:">
							<el-input :value=" Math.floor(detaileData.succRate*10000)/100 + '%'" disabled></el-input>
						</el-form-item>
						<el-form-item label="确认时效:">
							<el-input :value=" detaileData.letgoAveTime+'s'" disabled></el-input>
						</el-form-item>
						<el-form-item label="广告商状态:">
							<el-input :value=" detaileData.sysStatus==0?'失效':'有效'" disabled></el-input>
						</el-form-item>
					</div>
				</el-form>
			</div>
			<div>
				<h3>抢派单参数</h3>
				<el-form :inline="true" label-width="200px" :model="MatchConfig" class="panicBuying">
					<el-form-item :label="'派单兑入开关(' + filterForm.coinName + ')：'">
						<el-switch
							v-model="sysMatchSwitch"
							@change='onSysMatchSwitch'>
						</el-switch>
					</el-form-item>
					<el-form-item :label="'派单兑出开关(' + filterForm.coinName + ')：'">
						<el-switch
							v-model="sysCashoutSwitch"
							@change='onSysCashoutSwitch'>
						</el-switch>
					</el-form-item>
					<br>
					<el-form-item :label="'抢单兑入开关(' + filterForm.coinName + ')：'">
						<el-switch
							v-model="sysRushMatchSwitch"
							@change='onSysRushMatchSwitch'>
						</el-switch>
					</el-form-item>
					<el-form-item :label="'抢单兑出开关(' + filterForm.coinName + ')：'">
						<el-switch
							v-model="sysRushCashoutSwitch"
							@change='onSysRushCashoutSwitch'>
						</el-switch>
					</el-form-item>
					<br>
					<el-form-item  :label="'派单兑入最小额度(' + filterForm.coinName + ')：'">
						<el-input v-model=" MatchConfig.matchMin" disabled ></el-input>
					</el-form-item>
					<el-form-item :label="'派单兑入最大额度(' + filterForm.coinName + ')：'" >
						<el-input v-model=" MatchConfig.matchMax" disabled></el-input>
					</el-form-item>
					<br>
						<el-form-item :label="'派单兑出最小额度(' + filterForm.coinName + ')：'">
						<el-input v-model=" MatchConfig.cashoutMin" disabled></el-input>
					</el-form-item>
					<el-form-item :label="'派单兑出最大额度(' + filterForm.coinName + ')：'">
						<el-input v-model=" MatchConfig.cashoutMax" disabled></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div>
				<h3>邀请关系</h3>
				<el-table
					:data="inviteList"
					style="width: 100%;margin-bottom: 20px;"
					row-key="inviteeId"
					border
					default-expand-all
					:tree-props="{children: 'children', hasChildren: 'hasChildren'}">
					<el-table-column
						prop="inviteeName"
						label="账号">
					</el-table-column>
					
					<el-table-column align="center"
						prop="reward"
						label="买入佣金费率">
						<div slot-scope="scope">
							<ul class="rate">
								<li>
									<p>银行卡</p>
									<p>{{ Math.floor(scope.row.cardBuyRate*10000)/100 }}% </p>
								</li>
								<li>
									<p>支付宝</p>
									<p>{{ Math.floor(scope.row.abuyRate*10000)/100 }}% </p>
								</li>
								<li>
									<p>微信</p>
									<p>{{ Math.floor(scope.row.wxBuyRate*10000)/100 }}% </p>
								</li>
								<!-- <li>
									<p>宝转卡</p>
									<p>{{ Math.floor(scope.row.bbuyRate*10000)/100 }}% </p>
								</li> -->
							</ul>
							
						</div>
					</el-table-column>
					<el-table-column align="center"
						prop="reward"
						label="卖出佣金费率">
						<div slot-scope="scope">
							<ul class="rate">
								<li>
									<p>银行卡</p>
									<p>{{ Math.floor(scope.row.cardSaleRate*10000)/100 }}% </p>
								</li>
								<li>
									<p>支付宝</p>
									<p>{{ Math.floor(scope.row.asaleRate*10000)/100 }}% </p>
								</li>
								<li>
									<p>微信</p>
									<p>{{ Math.floor(scope.row.wxSaleRate*10000)/100 }}% </p>
								</li>
								<!-- <li>
									<p>宝转卡</p>
									<p>{{ Math.floor(scope.row.bsaleRate*10000)/100 }}% </p>
								</li> -->
							</ul>
						</div>
					</el-table-column>
					<el-table-column label="操作" width="120">
						<template slot-scope="scope"  >   
							<el-button  type="text" size="mini" @click="EditRate(scope.row) ">修改佣金</el-button>
								<el-button type="text" size="mini" @click="brokerage(scope.row)  ">迁移</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<el-dialog title="修改佣金" :visible.sync="showDialog">
			<div class=" inputGroup ">
				<span>支付通道:</span>
				<el-select v-model="payType"  placeholder="请选择"  @change="setRate">
					<el-option label="银行卡" :value="1"></el-option>
					<el-option label="支付宝" :value="2"></el-option>
					<el-option label="微信" :value="3"></el-option>
					<!-- <el-option label="宝转卡" :value="4"></el-option> -->
				</el-select>
			</div>
			<div class=" inputGroup ">
				<span>买入佣金费率：</span>
				<el-input placeholder="请输入内容" v-model="buyRate" >
					<template slot="append">%</template>
				</el-input>
			</div>
			
			<div class=" inputGroup ">
				<span>卖出佣金费率：</span>
				<el-input placeholder="请输入内容" v-model="rate" >
					<template slot="append">%</template>
				</el-input>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="showDialog = false">取 消</el-button>
				<el-button type="primary" @click="updateRewardRate()">确认修改</el-button>
			</div>
		</el-dialog>
		<el-dialog title="迁移关系" :visible.sync="showDialog2" width="650px" class="brokerageTable">
			<div class=" inputGroup ">
				<span>账号/昵称：</span>
				<el-input placeholder="请输入账号/昵称" v-model="account" ></el-input>
			<el-button type="primary" @click="saerch">搜索</el-button>
			</div>
			<el-table size="mini" :data="listData.list" border height="500px" >
					<el-table-column prop="account" label="账号" ></el-table-column>
					<el-table-column prop="nickName" label="昵称" ></el-table-column>
					<el-table-column prop="account" label="操作" fixed="right">
						<template slot-scope="scope">
							<el-button type="text" @click.native=" updateInviteShip(scope.row.userId) ">迁移至该账号下</el-button>
						</template>
					</el-table-column>
			</el-table>
			<div slot="footer" class="dialog-footer">
				 <sac-pagination v-show="listData.list.length>0"
						@handleChange="handleCurrentChange"
						:total="+listData.total"
						:page-size="listData.pageSize"
						:current-page="listData.pageNum">
				</sac-pagination>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import {mapState} from 'vuex'
export default {
	data(){
		return {
			//editBrokerage
			payType:1,
			account:'',
			rate:'',
			buyRate:'',
			showDialog:false,
			showDialog2:false,
			filterForm:{
				coinName:'RMT',
				userId:'',
			},
			sysRushMatchSwitch:false,
			sysRushCashoutSwitch:false,
			sysMatchSwitch:false,
			sysCashoutSwitch:false,
			listData:{
				pageSize:10,
				pageNum:1,
				total:'',
				list:[]
			},
			defaultProps: {},
			currItem:{},
			inviteList:[],
			detaileData:{
			},
			MatchConfig:{}
		}
	},
	activated(){
		this.filterForm.userId = this.$route.query.userId
		this.getData()
		this.queryUserMatchConfig()
		this.findInviteTree()
	},
	methods:{
		setRate(e){
			console.log(e)
			if(e == 1){
				this.buyRate = this.currItem.cardBuyRate * 100
				this.rate =  this.currItem.cardSaleRate * 100
			}else if(e == 2){
				this.buyRate = this.currItem.abuyRate * 100
				this.rate =  this.currItem.asaleRate * 100
			}else if(e == 3){
				this.buyRate = this.currItem.wxBuyRate * 100
				this.rate =  this.currItem.wxSaleRate * 100
			}else if(e == 4){
				this.buyRate = this.currItem.bbuyRate * 100
				this.rate =  this.currItem.bsaleRate * 100
			}
		},
		selectCoin(){
			this.getData()
		},
		handleCurrentChange(val,currentPage) {
			this.listData.pageSize=val
			this.listData.pageNum=currentPage
			this.getList()
		},
		saerch(){
			this.listData.pageNum=1
			this.getList()
		},
		findInviteTree(){
			this.inviteList = []
			this.$http.post('/wallet/invite/backmgr/findInviteTree',{
				inviteeId:this.filterForm.userId
			}).then(res=>{
				if(res.code == 200 && res.result){
					this.inviteList = [res.result]
				}
			})
		},
		EditRate(data){
			this.currItem = data
			this.payType = 1
			this.buyRate = this.currItem.cardBuyRate * 100
			this.rate =  this.currItem.cardSaleRate * 100
			this.showDialog=true
		} ,
		brokerage(data){
			this.currItem = data
			this.account = ''
			this.showDialog2=true
			this.listData.pageNum = 1
			this.getList()
		} ,
		updateInviteShip(inviterId){
			this.$confirm('确定要执行迁移操作吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$http.post('/wallet/invite/backmgr/updateInviteShip',{
					inviterId:inviterId,
					inviteeId:this.currItem.inviteeId
				}).then(res=>{
					if(res.code==200){
						this.showDialog2 = false
						this.findInviteTree()
						this.$message.success('迁移成功')
					}
				})
			}).catch(() => {})
		},
		updateRewardRate(){
			this.$http.post('/wallet/invite/backmgr/updateRewardRate',{
				buyRate: Math.floor(this.buyRate*10)/1000,
				rate: Math.floor(this.rate*10)/1000,
				inviteeId:this.currItem.inviteeId,
				payType:this.payType
			}).then(res=>{
				if(res.code==200){
					this.$message({
						type: 'success',
						message: res.msg
					})
					this.showDialog = false
					this.findInviteTree()
				}
			})
		},
		getList(){
			this.$http.post('/wallet/invite/backmgr/queryInviteShip',{
				account:this.account,
				inviteeId:this.currItem.inviteeId,
				pageNum:this.listData.pageNum,
				pageSize:this.listData.pageSize
			}).then(res=>{
				if(res.code==200){
					this.listData.list = res.result.list
					if(this.listData.list.length<1){
						this.$message.error('不允许迁移至自己的下级或该账号不存在')
					}
					this.listData.total = res.result.total
					// this.findInviteTree()
				}
			})
		},
		getData() {
			this.$http.post('/wallet/app/otc/backmgr/queryOtcUserDetail',this.filterForm).then(res=>{
				if(res.code==200){
					this.detaileData = res.result;

				}
			})
		},
		queryUserMatchConfig(){
			this.$http.post('/wallet/app/otc/backmgr/queryUserMatchConfig',this.filterForm).then(res=>{
				if(res.code==200){
					this.MatchConfig = res.result;
					this.sysRushMatchSwitch = res.result.sysRushMatchSwitch==1?true:false
					this.sysRushCashoutSwitch = res.result.sysRushCashoutSwitch==1?true:false
					this.sysMatchSwitch = res.result.sysMatchSwitch==1?true:false
					this.sysCashoutSwitch = res.result.sysCashoutSwitch==1?true:false
				}
			})
		},
		onSysCashoutSwitch(val){
			this.updateSysSwitch('sysCashoutSwitch',val?'1':'0')
		},
		onSysRushMatchSwitch(val){
			this.updateSysSwitch('sysRushMatchSwitch',val?'1':'0')
		},
		onSysRushCashoutSwitch(val){
			this.updateSysSwitch('sysRushCashoutSwitch',val?'1':'0')
		},
		onSysMatchSwitch(val){
			this.updateSysSwitch('sysMatchSwitch',val?'1':'0')
		},
		updateSysSwitch(key,val){
			let queruData={
				coinName: this.filterForm.coinName,
				userId:this.filterForm.userId
			}
			queruData[key]=val
			this.$http.post('/wallet/app/otc/backmgr/updateSysSwitch',queruData).then(res=>{
				if( res.code == 200 ){
					this.$message.success(res.msg)
				}else{
					this.$message.error(res.msg)
				}
				this.queryUserMatchConfig()
			})
		}
	},
	computed:{
		...mapState(['coinInfo'])
	},
}
</script>
<style lang="less" scoped>
.userQueryDetaile-page{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	.el-header{
		width: 100%;
	}
	.main{
		flex: 1;
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		background: #F6F9FC;
		padding: 10px;
		&>div{
			padding: 10px;
			background: #fff;
			padding-top: 1px;
			margin-bottom: 10px;
			&>.title{
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 15px;
				/deep/.el-form-item{margin: 0}
			}
			/deep/.el-form-item{
				
				width: 300px;
				.el-input__inner{
					// border: none;
				}
				.el-input.is-disabled .el-input__inner{
					cursor: default;
					color: #606266;
				}
				&.big{
					width: 620px;
					.el-input__inner{
						width: 520px;
					}
				}
				.el-form-item__label{
					width: 100px;
				}
				
			}
			.panicBuying{
				/deep/.el-form-item{
					width: 420px;
				}
			}
		}
		/deep/.el-tree{
			min-width: 840px;
		}
		.rate{
				list-style: none;
				display: flex;
				flex-direction: row;
				// justify-content: space-between;
				margin: 0;
				padding: 0;
				li{
					width: 25%;
					p{
						margin: 0;
						padding: 0;
						font-size: 12px;
						line-height: 14px;
						&:last-of-type{
							font-size: 14px;
							line-height: 18px;
							color: #409EFF;
						}
					}
				}
			}
		.custom-tree-node{
			display: flex;
			flex-direction: row;
			align-items: center;
			width: 100%;
			.label{
				flex: 1;
				
				span{
					overflow: hidden;
					text-overflow :  ellipsis 
				}
			}
			.content{
				width: 600px;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				.itemText{
				}
				.btns{
					width: 180px;
				}
			}
		}
		
	}
	.brokerageTable{
		/deep/.el-dialog__body{
			padding-right: 0;
			padding-bottom: 0;
		}
	}
	 .inputGroup{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20px;
			&:last-of-type{
				margin-bottom: 0px;
			}
			/deep/.el-select{
				// margin-right: 20px;
				width: 100%;
			}
			&>span{
				width: 140px;
			}
		}
		
}
</style>