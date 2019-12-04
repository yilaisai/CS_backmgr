<template>
    <div class='exchangeSAC'>
			<el-form :inline="true" label-width="60px" ref="filterForm" :model="filterForm" size="mini">
				<sac-input ref="phone" label="账号" v-model.trim="filterForm.phoneOrEmail"></sac-input>
				<el-form-item label="状态">
					<el-select class="select" v-model="filterForm.status" >
							<el-option v-for="(item, key) in stateList" :key="key" :value="item.value" :label="item.name"></el-option>
					</el-select>
				</el-form-item>
				<sac-submit-form :isReset='false' @submitForm="getUserRaking()"></sac-submit-form>
			</el-form>
			<el-table stripe border height="100%" :default-sort = "{prop: 'usdtAmount', order: 'descending'}" :data="listData.list" @sort-change='sortChange' size="mini">
				<el-table-column align="center" prop="phone" label="账号" width="100"></el-table-column>
				<el-table-column align="center" prop="nickName" label="昵称" width="140"></el-table-column>
				<el-table-column align="center"  label="企业类型" width="90">
					<template slot-scope="scope">
						{{scope.row.userEnterprise ==0?'非企业账号':'企业账号' }}
					</template>
				</el-table-column>
				<el-table-column align="center"  label="支付宝">
					<template slot-scope="scope">
						<div class="listData" v-if="scope.row.alipayList&&scope.row.alipayList.length>0" style="color:#409EFF">
							<!-- <p v-for="(item,index) in scope.row.alipayList" :key = index> <span>账号{{ index+1 }}:</span> {{ item.num }}</p> -->
							<p v-if="scope.row.alipayList.length>1" class="btn" @click=" showPayNum(scope.row.alipayList) "> 查看更多</p>
							<p v-else>{{ scope.row.alipayList[0].num }}</p>
						</div>
						<span v-else> 当前未使用 </span>
					</template>
				</el-table-column>
				<el-table-column align="center"  label="微信支付">
					<template slot-scope="scope">
						<div class="listData" v-if="scope.row.wechatList&&scope.row.wechatList.length>0" style="color:#409EFF">
							<p v-if="scope.row.wechatList.length>1" class="btn" @click=" showPayNum(scope.row.wechatList) "> 查看更多</p>
							<p v-else>{{ scope.row.wechatList[0].num }}</p>
						</div>
						<span v-else> 当前未使用 </span>
					</template>
				</el-table-column>
				<el-table-column align="center"   label="银行卡">
					<template slot-scope="scope">
						<div class="listData" v-if="scope.row.bankExList&&scope.row.bankExList.length>0" style="color:#409EFF">
							<!-- <p v-for="(item,index) in scope.row.bankExList" :key = index> <span>账号{{ index+1 }}:</span> {{ item.num }}</p> -->
							<p v-if="scope.row.bankExList.length>1" class="btn" @click=" showPayNum(scope.row.bankExList) "> 查看更多</p>
							<p v-else>{{ scope.row.bankExList[0].num }}</p>
						</div>
						<span v-else> 当前未使用 </span>
					</template>
				</el-table-column>
				<el-table-column align="center"   label="宝转卡">
					<template slot-scope="scope">
						<div class="listData" v-if="scope.row.alipayToBankList&&scope.row.alipayToBankList.length>0" style="color:#409EFF">
							<p v-if="scope.row.alipayToBankList.length>1" class="btn" @click=" showPayNum(scope.row.alipayToBankList) "> 查看更多</p>
							<p v-else>{{ scope.row.alipayToBankList[0].num }}</p>
						</div>
						<span v-else> 当前未使用 </span>
					</template>
				</el-table-column>
				<el-table-column align="center"  label="状态" width="90">
					<template slot-scope="scope">
						{{ scope.row.payAuditStatus ==1?'已审核':'待审核' }}
					</template>
				</el-table-column>
				<el-table-column align="center" fixed="right" label="操作" width="100">
					<template slot-scope="scope">
						<el-button @click="goDetaile(scope)" type="text" size="mini">{{ scope.row.payAuditStatus ==1?'查看详情':'查看审核' }}</el-button>
						<!-- <el-button @click="showQRcode(scope)" type="text" size="mini">收款测试</el-button>
						<el-button @click="showStopWindow(scope)" type="text" size="mini">停止使用</el-button> -->
					</template>
				</el-table-column>
			</el-table>
			<sac-pagination v-show="listData.list.length>0"
				@handleChange="getPaginationChange"
				:total="+listData.total"
				:page-size="filterForm.pageSize"
				:current-page="filterForm.pageNum">
			</sac-pagination>
			<el-dialog
				title="停止使用"
				:visible.sync="stopWindon"
				width="30%">
				<p>点击后，用户该收款方式将下架，确认操作？</p>
				<el-form ref="form"   >
					<!-- <el-form-item label="审核备注">
						<el-input type="textarea" v-model.trim="stopType"></el-input>
					</el-form-item> -->
					<el-form-item label="停止类型" >
						<el-select class="select" v-model="stopType">
								<el-option v-for="(item, key) in payList" :key="key" :value="item.value" :label="item.name"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="stopWindon = false">取 消</el-button>
					<el-button type="success" @click="stop">停 止</el-button>
				</span>
			</el-dialog>
			<el-dialog
				title="当前使用"
				:visible.sync="QRcodeWindow"
				width="400">
				<div v-if=" obj.alipayQrcode||obj.wechatQrcode " class="qr-box">
					<div v-show="obj.alipayQrcode">
						<img :src="obj.alipayQrcode" alt="">
						<p>支付宝收款码</p>
					</div>
					<div v-show="obj.wechatQrcode">
						<img :src="obj.wechatQrcode" alt="">
						<p>微信收款码</p>
					</div>
				</div>
				<p style="text-align: center" v-else>暂未使用二维码收款码</p>
			</el-dialog>
				<el-dialog
				title="账号列表"
				:visible.sync="showNumList"
				class="numList"
				width="400">
				<div >
					<p v-for="( item,index ) in numList" :key="index"> 账号{{ index+1 }}: <span>{{ item.num }}</span> </p>
				</div>
			</el-dialog>
    </div>
</template>
<script>
    export default {
        name: "exchangeSAC",
        data() {
            return {
							showNumList:false,
							numList:[],
              filterForm: {
                phoneOrEmail: '',
                pageNum: 1,
                pageSize: 20,
                status:'',//'BTC'
                order:'desc'//和asc
              },
              listData: {
                total: null,
                list: [],
							},
							stateList:[
								{name:'全部',value:''},
								{name:'待审核',value:'0'},
								{name:'已审核',value:'1'}
							],
							payList:[],
							stopType:'0',
							stopWindon:false,
							QRcodeWindow:false,
							dialogVisible:true,
							obj:{},
            };
        },
      methods: {
				showPayNum(list){
					this.numList = list
					this.showNumList = true
				},
				showStopWindow(scope){
					this.obj = scope.row
					this.stopType = 0
					this.payList = []
					if(this.obj.wechat){
						this.payList.unshift({
							name:'微信支付',value:this.obj.wechatId
						})
					}
					if(this.obj.alipay){
						this.payList.unshift({
							name:'支付宝',value:this.obj.alipayId
						})
					}
					if(this.obj.bank){
						this.payList.unshift({
							name:'银行卡',value:this.obj.bankId
						})
					}
					console.log(this.obj.bankId)
					if(this.payList.length>1){
						this.payList.unshift({
							name:'全部',value:'0'
						})
					}
					if(this.payList.length>0){
						this.stopType = this.payList[0].value
						this.stopWindon = true
					}else{
						this.$alert('当前未使用支付方式', {
							dangerouslyUseHTMLString: true
						});	
					}
				},
				stop(){
					this.$http.post("/wallet/app/otc/backmgr/updatePayStatus", {
						userId:this.obj.userId,
						payId:this.stopType,
						status:2
					}).then((res) => {
						this.$message('操作成功');
						this.stopWindon = false
						this.getUserRaking()
          })
				},
				goDetaile(scope){
					this.$router.push({
						name:'accountsReceivableDetaile',
						query:{
							userId:scope.row.userId,
							nickName:scope.row.nickName,
							phone:scope.row.phone,
							userEnterprise:scope.row.userEnterprise
						}
					})
				},
				showQRcode(scope){
					console.log(scope)
					this.obj = scope.row
					this.QRcodeWindow = true
				},
        sortChange(a){
          if(a.order=="ascending"){//上升
            this.filterForm.order = 'asc'
          }else{//下降
            this.filterForm.order = 'desc'
          }
          if(a.prop=="btcAmount"){
            this.filterForm.coinName = 'BTC'
          }else{
            this.filterForm.coinName = 'RMT'
          }
          // this.filterForm.pageSize = 1;
          this.filterForm.pageNum = 1;
          this.getUserRaking();
        },
        getPaginationChange(val, currentPage) {
          this.filterForm.pageSize = val;
          this.filterForm.pageNum = currentPage;
          this.getUserRaking();
        },
        // 查询用户列表
        getUserRaking() {
          this.$http.post("/wallet/app/otc/backmgr/getCustomPayInfo", this.filterForm).then((res) => {
            this.listData.list = res.result.list;
            this.listData.total = res.result.total;
          })
        },
        detail(data){
          console.log(data)
        }
      },
      activated() {
        this.getUserRaking();      // 查询代理用户列表
      }
    };
</script>
<style lang="less">
.exchangeSAC {
	overflow: hidden;
}
    .qr-box{
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;
			
		}
		.qr-box>div{
			width: 150px;
		}
		.qr-box>div>img{
			width: 100%
		}
		.qr-box>div>p{
			text-align: center;
		}
		.listData>p{
			margin: 0;
			padding: 0;
			line-height: 20px;
		}
		.listData>p.btn{
			cursor: pointer;
		}
		.listData>p>span{
			color: #333;
		}
		.numList /deep/ .el-dialog__body{
			padding-top: 0;
		}
		.numList /deep/ .el-dialog__body p span{
			color: rgb(64, 158, 255);
		}
</style>

