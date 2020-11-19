<template lang="html">

  <div class="cartcontrol">
    <transition name="fadeRotate">
      <div class="cart-decrease" v-show="selectCount > 0" @click.stop.prevent="decreaseCart()">
          <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <!--<div></div>-->
    <div class="cart-count" v-show="selectCount > 0">
      {{ selectCount }}
    </div>
    <div class="cart-add" @click.stop.prevent="ShowSpec()" v-if="(food.goodsFoodSpecList && food.goodsFoodSpecList.length > 1) || (food.attributes && food.attributes.length>1)">
      <i class="icon-add_circle"></i>
    </div>
    <div class="cart-add" @click.stop.prevent="addCart($event)">
      <i class="icon-add_circle"></i>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    food: Object,
    isAll: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    selectFoodsItemProp: {
      type: Array,
      default: function () {
        return []
      }
    },
    selectFoodsItemProps: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  mounted () {
  },
  data () {
    return {
      selectFoodsItem: [],
      showItSpecs: false,
      specsIndex: 0,
      attributesIndex: [] // 当前选中的属性索引值
    }
  },
  computed: {
    selectCount () {
      // console.log(this.selectCount)
      if (!this.selectFoodsItem || this.selectFoodsItem.length <= 0) {
        return 0
      }
      var selectCount = 0
      for (let i = 0; i < this.selectFoodsItem.length; i++) {
        var currFood = this.selectFoodsItem[i]
        if (this.food.id === currFood.id) {
          if (this.isAll) {
            selectCount += currFood.selectCount
          } else {
            selectCount = currFood.selectCount
            break
          }
        }
        if (selectCount > 1) {
          selectCount = 1
        }
      }
      return selectCount
    }
  },
  watch: {
    selectFoodsItemProp: {
      handler (newValue, oldValue) {
        this.selectFoodsItem = this.selectFoodsItemProp
      },
      immediate: true,
      deep: true
    }
    // selectFoodsItemProps: {
    //   handler (newValue, oldValue) {
    //     this.selectFoodsItem = this.selectFoodsItemProps
    //   },
    //   immediate: true,
    //   deep: true
    // }
  },
  methods: {
    // 记录当前所选规格的索引值
    chooseSpecs (index) {
      this.specsIndex = index
    },
    ShowSpec () {
      // this.showItSpecs = true
      this.$emit('ShowSpec', this.food)
    },
    closeShowSpec () {
      this.showItSpecs = false
    },
    // 记录当前选中的商品属性的索引值
    // chosseAttributes (index, index2) {
    //   this.attributesIndex[index].abIndex = index2
    // },
    addCart (event) {
      if (!event._constructed) {
        return
      }
      var foodItem = this.food
      // console.log(foodItem)
      if (this.food.goodsFoodSpecList && this.food.goodsFoodSpecList.length) {
        foodItem.selectSpecFoods = this.food.goodsFoodSpecList[this.specsIndex]
      }
      if (this.food.attributes && this.food.attributes.length) {
        var attrMap = {}
        for (let i = 0; i < this.food.attributes.length; i++) {
          var attr = this.food.attributes[i]
          if (attr.values && attr.values.length) {
            attrMap[attr.name] = attr.values[0]
          }
        }
        foodItem.selectAttributes = 1
      }
      this.$emit('on-add', this.food)
    },
    decreaseCart () {
      if (!event._constructed) {
        return
      }
      this.$emit('on-sub', this.food)
    }
  }
}

</script>
<style lang="less" scoped>
  @import "cart-control";
</style>
<style lang="stylus">

.cartcontrol
  .cart-decrease
    display inline-block
    padding 6px
    transition: all .4s linear
    height 0rem;
    .inner
      line-height 2.3rem;
      font-size 18px
      color #8E8E8E
      transition all 0.4s linear
    &.fadeRotate-enter-active, &.fadeRotate-leave-active
      transform translate3d(0,0,0)
      .inner
        display inline-block
        transform rotate(0)
    &.fadeRotate-enter, &.fadeRotate-leave-active
      opacity: 0
      transform translate3d(24px,0,0)
      .inner
        transform rotate(180deg)
  .cart-count
    display inline-block
    vertical-align top
    font-size 10px
    color rgb(147,153,159)
    line-height 2.3rem
    text-align center
    padding 6px 0
  .cart-add
    display inline-block
    vertical-align top
    font-size 18px
    color #F6BF3C
    line-height 2.5rem
    padding 4px
</style>
