<style lang="less" scoped>
  @import "my-order.less";
</style>
<template>
    <div class="my-order" style="background-color: #313131;height: 100%;">
      <Header title="我的订单" :leftIcon="true" routerUrl="personal-index"></Header>
      <div>
      </div>
        <div style="margin-top: 50px;height: 100%;  background-color: #313131;" >
          <!--加载层-->
          <div style="padding-top: 50%;margin-left: 4.5rem;" v-if="jiaZaiOne">
            <mt-spinner type="triple-bounce"></mt-spinner>
          </div>
          <div class="box-content" v-if="jiaZaiTwo">
              <ul class="order-item" style="color: white;height: 100%;  background-color: #313131;">
          <!--购卡订单-->
               <li v-for="(item,index) in orderList" :key="index.id">
                <div class="item-box1">
                  <img src="../../assets/images/common/jhk.png" style="width: 0.8rem;"/>
                  <div class="div1">计划卡<span style="margin-left: 0.3rem;color: #F6BF3C;">(强度训练)</span></div>
                  <div class="div2" v-if="item.status==='FINISH'">已完成</div>
                  <div class="div2" v-if="item.status==='TODO'">未付款</div>
                  <div class="div2" v-if="item.status==='CANCEL'">已取消</div>
                </div>
                <div class="item-box2">
                  <div class="order-detail" @click="lookOrder(item.id)" style="">
                    <div style="display: flex;justify-content: space-between;margin-left: 0.3rem;">
                      <div style="margin-right: 6rem;">训练次数：</div>
                      <div>不限次数</div>
                    </div>
                  </div>
                  <div class="total">
                    <div style=""></div>
                    <div  style="margin-left: 7.6rem;"> ￥{{item.detailList[0].price}}</div>
                  </div>
                </div>
                <div class="item-box3" v-if="item.status==='TODO'">
                  <span style="border-radius: 0.2rem;" v-if="item.status ==='TODO'" @click="distOrder(item.id)">取消订单</span>
                  <span style="background-color: #F6BF3C;color: #000000;border-radius: 0.2rem;" v-if="item.status ==='TODO'" @click="payMentCard(item)">去支付</span>
                </div>
               </li>
          <!--食物订单-->
               <li v-for="(item,index) in foodsList" :key="index.id">
                  <div class="item-box1">
                    <img src="../../assets/images/common/st.png" style="width: 0.7rem;" v-if="item.eatType==='DINE_IN'"/>
                    <img src="../../assets/images/common/wm.png" style="width: 0.7rem;" v-if="item.eatType==='TAKEOUT'"/>
                    <div class="div1" style="position: absolute;" v-if="item.eatType==='DINE_IN'">食堂</div>
                    <div class="div1" style="position: absolute;" v-if="item.eatType==='TAKEOUT'">外卖</div>
                    <div class="div2" v-if="item.status==='TODO'">未付款</div>
                    <div class="div2" v-if="item.status==='CANCEL'">已取消</div>
                    <div class="div2" v-if="item.status==='FINISH'">已完成</div>
                    <div class="div2" v-if="item.status === 'WAIT_EVALUATE'">待评价</div>
                    <div class="div2" v-if="item.status === 'WAIT_COOK_ACCEPT'">待取餐</div>
                    <div class="div2" v-if="item.status === 'WAIT_COOK'">待取餐</div>
                    <div class="div2" v-if="item.status === 'WAIT_TOKE'">待取餐</div>
                    <div class="div2" v-if="item.status === 'APPLY_REFUND'">退款中</div>
                  </div>
                  <div class="item-box2" @click="lookFoods(item)">
                    <div class="order-detail">
                      <ul>
                        <li v-for="index in item.detailList" :key="index.id" style="display: flex;justify-content: space-between;">
                          <div style="width: 9rem;">{{index.foodName}}</div>
                          <div style="width: 0.8rem;">¥{{index.amount}}</div>
                        </li>
                        <li v-for="index in item.orderFoodSetDetailVOList" :key="index.id" style="display: flex">
                          <div style="width: 2.5rem;">{{index.foodSetName}}</div>
                          <div style="position: relative;left: 6rem;">¥{{index.foodSetPrice}}</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="item-box3">
                    <span style="border-radius: 0.2rem;" v-if="item.status ==='TODO'" @click="foodsOrder(item.id)">取消订单</span>
                    <span style="background-color: #F6BF3C;color: #000000;border-radius: 0.2rem;" v-if="item.status ==='TODO'" @click="payMent(item)">去支付</span>
                    <span style="background-color: #F6BF3C;color: #000000;border-radius: 0.2rem;" v-if="item.status ==='WAIT_EVALUATE'" @click="assess(item.id)">去评价</span>
                    <span style="background-color: #F6BF3C;color: #000000;border-radius: 0.2rem;" v-if="item.status ==='WAIT_COOK_ACCEPT'" @click="confirm(item.id)">确认收货</span>
                    <span style="background-color: #F6BF3C;color: #000000;border-radius: 0.2rem;" v-if="item.status ==='WAIT_COOK'" @click="confirm(item.id)">确认收货</span>
                    <span style="background-color: #F6BF3C;color: #000000;border-radius: 0.2rem;" v-if="item.status ==='WAIT_TOKE'" @click="confirm(item.id)">确认收货</span>
                  </div>
                </li>
              </ul>
          </div>
        </div>
      <div v-if="popupVisible">
        <mt-popup v-model="popupVisible" popup-transition="popup-fade" class="pop-table">
          <div style="margin-top: 1.5rem;margin-left: 30%;font-size:0.45rem;color: black; ">是否确认取消订单</div>
          <div class="btn">
            <div class="btn-qx" @click="popupVisible=false">取消</div>
            <div class="btn-qd" @click="dist()">确定</div>
          </div>
        </mt-popup>
      </div>
      <div v-if="popupVisibleFood">
        <mt-popup v-model="popupVisibleFood" popup-transition="popup-fade" class="pop-table">
          <div style="margin-top: 1.5rem;margin-left: 30%;font-size:0.45rem;color: black; ">是否确认取消订单</div>
          <div class="btn">
            <div class="btn-qx" @click="popupVisibleFood=false">取消</div>
            <div class="btn-qd" @click="distFoods()">确定</div>
          </div>
        </mt-popup>
      </div>
      <div v-if="popupVisibleGet">
        <mt-popup v-model="popupVisibleGet" popup-transition="popup-fade" class="pop-table">
          <div style="margin-top: 1.5rem;margin-left: 30%;font-size:0.45rem;color: black; ">是否确定收货？</div>
          <div class="btn">
            <div class="btn-qx" @click="popupVisibleGet=false">取消</div>
            <div class="btn-qd" @click="confirmList()">确定</div>
          </div>
        </mt-popup>
      </div>
    </div>
</template>

<script>
import UserAPI from '@/service/user-api'
import HttpAPI from '../../service/user-api'
import goodsAPI from '../../service/goods-api'
import Header from '../../components/header/header'
import { Log } from '@lemon/euler-app-h5/src/libs/euler-mint-ui'
export default {
  name: 'my-order',
  components: {
    Header
  },
  data () {
    return {
      url: '/traffic',
      popupVisibleFood: false,
      popupVisible: false,
      popupVisible1: false,
      popupVisible2: false,
      popupVisibleGet: false,
      selected: '1',
      type: '',
      foodOrderList: [],
      offset: 0,
      limit: 99999,
      orderList: [],
      foodsList: [],
      id: '',
      foodId: '',
      cancelCause: '无',
      lookId: '',
      lookFoodId: '',
      dteils: '',
      payAmount: '',
      jiaZaiOne: true,
      jiaZaiTwo: false
    }
  },

  watch: {
  },
  methods: {
    // 去购卡
    payMentCard (key) {
      this.lookFoodId = key
      this.$router.push({
        path: '/confirm-order',
        query: {
          orderID: this.lookFoodId.id
        }
      })
    },
    // 去支付
    payMent (key) {
      this.lookFoodId = key
      this.$router.push({
        path: '/payment_home',
        query: {
          orderList: this.lookFoodId
        }
      })
    },
    // 确认收货
    confirm (key) {
      this.lookId = key
      this.popupVisibleGet = true
    },
    confirmList () {
      HttpAPI.confirmOrder({ id: this.lookId }, res => {
        this.popupVisibleGet = false
        this.newFoodsList()
        Log.deal({
          message: '已确认收货',
          position: 'bottom'
        })
      })
    },
    lookFoods (key) {
      this.lookFoodId = key.id
      this.$router.push({
        path: '/details_home',
        query: {
          lookFoodId: this.lookFoodId
        }
      })
    },
    lookOrder (key) {
      this.lookId = key
      this.$router.push({
        path: '/OrderDateils_home',
        query: {
          lookId: this.lookId
        }
      })
    },
    getOrderList () {
      UserAPI.orderFoodDetail({}, res => {
        this.foodOrderList = res.rows
        for (let i = 0; i < this.foodOrderList; i++) {
          for (let j = 0; j < this.foodOrderList.detailList.length; j++) {
          }
        }
      })
    },
    // 取消订餐订单
    foodsOrder (foodId) {
      this.foodId = foodId
      this.popupVisibleFood = true
    },
    distFoods () {
      goodsAPI.delectFoods({ id: this.foodId, cancelCause: this.cancelCause }, res => {
        this.newFoodsList()
        Log.deal({
          message: '订单已取消',
          position: 'bottom'
        })
      })
      this.popupVisibleFood = false
    },
    // 购卡取消订单
    distOrder (id) {
      console.log('distOrder:' + id)
      this.id = id
      this.popupVisible = true
    },
    dist () {
      HttpAPI.orderdist({ id: this.id }, res => {
        this.newOrderList()
        Log.deal({
          message: '订单已取消',
          position: 'bottom'
        })
      })
      this.popupVisible = false
      // this.$router.go(0)
    },
    // 滚动加载事件
    scollFun () {
      console.log('在滚动')
      console.log(document.getElementById('myOrder'))
      var wScrollY = document.getElementById('myOrder').scrollHeight
      var wInnerH = document.getElementById('myOrder').clientHeight
      var bScrollH = document.getElementById('myOrder').scrollTop
      console.log(wScrollY)
      console.log(wInnerH)
      console.log(bScrollH)
      if (wScrollY === wInnerH + bScrollH) {
        console.log('||||')
        this.offset += this.limit
        this.getOrderList()
      }
    },
    // 刷新列表
    newOrderList () {
      HttpAPI.orderList({ limit: this.limit, offset: this.offset }, res => {
        for (let i = 0; i < res.rows.length; i++) {
          this.orderList = res.rows
          console.log(this.orderList[0])
        }
      })
    },
    newFoodsList () {
      goodsAPI.foodsList({ limit: this.limit, offset: this.offset }, res => {
        for (let i = 0; i < res.rows.length; i++) {
          this.foodsList = res.rows
          console.log(this.orderList[0])
        }
      })
    },
    // 营养评论
    assess (key) {
      this.dteils = key
      this.$router.push({
        path: '/assess_home',
        query: {
          dteils: this.dteils
        }
      })
    },
    // 空值返回键
    fun () {
      this.$router.push('/personal-index')
    }
  },
  destroyed () {
    window.removeEventListener('popstate', this.fun, false)
  },
  mounted () {
    // this.getFoodDetails()
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
    }
    window.addEventListener('popstate', this.fun, false)
    let _this = this
    setTimeout(function () {
      _this.jiaZaiTwo = true
      _this.jiaZaiOne = false
    }, 500)
    HttpAPI.orderList({ limit: this.limit, offset: this.offset }, res => {
      for (let i = 0; i < res.rows.length; i++) {
        this.orderList = res.rows
      }
    })
    goodsAPI.foodsList({ limit: this.limit, offset: this.offset }, res => {
      for (let i = 0; i < res.rows.length; i++) {
        this.foodsList = res.rows
      }
    })
  }
}
</script>

<style scoped>

</style>
