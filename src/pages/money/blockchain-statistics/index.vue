<template>
    <div class="blockchain-monotoring">
        <el-form ref="form" :model="filter" label-width="40px" size="mini" label-position="left" inline>
            <el-form-item label="时间">
                <el-date-picker
                    ref="datePicker"
                    v-model="filter.create_time"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="币种">
                <el-select class="select" v-model="filter.coinName" @change="coinNameChange">
                    <el-option v-for="(item, key) in coins" :key="key" :value="item.coinName" :label="item.coinName == 'USDT'?'omni':item.coinName == 'TetherUSD'?'erc20':item.coinName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="getData(true)" type="primary">查询</el-button>
            </el-form-item>
        </el-form>

        <SummaryBar ref="count" @hideCount="hideCount" :currentCoin="filter.coinName" :filter="filter" @switchTransType="switchTransType"/>

        <div class="action">
            <span class="title">操作记录</span>
            <span class="type">
                类型
                <el-select v-model="filter.transType" size="mini" clearable placeholder="选择类型" @change="transTypeChange">
                    <el-option :value="null" label="全部"></el-option>
                    <el-option v-for="(item, key) in fundTypes" :key="key" :value="key" :label="item"></el-option>
                </el-select>
            </span>
            <el-button size="mini" type="primary" @click="downloadExcel" icon="el-icon-download">导出Excel</el-button>
        </div>

        <el-table :data="tableData" border style="width: 100%" size="mini">
            <el-table-column prop="txTime" label="时间" width="140" align="center">
				<span slot-scope="scope">{{scope.row.txTime | dateFormat}}</span>
			</el-table-column>
            <el-table-column prop="transTypeStr" label="转账类型" width="100" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.transTypeStr}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="coinName" label="币种" width="80" align="center">
                <span slot-scope="scope">{{scope.row.coinName == 'USDT'?'omni':scope.row.coinName == 'TetherUSD'?'erc20':scope.row.coinName}}</span>
            </el-table-column>
            <el-table-column prop="fromAddr" label="来源地址" align="center"></el-table-column>
            <el-table-column prop="toAddr" label="目标地址" align="center"></el-table-column>
            <el-table-column prop="blockAmount" label="到账数量" width="100" align="center"></el-table-column>
            <el-table-column prop="blockFee" label="手续费(ETH)" width="100" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.transType == 0 || scope.row.transType == 4 || scope.row.transType == 8">0</span>
                    <span v-else>{{scope.row.blockFee}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="txId" label="TXID" align="center">
                <template slot-scope="scope">
                    <a :href="'https://www.omniexplorer.info/search/'+ scope.row.txId" target="_blank">{{scope.row.txId}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="sysUserName" label="操作人" width="80" align="center"></el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total*1">
        </el-pagination>
        <!-- <AddRecord @refresh="getData" :showDialog="showDialog" @showExtractCoin="showExtractCoin" /> -->

		<p class="remark">
			备注：<br />
			1、净入 = 入金金额 - CFO提币金额 - 手工提币金额 <br />
			2、实际余额 = 入金当前未归拢+冷钱包当前余额 + CFO当前余额 <br />
			3、冷钱包当前余额 = 截至日期上一天快照余额 + 截止日期当天金额 - CFO充币金额 - 手工提币金额 <br />
			4、CFO当前余额 = CFO地址当前余额 <br />
			5、手续费金额 = 所有记录手续费之和（入金、CFO充值、手工打币手续费为0） <br />
			6、手续费余额 = 手续费地址BTC余额 <br />
		</p>
    </div>
</template>
<script>
import qs from 'qs'
import SummaryBar from './components/summary-bar.vue'
import Columns from './components/columns'
import {fundTypes} from '@/common/constants'
export default {
    name: 'monotoring',
    data () {
        return {
            data: [],
            coins: [{coinName: 'USDT'}],
            defaultCoin: 'USDT',
            tableData: [],
            pageSize: 20,
            loading: false,
            pageNum: 1,
			total: 0,
			fundTypes: fundTypes,
            filter: {
                coinName: "",
                create_time: null,
                transType: null,
                feeCoinName: ""
            },
            selectConfig: {
                seleteStyle: {
                    color: '#909399'
                },
                selectIconStyle: {
                    color: '#07c4a8'
                }
            },
            rowHeight: 'auto',
            loadEnd: false,
            pickerOptions: {
                // 只能选择不能早于当前时间的日期
                disabledDate(time) {
                    return time.getTime() > Date.now()
                },
                shortcuts: [
                    {
                        text: '最近一日',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近两日',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, 
                    {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近半年',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 183);
                            picker.$emit('pick', [start, end]);
                        }
                    }
                ]
            }
        }
    },
    methods: {
        handleSizeChange (size) {
            this.pageSize = size
            this.getData()
        },
        handleCurrentChange (page) {
            this.pageNum = page
            this.getData()
        },
        getData (flag) {
            if(flag) {
                this.pageNum = 1
                this.$refs.count.getData()
            }
            const filter = this.filter
            this.loading = true
            this.data = []
            const params = {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }
            if (filter.create_time) {
                params.startTime = filter.create_time[0] + ' 00:00:00'
                params.endTime = filter.create_time[1] + ' 23:59:59'
            } else {
            }
            if (filter.coinName) {
                params.feeCoinName = filter.coinName
            }
            if (filter.transType) params.transType = filter.transType
            this.$http.get(`/wallet/block/backmgr/getBlockTransList`, params)
                .then(({ code, result }) => {
                    if (code === 200) {
                        this.total = result.total
                        this.tableData = result.list
                    } else {
                        this.$notify.error({
                            title: '提示',
                            message: '获取列表失败'
                        })
                    }
                })
                .catch(e => {  })
                .finally(() => {
                    this.loading = false
                })
		},
		downloadExcel() {
			const filter = this.filter
			const params = {
                pageNum: this.pageNum,
                pageSize: this.pageSize
			}
            if (filter.create_time) {
                params.startTime = filter.create_time[0] + ' 00:00:00'
                params.endTime = filter.create_time[1] + ' 23:59:59'
            } else {
            }
            if (filter.coinName) {
                params.feeCoinName = filter.coinName
            }
            if (filter.transType) params.transType = filter.transType
            params.token = localStorage.getItem('token')
            window.open('/wallet/block/backmgr/opsExportBlockRecdList?' + qs.stringify(params))
		},
        hideCount (refer) {
            this.rowHeight = refer ? '500px' : '30px'
            // 等待动画结束之后再计算表格高度
        },
        allCoins () {
            this.$http.get(`/wallet/block/backmgr/coin/getAllCoinInfo`)
                .then(({ code, result }) => {
                    if (code === 200) {
                        let USDT = false
                        this.coins = result.filter(el => {
                            if (el.coinName === 'USDT' && el.sysStatus === 1) USDT = true
                            return el.sysStatus === 1
                        })
                        this.filter.coinName = USDT ? 'USDT' : this.coins.length ? this.coins[0].coinName : ''
                    } else {
                        this.$notify.error({
                            title: '提示',
                            message: '查询失败'
                        })
                    }
                })
                .catch(e => console.warn(e))
                .finally(e => {
                    this.getData(true)
                })
        },
        coinNameChange () {
            this.$refs.count.getData()
            this.getData()
        },
        transTypeChange () {
            this.pageNum = 1
            this.filter.feeCoinName = this.filter.coinName === 'USDT' && this.filter.transType === 'fee' ? 'BTC' : ''
            this.getData()
        },
        // 子组件切换查询类型
        switchTransType(type) {
            this.filter.transType = type
            this.transTypeChange()
        },
        datePickerChange () {
            // this.pageNum = 1
            // this.getData(true)
        }
    },
    filters: {
        transTypeMap(val) {
            switch(val) {
                case 0:
                    return '入金'  //transfer_in
                    break
                case 1:
                    return '提币'  //transfer_out
                    break
                case 2:
                    return '入金归拢'  //collect_in
                    break
                case 3:
                    return 'CFO归拢到冷钱包' //cfo_to_cool
                    break
                case 4:
                    return 'CFO充值'  //cool_to_cfo
                    break
                case 5:
                    return '其他地址转入CFO'  //other_to_cfo
                    break
                case 6:
                    return '手续费转入'  //fee_in
                    break
                case 7:
                    return '手续费转出'  //fee_out
                    break
                case 8:
                    return '手动打币'  //manual
                    break
                default:
                    return val
                    break
            }
        }
    },
    created () {
        // 设置初始时间为当前时间的前一天
        const currentTime = new Date()
        let m = currentTime.getMonth() + 1
        m = m < 10 ? '0'+m : m 
        let d = currentTime.getDate()
        d = d < 10 ? '0'+d : d
        const startTime = `${currentTime.getFullYear()}-${m}-${d}`
        const endTime = `${currentTime.getFullYear()}-${m}-${d}`
        this.filter.create_time = [startTime, endTime]
    },
    activated() {
		let handle = null
		this.allCoins()
    },
    components: { SummaryBar }
}
</script>
<style lang="less" scoped>
.blockchain-monotoring {
    overflow: hidden;
	.el-form--inline {
		/deep/.el-form-item__content {
			width: auto;
		}
	}
    .select {
        width: 120px;
    }
    .action {
        display: flex;
        align-items: center;
        margin-top: 20px;                        
        .title {
            font-size: 14px;
            font-weight: 600;
            color: #515a6e;
            text-indent: 0.3em;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            -webkit-user-select: none;
            margin-right: 30px;
        }
        .type {
            margin: 5px 20px;
            font-size: 14px;
        }
        button {
            padding: 0 5px;
            height: 25px;
        }
    }
    .el-table {
        /deep/ .gutter {
            display: block !important;
        }
    }
    .el-pagination {
        text-align: right;
        margin-top: 10px;
    }
}
</style>
