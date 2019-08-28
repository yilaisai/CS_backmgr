/*
 * @Author: dubbing 
 * @Date: 2018-12-12 16:15:55 
 * @Last Modified by: dubbing
 * @Content: 用户处理
 * @Last Modified time: 2018-12-17 10:06:04
 */

<template>
    <div class="user-processing">
        <el-container>
            <el-header class="filter-header">
                <div class="left">
                    <el-input :placeholder="`请输入${placeWord}`" v-model="filter_text" class="input-with-select">
                        <el-select v-model="status"  slot="prepend" @change="selChange" style="width:130px">
                            <el-option :label="item.label" :value="item.value" v-for="item in stateData"></el-option>
                        </el-select>
                        
                        <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
                    </el-input>
                </div>
                <div class="right">
                    <el-button @click="checkLog" >查看历史处理记录</el-button>
                </div>
            </el-header>
            <el-main>
                <el-table :data="listData.list" border style="width: 100%" height="100%">
                    <el-table-column prop="userId" label="用户id"></el-table-column>
                    <el-table-column prop="userName" label="用户名"></el-table-column>
                    <el-table-column prop="reason" label="当前状态"></el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button  plain size="small" 
                                @click.native="modify(scope.row)">修改
                            </el-button>
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
            <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%">
                <el-form :inline="true" label-width="90px" ref="ruleForm"  :model="ruleForm">
                    <el-form-item label="状态调整:" prop="status">
                        <el-select v-model="ruleForm.status">
                            <el-option :label="item.label" :value="item.value" v-for="item in ruleState"></el-option>
                            <!--   <el-option label="ETH" value="2"></el-option> -->
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogConfirm">确认</el-button>
                </span>
            </el-dialog>
        </el-container>

    </div>
</template>
<script>
import { dateFormat } from "@/common/util";
export default {
    name:'user-processing',
    data(){
        return{
            ruleForm:{
                userId:'',
                reason:'',
                status:0
            },
            ruleState:[
                {
                    label:'正常状态',
                    value:0
                },
                {
                    label:'24小时冻结',
                    value:1
                },
                {
                    label:'永远冻结',
                    value:2
                }
            ],
            dialogTitle:'修改用户状态',
            dialogVisible:false,
            currentPage:1,
            status:'0',
            filter_text:'',
            filterForm:{
                pageNum:1,
                pageSize: 20,
            },
            placeWord:'用户ID',
            stateData:[
                {
                    label:'用户ID',
                    value:"0",
                    key:'userId'
                },
                {
                    label:'订单ID',
                    value:"1",
                    key:'tradeId'
                },
                {
                    label:'邮箱',
                    value:"2",
                    key:'email'
                },
                {
                    label:'姓名',
                    value:"3",
                    key:'realName'
                },
                {
                    label:'手机号',
                    value:"4",
                    key:'phone'
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
            let postData={...this.filterForm}
            //console.log(postData)
            if(this.filter_text!==''){
                this.stateData.forEach(v=>{
                    if(v.value==this.status){
                        postData={...postData,[v.key]:this.filter_text}
                    }
                })
            }
            //console.log(postData)
            this.$http.post('/wallet/app/otc/backmgr/getCustomList.do',postData).then(res=>{
                const { list ,total} = res;
                this.listData.list = list;
                this.listData.total = total;
            })
        },
        search(){
            this.getList()
        },
        modify(itemData){
            this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
            let default_status=0
            this.ruleState.forEach(v=>{
                if(v.label==itemData.reason){
                    default_status=v.value
                    return
                }
            })
            this.ruleForm.userId=itemData.userId
            this.ruleForm.status=default_status
            this.dialogVisible=true
        },
        selChange(v){
            this.stateData.forEach((item,index)=>{
                if(item.value == v){
                    this.placeWord = item.label;
                    return
                }
            })
        },
        dialogConfirm(){
            this.ruleState.forEach(v=>{
                if(v.value==this.ruleForm.status){
                    this.ruleForm.reason=v.label
                    return
                }
            })
            //console.log(this.ruleForm)
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                this.$http.post("/wallet/app/otc/backmgr/setCustomStatus.do", this.ruleForm).then(res => {
                    this.$notify({
                        title: "成功",
                        message: `修改成功`,
                        type: "success"
                    });
                        this.dialogVisible = false;
                        this.getList();
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
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
        checkLog(){
             this.$router.push({
                name:'user-history'
            })
        }
    },
    activated(){
        this.getList()
    }
}
</script>

<style scoped lang="less">
.user-processing{
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
}

</style>