<template>
    <div class='exchangeSAC'>
		<el-form :inline="true" label-width="90px" ref="filterForm" :model="filterForm" size="mini">
			<sac-input ref="phone" label="账号" v-model.trim="filterForm.phoneOrEmail"></sac-input>
			<sac-input ref="phone" label="用户编号" v-model.trim="filterForm.nickName"></sac-input>
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
      
		<!-- <el-table stripe border class="ExList" size="mini" :data="ExList">
			<el-table-column prop="phone" label="手机号" align="center"></el-table-column>
			<el-table-column prop="nickName" label="昵称" align="center"></el-table-column>
			<el-table-column label="用户类型" align="center">
				<template slot-scope="scope">{{scope.row.userType | userTypesFilter}}</template>
			</el-table-column>
			<el-table-column prop="usdtAmount" :label="$variableCoin" align="center"></el-table-column>
			<el-table-column prop="btcAmount"  label="BTC" align="center"></el-table-column>
			<el-table-column prop="registTime" label="时间" align="center">
				<template slot-scope="scope">
					{{  $fmtDate(scope.row.registTime,'full')}}
				</template>
			</el-table-column>
			<el-table-column  label="操作" width="180px" fixed="right" align="center">
				<template slot-scope="scope">
					<el-button size="mini" @click="$router.push({path:'/LegalCurrency/personalAssets',query:{userId:scope.row.userId}})" type="primary">详情</el-button>
				</template>
			</el-table-column>
		</el-table> -->

		<el-table stripe border height="100%" size="mini" :default-sort = "{prop: 'usdtAmount', order: 'descending'}" :data="listData.list" @sort-change='sortChange'>
			<el-table-column type="index" label="序号" :index="indexMethod" align="center"></el-table-column>
			<el-table-column prop="phone" label="手机号" align="center"></el-table-column>
			<el-table-column prop="nickName" label="用户编号" align="center"></el-table-column>
			<el-table-column label="用户类型" align="center">
				<template slot-scope="scope">{{scope.row.userType | userTypesFilter}}</template>
			</el-table-column>
			<el-table-column prop="usdtAmount" sortable='custom' :label="$variableCoin" align="center"></el-table-column>
			<el-table-column prop="btcAmount" sortable ='custom' label="BTC" align="center"></el-table-column>
			<el-table-column prop="userStatusName"  label="状态" align="center"></el-table-column>
			<el-table-column prop="registTime" label="时间" align="center">
				<template slot-scope="scope">
					{{  $fmtDate(scope.row.registTime,'full')}}
				</template>
			</el-table-column>
			<el-table-column  label="操作" width="180px" fixed="right" >
				<template slot-scope="scope">
					<el-button size="mini" @click="$router.push({path:'/LegalCurrency/personalAssets',query:{userId:scope.row.userId}})" type="primary">详情</el-button>
					<el-button size="mini" @click="modify(scope.row)" type="warning">修改状态</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="footer">
			<div class="total">
				<p v-for="(item,index) in totalData" :key="index"> <span class="coinName">{{item.coin_name}}</span> :可用{{item.sumAmount}} <span v-show="item.coin_name!=='RMT'">冻结{{ item.sumFrozenAmount }}</span></p>
			</div>
			<sac-pagination v-show="listData.list.length>0"
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
						label:'24小时锁定',
						value:1
					},
					{
						label:'永远锁定',
						value:2
					}
				],
				filterForm: {
					nickName: '',
					phoneOrEmail: '',
					pageNum: 1,
					pageSize: 20,
					userType: null,
					order:'desc'//和asc
				},
				coinType:'BTC',
				listData: {
					total: null,
					list: [],
				},
				ExList:[],
				totalData:[],
				userTypes
			};
        },
		methods: {
			exportExcel(){
				let param = '';
        for(let v in this.filterForm) {
          if(this.filterForm[v]&&v!=='pageNum'&&v!=='pageSize'){
            param += v + '=' + this.filterForm[v] + '&';
          }
        }
        console.log(param)
				let baseURL = localStorage.getItem('SERVER_PATH') || SERVER_PATH
				window.open(baseURL+'/wallet/app/otc/backmgr/getUserRaking/export?'+param+'token='+localStorage.getItem('wallet_token'))
			},
			indexMethod(index) {
				return   (this.filterForm.pageNum-1)*this.filterForm.pageSize+index+1
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
					this.filterForm.coinName = this.$variableCoin
				}
				// this.filterForm.pageSize = 1;
				this.filterForm.pageNum = 1;
				this.getUserRaking();
			},
			dialogConfirm(){
				this.ruleState.forEach(v=>{
					if(v.value==this.ruleForm.status){
						this.ruleForm.reason=v.label
						return
					}
				})
				//console.log(this.ruleForm)
				this.$refs.ruleForm.validate(valid => {
					if (valid) {
					this.$http.post("/wallet/app/otc/backmgr/setCustomStatus", this.ruleForm).then(res => {
						this.$notify({
							title: "成功",
							message: `修改成功`,
							type: "success"
						});
							this.dialogVisible = false;
							this.getUserRaking();
						});
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			},
			getPaginationChange(val, currentPage) {
				console.log(11)
				this.filterForm.pageSize = val;
				this.filterForm.pageNum = currentPage;
				this.getUserRaking();
			},
			modify(itemData){
				this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
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
				this.$http.post("/wallet/app/otc/backmgr/getUserRaking", this.filterForm).then((res) => {
					this.totalData = res.result.sumInfo
					this.listData.list = res.result.CustomerInfoExList.list;
					this.ExList = res.result.sysCustomerInfoExList
					this.listData.total = res.result.CustomerInfoExList.total;
				})
			},
			detail(data){
				console.log(data)
			}
		},
		activated() {
			this.getUserRaking();      // 查询代理用户列表
		}
    };
</script>
<style lang="less">
	.exchangeSAC {
		overflow: hidden;
		/deep/.ExList{
			flex: none;
		}
		.footer{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			.total{
				p{
					display: inline;
					margin-right: 20px;
					line-height: 24px;
					font-size: 14px;
					color: #606266;
					&:last-of-type{
						margin: 0;
					}
					span.coinName{
						font-weight: 600;
						color: #409EFF;
					}
				}
				
			}
			 /deep/.el-pagination{
        margin-top: 10px;
      }
		}
	}
</style>
