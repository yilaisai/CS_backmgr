<template>
	<div class="cashOutVerify-page">
		<el-collapse value="filter">
			<el-collapse-item title="查询条件" name="filter">
				<el-form :inline="true" label-width="86px" ref="filterForm" size="mini" :model="filterForm">
                    <el-form-item class='dateItem' label="时间:">
						<el-date-picker
							v-model="selectedDate"
							type="datetimerange"
							value-format="yyyy-MM-dd HH:mm:ss"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期" >
						</el-date-picker>
					</el-form-item>
					<el-form-item label="账号/昵称:" >
						<el-input placeholder="请输入用户账号/昵称" v-model="filterForm.phoneOrNick" ></el-input>
					</el-form-item>
                    <el-form-item label="订单号:" >
						<el-input placeholder="请输入订单号" v-model="filterForm.recdId" ></el-input>
					</el-form-item>
					<el-form-item label="代付方式:" >
						<el-select v-model="filterForm.batchOuttype" >
							<el-option value="" label='所有'></el-option>
							<el-option value="1" label='手动'></el-option>
							<el-option value="2" label='第三方'></el-option>
						</el-select>
					</el-form-item>
					
					<!-- <el-form-item  label="币种:" >
						<el-select v-model="filterForm.coinName" >
								<el-option value="" label='所有'></el-option>
								<el-option v-for="(item, key) in coinInfo" :key="key" :value="item.coinName" :label="item.coinName"></el-option>
						</el-select>
					</el-form-item> -->
					<el-button class="btn" type="primary" @click="search()" size="mini" style="margin-left: 20px;">查询</el-button>
					<el-button type="primary" @click.native="exportExcel" size="mini" icon="el-icon-document-checked">导出Excel</el-button>
				</el-form>
			</el-collapse-item>
    	</el-collapse>
        <el-tabs v-model="filterForm.tabs" @tab-click="getCashoutAuditList">
            <el-tab-pane label="所有" name=""></el-tab-pane>
			<!-- 1是待审核，2是审核失败，3是待确认 4是完成 -->
            <el-tab-pane label="已完成" name="4"></el-tab-pane>
            <el-tab-pane label="审核不通过" name="2"></el-tab-pane>
        </el-tabs>
		<el-table height="auto" size="mini" border :data="listData.list">

			<el-table-column align="center" prop="coinName" width="80" label="币种"></el-table-column>
			<el-table-column align="center"  label="类型" width="80">
				<div slot-scope="scope"> {{scope.row.type }} </div>
			</el-table-column>
			<el-table-column align="center"  label="单号/发起时间" width="160">
				<template slot-scope="scope">
					<span>{{scope.row.recdId}}<br />{{$fmtDate(scope.row.createTime, 'full')}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center"  label="商户昵称/账户" width="130">
				<template slot-scope="scope">
					<span>{{scope.row.nickName}}<br />{{scope.row.phone}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center"  label="状态" width="80">
				<template slot-scope="scope">
					{{scope.row.statusName}}
				</template>
			</el-table-column>
			<el-table-column align="center"  label="代付方式" width="80">
				<div slot-scope="scope"> {{scope.row.newStatusName }} </div>
			</el-table-column>
			<el-table-column align="center"  label="价格/数量" >
				<div class="price" slot-scope="scope">
					<p>价格:<span>{{scope.row.price}}</span> CNY/{{ scope.row.coinName }}</p>
					<p>数量:<span>{{scope.row.amount}}</span> {{ scope.row.coinName }}</p>
				</div>
			</el-table-column>
			<el-table-column align="center"  label="金额" width="120">
				<div class="price" slot-scope="scope">
					<p><span>{{scope.row.money }}</span> CNY</p>
				</div>
			</el-table-column>
			<el-table-column align="center"  label="手续费" >
				<div class="price" slot-scope="scope">
					<p><span>{{scope.row.fee }}</span>  {{ scope.row.coinName }}</p>
				</div>
			</el-table-column>
			<el-table-column align="center"  label="收款人" >
				<div class="price" slot-scope="scope">
					<p> {{ scope.row.bankUserName }}</p>
				</div>
			</el-table-column>
			<el-table-column align="center"  label="银行/银行支行" >
				<div class="price" slot-scope="scope">
					<p>{{scope.row.bankName }} </br>  {{ scope.row.bankBranch||'--' }}</p>
				</div>
			</el-table-column>
			
			<el-table-column align="center"  label="银行卡号" >
				<div class="price" slot-scope="scope">
					<p><span>{{scope.row.bankCardId }}</span> </p>
				</div>
			</el-table-column>
			<el-table-column align="center"  label="批次号" width="160">
				<template slot-scope="scope">
					<span>{{scope.row.batchNum}}</span>
				</template>
			</el-table-column>
		</el-table>
		<div class="load-more">
			<div class="count">
				总数量： <span>{{sumInfo.sumAmount}} {{$variableCoin}}</span>
				总金额： <span>{{sumInfo.sumMoney}} CNY</span>
				总手续费： <span>{{sumInfo.sumFee}} {{$variableCoin}}</span>
			</div>
			<sac-pagination v-show="listData.list.length>0"
				@handleChange="getPaginationChange"
				:total="+listData.total"
				:page-size="filterForm.pageSize"
				:pager-count="5"
				:current-page="filterForm.pageNum">
			</sac-pagination>
		</div>
	</div>
</template>
<script>
import {mapState} from 'vuex'
import {matchResultMap} from '@/common/constants.js'
import {getTodayTime} from '@/common/util'
import qs from 'qs'
export default {
	data(){
		return {
			filterForm:{
				tabs:0,
				status:'',
				batchOuttype:'',
				coinName:'RMT',
				recdId:'',
				phoneOrNick:'',
				startDate:'',
				endDate:'',
				pageNum:1,
				pageSize: 20,
			},
			selectedDate:[],
			typeList:[
				{label:'派单兑入',value:5},
				{label:'派单兑出',value:6},
				{label:'抢单兑入',value:4},
				{label:'抢单兑出',value:3}
			],
			listData: {
				total: null,
				list: [],
			},
			currentItem: {},
			reason: "",  //审核理由
			matchResultMap: matchResultMap,
			sumInfo: {
				sumApiStock: "--",
				sumApiAmount: "--",
				sumFee: "--"
			},
			baseUrl:''
		}
	},
	activated(){
		this.selectedDate = getTodayTime()
		this.getCashoutAuditList()
        this.baseUrl = localStorage.getItem('SERVER_PATH') || window.SERVER_PATH|| window.SERVER_PATH2
	},
	methods:{
		getCashoutAuditList() {
			if(this.filterForm.tabs==0){
				this.filterForm.status=''
			}else{
				this.filterForm.status=this.filterForm.tabs
			}
			if(this.selectedDate && this.selectedDate.length == 2 ){
				this.filterForm.startDate = this.selectedDate[0]
				this.filterForm.endDate = this.selectedDate[1]
			}else {
				this.filterForm.startDate = null
				this.filterForm.endDate = null
			}
			this.$http.post('/wallet/app/otc/backmgr/batchOut/mgrQueryBatchOutList', this.filterForm).then((res) => {
				const { list, total } = res.result.pageData
				this.listData.list = list
				this.listData.total = total
				if(list.length<1){
					this.sumInfo = {sumApiStock: "0",sumApiAmount: "0",sumFee: "0"}
				}else{
					this.sumInfo = res.result.map
				}
				
			})
		},
		// 导出excel
		exportExcel() {
			if(this.selectedDate && this.selectedDate.length == 2 ){
				this.filterForm.startDate = this.selectedDate[0]
				this.filterForm.endDate = this.selectedDate[1]
			}else {
                this.$delete(this.filterForm,'startDate')
                this.$delete(this.filterForm,'endDate')
			}
			this.filterForm.token = localStorage.getItem('wallet_token') || ""
			window.open(this.baseUrl + '/wallet/app/otc/backmgr/batchOut/queryBatchOutList/export?' + qs.stringify(this.filterForm))
        },
		search(){
			this.filterForm.pageNum = 1
			this.getCashoutAuditList()
		},
		getPaginationChange(val, currentPage){
			this.filterForm.pageSize = val;
			this.filterForm.pageNum = currentPage;
			this.getCashoutAuditList()
		},
		
	},
	computed:{
		...mapState(['coinInfo'])
	}
}
</script>
<style lang="less" scoped>
.cashOutVerify-page{
	overflow: hidden;
	.el-table{
		flex: 1;
	}
	.dateItem{
		width: 480px;
	}
	.load-more {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .count {
            font-size: 14px;
            span {
				margin-right: 20px;
				color: #409EFF;
                    font-weight: 600;
                i {
                    font-style: normal;
                    color: #436bff;
                }
            }
        }
	}
    /deep/.el-button{
		margin-bottom:18px;
		
    }
	/deep/ .el-collapse-item__header {
		font-size: 14px;
		font-weight: 600;
		padding: 0 10px;
	}
	
	/deep/.el-collapse-item__content {
		padding-bottom: 0;
	}
	/deep/.el-form--inline .el-form-item__content {
		width: 170px;
	}
    /deep/.el-table{
        margin-top:0;
    }
    /deep/.el-tabs__header{
        margin:0;
    }
	.price{
		display: inline-block;
		p{
			margin: 0;
			text-align: left;
			span{
				color: #409EFF;
			}
		}
	}
	.ipInfo{
		span{
			display: inline-block;
			width: 90px;
		}
	}
}
</style>