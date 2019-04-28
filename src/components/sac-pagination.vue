/**
*  Created by   阿紫
*  On  2018/8/12
*  Content
*/
<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</template>
<style>

</style>
<script>
  export default {
    name: 'sac-pagination',
    model: {
      event: 'change',
    },
    props: {
      pageSize: {
        type: Number,
        default: 20
      },
      currentPage: {
        type: Number,
        default: 1
      },
      total: Number,
    },
    data() {
      return {
        pageSizes: [10, 20, 50, 100],
        currentPageSize: this.pageSize,
      };
    },
    methods: {
      handleCurrentChange(currentVal) {
        this.$emit('handleChange', this.currentPageSize, currentVal);
      },
      handleSizeChange(val) {
        this.currentPageSize = val;
        this.$emit('handleChange', val, 1);
      },
    }
  };
</script>
<style lang="less">
  .sac-pagination {
  }
</style>
