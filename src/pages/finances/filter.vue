<template>
  <div class="finances-filter">
    <el-form :inline="true" label-width="86px" ref="filterForm" :model="filterParams">
      <el-form-item label="币种名称：" prop="coinId" >
        <el-select style="width: 100%;" size="small" v-model="filterParams.coinId" placeholder="请选择币种名称">
          <el-option :label="coinInfo.coinName" :value="coinInfo.coinId" v-for="coinInfo in coinOptions" :key="coinInfo.coinId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间:" class="sac-time">
        <el-date-picker
          size="small"
          v-model="filterParams.dateTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        ></el-date-picker>
      </el-form-item>
      <sac-submit-form :isReset="false" @submitForm="submitForm"></sac-submit-form>
      <!-- <el-form-item class="fi-add">
        <el-button type="primary" size="small" @click="addFeedBack">添加</el-button>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    filterParams: {
      type: Object,
      default: () => {}
    },
    coinArr: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      feedbackTypeList: []
    }
  },
  computed: {
    coinOptions () {
      let tempArr = [{ coinId: null, coinName: '全部' }]
      return [...tempArr, ...this.coinArr]
    }
  },
  methods: {
    submitForm () {
      this.$emit('search')
    },
    addFeedBack () {

    }
  }
}
</script>
<style lang="less">
.finances-filter {
  .sac-time {
    .el-form-item__content {
      width: 366px;
    }
  }
  .el-date-editor {
    width: 366px;
  }
  .yh-submit .el-form-item__content ,
  .fi-add .el-form-item__content{
    width: auto
  }
}
</style>
