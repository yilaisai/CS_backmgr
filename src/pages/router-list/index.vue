<template>
	<div class="router-list">
		<el-table :data="routerList" border style="width: 100%" height="100%">
			<el-table-column label="序号" width="80" type="index" align="center"></el-table-column>
			<el-table-column prop="title" label="名称"></el-table-column>
			<el-table-column prop="path" label="路径"></el-table-column>
			<el-table-column prop="address" label="描述"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="text" @click="$router.push(scope.row.path)">跳转查看</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	data() {
		return {
			routerList: [],
			dialogVisible: true
		}
	},
	mounted() {
		const routes = this.$router.options.routes
		routes.forEach((val, idx) => {
			if(val.children && val.children.length > 0) {
				this.routerList = [...this.routerList, ...this.arrFilter(val.children, val.path)]
			}else {
				this.routerList.push({
					title: val.meta.title || "",
					path: val.path
				})
			}
		})
	},
	methods: {
		arrFilter(arr, parentPaht) {
			parentPaht = parentPaht == "/" ? '' : parentPaht
			let arrList = []
			arr.forEach((val, idx) => {
				arrList.push({
					title: val.meta.title || "",
					path: parentPaht + "/" + val.path
				})
			})
			return arrList
		}
	}
}
</script>

<style lang="less" scoped>
.router-list {
	overflow-y: auto;
}
</style>

