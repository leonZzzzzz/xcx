import { getBlockMemberInfo, getInitBlockMemberInfo, clearInitBlockMemberInfo } from '@/libs/block-util'
// import { initBlockMemberInfo } from '@/store/extend-util'
import { getToken } from '@lemon/euler-app-h5/src/libs/util'
import EulerCookie from '@lemon/euler-app-h5/src/libs/euler-cookie'
import MemberAPI from '../service/member-api'
import { mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      isAndroid: false, // 判断是否安卓
      auth: null,
      assetInfo: {
        frogBean: null, // 金豆
        frogToken: null // 蛙币
      },
      memberInfo: {
        memberId: null,
        nickName: null,
        groupId: null,
        groupTitle: null,
        agentTitle: null,
        agentUniqueCode: null,
        agentTypeDisplay: null,
        agentType: null,
        agentLevel: null,
        memberTitle: null,
        area: null,
        uniqueCode: null,
        phone: null,
        readStatus: null,
        provinceId: null,
        provinceCode: null,
        provinceName: null,
        cityId: null,
        cityCode: null,
        cityName: null,
        avatar: null,
        initPayPassword: false
      },
      memberInfoTimer: null,
      popupLoginValue: false,
      taskHasInit: false
    }
  },
  computed: {
  },
  created () {
    this.$root.eventHub.$on('on-login-finish', () => {
      this.needFirstGive()
      this.initMemberInfoTimer(true)
    })
    this.ifAndroid()
  },
  mounted () {
    this.initMemberInfoTimer()
  },
  methods: {
    ifAndroid () {
      var u = navigator.userAgent
      // android终端
      this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
      // console.log('isAndroid：' + this.isAndroid)
      // ios终端
      // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    },
    ...mapGetters([
      'getToken'
    ]),
    ...mapMutations([
      'setToken', 'initUserInfo', 'goHomePage'
    ]),
    checkAuthLogin () {
      if (!this.getToken()) {
        // emitLogin()
        this.$router.push({ name: this.$config.loginPage })
        return false
      } else {
        if (this.memberInfo.agentType === 'VISITOR') {
          this.$router.push({ name: 'login_join' })
        }
      }
      return true
    },
    goAuthPage (url) {
      if (!this.checkAuthLogin()) {
        return
      }
      this.$router.push(url)
    },
    viewAuthInfo (needLogin, value, defaultValue) {
      if (needLogin) {
        if (!this.checkAuthLogin()) {
          return
        }
      }
      if (!this.auth) {
        return defaultValue
      }
      return value
    },
    freshMemberInfo () {
      // initBlockMemberInfo(this.dealFresh)
    },
    dealFresh (memberInfoJson) {
      if (memberInfoJson) {
        this.memberInfo = memberInfoJson
      }
      this.freshAfter()
    },
    freshAfter () {
    },
    clearLoginInfoCookie () {
      EulerCookie.remove('memberId')
      EulerCookie.remove('memberType')
      EulerCookie.remove('nickName')
      EulerCookie.remove('phone')
      EulerCookie.remove('uniqueCode')
      clearInitBlockMemberInfo()
      this.resetLoginInfo()
    },
    resetLoginInfo () {
      this.auth = null
      if (!this.memberInfo) {
        return
      }
      this.memberInfo.agentType = null
      this.memberInfo.agentLevel = null
      this.memberInfo.agentTypeDisplay = null
    },
    initMemberInfoTimer (isLogin) {
      if (this.taskHasInit) {
        return
      }
      this.taskHasInit = true

      var memberInfo = getBlockMemberInfo()
      this.memberInfo = JSON.parse(memberInfo)

      this.auth = getToken()
      this.taskHasInit = false

      this.dealAfterInit()
    },
    dealAfterInit () {
    },
    initInfo () {
      this.initUserInfo()
      this.freshMemberInfo()
    },
    onlyRefreshToken (res) {
      this.setToken(res)
      this.initInfo()
    },
    startInterval () {
      // 3分钟执行一次
      window.setInterval(this.autoStartDugOre, 3 * 60 * 1000)
    },
    autoStartDugOre () {
      if (!getInitBlockMemberInfo()) {
        return
      }
      if (!this.checkAuthLogin()) {
        return
      }
      MemberAPI.startDugOre({}, () => {
      })
    },
    needFirstGive () {
      EulerCookie.set('FIRST_GIVE', 'true')
    },
    removeFirstGive () {
      EulerCookie.remove('FIRST_GIVE')
    },
    isFirstGive () {
      if (!getInitBlockMemberInfo()) {
        return
      }
      if (!this.getToken()) {
        return
      } else if (!this.memberInfo || this.memberInfo.agentType === 'VISITOR') {
        return
      }
      if (this.$route.name !== 'home_page') {
        return
      }
      const firstGive = EulerCookie.get('FIRST_GIVE')
      if (firstGive === 'true') return true
      else return false
    },
    getAssetInfo () {
      MemberAPI.detailInfo({}, res => {
        this.assetInfo = res
      })
    },
    // 下载奇迹觉醒
    downloadGame_qjjx () {
      cordova.InAppBrowser.open('http://down.s.qq.com/download/1105824893/apk/10031287_com.tencent.tmgp.tmsk.qj2.apk', '_system')
    },
    // 下载传奇世界
    downloadGame_cqsj () {
      cordova.InAppBrowser.open('http://down.s.qq.com/download/1106107956/apk/10032125_com.tencent.woool3d.apk', '_system')
    },
    // 下载刺激战场
    downloadGame_cjzc () {
      cordova.InAppBrowser.open('https://pg.qq.com/d/?device', '_system')
    }
  }
}
