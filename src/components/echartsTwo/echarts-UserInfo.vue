<template>
  <div style="color: red;margin-top: 0.5rem;">
    <div id="myChart" style="width: 90%; height: 5rem; color: white;"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.drawLises()
  },
  methods: {
    drawLises () {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        legend: {
          data: [ '肌肉百分比', '脂肪百分比' ]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['3.10', '4.10', '4.12', '4.15', '4.19', '4.20', '4.28']
        },
        yAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['20%', '25%', '30%', '35%', '4.19']
        },
        series: [
          {
            name: '肌肉百分比',
            type: 'line',
            stack: '总量',
            data: [ 1, 1.5, 2, 4, 3, 2, 3 ]
          },
          {
            name: '脂肪百分比',
            type: 'line',
            stack: '总量',
            data: [ 3, 2, 1, 1.5, 3, 4, 4.1 ]
          }
        ],
        textStyle: {
          color: '#8E8E8E',
          symbolSize: '40px'
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
