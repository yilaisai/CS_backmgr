/*
 * @Author: dubbing 
 * @Date: 2018-12-17 15:03:52 
 * @Last Modified by: dubbing
 * @Content 红包查询详情
 * @Last Modified time: 2018-12-19 11:39:02
 */
<template>
    <div class="red-envelope-detail">
        <el-form :inline="true" label-width="120px" ref="filterForm" :model="filterForm">
            <div class="title">
                <el-row style="margin-bottom: 20px;">
                    <el-col :span="20">
                        <el-button size="small" type="primary" plain @click="$router.go(-1)">返回</el-button>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom: 20px;">
                    <div><span style="font-size:20px;font-weight:bold;">发红包方:  </span><span style="margin-left:10px;color:red">{{phone}}</span></div>
                </el-row>
            </div>
        </el-form>
        <sac-table :data="listData.list">
            <el-table-column align="center" prop="phone" label="领红包方">
                <template slot-scope="scope">
                    <span style="color:red" v-if="search==scope.row.phone">{{scope.row.phone}}</span>
                    <span v-else>{{scope.row.phone}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="createTime" label="领取时间"></el-table-column>
            <el-table-column align="center" prop="amount" label="领取金额"></el-table-column>
        </sac-table>
        <!-- <sac-pagination v-show="listData.list.length>0"
            @handleChange="getPaginationChange"
            :total="+listData.total"
            :page-size="filterForm.pageSize"
            :current-page="filterForm.pageNum">
        </sac-pagination> -->
    </div>
</template>
<script>

export default {
    name:'red-envelope-detail',
    data(){
        return{
            search:'',
            phone:'',
            listData: {
                total: null,
                list: [],
            },
            filterForm:{
                packetId:''
            },
        }
    },
    methods:{
        getbill() {
            this.$http.post('cloud/asset/open/queryDrawRecdList',this.filterForm).then((res) => {
                this.listData.list = res.result.list;
            });
        }
    },  
    activated(){
        this.filterForm.packetId=this.$route.query.packetId
        this.phone=this.$route.query.phone
        this.search=this.$route.query.search
        this.getbill()
    }
}
</script>
<style lang="less" scoped>
    .red-date{
        width:525px;
    }
</style>

 
 
