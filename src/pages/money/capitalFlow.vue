<template>
	<div class="capitalFlow-page">
		<div>
			<el-form :inline="true"  ref="filterForm" label-width="80px" :model="filterForm" size="mini">
				<el-form-item label="订单号:">
					<el-input placeholder="请输入单号" v-model="filterForm.userId" class="input-with-select"></el-input>
				</el-form-item>
				<el-form-item label="账号:">
					<el-input placeholder="请输入用户账号" v-model="filterForm.userId" class="input-with-select"></el-input>
				</el-form-item>
				<el-form-item label="状态:">
					<el-select v-model="filterForm.tradeStatus" >
						<el-option v-for="(item, key) in statusList" :key="key" :value="item.label" :label="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="币种:">
						<el-select v-model="filterForm.coinName" >
						<el-option v-for="(item, key) in coinList" :key="key" :value="item.label" :label="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="广告类型:">
					<el-select v-model="filterForm.trans" >
						<el-option v-for="(item, key) in transList" :key="key" :value="item.label" :label="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item class='dateItem' label="时间:">
					<el-date-picker
						v-model="selectedDate"
						type="daterange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期" @change='filterForm.dateType=""'>
					</el-date-picker>
				</el-form-item>
				<el-form-item><el-button type="primary" @click.native="search">搜索</el-button></el-form-item>
			</el-form>
			<div>
				<el-table :data="listData.list" border height="100%" size="mini">
					<el-table-column  label="单号/下单时间" width="180"  align="center">
						<div slot-scope="scope">
							<p>{{scope.row.recdId}}</p>
							<p>{{ $fmtDate(scope.row.createStamp,'full') }}</p>
						</div>
					</el-table-column>
					<el-table-column label="taker昵称/账户" width="150"  align="center">
						<div slot-scope="scope">
							<p>{{scope.row.takerName}}</p>
							<p>{{scope.row.takerPhone}}</p>
						</div>
					</el-table-column>
					<el-table-column label="maker昵称/账户" width="150"  align="center">
					<div slot-scope="scope">
							<p>{{scope.row.makerName}}</p>
							<p>{{scope.row.makerPhone}}</p>
						</div></el-table-column>
					<el-table-column prop="tradeTime" label="状态" align="center" >
						<div slot-scope="scope">
							<span >{{ scope.row.tradeStatus==1?'未付款':scope.row.tradeStatus==2?'待放行':scope.row.tradeStatus==3?'已完成':scope.row.tradeStatus==4?'已取消':scope.row.tradeStatus==5?'申述':'' }}</span>
						</div>
					</el-table-column>
					<el-table-column prop="tradeType" label="广告类型" width="80" align="center">
							<template slot-scope="scope">
									<span v-if="scope.row.trans==1">购买</span>
									<span v-else>出售</span>
							</template>
					</el-table-column>
					<el-table-column label="价格/数量/金额" width="120" align="center">
						<div slot-scope="scope">
							<p>{{scope.row.price}}</p>
							<p>{{scope.row.amount}}</p>
							<p>{{scope.row.money}}</p>
						</div>
					</el-table-column>
					<el-table-column prop="coinName" label="币种" align="center" ></el-table-column>
					<el-table-column prop="fee" label="手续费" align="center" ></el-table-column>
				</el-table>
			</div>
			<div>
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
export default {
	components:{

	},
	data(){
		return {
			selectedDate:[],
			filterForm:{
				pageNum:1,
				pageSize: 20,
				startDate:'',
				endDate:'',
				coinName:'',
				tradeStatus:'',
				tradeType:'0',
				trans:'',
				dateType:'1'
			},
			listData: {
				total: null,
				list: [],
			},
			statusList:[
					{value:'全部',label:""},
					{value:'未付款',label:"1"},
					{value:'已付款(待放行)',label:"2"},
					{value:'已完成',label:"3"},
					{value:'已取消',label:"4"},
					{value:'申述中',label:"5"},
				],
				coinList:[
					{value:'所有',label:""},
					{value:'USDT',label:"USDT"},
					{value:'BTC',label:"BTC"},
				],
				transList:[
					{value:'所有',label:""},
					{value:'购买',label:"1"},
					{value:'出售',label:"0"},
				],
		}
	},
	mounted(){

	},
	methods:{
		handleCurrentChange(){
			
		}
	},
	watch:{

	},
	computed:{

	}
	}
</script>
<style lang="less" scoped>
.capitalFlow-page{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
		.dateItem{
			width: 430px;
		}
		.btn{
			height: 39px;
		}
}
</style>