<template>
    <div :class="{'somatotypeBoxClass': router==='somatotype'}">
      <div id="myChart" :class="router==='somatotype'?'somatotypeClass':(router==='traffic'?'trafficClass':'')"></div>
      <div v-if="router !== 'traffic'">
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
        <div v-if="isValue">
          <div class="line-top"></div>
          <div class="line"></div>
          <div class="line-bottom"></div>
        </div>
        <div v-if="isMuse">
          <div class="line-top-muse"></div>
          <div class="line-muse"></div>
          <div class="line-bottom-muse"></div>
        </div>
        <div style="color: white;position: relative;left: 7.5rem;top: -0.7rem;width: 1.5rem;">骨骼肌量</div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
    }
  },
  props: {
    router: {
      type: String,
      default: function () {
        return null
      }
    },
    valueData: {
      type: Array,
      default: function () {
        return null
      }
    },
    dayY: {
      type: Array,
      default: function () {
        return null
      }
    },
    dayX: {
      type: Array,
      default: function () {
        return null
      }
    },
    isValue: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    name: {
      type: String,
      default: function () {
        return '体重'
      }
    },
    isMuse: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    // trafficStatistics
    statisticsData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  mounted () {
    // console.log(this.valueData)
    if (this.router === 'somatotype') {
      this.drawLises()
    } else if (this.router === 'traffic') {
      this.trafficStatistics()
    }
  },
  watch: {
    valueData () {
      this.drawLises()
    },
    statisticsData () {
      this.trafficStatistics()
    }
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
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        xAxis: {
          name: '肌',
          type: 'category',
          splitLine: { show: false },
          data: this.dayX
        },
        yAxis: {
          name: '体脂率',
          type: 'category',
          splitLine: { show: false },
          data: this.dayY
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        series: [
          {
            name: '增肌指数',
            type: 'line',
            data: this.valueData
          }
        ],
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
    },
    trafficStatistics () {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        tooltip: {
          backgroundColor: 'rgba(38, 38, 38, 0.6)',
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          name: '时间',
          splitLine: { show: false },
          data: ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00']
        },
        yAxis: {
          type: 'value',
          name: '人数',
          boundaryGap: [0, '10%'],
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(142, 142, 142, 0.2)',
              type: 'dashed'
            }
          }
        },
        grid: {
          // top: '12%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        series: [
          {
            name: '人数',
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: this.statisticsData,
            areaStyle: {}
          }
        ],
        textStyle: {
          color: '#fff',
          fontSize: '12'
        },
        color: {
          type: 'linear',
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0, color: 'rgba(247, 217, 127, 0)' // 0% 处的颜色
            },
            {
              offset: 0.4, color: 'rgba(247, 217, 127, 0.6)' // 40% 处的颜色
            },
            {
              offset: 0.8, color: 'rgba(253, 107, 114, 0.9)' // 80% 处的颜色
            },
            {
              offset: 1, color: '#FD6B72' // 100% 处的颜色
            }
          ],
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
    top: 3.0rem;
    left: 1.98rem;
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
  .line-muse{
    height: 0.08rem;
    width: 1.2rem;
    background: #00A0E9;
    position: absolute;
    top: 3.8rem;
    left: 2.15rem;
  }
  .line-top-muse{
    height: 0.15rem;
    border-radius: 0.15rem;
    width: 0.15rem;
    background: #FABD00;
    position: absolute;
    top: 3.78rem;
    left:3.35rem;
  }
  .line-bottom-muse{
    height: 0.15rem;
    border-radius: 0.15rem;
    width: 0.15rem;
    background: white;
    position: absolute;
    top: 3.79rem;
    left: 2rem;
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
