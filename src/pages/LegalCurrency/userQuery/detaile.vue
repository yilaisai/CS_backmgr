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

					
					<!--<el-form-item label="下单时间">
						<el-input :value=" $fmtDate(detaileData.createStamp,'full') " disabled></el-input>
					</el-form-item>
					<el-form-item label="maker昵称:">
						<el-input v-model="detaileData.makerName"  disabled></el-input>
					</el-form-item>
					 <el-form-item label="maker佣金" class="big">
						<el-input :value=" '一级佣金'+detaileData.makerCommission+detaileData.coinName+',二级级佣金'+detaileData.makerFirstCommission+detaileData.coinName+',三级级佣金'+detaileData.makerSecondaryCommission+detaileData.coinName  " disabled></el-input>
					</el-form-item> -->
				</el-form>
			</div>
			<div>
				<h3>邀请关系</h3>
				<el-table
					:data="tableData"
					style="width: 100%;margin-bottom: 20px;"
					row-key="id"
					border
					default-expand-all
					:tree-props="{children: 'children', hasChildren: 'hasChildren'}">
					<el-table-column
						prop="date"
						label="日期"
						sortable
						width="180">
					</el-table-column>
					<el-table-column
						prop="name"
						label="姓名"
						sortable
						width="180">
					</el-table-column>
					<el-table-column
						prop="address"
						label="地址">
					</el-table-column>
					<el-table-column label="操作" width="120">
						<template slot-scope="scope">   
							<el-button type="text" size="mini" >修改佣金</el-button>
								<el-button type="text" size="mini" >迁移</el-button>
						</template>
					</el-table-column>
				</el-table>
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
			filterForm:{
				coinName:'USDT',
				userId:'',
			},
			coinList:['USDT','BTC'],
			defaultProps: {},
			tableData: [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄',
					 children: [{
              id: 21,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 22,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
          }]
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [{
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
          }]
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
			detaileData:{
				list:[{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            },{
              label: '12345678901234567890'
            },{
              label: '三级 1-1-3'
            }]
          },{
            label: '二级 1-2',
            children: [{
              label: '三级 1-2-1'
            },{
              label: '三级 1-2-2'
            },{
              label: '三级 1-2-3'
            }]
          }]
        }],
			}
		}
	},
	activated(){
		this.filterForm.userId = this.$route.query.userId
		this.getData()
	},
	mounted(){
		
	},
	methods:{
		selectCoin(){
			console.log(1)
			this.getData()
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
}
</style>