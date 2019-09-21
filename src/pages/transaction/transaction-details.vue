/*
 * @Author: dubbing 
 * @Date: 2018-12-12 16:13:45 
 * @Last Modified by: dubbing
 * @Content: 交易详情
 * @Last Modified time: 2018-12-17 10:05:03
 */
<template>
    <div class="transaction-details">
        <el-container>
            <el-header class="filter-header">
                
                <el-form :inline="true"  ref="filterForm" :model="filterForm">
                    <div class="title">
                        <el-form-item class='dateItem' label="时间:">
                            <el-date-picker
                                v-model="selectedDate"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="币种:">
                            <el-input v-model="filterForm.coinName" placeholder=请输入币种></el-input>
                        </el-form-item>
                        
                        <el-form-item label="用户ID:">
                            <el-input placeholder="请输入用户ID" v-model="filterForm.userId" class="input-with-select">
                                <el-button slot="append"  icon="el-icon-search" @click="search">搜索</el-button>
                            </el-input>
                        </el-form-item>
                        <div class="el-form-item__content" style="width:100px">
                            <el-button  type="primary"  
                                @click.native="download">下载全部
                            </el-button>
                        </div>
                        <!-- <el-form-item label="类型:">
                            <el-select v-model="filterForm.appealStatus"  >
                                <el-option :label="item.label" :value="item.value" v-for="item in stateData"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="订单号:">
                            <el-input v-model="filterForm.tradeId" placeholder=请输入订单号></el-input>
                        </el-form-item>
                        <div class="el-form-item__content" style="width:100px">
                            <el-button  type="primary"  
                                @click.native="search">搜索
                            </el-button>
                        </div>
                        <div class="el-form-item__content" style="width:100px">
                            <el-button  type="primary"  
                                @click.native="search">查看客服操作日志
                            </el-button>
                        </div> -->
                    </div>
                </el-form>
            </el-header>
            <el-main>
                <el-table :data="listData.list" border style="width: 100%" height="100%">
                    <el-table-column prop="ctUserId" label="交易方ID" width="180"></el-table-column>
                    <el-table-column prop="ctRealName" label="交易方姓名" width="180"></el-table-column>
                    <el-table-column prop="ctPhone" label="交易方手机号" width="180"></el-table-column>
                    <el-table-column prop="userId" label="广告方ID" width="180"></el-table-column>
                    <el-table-column prop="realName" label="广告方姓名" width="180"></el-table-column>
                    <el-table-column prop="phone" label="广告方手机号" width="180"></el-table-column>
                    <el-table-column prop="coinName" label="币种" width="180"></el-table-column>
                    <el-table-column prop="tradeTime" label="交易时间" width="180"></el-table-column>
                    <el-table-column prop="tradeType" label="交易类型" width="180">
                        <template slot-scope="scope">
                            <span v-if="scope.row.tradeType==1">买入</span>
                            <span v-else>卖出</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="tradeId" label="交易号" width="180"></el-table-column>
                    <el-table-column prop="tradeStatus" label="交易状态" width="180">
                        <template slot-scope="scope">
                            <span v-if="scope.row.tradeStatus==1">未付款</span>
                            <span v-if="scope.row.tradeStatus==2">已付款</span>
                            <span v-if="scope.row.tradeStatus==3">已完成</span>
                            <span v-if="scope.row.tradeStatus==4">人为取消</span>
                            <span v-if="scope.row.tradeStatus==5">申诉中</span>
                            <span v-if="scope.row.tradeStatus==6">申诉后完成交易</span>
                            <span v-if="scope.row.tradeStatus==7">申诉后取消交易</span>
                            <span v-if="scope.row.tradeStatus==8">支付超时取消</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="amount" label="交易金额" width="180"></el-table-column>
                    <el-table-column prop="counts" label="交易数量" width="180"></el-table-column>
                    <el-table-column prop="price" label="交易价格" width="180"></el-table-column>
                </el-table>
            </el-main>
            <el-footer>
                <sac-pagination v-show="listData.list.length>0"
                    @handleChange="handleCurrentChange"
                    :total="+listData.total"
                    :page-size="filterForm.pageSize"
                    :current-page="filterForm.pageNum">
                </sac-pagination>
                <!-- <el-pagination
                    v-show="listData.list.length>0"
                    background
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="filterForm.pageSize"
                    layout="total, prev, pager, next"
                    :total="+listData.total">
                </el-pagination> -->
            </el-footer>
        </el-container>

    </div>
</template>
<script>
import { dateFormat } from "@/common/util";
export default {
    name:'transaction-details',
    data(){
        return{
            selectedDate: [], //已选日期
            currentPage:1,
            filterForm:{
                pageNum:1,
                pageSize: 20,
                coinName:'',
                startDate:'',
                endDate:'',
                userId:''
            },
            stateData:[
                {
                    label:'处理中',
                    value:"0"
                },
                {
                    label:'已处理',
                    value:"1"
                },
                {
                    label:'全部',
                    value:"2"
                },
            ],
            listData: {
                total: null,
                list: [],
            },
        }
        
    },
    methods:{
        getList(){
            this.filterForm.startDate = this.selectedDate && this.selectedDate[0];
            this.filterForm.endDate = this.selectedDate && this.selectedDate[1];
            this.$http.post('/wallet/app/otc/backmgr/getTradeList',this.filterForm).then(res=>{
                const { list ,total} = res.result;
                this.listData.list = list;
                this.listData.total = total;
            })
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
        const end = dateFormat(new Date())
        //const start = dateFormat(new Date().getTime() - 3600 * 1000 * 24 * 30);
        this.selectedDate = [end, end];
        //console.log(this.selectedDate)
        this.getList()
    }
}
</script>

<style scoped lang="less">
.transaction-details{
     height:100%;
    .el-container{
        height:100%;
        .el-main{
            height:100%;
            
        }
    } 
    .el-form--inline .el-form-item__label{
        width:80px !important;
    }
    .el-header{
        background: #fff;
        overflow: hidden;
        .left{
            width: 50%;
            float: left;
        }
        .right{
            float: right;
            overflow: hidden;
        }
    }  
   /deep/ .dateItem  .el-form-item__content{
        width: 340px;
    }
}
  
</style>