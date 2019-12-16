/**
*  Created by   阿紫
*  On  2018/8/10
*  Content 用户查询
*/
<template>
  <div class='query'>
    <el-form :inline="true" label-width="86px" ref="filterForm" :model="filterForm" size="mini">
      <el-form-item class='dateItem' label="时间:">
        <el-date-picker
          v-model="selectedDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          format="yyyy-MM-dd "
          end-placeholder="结束日期" >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="账号:" >
        <el-input placeholder="请输入用户账号" v-model="filterForm.phone" ></el-input>
      </el-form-item>
      <el-form-item label="昵称:" >
        <el-input placeholder="请输入用户昵称" v-model="filterForm.nickName" ></el-input>
      </el-form-item>
      <el-form-item  label="用户类型:" >
         <el-select v-model="filterForm.userType" >
            <el-option value="" label='所有'></el-option>
            <el-option v-for="(item, key) in userTypeList" :key="key" :value="item.label" :label="item.value"></el-option>
          </el-select>
      </el-form-item>
	  <el-form-item><el-button class="search" size="mini" type="primary" @click="submitForm(1)">搜索</el-button></el-form-item>
    </el-form>
    <sac-table :data="listData.list">
      <el-table-column align="center" label="序号" type="index" width="50"></el-table-column>
      <!-- <el-table-column align="center" prop="userId" label="序号" width="100"></el-table-column> -->
      <el-table-column align="center" prop="phone" label=账号 width="130"></el-table-column>
      <el-table-column align="center" prop="nickName" label="昵称"></el-table-column>
      <el-table-column align="center" prop="realName" label="真实姓名"></el-table-column>
      <el-table-column align="center" prop="nickStatus" label="用户类型">
        <template slot-scope="scope">
          <span >{{scope.row.userType== 1?'普通用户':scope.row.userType== 20?'商户':'系统用户'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="cardNo" label="身份证号" width="160px"></el-table-column>
      <el-table-column align="center" prop="nickStatus" label="状态">
        <template slot-scope="scope">
          <span >{{scope.row.optStatus== 0?'正常':scope.row.optStatus== 1?'已锁定':'被冻结'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="registTime" label="注册时间" width="138">
        <div slot-scope="scope"> {{ $fmtDate(scope.row.registTime, 'full') }} </div>
      </el-table-column>
      <el-table-column align="center" label="操作" fixed="right" width="220px" >
        <template slot-scope="scope">
          <!-- <el-button size="small"  type="success"
                     @click="modify(scope.row)">修改
          </el-button> -->
          <el-button size="mini" v-show="scope.row.optStatus== 2" type="text"
                     @click="optStatusChange(0,'解冻账号',scope.row)">解冻账号
          </el-button>
          <el-button size="mini" v-show="scope.row.optStatus != 2" type="text"
                     @click="optStatusHandle(2,'冻结账号',scope.row)">冻结账号
          </el-button>
          <el-button size="mini" v-show="scope.row.optStatus== 1" type="text" plain
                     @click="optStatusChange(0,'解锁账号',scope.row)">解锁账号
          </el-button>
          <el-button size="mini" v-show="scope.row.optStatus== 0" type="text"
                     @click="optStatusHandle(1,'锁定账号',scope.row)">锁定账号
          </el-button>
          <el-button type="text" size="mini" @click.native="goDetail(scope.row.userId)">查看详情</el-button>
        </template>
      </el-table-column>
    </sac-table>
    <sac-pagination v-show="listData.list.length>0"
		@handleChange="getPaginationChange"
		:total="+listData.total"
		:page-size="filterForm.pageSize"
		:current-page="filterForm.pageNum">
    </sac-pagination>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
			<sac-input ref="phone" v-model="ruleForm.phone" label="手机号" prop="phone"></sac-input>
			<sac-input ref="nickName" v-model="ruleForm.nickName" label="昵称" prop="nickName"></sac-input>
			<sac-input ref="pwd" type="password" v-model="ruleForm.pwd" label="登录密码" placeholder="请输入6-16位密码" prop="pwd"></sac-input>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
			<el-button type="primary" @click="determine" size="small">确 定</el-button>
		</div>
    </el-dialog>

    <el-dialog title="备注" :visible.sync="optDialogFormVisible" class="opt-dialog-wrap">
		<el-form :model="dialogForm" :rules="optRules" ref="dialogForm">
			<el-form-item prop="optReason" :label="`${dialogForm.optStatus == 1 ? '锁定':'冻结'}账号${dialogForm.phone}理由：`">
				<el-input type="textarea"
					:autosize="{ minRows: 2, maxRows: 6 }"
					v-model="dialogForm.optReason" maxlength="50"
					placeHolder="请输入理由">
				</el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="optDialogFormVisible = false" size="small">取 消</el-button>
			<el-button type="primary" @click.native="optSubmit('dialogForm')" size="small">确 定</el-button>
		</div>
    </el-dialog>
    <el-dialog title="修改用户状态" :visible.sync="dialogVisible" width="40%">
        <el-form :inline="true" label-width="90px" ref="ruleForm"  :model="ruleForm">
            <el-form-item label="状态调整:" prop="status">
                <el-select v-model="ruleForm.status">
                    <el-option :label="item.label" :value="item.value" v-for="(item,index) in ruleState" :key="index"></el-option>
                    <!--   <el-option label="ETH" value="2"></el-option> -->
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogConfirm">确认</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  import Md5 from '../../../static/js/md5';

  export default {
    name: 'query',
    data() {
      const checkUserName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入用户名'));
        }
        callback();
      }
      const checkPwd = (rule, value, callback) => {
        if (!value || value.length < 6 || value.length > 16) {
          return callback(new Error('请输入6-16位密码'));
        }
        callback();
      };
      return {
        selectedDate: [],
        dialogVisible:false,
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
        userTypeList:[
          {value:'普通用户',label:"1"},
          {value:'商户',label:"20"},
          {value:'系统用户',label:"100"},
        ],
        filterForm: {
          company:"",
          phone: '',
          nickName: '',
          cardNo: '',
		  coinAddr: '',
		  userType: '',
          pageNum: 1,
          pageSize: 20
        },
        listData: {
          total: null,
          list: [],
        },
        dialogTitle: '创建用户',
        ruleForm: {
          phone: '',
          pwd: '',
          nickName: '',
        },
        rules: {
          phone: [
            { required: true, validator: checkUserName, trigger: 'blur' },
          ],
          pwd: [
            { required: true, validator: checkPwd, trigger: 'blur' },
          ],
        },
        optRules: {
          optReason: [
            { required: true, message: '请输入理由', trigger: 'blur' },
          ]
        },
        dialogForm: {
          userId: '',
          optStatus: '',
          phone:'',
          optReason: ''
        },
        dialogFormVisible: false,
        optDialogFormVisible: false
      };
    },
    activated(){
      this.getUserInfoList()
    },
    methods: {
       	indexMethod(index) {
			return 10*(this.filterForm.pageNum-1)+(index+1)
		},
		dialogConfirm(){
			this.ruleState.forEach(v=>{
				if(v.value==this.ruleForm.status){
					this.ruleForm.reason=v.label
					return
				}
			})
			this.$refs.ruleForm.validate(valid => {
				if (valid) {
				this.$http.post("/wallet/app/otc/backmgr/setCustomStatus", this.ruleForm).then(res => {
					this.$notify({
						title: "成功",
						message: `修改成功`,
						type: "success"
					});
						this.dialogVisible = false;
					});
				} else {
					return false;
				}
			})
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
		submitForm(num) {
			if(this.selectedDate && this.selectedDate.length == 2 ){
				this.filterForm.startDate = this.selectedDate && this.$fmtDate(this.selectedDate[0].getTime())+' 00:00:00';
				this.filterForm.endDate = this.selectedDate && this.$fmtDate(this.selectedDate[1].getTime())+' 23:59:59';
			}else {
				this.filterForm.startDate = null
				this.filterForm.endDate = null
			}
			this.filterForm.pageNum = num
			const { phone, nickName, userLevel,company, endDate } = this.filterForm
			this.getUserInfoList()
			// if (phone || nickName || userLevel || company || endDate) {
			// 	this.getUserInfoList();
			// } else {
			// 	this.$notify.error({
			// 		title: '错误',
			// 		message: '查询内容不能为空'
			// 	})
			// }
		},
		getUserInfoList() {
			this.$http.post('/wallet/backmgr/user/getUserInfoList', this.filterForm)
			.then((res) => {
				const { list, total } = res.result.list;
				this.listData.list = list;
				this.listData.total = total;
			});
		},
		getPaginationChange(val, currentPage) {
			this.filterForm.pageSize = val;
			this.filterForm.pageNum = currentPage;
			this.getUserInfoList()
		},
		goDetail(userId) {
			this.$router.push({ name: 'queryDetails', query: { userId:userId } });
		},
		/**
		 * 冻结/解冻 锁定/解锁 用户   optStatus  用户状态：2表示冻结，1表示锁定，0表示解冻
		 * */
		optStatusHandle(type, title, data) {
			this.optDialogFormVisible = true;
			this.dialogForm = {
			userId: data.userId,
			optStatus: type,
			phone: data.phone,
			optReason: ''
			}
		},
		optStatusChange(type, title, data) {
			const h = this.$createElement;
			this.$msgbox({
			title: '提示',
			message: h('p', null, [
				h('span', null, '确定执行 '),
				h('span', { style: 'color: red' }, `${title} `),
				h('span', { style: 'color: #0a52e0' }, `${data.phone}`),
				h('span', null, ' 吗?'),
			]),
			showCancelButton: true,
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			beforeClose: (action, instance, done) => {
				if (action === 'confirm') {
				this.$http.post('wallet/backmgr/user/operatetUser', {
					userId: data.userId,
					optStatus: type,
				}).then((res) => {
					this.$notify({
					title: '成功',
					message: `${title} ${data.phone} 成功`,
					type: 'success'
					});
					this.getUserInfoList();
					done();
				})
				} else {
				done();
				}
			}
			})
		},
		optSubmit(formName) {
			this.$refs[formName].validate((valid) => {
			if (!valid) return;
			const title = this.dialogForm.optStatus == 1 ? '锁定' : '冻结';
			this.$http.post('wallet/backmgr/user/operatetUser', this.dialogForm).then((res) => {
				this.$notify({
				title: '成功',
				message: `${title} ${this.dialogForm.phone} 成功`,
				type: 'success'
				});
				this.optDialogFormVisible = false;
				this.getUserInfoList();
			})
			})
		},
		// 创建用户
		addUser() {
			this.dialogTitle = '创建用户';
			this.dialogFormVisible = true;
			this.ruleForm = {
			phone: '',
			pwd: '',
			nickName: '',
			};
			this.$refs.ruleForm && this.$refs.ruleForm.resetFields(); // 重置query的数据
		},
		determine() {
			const { phone, nickName } = this.ruleForm;
			const pwd = Md5(this.ruleForm.pwd);
			this.$http.post('wallet/backmgr/user/addUsers', {
			pwd,
			phone,
			nickName
			}).then((res) => {
			this.$notify({
				title: '成功',
				message: `创建用户 ${this.ruleForm.phone} 成功`,
				type: 'success'
			});
			this.dialogFormVisible = false;
			});
		}
	}
  };
</script>
<style lang="less" scoped>
.query {
	overflow: hidden;
}
.dateItem{
  width: 442px;
}
  .opt-dialog-wrap {
    .el-dialog {
      padding: 0;
      &__body {
        padding: 0 20px;
      }
    }
  }
</style>
