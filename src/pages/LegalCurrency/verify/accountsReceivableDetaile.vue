<template>
  <div class='query-details'>
    <!-- <el-row class="sac-row">
      <el-col :span="4">
        <el-button size="small" type="primary" plain @click="$router.go(-1)">返回</el-button>
      </el-col>
    </el-row> -->
		<label>当前待审核：</label>
    <sac-table :data="OtcAuditPayRecdList">
			<el-table-column label="账号" >
				<span>{{phone}}</span>
			</el-table-column>
			<el-table-column label="昵称" >
				<span>{{nickName}}</span>
			</el-table-column>
			<el-table-column label="用户类型" >
				<span >{{userLevel ==1?'广告商':'普通用户'}}</span>
			</el-table-column>
      <el-table-column prop="coinName" label="支付方式" >
				<span slot-scope="scope" >{{scope.row.payType==1?'银行卡':scope.row.payType==2?'支付宝':'微信支付'}}</span>
			</el-table-column>
			<el-table-column prop="userName" label="姓名" >
			</el-table-column>
			<el-table-column  label="账户/银行卡信息" >
				<template slot-scope="scope">
						<p v-if="scope.row.payType==1">{{scope.row.bankBranch}}</p>
						<p>{{ scope.row.num }}</p>
				</template>
			</el-table-column>
			<el-table-column  label="收款码" width="150">
				<template slot-scope="scope">
						<p v-if="scope.row.payType==1">无</p>
						<div v-else class="qrcode">
							<img :src="scope.row.qrcode" alt="">
							<el-button @click="imgClick(scope.row.qrcode)" type="text" size="mini">查看大图</el-button>
						</div>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="150">
				<template slot-scope="scope">
					<el-button @click="updateAuditPayStatus(scope.row,1)" type="text" size="mini">通过</el-button>
					<el-button  @click="refuse(scope.row)" type="text" size="mini">拒绝</el-button>
				</template>
			</el-table-column>
      
    </sac-table>
    <label>当前已绑定：</label>
    <sac-table :data="otcBindInfoList">
			<el-table-column label="账号" >
				<span>{{phone}}</span>
			</el-table-column>
			<el-table-column label="昵称" >
				<span>{{nickName}}</span>
			</el-table-column>
			<el-table-column label="用户类型" >
				<span >{{userLevel ==1?'广告商':'普通用户'}}</span>
			</el-table-column>
      <el-table-column prop="coinName" label="支付方式" >
				<span slot-scope="scope" >{{scope.row.payType==1?'银行卡':scope.row.payType==2?'支付宝':'微信支付'}}</span>
			</el-table-column>
			<el-table-column prop="userName" label="姓名" ></el-table-column>
			<el-table-column  label="账户/银行卡信息" >
				<template slot-scope="scope">
						<p v-if="scope.row.payType==1">{{scope.row.bankBranch}}</p>
						<p>{{ scope.row.num }}</p>
				</template>
			</el-table-column>
			<el-table-column  label="收款码" width="150">
				<template slot-scope="scope">
						<p v-if="scope.row.payType==1">无</p>
						<div v-else class="qrcode">
							<img :src="scope.row.qrcode" alt="">
							<el-button @click="imgClick(scope.row.qrcode)" type="text" size="mini">查看大图</el-button>
						</div>
				</template>
			</el-table-column>
			<el-table-column prop="isShow" label="状态" >
				<span slot-scope="scope" >{{scope.row.isShow==1?'使用中':'已审核'}}</span>
			</el-table-column>
			<el-table-column prop="auditName" label="审核人" ></el-table-column>
			<el-table-column fixed="right" label="操作" width="150">
				<template slot-scope="scope">
					<el-button v-if="scope.row.isShow==1" @click="updatePayStatus(scope.row,2)" type="text" size="mini">停止使用</el-button>
					<el-button v-else @click="updatePayStatus(scope.row,1)" type="text" size="mini">开始使用</el-button>
				</template>
			</el-table-column>
    </sac-table>
		<el-dialog
			title="操作理由"
			:visible.sync="showRemark"
			width="400">
			<el-form ref="form"   >
				<el-form-item label="拒绝理由">
					<el-input type="textarea" v-model.trim="remark"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showRemark = false">取 消</el-button>
				<el-button type="success" @click="updateAuditPayStatus(obj,2)">确认</el-button>
			</span>
		</el-dialog>
		<el-dialog title="收款码" :visible.sync="imgShow" width="500px">
				<div style="padding-left:20px"><img style="width:100%;vertical-align: text-top;" :src="imgurl" alt="">
				</div>
		</el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'accountsReceivableDetaile',
    data() {
      return {
				imgurl:'',
				imgShow:false,
        detais: {},
				tableData: [],
				otcBindInfoList:[],
				OtcAuditPayRecdList:[],
				showRemark: false,
				remark:'',
				userLevel:"",
				phone:'',
				nickName:'',
				obj:{}
      };
    },
    methods: {
			imgClick(imgurl){
				this.imgurl = imgurl
				this.imgShow = true
			},
			refuse(data){
				this.obj = data
				this.showRemark=true
			},
      getDetail() {
        this.$http.post('/wallet/app/otc/backmgr/getCustomPayDetailInfo', {
					userId:this.$route.query.userId
        }).then((res) => {
					const { otcBindInfoList, OtcAuditPayRecdList } = res.result;
					this.OtcAuditPayRecdList = OtcAuditPayRecdList;
					this.otcBindInfoList = otcBindInfoList;
				});
			},
			updatePayStatus(data,state){
				this.$http.post("/wallet/app/otc/backmgr/updatePayStatus", {
					userId:data.userId,
					payId:data.recdId,
					status:state
				}).then((res) => {
					this.$message('操作成功');
					this.getDetail()
				})
			},
			updateAuditPayStatus(data,state){
				console.log(data)
				this.$http.post("/wallet/app/otc/backmgr/updateAuditPayStatus", {
					userId:data.userId,
					recdId:data.recdId,
					payId:data.payId,
					remark:this.remark,
					status:state
				}).then((res) => {
					this.$message('操作成功');
					this.showRemark=false
					this.getDetail()
				})
			}
			
    },
    activated() {
			this.nickName = this.$route.query.nickName
			this.phone = this.$route.query.phone
			this.userLevel = this.$route.query.userLevel
      this.getDetail();
    }
  };
</script>
<style lang="less">
  .query-details {
    .sac-row {
      margin-bottom: 20px;
      .el-col {
        margin-top: 20px;
      }
    }
	}
	.qrcode{
		width: 100%;
		text-align: center;
		img{
			width: 50px;
		}
	}
</style>
