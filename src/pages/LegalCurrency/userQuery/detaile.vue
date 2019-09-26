<template>
	<div class="userQueryDetaile-page">
		<el-header>
			<el-button type="primary" @click="$router.go(-1)">返回</el-button>
		</el-header>
		<!-- <el-main></el-main> -->
		<div class="main">
			<div>
				<div class="title">
					<h3>用户信息</h3>
					<el-form :model="filterForm">
						<el-form-item label="币种" >
							<el-select v-model="filterForm.coinName" @change="selectCoin" placeholder="请选择币种" >
								<el-option v-for="(item,index) in coinList" :key = 'index' :label="item" :value="item"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
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
						<el-input :value=" detaileData.userRole==0?'非企业号':detaileData.userRole==1?'企业号':''" disabled></el-input>
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
						label="昵称">
					</el-table-column>
					<el-table-column
						prop="reward"
						label="佣金">
						<div slot-scope="scope">
							{{ Math.floor(scope.row.reward*100)/100 }}%
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
				<span>佣金费率：</span>
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
export default {
	components:{

	},
	data(){
		return {
			//editBrokerage
			account:'',
			rate:'',
			showDialog:false,
			showDialog2:false,
			filterForm:{
				coinName:'USDT',
				userId:'',
			},
			listData:{
				pageSize:10,
				pageNum:1,
				total:'',
				list:[]
			},
			coinList:['USDT','BTC'],
			defaultProps: {},
			currItem:{},
			inviteList:[],
			detaileData:{
			}
		}
	},
	activated(){
		this.filterForm.userId = this.$route.query.userId
		this.getData()
		this.findInviteTree()
	},
	mounted(){
		
	},
	methods:{
		selectCoin(){
			console.log(1)
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
			this.$http.post('/wallet/invite/backmgr/findInviteTree',{
				// inviteeId:this.filterForm.userId
				inviteeId:32
			}).then(res=>{
				if(res.code==200){
					this.inviteList = [res.result]
				}
			})
		},
		EditRate(data){
			this.currItem = data
			this.showDialog=true
		} ,
		brokerage(data){
			this.currItem = data
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
				rate:this.rate,
				inviteeId:this.currItem.inviteeId
			}).then(res=>{
				if(res.code==200){
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
					this.listData.total = res.result.total
					// this.findInviteTree()
				}
			})
		},
		getData(){
			this.$http.post('/wallet/app/otc/backmgr/queryOtcUserDetail',this.filterForm).then(res=>{
				if(res.code==200){
					this.detaileData = res.result;

				}
			})
		},
	},
	watch:{

	},
	computed:{

	}
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
		}
		/deep/.el-tree{
			min-width: 840px;
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
			/deep/.el-input{
				margin-right: 20px;
			}
			&>span{
				width: 110px;
			}
		}
}
</style>