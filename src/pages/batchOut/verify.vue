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
					<el-button class="btn" type="primary" @click="search()" size="mini" style="margin-left: 20px;">查询</el-button>
					<el-button type="primary" @click.native="exportExcel" size="mini" icon="el-icon-document-checked">导出Excel</el-button>
				</el-form>
			</el-collapse-item>
    	</el-collapse>
        
        <div class="tabBox">
            <el-tabs v-model="filterForm.status" @tab-click="getCashoutAuditList">
                <el-tab-pane label="待审核" name="1"></el-tab-pane>
                <el-tab-pane label="待确认" name="3"></el-tab-pane>
            </el-tabs>
            <div v-if="filterForm.status==1">
                <el-button class="btn" type="primary"  :disabled=" multipleSelection.length==0 " @click="open()" size="mini" style="margin: 0px;margin-left: 20px;">选中单审核</el-button>
            </div>
            <div v-if="filterForm.status==3">
                <el-button class="btn" type="primary"  :disabled=" multipleSelection.length==0 " @click="ConfirmPaymentMethod()" size="mini" style="margin: 0px;margin-left: 20px;">选中单确定代付</el-button>
                <el-button class="btn" type="primary"  :disabled=" multipleSelection.length==0 " @click="ConfirmPayment()" size="mini" style="margin: 0px;margin-left: 20px;">选中单确认付款</el-button>
            </div>
        </div>
		<el-table height="auto" size="mini" border :data="listData.list" @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="center" width="55"></el-table-column>
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
					<p>数量:<span>{{scope.row.price}}</span> CNY/{{ scope.row.coinName }}</p>
					<p>金额:<span>{{scope.row.amount}}</span> {{ scope.row.coinName }}</p>
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
            <el-table-column align="center" label="操作" fixed="right" :width="filterForm.status==3?'150':'70'">
				<template slot-scope="scope">
					<el-button v-if="filterForm.status==1" size="mini" type="text" @click="open([scope.row])">审核</el-button>
                    <el-button v-if="filterForm.status==3" size="mini" type="text" @click="ConfirmPaymentMethod([scope.row])">确定代付</el-button>
                    <el-button v-if="filterForm.status==3" v-show="scope.row.status==4||scope.row.status==6" size="mini" type="text" @click="ConfirmPayment([scope.row])">确认付款</el-button>
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
		<el-dialog title="是否通过审核？" :visible.sync="dialogVisible" width="400px">
			<el-input type="textarea" :rows="2" placeholder="请输入审核意见" v-model="reason"></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button type="danger" @click="auditBatchOutList(2)">不通过</el-button>
				<el-button type="primary" @click="auditBatchOutList(1)">通 过</el-button>
			</span>
		</el-dialog>
		<el-dialog  :visible.sync="dialogVisible2" width="400px">
			<el-form    label-width="130px">
                <el-form-item label="选择代付方式:"  prop="type">
                    <el-select v-model="batchOutType" placeholder="请选择代付方式">
                        <el-option label="手动" value="MANUAL"></el-option>
                        <el-option label="第三方" value="THIRD_ONE"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-show="batchOutType=='MANUAL'" label="选择银行模板:"  prop="type">
                    <el-select v-model="bankStencilPlate" placeholder="选择银行模板">
                        <el-option label="包网" value="XINGYE"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="danger" @click="dialogVisible2 = false">关闭</el-button>
				<el-button type="primary" @click="chooseBatchOutList()">确定</el-button>
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
            baseUrl:'',
			filterForm:{
				status:'1',
				batchOuttype:'',
				recdId:'',
				phoneOrNick:'',
				startDate:'',
				endDate:'',
				pageNum:1,
				pageSize: 20,
            },
            batchOutType:'',
            bankStencilPlate:'',
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
			currentItem: {},
			reason: "",  //审核理由
			matchResultMap: matchResultMap,
			sumInfo: {
				sumApiStock: "--",
				sumApiAmount: "--",
				sumFee: "--"
            },
            multipleSelection:[]
		}
	},
	activated(){
		// this.selectedDate = getTodayTime()
        this.getCashoutAuditList()
        this.baseUrl = localStorage.getItem('SERVER_PATH') || window.SERVER_PATH|| window.SERVER_PATH2
	},
	methods:{
        handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
		getCashoutAuditList() {
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
        exportExcel2(redisKey,type){
            let filterForm = { redisKey:redisKey,type:type,token:localStorage.getItem('wallet_token') || "" }
            window.open(this.baseUrl + 'wallet/app/otc/backmgr/batchOut/manualExcle?' + qs.stringify(filterForm))
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
            if(data){
                this.currentItem = data
            }else{
                this.currentItem = ''
            }
			this.reason = ''
			this.dialogVisible = true
        },
        ConfirmPaymentMethod(data){
            let arr = this.multipleSelection
            if(data){
                arr = data
                this.currentItem = data
            }else{
                this.currentItem = ''
            }
            let hasConfirm = false
            arr.forEach((item)=>{
                if(item.status==6||item.status==4){
                    hasConfirm = true
                }
            })
            if(hasConfirm){
                this.$confirm(`你所购选订单包含已确认代付过的订单，确定再次确认？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.dialogVisible2=true
                    this.batchOutType=''
                    this.bankStencilPlate=''
                })
            }else{
                this.dialogVisible2=true
                this.batchOutType=''
                this.bankStencilPlate=''
            }
        },
        chooseBatchOutList(){
            if(this.batchOutType==''){
                this.$message({
					type: 'error',
					message: '请选择代付方式'
                });
                return
            }
            if(this.batchOutType=='MANUAL'&&this.bankStencilPlate==''){
                this.$message({
					type: 'error',
					message: '请选择银行模版'
                });
                return
            }
            let arr = this.multipleSelection
            if(this.currentItem.length>0){
                arr = this.currentItem
            }
            let recdIdlist = []
            arr.forEach((item)=>{
                recdIdlist.push(item.recdId)
            })
            this.$http.post("/wallet/app/otc/backmgr/batchOut/chooseBatchOutList", {
                batchOutType:this.batchOutType,
                recdIdlist:recdIdlist,
                postDataType:'Bean'
            }).then((res) => {
                this.dialogVisible2 = false
				this.getCashoutAuditList()
				this.$message({
					type: 'success',
					message: res.msg
                });
                if(this.batchOutType=='MANUAL'){
                    this.exportExcel2(res.result,this.bankStencilPlate)
                }
            }).catch(err=>{
				this.dialogVisible2 = false
				console.log(err)
			})
        },
        ConfirmPayment(data){
            let arr = this.multipleSelection
            if(data){
                arr = data
                this.currentItem = data
            }else{
                this.currentItem = ''
            }
            let hasConfirm = false
            arr.forEach((item)=>{
                if(item.status==6||item.status==3){
                    hasConfirm = true
                }
            })
            if(hasConfirm){
                this.$confirm(`你所勾选订单包含待确认、待第三方确认的订单，此操作将跳过这些订单，继续确认付款请按确定按钮？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.confirmBatchOutList()
                })
            }else{
                this.confirmBatchOutList()
            }
        },
        confirmBatchOutList(){
            let arr = this.multipleSelection
            if(this.currentItem.length>0){
                arr = this.currentItem
            }
            let recdIdlist = []
            arr.forEach((item)=>{
                recdIdlist.push(item.recdId)
            })
            this.$http.post("/wallet/app/otc/backmgr/batchOut/confirmBatchOutList", {
                recdIdlist:recdIdlist,
                manualOrThird:1,
                postDataType:'Bean'
            }).then((res) => {
				this.getCashoutAuditList()
				this.$message({
					type: 'success',
					message: res.msg
                });
            }).catch(err=>{
				console.log(err)
			})
        },
		auditBatchOutList(status){
            let arr = this.multipleSelection
            if(this.currentItem.length>0){
                arr = this.currentItem
            }
            let recdIdlist = []
            arr.forEach((item)=>{
                recdIdlist.push(item.recdId)
            })
			this.$http.post('/wallet/app/otc/backmgr/batchOut/auditBatchOutList', {
				recdIdlist:  recdIdlist,
				remauditCommentark: this.reason,
                auditStatus:status,
                postDataType:'Bean'
			}).then((res) => {
				this.dialogVisible = false
				this.getCashoutAuditList()
				this.$message({
					type: 'success',
					message: res.msg
				});
			}).catch(err=>{
				this.dialogVisible = false
			})
			
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
    .tabBox{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
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