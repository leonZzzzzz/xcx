// import MemberAPI from '@lemon/euler-app-h5/src/service/member-api'
import { HttpAPI } from '@/libs/http-api'
// import { HttpOpenAPI } from '@/libs/http-api'

export default {
  // 获取个人最新数据
  getUserData (params, success, error) {
    const url = '/user/shape/myself_mirror'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 判断用户是否购卡
  setUserCard (params, success, error) {
    const url = '/gym/plan/isBuyCard'
    HttpAPI.createAxiosGet(url, params, success, error)
  }
}
