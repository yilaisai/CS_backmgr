<template>
  <div class='node-manage'>
    <el-row>
      <el-col :span="18">
        <p style="margin:0 0 0 30px;font-weight:bold;">本期PNB总投票数：{{pNBAmount}}</p>
      </el-col>
      <el-col :span="4" style="text-align:center;margin-bottom: 30px;">
        <el-button size="small" type="primary" @click="createNode">节点申请</el-button>
      </el-col>
    </el-row>
    <el-form :inline="true"
             label-width="100px"
             ref="filterForm"
             :model="filterForm">
      <sac-input
        ref="phone"
        label="Sacbox账号"
        v-model.trim="filterForm.sacBoxAccount"
        prop="phone"></sac-input>
      <sac-input
        ref="nickName"
        label="节点名"
        v-model.trim="filterForm.teamName"
        prop="nickName"></sac-input>
      <sac-select label="状态" v-model="filterForm.status" :data-list="stateList"></sac-select>

      <sac-submit-form
        :isReset='false'
        @submitForm="submitForm(1)"></sac-submit-form>
    </el-form>
    <sac-table :data="listData.list">
      <el-table-column prop="teamName" label="节点名" width="100"></el-table-column>
      <el-table-column prop="sacBoxAccount" label="Sacbox账号" width="130"></el-table-column>
      <el-table-column prop="sacBoxAddr" label="SAC收款地址"></el-table-column>
      <el-table-column prop="sacAmount" label="SAC持仓数"></el-table-column>
      <el-table-column prop="pnbAmount" label="PNB投票数"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="nodeIntroduce" label="节点简介"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope" prop="status">
          {{scope.row.status=='2'?'审核中': scope.row.status=='1'?'审核成功':'审核失败'}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="350">
        <template slot-scope="scope">
          <el-button size="small" v-if="scope.row.lockStatus== 1" type="danger"
                     @click="optStatusChange(0,'解锁节点',scope.row)">解锁节点
          </el-button>
          <el-button size="small" v-if="scope.row.lockStatus== 0" type="warning"
                     @click="optStatusChange(1,'锁定节点',scope.row)">锁定节点
          </el-button>
          <el-button type="primary" size="small" @click.native="goDetail(scope.row)">查看详情</el-button>
          <el-button type="primary" size="small" @click.native="goModifyDetail(scope.row)">修改</el-button>
          <el-button type="primary" size="small" @click.native="sendEmail()">发邮件</el-button>
        </template>
      </el-table-column>
    </sac-table>
    <sac-pagination v-show="listData.list.length>0"
                    @handleChange="getPaginationChange"
                    :total="+listData.total"
                    :page-size="filterForm.pageSize"
                    :current-page="filterForm.curPage">
    </sac-pagination>
    <el-dialog
      :close-on-click-modal="false"
      :title="dialogVisibleTitle"
      :visible.sync="dialogVisible"
      width="60%">
      <el-form ref="details" :model="details" :inline="true" label-width="150px">
        <el-form-item label="logo:">
          <img v-viewer v-if="details.logoUrl" :src="details.logoUrl" alt="" class="avatar">
        </el-form-item>
        <el-form-item label="状态:">
          <span>{{details.status=='2'?'审核中': details.status=='1'?'审核成功':'审核失败'}}</span>
        </el-form-item>
        <el-form-item label="节点名称:">
          <span>{{details.teamName}}</span>
        </el-form-item>
        <el-form-item label="节点简介:">
          <span>{{details.nodeIntroduce}}</span>
        </el-form-item>
        <el-form-item label="Sacbox账号:">
          <span>{{details.sacBoxAccount}}</span>
        </el-form-item>
        <el-form-item label="SAC收款地址:">
          <span>{{details.sacBoxAddr}}</span>
        </el-form-item>
        <el-form-item label="SAC持仓数:">
          <span>{{details.sacAmount}}</span>
        </el-form-item>
        <el-form-item label="PNB投票数:">
          <span>{{details.pnbAmount}}</span>
        </el-form-item>
        <el-form-item label="邮箱:">
          <span>{{details.email}}</span>
        </el-form-item>
        <el-form-item label="官网地址:">
          <span>{{details.officialAddr}}</span>
        </el-form-item>
        <el-form-item label="团队介绍:">
          <span>{{details.teamIntroduce}}</span>
          <a v-show="isTeamDoc" target="_blank" :href="details.teamIntroduceUrl" class="el-upload-list__item-name">
            <i class="el-icon-document"></i>{{teamIntroduceUrl}}
          </a>
          <img v-show="isTeamImg" v-viewer :src="details.teamIntroduceUrl" class="introduce">
        </el-form-item>
        <el-form-item label="运营及宣传方案:">
          <span>{{details.marketingIntroduce}}</span>
          <a v-show="isMarketDoc" target="_blank" :href="details.marketingIntroduceUrl"
             class="el-upload-list__item-name">
            <i class="el-icon-document"></i>{{marketingIntroduceUrl}}
          </a>
          <img v-show="isMarketImg" v-viewer :src="details.marketingIntroduceUrl" class="introduce">
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="isApproved(0,details.teamId)" size="small">不通过审核</el-button>
      <el-button type="primary" @click="isApproved(1,details.teamId)" size="small">通过审核并分配账号</el-button>
      </span>
      <el-dialog
        width="40%"
        :title="innerVisibleTitle"
        append-to-body
        :visible.sync="innerVisible">
        <el-input size="small" type="textarea" :rows="3" v-model="info" width="100%"
                  placeholder="请输入原因"></el-input>
        <span slot="footer" class="dialog-footer">
      <el-button @click="innerVisible = false" size="small">取消</el-button>
      <el-button type="primary" @click="approved(innerVisibleTitle=='不通过审核原因'?0:1)" size="small">确定</el-button>
      </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
  import Md5 from '../../../static/js/md5';

  export default {
    name: 'node-manage',
    data() {
      return {
        stateList: [{
          value: '',
          label: '全部',
        }, {
          value: '2',
          label: '审核中',
        }, {
          value: '0',
          label: '审核失败',
        },
          {
            value: '1',
            label: '审核成功',
          }],
        filterForm: {
          sacBoxAccount: '',
          teamName: '',
          status: '',
          curPage: 1,
          pageSize: 20
        },
        listData: {
          total: null,
          list: [],
        },
        pNBAmount: '',
        dialogVisibleTitle: '',
        dialogVisible: false,
        details: {},
        isTeamImg: false,
        isTeamDoc: false,
        isMarketImg: false,
        isMarketDoc: false,
        teamIntroduceUrl: '',
        marketingIntroduceUrl: '',
        innerVisible: false,
        innerVisibleTitle: '',
        info: '',
        fromName: '',
      };
    },
    methods: {
      submitForm(num) {
        this.filterForm.curPage = num;
        this.getList();
      },
      getList() {
        this.$http.post('supernode/backmgr/team/detail/list', this.filterForm)
          .then((res) => {
            const { list, total } = res.result.list;
            this.listData.list = list;
            this.listData.total = total;
            this.pNBAmount = res.result.pNBAmount;
            this.fromName = `【${res.result.fromName}】 ${res.result.from}`
          });
      },
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        this.filterForm.curPage = currentPage;
        this.submitForm(currentPage);
      },
      createNode() {
        this.$router.push({
          name: 'nodeModify'
        });
      },
      goModifyDetail(params) {
        this.$router.push({
          name: 'nodeModify',
          params,
        });
      },
      goDetail(res) {
        this.dialogVisibleTitle = `查看${res.teamName}节点详情`;
        this.dialogVisible = true;
        this.details = res;
        this.teamIntroduceUrl = res.teamIntroduceUrl ? res.teamIntroduceUrl.split('supersac_doc/')[1] : '';
        this.marketingIntroduceUrl = res.marketingIntroduceUrl ? res.marketingIntroduceUrl.split('supersac_doc/')[1] : '';
        if (this.teamIntroduceUrl) {
          if (this.teamIntroduceUrl.indexOf('.jpg') > -1 || this.teamIntroduceUrl.indexOf('.jpeg') > -1 || this.teamIntroduceUrl.indexOf('.png') > -1) {
            this.isTeamImg = true;
            this.isTeamDoc = false;
          } else {
            this.isTeamImg = false;
            this.isTeamDoc = true;
          }
        } else {
          this.isTeamImg = false;
          this.isTeamDoc = false;
        }

        if (this.marketingIntroduceUrl) {
          if (this.marketingIntroduceUrl.indexOf('.jpg') > -1 || this.marketingIntroduceUrl.indexOf('.jpeg') > -1 || this.marketingIntroduceUrl.indexOf('.png') > -1) {
            this.isMarketImg = true;
            this.isMarketDoc = false;
          } else {
            this.isMarketImg = false;
            this.isMarketDoc = true;
          }
        } else {
          this.isMarketImg = false;
          this.isMarketDoc = false;
        }
      },
      /**
       * 冻结/解冻 锁定/解锁 用户   optStatus  用户状态：2表示冻结，1表示锁定，0表示解冻
       * */
      optStatusChange(type, title, data) {
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '确定执行 '),
            h('span', { style: 'color: red' }, `${title} `),
            h('span', { style: 'color: #0a52e0' }, `${data.teamName}`),
            h('span', null, ' 吗?'),
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              this.$http.post('supernode/backmgr/team/detail/lock', {
                teamId: data.teamId,
                status: type,
              }).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `${title} ${data.teamName} 成功`,
                  type: 'success'
                });
                this.getList();
                done();
              })
            } else {
              done();
            }
          }
        })
      },
      isApproved(status, teamId) {
        this.innerVisible = true;
        this.innerVisibleTitle = status ? `通过审核原因` : `不通过审核原因`;
      },
      approved(status) {
        this.$http.post('supernode/backmgr/team/detail/audit', {
          status,
          teamId: this.details.teamId,
          info: this.info
        })
          .then((res) => {
            this.$notify({
              title: '成功',
              message: `${status ? `通过审核并分配账号给节点${this.details.teamName}` : `节点${this.details.teamName}不通过审核`}  处理成功`,
              type: 'success'
            });
            this.innerVisible = false;
            this.dialogVisible = false;
            this.getList();
          });
      },
      sendEmail() {
        this.$router.push({
          name: 'sendEmail',
          params: {
            fromName: this.fromName
          },
        });
      }
    },
    activated() {
      this.getList();
    }
  };
</script>
<style lang="less">
  .node-manage {
    .avatar {
      width: 80px;
      height: 80px;
      display: block;
    }
    .tips_textarea {
      bottom: -10px;
      right: 10px;
    }
    .introduce {
      height: 80px;
      display: block;
    }
  }
</style>
