import EulerCookie from '@lemon/euler-app-h5/src/libs/euler-cookie'

export default {
  data () {
    return {
      isAndroid: false // 判断是否安卓
    }
  },
  computed: {},
  created () {
    this.ifAndroid()
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
    clearLoginInfoCookie () {
      EulerCookie.remove('memberId')
      EulerCookie.remove('memberType')
      EulerCookie.remove('nickName')
      EulerCookie.remove('phone')
      EulerCookie.remove('uniqueCode')
    }
  }
}
