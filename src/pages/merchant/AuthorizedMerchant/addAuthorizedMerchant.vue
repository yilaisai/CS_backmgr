<template>
	<div class="AuthorizedMerchantInfo-page">
		<el-form ref="form"  label-width="85px" size="mini" inline>
			<el-form-item label="分组名称:">
				<el-input maxlength="10" v-model="groupName"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button  type="primary" size="mini" @click="addGroup">新增分组</el-button>
			</el-form-item>
		</el-form>
		<div class="main">
			<MerchantList ref="MerchantList" :groupId="groupId"></MerchantList>
			<UserList ref="UserList" :groupId="groupId"></UserList>
		</div>
		<addUser :show="addUserShow" @change="addUserShow=false"></addUser>
	</div>
</template>
<script>
import addUser from './components/addUser.vue'
import MerchantList from './components/merchantList.vue'
import UserList from './components/userList.vue'
export default {
	components:{
		addUser,
		MerchantList,
		UserList
	},
	data(){
		return {
			addUserShow:false,
			formData:{
				create_time:'',
				groupName:'',
				name:''
			},
			pageData:{
				pageNum:1,
				pageSzie:20,
				total:3
			},
			multipleSelection:[],
			total:3,
			list:[
				{groupName:'默认',phone:'15179818328'},
				{groupName:'allbet',phone:'177939729'},
				{groupName:'ksx',phone:'15792797'},
				{groupName:'默认ksx',phone:'188397900'},
			],
			groupId:'',
			createTime:'',
			groupName:''
		}
	},
	activated(){
		this.groupName = ''
	},
	methods:{
		handleSelectionChange(val) {
			this.multipleSelection = val;
			console.log(this.multipleSelection)
		},
		handleCurrentChange(val) {
			this.pageNum = val
			// this.getData()
		},
		handleSizeChange(val) {
			this.pageSize = val
			// this.getData()
		},
		
		addGroup(){
			if(this.groupName.trim()==''){
				this.$message.error('请输入分组名称')
				return
			}else if(this.$refs.MerchantList.getList().length<1){
				this.$message.error('请添加商户')
				return
			}else if(this.$refs.UserList.getList().length<1){
				this.$message.error('请添加码商')
				return
			}
			let merIds = ''
			let userIds = ''
			this.$refs.MerchantList.getList().forEach((item)=>{
				merIds+=item.userId+','
			})
			this.$refs.UserList.getList().forEach((item)=>{
				userIds+=item.userId+','
			})
			console.log(merIds)
			console.log(userIds)
			// return
			this.$http.post('/wallet/app/otc/backmgr/addGroup', {
					groupName:this.groupName,
					merIds:merIds.substring(0,merIds.length-1),
					userIds:userIds.substring(0,userIds.length-1)
				}).then(res => {
					if(res.code==200){
						this.$message.success(res.msg)
						this.$router.go(-1)
					}else{
						this.$message.error(res.msg)
					}
				})
		},
		// /wallet/app/otc/backmgr/checkMerchantGroupRecdInfo
		
	},
	watch:{

	},
	computed:{

	}
	}
</script>
<style lang="less" scoped>
.AuthorizedMerchantInfo-page{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
		.main{
			flex: 1;
			display: flex;
			flex-direction: row;
			box-sizing: border-box;
			&>div{
				flex: 1;
				display: flex;
				flex-direction: column;
				margin-right: 30px ;
				&:last-of-type{
					margin: 0;
				}
				&>.title{
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					height: 40px;
				}
			}
		
		}
		/deep/.time .el-form-item__content{
			width: auto
		}
		/deep/.el-input.is-disabled .el-input__inner{
			color: #666
		}
		/deep/.el-dialog{
			width: 700px;
		}
}
</style>