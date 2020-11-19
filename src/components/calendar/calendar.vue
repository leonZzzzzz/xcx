<template>
  <div style="background-color: #1C1C1C;color: white;">
    <div class="year_str" v-if="showYear">{{yearMonthStr}}</div>
    <div class="week-slider">
      <div class="sliders" ref="sliders" @touchstart="touchstartHandle" @touchmove="touchmoveHandle" @touchend="touchendHandle">
        <div v-for="(item, index) in dates" :key="index+'_a'">
          <div class="slider" :style="getTransform(index)" @webkit-transition-end="onTransitionEnd(index)" @transitionend="onTransitionEnd(index)">
            <div class="day" v-for="(day, index) in getDaies(item.date)" :key="index+'_b'">
              <div class="dayAfter"
                   @click.stop="dayClickHandle(day.date)">
                <div style="font-size: .374rem;margin-bottom: .214rem">{{day.week}}</div>
                <div style="font-size: .48rem" :class="day.date === clickDate?'click-color':(day.action||day.isToday?'color-f6bf3c':'')">
                  {{day.action ? day.action : (day.isToday ? '今' : day.date.split('-')[2])}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'calendar',
  props: {
    // 类型：按周(week) || 购卡开始日期(cardStartDate)
    type: {
      type: String,
      default: 'week'
    },
    // 默认显示时间
    defaultDate: {
      type: String,
      default: null
    },
    // 点击的时间
    clickDate: {
      type: String,
      default: null
    },
    // 当前年月
    showYear: {
      type: Boolean,
      default: false
    },
    // 历史训练部位
    historyPart: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      dates: [],
      direction: null,
      activeIndex: 1,
      isAnimation: false,
      yearMonthStr: '',
      start: {
        x: null,
        y: null
      },
      end: {
        x: null,
        y: null
      },
      distan: {
        x: 0,
        y: 0
      },
      sliderWidth: 0
    }
  },
  watch: {
    defaultDate () {
      // console.log(1111)
      let vm = this
      this.dates.push(
        {
          date: moment(vm.defaultDate).subtract(7, 'd').format('YYYY-MM-DD')
        },
        {
          date: vm.defaultDate
        },
        {
          date: moment(vm.defaultDate).add(7, 'd').format('YYYY-MM-DD')
        }
      )
      // console.log(this.dates)
    },
    dates: {
      handler: function (newVal, oldVal) {
        this.yearMonthStr = moment(newVal[1].date).format('YYYY-MM')
      },
      deep: true
    }
  },
  mounted () {
    this.sliderWidth = this.$refs.sliders.offsetWidth
  },
  created () {
    // console.log(this.defaultDate)
  },
  methods: {
    /**
       *获取制定日期的当前周的日期数据
       */
    getDaies (date) {
      let vm = this
      let arr = []
      let weekOfDate = Number(moment(date).format('E'))
      let weeks = ['日', '一', '二', '三', '四', '五', '六']
      let today = moment()
      let defaultDay = moment(vm.defaultDate)
      if (this.type === 'cardStartDate') {
        // 按购卡开始日期
        for (let i = 0; i < 7; i++) {
          // 获取日期
          let _theDate = moment(date).subtract(weekOfDate - i - weekOfDate, 'd')
          // 转换日期格式为yyyy-MM-dd
          let dateFormat = _theDate.format('YYYY-MM-DD')
          // 获取日期是星期几
          let getWeek = Number(moment(_theDate.format('YYYY-MM-DD')).format('E'))
          if (getWeek === 7) {
            getWeek = 0
          }
          arr.push({
            date: dateFormat,
            week: weeks[getWeek],
            // 今天日期
            isToday: dateFormat === today.format('YYYY-MM-DD'),
            // isDay: _theDate.format('E') === defaultDay.format('E')
            // 默认开始日期
            defaultDay: dateFormat === defaultDay.format('YYYY-MM-DD'),
            action: this.getAction(dateFormat)
          })
        }
      } else if (this.type === 'week') {
        // 按周日开始日期
        if (weekOfDate === 7) {
          weekOfDate = 0
        }
        for (var i = 0; i < 7; i++) {
          let _theDate = moment(date).subtract(weekOfDate - i, 'd')
          arr.push({
            date: _theDate.format('YYYY-MM-DD'),
            week: weeks[i],
            isToday: _theDate.format('YYYY-MM-DD') === today.format('YYYY-MM-DD'),
            isDay: _theDate.format('E') === defaultDay.format('E')
          })
        }
      }
      // console.log(arr)
      return arr
    },

    /**
     *获取训练日期对应的部位
     */
    getAction (date) {
      // console.log(date)
      if (this.historyPart.length) {
        for (let i = 0; i < this.historyPart.length; i++) {
          if (this.historyPart[i].date === date) {
            return this.historyPart[i].partName
          }
        }
      }
    },

    /**
       *根据索引计算出样式
       */
    getTransform (index) {
      let vm = this
      let style = {}
      if (index === vm.activeIndex) {
        style['transform'] = 'translateX(' + vm.distan.x + 'px)'
      }
      if (index < vm.activeIndex) {
        style['transform'] = 'translateX(-100%)'
      }
      if (index > vm.activeIndex) {
        style['transform'] = 'translateX(100%)'
      }
      style['transition'] = vm.isAnimation ? 'transform .5s ease-out' : 'none'
      return style
    },

    /**
       * touchstart handle
       */
    touchstartHandle (event) {
      let vm = this

      let touch = event.touches[0]
      vm.start.x = touch.pageX
      vm.start.y = touch.pageY
    },

    /**
       * touchmove handle
       */
    touchmoveHandle (event) {
      let vm = this

      let touch = event.touches[0]
      vm.isAnimation = true
      vm.end.x = touch.pageX
      vm.end.y = touch.pageY
      vm.distan.x = vm.end.x - vm.start.x
      vm.distan.y = vm.end.y - vm.start.y
      let dom = vm.distan.x < 0 ? this.$refs.sliders.children[2] : this.$refs.sliders.children[0]
      if (vm.distan.x < 0) {
        dom.style['transform'] = 'translateX(' + (vm.sliderWidth + vm.distan.x) + 'px)'
      } else {
        dom.style['transform'] = 'translateX(' + (-vm.sliderWidth + vm.distan.x) + 'px)'
      }
    },

    /**
       * touchend handle
       */
    touchendHandle (event) {
      let vm = this

      let touch = event.changedTouches[0]
      vm.isAnimation = true
      vm.end.x = touch.pageX
      vm.end.y = touch.pageY
      vm.distan.x = vm.end.x - vm.start.x
      vm.distan.y = vm.end.y - vm.start.y

      vm.getTouchDirection(vm.distan.x, vm.distan.y)
      if (vm.direction === 'left') {
        vm.activeIndex = 2
      } else if (vm.direction === 'right') {
        vm.activeIndex = 0
      } else {
        for (var i = 0; i < this.$refs.sliders.children.length; i++) {
          this.$refs.sliders.children[i].style['transform'] = 'translateX(' + (i * 100 - 100) + '%)'
        }
      }
      vm.distan.x = 0
      vm.distan.y = 0
      vm.direction = null
    },

    onTransitionEnd (index) {
      let vm = this
      vm.isAnimation = false
      if (index === 1 && this.activeIndex === 2) {
        vm.dates.push({
          date: moment(vm.dates[vm.activeIndex].date).add(7, 'd').format('YYYY-MM-DD')
        })
        vm.dates.shift()
        vm.activeIndex = 1
      } else if (index === 1 && this.activeIndex === 0) {
        vm.dates.unshift({
          date: moment(vm.dates[vm.activeIndex].date).subtract(7, 'd').format('YYYY-MM-DD')
        })
        vm.dates.pop()
        vm.activeIndex = 1
      }
    },

    /**
       * getAngle 计算角度
       */
    getAngle (x, y) {
      return Math.atan2(y, x) * 180 / Math.PI
    },

    /**
       * getTouchDirection 获取滑动方向
       */
    getTouchDirection (x, y) {
      let vm = this
      if (Math.abs(x) > 80) {
        let angle = vm.getAngle(x, y)
        if (angle >= -45 && angle <= 45) {// 向右
          vm.direction = 'right'
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {// 向左
          vm.direction = 'left'
        }
      }
    },

    dayClickHandle (date) {
      this.$emit('dateClick', date)
      // this.$emit('update:defaultDate', date)
    }

  }
}
</script>
<style lang="less" scoped>
  .year_str{
    height: 1.067rem; line-height: 1.067rem; text-align: center; font-size: .48rem;
  }
  .week-slider{
    width: 100%; height: 1.959rem; overflow: hidden;
    .sliders{
      position: relative;
      .slider{
        height: 1.959rem; width: 100%; display: flex; position: absolute; top: 0; left: 0; overflow: hidden;
        .day{
          flex: 1;
          .dayAfter{
            height: 1.959rem; width: 100%; text-align: center; display: flex; flex-direction: column; justify-content: center;
            .color-f6bf3c {
              color: #F6BF3C;
            }
            .click-color {
              color: #57C9FF!important;
            }
            /*&.sameDay{*/
              /*background-color: #999; color: #FFF;*/
            /*}*/
          }
        }
      }
    }
  }
</style>
