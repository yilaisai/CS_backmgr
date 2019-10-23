<template>
	<div class="cashOutVerify-page">
		<el-form :inline="true" label-width="86px" ref="filterForm" size="mini" :model="filterForm">
			<el-form-item class='dateItem' label="时间:">
				<el-date-picker
					v-model="selectedDate"
					type="daterange"
					range-separator="至"
					start-placeholder="开始日期"
					format="yyyy-MM-dd "
					end-placeholder="结束日期" >
				</el-date-picker>
			</el-form-item>
			<el-form-item label="账号:" >
				<el-input placeholder="请输入用户账号" v-model="filterForm.phoneOrEmail" ></el-input>
			</el-form-item>
			<el-form-item label="商户订单号:" >
				<el-input placeholder="请输入商户订单号" v-model="filterForm.apiOrderId" ></el-input>
			</el-form-item>
			<el-form-item label="类型:" >
				<el-select v-model="filterForm.tradeType" >
					<el-option value="" label='所有'></el-option>
					<el-option v-for="(item, key) in typeList" :key="key" :value="item.value" :label="item.label "></el-option>
				</el-select>
			</el-form-item>
			<el-form-item  label="币种:" >
				<el-select v-model="filterForm.coinName" >
						<el-option value="" label='所有'></el-option>
						<el-option v-for="(item, key) in coinList" :key="key" :value="item" :label="item"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item><el-button class="btn" type="primary" @click="search()">搜索</el-button></el-form-item>
		</el-form>
		<el-table height="auto" size="mini" border :data="listData.list">
			<el-table-column align="center"  label="类型" width="80">
				<div slot-scope="scope"> {{scope.row.type==1?'匹配兑出':scope.row.type==2?'抢单兑出':''}} </div>
			</el-table-column>
			<el-table-column align="center"  label="商户订单号/发起时间" width="160">
				<template slot-scope="scope">
					<span>{{scope.row.apiOrderId}}<br />{{$fmtDate(scope.row.createTime, 'full')}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center"  label="商户昵称/账户" width="130">
				<template slot-scope="scope">
					<span>{{scope.row.nickName}}<br />{{scope.row.phoneOrEmail}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center"  label="状态" width="130">
				<div slot-scope="scope">
					<p>{{scope.row.auditStatus==0?'待审核':scope.row.auditStatus==1?'通过审核':scope.row.auditStatus==2?'审核不通过':''}}</p>
				</div>
			</el-table-column>
			<el-table-column align="center"  label="价格/数量/金额" width="130">
				<template slot-scope="scope">
					<span>{{scope.row.apiPrice}}<br />{{scope.row.apiStock}}<br />{{scope.row.apiAmount}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="coinName" label="币种"></el-table-column>
			<el-table-column align="center" prop="fee" label="手续费"></el-table-column>
			<el-table-column align="center" label="操作" fixed="right" >
				<template slot-scope="scope">
					<el-button v-show="scope.row.auditStatus==0" size="mini"  type="text"
										@click="open(scope.row)">审核
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="load-more">
			<div></div>
			<sac-pagination v-show="listData.list.length>0"
				@handleChange="getPaginationChange"
				:total="+listData.total"
				:page-size="filterForm.pageSize"
				:current-page="filterForm.pageNum">
			</sac-pagination>
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
				coinName:'',
				tradeType:'',
				apiOrderId:'',
				phoneOrEmail:'',
				startDate:'',
				endDate:'',
				pageNum:1,
				pageSize:10
			},
			selectedDate:[],
			typeList:[
				{label:'匹配兑出',value:1},
				{label:'抢单兑出',value:2}
			],
			coinList:['USDT','BTC'],
			listData: {
				total: null,
				list: [],
			},
		}
	},
	mounted(){
		this.getCashoutAuditList()
	},
	methods:{
		getCashoutAuditList() {
			this.$http.post('/wallet/backmgr/merchant/getCashoutAuditList', this.filterForm).then((res) => {
				const { list, total } = res.result
				this.listData.list = list
				this.listData.total = total
			})
		},
		search(){
			if(this.selectedDate.length == 2 ){
				this.filterForm.startDate = this.selectedDate && this.$fmtDate(this.selectedDate[0].getTime())+' 00:00:00'
				this.filterForm.endDate = this.selectedDate && this.$fmtDate(this.selectedDate[1].getTime())+' 23:59:59'
			}
			this.filterForm.pageNum = 1
			this.getCashoutAuditList()
		},
		getPaginationChange(val, currentPage){
			this.filterForm.pageSize = val;
			this.filterForm.pageNum = currentPage;
			this.getCashoutAuditList()
		},
		open(data) {
			this.$prompt('不通过原因', '审核', {
				confirmButtonText: '通过',
				cancelButtonText: '不通过',
			}).then(({ value }) => {
				console.log(value)
				this.verify(1,data.recdId,value)
			}).catch(({ value }) => {    
				this.verify(2,data.recdId,value) 
			});
		},
		verify(status,recdId,remark){
			this.$http.post('/wallet/backmgr/merchant/updateCashoutAuditStatus', {
				recdId:recdId,
				remark:remark||'',
				status:status
			}).then((res) => {
				this.getCashoutAuditList()
				this.$message({
					type: 'success',
					message: res.msg
				});
			})
			
		}
	},
	watch:{

	},
	computed:{

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
		width: 436px;
	}
	.load-more {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .count {
            font-size: 14px;
            span {
                margin-right: 20px;
                i {
                    font-style: normal;
                    color: #436bff;
                    font-weight: 600;
                }
            }
        }
    }
}
</style>