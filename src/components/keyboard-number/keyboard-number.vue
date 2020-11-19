<style lang="less" scoped>
  @import "keyboard-number.less";
</style>
<template>
  <div>
    <transition name="slide">
      <div class="keyboard animated" v-show="show">
        <!-- 键盘区域 -->
        <div class="key" @touchstart="typing('1')">1</div>
        <div class="key" @touchstart="typing('2')">2</div>
        <div class="key" @touchstart="typing('3')">3</div>
        <div class="key" @touchstart="typing('4')">4</div>
        <div class="key" @touchstart="typing('5')">5</div>
        <div class="key" @touchstart="typing('6')">6</div>
        <div class="key" @touchstart="typing('7')">7</div>
        <div class="key" @touchstart="typing('8')">8</div>
        <div class="key" @touchstart="typing('9')">9</div>
        <div class="key common-bc-2a2b2a"></div>
        <div class="key" @touchstart="typing('0')">0</div>
        <div class="key common-bc-2a2b2a" @touchstart="typing('del')">
          <img class="del-icon" src="../../assets/images/common/del_icon.png"/>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    pwdLength: {
      type: Number,
      default: function () {
        return 0
      }
    }
  },
  methods: {
    /* 输入 */
    typing (val) {
      if (val === 'del' || this.pwdLength < 6) {
        this.$emit('typing', val)
      }
    }
  }
}
</script>
