<template lang="html">

<div class="header">
  <div>
    <img src="../../../../assets/images/common/good-header0img.jpg" style="width: 100%;"/>
  </div>
  <div v-if="ismyself" style="z-index: 9999">
    <div class="title-header" v-if="ruleBehaviorType === 'REDUCE_FAT'">目标{{valueName}}至<span style="color: #F6BF3C">{{foodNum}}</span><span v-if="trainType === 'magic'">kg</span><span v-else>%</span></div>
    <div class="title-header" v-else>目标{{valueName}}至<span style="color: #F6BF3C">{{foodNum}}</span>kg</div>
    <div class="day-header">
      <div style="margin-right: 0.5rem;" @click="eailyDate"><img src="../../../../assets/images/common/food-left.png" width="8"/></div>
     <div>{{today}}</div>
      <div v-if="this.newDay !== 0" style="margin-left: 0.5rem;" @click="linghtDate"><img src="../../../../assets/images/common/food-right.png" width="8"/></div>
    </div>
    <div class="food-header">
      <div class="foot">
        <div class="winth">早餐</div>
        <div class="winth">{{parseInt(foodTimeList.breakfastKcal)}}kcal</div>
        <div class="winth">
          <div style="display: flex;">
            <div style="margin: 0 auto">
              <img v-if="foodTimeList.breakfastPlanCount <= foodTimeList.breakfastActCount" src="../../../../assets/images/common/food-yes.png" width="22"/>
              <img v-else-if="foodTimeList.breakfastPlanCount > foodTimeList.breakfastActCount" src="../../../../assets/images/common/food-no.png" width="22"/>
            </div>
            <div style="margin: 0 auto" v-if="foodTimeList.breakfastPlanCount === 2 || foodTimeList.breakfastActCount === 2 || foodTimeList.breakfastPlanCount === 3 || foodTimeList.breakfastActCount === 3">
              <img v-if="foodTimeList.breakfastPlanCount <= foodTimeList.breakfastActCount && foodTimeList.breakfastPlanCount === 2 || foodTimeList.breakfastPlanCount === 3" src="../../../../assets/images/common/food-yes.png" width="22"/>
              <img v-else-if="foodTimeList.breakfastPlanCount > foodTimeList.breakfastActCount" src="../../../../assets/images/common/food-no.png" width="22"/>
              <img v-else-if="foodTimeList.breakfastPlanCount < foodTimeList.breakfastActCount" src="../../../../assets/images/common/foods-dono.png" width="22"/>
            </div>
            <div style="margin: 0 auto" v-if="foodTimeList.breakfastPlanCount === 3 || foodTimeList.breakfastActCount === 3">
              <img v-if="foodTimeList.breakfastPlanCount <= foodTimeList.breakfastActCount && foodTimeList.breakfastPlanCount === 3" src="../../../../assets/images/common/food-yes.png" width="22"/>
              <img v-else-if="foodTimeList.breakfastPlanCount > foodTimeList.breakfastActCount" src="../../../../assets/images/common/food-no.png" width="22"/>
              <img v-else-if="foodTimeList.breakfastPlanCount < foodTimeList.breakfastActCount" src="../../../../assets/images/common/foods-dono.png" width="22"/>
            </div>
          </div>
        </div>
      </div>
      <div class="foot">
        <div class="winth">午餐</div>
        <div class="winth">{{parseInt(foodTimeList.lunchKcal)}}kcal</div>
        <div class="winth">
          <div style="display: flex;">
            <div style="margin: 0 auto">
              <img v-if="foodTimeList.lunchPlanCount <= foodTimeList.lunchActCount " src="../../../../assets/images/common/food-yes.png" width="22"/>
              <img v-else-if="foodTimeList.lunchPlanCount > foodTimeList.lunchActCount" src="../../../../assets/images/common/food-no.png" width="22"/>
            </div>
            <div style="margin: 0 auto" v-if="foodTimeList.lunchPlanCount === 2 || foodTimeList.lunchActCount === 2 || foodTimeList.lunchPlanCount === 3 || foodTimeList.breakfastActCount === 3">
              <img v-if="foodTimeList.lunchPlanCount <= foodTimeList.lunchActCount && foodTimeList.lunchPlanCount === 2 || foodTimeList.lunchPlanCount === 3" src="../../../../assets/images/common/food-yes.png" width="22"/>
              <img v-else-if="foodTimeList.lunchPlanCount > foodTimeList.lunchActCount" src="../../../../assets/images/common/food-no.png" width="22"/>
              <img v-else-if="foodTimeList.lunchPlanCount < foodTimeList.lunchActCount" src="../../../../assets/images/common/foods-dono.png" width="22"/>
            </div>
            <div style="margin: 0 auto" v-if="foodTimeList.lunchPlanCount === 3 || foodTimeList.breakfastActCount === 3">
              <img v-if="foodTimeList.lunchPlanCount <= foodTimeList.lunchActCount && foodTimeList.lunchPlanCount === 3" src="../../../../assets/images/common/food-yes.png" width="22"/>
              <img v-else-if="foodTimeList.lunchPlanCount > foodTimeList.lunchActCount" src="../../../../assets/images/common/food-no.png" width="22"/>
              <img v-else-if="foodTimeList.lunchPlanCount < foodTimeList.lunchActCount" src="../../../../assets/images/common/foods-dono.png" width="22"/>
            </div>
          </div>
        </div>
      </div>
      <div class="foot">
        <div class="winth">晚餐</div>
        <div class="winth">{{parseInt(foodTimeList.dinnerKcal)}}kcal</div>
        <div class="winth">
          <div style="display: flex;">
            <div style="margin: 0 auto">
              <img v-if="foodTimeList.dinnerPlanCount <= foodTimeList.dinnerActCount" src="../../../../assets/images/common/food-yes.png" width="22"/>
              <img v-else-if="foodTimeList.dinnerPlanCount > foodTimeList.dinnerActCount" src="../../../../assets/images/common/food-no.png" width="22"/>
            </div>
            <div style="margin: 0 auto" v-if="foodTimeList.dinnerPlanCount === 2 || foodTimeList.dinnerActCount === 2 || foodTimeList.dinnerPlanCount === 3 || foodTimeList.dinnerActCount === 3">
              <img v-if="foodTimeList.dinnerPlanCount <= foodTimeList.dinnerActCount && foodTimeList.dinnerPlanCount === 2 || foodTimeList.dinnerPlanCount === 3" src="../../../../assets/images/common/food-yes.png" width="22"/>
              <img v-else-if="foodTimeList.dinnerPlanCount > foodTimeList.dinnerActCount" src="../../../../assets/images/common/food-no.png" width="22"/>
              <img v-else-if="foodTimeList.dinnerPlanCount < foodTimeList.dinnerActCount" src="../../../../assets/images/common/foods-dono.png" width="22"/>
            </div>
            <div style="margin: 0 auto" v-if="foodTimeList.dinnerPlanCount === 3 || foodTimeList.dinnerActCount === 3">
              <img v-if="foodTimeList.dinnerPlanCount <= foodTimeList.dinnerActCount && foodTimeList.dinnerPlanCount === 3" src="../../../../assets/images/common/food-yes.png" width="22"/>
              <img v-else-if="foodTimeList.dinnerPlanCount > foodTimeList.dinnerActCount" src="../../../../assets/images/common/food-no.png" width="22"/>
              <img v-else-if="foodTimeList.dinnerPlanCount < foodTimeList.dinnerActCount" src="../../../../assets/images/common/foods-dono.png" width="22"/>
            </div>
          </div>
        </div>
      </div>
      <div class="foot" v-if="foodTimeList.drinkKcal !== null">
        <div class="winth">饮料</div>
        <div v-if="foodTimeList.drinkKcal !== null" class="winth">{{parseInt(foodTimeList.drinkKcal)}}kcal</div>
        <div class="winth" v-else>0kcal</div>
        <div class="winth">
          <div style="display: flex;">
            <div style="margin: 0 auto">
              <img v-if="foodTimeList.drinkPlanCount <= foodTimeList.drinkActCount && foodTimeList.drinkPlanCount === 1 || foodTimeList.drinkPlanCount === 2 || foodTimeList.drinkPlanCount === 3" src="../../../../assets/images/common/food-yes.png" width="22"/>
              <img v-else-if="foodTimeList.drinkPlanCount > foodTimeList.drinkActCount" src="../../../../assets/images/common/food-no.png" width="22"/>
              <img v-else-if="foodTimeList.drinkPlanCount < foodTimeList.drinkActCount" src="../../../../assets/images/common/foods-dono.png" width="22"/>
            </div>
            <div style="margin: 0 auto" v-if="foodTimeList.drinkPlanCount === 2 || foodTimeList.drinkActCount === 2 || foodTimeList.drinkPlanCount === 3 || foodTimeList.drinkActCount === 3">
              <img v-if="foodTimeList.drinkPlanCount <= foodTimeList.drinkActCount && foodTimeList.drinkPlanCount === 2 || foodTimeList.drinkPlanCount === 3" src="../../../../assets/images/common/food-yes.png" width="22"/>
              <img v-else-if="foodTimeList.drinkPlanCount > foodTimeList.drinkActCount" src="../../../../assets/images/common/food-no.png" width="22"/>
              <img v-else-if="foodTimeList.drinkPlanCount < foodTimeList.drinkActCount" src="../../../../assets/images/common/foods-dono.png" width="22"/>
            </div>
            <div style="margin: 0 auto" v-if="foodTimeList.drinkPlanCount === 3 || foodTimeList.drinkActCount === 3">
              <img v-if="foodTimeList.drinkPlanCount <= foodTimeList.drinkActCount && foodTimeList.drinkPlanCount === 3" src="../../../../assets/images/common/food-yes.png" width="22"/>
              <img v-else-if="foodTimeList.drinkPlanCount > foodTimeList.drinkActCount" src="../../../../assets/images/common/food-no.png" width="22"/>
              <img v-else-if="foodTimeList.drinkPlanCount < foodTimeList.drinkActCount" src="../../../../assets/images/common/foods-dono.png" width="22"/>
            </div>
          </div>
        </div>
      </div>
      <div class="foot" v-if="foodTimeList.snacksKcal !== null">
        <div class="winth">加餐</div>
        <div class="winth">{{parseInt(foodTimeList.snacksKcal)}}kcal</div>
        <div class="winth">
          <div style="display: flex;">
            <div style="margin: 0 auto">
              <img v-if="foodTimeList.snacksPlanCount <= foodTimeList.snacksActCount " src="../../../../assets/images/common/food-yes.png" width="22"/>
              <img v-else-if="foodTimeList.snacksPlanCount > foodTimeList.snacksActCount" src="../../../../assets/images/common/food-no.png" width="22"/>
            </div>
            <div style="margin: 0 auto" v-if="foodTimeList.snacksPlanCount === 2 || foodTimeList.snacksActCount === 2 || foodTimeList.snacksPlanCount === 3 || foodTimeList.snacksActCount === 3">
              <img v-if="foodTimeList.snacksPlanCount <= foodTimeList.snacksActCount && foodTimeList.snacksPlanCount === 2 || foodTimeList.snacksPlanCount === 3" src="../../../../assets/images/common/food-yes.png" width="22"/>
              <img v-else-if="foodTimeList.snacksPlanCount > foodTimeList.snacksActCount" src="../../../../assets/images/common/food-no.png" width="22"/>
              <img v-else-if="foodTimeList.snacksPlanCount < foodTimeList.snacksActCount" src="../../../../assets/images/common/foods-dono.png" width="22"/>
            </div>
            <div style="margin: 0 auto" v-if="foodTimeList.snacksPlanCount === 3 || foodTimeList.snacksActCount === 3">
              <img v-if="foodTimeList.snacksPlanCount <= foodTimeList.snacksActCount && foodTimeList.snacksPlanCount === 3" src="../../../../assets/images/common/food-yes.png" width="22"/>
              <img v-else-if="foodTimeList.snacksPlanCount > foodTimeList.snacksActCount" src="../../../../assets/images/common/food-no.png" width="22"/>
              <img v-else-if="foodTimeList.snacksPlanCount < foodTimeList.snacksActCount" src="../../../../assets/images/common/foods-dono.png" width="22"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="myself" @click="goLogin">请先登陆后使用营养</div>
</div>

</template>

<script>
import GoodsAPI from '../../../../service/goods-api'
import { formatDate } from '@lemon/euler-app-h5/src/libs/util'
import { Log } from '@lemon/euler-app-h5/src/libs/euler-mint-ui'
import Common from '../../../../mixins/common'
import UserAPI from '../../../../service/user-api'
export default {
  mixins: [Common],
  props: {
    seller: {
      type: Object
    }
  },
  components: {
  },
  data () {
    return {
      ismyself: false,
      orderList: [],
      one: '<',
      detailShow: false,
      mealArray: [3, 4, 5, 6],
      mealAmount: null,
      popupVisible: false,
      planId: null,
      limit: 9999,
      offset: 0,
      foodTimeList: [],
      foodTimeDate: [],
      planMap: {},
      planMap1: {},
      planMap2: {},
      targetWeight: '40',
      ruleBehaviorType: '',
      cklToday: null,
      List: '',
      todayKcal: null,
      countFoods: false,
      valueName: '',
      foodNum: '',
      today: '',
      todayValue: '',
      breaks: true,
      lunchs: true,
      dinnners: true,
      newDay: 0,
      trainType: ''
    }
  },
  created () {
  },
  mounted () {
    if (this.token) {
      this.getIsTrain()
      this.getWeightVuale()
      this.ismyself = true
    }
  },
  methods: {
    // 拿更早以前的数据
    eailyDate () {
      if (this.newDay > -8) {
        this.newDay -= 1
        var day = new Date()
        day.setDate(day.getDate() + this.newDay)
        this.today = (day.getMonth() + 1) + '月' + day.getDate() + '日'
        this.todayValue = formatDate(new Date(day), 'yyyy-MM-dd')
        console.log(this.newDay)
        console.log(day.setDate(day.getDate() + this.newDay))
        this.getTodayKcal()
      } else {
        Log.error('只能查看最近7天kcal')
      }
    },
    linghtDate () {
      this.newDay += 1
      var day = new Date()
      day.setDate(day.getDate() + this.newDay)
      this.today = (day.getMonth() + 1) + '月' + day.getDate() + '日'
      this.todayValue = formatDate(new Date(day), 'yyyy-MM-dd')
      console.log(this.newDay)
      console.log(day.setDate(day.getDate() + this.newDay))
      this.getTodayKcal()
    },
    getTodayKcal () {
      GoodsAPI.todayWeight({ eatDate: this.todayValue }, res => {
        this.foodTimeList = res
        if (this.foodTimeList.breakfastActCount > 3) {
          this.foodTimeList.breakfastActCount = 3
        } else if (this.foodTimeList.dinnerActCount > 3) {
          this.foodTimeList.dinnerActCount = 3
        } else if (this.foodTimeList.drinkActCount > 3) {
          this.foodTimeList.dinnerActCount = 3
        } else if (this.foodTimeList.lunchActCount > 3) {
          this.foodTimeList.lunchActCount = 3
        } else if (this.foodTimeList.snacksActCount > 3) {
          this.foodTimeList.snacksActCount = 3
        }
        console.log(this.foodTimeList)
      })
    },
    getIsTrain () {
      UserAPI.isTest({}, res => {
        this.trainType = res.item
      })
    },
    getWeightVuale () {
      UserAPI.getValue({}, res => {
        this.getToday()
        this.foodNum = res.targetValue
        this.ruleBehaviorType = res.ruleBehaviorType
        if (this.ruleBehaviorType === 'REDUCE_FAT') {
          if (this.trainType === 'magic') {
            this.valueName = '体重减'
          } else {
            this.valueName = '体脂减'
          }
        } else if (this.ruleBehaviorType === 'KEEP_WEIGHT') {
          this.valueName = '体重保持'
          this.targetValue = res.recommendValue
        } else if (this.ruleBehaviorType === 'GAIN_MUSCLE') {
          this.valueName = '骨骼肌增'
        }
      })
    },
    showDetails () {
      this.detailShow = true
    },
    getToday () {
      var day = new Date()
      day.setTime(day.getTime())
      this.today = (day.getMonth() + 1) + '月' + day.getDate() + '日'
      this.todayValue = formatDate(new Date(day), 'yyyy-MM-dd')
      this.getTodayKcal()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~@/assets/stylus/common/mixin.styl"
.winth{
  width 33.33%
}
.food-header{
  color: #262626;
  position: absolute;
  top: 2.7rem;
  font-size: 0.45rem;
  width: 90%;
  text-align: center;
}
.day-header{
  color: black;
  position: absolute;
  top: 1.8rem;
  font-size: 0.6rem;
  width: 100%;
  display: flex;
  justify-content center
}
.myself{
  color: #FABD00;
  position: absolute;
  top: 3rem;
  font-size: 0.6rem;
  width: 100%;
  text-align: center;
}
.title-header{
  color: #ffffff;
  position: absolute;
  top: 0.8rem;
  font-size: 0.6rem;
  width: 100%;
  text-align: center;
}
.foot{
  width: 100%
  display: flex
  margin-left: 0.6rem;
  justify-content: space-between;
  margin-top 0.15rem;
}

.header
  position relative
  color #fff
  blur:10px
  overflow hidden
  .pop-table
    width 95%
    height 9rem
    .pop-tab
      border 1px solid #C9CACA
      height 7rem
      width 100%
      td
        border 1px #C9CACA solid
      th
        border 1px #C9CACA solid
        width 0.3rem
  .font-color
    color: #F6BF3C;
  .background-title
    text-align center
    height 1.85rem;
    color white
    font-size: .48rem;
    line-height 2.45rem;
    font-weight lighter
    background-color #1B1B1B
    padding-left 0.05rem;
  .content-wrapper
    position relative
    display flex
    padding: 24px 12px 18px 24px
    font-size 12px
    .avatar
      img
        border-radius 2px
    .content
      margin-left 16px
      .title
        margin 2px 0 8px 0
        font-size 16px
        .brand
          display inline-block
          vertical-align top
          width 30px
          height 18px
          bg-image('brand')
          background-size 30px 18px
          background-repeat no-repeat
        .name
          margin-left 6px
          font-size 16px
          line-height 18px
          font-weight bold
      .description
        font-size 12px
        margin-bottom 10px
      .supports
          .icon
            display inline-block
            vertical-align top
            width 12px
            height 12px
            margin-right 4px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            line-height 12px
            font-size 10px
    .support-count
      position absolute
      right 12px
      bottom 18px
      padding 0 8px
      height 24px
      line-height 24px
      border-radius 14px
      background-color rgba(0,0,0,0.2)
      text-align center
      .count
        vertical-align top
        font-size 10px
      .icon-keyboard_arrow_right
        font-size 10px
        margin-left 2px
        line-height 24px
  .bulletin-wrapper
    position relative
    height 28px
    line-height 28px
    padding 0 22px 0 12px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    background rgba(7,17,27,0.2)
    .bulletin-title
      display inline-block
      vertical-align top
      margin-top 8px
      width 22px
      height 12px
      bg-image('bulletin')
      background-size 100% 100%
      background-repeat no-repeat
    .bulletin-text
      font-size 10px
      vertical-align middle
      margin 0 4px
    .icon-keyboard_arrow_right
      position absolute
      font-size 10px
      right 12px
      top 8px
  .background
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    filter blur(10px)
    z-index -1
  .detail
    position fixed
    top 0
    left 0
    z-index 100
    width 100%
    height 100%
    background rgba(7,17,27,0.8)
    backdrop-filter blur(10px)
    .detail-wrapper
      min-height 100%
      width 100%
      .detail-main
        margin-top 64px
        padding-bottom 64px
        .name
          font-size 16px
          font-weight 700
          width 100%
          color rgb(255,255,255)
          line-height 16px
          text-align center
        .star-wrapper
          margin 16px 11px 28px 0
          text-align center
        .title
          display flex
          width 80%
          margin 0 auto 24px auto;
          .line
            display inline-block
            flex 1
            height 1px
            background rgba(255,255,255,0.2)
            margin auto
          .text
            padding 0 12px
            font-size 14px
            font-weight 700
        .supports
          padding 0 0 28px 36px
          .support-item
            color white
            padding 0 6px 12px 16px
            .text
              vertical-align middle
              font-size 12px
              font-weight 200
              color rgb(255,255,255)
              line-height 12px
            .icon
              display inline-block
              vertical-align top
              width 16px
              height 16px
              margin-right 6px
              background-size 100% 100%
              background-repeat no-repeat
              &.decrease
                bg-image('decrease_2')
              &.discount
                bg-image('discount_2')
              &.guarantee
                bg-image('guarantee_2')
              &.invoice
                bg-image('invoice_2')
              &.special
                bg-image('special_2')
        .bulletin
          padding 0 48px
          font-size 12px
          font-weight 200
          color rgb(255,255,255)
          line-height 24px

    .detail-close
      position relative
      width 32px
      height 32px
      margin -64px auto 0 auto
      clear both
      font-size 32px
      color rgba(255,255,255,0.5)
    &.fade-enter-active, &.fade-leave-active {
        transition: opacity .5s
    }
    &.fade-enter, &.fade-leave-active {
        opacity: 0
    }
</style>
