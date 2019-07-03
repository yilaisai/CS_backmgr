/**
*  Created by   阿紫
*  On  2019/6/17 0017
*  Content  代理刷单-保证金
*/
<template>
  <div class='margin'>
    <el-form :inline="true"
             v-show="activeName=='first'"
             label-width="90px"
             ref="filterForm"
             :rules="rules"
             :model="filterForm">
      <sac-input
        ref="phone"
        label="账号"
        v-model.trim="filterForm.userId"
        prop="phone"></sac-input>
      <el-form-item label="方向：" size="small" class="from_box_item">
        <el-select v-model="filterForm.type" placeholder="请选择方向">
          <el-option
            v-for="(item, index) in directionList"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日　　期:" class="sac-time">
        <el-date-picker
          size="small"
          v-model="dateTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <sac-submit-form
        :isReset='false'
        @submitForm="getRegistInviteRule()"></sac-submit-form>
    </el-form>
    <el-col :span="22"
            v-show="activeName=='second'"
            style="text-align:right;margin-bottom: 10px;">
      <el-button size="small" type="primary" @click="addSend">创建规则</el-button>
    </el-col>
    <div class="margin-main">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="记录" name="first">
          <sac-table :data="listData.list">
            <el-table-column prop="type" label="方向">
              <template slot-scope="scope">
                {{ scope.row.type === 1? '充值 ': '提取'}}
              </template>
            </el-table-column>
            <el-table-column prop="userId" label="账号"></el-table-column>
            <el-table-column prop="amount" label="金额">
              <template slot-scope="scope">
                {{ scope.row.amount }} {{scope.row.coinName }}
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="时间"></el-table-column>
          </sac-table>
        </el-tab-pane>
        <el-tab-pane label="规则" name="second">
          <sac-table :data="registList">
            <el-table-column prop="levelName" label="等级">
            </el-table-column>
            <el-table-column prop="amount" label="金额">
              <template slot-scope="scope">
                {{ scope.row.amount }} {{scope.row.payCoinName }}
              </template>
            </el-table-column>
            <!--            <el-table-column prop="coinName" label="充值币种"></el-table-column>-->
            <el-table-column prop="brushNumber" label="刷单数">
              <template slot-scope="scope">
                {{ scope.row.brushNumber }} {{scope.row.payCoinName }}
              </template>
            </el-table-column>
            <el-table-column prop="brushRate" label="刷单收益">
              <template slot-scope="scope">
                {{scope.row.brushRate*100}}%
              </template>
            </el-table-column>
            <el-table-column prop="coinName" label="收益币种"></el-table-column>
            <el-table-column prop="coinDetail" label="项目URL">
              <template slot-scope="scope">
                <a :href="scope.row.coinDetail" target="_blank">{{scope.row.coinDetail}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" width="150px" label="创建时间"></el-table-column>
            <el-table-column label="操作" width="150px">

              <template slot-scope="scope" prop="sysStatus">
                <el-button type="success" size="small"
                           @click.native="modification(scope.row)">修改
                </el-button>
                <el-button type="danger" size="small"
                           @click.native="remove(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </sac-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <sac-pagination v-show="activeName=='first'&&listData.list.length>0"
                    @handleChange="getPaginationChange"
                    :total="+listData.total"
                    :page-size="filterForm.pageSize"
                    :current-page="filterForm.pageNum">
    </sac-pagination>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" class="register_dialog"
               :close-on-click-modal="false">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="135px">
        <el-form-item label="充值币种：" prop="payCoinId" size="small" class="from_box_item">
          <el-select v-model="ruleForm.payCoinId" @change="getCoinName" placeholder="请选择充值币种">
            <el-option
              v-for="item in coinList"
              :key="item.coinId"
              :label="item.coinName"
              :value="item.coinId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="等级：" prop="level" size="small" class="from_box_item">
          <el-select v-model="ruleForm.level" placeholder="请选择等级" :disabled="isFix">
            <el-option
              v-for="(item, index) in gradeList"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额：" prop="amount" class="from_box_item">
          <el-input type="number" size="small" v-model="ruleForm.amount" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="刷单数：≤" prop="brushNumber" class="from_box_item">
          <el-input type="number" size="small" v-model="ruleForm.brushNumber" placeholder="">
            <span slot="suffix">{{coinName}}</span>
          </el-input>
        </el-form-item>
        <el-form-item label="刷单收益：" prop="brushRate" class="from_box_item">
          <el-input type="number" size="small" v-model="ruleForm.brushRate" placeholder="">
            <span slot="suffix">%</span>
          </el-input>
        </el-form-item>
        <el-form-item label="收益币种：" prop="coinId" size="small" class="from_box_item">
          <el-select v-model="ruleForm.coinId" placeholder="请选择收益币种">
            <el-option
              v-for="item in coinList"
              :key="item.coinId"
              :label="item.coinName"
              :value="item.coinId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目URL：" prop="coinDetail">
          <el-input v-model="ruleForm.coinDetail"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="registDetermine" size="small">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import {dateFormat} from '@/common/util';

  export default {
    name: "margin",
    data() {
      return {
        activeName: 'first',
        dateTime: [],
        filterForm: {
          userId: '',
          type: '',
          startTime: '',
          endTime: '',
          pageNum: 1,
          pageSize: 20,
        },
        listData: {
          total: null,
          list: [],
        },
        registList: [],
        coinList: [],
        gradeListObj: {
          0: '铜卡',
          1: '银卡',
          2: '金卡',
          3: '钻石卡',
        },
        gradeList: [{
          label: '铜卡',
          value: 0
        }, {
          label: '银卡',
          value: 1
        }, {
          label: '金卡',
          value: 2
        }, {
          label: '钻石卡',
          value: 3
        }],
        directionList: [{
          label: '全部',
          value: ''
        }, {
          label: '充值',
          value: 1
        }, {
          label: '提取',
          value: 2
        }],
        dialogTitle: '',
        dialogFormVisible: false,
        ruleForm: {
          coinId: '', // 收益币种
          level: '', // 等级
          amount: '', // 保证金金额
          payCoinId: '', // 充值币种
          brushNumber: '', // 刷单数量
          brushRate: '', // 刷单收益比例
          coinDetail: '', // 币详情信息
        },
        rules: {
          coinId: [
            {required: true, message: '请选择币种', trigger: 'change'},
          ],
          level: [
            {required: true, message: '请选择等级', trigger: 'change'},
          ],
          amount: [
            {required: true, message: '请输入金额', trigger: 'blur'},
          ],
          brushNumber: [
            {required: true, message: '请输入刷单数', trigger: 'blur'},
          ],
          brushRate: [
            {required: true, message: '请输入刷单数', trigger: 'blur'},
          ],
          payCoinId: [
            {required: true, message: '请选择收益币种', trigger: 'change'},
          ],
          coinDetail: [
            {required: true, message: '请输入项目URL', trigger: 'blur'},
          ],
        },
        isFix: false,
        coinName: '',
      };
    },
    methods: {
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        this.filterForm.pageNum = currentPage;
        this.getRegistInviteRule();
      },
      modification(itemData) {
        this.dialogTitle = '修改保证金规则';
        this.dialogFormVisible = true;
        this.isFix = true;
        this.resetRuleForm();
        this.ruleForm = JSON.parse(JSON.stringify(itemData));
        this.ruleForm.brushRate = this.ruleForm.brushRate * 100;
        this.getCoinName(itemData.coinId);
      },
      remove(itemData) {
        const {id} = itemData;
        this.$confirm(`确定删除吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete("/cloud/backmgr/shop/deleteMarginRuleById", {
            id
          }).then((res) => {
            this.$notify({
              title: '成功',
              message: `删除成功`,
              type: 'success'
            });
            this.getRegistRewardRuleList();
          })
        })
      },
      addSend() {
        // this.getLevel();
        this.dialogTitle = '新建保证金规则';
        this.dialogFormVisible = true;
        this.isFix = false;    // 控制等级
        this.resetRuleForm();
      },
      resetRuleForm() {
        this.ruleForm = {
          coinId: '', // 项目币种id
          level: '', // 等级
          amount: '', // 保证金金额
          payCoinId: '', // 支付币种id
          brushNumber: '', // 刷单数量
          brushRate: '', // 刷单收益比例
          coinDetail: '', // 币详情信息
        };
        this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
      },
      // 获取记录
      async getRegistInviteRule() {
        this.filterForm.startTime = this.dateTime && this.dateTime[0];
        this.filterForm.endTime = this.dateTime && this.dateTime[1];
        this.$http.post("/cloud/backmgr/shop/listMarginLog", this.filterForm).then((res) => {
          this.listData.list = res.result.list;
          this.listData.total = res.result.count;
        })
      },
      // 获取规则
      getRegistRewardRuleList() {
        const startTime = this.dateTime && this.dateTime[0];
        const endTime = this.dateTime && this.dateTime[1];
        const {userId} = this.filterForm;
        this.$http.post("/cloud/backmgr/shop/listMarginRule", {
          pageNum: 1,
          pageSize: 200,
          userId,
          startTime,
          endTime
        }).then((res) => {
          this.registList = res.result.list;
        })
      },
      registDetermine() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            const {coinId, id, level, amount, payCoinId, brushNumber, brushRate, coinDetail} = this.ruleForm;

            if (this.ruleForm.id) {
              this.$http.put("/cloud/backmgr/shop/updateMarginRule", {
                coinId,
                id,
                level,
                amount,
                payCoinId,
                brushNumber,
                brushRate: brushRate / 100,
                coinDetail,
              }).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `修改成功`,
                  type: 'success'
                });
                this.dialogFormVisible = false;
                this.getRegistRewardRuleList();
              })
            } else {
              this.$http.post("/cloud/backmgr/shop/addMarginRule", {
                coinId,
                level,
                amount,
                payCoinId,
                brushNumber,
                brushRate: brushRate / 100,
                coinDetail,
              }).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `创建成功`,
                  type: 'success'
                });
                this.dialogFormVisible = false;
                this.getRegistRewardRuleList();
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getSampleCoinInfo() {
        this.$http.post("wallet/backmgr/coin/getSampleCoinInfo.do", {}).then((res) => {
          this.coinList = res.result.list
        })
      },
      getCoinName(e) {
        this.coinList.forEach(item => {
          if (item.coinId == e) {
            this.coinName = item.coinName;
          }
        })
      },
      getLevel() {
        // // FIXME:  两个数组去掉相同部分
        // const gradeList = [{
        //   label: '铜卡',
        //   value: 0
        // }, {
        //   label: '银卡',
        //   value: 1
        // }, {
        //   label: '金卡',
        //   value: 2
        // }, {
        //   label: '钻石卡',
        //   value: 3
        // }];
        // const registList = this.registList;
        // const arr = [];
        // gradeList.forEach((grade) => {
        //   if (registList.find((regist) => +grade.value == +regist.level)) {
        //     arr.push(grade);
        //   }
        // })
        // this.gradeList = arr;
      }
    },
    activated() {
      this.getRegistInviteRule();      // 获取记录
      this.getRegistRewardRuleList(); // 获取规则
      this.getSampleCoinInfo();
    }
  };
</script>
<style lang="less">
  .margin {
    &-main {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .el-tabs--border-card {
      .el-tabs__content {
        height: 90%;

        .el-tab-pane {
          height: 100%;
        }
      }
    }
  }
</style>
