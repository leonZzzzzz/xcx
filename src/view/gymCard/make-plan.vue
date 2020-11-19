<style lang="less" scoped>
  @import "make-plan";
</style>
<template>
  <div class="make-plan">
    <div class="head-bar head-theme-b">
      <div class="head-theme-b-left">
        <i class="icon-image icon-back" @click="$router.push('/train-have-purchase')"></i>
      </div>
      <div class="head-theme-b-center">
        <div class="fs-5">制定计划</div>
      </div>
      <div slot="right" class="head-theme-b-right">
      </div>
    </div>
    <div class="pt-45 box-content">
      <div class="notice">
        * 其他说明：①建议用户前五节课使用私教 ②用户可以尝试一周训练四次 ③三分练七分食
      </div>
      <div class="select-title">已选：计划卡(强度训练)</div>
      <div class="card-explain">
        <!--<em>◆</em>-->
        <em></em>
        <p>1、必须按照训练计划进行强度训练，如果训练计划日不到场训练，系统仍然扣除当日训练次数。</p>
        <p>2、制定自己的训练计划，提交计划后不能修改。</p>
      </div>
      <div class="select-title">制定训练周期计划</div>
      <div class="select-title" style="border-bottom: 1px solid #e4e4e4" v-if="!empty">训练时间周期:{{weekDate[0]}}~ {{weekDate[6]}}</div>
      <div class="choice-plan">
        <table>
          <tr style="border: none">
            <th>人数/星期</th>
            <th><span @click="choiceIt(0)" :class="{'choiceIt' : (nowChoiceDaysNumber.indexOf(0) !== -1) || nowChoice === 0 }" id="now0"><em id="em0"></em>日</span></th>
            <th><span @click="choiceIt(1)" :class="{'choiceIt' : (nowChoiceDaysNumber.indexOf(1) !== -1) || nowChoice === 1 }" id="now1"><em id="em1"></em>一</span></th>
            <th><span @click="choiceIt(2)" :class="{'choiceIt' : (nowChoiceDaysNumber.indexOf(2) !== -1) || nowChoice === 2 }" id="now2"><em id="em2"></em>二</span></th>
            <th><span @click="choiceIt(3)" :class="{'choiceIt' : (nowChoiceDaysNumber.indexOf(3) !== -1) || nowChoice === 3 }" id="now3"><em id="em3"></em>三</span></th>
            <th><span @click="choiceIt(4)" :class="{'choiceIt' : (nowChoiceDaysNumber.indexOf(4) !== -1) || nowChoice === 4 }" id="now4"><em id="em4"></em>四</span></th>
            <th><span @click="choiceIt(5)" :class="{'choiceIt' : (nowChoiceDaysNumber.indexOf(5) !== -1) || nowChoice === 5 }" id="now5"><em id="em5"></em>五</span></th>
            <th><span @click="choiceIt(6)" :class="{'choiceIt' : (nowChoiceDaysNumber.indexOf(6) !== -1) || nowChoice === 6 }" id="now6"><em id="em6"></em>六</span></th>
          </tr>
          <tr>
            <th>少</th>
            <td><div class="progress"><div id="less0" class="progress-bar"></div></div></td>
            <td><div class="progress"><div id="less1" class="progress-bar"></div></div></td>
            <td><div class="progress"><div id="less2" class="progress-bar"></div></div></td>
            <td><div class="progress"><div id="less3" class="progress-bar"></div></div></td>
            <td><div class="progress"><div id="less4" class="progress-bar"></div></div></td>
            <td><div class="progress"><div id="less5" class="progress-bar"></div></div></td>
            <td><div class="progress"><div id="less6" class="progress-bar"></div></div></td>
          </tr>
          <tr>
            <th>中</th>
            <td><div class="progress"><div id="middle0" class="progress-bar"></div></div></td>
            <td><div class="progress"><div id="middle1" class="progress-bar"></div></div></td>
            <td><div class="progress"><div id="middle2" class="progress-bar"></div></div></td>
            <td><div class="progress"><div id="middle3" class="progress-bar"></div></div></td>
            <td><div class="progress"><div id="middle4" class="progress-bar"></div></div></td>
            <td><div class="progress"><div id="middle5" class="progress-bar"></div></div></td>
            <td><div class="progress"><div id="middle6" class="progress-bar"></div></div></td>
          </tr>
          <tr>
            <th>多</th>
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
      <div class="select-title">已选</div>
      <div class="nowChoice">
        <span v-for="(item,index) of nowChoiceDays" :key="index" :id="'span'+ index">{{item}}</span>
      </div>
      <div class="foot-botton" @click="confirm">去训练</div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import TrainAPI from '../../service/train-api'
export default {
  name: 'make-plan',
  data () {
    return {
      date: '',
      weekDate: [],
      nowChoice: '',
      empty: '',
      // daysData: [20, 77, 30, 65, 67, 92, 59],
      daysData: [0, 0, 0, 0, 0, 0, 0],
      // 此处的daysData是百分比，若拿到星期的数量，应该计算出百分比再放入该数组
      nowChoiceDays: [],
      // 存储现在选择的星期数，存储12345670这样的数据
      nowChoiceDaysNumber: [],
      // 存储现在选择的星期数，转换为星期一，二，三这样的文字，显示在界面上
      choiceDaysParams: []
      // 存储现在选择的星期数，转换为接口能识别的monday这样的
    }
  },
  mounted () {
    this.date = this.$route.query.date
    this.weekDate = this.$route.query.weekDate
    this.empty = this.isEmptyObject(this.weekDate)
    console.log(222)
    console.log(this.weekDate)
    console.log(this.empty)
    // this.showChart()/**/
    this.getweekPlanCoutWeek()
  },
  watch: {
    'nowChoiceDaysNumber': {
      handler: function (newValue, oldValue) {
        this.nowChoiceDays = []
        for (let i = 0; i < newValue.length; i++) {
          switch (newValue[i]) {
            case 1:
              this.nowChoiceDays.push('星期一')
              break
            case 2:
              this.nowChoiceDays.push('星期二')
              break
            case 3:
              this.nowChoiceDays.push('星期三')
              break
            case 4:
              this.nowChoiceDays.push('星期四')
              break
            case 5:
              this.nowChoiceDays.push('星期五')
              break
            case 6:
              this.nowChoiceDays.push('星期六')
              break
            case 0:
              this.nowChoiceDays.push('星期日')
              break
          }
        }
      },
      deep: true
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
        console.log(this.daysData)
        this.showChart()
      })
    },
    confirm () {
      if (this.nowChoiceDaysNumber.length === 0) {
        Toast('训练周计划至少选择一天')
        return
      }
      this.choiceDaysParams = []
      // 转为接口能接受的参数
      for (let i = 0; i < this.nowChoiceDaysNumber.length; i++) {
        switch (this.nowChoiceDaysNumber[i]) {
          case 1:
            this.choiceDaysParams.push('MONDAY')
            break
          case 2:
            this.choiceDaysParams.push('TUESDAY')
            break
          case 3:
            this.choiceDaysParams.push('WEDNESDAY')
            break
          case 4:
            this.choiceDaysParams.push('THURSDAY')
            break
          case 5:
            this.choiceDaysParams.push('FRIDAY')
            break
          case 6:
            this.choiceDaysParams.push('SATURDAY')
            break
          case 0:
            this.choiceDaysParams.push('SUNDAY')
            break
        }
      }
      console.log(this.choiceDaysParams)
      TrainAPI.weekPlanAdd({ trainWeeks: this.choiceDaysParams, date: this.date }, res => {
        Toast('添加训练周计划成功')
        this.$router.push('/train-have-purchase')
      })
    },
    choiceIt (num) {
      // 设置选中后的星期一二 三 的颜色及其头部的三角颜色
      this.nowChoice = num
      if (this.daysData[num] < 33) {
        let dom = document.getElementById('now' + num)
        let dom2 = document.getElementById('em' + num)
        dom.style.borderColor = '#009999'
        dom2.style.borderTopColor = '#009999'
      } else if (this.daysData[num] < 66) {
        let dom2 = document.getElementById('em' + num)
        let dom = document.getElementById('now' + num)
        dom.style.borderColor = '#FF6600'
        dom2.style.borderTopColor = '#FF6600'
      } else {
        let dom = document.getElementById('now' + num)
        let dom2 = document.getElementById('em' + num)
        dom.style.borderColor = '#DD0000'
        dom2.style.borderTopColor = '#DD0000'
      }
      // ===================判断选中====================================================
      // 设置选中后上面显示按钮，再点一下就取消选中
      if (this.nowChoiceDaysNumber.indexOf(num) === -1) {
        // 判断当前是否有被选中的状态
        // 如果现在点击之前星期没有选中，就在上面的按钮显示
        this.nowChoiceDaysNumber.push(num)
      } else {
        // 如果现在点击之前星期已经被选中，就不在上面显示
        let i = this.nowChoiceDaysNumber.indexOf(num)
        this.nowChoiceDaysNumber.splice(i, 1)
        // console.log(this.nowChoiceDaysNumber)
        let dom2 = document.getElementById('em' + num)
        let dom = document.getElementById('now' + num)
        dom.style.borderColor = ''
        dom2.style.borderTopColor = ''
      }
    },
    showChart () {
      for (let i = 0; i < this.daysData.length; i++) {
        if (this.daysData[i] < 33) {
          let dom = document.getElementById('less' + i)
          let height = 3 * this.daysData[i]
          dom.style.height = height + '%'
          dom.style.backgroundColor = '#009999'
          // 小于33%则只显示第-行,因カ毎-行的高度如果全部占満都是100%。
          // 所以此列第一行,其高度等于当前的百分百x * 3

          // console.log(dom.style.height)
        } else if (this.daysData[i] < 66) {
          // 百分百大于33%且大于66%，这样子的话该列所对应的第一行的高度为100%
          // 此列第二行的高度等于 此列百分比(x-33)*3
          let dom = document.getElementById('less' + i)
          let dom2 = document.getElementById('middle' + i)
          dom.style.height = '100%'
          dom.style.backgroundColor = '#FF6600'
          let height = 3 * (this.daysData[i] - 33)
          dom2.style.height = height + '%'
          dom2.style.backgroundColor = '#FF6600'
          // console.log(dom.style.height)
        } else if (this.daysData[i]) {
          // 百分百大于66%，这样子的话该列所对应的第一行和第二行的高度为100%
          // 此列第三行的高度等于 此列百分比(x-66)*3
          let dom = document.getElementById('less' + i)
          let dom2 = document.getElementById('middle' + i)
          let dom3 = document.getElementById('more' + i)
          dom.style.height = '100%'
          dom.style.backgroundColor = '#DD0000'
          dom2.style.height = '100%'
          dom2.style.backgroundColor = '#DD0000'
          let height = 3 * (this.daysData[i] - 66)
          dom3.style.height = height + '%'
          dom3.style.backgroundColor = '#DD0000'
          // console.log(dom.style.height)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
