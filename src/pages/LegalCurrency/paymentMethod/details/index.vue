<template>
  <div class='query-details'>
    <!-- <el-row class="sac-row">
      <el-col :span="4">
        <el-button size="small" type="primary" plain @click="$router.go(-1)">返回</el-button>
      </el-col>
    </el-row> -->
		<label>当前待审核：</label>
    <sac-table :data="OtcAuditPayRecdList">
			<el-table-column label="账号" width="100" align="center">
				<span>{{phone}}</span>
			</el-table-column>
			<el-table-column label="用户编号" width="150" align="center">
				<span>{{nickName}}</span>
			</el-table-column>
			<el-table-column label="企业类型" width="100" align="center">
				<span >{{userEnterprise ==0?'非企业账号':'企业账号'}}</span>
			</el-table-column>
      <el-table-column prop="coinName" label="支付方式" width="90" align="center">
				<span slot-scope="scope" >{{scope.row.payType==1?'银行卡':scope.row.payType==2?'支付宝':scope.row.payType==3?'微信支付':scope.row.payType==4?'宝转卡':'支付宝'}}</span>
			</el-table-column>
			<el-table-column prop="realName" label="实名姓名" align="center">
				<span>{{realName}}</span>
			</el-table-column>
			<el-table-column prop="userName" label="姓名" align="center"></el-table-column>
			<el-table-column  label="账户" align="center">
				<template slot-scope="scope">
						<p v-if="scope.row.payType==1||scope.row.payType==4">{{scope.row.bankName}}</p>
						<p>{{ scope.row.num }}</p>
				</template>
			</el-table-column>
			<el-table-column  label="银行卡信息" align="center" width="150">
				<template slot-scope="scope">
						<p v-if="scope.row.payType==1||scope.row.payType==4">{{scope.row.bankName}}{{scope.row.bankBranch}}</p>
				</template>
			</el-table-column>
			<el-table-column  label="userId" align="center" width="60">
				<template slot-scope="scope">
						<p>{{scope.row.userId}}</p>
				</template>
			</el-table-column>
			<el-table-column  label="cardindex" align="center">
				<div slot-scope="scope" class="cardindex">
						<p v-if="scope.row.cardindex">{{scope.row.cardindex}} <span class="btn" v-if="scope.row.payType==4" @click="open(scope.row.payId)"> 修改</span></p>
						<p v-else>
							<span class="btn" v-if="scope.row.payType==4" @click="open(scope.row.payId)">添加</span>
							<span v-else>无</span>
						</p>
				</div>
			</el-table-column>
			<el-table-column  label="收款码" width="150"  align="center">
				<template slot-scope="scope">
						<!-- <p v-if="scope.row.payType==1||scope.row.payType==4">无</p> -->
						<p v-if="!scope.row.qrcode">无</p>
						<div v-else class="qrcode">
							<img :src="scope.row.qrcode" alt="">
							<el-button @click="imgClick(scope.row.qrcode)" type="text" size="mini">查看大图</el-button>
						</div>
				</template>
			</el-table-column>
			<el-table-column prop="analysisQrCode" label="QrCode" align="center"  width="100"> 
				<template slot-scope="scope">
						<p v-if="scope.row.payType==1||scope.row.payType==4">无</p>
						<div v-else class="payCode">
							<div>
								<p  @click="verify(scope.row)"  style="color:#409EFF;cursor: pointer;user-select:none;" v-if="scope.row.analysisQrCode">
									<img style="width:20px;position: relative; top: 5px; margin-right: 3px;" src="../../../../assets/QR_code.png" alt=""> 验证二维码
								</p>
								<el-button v-else @click="getAnalysisQrCode(scope.row)" type="text" size="mini">识别二维码</el-button>
							</div>
							<div v-if="scope.row.alipayUserId">	
								<p  @click="verifyTransfer(scope.row)"  style="color:#409EFF;cursor: pointer;user-select:none;">
									<img style="width:20px;position: relative; top: 5px; margin-right: 3px;" src="../../../../assets/QR_code.png" alt=""> 验证转账码
								</p>
							</div>
						</div>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100" align="center">
				<template slot-scope="scope">
					<el-button @click="updateAuditPayStatus(scope.row,1)" type="text" size="mini">通过</el-button>
					<el-button  @click="refuse(scope.row)" type="text" size="mini">拒绝</el-button>
				</template>
			</el-table-column>
      
    </sac-table>
    <label>当前已绑定：</label>
    <sac-table :data="otcBindInfoList">
			<el-table-column label="账号" width="100" align="center" >
				<span>{{phone}}</span>
			</el-table-column>
			<el-table-column label="用户编号" width="150" align="center">
				<span>{{nickName}}</span>
			</el-table-column>
			<el-table-column label="企业类型" width="100" align="center">
				<span >{{userEnterprise ==0?'非企业账号':'企业账号'}}</span>
			</el-table-column>
      <el-table-column prop="coinName" label="支付方式" width="90" align="center">
				<span slot-scope="scope" >{{scope.row.payType==1?'银行卡':scope.row.payType==2?'支付宝':scope.row.payType==3?'微信支付':scope.row.payType==4?'宝转卡':'支付宝'}}</span>
			</el-table-column>
			<el-table-column prop="userName" label="姓名" align="center"></el-table-column>
			<el-table-column  label="账户" align="center">
				<template slot-scope="scope">
						<p>{{ scope.row.num }}</p>
				</template>
			</el-table-column>
			<el-table-column  label="银行卡信息" align="center" width="150">
				<template slot-scope="scope">
						<p v-if="scope.row.payType==1||scope.row.payType==4">{{scope.row.bankName}}{{scope.row.bankBranch}}</p>
				</template>
			</el-table-column>
			<el-table-column  label="userId" align="center" width="60">
				<template slot-scope="scope">
						<p>{{scope.row.userId}}</p>
				</template>
			</el-table-column>
			<el-table-column  label="cardindex" align="center">
				<div slot-scope="scope" class="cardindex">
						<p v-if="scope.row.cardindex">{{scope.row.cardindex}} <span class="btn" v-if="scope.row.payType==4" @click="open(scope.row.recdId)"> 修改</span></p>
						<p v-else>
							<span class="btn" v-if="scope.row.payType==4" @click="open(scope.row.recdId)">添加</span>
							<span v-else>无</span>
						</p>
				</div>
			</el-table-column>
			
			<el-table-column  label="收款码" width="150" align="center">
				<template slot-scope="scope">
						<!-- <p v-if="scope.row.payType==1||scope.row.payType==4">无</p> -->
						<p v-if="!scope.row.qrcode">无</p>
						<div class="qrcode" v-else>
							<img :src="scope.row.qrcode" alt="">
							<el-button @click="imgClick(scope.row.qrcode)" type="text" size="mini">查看大图</el-button>
						</div>
				</template>
			</el-table-column>
			<el-table-column prop="analysisQrCode" label="QrCode" align="center" width="100">
				<template slot-scope="scope">
						<p v-if="scope.row.payType==1||scope.row.payType==4">无</p>
						<div v-else>
							<p  @click="verify(scope.row)"  style="color:#409EFF;cursor: pointer;user-select:none;" v-if="scope.row.analysisQrCode"><img style="width:20px;position: relative; top: 5px; margin-right: 3px;" src="../../../../assets/QR_code.png" alt="">验证二维码</p>
							<p v-else>识别错误</p>
						</div>
						<div v-if="scope.row.alipayUserId">	
							<p  @click="verifyTransfer(scope.row)"  style="color:#409EFF;cursor: pointer;user-select:none;">
								<img style="width:20px;position: relative; top: 5px; margin-right: 3px;" src="../../../../assets/QR_code.png" alt=""> 验证转账码
							</p>
						</div>
				</template>
			</el-table-column>
			<el-table-column prop="isShow" label="状态" width="80" align="center">
				<span slot-scope="scope" >{{scope.row.isReview==1?'已审核':scope.row.isReview==2?'审核失败':'未审核'}}</span>
			</el-table-column>
			<el-table-column prop="isShow" label="是否启用" width="80" align="center">
				<span slot-scope="scope" >{{scope.row.isShow==1?'启用中':'未启用'}}</span>
			</el-table-column>
			<el-table-column prop="auditName" label="审核人" width="100" align="center"></el-table-column>
			<el-table-column fixed="right" label="操作" width="120" align="center">
				<template slot-scope="scope">
					<el-button v-if="scope.row.isReview==1" @click="updatePayStatus(scope.row,2)" type="text" size="mini">审核失败</el-button>
					<!-- <el-button v-else @click="updatePayStatus(scope.row,1)" type="text" size="mini">开始使用</el-button> -->
					<el-button v-if="scope.row.isShow==0" @click="deleteItem(scope.row)" type="text" size="mini">删除</el-button>
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
		<el-dialog title="验证收款码" :visible.sync="qrcodeShow" width="500px">
				<div style="padding-left:20px;width:100%;">
					<vue-qr :text="analysisQrCode" :margin="0" colorDark="#000" colorLight="#fff"  :size="420"></vue-qr>
				</div>
		</el-dialog>
		<el-dialog title="收款码2" :visible.sync="imgShow" width="500px">
				<div style="padding-left:20px"><img style="width:100%;vertical-align: text-top;" :src="imgurl" alt="">
				</div>
		</el-dialog>
		<div class="imgBox">
			<el-image 
				style="width: 0; height: 0;"
				:src="imgList[0]"
				id="peveImg"
				:preview-src-list="imgList">
			</el-image>
		</div>
  </div>
</template>
<script>
	import QRCode from 'qrcode'
	// import QRCode from 'qrcodejs2'
	import vueQr from 'vue-qr'
  export default {
		name: 'paymentMethodDetaile',
		components:{vueQr},
    data() {
      return {
				imgurl:'',
				qrcodeShow:false,
				imgShow:false,
				transferCodeShow:false,
        detais: {},
				tableData: [],
				otcBindInfoList:[],
				OtcAuditPayRecdList:[],
				showRemark: false,
				remark:'',
				userEnterprise:"",
				phone:'',
				nickName:'',
				obj:{},
				cardindex:'',
				payId:'',
				analysisQrCode:'',
				transferCode:'',
				realName:'',
				imgList:[],
      };
    },
    methods: {
			verify(data){
				if(data.payType==2){
					this.analysisQrCode = 'http://devadmin.hongmo.io/test.html?analysisQrCode='+data.analysisQrCode
				}else{
					this.analysisQrCode = data.analysisQrCode

				}		
				QRCode.toDataURL(this.analysisQrCode, { errorCorrectionLevel: 'H' }, (err, url) => {
						this.transferCode = url
						this.imgList = [url]
						setTimeout(()=>{
							document.getElementById('peveImg').click()
						},200)
				})
				// this.qrcodeShow = true
			},
			imgClick(imgurl){
				// this.imgurl = imgurl
				// this.imgShow = true
				this.transferCode = imgurl
				this.imgList = [imgurl]
				setTimeout(()=>{
					document.getElementById('peveImg').click()
				},200)
			},
			refuse(data){
				this.obj = data
				this.showRemark=true
			},
			open(payId) {
				
        this.$prompt('请输cardindex', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.updateCardindex(value,payId)
        })
      },
			updateCardindex(cardindex,payId){
				console.log(payId)
				this.$http.post('/wallet/app/otc/backmgr/updateCardindex', {
					cardindex:cardindex,
					payId:payId,
        }).then((res) => {
					this.$message('操作成功');
					this.getDetail()
				});
			},
      getDetail() {
        this.$http.post('/wallet/app/otc/backmgr/getCustomPayDetailInfo', {
					userId:this.$route.query.userId
        }).then((res) => {
					const { otcBindInfoList, OtcAuditPayRecdList,realName } = res.result;
					this.OtcAuditPayRecdList = OtcAuditPayRecdList;
					this.otcBindInfoList = otcBindInfoList;
					this.realName = realName
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
			},
			getAnalysisQrCode(data){
					this.$http.post("/wallet/app/otc/backmgr/getAnalysisQrCode", {
						recdId:data.recdId,
					}).then((res) => {
						this.$message('操作成功');
						this.showRemark=false
						this.getDetail()
					})
			},
			verifyTransfer(data) {
				let url = `alipays://platformapi/startapp?appId=09999988&actionType=toAccount&goBack=NO&amount=&userId=${data.alipayUserId}&memo=`
        QRCode.toDataURL(url, { errorCorrectionLevel: 'H' }, (err, url) => {
						this.transferCode = url
						this.imgList = [url]
						setTimeout(()=>{
							document.getElementById('peveImg').click()
						},200)
				})
			},
			deleteItem(data) {
				this.$confirm('是否删除该收款方式，该操作不可逆，请谨慎操作','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( res => {
					this.$prompt('请输入谷歌验证码', '安全验证', {
						confirmButtonText: '确定',
						cancelButtonText: '取消'
					}).then(({ value }) => {
						this.$http.post("/wallet/app/otc/backmgr/deletePayInfo", {
							recdId:data.recdId,
							secret:value
						}).then((res) => {
							this.$message.success('操作成功');
							this.getDetail()
						})
					}).catch(err => {
						this.$message('已取消')
					})
				}).catch(err => {
					this.$message('已取消')
				})
			}
		},
    activated() {
			this.nickName = this.$route.query.nickName
			this.phone = this.$route.query.phone
			this.userEnterprise = this.$route.query.userEnterprise
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
		display: flex;
		flex-direction: column;
		// justify-content: space-between;
		align-items: center;
		img{
			width: 50px;
		}
	}
	.cell>p{
		margin: 0
	}
	.cardindex{
		.btn{
			color: #409EFF;
			cursor: pointer;
		}
	}
	.imgBox {
		position: absolute;
		top:0;
		left:0;
		width:0;
		height:0;
	}
</style>
