<template>
   <div class="header-home-pay">
     <div class="head-bar-to" @click="$router.back()" style="background-color:#1C1C1C; color: white;">
       <div class="head-theme-b-left" >
         <img style="margin-top: 0.3rem;position: relative; left: 0.5rem; width: 0.25rem;" src="../../assets/images/common/left_icon_black_big.png"/>
       </div>
       <div class="pay">
         <div class="fs-5" style="font-weight: lighter;">订单确认</div>
       </div>
     </div>
     <div class="pay-money">
       <div class="money">￥{{foodList.payAmount}}</div>
       <div class="mun">订单号：{{foodList.orderNo}}</div>
     </div>
     <div class="pay-fs">
       <mt-radio align="right"  v-model="value" :options="options" style="background-color: white;">
       </mt-radio>
     </div>
     <div class="que-pay" @click="createdOrder">确认支付</div>
   </div>
</template>

<script>
import HttpAPI from '../../service/user-api'
import WechatInit from '../../mixins/wechat-init'
export default {
  mixins: [WechatInit],
  data () {
    return {
      options: [{
        label: '微信支付',
        value: 'A'
      }],
      payMoney: '',
      orderNo: '',
      moneyList: '',
      orderId: '',
      takeFoodNo: '',
      value: 'A',
      orderCardList: '',
      foodList: []
    }
  },
  created () {
    this.lookFoodId = this.$route.query.lookFoodId
    HttpAPI.addMoney({ orderFoodId: this.lookFoodId, totalAmount: this.moneyList }, res => {
    })
    HttpAPI.bugfood({ id: this.lookFoodId }, res => {
      this.foodList = res
    })
  },
  methods: {
    createdOrder () {
      if (this.foodList.takeFoodNo === null) {
        this.wxPay()
      } else {
        this.$router.push('/myOrder')
      }
    },
    wxPay () {
      HttpAPI.wxPay({ id: this.lookFoodId }, res => {
        this.notifyPay(res, () => {
          this.$router.push('/myOrder')
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "payment.less";
</style>
