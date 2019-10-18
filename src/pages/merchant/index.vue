
<template>
    <div class="merchant-page">
        <el-container>
					<el-main>
						<el-form :inline="true"  ref="filterForm" :model="filterForm" size="mini">
							<div class="form-group">
								<el-form-item class='dateItem' label="时间:">
									<el-date-picker
										v-model="selectedDate"
										type="daterange"
										range-separator="至"
										start-placeholder="开始日期"
										end-placeholder="结束日期" @change='filterForm.dateType=""'>
									</el-date-picker>
								</el-form-item>
								<el-form-item>
									<el-button  type="primary" size="mini" @click.native="search">搜索</el-button>
								</el-form-item>
							</div>
							<div class="form-group">
								<div class="radioBox">
									<label >状态:</label>
									<el-radio-group v-model="filterForm.status">
										<el-radio  label="">全部</el-radio>
										<el-radio v-for="(item,index) in statusList" :key="index" :label="item.label">{{item.value}}</el-radio>
									</el-radio-group>
								</div>
							</div>
						</el-form>
						<el-table :data="listData.list" border size="mini">
							<el-table-column label="商户名称" prop="name" ></el-table-column>
							<el-table-column label="手机号" prop="phone" ></el-table-column>
							<el-table-column label="邮箱" prop="email" ></el-table-column>
							<el-table-column label="手机号" prop="phone"  ></el-table-column>
								<el-table-column label="状态"  >
								<div slot-scope="scope">
										<p>{{ scope.row.status==1?'已审核':scope.row.status==2?'审核失败':'待审核' }}</p>
									</div>
							</el-table-column>
							<el-table-column label="注册时间"  >
								<div slot-scope="scope">
										<p>{{ $fmtDate(scope.row.createTime,'full') }}</p>
									</div>
							</el-table-column>
							<el-table-column prop="price" label="操作" fixed="right" width="120">
								<template slot-scope="scope">
									<el-button type="text" @click.native="$router.push({path:'/merchant/merchantDetaile',query:{data:scope.row}})">{{ scope.row.status==0?'审核':'查看详情' }}</el-button>
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


    </div>
</template>
<script>
import { dateFormat } from "@/common/util";
export default {
    name:'merchantList',
    data(){
        return{
            selectedDate: [], //已选日期
            currentPage:1,
            filterForm:{
								pageNum:1,
								pageSize: 20,
								startDate:'',
								endDate:'',
								status:'',
						},
						userTypeForm:{
							userLevel:'1',
							userRole:'1'
						},
						statusList:[
							{value:'待审核',label:"0"},
							{value:'已审核',label:"1"},
						],
            listData: {
                total: null,
                list: [],
            },
        }
        
    },
    methods:{
        getList(){
					if(this.selectedDate.length==2){
						this.filterForm.startDate = this.selectedDate && this.$fmtDate(this.selectedDate[0].getTime())+' 00:00:00';
						this.filterForm.endDate = this.selectedDate && this.$fmtDate(this.selectedDate[1].getTime())+' 23:59:59';
					}
					this.$http.post('/wallet/backmgr/merchant/apply/list',this.filterForm).then(res=>{
						const { list ,total} = res.result.page;
						this.listData.list = list;
						this.listData.total = total;
					})
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
        handleCurrentChange(val,currentPage) {
            this.filterForm.pageSize=val
            this.filterForm.pageNum=currentPage
            this.getList()
        },
    },
    activated(){
				// this.setDateType()
				
        this.getList()
    }
}
</script>

<style scoped lang="less">
.merchant-page{
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