
<template>
  <div class='set-bill'>
    <h2>PNB 兑人民币价格设置</h2>
    <div class="" style="background-color: #f2f2f2;padding:20px;">
      <div class="" v-show="!showChangeRateDiv">
        1PNB = {{pnbPrice?pnbPrice:'?'}}¥<el-button type="primary" size="medium" style="margin-left: 30px;" @click="showChangeRateDiv = true">修改</el-button>
      </div>
      <div class="" v-show="showChangeRateDiv">
        <p>1PNB = <el-input v-model="cbbRate" placeholder="请输入内容" style="width: 150px;"></el-input> ¥</p>
        <el-button type="danger" size="medium" @click="showChangeRateDiv = false">取消</el-button>
        <el-button type="primary" size="medium" @click="onSubmit">确认</el-button>
      </div>
    </div>
    <h2>币种设置</h2>
    <sac-table :data="list">
      <el-table-column prop="coinName" label="币种"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="primary" @click.native="delete1(scope.row)">删除</el-button>
          <el-button type="danger" @click.native="add">添加</el-button>
        </template>
      </el-table-column>
    </sac-table>
    <el-dialog :visible.sync="dialogFormVisibleView">
      <p>添加币种名称：<el-input v-model="billName" placeholder="请输入内容" style="width: 150px;"></el-input></p>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" size="medium"  @click="dialogFormVisibleView = false" >取消</el-button>
        <el-button type="primary" size="medium" @click="confirmBill">确认</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogDeleteVisibleView">
      <p>确认要删除该币种吗？</p>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" size="medium"  @click="dialogDeleteVisibleView = false" >取消</el-button>
        <el-button type="primary" size="medium" @click="confirmDetele">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: "currency-set",
    data() {
      return {
        cbbRate: '',
        billName: '',
        list: [{bill: 'PNB'},{bill:'SAC'}],
        server_path: "",
        pageTypeList: [],
        dialogFormVisibleView: false,
        dialogDeleteVisibleView: false,
        showChangeRateDiv: false,
        pnbCoinId: '',
        pnbPrice: '',
      };
    },
    created () {
      this.getBillList()
    },
    methods: {
      getBillList () {
        this.$http.post("/supernode/coin/open/getCoinInfoList",{}).then((res) => {
          this.list = res.result
          this.list.map((value,key) => {
            console.log(value);
            if (value.coinName == 'PNB') {
              this.pnbCoinId = value.coinId
              console.log('this.pnbCoinId', this.pnbCoinId);
              this.pnbPrice = value.price
            }
          })
        })
      },
      // 修改pnb价格
      onSubmit () {
        this.$http.post("/supernode/backmgr/coin/updateCoinInfo",{
          'id':this.pnbCoinId,
          'coinName':'PNB',
          'price': this.cbbRate
        }).then((res) => {
          this.$message({
            type: 'success',
            message: '修改成功！'
          });
          this.showChangeRateDiv = false
          this.pnbPrice = this.cbbRate
        })
      },
      // 点击删除按钮
      delete1 (data) {
        console.log(data);
        this.id = data.coinId
        this.dialogDeleteVisibleView = true
      },
      add () {
        this.dialogFormVisibleView = true
      },
      confirmBill(){
        this.$http.post("/supernode/backmgr/coin/createCoinInfo",{
          'coinName': this.billName
        }).then((res) => {
          this.$message({
            type: 'success',
            message: '添加成功！'
          });
          this.getBillList()
          this.billName = ''
        })
      },
      // 确定删除
      confirmDetele () {
        this.$http.post("/supernode/backmgr/coin/updateCoinInfoSysStatus",{
          'id': this.id,
          'sysStatus': 0
        }).then((res) => {
          this.$message({
            type: 'success',
            message: '删除成功！'
          });
          this.getBillList()
        })
      }
    },
  };
</script>
<style lang="less">
  .set-bill {
    position: relative;
  }
</style>
