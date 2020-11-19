<style lang="less" scoped>
@import "coupon-cell.less";
</style>
<template>
  <div class="coupon-cell-box" @click="onEven">
    <div class="cell-left">
      <img v-if="validityType" src="../../assets/images/coupon/coupon-left-a.png" />
      <img v-if="!validityType" src="../../assets/images/coupon/coupon-left-b.png" />
      <span class="left-text" v-if="item.type==='CASH'">
        <span>￥</span>
        <span class="left-text-after common-text-ellipsis">{{item.amount}}</span>
      </span>
      <span class="left-text" v-if="item.type==='DISCOUNT'">
        <span class="left-text-after common-text-ellipsis">{{item.discount}}</span>
        <span style="margin-bottom: .03rem">折</span>
      </span>
    </div>
    <div class="cell-right">
      <div class="right-explain">
        <div class="explain-text">说明:仅限{{item.goodsTypesDisplay}}使用</div>
        <div class="validity-text">{{item.validityBeginTime + ' ~ ' + item.validityEndTime}}</div>
      </div>
      <div
        v-if="validityType && pageType === 'VIEW'"
        class="right-bth"
        :class="getBthStyle(item.goodsTypes)"
      >去使用</div>
      <div v-if="validityType && pageType === 'USE'" class="right-selected">
        <img v-if="!item.selectStatus" src="../../assets/images/common/not-selected.png" />
        <img v-if="item.selectStatus" src="../../assets/images/common/selected.png" />
      </div>
    </div>
    <div v-if="!validityType" class="coupon-label">
      <img v-if="item.status === 'EXPIRE'" src="../../assets/images/coupon/label-a.png" />
      <img v-if="item.status === 'USED'" src="../../assets/images/coupon/label-b.png" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // 有效类型
    validityType: {
      type: Boolean,
      default: function () {
        return true
      }
    },
    // 页面类型（查看:VIEW、使用:USE）
    pageType: {
      type: String,
      default: function () {
        return 'VIEW'
      }
    },
    item: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    onEven () {
      this.$emit('on-even')
    },
    getBthStyle (goodsTypes) {
      if (this.validityType) {
        if (goodsTypes.length === 1) {
          // 营养样式
          if (goodsTypes[0] === 'FOOD_ONCE') {
            return 'bth-bc-f08000'
          }
          // 训练卡（月）样式
          if (goodsTypes[0] === 'PLAN_MONTH') {
            return 'bth-bc-57c9ff'
          }
          // 训练卡（年）样式
          if (goodsTypes[0] === 'PLAN_YEAR') {
            return 'bth-bc-52d690'
          }
          // 训练卡（次）样式
          if (goodsTypes[0] === 'TIME') {
            return 'bth-bc-ff3a43'
          }
        } else {
          // 多种时的样式
          return 'bth-bc-f6bf3c'
        }
      } else {
        return 'bth-bc-8e8e8e text-color'
      }
    }
  }
}
</script>
