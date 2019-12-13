<template>
	<!-- <div class="addMerchant-page">

	</div> -->
		<el-dialog class="addMerchant-page" title="增加商户1" :visible.sync="showWidget">
			<el-form  :model="merchantFormData" label-width="95px" size="mini" inline>
				<el-form-item label="账户/昵称:">
					<el-input v-model="merchantFormData.name" placeholder="请输入账户或者昵称"></el-input>
				</el-form-item>
				
				<el-form-item>
					<el-button type="primary" @click="getMerchantList" style="margin-left: 20px">搜索</el-button>
					<el-button type="primary" @click="">确定增加</el-button>
				</el-form-item>
			</el-form>
			<el-table class="addMerchantSelect" @header-click="headerClick" :data="merchantPageData.list" height="420px" border size="mini" style="min-width: 100%" >
					<!-- <el-table-column type="selection" width="55" align="center"></el-table-column > -->
					<el-table-column  width="55" label="全选" align="center">
						<div slot-scope="scope" class="checkBox"  @click=" itemClick(scope.row) " >
							<!-- <el-button size="mini" type="text" @click=""> 删除 </el-button> -->
							<div class="check" :class=" scope.row.check ? 'isCheck' : '' "></div>
						</div>
					</el-table-column >
					<el-table-column prop="phone" label="账号" align="center" ></el-table-column>
					<el-table-column prop="name" label="昵称" align="center"></el-table-column>
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
		show:{
			type:Boolean,
			default:false,
		}
	},
	data(){
		return {
			showWidget:false,
			addMerchantShow:false,
			merchantFormData: {
				name:'',
				pageNum: 1, //页码
				pageSize: 10, //页数
			},
			merchantPageData:{
				list:[],
				total:0,
			},
			multipleSelection:[],
			selectList:[],
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
		headerClick(column){
			if(column.label==='全选'){
				if(this.isSelectAll){
					for (let i = 0 ; i < this.merchantPageData.list.length; i++ ){
						this.itemSelect(this.merchantPageData.list[i],false)
					}
				}else{
					for (let i = 0 ; i < this.merchantPageData.list.length; i++ ){
						this.itemSelect(this.merchantPageData.list[i],true)
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
					// r.push(array[i]);
			}
			return r;
		}
	},
	watch:{
		show(newVal, oldVal){
			if(newVal){
				this.showWidget = true
				this.merchantFormData={	name:'',pageNum: 1, pageSize: 10}
				this.getMerchantList()
			}
		},
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