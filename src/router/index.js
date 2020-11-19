import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import { dealBefore, dealAfter } from '@lemon/euler-app-h5/src/router/router-deal'

Vue.use(Router)
const router = new Router({
  routes,
  base: './'
})

dealBefore(router)
dealAfter(router)

export default router
