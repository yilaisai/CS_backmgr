<template>
	<div class="personalAssets-page">
		<el-header>
			<div class="nav">资产排名>查看个人详情>查看{{ type==1?'资产':'法币' }}账户币种流水<span v-show="titleTable.length>0">-{{titleTable[0].nickName}}</span></div>
			<el-button type="primary" @click="$router.go(-1)">返回</el-button>
		</el-header>
		<div class="main">
			<div class="title">
				<h3>{{ type==1?'资产账户币种流水':'法币账户币种流水' }}</h3>
				切换币种：
				<el-select class="select" v-model="coinName" @change="selectChange">
					<el-option v-for="(item, key) in list" :key="key" :value="item.coinName" :label="item.coinName"></el-option>
				</el-select>
				<el-table stripe border   :data="titleTable" >
					
					<el-table-column prop="phone" label="手机号"></el-table-column>
					<el-table-column prop="nickName" label="昵称"></el-table-column>
					<el-table-column prop="amount"  :label="'可用('+coinName+')'"></el-table-column>
					<el-table-column prop="frozenAmount"  :label="'冻结('+coinName+')'"></el-table-column>
					<el-table-column prop="assetCertification"  :label="'资产证明余额('+coinName+')'"></el-table-column>
					
				</el-table>
			</div>
			<h3>流水明细</h3>
			<el-table stripe border   :data="listData.list"  >
				<el-table-column   width="160" align="center" prop="updateTime" label="时间">
					<template slot-scope="scope">
						{{  $fmtDate(scope.row.updateTime,'full')}}
					</template>
				</el-table-column>
				<el-table-column    align="center" prop="optType" label="类型">
					<div slot-scope="scope">
						{{optType(scope.row)}}
					</div>
				</el-table-column>
				<el-table-column   align="center" :label="'可用资金变化('+coinName+')'">
					<div slot-scope="scope">
						{{ type==1?(scope.row.balanceChangeAmount>0?'+'+scope.row.balanceChangeAmount:scope.row.balanceChangeAmount):(scope.row.balanceChange>0?'+'+scope.row.balanceChange:scope.row.balanceChange) }}
					</div>
				</el-table-column>
				<el-table-column   align="center" prop="balance"  :label="'可用余额('+coinName+')'"></el-table-column>
				<el-table-column   align="center" prop="frozenChangeAmount"  :label="'冻结资金变化('+coinName+')'">
					<div slot-scope="scope">
						{{ type==1?scope.row.frozenChangeAmount:scope.row.frozenAmountChange }}
					</div>
				</el-table-column>
				<el-table-column   align="center" prop="frozenAmount"  :label="'冻结('+coinName+')'"></el-table-column>
				<el-table-column   align="center" prop="assetCertificationChange"  :label="'资产证明变化('+coinName+')'">
					<template slot-scope="scope">
						<span >{{ scope.row.assetCertificationChange>0?'+':'' }}{{scope.row.assetCertificationChange}}</span>
					</template>
				</el-table-column>
				<el-table-column  align="center" prop="assetCertification"  :label="'资产证明余额('+coinName+')'"></el-table-column>
			
			</el-table>
			<sac-pagination v-show="listData.list.length>0"
										@handleChange="getPaginationChange"
										:total="+listData.total"
										:page-size="listData.pageSize"
										:current-page="listData.pageNum">
		</sac-pagination>
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
			otcSumTotalToUsdt:'',
			walletSumTotalToUsdt:'',
			userId:'',
			type:'',
			coinName:'',
			list:[],
			listData:{
				pageNum:1,
				pageSize:10,
				total:'',
				list:[]
			},
			titleTable:[{
				phoen:'',
				nickName:'',
				amount:'',
				frozenAmount:'',
				assetCertification:''
			}]
		}
	},
	activated(){
		this.userId = this.$route.query.userId
		this.type = this.$route.query.type
		this.list = this.$route.query.list
		this.coinName = this.$route.query.coinName
		this.titleTable[0].phone = this.$route.query.phone
		this.titleTable[0].nickName = this.$route.query.nickName
		this.getData()
	},
	methods:{
		selectChange(e){
			this.list.pageNum=1
			this.getData()
		},
		getData(recdId){
			let url = this.type==1?'/wallet/app/otc/backmgr/getUserWalletAssetsRecd':'/wallet/app/otc/backmgr/getUserOtcAssetsRecd'
			this.$http.post(url,{
				userId:this.userId,
				pageNum:this.listData.pageNum,
				pageSize:this.listData.pageSize,
				coinName:this.coinName
			}).then(res=>{
				if(res.code==200){
					// this.detaileData = res.result;
					this.listData.total  = res.result.coinChangeRecd.total 
					this.listData.list = res.result.coinChangeRecd.list
					this.titleTable[0].amount = res.result.userCoinAddr.amount
					this.titleTable[0].frozenAmount = res.result.userCoinAddr.frozenAmount
					this.titleTable[0].assetCertification = res.result.userCoinAddr.assetCertification
					console.log(this.titleTable)
				}
			})
		},
		optType(data){
			if(this.type == 2){
				switch(data.optType*1) {
					case 0:
						return '创建订单'
					break;
					case 3:
						return '申诉买方赢，直接放币'
					break;
					case 4:
						return '申诉卖方赢，出售广告回滚卖家'
					break;
					case 11:
						return '成为商户'
					break;
					case 12:
						return '卖家取消订单'
					break;
					case 13:
						return '取消商家认证'
					break;
					case 14:
						return '钱包转账到法币'
					break;
					case 15:
						return '取消订单'
					break;
					case 16:
						return '完成交易'
					break;
					case 17:
						return '手续费'
					break;
					case 18:
						return '申诉买方赢，购买广告回滚卖家的币'
					break;
					case 19:
						return '解冻金额'
					break;
					case 20:
						return '法币转账到钱包'
					break;
					case 21:
						return '一级折扣'
					break;
					case 22:
						return '二级折扣'
					break;
					case 23:
						return '三级折扣'
					break;
					case 24:
						return '鼓励金'
					break;
					case 25:
						return 'otc发起充币'
					break;
					case 26:
						return 'otc发起提币'
					break;
					case 27:
						return 'otc提币失败'
					break;
						case 28:
						return '激活订单'
					break;
					case 29:
						return '申诉修改金额'
						break;
					case 30:
						return '资产证明转入'
						break;
					case 31:
						return '资产证明转出'
						break;
					case 32:
						return '系统费率'
						break;
					case 33:
						return '佣金'
						break;
					case 34:
						return '批量代付创建'
						break;
					case 35:
						return '批量代付回退'
						break;
					case 36:
						return '批量代付金额'
						break;
					case 37:
						return '批量代付手续费'
						break;
					case 38:
						return '批量代付完成'
						break;
					case 39:
						return '交易员违规操作'
						break;
					case 40:
						return '交易员违规操作收入'
						break;
					default:
						return 'null'
				} 
			}else{
				switch(data.optType*1) {
					case 1:
						return '提币成功'
					break;
					case 3:
						return '提币失败'
					break;
					case 4:
						return '提币'
					break;
					case 5:
						return '充币'
					break;
					case 7:
						return '发红包冻结金额'
					break;
					case 8:
						return '红包过期，解冻金额'
					break;
					case 9:
						return '领取红包'
					break;
					case 10:
						return '被领取红包'
					break;
					case 11:
						return '转账到法币'
					break;
					case 12:
						return '转账到其他钱包账号'
					break;
					case 13:
						return '转账-来自其他钱包账号'
					break;
					case 14:
						return '平台收取手续费'
					break;
					case 15:
						return '法币转钱包'
					break;
					case 16:
						return '交易员违规操作'
					break;
					case 17:
						return '交易员违规操作收入'
					break;
					default:
							return data.optType
				} 
			}
		},
		getPaginationChange(val, currentPage) {
          this.listData.pageSize = val;
          this.listData.pageNum = currentPage;
          this.getData()
        },
	},
	watch:{

	},
	computed:{

	},
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
				height: 204px;
			}
			&>.el-table{
				flex: 1;
			}
		}
}
</style>