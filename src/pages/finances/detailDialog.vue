<template>
  <el-dialog
    custom-class="detail-dialog"
    :title="titleMap[status]"
    :visible="visible"
    @update:visible="val => $emit('update:visible', val)">
    <el-form ref="detailForm" :model="detailParams" :rules="rules" label-width="120px">
      <el-form-item label="币种名称：" prop="coinId" style="width: 100%;">
        <el-select
          style="width: 100%;"
          size="small"
          v-model="detailParams.coinId"
          placeholder="请选择币种名称">
          <el-option
            :label="coinInfo.coinName"
            :value="coinInfo.coinId"
            v-for="coinInfo in coinArr"
            :key="coinInfo.coinId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="交易所币种ID：" prop="detailUrl">
        <el-input size="small" v-model="detailParams.detailUrl" placeholder="请输入交易所币种ID"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button v-if="status === 'create'" type="primary" size="small" @click="createDetail">确认创建</el-button>
      <el-button v-else-if="status === 'modify'" type="primary" size="small" @click="updateDetail">确认修改</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      default: 'create'
    },
    visible: Boolean,
    coinArr: {
      type: Array,
      default: () => []
    },
    detailParams: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    const checkNum = (rule, value, callback) => {
      if (!(/^\d+$/g.test(value))) {
        callback(new Error('只能输入交易所币种ID'))
      } else {
        callback()
      }
    }
    return {
      titleMap: {
        create: '新建项目详情',
        modify: '修改项目详情'
      },
      rules: {
        coinId: [
          { required: true, message: '请选择币种名称', trigger: 'change' },
        ],
        detailUrl: [
          { required: true, message: '请输入交易所币种ID', trigger: 'blur' },
          { validator: checkNum, trigger: 'blur' }
          // { type: 'number', message: '只能输入交易所币种ID的币种id', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    resetFields () {
      this.$refs.detailForm && this.$refs.detailForm.resetFields()
    },
    // 创建活期
    async createDetail () {
      let loading = this.$loading({ text: 'Loading', target: '.detail-dialog'})
      try {
        await this.$refs.detailForm.validate()
        let result = await this.$http.post('/cloud/backmgr/financial/coin/addCoinDetail', this.detailParams)
        this.$emit('update:visible', false)
        this.$emit('createSuccess')
        this.$notify.success({ title: '请求成功', message: '创建项目详情成功' });
      } catch (error) {} finally {
        loading.close()
      }
    },
    // 修改活期
    async updateDetail () {
      let loading = this.$loading({ text: 'Loading', target: '.detail-dialog'})
      // let params = Object.assign({}, this.detailParams)
      // let url = params.url
      // params.detailUrl = url.replace(/(.*id=)(\d)(.*)/g, `$1${params.detailUrl}$3`)
      // delete params.url
      // console.log(params)
      // return
      try {
        await this.$refs.detailForm.validate()
        let result = await this.$http.put('/cloud/backmgr/financial/coin/updateCoinDetail', this.detailParams)
        this.$emit('update:visible', false)
        this.$emit('createSuccess')
        this.$notify.success({ title: '请求成功', message: '更新项目详情成功' });
        console.log(result)
      } catch (error) {} finally {
        loading.close()
      }
    }
  }
}
</script>
