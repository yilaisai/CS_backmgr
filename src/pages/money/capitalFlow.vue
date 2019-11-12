<template>
	<div class="capitalFlow-page">
		<el-form :inline="true"  ref="filterForm" label-width="60px" :model="filterForm" size="mini">
			<!-- <el-form-item label="订单号:">
				<el-input placeholder="请输入单号" v-model="filterForm.userId" class="input-with-select"></el-input>
			</el-form-item> -->
			<el-form-item label="账号:">
				<el-input placeholder="请输入用户账号" v-model="filterForm.phone" class="input-with-select"></el-input>
			</el-form-item>
			<el-form-item label="币种:">
				<el-select v-model="filterForm.coinName" >
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
					end-placeholder="结束日期" @change='filterForm.dateType=""'>
				</el-date-picker>
			</el-form-item>
			<el-form-item><el-button type="primary" @click.native="search">搜索</el-button></el-form-item>
		</el-form>
		<el-table :data="listData.list" border height="100%" size="mini">
			<el-table-column  label="时间" width="140"  align="center">
				<div class="scope" slot-scope="scope">
					<p>{{ $fmtDate(scope.row.createTime,'full') }}</p>
				</div>
			</el-table-column>
			<el-table-column prop="coinName" label="币种" align="center" width="60"></el-table-column>
			<el-table-column prop="phone" label="账号" align="center" ></el-table-column>
			<el-table-column prop="nickName" label="昵称" align="center" ></el-table-column>
			<el-table-column prop="tradeType" label="类型" width="120" align="center">
					<template slot-scope="scope">
							<span >{{ scope.row.optType | optType }}</span>
					</template>
			</el-table-column>
			<el-table-column prop="balanceChange" label="可用资金变化" width="120" align="center"></el-table-column>
			<el-table-column prop="balance" label="可用资金余额" width="120" align="center"></el-table-column>
			<el-table-column label="冻结资金变化" prop="frozenAmountChange" width="120" align="center"></el-table-column>
			<el-table-column label="冻结资金余额" prop="frozenAmount" width="120" align="center"></el-table-column>
		</el-table>
		<div>
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
			},
			listData: {
				total: null,
				list: [],
			},
		}
	},
	activated(){
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
		getList(){
			if(this.selectedDate.length == 2 ){
			this.filterForm.startDate = this.selectedDate[0]
			this.filterForm.endDate = this.selectedDate[1]
			}
			this.$http.post('/wallet/app/otc/backmgr/queryOtcMoneyChangeInfo',this.filterForm).then(res=>{
				const { list ,total} = res.result;
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
	/deep/.scope p{
		margin: 0;
	}
		.dateItem{
			width: 460px;
		}
		.btn{
			height: 39px;
		}
}
</style>