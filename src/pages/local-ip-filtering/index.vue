<template>
	<div class="local-ip-filtering">
		<el-tabs type="border-card">
			<el-tab-pane :label="destxt">
				<el-input
					type="textarea"
					:rows="10"
					placeholder="请输入您允许访问收银台的地区，用“,”号分隔"
					v-model="areas">
				</el-input>
			</el-tab-pane>
			<el-button type="primary" size="small" @click="updateEnableAreas">保存修改</el-button>
			<p class="tips">输入您允许访问收银台的地区,多个地区之间用 “,” 号分隔</p>
		</el-tabs>
	</div>
</template>

<script>
export default {
	data() { 
		return {
			areas: '',
			destxt: '地区访问设置'
		}
	},
	activated() {
		this.getEnableAreas()
	},
	methods: {
		// 获取收银台允许访问地址
		getEnableAreas() {
			this.$http.post("/wallet/backmgr/sys/getEnableAreas").then(res => {
				this.destxt = res.result.destxt
				this.areas = res.result.paramValue
			})
		},
		// 更新允许访问地址
		updateEnableAreas() {
			this.$http.post("/wallet/backmgr/sys/updateEnableAreas", {
				areas: this.areas
			}).then(res => {
				this.$notify({
					title: '成功',
					message: res.msg,
					type: 'success'
				})
				this.getEnableAreas()
			})
		}
	}
}
</script>

<style lang="less" scoped>
.local-ip-filtering{
	.el-button {
		margin-top: 10px;
	}
	.tips {
		font-size: 14px;
		color: #c33;
	}
}
</style>