import { HttpAPI } from '@/libs/http-api'

export default {
  // 未领取 -> 优惠券信息
  getScan (params, success, error) {
    const url = '/user/coupon/get_scan'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 领取优惠券
  getCoupon (params, success, error) {
    const url = '/user/coupon/get_coupon'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 可用优惠券列表
  validListInfo (params, success, error) {
    const url = '/user/coupon/valid_list_info'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 不可用优惠券列表
  unvalidListInfo (params, success, error) {
    const url = '/user/coupon/unvalid_list_info'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 优惠券列表（暂没用）
  listInfo (params, success, error) {
    const url = '/coupon/list_info'
    HttpAPI.createAxiosGet(url, params, success, error)
  }
}
