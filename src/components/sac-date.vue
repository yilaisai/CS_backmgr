<template>
  <el-form-item :label="`${label}:`" :prop="prop" class="sac-date">
    <el-date-picker
      v-model="dateValue"
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
      value: [String, Array],
    },
    watch: {
      value(val, oldVal) {
        this.dateValue = val;
      }
    },
    data() {
      return {
        dateValue: [],
      };
    },
    methods: {
      dateChange(item) {
        this.dateValue = item || this.dateValue;
        this.$emit('change', this.dateValue);
      },
      reset() {
        this.dateValue = this.value;
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
