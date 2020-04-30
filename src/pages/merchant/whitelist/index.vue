<template>
	<div class="whitelist-page">
		<!-- 查询条件 -->
		<el-form :inline="true"  ref="filterForm" :model="filterForm" label-width="86px" size="mini">
			<el-form-item label="appid:" >
				<el-input placeholder="请输入appid" v-model="filterForm.appId" class="input-with-select"></el-input>
			</el-form-item>
			<el-form-item label="ip:" >
				<el-input placeholder="ip" v-model="filterForm.ip" class="input-with-select"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button  type="primary" size="mini" @click.native="search">查询</el-button>
				<el-button  type="primary" size="mini" @click.native="addItem">新增</el-button>
			</el-form-item>
		</el-form>
		<!-- 表格 -->
		<el-table stripe border height="100%" size="mini" :data="list" >
			<el-table-column prop="create_time" label="创建时间" align="center">
				<template slot-scope="scope">{{$fmtDate(scope.row.create_time, 'full')}}</template>
			</el-table-column>
			<el-table-column prop="app_id" label="appid" align="center"></el-table-column>
			<el-table-column prop="name" label="商户编号" align="center"></el-table-column>
			<el-table-column prop="ip" label="ip" align="center"></el-table-column>
			<el-table-column  label="操作"  fixed="right" align="center" >
				<template slot-scope="scope">
					<el-button size="mini" type="danger" @click="deleteItem(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页器 -->
		 <el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="filterForm.pageNum"
				:page-size="filterForm.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total*1">
		</el-pagination>
		<!-- 新增弹框 -->
		<el-dialog title="增加白名单" :visible.sync="showDialog" width="700px">
			<el-form ref="form"  :inline="true"  :model="formData" label-width="86px" size="mini" >
				<el-form-item label="appId:" >
					<el-input placeholder="请输入appId" v-model="formData.appId" @input="formData.appId = formData.appId.replace(/[^\d]/g,'')"></el-input>
				</el-form-item>
				<el-form-item label="商户编号:" >
					<el-input placeholder="请输入商户编号" v-model="formData.name" ></el-input>
				</el-form-item>
				<!-- <el-form-item  label="状态:" >
					<el-select v-model="formData.foreverOrLimited" >
						<el-option value="1" label='24小时'></el-option>
						<el-option value="2" label='永久'></el-option>
					</el-select>
				</el-form-item> -->
				<el-form-item label="ip:" >
					<el-input placeholder="请输入ip" v-model="formData.ip" ></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showDialog = false" size="small">取 消</el-button>
				<el-button type="success" @click="addCheckoutWhitelist"  size="small">确定增加</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
export default {
	data(){
		return {
			filterForm:{
				appId:'',
				ip: '',
				pageNum:1,
				pageSize:20,
			},
			formData:{
				appId:'',
				name:'',
				ip:'',
			},
			list:[],
			total:0,
			showDialog:false
		}
	},
	activated(){
		this.getList()
	},
	methods:{
		addItem(){
			this.formData = { appId:'',appUserId:'',foreverOrLimited:'2',ip:'' }
			this.showDialog=true
		},
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
			this.$http.post("/wallet/backmgr/ipWhite/list",this.filterForm).then(res => {
				if(res.code == 200){
					console.log(res)
					this.list = res.result.page.list
					this.total = res.result.page.total
				}
			})
		},
		addCheckoutWhitelist(){
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
			this.$http.post("/wallet/backmgr/ipWhite/add",this.formData).then(res => {
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
		},
		deleteItem(item) {
			this.$confirm('删除后该IP将不可访问收银台?', '确认删除？', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$http.post("/wallet/backmgr/ipWhite/delete", {
					appId: item.app_id,
					ip: item.ip
				}).then(res => {
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
			})
		},
		search(){
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
.whitelist-page{
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