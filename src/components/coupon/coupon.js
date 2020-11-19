import CouponAPI from '../../service/coupon-api'
import { formatDate } from '@lemon/euler-app-h5/src/libs/util'
import Common from '../../mixins/common'
export default {
  mixins: [Common],
  data () {
    return {
      tab: '1', // 我的优惠券、弹窗优惠券页面
      limit: 9999,
      validList: [], // 可用优惠券列表
      unusableList: [] // 不可用优惠券列表
    }
  },
  methods: {
    // 获取可用优惠券列表
    getValidList (cardType) {
      let param = {}
      if (cardType) {
        param = {
          limit: this.limit,
          cardType: cardType
        }
      } else {
        param = {
          limit: this.limit
        }
      }
      CouponAPI.validListInfo(param, res => {
        for (let i = 0; i < res.length; i++) {
          res[i].validityBeginTime = formatDate(new Date(res[i].validityBeginTime), 'yyyy-MM-dd')
          res[i].validityEndTime = formatDate(new Date(res[i].validityEndTime), 'yyyy-MM-dd')
          res[i].selectStatus = false
        }
        this.validList = res
        this.getValidListAfter()
      })
    },
    getValidListAfter () {},
    // 获取不可用优惠券列表
    getUnusableList () {
      let param = {
        limit: this.limit
      }
      CouponAPI.unvalidListInfo(param, res => {
        for (let i = 0; i < res.length; i++) {
          res[i].validityBeginTime = formatDate(new Date(res[i].validityBeginTime), 'yyyy-MM-dd')
          res[i].validityEndTime = formatDate(new Date(res[i].validityEndTime), 'yyyy-MM-dd')
          res[i].selectStatus = false
        }
        this.unusableList = res
        this.getUnusableListAfter()
      })
    },
    getUnusableListAfter () {},
    // 使用优惠券跳转页面
    useCouponPage (couponCardType) {
      if (couponCardType === 'FOOD_CARD') {
        this.$router.push('/tack_out_goods')
      }
      if (couponCardType === 'TRAIN_CARD') {
        this.$router.push('/somatotype')
      }
      if (couponCardType === 'MIX_CARD') {
        if (!this.isHaveCard && !this.isHaveTimeCard) {
          this.$router.push('/somatotype')
        } else {
          this.$router.push('/tack_out_goods')
        }
      }
    }
  }
}
