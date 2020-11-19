<style lang="less" scoped>
  @import "traffic";
</style>
<template>
  <div class="traffic">
    <Header title="洋格客流量"></Header>
    <div class="traffic-content">
      <calendar
        type="week"
        class="calendar"
        @dateClick="dateClick"
        :showYear="true"
        :defaultDate.sync="default_date"
        :clickDate.sync="clickDate">
      </calendar>
      <echarts router="traffic" style="display: flex;justify-content: center" :statisticsData="statisticsData"></echarts>
    </div>
  </div>
</template>

<script>
import echarts from '../../components/echarts/echarts'
import calendar from '../../components/calendar/calendar.vue'
import { formatDate } from '@lemon/euler-app-h5/src/libs/util'
import Header from '../../components/header/header'
import UserAPI from '../../service/user-api'
export default {
  name: 'traffic',
  data () {
    return {
      default_date: null,
      clickDate: null, // 点击日期
      statisticsData: []
      // dataTime: ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00']
    }
  },
  components: {
    echarts,
    calendar,
    Header
  },
  created () {
  },
  mounted () {
    this.default_date = formatDate(new Date(), 'yyyy-MM-dd')
    this.clickDate = formatDate(new Date(), 'yyyy-MM-dd')
    this.getCustomerFlow()
  },
  methods: {
    dateClick (date) {
      // console.log(date)
      this.clickDate = date
      this.getCustomerFlow()
    },
    getCustomerFlow () {
      this.statisticsData = []
      UserAPI.customerFlow({ flowDate: this.clickDate }, res => {
        // let time = []
        for (let i in res) {
          if (res.hasOwnProperty(i)) {
            this.statisticsData.push(res[i])
          }
        }
      })
    }
  }
}
</script>
