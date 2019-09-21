
<template>
    <div class="transaction-details">
        <el-container>
					<el-main>
						<el-form :inline="true"  ref="filterForm" :model="filterForm">
							<div class="form-group">
								<el-form-item label="订单号:">
									<el-input placeholder="请输入单号" v-model="filterForm.userId" class="input-with-select"></el-input>
								</el-form-item>
									<el-form-item label="账号:">
									<el-input placeholder="请输入用户账号" v-model="filterForm.userId" class="input-with-select"></el-input>
								</el-form-item>
								<br>
								<div class="radioBox">
									<label >类型:</label>
									<el-radio-group v-model="filterForm.tradeType">
										<el-radio v-for="(item,index) in tradeTypeList" :key="index" :label="item.label">{{item.value}}</el-radio>
									</el-radio-group>
								</div>
							</div><div class="form-group">
								<div class="radioBox">
									<label >状态:</label>
									<el-radio-group v-model="filterForm.tradeStatus">
										<el-radio v-for="(item,index) in statusList" :key="index" :label="item.label">{{item.value}}</el-radio>
									</el-radio-group>
								</div>
								<div class="radioBox">
									<label >币种:</label>
									<el-radio-group v-model="filterForm.coinName">
										<el-radio v-for="(item,index) in coinList" :key="index" :label="item.label">{{item.value}}</el-radio>
									</el-radio-group>
								</div>
								<div class="radioBox">
									<label >广告类型:</label>
									<el-radio-group v-model="filterForm.trans">
										<el-radio v-for="(item,index) in transList" :key="index" :label="item.label">{{item.value}}</el-radio>
									</el-radio-group>
								</div>
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
								<div class="radioBox">
									<label >最近:</label>
									<el-radio-group v-model="filterForm.dateType" @change=" setDateType ">
										<el-radio v-for="(item,index) in dateList" :key="index" :label="item.label">{{item.value}}</el-radio>
									</el-radio-group>
								</div>
								
								<el-button  type="primary"  size="mini"
									@click.native="search">搜索
								</el-button>
							</div>
						</el-form>
						<el-table :data="listData.list" border >
								<el-table-column  label="类型" >
									<div slot-scope="scope">
										<span v-if="scope.row.tradeType==0">C2C</span>
										<span v-if="scope.row.tradeType==1">派单</span>
										<span v-if="scope.row.tradeType==2">抢单</span>
									</div>
								</el-table-column>
								<el-table-column  label="单号/下单时间" width="180" >
									<div slot-scope="scope">
										<p>{{scope.row.recdId}}</p>
										<p>{{ $fmtDate(scope.row.createStamp,'full') }}</p>
									</div>
								</el-table-column>
								<el-table-column label="taker昵称/账户" width="150" >
									<div slot-scope="scope">
										<p>{{scope.row.takerName}}</p>
										<p>{{scope.row.takerPhone}}</p>
									</div>
								</el-table-column>
								<el-table-column label="maker昵称/账户" width="150" >
								<div slot-scope="scope">
										<p>{{scope.row.makerName}}</p>
										<p>{{scope.row.makerPhone}}</p>
									</div></el-table-column>
								<el-table-column prop="tradeTime" label="状态" >
									<div slot-scope="scope">
										<span >{{ scope.row.tradeStatus==1?'未付款':scope.row.tradeStatus==2?'待放行':scope.row.tradeStatus==3?'已完成':scope.row.tradeStatus==4?'已取消':scope.row.tradeStatus==5?'申述中':'' }}</span>
									</div>
								</el-table-column>
								<el-table-column prop="tradeType" label="广告类型" width="80">
										<template slot-scope="scope">
												<span v-if="scope.row.trans==1">购买</span>
												<span v-else>出售</span>
										</template>
								</el-table-column>
								<el-table-column label="价格/数量/金额" width="120">
									<div slot-scope="scope">
										<p>{{scope.row.price}}</p>
										<p>{{scope.row.amount}}</p>
										<p>{{scope.row.money}}</p>
									</div>
								</el-table-column>
								<el-table-column prop="coinName" label="币种" ></el-table-column>
								<el-table-column prop="fee" label="手续费" ></el-table-column>
								<el-table-column prop="price" label="操作" fixed="right">
									<template slot-scope="scope">
										<el-button type="text" @click.native="$router.push({path:'/LegalCurrency/tradingFlowDetaile',query:{recdId:scope.row.recdId}})">查看详情</el-button>
									</template>
								</el-table-column>
						</el-table>
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
								pageSize: 20,
								startDate:'',
								endDate:'',
								coinName:'',
								tradeStatus:'',
								tradeType:'',
								trans:'',
								dateType:'1'
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
						coinList:[
							{value:'所以',label:""},
							{value:'USDT',label:"USDT"},
							{value:'BTC',label:"BTC"},
						],
						transList:[
							{value:'所以',label:""},
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
        }
        
    },
    methods:{
        getList(){
					this.filterForm.startDate = this.selectedDate && this.selectedDate[0]+' 00:00:00';
					this.filterForm.endDate = this.selectedDate && this.selectedDate[1]+' 23:59:59';;
					this.$http.post('/wallet/app/otc/backmgr/getTradeMainList',this.filterForm).then(res=>{
						const { list ,total} = res.result;
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
        /* handleCurrentChange(val) {
            this.filterForm.pageNum=val
            this.getList()
        }, */
        download(){

            location.href =`${ SERVER_PATH}/wallet/app/otc/backmgr/exportExcel?startDate=${this.filterForm.startDate}&endDate=${this.filterForm.endDate}&userId=${this.filterForm.userId}&token=${localStorage.getItem('cus_token')}`;
        }
    },
    activated(){
        this.setDateType()
        this.getList()
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
        }
    } 
    .el-form--inline .el-form-item__label{
        width:80px !important;
    }
		.form-group{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			/deep/.el-button{
				height: 40px;
				width: 100px;
			}
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
}
  
</style>