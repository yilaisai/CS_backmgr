/**
*  Created by   阿紫
*  On  2018/6/15
*  Content
*/
<template>
  <el-form-item :label="label" :prop="prop" class="sac-date">
    <el-date-picker
      v-model="value"
      :editable="false"
      type="daterange"
      align="center"
      size="small"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change='dateChange'
      value-format="yyyy-MM-dd">
    </el-date-picker>
  </el-form-item>
</template>

<script>
  export default {
    name: 'sac-date',
    model: {
      event: 'change',
    },
    props: {
      label: {
        type: String,
        default: '',
      },
      prop: {
        type: String,
        default: '',
      },
      defaultValue: {
        type: Array,
        default: () => [],
      }
    },
    watch: {
      defaultValue(val, oldVal) {
        if (!this.value.length) {
          this.value = val;
          this.preValue = val;
        }
      }
    },
    data() {
      return {
        value: [],
        preValue: [],
      };
    },
    methods: {
      dateChange(item) {
        const datePoor = (+new Date(item[1])) - (+new Date(item[0]));
        const date30 = 30 * 24 * 60 * 60 * 1000;
        if (datePoor > date30) {
          this.value = this.preValue;
          this.$message.error('日期范围不能超过30天哦！');
          return;
        } else {
          this.value = item || this.value;
          this.preValue = this.value;
          this.$emit('change', this.value);
        }
      },
      reset() {
        this.value = this.defaultValue || '';
        this.preValue = this.defaultValue || '';
        this.dateChange();
      },
    },
  };
</script>

<style lang='less'>
  .sac-date {
    .el-date-editor--daterange.el-input__inner {
      width: 240px;
    }
    .el-form-item__content {
      width: 240px;
    }
  }
</style>

