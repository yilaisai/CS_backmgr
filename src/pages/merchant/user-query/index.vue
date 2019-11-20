<template>
	<div class="mer_user-query">
		<!-- 筛选条件 -->
        <Query ref="query" @queryData='getData' :orderStatus="orderStatus"/>
		<!-- 表格 -->
		<Table :list="pageData.list" :orderStatus="orderStatus" @hideDialogMR="hideDialogMR"></Table>
		<!-- 分页器 -->
		<div class="load-more" style="display: flex;">
            <div class="count">
                <!-- <span>总计：共<i>50</i>条</span> -->
            </div>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[20,50]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageData.total*1">
            </el-pagination>
        </div>
	</div>
</template>

<script>
import Query from './components/query.vue'
import Table from './components/table.vue'
export default {
	data() { 
		return {
			pageSize: 20,
			pageNum: 1,
			pageData: {
				total: 0,
				list: []
			},
			orderStatus: [
				{name: '失败', val: 0},
				{name: '成功', val: 1},
				{name: '待审核', val: 2},
				{name: '审核不通过', val: 3},
				{name: '审核通过', val: 4},
			],
			showDialogMR: false,
			
		}
	},
	activated() {
		this.getData()
	},
	methods: {
		getData(formData) {
			formData = formData || {}
			formData.pageNum = this.pageNum
			formData.pageSize = this.pageSize
			this.$http.post('/wallet/backmgr/merchant/list', formData).then(res => {
				if(res.code == 200) {
					this.pageData = res.result.page
				}
			})
		},
		handleCurrentChange(val) {
			this.pageNum = val
			this.getData()
		},
		handleSizeChange(val) {
			this.pageSize = val
			this.getData()
		},
		hideDialogMR(b) {
			this.showDialogMR = b
		},
	},
	filters: {
		filterStatus(status) {
			this.orderStatus.forEach((value, index) => {
				if(status == value.val) {
					return value.name
				}
			})
		}
	},
	components: {
		Query,
		Table,
	}
}
</script>

<style lang="less" scoped>
.mer_user-query{
	overflow: hidden;
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
                    color: #436bff;
                    font-weight: 600;
                }
            }
        }
    }
}
</style>