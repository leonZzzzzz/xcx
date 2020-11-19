<template>
  <div id="main" class="euler-app-main">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <AppUpdate :popupVisibleProp="popupVisible" v-show="needUpdate && popupVisible" :progressValueProp="progressValue" :platform="platform"
      @on-update="updateNow" @on-hide="popupVisible = false"></AppUpdate>
    <!--<PopupLogin :popupLoginValue="popupLoginValue" @on-hide="popupLoginValue=false" @on-login-update="loginUpdate"></PopupLogin>-->
    <!--<MatchResult :popupMatchResult="popupMatchResult" @on-hide="popupMatchResult=false"></MatchResult>-->
  </div>
</template>

<script>
import WebInit from '@lemon/euler-app-h5/src/mixins/web-init'
import CordovaInit from '@lemon/euler-app-h5/src/mixins/cordova-init'
import AppUpdate from '../src/components/app-update/app-update'
// import MemberInfoInit from '@/mixins/member-info-init'
import Common from '@/mixins/common'
import WechatInit from '@/mixins/wechat-init'
import { mapMutations } from 'vuex'
import Config from './config'
export default {
  name: 'App',
  mixins: [WebInit, CordovaInit, WechatInit, Common],
  components: {
    AppUpdate
  },
  data () {
    return {
      needUpdate: true,
      popupMatchResult: false
    }
  },
  created () {
    if (Config.appStore === 'store') {
      this.needUpdate = false
    }
  },
  beforeCreate () {
    this.$root.eventHub.$on('on-login', () => {
      this.clearLoginInfoCookie()
    })
  },
  methods: {
    ...mapMutations([
      'goHomePage'
    ]),
    initExtendPlugin () {
      this.checkInstall()
    }
  }
}
</script>

<style lang="less">
</style>
