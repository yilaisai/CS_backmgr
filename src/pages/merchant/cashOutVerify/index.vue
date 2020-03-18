<template>
	<div class="cashOutVerify-page">
		<el-collapse value="filter">
			<el-collapse-item title="查询条件" name="filter">
				<el-form :inline="true" label-width="86px" ref="filterForm" size="mini" :model="filterForm">
					<el-form-item label="账号:" >
						<el-input placeholder="请输入用户账号" v-model="filterForm.phoneOrEmail" ></el-input>
					</el-form-item>
					<el-form-item label="类型:">
						<el-select v-model="filterForm.advType" :disabled="tabs == 1">
							<el-option value="" label='所有'></el-option>
							<el-option v-for="(item, key) in typeList" :key="key" :value="item.value" :label="item.label "></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="商户订单号:" >
						<el-input placeholder="请输入商户订单号" v-model="filterForm.apiOrderId" ></el-input>
					</el-form-item>
					<!-- <el-form-item  label="币种:" >
						<el-select v-model="filterForm.coinName" >
								<el-option value="" label='所有'></el-option>
								<el-option v-for="(item, key) in coinInfo" :key="key" :value="item.coinName" :label="item.coinName"></el-option>
						</el-select>
					</el-form-item> -->
					<br />
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
					<el-form-item label="状态:" >
						<el-select v-model="filterForm.matchResult" :disabled="tabs == 1">
							<el-option value="" label='所有'></el-option>
							<el-option v-for="(item, key) in matchResultMap" :key="key" :value="key" :label="item"></el-option>
						</el-select>
					</el-form-item>
					<el-button class="btn" type="primary" @click="search()" size="mini" style="margin-left: 20px;">查询</el-button>
					<el-button type="primary" @click.native="exportExcel" size="mini" icon="el-icon-document-checked">导出Excel</el-button>
					<el-button type="primary" @click.native="batchAudit" size="mini" :disabled="tabs != 1">批量审核</el-button>
				</el-form>
			</el-collapse-item>
		</el-collapse>
		<el-tabs v-model="tabs" @tab-click="chooseTabs">
				<el-tab-pane label="全部" name="0"></el-tab-pane>
				<el-tab-pane label="兑出待审核" name="1"></el-tab-pane>
		</el-tabs>
		<el-table height="auto" size="mini" border :data="listData.list" @selection-change="handleSelectionChange">
			<el-table-column type="selection" align="center" v-if="tabs == 1"></el-table-column>
			<el-table-column align="center"  label="类型" width="80">
				<div slot-scope="scope"> {{scope.row.advType==3?'抢单兑出':scope.row.advType==4?'抢单兑入':scope.row.advType==5?'派单兑入':scope.row.advType==6?'派单兑出':''}} </div>
			</el-table-column>
			<el-table-column align="center"  label="商户订单号/发起时间" width="160">
				<template slot-scope="scope">
					<span>{{scope.row.apiOrderId}}<br />{{$fmtDate(scope.row.createTime, 'full')}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center"  label="商户用户编号/账户" width="130">
				<template slot-scope="scope">
					<span>{{scope.row.nickName}}<br />{{scope.row.phoneOrEmail}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center"  label="状态" width="100">
				<template slot-scope="scope">
					{{matchResultMap[scope.row.matchResult]}}
				</template>
			</el-table-column>
			<el-table-column align="center"  label="数量/金额" >
				<div class="price" slot-scope="scope">
					<p>数量:<span>{{scope.row.apiStock}}</span> {{ scope.row.coinName }}</p>
					<p>金额:<span>{{scope.row.apiAmount}}</span> CNY</p>
				</div>
			</el-table-column>
			<el-table-column align="center"  label="价格" width="120">
				<div class="price" slot-scope="scope">
					<p><span>{{scope.row.apiPrice }}</span> CNY/{{ scope.row.coinName }}</p>
				</div>
			</el-table-column>
			<el-table-column prop="api_user_id" label="appUserId/收银台ip" align="center">
				<div slot-scope="scope">
					<span>{{scope.row.apiUserId}}</span><br />
					<span>{{scope.row.apiIp}}</span>
				</div>
			</el-table-column>
			<!-- <el-table-column align="center" prop="apiAmount" label="金额"></el-table-column> -->
			<el-table-column align="center" prop="coinName" width="80" label="币种"></el-table-column>
			<el-table-column align="center" prop="fee" label="手续费"></el-table-column>
			<!-- <el-table-column align="center" prop="auditUserName" label="操作人"></el-table-column> -->
			<el-table-column align="center" label="操作" fixed="right">
				<template slot-scope="scope">
					<!-- <el-button type="text" v-show="scope.row.advType==4||scope.row.advType==5" @click="showIP(scope.row)">查看</el-button> -->
					<el-button :disabled=" !(scope.row.matchResult == 0 && (scope.row.advType==3||scope.row.advType==6))" size="mini" type="text" @click="open(scope.row)">审核</el-button>
					<!-- <el-button :disabled="scope.row.matchResult != 1" size="mini" type="text" @click="close(scope.row)">取消订单</el-button> -->
				</template>
			</el-table-column>
		</el-table>
		<div class="load-more">
			<div class="count">
				总数量： <span>{{sumInfo.sumApiStock}} {{$variableCoin}}</span>
				总金额： <span>{{sumInfo.sumApiAmount}} CNY</span>
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
		<el-dialog title="提示" :visible.sync="dialogVisible" width="400px">
			<el-input type="textarea" :rows="2" placeholder="请输入不通过理由" v-model="reason"></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button type="danger" @click="verify(2)">不通过</el-button>
				<el-button type="primary" @click="verify(1)">通 过</el-button>
			</span>
		</el-dialog>
		<el-dialog title="提示" :visible.sync="dialogVisible2" width="400px">
			<el-input type="textarea" :rows="2" placeholder="请输入取消原因" v-model="reason"></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button type="danger" @click="dialogVisible2 = false">关闭</el-button>
				<el-button type="primary" @click="cancelAdv()">确定取消</el-button>
			</span>
		</el-dialog>
		<el-dialog title="提示" :visible.sync="dialogVisible3" width="400px">
			<div class="ipInfo">
					<p>
						<span>商户用户IP：</span>{{this.currentItem.apiIp}}
					</p>
					<p>
						<span>IP地址：</span>{{this.currentItem.apiLocal}}
					</p>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="danger" @click="dialogVisible3 = false">关闭</el-button>
			</span>
		</el-dialog>
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
				coinName:this.$variableCoin,
				advType:'',
				apiOrderId:'',
				phoneOrEmail:'',
				startDate:'',
				endDate:'',
				pageNum:1,
				pageSize: 20,
				matchResult: ''
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
			dialogVisible: false,
			dialogVisible2:false,
			dialogVisible3:false,
			currentItem: {},
			reason: "",  //审核理由
			matchResultMap: matchResultMap,
			sumInfo: {
				sumApiStock: "--",
				sumApiAmount: "--",
				sumFee: "--"
			},
			tabs:0,
			selectList:[],
		}
	},
	activated(){
		this.selectedDate = getTodayTime()
		this.getCashoutAuditList()
	},
	methods:{
		getCashoutAuditList() {
			if(this.selectedDate && this.selectedDate.length == 2 ){
				this.filterForm.startDate = this.selectedDate[0]
				this.filterForm.endDate = this.selectedDate[1]
			}else {
				this.filterForm.startDate = null
				this.filterForm.endDate = null
			}
			this.$http.post('/wallet/backmgr/merchant/getCashoutAuditList', this.filterForm).then((res) => {
				const { list, total } = res.result.pageInfo
				this.listData.list = list
				this.listData.total = total
				if(list.length<1){
					this.sumInfo = {sumApiStock: "0",sumApiAmount: "0",sumFee: "0"}
				}else{
					this.sumInfo = res.result.sumInfo
				}
				
			})
		},
		// 导出excel
		exportExcel() {
			if(this.selectedDate && this.selectedDate.length == 2 ){
				// this.filterForm.startDate = this.selectedDate && this.$fmtDate(this.selectedDate[0].getTime())+' 00:00:00'
				// this.filterForm.endDate = this.selectedDate && this.$fmtDate(this.selectedDate[1].getTime())+' 23:59:59'
				this.filterForm.startDate = this.selectedDate[0]
				this.filterForm.endDate = this.selectedDate[1]
			}
			this.filterForm.token = localStorage.getItem('wallet_token') || ""
			const baseUrl = localStorage.getItem('SERVER_PATH') || window.SERVER_PATH
			window.open(baseUrl + '/wallet/backmgr/merchant/getCashoutAuditList/export?' + qs.stringify(this.filterForm))
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
		open(data) {
			this.currentItem = data
			this.reason = ''
			this.dialogVisible = true
		},
		close(data){
			this.currentItem = data
			this.reason = ''
			this.dialogVisible2 = true
		},
		showIP(data){
			this.currentItem = data
			this.dialogVisible3 = true
		},
		
		cancelAdv(){
			this.$http.post('/wallet/backmgr/merchant/cancelAdv', {
				advId: this.currentItem.advId,
				remake: this.reason,
			}).then((res) => {
				this.dialogVisible2 = false
				this.getCashoutAuditList()
				this.$message({
					type: 'success',
					message: res.msg
				});
			}).catch(err=>{
				this.dialogVisible2 = false
				console.log(err)
			})
			
		
		},
		verify(status){
			if (!this.currentItem.recdId) {
				//批量审核
				let list = []
				this.selectList.forEach(el => {
					list.push(el.recdId)
				})
				this.$http.post('wallet/backmgr/merchant/updateCashoutAuditStatusBatch', {
					recdIds: list.join(','),
					remark: this.reason,
					status:status
				}).then( res => {
					this.dialogVisible = false
					this.getCashoutAuditList()
					this.$message({
						type: 'success',
						message: res.msg
					});
				}).catch( err => {
					this.dialogVisible = false
				})
			} else {
				//单笔审核
				this.$http.post('/wallet/backmgr/merchant/updateCashoutAuditStatus', {
					recdId: this.currentItem.recdId,
					remark: this.reason,
					status:status
				}).then((res) => {
					this.dialogVisible = false
					this.getCashoutAuditList()
					this.$message({
						type: 'success',
						message: res.msg
					});
				}).catch(err=>{
					this.dialogVisible = false
					console.log(err)
				})
			}
		},

		chooseTabs() {
			if (this.tabs == 0) {
				this.filterForm.matchResult = ''
				this.getCashoutAuditList()
			} else {
				this.filterForm.advType = ''
				this.filterForm.matchResult = '0'
				this.getCashoutAuditList()
			}
		},
		handleSelectionChange(selection){
			console.log(selection)
			this.selectList = selection
		},
		//批量审核
		batchAudit() {
			this.currentItem = {}
			if(!this.selectList.length) {
				this.$message.warning('请选择待审核订单！')
				return
			}
			this.dialogVisible = true
		}
	},
	computed:{
		...mapState(['coinInfo'])
	}
}
</script>
<style lang="less" scoped>
.cashOutVerify-page{
	overflow: hidden;
	/deep/ .el-tabs {
		.el-tabs__header {
			margin:0;
		}
	}
	
	.el-table{
		flex: 1;
	 	margin:0;
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
				color: #409EFF;
                    font-weight: 600;
                i {
                    font-style: normal;
                    color: #436bff;
                }
            }
        }
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