<template>
  <div id="app-update">
    <div>
      <mt-popup v-model="popupVisible" class="prompt-update">
        <div class="prompt-update-logo">
          <img class="update-img" src="../../assets/images/update/update-img.png"/>
        </div>
        <div class="prompt-update-content">
          <div class="prompt-update-text">
            更新内容<br/>
            1、页面风格改版，更简洁美观<br/>
            2、其他功能优化
          </div>
          <div class="prompt-update-bth">
            <div class="bth-1 background-blue" v-show="updateModel === 'N'" @click="updateNow">立即更新</div>
            <div class="bth-1 background-gray" v-show="updateModel === 'Y'">
              <div class="bth-1-progress background-blue" :style="progress"></div>
              <div class="bth-1-text">更新中 {{progressValue}}%</div>
            </div>
            <div class="bth-2" @click="popupVisible=false">以后再说</div>
          </div>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppUpdate',
  data () {
    return {
      popupVisible: true,
      progressValue: 1,
      updateModel: 'N'
    }
  },
  computed: {
    progress () {
      return {
        width: this.progressValue + '%' // this.progressValue < 15 ? '15%' :this.progressValue + '%'
      }
    }
  },
  props: {
    popupVisibleProp: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    progressValueProp: {
      type: Number,
      default: function () {
        return 0
      }
    },
    platform: {
      type: String,
      default: function () {
        return 'ANDROID'
      }
    }
  },
  watch: {
    popupVisibleProp () {
      this.popupVisible = this.popupVisibleProp
    },
    progressValueProp () {
      this.progressValue = this.progressValueProp
    },
    popupVisible () {
      if (!this.popupVisible) {
        this.$emit('on-hide')
      }
    }
  },
  methods: {
    updateNow () {
      if (this.platform === 'iOS') {
        this.popupVisible = false
      } else {
        this.updateModel = 'Y'
      }
      this.$emit('on-update')
    }
  }
}
</script>

<style lang="less" scoped>
@import "app-update";
</style>
