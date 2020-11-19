<style lang="less" scoped>
  @import "train-no-purchase";
</style>
<template>
  <div class="train-no-purchase">
    <div id="cmtNp"  :class="{'cmt-nav-pop dp-n':!isA,'cmt-nav-pop dp-b':isA}">
      <ul>
        <li class="cmt-nav-pop-item cmt-nav-pop-item1" @click="$router.push('record-aerobic-adtion')">
          <a class="flexcl">
            <span>记录有氧运动</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="head-bar head-theme-b">
      <div class="head-theme-b-left">
        <i class="icon-image icon-back" @click="$router.go(-1)"></i>
      </div>
      <div class="head-theme-b-center">
        <div class="fs-5">训练</div>
      </div>
      <div slot="right" class="head-theme-b-right" style="width: 70px">
        <img src="../../assets/original-images/scan.png" alt="" class="img2">
        <img src="../../assets/original-images/yg.png" alt="" @click="togglePOP2" class="img2" style="height: .9rem">
      </div>
    </div>
    <div class="pt-44 box-content" @click="closePOP2">
      <div class="date" @click="closePOP2">
        <calendar :zero="calendar5.zero" :disabled="calendar5.disabled" :lunar="calendar5.lunar" :value="calendar5.value" :multi="calendar5.multi" @select="calendar5.select"></calendar>
        <!-- 只能单选-------------------------------------------------->
        <!--<calendar-->
          <!--ref="calendar1"-->
          <!--:events="calendar1.events"-->
          <!--:lunar="calendar1.lunar"-->
          <!--:value="calendar1.value"-->
          <!--:begin="calendar1.begin"-->
          <!--:end="calendar1.end"-->
          <!--:weeks="calendar1.weeks"-->
          <!--:months="calendar1.months"-->
          <!--@select="calendar1.select"-->
          <!--@selectMonth="calendar1.selectMonth"-->
          <!--@selectYear="calendar1.selectYear"></calendar>-->
        <!--<button @click="changeEvents">异步更新Price</button>-->
        <!--<button @click="calendar1.value=[2018,somatotype,Math.floor(Math.random()*30+somatotype)]">动态设置日期</button>-->
        <!--<button @click="$refs.calendar1.setToday()">返回今天</button>-->
        <!-- 只能单选-------------------------------------------------->
      </div>
      <div class="tabs">
        <div @click="choiceIt(0)" :class="{'clickIt' : nowChoice === 0}">胸部(2)</div>
        <div @click="choiceIt(1)" :class="{'clickIt' : nowChoice === 1}">背部(0)</div>
        <div @click="choiceIt(2)" :class="{'clickIt' : nowChoice === 2}">肩部(0)</div>
        <div @click="choiceIt(3)" :class="{'clickIt' : nowChoice === 3}">腰部(0)</div>
        <div @click="choiceIt(4)" :class="{'clickIt' : nowChoice === 4}">手臂(0)</div>
      </div>
      <div v-if="nowChoice === 0">
        <div class="hasAction" >
          <div class="title"><span>热身运动</span></div>
          <div class="has-coupon-item" @click="$router.push('/record-action-data')">
            <div class="has-grounp-number">1</div>
            <div class="has-coupon-icon" >
              <div class="money">
                <span class="spanbei"><img src="../../assets/original-images/active-2.png" alt=""></span>
              </div>
            </div>
            <div class="has-notice-center">
              <div class="has-notice-title">原地跳操</div>
              <div class="has-notice-text">计划: 2组 30秒,30秒</div>
              <div class="has-notice-text">实际: </div>
            </div>
            <div class="has-editing" @click.stop="showPop">...</div>
          </div>
          <div class="has-coupon-item" @click="$router.push('/record-action-data')">
            <div class="has-grounp-number">1</div>
            <div class="has-coupon-icon" >
              <div class="money">
                <span class="spanbei"><img src="../../assets/original-images/active-1.png" alt=""></span>
              </div>
            </div>
            <div class="has-notice-center">
              <div class="has-notice-title">原地跳操</div>
              <div class="has-notice-text">计划: 2组 30秒,30秒</div>
              <div class="has-notice-text">实际: </div>
            </div>
            <div class="has-editing" @click.stop="showPop">...</div>
          </div>
        </div>
      </div>
    </div>
    <div class="foot-botton" @click="choiceCoupon">增加动作</div>
    <mt-popup v-model="showCoupon" style="width: 100%;height: 70%;" position="bottom">
      <div style="width: 100%">
        <div style="text-align: center;height: 42px;font-size: .5rem;line-height: 42px;background-color: #ffffff;">
          <span style="float: left;padding-left: 15px;color: #2577e9" @click="closeCoupon">取消</span>
          <span>选择动作</span>
        </div>
      </div>
      <div style="overflow: scroll;height: 100%;background-color: #F1F1F6;padding-bottom: 20px">
            <div class="coupon-item" @click.stop="addAction">
              <div class="coupon-icon" >
                <div class="money">
                  <span class="spanbei"><img src="../../assets/original-images/active-1.png" alt=""></span>
                </div>
              </div>
              <div class="notice-center">
                <div class="notice-title">动作名称</div>
                <div class="notice-text">热身运动</div>
              </div>
            </div>
            <div class="coupon-item" @click="addAction">
              <div class="coupon-icon" >
                <div class="money">
                  <span class="spanbei"><img src="../../assets/original-images/active-1.png" alt=""></span>
                </div>
              </div>
              <div class="notice-center">
                <div class="notice-title">动作名称</div>
                <div class="notice-text">热身运动</div>
              </div>
            </div>
            <div class="coupon-item" @click.stop="addAction">
              <div class="coupon-icon" >
                <div class="money">
                  <span class="spanbei"><img src="../../assets/original-images/active-2.png" alt=""></span>
                </div>
              </div>
              <div class="notice-center">
                <div class="notice-title">动作名称</div>
                <div class="notice-text">热身运动</div>
              </div>
            </div>
            <div class="coupon-item" @click.stop="addAction">
              <div class="coupon-icon" >
                <div class="money">
                  <span class="spanbei"><img src="../../assets/original-images/active-1.png" alt=""></span>
                </div>
              </div>
              <div class="notice-center">
                <div class="notice-title">动作名称</div>
                <div class="notice-text">热身运动</div>
              </div>
            </div>
            <div class="coupon-item" @click.stop="addAction">
              <div class="coupon-icon" >
                <div class="money">
                  <span class="spanbei"><img src="../../assets/original-images/active-1.png" alt=""></span>
                </div>
              </div>
              <div class="notice-center">
                <div class="notice-title">动作名称</div>
                <div class="notice-text">热身运动</div>
              </div>
            </div>
            <div class="coupon-item" @click.stop="addAction">
              <div class="coupon-icon" >
                <div class="money">
                  <span class="spanbei"><img src="../../assets/original-images/active-1.png" alt=""></span>
                </div>
              </div>
              <div class="notice-center">
                <div class="notice-title">动作名称</div>
                <div class="notice-text">热身运动</div>
              </div>
            </div>
      </div>
      <div class="confirm-btn" @click="closeCoupon">完成</div>
    </mt-popup>
    <mt-popup v-model="pop" position="bottom" class="toPop">
      <ul>
        <li @click="$router.push('/demo-action')">
          标准动作
        </li>
        <li @click="$router.push('/editing-ming-grounp')" >
          修改
        </li>
        <li>
          删除
        </li>
      </ul>
      <div @click="closePop">取消</div>
    </mt-popup>
  </div>
</template>

<script>
import calendar from './calendar.vue'
export default {
  name: 'train-no-purchase',
  data () {
    return {
      nowChoice: 0,
      showCoupon: false,
      selected: '1',
      pop: false,
      isA: false,
      calendar1: {
        value: [2018, 11, 13], // 默认日期
        // lunar:true, //显示农历
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        // events: {
        //   '2017-7-7': '$408',
        //   '2017-7-20': '$408',
        //   '2017-7-21': '$460',
        //   '2017-7-22': '$500'
        // },
        select (value) {
          console.log(value.toString())
        },
        selectMonth (month, year) {
          console.log(year, month)
        },
        selectYear (year) {
          console.log(year)
        },
        timestamp: Date.now()
      },
      calendar5: {
        display: '2017/11/2,2017/12/2',
        multi: true,
        show: true,
        zero: true,
        value: [[2018, 11, 1], [2018, 11, 3], [2018, 11, 7], [2018, 11, 15]], // 默认日期
        disabled: [], // 不可选的日期
        // disabled: [[2018, 11, 11], [2017, 12, 25]], // 不可选的日期
        // lunar: true, // 显示农历
        select: (value) => {
          let displayValue = []
          value.forEach(v => {
            displayValue.push(v[0] + '/' + (v[1]) + '/' + v[2])
          })
          console.log(displayValue)
          this.calendar5.display = displayValue.join(',')
          // this.calendar5.show=false;
          this.calendar5.value = value
        }
      }
    }
  },
  components: {
    calendar
  },
  watch: {
    '$route' () {
      this.closePop()
      this.closePOP2()
    }
  },
  methods: {
    changeEvents () {
      this.calendar1.events = {
        '2017-7-20': '$' + (Math.random() * 1000 >> 0),
        '2017-7-21': '$' + (Math.random() * 1000 >> 0),
        '2017-7-22': '$' + (Math.random() * 1000 >> 0)
      }
    },
    choiceIt (num) {
      this.nowChoice = num
    },
    togglePOP2 () {
      this.isA = !this.isA
    },
    closePOP2 () {
      this.isA = false
    },
    addAction () {
      this.$router.push({
        path: '/ming-group'
      })
    },
    choiceCoupon () {
      this.showCoupon = true
    },
    closeCoupon () {
      this.showCoupon = false
    },
    showPop () {
      this.pop = true
    },
    closePop () {
      this.pop = false
    }
  }
}
</script>

<style scoped>

</style>
