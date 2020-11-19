<template>
  <div style="color: red;margin-top: 0.5rem;width: 100%;position: relative;">
    <div id="myChart" style="width: 100%; height: 5rem; color: white;">
    </div>
    <div style="position: absolute;top: 0.5rem;display: flex;color: white;left: 6rem;">
      <div style="display: flex;">
        <div class="yuan"></div>
        <div style="margin-left: 0.2rem;width: 1rem;">现在</div>
      </div>
      <div style="display: flex;margin-left: 0.2rem;">
        <div class="yuan" style="background: #FABD00;"></div>
        <div style="margin-left: 0.2rem;width: 1rem;">目标</div>
      </div>
    </div>
    <div class="line-top"></div>
    <div class="line"></div>
    <div class="line-bottom"></div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      valueDatas: [0.15, 0.05],
      valueY: []
    }
  },
  props: {
    valueData: {
      type: Array,
      default: function () {
        return null
      }
    },
    newValue: {
      type: Number,
      default: function () {
        return null
      }
    }
  },
  watch: {
    valueData () {
      this.drawMAGIC()
    }
  },
  mounted () {
    this.valueDatas = this.valueData
    this.valueY = [(this.valueDatas[0] - 4), this.valueDatas[0], (this.valueDatas[0] + 3)]
    console.log(this.newValue)
    this.drawMAGIC()
  },
  methods: {
    drawMAGIC () {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        // title: {
        //   text: '对数轴示例',
        //   left: 'center'
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
          left: 'right',
          data: ['现在', '以前'],
          textStyle: {
            color: '#8E8E8E'
          }
        },
        xAxis: {
          // name: '体重/kg',
          type: 'category',
          splitLine: { show: false },
          data: ['', '', '', '', '', '']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          type: 'category',
          name: '体重/kg',
          splitLine: { show: false },
          data: this.valueY
        },
        // series: [
        //   {
        //     name: '现在',
        //     type: 'line',
        //     data: 0
        //   },
        //   {
        //     name: '以前',
        //     type: 'line',
        //     data: []
        //   }
        // ],
        textStyle: {
          color: '#8E8E8E'
        },
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
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
  .somatotypeBoxClass {
    color: red;
    margin-top: 0.5rem;
    width: 90%
  }
  .somatotypeClass {
    width: 90%;
    height: 5rem;
    color: white;
  }
  .trafficClass {
    width: 100%;
    height: 5rem;
  }
  .line{
    height: 0.6rem;
    width: 0.08rem;
    background: #00A0E9;
    position: absolute;
    top: 3.15rem;
    left: 2rem;
  }
  .line-top{
    height: 0.15rem;
    border-radius: 0.15rem;
    width: 0.15rem;
    background: white;
    position: absolute;
    top: 3rem;
    left: 1.97rem;
  }
  .line-bottom{
    height: 0.15rem;
    border-radius: 0.15rem;
    width: 0.15rem;
    background: #FABD00;
    position: absolute;
    top: 3.79rem;
    left: 1.97rem;
  }
  .yuan{
    height: 0.2rem;
    border-radius: 0.2rem;
    width: 0.2rem;
    background: white;
    position: relative;
    top: 0.15rem;
  }
</style>
