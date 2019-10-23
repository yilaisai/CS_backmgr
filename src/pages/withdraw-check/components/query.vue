<template>
    <el-collapse>
        <el-collapse-item title="查询条件" name="filter">
            <el-form ref="form" :model="filter" label-width="80px" size="mini" inline>
                <el-form-item label="创建时间：" class="dataSelect">
                    <el-date-picker
                        id="createtime"
                        v-model="filter.create_time"
                        type="daterange"
                        align="right"
                        value-format="yyyy-MM-dd"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="币种：">
                    <el-select v-model="filter.coinName" clearable style="width: 185px">
                        <el-option :value="null" label="全部"></el-option>
                        <el-option v-for="(item, key) in coins" :key="key" :value="item.coinName" :label="item.coinName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单状态：">
                    <el-select v-model="filter.recdStatus" placeholder="选择订单状态" clearable style="width: 185px">
                        <el-option :value="null" label="全部"></el-option>
                        <el-option v-for="(item, key) in recdStatus" :key="key" :value="key" :label="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地址：">
                    <el-input v-model="filter.addr" placeholder="搜索地址"></el-input>
                </el-form-item>
                <el-form-item label="订单号：">
                    <el-input v-model="filter.orderId" placeholder="搜索订单号"></el-input>
                </el-form-item>
                <el-form-item label="账号：">
                    <el-input v-model="filter.name" placeholder="搜索账号"></el-input>
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
export default {
    props: {
        coins: {
            default: [],
            type: Array
        }
    },
    data () {
        return {
            fundTypes: {
                in: '充币',
                cool: '冷钱包',
                out: 'CFO提币',
                to_cfo: 'CFO充值',
                fee: '充值归拢费',
                manual: '手动打币'
            },
            recdStatus: {
                1: '充值',
                2: '提现',
                3: '购买扣费',
                4: '卖出扣费',
                5: '系统返还',
                6: '买入',
                7: '卖出',
                8: '冻结',
                9: '返佣金',
                10: '提现扣费',
                11: 'CREDIT'
            }, 
            types: [],
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
            filter: {}
        }
    },
    methods: {
        queryData () {
            this.$emit('queryData', true)
        },
        clear () {
            this.$emit('resetFilter')
        },
        fetchFilter () {
            return this.filter
        }
    }
}
</script>
<style lang="less" scoped>
/deep/.dataSelect  .el-form-item__content{
    width: 350px;
}
/deep/.el-form-item__label {
	padding: 0;
}
</style>
