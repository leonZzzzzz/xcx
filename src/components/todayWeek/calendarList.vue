<template>
  <div class="week-header">
    <div class="week-today">
      <ul style="display: flex;color: #8E8E8E;justify-content: space-between;margin-right: 0.9rem;">
        <li v-for="item in weekList" :key="item.id" style="display: flex;padding-left: 0.8rem;width: 0.5rem;"> {{item}}</li>
      </ul>
      <ul style="display: flex;color: #FFFFFF;margin-top: 0.1rem;justify-content: space-between;margin-right: 0.95rem;">
        <li v-for="(item,index) in todayList" :key="index" @click="clickDay(index)" style="display: flex;padding-left: 0.84rem;width: 0.5rem;">
          <span :style="{color:colorFont ? 'red':'#fffff'}">{{item}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      colorFont: false,
      weekList: ['日', '一', '二', '三', '四', '五', '六'],
      todayList: [],
      backList: [],
      clickToday: '',
      today: ''
    }
  },
  methods: {
    clickDay (index) {
      let now = new Date()
      let mun = index.toString()
      let one
      for (let i in this.todayList) {
        if (i === mun) {
          one = this.todayList[i]
          if (one === '今') {
            one = this.today
          }
        }
      }
      this.clickToday = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + one
      this.$emit('today', this.clickToday)
    },
    getWeek () {
      let now = new Date() // 当前时间
      let day = now.getDay() + 1// 返回当前日期星期几（0-6）
      let date = now.getDate() // 返回当前几号（1-31）
      if (day === 1) {
        return now
      }
      if (day === 0) {
        now.setDate(date - 6)
      } else {
        now.setDate(date - day + 1)
        return now
      }
    },
    //  0-6转换为中文
    getDayName (today) {
      let day = parseInt(today)
      if (isNaN(day) || day < 0 || day > 6) {
        return false
      }
      let weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      return weekday[today]
    },
    jindeal (params) {
      console.log(params)
      let d = this.getWeek()
      let date = d.getDate() + 1
      if (params === date) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    let d = this.getWeek()
    let date = d.getDate() + 1
    this.today = date
    let arr = []
    for (let i = 0; i < 7; i++) {
      arr.push(d.getDate())
      d.setDate(d.getDate() + 1)
    }
    this.todayList = arr
    let now = new Date()
    let day = now.getDate()
    for (let i in this.todayList) {
      if (this.todayLst[i] === day) {
        this.todayLit[i] = '今'
        // this.colorFont = true}
        // console.og(this.todayList[i])
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .week-header{
    margin-bottom: 0.5rem;
    padding-top: 0.3rem;
    height: 2.8rem;
    background-color: #1C1C1C;
    .week-today {
    }
  }
</style>
