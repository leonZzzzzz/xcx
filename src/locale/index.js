import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { localRead } from '@lemon/euler-app-h5/src/libs/util'
import customZhCn from './lang/zh-CN'
import customZhTw from './lang/zh-TW'
import customEnUs from './lang/en-US'
import EulerZhCN from '@lemon/euler-app-h5/src/locale/lang/zh-CN'
import EulerZhTw from '@lemon/euler-app-h5/src/locale/lang/zh-TW'
import EulerEnUs from '@lemon/euler-app-h5/src/locale/lang/en-US'

Vue.use(VueI18n)

// 自动根据浏览器系统语言设置语言
const navLang = navigator.language
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false
let lang = localLang || localRead('local') || 'zh-CN'

Vue.config.lang = lang

// vue-i18n 6.x+写法
Vue.locale = () => {}
const messages = {
  'zh-CN': Object.assign(EulerZhCN, customZhCn),
  'zh-TW': Object.assign(EulerZhTw, customZhTw),
  'en-US': Object.assign(EulerEnUs, customEnUs)
}
const i18n = new VueI18n({
  locale: lang,
  messages
})

export default i18n
