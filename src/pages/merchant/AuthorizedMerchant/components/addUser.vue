<template>
	<!-- <div class="addMerchant-page">

	</div> -->
		<el-dialog class="addUser-page" title="增加码商" :visible.sync="showWidget">
			<el-form  :model="filterForm" label-width="95px" size="mini" inline>
				<el-form-item label="账号:">
					<el-input v-model="filterForm.account" placeholder="请输入账号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getUserData('saerch')" style="margin-left: 20px">搜索</el-button>
					<el-button type="primary" @click="addUser">确定增加</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="userData" height="420px" style="width: 100%;height:100%;" row-key="inviteCode" border lazy :load="load" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" size="mini">
				
				<el-table-column prop="nickName" label="姓名"></el-table-column>
				<el-table-column prop="userId" label="ID" align="center" width="140"></el-table-column>
				<el-table-column align="center" prop="account" label="账号" width="180"> </el-table-column>
				<el-table-column  width="55"  align="center">
					
					<div slot-scope="scope" class="checkBox"  @click=" itemClick(scope.row) " >
						<div v-if="scope.row.hasItem || scope.row.inGroup == 1">已选</div>
						<div v-else class="check" :class=" scope.row.check ? 'isCheck' : '' "></div>
					</div>
					</el-table-column >
			</el-table>
		</el-dialog>
</template>
<script>
export default {
	components:{

	},
	props:{
	},
	data(){
		return {
			showWidget:false,
			addMerchantShow:false,
			filterForm:{
				account:'',
				groupId:'',
      },
			merchantPageData:{
				list:[],
				total:0,
			},
			multipleSelection:[],
			selectList:[],
			checkedList:[],
			isSelectAll:false,
			userData:[],
			groupId:''
		}
	},
	mounted(){
		// this.getUserData()
	},
	methods:{
		addUser(){
			if(this.selectList.length<1){
				this.$message.error('请选择码商')
				return
			}
			if(this.groupId!==''){
				let userIds=""
				this.selectList.forEach((item)=>{
					userIds += item.userId+','
					
				})
				this.$http.post('/wallet/app/otc/backmgr/addUserToGroup', {
					groupId:this.groupId,
					userIds:userIds.substring(0,userIds.length-1)
				} ).then(res => {
					if(res.code == 200) {
						// this.pageData = res.result.page
						this.showWidget = false
						this.$message.success(res.msg)
						this.$emit('success')
					}
				})
			}else{
				this.showWidget = false
				this.$emit('addData',this.selectList)
			}
			
		},
		getUserData(saerch){
			this.filterForm.groupId = this.groupId
			// this.$http.post('/wallet/invite/backmgr/findInviteChild',this.filterForm).then(res=>{
      this.$http.post('/wallet/invite/backmgr/findInviteChildByGroup',this.filterForm).then(res=>{
        let list=[]
        if(saerch=='saerch'&&res.result.userId){
						list = [res.result]
						this.mergeArray(list)
            if(res.result.list&&res.result.list.length>0){
							list[0].hasChildren = true
							console.log(list[0])
							// this.mergeArray(list)
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
					this.mergeArray(list)
        }
        this.userData =[] 
        setTimeout(()=>{
          this.userData =list
        },100)
      })
		},
		load(tree, treeNode, resolve) {
			let inviteCode = tree.inviteCode
			// this.$http.post('/wallet/invite/backmgr/findInviteChild',{inviteCode:inviteCode,groupId:this.groupId}).then(res=>{
      this.$http.post('/wallet/invite/backmgr/findInviteChildByGroup',{inviteCode:inviteCode,groupId:this.groupId}).then(res=>{
        let { list } = res.result;
        list.forEach(element => {
          if(element.childNum>0){
            element.hasChildren = true
          }else{
            element.hasChildren = false
          }
          if(this.checkedList.length>0){
						this.checkedList.forEach((item)=>{
							if(item.userId == element.userId){
								this.$set(element,'hasItem',true)
							}
						})
					}
        })
        resolve(list)
        // this.inviteData = list;
      })
      
		},
		mergeArray(list){
			// console.log(list)
			if(this.groupId!==''){
				return
			}
			list.forEach(element => {
				if(this.checkedList.length>0){
					this.checkedList.forEach((item)=>{
						if(item.userId == element.userId){
							this.$set(element,'hasItem',true)
						}
					})
				}
			})
		},
		// headerClick(column){
		// 	if(column.label==='全选'){
		// 		if(this.isSelectAll){
		// 			for (let i = 0 ; i < this.merchantPageData.list.length; i++ ){
		// 				this.itemSelect(this.merchantPageData.list[i],false)
		// 			}
		// 		}else{
		// 			for (let i = 0 ; i < this.merchantPageData.list.length; i++ ){
		// 				this.itemSelect(this.merchantPageData.list[i],true)
		// 			}
		// 		}
		// 	}
		// },
		allCheck(arr){
			arr.forEach((item,index)=>{

			})
		},
		itemClick(item){
			if(item.check){
				this.itemSelect(item,false)
			}else{
				this.itemSelect(item,true)
			}
		},
		itemSelect(item,check){
			this.$set(item,'check',check)
			if(!item.check){
				this.selectList.forEach((e,i)=>{
					if(item.userId == e.userId ){
						this.selectList.splice(i,1)
					}
				})
			}else{
				this.$set(item,'check',true)
				this.selectList.push(item)
			}
			let isSelectAll = true
			for (let i = 0 ; i < this.merchantPageData.list.length; i++ ){
				if(!this.merchantPageData.list[i].check){
					isSelectAll = false
				}
			}
			this.isSelectAll = isSelectAll
		},
		show(list,groupId){
			this.showWidget = true
			this.merchantFormData={account:'',}
			this.selectList = []
			this.checkedList = list
			this.groupId = groupId||''
			this.getUserData()
		},
	},
	watch:{
		showWidget(newVal, oldVal){
			if(!newVal){
				this.$emit('change')
			}
		}
	},
	computed:{

	}
	}
</script>
<style lang="less" scoped>
.addUser-page{
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
		.checkBox{
			cursor: pointer;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		.check{
			display: inline-block;
			width: 16px;
			height: 16px;
			// background: red
			border: 1px solid #ccc;
			box-sizing: border-box;
			&.isCheck{
				border-color:#409EFF;
				position: relative;
				&::after{
					position: absolute;
					content: "";
					width: 5px;
					height: 8px;
					// background: #409EFF;
					border-bottom: 1px solid #409EFF;
					border-right: 1px solid #409EFF;
					transform: rotate(40deg);
					left: 50%;
					top: 50%;
					margin-left: -3px;
					margin-top: -6px;
				} 
			}
		}
}
</style>