<template>
	<el-collapse value="filter">
		<el-collapse-item title="查询条件" name="filter">
			<el-form ref="form" :model="formData" label-width="110px" size="mini" inline>
				<div>
					<el-form-item label="账号/用户编号：">
						<el-input v-model="formData.account" placeholder="账号/用户编号"></el-input>
					</el-form-item>
					<el-form-item label="实名姓名：">
						<el-input v-model="formData.realName" placeholder="真实姓名"></el-input>
					</el-form-item>
          <el-form-item label="订单类型：">
						<el-select v-model="formData.type" placeholder="选择类型">
							<el-option v-for="(item, key) in typeList" :key="key" :value="item.value" :label="item.label"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<el-form-item label="时间：" style="width: 350px">
					<el-date-picker
						id="createtime"
						v-model="formData.createDate"
						type="date"
						align="right"
						width="auto"
						value-format="yyyyMMdd"
						:clearable="false"
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
		formData:{
			type:Object
		}
	},
	data () {
			return {
				pickerOptions: {
						disabledDate(time) {
								return time.getTime() >  (Date.now() - 24*60*60*1000);
						},
						shortcuts: [{
								text: '一周前',
								onClick(picker) {
										const date = new Date();
										date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
										picker.$emit('pick', date);
								}
						}, {
								text: '一个月前',
								onClick(picker) {
										const date = new Date();
										date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
										picker.$emit('pick',date);
								}
						}, {
								text: '三个月前',
								onClick(picker) {
										const date = new Date();
										date.setTime(date.getTime() - 3600 * 1000 * 24 * 90);
										picker.$emit('pick', date);
								}
						}, {
								text: '半年前',
								onClick(picker) {
										const date = new Date();
										date.setTime(date.getTime() - 3600 * 1000 * 24 * 180);
										picker.$emit('pick', date);
								}
						}, {
								text: '一年前',
								onClick(picker) {
										const date = new Date();
										date.setTime(date.getTime() - 3600 * 1000 * 24 * 365);
										picker.$emit('pick', date);
								}
						}]
				},
				typeList:[{
					value:'0',
					label:'兑入'
				},{
					value:'1',
					label:'兑出'
				}]
			}
	},
	methods: {
		queryData () {

			this.$emit('queryData', this.formData)
		},
		exportExcel() {
		
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
