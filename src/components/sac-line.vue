/**
*  Created by   阿紫
*  On  2018/8/22
*  Content
*/
<template>
  <div ref="sacLine" class='sac-line' :style="{ width: width, height: height }">
  </div>
</template>
<script>
  import echarts from 'echarts';

  export default {
    name: "sac-line",
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
      }
    },
    data() {
      return {
        chart: null,
        defaultOption: {
          tooltip: {
            trigger: 'axis', // 触发类型
            axisPointer: {
              // 指示器类型
              type: 'line',
              lineStyle: {
                opacity: 0
              }
            },
            confine: true,
          },
          title: {
            text: '',
            top: 20,
            x: '4%',
          },
          grid: {
            top: '70',
            left: '50', //grid 组件离容器左侧的距离
            right: '30',
            bottom: '30',
            containLabel: true //grid 区域是否包含坐标轴的刻度标签
          },
          legend: {
            data: [],
            top: 20,
            type: 'plain',
          },
          xAxis: {
            type: 'category',
            boundaryGap: [0, 0.01],
            data: [],
            axisTick: {
              alignWithLabel: true //保证刻度线和label居中对齐
            },
            axisLabel: {
              formatter: function (value, idx) {
                var date = new Date(value);
                return idx === 0 ? value : [date.getMonth() + 1, date.getDate()].join('-');
              },
            }
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, 0.01], // 坐标轴两边留白策略
          },
          series: []
        },
      };
    },
    methods: {
      initChart() {
        let sacLine = this.$refs['sacLine'];
        if (sacLine) {
          this.chart = echarts.init(sacLine);
          this.initSeries();
        }
      },
      initSeries(clear) {
        if (!this.chart) return;
        if (clear) {
          this.chart.setOption({
            series: [{ data: [] }],
            xAxis: [{ data: [] }]
          });
          return;
        }
        let options = this.defaultOption,
          series = [];
        if (Array.isArray(this.seriesData)) {
          //只修改data
          series = this.seriesData.slice();
          options = { series: [{ data: series }] };
        } else if (typeof this.seriesData === 'object') {
          if (this.seriesData.title) {
            options.title.text = this.seriesData.title.text;
          }
          if (this.seriesData.legend) {
            options.legend.data = this.seriesData.legend.data;
          }
          if (this.seriesData.xAxis) {
            options.xAxis.data = this.seriesData.xAxis.data;
          }
          if (this.seriesData.series && Array.isArray(this.seriesData.series)) {
            //修改data
            options.series = this.seriesData.series.slice();
          }
        }

        if (Object.keys(options).length > 0) {
          this.chart.setOption(options, true);
        }
      }
    },
    mounted() {
      this.initChart();
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
    }
  };
</script>
<style lang="less">
  .sac-line {
  }
</style>
