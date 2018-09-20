
<template>
  <div class='set-income'>
    <el-row style="margin-bottom: 20px;">
        <el-col :span="19">
            <span style="font-size:20px;font-weight:bold;">收益设置</span>
        </el-col>
    </el-row>
    <sac-table :data="listData.list">
      <el-table-column prop="roleName" label="会员等级"  width="170"></el-table-column>
      <el-table-column prop="initRate" label="起始收益率" width="170">
        <template slot-scope="scope">
          {{(scope.row.initRate*100).toFixed(2)}}%
        </template>
      </el-table-column>
      <el-table-column prop="maxRate" label="收益率上限" width="170">
        <template slot-scope="scope">
          {{(scope.row.maxRate*100).toFixed(2)}}%
        </template>
      </el-table-column>
      <el-table-column prop="increasRate" label="每邀请1个人增长值" width="170">
        <template slot-scope="scope">
          {{(scope.row.increasRate*100).toFixed(2)}}%
        </template>
      </el-table-column>
      <el-table-column prop="holdAmountLimit" label="最小持币量限制"></el-table-column>
      <el-table-column prop="invitedHoldAmountLimit" label="被邀请者最少持币量"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="primary"
                     @click.native="changeInfo(scope.row)">修改
          </el-button>
        </template>
      </el-table-column>
    </sac-table>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" :inline="true" label-width="170px">
        <el-form-item label="会员等级:" prop="roleName">
          感觉好点
        </el-form-item>
        <el-form-item label="起始收益率:" prop="initRate">
          <el-input placeholder="请输入起始收益率" size="small" v-model="(ruleForm.initRate*100).toFixed(2)">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="收益率上限:" prop="maxRate">
          <el-input v-model="(ruleForm.maxRate*100).toFixed(2)" size="small" placeholder="请输入收益率上限">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="每邀请1个人增长值:" prop="increasRate">
          <el-input placeholder="请输入每邀请1个人增长值" size="small" v-model="(ruleForm.increasRate*100).toFixed(2)">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="升级持币量:" prop="holdAmountLimit">
          <el-input placeholder="请输入升级持币量" size="small" v-model="ruleForm.holdAmountLimit">
            <template slot="append">PNB</template>
          </el-input>
        </el-form-item>
        <el-form-item label="被邀请者持币量:" prop="invitedHoldAmountLimit">
          <el-input size="small" placeholder="请输入被邀请者持币量"
                    v-model="ruleForm.invitedHoldAmountLimit">
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
          maxRate: '',
          initRate: '',
          invitedHoldAmountLimit: '',
          holdAmountLimit: '',
          increasRate: '',
        },
        dialogFormVisible: false,
        rules: {
          initRate: [
            { required: true, message: '请输入起始收益率', trigger: 'blur' },
          ],
          maxRate: [
            { required: true, message: '请输入收益率上限', trigger: 'blur' },
          ],
          increasRate: [
            { required: true, message: '请输入每邀请1个人增长值', trigger: 'blur' },
          ],
          holdAmountLimit: [
            { required: true, message: '请输入升级持币量', trigger: 'blur' },
          ],
          invitedHoldAmountLimit: [
            { required: true, message: '请输入被邀请者持币量', trigger: 'blur' },
          ],
        },
        listData: {
          list: [],
        },
      };
    },
    created () {
      this.getPageInfoList()
    },
    methods: {
      changeInfo (data) {
        this.ruleForm = data
        this.dialogFormVisible = true
      },
      // 获取角色信息
      getPageInfoList() {
        this.$http.post("/supernode/backmgr/role/getRoleInfo", {}).then((res) => {
          this.listData.list = res.result || [];
        })
      },
      // 修改角色信息
      determine() {
        let data = this.ruleForm
        console.log(this.ruleForm);
        // const {maxRate, initRate, invitedHoldAmountLimit, holdAmountLimit,increasRate} = this.ruleForm
        this.$http.post("/supernode/backmgr/role/updateRoleInfo", data).then((res) => {
          this.$message({
            type: 'success',
            message: '修改成功！'
          });
          this.getPageInfoList()
          this.dialogFormVisible = false
        })
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
