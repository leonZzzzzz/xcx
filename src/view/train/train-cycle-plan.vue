<style lang="less" scoped>
  @import "train-cycle-plan";
</style>
<template>
  <div class="train-cycle-plan">
    <Header title="训练周期计划"></Header>
    <div class="train-cycle-plan-container">
      <!--<div class="select-title" style="border-bottom: 1px solid #e4e4e4">计划卡(强度训练)</div>-->
      <!--<div class="select-title" style="border-bottom: 1px solid #e4e4e4" v-if="!empty">训练周期：{{weekDate[0]}}~ {{weekDate[6]}}</div>-->
      <!--<div class="select-title" style="border-bottom: 1px solid #e4e4e4" v-else>训练时间：{{date}} </div>-->
      <div class="container-card">
        <div class="card-left">
          <img class="card-logo" src="../../assets/images/train/logo.png"/>
        </div>
        <div class="card-right">
          <div class="right-title">广州洋格品非中心</div>
          <div class="right-text">
            <div class="fs-14 mb-5">计划卡（强度训练）</div>
            <div class="fs-12">*此卡仅限个人使用</div>
          </div>
        </div>
      </div>
      <div class="select-title">训练周期计划—已选</div>
      <div class="nowChoice">
        <span v-for="(item,index) of nowChoiceDays" :key="index" :id="'weekNum'+item.weekNum">{{item.week}}</span>
      </div>
      <div class="choice-plan">
        <table>
          <tr style="border: none;">
            <th class="th-title">
              <div class="title-week-text">星期</div>
              <div class="title-diagonal"></div>
              <div class="title-people-num">人数</div>
            </th>
            <th><span :class="{'choiceIt' : (nowChoiceDaysNumber.indexOf(0) !== -1) || nowChoice === 0 }" id="now0"><em id="em0"></em>日</span></th>
            <th><span :class="{'choiceIt' : (nowChoiceDaysNumber.indexOf(1) !== -1) || nowChoice === 1 }" id="now1"><em id="em1"></em>一</span></th>
            <th><span :class="{'choiceIt' : (nowChoiceDaysNumber.indexOf(2) !== -1) || nowChoice === 2 }" id="now2"><em id="em2"></em>二</span></th>
            <th><span :class="{'choiceIt' : (nowChoiceDaysNumber.indexOf(3) !== -1) || nowChoice === 3 }" id="now3"><em id="em3"></em>三</span></th>
            <th><span :class="{'choiceIt' : (nowChoiceDaysNumber.indexOf(4) !== -1) || nowChoice === 4 }" id="now4"><em id="em4"></em>四</span></th>
            <th><span :class="{'choiceIt' : (nowChoiceDaysNumber.indexOf(5) !== -1) || nowChoice === 5 }" id="now5"><em id="em5"></em>五</span></th>
            <th><span :class="{'choiceIt' : (nowChoiceDaysNumber.indexOf(6) !== -1) || nowChoice === 6 }" id="now6"><em id="em6"></em>六</span></th>
          </tr>
          <tr >
            <td class="td-title">少</td>
            <td id="lessTd0"><div class="progress"><div id="less0" class="progress-bar"></div></div></td>
            <td id="lessTd1"><div class="progress"><div id="less1" class="progress-bar"></div></div></td>
            <td id="lessTd2"><div class="progress"><div id="less2" class="progress-bar"></div></div></td>
            <td id="lessTd3"><div class="progress"><div id="less3" class="progress-bar"></div></div></td>
            <td id="lessTd4"><div class="progress"><div id="less4" class="progress-bar"></div></div></td>
            <td id="lessTd5"><div class="progress"><div id="less5" class="progress-bar"></div></div></td>
            <td id="lessTd6"><div class="progress"><div id="less6" class="progress-bar"></div></div></td>
          </tr>
          <tr>
            <td class="td-title">中</td>
            <td><div class="progress"><div id="middle0" class="progress-bar"></div></div></td>
            <td><div class="progress"><div id="middle1" class="progress-bar"></div></div></td>
            <td><div class="progress"><div id="middle2" class="progress-bar"></div></div></td>
            <td><div class="progress"><div id="middle3" class="progress-bar"></div></div></td>
            <td><div class="progress"><div id="middle4" class="progress-bar"></div></div></td>
            <td><div class="progress"><div id="middle5" class="progress-bar"></div></div></td>
            <td><div class="progress"><div id="middle6" class="progress-bar"></div></div></td>
          </tr>
          <tr>
            <td class="td-title">多</td>
            <td><div class="progress"><div id="more0" class="progress-bar"></div></div></td>
            <td><div class="progress"><div id="more1" class="progress-bar"></div></div></td>
            <td><div class="progress"><div id="more2" class="progress-bar"></div></div></td>
            <td><div class="progress"><div id="more3" class="progress-bar"></div></div></td>
            <td><div class="progress"><div id="more4" class="progress-bar"></div></div></td>
            <td><div class="progress"><div id="more5" class="progress-bar"></div></div></td>
            <td><div class="progress"><div id="more6" class="progress-bar"></div></div></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="confirm-btn" @click="gotoModify">
      <img class="edit-icon" src="../../assets/images/train/edit_icon.png"/>
      <div>修改</div>
    </div>
  </div>
</template>

<script>
import TrainAPI from '../../service/train-api'
import Header from '../../components/header/header'
export default {
  name: 'train-cycle-plan',
  data () {
    return {
      nowChoice: '',
      id: '',
      date: '',
      weekDate: [],
      empty: '',
      // daysData: [20, 77, 30, 67, 56, 92, 59],
      // nowChoiceDays: ['星期二', '星期三'],
      // nowChoiceDaysNumber: [2, 3],
      daysData: [0, 0, 0, 0, 0, 0, 0], // 当前日期所在这周内的星期的人数
      nowChoiceDays: [], // 存储中文
      nowChoiceDaysNumber: [], // 存储星期的数字标记
      choiceDaysParams: [] // 存储数据库拿到的星期数组（英文）,
    }
  },
  components: {
    Header
  },
  mounted () {
    this.date = this.$route.query.date
    this.weekDate = this.$route.query.weekDate
    this.getWeekPlan()
    this.getweekPlanCoutWeek()
    this.empty = this.isEmptyObject(this.weekDate)
    console.log(this.weekDate)
  },
  watch: {
    '$route' () {
      this.getWeekPlan()
      this.getweekPlanCoutWeek()
    }
  },
  methods: {
    isEmptyObject (obj) {
      for (var key in obj) {
        return false
      }
      return true
    },
    getweekPlanCoutWeek () {
      TrainAPI.weekPlanCoutWeek({ date: this.date }, res => {
        let result = res
        this.daysData[0] = result.SUNDAY
        this.daysData[1] = result.MONDAY
        this.daysData[2] = result.TUESDAY
        this.daysData[3] = result.WEDNESDAY
        this.daysData[4] = result.THURSDAY
        this.daysData[5] = result.FRIDAY
        this.daysData[6] = result.SATURDAY
        this.showChart()
      })
    },
    getWeekPlan () {
      TrainAPI.weekPlanGetList({ date: this.date }, res => {
        if (!res) {
          this.$router.push({
            path: '/make-plan',
            query: {
              date: this.date,
              weekDate: this.weekDate
            }
          })
          return
        }
        this.id = res.id
        this.choiceDaysParams = res.trainWeeks
        // 转为接口能接受的参数
        var item = ''
        for (let i = 0; i < this.choiceDaysParams.length; i++) {
          switch (this.choiceDaysParams[i]) {
            case 'MONDAY':
              item = { week: '星期一', weekNum: 1 }
              this.nowChoiceDays.push(item)
              this.nowChoiceDaysNumber.push(1)
              break
            case 'TUESDAY':
              item = { week: '星期二', weekNum: 2 }
              this.nowChoiceDays.push(item)
              this.nowChoiceDaysNumber.push(2)
              break
            case 'WEDNESDAY':
              item = { week: '星期三', weekNum: 3 }
              this.nowChoiceDays.push(item)
              this.nowChoiceDaysNumber.push(3)
              break
            case 'THURSDAY':
              item = { week: '星期四', weekNum: 4 }
              this.nowChoiceDays.push(item)
              this.nowChoiceDaysNumber.push(4)
              break
            case 'FRIDAY':
              item = { week: '星期五', weekNum: 5 }
              this.nowChoiceDays.push(item)
              this.nowChoiceDaysNumber.push(5)
              break
            case 'SATURDAY':
              item = { week: '星期六', weekNum: 6 }
              this.nowChoiceDays.push(item)
              this.nowChoiceDaysNumber.push(6)
              break
            case 'SUNDAY':
              item = { week: '星期日', weekNum: 7 }
              this.nowChoiceDays.push(item)
              this.nowChoiceDaysNumber.push(0)
              break
          }
        }
        // console.log(this.nowChoiceDays)
      })
    },
    gotoModify () {
      this.$router.push({
        path: '/modify-plan',
        query: {
          id: this.id,
          nowChoiceDays: this.nowChoiceDays,
          nowChoiceDaysNumber: this.nowChoiceDaysNumber,
          date: this.date,
          weekDate: this.weekDate
        }
      })
    },
    showChart () {
      for (let i = 0; i < this.daysData.length; i++) {
        if (this.daysData[i] > 0 && this.daysData[i] <= 33) {
          let lessTd = document.getElementById('lessTd' + i)
          lessTd.style.borderTop = '.03rem solid #678E0A'
          let dom = document.getElementById('less' + i)
          let height = 3 * this.daysData[i]
          dom.style.height = height + '%'
          dom.style.backgroundColor = '#678E0A'
          let nowId = document.getElementById('now' + i)
          let emId = document.getElementById('em' + i)
          nowId.style.border = '.03rem solid #678E0A'
          emId.style.borderColor = '#678E0A transparent transparent'
          let weekNumId = document.getElementById('weekNum' + i)
          weekNumId.style.border = '.03rem solid #678E0A'
          weekNumId.style.color = '#678E0A'
        } else if (this.daysData[i] > 0 && this.daysData[i] <= 66) {
          let lessTd = document.getElementById('lessTd' + i)
          lessTd.style.borderTop = '.03rem solid #0087B7'
          let dom = document.getElementById('less' + i)
          let dom2 = document.getElementById('middle' + i)
          dom.style.height = '100%'
          dom.style.backgroundColor = '#0087B7'
          let height = 3 * (this.daysData[i] - 33)
          dom2.style.height = height + '%'
          dom2.style.backgroundColor = '#0087B7'
          let nowId = document.getElementById('now' + i)
          let emId = document.getElementById('em' + i)
          nowId.style.border = '.03rem solid #0087B7'
          emId.style.borderColor = '#0087B7 transparent transparent'
          let weekNumId = document.getElementById('weekNum' + i)
          weekNumId.style.border = '.03rem solid #0087B7'
          weekNumId.style.color = '#0087B7'
        } else if (this.daysData[i] > 66) {
          let lessTd = document.getElementById('lessTd' + i)
          lessTd.style.borderTop = '.03rem solid #F08000'
          let dom = document.getElementById('less' + i)
          let dom2 = document.getElementById('middle' + i)
          let dom3 = document.getElementById('more' + i)
          dom.style.height = '100%'
          dom.style.backgroundColor = '#F08000'
          dom2.style.height = '100%'
          dom2.style.backgroundColor = '#F08000'
          let height = 3 * (this.daysData[i] - 66)
          dom3.style.height = height + '%'
          dom3.style.backgroundColor = '#F08000'
          let nowId = document.getElementById('now' + i)
          let emId = document.getElementById('em' + i)
          nowId.style.border = '.03rem solid #F08000'
          emId.style.borderColor = '#F08000 transparent transparent'
          let weekNumId = document.getElementById('weekNum' + i)
          weekNumId.style.border = '.03rem solid #F08000'
          weekNumId.style.color = '#F08000'
        }
      }
    }
  }
}
</script>
