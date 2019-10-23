<template>
	<el-form ref="form" :model="formData" label-width="60px" size="mini" inline>
		<el-form-item label="搜索：">
			<el-input v-model="formData.appId" placeholder="请输入appid/账户/昵称"></el-input>
		</el-form-item>
		<el-form-item label="币种：">
			<el-select v-model="formData.coinName" placeholder="选择类型" clearable style="width: 185px">
				<el-option :value="null" label="全部"></el-option>
				<el-option v-for="(item, key) in coinTypes" :key="key" :value="item" :label="item"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="时间：">
			<el-date-picker
				id="createtime"
				v-model="formData.create_time"
				type="daterange"
				align="right"
				width="auto"
				value-format="yyyy-MM-dd"
				unlink-panels
				range-separator="至"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
				:picker-options="pickerOptions">
			</el-date-picker>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="queryData" style="margin-left: 20px">查询</el-button>
			<el-button type="primary" @click="clear">清空</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
export default {
	props: {
		orderStatus: {
			type: Array
		}
	},
    data () {
        return {
			coinTypes: ['USDT', 'ETH', 'BTC', 'EOS'],
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
            formData: {
				create_time: '',
				addr: '', //地址
				coinName: null, //币种名称
				startDate: '', //起始时间
				endDate: '', //结束时间
				appId: '', //账号
				orderId: '', //订单号
				pageNum: '', //页码
				pageSize: '', //页数
				status: null, //状态0-失败,1-成功,2-待审核,3-审核不通过,4-审核通过
				txId: '' //txid
			}
        }
    },
    methods: {
        queryData () {
			if(this.formData.create_time) {
				this.formData.startDate = this.formData.create_time[0]
				this.formData.endDate = this.formData.create_time[1]
			}
            this.$emit('queryData', this.formData)
        },
        clear () {
            this.formData = {
				create_time: '',
				addr: '', //地址
				coinName: null, //币种名称
				startDate: '', //起始时间
				endDate: '', //结束时间
				name: '', //账号
				orderId: '', //订单号
				pageNum: '', //页码
				pageSize: '', //页数
				status: null, //状态0-失败,1-成功,2-待审核,3-审核不通过,4-审核通过
				txId: '' //txid
			}
        },
        fetchFilter () {
            return this.filter
        }
    }
}
</script>
<style lang="less" scoped>
.el-form--inline {
	/deep/.el-form-item__content {
		width: auto;
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
</style>
