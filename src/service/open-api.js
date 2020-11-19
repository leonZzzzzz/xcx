import OpenAPI from '@lemon/euler-app-h5/src/service/open-api'
import { HttpAPI, HttpOpenAPI } from '@/libs/http-api'
export default {
  // 个人信息-修改
  detailsUpdateInfo (params, success, error) {
    const url = '/euler/member_info/update_detail'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 个人体重-修改
  weightUpdateInfo (params, success, error) {
    const url = '/euler/member_info/update_weight'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 个人信息-详情
  userInfoMember (params, success, error) {
    const url = '/euler/member_info/detail_info'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 判断是否含有支付密码
  userPassword (params, success, error) {
    const url = '/euler/member_pay_info/is_save_password'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  heightWeight (params, success, error) {
    const url = '/open/device_info/height_weight'
    OpenAPI.createAxiosGet(url, params, success, error)
  },
  // 修改头像
  updateAvatar (params, success, error) {
    const url = '/euler/member_info/update_avatar'
    HttpAPI.createAxiosPostFile(url, params, success, error)
  },
  // 获取地区
  getAreaInfo (params, success, error) {
    const url = '/euler/open_area/list_by_parent'
    HttpOpenAPI.createAxiosGet(url, params, success, error)
  }
}
