<template>
  <div class="invite-page">
    <div class="header">
      <el-form :inline="true"  ref="filterForm" :model="filterForm">
        <el-form-item label="账号:">
          <el-input placeholder="请输入用户账号" v-model="filterForm.account" class="input-with-select"></el-input>
        </el-form-item>
        <el-form-item label="昵称:">
          <el-input placeholder="请输入用户昵称" v-model="filterForm.nickName" class="input-with-select"></el-input>
        </el-form-item>
        <el-form-item label="邀请码:">
          <el-input placeholder="请输入邀请码" v-model="filterForm.inviteCode" class="input-with-select"></el-input>
        </el-form-item>
        
        <el-button  class="btn" type="primary"  size="mini"
          @click.native="getInviteData">查询
        </el-button>
      </el-form>
    </div>
    <div class="table">
      <el-table
        :data="inviteData"
        height="100%"
        style="width: 100%;height:100%;"
        row-key="inviteCode" 
        border
        lazy
        :load="load"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column prop="userId" label="ID" > </el-table-column>
        <el-table-column align="center" prop="nickName" label="姓名"  width="180"> </el-table-column>
        <el-table-column align="center" prop="account" label="账号"  width="180"> </el-table-column>
        <el-table-column align="center"  prop="inviteCode" label="邀请码" width="80">
        </el-table-column>
        <el-table-column align="center" label="操作" width="80">
          <template slot-scope="scope"  >   
              <el-button type="text" size="mini"  @click="brokerage(scope.row)">迁移</el-button>
          </template>
        </el-table-column>
      </el-table>
        
    </div>
    <el-dialog title="迁移关系" :visible.sync="showDialog" width="650px" class="brokerageTable">
			<div class=" inputGroup ">
				<span>账号/昵称：</span>
				<el-input placeholder="请输入账号/昵称" v-model="account" ></el-input>
			<el-button type="primary" @click="saerch">搜索</el-button>
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
  
  </div>
</template>
<script>
export default {
  components:{

  },
  data(){
    return {
      account:'',
      showDialog:false,
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
      currItem:{}
    }
  },
  mounted(){
    // this.getList()
    this.getInviteData()
  },
  methods:{
    handleCurrentChange(val,currentPage) {
			this.listData.pageSize=val
			this.listData.pageNum=currentPage
			this.getList()
		},
    rowKey(row,i){
      // console.log(row)
      return row.id
    },
    brokerage(data){
			this.currItem = data
      this.showDialog=true
      this.listData.amount = ''
			this.listData.pageNum = 1
			this.getList()
    } ,
    saerch(){
			this.listData.pageNum=1
			this.getList()
		},
    getInviteData(){
      this.$http.post('/wallet/invite/backmgr/findInviteChild',this.filterForm).then(res=>{
        const { list } = res.result;
        list.forEach(element => {
          if(element.childNum>0){
            element.hasChildren = true
          }else{
            element.hasChildren = false
          }
          
        })
        this.inviteData = list;
      })
    },
    getList(){
      console.log(this.currItem)
			this.$http.post('/wallet/invite/backmgr/queryInviteShip',{
				account:this.account,
				inviteeId:this.currItem.userId,
				pageNum:this.listData.pageNum,
				pageSize:this.listData.pageSize
			}).then(res=>{
				if(res.code==200){
					this.listData.list = res.result.list
					this.listData.total = res.result.total
					// this.findInviteTree()
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
							this.getInviteData()
							this.$message.success('迁移成功')
						}
					})
			}).catch(() => {})
		
		},
    load(tree, treeNode, resolve) {
      let inviteCode = tree.inviteCode
      this.$http.post('/wallet/invite/backmgr/findInviteChild',{inviteCode:inviteCode}).then(res=>{
        const { list } = res.result;
        list.forEach(element => {
          if(element.childNum>0){
            element.hasChildren = true
          }else{
            element.hasChildren = false
          }
          
        })
        resolve(list)
        // this.inviteData = list;
      })

      console.log(tree)
      console.log(treeNode)
        // setTimeout(() => {
        //   resolve([
        //     {
        //       id: 31,
        //       date: '2016-05-01',
        //       name: '王小虎',
        //       address: '上海市普陀区金沙江路 1519 弄',
              
        //     }, {
        //       id: 32,
        //       date: '2016-05-01',
        //       name: '王小虎',
        //       address: '上海市普陀区金沙江路 1519 弄'
        //     }
        //   ])
        // }, 1000)
      }
  },
  watch:{

  },
  computed:{

  }
  }
</script>
<style lang="less" scoped>
.invite-page{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
    .table{
      height: 100%;
    }
    .btn{
      height: 39px;
    }
    .brokerageTable{
      /deep/.el-dialog__body{
        padding-right: 0;
        padding-bottom: 0;
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
}
</style>