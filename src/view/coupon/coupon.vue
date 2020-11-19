<style lang="less">
@import "coupon.less";
</style>
<template>
  <div class="coupon">
    <!-- <Header title="优惠券"></Header> -->
    <div class="coupon-tab">
      <div class="tab-box" @click="tab = '1'">
        <div
          class="tab-style"
          :class="tab==='1'? 'pitch-on':'pitch-not'"
        >可用优惠券({{validList.length}})</div>
      </div>
      <div class="tab-box" @click="tab = '2'">
        <div
          class="tab-style"
          :class="tab==='2'? 'pitch-on':'pitch-not'"
        >不可用优惠券({{unusableList.length}})</div>
      </div>
    </div>
    <div class="coupon-content">
      <div v-if="tab==='1'">
        <CouponCell v-for="item in validList" :key="item.id" :item="item" @on-even="event(item)"></CouponCell>
      </div>
      <div v-if="tab==='2'">
        <CouponCell :validityType="false" v-for="item in unusableList" :key="item.id" :item="item"></CouponCell>
      </div>
    </div>
  </div>
</template>

<script>
// import Header from '../../components/header/header'
import CouponCell from '../../components/coupon/coupon-cell'
import CouponJs from '../../components/coupon/coupon'
export default {
  name: 'coupon',
  mixins: [CouponJs],
  components: {
    // Header,
    CouponCell
  },
  data () {
    return {
      popupCoupon: false
    }
  },
  created () {
    this.getValidList(false)
  },
  mounted () {
  },
  tab () {
    if (this.tab === '1') {
      this.getValidList(false)
    }
    if (this.tab === '2') {
      this.getUnusableList()
    }
  },
  methods: {
    event (item) {
      this.useCouponPage(item.couponCardType)
    }
  }
}
</script>
