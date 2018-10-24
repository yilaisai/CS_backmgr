/**
*  Created by   阿紫
*  On  2018/6/19
*  Content
*/
<template>
  <el-form-item :label="`${label}:`" :prop="prop">
    <el-select v-model="selected"
               :value="value"
               size="small"
               :placeholder="placeholder?placeholder:`请选择${label}`"
               filterable
               :multiple="multiple"
               @change="selectedChange">
      <el-option v-for="(item, index) in dataList"
                 size="small"
                 :label="item[props.label]"
                 :value="item[props.value]"
                 :key="index"></el-option>
    </el-select>
  </el-form-item>
</template>

<script>
  export default {
    name: 'sac-select',
    model: {
      event: 'change',
    },
    props: {
      prop: {
        type: String,
        default: '',
      },
      props: {
        type: Object,
        default: () => {
          return {
            value: 'value',
            label: 'label',
          }
        },
      },
      placeholder: {
        type: String,
        default: '',
      },
      label: {
        type: String,
        default: '',
      },
      dataList: {
        type: Array,
        default: () => [],
      },
      multiple: {
        type: Boolean,
        default: false,
      },
      value: [String, Array, Number],
    },
    data() {
      return {
        selected: '',
      };
    },
    methods: {
      selectedChange() {
        this.$emit('change', this.selected);
      },
      reset() {
        if (this.multiple) {
          this.selected = [];
        } else {
          this.selected = '';
        }
        this.selectedChange();
      },
    },
    mounted() {
      this.selected = this.value;
    },
  };
</script>

<style lang='less'>

</style>

