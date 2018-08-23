/**
*  Created by   阿紫
*  On  2018/6/22
*  Content
*/
<template>
  <el-form-item class="yh-submit">
    <el-button @click="resetForm" size="small" v-if="isReset">重置</el-button>
    <el-button type="primary" @click="submitForm" size="small">查询</el-button>
  </el-form-item>
</template>

<script>
  export default {
    name: 'sac-submit-form',
    props: {
      isReset: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {};
    },
    methods: {
      submitForm() {
        this.$emit('submitForm');
      },
      resetForm() {
        this.$emit('resetForm');
      },
    },
  };
</script>

<style lang='less'>
  .yh-submit {
    text-align: right;
  }
</style>

