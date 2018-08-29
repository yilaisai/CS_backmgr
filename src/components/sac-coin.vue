/**
*  Created by   阿紫
*  On  2018/8/13
*  Content
*/
<template>
  <el-form-item label="币　　种:" :prop="prop">
    <el-select v-model="selected"
               size="small"
               placeholder="请选择币种"
               filterable
               @change="selectedChange">
      <el-option v-for="(item, index) in coinList"
                 size="small"
                 :label="item.label"
                 :value="item.value"
                 :key="index"></el-option>
    </el-select>
  </el-form-item>
</template>
<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'sac-coin',
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
        default: true,
      }
    },
    data() {
      return {
        selected: '',
      };
    },
    computed: {
      coinList(state) {
        const { coinList } = this.$store.state;
        if (this.isAll) {
          this.selected = '';
          return [{
            value: '',
            label: '全部'
          }, ...coinList]
        }
        this.selected = 1; // sac
        return coinList
      }
    },
    methods: {
      selectedChange(e) {
        let name = '全部';
        this.coinList.forEach(item => {
          if (item.value == e) {
            name = item.label
          }
        })
        this.$emit('change', this.selected, name);
      },
      reset() {
        if(this.isAll) {
          this.selected = ''; // 全部
        } else {
          this.selected = 1; // sac
        }
        this.selectedChange();
      },
    },
    activated() {
      this.$store.dispatch('getSampleCoinInfo');
    }
  };
</script>
<style lang="less">
  .sac-coin {
  }
</style>
