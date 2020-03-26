<template>
	<div class="personalAssets-page">
		<el-header>
			<div class="nav">资产排名>查看个人详情<span v-if="customerInfo.length>0">-{{customerInfo[0].nickName}}</span></div>
			<!-- <el-button type="primary" @click="$router.go(-1)">返回</el-button> -->
		</el-header>
		<div class="main">
			<div class="title">
				<h3>个人资产</h3>
				<el-table stripe border   :data="customerInfo" v-show="customerInfo.length>0">
					<el-table-column prop="phone" label="手机号" align="center">
					</el-table-column>
					<el-table-column prop="nickName" label="昵称" align="center"></el-table-column>
					<el-table-column prop="totalToRmb"  label="资产总折合（CNY）" align="center"></el-table-column>
					<el-table-column prop="registTime"  label="注册时间" align="center">
						<template slot-scope="scope">
							{{  $fmtDate(scope.row.registTime,'full')}}
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="tableBox">
				<div>
					<h3>资产账户资产表</h3>
					<p>
						<span>资产总折合（CNY）</span>
						<span>{{walletSumAmount}}</span>
					</p>
					<el-table stripe border :data="walletList">
						<el-table-column prop="coinName" label="币种" align="center"></el-table-column>
						<el-table-column prop="amount" label="可用" align="center"></el-table-column>
						<el-table-column prop="frozenAmount"  label="冻结" align="center"></el-table-column>
						<el-table-column prop="registTime"  label="操作" align="center">
							<template slot-scope="scope">
								<el-button size="mini" @click="$router.push({path:'/LegalCurrency/billingRecord',query:{nickName:customerInfo[0].nickName,phone:customerInfo[0].phone,userId:userId,type:1,coinName:scope.row.coinName,list:walletList}})" >查看详情</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div>
					<h3>法币账户资产表</h3>
					<p>
						<span>资产总折合（CNY）</span>
						<span>{{otcSumTotalToRmb}}</span>
					</p>
					<el-table stripe border :data="otcList" >
						<el-table-column prop="coinName" label="币种" align="center"></el-table-column>
						<el-table-column prop="amount" label="可用" align="center"></el-table-column>
						<el-table-column prop="frozenAmount"  label="冻结" align="center"></el-table-column>
						<el-table-column prop="assetCertification"  label="资产证明" align="center"></el-table-column>
						<el-table-column prop="registTime"  label="操作" align="center">
							<template slot-scope="scope">
								<el-button size="mini" @click="$router.push({path:'/LegalCurrency/billingRecord',query:{nickName:customerInfo[0].nickName,phone:customerInfo[0].phone,userId:userId,type:2,coinName:scope.row.coinName,list:otcList}})" >查看详情</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
				
			</div>
		</div>

	</div>
</template>
<script>
export default {
	components:{

	},
	data(){
		return {
			customerInfo:[],
			otcList:[],
			walletList:[],
			otcSumTotalToRmb:'',
			walletSumAmount:'',
			userId:'',
		}
	},
	activated(){
		this.userId = this.$route.query.userId
		this.getData()
	},
	methods:{
		getData(recdId){
			this.$http.post('/wallet/app/otc/backmgr/getUserAssets',{
				userId:this.userId
			}).then(res=>{
				if(res.code==200){
					// this.detaileData = res.result;
					const { otcList,walletList } = res.result
					this.otcList = otcList
					this.walletList = walletList.filter(element => {
						return element.coinName != 'USD'
					});
					// this.walletList = walletList
					this.customerInfo= [{
						totalToRmb:res.result.totalToRmb,
						nickName:res.result.customerInfo.nickName,
						phone:res.result.customerInfo.phone,
						registTime:res.result.customerInfo.registTime
					}]
					this.otcSumTotalToRmb = res.result.otcSumTotalToRmb
					this.walletSumAmount = res.result.walletSumTotalToRmb
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
.personalAssets-page{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
		.main{
			flex: 1;
			overflow: hidden;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
			background: #fff;
			/deep/.el-header{width: 100%;}
		.title{
			h3{
				text-align: center;
			}
		}
		.tableBox{
			display: flex;
			flex-direction: row;
			width: 100%;
			margin-top: 50px;
			// justify-content: space-between;
			&>div{
				flex: 1;
				box-sizing: border-box;
				padding: 5px;
				h3{
					text-align: center;
					margin: 0;
					border: 1px solid #EBEEF5;
					line-height: 50px;
					border-bottom: none;
					font-size: 16px;
				}
				p{
					margin: 0;
					line-height: 50px;
					border: 1px solid #EBEEF5;
					border-bottom: none;
					display: flex;
					flex-direction: row;
					span{
						flex: 1;
						text-align: center;
						&:last-of-type{
							border-left: 1px solid #EBEEF5;
						}
					}
				}
				/deep/.el-table{
					margin-top: 0;
				}
			}
		}
		}
}
</style>