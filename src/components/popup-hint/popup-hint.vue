<style lang="less" scoped>
  @import "popup-hint.less";
</style>
<template>
  <div>
    <mt-popup v-model="popupHint" popup-transition="popup-fade" :closeOnClickModal="false" class="popup-hint">
      <div class="hint-text">{{hintContent}}</div>
      <div v-if="showLeftBth || showRightBth" class="hint-bth" :class="showLeftBth && showRightBth? 'jc-space-between':'jc-center'">
        <div v-if="showLeftBth" class="bth-style" :style="leftBthStyle? leftBthStyle:''" @click="leftBthEvent()">{{leftBthName}}</div>
        <div v-if="showRightBth" class="bth-style" :style="rightBthStyle? rightBthStyle:''" @click="rightBthEvent()">{{rightBthName}}</div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import $ from 'jQuery'
export default {
  props: {
    popupHint: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    leftBthName: {
      type: String,
      default: function () {
        return '确定'
      }
    },
    rightBthName: {
      type: String,
      default: function () {
        return '取消'
      }
    },
    hintContent: {
      type: String,
      default: function () {
        return '提示内容'
      }
    },
    showLeftBth: {
      type: Boolean,
      default: function () {
        return true
      }
    },
    showRightBth: {
      type: Boolean,
      default: function () {
        return true
      }
    },
    leftBthStyle: {
      type: String,
      default: function () {
        return 'border: .03rem solid #F6BF3C;color: #F6BF3C'
      }
    },
    rightBthStyle: {
      type: String,
      default: function () {
        return 'border: .03rem solid #999999;color: #999999'
      }
    }
  },
  watch: {
    popupHint () {
      if (!this.popupHint) {
        this.closeVModal()
      }
    }
  },
  methods: {
    closeVModal () {
      $('.v-modal').css('display', 'none')
    },
    leftBthEvent () {
      this.$emit('left-bth-event')
    },
    rightBthEvent () {
      this.$emit('right-bth-event')
    }
  }
}
</script>
