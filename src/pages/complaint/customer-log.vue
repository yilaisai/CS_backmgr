/*
 * @Author: dubbing 
 * @Date: 2018-12-13 11:19:56 
 * @Last Modified by: dubbing
 * @Content: 查看客服操作日志
 * @Last Modified time: 2018-12-16 16:05:10
 */
<template>
    <div class="customer-log">
        <el-container>
            <el-header>
                <el-button type="primary" @click="routerReturn">返回</el-button>
            </el-header>
            <el-main>
                <el-table :data="listData.list" border  height="100%">
                    <el-table-column prop="TradeId" label="订单号" width="180"></el-table-column>
                    <el-table-column prop="masterUserId" label="用户id" width="80"></el-table-column>
                    <el-table-column prop="isBuyer" label="身份" width="60">
                        <template slot-scope="scope">
                            <span v-if="scope.row.isBuyer==1">卖家</span>
                            <span v-else>卖家</span>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="appealType" label="投诉类型" width="120"></el-table-column>
                    <!-- <el-table-column prop="appealType" label="投诉类型" width="130">
                        <template slot-scope="scope">
                            <span v-if="scope.row.appealType==0">其他</span>
                            <span v-if="scope.row.appealType==1">对方未付款</span>
                            <span v-if="scope.row.appealType==2">对方未放行</span>
                            <span v-if="scope.row.appealType==3">对方无应答</span>
                            <span v-if="scope.row.appealType==4">对方有欺诈行为</span>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="slaveUserId" label="被告ID" width="120"></el-table-column>
                    <el-table-column prop="referNo" label="付款参考号" width="120"></el-table-column>

                    <el-table-column prop="appealResult" label="申诉结果" width="120"></el-table-column>
                    <el-table-column prop="buyerResult" label="处理买方" width="120"></el-table-column>
                    <el-table-column prop="salerResult" label="处理卖方" width="120"></el-table-column>
                    <el-table-column prop="sysUserId" label="客服编号" width="80"></el-table-column>
                    <el-table-column prop="sysUserName" label="客服姓名" width="100"></el-table-column>
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
    name:'customer-log',
    data(){
        return{
            currentPage:1,
            filterForm:{
                pageNum:1,
                pageSize: 20
            },
            listData: {
                total: null,
                list: [],
            },
        }
    },
    methods:{
        getList(){
            this.$http.post('/wallet/app/otc/backmgr/appealRecdOperHistory',this.filterForm).then(res=>{
                const { list ,total} = res.result;
                this.listData.list = list;
                this.listData.total = total;
            })
        },
        handleCurrentChange(val,currentPage) {
            this.filterForm.pageSize=val
            this.filterForm.pageNum=currentPage
            this.getList()
        },
       
        routerReturn(){
            this.$router.go(-1)
        }
    },
    activated(){
        this.getList()
    }
}
</script>
<style lang="less" scoped>

.customer-log{
     height:100%;
    .el-container{
        height:100%;
        .el-main{
            height:100%;
            
        }
    } 
    
}
</style>

 
