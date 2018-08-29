/**
*  Created by   阿紫
*  On  2018/6/19
*  Content
*/
<template>
  <el-form-item :label="`${label}:`" :prop="prop">
    <el-col :span="11">
      <input type="number"
             v-model="beginNumber"
             :min="beginMin"
             :step="beginStep"
             size="small"
             @change="handleBeginChange"
             class="el-input__inner"/>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <input type="number"
             v-model="endNumber"
             :min="endMin"
             size="small"
             :step="endStep"
             @change="handleEndChange"
             class="el-input__inner"/>
    </el-col>
  </el-form-item>
</template>

<script>
import { sum100 } from '@/common/util';

export default {
  name: 'sac-digital-range',
  model: {
    event: 'change',
  },
  props: {
    prop: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    beginMin: {
      type: Number,
      default: 1,
    },
    beginStep: {
      type: Number,
      default: 1,
    },
    endMin: {
      type: Number,
      default: 1,
    },
    endStep: {
      type: Number,
      default: 1,
    },
    isSum: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      numberArray: [],
      beginNumber: null,
      endNumber: null,
    };
  },
  methods: {
    handleBeginChange() {
      this.numberArray[0] = this.beginNumber;
      this.$emit('change', this.numberArray);
    },
    handleEndChange() {
      this.numberArray[1] = this.endNumber;
      this.$emit('change', this.numberArray);
    },
    reset() {
      this.beginNumber = null;
      this.endNumber = null;
    },
  },
};
</script>

<style lang='less'>
  .line {
    text-align: center;
  }
</style>

