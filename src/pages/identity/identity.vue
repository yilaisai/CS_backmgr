<template>
  	<div class="sac-home">
		<div class="sac-queryCondition">
			<el-form class="filter-container" :inline="true" label-width="80px" ref="filterForm" :model="filterForm" size="mini">
				<el-form-item label="审核状态">
					<el-select v-model="filterForm.auditStatus" placeholder="请选择">
						<el-option v-for="item in identityType" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model.trim="filterForm.phone" placeholder="请输入" clearable></el-input>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input v-model.trim="filterForm.realName" placeholder="请输入" clearable></el-input>
				</el-form-item>
				<el-form-item label="身份证">
					<el-input v-model.trim="filterForm.cardNo" placeholder="请输入" clearable></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm(1)">查询</el-button>
					<el-button type="danger" @click="quickAudit">一键审核</el-button>
				</el-form-item>
			</el-form>
		</div>
		<sac-table :data="listData.list" size="mini">
			<el-table-column prop="phone" label="账号" align="center"></el-table-column>
			<el-table-column prop="realName" label="姓名" align="center"></el-table-column>
			<el-table-column prop="cardNo" label="身份证号码" align="center"></el-table-column>
			<el-table-column label="状态" align="center">
				<template slot-scope="scope">{{antiMoneyAuditMap[scope.row.antiMoneyAudit]}}</template>
			</el-table-column>
			<el-table-column label="操作" prop="tradeStatus" align="center">
				<template slot-scope="scope" prop="tradeStatus">
					<el-button type="success" size="mini" @click.native="goDetails(scope.row)">查看详情</el-button>
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
import { identityType } from '@/common/constants';

export default {
	name: 'home',
	components: {},
	data() {
		return {
			filterForm: {
				auditStatus: "",
				phone: "",
				realName: '',
				cardNo: '',
				pageNum: 1,
				pageSize: 20
			},
			listData: {
				total: null,
				list: [],
			},
			antiMoneyAuditMap: {
				[-1]: '未申请',
				0: '不通过',
				1: '通过',
				2: '待审核'
			},
			identityType
		}
	},
	methods: {
		resetForm() {
			this.$refs.phone.reset();
			this.$refs.realName.reset();
			this.$refs.cardNo.reset();
			this.filterForm.auditStatus = '';
			this.$refs.filterForm.resetFields(); // 重置query的数据
			this.filterForm.pageNum = 1;
			this.getWaittingAuditUser();
		},
		submitForm(num) {
			this.filterForm.pageNum = num;
			this.getWaittingAuditUser();
		},
		getPaginationChange(val, currentPage) {
		this.filterForm.pageSize = val;
		this.submitForm(currentPage);
		},
		getWaittingAuditUser() {
		this.$http.post('wallet/backmgr/user/getWaittingAuditUser', this.filterForm)
			.then((res) => {
			const { list, total } = res.result.list;
			this.listData.list = list;
			this.listData.total = total;
			});
		},
		goDetails(itemDate) {
		this.$router.push({
			name: 'identityDetails',
			params: itemDate,
		})
		},
		quickAudit() {
		this.$confirm('确定一键审核吗?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			this.$http.post('/wallet/backmgr/user/quickAudit').then((res) => {
			this.$notify({
				title: '成功',
				message: '一键审核成功',
				type: 'success'
			});
			})
		}).catch(() => {
			this.$message({
			type: 'info',
			message: '已取消一键审核'
			});
		});
		}
	},
	activated() {
		this.getWaittingAuditUser();
	}
}
</script>
<style lang='less'>
  .sac-home {

  }
</style>
