<template>
  <div class='table-wrap'>
    <div class="table-title">
			<h4>限制入金列表</h4>
		</div>
    <el-table
			:data="list"
			height="auto"
			border
			size="mini"
			style="min-width: 100%">
      <el-table-column prop="nickName" label="用户编号" width="170" align="center">
			</el-table-column>
			<el-table-column prop="apiUserId" label="apiUserId" align="center" width="200"></el-table-column>
			<el-table-column prop="updateTime" label="最近一次下单时间" align="center">
        <template slot-scope="scope">
          {{scope.row.updateTime *1  | dateFormat('YYYY-MM-DD HH:mm:ss')}}
        </template>
      </el-table-column>
			<el-table-column prop="amount" label="已限制时间" align="center">
        <template slot-scope="scope">
          <!-- {{scope.row.updateTime *1  | dateFormat('YYYY-MM-DD HH:mm:ss')}} -->
          {{limitTime(scope.row.time,scope.row.updateTime)}}
        </template>
      </el-table-column>+
      <el-table-column prop="amount" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="$emit('openPop',scope.row)">解冻</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    props: {
      list: {
        type: Array
      },
    },
    data() {
      return {
      }
    },
    methods: {
      limitTime(nowTime,updataTime){
        let time = Math.floor((nowTime - updataTime)/1000)
        let h = Math.floor(time/(60*60))
        let min = Math.floor(time%(60*60)/60)
        let second = time%60
        return h+"小时"+min+"分"+second+"秒"
      }
    },
  }
</script>
<style lang='less' scoped>
  .table-wrap {
    flex:1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .table-title {
      h4 {
        padding:0;
        margin-bottom:0;
      }
    }
    .el-table {
      flex:1;
    }
  }
</style>