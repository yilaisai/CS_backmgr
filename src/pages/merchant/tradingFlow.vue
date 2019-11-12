
<template>
    <div class="transaction-details">
        <el-container>
					<div class="main">
						<el-form :inline="true"  ref="filterForm" :model="filterForm" size="mini" label-width="80px">
							<div class="form-group">
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
								<el-form-item label="订单号:">
									<el-input placeholder="请输入单号" v-model.trim="filterForm.recdId" class="input-with-select"></el-input>
								</el-form-item>
								<el-form-item label="账号/昵称:">
									<el-input placeholder="请输入用户账号或昵称" v-model.trim="filterForm.account" class="input-with-select"></el-input>
								</el-form-item>
								<el-form-item label="状态:">
									<el-select v-model="filterForm.status" >
										<el-option v-for="(item, key) in statusList" :key="key" :value="item.label" :label="item.value"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="币种:">
									<el-select v-model="filterForm.coinName" >
										<el-option value="" label="全部"></el-option>
										<el-option v-for="(item, key) in coinInfo" :key="key" :value="item.coinName" :label="item.coinName"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="交易类型:">
									<el-select v-model="filterForm.advType" >
										<el-option v-for="(item, key) in transList" :key="key" :value="item.label" :label="item.value"></el-option>
									</el-select>
								</el-form-item>
								
								<el-form-item label="超时筛选:">
									<el-select v-model="filterForm.timeOut" >
										<el-option value="" label="所有"></el-option>
										<el-option value="1" label="已超时"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click.native="search" size="mini">搜索</el-button>
								</el-form-item>
							</div>
						</el-form>
						<!-- <ul class="statistics" v-if="statistics">
							<li>
								<p>待付款</p>
								<p>交易数：{{ statistics.pendingGoNum }}</p>
								<p>交易额：{{ statistics.pendingGoAmount }}{{filterForm.coinName}}</p>
							</li>
							<li>
								<p>待放行</p>
								<p>交易数：{{ statistics.pendingNum }}</p>
								<p>交易额：{{ statistics.pendingAmount }}{{filterForm.coinName}}</p>
							</li>
							<li>
								<p>已完成</p>
								<p>交易数：{{ statistics.completeNum }}</p>
								<p>交易额：{{ statistics.completeAmount }}{{filterForm.coinName}}</p>
							</li>
							<li>
								<p>申诉中</p>
								<p>交易数：{{ statistics.appealNum }}</p>
								<p>交易额：{{ statistics.appealAmount }}{{filterForm.coinName}}</p>
							</li>
						</ul> -->
						<el-table :data="listData.list" border height="100%" size="mini">
								<el-table-column  label="类型" align="center">
									<template slot-scope="scope">{{advTypeMap[scope.row.adv_type]}}</template>
								</el-table-column>
								<el-table-column  label="商户单号/平台单号/下单时间" width="180" align="center" >
									<span slot-scope="scope">{{scope.row.api_trade_id}}<br />{{scope.row.trade_id}}<br />{{ $fmtDate(scope.row.create_time,'full') }}</span>
								</el-table-column>
								<el-table-column label="商户昵称/账户" width="150" align="center" >
									<span slot-scope="scope">{{scope.row.taker_nick_name}}<br />{{scope.row.taker_phone}}</span>
								</el-table-column>
								<el-table-column label="承兑商昵称/账户" width="150" align="center">
									<span slot-scope="scope">{{scope.row.nick_name}}<br />{{scope.row.phone}}</span>
								</el-table-column>
								<el-table-column prop="tradeTime" label="状态" align="center" >
									<template slot-scope="scope">{{tradeStatusMap[scope.row.trade_status]}}</template>
								</el-table-column>
								<el-table-column label="价格/数量/金额" width="120" align="center">
									<div slot-scope="scope">
										<span>{{scope.row.taker_price}}</span><br />
										<span>{{scope.row.taker_amount}}</span><br />
										<span>{{scope.row.amount}}</span>
									</div>
								</el-table-column>
								<el-table-column prop="coin_name" label="币种" align="center"></el-table-column>
								<el-table-column prop="fee" label="手续费" align="center"></el-table-column>
								<el-table-column prop="price" label="操作" fixed="right" align="center" width="200">
									<template slot-scope="scope">
										<el-button type="primary" size="mini" @click.native="$router.push({path:'/merchant/merchantTradingFlowDetaile',query:{tradeId:scope.row.trade_id}})">查看详情</el-button>
										<el-button type="danger" size="mini" v-if="scope.row.trade_status==8&&showActiveBtn(scope.row.create_time)" @click.native="orderActivation(scope.row)">激活订单</el-button>
										<el-button type="warning" size="mini" v-if="(scope.row.adv_type == 4 || scope.row.adv_type == 5) && (scope.row.trade_status == 3 || scope.row.trade_status == 6)" @click="returnApi(scope.row)">异步补发</el-button>
									</template>
								</el-table-column>
						</el-table>
				</div>
            <el-footer>
                <sac-pagination v-show="listData.list.length>0"
                    @handleChange="handleCurrentChange"
                    :total="+listData.total"
                    :page-size="filterForm.pageSize"
                    :current-page="filterForm.pageNum">
                </sac-pagination>
            </el-footer>
        </el-container>
    </div>
</template>
<script>
import { dateFormat } from "@/common/util";
import {mapState} from 'vuex'
export default {
	name:'transaction-details',
	data(){
		return{
			selectedDate: [], //已选日期
			currentPage:1,
			filterForm:{
				pageNum:1,
				account:'',
				pageSize: 10,
				startDate:'',
				endDate:'',
				coinName:'',
				trade_status:'',
				status: '',
				tradeType:'3',
				advType:'',
				dateType:'1',
				timeOut: "",
				recdId: "",
			},
			advTypeMap: {
				1: '在线出售',
				2: '在线求购',
				3: '抢单兑出',
				4: '抢单兑入',
				5: '派单兑入',
				6: '派单兑出'
			},
			tradeTypeList:[
				{value:'全部',label:""},
				{value:'派单',label:"0"},
				{value:'抢单',label:"1"}
			],
			statusList:[
				{value:'全部',label:""},
				{value:'未付款',label:"1"},
				{value:'已付款(待放行)',label:"2"},
				{value:'已完成',label:"3"},
				{value:'已取消',label:"4"},
				{value:'申述中',label:"5"},
				{value:'超时取消',label:"8"}
			],
			transList:[
				{value:'所有',label:""},
				{value:'抢单兑出',label:"3"},
				{value:'抢单兑入',label:"4"},
				{value:'派单兑入',label:"5"},
				{value:'派单兑出',label:"6"},
			],
			tradeStatusMap: {
				1: '未付款',
				2: '待放行',
				3: '已完成',
				4: '已取消',
				5: '申述',
				6: '已完成',
				7: '申诉后取消交易',
				8: '超时取消'
			},
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
			statistics:{},
		}
        
	},
	methods:{
		getList(){
			if(this.selectedDate && this.selectedDate.length==2){
				this.filterForm.startDate = this.selectedDate[0]
				this.filterForm.endDate = this.selectedDate[1]
			}else {
				this.filterForm.startDate = ""
				this.filterForm.endDate = ""
			}
			this.$http.post('/wallet/backmgr/merchant/trade/list',this.filterForm).then(res=>{
				this.SumTradeRecd()
				const { list ,total} = res.result.pageData;
				this.listData.list = list;
				this.listData.total = total;
			})
		},
		SumTradeRecd(){
			if(this.selectedDate && this.selectedDate.length==2){
				this.filterForm.startDate = this.selectedDate[0]
				this.filterForm.endDate = this.selectedDate[1]
			}else {
				this.filterForm.startDate = ""
				this.filterForm.endDate = ""
			}
			this.$http.post('/wallet/app/otc/backmgr/SumTradeRecd',this.filterForm).then(res=>{
				if(res.code==200){
					this.statistics = res.result
				}
			})
		},
		orderActivation(item){
			this.$http.post('/wallet/backmgr/merchant/activation',{tradeId: item.trade_id,}).then(res=>{
				if(res.code==200){
					// this.statistics = res.result
					this.getList()
					this.$notify({
						title: '成功',
						message: res.msg,
						type: 'success'
					});
				}
			})
		},
		showActiveBtn(create_time){
			if(new Date().getTime()-create_time<86400000){
				return true
			}else{
				return false
			}
		},
		// 异步补发
		returnApi(item) {
			this.$http.post('/wallet/backmgr/merchant/returnApi', {
				tradeId: item.trade_id,
				userId: item.taker_user_id
			}).then(res=>{
				if(res.code==200){
					this.$alert('返回结果：'+res.result, {
						title:'提示',
						dangerouslyUseHTMLString: true
					});	
					// this.$notify({
					// 	title: '成功',
					// 	message: res.msg,
					// 	type: 'success'
					// });
				}
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
					this.filterForm.pageNum = 1
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
        /* handleCurrentChange(val) {
            this.filterForm.pageNum=val
            this.getList()
        }, */
        download(){
            location.href =`${ SERVER_PATH}/wallet/app/otc/backmgr/exportExcel?startDate=${this.filterForm.startDate}&endDate=${this.filterForm.endDate}&userId=${this.filterForm.userId}&token=${localStorage.getItem('cus_token')}`;
        }
	},
	computed:{
		...mapState(['coinInfo'])
	},
	activated(){
			this.getList()
	}
}
</script>

<style scoped lang="less">
.transaction-details{
     height:100%;
    .el-container{
        height:100%;
        .main{
            height:100%;
			width: 100%;
			display: flex;
			flex-direction: column;
        }
    } 
    .el-form--inline .el-form-item__label{
        width:80px !important;
		}
		.statistics{
			width: 100%;
			height: 85px;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			list-style: none;
			padding: 0;
			margin: 0;
			border: 1px solid #DCDFE6;
			box-sizing: border-box;
			padding: 5px;
			li{
				p{
					text-align: center;
					font-size: 14px;
					line-height: 25px;
					margin: 0;
					&:first-of-type{
						font-size: 16px;
						font-weight: 600;
					}
				}
			}
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
        width: auto;
		}
		/deep/.el-radio__label{
			color: #909399;
			padding:0 10px;
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
}
  
</style>