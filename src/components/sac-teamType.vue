/**
*  Created by   阿紫
*  On  2018/8/16
*  Content
*/
<template>
  <el-form-item label="商户类型:" :prop="prop">
    <el-cascader
      size="small"
      :options="teamTypeList"
      :props="teamProps"
      v-model="selectedOptions"
      @change="handleChange">
    </el-cascader>
  </el-form-item>
</template>
<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: "sac-teamType",
    model: {
      event: 'change',
    },
    props: {
      prop: {
        type: String,
        default: '',
      },
      isAll: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        selectedOptions: [-1],
        teamProps: {
          value: 'treamType',
          label: 'name',
          children: 'children'
        },
      };
    },
    computed: {
      teamTypeList(state) {
        const { teamTypeList } = this.$store.state;
        if (this.isAll) {
          this.selectedOptions = ['0'];
          return [{
            treamType: '0',
            name: '全部'
          }, ...teamTypeList]
        }
        this.selectedOptions = [-1]; // 个人
        return teamTypeList
      }
    },
    methods: {
      handleChange() {
        let name = '全部';
        const value = this.selectedOptions[this.selectedOptions.length - 1];
        this.teamTypeList.forEach(item => {
          if (item.treamType == value) {
            name = item.name
          } else if (item.children) {
            item.children.forEach((childrenItem) => {
              if (childrenItem.treamType == value) {
                name = childrenItem.name
              }
            })
          }
        })
        this.$emit('change', value, name);
      },
      reset() {
        if (this.isAll) {
          this.selectedOptions = ['0'];// 全部
        } else {
          this.selectedOptions = [-1];// 个人
        }
        this.handleChange();
      },
    },
    activated() {
      this.$store.dispatch('getQueryOrderType');
    }
  };
</script>
<style lang="less">
  .sac-teamType {
  }
</style>
