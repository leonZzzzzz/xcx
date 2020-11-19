import HttpAPI from '@/libs/http-api'

export default {
  // 菜品分类列表
  detailsClassList (params, success, error) {
    const url = '/goods/food_class/list'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 菜式食品->列表
  foodsList (params, success, error) {
    const url = '/goods/food/list'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 购物车修改数量
  foodsModCount (params, success, error) {
    const url = '/goods/food_cart/mod_count'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 购菜车->清空购物车
  emptyCart (params, success, error) {
    const url = '/goods/food_cart/empty_cart'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 购菜车->添加
  addCart (params, success, error) {
    const url = '/goods/food_cart/add'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 购菜车->列表
  getCartList (params, success, error) {
    const url = '/goods/food_cart/list'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 购菜车->生成订单
  createOrder (params, success, error) {
    const url = '/goods/food_cart/create_order'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 菜式食品->详情
  foodDetail (params, success, error) {
    const url = '/goods/food/detail'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 购菜车->列表(ids)
  getcarListIds (params, success, error) {
    const url = '/goods/food_cart/list_ids'
    HttpAPI.createAxiosArrayGet(url, params, success, error)
  }
}
