/**
*  Created by   阿紫
*  On  2018/8/10
*  Content 送币规则
*/
<template>
  <div class='send-money'>
     <el-tabs v-model="activeName2" type="border-card">
      <el-tab-pane label="邀请好友送币" name="first">
        <el-col :span="22" style="text-align:right;margin-bottom: 10px;">
          <!-- <h3>邀请好友送币</h3> -->
          <el-button size="small" type="primary" @click="addSend">创建规则</el-button>
        </el-col>

        <sac-table :data="listData.list">
          <el-table-column prop="createTime" label="创建时间" width="140">
          </el-table-column>
          <el-table-column prop="coinId" label="币种" class-name="选择送出的币类型" :render-header="foo">
            <template slot-scope="scope">
              <div v-for="item in coinList" :key="item.coinId" v-if="scope.row.coinId==item.coinId">{{item.coinName}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="directInvitedAmount" label="邀请奖励" width="100" class-name="邀请单个好友时，给予邀请人的奖励" :render-header="foo"></el-table-column>
          <el-table-column prop="registAmount" label="被邀请人奖励" width="100"></el-table-column>
          <el-table-column prop="secInvitedAmount" label="父奖励" class-name="邀请单个好友时，给予父邀请人的奖励" :render-header="foo"></el-table-column>

          <el-table-column prop="effectSec" label="父奖励状态" width="100" class-name="是否给予邀请单个好友时，父邀请人的奖励" :render-header="foo">
            <template slot-scope="scope">
              <div v-for="item in effectSecData" :key="item.coinId" v-if="scope.row.effectSec==item.value">{{item.text}}</div>
            </template>
          </el-table-column>

          <el-table-column prop="inviteAmount" label="邀请数奖励" width="100" class-name="邀请人邀请用户数达到一定数量奖励多少币，与邀请单个好友冲突" :render-header="foo"></el-table-column>
          <el-table-column prop="inviteAuthState" label="邀请人实名" width="100">
            <template slot-scope="scope">
              <div v-for="item in needData" :key="item.coinId" v-if="scope.row.inviteAuthState==item.value">{{item.text}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="inviteCount" label="邀请人数"></el-table-column>
          <el-table-column prop="invitedAuthState" label="被邀请人实名" width="100">
            <template slot-scope="scope">
              <div v-for="item in needData" :key="item.coinId" v-if="scope.row.invitedAuthState==item.value">{{item.text}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="loginDay" label="登录天数"></el-table-column>
          <el-table-column prop="maxInviteAmount" label="送币上限"></el-table-column>
          <el-table-column prop="remainAmount" label="奖池余额"></el-table-column>

          <el-table-column prop="totalAmount" label="奖池总额" width="100" class-name="0表示不限制" :render-header="foo"></el-table-column>
          <el-table-column prop="tranStatus" label="转账">
            <template slot-scope="scope">
              <div v-for="item in tranStatusData" :key="item.tranStatus" v-if="scope.row.tranStatus==item.value">{{item.text}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="beginDate" label="生效时间" width="140"></el-table-column>
          <el-table-column prop="endDate" label="失效时间" width="140"></el-table-column>
          <el-table-column prop="sendCount" label="数/天" class-name="每天送币次数，0表示不限制" :render-header="foo"></el-table-column>
          <el-table-column prop="sendDay" label="分发天数"></el-table-column>
          <el-table-column label="操作" width="150" fixed="right">

            <template slot-scope="scope" prop="sysStatus">
              <el-button type="success" :disabled="scope.row.isOnshelf != 0" size="small"
                        @click.native="modification(scope.row)">修改
              </el-button>
              <el-button type="danger" size="small" :disabled="scope.row.sysStatus != 0"
                        @click.native="remove(scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="系统状态" width="100" fixed="right">
            <template slot-scope="scope" prop="sysStatus">
              <el-switch v-model="scope.row.sysStatus" :inactive-value="0" :active-value="1"
                        @click.native="switchSysStatusChange(scope.row)" :aaa="scope.row.sysStatus"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="上架" width="100" fixed="right">
            <template slot-scope="scope" prop="isOnshelf">
              <el-switch v-model="scope.row.isOnshelf" :disabled="scope.row.sysStatus == 0" :inactive-value="0" :active-value="1"
                        @click.native="switchChange(scope.row)"></el-switch>
            </template>
          </el-table-column>
        </sac-table>
      </el-tab-pane>
      <el-tab-pane label="注册送币" name="second">
        <el-col :span="22" style="text-align:right;margin-bottom: 10px;">
          <!-- <h3>注册送币</h3> -->
          <el-button size="small" type="primary" @click="registerAddSend">创建规则</el-button>
        </el-col>

        <sac-table :data="registList">
          <el-table-column prop="coinType" label="币种"></el-table-column>
          <el-table-column prop="amount" label="送币量"></el-table-column>
          <el-table-column prop="startTime" label="生效时间"></el-table-column>
          <el-table-column prop="endTime" label="失效时间"></el-table-column>
          <el-table-column label="操作">

            <template slot-scope="scope" prop="sysStatus">
              <el-button type="success" :disabled="scope.row.isShow != 0" size="small"
                        @click.native="registerModification(scope.row)">修改
              </el-button>
              <el-button type="danger" size="small" :disabled="scope.row.isShow != 0"
                        @click.native="registerRemove(scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="上架">
            <template slot-scope="scope" prop="isShow">
              <el-switch v-model="scope.row.isShow" :inactive-value="0" :active-value="1"
                        @click.native="registerSwitchChange(scope.row)"></el-switch>
            </template>
          </el-table-column>
        </sac-table>
      </el-tab-pane>
    </el-tabs>
    
    <!-- <br> -->
    <!--<sac-pagination v-show="listData.list.length>0"-->
                    <!--@handleChange="getPaginationChange"-->
                    <!--:total="+listData.total"-->
                    <!--:page-size="pageSize"-->
                    <!--:current-page="pageNum">-->
    <!--</sac-pagination>-->
    
    <!--<sac-pagination v-show="listData.list.length>0"-->
                    <!--@handleChange="getPaginationChangeRegist"-->
                    <!--:total="+listData.total"-->
                    <!--:page-size="pageSize"-->
                    <!--:current-page="pageNum">-->
    <!--</sac-pagination>-->
    <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogFormVisible"

    >
      <el-form :model="ruleForm" ref="ruleForm"  label-width="130px">
        <div class="from_box">
          <el-form-item label="币种:" prop="coinId" class="from_box_item">
            <el-select v-model="ruleForm.coinId" placeholder="请选择" size="small">
              <el-option
                v-for="item in coinList"
                :key="item.coinId"
                :label="item.coinName"
                :value="item.coinId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邀请奖励:" prop="directInvitedAmount"  class="from_box_item">
            <el-input type="number" size="small" v-model="ruleForm.directInvitedAmount" placeholder=""></el-input>
          </el-form-item>
        </div>
        <div class="from_box">
          <el-form-item label="父奖励:" prop="secInvitedAmount"   class="from_box_item">
            <el-input type="number" size="small" v-model="ruleForm.secInvitedAmount" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="父奖励状态:" prop="effectSec"   class="from_box_item">
            <el-select v-model="ruleForm.effectSec" size="small" placeholder="请选择">
              <el-option
                v-for="item in effectSecData"
                :key="item.value"
                :label="item.text"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="from_box">
          <el-form-item label="邀请数奖励:" prop="inviteAmount" class="from_box_item">
            <el-input type="number" size="small" v-model="ruleForm.inviteAmount" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="邀请人实名:" prop="inviteAuthState" class="from_box_item">
            <el-select size="small"  v-model="ruleForm.inviteAuthState" placeholder="请选择">
              <el-option
                v-for="item in needData"
                :key="item.value"
                :label="item.text"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="from_box">
          <el-form-item label="被邀请人实名:" prop="invitedAuthState" class="from_box_item">
            <el-select size="small" v-model="ruleForm.invitedAuthState" placeholder="请选择">
              <el-option
                v-for="item in needData"
                :key="item.value"
                :label="item.text"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="邀请人数:" prop="inviteCount" class="from_box_item">
            <el-input size="small" type="number" v-model="ruleForm.inviteCount" placeholder=""></el-input>
          </el-form-item>
        </div>
        <div class="from_box">
          <el-form-item label="登录天数:" prop="loginDay" class="from_box_item">
            <el-input size="small" type="number" v-model="ruleForm.loginDay" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="送币上限:" prop="maxInviteAmount" class="from_box_item">
            <el-input size="small" type="number" v-model="ruleForm.maxInviteAmount" placeholder=""></el-input>
          </el-form-item>
        </div>
        <div class="from_box">
          <el-form-item label="奖池余额:" prop="remainAmount"  class="from_box_item">
            <el-input size="small" type="number" v-model="ruleForm.remainAmount" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="系统状态:" prop="sysStatus" class="from_box_item">
            <el-select size="small" v-model="ruleForm.sysStatus" placeholder="请选择">
              <el-option
                v-for="item in sysStatusData"
                :key="item.value"
                :label="item.text"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="from_box">
          <el-form-item label="奖池总额:" prop="totalAmount" class="from_box_item">
            <el-input type="number" size="small" v-model="ruleForm.totalAmount" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="转账:" prop="tranStatus" class="from_box_item">
            <el-select size="small" v-model="ruleForm.tranStatus" placeholder="请选择">
              <el-option
                v-for="item in tranStatusData"
                :key="item.value"
                :label="item.text"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="from_box">
          <el-form-item label="生效时间:" prop="beginDate" class="from_box_item" >
            <el-date-picker
              size="small"
              v-model="ruleForm.beginDate"
              type="datetime"
              placeholder="选择生效时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="失效时间:" prop="endDate" class="from_box_item">
            <el-date-picker
              size="small"
              v-model="ruleForm.endDate"
              type="datetime"
              placeholder="选择失效时间">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="from_box">
          <el-form-item label="数/天:" prop="sendCount" class="from_box_item">
            <el-input size="small" type="number" v-model="ruleForm.sendCount" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="被邀请人奖励:" prop="registAmount"  class="from_box_item" :formatter="formatSex">
            <el-input size="small" type="number" v-model="ruleForm.registAmount" placeholder=""></el-input>
          </el-form-item>
        </div>
        <div class="from_box">
          <el-form-item label="分发天数:" prop="sendDay" class="from_box_item">
            <el-input size="small" type="number" v-model="ruleForm.sendDay" placeholder=""></el-input>
          </el-form-item>
        </div>
          <el-card class="box-card" style="overflow:hidden;padding:20px 20px 10px">
            <div style="width:50%;float:left">
                  <div class="from_box">
                  <el-form-item label="累计邀请大于等于:" prop="personNub" class="from_box_item noWidth">
                    <el-input size="small" type="number"  v-model="ruleForm.personNub"  placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
                <div class="from_box">
                  <el-form-item label="用户额外送:" prop="personCount" class="from_box_item noWidth">
                    <el-input size="small" type="number" v-model="ruleForm.personCount" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
                <div class="from_box">
                    <el-form-item label="币种:" prop="roleCoinId" class="from_box_item noWidth">
                    <el-select v-model="ruleForm.roleCoinId" @change="selectGetCoinName" placeholder="请选择" size="small">
                      <el-option
                        v-for="item in ruleCoinList"
                        :key="item.coinId"
                        :label="item.coinName"
                        :value="item.coinId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="from_box" style="text-align:center">
                  <el-button @click="InvitePrizes"  size="small">增加</el-button>
                </div>
            </div>
            <div class="elCard_left" >
              <div v-if="rulelist.length > 0" v-for="(item,index) in rulelist" :key="index" class="text item" >
                <i @click="deleteRule(index)" class="el-icon-circle-close-outline"></i>
                {{`累计邀请大于等于${item.personNub}个用户额外送${item.personCount}个${item.coinName}`}}
              </div>
            </div>
          </el-card>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="determine" size="small">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="registerDialogTitle" :visible.sync="registerDialogFormVisible" class="register_dialog">
      <el-form :model="registRuleForm" ref="registRuleForm" :rules="rules" label-width="135px">
        <div class="from_box">
          <el-form-item label="币种:" prop="coinId" size="small" class="from_box_item">
            <el-select v-model="registRuleForm.coinId" placeholder="请选择">
              <el-option
                v-for="item in coinList"
                :key="item.coinId"
                :label="item.coinName"
                :value="item.coinId">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="from_box">
          <el-form-item label="送币量:"  prop="amount"  class="from_box_item">
            <el-input  size="small" v-model="registRuleForm.amount" placeholder=""></el-input>
          </el-form-item>
        </div>
        <div class="from_box">
          <el-form-item label="生效时间:" prop="startTime" class="from_box_item" >
            <el-date-picker
              size="small"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="registRuleForm.startTime"
              type="datetime"
              placeholder="选择生效时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="失效时间:" prop="endTime" class="from_box_item">
            <el-date-picker
              size="small"
              v-model="registRuleForm.endTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择失效时间">
            </el-date-picker>
          </el-form-item>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="registDetermine" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { dateFormat } from '@/common/util';
  export default {
    name: 'send-money',
    data() {
      const checkNum = (rule, value, callback) => {
        if (!/^[0-9]+.?[0-9]*$/.test(value)) {
          callback(new Error(rule.message));
        } else {
          callback();
        }
      };
      return {
        activeName2: 'first',
        pageNum: 1,
        pageSize: 20,
        listData: {
          total: null,
          list: [],
        },
        dialogTitle: '',
        registerDialogTitle: '',
        dialogFormVisible: false,
        registerDialogFormVisible: false,
        ruleForm: {
          coinId:'',
          coinName:"",
          roleCoinId:'',
          directInvitedAmount:'',
          secInvitedAmount:'',
          effectSec:'',
          inviteAmount:'',
          inviteAuthState:'',
          invitedAuthState:'',
          inviteCount:'',
          loginDay:'',
          maxInviteAmount:'',
          remainAmount:'',
          sysStatus:'',
          totalAmount:'',
          tranStatus:'',
          beginDate:'',
          endDate:'',
          isOnshelf:'',
          sendCount:'',
          registAmount:'',
          personCount:'',
          personNub:''
        },
        rules: {
          coinId: [
            { required: true, message: '请选择币种', trigger: 'change' },
          ],
          amount: [
            { required: true, message: '请输入送币数量', trigger: 'blur' },
            { validator: checkNum, message: '送币数量必须为数字' }
          ],
          startTime: [
            { required: true, message: '请选择生效时间', trigger: 'change' },
          ],
          endTime: [
            { required: true, message: '请选择失效时间', trigger: 'change' },
          ],
        },
        effectSecData:[
          {value:0,text:'不给予'},
          {value:1,text:'给予'},
        ],
        needData:[
          {value:0,text:'不需要'},
          {value:1,text:'需要'},
        ],
        sysStatusData:[
          {value:0,text:'失效'},
          {value:1,text:'生效'},
        ],
        isOnshelfData:[
          {value:0,text:'下架'},
          {value:1,text:'上架'},
        ],
        tranStatusData:[
          {value:0,text:'不需要'},
          {value:1,text:'需要'},
          {value:2,text:'链上'}
        ],
        coinList: [],
        ruleCoinList:[],
        registList: [],
        registRuleForm:{
          coinId:'',
          amount:'',
          startTime:'',
          endTime:'',
          // pageNum: 1,
          // pageSize: 20,
          // total: null,
        },
        rulelist:[]

      };
    },
    methods: {
      // 制定规则
      InvitePrizes(){
        let obj = {};
        obj.personCount = this.ruleForm.personCount;
        obj.personNub = this.ruleForm.personNub;
        obj.roleCoinId = this.ruleForm.roleCoinId;
        obj.coinName = this.ruleForm.coinName;
        this.rulelist.push(obj)
      },
      selectGetCoinName(coinId){
        let obj = {};
        obj = this.ruleCoinList.find((item)=>{
          return item.coinId === coinId;
        });
        this.ruleForm.coinName = obj.coinName;
      },
      deleteRule(index){
        this.rulelist.splice(index,1)
      },
      resetForm() {
        this.ruleForm = {
          coinId:'',
          directInvitedAmount:'',
          secInvitedAmount:'',
          effectSec:'',
          inviteAmount:'',
          inviteAuthState:'',
          invitedAuthState:'',
          inviteCount:'',
          loginDay:'',
          maxInviteAmount:'',
          remainAmount:'',
          sysStatus:'',
          totalAmount:'',
          tranStatus:'',
          beginDate:'',
          endDate:'',
          isOnshelf:''
        };
        this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
      },
      // getPaginationChange(val, currentPage) {
      //   this.pageSize = val;
      //   this.pageNum = currentPage;
      //   this.getRegistInviteRule();
      // },
      formatSex: function (row, column) {
        return `>=${row.minAmount}  <=${row.maxAmount}`
      },
      async getRegistInviteRule() {
        await this.getSampleCoinInfo()
        const { pageNum, pageSize } = this;
        this.$http.post("wallet/backmgr/registInviteRule/getRegistInviteRule.do", { pageNum, pageSize }).then((res) => {
          const list = res.result.list;
          const total= res.result.list.length
          this.listData.list = list;
          this.listData.total = total;
        })
      },
      // 上下架
      switchChange(itemData) {
        if(itemData.sysStatus){
          const { isOnshelf, id } = itemData;
          this.$http.post("wallet/backmgr/registInviteRule/updateRegistInviteRuleIsOnShelf.do", {
            isOnShelf: isOnshelf ? "YES" : "NO",
            id
          }).then((res) => {

            this.$notify({
              title: '成功',
              message: `${isOnshelf ? "上架" : "下架"} 成功`,
              type: 'success'
            });
            this.getRegistInviteRule();
          })
        }
      },
      //更改状态
      switchSysStatusChange(itemData){
        const { sysStatus, id } = itemData;
        this.$http.post("wallet/backmgr/registInviteRule/updateRegistInviteRuleStatue.do", {
          status:sysStatus,
          id
        }).then((res) => {
          this.$notify({
            title: '成功',
            message: `${sysStatus ? "生效" : "失效"} 成功`,
            type: 'success'
          });
          this.getRegistInviteRule();
        })
      },
      // 删除
      remove(itemData) {
        const { id } = itemData;
        this.$confirm(`确定删除吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post("wallet/backmgr/registInviteRule/delRegistInviteRule.do", {
            id
          }).then((res) => {
            this.$notify({
              title: '成功',
              message: `删除成功`,
              type: 'success'
            });
            this.getRegistInviteRule();
          })
        })
      },
      addSend() {
        this.dialogTitle = '创建邀请规则';
        this.dialogFormVisible = true;
        this.resetForm();
      },
      modification(itemData) {
        this.dialogTitle = '修改邀请规则';
        this.dialogFormVisible = true;
        this.resetForm();
        this.ruleForm = JSON.parse(JSON.stringify(itemData));
        this.ruleForm.beginDate=new Date(this.ruleForm.beginDate);
        this.ruleForm.endDate=new Date(this.ruleForm.endDate)
      },
      determine() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if(this.ruleForm.id){
              let postdata=this.ruleForm
              delete postdata.beginTime
              delete postdata.endTime
              delete postdata.createTime
              delete postdata.updateTime
              postdata.endDate=this.formatDateTime(new Date(postdata.endDate))
              postdata.beginDate=this.formatDateTime(new Date(postdata.beginDate))
              this.$http.post("wallet/backmgr/registInviteRule/updateRegistInviteRule.do", postdata).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `修改成功`,
                  type: 'success'
                });
                this.dialogFormVisible = false;
                this.getRegistInviteRule();
              })
            } else {
              let postdata=this.ruleForm
              postdata.endDate=this.formatDateTime(new Date(postdata.endDate))
              postdata.beginDate=this.formatDateTime(new Date(postdata.beginDate))
              this.$http.post("wallet/backmgr/registInviteRule/createRegistInviteRule.do", postdata).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `创建成功`,
                  type: 'success'
                });
                this.dialogFormVisible = false;
                this.getRegistInviteRule();
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getSampleCoinInfo() {
        let _this=this
          return new Promise(function (resolve, reject) {
            _this.$http.post("wallet/backmgr/coin/getSampleCoinInfo.do", {}).then((res) => {
              _this.coinList = res.result.list
              _this.ruleCoinList = res.result.list
              resolve();
            })
        })
      },
      formatDateTime(date){
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h=h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        var second=date.getSeconds();
        second=second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
      },
      foo(h,{column}){
        if(column.className){
          return(
            <el-tooltip
        class="item"
          effect="dark"
          content={column.className}
          placement="bottom"
            >
            <span>{column.label}<i class="el-icon-question"></i></span>
          </el-tooltip>
        )
        }
      },
      resetRegistRuleForm() {
        this.registRuleForm = {
            coinId:'',
            amount:'',
          startTime:'',
          endTime:'',
        };
        this.$refs.registRuleForm && this.$refs.registRuleForm.resetFields();
      },
      registerAddSend() {
        this.registerDialogTitle = '创建注册送币规则';
        this.registerDialogFormVisible = true;
        this.resetRegistRuleForm();
      },
      registerModification(itemData) {
        this.resetRegistRuleForm();
        this.registerDialogTitle = '修改注册送币规则';
        this.registerDialogFormVisible = true;
        this.registRuleForm = JSON.parse(JSON.stringify(itemData));
      },
      getRegistRewardRuleList() {
        this.$http.post("wallet/backmgr/reward/getRegistRewardRuleList.do", {
          pageNum: 1,
          pageSize: 200,
        }).then((res) => {
          this.registList = res.result.list;
        })
      },
      registerSwitchChange (itemData) {
          const { isShow, id } = itemData;
          this.$http.post("wallet/backmgr/reward/updateRegistRewardRuleShowType.do", {
            isShow: isShow ? "SHOW" : "HIDE",
            id
          }).then((res) => {
            this.$notify({
              title: '成功',
              message: `${isShow ? "上架" : "下架"} 成功`,
              type: 'success'
            });
            this.getRegistRewardRuleList();
          }).catch(()=>{
            this.getRegistRewardRuleList();
          })
      },
      registerRemove(itemData){
        const { id } = itemData;
        this.$confirm(`确定删除吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post("wallet/backmgr/reward/deleteRegistRewardRule.do", {
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
      registDetermine(){
        this.$refs.registRuleForm.validate((valid) => {
          if (valid) {
            const {coinId, id, amount, startTime, endTime} =  this.registRuleForm;
            if(this.registRuleForm.id){
              this.$http.post("wallet/backmgr/reward/updateRegistRewardRule.do", {
                coinId,
                id,
                amount,
                startTime,
                endTime,
              }).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `修改成功`,
                  type: 'success'
                });
                this.registerDialogFormVisible = false;
                this.getRegistRewardRuleList();
              })
            } else {
              this.$http.post("wallet/backmgr/reward/createRegistRewardRule.do", {
                coinId,
                amount,
                startTime,
                endTime,
              }).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `创建成功`,
                  type: 'success'
                });
                this.registerDialogFormVisible = false;
                this.getRegistRewardRuleList();
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // getPaginationChangeRegist(val, currentPage) {
      //   this.pageSize = val;
      //   this.pageNum = currentPage;
      //   this.getRegistInviteRule();
      // },
    },
    activated() {
      this.getRegistInviteRule();
      this.getRegistRewardRuleList();
    }
  };
</script>
<style lang="less">
  .send-money {
    h3 {
      margin:0;
      float: left;
      margin-top: 4px;

    }
    .el-dialog {
      width: 900px;
    }
    .input-before-lable1 {
      color: #606266;
      margin-left: 10px;
    }
    .input-before-lable {
      color: #606266;
      margin-left: 30px;
    }
    .el-form-item__content {
      line-height: 33px;
    }
    .from_box{
      overflow: hidden;
      .from_box_item{
        float:left;width:50%;
        .el-date-editor.el-input,.el-select{
          width:100%
        }
        .el-form-item__label{
          line-height: 33px;
        }
        label{
          font-size:13px
        }
        .el-input__inner{
          width:80%
        }
        .el-select{
          width:80%;
          input{
            width:100%
          }
        }
        &.noWidth{
        width: auto;
      }
      }

    }
    .register_dialog {
      .el-dialog {
        width: 500px;
        .from_box {
          .from_box_item {
            width: 100%;
          }
        }
        .el-dialog__footer {
          padding: 0 20px 40px;
          text-align: center;
          button {
            width: 68%;
            margin-left: 20px;
          }
        }
      }
    }
    .el-tabs--border-card{
      height:100%;
      .el-tabs__content{
        height:90%;
        .el-tab-pane{
          height:100%;
          .el-table{
            height:calc(100% - 50px) !important
          }
        }
      }
    }
  }
  .elCard_left{
    width:50%;float:left;
    div{
      margin-bottom:5px;font-size:16px;
    }
    i{
      cursor: pointer;
    }
  }
</style>
