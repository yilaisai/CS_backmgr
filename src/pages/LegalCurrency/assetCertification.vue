<template>
	<div class="assetCertification-page">
		<el-form ref="form" :model="formData" label-width="85px" size="mini" inline>
			<el-form-item label="状态:">
				<el-select v-model="formData.status" >
						<el-option :label="item.label" :value="item.value" v-for="(item,index) in stateData" :key="index"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="账户/昵称:">
				<el-input v-model="formData.phone" placeholder="请输入账户或者昵称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="getData" style="margin-left: 20px">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="list" height="auto" border size="mini" style="min-width: 100%" :show-overflow-tooltip='true' >
			<el-table-column  label="账户/昵称" align="center" width="150">
				<div class="nickName" slot-scope="scope"> 
					<p>{{scope.row.phone}}</p>
					<p>{{scope.row.nickName}}</p>
				</div>
			</el-table-column>
			<el-table-column prop="amount" label="资产证明" align="center"></el-table-column>
			<el-table-column prop="auditStatus" label="状态" align="center" width="110">
				<template slot-scope="scope">{{ scope.row.auditStatus==0?'待审核':scope.row.auditStatus==1?'审核通过':scope.row.auditStatus==2?'审核失败':'资产证明已释放' }}</template>
			</el-table-column>
			<el-table-column label="申请操作" align="center" width="110">
				<template slot-scope="scope">{{ scope.row.optType==1?'充值资产证明':'申请取出' }}</template>
			</el-table-column>
			<el-table-column prop="createTime" label="申请时间" width="160" align="center">
				<template slot-scope="scope">{{ $fmtDate(scope.row.createTime,'full') }}</template>
			</el-table-column>
			<el-table-column prop="auditComment" label="备注" align="center"></el-table-column>
			<el-table-column  label="操作" fixed="right"  align="center">
				<template slot-scope="scope">
					<el-button v-if="scope.row.auditStatus==0" size="mini" type="text" @click="updateAuditAssetCeRecdStatus(scope.row.recdId,1)"> 通过审核 </el-button>
					<el-button v-if="scope.row.auditStatus==0" size="mini" type="text" @click="Refuse(scope.row.recdId)"> 拒绝审核 </el-button>
					<el-button v-if="scope.row.auditStatus==1" size="mini" type="text" @click="updateAuditAssetCeRecdStatus(scope.row.recdId,3)"> 释放资产证明 </el-button>
				</template>
			</el-table-column>
		</el-table>
		 <el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="formData.pageNum"
					:page-sizes="[20,50]"
					:page-size="formData.pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total*1">
			</el-pagination>
			<el-dialog title="操作理由" :visible.sync="dialogVisible">
				<p>拒绝理由：</p>
						<el-input
							type="textarea"
							:autosize="{ minRows: 2, maxRows: 4}"
							placeholder="请输入内容"
							v-model="dialogForm.auditComment">
						</el-input>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="updateAuditAssetCeRecdStatus(newRecdId,2) ">确 定</el-button>
				</div>
			</el-dialog>
	</div>
</template>
<script>
export default {
	components:{

	},
	data(){
		return {
			dialogForm:{
				auditComment:'',
				recdId:'',
				status:'',
			},
			dialogVisible:false,
			list:[],
			formData:{
				phone:'',
				pageSize:20,
				pageNum:1,
				status:'',//0 待审核 1 审核通过 2 审核失败 3资产证明已释放
			},
			stateData:[
				{label:'全部',value:''},
				{label:'待审核',value:0},
				{label:'审核通过',value:1},
				{label:'审核失败',value:2},
				{label:'资产证明已释放',value:3},
			],
			total:0,
			newRecdId:''

		}
	},
	mounted(){
		this.getData()
	},
	methods:{
		getData() {
			this.$http.post('/wallet/app/otc/backmgr/checkAuditAssetCeRecd', this.formData).then(res => {
				this.list = res.result.list
				this.total = res.result.total
			})
		},
		Refuse(id){
			this.newRecdId = id
			this.dialogVisible = true
		},
		updateAuditAssetCeRecdStatus(recdId,status){
			this.dialogForm.recdId = recdId
			this.dialogForm.status = status
			this.$http.post('/wallet/app/otc/backmgr/updateAuditAssetCeRecdStatus', this.dialogForm).then(res => {
				this.getData()
				this.$message(res.msg)
				this.dialogVisible = false
				if(res.code==200){
					this.$message.success(res.msg)
				}else{
					this.$message.error(res.msg)
				}
			})
		},
		handleCurrentChange(val) {
			this.formData.pageNum = val
			// this.getData()
		},
		handleSizeChange(val) {
			this.formData.pageSize = val
			// this.getData()
		},
	},
	watch:{

	},
	computed:{

	}
	}
</script>
<style lang="less" scoped>
.assetCertification-page{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
		.main{
			flex: 1;
			overflow: hidden;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
			background: #F6F9FC;
		
		}
		.nickName{
			p{
				margin: 0;
			}
		}
}
</style>