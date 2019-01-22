/*
 * @Author: dubbing 
 * @Date: 2018-12-17 11:45:19 
 * @Last Modified by: dubbing
 * @Content 红包查询
 * @Last Modified time: 2018-12-19 14:50:55
 */
<template>
    <div class="red-envelope">
        <el-form :inline="true" label-width="120px" ref="filterForm" :model="filterForm">
            <div class="title">
                <el-form-item label="账号" class="el-input--small">
                    <el-input v-model="filterForm.phone" placeholder="请输入账号"></el-input>
                </el-form-item>
                <sac-coin ref="coinId" v-model="filterForm.coinId"></sac-coin>
                <sac-select ref="tradeType" label="类型" v-model="filterForm.queryType" :dataList="typeData"></sac-select>
                <el-form-item label="日期"  class="red-date">
                    <el-date-picker
                    v-model="selectedDate"
                        :editable="false"
                        type="datetimerange"
                        align="center"
                        size="small"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
             <!--    <sac-date ref="selectedDate" label="日　　期" v-model="selectedDate"></sac-date> -->
                <sac-submit-form @submitForm="submitForm(1)" :isReset="false"></sac-submit-form>
            </div>
        </el-form>
        <sac-table :data="listData.list">
            <el-table-column align="center" prop="phone" label="发红包方">
                <template slot-scope="scope">
                    <span style="color:red" v-if="filterForm.phone==scope.row.phone">{{scope.row.phone}}</span>
                    <span v-else>{{scope.row.phone}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="coinName" label="币种"></el-table-column>
            <el-table-column align="center" prop="amount" label="红包总额"></el-table-column>
            <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
            <el-table-column align="center" prop="num" label="已领取/总个数">
                <template slot-scope="scope">
                    <span>{{scope.row.drawNum}}/{{scope.row.num}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" prop="drawAmount" label="已领取金额"></el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button  plain size="small" 
                        @click.native="check(scope.row)">查看详情
                    </el-button>
                </template>
            </el-table-column>
        </sac-table>
        <sac-pagination v-show="listData.list.length>0"
            @handleChange="getPaginationChange"
            :total="+listData.total"
            :page-size="filterForm.pageSize"
            :current-page="filterForm.pageNum">
        </sac-pagination>
    </div>
</template>
<script>
  import { dateFormat } from '@/common/util';
export default {
    name:'red-envelope',
    data(){
        return{
            listData: {
                total: null,
                list: [],
            },
            selectedDate:[],
            filterForm:{
                coinId:'',
                queryType:0,
                phone:'',
                beginTime:'',
                endTime:'',
                pageNum: 1,
                pageSize: 20
            },
            typeData:[
                {
                    label:'全部',
                    value:0
                },
                {
                    label:'发红包',
                    value:1
                },
                {
                    label:'收红包',
                    value:2
                }
            ]
        }
    },
    methods:{
        getbill() {
            
            this.filterForm.beginTime = this.selectedDate && this.selectedDate[0];
            this.filterForm.endTime = this.selectedDate && this.selectedDate[1];
            if(!this.selectedDate){
                this.$notify({
                    title: '失败',
                    message: `请选择日期`,
                    type: 'error'
                });
                return false
            }
            this.$http.post('cloud/asset/open/queryRedPacketRecd', this.filterForm).then((res) => {
                const { list,total } = res.result.list;
                this.listData.list = list;
                this.listData.total = total;
            });
        },
        check(itemData){
            //alert(itemData.main_redenvlp_id)
            this.$router.push(
                {
                    name:'red-envelope-detail',
                    query:{
                        packetId:itemData.mainRedenvlpId,
                        phone:itemData.phone,
                        search:this.filterForm.phone
                    }
                }
            )
        },
        submitForm(num) {
            this.filterForm.pageNum = num;
            this.getbill();
        },
        getPaginationChange(val, currentPage) {
            this.filterForm.pageSize = val;
            this.submitForm(currentPage);
        },
    },
    mounted(){
        const end = dateFormat(new Date(),'YYYY-MM-DD HH:mm:ss');
        const start = dateFormat(new Date().getTime() - 3600 * 1000 * 24 * 15,'YYYY-MM-DD HH:mm:ss');
        this.selectedDate = [start, end];
        this.getbill() 
    }
}
</script>
<style lang="less" scoped>
    .red-date{
        width:525px;
    }
</style>

