<template>
	<div class="merchantDetaile-page">
		<el-header>
			<el-button type="primary" @click="$router.go(-1)">返回</el-button>
		</el-header>
		<!-- <el-main></el-main> -->
		<div class="main">
			<div>
				<div class="title">
					<h3>用户信息</h3>
				</div>
				<el-form :inline="true" :model="detaileData" class="demo-form-inline" size="small">
					<el-form-item label="商户名:">
						<el-input v-model="detaileData.name"  disabled></el-input>
					</el-form-item>
					<el-form-item label="手机号:">
						<el-input v-model="detaileData.phone"  disabled></el-input>
					</el-form-item>
					<el-form-item label="邮箱:">
						<el-input v-model="detaileData.email"  disabled></el-input>
					</el-form-item>
					<el-form-item label="状态:">
						<el-input :value="detaileData.status==1?'已审核':detaileData.status==2?'审核失败':'待审核'"  disabled></el-input>
					</el-form-item>
					<!-- <el-form-item label="google密钥:">
						<el-input v-model="detaileData.name"  disabled></el-input>
					</el-form-item> -->
					<el-form-item v-if="detaileData.remark" label="审核意见:">
						<el-input v-model="detaileData.remark"  disabled></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div v-if="detaileData.status==0"> 
				<div class="title">
					<h3>审核意见</h3>
				</div>
				<el-form :inline="true" :model="desc" class="demo-form-inline">
					<el-form-item label="审核意见:">
						<el-input v-model="desc"  placeholder="请输入审核意见"></el-input>
					</el-form-item>
					<el-button type="primary" @click="merchantCheck(1)">通过</el-button>
					<el-button type="danger" @click="merchantCheck(2)">不通过</el-button>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	components:{

	},
	data(){
		return {
			detaileData:{},
			desc:''
		}
	},
	activated(){
		this.detaileData = this.$route.query.data
	},
	mounted(){
		
	},
	methods:{
		selectCoin(){
			console.log(1)
			this.getData()
		},
		getData(){
			this.$http.post('/wallet/app/otc/backmgr/queryOtcUserDetail',this.filterForm).then(res=>{
				if(res.code==200){
					this.detaileData = res.result;

				}
			})
		},
		merchantCheck(status){
			this.$http.post('/wallet/backmgr/merchant/apply/check',{
				applyId:this.detaileData.id,
				desc:this.desc,
				status:status
			}).then(res=>{
				if(res.code==200){
					this.$notify.success({
						title: '提示',
						message: res.msg
					})
					this.$router.go(-1)
				}
			})
		},


	},
	watch:{

	},
	computed:{

	}
	}
</script>
<style lang="less" scoped>
.merchantDetaile-page{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	.el-header{
		width: 100%;
	}
	.main{
		flex: 1;
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		background: #F6F9FC;
		padding: 10px;
		&>div{
			padding: 10px;
			background: #fff;
			padding-top: 1px;
			margin-bottom: 10px;
			&>.title{
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 15px;
				/deep/.el-form-item{margin: 0}
			}
			/deep/.el-form-item{
				
				width: 300px;
				.el-input__inner{
					// border: none;
				}
				.el-input.is-disabled .el-input__inner{
					cursor: default;
					color: #606266;
				}
				&.big{
					width: 620px;
					.el-input__inner{
						width: 520px;
					}
				}
				.el-form-item__label{
					width: 100px;
				}
				
			}
		}
		/deep/.el-tree{
			min-width: 840px;
		}
		.custom-tree-node{
			display: flex;
			flex-direction: row;
			align-items: center;
			width: 100%;
			.label{
				flex: 1;
				
				span{
					overflow: hidden;
					text-overflow :  ellipsis 
				}
			}
			.content{
				width: 600px;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				.itemText{
				}
				.btns{
					width: 180px;
				}
			}
		}
	}
}
</style>