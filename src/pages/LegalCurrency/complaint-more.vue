/*
 * @Author: dubbing 
 * @Date: 2018-12-14 10:16:48 
 * @Last Modified by: dubbing
 * @Content: 投诉查看更多
 * @Last Modified time: 2018-12-16 16:07:07
 */
<template>
    <div class="complaint-more">
        <el-container>
            <el-header>
                <el-button type="primary" @click="routerReturn">返回</el-button>
            </el-header>
            <el-main>
                <el-table :data="listData.list" border  height="100%">
                    <el-table-column prop="tradeId" label="订单号" width="180"></el-table-column>
                    <el-table-column prop="userId" label="用户ID" width="80"></el-table-column>
                    <el-table-column prop="isBuyer" label="身份" width="60">
                        <template slot-scope="scope">
                            <span>{{scope.row.isBuyer|filterIsBuyer}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="appealType" label="投诉类型" width="120">
                        <template slot-scope="scope">
                            <span>{{scope.row.appealType|filterAppealType}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="appealId" label="申诉ID" width="180"></el-table-column>
                    <el-table-column prop="appealResult" label="申述处理" width="180">
                        <template slot-scope="scope">
                            <span>{{scope.row.appealResult|filterAppealResult}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sellerResult" label="卖家处罚" width="180">
                        <template slot-scope="scope">
                            <span>{{scope.row.sellerResult|filterSellerResult}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="TradeId" label="买家处罚" width="180">
                        <template slot-scope="scope">
                            <span>{{scope.row.buyerResult|filterSellerResult}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="referNo" label="参考号" width="180"></el-table-column>
                    
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
export default {
    name:'complaint-more',
    data(){
        return{
         
            currentPage:1,
            filterForm:{
                pageNum:1,
                pageSize: 20,
                userId:'',
                appealStatus:2
            },
            listData: {
                total: null,
                list: [],
            },
        }
    },
    filters:{
        filterAppealType(val){
            switch(val){
                case 1:
                    return '对方未付款'
                case 2:
                    return '对方未放行'
                case 3:
                    return '对方无应答'
                case 4:
                    return '对方有欺诈行为'
                default:
                    return '其他'
            }
        },
        filterIsBuyer(val){
            switch(val){
                case 0:
                    return '卖家'
                case 1:
                    return '买家'
                default:
                    return '其他'
            }
        },
        filterAppealResult(val){
            switch(val){
                case 0:
                    return '未确定'
                case 1:
                    return '胜诉'
                case 2:
                    return '败诉'
                case 3:
                    return '取消'
                default:
                    return '其他'
            }
        },
        filterSellerResult(val){
            switch(val){
                case 0:
                    return '不惩罚'
                case 1:
                    return '24之内不能交易'
                case 2:
                    return '永远不能交易'
                default:
                    return '其他'
            }
        },
    },
    methods:{
        getList(){
            this.$http.post('/wallet/app/otc/backmgr/infoShortList',this.filterForm).then(res=>{
                const { list ,total} = res;
                this.listData.list = list;
                this.listData.total = total;
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
            //console.log(`当前页: ${val}`);
        }, */
        routerReturn(){
            this.$router.go(-1)
        }
    },
    activated(){
        this.filterForm.userId=this.$route.query.userId
        this.getList()
    }
}
</script>
<style lang="less" scoped>

.complaint-more{
     height:100%;
    .el-container{
        height:100%;
        .el-main{
            height:100%;
            
        }
    } 
    
}
</style>
