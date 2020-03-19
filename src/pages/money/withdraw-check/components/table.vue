<template>
    <div class="withdraw-check-table-cpt">
		<div class="table-title">
        	<h4>审核列表</h4>
			<div class="btn-wrap">
				<!-- <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="$emit('hideDialogMR', true)">手动录单</el-button> -->
			</div>
		</div>
        <el-table :data="tableData" border size="mini" style="width: 100%" height="100">
            <el-table-column prop="create_time" label="时间" width="140" align="center"></el-table-column>
            <el-table-column prop="phone" label="账号" width="100" align="center"></el-table-column>
            <el-table-column prop="nickName" label="用户编号" width="90" align="center"></el-table-column>
			<el-table-column label="用户类型" align="center">
				<template slot-scope="scope">{{scope.row.user_type | userTypesFilter}}</template>
			</el-table-column>
            <el-table-column prop="coin_name" label="币种" width="60" align="center"></el-table-column>
            <el-table-column prop="amount" label="数量"  align="center"></el-table-column>
            <el-table-column prop="fee" label="手续费(USDT)" width="100" align="center"></el-table-column>
            <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.status | recdStatusMap}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="from_addr" label="From地址" width="300" align="center"></el-table-column>
            <el-table-column prop="to_addr" label="To地址" width="350" align="center" >
                <template slot-scope="scope">
                    <span class="toAdd" @click="showImg(scope.row.to_addr)">{{scope.row.to_addr}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="id" label="订单号"  align="center"></el-table-column>
            <el-table-column prop="user_remark" label="上链备注" width="150" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="280" align="center">
                <template slot-scope="scope">
                    <!-- <el-button @click="btnHandle('auto', scope.row)" type="success" size="mini" :disabled="scope.row.status !== 2">自动放行</el-button> -->
                    <el-button type="primary" @click="btnHandle('manual', scope.row)" size="mini" :disabled="scope.row.status !== 2">手动放行</el-button>
                    <el-button type="danger" @click="btnHandle('reject', scope.row)" size="mini" :disabled="scope.row.status !== 2">拒绝</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="To地址" :visible.sync="imgShow" width="500px">
            <div style="padding-left:20px">
                <span class="copyAddr"
                    v-clipboard:copy="toAddr" 
                    v-clipboard:success="copy" 
                    v-clipboard:error="onError"
                >{{toAddr}} <img src="@/assets/copy.svg" alt=""></span> 
                <img style="width:100%;vertical-align: text-top;" ref="qrcode" :src="imgUrl" alt="">
            </div>
		</el-dialog>
    </div>
</template>

<script>
import QRCode from 'qrcode'
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
    data(){
        return {
            imgShow:false,
            imgUrl:'',
            toAddr:''
        }
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      showImg(url) {
          this.createQrcode(url)
          this.imgShow = true
      },
      createQrcode(url) {
        this.toAddr = url
        QRCode.toDataURL(url, { errorCorrectionLevel: 'H' }, (err, url) => {
            this.imgUrl = url
        })
      },
      copy() {
        this.$message.success('复制成功！')
      },
      error() {
        this.$message.warning('复制失败，请手动复制！')
      }
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
        /deep/ .cell {
            .toAdd {
                cursor: pointer;
                color:blue;
            }
        }
	}
	.table-title {
        margin-top: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
    }
    .copyAddr {
        margin-left:40px;
        cursor: pointer;
        img {
            margin-left:5px;
        }
    }
}
</style>
