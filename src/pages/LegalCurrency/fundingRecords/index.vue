<template>
	<div class="capitalFlow-page">
		<el-form :inline="true"  ref="filterForm" label-width="85px" :model="filterForm" size="mini">
			<el-form-item label="用户编号:">
				<el-input placeholder="请输入用户编号" v-model="filterForm.nickName" class="input-with-select"></el-input>
			</el-form-item>
			<el-form-item label="账号:">
				<el-input placeholder="请输入用户账号" v-model="filterForm.phone" class="input-with-select"></el-input>
			</el-form-item>
			<el-form-item label="币种:">
				<el-select v-model="filterForm.coinName" >
					<el-option value="" label="全部"></el-option>
					<el-option v-for="(item, key) in coinInfo" :key="key" :value="item.coinName" :label="item.coinName"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="用户类型：">
				<el-select v-model="filterForm.userType" placeholder="选择订单状态" clearable>
					<el-option :value="null" label="全部"></el-option>
					<el-option v-for="(item, key) in userTypes" :key="key" :value="key" :label="item"></el-option>
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
					@change='filterForm.dateType=""'>
				</el-date-picker>
			</el-form-item>
			<el-form-item><el-button type="primary" @click.native="search">搜索</el-button><el-button type="primary"  @click="exportExcel">导出EXCEL</el-button></el-form-item>
		</el-form>
		<el-table :data="listData.list" border height="100%" size="mini">
			<el-table-column  label="时间" width="140"  align="center">
				<div class="scope" slot-scope="scope">
					<p>{{ $fmtDate(scope.row.createTime,'full') }}</p>
				</div>
			</el-table-column>
			<el-table-column prop="coinName" label="币种" align="center" width="60"></el-table-column>
			<el-table-column prop="phone" label="账号" align="center" width="140"></el-table-column>
			<el-table-column prop="nickName" label="用户编号" align="center" ></el-table-column>
			<el-table-column label="用户类型" align="center">
				<template slot-scope="scope">{{scope.row.userType | userTypesFilter}}</template>
			</el-table-column>
			<el-table-column prop="tradeType" label="类型" align="center">
					<template slot-scope="scope">
							<span >{{ scope.row.optType | optType }}</span>
					</template>
			</el-table-column>
			<el-table-column prop="balanceChange" label="可用资金变化" width="120" align="center"></el-table-column>
			<el-table-column prop="balance" label="可用资金余额" width="120" align="center"></el-table-column>
			<el-table-column label="冻结资金变化" prop="frozenAmountChange" width="120" align="center"></el-table-column>
			<el-table-column label="冻结资金余额" prop="frozenAmount" width="120" align="center"></el-table-column>
			<el-table-column label="资产证明变化" prop="assetCertificationChange" width="120" align="center">
				<template slot-scope="scope">
					<span >{{ scope.row.assetCertificationChange>0?'+':'' }}{{scope.row.assetCertificationChange}}</span>
				</template>
			</el-table-column>
			<el-table-column label="资产证明余额" prop="assetCertification" width="120" align="center"></el-table-column>
			<el-table-column label="备注" prop="remark" align="center">
				<el-tooltip slot-scope="scope" :content="scope.row.remark" placement="bottom" effect="light">
					<span>{{scope.row.remark}}</span>
				</el-tooltip>
			</el-table-column>
		</el-table>
		<div>
		<div class="footer">
			<div class="total">
				<!-- <p v-for="(item,index) in totalData" :key="index"> <span>{{item.coin_name}}</span> :可用资金变化{{item.sum_balance_change}} 冻结资金变化{{ item.sum_frozen_amount_change }}</p> -->
				<p>可用资金变化: <span v-for="(item,index) in totalData" :key="index">{{item.sum_balance_change}} {{item.coin_name}}</span></p>
				<p>冻结资金变化: <span v-for="(item,index) in totalData" :key="index">{{item.sum_frozen_amount_change}} {{item.coin_name}}</span></p>
			</div>
			<sac-pagination v-show="listData.list.length>0"
				@handleChange="handleCurrentChange"
				:total="+listData.total"
				:page-size="filterForm.pageSize"
				:current-page="filterForm.pageNum">
			</sac-pagination>
		</div>
		</div>
	</div>
</template>
<script>
import {mapState} from 'vuex'
import {getTodayTime} from '@/common/util'
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
				userType: null
			},
			listData: {
				total: null,
				list: [],
			},
			totalData:[],
			userTypes
		}
	},
	activated(){
		this.selectedDate = getTodayTime()
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
			window.open(baseURL+'/wallet/app/otc/backmgr/queryOtcMoneyChangeInfo/export?'+param+'token='+localStorage.getItem('wallet_token'))
		},
		getList(){
			if(this.selectedDate && this.selectedDate.length == 2 ){
				this.filterForm.startDate = this.selectedDate[0]
				this.filterForm.endDate = this.selectedDate[1]
			}else {
				this.filterForm.startDate = ""
				this.filterForm.endDate = ""
			}
			this.$http.post('/wallet/app/otc/backmgr/queryOtcMoneyChangeInfo',this.filterForm).then(res=>{
				const { list ,total} = res.result.pageData;
				this.totalData = res.result.sumInfo;
				this.listData.list = list;
				console.log(this.listData)
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
	/deep/.scope p{
		margin: 0;
	}
	.dateItem{
		/deep/.el-form-item__content {
			width: 380px;
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
				// display: inline;
				margin-right: 20px;
				line-height: 24px;
				font-size: 14px;
				color: #606266;
				margin: 0;
				span{
					font-weight: 600;
					color: #409EFF;
					margin-right: 10px;
				}
			}
			
		}
		 /deep/.el-pagination{
        margin-top: 10px;
      }
	}
}
</style>