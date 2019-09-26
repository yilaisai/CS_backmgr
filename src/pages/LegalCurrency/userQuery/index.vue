
<template>
    <div class="userQuery-page">
        <el-container>
					<el-main>
						<el-form :inline="true"  ref="filterForm" :model="filterForm">
							<div class="form-group">
								<el-form-item label="账号:">
									<el-input placeholder="请输入用户账号" v-model="filterForm.account" class="input-with-select"></el-input>
								</el-form-item>
									<el-form-item label="昵称:">
									<el-input placeholder="请输入用户昵称" v-model="filterForm.nickName" class="input-with-select"></el-input>
								</el-form-item>
								
							</div>
							<div class="form-group">
								<div class="radioBox">
									<label >广告商类型:</label>
									<el-select v-model="filterForm.userLevel" >
										<el-option value="" label='所有'></el-option>
										<el-option v-for="(item, key) in advList" :key="key" :value="item.label" :label="item.value"></el-option>
									</el-select>
								</div>
								<div class="radioBox">
									<label >企业类型：</label>
									<el-select v-model="filterForm.company" >
										<el-option value="" label='所有'></el-option>
										<el-option v-for="(item, key) in companyType" :key="key" :value="item.label" :label="item.value"></el-option>
									</el-select>
								</div>
							</div>
							<div class="form-group">
								<el-form-item class='dateItem' label="时间:">
									<el-date-picker
										v-model="selectedDate"
										type="daterange"
										range-separator="至"
										start-placeholder="开始日期"
										format="yyyy-MM-dd "
										end-placeholder="结束日期" @change='dateChange'>
									</el-date-picker>
								</el-form-item>
								
								<el-button  type="primary"  size="mini"
									@click.native="search">搜索
								</el-button>
							</div>
						</el-form>
						<el-table :data="listData.list" border >
							<el-table-column label="账户/昵称" width="150" >
								<div slot-scope="scope">
									<p>{{scope.row.account}}</p>
									<p>{{scope.row.nickName}}</p>
								</div>
							</el-table-column>
							<el-table-column  label="广告商类型" >
								<template slot-scope="scope">
									<span >{{scope.row.userLevel==0?'普通用户':scope.row.userLevel==1?'普通广告商':scope.row.userLevel==2?'高级广告商':scope.row.userLevel==3?'企业广告商':''}}</span>
								</template>
							</el-table-column>
								<el-table-column  label="企业类型" >
									<div slot-scope="scope">
										<span v-if="scope.row.userEnterprise==0">非企业号</span>
										<span v-if="scope.row.userEnterprise==1">企业号</span>
									</div>
								</el-table-column>
							
								<el-table-column  label="佣金费率" width="150" >
								<p slot-scope="scope">{{ Math.floor(scope.row.firstRate*10000)/100 }}%</p>
									</el-table-column>
								<el-table-column prop="price" label="操作" fixed="right">
									<template slot-scope="scope">
										<el-button type="text" @click.native="$router.push({path:'/LegalCurrency/userQueryDetaile',query:{userId:scope.row.userId}})">查看详情</el-button>
										<el-button type="text" @click.native=" editType(scope.row) ">修改类型</el-button>
									</template>
								</el-table-column>
						</el-table>
				</el-main>
            <el-footer>
                <sac-pagination v-show="listData.list.length>0"
                    @handleChange="handleCurrentChange"
                    :total="+listData.total"
                    :page-size="filterForm.pageSize"
                    :current-page="filterForm.pageNum">
                </sac-pagination>
            </el-footer>
        </el-container>

				<el-dialog title="修改用户类型" :visible.sync="dialogFormVisible">
					<el-form :model="userTypeForm">
						<el-form-item label="广告商类型调整：" label-width="140px">
							<el-select v-model="userTypeForm.userLevel" placeholder="请选择广告商类型" >
								<el-option v-for="(item,index) in advList" :key = 'index' :label="item.value" :value="item.label"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="企业类型调整：" label-width="140px" >
							<el-select v-model="userTypeForm.userEnterprise" placeholder="请选择企业类型">
								<el-option v-for="(item,index) in companyType" :key = 'index' :label="item.value" :value="item.label "></el-option>
							</el-select>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="dialogFormVisible = false">取 消</el-button>
						<el-button type="primary" @click="updateOtcUserLevel">确 定</el-button>
					</div>
				</el-dialog>

    </div>
</template>
<script>
import { dateFormat } from "@/common/util";
export default {
    name:'transaction-details',
    data(){
        return{
						dialogFormVisible:false,
            selectedDate: [], //已选日期
            currentPage:1,
            filterForm:{
								pageNum:1,
								pageSize: 20,
								startDate:'',
								company:'',
								endDate:'',
								account:'',
								nickName:'',
								userLevel:'',
								userRole:'',
						},
						userTypeForm:{
							userLevel:'1',
							userEnterprise:'1',
						},
						advList:[
							{value:'普通用户',label:"0"},
							{value:'普通广告商',label:"1"},
							{value:'高级广告商',label:"2"},
							{value:'企业广告商',label:"3"},
						],
						companyType:[
							{value:'非企业',label:"0"},
							{value:'企业号',label:"1"},
						],
            listData: {
                total: null,
                list: [],
            },
        }
        
    },
    methods:{
        getList(){
					if(this.selectedDate.length == 2 ){
					this.filterForm.startDate = this.selectedDate && this.$fmtDate(this.selectedDate[0].getTime())+' 00:00:00';
					this.filterForm.endDate = this.selectedDate && this.$fmtDate(this.selectedDate[1].getTime())+' 23:59:59';
					}
					this.$http.post('/wallet/app/otc/backmgr/queryOtcUser',this.filterForm).then(res=>{
						const { list ,total} = res.result;
						this.listData.list = list;
						this.listData.total = total;
					})
				},
				// 
				updateOtcUserLevel(userid){
					this.$http.post('/wallet/app/otc/backmgr/updateOtcUserLevel',this.userTypeForm).then(res=>{
						this.$message.success('取消申诉操作成功')
						this.dialogFormVisible=false
						this.getList()
					})
				},
				dateChange(){
				},
				editType(data){
					this.userTypeForm = {
							userLevel:data.userLevel+'',
							userEnterprise:data.userEnterprise+'',
							userId:data.userId
						}
					this.dialogFormVisible=true
				},
				setDateType(){
					//获取系统当前时间
					let nowdate = new Date();
					let y = nowdate.getFullYear();
					let m = nowdate.getMonth()+1;
					let d = nowdate.getDate();
					let formatnowdate = y+'-'+m+'-'+d;
					this.selectedDate=[formatnowdate,formatnowdate]
				},
        search(){
            this.getList()
        },
        checkLog(){
            this.$router.push({
                path:'customer-log'
            })
        },
        checkDetails(){
            this.$router.push({
                path:'complaint-details'
            })
        },
        handleCurrentChange(val,currentPage) {
            this.filterForm.pageSize=val
            this.filterForm.pageNum=currentPage
            this.getList()
        },
        /* handleCurrentChange(val) {
            this.filterForm.pageNum=val
            this.getList()
        }, */
        download(){

            location.href =`${ SERVER_PATH}/wallet/app/otc/backmgr/exportExcel?startDate=${this.filterForm.startDate}&endDate=${this.filterForm.endDate}&userId=${this.filterForm.userId}&token=${localStorage.getItem('cus_token')}`;
        }
    },
    activated(){
        // this.setDateType()
        this.getList()
    }
}
</script>

<style scoped lang="less">
.userQuery-page{
     height:100%;
    .el-container{
        height:100%;
        .el-main{
            height:100%;
            width: 100%;
        }
    } 
    .el-form--inline .el-form-item__label{
        width:80px !important;
    }
		.form-group{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			/deep/.el-button{
				height: 40px;
				width: 100px;
			}
			/deep/.el-form-item__label{
				font-size: 14px;
				color: #000;
				// font-weight: 500;
			}
			&>.radioBox{
				display: flex;
				flex-direction: row;
				align-items: center;
				height: 40px;
				margin-right: 15px;
				margin-bottom: 15px;
				&>label{
					font-size: 14px;
					color: #000;
					margin-right: 10px;
					// font-weight: 500;
				}
				/deep/ .el-radio{margin-right: 0;}
				/deep/.el-radio__input{
					display: none;
				}
			}
		}
   /deep/ .dateItem  .el-form-item__content{
        width: 352px;
		}
		/deep/.el-radio__label{
			color: #909399;
			padding:0 10px;
			// padding-left: 0;
		}
		/deep/.is-checked{
			background: #409EFF;
			border-radius: 5px;
			padding: 3px 10px;
			margin-right: 10px;
			.el-radio__label{
				color: #fff;
				padding: 0;
			}
			
		}
}
  
</style>