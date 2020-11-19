<template lang="html">
  <div class="goods">
    <Header style="position: absolute;top: -5.3rem;z-index: 1" @on-id="getTodayKcal"></Header>
    <div class="good-nav">
      <div class="btn" :class="{'btn-nt': isShow}" @click="judge">正餐</div>
      <div class="btn" :class="{'btn-nt': isHidder}" @click="judgeShow">早餐/加餐</div>
      <div class="btn" :class="{'btn-nt': isjuke}" @click="juke">饮品</div>
    </div>
    <div style="display:flex;width: 100%;" v-if="isShows === 1">
      <div class="menu-wrapper"  ref="menuWrapper">
        <ul>
          <li v-for="(goodClass, index) in goodsClassList" @click="menuClick(index)" :class="index === menuCurrentIndex ? 'menu-item-selected':'menu-item'" :key="index">
            <div class="badge" v-show="goodsClassSelect[goodClass.id]">
              {{goodsClassSelect[goodClass.id]}}
            </div>
            <span class="text">
            <IconMap v-show="goodClass.type && goodClass.type !== 'COMMON'" :iconType="goodClass.type"></IconMap>
            {{goodClass.name}}
          </span>
          </li>
        </ul>
      </div >
      <div class="foods-wrapper"  ref="foodsWrapper">
        <ul>
          <li v-for="(goodClass, index) in goodsClassList" class="food-list food-list-hook" :key="index">
            <h1>{{goodClass.name}}</h1>
            <ul>
              <li v-for="(food, index) in foodsMap[goodClass.id]" class="food-item" @click="goDetail(food)" :key="index">
                <div class="icon">
                  <img width="57" height="57" :src="food.firstImg"/>
                </div>
                <div class="content">
                  <h2>{{food.foodName}}</h2>
                  <p class="description" v-show="food.description">每100g售价</p>
                  <div class="price" v-if="food.goodsFoodSpecList && food.goodsFoodSpecList.length > 0">
                    <span class="newPrice"><span class="unit">￥</span>{{food.goodsFoodSpecList[0].nowPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl ref="carContal" :food="food" @on-add="addFood" @on-sub="subFood" @ShowSpec="ShowSpec" :isAll="true" :selectFoodsItemProp="selectFoodsItem"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
          <div style="height: 1.5rem;"></div>
        </ul>
      </div>
    </div>
    <div style="display:flex;width: 100%;" v-if="isShows === 2">
      <div class="menu-wrapper"  ref="menuWrapper">
        <ul>
          <li v-for="(goodClass, index) in goodsClassList" @click="menuClick(index)" :class="index === menuCurrentIndex ? 'menu-item-selected':'menu-item'" :key="index">
            <div class="badge" v-show="goodsClassSelect[goodClass.id]">
              {{goodsClassSelect[goodClass.id]}}
            </div>
            <span class="text">
            <IconMap v-show="goodClass.type && goodClass.type !== 'COMMON'" :iconType="goodClass.type"></IconMap>
            {{goodClass.name}}
          </span>
          </li>
        </ul>
      </div >
      <div class="foods-wrapper"  ref="foodsWrapper">
        <ul>
          <li v-for="(goodClass, index) in goodsClassList" class="food-list food-list-hook" :key="index">
            <h1>{{goodClass.name}}</h1>
            <ul>
              <li v-for="(food, index) in foodsMap[goodClass.id]" class="food-item" @click="goDetail(food)" :key="index">
                <div class="icon">
                  <img width="57" height="57" :src="food.firstImg"/>
                </div>
                <div class="content">
                  <h2>{{food.foodName}}</h2>
                  <p class="description" v-show="food.description">每100g售价</p>
                  <div class="price" v-if="food.goodsFoodSpecList && food.goodsFoodSpecList.length > 0">
                    <span class="newPrice"><span class="unit">￥</span>{{food.goodsFoodSpecList[0].nowPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl ref="carContal" :food="food" @on-add="addFood" @on-sub="subFood" @ShowSpec="ShowSpec" :isAll="true" :selectFoodsItemProp="selectFoodsItem"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
          <div style="height: 1.5rem;"></div>
        </ul>
      </div>
    </div>
    <div style="display:flex;width: 100%;" v-if="isShows === 3">
      <div class="menu-wrapper"  ref="menuWrapper">
        <ul>
          <li v-for="(goodClass, index) in goodsClassList" @click="menuClick(index)" :class="index === menuCurrentIndex ? 'menu-item-selected':'menu-item'" :key="index">
            <div class="badge" v-show="goodsClassSelect[goodClass.id]">
              {{goodsClassSelect[goodClass.id]}}
            </div>
            <span class="text">
            <IconMap v-show="goodClass.type && goodClass.type !== 'COMMON'" :iconType="goodClass.type"></IconMap>
            {{goodClass.name}}
          </span>
          </li>
        </ul>
      </div >
      <div class="foods-wrapper"  ref="foodsWrapper">
        <ul>
          <li v-for="(food, index) in fooodTypeList" class="food-item" @click="goDetail(food)" :key="index">
            <div class="icon">
              <img width="57" height="57" :src="food.firstImg"/>
            </div>
            <div class="content">
              <h2>{{food.foodName}}</h2>
              <p class="description" v-show="food.description">每100g售价</p>
              <div class="price" v-if="food.goodsFoodSpecList && food.goodsFoodSpecList.length > 0">
                <span class="newPrice"><span class="unit">￥</span>{{food.goodsFoodSpecList[0].nowPrice}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <CartControl ref="carContal" :food="food" @on-add="addFood" @on-sub="subFood" @ShowSpec="ShowSpec" :isAll="true" :selectFoodsItemProp="selectFoodsItem"></CartControl>
              </div>
            </div>
          </li>
          <div style="height: 1.5rem;"></div>
        </ul>
      </div>
    </div>
    <ShopCart :deliveryPrice="seller.deliveryPrice" :minPrice = "seller.minPrice" @on-add="addFood" @on-sub="subFood" :selectFoodsItemProps="selectFoodsItems" :selectFoodsItemProp="selectFoodsItem" :message="showFoods" :todayKcal="todayKcal" v-if="countFoodsBools"></ShopCart>
    <FoodDetail style="z-index: 2" :food="selectedFood" v-if="selectedFood" ref="foodDetail" @on-add="addFood" @on-sub="subFood" :selectFoodsItemProp="selectFoodsItem"></FoodDetail>
    <FoodDetails style="z-index: 2" :food="selectedFoods" v-if="selectedFoods" ref="foodDetails" @on-add="addFoods" @on-sub="subFoods" :selectFoodsItemProp="selectFoodsItems"></FoodDetails>
    <FooterTab></FooterTab>
  <div>
    <!--<comfirmFood v-if="false"></comfirmFood>-->
  </div>
  </div>

</template>

<script>
import IconMap from '@/components/tack-out/components/icon-map'
import BScroll from 'better-scroll'
import ShopCart from '@/components/tack-out/components/shop-cart'
import CartControl from '@/components/tack-out/components/cart-control'
// import CartControls from '@/components/tack-out/components/cart-control/cart-controls'
import FoodDetail from '@/components/tack-out/components/food-detail'
import FoodDetails from '@/components/tack-out/components/food-detail/food-details'
import GoodsAPI from '@/service/goods-api'
import data from '../data'
import Header from '@/components/tack-out/components/header'
import FooterTab from '../../footer/footer-tab'
import { Log } from '@lemon/euler-app-h5/src/libs/euler-mint-ui'
import { downloadUrl } from '../../../libs/http-api'
import Common from '../../../mixins/common'
export default {
  props: {
    seller: Object
  },
  mixins: [Common],
  created () {
    this.foodList = ''
    this.foodList = this.$route.query.foodList
    this.goods = data.goods
    this.listGoodsClass()
    this.trainFoodLst = this.foodList
  },
  data () {
    return {
      isfile: '1',
      foodList: '',
      selsectsaq: 4,
      isShows: 1,
      isShow: true,
      isHidder: false,
      isjuke: false,
      todayKcal: null,
      count: 5,
      goodsClassList: [],
      foodsMap: {},
      selectFoodsItems: [],
      selectFoodsItem: [],
      goods: [],
      listHeight: [],
      foodsScrollY: 0,
      selectedFood: '',
      selectedFoods: '',
      food: '',
      nutrition: true,
      showItSpecs: false,
      showItSpecss: false,
      specsIndex: 0,
      specsIndexs: 0,
      pic: [],
      limit: 9999,
      time: null,
      orderBy: 'seq',
      showFoods: true,
      targetWeight: '90',
      mealList: [],
      myFoodList: [],
      times: null,
      countFoodsBools: true,
      ruleBehaviorType: 'REDUCE_FAT',
      trainFoodLst: [],
      attributesIndex: [], // 当前选中的属性索引值
      resultParse: [],
      fooodTypeList: [],
      foodType: 'DINNER' // 饮料 DRINK | 正餐 DINNER | 其他(早餐或加餐) ORTHER
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.path === '/confirm-order-food') {
      from.meta.keepAlive = true
    } else {
      from.meta.keepAlive = false
    }
    next()
  },
  activated () {
    this.getfoodListToday()
  },
  computed: {
    menuCurrentIndex () {
      for (let i = 0, l = this.listHeight.length; i < l; i++) {
        let topHeight = this.listHeight[i]
        let bottomHeight = this.listHeight[i + 1]
        if (!bottomHeight || (this.foodsScrollY >= topHeight && this.foodsScrollY < bottomHeight)) {
          return i
        }
      }
      return 0
    },
    goodsClassSelect () {
      if (!this.selectFoodsItem || this.selectFoodsItem.length <= 0) {
        return 1
      }
      var goodsClassSelectMap = {}
      for (let i = 0; i < this.selectFoodsItem.length; i++) {
        var currFood = this.selectFoodsItem[i]
        if (!goodsClassSelectMap[currFood.foodClassId]) {
          goodsClassSelectMap[currFood.foodClassId] = 0
        }
        goodsClassSelectMap[currFood.foodClassId] += 1
      }
      return goodsClassSelectMap
    }
  },
  methods: {
    // 两套餐的更换
    judgeShow () {
      this.isShow = false
      this.isHidder = true
      this.isjuke = false
      this.isShows = 2
      this.foodType = 'ORTHER'
      this.listGoodsClass()
    },
    judge () {
      this.isShow = true
      this.isHidder = false
      this.isjuke = false
      this.isShows = 1
      this.foodsScrollY = 0
      this.foodType = 'DINNER'
      this.listGoodsClass()
    },
    juke () {
      this.isShow = false
      this.isHidder = false
      this.isjuke = true
      this.isShows = 3
      this.foodType = 'DRINK'
      this.listGoodsClass()
    },
    getTodayKcal (mun) {
      this.todayKcal = mun
    },
    // 记录当前所选规格的索引值
    chooseSpecs (index) {
      this.specsIndex = index
    },
    ShowSpec (food) {
      this.showItSpecs = !this.showItSpecs
      this.specsIndex = 0
      this.attributesIndex = []
      this.food = food
      if (this.food.attributes) {
        // 如果当前的菜品存在属性
        for (let i = 0; i < this.food.attributes.length; i++) {
          this.attributesIndex.push({
            abIndex: 0
          })
        }
      }
    },
    ShowSpecs (food) {
      this.showItSpecss = !this.showItSpecs
      this.specsIndexs = 0
      this.attributesIndex = []
      this.food = food
      if (this.food.attributes) {
        // 如果当前的菜品存在属性
        for (let i = 0; i < this.food.attributes.length; i++) {
          this.attributesIndex.push({
            abIndex: 0
          })
        }
      }
    },
    closeShowSpec () {
      this.showItSpecs = false
    },
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
    listGoodsClass () {
      GoodsAPI.listDetailsClass({ type: this.foodType }, res => {
        this.goodsClassList = res
        this.listFoods()
      })
    },
    getGoodsClassName (foodClassId) {
      for (let i = 0; i < this.goodsClassList.length; i++) {
        if (this.goodsClassList[i].id === foodClassId) {
          return this.goodsClassList[i].name
        }
      }
    },
    listFoods () {
      GoodsAPI.listFoods({ limit: this.limit, type: this.foodType }, res => {
        var dataArray = res.rows
        this.fooodTypeList = res.rows
        var result = {}
        for (let i = 0; i < dataArray.length; i++) {
          if (dataArray[i].imagePaths && dataArray[i].imagePaths.length > 0) {
            dataArray[i].firstImg = downloadUrl + dataArray[i].imagePaths[0]
          }
          if (!result[dataArray[i].foodClassId]) {
            result[dataArray[i].foodClassId] = []
          }
          dataArray[i].selectCount = 0
          result[dataArray[i].foodClassId].push(dataArray[i])
        }
        this.foodsMap = result
        this.$nextTick(() => {
          this._initScroll() // 初始化scroll
          this._calculateHeight() // 初始化列表高度列表
        })
      })
    },
    _initScroll () {
      this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      })
      // 监控滚动事件
      this.foodsScroll.on('scroll', (pos) => {
        this.foodsScrollY = Math.abs(Math.round(pos.y))
      })
    },
    menuClick (index) {
      this.foodsScroll.scrollTo(0, -this.listHeight[index], 300)
    },
    _calculateHeight () {
      let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0, l = foodList.length; i < l; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
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
    },
    // 扫码下单
    getfoodListToday () {
      var list = []
      var foodsList = []
      GoodsAPI.listFoods({ limit: this.limit }, res => {
        foodsList = res.rows
        for (let i in this.trainFoodLst) {
          list.push(i)
        }
        var food = list.filter(item => {
          for (let j in foodsList) {
            if (item === foodsList[j].id) {
              this.food = foodsList[j]
              this.addCart()
            }
            console.log(food)
          }
        })
      })
    },
    // 按钮的加数
    addFood (food) {
      if (this.token) {
        var classAmount = this.calFoodClassAmount(food.foodClassId)
        if (food.foodClassId === '8') {
          if (classAmount >= 2) {
            let className = this.getGoodsClassName(food.foodClassId)
            Log.error(className + '不能订购超过两种')
            return
          }
        } else {
          if (classAmount >= 1) {
            let className = this.getGoodsClassName(food.foodClassId)
            Log.error(className + '不能订购超过一种')
            return
          }
        }
        var exist = false
        for (let i = 0; i < this.selectFoodsItem.length; i++) {
          var selectItem = this.selectFoodsItem[i]
          if (this.sameSpecFood(selectItem, food)) {
            if (selectItem.selectCount) {
              selectItem.selectCount = 1
            } else {
              selectItem.selectCount = 1
            }
            this.selectFoodsItem[i] = selectItem
            exist = true
            break
          }
        }
        if (!exist) {
          food.selectCount = 1
          this.selectFoodsItem.push(food)
        }
      } else {
        this.goLogin()
      }
    },
    calFoodClassAmount (foodClassId) {
      var classAmount = 0
      for (let i = 0; i < this.selectFoodsItem.length; i++) {
        if (this.selectFoodsItem[i].foodClassId === foodClassId && this.selectFoodsItem[i].selectCount) {
          classAmount += this.selectFoodsItem[i].selectCount
        }
      }
      return classAmount
    },
    // 按钮的加数
    addFoods (food) {
      if (this.token) {
        var exist = false
        for (let i = 0; i < this.selectFoodsItems.length; i++) {
          var selectItem = this.selectFoodsItems[i]
          if (this.sameSpecFood(selectItem, food)) {
            if (selectItem.selectCount) {
              selectItem.selectCount += 1
            } else {
              selectItem.selectCount = 1
            }
            this.selectFoodsItems[i] = selectItem
            exist = true
            break
          }
        }
        if (!exist) {
          food.selectCount = 1
          this.selectFoodsItems.push(food)
        }
      } else {
        this.goLogin()
      }
    },
    // 按钮的减数
    subFood (food) {
      if (this.token) {
        this.isfile = '1'
        for (let i = 0; i < this.selectFoodsItem.length; i++) {
          var selectItem = this.selectFoodsItem[i]
          if (this.sameSpecFood(selectItem, food)) {
            if (selectItem.selectCount) {
              selectItem.selectCount = 0
            } else {
              selectItem.selectCount = 0
            }
            if (selectItem.selectCount === 0) {
              this.selectFoodsItem.splice(i, 1)
            } else {
              this.selectFoodsItem[i] = selectItem
            }
            break
          }
        }
      } else {
        this.goLogin()
      }
    },
    // 按钮的减数
    subFoods (food) {
      for (let i = 0; i < this.selectFoodsItems.length; i++) {
        var selectItem = this.selectFoodsItems[i]
        if (this.sameSpecFood(selectItem, food)) {
          if (selectItem.selectCount) {
            selectItem.selectCount -= 1
          } else {
            selectItem.selectCount = 0
          }
          if (selectItem.selectCount === 0) {
            this.selectFoodsItems.splice(i, 1)
          } else {
            this.selectFoodsItems[i] = selectItem
          }
          break
        }
      }
    },
    goDetail (food) {
      this.selectedFood = food
      this.$nextTick(() => {
        this.$refs.foodDetail.showToggle(food)
        this.$refs.foodDetail.viewDetail(food)
        this.$refs.foodDetail.listByGoodsFoodId(food)
      })
    }
  },
  components: {
    IconMap,
    ShopCart,
    CartControl,
    // CartControls,
    FoodDetail,
    Header,
    FoodDetails,
    FooterTab
  }
}

</script>

<style lang="stylus">
  @import "goods.styl"
  .btn{
    /*opacity: 0.2;*/
    width 2rem;
    background white;
    text-align center;
    color black;
    font-size 0.4rem;
    border-radius 10% 10% 0 0
    height 1rem;
    line-height 1rem;
    font-weight bolder
    margin-left 0.5rem;
  }
  .btn-nt{
    /*opacity: 0.2;*/
    width 2rem;
    text-align center;
    color black;
    font-size 0.4rem;
    border-radius 10% 10% 0 0
    height 1rem;
    line-height 1rem;
    font-weight bolder
    border-bottom 2px solid #FABD00
  }
  .font-color{
    color #F6BF3C
  }
  .good-nav{
    width 100%;
    display: flex;
    justify-content center;
    position: absolute;
    top:1.85rem;
    height 0.8rem;
    z-index 2;
  }
</style>
