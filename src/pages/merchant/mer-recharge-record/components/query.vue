<template>
	<el-collapse>
		<el-collapse-item title="查询条件" name="filter">
			<el-form ref="form" :model="formData" label-width="80px" size="mini" inline>
				<div>
					<el-form-item label="账号：">
						<el-input v-model="formData.name" placeholder="账号"></el-input>
					</el-form-item>
					<el-form-item label="地址：">
						<el-input v-model="formData.addr" placeholder="搜索地址"></el-input>
					</el-form-item>
					<el-form-item label="订单号码：">
						<el-input v-model="formData.orderId" placeholder="搜索订单号"></el-input>
					</el-form-item>
				</div>
				<div>
					<el-form-item label="TXID：">
						<el-input v-model="formData.txId" placeholder="搜索TXID"></el-input>
					</el-form-item>
					<el-form-item label="币种：">
						<el-select v-model="formData.coinName" placeholder="选择类型" clearable style="width: 185px">
							<el-option :value="null" label="全部"></el-option>
							<el-option v-for="(item, key) in coinInfo" :key="key" :value="item.coinName" :label="item.coinName"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="订单状态：">
						<el-select v-model="formData.status" placeholder="选择订单状态" clearable style="width: 185px">
							<el-option :value="null" label="全部"></el-option>
							<el-option v-for="(item, key) in orderStatus" :key="key" :value="item.val" :label="item.name"></el-option>
						</el-select>
					</el-form-item>
				</div>
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
					<el-button type="primary" @click="queryData" style="margin-left: 60px">查询</el-button>
					<el-button type="primary" @click="clear">清空</el-button>
				</el-form-item>
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
				name: '', //账号
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
	},
	computed:{
		...mapState(['coinInfo'])
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
