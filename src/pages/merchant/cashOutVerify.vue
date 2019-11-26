<template>
	<div class="cashOutVerify-page">
		<el-collapse value="filter">
			<el-collapse-item title="查询条件" name="filter">
				<el-form :inline="true" label-width="86px" ref="filterForm" size="mini" :model="filterForm">
					<el-form-item label="账号:" >
						<el-input placeholder="请输入用户账号" v-model="filterForm.phoneOrEmail" ></el-input>
					</el-form-item>
					<el-form-item label="类型:" >
						<el-select v-model="filterForm.tradeType" >
							<el-option value="" label='所有'></el-option>
							<el-option v-for="(item, key) in typeList" :key="key" :value="item.value" :label="item.label "></el-option>
						</el-select>
					</el-form-item>
					<!-- <el-form-item  label="币种:" >
						<el-select v-model="filterForm.coinName" >
								<el-option value="" label='所有'></el-option>
								<el-option v-for="(item, key) in coinInfo" :key="key" :value="item.coinName" :label="item.coinName"></el-option>
						</el-select>
					</el-form-item> -->
					<!-- <br /> -->
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
					<el-form-item label="商户订单号:" >
						<el-input placeholder="请输入商户订单号" v-model="filterForm.apiOrderId" ></el-input>
					</el-form-item>
					<el-button class="btn" type="primary" @click="search()" size="mini" style="margin-left: 20px;">查询</el-button>
				</el-form>
			</el-collapse-item>
    	</el-collapse>
		<el-table height="auto" size="mini" border :data="listData.list">
			<el-table-column align="center"  label="类型" width="80">
				<div slot-scope="scope"> {{scope.row.advType==3?'抢单兑出':scope.row.advType==4?'抢单兑入':scope.row.advType==5?'派单兑入':scope.row.advType==6?'派单兑出':''}} </div>
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
					{{scope.row.matchResult==0?'待审核':scope.row.matchResult==1?'匹配中':scope.row.matchResult==2?'匹配成功':scope.row.matchResult==3?'匹配失败':scope.row.matchResult==4?'发起中断':scope.row.matchResult==5?'IP不匹配':'审核失败'}}
				</div>
			</el-table-column>
			<el-table-column align="center"  label="价格/数量/金额" >
				<div class="price" slot-scope="scope">
					<!-- <span>{{scope.row.apiPrice}}<br /></span> -->
					<p>价格:<span>{{scope.row.apiPrice }}</span> CNY/{{ scope.row.coinName }}</p>
					<p>数量:<span>{{scope.row.apiStock}}</span> {{ scope.row.coinName }}</p>
					<p>金额:<span>{{scope.row.apiAmount}}</span> CNY</p>
				</div>
			</el-table-column>
			<!-- <el-table-column align="center" prop="apiAmount" label="金额"></el-table-column> -->
			<el-table-column align="center" prop="coinName" width="80" label="币种"></el-table-column>
			<el-table-column align="center" prop="fee" label="手续费"></el-table-column>
			<!-- <el-table-column align="center" prop="auditUserName" label="操作人"></el-table-column> -->
			<el-table-column align="center" label="操作" fixed="right" >
				<template slot-scope="scope">
					<el-button type="text" v-show="scope.row.advType==4||scope.row.advType==5" @click="showIP(scope.row)">查看</el-button>
					<el-button v-show="scope.row.matchResult==0&&(scope.row.advType==3||scope.row.advType==6)" size="mini" type="text" @click="open(scope.row)">审核</el-button>
					<el-button v-show="scope.row.matchResult==1" size="mini" type="text" @click="close(scope.row)">取消订单</el-button>
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
export default {
	data(){
		return {
			filterForm:{
				coinName:'RMT',
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
			listData: {
				total: null,
				list: [],
			},
			dialogVisible: false,
			dialogVisible2:false,
			dialogVisible3:false,
			currentItem: {},
			reason: "",  //审核理由
		}
	},
	activated(){
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
	watch:{

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
	/deep/ .el-collapse-item__header {
		font-size: 14px;
		font-weight: 600;
		padding: 0 10px;
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