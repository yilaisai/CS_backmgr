
<template>
    <div class="complaint">
        <el-container>
            <el-header>
                <!-- <div class="left">
                    <el-input placeholder="请输入订单号" v-model="filterForm.tradeId" class="input-with-select">
                        <el-select v-model="filterForm.appealStatus"  slot="prepend" style="width:130px">
                            <el-option :label="item.label" :value="item.value" v-for="(item,index) in stateData" :key="index"></el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
                    </el-input>
                </div> -->
                
                <el-form :inline="true"  ref="filterForm" :model="filterForm" size="mini" label-width="80px">
                    <el-form-item label="订单号:">
                        <el-input placeholder="请输入单号" v-model.trim="filterForm.tradeId" class="input-with-select"></el-input>
                    </el-form-item>
                    <el-form-item label="用户编号:">
                        <el-input placeholder="请输入用户编号" v-model.trim="filterForm.nickName" class="input-with-select"></el-input>
                    </el-form-item>
                    <el-form-item label="交易类型:">
                        <el-select v-model="filterForm.advType" >
                            <el-option v-for="(item, key) in advTypeList" :key="key" :value="item.value " :label="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="交易状态:">
                        <el-select v-model="filterForm.appealStatus" >
                            <el-option :label="item.label" :value="item.value" v-for="(item,index) in stateData" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-button @click="search" type="primary" >搜索</el-button>
                    <el-button @click="checkLog" >查看客服操作日志</el-button>
                </el-form>   
                <!-- <div class="right">
                    <el-button @click="checkLog" >查看客服操作日志</el-button>
                </div> -->
            </el-header>
            <el-main>
                <el-table :data="listData.list" border style="width: 100%" height="100%" size="mini">
                    <el-table-column prop="tradeId" label="订单号" align="center"></el-table-column>
                    <el-table-column prop="nickName" label="用户编号"  align="center" ></el-table-column>
                    <el-table-column prop="appealType" align="center" width="90" label="交易类型" >
                        <template slot-scope="scope">
                            <span>{{ scope.row.advType | advTypeFilter}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="isBuyer" label="身份"  align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.taker == 1">商户</span>
                            <span v-else>码商</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="appealId" label="申诉号" align="center" ></el-table-column>
                    <el-table-column  prop="tradeTime" label="投诉时间"  align="center"></el-table-column>
                    <el-table-column  prop="updateTime" label="判决时间"  align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.appealResult != 0">{{$fmtDate(scope.row.updateTime,'full')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120" >
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
                advType:'',
                pageNum:1,
                pageSize: 20
            },
            stateData:[
                {
                    label:'全部',
                    value:"2"
                },
                {
                    label:'处理中',
                    value:"0"
                },
                {
                    label:'已处理',
                    value:"1"
                },
            ],
            advTypeList:[
                {value:'',label:"全部"},
                {value:'1',label:"普通交易"},
                {value:'3',label:"抢单兑出"},
                {value:'4',label:"抢单兑入"},
                {value:'6',label:"派单兑出"},
                {value:'5',label:"派单兑入"},
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
                name:'complaintDetails',
                query:{
                    tradeId:itemData.tradeId,
					appealId:itemData.appealId,
					appealResult: itemData.appealResult
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
	 box-sizing: border-box;
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
/deep/.el-form{
    display: flex;
    flex-direction: row;
    .el-form-item{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .el-button{
        padding: 0 15px;
        height: 29px;
    }
}
   
</style>