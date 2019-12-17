<template>
	<div class="authorizedMerchant-page">
		<el-form ref="form" :model="formData" label-width="85px" size="mini" inline>
			<el-form-item label="分组名称:">
				<el-input v-model="formData.groupName" placeholder="分组名称"></el-input>
			</el-form-item>
			<el-form-item label="账户/昵称:">
				<el-input v-model="formData.name" placeholder="请输入账户或者昵称"></el-input>
			</el-form-item>
			<el-form-item label="时间：" class="time">
				<el-date-picker
					id="createtime"
					v-model="formData.create_time"
					type="daterange"
					align="right"
					width="auto"
					value-format="yyyy-MM-dd"
					unlink-panels
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					>
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="getData" style="margin-left: 20px">查询</el-button>
				<el-button type="primary" @click="$router.push('/merchant/addAuthorizedMerchant')">新建组</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="list" height="auto" border size="mini" style="min-width: 100%" :show-overflow-tooltip='true' >
			<el-table-column prop="groupName" label="分组名" align="center" width="90"></el-table-column>
			<el-table-column prop="merchentNameList" label="商户列表" align="center"></el-table-column>
			<el-table-column prop="userNameList" label="码商列表" align="center"></el-table-column>
			<el-table-column  label="创建时间" width="160" align="center">
				<template slot-scope="scope">
					{{ $fmtDate(scope.row.createTime,'full') }}
				</template>
			</el-table-column>
			<el-table-column prop="date" label="操作" fixed="right" width="110" align="center">
				<template slot-scope="scope">
					<el-button size="mini" type="text" @click="$router.push({path:'/merchant/AuthorizedMerchantInfo',query:{id:scope.row.recdId,createTime:$fmtDate(scope.row.createTime,'full'),groupName:scope.row.groupName}})"> 编辑 </el-button>
					<el-button size="mini" type="text" @click="subGroup(scope.row.recdId)"> 删除 </el-button>
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
	</div>
</template>
<script>
export default {
	components:{

	},
	data(){
		return {
			formData:{
				create_time:'',
				groupName:'',
				name:'',
				pageNum:1,
				pageSzie:20,
			},
			pageData:{
				pageNum:1,
				pageSzie:20,
				total:3
			},
			total:3,
			list:[]
		}
	},
	activated(){
		this.getData()
	},
	methods:{
		handleCurrentChange(val) {
			this.pageNum = val
			// this.getData()
		},
		handleSizeChange(val) {
			this.pageSize = val
			// this.getData()
		},
		getData(){
			this.$http.post('/wallet/app/otc/backmgr/checkMerchantGroupRecd', this.formData).then(res => {
				this.list = res.result.list
				this.total = res.result.total
			})
		},
		subGroup(groupId){
			this.$confirm('确定要删除该分组？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$http.post('/wallet/app/otc/backmgr/subGroup', {groupId:groupId}).then(res => {
					this.getData()
						this.$message({
							type: 'success',
							message: res.msg
					});
				})
			}).catch(() => {})
		}
	},
	watch:{

	},
	computed:{

	}
	}
</script>
<style lang="less" scoped>
.authorizedMerchant-page{
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
		/deep/.time .el-form-item__content{
			width: auto
		}
}
</style>