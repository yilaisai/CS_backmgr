<template>
    <div class="withdraw-check-table-cpt">
		<div class="table-title">
        	<h4>审核列表</h4>
			<div class="btn-wrap">
				<el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="$emit('hideDialogMR', true)">手动录单</el-button>
			</div>
		</div>
        <el-table :data="tableData" border size="mini" style="width: 100%" height="100">
            <el-table-column prop="create_time" label="时间" width="140" align="center"></el-table-column>
            <el-table-column prop="phone" label="账号" width="100" align="center"></el-table-column>
            <el-table-column prop="nickName" label="昵称" width="90" align="center"></el-table-column>
            <el-table-column prop="coin_name" label="币种" width="60" align="center"></el-table-column>
            <el-table-column prop="amount" label="数量"  align="center"></el-table-column>
            <el-table-column prop="fee" label="手续费(BTC)" width="100" align="center"></el-table-column>
            <el-table-column prop="status" label="状态"  align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.status | recdStatusMap}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="from_addr" label="From地址" width="300" align="center"></el-table-column>
            <el-table-column prop="to_addr" label="To地址" width="300" align="center"></el-table-column>
            <el-table-column prop="id" label="订单号"  align="center"></el-table-column>
            <el-table-column prop="user_remark" label="上链备注" width="150" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="280" align="center">
                <template slot-scope="scope">
                    <el-button @click="btnHandle('auto', scope.row)" type="success" size="mini" :disabled="scope.row.status !== 2">自动放行</el-button>
                    <el-button type="primary" @click="btnHandle('manual', scope.row)" size="mini" :disabled="scope.row.status !== 2">手动放行</el-button>
                    <el-button type="danger" @click="btnHandle('reject', scope.row)" size="mini" :disabled="scope.row.status !== 2">拒绝</el-button>
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
                    return '待审核'
                    break
                case 3:
                    return '审核中'
                    break
                case 4:
                    return '审核不通过'
					break
				case 10:
                    return '区块链失败'
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
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow: hidden;
    h4 {
		padding: 0 10px;
		margin: 0;
		font-size: 14px;
    }
    .el-table {
		margin-top: 10px;
		flex: 1;
        /deep/ .gutter {
            display: block !important;
        }
	}
	.table-title {
        margin-top: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}
</style>
