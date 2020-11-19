<template>
    <div style="color: red;margin-top: 0.5rem;">
      <div id="myChart" style="width: 90%; height: 5rem; color: white;"></div>
    </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
    }
  },
  mounted () {
    this.drawLises()
  },
  methods: {
    // textStyle: {
    //   color: 'red'
    // },
    drawLises () {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        // title: {
        //   text: '对数轴示例',
        //   left: 'center'
        // },
        symbolSize: 4,
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        xAxis: {
          nameLocation: 'end',
          type: 'category',
          name: '日期',
          splitLine: { show: false },
          // show: true,
          data: ['2/15', '3/01', '3/15', '4/01', '4/15', '5/01', '5/15', '6/01']
        },
        yAxis: {
          type: 'category',
          name: '体重/kg',
          splitLine: { show: false },
          data: ['60kg', '65kg', '70kg', '75kg', '80kg', '90kg', '100kg']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        series: [
          {
            name: '减肥指数',
            type: 'line',
            data: [1.5, 5.5, 5.5, 3.5, 2.5, 1.5, 1, 0]
          }
        ],
        textStyle: {
          color: '#8E8E8E',
          symbolSize: '40px'
        },
        color: {
          type: 'linear',
          x: 2,
          y: 2,
          x2: 2,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#57C9FF' // 0% 处的颜色
          }, {
            offset: 1, color: '#57C9FF' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
