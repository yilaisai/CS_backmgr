<template>
  	<div class="invite-page">
		<div class="header">
			<el-form :inline="true"  ref="filterForm" :model="filterForm" size="mini">
				<el-form-item label="账号:">
					<el-input placeholder="请输入用户账号" v-model.trim="filterForm.account" clearable class="input-with-select"></el-input>
				</el-form-item>
				<el-form-item label="用户编号:">
					<el-input placeholder="请输入用户编号" v-model.trim="filterForm.nickName" clearable class="input-with-select"></el-input>
				</el-form-item>
				<el-form-item label="邀请码:">
					<el-input placeholder="请输入邀请码" v-model.trim="filterForm.inviteCode" clearable class="input-with-select"></el-input>
				</el-form-item>
				<el-button  class="btn" type="primary" size="mini" @click.native="getInviteData('saerch')">查询</el-button>
				<el-button  class="btn" type="primary" size="mini" @click.native="queryParent">查父级</el-button>
			</el-form>
		</div>
		<!-- <div class="tab">
			<a href="javascript:;" :class="{'active' : queryType == 'child'}" @click="tabChange('child')">子级查询</a>
			<a href="javascript:;" :class="{'active' : queryType == 'parent'}" @click="tabChange('parent')">父级查询</a>
		</div> -->
		<el-table :data="inviteData" height="100%" style="width: 100%;height:100%;" row-key="inviteCode" border lazy :load="load" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" size="mini">
			<el-table-column prop="nickName" label="用户编号"></el-table-column>
			<el-table-column prop="userId" label="ID" align="center" width="140"></el-table-column>
			<el-table-column align="center" prop="account" label="账号" width="180"> </el-table-column>
			<el-table-column align="center"  prop="inviteCode" label="邀请码" width="80"></el-table-column>
			<el-table-column align="center" label="操作" width="80">
				<template slot-scope="scope"  >   
					<el-button type="text" size="mini"  @click="brokerage(scope.row)">迁移</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog title="迁移关系" :visible.sync="showDialog" width="650px" class="brokerageTable">
			<div class=" inputGroup ">
				<span>账号/昵称：</span>
				<el-input placeholder="请输入账号/昵称" v-model="account" size="small"></el-input>
			<el-button type="primary" @click="saerch" size="small">搜索</el-button>
			</div>
			<el-table size="mini" :data="listData.list" border height="500px" >
					<el-table-column prop="account" label="账号" ></el-table-column>
					<el-table-column prop="nickName" label="昵称" ></el-table-column>
					<el-table-column prop="account" label="操作" fixed="right">
						<template slot-scope="scope">
							<el-button type="text" @click.native=" updateInviteShip(scope.row.userId) ">迁移至该账号下</el-button>
						</template>
					</el-table-column>
			</el-table>
			<div slot="footer" class="dialog-footer">
					<sac-pagination v-show="listData.list.length>0"
						@handleChange="handleCurrentChange"
						:total="+listData.total"
						:page-size="listData.pageSize"
						:current-page="listData.pageNum">
				</sac-pagination>
			</div>
		</el-dialog>

		<el-dialog title="父级关系" :visible.sync="showDialogParent" width="650px" class="query-parent-dialog">
			<!-- <div class="inputGroup ">
				<span style="width: 200px;">账号/昵称/邀请码：</span>
				<el-input placeholder="请输入账号/昵称/邀请码" v-model="account" size="small"></el-input>
				<el-button type="primary" @click="saerch" size="small">搜索</el-button>
			</div> -->
			<el-table size="mini"
				:data="queryParentList"
				row-key="userId"
				lazy
				:load="queryParentLoad"
				:tree-props="{children: 'children', hasChildren: 'havaFather'}"
				height="500px">
				<el-table-column prop="account" label="账号" align="left"></el-table-column>
				<el-table-column prop="nickName" label="昵称" align="left"></el-table-column>
			</el-table>
		</el-dialog>
  	</div>
</template>
<script>
export default {
	data(){
		return {
			account:'',
			showDialog:false,
			showDialogParent: false,
			filterForm:{
				account:'',
				inviteCode:'',
				nickName:''
			},
			listData:{
				list:[],
				total:0,
				pageSize:10,
				pageNum:1
			},
			inviteData:[],
			currItem:{},
			queryParentList: []
		}
	},
	activated(){
		this.filterForm = {
			account:'',
			inviteCode:'',
			nickName:''
		}
		this.getInviteData()
	},
  	methods:{
		tabChange(type) {
			this.queryType = type
			this.getInviteData()
		},
		handleCurrentChange(val,currentPage) {
			this.listData.pageSize=val
			this.listData.pageNum=currentPage
			this.getList()
		},
		brokerage(data){
			this.currItem = data
			this.account = ''
			this.showDialog=true
			this.listData.amount = ''
			this.listData.pageNum = 1
			this.getList()
		},
		queryParent() {
			this.$http.post('/wallet/invite/backmgr/getFaInviteRecd',this.filterForm).then(res=>{
				this.queryParentList = res.result
				this.showDialogParent = true
			})
		},
		queryParentLoad(tree, treeNode, resolve) {
			this.$http.post('/wallet/invite/backmgr/getFaInviteRecd',{account: tree.account}).then(res=>{
				resolve(res.result)
			})
		},
		saerch(){
			this.listData.pageNum=1
			this.getList()
		},
		getInviteData(saerch){
			this.$http.post('/wallet/invite/backmgr/findInviteChild',this.filterForm).then(res=>{
				let list=[]
				if(saerch=='saerch'&&res.result.userId){
					list = [res.result]
					if(res.result.list&&res.result.list.length>0){
						list[0].hasChildren = true
					}
				}else{
					list =res.result.list
					list.forEach(element => {
						if(element.childNum>0){
							element.hasChildren = true
						}else{
							element.hasChildren = false
						}
					})
				}
				this.inviteData =[] 
				setTimeout(()=>{
					this.inviteData =list
				},100)
			})
		},
		getList(){
			this.$http.post('/wallet/invite/backmgr/queryInviteShip',{
				account:this.account,
				inviteeId:this.currItem.userId,
				pageNum:this.listData.pageNum,
				pageSize:this.listData.pageSize
			}).then(res=>{
				if(res.code==200){
					this.listData.list = res.result.list
					if(this.listData.list.length<1 ){
						this.$message.error('不允许迁移至自己的下级或该账号不存在')
					}
					this.listData.total = res.result.total
				}
			})
		},
		updateInviteShip(inviterId){
			this.$confirm('确定要执行迁移操作吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
					this.$http.post('/wallet/invite/backmgr/updateInviteShip',{
						inviterId:inviterId,
						inviteeId:this.currItem.userId
					}).then(res=>{
						if(res.code==200){
				this.showDialog2 = false
				this.filterForm={account:'',inviteCode:'',nickName:''},
				this.showDialog = false
							this.getInviteData()
							this.$message.success('迁移成功')
						}
					})
			}).catch(() => {})
		},
		load(tree, treeNode, resolve) {
			let inviteCode = tree.inviteCode
			this.$http.post('/wallet/invite/backmgr/findInviteChild',{inviteCode:inviteCode}).then(res=>{
				let { list } = res.result;
				list.forEach(element => {
				if(element.childNum>0){
					element.hasChildren = true
				}else{
					element.hasChildren = false
				}
				
				})
				resolve(list)
			})
		}
  	},
}
</script>
<style lang="less" scoped>
.invite-page{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
    .table{
      height: 100%;
    }
    .brokerageTable{
      /deep/.el-dialog__body{
        padding-right: 0;
        padding-bottom: 0;
      }
	}
	.query-parent-dialog {
		/deep/.el-dialog__body {
			padding: 10px 20px;
		}
		/deep/.is-left {
			.cell {
				text-align: left;
			}
		}
	}
	 .inputGroup{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			/deep/.el-input{
				margin-right: 20px;
			}
			&>span{
				width: 110px;
			}
		}
	.tab {
		display: flex;
		border: 1px solid #dcdfe6;
		width: 180px;
		border-radius: 5px;
		overflow: hidden;
		a {
			flex: 1;
			color: #606266;
			text-decoration: none;
			padding: 5px 0;
			text-align: center;
			font-size: 14px;
			&.active {
				background-color: #409EFF;
				color: #fff;
			}
		}
	}
}
</style>