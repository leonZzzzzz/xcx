import { getBlockMemberInfo, clearInitBlockMemberInfo } from '@/libs/block-util'
import EulerCookie from '@lemon/euler-app-h5/src/libs/euler-cookie'
import BoyImg from '../assets/images/common/boy.png'
import { getToken } from '@lemon/euler-app-h5/src/libs/util'

export default {
  data () {
    return {
      token: null,
      memberInfo: {
        userId: null, // 用户Id
        nickName: '请登录', // 用户昵称
        sex: null, // 用户性别
        sexDisplay: null, // 用户性别中文
        sexImg: null, // 用户性别图片
        occupational: null, // 职业
        signature: null, // 签名
        age: null, // 年龄
        weight: null, // 重量
        height: null, // 身高
        avatar: null // 头像
      },
      isHaveCard: false, // 是否购买计划卡
      isHaveTimeCard: false, // 是否购买次卡
      actionImg: require('../assets/images/footer/train.png'),
      userAvatarBoy: require('../assets/images/common/boy.png'),
      userAvatarGirts: require('../assets/images/common/girts.png'),
      userSexBoy: require('../assets/original-images/man.png'),
      userSexGirts: require('../assets/original-images/woman.png')
    }
  },
  computed: {},
  created () {
    this.initMemberInfoTimer()
  },
  mounted () {
  },
  beforeCreate () {
    this.$root.eventHub.$on('on-login', () => {
      this.clearLoginInfoCookie()
    })
  },
  methods: {
    goLogin () {
      this.$router.push({ name: this.$config.loginPage })
    },
    goPage (router) {
      if (this.token) {
        this.$router.push({ name: router })
      } else {
        this.goLogin()
      }
    },
    // 转换单位
    getUnits (value) {
      if (value === 'T_SEC') {
        return '秒'
      } else if (value === 'TIME') {
        return '次'
      } else if (value === 'W_KG') {
        return 'kg'
      }
    },
    clearLoginInfoCookie () {
      EulerCookie.remove('memberId')
      EulerCookie.remove('nickName')
      EulerCookie.remove('auth')
      EulerCookie.remove('uniqueCode')
      EulerCookie.remove('avatar')
      EulerCookie.remove('phone')
      EulerCookie.remove('isHaveCard')
      EulerCookie.remove('isHaveTimeCard')
      clearInitBlockMemberInfo()
      this.initMemberInfoTimer()
    },
    initMemberInfoTimer () {
      this.token = getToken()
      this.memberInfo.avatar = BoyImg
      this.isHaveCard = EulerCookie.get('isHaveCard')
      this.isHaveTimeCard = EulerCookie.get('isHaveTimeCard')
      if (this.token) {
        if (getBlockMemberInfo()) {
          var memberInfo = getBlockMemberInfo()
          this.memberInfo = JSON.parse(memberInfo)
        }
      } else {
        this.memberInfo.userId = null
        this.memberInfo.nickName = '请登录'
        this.memberInfo.sex = null
        this.memberInfo.sexDisplay = null
        this.memberInfo.sexImg = null
        this.memberInfo.occupational = null
        this.memberInfo.signature = null
        this.memberInfo.weight = null
        this.memberInfo.height = null
        this.memberInfo.age = null
      }
    }
  }
}
