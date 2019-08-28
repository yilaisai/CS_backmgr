/*
 * @Author: shanks 
 * @Date: 2019-08-19 11:47:47
 * @Last Modified by: shanks
 * @Content: 商家申请审核
 * @Last Modified time: 2019-08-19 11:47:47
 */
 
<template>
    <el-container>
        <el-header>
            <div class="left">
                <el-input placeholder="请输入内容" v-model="keyWord" class="input-with-select">
                    <el-select v-model="option.auditStatus" slot="prepend" style="width:130px" @change="selChange" placeholder="请选择">
                        <el-option label="待审核" value="0"></el-option>
                        <el-option label="审核成功" value="1"></el-option>
                        <el-option label="审核未通过" value="2"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="search" type="success">搜索</el-button>
                </el-input>
            </div>
            <!-- <div class="right">
                <el-button @click="allAudit">{{option.auditStatus == '' ? '查看全部待审核' :'查看全部'}}</el-button>
            </div> -->
        </el-header>
        <el-main>
            <el-table
                :data="tableData"
                border
                style="width: 100%"
                height="100%"
                >
                <el-table-column fixed prop="userId" label="用户ID" width="120"></el-table-column>
                <!-- <el-table-column prop="realName" label="用户名称"></el-table-column>
                <el-table-column prop="phone" label="电话号码"></el-table-column> -->
                <el-table-column prop="auditUserName" label="审批人"></el-table-column>
                <el-table-column prop="createTime" label="创建时间">
					<template slot-scope="scope">
						<span>{{$fmtDate(scope.row.createTime)}}</span>
					</template>
				</el-table-column>
                <el-table-column prop="auditComment" label="备注" width="130px"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="primary" :disabled="scope.row.auditStatus != 0" size="small">审核</el-button>
					</template>
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer>
            <sac-pagination v-show="tableData.length>0"
                @handleChange="handleCurrentChange"
                :total="+total"
                :page-size="option.pageSize"
                :current-page="option.pageNum">
            </sac-pagination>
        </el-footer>

		<el-dialog
			title="审核"
			:visible.sync="dialogVisible"
			width="30%">
			<el-form ref="form" label-width="80px" label-position="top">
				<el-form-item label="审核备注">
					<el-input type="textarea" v-model.trim="remark"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="danger" @click="updateAuditStatus(0)">不通过</el-button>
				<el-button type="success" @click="updateAuditStatus(1)">通 过</el-button>
			</span>
		</el-dialog>
    </el-container>
</template>
<script>
export default {
    name:'data-approval',
    data(){
        return{
            searchType:'0',
            keyWord:'',
            currentPage:1,
            option:{
                pageSize:20,
                pageNum:1,
                realName:'',
                phone:'',
                email:'',
                userId:'',
                auditStatus: '0'
            },
            total:0,
			tableData: [],
			dialogVisible: false,
			remark: '',
			activeItemData: {}
        }
    },
    methods:{
        search(){
            this.currentPage=1;
            this.option.pageSize=10;
            this.option.pageNum=1;
            if(this.keyWord){
                this.option[this.searchType] = this.keyWord;
                this.getList(this.option);
            }else{
                this.option[this.searchType] = '';
                this.getList(this.option);
            }
        },
        handleClick(row) {
			this.activeItemData = row
			this.dialogVisible = true
        },
        handleCurrentChange(val,currentPage) {
            this.option.pageSize=val
            this.option.pageNum=currentPage
            this.getList(this.option)
        },
        /* handleCurrentChange(val) {
            this.option.pageNum = val;
            this.getList(this.option)
        }, */
        getList(option){
            this.$http.post('/wallet/app/otc/backmgr/getAuditList.do',option).then((res)=>{
				console.log(res)
                this.tableData = res.list;
                this.total = +res.total;
            })
		},
		// 修改审核状态
		updateAuditStatus(status) {
			if(this.remark == '') {
				this.$notify.info({
					title: '消息',
					message: '请填写备注'
				});
				return
			}
			this.$http.post('/wallet/app/otc/backmgr/updateAuditStatus.do', {
				recdId: this.activeItemData.recdId,
				remark: this.remark,
				status: status
			}).then(res => {
				this.$notify({
                    title: '成功',
                    message: res.msg,
                    type: 'success'
                })
                this.dialogVisible = false
                this.remark = ""
			})
		},
        allAudit(){
            this.option.auditStatus == '' ? this.option.auditStatus = 0 : this.option.auditStatus = '';
            this.getList(this.option);
        },
        selChange(){
            
            this.option.realName = '';
            this.option.phone = '';
            this.option.email = '';
            this.option.userId = '';
        }
    },
    activated(){
       this.getList(this.option)
    },
}
</script>
<style scoped lang="less">
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
.el-footer{
    // text-align: center;
}
.el-container{
    height: 100%;
    .el-main{
        height: 100%;
    }
}
</style>