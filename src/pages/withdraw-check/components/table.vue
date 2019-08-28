<template>
    <div class="withdraw-check-table-cpt">
		<div class="table-title">
        	<h4>审核列表</h4>
			<div class="btn-wrap">
				<el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="$emit('hideDialogMR', true)">手动录单</el-button>
			</div>
		</div>
        <el-table :data="tableData" border size="mini" style="width: 100%">
            <el-table-column prop="createTime" label="时间" width="140" align="center"></el-table-column>
            <el-table-column prop="account" label="账号" width="120" align="center"></el-table-column>
            <el-table-column prop="coinName" label="币种" width="80" align="center"></el-table-column>
            <el-table-column prop="amount" label="数量" width="100" align="center"></el-table-column>
            <el-table-column prop="blockFee" label="手续费(BTC)" width="100" align="center"></el-table-column>
            <el-table-column prop="recdStatus" label="状态" width="80" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.recdStatus | recdStatusMap}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="fromAddr" label="From地址" width="150" align="center"></el-table-column>
            <el-table-column prop="toAddr" label="To地址" width="150" align="center"></el-table-column>
            <el-table-column prop="orderId" label="订单号" width="150" align="center"></el-table-column>
            <el-table-column prop="txId" label="TXID" width="150" align="center">
                <template slot-scope="scope">
                    <a :href="'https://www.omniexplorer.info/search/'+ scope.row.txId" target="_blank">{{scope.row.txId}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="userRemark" label="备注" width="150" align="center"></el-table-column>
            <el-table-column prop="sysRemark" label="上链备注" width="150" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="280" align="center">
                <template slot-scope="scope">
                    <el-button @click="btnHandle('auto', scope.row)" type="success" size="mini" :disabled="scope.row.recdStatus !== 2">自动放行</el-button>
                    <el-button type="primary" @click="btnHandle('manual', scope.row)" size="mini" :disabled="scope.row.recdStatus !== 2">手动放行</el-button>
                    <el-button type="danger" @click="btnHandle('reject', scope.row)" size="mini" :disabled="scope.row.recdStatus !== 2">拒绝</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
  
</template>

<script>
export default {
    props: {
        tableData: {
            type: Array,
            default: () => {
                return []
            }
        },
        btnHandle: {
            type: Function,
            default: () => {}
        }
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
    },
    filters: {
        recdStatusMap(val) {
            switch(val) {
                case 0:
                    return '失败'
                    break
                case 1:
                    return '成功'
                    break
                case 2:
                    return '等待'
                    break
                case 3:
                    return '审核中'
                    break
                case 4:
                    return '审核不通过'
                    break
                default: 
                    return val
                    break
            }
        }
    },
    data() {
      return {
      }
    }
  }
</script>

<style lang="less" scoped>
.withdraw-check-table-cpt {
    margin-top: 20px;
    h4 {
        padding: 0 10px;
    }
    .el-table {
        margin-top: 10px;
        /deep/ .gutter {
            display: block !important;
        }
	}
	.table-title {
		display: flex;
		justify-content: space-between;
	}
}
</style>
