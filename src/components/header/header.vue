<style lang="less" scoped>
  @import "header.less";
</style>
<template>
  <div>
    <!--默认-带title头部-->
    <div v-if="title" class="header-default" :style="{backgroundColor: backgroundColor}">
      <div class="left-icon-box" @click="leftUrl()">
        <img
          v-if="leftIcon"
          :class="leftIconName==='back'? 'left-icon':(leftIconName==='trainLog'? 'train-log':'')"
          :src="leftIconName==='back'? back:(leftIconName==='trainLog'? trainLog:'')"
        />
        <!--<img v-if="leftIcon" class="right-icon-25" src="../../assets/images/common/train-log.png"/>-->
      </div>
      <!--指定路由跳转-->
      <!--<div class="left-icon-box" @click="leftIcon? '':leftUrl()">-->
        <!--<img v-if="routerUrl !== null" class="left-icons" src="../../assets/images/common/left_icon_black_big.png"/>-->
      <!--</div>-->
      <div class="title">{{title}}</div>
      <!--默认类型-->
      <div v-if="!rightIcon" class="right-text-box" @click="rightHandle()">
        <span>{{rightText}}</span>
      </div>
      <!--体型-->
      <div v-if="rightIcon" class="right-icon-box">
        <!--<img class="right-icon-22" src="../../assets/images/common/sctp.png"/>-->
        <!--<img class="right-icon-22" src="../../assets/images/somatotype/sm.png" style="margin-left: .48rem" @click="handleClick()"/>-->
        <header-btn></header-btn>
      </div>
    </div>
    <!--不带title头部左边按钮-->
    <div v-if="!title && leftIcon" class="header-not-title-left" @click="leftUrl()">
      <img class="left-icon" :src="back"/>
    </div>
    <!--不带title头部右边按钮-->
    <div v-if="!title && rightIcon" class="header-not-title-right">
      <header-btn class="right-icon"></header-btn>
      <!--<img class="right-icon" :src="back"/>-->
    </div>
  </div>
</template>

<script>
// import QrCode from '../../mixins/qrcode'
import HeaderBtn from '../../view/somatotype/headerButton'

export default {
  // mixins: [QrCode],
  components: { HeaderBtn },
  props: {
    // 背景色
    backgroundColor: {
      type: String,
      default: function () {
        return '#1B1B1B'
      }
    },
    // 左边按钮是否显示
    leftIcon: {
      type: Boolean,
      default: function () {
        return true
      }
    },
    // 左边按钮是否显示
    leftIconName: {
      type: String,
      default: function () {
        return 'back'
      }
    },
    // 右边icon名称
    rightIcon: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    title: {
      type: String,
      default: function () {
        return null
      }
    },
    // 头部右边按钮名称
    rightText: {
      type: String,
      default: function () {
        return null
      }
    },
    // 指定路由跳转
    routerUrl: {
      type: String,
      default: function () {
        return null
      }
    }
  },
  data () {
    return {
      count: '', // 时间容器
      timer: null, // 倒计时计时器
      show: true, // 显示倒计时
      one: true,
      back: require('../../assets/images/common/left_icon_black_big.png'),
      trainLog: require('../../assets/images/common/train-log.png')
    }
  },
  methods: {
    leftUrl () {
      if (this.leftIcon && this.routerUrl) {
        this.$router.push('/' + this.routerUrl)
      } else {
        this.$router.go(-1)
      }
    },
    rightHandle () {
      if (this.rightText || this.rightIcon) {
        this.$emit('on-right-handle')
      }
    }
    // handleClick () {
    //   if (this.one === true) {
    //     this.scanQrCode()
    //     this.one = false
    //   }
    //   this.timer = setInterval(() => {
    //     this.one = true
    //   }, 3000)
    // }
  }
}
</script>
