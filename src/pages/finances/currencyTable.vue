<template>
  <!-- <div class="current-table"> -->
    <!-- <el-table :data="list" style="height: 100%;" border size="small"> -->
    <sac-table :data="list">
      <el-table-column
        v-for="(col, index) in cols"
        :key="index"
        :prop="col.prop"
        :label="col.label">
        <template :slot="col.content ? 'default' : ''" slot-scope="scope">
          {{ col.content(scope) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div class="table-operating">
            <el-button size="mini" type="primary" @click="modify(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="deleteCurrency(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="上架">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.sysStatus" :active-value="1" :inactive-value="0" @change="switchStatus(scope.row)"></el-switch>
        </template>
      </el-table-column>
    </sac-table>
    <!-- </el-table> -->
  <!-- </div> -->
</template>

<script>
export default {
  props: {
    listQuery: {
      type: Object,
      default: () => { }
    },
    coinArr: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    coinObj () {
      return this.coinArr.reduce((prev, v) => {
        prev[v.coinId] = v
        return prev
      }, {})
    }
  },
  data () {
    return {
      proTypeMap: {
        '0': '活期',
        '1': '定期'
      },
      cols: [
        { label: '币种名称', prop: 'getCoinId', content: scope => this.coinObj[scope.row.getCoinId] && this.coinObj[scope.row.getCoinId].coinName },
        { label: '产品类型', prop: 'proType', content: scope => this.proTypeMap[scope.row.proType] },
        { label: '预计年化收益率', prop: 'rate', content: scope => scope.row.rate + '%' },
        { label: '创建时间', prop: 'createTime' },
        { label: '最小计息数额', prop: 'minAmount' },
      ],
      list: [],
    }
  },
  methods: {
    async fetchData () {
      // proType:产品类型,0-活期，1-定期
    // ,proType:0
      let { result } = await this.$http.post('/cloud/backmgr/financial/financial/getProList', {...this.listQuery})
      this.list = result.list
      this.$emit('setTotal', parseInt(result.count))
    },
    // 修改数据
    modify (row) {
      this.$emit('modify', row)
    },
    // 上下架
    async switchStatus (row) {
      let params = {
        id: row.id,
        status: row.sysStatus === 1 ? 'enable' : 'disable'
      }
      try {
        let result = await this.$http.get('/cloud/backmgr/financial/financial/updateProStatus', params)
        let text = row.sysStatus === 1 ? '上架' : '下架'
        this.$notify.success({ title: '请求成功', message: `${text}成功` });
      } catch (error) {
        row.sysStatus = row.sysStatus === 1 ? 0 : 1
      }
    },
    // 删除活期项目
    async deleteCurrency (row) {
      let params = { id: row.id }
      try {
        await this.$confirm('确认删除该条活期项目?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        let result = await this.$http.delete('/cloud/backmgr/financial/financial/deleteCurrentProById', params)
        this.$notify.success({ title: '请求成功', message: '删除活期项目成功' });
        this.fetchData()
      } catch (error) {}
    }
  },
  activated () {
    this.fetchData()
  },
}
</script>
<style lang="less" scoped>
// .current-table {
//   height: 100%;
// }
</style>
