<template>
  <el-collapse value="1">
    <el-collapse-item title="查询条件" name="1">
      <el-form ref="form" :model="formData" inline size="mini" label-width="100px" >
        <el-form-item label="商户编号：">
          <el-input v-model="formData.nickName"></el-input>
        </el-form-item>
        <el-form-item label="apiUserId：">
          <el-input v-model="formData.userId"></el-input>
        </el-form-item>
        <!-- <el-form-item label="下单时间：">
          <el-date-picker
						id="createtime"
						v-model="formData.create_time"
						type="datetimerange"
						align="right"
						width="auto"
						value-format="yyyy-MM-dd HH:mm:ss"
						unlink-panels
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
						:picker-options="pickerOptions">
					</el-date-picker>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="$emit('getData',formData)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
  export default {
    props:{
      formData:{
        type:Object
      }
    },
    data() {
      return { 
        pickerOptions: {
          disabledDate(time) {
              return time.getTime() > Date.now();
          },
          shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
              }
          }, {
              text: '最近一个月',
              onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
              }
          }, {
              text: '最近三个月',
              onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
              }
          }, {
              text: '最近半年',
              onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                  picker.$emit('pick', [start, end]);
              }
          }, {
              text: '最近一年',
              onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                  picker.$emit('pick', [start, end]);
              }
          }]
        },
      }
    },
    methods: {

    },
  }
</script>
<style lang='less' scoped>
.el-form--inline {
	/deep/.el-form-item__content {
		width: auto;
	}
} 
/deep/.el-form-item__label {
	padding: 0;
}
/deep/ .el-collapse-item__header {
	font-size: 14px;
	font-weight: 600;
	padding: 0 10px;
}
/deep/.el-collapse-item__content {
	padding-bottom: 0;
}
</style>