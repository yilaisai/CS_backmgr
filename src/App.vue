<template>
  <div
    id="app"
    class="app"
    v-loading="isLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
  >
    <router-view @musicPlay="musicPlay"></router-view>
	<audio ref="music"><source src="../static/music.mp3" type="audio/wav" /><source src="../static/music.mp3" type="audio/mpeg"/></audio>
  </div>
</template>

<script>
import { mapState } from 'vuex';


export default {
  name: 'App', // 1.指定 name 选项的另一个好处是便于调试 2.允许组件模板递归地调用自身
  mounted() {
	  this.$store.dispatch('getCoinInfo')
  },
  methods: {
	  musicPlay() {
		  if(localStorage.getItem('MUSIC_SWITCH') == 'open') {
			  this.$refs.music.play()
		  }
	  }
  },
  computed: {
    ...mapState({
      isLoading: 'isLoading',
    }),
  },
};
</script>

<style lang="less">
  @import '~@/styles/app.less';
  .app {
    height: 100%;
    width: 100%;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .el-table {
	  .cell {
		  white-space: nowrap;
	  }
  }
</style>
