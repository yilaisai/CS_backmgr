<template>
	<div class="blacklist-page">
		<el-form :inline="true"  ref="filterForm" :model="filterForm" label-width="86px" size="mini">
			<el-form-item label="appid:" >
				<el-input placeholder="请输入appid" v-model="filterForm.appid" class="input-with-select"></el-input>
			</el-form-item>
			<el-form-item><el-button  type="primary" size="mini" @click.native="search">查询</el-button><el-button  type="primary" size="mini" @click.native="showDialog=true">新增</el-button></el-form-item>
		</el-form>
		<el-table stripe border height="100%" size="mini" :data="list" >
			<el-table-column prop="appId" label="appid" align="center"></el-table-column>
			<!-- <el-table-column prop="createTime" label="添加时间" align="center">
				<template slot-scope="scope">
					{{  $fmtDate(scope.row.createTime,'full')}}
				</template>
			</el-table-column> -->
			<el-table-column prop="appUserId" label="userid" align="center"></el-table-column>
			<el-table-column prop="ip" label="ip" align="center"></el-table-column>
			<el-table-column  label="状态" align="center">
				<template slot-scope="scope">
					<span class="status">{{ scope.row.foreverOrLimited == 1?'24小时':'永久' }}</span>
				</template>
			</el-table-column>
			
			<el-table-column  label="操作"  fixed="right" align="center" >
				<template slot-scope="scope">
					<el-button size="mini"  type="primary" @click="subCheckoutBlacklist(scope.row)" >解封</el-button>
				</template>
			</el-table-column>
		</el-table>
		 <el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="filterForm.pageNum"
				:page-size="filterForm.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total*1">
		</el-pagination>
		<el-dialog
			title="增加黑名单"
			:visible.sync="showDialog"
			width="700px">
			<el-form ref="form"  :inline="true"  :model="formData" label-width="86px" size="mini" >
				<el-form-item label="appId:" >
					<el-input placeholder="请输入appId" v-model="formData.appId" ></el-input>
				</el-form-item>
				<el-form-item label="userid:" >
					<el-input placeholder="请输入userid" v-model="formData.appUserId" ></el-input>
				</el-form-item>
				<el-form-item  label="状态:" >
					<el-select v-model="formData.foreverOrLimited" >
						<el-option value="1" label='24小时'></el-option>
						<el-option value="2" label='永久'></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="ip:" >
					<el-input placeholder="请输入ip" v-model="formData.ip" ></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showDialog = false">取 消</el-button>
				<el-button type="success" @click="addCheckoutBlacklist">确定增加</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
export default {
	components:{

	},
	data(){
		return {
			filterForm:{
				appid:'',
				pageNum:1,
				pageSize:20,
			},
			formData:{
				appId:'',
				appUserId:'',
				foreverOrLimited:'2',
				ip:'',
			},
			list:[],
			total:0,
			showDialog:false
		}
	},
	mounted(){
		this.getList()
	},
	methods:{
		handleCurrentChange(val) {
			this.filterForm.pageNum = val
			this.getList()
		},
		handleSizeChange(val) {
			this.filterForm.pageSize = val
			this.getList()
		},
		getList(){
			this.list = []
			this.$http.post("/wallet/backmgr/merchant/getCheckoutBlacklist",this.filterForm).then(res => {
				if(res.code == 200){
					console.log(res)
					this.list = res.result.list
					this.total = res.result.total
				}
			})
		},
		addCheckoutBlacklist(){
			if(this.formData.appId.trim()==''){
				this.$message({
					type: 'info',
					message: '请输入appId'
				}) 
				return
			}
			
			if(this.formData.appUserId.trim()==''&&this.formData.ip.trim()==''){
				this.$message({
					type: 'info',
					message: '请填写userid/ip'
				}) 
				return
			}
			this.$confirm(`增加后，满足该条件的用户将不可以发单，确定增加？`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$http.post("/wallet/backmgr/merchant/addCheckoutBlacklist",this.formData).then(res => {
					if(res.code == 200){
						this.$message({
							type: 'success',
							message: '添加成功'
						}) 
						this.filterForm.pageNum =  1
						this.getList()
						this.showDialog = false
					}else{
						this.$message({
							type: 'info',
							message: res.msg
						}) 
					}
				})
			})
			
		},
		subCheckoutBlacklist(data){
			let queryData = {appId:data.appId,appUserId:data.appUserId!='--'?data.appUserId:"",ip:data.ip!='--'?data.ip:""}
			this.$http.post("/wallet/backmgr/merchant/subCheckoutBlacklist",queryData).then(res => {
				if(res.code == 200){
					this.$message({
						type: 'success',
						message: '解封成功'
					}) 
					this.getList()
				}else{
					this.$message({
						type: 'info',
						message: res.msg
					}) 
				}	
			})
		},
		search(){
			if(this.filterForm.appid.trim()==''){
				return
			}
			this.filterForm.pageNum =  1
			this.getList()
		}
	},
	watch:{

	},
	computed:{

	}
	}
</script>
<style lang="less" scoped>
.blacklist-page{
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
}
</style>