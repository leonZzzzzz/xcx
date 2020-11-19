<style lang="less">
  @import "record-aerobic-adtion";
</style>
<template>
  <div class="record-aerobic-adtion">
    <div class="head-bar-to">
      <div class="head-theme-b-left" @click="$router.go(-1)">
        <img style="position: relative; left: 0.5rem; width: 0.25rem;" src="../../assets/images/common/left_icon_black_big.png"/>
      </div>
      <div class="">
        <div class="fs-5">记录有氧训练</div>
      </div>
    </div>
    <div class=" box-content-logging-data" style="background-color: #262626;margin-top: 0.3rem;">
      <div class="cell-item" style="background-color: #262626;">
        <div class="title">有氧运动:</div>
        <div class="content">
          <input type="text" v-model="sport" placeholder="项目" style="background-color: #262626; color: white;" @click="popupVisibleSport = true"/>
        </div>
      </div>
      <div class="cell-item" style="background-color: #262626;">
        <div class="title">运动场地：</div>
        <div class="content">
          <input type="text"  placeholder="场地" style="background-color: #262626; color: white;" v-model="place"/>
        </div>
      </div>
      <div class="cell-item" style="background-color: #262626;">
        <div class="title">运动时间：</div>
        <div class="content" style="display: flex;color: white">
          <input type="text" placeholder="开始时间" v-model="timeGet" @click="popupVisibleTime = true" style="width: 1.5rem;text-align: center;background-color: #262626;color: white;font-size: 0.35rem;"/>~<input type="text" placeholder="结束时间" v-model="timePost" style="width: 1.5rem;text-align: center;background-color: #262626;color: white;font-size: 0.35rem;"/>
        </div>
      </div>
    </div>
    <mt-popup v-model="popupVisibleTime" position="bottom" style="width: 100%" :modal="false">
      <div style="margin-left: 0.3rem;padding-top: 0.3rem;font-size: 0.35rem;" @click="popupVisibleTime=false">确定</div>
      <div style="margin-left: 3rem;font-size: 0.35rem;position: absolute;top: 0.32rem;">今天是：{{today}}</div>
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
    <mt-popup v-model="popupVisibleSport" position="bottom" style="width: 100%" :modal="false">
      <div style="margin-left: 0.3rem;padding-top: 0.3rem;font-size: 0.35rem;" @click="popupVisibleSport=false">确定</div>
      <mt-picker :slots="slotsOne" @change="onValuesChangeOne"></mt-picker>
    </mt-popup>
    <div class="foot-botton" @click="save"><div class="btn">记录</div></div>
    <!-- 开始时间插件-->
    <mt-datetime-picker
    type="datetime"
    ref="pickerStart"
    hourFormat="{value}时"
    minuteFormat="{value}分"
    @confirm="handelStartTime"
    :startDate="startDate"
  >
  </mt-datetime-picker>
    <!--结束时间插件-->
    <mt-datetime-picker
      type="datetime"
      ref="pickerEnd"
      hourFormat="{value}时"
      minuteFormat="{value}分"
      @confirm="handelEndTime"
      :startDate="startDate"
    >
    </mt-datetime-picker>
  </div>
</template>

<script>
import TrainAPI from '../../service/train-api'
import { Toast } from 'mint-ui'
export default {
  name: 'record-aerobic-adtion',
  data () {
    return {
      place: '',
      sport: '',
      today: '',
      timeGet: '',
      timePost: '',
      todayend: '',
      popupVisibleTime: false,
      popupVisibleSport: false,
      slots: [
        {
          flex: 1,
          values: ['开始时间', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'],
          className: 'slot1'
        },
        {
          flex: 1,
          values: ['结束时间', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'],
          className: 'slot1'
        }
      ],
      slotsOne: [
        {
          flex: 1,
          values: ['游泳', '电竞', '羽毛球'],
          className: 'slot1'
        }
      ],
      startDate: new Date('2018-12-somatotype')
    }
  },
  mounted () {
  },
  methods: {
    onValuesChange (picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0])
      }
      this.timeGet = values[0]
      this.timePost = values[1]
    },
    onValuesChangeOne (picker, values) {
      this.sport = values[0]
    },
    save () {
      TrainAPI.aerobicsAdd({ sportClass: this.sport, sportStartTime: this.today, sportEndTime: this.todayend, place: this.place }, res => {
        Toast('有氧运动添加成功')
        this.$router.push('/train-index')
      })
    },
    openPickerStart () {
      this.$refs.pickerStart.open()
    },
    openPickerEnd () {
      this.$refs.pickerEnd.open()
    },
    handelStartTime (d) {
      let year = d.getFullYear()
      if (year < 10) {
        year = '0' + year
      }
      let month = d.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      let date = d.getDate()
      if (date < 10) {
        date = '0' + date
      }
      let hour = d.getHours()
      if (hour < 10) {
        hour = '0' + hour
      }
      let minutes = d.getMinutes()
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      // 日期和时间中间加入空格
      let time = []
      time[0] = year + '-' + month + '-' + date
      time[1] = hour + ':' + minutes
      let newDate = time.join(' ')
      this.addData.sportStartTime = newDate
    },
    handelEndTime (d) {
      let year = d.getFullYear()
      if (year < 10) {
        year = '0' + year
      }
      let month = d.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      let date = d.getDate()
      if (date < 10) {
        date = '0' + date
      }
      let hour = d.getHours()
      if (hour < 10) {
        hour = '0' + hour
      }
      let minutes = d.getMinutes()
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      // 日期和时间中间加入空格
      let time = []
      time[0] = year + '-' + month + '-' + date
      time[1] = hour + ':' + minutes
      let newDate = time.join(' ')
      this.addData.sportEndTime = newDate
    },
    getToday () {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      month = (month < 10 ? '0' + month : month)
      let mydate = (year.toString() + '/' + month.toString() + '/' + day.toString())
      this.today = mydate + this.timeGet
      this.todayend = mydate + this.timePost
      console.log(this.today)
    }
  },
  created () {
    this.getToday()
  }
}
</script>

<style scoped>

</style>
