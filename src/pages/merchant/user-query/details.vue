<template>
	<div class="details">
		<div class="topbar"><el-button type="primary" size="mini" @click="$router.go(-1)">返回</el-button></div>
		<div class="basic">
			<div class="title">
				<h3>基本信息</h3>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() { 
		return {

		}
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
}
</style>