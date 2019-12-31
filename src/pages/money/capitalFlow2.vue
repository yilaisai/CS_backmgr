<template>
	<div class="capitalFlow-page">
			<el-form :inline="true"  ref="filterForm" label-width="85px" :model="filterForm" size="mini">
				<el-form-item label="昵称:">
					<el-input placeholder="请输入昵称" v-model="filterForm.nickName" class="input-with-select"></el-input>
				</el-form-item>
				<el-form-item label="账号:">
					<el-input placeholder="请输入用户账号" v-model="filterForm.name" class="input-with-select"></el-input>
				</el-form-item>
				<el-form-item label="币种:">
					<el-select v-model="filterForm.coinName">
						<el-option value="" label="全部"></el-option>
						<el-option v-for="(item, key) in coinInfo" :key="key" :value="item.coinName" :label="item.coinName"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item class='dateItem' label="时间:">
					<el-date-picker
						v-model="selectedDate"
						type="datetimerange"
						value-format="yyyy-MM-dd HH:mm:ss"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						@change='filterForm.dateType=""'
						>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="用户类型：">
					<el-select v-model="filterForm.userType" placeholder="选择订单状态" clearable>
						<el-option :value="null" label="全部"></el-option>
						<el-option v-for="(item, key) in userTypes" :key="key" :value="key" :label="item"></el-option>
					</el-select>
				</el-form-item>
				<el-button type="primary" @click.native="search" size="mini">搜索</el-button>
				<el-button type="primary" size="mini" @click="exportExcel">导出EXCEL</el-button>
			</el-form>
			<el-table :data="listData.list" border height="100%" size="mini">
				<el-table-column  label="时间" width="140" align="center">
					<template slot-scope="scope">{{ scope.row.createTime }}</template>
				</el-table-column>
				<el-table-column prop="coinName" label="币种" align="center" ></el-table-column>
				<el-table-column prop="phone" label="账号" align="center" ></el-table-column>
				<el-table-column prop="nickName" label="昵称" align="center" ></el-table-column>
				<el-table-column label="用户类型" align="center">
					<template slot-scope="scope">{{scope.row.userType | userTypesFilter}}</template>
				</el-table-column>
				<el-table-column prop="remark" label="类型" align="center" ></el-table-column>
				<el-table-column prop="balanceChangeAmount" label="可用资金变化" width="120" align="center"></el-table-column>
				<el-table-column prop="balance" label="可用资金余额" width="120" align="center"></el-table-column>
				<el-table-column label="冻结资金变化" prop="frozenChangeAmount" width="120" align="center"></el-table-column>
				<el-table-column label="冻结资金余额" prop="frozenAmount" width="120" align="center"></el-table-column>
			</el-table>
			<div class="footer">
				<div class="total">
					<p v-for="(item,index) in totalData" :key="index"> <span>{{item.coin_name}}</span> :可用资金变化{{item.sum_balance_change_amount}} 冻结资金变化{{ item.sum_frozen_change_amount }}</p>
				</div>
				<sac-pagination v-show="listData.list.length>0"
					@handleChange="handleCurrentChange"
					:total="+listData.total"
					:page-size="filterForm.pageSize"
					:current-page="filterForm.pageNum">
				</sac-pagination>
			</div>
	</div>
</template>
<script>
import {mapState} from 'vuex'
import {userTypes} from '@/common/constants'
export default {
	data(){
		return {
			selectedDate:[],
			filterForm:{
				pageNum:1,
				pageSize: 20,
				startDate:'',
				endDate:'',
				coinName:'',
				name:'',
				nickName:'',
				userType: null
			},
			listData: {
				total: null,
				list: [],
			},
			totalData:{},
			userTypes
		}
	},
	mounted(){
		this.getList()
	},
	methods:{
		search(){
			this.filterForm.pageNum = 1
			this.getList()
		},
		handleCurrentChange(val,currentPage) {
			this.filterForm.pageSize=val
			this.filterForm.pageNum=currentPage
			this.getList()
		},
		exportExcel(){
			if(this.selectedDate && this.selectedDate.length == 2 ){
				this.filterForm.startDate = this.selectedDate[0]
				this.filterForm.endDate = this.selectedDate[1]
			}else {
				this.filterForm.startDate = ""
				this.filterForm.endDate = ""
			}
			let param = '';
			for(let v in this.filterForm) {
				if(this.filterForm[v]&&v!=='pageNum'&&v!=='pageSize'){
					param += v + '=' + this.filterForm[v] + '&';
				}
			}
			let baseURL = localStorage.getItem('SERVER_PATH') || SERVER_PATH
			window.open(baseURL+'/wallet/backmgr/trade/queryAmountFlowPage/export?'+param+'token='+localStorage.getItem('wallet_token'))
		},
		getList(){
			if(this.selectedDate && this.selectedDate.length == 2 ){
				this.filterForm.startDate = this.selectedDate[0]
				this.filterForm.endDate = this.selectedDate[1]
			}else {
				this.filterForm.startDate = ""
				this.filterForm.endDate = ""
			}
			this.$http.post('/wallet/backmgr/trade/queryAmountFlowPage',this.filterForm).then(res=>{
				this.totalData = res.result.list
				const { list ,total} = res.result.pageInfo;
				this.listData.list = list;
				this.listData.total = total;
			})
		},
	},
	computed:{
		...mapState(['coinInfo'])
	}
}
</script>
<style lang="less" scoped>
.capitalFlow-page{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	.dateItem{
		/deep/.el-form-item__content {
			width: 405px;
			.el-date-editor {
				width: 100%;
			}
		}
	}
	.btn{
		height: 39px;
	}
	.footer{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		.total{
			p{
				display: inline;
				margin-right: 20px;
				line-height: 24px;
				font-size: 14px;
				color: #606266;
				&:last-of-type{
					margin: 0;
				}
				span{
					font-weight: 600;
					color: #409EFF;
				}
			}
			
		}
	}
	/deep/.el-form-item__content {
		width: 150px;
	}
}
</style>