<template>
  <div class="should-partner">
    <Header title="求个搭档"></Header>
    <div class="box-content">
      <ul class="partner-man">
        <li class="demand">
          <div class="demand-label"></div>
          <span>搭档要求</span>
        </li>
        <li class="demand" @click="editStatus? popupVisibleSex=true:''">
          <span style="white-space: nowrap">性别</span>
          <span style="width: 100%;text-align: right">{{values}}</span>
          <img v-if="editStatus" style="height: .334rem;margin-left: .267rem" src="../../assets/images/common/left_seting.png">
        </li>
        <li class="demand" @click="editStatus? popupVisiblegRade=true:''">
          <span style="white-space: nowrap">人数</span>
          <span style="width: 100%;text-align: right">{{valuesOne}}</span>
          <img v-if="editStatus" style="height: .334rem;margin-left: .267rem" src="../../assets/images/common/left_seting.png">
        </li>
        <li>
          <textarea class="textarea" placeholder="给搭档说点什么..." v-model="textMessage"></textarea>
        </li>
      </ul>
      <ul class="partner-man" style="margin-top: .267rem">
        <li class="demand">
          <div class="demand-label"></div>
          <span>训练时间</span>
        </li>
        <li class="demand" @click="onPopupTime()">
          <span style="white-space: nowrap">训练时间</span>
          <span style="width: 100%;text-align: right">{{newTime}}</span>
          <img v-if="editStatus" style="height: .334rem;margin-left: .267rem" src="../../assets/images/common/left_seting.png">
        </li>
      </ul>
      <ul class="partner-man" style="margin-top: .267rem">
        <li class="demand">
          <div class="demand-label"></div>
          <span>训练部位</span>
        </li>
        <li v-for="(item, index1) in partActionList" :key="index1">
          <div class="demand demand-after" @click="item.onStatus=!item.onStatus">
            <span style="white-space: nowrap">{{item.partDisplay}}</span>
            <span style="width: 100%;text-align: right"></span>
            <img style="height: .147rem;" :class="item.onStatus?'rotate-on':'rotate-off'" src="../../assets/images/common/arrows-bottom-icon.png">
          </div>
          <ul v-if="item.onStatus" class="on-hide-content">
            <li v-for="(actionItem, index2) in item.actionList" :key="index2" class="content-cell">
              <div class="cell-img">
                <img class="img-style" :src="actionItem.iconFilePath?actionItem.iconFilePath:actionImg" alt=""/>
              </div>
              <div class="cell-action-name">{{actionItem.actionName}}</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="btn-partner" @click="submitCouse">确定</div>
    <mt-popup v-model="popupVisibleSex" position="bottom" class="popup-picker">
      <div class="picker-head">
        <div @click="popupVisibleSex=false">确定</div>
      </div>
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
    <mt-popup v-model="popupVisiblegRade" position="bottom" class="popup-picker">
      <div class="picker-head">
        <div @click="popupVisiblegRade=false">确定</div>
      </div>
      <mt-picker :slots="slotsOne" @change="onValuesChangeOne"></mt-picker>
    </mt-popup>
    <mt-popup v-model="popupVisibleTime" position="bottom" class="popup-picker">
      <div class="picker-head">
        <div @click="popupVisibleTime=false">确定</div>
      </div>
      <mt-picker :slots="slotsTwo" @change="onValuesChangeTwo"></mt-picker>
    </mt-popup>
    <PopupHint
      :popupHint="popupHint"
      :hintContent="hintContent"
      @left-bth-event="$router.push('/train-have-purchase')"
      @right-bth-event="popupHint=false"
      leftBthName="前往训练"
      :showLeftBth="showLeftBth"
    >
    </PopupHint>
  </div>
</template>

<script>
import TrainAPI from '../../service/train-api'
import { formatDate } from '@lemon/euler-app-h5/src/libs/util'
import { downloadUrl } from '../../libs/http-api'
import $ from 'jQuery'
import Common from '../../mixins/common'
import Header from '../../components/header/header'
import PopupHint from '../../components/popup-hint/popup-hint'
export default {
  mixins: [Common],
  components: {
    Header,
    PopupHint
  },
  data () {
    return {
      type: null, // add 或 edit
      id: null, // 编辑用
      editStatus: true, // 编辑状态
      slots: [
        {
          flex: 1,
          values: ['不限', '男', '女'],
          value: 0, // 默认值 value+defaultIndex兼容安卓及苹果手机
          defaultIndex: 0, // 默认值 value+defaultIndex兼容安卓及苹果手机
          className: 'slot1'
        }
      ],
      slotsOne: [
        {
          flex: 1,
          values: [1, 2],
          value: 0, // 默认值 value+defaultIndex兼容安卓及苹果手机
          defaultIndex: 0, // 默认值 value+defaultIndex兼容安卓及苹果手机
          className: 'slot1'
        }
      ],
      slotsTwo: [
        {
          flex: 1.5,
          values: [], // 年份
          className: 'slot0'
        },
        {
          flex: 1,
          values: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'], // 月份
          value: 0, // 默认值 value+defaultIndex兼容安卓及苹果手机
          defaultIndex: 0, // 默认值 value+defaultIndex兼容安卓及苹果手机
          className: 'slot1'
        },
        {
          flex: 1,
          values: [], // 天数
          value: 0, // 默认值 value+defaultIndex兼容安卓及苹果手机
          defaultIndex: 0, // 默认值 value+defaultIndex兼容安卓及苹果手机
          className: 'slot2'
        },
        {
          flex: 1,
          values: [], // 小时
          value: 0, // 默认值 value+defaultIndex兼容安卓及苹果手机
          defaultIndex: 0, // 默认值 value+defaultIndex兼容安卓及苹果手机
          className: 'slot3'
        },
        {
          divider: true,
          content: ':',
          className: 'slot4'
        },
        {
          flex: 1,
          values: [], // 分钟
          value: 0, // 默认值 value+defaultIndex兼容安卓及苹果手机
          defaultIndex: 0, // 默认值 value+defaultIndex兼容安卓及苹果手机
          className: 'slot5'
        },
        {
          divider: true,
          content: '~',
          className: 'slot6'
        },
        {
          flex: 1,
          values: [], // 小时
          value: 0, // 默认值 value+defaultIndex兼容安卓及苹果手机
          defaultIndex: 0, // 默认值 value+defaultIndex兼容安卓及苹果手机
          className: 'slot7'
        },
        {
          divider: true,
          content: ':',
          className: 'slot8'
        },
        {
          flex: 1,
          values: [], // 分钟
          value: 0, // 默认值 value+defaultIndex兼容安卓及苹果手机
          defaultIndex: 0, // 默认值 value+defaultIndex兼容安卓及苹果手机
          className: 'slot9'
        }
      ],
      popupVisibleSex: false,
      popupVisiblegRade: false,
      popupVisibleTime: false,
      valuesYeas: '',
      values1: '',
      values2: '',
      values: '不限',
      valuesOne: 1,
      valuesTwo: '',
      valuesTwos: '',
      valuesThree: '',
      textMessage: '',
      timeId: null, // 定时任务Id
      courseDate: null, // 选择的年月日
      courseTimes: null, // 选择的时间段
      newTime: null,
      timeStatus: false, // 选择时间状态，首次加载为f，加载后为t
      partActionList: [],
      formPart: '', // 部位--提交表单用
      formTempIds: '', // 提交表单用
      watchMonth: null, // 记录时间选择器选择的月份，判断不变时不改变日的值
      popupHint: false,
      hintContent: null,
      showLeftBth: true
    }
  },
  beforeCreate () {
  },
  watch: {
    popupHint () {
      if (!this.popupHint) {
        this.closeVModal()
      }
    },
    popupVisibleSex () {
      if (!this.popupVisibleSex) {
        this.closeVModal()
      }
    },
    popupVisiblegRade () {
      if (!this.popupVisiblegRade) {
        this.closeVModal()
      }
    },
    popupVisibleTime () {
      if (!this.popupVisibleTime) {
        this.closeVModal()
      }
    }
  },
  mounted () {
  },
  created () {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
    }
    this.type = this.$route.query.type
    if (this.$route.query.type === 'edit') {
      this.editStatus = this.$route.query.editStatus
    }
    this.initTime()
  },
  methods: {
    closeVModal () {
      $('.v-modal').css('display', 'none')
    },
    onPopupTime () {
      if (this.type === 'add') {
        this.popupVisibleTime = true
      } else if (this.type === 'edit') {
        if (this.editStatus) {
          this.slotsTwo[0].flex = 0
          this.slotsTwo[1].flex = 0
          this.slotsTwo[2].flex = 0
          this.popupVisibleTime = true
        }
      }
    },
    initTime () {
      // 获取年份，默认显示今明年
      let y1 = formatDate(new Date(), 'yyyy')
      let y2 = parseInt(y1) + 1
      y2 = y2.toFixed()
      this.slotsTwo[0].values.push(y1, y2)
      // 获取并设置当月天数
      let month = formatDate(new Date(), 'MM')
      // parseInt(number,type)这个函数后面如果不跟第2个参数来表示进制的话，默认是10进制。
      month = parseInt(month, 10)
      this.slotsTwo[2].values = this.getDate(y1, month)
      // console.log(this.slotsTwo[2].values)
      // 设置小时
      let hour = ''
      for (let i = 0; i < 24; i++) {
        if (i < 10) {
          hour = '0' + i
        } else {
          hour = '' + i
        }
        this.slotsTwo[3].values.push(hour)
        this.slotsTwo[7].values.push(hour)
      }
      // 设置分钟
      let minute = ''
      for (let i = 0; i < 60; i++) {
        if (i < 10) {
          minute = '0' + i
        } else {
          minute = '' + i
        }
        this.slotsTwo[5].values.push(minute)
        this.slotsTwo[9].values.push(minute)
      }
      // 记录月份值
      this.watchMonth = month
    },
    onValuesChangeTwo (picker, values) {
      // console.log(values)
      var yyyy = formatDate(new Date(), 'yyyy')
      var MM = formatDate(new Date(), 'MM')
      var dd = formatDate(new Date(), 'dd')
      var hh = formatDate(new Date(), 'hh')
      var mm = formatDate(new Date(), 'mm')
      if (!this.timeStatus) {
        this.timeStatus = true
        // 设置时间选择器初始化时已选择的时间
        if (this.type === 'add') {
          // 设置月份默认值
          this.slotsTwo[1].value = parseInt(MM) - 1
          this.slotsTwo[1].defaultIndex = parseInt(MM) - 1
          // 设置天数默认值
          this.slotsTwo[2].value = parseInt(dd) - 1
          this.slotsTwo[2].defaultIndex = parseInt(dd) - 1
          // 设置小时默认值
          this.slotsTwo[3].value = parseInt(hh)
          this.slotsTwo[3].defaultIndex = parseInt(hh)
          this.slotsTwo[7].value = parseInt(hh)
          this.slotsTwo[7].defaultIndex = parseInt(hh)
          // 设置分钟默认值
          this.slotsTwo[5].value = parseInt(mm)
          this.slotsTwo[5].defaultIndex = parseInt(mm)
          this.slotsTwo[9].value = parseInt(mm)
          this.slotsTwo[9].defaultIndex = parseInt(mm)
          this.courseDate = values[0] + '-' + MM + '-' + dd
          this.courseTimes = hh + ':' + mm + ',' + hh + ':' + mm
          this.newTime = values[0] + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ' ~ ' + hh + ':' + mm
        } else if (this.type === 'edit') {
          TrainAPI.nowList({ id: this.id }, res => {
            // 获取性别
            if (res[0].sexLimit === 'MAN') {
              this.values = '男'
              this.slots[0].value = 1
              this.slots[0].defaultIndex = 1
            } else if (res[0].sexLimit === 'WOMAN') {
              this.values = '女'
              this.slots[0].value = 2
              this.slots[0].defaultIndex = 2
            }
            // 获取人数
            this.valuesOne = res[0].peopleLimit - 1
            this.slotsOne[0].value = res[0].peopleLimit - 2
            this.slotsOne[0].defaultIndex = res[0].peopleLimit - 2
            // 获取备注
            this.textMessage = res[0].description
            // 获取训练时间
            this.courseDate = formatDate(new Date(res[0].courseDate), 'yyyy-MM-dd')
            this.courseTimes = res[0].courseTimes[0] + ',' + res[0].courseTimes[1]
            this.newTime = this.courseDate + ' ' + res[0].courseTimes[0] + ' ~ ' + res[0].courseTimes[1]
            // 设置年份
            this.setYear(parseInt(this.courseDate.split('-')[0]))
            // 获取当月的天数
            this.slotsTwo[2].values = this.getDate(parseInt(this.courseDate.split('-')[0]), parseInt(this.courseDate.split('-')[1]))
            // console.log(this.slotsTwo[2].values)
            // 设置月份
            this.slotsTwo[1].value = parseInt(this.courseDate.split('-')[1]) - 1
            this.slotsTwo[1].defaultIndex = parseInt(this.courseDate.split('-')[1]) - 1
            // 设置天数
            this.slotsTwo[2].value = parseInt(this.courseDate.split('-')[2]) - 1
            this.slotsTwo[2].defaultIndex = parseInt(this.courseDate.split('-')[2]) - 1
            // 设置小时
            this.slotsTwo[3].value = parseInt(res[0].courseTimes[0].split(':')[0])
            this.slotsTwo[3].defaultIndex = parseInt(res[0].courseTimes[0].split(':')[0])
            this.slotsTwo[7].value = parseInt(res[0].courseTimes[1].split(':')[0])
            this.slotsTwo[7].defaultIndex = parseInt(res[0].courseTimes[1].split(':')[0])
            // 设置分钟默认值
            this.slotsTwo[5].value = parseInt(res[0].courseTimes[0].split(':')[1])
            this.slotsTwo[5].defaultIndex = parseInt(res[0].courseTimes[0].split(':')[1])
            this.slotsTwo[9].value = parseInt(res[0].courseTimes[1].split(':')[1])
            this.slotsTwo[9].defaultIndex = parseInt(res[0].courseTimes[1].split(':')[1])
            // 记录月份值
            this.watchMonth = parseInt(this.courseDate.split('-')[1])
            // console.log(this.slotsTwo)
          })
        }
      } else {
        // 选择月份改变日、设置年月时分默认值
        // 判断选择的年月不能小于当前年月
        let time1 = parseInt(values[0]) * 100 + parseInt(values[1])
        let time2 = parseInt(yyyy) * 100 + parseInt(MM)
        if (parseInt(this.watchMonth) !== parseInt(values[1]) && (time1 >= time2)) {
          // console.log(values[0], values[1], values[2])
          this.slotsTwo[2].values = this.getDate(values[0], values[1])
          // console.log(this.slotsTwo[2].values)
          // 替换了 slotsTwo[2].values 需重新设置默认值，否则选择后会跳到默认值
          // 设置年份
          this.setYear(parseInt(values[0]))
          // 设置月份
          this.slotsTwo[1].value = parseInt(values[1]) - 1
          this.slotsTwo[1].defaultIndex = parseInt(values[1]) - 1
          // 设置日
          if (this.slotsTwo[2].values.length < parseInt(values[2])) {
            this.slotsTwo[2].value = this.slotsTwo[2].values.length - 1
            this.slotsTwo[2].defaultIndex = this.slotsTwo[2].values.length - 1
            let value = this.slotsTwo[2].values.length
            picker.setSlotValue(2, value.toFixed())
            // console.log(value.toFixed())
          } else {
            this.slotsTwo[2].value = parseInt(values[2]) - 1
            this.slotsTwo[2].defaultIndex = parseInt(values[2]) - 1
          }
          // 设置小时
          this.slotsTwo[3].value = parseInt(values[3])
          this.slotsTwo[3].defaultIndex = parseInt(values[3])
          this.slotsTwo[7].value = parseInt(values[5])
          this.slotsTwo[7].defaultIndex = parseInt(values[5])
          // 设置分钟默认值
          this.slotsTwo[5].value = parseInt(values[4])
          this.slotsTwo[5].defaultIndex = parseInt(values[4])
          this.slotsTwo[9].value = parseInt(values[6])
          this.slotsTwo[9].defaultIndex = parseInt(values[6])
          // 记录月份值
          this.watchMonth = parseInt(values[1])
          // console.log(this.slotsTwo[2])
        }
        // 判断月份不能小于当月
        if ((parseInt(values[0]) === parseInt(yyyy)) && (parseInt(values[1]) < parseInt(MM))) {
          // 设置values[1]为MM值
          picker.setSlotValue(1, MM)
        }
        // 判断天数不能小于当天
        if ((parseInt(values[0]) === parseInt(yyyy)) && (parseInt(values[1]) === parseInt(MM)) && (parseInt(values[2]) < parseInt(dd))) {
          picker.setSlotValue(2, dd)
        }
        // 判断第一个小时不能小于当前时间
        if ((parseInt(values[0]) === parseInt(yyyy)) && (parseInt(values[1]) === parseInt(MM)) && (parseInt(values[2]) === parseInt(dd)) && (parseInt(values[3]) < parseInt(hh))) {
          picker.setSlotValue(3, hh)
        }
        // 判断第一个分钟不能小于当前时间
        if ((parseInt(values[0]) === parseInt(yyyy)) && (parseInt(values[1]) === parseInt(MM)) && (parseInt(values[2]) === parseInt(dd)) && (parseInt(values[3]) === parseInt(hh)) && (parseInt(values[4]) < parseInt(mm))) {
          picker.setSlotValue(4, mm)
        }
        // 判断第二个小时不能小于第一个小时的值
        if (parseInt(values[5]) < parseInt(values[3])) {
          picker.setSlotValue(5, values[3])
        }
        // 判断第二个分钟：第1个小时与第二个小时相等且第二个分钟值少于第一个分钟值
        if ((parseInt(values[3]) === parseInt(values[5])) && parseInt(values[6]) < parseInt(values[4])) {
          picker.setSlotValue(6, values[4])
        }
        this.courseDate = values[0] + '-' + values[1] + '-' + values[2]
        this.courseTimes = values[3] + ':' + values[4] + ',' + values[5] + ':' + values[6]
        // console.log(this.courseTimes)
        this.newTime = values[0] + '-' + values[1] + '-' + values[2] + ' ' + values[3] + ':' + values[4] + ' ~ ' + values[5] + ':' + values[6]
        // console.log(this.newTime)
      }
      // 清除重复加载问题
      if (this.courseDate) {
        clearTimeout(this.timeId)
        this.timeId = setTimeout(() => {
          this.getActionList()
        }, 100)
      }
    },
    // 获取月份的天数，返回天数数组
    getDate (year, month) {
      let getDate = new Date(year, month, 0).getDate()
      let day = ''
      let dayArr = []
      for (let i = 1; i <= getDate; i++) {
        if (i < 10) {
          day = '0' + i
        } else {
          day = '' + i
        }
        dayArr.push(day)
      }
      // console.log(dayArr)
      return dayArr
    },
    // 设置年份默认值
    setYear (year) {
      let y1 = parseInt(formatDate(new Date(), 'yyyy'))
      let y2 = y1 + 1
      if (y1 === year) {
        this.slotsTwo[0].value = 0
        this.slotsTwo[0].defaultIndex = 0
      } else if (y2 === year) {
        this.slotsTwo[0].value = 1
        this.slotsTwo[0].defaultIndex = 1
      }
    },
    onValuesChangeOne (picker, values) {
      this.valuesOne = values[0]
    },
    onValuesChange (picker, values) {
      this.values = values[0]
    },
    getActionList () {
      TrainAPI.tempAddlist({ trainDate: this.courseDate }, res => {
        this.handleList(res)
      })
    },
    // 处理部位动作列表
    handleList (res) {
      let partArr = res.list
      this.partActionList = []
      this.formPart = ''
      this.formTempIds = ''
      for (let i in partArr) {
        if (partArr.hasOwnProperty(i)) {
          this.formPart += i + ','
          let item = partArr[i]
          for (let j = 0; j < item.length; j++) {
            if (item[j].iconFilePath) {
              item[j].iconFilePath = downloadUrl + item[j].iconFilePath
            }
          }
          if (i === 'CHEST') {
            this.partActionList.push({ partDisplay: '胸部', part: 'CHEST', actionList: item, onStatus: false })
          } else if (i === 'BACK') {
            this.partActionList.push({ partDisplay: '背部', part: 'BACK', actionList: item, onStatus: false })
          } else if (i === 'SHOULDER') {
            this.partActionList.push({ partDisplay: '肩部', part: 'SHOULDER', actionList: item, onStatus: false })
          } else if (i === 'LEG') {
            this.partActionList.push({ partDisplay: '腿部', part: 'LEG', actionList: item, onStatus: false })
          } else if (i === 'BELLY') {
            this.partActionList.push({ partDisplay: '腹部', part: 'BELLY', actionList: item, onStatus: false })
          }
        }
      }
      for (let i = 0; i < res.tempIds.length; i++) {
        this.formTempIds += res.tempIds[i] + ','
      }
      // 删除最后一个逗号
      this.formPart = this.formPart.substring(0, this.formPart.lastIndexOf(','))
      this.formTempIds = this.formTempIds.substring(0, this.formTempIds.lastIndexOf(','))
      // console.log(this.formTempIds)
    },
    submitCouse () {
      // 判断是否创建的课程是否在今明两天内
      let courseDate = new Date(this.courseDate + ' 00:00:00').getTime()
      let today = new Date(formatDate(new Date(), 'yyyy-MM-dd 00:00:00')).getTime()
      let tomorrow = today + 24 * 60 * 60 * 1000
      if ((courseDate !== today) && (courseDate !== tomorrow)) {
        this.showLeftBth = false
        this.hintContent = '训练时间只能选择今天或明天哦'
        this.popupHint = true
        return
      }
      // 判断是否有课程
      if (!this.formPart || !this.formTempIds) {
        this.showLeftBth = true
        this.hintContent = '请先在训练页面创建计划及录入计划组数'
        this.popupHint = true
        return
      }
      let params = {}
      if (this.type === 'add') {
        params = {
          userId: this.$store.state.user.memberId,
          courseDate: this.courseDate,
          courseTimes: this.courseTimes,
          trainParts: this.formPart,
          sexLimit: this.values === '不限' ? '' : (this.values === '男' ? 'MAN' : 'WOMAN'),
          description: this.textMessage,
          tempIds: this.formTempIds,
          peopleLimit: this.valuesOne + 1
        }
        TrainAPI.couseUserAdd(params, res => {
          this.$router.go(-1)
        }, error => {
          this.showLeftBth = false
          this.hintContent = error.errorMsg
          this.popupHint = true
        })
      } else if (this.type === 'edit') {
        params = {
          id: this.id,
          courseDate: this.courseDate,
          courseTimes: this.courseTimes,
          trainParts: this.formPart,
          sexLimit: this.values === '不限' ? '' : (this.values === '男' ? 'MAN' : 'WOMAN'),
          description: this.textMessage,
          tempIds: this.formTempIds,
          peopleLimit: this.valuesOne + 1
        }
        TrainAPI.couseUpdate(params, res => {
          this.$router.go(-1)
        }, error => {
          this.showLeftBth = false
          this.hintContent = error.errorMsg
          this.popupHint = true
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import "should-partner.less";
</style>
