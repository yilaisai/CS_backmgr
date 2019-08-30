/**
*  Created by   阿紫
*  On  2019/7/2 0002
*  Content
*/
<template>
  <el-dialog
    :close-on-click-modal="false"
    custom-class="currency-dialog"
    :title="titleMap[status]"
    :visible="visible"
    width="800px"
    @update:visible="val => $emit('update:visible', val)">
    <el-form ref="currencyForm" :model="regularParams" :rules="rules" label-width="140px">

      <el-row>
        <el-col :span="12"> <el-form-item label="产品名称：" prop="coinId" style="width: 100%;">
          <el-select
            style="width: 100%;"
            size="small"
            v-model="regularParams.coinId"
            placeholder="请选择币种名称">
            <el-option
              :label="coinInfo.coinName"
              :value="coinInfo.coinId"
              v-for="coinInfo in coinArr"
              :key="coinInfo.coinId"
            ></el-option>
          </el-select>
        </el-form-item></el-col>
        <el-col :span="12"> <el-form-item label="结算天数：" prop="minAmount">
          <el-input size="small" v-model="regularParams.minAmount" placeholder="请输入结算天数">
            <span slot="suffix">天</span>
          </el-input>
        </el-form-item></el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="最高月息：" prop="rate">
          <el-input size="small" v-model="regularParams.rate" placeholder="请输入预计年化收益率">
            <span slot="suffix">%</span>
          </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收益币种：" prop="coinId" style="width: 100%;">
            <el-select
              style="width: 100%;"
              size="small"
              v-model="regularParams.coinId"
              placeholder="请选择币种名称">
              <el-option
                :label="coinInfo.coinName"
                :value="coinInfo.coinId"
                v-for="coinInfo in coinArr"
                :key="coinInfo.coinId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="支付币种：" prop="coinId" style="width: 100%;">
            <el-select
              style="width: 100%;"
              size="small"
              v-model="regularParams.coinId"
              placeholder="请选择币种名称">
              <el-option
                :label="coinInfo.coinName"
                :value="coinInfo.coinId"
                v-for="coinInfo in coinArr"
                :key="coinInfo.coinId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="起购额度：" prop="minAmount">
            <el-input size="small" v-model="regularParams.minAmount" placeholder="请输入最小计息数额">
              <span slot="suffix">USD</span>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="违约金：" prop="rate">
            <el-input size="small" v-model="regularParams.rate" placeholder="请输入违约金">
              <span slot="suffix">%</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">

          <el-form-item label="权重：" prop="weight">
            <el-input size="small" v-model="regularParams.weight" placeholder="请输入权重"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item  label="产品标签：" prop="weight">
        <el-input v-model="regularParams.weight" size="small" style="width:200px; margin-right:20px;"></el-input><el-button type="primary" size="small" @click.prevent="addTag">增加</el-button>
        <el-tag
          v-for="tag in tags"
          :key="tag.name"
          closable
          :type="tag.type">
          {{tag.name}}
        </el-tag>

      </el-form-item>
      <el-form-item label="产品亮点：" prop="weight">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入产品亮点"
          v-model="regularParams.weight">
        </el-input>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button v-if="status === 'create'" type="primary" size="small" @click="create">确认创建</el-button>
      <el-button v-else-if="status === 'modify'" type="primary" size="small" @click="update">确认修改</el-button>
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
      regularParams: {
        type: Object,
        default: () => {}
      }
    },
    data () {
      const checkNum = (rule, value, callback) => {
        if (isNaN(Number(value))) {
          callback(new Error('必须为数字值'))
        } else {
          callback()
        }
      }
      return {
        tags:[],
        titleMap: {
          create: '创建产品',
          modify: '修改产品'
        },
        rules: {
          coinId: [
            { required: true, message: '请选择币种名称', trigger: 'change' },
          ],
          rate: [
            { required: true, message: '请输入预计年化收益率', trigger: 'blur' },
            { validator: checkNum, trigger: 'blur' }
          ],
          minAmount: [
            { required: true, message: '请输入最小计息数额', trigger: 'blur' },
            { validator: checkNum, trigger: 'blur' }
          ],
          weight: [
            { required: true, message: '请输入权重', trigger: 'blur' },
            { validator: checkNum, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      resetFields () {
        this.$refs.currencyForm && this.$refs.currencyForm.resetFields()
      },
      // 创建定期
      async create () {
        let loading = this.$loading({ text: 'Loading', target: '.currency-dialog'})
        try {
          await this.$refs.currencyForm.validate()
          let result = await this.$http.post('/wallet/backmgr/financial/financial/addIntervalFinancialPro', this.regularParams)
          this.$emit('update:visible', false)
          this.$emit('createSuccess')
          this.$notify.success({ title: '请求成功', message: '创建定期项目成功' });
          console.log(result)
        } catch (error) {} finally {
          loading.close()
        }
      },
      // 修改定期
      async update () {
        let loading = this.$loading({ text: 'Loading', target: '.currency-dialog'})
        try {
          await this.$refs.currencyForm.validate()
          let result = await this.$http.put('/wallet/backmgr/financial/financial/updateIntervalFinancialPro', this.regularParams)
          this.$emit('update:visible', false)
          this.$emit('createSuccess')
          this.$notify.success({ title: '请求成功', message: '更新定期项目成功' });
          console.log(result)
        } catch (error) {} finally {
          loading.close()
        }
      },
      addTag() {

      }
    }
  }
</script>
