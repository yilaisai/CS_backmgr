<template>
	<!-- <div class="addMerchant-page">

	</div> -->
		<el-dialog class="addUser-page" title="增加码商" :visible.sync="showWidget">
			<el-form  :model="filterForm" label-width="95px" size="mini" inline>
				<el-form-item label="账号:">
					<el-input v-model="filterForm.account" placeholder="请输入账户或者昵称"></el-input>
				</el-form-item>
				
				<el-form-item>
					<el-button type="primary" @click="getMerchantList" style="margin-left: 20px">搜索</el-button>
					<el-button type="primary" @click="">确定增加</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="userData" height="420px" style="width: 100%;height:100%;" row-key="inviteCode" border lazy :load="load" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" size="mini">
				
				<el-table-column prop="nickName" label="姓名"></el-table-column>
				<el-table-column prop="userId" label="ID" align="center" width="140"></el-table-column>
				<el-table-column align="center" prop="account" label="账号" width="180"> </el-table-column>
				<el-table-column  width="55"  align="center">
						<div slot-scope="scope" class="checkBox"  @click=" itemClick(scope.row) " >
							<div class="check" :class=" scope.row.check ? 'isCheck' : '' "></div>
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
      },
			merchantPageData:{
				list:[],
				total:0,
			},
			multipleSelection:[],
			selectList:[],
			isSelectAll:false,
			userData:[]
		}
	},
	mounted(){
		// this.getUserData()
	},
	methods:{
	
		getUserData(saerch){
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
        this.userData =[] 
        setTimeout(()=>{
          this.userData =list
        },100)
      })
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
        // this.inviteData = list;
      })
      
  	},
		getMerchantList() {
			this.$http.post('/wallet/backmgr/merchant/list', this.merchantFormData ).then(res => {
				if(res.code == 200) {
					// this.pageData = res.result.page
					this.merchantPageData = res.result.page
					for (let i = 0 ; i < this.merchantPageData.list.length; i++) {
						if(this.selectList.length>0){
							let hasItem = false
							for (let j = 0 ; j < this.selectList.length; j++ ){
								if(this.merchantPageData.list[i].userId==this.selectList[j].userId){
									hasItem = true
								}
							}
							this.$set(this.merchantPageData.list[i],'check',hasItem)
						}	
						// r.push(array[i]);
				}
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
		mergeArray(){
			let r = [];
			for (let i = 0 ; i < this.multipleSelection.length; i++) {
					if(this.selectList.length>0){
						let hasItem = false
						for (let j = 0 ; j < this.selectList.length; j++ ){
							if(this.multipleSelection[i].userId==this.selectList[j].userId){
								hasItem = true
							}
						}
						if(!hasItem){
							this.selectList.push(this.multipleSelection[i])
						}
					}	else{
						this.selectList.push(this.multipleSelection[i])
					}	
					// r.push(array[i]);
			}
			return r;
		},
		show(list,groupId){
			this.showWidget = true
			this.merchantFormData={	name:'',pageNum: 1, pageSize: 10}
			this.selectList = []
			this.selectList = this.selectList.concat(list)
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
			border: 2px solid #ccc;
			box-sizing: border-box;
			border-radius: 50%;
			&.isCheck{
				border-color:#409EFF;
				position: relative;
				&::after{
					position: absolute;
					content: "";
					width: 8px;
					height: 8px;
					background: #409EFF;
					border-radius: 50%;
					left: 50%;
					top: 50%;
					margin-left: -4px;
					margin-top: -4px;
				} 
			}
		}
}
</style>