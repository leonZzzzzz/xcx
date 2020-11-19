<style lang="less" scoped>
  @import "paycenter";
</style>
<template>
  <div class="paycenter">
    <div class="head-bar head-theme-b">
      <div class="head-theme-b-left" @click="$router.go(-1)">
        <img style="margin-top: 0.5rem; width: 0.25rem;" src="../../assets/images/common/left_icon_black_big.png"/>
      </div>
    <div class="head-theme-b-center">
      <div class="fs-5" style="color:#FFFFFF;margin-top: 0.5rem;">确认订单</div>
    </div>
    <div slot="right" class="head-theme-b-right">
    </div>
  </div>
    <div class="page-navbar-padding black_color" style="margin-top: 0.5rem;">
      <div id="topview"  style="background-color:#262626;height: 2rem;text-align: center;">
        <div class="mb-15 fs-18 mt-8" style="color: #F08000;padding-top: 0.3rem;">￥ {{confirmCard.payAmount}}</div>
        <div class="" style="position: relative;color: white;font-size: 0.34rem;">订单号：{{confirmCard.orderNo}}</div>
      </div>
      <div class="mt-10 ml-10 mb-5 color-grey fs-12">选择支付方式</div>
      <div class="color-white-bg">
        <ul>
          <li class="flex-direction-row w-100b fs-14" style="background-color:#262626; ">
            <div class="flexct height-45 good-flex1" @click="choiceAlipay">
              <div class="ml-15 good-flex1 flex-direction-column">
                <span class="" style="color: #FFFFFF;">微信支付</span>
              </div>
              <div class="checkbox "><input type="checkbox" checked="true"  id="checkbox_1_1" name="checkbox_1" v-model="Alipay"> <label for="checkbox_1_1"></label></div>
            </div>
          </li >
        </ul>
      </div>
    </div>

    <div class="confirm-btn" @click="wxPay">确认支付</div>
    <!--<div class="confirm-btn" @click="$router.push('/make-plan')">确认支付</div>-->
  </div>
</template>

<script>
import HttpAPI from '../../service/user-api'
import WechatInit from '../../mixins/wechat-init'
export default {
  mixins: [WechatInit],
  name: 'paycenter',
  data () {
    return {
      options: [{
        label: '微信支付',
        value: 'A'
      }],
      Alipay: true,
      WeChatPay: false,
      currency: 'Alipay',
      carDetail: '',
      orderId: '',
      orderNo: null,
      type: '',
      confirmCard: [],
      cardInfo: [],
      playMoney: '',
      OrderId: ''
    }
  },
  mounted () {
  },
  methods: {
    choiceAlipay () {
      this.Alipay = true
      this.WeChatPay = false
      this.currency = 'Alipay'
    },
    choiceWeChatPay () {
      this.Alipay = false
      this.WeChatPay = true
      this.currency = 'WeChatPay'
    },
    getParams () {
      // 取到路由带过来的参数
      let routerParams = this.$route.params.carDetail
      this.carDetail = routerParams
      this.orderId = this.carDetail.id
    },
    confirmPay () {},
    wxPay () {
      HttpAPI.wxPayCard({ id: this.confirmCard.id }, res => {
        this.notifyPay(res, () => {
          this.$router.push({
            path: '/paysuccess_home'
          })
        })
      })
    },
    getCardMessage () {
      HttpAPI.buyCard({}, res => {
        this.cardInfo = res.rows
      })
    }
  },
  created () {
    // this.getCardMessage()
    this.confirmCard = this.$route.query.confirmCard
    console.log(this.cardInfo)
  }
}
</script>

<style lang="css" scoped>
  .checkbox label[data-v-2a97901f]:after{
    background: #262626;
  }
</style>
