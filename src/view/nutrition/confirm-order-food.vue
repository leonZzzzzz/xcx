<template>
  <div class="confirm-order-food" style="background-color: #EFEFEF;">
    <div>
      <Header title="确认订单" style="margin-bottom: 0.2rem;"></Header>
      <div class="box-content-confirm-order-food">
        <div class="order-item">
          <div class="item-box1">
            <mt-navbar class="page-part" v-model="selected" style="position: fixed;top: 63px;z-index: 2;width: 100%;">
              <mt-tab-item class="div1" id="1"><img src="../../assets/images/common/tx.png" style="width: 0.8rem;"/>堂食</mt-tab-item>
              <mt-tab-item class="div2" id="2"><img src="../../assets/images/common/waimai.png" style="width: 0.7rem;"/>外卖</mt-tab-item>
            </mt-navbar>
          </div>
          <div>
            <mt-tab-container v-model="selected">
              <mt-tab-container-item id="1">
                <div style="width: 100%;height: 0.1rem;background-color: #EFEFEF;"></div>
                <div class="food-mun">
                  <div class="num">{{list.kcal}}<span>kcal</span></div>
                  <div class="food">当餐分量</div>
                </div>
                <div class="item-box2" v-for="(item,index) of getKcl.newGoodsFoodListVO" :key="index">
                  <div class="order-detail">
                    <div><img :src="item.goodsFood.imagePaths" alt=""></div>
                    <div style="width: 4rem;height: 100%">
                      <!--物品名称-->
                      <div style="height: 1rem;line-height: 1rem;color: #000000;">{{item.goodsFood.foodName}}</div>
                      <!--选择的数量-->
                      <div style="color: #797878">×1</div>
                      <div style="font-size: .35rem;color: black;white-space: nowrap">重量：{{getKcl.newGoodsFoodListVO[index].goodsFoodWeight}}(g)</div>
                      <!--餐饮中含有的热能-->
                      <!--                    <div style="font-size: .35rem;color: #f16620;white-space: nowrap">热量：{{item.selectSpecFoods.kcal*item.selectCount}}KCL</div>-->
                    </div>
                    <!--选择的数量计算出的总价格-->
                    <div class="order-number" style="color: red">￥{{getKcl.newGoodsFoodListVO[index].goodsFoodMoney}}</div>
                  </div>
                </div>
                <div class="item-box2" v-for="(item,index) of goodsFoodIdMeal" :key="index">
                  <div class="order-detail">
                    <div><img :src="item.imagePaths" alt=""></div>
                    <div style="width: 4rem;height: 100%">
                      <!--物品名称-->
                      <div style="height: 1rem;line-height: 1rem">{{item.name}}</div>
                      <!--选择的数量-->
                      <div style="color: #797878">×{{item.selectCount}}</div>
                      <!--<div style="font-size: .35rem;color: #2eb4f1;white-space: nowrap">{{item.attributes}}</div>-->
                      <!--餐饮中含有的热能-->
                      <div style="font-size: .35rem;color: black;white-space: nowrap">重量：0(g)</div>
                    </div>
                    <!--单价-->
                    <div class="order-number" style="color: red">￥{{item.price}}</div>
                  </div>
                </div>
                <div style="width: 100%;height: 0.3rem;background-color: #EFEFEF;"></div>
                <div class="cell-item" @click="popupCoupon=true" style="margin-top: 0.3rem;">
                  <div class="title">优惠券</div>
                  <div class="content" @click="popupCoupon=true">-￥0 <img src="../../assets/original-images/choice.png" alt=""></div>
                </div>
                <div class="link-y"></div>
              </mt-tab-container-item>
              <mt-tab-container-item id="2">
                <div style="width: 100%;height: 0.1rem;background-color: #EFEFEF;"></div>
                <div style="height: 1.5rem;">
                  <div style="margin-left: 0.7rem;margin-top: 0.3rem;font-size: 0.4rem;">
                    <span>张三</span>
                    <span style="margin-left: 0.5rem;">12345678911</span>
                  </div>
                  <div style="margin-left: 0.7rem;font-size: 0.35rem;margin-top: 0.1rem;">
                    <img src="../../assets/images/common/dz.png" style="width: 0.4rem;"/><span>中山大道西238勤天大厦505</span>
                    <img src="../../assets/original-images/choice.png" alt="" style="position: absolute;right: 0.5rem;width: 0.2rem;top: 1.25rem;">
                  </div>
                </div>
                <div style="width: 100%;height: 0.1rem;background-color: #EFEFEF;"></div>
                <div style="margin-left: 0.5rem;margin-top: 0.3rem;margin-bottom: 0.2rem;">
                  <span>送达时间</span>
                  <span style="margin-left: 2.5rem;">现在下单（约1小时送达）</span>
                </div>
                <div style="width: 100%;height: 0.1rem;background-color: #EFEFEF;"></div>
                <div class="food-mun">
                  <div class="num">{{getKcl.kcal}}<span>KCL</span></div>
                  <div class="food">当餐分量</div>
                </div>
                <div class="item-box2" v-for="(item,index) of getKcl.newGoodsFoodListVO" :key="index">
                  <div class="order-detail">
                    <div><img :src="item.goodsFood.imagePaths" alt=""></div>
                    <div style="width: 4rem;height: 100%">
                      <!--物品名称-->
                      <div style="height: 1rem;line-height: 1rem">{{item.goodsFood.foodName}}</div>
                      <!--选择的数量-->
                      <div style="color: #797878">×1</div>
                      <!--<div style="font-size: .35rem;color: #2eb4f1;white-space: nowrap">{{item.attributes}}</div>-->
                      <!--餐饮中含有的热能-->
                      <div style="font-size: .35rem;color: black;white-space: nowrap">重量：{{getKcl.newGoodsFoodListVO[index].goodsFoodWeight}}(g)</div>
                    </div>
                    <!--单价-->
                    <div class="order-number" style="color: red">￥{{getKcl.newGoodsFoodListVO[index].goodsFoodMoney}}</div>
                  </div>
                </div>
                <div class="item-box2" v-for="(item,index) of goodsFoodIdMeal" :key="index">
                  <div class="order-detail">
                    <div><img :src="item.imagePaths" alt=""></div>
                    <div style="width: 4rem;height: 100%">
                      <!--物品名称-->
                      <div style="height: 1rem;line-height: 1rem">{{item.name}}</div>
                      <!--选择的数量-->
                      <div style="color: #797878">×{{item.selectCount}}</div>
                      <!--<div style="font-size: .35rem;color: #2eb4f1;white-space: nowrap">{{item.attributes}}</div>-->
                      <!--餐饮中含有的热能-->
                      <div style="font-size: .35rem;color: black;white-space: nowrap">重量：0(g)</div>
                    </div>
                    <!--单价-->
                    <div class="order-number" style="color: red">￥{{item.price}}</div>
                  </div>
                </div>
                <div style="width: 100%;height: 0.3rem;background-color: #EFEFEF;"></div>
                <div style="margin-top: 0.2rem;margin-left: 0.5rem;font-size: 0.35rem;">
                  <div>
                    <span>餐盒费</span>
                    <span style="margin-left: 7rem;">¥ 1</span>
                  </div>
                  <div style="margin-top: 0.2rem;">
                    <span>配送费</span>
                    <span style="margin-left: 7rem;">¥ 1</span>
                  </div>
                </div>
                <div style="width: 100%;height: 0.3rem;background-color: #EFEFEF;margin-top: 0.2rem;"></div>
                <div class="cell-item" style="margin-top: 0.3rem;">
                  <div class="title">优惠券</div>
                  <div class="content" @click.stop="choiceCoupon">-￥0 <img src="../../assets/original-images/choice.png" alt=""></div>
                </div>
                <div class="link-y"></div>
                <div style="width: 100%;height: 0.3rem;background-color: #EFEFEF;margin-top: 0.2rem;"></div>
                <div style="width: 100%;height: 0.05rem;background-color: #EFEFEF;margin-top: 0.2rem;"></div>
              </mt-tab-container-item>
            </mt-tab-container>
          </div>
        </div>
        <div class="confirm">
          <div class="confirm-le" style="font-size: 0.4rem">已优惠￥：0</div>
          <div class="confirm-le"></div>
          <div class="confirm-left">合计：<span style="color: #F08000; font-size: 0.45rem; font-weight: bold" >￥ {{list.money}}</span></div>
          <div class="confirm-right" @click="becomeOrder">去支付</div>
        </div>
      </div>
    </div>
    <PopupCoupon :popupCoupon="popupCoupon" @on-close="onClose" cardType="FOOD_ONCE"></PopupCoupon>
  </div>
</template>

<script>
import NutritionPI from '@/service/nutrition-api'
import GoodAPI from '@/service/goods-api'
// import HttpAPI from '../../service/user-api'
import { downloadUrl } from '../../libs/http-api'
import Header from '../../components/header/header'
import PopupCoupon from '../../components/coupon/popup-coupon'
export default {
  components: {
    Header,
    PopupCoupon
  },
  data () {
    return {
      ableCoupon: '',
      pay: '1',
      orderMoneyList: '',
      list: [],
      showCoupon: false,
      selected: '1',
      userNumber: 3,
      carList: [],
      cartIds: [],
      moneyList: '',
      moneyListVO: [{
        amount: '',
        nowPrice: ''
      }],
      eatType: 'DINE_IN', // 堂食还是外卖
      couponId: '', //  优惠券id，
      remark: '22', // 评论
      roomId: '1', //  健身房id
      totalPrice: '',
      selectFoods: [],
      cartDoseQtyList: [], // 营养餐的id
      foodSetCartList: [], // 套餐的id
      cartMealIds: [],
      cartId: '',
      isA: true,
      isB: false,
      message: false,
      // messages: false,
      value: false,
      a: true,
      orderCardList: null,
      todayKcal: null,
      cartLists: [],
      goodsFoodIds: [], // 一餐所以的id
      getKcl: [],
      kg: [],
      goodsFoodIdMeal: [],
      ruleBehaviorType: 'REDUCE_FAT',
      disType: 'NORMAL_DIS',
      createOrderList: [],
      popupCoupon: false,
      tempId: ''
    }
  },
  created () {
    this.getKcl = []
    this.carList = []
    this.goodsFoodIdMeal = []
    this.todayKcal = this.$route.query.todayKcal
    this.carList = this.$route.query.selectFoods
    this.list = this.$route.query.list
    this.orderMoneyList = this.list.money
    this.goodsFoodIdMeal = this.$route.query.goodsFoodIdMeal
    this.addCart()
  },
  beforeRouteLeave (to, from, next) {
    if (to.path === '/tack_out_goods') {
      to.meta.keepAlive = true
    } else {
      to.meta.keepAlive = false
    }
    next()
  },
  methods: {
    onClose (item) {
      console.log(item)
      this.couponId = item.couponId
      // this.couponMoney = item.
      this.popupCoupon = false
    },
    // 健身规则项(减脂REDUCE_FAT|增肌GAIN_MUSCLE|保持KEEP_WEIGHT)
    getMoneyKcl () {
      let goodsFoodId = []
      for (let i = 0; i < this.carList.length; i++) {
        goodsFoodId.push({ goodsFoodId: this.carList[i].id })
      }
      GoodAPI.mealMoney({ mealKcal: this.todayKcal, newGoodsFoodListVO: goodsFoodId, ruleBehaviorType: this.ruleBehaviorType }, res => {
        this.getKcl = res
        this.tempId = res.tempId
        for (let i = 0; i < this.getKcl.newGoodsFoodListVO.length; i++) {
          if (this.getKcl.newGoodsFoodListVO[i].goodsFood.imagePaths === null) {
            this.getKcl.newGoodsFoodListVO[i].goodsFood.imagePaths = '../../../../assets/images/common/boy'
          } else {
            this.getKcl.newGoodsFoodListVO[i].goodsFood.imagePaths = downloadUrl + this.getKcl.newGoodsFoodListVO[i].goodsFood.imagePaths
          }
        }
        this.getWeight()
      })
    },
    // 计算重量
    getWeight () {
      let newGoodsFoodListVOs = []
      for (let i = 0; i < this.getKcl.newGoodsFoodListVO.length; i++) {
        newGoodsFoodListVOs.push({ goodsFoodId: this.getKcl.newGoodsFoodListVO[i].goodsFoodId, goodsFoodWeight: this.getKcl.newGoodsFoodListVO[i].goodsFoodWeight })
      }
      GoodAPI.setWeight({ cartIds: this.cartIds, newGoodsFoodListVO: newGoodsFoodListVOs }, res => {
      })
    },
    // 计算营养kcal和批量添加
    addCart () {
      let foodCartList = []
      let foodSetCartList = []
      for (let i = 0; i < this.carList.length; i++) {
        var specItem = this.carList[i].selectSpecFoods
        foodCartList.push({ roomId: this.roomId,
          foodId: this.carList[i].id,
          count: this.carList[i].selectCount,
          specFoods: specItem,
          foodSpecId: specItem.id
        })
      }
      for (let i = 0; i < this.goodsFoodIdMeal.length; i++) {
        foodSetCartList.push({ foodSetId: this.goodsFoodIdMeal[i].id, amount: this.goodsFoodIdMeal[i].selectCount })
      }
      GoodAPI.mealAdd({ foodSetCartList: foodSetCartList }, res => {
        this.cartMealIds = res
      })
      GoodAPI.batchAdd({ foodCartList: foodCartList }, res => {
        this.cartIds = res
        this.getMoneyKcl()
      })
      NutritionPI.getCartList({}, res => {
        this.cartLists = res
      })
    },
    // 创建订单
    becomeOrder () {
      this.cartDoseQtyList = []
      this.foodSetCartList = []
      for (let i = 0; i < this.cartIds.length; i++) {
        this.cartDoseQtyList.push({ cartId: this.cartIds[i] })
      }
      NutritionPI.createOrder({ tempId: this.tempId, eatType: this.eatType, couponId: this.couponId, cartDoseQtyList: this.cartDoseQtyList, foodSetCartList: this.foodSetCartList }, res => {
        this.pay = true
        this.$router.push({
          path: '/payment_home',
          query: {
            orderList: res
          }
        })
      })
    },
    choiceCoupon () {
      this.showCoupon = true
    },
    closeCoupon () {
      this.showCoupon = false
    }
  }
}
</script>

<style lang="less" scoped>
  @import "confirm-order-food.less";
  .overCoupon{
    text-align: center;
    height: 20px;
    font-size: .5rem;
    line-height: 20px;
    background-color: #F1F1F6;
    padding-top: 0.3rem;
    margin-bottom: 0.5rem;
  }
</style>
