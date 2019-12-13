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
				<el-button type="primary" @click="" style="margin-left: 20px">查询</el-button>
				<el-button type="primary" @click="">新建</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="list" height="auto" border size="mini" style="min-width: 100%" :show-overflow-tooltip='true' >
			<el-table-column prop="groupName" label="分组名" align="center" width="90"></el-table-column>
			<el-table-column prop="list1" label="商户列表" align="center"></el-table-column>
			<el-table-column prop="list2" label="码商列表" align="center"></el-table-column>
			<el-table-column prop="createDate" label="创建时间" width="160" align="center"></el-table-column>
			<el-table-column prop="date" label="操作" fixed="right" width="110" align="center">
				<template slot-scope="scope">
					<el-button size="mini" type="text" @click="$router.push('/merchant/AuthorizedMerchantInfo')"> 编辑 </el-button>
					<el-button size="mini" type="text" @click=""> 删除 </el-button>
				</template>
			</el-table-column>
		</el-table>
		 <el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="pageData.pageNum"
					:page-sizes="[20,50]"
					:page-size="pageData.pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="pageData.total*1">
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
				name:''
			},
			pageData:{
				pageNum:1,
				pageSzie:20,
				total:3
			},
			
			total:3,
			list:[
				{groupName:'默认',list1:'allbet,ksc,homo,hid,jiqoo',list2:'15179818328,177939729,15792797,188397900,137979790',createDate:'2019.09.21 18:38:19'},
				{groupName:'普通组',list1:'bxj',list2:'15179818328,177939729,15792797,188397900,137979790',createDate:'2019.09.21 18:38:19'},
				{groupName:'高级组',list1:'buc,hiqi',list2:'15179818328,177939729,15792797,188397900,137979790',createDate:'2019.09.21 18:38:19'}
			]
		}
	},
	mounted(){

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