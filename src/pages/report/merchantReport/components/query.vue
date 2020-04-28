<template>
	<el-collapse value="filter">
		<el-collapse-item title="查询条件" name="filter">
			<el-form ref="form" :model="formData" label-width="110px" size="mini" inline>
        
				<div>
					<el-form-item label="账号/用户编号：">
						<el-input v-model="formData.name" placeholder="账号/用户编号"></el-input>
					</el-form-item>
					<el-form-item label="实名姓名：">
						<el-input v-model="formData.addr" placeholder="搜索地址"></el-input>
					</el-form-item>
					<el-form-item label="状态：">
						<el-select v-model="formData.status" placeholder="选择订单状态" clearable>
							<el-option :value="null" label="全部"></el-option>
							<el-option v-for="(item, key) in orderStatus" :key="key" :value="item.val" :label="item.name"></el-option>
						</el-select>
					</el-form-item>
          <el-form-item label="订单类型：">
						<el-select v-model="formData.coinName" placeholder="选择类型" clearable>
							<el-option :value="null" label="全部"></el-option>
							<el-option v-for="(item, key) in coinInfo" :key="key" :value="item.coinName" :label="item.coinName"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<el-form-item label="时间：" style="width: 510px">
					<el-date-picker
						id="createtime"
						v-model="formData.create_time"
						type="datetimerange"
						align="right"
						width="auto"
						value-format="yyyy-MM-dd HH:mm:ss"
						unlink-panels
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						:picker-options="pickerOptions">
					</el-date-picker>
				</el-form-item>
        <el-button type="primary" @click="queryData" size="mini">查询</el-button>
        <el-button type="primary" @click="$emit('clear')" size="mini">清空</el-button>
        <el-button type="primary" @click.native="exportExcel" size="mini" icon="el-icon-document-checked">导出Excel</el-button>
			</el-form>
		</el-collapse-item>
    </el-collapse>
</template>
<script>
import {mapState} from 'vuex'
export default {
	props: {
		orderStatus: {
			type: Array
		},
		formData:{
			type:Object
		}
	},
	data () {
			return {
				pickerOptions: {
						disabledDate(time) {
								return time.getTime() > Date.now();
						},
						shortcuts: [{
								text: '最近一周',
								onClick(picker) {
										const end = new Date();
										const start = new Date();
										start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
										picker.$emit('pick', [start, end]);
								}
						}, {
								text: '最近一个月',
								onClick(picker) {
										const end = new Date();
										const start = new Date();
										start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
										picker.$emit('pick', [start, end]);
								}
						}, {
								text: '最近三个月',
								onClick(picker) {
										const end = new Date();
										const start = new Date();
										start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
										picker.$emit('pick', [start, end]);
								}
						}, {
								text: '最近半年',
								onClick(picker) {
										const end = new Date();
										const start = new Date();
										start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
										picker.$emit('pick', [start, end]);
								}
						}, {
								text: '最近一年',
								onClick(picker) {
										const end = new Date();
										const start = new Date();
										start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
										picker.$emit('pick', [start, end]);
								}
						}]
				},
			}
	},
	methods: {
		queryData () {
			if(this.formData.create_time) {
				this.formData.startDate = this.formData.create_time[0]
				this.formData.endDate = this.formData.create_time[1]
			}else {
				this.formData.startDate = ""
				this.formData.endDate = ""
			}
			this.$emit('queryData', this.formData)
		},
		exportExcel() {
			if(this.formData.create_time) {
				this.formData.startDate = this.formData.create_time[0]
				this.formData.endDate = this.formData.create_time[1]
			}else {
				this.formData.startDate = ""
				this.formData.endDate = ""
			}
			this.$emit('exportExcel', this.formData)
		},
		fetchFilter () {
				return this.filter
		}
	},
	computed:{
		...mapState(['coinInfo'])
	}
}
</script>
<style lang="less" scoped>
.el-form--inline {
	/deep/.el-form-item__content {
		width: 180px;
	}
} 
/deep/.el-form-item__label {
	padding: 0;
}
/deep/ .el-collapse-item__header {
	font-size: 14px;
	font-weight: 600;
	padding: 0 10px;
}
/deep/.el-collapse-item__content {
	padding-bottom: 0;
}

</style>
