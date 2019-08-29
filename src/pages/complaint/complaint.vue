
<template>
    <div class="complaint">
        <el-container>
            <el-header>
                <div class="left">
                    <el-input placeholder="请输入订单号" v-model="filterForm.tradeId" class="input-with-select">
                        <el-select v-model="filterForm.appealStatus"  slot="prepend" style="width:130px">
                            <el-option :label="item.label" :value="item.value" v-for="(item,index) in stateData" :key="index"></el-option>
                        </el-select>
                        
                        <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
                    </el-input>
                </div>
                <div class="right">
                    <el-button @click="checkLog" >查看客服操作日志</el-button>
                </div>
                <!-- <el-form :inline="true" label-width="120px" ref="filterForm" :model="filterForm">
                    <div class="title">
                        <el-form-item label="类型:">
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
                        </div>
                    </div>
                </el-form> -->
            </el-header>
            <el-main>
                <el-table :data="listData.list" border style="width: 100%" height="100%">
                    <el-table-column prop="tradeId" label="订单号" width="180"></el-table-column>
                    <el-table-column prop="userId" label="用户id" width="80"></el-table-column>
                    <el-table-column prop="appealType" label="投诉类型" width="130">
                        <template slot-scope="scope">
                            <span v-if="scope.row.appealType==0">其他</span>
                            <span v-if="scope.row.appealType==1">对方未付款</span>
                            <span v-if="scope.row.appealType==2">对方未放行</span>
                            <span v-if="scope.row.appealType==3">对方无应答</span>
                            <span v-if="scope.row.appealType==4">对方有欺诈行为</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="isBuyer" label="身份" width="60">
                        <template slot-scope="scope">
                            <span v-if="scope.row.isBuyer == 0">卖家</span>
                            <span v-else>买家</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="referNo" label="付款参考号" width="120"></el-table-column>
                    <el-table-column prop="appealCode" label="申诉对接口令" width="130"></el-table-column>
                    <el-table-column prop="appealId" label="申诉号" width="180"></el-table-column>
                    <el-table-column prop="tradeTime" label="投诉时间" width="180"></el-table-column>
                    <el-table-column label="操作" width="100" fixed="right">
                        <template slot-scope="scope">
                            <el-button  plain size="small" 
                                @click.native="checkDetails(scope.row)">查看详情
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
            <el-footer>
                <sac-pagination v-show="listData.list.length > 0"
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
    name:'complaint',
    data(){
        return{
            currentPage:1,
            filterForm:{
                appealStatus:'0',
                tradeId:'',
                pageNum:1,
                pageSize: 20
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
            this.$http.post('/wallet/app/otc/backmgr/infoShortList',this.filterForm).then(res=>{
                console.log(res)
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
                name:'customer-log'
            })
        },
        checkDetails(itemData){
            this.$router.push({
                name:'complaint-details',
                query:{
                    tradeId:itemData.tradeId,
                    appealId:itemData.appealId
                }
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
    },
    activated(){
        this.getList()
    }
}
</script>

<style scoped lang="less">
.complaint{
     height:100%;
    .el-container{
        height:100%;
        .el-main{
            height:100%;
            
        }
    } 
    
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
</style>