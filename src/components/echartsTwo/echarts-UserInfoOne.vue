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
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      })
    }
  }
}
</script>

<style scoped>

</style>
