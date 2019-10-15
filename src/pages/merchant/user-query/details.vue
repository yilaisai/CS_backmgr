<template>
	<div class="details">
		<div class="topbar"><el-button type="primary" size="mini" @click="$router.go(-1)">返回</el-button></div>
		<div class="basic">
			<div class="title"><h3>基本信息</h3></div>
			<ul>
				<li>
					<label>用户名:</label>
					<span>{{pageData.info.name}}</span>
				</li>
				<li>
					<label>身份证号码:</label>
					<span>{{pageData.info.idNo}}</span>
				</li>
				<li>
					<label>手机号码:</label>
					<span>{{pageData.info.phone}}</span>
				</li>
				<li>
					<label>邮箱:</label>
					<span>{{pageData.info.email}}</span>
				</li>
				<li>
					<label>直推人:</label>
					<span>{{pageData.info.firstPhone}}</span>
				</li>
				<li>
					<label>间推人:</label>
					<span>{{pageData.info.secPhone}}</span>
				</li>
				<li>
					<label>上次登录时间:</label>
					<span>{{pageData.info.lastLoginDate}}</span>
				</li>
				<li>
					<label>上次登录IP:</label>
					<span>{{pageData.info.lastLoginIp}}</span>
				</li>
				<li>
					<label>谷歌密钥:</label>
					<span>{{pageData.info.googleVerify}}</span>
				</li>
				<li>
					<label>申请时间:</label>
					<span>{{pageData.info.applyDate}}</span>
				</li>
			</ul>
		</div>
		<div class="settable">
			<div class="title"><h3>可设置参数</h3></div>
			<ul>
				<li>
					<label>商户兑入手续费:</label>
					<span></span>
					<el-button type="primary" plain size="mini">修改</el-button>
				</li>
				<li>
					<label>商户兑入方式:</label>
					<span>
						<el-radio v-model="radio" label="1">派单</el-radio>
  						<el-radio v-model="radio" label="2">抢单</el-radio>
					</span>
				</li>
				<li>
					<label>商户兑出手续费:</label>
					<span>ouyla</span>
					<el-button type="primary" plain size="mini">修改</el-button>
				</li>
				<li>
					<label>商户兑出方式:</label>
					<span>
						<el-radio v-model="radio" label="1">派单</el-radio>
  						<el-radio v-model="radio" label="2">抢单</el-radio>
					</span>
				</li>
				<li>
					<label>直推人费率:</label>
					<span>ouyla</span>
					<el-button type="primary" plain size="mini">修改</el-button>
				</li>
				<li>
					<label>间推人费率:</label>
					<span>ouyla</span>
					<el-button type="primary" plain size="mini">修改</el-button>
				</li>
				<li>
					<label>最小兑入额度（USDT）:</label>
					<span>{{pageData.coinInfo.minIn}}</span>
					<el-button type="primary" plain size="mini">修改</el-button>
				</li>
				<li>
					<label>最大兑入额度(USDT):</label>
					<span>{{pageData.coinInfo.maxIn}}</span>
					<el-button type="primary" plain size="mini">修改</el-button>
				</li>
				<li>
					<label>最小兑出额度（USDT）:</label>
					<span>{{pageData.coinInfo.minOut}}</span>
					<el-button type="primary" plain size="mini">修改</el-button>
				</li>
				<li>
					<label>最大兑出额度(USDT):</label>
					<span>{{pageData.coinInfo.maxOut}}</span>
					<el-button type="primary" plain size="mini">修改</el-button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data() { 
		return {
			radio: '1',
			pageData: {
				coinInfo: {},
				info: {}
			}
		}
	},
	mounted() {
		this.getDetails()
	},
	methods: {
		getDetails() {
			this.$http.post('/wallet/backmgr/merchant/detail', {
				userId: this.$route.query.id
			}).then(res => {
				console.log(res)
				this.pageData = res.result
			})
		}
	},
	activated() {
		this.getDetails()
	}
}
</script>

<style lang="less" scoped>
.details{
	.title {
		h3 {
			font-size: 14px;
		}
	}
	.basic {
		ul {
			display: flex;
			flex-wrap: wrap;
			box-shadow: 0 0 2px #999;
			padding: 10px;
			margin: 0;
			li {
				width: 50%;
				list-style: none;
				padding: 10px 0;
				&>label {
					display: inline-block;
					min-width: 100px;
				}
				span {
					display: inline-block;
					padding: 0 10px;
				}
			}
		}
	}
	.settable {
		ul {
			display: flex;
			flex-wrap: wrap;
			box-shadow: 0 0 2px #999;
			padding: 10px;
			margin: 0;
			li {
				width: 50%;
				list-style: none;
				padding: 10px 0;
				&>label {
					display: inline-block;
					min-width: 100px;
				}
				span {
					display: inline-block;
					padding: 0 10px;
				}
			}
		}
	}
}
</style>