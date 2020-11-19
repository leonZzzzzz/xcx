<template lang="html">
  <div class="">
    <div class="shopCart">
      <div class="content">
        <div class="content-left" @click="listToggle" style="position: relative;top: 0.1rem;">
          <div class="logo-wrapper">
            <div class="badge" v-show="totalCount">
              {{totalCount}}
            </div>
            <div class="logo">
              <i class="icon-shopping_cart"></i>
            </div>
          </div>
          <div class="price"  style="color: #F08000">
            必须含有碳水与蛋白菜品
          </div>
        </div>
        <div class="content-right" v-if="payDesc === '去结算'" @click="getMoneyKcl">
          结算
        </div>
        <div class="content-right" v-if="payDesc !== '去结算'" >
          结算
        </div>
      </div>
      <div class="ball-container">
        <transition name="drop" v-on:before-enter="beforeEnter"
                    v-on:enter="enter" v-on:after-enter="afterEnter"
                    v-for="(ball,index) in balls" :key="index">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
// import CartControl from '@/components/tack-out/components/cart-control'
// // import comfirmFood from '../../../../view/nutrition/confirm-order-food'
import BScroll from 'better-scroll'
import GoodAPI from '@/service/goods-api'
// import { Log } from '@lemon/euler-app-h5/src/libs/euler-mint-ui'
// import { Toast } from 'mint-ui'
// import GoodAPI from '@/service/goods-api'

export default {
  props: {
    message: Boolean,
    selectFoodsItemProp: {
      type: Array,
      default: function () {
        return []
      }
    },
    selectFoodsItemProps: {
      type: Array,
      default: function () {
        return []
      }
    },
    deliveryPrice: {
      type: Number,
      default: function () {
        return 0
      }
    },
    minPrice: {
      type: Number,
      default: function () {
        return 0
      }
    },
    todayKcal: {
      type: Number,
      default: function () {
        return 0
      }
    }
  },
  data () {
    return {
      balls: [{
        show: false
      }, {
        show: false
      }, {
        show: false
      }, {
        show: false
      }, {
        show: false
      }],
      dropBalls: [],
      listShow: false,
      selectFoods: [],
      selectFoodsMeal: [],
      ruleBehaviorType: 'REDUCE_FAT'
    }
  },
  created () {
  },
  watch: {
    selectFoodsItemProp: {
      handler (newValue, oldValue) {
        this.selectFoods = this.selectFoodsItemProp
        // console.log(this.selectFoodsItemProp)
      },
      immediate: true,
      deep: true
    },
    selectFoodsItemProps: {
      handler (newValue, oldValue) {
        this.selectFoodsMeal = this.selectFoodsItemProps
        // console.log(this.selectFoodsItemProps)
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        if (food.selectCount) {
          total += 10 * food.selectCount
        }
      })
      this.selectFoodsMeal.forEach((food) => {
        if (food.selectCount) {
          total += 22
        }
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += 1
      })
      this.selectFoodsMeal.forEach((food) => {
        count += 1
      })
      return count
    },
    foodsStat () {
      var foodsStatInfo = { cho: 0, kcal: 0 }
      this.selectFoods.forEach((food) => {
        if (food.selectCount) {
          foodsStatInfo.cho += food.selectSpecFoods.cho * food.selectCount
          foodsStatInfo.kcal += food.selectSpecFoods.kcal * food.selectCount
        }
      })
      return foodsStatInfo
    },
    leftAmount () {
      if (this.minPrice - this.totalPrice > 0 && totalPrice) {
        return true
      }
      return false
    },
    payDesc () {
      let diff = this.minPrice - this.totalPrice
      if (!this.totalPrice) {
        return `￥${this.totalPrice}起送`
      } else if (diff > 0) {
        return `还差￥${diff}元`
      } else {
        return '去结算'
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.path === '/confirm-order-food') {
      from.meta.keepAlive = false
    } else {
      from.meta.keepAlive = false
    }
    next()
  },
  methods: {
    drop (el) {
      for (let i = 0, l = this.balls.length; i < l; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    goConfirmOrder (res) {
      this.$router.push({
        path: '/confirm-order-food',
        query: {
          selectFoods: this.selectFoods,
          goodsFoodIdMeal: this.selectFoodsMeal,
          eatType: 'DINE_IN',
          message: this.message,
          todayKcal: this.todayKcal,
          list: res
        }
      })
    },
    // 健身规则项(减脂REDUCE_FAT|增肌GAIN_MUSCLE|保持KEEP_WEIGHT)
    getMoneyKcl () {
      let goodsFoodId = []
      let goodsFoodIdMeal = []
      var temp = []
      for (let i = 0; i < this.selectFoodsMeal.length; i++) {
        goodsFoodIdMeal.push({ foodSetId: this.selectFoodsMeal[i].id, amount: this.selectFoodsMeal[i].selectCount })
      }
      for (let i = 0; i < this.selectFoods.length; i++) {
        goodsFoodId.push({ goodsFoodId: this.selectFoods[i].id })
        temp.push(Number(this.selectFoods[i].foodClassId))
      }
      GoodAPI.mealMoney({ mealKcal: this.todayKcal, ruleBehaviorType: this.ruleBehaviorType, newGoodsFoodSetListVO: goodsFoodIdMeal, newGoodsFoodListVO: goodsFoodId }, res => {
        this.goConfirmOrder(res)
      })
    },
    setEmpty () {
      this.selectFoods.forEach((food) => {
        food.count = null
      })
    },
    hideBackdrop () {
      this.listShow = false
    },
    _initScroll () {
      this.foodlistScroll = new BScroll(this.$refs.foodlist, {
        click: true
      })
    },
    listToggle () {
      if (!this.selectFoods.length) {
        return
      }
      this.listShow = !this.listShow
      if (this.listShow) {
        this.$nextTick(() => {
          if (!this.foodlistScroll) {
            this._initScroll()
          } else {
            this.foodlistScroll.refresh()
          }
        })
      }
    },
    addFood (food) {
      this.$emit('on-add', food)
    },
    subFood (food) {
      this.$emit('on-sub', food)
    },
    beforeEnter (el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          let inner = el.querySelector('.inner-hook')
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    enter (el) {
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
        let inner = el.querySelector('.inner-hook')
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
      })
    },
    afterEnter (el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  }
}

</script>

<style lang="stylus" scoped>
  .shopCart
    position fixed
    left 0
    bottom 1.3rem
    width 100%
    height 48px
    z-index 50
    .content
      display flex
      background-color #313131
      position relative
      top -0.6rem
      border-radius 1rem
      width 90%
      margin 0 auto
      .content-left
        flex 1
        height 48px
        .logo-wrapper
          display inline-block
          vertical-align top
          position: relative
          height: 56px
          line-height: 56px
          border-radius: 50%
          width: 56px
          top: -20px
          background-color #FABD00
          margin: 0 12px
          padding 6px
          box-sizing border-box
          text-align: center
          .badge
            position absolute
            top: 0;
            right 0
            background: rgb(240, 20, 20);
            color: white;
            width 24px
            height 16px
            line-height: 16px;
            font-size: 9px;
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4);
            font-weight: 700;
            border-radius: 16px;
            text-align center
          .logo
            width 100%
            height 100%
            background: #F6BF3C
            border-radius: 50%
            font-size: 24px
            color: white
            line-height: 44px
            font-weight: 700
            &.active
              background: #FABD00;
              color: white;
        .price
          display inline-block
          vertical-align top
          font-size 0.3rem
          margin-top 12px
          /*padding-right 12px*/
          box-sizing border-box
          color rgba(255, 255, 255, 0.4)
          font-weight 700
          /*line-height 24px*/
          &.active
            color white
        .desc
          position relative
          right 1.1rem
          display inline-block
          vertical-align top
          font-size 3px
          /*color #EE1501*/
          font-weight 500
          line-height 1.5rem
      .content-right
        flex 0 0 105px
        font-size 12px
        font-weight 700
        color black
        line-height 48px
        text-align center
        background #F6BF3C
        position relative
        right  0rem;
        border-radius 0 1rem 1rem 0rem
        &.enough
          background #F6BF3C
          color #000000
          font-weight lighter
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        &.drop-enter, &.drop-enter-active
          transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
          .inner
            width 16px
            height 16px
            border-radius 50%
            background rgb(0, 160, 220)
            transition all 0.4s linear
    .shopcart-list
      position absolute
      top 0
      left 0
      width 100%
      background white
      transform translate3d(0, -100%, 0)
      z-index 8
      &.transHeight-enter-active, &.transHeight-leave-active
        transition all 0.5s
      &.transHeight-enter, &.transHeight-leave-active
        transform translate3d(0, 0, 0)
      .list-header
        height 40px
        line-height 40px
        background-color white
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .title
          display inline-block
          font-size 14px
          font-weight 200
          color rgb(7, 17, 27)
          padding-left 18px
        .empty
          position absolute
          right 8px
          font-size 12px
          color rgb(0, 160, 220)
          padding 0 10px
      .list-content
        max-height 217px
        overflow hidden
        .food
          position relative
          display flex
          height 48px
          margin 0 18px
          border-bottom 1px solid rgba(7, 17, 27, 0.1)
          .name
            flex 1
            font-size 14px
            color rgb(7, 17, 27)
            line-height 48px
            font-weight 700
          .price
            font-size 14px
            font-weight 700
            padding 0 12px 0 18px
            line-height 48px
            background-color white
          .cartcontrol-wrapper
            height 0.1rem;
            font-size 14px
            margin-top -0.7rem

  .backdrop
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background rgba(7, 17, 27, 0.6)
    backdrop-filter blur(10px)
    z-index 40
    &.fade-backdrop-enter-active, &.fade-backdrop-leave-active
      transition opacity 0.5s
    &.fade-backdrop-enter, &.fade-backdrop-leave-active
      opacity 0
</style>
