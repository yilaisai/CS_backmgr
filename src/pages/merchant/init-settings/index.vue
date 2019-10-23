<template>
	<div class="init-settings">
		<div class="current">
			<h3>当前参数</h3>
			<ul>
				<li><label>USDT当前市价:</label><span>6.93</span></li>
				<li><label>USDT当前兑入价格:</label><span>6.93</span></li>
				<li><label>USDT当前兑出价格:</label><span>6.93</span></li>
				<li><label>商户最小兑入:</label><span>6.93 USDT</span></li>
				<li><label>商户最大兑入:</label><span>6.93 USDT</span></li>
				<li><label>商户最小兑出:</label><span>6.93 USDT</span></li>
				<li><label>商户最大兑出:</label><span>6.93 USDT</span></li>
				<li><label>商户提币手续费:</label><span>6.93 USDT</span></li>
				<li><label>商户转账手续费:</label><span>6.93 USDT</span></li>
			</ul>
		</div>
		<div class="content-wrap">
			<h3>商户设置</h3>
			<el-tabs type="border-card">
				<el-tab-pane label="兑入兑出价格设置">
					<el-form ref="form" :model="form" label-width="100px" size="small">
						<el-form-item label="类型：">
							<el-radio-group v-model="form.resource">
								<el-radio label="系统"></el-radio>
								<el-radio label="手动"></el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="货币：">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
						<el-form-item label="兑入价格：">
							<el-input v-model="form.name"></el-input> * <el-input v-model="form.name"></el-input>
						</el-form-item>
						<el-form-item label="兑出价格：">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="商户初始化设置">配置管理</el-tab-pane>
				<el-tab-pane label="全局设置">角色管理</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
export default {
	data() { 
		return {
			form: {}
		}
	}
}
</script>

<style lang="less" scoped>
.init-settings{
	.current {
		h3 {
			margin: 0;
		}
		ul {
			display: flex;
			flex-wrap: wrap;
			margin: 10px 0 0;
			padding: 10px;
			box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
			li {
				width: 33%;
				list-style: none;
				font-size: 15px;
				margin: 5px 0;
				label {
					margin-right: 10px;
					color: #666;
				}
				span {
					color: #000;
					font-weight: 700;
				}
			}
		}
	}
}
</style>