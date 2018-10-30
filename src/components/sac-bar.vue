/**
*  Created by   阿紫
*  On  2018/8/22
*  Content
*/
<template>
  <div class='sac-bar' ref="sacBar" :style="{ width: width, height: height }">
  </div>
</template>
<script>
  import echarts from 'echarts';

  export default {
    name: "sac-bar",
    props: {
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      },
      seriesData: {
        type: [Array, Object],
        default: null
      },
    },
    data() {
      return {
        chart: null,
        scale: 1,
        defaultOption: {
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          title: {
            text: '',
            top: 20,
            x: 10,
          },
          legend: {
            type: 'scroll',
            left: 10,
            right: 20,
            top: 70,
            bottom: 70,
            data: [],
          },
          grid: {
            top: '7%',
            left: '2%', //grid 组件离容器左侧的距离
            right: '4%',
            bottom: '3%',
            containLabel: true //grid 区域是否包含坐标轴的刻度标签
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: '40%',
              center: ['50%', '70%'],
              data: [],
              label: {
                normal: {
                  formatter: '\n{b|{b}：} {c} {d|{d}%}\n',
                  rich: {
                    b: {
                      align: 'left',
                      padding: 4
                    },
                    hr: {
                      borderColor: 'red',
                      width: '100%',
                      borderWidth: 1,
                      height: 0
                    },
                    d: {
                      align: 'left',
                      padding: 4
                    },
                  }
                },
              },
            }
          ]
        }
      };
    },
    watch: {
      seriesData: {
        handler: function (newValue, oldValue) {
          if (this.seriesData) {
            this.initSeries();
          } else {
            this.initSeries(true);
          }
        },
        deep: true
      }
    },
    methods: {
      initChart() {
        let sacBar = this.$refs['sacBar'];
        if (sacBar) {
          this.chart = echarts.init(sacBar);
          this.chart.setOption(this.defaultOption);
          if (this.seriesData) {
            this.initSeries();
          }
        }
      },
      initSeries(clear) {
        if (!this.chart) return;
        let options = {};
        if (typeof this.seriesData === 'object') {
          if (this.seriesData && Array.isArray(this.seriesData.series)) {
            if (this.seriesData.series.length > 0) {
              let series = this.seriesData.series.slice();
              options.series = [{ data: series }];
              options.legend = { data: series.map(item => item.name) };
            }
          }
          if (this.seriesData.title) {
            options.title = {
              text: this.seriesData.title.text
            }
          }
          if (options.series && this.seriesData.center) {
            options.series[0].center = this.seriesData.center;
          }
          if (options.series && this.seriesData.radius) {
            options.series[0].radius = this.seriesData.radius;
          }
        }
        if (Object.keys(options).length > 0) {
          this.chart.setOption(options);
        }
      }
    },
    mounted() {
      this.initChart();
    },
    destroyed() {
      if (this.chart && this.chart.dispose) {
        this.chart.dispose();
      }
    },
  };
</script>
<style lang="less">
  .sac-bar {
  }
</style>
