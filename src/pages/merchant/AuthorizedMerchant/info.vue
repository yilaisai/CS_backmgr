<template>
	<div class="AuthorizedMerchantInfo-page">
		<el-form ref="form" :model="formData" label-width="85px" size="mini" inline>
			<el-form-item label="分组名称:">
				<el-input disabled :value="'高级组'"></el-input>
			</el-form-item>
			<el-form-item label="创建时间:">
				<el-input disabled :value="'2019.09.21 18:38:09'"></el-input>
			</el-form-item>
		</el-form>
		<div class="main">
			<div>
				<div class="title">
					<span>商户列表：</span>
					<p>
						<el-button size="mini" type="danger" @click=""> 一键删除 </el-button>
						<el-button size="mini" type="primary" @click="addMerchantShow= true"> 增加商户 </el-button>
					</p>
				</div>
				<el-table :data="list" height="auto" border size="mini"  @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55" align="center"></el-table-column >
					<el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
					<el-table-column prop="phone" label="商户账户" align="center" ></el-table-column>
					<el-table-column prop="groupName" label="商户昵称" align="center"></el-table-column>
					<el-table-column prop="date" label="操作" fixed="right" width="110" align="center">
						<template slot-scope="scope">
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
			<div>
				<div class="title">
					<span>码商列表：</span>
						<p>
							<el-button size="mini" type="danger" @click=""> 一键删除 </el-button>
							<el-button size="mini" type="primary" @click="addUserShow=true"> 增加码商 </el-button>
						</p>
					</div>
					<el-table :data="list" height="auto" border size="mini" style="min-width: 100%" @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55" align="center"></el-table-column >
						<el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
						<el-table-column prop="phone" label="商户账户" align="center" ></el-table-column>
						<el-table-column prop="groupName" label="商户昵称" align="center"></el-table-column>
						<el-table-column prop="date" label="操作" fixed="right" width="110" align="center">
							<template slot-scope="scope">
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
		</div>
		<addMerchant :show="addMerchantShow" @change="addMerchantShow=false"></addMerchant>
		<addUser :show="addUserShow" @change="addUserShow=false"></addUser>
	</div>
</template>
<script>
import addMerchant from './components/addMerchant.vue'
import addUser from './components/addUser.vue'
export default {
	components:{
		addMerchant,
		addUser
	},
	data(){
		return {
			addMerchantShow:false,
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
			]
		}
	},
	mounted(){

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