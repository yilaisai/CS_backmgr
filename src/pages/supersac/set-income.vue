
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
      <el-table-column prop="increaseRate" label="每邀请1个人增长值" width="170">
        <template slot-scope="scope">
          {{(scope.row.increaseRate*100).toFixed(2)}}%
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
        <el-form-item label="会员等级:" prop="roleName">{{ruleForm.roleName}}</el-form-item>
        <el-form-item label="起始收益率:" prop="initRate">
          <el-input placeholder="请输入起始收益率" size="small" v-model="ruleForm.initRate">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="收益率上限:" prop="maxRate">
          <el-input v-model="ruleForm.maxRate" size="small" placeholder="请输入收益率上限">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="每邀请1个人增长值:" prop="increaseRate">
          <el-input placeholder="请输入每邀请1个人增长值" size="small" v-model="ruleForm.increaseRate">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="升级持币量:" prop="holdAmountLimit" class="hold-amount-limit">
          <el-input placeholder="请输入升级持币量" size="small" v-model="ruleForm.holdAmountLimit">
            <template slot="append">PNB</template>
          </el-input>
        </el-form-item>
        <el-form-item label="被邀请者持币量:" prop="invitedHoldAmountLimit" class="invited-hold-amount-limit">
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
          increaseRate: '',
        },
        dialogFormVisible: false,
        rules: {
          initRate: [
            { required: true, message: '请输入起始收益率', trigger: 'blur' },
          ],
          maxRate: [
            { required: true, message: '请输入收益率上限', trigger: 'blur' },
          ],
          increaseRate: [
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
    methods: {
      changeInfo (data) {
        this.ruleForm = {
          roleId: data.roleId,
          roleName: data.roleName,
          initRate: (data.initRate*100).toFixed(2),
          maxRate: (data.maxRate*100).toFixed(2),
          increaseRate: (data.increaseRate*100).toFixed(2),
          holdAmountLimit: data.holdAmountLimit,
          invitedHoldAmountLimit: data.invitedHoldAmountLimit
        }
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
        let data = {
          roleId: this.ruleForm.roleId,
          roleName: this.ruleForm.roleName,
          initRate: (this.ruleForm.initRate/100).toFixed(4),
          maxRate: (this.ruleForm.maxRate/100).toFixed(4),
          increaseRate: (this.ruleForm.increaseRate/100).toFixed(4),
          holdAmountLimit: this.ruleForm.holdAmountLimit,
          invitedHoldAmountLimit: this.ruleForm.invitedHoldAmountLimit
        }
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
    activated() {
      this.getPageInfoList()
    }
  };
</script>
<style lang="less">
  .set-income {
    .el-form-item__content {
      width: auto;
    }
    .hold-amount-limit,
    .invited-hold-amount-limit {
      .el-input-group__append {
        padding: 0 13px 0 12px;
      }
    }
  }
</style>
