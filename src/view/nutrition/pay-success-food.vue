<template>
    <div class="pay-success">
      <div class="head-bar head-theme-b" style="height: 1.3rem;">
        <div class="head-theme-b-left" @click="getBack()">
          <img style="margin-top: 0.3rem; width: 0.25rem;" src="../../assets/images/common/left_icon_black_big.png"/>
        </div>
        <div class="head-theme-b-center">
          <div class="fs-5" style="color:#FFFFFF;font-weight: lighter;margin-top: 0.2rem;">支付完成</div>
        </div>
        <div slot="right" class="head-theme-b-right">
        </div>
      </div>
      <div class="bug-success">
        <div class="bug-img">
          <img src="../../assets/images/common/zfcg.png"/>
        </div>
        <div class="bug-cg" style="color: black;font-size: 0.45rem;margin-top: 0.2rem;">支付成功</div>
        <div class="bug-cg" style="color: black;font-size: 0.4rem;margin-top: 0.3rem;">您的取餐码是：<span style="color: #F6BF3C;font-size: 0.45rem;position: relative;top: 0.05rem;">{{foodInfo.takeFoodNo}}</span></div>
      </div>
      <!--<div class="bug-sm" style="background-color:#262626;margin-top: 0.5rem;height: 2.5rem; color:#c7c1c1;">-->
        <!--<span style="margin-left: 0.5rem;margin-top: 0.2rem;">说明介绍：您已成成功购买计划卡，请务必准时参加哦！</span>-->
      <!--</div>-->
      <div class="bug-btn" style="margin-top: 0.3rem;height: 1rem; background-color: #F6BF3C;width: 95%;margin-left: 0.25rem;text-align: center;line-height: 1rem;font-size: 0.35rem;border-radius: 0.1rem;" @click="createdOrder">查看订单详情</div>
    </div>
</template>

<script>
import HttpAPI from '../../service/user-api'
export default {
  data () {
    return {
      foodeId: '',
      payMoney: '',
      takeFoodNo: '',
      foodInfo: []
    }
  },
  created () {
    this.orderList = this.$route.query.orderList
    this.orderCardList = this.$route.query.orderCardList
    HttpAPI.bugfood({ id: this.orderList.id }, res => {
      this.foodInfo = res
    })
  },
  mounted () {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
    }
    window.addEventListener('popstate', this.fun, false)
  },
  destroyed () {
    window.removeEventListener('popstate', this.fun, false)
  },
  methods: {
    createdOrder () {
      this.$router.push({
        path: '/foodDateils_home',
        query: {
          orderList: this.orderList,
          orderCardList: this.orderCardList
        }
      })
    },
    fun () {
      this.$router.push('/tack_out_goods')
    },
    getBack () {
      this.$router.push('/tack_out_goods')
    }
  }
}
</script>

<style lang="less" scoped>
@import "pay-success-food";
</style>
