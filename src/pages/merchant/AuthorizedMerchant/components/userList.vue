<template>
	<div class="userList-page">
		<div class="title">
			<span>交易员列表：</span>
			<p>
				<el-button size="mini" type="danger" :disabled=" multipleSelection.length==0 " @click="checkedDelete()"> 一键删除 </el-button>
				<el-button size="mini" type="primary" @click="$refs.AddUser.show(list,groupId) "> 增加交易员 </el-button>
			</p>
		</div>
		<el-table :data="list" height="auto" border size="mini"  @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55" align="center"></el-table-column >
			<el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
			<el-table-column prop="phone" label="交易员账户" align="center" >
				<template slot-scope="scope">{{ scope.row.phone || scope.row.account }}</template>
			</el-table-column>
			<el-table-column prop="nickName" label="交易员用户编号" align="center"></el-table-column>
			<el-table-column prop="realName" label="实名姓名" align="center"></el-table-column>
			<el-table-column prop="date" label="操作" fixed="right" width="110" align="center">
				<template slot-scope="scope">
					<el-button size="mini" type="text" @click="subUserToGroup(scope.row.userId)"> 删除 </el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="pageData.pageNum"
				:page-size="pageData.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total*1">
		</el-pagination>
		<AddUser ref="AddUser" @addData="addData"  @success='getData' ></AddUser>
	</div>
</template>
<script>
import AddUser from './addUser.vue'
export default {
	components:{
		AddUser
	},
	props:{
		groupId:{
			type:String,
			default:""
		}
	},
	data(){
		return {
			pageData:{
				groupId:'',
				pageNum:1,
				pageSize:20,
			},
			multipleSelection:[],
			total:3,
			list:[]
		}
	},
	activated(){
		this.list = []
		setTimeout(()=>{
			if(this.groupId!==''){
			this.pageData.groupId = this.groupId
				this.getData()
			}
		},100)
		
	},
	methods:{
		getList(){
			return this.list
		},
		addData(list){
			this.list=this.list.concat(list)
		},
		getData(){
			this.$http.post('/wallet/app/otc/backmgr/checkUserGroupRecdInfo', this.pageData).then(res => {
				this.list = res.result.list
				this.total = res.result.total
			})
		},
		
		checkedDelete(){
			let userIds=""
			this.multipleSelection.forEach(e => {
				userIds+= e.userId + ','
			})
			this.subUserToGroup(userIds.substring(0,userIds.length-1))
		},
		subUserToGroup(userIds){
			console.log(userIds)
			if(this.groupId!==''){
				this.$confirm('此操作将会将用户移出该分组，确定删除？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post('/wallet/app/otc/backmgr/subUserToGroup', {
						groupId:this.groupId,
						userIds:userIds
					}).then(res => {
						if(res.code==200){
							this.$message.success(res.msg)
							this.getData()
						}else{
							this.$message.error(res.msg)
						}
					})
				}).catch(() => {})
				
			}else{
				let arr = []
				if((userIds+'').indexOf(',')>-1){
					arr = userIds.split(',')
				}else{
					arr = [userIds]
				}
				let newList = []
				this.list.forEach((e,i)=>{
					let isDelete = false
					arr.forEach((item)=>{
						if(e.userId==item){
							isDelete = true
						}
					})
					if(!isDelete){
						newList.push(e)
					}
				})
				this.list = newList
			}
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
			console.log(this.multipleSelection)
		},
		handleCurrentChange(val) {
			this.pageData.pageNum = val
			this.getData()
		},
		handleSizeChange(val) {
			this.pageData.pageSize = val
			this.getData()
		},
	},
	watch:{

	},
	computed:{

	}
	}
</script>
<style lang="less" scoped>
.userList-page{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	&>.title{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 40px;
	}
}
</style>