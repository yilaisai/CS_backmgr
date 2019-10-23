<template>
    <el-container>
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
        <el-table :data="tableData" border style="width: 100%" height="100%" size="mini">
            <el-table-column align="center" prop="phone" label="账户" width="130px"></el-table-column>
            <el-table-column align="center" prop="nickName" label="昵称" width="130px"></el-table-column>
			<el-table-column align="center"  label="保证金">
                <template slot-scope="scope">
					<span>{{scope.row.amount +" "+ scope.row.coinName}}</span>
				</template>
            </el-table-column>
			<el-table-column align="center"  label="状态">
                <template slot-scope="scope">
					<span>{{scope.row.auditStatus==0?'待审核':scope.row.auditStatus==1?'审核成功':'审核失败'}}</span>
				</template>
            </el-table-column>
            <el-table-column align="center"  label="申请操作">
                <template slot-scope="scope">
					<span>{{scope.row.auditType==1?'取消广告商':scope.row.auditType==2?'成为广告商':''}}</span>
				</template>
            </el-table-column>
			<el-table-column align="center" prop="createTime" label="申请时间">
				<template slot-scope="scope">
					<span>{{$fmtDate(scope.row.createTime,'full')}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="auditComment" label="备注" width="130px"></el-table-column>
			<el-table-column align="center" fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="primary" v-if="scope.row.auditStatus == 0" size="small">审核</el-button>
				</template>
			</el-table-column>
		</el-table>
        <sac-pagination v-show="tableData.length>0"
			@handleChange="handleCurrentChange"
			:total="+total"
			:page-size="option.pageSize"
			:current-page="option.pageNum">
		</sac-pagination>
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
				<el-button type="danger" @click="updateAuditStatus(2)">不通过</el-button>
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
        getList(option){
            this.$http.post('/wallet/app/otc/backmgr/getAuditList',option).then((res)=>{
				
                this.tableData = res.result.list;
                this.total = +res.result.total;
                console.log(this.tableData)
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
			this.$http.post('/wallet/app/otc/backmgr/updateAuditStatus', {
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