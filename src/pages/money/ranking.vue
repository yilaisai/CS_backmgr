<template>
    <div class='exchangeSAC'>
		<el-form :inline="true" label-width="105px" ref="filterForm" :model="filterForm" size="mini">
			<sac-input ref="phone" label="账号/用户编号" v-model.trim="filterForm.account"></sac-input>
			<!-- <sac-input ref="phone" label="昵称" v-model.trim="filterForm.nickName"></sac-input> -->
			<el-form-item label="用户类型：">
				<el-select v-model="filterForm.userType" placeholder="选择订单状态" clearable style="width: 178px">
					<el-option :value="null" label="全部"></el-option>
					<el-option v-for="(item, key) in userTypes" :key="key" :value="key" :label="item"></el-option>
				</el-select>
			</el-form-item>
			<sac-submit-form :isReset='false' @submitForm="getUserRaking()"></sac-submit-form>
			<el-form-item>
				<el-button type="primary" size="mini" @click="exportExcel">导出EXCEL</el-button>
			</el-form-item>
		</el-form>
		<el-table stripe border height="100%" size="mini" :default-sort = "{prop: 'rmtAmount', order: 'descending'}" :data="listData.list" @sort-change='sortChange'>
			<el-table-column align="center" type="index" label="序号" :index="indexMethod"></el-table-column>
			<el-table-column prop="phone" label="账号" align="center"></el-table-column>
			<el-table-column prop="nick_name" label="用户编号"  align="center"></el-table-column>
			<el-table-column prop="nick_name" label="用户类型" align="center">
				<template slot-scope="scope">{{scope.row.user_type | userTypesFilter}}</template>
			</el-table-column>
			<el-table-column prop="rmtAmount" sortable='custom' :label="$variableCoin">
				<div class="scope" slot-scope="scope">
					<p>可用:{{ scope.row.usdtAmount }}</p>
					<p>冻结:{{ scope.row.usdtFrozenAmount }}</p>
				</div>
			</el-table-column>
			<el-table-column prop="btcAmount" sortable ='custom' label="BTC">
				<div class="scope" slot-scope="scope">
					<p>可用:{{ scope.row.btcAmount }}</p>
					<p>冻结:{{ scope.row.btcFrozenAmount }}</p>
				</div>
			</el-table-column>
			<el-table-column prop="ethAmount" sortable ='custom' label="ETH">
				<div class="scope" slot-scope="scope">
					<p>可用:{{ scope.row.ethAmount }}</p>
					<p>冻结:{{ scope.row.ethFrozenAmount }}</p>
				</div>
			</el-table-column>
			<el-table-column prop="eosAmount" sortable ='custom' label="EOS">
				<div class="scope" slot-scope="scope">
					<p>可用:{{ scope.row.eosAmount }}</p>
					<p>冻结:{{ scope.row.eosFrozenAmount }}</p>
				</div>
			</el-table-column>
			<el-table-column  label="操作" width="80px" fixed="right"  align="center">
				<template class="scope" slot-scope="scope">
					<!-- <el-button size="mini" @click="modify(scope.row)" >修改状态</el-button> -->
					<el-button size="mini" @click="$router.push({path:'/LegalCurrency/personalAssets',query:{userId:scope.row.user_id}})" >详情</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="load-more">
			<p class="total"> <span>{{this.$variableCoin}}：</span> 可用{{rmtAmount}}   冻结{{rmtFrozenAmount}}    <span>BTC：</span> 可用{{btcAmount}}    冻结{{btcFrozenAmount}}      <span>ETH：</span>可用{{ethAmount}}   冻结{{ethFrozenAmount}}    <span>EOS：</span>可用{{eosAmount}}   冻结{{eosFrozenAmount}} </p>
			<sac-pagination v-show="listData.list.length > 0"
				@handleChange="getPaginationChange"
				:total="+listData.total"
				:page-size="filterForm.pageSize"
				:current-page="filterForm.pageNum">
			</sac-pagination>
		</div>
		<el-dialog title="修改用户状态" :visible.sync="dialogVisible" width="500">
			<el-form :inline="true" label-width="90px" ref="ruleForm"  :model="ruleForm">
				<el-form-item label="状态调整:" prop="status">
					<el-select v-model="ruleForm.status">
						<el-option :label="item.label" :value="item.value" v-for="(item,index) in ruleState" :key="index"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogConfirm">确认</el-button>
			</span>
		</el-dialog>
    </div>
</template>
<script>
import {userTypes} from '@/common/constants'
export default {
	name: "exchangeSAC",
	data() {
		return {
			dialogVisible:false,
			ruleForm:{
				userId:'',
				reason:'',
				status:0
			},
			ruleState:[
				{
					label:'正常状态',
					value:0
				},
				{
					label:'24小时冻结',
					value:1
				},
				{
					label:'永远冻结',
					value:2
				}
			],
			filterForm: {
				nickName: '',
				phoneOrEmail: '',
				phone: '',
				pageNum: 1,
				pageSize: 20,
				account: '',
				coinName:'RMT',//'BTC'
				order:'desc',//和asc
				userType: null
			},
			coinType:'BTC',
			listData: {
				total: null,
				list: [],
			},
			ExList:[],
			rmtAmount:0,
			rmtFrozenAmount:0,
			eosAmount:0,
			eosFrozenAmount:0,
			btcAmount:0,
			btcFrozenAmount:0,
			ethAmount:0,
			ethFrozenAmount:0,
			userTypes
		}
	},
	methods: {
		exportExcel(){
			let param = '';
			for(let v in this.filterForm) {
				if(this.filterForm[v]&&v!=='pageNum'&&v!=='pageSize'){
					param += v + '=' + this.filterForm[v] + '&';
				}
				
			}
			let baseURL = localStorage.getItem('SERVER_PATH') || SERVER_PATH
			console.log(baseURL+'/wallet/backmgr/personalRanking/export?'+param+'token='+localStorage.getItem('wallet_token'))
			window.open(baseURL+'/wallet/backmgr/personalRanking/export?'+param+'token='+localStorage.getItem('wallet_token'))
		},
		indexMethod(index) {
			return (this.filterForm.pageNum-1)*this.filterForm.pageSize+index+1
		},
		sortChange(a){
			if(a.order=="ascending"){//上升
				this.filterForm.order = 'asc'
			}else{//下降
				this.filterForm.order = 'desc'
			}
			if(a.prop=="btcAmount"){
				this.filterForm.coinName = 'BTC'
			}else{
				this.filterForm.coinName = 'RMT'
			}
			this.filterForm.pageNum = 1
			this.getUserRaking()
		},
		dialogConfirm(){
			this.ruleState.forEach(v=>{
				if(v.value==this.ruleForm.status){
					this.ruleForm.reason=v.label
					return
				}
			})
			this.$refs.ruleForm.validate(valid => {
				if (valid) {
					this.$http.post("/wallet/app/otc/backmgr/setCustomStatus", this.ruleForm).then(res => {
						this.$notify({
							title: "成功",
							message: `修改成功`,
							type: "success"
						})
						this.dialogVisible = false
						this.getUserRaking()
					})
				} else {
					return false
				}
			})
		},
		getPaginationChange(val, currentPage) {
			this.filterForm.pageSize = val
			this.filterForm.pageNum = currentPage
			this.getUserRaking()
		},
		modify(itemData){
			this.$refs.ruleForm && this.$refs.ruleForm.resetFields()
			let default_status=0
			this.ruleState.forEach(v=>{
				if(v.label==itemData.userStatusName){
					default_status=v.value
					return
				}
			})
			this.ruleForm.userId=itemData.userId
			this.ruleForm.status=default_status
			this.dialogVisible=true
		},
		// 查询代理用户列表
		getUserRaking() {
			this.$http.post("/wallet/backmgr/personalRanking", this.filterForm).then((res) => {
				this.listData.list = res.result.pageInfo.list
				this.ExList = res.result.sysList
				this.listData.total = res.result.pageInfo.total
				this.rmtAmount=res.result.rmtAmount
				this.rmtFrozenAmount=res.result.rmtFrozenAmount
				this.eosAmount=res.result.eosAmount
				this.eosFrozenAmount=res.result.eosFrozenAmount
				this.btcAmount=res.result.btcAmount
				this.btcFrozenAmount=res.result.btcFrozenAmount
				this.ethAmount=res.result.ethAmount
				this.ethFrozenAmount=res.result.ethFrozenAmount
			})
		},
	},
	activated() {
		this.getUserRaking()      // 查询代理用户列表
	}
}
</script>
<style lang="less">
.exchangeSAC {
	overflow: hidden;
	overflow-y: scroll;

	/deep/.ExList{
		flex: none;
	}
	/deep/ .scope{
		p{
			margin: 0;
		}
	}
	.load-more {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
		align-items: center;
		.total{
			margin:0;
			// height: 30px;
			line-height: 26px;
			font-size: 14px;
			color: #606266;
			span{
				font-weight: 600;
				margin-left: 15px;
				color: #409EFF;
				&:first-of-type{
					margin-left: 0;
				}
			}
		}
		.el-pagination {
			margin: 0;
		}
	}
}
</style>
