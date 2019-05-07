<template>
  <sac-table :data="list">
  <!-- <el-table :data="list" max-height="600" border size="small"> -->
    <el-table-column
      v-for="(col, index) in cols"
      :key="index"
      :prop="col.prop"
      :label="col.label">
      <template :slot="col.content ? 'default' : ''" slot-scope="scope">
        <a v-if="col.prop === 'detailUrl'" :href="col.content(scope)" target="_blank">{{ col.content(scope) }}</a>
        <span v-else>{{ col.content(scope) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <div class="table-operating">
          <el-button size="mini" type="primary" @click="modify(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="deleteDetail(scope.row)">删除</el-button>
        </div>
      </template>
    </el-table-column>
  <!-- </el-table> -->
  </sac-table>
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
      cols: [
        { label: '币种名称', prop: 'coinId', content: scope => this.coinObj[scope.row.coinId] && this.coinObj[scope.row.coinId].coinName },
        { label: '项目URL', prop: 'detailUrl', content: scope => scope.row.detailUrl },
        { label: '创建时间', prop: 'createTime' },
      ],
      list: [],
    }
  },
  methods: {
    async fetchData () {
      let { result } = await this.$http.post('/cloud/backmgr/financial/coin/listCoinDetail', this.listQuery)
      this.list = result.list
      this.$emit('setTotal', parseInt(result.count))
    },
    // 修改数据
    modify (row) {
      this.$emit('modify', row)
    },
    // 删除项目详情
    async deleteDetail (row) {
      let params = { id: row.detailId }
      try {
        await this.$confirm('确认删除该条项目详情?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        let result = await this.$http.delete('/cloud/backmgr/financial/coin/deleteCoinDetailById', params)
        this.$notify.success({ title: '请求成功', message: '删除项目详情成功' });
        this.fetchData()
      } catch (error) {}
    }
  },
  activated () {
    this.fetchData()
  },
  mounted () {
    this.fetchData()
  }
}
</script>
<style lang="less" scoped>
// .current-table {
//   height: 100%;
// }
</style>
