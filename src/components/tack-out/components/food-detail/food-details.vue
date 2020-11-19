<template lang="html">
  <transition name="move">
    <div class="detailWrapper" ref="detailWrapper" v-if="showDetail">
      <div class="foodDetail">
        <div class="back" @click="showDetail=false">
          <i class="icon-arrow_lift"></i>
        </div>
        <img :src="imagePaths" height="230" width="100%"/>
        <div class="info">
          <div class="title">{{foodDetail.name}}</div>
          <div class="desc">
            <span class="food-name" style="color: #000000;font-weight: bold;font-size: 0.45rem"></span>
          </div>
          <div class="price">
            <span class="unit">￥</span>
            <span class="oldPrice" style="color: #FF3A43;">{{foodDetail.price}}</span>
          </div>
          <div class="food-energy">
            <ul class="energy-ul" style="display: flex;justify-content: space-between;">
              <li>
                <div class="energy-num">{{foodDetail.totleEnergy}}千卡</div>
                <div class="energy-name" style="color:#8E8E8E ">热量</div>
              </li>
              <li>
                <div class="energy-num">{{foodDetail.totleCho}}g</div>
                <div class="energy-name" style="color:#8E8E8E ">碳水化合物</div>
              </li>
              <li>
                <div class="energy-num">{{foodDetail.totlePro}}g</div>
                <div class="energy-name" style="color:#8E8E8E ">蛋白质</div>
              </li>
              <li>
                <div class="energy-num">{{foodDetail.totleFat}}g</div>
                <div class="energy-name" style="color:#8E8E8E ">脂肪</div>
              </li>
            </ul>
          </div>
          <!--<div class="shopCart">-->
            <!--<transition name="fade">-->
              <!--<div class="text" @click="addCart($event)" v-show="!food.selectCount">加入购物车</div>-->
            <!--</transition>-->
          <!--</div>-->
<!--          <CartControl ref="carContal" :food="food"  @ShowSpec="ShowSpec" :isAll="true" :selectFoodsItemProp="selectFoodsItemProp"></CartControl>-->
<!--          <CartControl ref="carContals" :numSelset="selsectsaq" :food="food" @on-add="addFoods" @on-sub="subFoods" @ShowSpec="ShowSpec" :isAll="true" :selectFoodsItemProp="selectFoodsItemProp"></CartControl>-->
        </div>
        <div class="desc">
          <div class="link-x"></div>
          <div class="title">商品描述</div>
          <div class="content">{{food.description}}</div>
        </div>
        <div class="link-x"></div>
        <div class="divider"></div>
        <div class="stock">
          <div class="stock-title">套餐含菜</div>
           <ul class="stock-title-ul">
             <li v-for="item in foodDetail.setDetailVOList" :key="item.id">
               <div>{{item.foodSpecName}}</div>
               <div>{{item.doseQty}}g</div>
             </li>
           </ul>
        </div>
        <div class="evaluation">
          <div class="title">
            <div class="link-x"></div>
            评价<span style="font-size: 0.08rem; color: #727171; margin-left: 0.1rem;">(好评度<span style="color: red">100%</span>)</span>
          </div>
          <div class="switch" @click="evelFlag=!evelFlag">
<!--            <span class="icon-check_circle" :class="{'on':evelFlag}"></span>-->
            <span class="text">只看有内容的评价</span>
          </div>
          <div class="evel-list">
            <ul>
              <li class="evel" v-for="evel in eveList" :key="evel.id">
                <div class="userInfo">
                  <img src="../../../../assets/images/common/home-log.png" style="width:1rem;height: 1rem;margin-top: 0.4rem;"/>
                  <div class="user">
                    <span>{{evel.userNickName}}</span>
                    <span class="avatar"></span>
                    <div style="margin-top: 0.2rem;">评分：5星</div>
                  </div>
                </div>
                <div class="content">
                  <span class="icon" style="margin-left: 1rem;" :class="evel.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
                  <span class="text">{{evel.goodsFoodEvaluate.evaluate}}</span>
                  <div class="time" style="margin-left: 1rem;">{{evel.rateTime | time}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import '@/libs/time.js'
// import BScroll from 'better-scroll'
// import CartControl from '../cart-control/cart-controls'
import GoodsAPI from '@/service/goods-api'
import { downloadUrl } from '../../../../libs/http-api'
export default {
  components: {
    // CartControl
  },
  props: {
    selectFoodsItemProp: {
      type: Array,
      default: function () {
        return []
      }
    },
    food: Object
  },
  data () {
    return {
      selsectsaq: 4,
      foodAttri: [],
      hasInit: false,
      selectFoodsItem: [],
      selectFoodsItemProps: [],
      specsIndex: '',
      id: '',
      foodDetail: [],
      showDetail: false,
      evelFlag: true,
      selectFoods: [],
      rideDetails: [],
      eveList: [],
      energy: '',
      cho: '',
      pro: '',
      fat: '',
      imagePaths: ''
    }
  },
  computed: {
    evelArr () {
      let selectIndex = 0
      this.classifyArr.forEach((data, index) => {
        if (data.active) {
          selectIndex = index
        }
      })
      if (this.detailWrapper) {
        this.$nextTick(() => {
          this.detailWrapper.refresh()
        })
      }
      return selectIndex ? [] : []
    }
  },
  mounted () {
    this.selectFoodsItem = this.foodDetail
    this.showToggles()
    // this.getFoodDetails()
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
    }
    window.addEventListener('popstate', this.fun, false)
  },
  destroyed () {
    window.removeEventListener('popstate', this.fun, false)
  },
  methods: {
    fun () {
      var _that = this
      _that.showDetail = false
      this.$router.push('/tack_out_goods')
    },
    // 获取原材料
    viewDetail () {
      GoodsAPI.rideDetail({ id: this.food.id }, res => {
        // console.log(res)
        this.rideDetails = res
        this.energy = this.rideDetails.goodsFoodSpec.energy
        this.pro = this.rideDetails.goodsFoodSpec.pro
        this.cho = this.rideDetails.goodsFoodSpec.cho
        this.fat = this.rideDetails.goodsFoodSpec.fat
      })
    },
    ShowSpec (food) {
      this.showItSpecs = !this.showItSpecs
      this.specsIndex = 0
      this.attributesIndex = []
      this.food = food
      this.food.imagePaths[0] = downloadUrl + food.imagePaths[0]
      if (this.food.attributes) {
        // 如果当前的菜品存在属性
        for (let i = 0; i < this.food.attributes.length; i++) {
          // console.log(i)
          this.attributesIndex.push({
            abIndex: 0
          })
        }
      }
    },
    showToggles (food) {
      // console.log(food)
      this.showDetail = true
      GoodsAPI.foodMealDetail({ id: this.food.id }, res => {
        this.foodDetail = res
        this.imagePaths = downloadUrl + this.foodDetail.imagePaths[0]
      })
      // if (this.showDetail) {
      //   this.$nextTick(() => {
      //     this._initScroll()
      //   })
      // }
    },
    // _initScroll () {
    //   if (this.hasInit) {
    //     return
    //   }
    //   this.detailWrapper = new BScroll(this.$refs.detailWrapper, {
    //     click: true
    //   })
    //   this.hasInit = true
    // },
    addCart () {
      let food = this.food
      let attributesStr = ''
      if (this.food.goodsFoodSpecList && this.food.goodsFoodSpecList.length) {
        food.selectSpecFoods = this.food.goodsFoodSpecList[this.specsIndex]
      }
      if (food.attributes) {
        // 如果当前的菜品存在属性
        for (let i = 0; i < food.attributes.length; i++) {
          for (let j = 0; j < food.attributes[i].values.length; j++) {
            // if (this.attributesIndex[i].abIndex && this.attributesIndex[i].abIndex === j) {
            if (this.attributesIndex[i].abIndex === j) {
              if (i === food.attributes.length - 1) {
                attributesStr += food.attributes[i].name + ':' + food.attributes[i].values[j]
              } else {
                attributesStr += food.attributes[i].name + ':' + food.attributes[i].values[j] + '/'
              }
            }
          }
        }
      }
      food.selectAttributes = attributesStr
      this.addFood(food)
      this.showItSpecs = false
    },
    filterEvel (item) {
      this.classifyArr.forEach((data) => {
        data.active = false
      })
      item.active = true
    },
    addFoods (food) {
      var exist = false
      for (let i = 0; i < this.selectFoodsItemProp.length; i++) {
        var selectItem = this.selectFoodsItemProp[i]
        if (this.sameSpecFood(selectItem, food)) {
          if (selectItem.selectCount) {
            selectItem.selectCount += 1
          } else {
            selectItem.selectCount = 1
          }
          this.selectFoodsItemProp[i] = selectItem
          exist = true
          break
        }
      }
      console.log(this.selectFoodsItem)
      // console.log(food)
      if (!exist) {
        food.selectCount = 1
        this.selectFoodsItemProp.push(food)
      }
    },
    subFoods (food) {
      for (let i = 0; i < this.selectFoodsItemProp.length; i++) {
        var selectItem = this.selectFoodsItemProp[i]
        if (this.sameSpecFood(selectItem, food)) {
          if (selectItem.selectCount) {
            selectItem.selectCount -= 1
          } else {
            selectItem.selectCount = 0
          }
          if (selectItem.selectCount === 0) {
            this.selectFoodsItemProp.splice(i, 1)
          } else {
            this.selectFoodsItemProp[i] = selectItem
          }
          break
        }
      }
    },
    sameSpecFood (srcFood, destFood) {
      // selectSpecFoods selectAttributes
      // id 判断
      if (srcFood.id !== destFood.id) {
        return false
      }
      // SpecFoods 判断
      if ((srcFood.selectSpecFoods && !destFood.selectSpecFoods) || (!srcFood.selectSpecFoods && destFood.selectSpecFoods)) {
        return false
      }
      if (srcFood.selectSpecFoods && destFood.selectSpecFoods) {
        if (srcFood.selectSpecFoods.id !== destFood.selectSpecFoods.id) {
          return false
        }
      }
      if ((srcFood.selectAttributes && !destFood.selectAttributes) || (!srcFood.selectAttributes && destFood.selectAttributes)) {
        return false
      }
      if (!srcFood.selectAttributes && !destFood.selectAttributes) {
        return true
      }
      for (var srcKey in srcFood.selectAttributes) {
        if (srcFood.selectAttributes[srcKey] !== destFood.selectAttributes[srcKey]) {
          return false
        }
      }
      for (var desKey in destFood.selectAttributes) {
        if (srcFood.selectAttributes[desKey] !== destFood.selectAttributes[desKey]) {
          return false
        }
      }
      return true
    }
  }
}
</script>

<style lang="stylus" scoped>
.link-x
  height 0.02rem;
  background lightgrey;
  width 90%
  margin 0 auto
.detailWrapper
  position fixed
  left 0
  top 0
  bottom 48px
  width 100%
  background white
  transition all 0.4s ease
  &.move-enter-avtive,&.move-leave-active{
    transform translate3d(0,0,0)
  }
  &.move-enter,&.move-leave-active{
    transform translate3d(100%,0,0)
  }
.foodDetail
  .stock-title
    font-size  0.33rem;
    font-weigh 700
    color: #000000
    margin-left 0.4rem
  .stock-title-ul
    display flex
    flex-wrap wrap
    margin-left 0.3rem;
  .stock-title-ul li
    /*float left*/
    text-align center
    padding-left 0.3rem;
    line-height 0.7rem;
  .back
    position absolute
    color white
    top 12px
    left 6px
    font-size 20px
    padding 10px
  .info
    position relative
    box-sizing border-box
    width 100%
    padding 18px
    .title
      font-size 14px
      font-weight 700
      color rgb(7,17,27)
      line-height 14px
    .food-energy
      text-align right
      width 100%
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
      .energy-ul li
        margin-left 0.5rem
        margin-right 0.5rem;
        text-align center
        /*margin-top 0.1rem;*/
        /*margin-bottom 0.2rem*/
    .desc
      display flex
      padding 0
      font-size 10px
      color rgb(147,153,159)
      line-height 1px
      span:last-child
        padding-left 5px
        font-size 0.4rem;
    .price
      display flex
      padding-top 18px
      font-size 14px
      font-weight 700
      color rgb(240,20,20)
      line-height 24px
      .unit
        font-size 10px
        font-weight normal
        color #FF3A43
      .oldPrice
        padding-left 12px
        font-size 10px
        font-weight normal
        color rgb(147,153,159)
        line-height 24px
    .shopCart
      position absolute
      right 18px
      bottom 18px
      height 24px
      text-align center
      z-index 99999
      .text
        box-sizing border-box
        height 100%
        line-height 24px
        color white
        font-size 10px
        border-radius 12px
        background rgb(0,160,220)
        &.fade-enter-active,&.fade-leave-active{
          transition opacity .5s
        }
        &.fade-enter,&.fade-leave-active{
          opacity 0
        }
    .cartcontrol
      position absolute
      right 12px
      bottom 12px
  .desc
    padding 18px
    font-size 0.5rem;
    /*padding-top 1rem;*/
    .title
      font-size 14px
      font-weight 500
      color #07111b
      margin-bottom 6px
    .content
      font-size 12px
      font-weight 200
      color rgb(77,85,93)
      line-height 24px
      padding 0 8px
  .evaluation
    padding 18px 0
    position relative
    .title
      padding-left 18px
      font-size: 14px
      font-weight 500
      color: #07111b
      margin-top 0.5rem;
    .classify
      padding 18px 0
      margin 0 18px
      border-bottom 1px solid rgba(7,17,27,0.1)
      .item
        display inline-block
        font-size 12px
        padding 8px 12px
        line-height 16px
        background rgba(0,160,220,0.2)
        color rgb(77,85,95)
        margin-right 8px
        .count
          font-size 8px
          padding-left 2px
        &.active
          color white
          background rgb(0,169,220)
        &.bad
          background rgba(77,85,93,0.2)
        &.badActive
          background #4d555d
    .switch
      font-size 12px
      width 100%
      padding 12px 0 12px 18px
      color rgb(147,153,159)
      border-bottom 1px solid rgba(7,17,27,0.1)
      .icon-check_circle
        font-size 24px
        vertical-align middle
        &.on
          color #00c850
    .evel-list
      margin 0 18px
      .evel
        padding 16px 0
        border-bottom 1px solid rgba(7,17,27,0.1)
        .userInfo
          display flex
          color rgb(147,153,159)
          font-size 10px
          line-height 12px
          .time
            flex 1
          .user
            flex 1
            text-align left
            /*margin-left 0.8rem*/
            margin-top 0.5rem;
            .avatar
              img
                padding-left 6px
                border-radius 50%
        .content
          padding-top 6px
          .icon
            font-size 12px
            line-height 24px
            &.icon-thumb_up
              color rgb(0,160,220)
            &.icon-thumb_down
              color rgb(147,153,159)
          .text
            font-size 12px
            color rgb(7,17,27)
            line-height 16px
            padding-left 4px

</style>
