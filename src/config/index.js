var homeName = 'somatotype'
if (process.env.VUE_APP_HOME_PAGE) {
  homeName = process.env.VUE_APP_HOME_PAGE
}
var memberType = 'CONSUMER'
if (process.env.VUE_APP_MEMBER_TYPE) {
  memberType = process.env.VUE_APP_MEMBER_TYPE
}
// younger-member
var appCode = ''
if (process.env.VUE_APP_APP_CODE) {
  appCode = process.env.VUE_APP_APP_CODE
}
var wxAppId = ''
if (process.env.VUE_APP_WX_APP_ID) {
  wxAppId = process.env.VUE_APP_WX_APP_ID
}
var appStore = ''
if (process.env.VUE_APP_APP_STORE) {
  appStore = process.env.VUE_APP_APP_STORE
}
var eulerBaseMagicUrl = ''
var eulerBaseUrl = ''
var eulerBaseOpenUrl = ''
var eulerVersionUrl = ''
var youngerBaseUrl = ''
var youngerBaseOpenUrl = ''
var headerRequest = true
var headerOpenRequest = true
var viewUrlPre = ''
var logLevel = 5
if (process.env.NODE_ENV === 'development') {
  eulerBaseMagicUrl = 'http://develop.roywise.cn:31080/younger-server-magic-dev/api'
  eulerBaseUrl = 'http://develop.roywise.cn:31080/younger-server-platform-dev/api'
  eulerBaseOpenUrl = 'http://develop.roywise.cn:31080/younger-server-open-dev/api'
  eulerVersionUrl = 'http://develop.roywise.cn:31080/younger-server-open-dev/api'
  youngerBaseUrl = 'http://develop.roywise.cn:31080/younger-server-platform-dev/api'
  youngerBaseOpenUrl = 'http://develop.roywise.cn:31080/younger-server-open-dev/api'
  viewUrlPre = 'https://younger-test-store.oss-cn-shenzhen.aliyuncs.com/'
} else if (process.env.NODE_ENV === 'production') {
  if (process.env.VUE_APP_APP_ENV === 'xcxprod') {
    eulerBaseMagicUrl = 'https://member.ygperfect.com/younger-server-magic/api'
    eulerBaseUrl = 'https://member.ygperfect.com/younger-server-platform/api'
    eulerBaseOpenUrl = 'https://member.ygperfect.com/younger-server-open/api'
    eulerVersionUrl = 'https://member.ygperfect.com/younger-server-open/api'
    youngerBaseUrl = 'https://member.ygperfect.com/younger-server-platform/api'
    youngerBaseOpenUrl = 'https://member.ygperfect.com/younger-server-open/api'
    viewUrlPre = 'https://younger-store-1259057005.cos.ap-guangzhou.myqcloud.com/'
  } else if (process.env.VUE_APP_APP_ENV === 'appprod') {
    eulerBaseMagicUrl = 'http://member.ygperfect.com/younger-server-magic/api'
    eulerBaseUrl = 'http://member.ygperfect.com/younger-server-platform/api'
    eulerBaseOpenUrl = 'http://member.ygperfect.com/younger-server-open/api'
    eulerVersionUrl = 'http://member.ygperfect.com/younger-server-open/api'
    youngerBaseUrl = 'http://member.ygperfect.com/younger-server-platform/api'
    youngerBaseOpenUrl = 'http://member.ygperfect.com/younger-server-open/api'
    viewUrlPre = 'https://younger-store-1259057005.cos.ap-guangzhou.myqcloud.com/'
  } else if (process.env.VUE_APP_APP_ENV === 'xcx') {
    eulerBaseMagicUrl = 'https://develop.roywise.cn/younger-server-magic-dev/api'
    eulerBaseUrl = 'https://develop.roywise.cn/younger-server-platform-dev/api'
    eulerBaseOpenUrl = 'https://develop.roywise.cn/younger-server-open-dev/api'
    eulerVersionUrl = 'https://develop.roywise.cn/younger-server-open-dev/api'
    youngerBaseUrl = 'https://develop.roywise.cn/younger-server-platform-dev/api'
    youngerBaseOpenUrl = 'https://develop.roywise.cn/younger-server-open-dev/api'
    viewUrlPre = 'https://younger-test-store.oss-cn-shenzhen.aliyuncs.com/'
  } else {
    eulerBaseMagicUrl = 'http://develop.roywise.cn:31080/younger-server-magic-dev/api'
    eulerBaseUrl = 'http://develop.roywise.cn:31080/younger-server-platform-dev/api'
    eulerBaseOpenUrl = 'http://develop.roywise.cn:31080/younger-server-open-dev/api'
    eulerVersionUrl = 'http://develop.roywise.cn:31080/younger-server-open-dev/api'
    youngerBaseUrl = 'http://develop.roywise.cn:31080/younger-server-platform-dev/api'
    youngerBaseOpenUrl = 'http://develop.roywise.cn:31080/younger-server-open-dev/api'
    viewUrlPre = 'https://younger-test-store.oss-cn-shenzhen.aliyuncs.com/'
  }
}

export default {
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: true,
  appConfig: {
    statusBar: {
      show: 'false',
      styleAndroidTranslucent: 'true',
      backgroundColorByHexString: '#26244D'
    },
    jpush: {
      show: 'false'
    }
  },
  /**
   * @description api请求基础路径
   */
  wxAppId: wxAppId,
  viewUrlPre: viewUrlPre,
  eulerBaseUrl: eulerBaseUrl,
  eulerBaseMagicUrl: eulerBaseMagicUrl,
  eulerBaseOpenUrl: eulerBaseOpenUrl,
  eulerVersionUrl: eulerVersionUrl,
  youngerBaseUrl: youngerBaseUrl,
  youngerBaseOpenUrl: youngerBaseOpenUrl,
  headerRequest: headerRequest,
  headerOpenRequest: headerOpenRequest,
  logLevel: logLevel,
  appCode: appCode,
  appStore: appStore,
  productionSourceMap: false,
  routeExitNameArr: ['login_home'],
  loginPage: 'login_home', // DIGIT, COMMON,
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: homeName,
  /**
   *  系统名称
   */
  systemName: '洋格健身',
  /**
   *  系统标题
   */
  systemTitle: '洋格健身',
  /**
   *  会员类型：根据业务系统进行配置，默认为:COMMON
   */
  memberType: memberType,
  /**
   * @description 需要加载的插件
   */
  plugin: {
    'error-store': {
      showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  }
}
