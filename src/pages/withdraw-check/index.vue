<template>
     <div class="withdraw-check-page">
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="查询条件" name="filter">
                <Query ref="query" @queryData='getData' @resetFilter="resetFilter" :coins="coins"/>
            </el-collapse-item>
        </el-collapse>
        <!-- 表格 -->
        <Table :tableData="data.list" :btnHandle="btnHandle" @hideDialogMR="hideDialogMR"></Table>
        <!-- 分页器 -->
        <div class="load-more" style="display: flex;">
            <div class="count">
                <span>提币数量：<i>{{blockSumReAndWdResultDto.withAmount}}</i> USDT</span>
                <span>手续费：<i>{{blockSumReAndWdResultDto.fee}}</i> USDT</span>
            </div>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="30"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="data.total*1">
            </el-pagination>
        </div>
        <ReleaseDialog @hideDialog="hideDialog" :showDialog="showDialog" :item="item" :type="type" />

		<!-- 手动录单弹框 -->
		<ManualRecordDialog :showDialogMR='showDialogMR' @hideDialogMR="hideDialogMR" @getData="getData" />
     </div>
 </template>
<script>
import Table from './components/table.vue'
import Query from './components/query.vue'
import Columns from './components/columns'
import ReleaseDialog from './components/release-dialog.vue'
import ManualRecordDialog from './components/manual-record-dialog'
export default {
    name: 'examine',
    data () {
        const disabled = (row) => {
            return row.recdStatus === 3
        }
        return {
            data: {
                list: []
            },
            blockSumReAndWdResultDto: {},
            loading: false,
			showDialog: false,
			showDialogMR: false,
            type: 'auto',
            item: {},
            coins: [],
            columns: Columns.examine,
            selectConfig: {
                seleteStyle: {
                    color: '#909399'
                },
                selectIconStyle: {
                    color: '#07c4a8'
                }
            },
            tableHeight: 'calc(100% - 304px)',
            activeNames: 'filter',
            pageNum: 1,
            pageSize: 20,
            total: 0,
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
        handleChange (active) {
            this.tableHeight = active.length ? 'calc(100% - 304px)' : 'calc(100% - 76px)'
        },
        btnHandle (action, row, key) {
            this.item = row
            switch (action) {
                case 'auto':
                    this.type = 'auto'
                    this.showDialog = true
                    break
                case 'manual':
                    this.type = 'manual'
                    this.showDialog = true
                    break
                case 'reject':
                    this.type = 'reject'
                    this.showDialog = true
                    break
            }
        },
        /**
         * 获取提币审核列表信息
         */
        getData () {
            this.data = []
            this.loading = true
            const params = {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }
            const filter = this.$refs.query && this.$refs.query.fetchFilter() || {}
            if (filter.create_time) {
                params.beginTime = filter.create_time[0] + ' 00:00:00'
                params.endTime = filter.create_time[1] + ' 23:59:59'
            }
            if (filter.coinName) params.coinName = filter.coinName
            if (filter.account) params.account = filter.account
            if (filter.id) params.recdId = filter.id
            if (filter.orderId) params.orderId = filter.orderId
            if (filter.txId) params.txId = filter.txId
            if (filter.recdStatus) params.recdStatus = filter.recdStatus
            if (filter.transType) params.transType = filter.transType
            if (filter.address) params.address = filter.address
            this.$http.get(`/wallet/block/backmgr/getWithdrawList`, params)
                .then(data => {
                    const { code, result } = data
                    if (code === 200) {
                        this.data = result.blockWithdrawDtoPageInfo
                        this.blockSumReAndWdResultDto = result.blockSumReAndWdResultDto
                    } else {
                        this.$notify.error({
                            title: '提示',
                            message: '获取列表失败'
                        })
                    }
                })
                .catch(e => console.warn(e))
                .finally(() => {
                    this.loading = false
                })
        },
        hideDialog (val) {
			this.showDialog = val
		},
		hideDialogMR(val) {
			this.showDialogMR = val
		},
        resetFilter () {
            this.$refs.query.filter = {}
        },
        getCoins () {
            this.$http
            .get(`/backmgr/coin/getAllCoinInfo`)
            .then(({ code, result }) => {
                if (code === 200) {
                    let USDT = false
                    this.coins = result.filter(el => {
                        if (el.coinName === 'USDT' && el.sysStatus === 1) USDT = true
                        return el.sysStatus === 1
                    })
                } else {
                    this.$notify.error({
                        title: '提示',
                        message: '查询失败'
                    })
                }
            })
            .catch(e => console.warn(e))
        }
    },
    created () {
        this.getCoins()
        this.getData(true)
    },
    components: { Query, Table, ReleaseDialog, ManualRecordDialog }
}
</script>
<style lang="less" scoped>
.withdraw-check-page {
    margin: 20px;
    /deep/ .el-collapse-item__header {
        font-size: 16px;
        font-weight: 600;
        padding: 0 10px;
    }
    .load-more {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px; 
        .count {
            font-size: 14px;
            span {
                margin-right: 20px;
                i {
                    font-style: normal;
                    color: #07c4a8;
                    font-weight: 600;
                }
            }
        }
    }
}
</style>
