
<template>
    <div class="transaction-details">
        <el-container>
			<el-main>
				<el-form :inline="true"  ref="filterForm" :model="filterForm" size="mini" label-width="80px">
					<div class="form-group">
						<el-form-item label="订单号:">
							<el-input placeholder="请输入单号" v-model.trim="filterForm.recdId" class="input-with-select"></el-input>
						</el-form-item>
						<el-form-item label="账号:">
							<el-input placeholder="请输入用户账户或昵称" v-model.trim="filterForm.account" class="input-with-select"></el-input>
						</el-form-item>
						<el-form-item label="状态:">
							<el-select v-model="filterForm.tradeStatus" >
								<el-option v-for="(item, key) in statusList" :key="key" :value="item.label" :label="item.value"></el-option>
							</el-select>
						</el-form-item>
					</div>
					<div class="form-group">
						<el-form-item label="币种:">
							<el-select v-model="filterForm.coinName" >
								<el-option value="" label="全部"></el-option>
								<el-option v-for="(item, key) in coinInfo" :key="key" :value="item.coinName" :label="item.coinName"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="广告类型:">
							<el-select v-model="filterForm.trans" >
								<el-option v-for="(item, key) in transList" :key="key" :value="item.label" :label="item.value"></el-option>
							</el-select>
						</el-form-item>
					</div>
					<div class="form-group">
						<el-form-item class='dateItem' label="时间:">
							<el-date-picker
								v-model="selectedDate"
								type="daterange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期" @change='filterForm.dateType=""'>
							</el-date-picker>
						</el-form-item>
						<el-form-item class='dateItem'>
							<el-button type="primary" size="mini" @click.native="search">搜索</el-button>
							<el-button type="primary" size="mini" @click.native="showSumMap=true">统计查询报表</el-button>
						</el-form-item>
					</div>
				</el-form>
				<!-- 表格 -->
				<Table :listData="listData.list"></Table>
			</el-main>
			<el-footer>
				<sac-pagination v-show="listData.list.length>0"
					@handleChange="handleCurrentChange"
					:total="+listData.total"
					:page-size="filterForm.pageSize"
					:current-page="filterForm.pageNum">
				</sac-pagination>
			</el-footer>
		</el-container>
		<el-dialog class="SumMap" v-if="sumMap" :visible.sync="showSumMap">
			<div>
				<ul>
					<li>
						<p>待付款</p>
						<p>交易数：{{ sumMap.waitPayCount }}</p>
						<p>交易额：{{ sumMap.waitPayMount }}</p>
					</li>
					<li>
						<p>待放行</p>
						<p>交易数：{{ sumMap.payedCount }}</p>
						<p>交易额：{{sumMap.payedMount}}</p>
					</li>
					<li>
						<p>已完成</p>
						<p>交易数：{{sumMap.finishCount}}</p>
						<p>交易额：{{sumMap.finishMount}}</p>
					</li>
					<li>
						<p>申诉中</p>
						<p>交易数：{{sumMap.applealCount}}</p>
						<p>交易额：{{ sumMap.applealMount }}</p>
					</li>
				</ul>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import {mapState} from 'vuex'
import { dateFormat } from "@/common/util";
import Table from './components/table'
export default {
    name:'transaction-details',
    data(){
			return{
				showSumMap:false,
				selectedDate: [], //已选日期
				currentPage:1,
				filterForm:{
					pageNum:1,
					pageSize: 20,
					startDate:'',
					endDate:'',
					coinName:'',
					tradeStatus:'',
					trans:'',
					recdId: "",
					account: ""
				},
				tradeTypeList:[
					{value:'全部',label:""},
					{value:'C2C',label:"0"},
					{value:'派单',label:"1"},
					{value:'抢单',label:"2"}
				],
				statusList:[
					{value:'全部',label:""},
					{value:'未付款',label:"1"},
					{value:'已付款(待放行)',label:"2"},
					{value:'已完成',label:"3"},
					{value:'已取消',label:"4"},
					{value:'申述中',label:"5"},
				],
				transList:[
					{value:'所有',label:""},
					{value:'购买',label:"1"},
					{value:'出售',label:"0"},
				],
				dateList:[
					{value:'今天',label:"1"},
					{value:'一周',label:"2"},
					{value:'一个月',label:"3"},
					{value:'三个月',label:"4"},
				],
				listData: {
					total: null,
					list: [],
				},
				sumMap:{
					applealCount: 0,
					applealMount:0,
					finishCount: 0,
					finishMount: 0,
					payedCount: 0,
					payedMount: 0,
					waitPayCount: 0,
					waitPayMount: 0,
				}
			}
        
    },
    methods:{
        getList(){
			if(this.selectedDate.length==2){
				this.filterForm.startDate = this.selectedDate && this.$fmtDate(this.selectedDate[0].getTime())+' 00:00:00';
				this.filterForm.endDate = this.selectedDate && this.$fmtDate(this.selectedDate[1].getTime())+' 23:59:59';
			}	
			this.$http.post('/wallet/app/otc/backmgr/getTradeMainList',this.filterForm).then(res=>{
				const { list ,total} = res.result.pageInfo
				this.sumMap = res.result.sumMap
				this.listData.list = list;
				this.listData.total = total;
			})
		},
		setDateType(){
			//获取系统当前时间
			let nowdate = new Date();
			let y = nowdate.getFullYear();
			let m = nowdate.getMonth()+1;
			let d = nowdate.getDate();
			let formatnowdate = y+'-'+m+'-'+d;
			if(this.filterForm.dateType==1){
				this.selectedDate=[formatnowdate,formatnowdate]
				console.log(this.selectedDate)
			}else if(this.filterForm.dateType==2){
				let oneweekdate = new Date(nowdate-7*24*3600*1000);
				let y = oneweekdate.getFullYear();
				let m = oneweekdate.getMonth()+1;
				let d = oneweekdate.getDate();
				let formatwdate = y+'-'+m+'-'+d;
				this.selectedDate=[formatwdate,formatnowdate]
			}else if(this.filterForm.dateType==3){
				nowdate.setMonth(nowdate.getMonth()-1);
				let y = nowdate.getFullYear();
				let m = nowdate.getMonth()+1;
				let d = nowdate.getDate();
				let formatwdate = y+'-'+m+'-'+d;
				this.selectedDate=[formatwdate,formatnowdate]
			}else if(this.filterForm.dateType==4){
				nowdate.setMonth(nowdate.getMonth()-3);
				let y = nowdate.getFullYear();
				let m = nowdate.getMonth()+1;
				let d = nowdate.getDate();
				let formatwdate = y+'-'+m+'-'+d;
				this.selectedDate=[formatwdate,formatnowdate]
			}
		},
        search(){
            this.getList()
        },
        checkLog(){
            this.$router.push({
                path:'customer-log'
            })
        },
        checkDetails(){
            this.$router.push({
                path:'complaint-details'
            })
        },
        handleCurrentChange(val,currentPage) {
            this.filterForm.pageSize=val
            this.filterForm.pageNum=currentPage
            this.getList()
        },
        download(){
            location.href =`${ SERVER_PATH}/wallet/app/otc/backmgr/exportExcel?startDate=${this.filterForm.startDate}&endDate=${this.filterForm.endDate}&userId=${this.filterForm.userId}&token=${localStorage.getItem('cus_token')}`;
        }
	},
	computed: {
		...mapState(['coinInfo'])
	},
    activated(){
        // this.setDateType()
        this.getList()
	},
	components: {
		Table
	}
}
</script>

<style scoped lang="less">
.transaction-details{
     height:100%;
    .el-container{
        height:100%;
        .el-main{
			height:100%;
			width: 100%;
			display: flex;
			flex-direction: column;
        }
    } 
    .el-form--inline .el-form-item__label{
        width:80px !important;
    }
		.form-group{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			/deep/.el-form-item__label{
				font-size: 14px;
				color: #000;
				// font-weight: 500;
			}
			&>.radioBox{
				display: flex;
				flex-direction: row;
				align-items: center;
				height: 40px;
				margin-right: 15px;
				margin-bottom: 15px;
				&>label{
					font-size: 14px;
					color: #000;
					margin-right: 10px;
					// font-weight: 500;
				}
				/deep/ .el-radio{margin-right: 0;}
				/deep/.el-radio__input{
					display: none;
				}
			}
		}
   /deep/ .dateItem  .el-form-item__content{
        width: 352px;
		}
		/deep/.el-radio__label{
			color: #909399;
			padding:0 10px;
			// padding-left: 0;
		}
		/deep/.is-checked{
			background: #409EFF;
			border-radius: 5px;
			padding: 3px 10px;
			margin-right: 10px;
			.el-radio__label{
				color: #fff;
				padding: 0;
			}
			
		}
	.SumMap{
		
		/deep/.el-dialog{
			margin-top: 50px !important;
			width: 800px;
			ul{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				li{
					list-style: none;
					p{
						margin: 0;
						&:first-of-type{
							font-weight: 600;
						}
					}
				}
			}
		}
	}
}
  
</style>