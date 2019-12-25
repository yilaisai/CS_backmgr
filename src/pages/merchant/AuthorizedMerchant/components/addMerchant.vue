<template>
	<!-- <div class="addMerchant-page">

	</div> -->
		<el-dialog class="addMerchant-page" title="增加商户" :visible.sync="showWidget">
			<el-form  :model="merchantFormData" label-width="95px" size="mini" inline>
				<el-form-item label="账户/昵称:">
					<el-input v-model="merchantFormData.name" placeholder="请输入账户或者昵称"></el-input>
				</el-form-item>
				
				<el-form-item>
					<el-button type="primary" @click="getMerchantList" style="margin-left: 20px">搜索</el-button>
					<el-button type="primary" @click="addMerchantToGroup">确定增加</el-button>
				</el-form-item>
			</el-form>
			<el-table class="addMerchantSelect" @header-click="headerClick" :data="merchantPageData.list" height="420px" border size="mini" style="min-width: 100%" >
					<!-- <el-table-column type="selection" width="55" align="center"></el-table-column > -->
				
					<el-table-column prop="phone" label="账号" align="center" ></el-table-column>
					<el-table-column prop="name" label="昵称" align="center"></el-table-column>
						<el-table-column  width="55" label="全选" align="center">
						<div slot-scope="scope" class="checkBox"  @click=" itemClick(scope.row) " >
							<!-- <el-button size="mini" type="text" @click=""> 删除 </el-button> -->
							<div v-if="scope.row.hasItem || scope.row.inGroup==1 ">已选</div>
							<div v-else class="check" :class=" scope.row.check ? 'isCheck' : '' "></div>
						</div>
					</el-table-column >
				</el-table>
				<el-pagination
						@size-change="addMerchantSelectSizeChange"
						@current-change="addMerchantSelectCurrentChange"
						:current-page="merchantFormData.pageNum"
						:page-sizes="[10,20]"
						:page-size="merchantFormData.pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="merchantPageData.total*1">
				</el-pagination>
		</el-dialog>
</template>
<script>
export default {
	components:{

	},
	props:{
		list:{
			type:Array,
			default:()=>{
				return []
			}
		}
	},
	data(){
		return {
			groupId:'',
			showWidget:false,
			addMerchantShow:false,
			merchantFormData: {
				name:'',
				groupId:'',
				pageNum: 1, //页码
				pageSize: 10, //页数
			},
			merchantPageData:{
				list:[],
				total:0,
			},
			multipleSelection:[],
			selectList:[],
			checkedList:[],
			isSelectAll:false
		}
	},
	mounted(){
		// this.getMerchantList()
	},
	methods:{
		//增加商户
		handleSelectionChange(val) {
			this.multipleSelection = val;
			console.log(this.multipleSelection)
		},
		addMerchantSelectSizeChange(val){
			this.merchantFormData.pageSize = val
			this.mergeArray()
			this.getMerchantList()
		},
		addMerchantSelectCurrentChange(val) {
			this.merchantFormData.pageNum = val
			this.mergeArray()
			this.getMerchantList()
		},
		//
		addMerchantToGroup(){
			
			if(this.selectList.length<1){
				this.$message.error('请选择商户')
				return
			}
			if(this.groupId!==''){
				let userIds=""
				this.selectList.forEach((item)=>{
					userIds += item.userId+','
				})
				this.$http.post('/wallet/app/otc/backmgr/addMerchantToGroup', {
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
		getMerchantList() {
			this.merchantFormData.groupId = this.groupId
			// this.$http.post('/wallet/backmgr/merchant/list', this.merchantFormData ).then(res => {
			this.$http.post('/wallet/app/otc/backmgr/listByGroup', this.merchantFormData ).then(res => {
				if(res.code == 200) {
					// this.pageData = res.result.page
					this.merchantPageData = res.result.page
					for (let i = 0 ; i < this.merchantPageData.list.length; i++) {
						let hasItem = false
						let check = false
						if(this.selectList.length>0){
							for (let j = 0 ; j < this.selectList.length; j++ ){
								if(this.merchantPageData.list[i].userId==this.selectList[j].userId){
									check = true
								}
							}
						}	
						if(this.checkedList.length>0&&this.groupId==''){
							for (let j = 0 ; j < this.checkedList.length; j++ ){
								if(this.merchantPageData.list[i].userId==this.checkedList[j].userId){
									hasItem = true
								}
							}
						}
						this.$set(this.merchantPageData.list[i],'hasItem',hasItem)
						this.$set(this.merchantPageData.list[i],'check',check)
						
						// r.push(array[i]);
				}
				}
			})
		},
		headerClick(column){
			if(column.label==='全选'){
				if(this.isSelectAll){
					for (let i = 0 ; i < this.merchantPageData.list.length; i++ ){
						if(!this.hasItem){
							this.itemSelect(this.merchantPageData.list[i],false)
						}
					}
				}else{
					for (let i = 0 ; i < this.merchantPageData.list.length; i++ ){
						if(!this.hasItem){
							this.itemSelect(this.merchantPageData.list[i],true)
						}
					}
				}
			}
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
			}
		},
		show(list,groupId){
			this.showWidget = true
			this.merchantFormData={	name:'',pageNum: 1, pageSize: 10}
			this.checkedList = list
			this.selectList = []
			this.groupId = groupId||''
			this.getMerchantList()
		},
	},
	watch:{
		
		showWidget(newVal, oldVal){
			if(!newVal){
			}
		}
	},
	computed:{

	}
	}
</script>
<style lang="less" scoped>
.addMerchant-page{
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