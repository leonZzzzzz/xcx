<style lang="less" scoped>
  @import "get-coupon.less";
</style>
<template>
  <div>
    <mt-popup v-model="visible" popup-transition="popup-fade" :closeOnClickModal="false" class="get-coupon">
      <div class="coupon-box">
        <div class="coupon-info">
          <div class="info-top">
            <div v-if="couponInfo.type === 'CASH'" class="text-box">
              <span class="fs-36">￥</span>
              <span class="fs-84 common-text-ellipsis">{{couponInfo.amount}}</span>
            </div>
            <div v-if="couponInfo.type === 'DISCOUNT'" class="text-box">
              <span class="fs-84 common-text-ellipsis">{{couponInfo.discount}}</span>
              <span class="fs-36" style="padding-bottom: .08rem">折</span>
            </div>
          </div>
          <div class="info-bottom">
            <div class="info-explain">说明：仅限{{couponInfo.goodsTypesDisplay}}使用</div>
            <div class="info-validity">有效期：{{couponInfo.validityBeginTime + ' ~ ' + couponInfo.validityEndTime}}</div>
            <div class="bth-use" @click="useCoupon">立即使用</div>
            <div class="bth-get" @click="getCoupon">领取</div>
          </div>
        </div>
        <div class="close-bth">
          <img src="../../assets/images/common/close-icon-a.png" @click="close">
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import $ from 'jQuery'
import CouponAPI from '../../service/coupon-api'
import { Log } from '@lemon/euler-app-h5/src/libs/euler-mint-ui'
import { formatDate } from '@lemon/euler-app-h5/src/libs/util'
import CouponJs from '../../components/coupon/coupon'
export default {
  mixins: [CouponJs],
  data () {
    return {
      visible: false,
      couponInfo: {}
    }
  },
  props: {
    popupGetCoupon: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    couponId: {
      type: String,
      default: function () {
        return null
      }
    }
  },
  watch: {
    popupGetCoupon () {
      if (this.popupGetCoupon) {
        this.getCouponInfo()
      } else {
        this.visible = this.popupGetCoupon
        this.closeVModal()
      }
    }
  },
  methods: {
    closeVModal () {
      $('.v-modal').css('display', 'none')
    },
    getCouponInfo () {
      this.couponInfo = {}
      CouponAPI.getScan({ couponId: this.couponId }, res => {
        res.validityBeginTime = formatDate(new Date(res.validityBeginTime), 'yyyy-MM-dd')
        res.validityEndTime = formatDate(new Date(res.validityEndTime), 'yyyy-MM-dd')
        this.couponInfo = res
        this.visible = this.popupGetCoupon
      }, error => {
        Log.deal({
          message: error.errorMsg,
          position: 'middle'
        })
      })
    },
    close () {
      this.$emit('on-close')
    },
    // 使用优惠券
    useCoupon () {
      CouponAPI.getCoupon({ couponId: this.couponId }, res => {
        this.close()
        Log.deal({
          message: '领取成功',
          position: 'middle'
        })
        this.useCouponPage(this.couponInfo.couponCardType)
      })
    },
    // 领取优惠券
    getCoupon () {
      CouponAPI.getCoupon({ couponId: this.couponId }, res => {
        this.close()
        Log.deal({
          message: '领取成功',
          position: 'middle'
        })
      })
    }
  }
}
</script>
