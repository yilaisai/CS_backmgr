/**
*  Created by   阿紫
*  On  2018/8/12
*  Content
*/
<template>
  <el-table height="100%" :data="data" border size="small">
    <slot></slot>
  </el-table>
</template>
<style>

</style>
<script>
  export default {
    name: 'sac-table',
    props: {
      data: {
        type: Array,
        default: function () {
          return [];
        }
      },
    },
    data() {
      return {};
    },
  };
</script>
<style lang="less">
  .el-table--scrollable-y .el-table__body-wrapper {
    &::-webkit-scrollbar {
      width: 0;
    }
  }
</style>
