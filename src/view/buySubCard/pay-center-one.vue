<style lang="less" scoped>
  @import "pay-center-one";
</style>
<template>
  <div class="pay-center-one">
    <div class="head-bar-to">
      <div class="head-left" @click="$router.push('/train-index')">
        <img src="../../assets/images/common/left_icon_black_big.png"/>
      </div>
      <div class="head-middle">确认支付</div>
      <div class="head-right"></div>
    </div>
    <div class="box-content">
      <div class="order-info">
        <div class="row-style common-text-ellipsis" style="font-size: .48rem;color: #F08000;margin-bottom: .134rem">￥ {{confirmCard.payAmount}}</div>
        <div class="row-style common-text-ellipsis" style="font-size: .32rem;">订单号：{{confirmCard.orderNo}}</div>
      </div>
      <div class="order-content">
        <div class="order-detail">
          <div class="order-row" @click.stop="selectPay='wx'">
            <div class="row-name">微信支付</div>
            <img v-if="selectPay==='wx'" src="../../assets/images/common/pitch-on.png" alt="">
            <img v-if="selectPay!=='wx'" src="../../assets/images/common/pitch-off.png" alt="">
          </div>
          <!--<div class="order-row" @click.stop="selectPay='zfb'">-->
            <!--<div class="row-name">支付宝支付</div>-->
            <!--<img v-if="selectPay==='zfb'" src="../../assets/images/common/pitch-on.png" alt="">-->
            <!--<img v-if="selectPay!=='zfb'" src="../../assets/images/common/pitch-off.png" alt="">-->
          <!--</div>-->
        </div>
      </div>
    </div>
    <div class="bottom-bth" @click="wxPay">确认支付</div>
  </div>
</template>

<script>
import HttpAPI from '../../service/user-api'
import WechatInit from '../../mixins/wechat-init'
export default {
  name: 'paycenter',
  mixins: [WechatInit],
  data () {
    return {
      selectPay: 'wx',
      confirmCard: ''
    }
  },
  mounted () {
    this.confirmCard = this.$route.query.confirmCard
  },
  methods: {
    wxPay () {
      HttpAPI.wxPayCard({ id: this.confirmCard.id }, res => {
        this.notifyPay(res, () => {
          this.$router.push({
            path: '/paysuccess_home'
          })
        })
      })
    },
    confirmPay () {
      HttpAPI.cardWxPay({ id: this.orderId }, res => {
        this.notifyPay(res, () => {
          this.$router.push({
            path: '/train-index'
          })
        })
      })
    }
  },
  created () {
    // this.getCardMessage()
  }
}
</script>
