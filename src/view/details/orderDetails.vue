<style lang="less" scoped>
  @import "orderDetails";
</style>
<template>
  <div class="confirm-order">
    <div class="head-bar head-theme-b">
      <div class="head-theme-b-left" @click="$router.go(-1)">
        <img style="margin-top: 0.1rem; width: 0.25rem;" src="../../assets/images/common/left_icon_black_big.png"/>
      </div>
      <div class="head-theme-b-center">
        <div class="fs-5" style="font-weight: lighter;">订单详情</div>
      </div>
      <div slot="right" class="head-theme-b-right">
      </div>
    </div>
    <div style="position: relative;top: 2rem;">
      <div class="card">
        <img src="../../assets/images/common/goldcard.png">
        <div class="card-buy">
          <div class="title-add">广州洋格健身中心</div>
          <div style="position: absolute;left: 4.5rem;top: -0.28rem;width: 2rem;">卡号：{{cardInfo.id}}</div>
          <div class="title-card">计划卡(强度训练)</div>
          <div class="title-use">*此卡仅限个人使用</div>
        </div>
      </div>
      <div class=" box-content-confirm-order">
        <div class="order-detail">
          <div class="order-title">订单内容</div>
          <div class="order-rows">
            <div class="row-name">训练次数：</div>
            <div class="row-number">不限次数</div>
          </div>
        </div>
      </div>
      <div style="margin-top: 0.5rem;width: 100%;">
        <div class="money" style="background-color: #262626; height: 1.2rem;line-height: 1.5rem; padding-left: 0.5rem;display: flex;justify-content: space-between;">
          <span>优惠券</span>
          <span style="margin-right: 0.6rem;color: #F08000;">¥ {{cardInfo.preferentialAmount}}</span>
        </div>
        <div class="link-x"></div>
        <div class="money" style="background-color: #262626; height: 1.2rem;line-height: 1.5rem; padding-left: 0.5rem;display: flex;justify-content: space-between;">
          <span>金额</span>
          <span style="color: #F08000;margin-right: 0.6rem;">¥ {{cardInfo.payAmount}}</span>
        </div>
        <div class="link-x"></div>
        <div class="money" style="background-color: #262626; height: 1.2rem;line-height: 1.5rem; display: flex;padding-left: 7rem;">
          <div style="width: 1rem;">金额:</div>
          <div style="color: #F08000;font-size: 0.4rem;"> ¥ {{cardInfo.totalAmount}}</div>
        </div>
      </div>
      <div style="margin-top: 0.5rem;">
        <div class="money" style="background-color: #262626; height: 1rem;line-height: 1.5rem; padding-left: 0.5rem;">
          <span style="color: #8E8E8E;">订单编号</span>
          <span style="margin-left: 2rem;">{{cardInfo.orderNo}}</span>
        </div>
        <div class="money" style="background-color: #262626; height: 1.3rem;line-height: 1.5rem; padding-left: 0.5rem;">
          <span style="color: #8E8E8E;">下单时间</span>
          <span style="margin-left: 2rem;">{{cardInfo.createTime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HttpAPI from '../../service/user-api'
import { formatDate } from '@lemon/euler-app-h5/src/libs/util'
export default {
  name: 'confirm-order',
  data () {
    return {
      value: false,
      showCoupon: false,
      selected: '1',
      userNumber: 3,
      currency: '2',
      cardType: '计划卡（强度训练）',
      cardInfo: [],
      id: '',
      mun: null
    }
  },
  created () {
    this.id = this.$route.query.lookId
    HttpAPI.bugOrder({ id: this.id }, res => {
      res.createTime = formatDate(new Date(res.createTime), 'yyyy/MM/dd hh:mm')
      this.cardInfo = res
      this.mun = this.cardInfo.detailList[0].trainCount
      console.log(this.cardInfo)
    })
  }
}
</script>

<style scoped>

</style>
