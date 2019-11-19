<template>
     <div class="withdraw-check-page">
        <Query ref="query" @queryData='getData' @resetFilter="resetFilter" :coins="coinInfo"/>
        <!-- 表格 -->
        <Table :tableData="data.list" :btnHandle="btnHandle" @hideDialogMR="hideDialogMR"></Table>
        <!-- 分页器 -->
        <div class="load-more" style="display: flex;">
            <div class="count"></div>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[20, 30, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="data.total*1">
            </el-pagination>
        </div>
		<!-- 放行 -->
        <ReleaseDialog @hideDialog="hideDialog" :showDialog="showDialog" :item="item" :type="type" @getData="getData" />

		<!-- 手动录单弹框 -->
		<ManualRecordDialog :showDialogMR='showDialogMR' @hideDialogMR="hideDialogMR" />
     </div>
 </template>
<script>
import Table from './components/table.vue'
import Query from './components/query.vue'
import Columns from './components/columns'
import ReleaseDialog from './components/release-dialog.vue'
import ManualRecordDialog from './components/manual-record-dialog'
import {mapState} from 'vuex'
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
            let filter = this.$refs.query && this.$refs.query.fetchFilter() || {}
            if (filter.create_time) {
                filter.beginTime = filter.create_time[0] + ' 00:00:00'
                filter.endTime = filter.create_time[1] + ' 23:59:59'
			}else {
				filter.beginTime = ""
                filter.endTime = ""
			}
			filter = Object.assign(filter, {
				pageNum: this.pageNum,
                pageSize: this.pageSize
			})
			
            this.$http.post(`/wallet/backmgr/trade/getAuditingWithdraw`, filter)
                .then(res => {
					console.log(res)
                    const { code, result } = res
                    if (code === 200) {
                        this.data = result.pageInfo
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
            .get(`/wallet/block/backmgr/coin/getAllCoinInfo`)
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
	computed: {
		...mapState(['coinInfo'])
	},
	created() {
        this.getCoins()
	},
    activated() {
        this.getData(true)
    },
    components: { Query, Table, ReleaseDialog, ManualRecordDialog }
}
</script>
<style lang="less" scoped>
.withdraw-check-page {
	overflow: hidden;
	box-sizing: border-box;
    /deep/ .el-collapse-item__header {
        font-size: 14px;
        font-weight: 600;
        padding: 0 10px;
    }
    .load-more {
        display: flex;
        align-items: center;
        justify-content: space-between;
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
