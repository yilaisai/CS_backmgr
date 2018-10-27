
<template>
  <div class='set-income'>
    <el-row style="margin-bottom: 20px;">
        <el-col :span="19" style="text-align:center;">
            <el-button type="primary" size="small" :class="tapIndex == 1?'':'empty'" @click="showButton(1)">收益设置</el-button>
            <el-button type="primary" size="small" :class="tapIndex == 2?'':'empty'" @click="showButton(2)">等级条件设置</el-button>
        </el-col>
    </el-row>
    <sac-table :data="listData.list" v-show="tapIndex == 1" >
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
      <el-table-column label="操作">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="primary" size="small"
                     @click.native="change1Info(scope.row)">修改
          </el-button>
        </template>
      </el-table-column>
    </sac-table>
    <sac-table :data="listData.list" v-show="tapIndex == 2">
      <el-table-column prop="roleName" label="会员等级"  width="170"></el-table-column>
      <!-- <el-table-column prop="initRate" label="起始收益率" width="170">
        <template slot-scope="scope">
          {{(scope.row.initRate*100).toFixed(2)}}%
        </template>
      </el-table-column>
      <el-table-column prop="maxRate" label="收益率上限" width="170">
        <template slot-scope="scope">
          {{(scope.row.maxRate*100).toFixed(2)}}%
        </template>
      </el-table-column> -->
      <el-table-column prop="increaseRate" label="每邀请1个人增长值" width="170">
        <template slot-scope="scope">
          {{(scope.row.increaseRate*100).toFixed(2)}}%
        </template>
      </el-table-column>
      <el-table-column prop="holdAmountLimit" label="最小持币量限制"></el-table-column>
      <el-table-column prop="invitedHoldAmountLimit" label="被邀请者最少持币量"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="primary" size="small"
                     @click.native="change2Info(scope.row)">修改
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="determine" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogForm2Visible">
      <el-form :model="ruleForm" ref="ruleForm2" :rules="rules" :inline="true" label-width="170px">
        <el-form-item label="会员等级:" prop="roleName">{{ruleForm.roleName}}</el-form-item>
        <!-- <el-form-item label="起始收益率:" prop="initRate">
          <el-input placeholder="请输入起始收益率" size="small" v-model="ruleForm.initRate">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="收益率上限:" prop="maxRate">
          <el-input v-model="ruleForm.maxRate" size="small" placeholder="请输入收益率上限">
            <template slot="append">%</template>
          </el-input>
        </el-form-item> -->
        <el-form-item label="每邀请1个人增长值:" prop="increaseRate">
          <el-input placeholder="请输入每邀请1个人增长值" size="small" v-model="ruleForm.increaseRate">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="最小持币量限制:" prop="holdAmountLimit" class="hold-amount-limit">
          <el-input placeholder="请输入最小持币量限制" size="small" v-model="ruleForm.holdAmountLimit">
            <template slot="append">PNB</template>
          </el-input>
        </el-form-item>
        <el-form-item label="被邀请者最少持币量:" prop="invitedHoldAmountLimit" class="invited-hold-amount-limit">
          <el-input size="small" placeholder="请输入被邀请者最少持币量"
                    v-model="ruleForm.invitedHoldAmountLimit">
          <template slot="append">PNB</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm2Visible = false" size="small" >取 消</el-button>
        <el-button type="primary" @click="determine2" size="small">确 定</el-button>
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
        dialogForm2Visible: false,
        tapIndex: 1,
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
      showButton(i){
        this.tapIndex = i
      },
      change1Info (data) {
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
      change2Info (data) {
        this.ruleForm = {
          roleId: data.roleId,
          roleName: data.roleName,
          initRate: (data.initRate*100).toFixed(2),
          maxRate: (data.maxRate*100).toFixed(2),
          increaseRate: (data.increaseRate*100).toFixed(2),
          holdAmountLimit: data.holdAmountLimit,
          invitedHoldAmountLimit: data.invitedHoldAmountLimit
        }
        this.dialogForm2Visible = true
      },
      // 获取角色信息
      getPageInfoList() {
        this.$http.post("/supernode/backmgr/role/getRoleInfo", {}).then((res) => {
          this.listData.list = res.result || [];
        })
      },
      // 修改收益信息
      determine() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let data = {
              roleId: this.ruleForm.roleId,
              roleName: this.ruleForm.roleName,
              initRate: (this.ruleForm.initRate/100).toFixed(4),
              maxRate: (this.ruleForm.maxRate/100).toFixed(4),
            }
            this.$http.post("/supernode/backmgr/role/update/bonus", data).then((res) => {
              this.$message({
                type: 'success',
                message: '修改成功！'
              });
              this.getPageInfoList()
              this.dialogFormVisible = false
            })
      } else {
        console.log('error submit!!');
        return false;
      }
    })
  },
  // 修改等级条件设置
  determine2() {
    this.$refs.ruleForm2.validate((valid) => {
      if (valid) {
        let data = {
          roleId: this.ruleForm.roleId,
          roleName: this.ruleForm.roleName,
          increaseRate: (this.ruleForm.increaseRate/100).toFixed(4),
          holdAmountLimit: this.ruleForm.holdAmountLimit,
          invitedHoldAmountLimit: this.ruleForm.invitedHoldAmountLimit
        }
        this.$http.post("/supernode/backmgr/role/update/condition", data).then((res) => {
          this.$message({
            type: 'success',
            message: '修改成功！'
          });
          this.getPageInfoList()
          this.dialogForm2Visible = false
        })
  } else {
    console.log('error submit!!');
    return false;
  }
})
}
},
    activated() {
      this.getPageInfoList()
    }
}
</script>
<style lang="less">
  .set-income {
    .el-form-item__content {
      width: auto;
    }
    .empty {
      background-color: white;
      color: #409EFF;
    }
    .hold-amount-limit,
    .invited-hold-amount-limit {
      .el-input-group__append {
        padding: 0 13px 0 12px;
      }
    }
  }
</style>
