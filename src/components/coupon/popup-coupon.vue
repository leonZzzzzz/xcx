<style lang="less" scoped>
  @import "popup-coupon.less";
</style>
<template>
  <div>
    <mt-popup v-model="popupCoupon" position="bottom" :closeOnClickModal="false" class="popup-coupon">
      <div class="coupon-top">
        <div class="top-head">
          <span>优惠券</span>
          <div class="head-close" @click="close(false)">
            <img src="../../assets/images/common/close-icon.png"/>
          </div>
        </div>
        <div class="top-tab">
          <div class="tab-box" @click="tab = '1'">
            <div class="tab-style" :class="tab==='1'? 'pitch-on':'pitch-not'">可用优惠券({{validList.length}})</div>
          </div>
          <div class="tab-box" @click="tab = '2'">
            <div class="tab-style" :class="tab==='2'? 'pitch-on':'pitch-not'">不可用优惠券({{unusableList.length}})</div>
          </div>
        </div>
      </div>
      <div class="coupon-content">
        <div v-show="tab==='1'">
          <CouponCell pageType="USE" v-for="item in validList" :key="item.id" :item="item" @on-even="select(item)"></CouponCell>
        </div>
        <div v-show="tab==='2'">
          <CouponCell pageType="USE" :validityType="false" v-for="item in unusableList" :key="item.id" :item="item"></CouponCell>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import $ from 'jQuery'
import CouponJs from '../../components/coupon/coupon'
import CouponCell from '../../components/coupon/coupon-cell'
export default {
  mixins: [CouponJs],
  components: {
    CouponCell
  },
  data () {
    return {
    }
  },
  props: {
    popupCoupon: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    // 商品类型（FOOD_ONCE：优惠-营养卡(单次)、PLAN_MONTH：优惠-训练卡(月)、PLAN_YEAR：优惠-训练卡(年)、TIME：优惠-次卡）
    cardType: {
      type: String,
      default: function () {
        return null
      }
    }
  },
  watch: {
    popupCoupon () {
      if (!this.popupCoupon) {
        this.closeVModal()
      }
    }
  },
  mounted () {
    this.getValidList(this.cardType)
    this.getUnusableList()
  },
  methods: {
    closeVModal () {
      $('.v-modal').css('display', 'none')
    },
    close (item) {
      this.$emit('on-close', item)
    },
    select (item) {
      for (let i = 0; i < this.validList.length; i++) {
        this.validList[i].selectStatus = false
      }
      item.selectStatus = !item.selectStatus
      this.close(item)
    }
  }
}
</script>
