
<template>
    <div class="transaction-details">
        <el-container>
					<div class="main">
						<el-form :inline="true"  ref="filterForm" :model="filterForm" size="mini" label-width="80px">
							<div class="form-group">
								<el-form-item label="订单号:">
									<el-input placeholder="请输入单号" v-model="filterForm.recdId" class="input-with-select"></el-input>
								</el-form-item>
								<el-form-item label="账号:">
									<el-input placeholder="请输入用户账号" v-model="filterForm.phone" class="input-with-select"></el-input>
								</el-form-item>
								<el-form-item label="类型:">
									<el-select v-model="filterForm.tradeType" >
										<el-option v-for="(item, key) in tradeTypeList" :key="key" :value="item.label" :label="item.value"></el-option>
									</el-select>
								</el-form-item>
							</div>
							<div class="form-group">
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
								<el-form-item label="交易类型:">
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
								<!-- <div class="radioBox">
									<label >最近:</label>
									<el-radio-group v-model="filterForm.dateType" @change=" setDateType ">
										<el-radio v-for="(item,index) in dateList" :key="index" :label="item.label">{{item.value}}</el-radio>
									</el-radio-group>
								</div> -->
								<el-form-item>
									<el-button type="primary" @click.native="search" size="mini">搜索</el-button>
								</el-form-item>
							</div>
						</el-form>
						<ul class="statistics" v-if="statistics">
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
						</ul>
						<el-table :data="listData.list" border height="100%" size="mini">
								<el-table-column  label="类型" align="center">
									<template slot-scope="scope">{{advTypeMap[scope.row.adv_type]}}</template>
								</el-table-column>
								<el-table-column  label="单号/下单时间" width="180" align="center" >
									<div slot-scope="scope">
										<p>{{scope.row.trade_id}}</p>
										<p>{{ $fmtDate(scope.row.create_time,'full') }}</p>
									</div>
								</el-table-column>
								<el-table-column label="商户昵称/账户" width="150" align="center" >
									<div slot-scope="scope">
										<p>{{scope.row.taker_nick_name}}</p>
										<p>{{scope.row.taker_phone}}</p>
									</div>
								</el-table-column>
								<el-table-column label="承兑商昵称/账户" width="150" align="center">
								<div slot-scope="scope">
										<p>{{scope.row.nick_name}}</p>
										<p>{{scope.row.phone}}</p>
									</div></el-table-column>
								<el-table-column prop="tradeTime" label="状态" align="center" >
									<div slot-scope="scope">
										<span >{{ scope.row.trade_status==1?'未付款':scope.row.trade_status==2?'待放行':scope.row.trade_status==3?'已完成':scope.row.trade_status==4?'已取消':scope.row.trade_status==5?'申述中':'' }}</span>
									</div>
								</el-table-column>
								<el-table-column prop="tradeType" label="广告类型" width="80" align="center">
										<template slot-scope="scope">
												<span v-if="scope.row.trans==1"> 兑出 </span>
												<span v-else>兑入</span>
										</template>
								</el-table-column>
								<el-table-column label="价格/数量/金额" width="120" align="center">
									<div slot-scope="scope">
										<p>{{scope.row.price}}</p>
										<p>{{scope.row.amount}}</p>
										<p>{{scope.row.money}}</p>
									</div>
								</el-table-column>
								<el-table-column prop="coin_name" label="币种" align="center"></el-table-column>
								<el-table-column prop="fee" label="手续费" align="center"></el-table-column>
								<el-table-column prop="price" label="操作" fixed="right" align="center">
									<template slot-scope="scope">
										<el-button type="text" @click.native="$router.push({path:'/merchant/merchantTradingFlowDetaile',query:{tradeId:scope.row.trade_id}})">查看详情</el-button>
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
export default {
    name:'transaction-details',
    data(){
        return{
            selectedDate: [], //已选日期
            currentPage:1,
            filterForm:{
				pageNum:1,
				pageSize: 10,
				startDate:'',
				endDate:'',
				coinName:'',
				trade_status:'',
				tradeType:'3',
				trans:'',
				dateType:'1'
			},
			advTypeMap: {
				1: '在线出售',
				2: '在线求购',
				3: '抢单在线出售',
				4: '抢单在线购买',
				5: '匹配在线出售',
				6: '匹配在线购买'
			},
			tradeTypeList:[
				{value:'全部',label:"3"},
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
			coinList:[
				{value:'所有',label:""},
				{value:'USDT',label:"USDT"},
				{value:'BTC',label:"BTC"},
			],
			transList:[
				{value:'所有',label:""},
				{value:'兑入',label:"1"},
				{value:'兑出',label:"0"},
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
			statistics:{},
        }
        
    },
    methods:{
        getList(){
			if(this.selectedDate.length==2){
				this.filterForm.startDate = this.selectedDate && this.$fmtDate(this.selectedDate[0].getTime())+' 00:00:00';
				this.filterForm.endDate = this.selectedDate && this.$fmtDate(this.selectedDate[1].getTime())+' 23:59:59';
			}	
			this.$http.post('/wallet/backmgr/merchant/trade/list',this.filterForm).then(res=>{
				this.SumTradeRecd()
				const { list ,total} = res.result.pageData;
				this.listData.list = list;
				console.log(this.listData.list)
				this.listData.total = total;
			})
		},
		SumTradeRecd(){
			if(this.selectedDate.length==2){
				this.filterForm.startDate = this.selectedDate && this.$fmtDate(this.selectedDate[0].getTime())+' 00:00:00';
				this.filterForm.endDate = this.selectedDate && this.$fmtDate(this.selectedDate[1].getTime())+' 23:59:59';
			}	
			this.$http.post('/wallet/app/otc/backmgr/SumTradeRecd',this.filterForm).then(res=>{
				if(res.code==200){
					this.statistics = res.result
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
    activated(){
        // this.setDateType()
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
        width: 352px;
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