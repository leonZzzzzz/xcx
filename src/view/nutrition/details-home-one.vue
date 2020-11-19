<template>
    <div class="header-details">
      <div class="header" @click="$router.push('/myOrder')" style="background-color: #1C1C1C;">
        <img src="../../assets/images/common/left_icon_black_big.png" @click="$router.push('/myOrder')" style="width: 0.25rem;margin-top: 0.5rem;position: absolute;"/>
        <div class="details-title" style="color: white;font-weight: lighter;margin-top: 1rem;">订单详情</div>
      </div>
      <div class="nav" style="background: white; height: 3rem;padding-top: 0.5rem;">
        <div style="color: #F6BF3C;font-size: 0.4rem;margin-left: 0.2rem;" v-if="foodInfo.status === 'TODO'">待付款
          <div style="border-radius: 0.1rem;color:#F6BF3C;font-size: 0.3rem;position: absolute;right: 0.2rem;top: 1.6rem;border: 1px gainsboro solid;width: 2.2rem;height: 0.8rem;line-height: 0.8rem;text-align: center" @click="callPhone">联系商家</div>
        </div>
        <div style="color: #F6BF3C;font-size: 0.4rem;margin-left: 0.2rem;" v-if="foodInfo.status === 'CANCEL'">订单已取消
          <!--<div style="border-radius: 0.1rem;color:#F6BF3C;font-size: 0.3rem;position: absolute;right: 0.2rem;top: 1.6rem;border: 1px gainsboro solid;width: 2.2rem;height: 0.8rem;line-height: 0.8rem;text-align: center" @click="callPhone">联系商家</div>-->
        </div>
        <div style="color: #F6BF3C;font-size: 0.4rem;margin-left: 0.2rem;" v-if="foodInfo.status === 'WAIT_COOK_ACCEPT' || foodInfo.status === 'WAIT_COOK'">您的取餐码：{{foodInfo.takeFoodNo}}
          <span style="color:#727171;font-size: 0.3rem;position: absolute;right: 0.2rem;top: 1.85rem;">请时刻关注并及时取餐</span>
        </div>
        <div style="color: #F6BF3C;font-size: 0.4rem;margin-left: 0.2rem;font-weight: bold;" v-if="foodInfo.status === 'APPLY_REFUND'">待商家确认退款</div>
        <div style="color: #F6BF3C;font-size: 0.4rem;margin-left: 0.2rem;font-weight: bold;" v-if="foodInfo.status === 'APPLY_REFUND_SUCCESS'">商家同意退款</div>
        <div style="color: #F6BF3C;font-size: 0.4rem;margin-left: 0.2rem;font-weight: bold;" v-if="foodInfo.status === 'APPLY_REFUND_FAILED'">商家不同意退款</div>
        <div class="link-x" style="margin-top: 0.2rem;"></div>
        <div style="margin-left: 0.2rem;display: flex;margin-top: 0.5rem;" v-if="foodInfo.status === 'WAIT_COOK_ACCEPT' || foodInfo.status === 'WAIT_COOK'">
          <div style=" border-radius: 0.1rem;color:#727171;width: 2.2rem;height: 0.8rem;line-height: 0.8rem;text-align: center" ></div>
          <div style=" border-radius: 0.1rem;color:#727171;border: 1px gainsboro solid;width: 2.2rem;height: 0.8rem;line-height: 0.8rem;text-align: center;margin-left: 5.1rem;" @click="callPhone">联系商家</div>
        </div>
        <div style="margin-left: 0.2rem;display: flex;margin-top: 0.5rem;" v-if="foodInfo.status === 'TODO'">
          <div style=" border-radius: 0.1rem;color:#727171;border: 1px gainsboro solid;width: 2.2rem;height: 0.8rem;line-height: 0.8rem;text-align: center" @click="foodsOrder">取消订单</div>
          <div style=" border-radius: 0.1rem;color:black;background-color: #F6BF3C;width: 2.2rem;height: 0.8rem;line-height: 0.8rem;text-align: center;margin-left: 5.1rem;" @click="getMoney">去付款</div>
        </div>
      </div>
      <div style="height: 2rem;background-color: white;" v-if="foodInfo.status === 'APPLY_REFUND'">
        <div style="position: absolute;top: 2.8rem;left: 0.3rem;">
          <div style="width: 0.5rem;height: 0.5rem;background-color: #F6BF3C;border-radius: 0.5rem;text-align: center;line-height: 0.5rem;color: white;">√</div>
          <div style="height: 0.6rem;width:0.07rem;background-color: #F6BF3C;margin-left: 0.2rem;"></div>
          <div style="display: flex;position: relative;top: -1.1rem;">
            <div style="margin-left: 1rem;">{{foodInfo.refundTime}}</div>
            <div style="margin-left: 0.2rem;">用户申请退款</div>
          </div>
          <div style="display: flex;margin-top: 0.1rem;color: #727171">
            <div style="margin-left: 1rem;position: relative;top: -1rem;">[原因]</div>
            <div style="position: relative;top: -1rem;">{{foodInfo.refundCause}}</div>
          </div>
        </div>
        <div style="position: absolute;top: 3.8rem;left: 0.3rem;" v-if="false">
          <div style="height: 0.6rem;width:0.07rem;background-color: #F6BF3C;margin-left: 0.2rem;"></div>
          <div style="width: 0.5rem;height: 0.5rem;background-color: #F6BF3C;border-radius: 0.5rem;text-align: center;line-height: 0.5rem;color: white;">√</div>
          <div style="display: flex;position: relative;top: -0.4rem;">
            <div style="margin-left: 1rem;">{{foodInfo.refundTime}}</div>
            <div style="margin-left: 0.2rem;">商家同意退款，稍后进行退款，请注意查收</div>
          </div>
        </div>
        <div style="position: absolute;top: 3.9rem;left: 0.3rem;" v-if="false">
          <div style="height: 0.6rem;width:0.07rem;background-color: #FF3A43;margin-left: 0.2rem;"></div>
          <div style="width: 0.5rem;height: 0.5rem;background-color: #FF3A43;border-radius: 0.5rem;text-align: center;line-height: 0.5rem;color: white;">×</div>
          <div style="display: flex;position: relative;top: -0.5rem;">
            <div style="margin-left: 1rem;">{{foodInfo.refundTime}}</div>
            <div style="margin-left: 0.2rem;">退款失败</div>
          </div>
          <div style="display: flex;margin-top: 0.1rem;color: #727171;position: relative;top: -0.5rem;">
            <div style="margin-left: 1rem;">[原因]</div>
            <div >不想要了</div>
          </div>
        </div>
        <div style="position: absolute;top: 3.8rem;left: 0.3rem;">
          <div style="height: 0.6rem;width:0.07rem;background-color: #C9CACA;margin-left: 0.2rem;"></div>
          <div style="width: 0.5rem;height: 0.5rem;background-color: #C9CACA;border-radius: 0.5rem;text-align: center;line-height: 0.5rem;color: white;">√</div>
          <div style="display: flex;position: relative;top: -0.5rem;">
            <div style="margin-left: 1rem;">等待商家确认退款</div>
          </div>
        </div>
      </div>
      <div class="order" style="position: relative;">
        <div class="ware"  v-for=" item in foodInfo.detailList" :key="item.id" >
          <img :src="item.foodImage" style="width: 2.5rem;"/>
          <div style="margin-left: 0.2rem;font-size: 0.4rem;width: 6rem;">{{item.foodName}}</div>
          <div style="position: absolute;margin-top: 0.6rem;margin-left: 2.7rem;">{{item.doseQty}}g</div>
          <div style=" font-size: 0.4rem;margin-top: 0.2rem; color: red">￥{{item.amount}}</div>
        </div>
        <div class="ware"  v-for=" item in foodInfo.orderFoodSetDetailVOList" :key="item.id" >
          <img :src="item.foodSetImage" style="width: 2.5rem;"/>
          <div style="margin-left: 0.2rem;font-size: 0.4rem;width: 6rem;">{{item.foodSetName}}</div>
          <div style="position: absolute;margin-top: 0.6rem;margin-left: 2.7rem;">X{{item.foodSetAmount}}</div>
          <div style=" font-size: 0.4rem;margin-top: 0.2rem; color: red">￥{{item.foodSetPrice}}</div>
        </div>
        <div class="link-x" style="margin-top: 0.5rem;"></div>
        <div class="coupons">
          <span style="margin-left: 0.2rem;font-size: 0.35rem">优惠券</span>
          <span style="margin-left: 7.2rem; color: red">-￥{{foodInfo.preferentialAmount}}</span>
        </div>
        <div class="link-x"></div>
        <div class="coupons" style="">
          <span style="margin-left: 7rem;">合计</span>
          <span style="font-size: 0.4rem;color: red;margin-left: 0.1rem;">¥ {{foodInfo.totalAmount}}</span>
          <!--<span style="font-size: 0.4rem;color: red;margin-left: 0.1rem;" v-else>¥ {{payMoney}}</span>-->
        </div>
      </div>
      <div class="footer" style="background: white;">
        <div class="footer-num">
          <span style="font-size: 0.35rem;color: #727171;">订单编号</span>
          <span style="margin-left: 0.5rem; font-size: 0.35rem;">{{foodInfo.orderNo}}</span>
        </div>
        <div class="footer-time" style="margin-top: 0.3rem;">
          <span style="font-size: 0.35rem;color: #727171;">下单时间</span>
          <span style="margin-left: 0.5rem; font-size: 0.35rem;">{{foodInfo.createTime}}</span>
        </div>
      </div>
      <!--取消订单-->
      <div v-if="popupVisible3">
        <mt-popup  v-model="popupVisible3" popup-transition="popup-fade" closeOnClickModal="false" class="pop-table">
          <div style="margin-top: 1.5rem;margin-left: 30%;font-size:0.45rem;color: black; ">是否确认取消订单</div>
          <div class="btn">
            <div class="btn-qx" @click="popupVisible3=false">取消</div>
            <div class="btn-qd" @click="distFoods()">确定</div>
          </div>
        </mt-popup>
      </div>
      <!--申请退款-->
      <div v-if="popupVisible1">
        <mt-popup v-model="popupVisible1" popup-transition="popup-fade" class="pop-table" :closeOnClickModal="false" :modal="true">
          <div style="margin-top: 1.5rem;margin-left: 25%;font-size:0.45rem;color: black; ">是否确定要申请退款？</div>
          <div class="btn">
            <div class="btn-qx" @click="popupVisible1=false">再等等</div>
            <div class="btn-qd" @click="popupVisible2 = true">申请退款</div>
          </div>
        </mt-popup>
      </div>
      <!--退款原因-->
      <div v-if="popupVisible2">
        <mt-popup v-model="popupVisible2" popup-transition="popup-fade" class="pop-table1" :closeOnClickModal="false" :modal="true">
          <div style="margin-top: 0.8rem;font-size:0.45rem;color: black;width: 100%;text-align: center; ">退款原因</div>
          <div class="btn1">
            <div class="btn-qx1" @click="applyRefund">买错了</div>
            <div class="btn-qx1" @click="applyRefund1">不想要了</div>
            <div class="btn-qx1" @click="applyRefund2">其他原因</div>
          </div>
        </mt-popup>
      </div>
    </div>
</template>

<script>
import HttpAPI from '../../service/user-api'
import goodsAPI from '../../service/goods-api'
import { formatDate } from '@lemon/euler-app-h5/src/libs/util'
import { downloadUrl } from '../../libs/http-api'
import { Log } from '@lemon/euler-app-h5/src/libs/euler-mint-ui'
export default {
  data () {
    return {
      orderList: [],
      foodInfo: [],
      moneyList: '',
      popupVisible1: false,
      popupVisible2: false,
      popupVisible3: false,
      cancelCause: '',
      refundList: []
    }
  },
  mounted () {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
    }
    window.addEventListener('popstate', this.fun, false)
    this.orderList = this.$route.query.orderList
    this.orderCardList = this.$route.query.orderCardList
    HttpAPI.bugfood({ id: this.orderList.id }, res => {
      res.createTime = formatDate(new Date(res.createTime), 'yyyy/MM/dd hh:mm')
      res.refundTime = formatDate(new Date(res.refundTime), 'hh:mm')
      res.payTime = formatDate(new Date(res.payTime), 'hh:mm')
      this.foodInfo = res
      for (let i = 0; i < this.foodInfo.detailList.length; i++) {
        this.foodInfo.detailList[i].foodImage = downloadUrl + this.foodInfo.detailList[i].foodImage
      }
      for (let i = 0; i < this.foodInfo.orderFoodSetDetailVOList.length; i++) {
        this.foodInfo.orderFoodSetDetailVOList[i].foodSetImage = downloadUrl + this.foodInfo.orderFoodSetDetailVOList[i].foodSetImage
      }
    })
  },
  destroyed () {
    window.removeEventListener('popstate', this.fun, false)
  },
  methods: {
    fun () {
      this.$router.push('/myOrder')
    },
    applyRefund () {
      this.popupVisible2 = false
      this.cancelCause = '买错了'
      this.refund()
    },
    applyRefund1 () {
      this.popupVisible2 = false
      this.cancelCause = '不想要了'
      this.refund()
    },
    applyRefund2 () {
      this.popupVisible2 = false
      this.cancelCause = '其他原因'
      this.refund()
    },
    removeList () {
      this.popupVisible1 = true
    },
    getnewList () {
      HttpAPI.bugfood({ id: this.orderList.id }, res => {
        res.createTime = formatDate(new Date(res.createTime), 'yyyy/MM/dd hh:mm')
        res.refundTime = formatDate(new Date(res.refundTime), 'hh:mm')
        res.payTime = formatDate(new Date(res.payTime), 'hh:mm')
        this.foodInfo = res
        for (let i = 0; i < this.foodInfo.detailList.length; i++) {
          this.foodInfo.detailList[i].foodImage = downloadUrl + this.foodInfo.detailList[i].foodImage
          // this.foodInfo.detailList.foodSetImage = downloadUrl + this.foodInfo.detailList.foodSetImage
        }
        for (let i = 0; i < this.foodInfo.setDetailList.length; i++) {
          // this.foodInfo.detailList[i].foodImage = downloadUrl + this.foodInfo.detailList[i].foodImage
          this.foodInfo.setDetailList[i].foodSetImage = downloadUrl + this.foodInfo.setDetailList[i].foodSetImage
        }
      })
    },
    // 取消订单
    foodsOrder () {
      this.popupVisible3 = true
    },
    distFoods () {
      goodsAPI.delectFoods({ id: this.orderList.id, refundCause: this.cancelCause }, res => {
        this.getnewList()
        Log.deal({
          message: '订单已取消',
          position: 'bottom'
        })
        this.popupVisible3 = false
      })
    },
    // 去付款
    getMoney () {
      this.$router.push({
        path: '/payment_home',
        query: {
          orderList: this.orderList
        }
      })
    },
    refund () {
      HttpAPI.remveOrder({ id: this.orderList.id, refundCause: this.cancelCause }, res => {
        this.refundList = res
        this.popupVisible1 = false
        HttpAPI.bugfood({ id: this.id }, res => {
          res.payTime = formatDate(new Date(res.payTime), 'hh:mm')
          res.refundTime = formatDate(new Date(res.refundTime), 'hh:mm')
          this.foodInfo = res
          for (let i = 0; i < this.foodInfo.detailList.length; i++) {
            this.foodInfo.detailList[i].foodImage = downloadUrl + this.foodInfo.detailList[i].foodImage
          }
        })
      })
    },
    // 调用拨号功能
    callPhone (phoneNumber) {
      window.location.href = 'tel:10086' + phoneNumber
    }
  }
}
</script>

<style lang="less" scoped>
@import "details-one.less";
</style>
