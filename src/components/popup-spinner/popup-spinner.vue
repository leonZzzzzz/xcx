<style lang="less" scoped>
  @import "popup-spinner.less";
</style>
<template>
  <div>
    <mt-popup v-model="popupSpinner" popup-transition="popup-fade" :closeOnClickModal="false" class="popup-spinner">
      <div class="spinner-content">
        <span>{{hintContent}}</span>
        <mt-spinner class="spinner" type="snake" color="#F6BF3C" :size="28"></mt-spinner>
      </div>
      <div class="spinner-bth">
        <div class="bth-style" @click="bthEvent()">{{bthName}}</div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import $ from 'jQuery'
export default {
  props: {
    popupSpinner: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    hintContent: {
      type: String,
      default: function () {
        return '提示内容'
      }
    },
    bthName: {
      type: String,
      default: function () {
        return '关闭'
      }
    }
  },
  watch: {
    popupSpinner () {
      if (!this.popupSpinner) {
        this.closeVModal()
      }
    }
  },
  methods: {
    closeVModal () {
      $('.v-modal').css('display', 'none')
    },
    bthEvent () {
      this.$emit('bth-event')
    }
  }
}
</script>
