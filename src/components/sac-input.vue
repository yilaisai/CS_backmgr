/**
*  Created by   阿紫
*  On  2018/6/22
*  Content
*/
<template>
  <el-form-item :label="`${label}:`" :prop="prop">
    <el-input v-model.trim="inputName"
              :value="value"
              size="small"
              :type="type"
              :placeholder="placeholder?placeholder:`请输入${label}`"
              clearable
              @change="inputChange"></el-input>
  </el-form-item>
</template>

<script>
  export default {
    name: 'sac-input',
    model: {
      event: 'change',
    },
    props: {
      prop: {
        type: String,
        default: '',
      },
      placeholder: {
        type: String,
        default: '',
      },
      label: {
        type: String,
        default: '',
      },
      type: {
        type: String,
        default: 'text'
      },
      value: [String, Number],
    },
    data() {
      return {
        inputName: '',
      };
    },
    methods: {
      inputChange() {
        this.$emit('change', this.inputName);
      },
      reset() {
        this.inputName = '';
        this.inputChange();
      },
    },
    mounted() {
      this.inputName = this.value;
    },
  };
</script>

<style lang='less'>

</style>

