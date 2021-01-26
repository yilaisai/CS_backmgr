<template>
    <div class="transaction-details">
        <el-container>
			<div class="main">
				<el-collapse value="filter">
					<el-collapse-item title="查询条件" name="filter">
						<el-form :inline="true"  ref="filterForm" :model="filterForm" size="mini" label-width="105px">
							<el-form-item class='dateItem' label="时间:">
								<el-date-picker
									v-model="selectedDate"
									type="datetimerange"
									value-format="yyyy-MM-dd HH:mm:ss"
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期" @change='filterForm.dateType=""'>
								</el-date-picker>
							</el-form-item>
							<el-form-item label="订单号:">
								<el-input placeholder="请输入单号" v-model.trim="filterForm.recdId" class="input-with-select"></el-input>
							</el-form-item>
							<br />
							<el-form-item label="账号/用户编号:">
								<el-input placeholder="请输入用户账号或用户编号" v-model.trim="filterForm.account" class="input-with-select"></el-input>
							</el-form-item>
							<el-form-item label="状态:">
								<el-select v-model="filterForm.status" >
									<el-option v-for="(item, key) in statusList" :key="key" :value="item.label" :label="item.value"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="币种:">
								<el-select v-model="filterForm.coinName" >
									<el-option value="" label="全部"></el-option>
									<el-option v-for="(item, key) in coinInfo" :key="key" :value="item.coinName" :label="item.coinName"></el-option>
								</el-select>
							</el-form-item>
							<br />
							<el-form-item label="支付渠道:">
								<el-select v-model="filterForm.payType" >
									<el-option value="" label="全部"></el-option>
									<el-option v-for="(item, key) in payTypes" :key="key" :value="key" :label="item"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="交易类型:">
								<el-select v-model="filterForm.advType" >
									<el-option v-for="(item, key) in transList" :key="key" :value="item.label" :label="item.value"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="超时筛选:">
								<el-select v-model="filterForm.timeOut" >
									<el-option value="" label="所有"></el-option>
									<el-option value="1" label="已超时"></el-option>
									<el-option value="2" label="进行中"></el-option>
									<el-option value="3" label="已结束"></el-option>
								</el-select>
							</el-form-item>
							<el-button type="primary" @click.native="search" size="mini">搜索</el-button>
							<el-button type="primary" @click.native="exportExcel" size="mini" icon="el-icon-document-checked">导出Excel</el-button>
						</el-form>
					</el-collapse-item>
    			</el-collapse>
				<el-table :data="listData.list" border height="100%" size="mini">
						<el-table-column prop="coin_name" label="币种" width="60" align="center"></el-table-column>
						<el-table-column  label="类型/下单时间" align="center" width="140">
							<template slot-scope="scope"><img :src="'/static/img/paytype/' + scope.row.pay_type + '.svg'" style="vertical-align: sub;width: 18px;" alt=""> {{advTypeMap[scope.row.adv_type]}}<br />{{ $fmtDate(scope.row.create_time,'full') }}</template>
						</el-table-column>
						<el-table-column  label="商户单号/平台单号" width="180" align="center" >
							<span slot-scope="scope">{{scope.row.api_trade_id}}<br />{{scope.row.trade_id}}</span>
						</el-table-column>
						<el-table-column label="商户用户编号/账户" width="150" align="center" >
							<span slot-scope="scope">{{scope.row.taker_nick_name}}<br />{{scope.row.taker_phone}}</span>
						</el-table-column>
						<el-table-column label="交易员用户编号/账户" width="150" align="center">
							<span slot-scope="scope">{{scope.row.nick_name}}<br />{{scope.row.phone}}</span>
						</el-table-column>
						<el-table-column prop="maker_tags" label="交易员标签" width="100" align="center"></el-table-column>
						<el-table-column prop="tradeTime" label="状态" width="120" align="center" >
							<template slot-scope="scope">{{tradeStatusMap[scope.row.trade_status]}}</template>
						</el-table-column>
						<el-table-column label="价格/数量" align="center">
							<div slot-scope="scope">
								<span>{{scope.row.taker_price}}</span><br />
								<span>{{scope.row.taker_amount}}</span>
							</div>
						</el-table-column>
						<el-table-column prop="amount" label="金额" align="center"></el-table-column>
						<el-table-column prop="api_user_id" label="appUserId/收银台ip" align="center">
							<div slot-scope="scope">
								<span>{{scope.row.api_user_id}}</span><br />
								<span>{{scope.row.api_ip}}</span>
							</div>
						</el-table-column>
						<el-table-column prop="fee" label="手续费" align="center"></el-table-column>
						<el-table-column prop="payment_name" label="付款人" align="center"></el-table-column>
						<el-table-column prop="fee" label="付款凭证" align="center">
							<div slot-scope="scope" class="imgBox" v-if="scope.row.payment_photo">
								<el-image
									:src="scope.row.payment_photo ? scope.row.payment_photo.split(',')[0] : ''" 
									:preview-src-list="scope.row.payment_photo ? scope.row.payment_photo.split(',') : []">
								</el-image>
								<i>{{scope.row.payment_photo.split(',').length}}</i>
							</div>
						</el-table-column>
						<el-table-column prop="price" label="操作" fixed="right" align="center" width="300">
							<template slot-scope="scope">
								<el-button type="danger" size="mini" v-if="scope.row.trade_status==1||scope.row.trade_status==2" @click="appealClick(scope.row) ">申诉</el-button>
								<el-button type="primary" size="mini" @click.native="$router.push({path:'/merchant/merchantTradingFlowDetaile',query:{tradeId:scope.row.trade_id}})">查看详情</el-button>
								<el-button type="primary" size="mini" v-if="scope.row.trade_status==5 && (scope.row.adv_type == 4||scope.row.adv_type == 5)" @click="goComplaint(scope.row) ">处理</el-button>
								<el-button type="danger" size="mini" v-if="(scope.row.trade_status==8||scope.row.trade_status==4)&&showActiveBtn(scope.row.create_time)" @click.native="orderActivation(scope.row)">激活订单</el-button>
								<el-button type="danger" size="mini" v-if="scope.row.trade_status==2&&scope.row.isActivation==1" @click.native="activationLetgo(scope.row.trade_id)">&nbsp;&nbsp;放 &nbsp;&nbsp;行&nbsp;&nbsp;</el-button>
								<el-button type="warning" size="mini" v-if="((scope.row.adv_type == 4 || scope.row.adv_type == 5) && (scope.row.trade_status == 3 || scope.row.trade_status == 6))&&scope.row.trade_type!=3" @click="returnApi(scope.row)">异步补发</el-button>
								<!-- <el-button 
									type="warning"
									size="mini"
									v-if="(((scope.row.adv_type == 4 || scope.row.adv_type == 5) && (scope.row.trade_status == 3 || scope.row.trade_status == 6  || scope.row.trade_status == 7))||((scope.row.adv_type == 3 || scope.row.adv_type == 6) &&  scope.row.trade_status == 7 )) && scope.row.trade_type != 3"
									@click="showPrompt(scope.row)"
								>手动录单
								</el-button> -->
							</template>
						</el-table-column>
				</el-table>
			</div>
			<el-footer>
				<div class="statistics">
					总数量： <span>{{sumInfo.sumTakerAmount}} {{$variableCoin}}</span>
					总金额： <span>{{sumInfo.sumAmount}} CNY</span>
					已到账手续费： <span>{{sumInfo.sumFee}} {{$variableCoin}}</span>
				</div>
				<sac-pagination v-show="listData.list.length>0"
					@handleChange="handleCurrentChange"
					:total="+listData.total"
					:page-size="filterForm.pageSize"
					:current-page="filterForm.pageNum">
				</sac-pagination>
			</el-footer>
		</el-container>
				
		<el-dialog class="EntryPrompt" title="申诉" :visible.sync="showAppeal" width="460px">
			<el-form ref="appealData" label-width="80px" size="mini">
				<el-form-item label="申诉人:">
					<el-select v-model="appealData.userId" >
						<el-option v-for="(item, key) in appealList" :key="key" :value="item.value " :label="item.label"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="申诉理由:">
					<el-input type="textarea" v-model="appealData.proofTxt"></el-input>
				</el-form-item>
				<el-form-item label="上传图片:">
					<div v-if="appealData.proofImg" class="selectImg">
						<img  :src="appealData.proofImg" >
						<span @click=" appealData.proofImg='' ">删除</span>
					</div>
					<el-upload v-else
						class="avatar-uploader"
						:action="server_path + 'wallet/backmgr/uploadFile'"
						name="files"
						list-type="picture-card"
						:data="{type:'img',token :token}"
						:show-file-list="false"
						:on-success="upload">
						
						<i class="el-icon-plus avatar-uploader-icon"></i>
						<!-- <el-button size="small" type="primary">点击上传</el-button> -->
					</el-upload>
				</el-form-item>
				
				 
			</el-form>
			<div class="btns">
				<el-button @click="showAppeal = false" size="mini">取 消</el-button>
				<el-button type="primary" size="mini" @click="submitAppeal">提交申诉</el-button>
			</div>
		</el-dialog>
		<el-dialog class="EntryPrompt" title="确定手动录单？" :visible.sync="dialogVisible" width="420px">
			<p>录单成功将生成一笔订单状态为完成的单，确认录单？</p>
			<el-form ref="form" label-width="55px" size="mini">
				<el-form-item label="金额：">
					<el-input v-model.trim="amount" @input="moneyInput">
						<template slot="append">CNY</template>
					</el-input>
				</el-form-item>
			</el-form>
			<p>其他信息同订单号：{{selectItem.trade_id}}</p>
			<div class="btns">
				<el-button @click="dialogVisible = false" size="mini">取 消</el-button>
				<el-button type="primary" size="mini" @click="addNewRecordAdmin">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import qs from 'qs'
import {getTodayTime} from '@/common/util'
export default {
	name:'transaction-details',
	data(){
		return{
			dialogVisible:false,
			showAppeal:false,
			appealData:{
				appealType:'4',
				proofTxt:'',
				proofImg:'',
				tradeId:''
			},
			selectItem:{
				trade_id:''
			},
			amount:'',
			selectedDate: [], //已选日期
			currentPage:1,
			filterForm:{
				pageNum:1,
				account:'',
				pageSize: 20,
				startDate:'',
				endDate:'',
				coinName:'',
				trade_status:'',
				status: '',
				tradeType:'3',
				advType:'',
				dateType:'1',
				timeOut: "2",
				recdId: "",
				payType: ""  //支付渠道
			},
			advTypeMap: {
				1: '在线出售',
				2: '在线求购',
				3: '抢单兑出',
				4: '抢单兑入',
				5: '派单兑入',
				6: '派单兑出'
			},
			tradeTypeList:[
				{value:'全部',label:""},
				{value:'派单',label:"0"},
				{value:'抢单',label:"1"}
			],
			appealList:[
				{value:'0',label:"买方"},
				{value:'1',label:"卖方"}
			],
			statusList:[
				{value:'全部',label:""},
				{value:'未付款',label:"1"},
				{value:'已付款(待放行)',label:"2"},
				{value:'已完成',label:"3"},
				{value:'已取消',label:"4"},
				{value:'申诉中',label:"5"},
				{value:'申诉后完成交易',label:"6"},
				{value:'申诉后取消交易',label:"7"},
				{value:'超时取消',label:"8"}
			],
			transList:[
				{value:'所有',label:""},
				{value:'抢单兑出',label:"3"},
				{value:'抢单兑入',label:"4"},
				{value:'派单兑入',label:"5"},
				{value:'派单兑出',label:"6"},
			],
			tradeStatusMap: {
				1: '未付款',
				2: '待放行',
				3: '已完成',
				4: '已取消',
				5: '申诉中',
				6: '申诉后完成交易',
				7: '申诉后取消交易',
				8: '超时取消'
			},
			dateList:[
				{value:'今天',label:"1"},
				{value:'一周',label:"2"},
				{value:'一个月',label:"3"},
				{value:'三个月',label:"4"},
			],
            listData: {
                total: null,
                list: [],
			},
			sumInfo: {
				sumTakerAmount: "--",
				sumAmount: "--",
				sumFee: "--"
			},
			statistics:{},
			payTypes: {
				1: '银行卡',
				2: '支付宝',
				3: '微信',
			},
			server_path:'',
			token:localStorage.getItem('wallet_token'),
			options: {
				inline: false,
				button: false,
				navbar: false,
				title: false,
				toolbar: false,
				tooltip: false,
				movable: true,
				zoomable: true,
				rotatable: true,
				scalable: false,
				transition: true,
				fullscreen: true,
				keyboard: true,
				url: 'data-source'
			},
		}
        
	},
	methods:{
		appealClick(data){
			
			this.appealData.tradeId = data.trade_id
			this.appealData.proofTxt = '' 
			this.appealData.proofImg = '' 
			this.appealList=[
				{value:data.taker_user_id,label:'商户:'+data.taker_nick_name},
				{value:data.maker_user_id,label:'交易员:'+data.nick_name}
			]
			this.showAppeal = true
		}, 
		upload(response, file, fileList) {
        	this.appealData.proofImg = response.result.urls[0]
      	},
		submitAppeal(){
			this.$http.post('/wallet/app/otc/backmgr/submitAppeal',this.appealData).then(res=>{
				if(res.code==200){
					this.getList()
						this.$notify({
							title: "提示",
							message: `申诉处理成功`,
							type: "success"
					});
				}
				this.showAppeal = false
			})
		},
		getList(){
			if(this.selectedDate && this.selectedDate.length==2){
				this.filterForm.startDate = this.selectedDate[0]
				this.filterForm.endDate = this.selectedDate[1]
			}else {
				this.filterForm.startDate = ""
				this.filterForm.endDate = ""
			}
			this.$http.post('/wallet/backmgr/merchant/trade/list',this.filterForm).then(res=>{
				const { list ,total} = res.result.pageData;
				if(list.length<1){
					this.sumInfo = {sumApiStock: "0",sumApiAmount: "0",sumFee: "0"}
				}else{
					this.sumInfo = res.result.sumInfo
				}
				
				this.listData.list = list;
				this.listData.total = total;
			})
		},
		// 导出excel
		exportExcel() {
			if(this.selectedDate && this.selectedDate.length==2){
				this.filterForm.startDate = this.selectedDate[0]
				this.filterForm.endDate = this.selectedDate[1]
			}else {
				this.filterForm.startDate = ""
				this.filterForm.endDate = ""
			}
			if(this.filterForm.coinName == "") {
				delete this.filterForm.coinName
			}
			this.filterForm.token = localStorage.getItem('wallet_token') || ""
			const baseUrl = localStorage.getItem('SERVER_PATH') || window.SERVER_PATH
			console.log(baseUrl + '/wallet/backmgr/merchant/trade/list/export?' + qs.stringify(this.filterForm))
			window.open(baseUrl + '/wallet/backmgr/merchant/trade/list/export?' + qs.stringify(this.filterForm))
		},
		showPrompt(selectItem){
			this.selectItem = selectItem
			this.amount = ''
			this.dialogVisible = true
			
		},
		moneyInput(){
			this.amount = this.amount + ""
			this.amount = this.amount.replace(/^\.$/g,"")  //清除第一个“.”   
			this.amount = this.amount.replace(/[^\d.]/g,"")  //清除“数字”和“.”以外的字符   
			this.amount = this.amount.replace(/\.{2,}/g,".") //只保留第一个. 清除多余的   
			this.amount = this.amount.replace(".","$#$").replace(/\./g,"").replace("$#$",".")  
			this.amount = this.amount.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3') //只能输入2个小数   
			if(this.amount.indexOf(".") < 0 && this.amount != ""){ //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
				this.amount = parseFloat(this.amount)
			}
		},
		addNewRecordAdmin(){
			if( !(this.amount>0) ){
					this.$notify({
							title: "提示",
							message: `请输入金额`,
							type: "error"
					});
					return
			}
			this.$http.post('/wallet/backmgr/merchant/addNewRecordAdmin',{
				tradeId: this.selectItem.trade_id,
				amount:this.amount
			}).then(res=>{
				this.dialogVisible = false
				this.getList()
				this.$notify({
					title: '成功',
					message: res.msg,
					type: 'success'
				});
			})
		},
		activationLetgo(tradeId){
			this.$confirm('放行后订单状态将变为已完成(交易员扣币，商户加币)，确认放行？', '确认放行订单？', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
			// type: 'warning'
			}).then(() => {
				this.$http.post('/wallet/backmgr/merchant/activationLetgo',{
					tradeId:tradeId
				}).then(res=>{
					if(res.code==200){
						// this.statistics = res.result
						this.getList()
						this.$notify({
							title: '成功',
							message: res.msg,
							type: 'success'
						});
					}
				})
			}).catch(() => {    
			});
		},
		orderActivation(item){
			this.$confirm('激活后订单状态将变为已付款待放行，确认激活?', '确认激活订单？', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
          		// type: 'warning'
			}).then(() => {
				this.$http.post('/wallet/backmgr/merchant/activation',{tradeId: item.trade_id,}).then(res=>{
					if(res.code==200){
						// this.statistics = res.result
						this.getList()
						this.$notify({
							title: '成功',
							message: res.msg,
							type: 'success'
						});
					}
				})
			}).catch(() => {    
			});
		},
		showActiveBtn(create_time){
			if(new Date().getTime()-create_time<259200000){
				return true
			}else{
				return false
			}
		},
		// 异步补发
		returnApi(item) {
			this.$http.post('/wallet/backmgr/merchant/returnApi', {
				tradeId: item.trade_id,
				userId: item.taker_user_id
			}).then(res=>{
				if(res.code==200){
					this.$alert(`返回结果：${res.result.result} <br /> 回调地址：${res.result.url}`, {
						title:'提示',
						dangerouslyUseHTMLString: true
					});	
				}
			})
		},
		setDateType(){
			//获取系统当前时间
			let nowdate = new Date();
			let y = nowdate.getFullYear();
			let m = nowdate.getMonth()+1;
			let d = nowdate.getDate();
			let formatnowdate = y+'-'+m+'-'+d;
			if(this.filterForm.dateType==1){
				this.selectedDate=[formatnowdate,formatnowdate]
			}else if(this.filterForm.dateType==2){
				let oneweekdate = new Date(nowdate-7*24*3600*1000);
				let y = oneweekdate.getFullYear();
				let m = oneweekdate.getMonth()+1;
				let d = oneweekdate.getDate();
				let formatwdate = y+'-'+m+'-'+d;
				this.selectedDate=[formatwdate,formatnowdate]
			}else if(this.filterForm.dateType==3){
				nowdate.setMonth(nowdate.getMonth()-1);
				let y = nowdate.getFullYear();
				let m = nowdate.getMonth()+1;
				let d = nowdate.getDate();
				let formatwdate = y+'-'+m+'-'+d;
				this.selectedDate=[formatwdate,formatnowdate]
			}else if(this.filterForm.dateType==4){
				nowdate.setMonth(nowdate.getMonth()-3);
				let y = nowdate.getFullYear();
				let m = nowdate.getMonth()+1;
				let d = nowdate.getDate();
				let formatwdate = y+'-'+m+'-'+d;
				this.selectedDate=[formatwdate,formatnowdate]
			}
		},
		search(){
			this.filterForm.pageNum = 1
			this.getList()
		},
		checkLog(){
				this.$router.push({
						path:'customer-log'
				})
		},
		checkDetails(){
				this.$router.push({
						path:'complaint-details'
				})
		},
		handleCurrentChange(val,currentPage) {
				this.filterForm.pageSize=val
				this.filterForm.pageNum=currentPage
				this.getList()
		},
		download(){
				location.href =`${ SERVER_PATH}/wallet/app/otc/backmgr/exportExcel?startDate=${this.filterForm.startDate}&endDate=${this.filterForm.endDate}&userId=${this.filterForm.userId}&token=${localStorage.getItem('cus_token')}`;
		},
		goComplaint(itemData){
			this.$router.push({
				name:'complaintDetails',
				query:{
					tradeId:itemData.trade_id,
				}
			})
		},
	},
	computed:{
		...mapState(['coinInfo'])
	},
	activated(){
		this.server_path =  localStorage.getItem('SERVER_PATH') || SERVER_PATH
		this.selectedDate = getTodayTime()
		this.getList()
	}
}
</script>
<style scoped lang="less">
.transaction-details{
	 height:100%;
	 overflow: hidden;
    .el-container{
        height:100%;
        .main{
            height:100%;
			width: 100%;
			display: flex;
			flex-direction: column;
		}
		.el-footer {
			display: flex;
			height: auto !important;
			align-items: center;
			margin-top: 10px;
			padding: 0;
			.statistics {
				display: block;
				height: auto;
				border: none;
				font-size: 14px;
				span {
					margin-right: 10px;
					color: #409EFF;
					font-weight: 700;
				}
			}
			.el-pagination {
				margin: 0;
			}
		}
	} 
	/deep/ .el-collapse-item__header {
		font-size: 14px;
		font-weight: 600;
		padding: 0 10px;
	}
	/deep/.el-collapse-item__content {
		padding-bottom: 0;
	}
	/deep/.el-form--inline .el-form-item__content {
		width: 151px;
	}
    .el-form--inline .el-form-item__label{
        width:80px !important;
		}
		.statistics{
			width: 100%;
			height: 85px;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			list-style: none;
			padding: 0;
			margin: 0;
			border: 1px solid #DCDFE6;
			box-sizing: border-box;
			padding: 5px;
			li{
				p{
					text-align: center;
					font-size: 14px;
					line-height: 25px;
					margin: 0;
					&:first-of-type{
						font-size: 16px;
						font-weight: 600;
					}
				}
			}
		}
		.form-group{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			/deep/.el-form-item__label{
				font-size: 14px;
				color: #000;
				// font-weight: 500;
			}
			&>.radioBox{
				display: flex;
				flex-direction: row;
				align-items: center;
				height: 40px;
				margin-right: 15px;
				margin-bottom: 15px;
				&>label{
					font-size: 14px;
					color: #000;
					margin-right: 10px;
					// font-weight: 500;
				}
				/deep/ .el-radio{margin-right: 0;}
				/deep/.el-radio__input{
					display: none;
				}
			}
		}
   	/deep/.dateItem  .el-form-item__content{
        width: auto;
		}
		/deep/.el-radio__label{
			color: #909399;
			padding:0 10px;
		}
		/deep/.is-checked{
			background: #409EFF;
			border-radius: 5px;
			padding: 3px 10px;
			margin-right: 10px;
			.el-radio__label{
				color: #fff;
				padding: 0;
			}
			
		}
	.imgBox {
		position: relative;
		height: 50px;
		i {
			position: absolute;
			font-style: normal;
			font-size: 12px;
			height: 16px;
			width: 16px;
			line-height: 16px;
			background-color: #666;
			border-radius: 50%;
			left: 0;
			top: 0;
			color: #fff;
		}
		.el-image {
			height: 100%;
			width: 60px;
		}
	}
	.EntryPrompt{
		// position: fixed;
		// width: 100%;
		// height: 100%;
		/deep/.el-dialog__body{
			padding-top: 0;
			p{
				&:last-of-type{
					color: red;
				}
			}
			.btns{
				text-align: right;
			}
		}
	}
	.selectImg{
		width: 148px;
		position: relative;
		line-height: 0;
		img{
			width: 100%;
		}
		span{
			position: absolute;
			width: 148px;
			height: 24px;
			line-height: 24px;
			background: rgba(0, 0, 0, .5);
			color: #fff;
			left: 0;
			bottom: 0;
			text-align: center;
			font-weight: 500;
			cursor: pointer;
		}
	}
}
  
</style>
