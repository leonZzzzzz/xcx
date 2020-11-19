<template lang="html">

  <div class="cartcontrol">
    <transition name="fadeRotate">
      <div class="cart-decrease" v-show="showSelect > 0" @click.stop.prevent="decreaseCart()">
          <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <!--<div></div>-->
    <div class="cart-count" v-show="showSelect > 0">
      {{showSelect}}
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
    numSelset: {
      type: Number,
      default: function () {
        return this.food.selectCount
      }
    },
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
  created () {
  },
  mounted () {
    let array = this.food
    this.arrayList = this.food
    console.log(array)
    this.showSelect = array.selectCount
  },
  data () {
    return {
      arrayList: [],
      selectFoodsItem: [],
      showItSpecs: false,
      specsIndex: 0,
      selectCounts: 1,
      showSelect: null,
      time: null,
      times: null,
      attributesIndex: [] // 当前选中的属性索引值
    }
  },
  computed: {
    selectCount () {
      if (!this.selectFoodsItem || this.selectFoodsItem.length <= 0) {
        return 0
      }
      var selectCount = 0
      selectCount = this.food.selectCount
      if (selectCount > 1) {
        selectCount += 1
      }
      return selectCount
    }
  },
  watch: {
    'selectCounts' () {
      this.showSelect = this.arrayList.selectCount
    },
    selectFoodsItemProp: {
      handler (newValue, oldValue) {
        this.selectFoodsItem = this.selectFoodsItemProp
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 记录当前所选规格的索引值
    chooseSpecs (index) {
      this.specsIndex = index
    },
    ShowSpec () {
      this.selectCounts += 1
      this.$emit('ShowSpec', this.food)
    },
    closeShowSpec () {
      this.showItSpecs = false
    },
    addCart (event) {
      // if (this.food.selectCount === undefined || this.food.selectCount === null) {
      //   this.arrayList.selectCount += 1
      //   this.selectCounts += 0
      //   console.log(this.arrayList)
      // } else {
      //   let array = this.food
      //   this.arrayList = this.food
      //   console.log(this.arrayList)
      //   this.showSelect = array.selectCount
      //   this.selectCounts += 0
      // }
      // console.log(this.food)
      this.selectCounts += 1
      this.$emit('on-add', this.food)
    },
    decreaseCart () {
      this.selectCounts -= 1
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
    padding 5px
    transition: all .4s linear
    height 0rem
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
