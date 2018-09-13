
<template>
  <div class='set-income'>
    <el-row style="margin-bottom: 20px;">
        <el-col :span="19">
            <span style="font-size:20px;font-weight:bold;">收益设置</span>
        </el-col>
        <el-col :span="4" style="text-align: right">
            <el-button type="success" @click.native="gradeAdd">增加会员等级</el-button>
        </el-col>
    </el-row>
    <sac-table :data="listData.list">
      <el-table-column prop="title" label="会员等级"  width="170"></el-table-column>
      <el-table-column prop="create_time" label="起始收益率" width="170"></el-table-column>
      <el-table-column prop="update_time" label="收益率上限" width="170"></el-table-column>
      <el-table-column prop="update_time" label="每邀请1个人增长值" width="170"></el-table-column>
      <el-table-column prop="update_time" label="升级持币量"></el-table-column>
      <el-table-column prop="update_time" label="被邀请者最少持币量"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="primary"
                     @click.native="changeInfo">修改
          </el-button>
        </template>
      </el-table-column>
    </sac-table>
    <sac-pagination v-show="listData.list.length>0"
                    @handleChange="getPaginationChange"
                    :total="+listData.total"
                    :page-size="ruleForm.pageSize"
                    :current-page="ruleForm.pageNum">
    </sac-pagination>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" :inline="true" label-width="170px">
        <el-form-item label="会员等级:" prop="grade" v-show="showAddGrade">
          <el-input placeholder="请输入会员等级" size="small" v-model="ruleForm.grade">
          </el-input>
        </el-form-item>
        <el-form-item label="会员等级:" prop="grade" v-show="!showAddGrade">
          感觉好点
        </el-form-item>
        <el-form-item label="起始收益率:" prop="minIncome">
          <el-input placeholder="请输入起始收益率" size="small" v-model="ruleForm.minIncome">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="收益率上限:" prop="maxIncome">
          <el-input v-model="ruleForm.maxIncome" size="small" placeholder="请输入收益率上限">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="每邀请1个人增长值:" prop="prizeIncome">
          <el-input placeholder="请输入每邀请1个人增长值" size="small" v-model="ruleForm.prizeIncome">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="升级持币量:" prop="upgradeBill">
          <el-input placeholder="请输入升级持币量" size="small" v-model="ruleForm.upgradeBill">
            <template slot="append">PNB</template>
          </el-input>
        </el-form-item>
        <el-form-item label="被邀请者持币量:" prop="invitedBill">
          <el-input size="small" placeholder="请输入被邀请者持币量"
                    v-model="ruleForm.invitedBill">
          <template slot="append">PNB</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" >取 消</el-button>
        <el-button type="primary" @click="determine" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: "pagelist",
    data() {
      return {
        pageTypeList: [],
        ruleForm: {
          grade: '',
          planName: '',
          maxIncome: '',
          totalAmount: "",
          minIncome: '',
          invitedBill: '',
          beginTime: '',
          endTime: '',
          upgradeBill: '',
          prizeIncome: '',
          pageNum: 1,
          pageSize: 20
        },
        dialogFormVisible: false,
        showAddGrade: false, // 是否为添加会员等级
        rules: {
          grade: [
            { required: true, message: '请输入起始收益率', trigger: 'blur' },
          ],
          minIncome: [
            { required: true, message: '请输入起始收益率', trigger: 'blur' },
          ],
          maxIncome: [
            { required: true, message: '请输入收益率上限', trigger: 'blur' },
          ],
          prizeIncome: [
            { required: true, message: '请输入每邀请1个人增长值', trigger: 'blur' },
          ],
          upgradeBill: [
            { required: true, message: '请输入升级持币量', trigger: 'blur' },
          ],
          invitedBill: [
            { required: true, message: '请输入被邀请者持币量', trigger: 'blur' },
          ],
        },
        listData: {
          total: null,
          list: [],
        },
      };
    },
    created () {
      this.getPageInfoList()
    },
    methods: {
      changeInfo () {
        this.dialogFormVisible = true
        this.showAddGrade = false
      },
      // 增加会员等级
      gradeAdd () {
        this.dialogFormVisible = true
        this.showAddGrade = true
      },
      submitForm(num) {
        this.ruleForm.pageNum = num;
        this.getPageInfoList();
      },
      getPaginationChange(val, currentPage) {
        this.ruleForm.pageSize = val;
        this.submitForm(currentPage);
      },
      getPageInfoList() {
        this.$http.post("/cloud/backmgr/page/open/getPageInfoList", {
          'version': '1.0.0',
          'plat': 'web',
          'pageNum': 1,
          'pageSize': 20
        }).then((res) => {
          this.listData.list = res.result.list.list;
          this.listData.total = res.result.list.total;
        })
      },
      determine() {

      },
    },
  };
</script>
<style lang="less">
  .set-income {
    .el-form-item__content {
      width: auto;
    }
  }
</style>
