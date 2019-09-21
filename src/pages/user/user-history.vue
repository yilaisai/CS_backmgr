
<template>
    <div class="user-history">
        <el-container>
            <el-header>
                <el-button type="primary" @click="routerReturn">返回</el-button>
            </el-header>
            <el-main>
                <el-table :data="listData.list" border  height="100%">
                    <el-table-column prop="userId" label="用户id"></el-table-column>
                    <el-table-column prop="userName" label="用户名"></el-table-column>
                    <el-table-column prop="result" label="客服操作行为"></el-table-column>
                    <el-table-column prop="sysUserName" label="处理客服"></el-table-column>
                    <el-table-column prop="sysUserId" label="处理客服ID"></el-table-column>
                    <el-table-column prop="createTime" label="处理时间"></el-table-column>
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
    name:'user-history',
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
            this.$http.post('/wallet/app/otc/backmgr/customInfoOperHistory',this.filterForm).then(res=>{
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
        this.getList()
    }
}
</script>
<style lang="less" scoped>

.user-history{
     height:100%;
    .el-container{
        height:100%;
        .el-main{
            height:100%;
            
        }
    } 
    
}
</style>
