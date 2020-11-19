<style lang="less" scoped>
  @import "confirm-order";
</style>
<template>
    <div class="confirm-order">
      <Header title="订单详情" :leftIcon="true"></Header>
      <div style="position: relative;top: 2rem;">
      <div class="card">
        <img src="../../assets/images/common/goldcard.png">
        <div class="card-buy">
          <div class="title-add">广州洋格健身中心</div>
<!--          <div class="link-y"></div>-->
<!--          <div class="link-y"></div>-->
          <!--<div class="link-y"></div>-->
          <div class="title-card">计划卡(强度训练)</div>
          <div class="title-use">*此卡仅限个人使用</div>
        </div>
      </div>
      <div class="pt-45 box-content-confirm-order">
        <div class="order-detail">
          <div class="order-title">订单内容</div>
          <div class="order-rows">
            <div class="row-name">训练次数：</div>
            <div class="row-number">不限次数</div>
          </div>
          <div class="link-x"></div>
          <div class="order-rows">
            <div class="row-name">金额：</div>
            <div class="row-number total-number" style="color: #F08000;">￥ {{confirmCard.payAmount}}</div>
          </div>
        </div>
        <div class="cell-item" @click="popupCoupon=true">
          <div class="title" @click="popupCoupon=true">优惠券</div>
          <div class="content" @click="popupCoupon=true"><img src="../../assets/original-images/choice.png" alt=""></div>
        </div>
        <!--<div class="money" style="background-color: #262626; height: 1.5rem;line-height: 1.5rem; padding-left: 0.5rem;">洋格豆（0）<mt-switch style="margin-left: 8rem;position: relative;top: -1.2rem;" v-model="value"></mt-switch></div>-->
      </div>
      </div>
      <div class="confirm">
        <div class="confirm-left">合计：<span style="color: #F08000">￥ {{confirmCard.payAmount}}</span></div>
        <div class="confirm-right" @click="createOreder">去支付</div>
      </div>
      <PopupCoupon :popupCoupon="popupCoupon" @on-close="onClose"></PopupCoupon>
    </div>
</template>

<script>
import HttpAPI from '../../service/user-api'
import Header from '../../components/header/header'
import PopupCoupon from '../../components/coupon/popup-coupon'
export default {
  name: 'confirm-order',
  components: {
    Header,
    PopupCoupon
  },
  data () {
    return {
      value: false,
      showCoupon: false,
      selected: '1',
      userNumber: 3,
      currency: '2',
      cardType: '计划卡（强度训练）',
      cardInfo: [],
      confirmCard: [],
      cardList: [],
      limit: 999,
      offset: 0,
      id: '',
      orderString: [],
      message: false,
      OrderId: '',
      orderID: '',
      sumMoney: '',
      popupCoupon: false
    }
  },
  mounted () {
    HttpAPI.planGet({ id: this.OrderId }, res => {
      this.confirmCard = res
    })
  },
  methods: {
    onClose (item) {
      console.log(item)
      this.popupCoupon = false
    },
    createOreder () {
      this.$router.push({
        path: '/pay-center',
        query: {
          confirmCard: this.confirmCard
        }
      })
    },
    wxPay () {
      HttpAPI.wxPayCard({ id: this.OrderId }, res => {
        this.notifyPay(res, () => {
          this.$router.push({
            path: '/pay-center',
            query: {
              confirmCard: this.confirmCard
            }
          })
        })
      })
    },
    choiceCoupon () {
      this.showCoupon = true
    },
    closeCoupon () {
      this.showCoupon = false
    }
  },
  created () {
    this.OrderId = this.$route.query.orderID
    this.sumMoney = this.$route.query.sumMoney
  }
}
</script>

<style scoped>

</style>
