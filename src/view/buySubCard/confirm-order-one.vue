<style lang="less" scoped>
  @import "confirm-order-one";
</style>
<template>
    <div class="confirm-order-one">
      <div class="head-bar-to">
        <div class="head-left" @click="$router.go(-1)">
          <img src="../../assets/images/common/left_icon_black_big.png"/>
        </div>
        <div class="head-middle">确认订单</div>
        <div class="head-right"></div>
      </div>
      <div class="box-content">
        <div class="card">
          <img src="../../assets/images/common/goldcard.png">
          <div class="card-content">
            <div class="card-title">广州洋格健身中心</div>
            <div class="card-explain">
              <div style="font-size: .374rem;margin-bottom: .08rem">次卡</div>
              <div style="font-size: .32rem">*此卡仅限个人使用</div>
            </div>
          </div>
        </div>
        <div class="order-content">
          <div class="order-title">订单内容</div>
          <div class="order-detail">
            <div class="order-row">
              <div class="row-name">训练次数：</div>
              <div class="row-number">1</div>
            </div>
            <div class="order-row">
              <div class="row-name">金额：</div>
              <div class="row-number total-number">￥{{order.price}}</div>
            </div>
          </div>
        </div>
        <div class="order-content" style="margin-top: .267rem">
          <div class="order-detail">
            <div class="order-row" @click.stop="choiceCoupon">
              <div class="row-name">优惠券</div>
              <div class="row-number">-0</div>
              <img src="../../assets/original-images/choice.png" alt="">
            </div>
            <div class="order-row">
              <!--<div class="row-name">洋格豆（0）抵扣0元</div>-->
              <!--<div class="row-number total-number"></div>-->
              <!--<mt-switch v-model="value"></mt-switch>-->
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-content">
        <div class="total-num">合计 <span style="color: #F08000;font-size: .534rem">￥{{order.price}}</span></div>
        <div class="pay-bth" @click="getBugCard()">去支付</div>
      </div>
    </div>
</template>

<script>
import HttpAPI from '../../service/user-api'
export default {
  name: 'confirm-order-one',
  data () {
    return {
      value: true,
      showCoupon: false,
      selected: '1',
      userNumber: 3,
      currency: '2',
      cardType: '计划卡（强度训练）',
      cardInfo: [],
      confirmCard: [],
      order: ''
    }
  },
  mounted () {
    this.getParams()
  },
  methods: {
    choiceCoupon () {
      this.showCoupon = true
    },
    closeCoupon () {
      this.showCoupon = false
    },
    getParams () {
      // 取到路由带过来的参数
      let routerQuery = this.$route.query.type
      if (routerQuery === 'SecondaryCard') {
        this.cardType = '次卡'
      }
    },
    choiceIt (id) {
      var namebox = document.getElementsByTagName('input')
      for (let i = 0; i < namebox.length; i++) {
        if (namebox[i].type === 'checkbox') {
          namebox[i].checked = false
        }
        let nowChecked = document.getElementById('checkbox_' + id)
        nowChecked.checked = true
      }
    },
    getCardMessage () {
      // HttpAPI.getOrder({ id: this.cardInfo[0] }, res => {
      //   this.confirmCard = res
      // })
      this.$router.push('/payCenterOne_home')
    },
    getBugCard () {
      HttpAPI.buyCard({ id: this.order.id }, res => {
        // this.cardInfo = res
        this.$router.push({
          path: '/payCenterOne_home',
          query: {
            confirmCard: res
          }
        })
      })
    }
  },
  created () {
    this.order = this.$route.query.order
  }
}
</script>

<style scoped>

</style>
