// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import i18n from './locale'
import config from '@/config'
import Mint from 'mint-ui'
import 'lib-flexible'
import 'mint-ui/lib/style.css'
import '../src/components/footer/footer-tab.less'
import weekSlider from 'v-week-slider'
import echarts from 'echarts'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VuePhotoPreview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import './index.less'
// import { ModelObj } from 'vue-3d-model'

/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$echarts = echarts
Vue.prototype.$config = config
Vue.use(Mint)
Vue.use(weekSlider)
Vue.use(iView)

if (process.env.NODE_ENV !== 'development') {
  document.oncontextmenu = function () {
    return false
  }
  document.onselectstart = function () {
    return false
  }
  document.oncopy = function () {
    return false
  }
  document.documentElement.style.webkitTouchCallout = 'none'
  document.documentElement.style.webkitUserSelect = 'none'
}

var option = {
  fullscreenEl: false // 清除全屏按钮
}
Vue.use(VuePhotoPreview, option)
// Vue.use(ModelObj)

/* eslint-disable no-new */
var vueElement = new Vue({
  el: '#app',
  router,
  i18n,
  store,
  data: {
    eventHub: new Vue()
  },
  render: h => h(App)
})
window.vueElement = vueElement
