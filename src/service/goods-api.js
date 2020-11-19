import { HttpAPI, HttpOpenAPI } from '@/libs/http-api'
// import OpenAPI from '@lemon/euler-app-h5/src/service/open-api'
export default {
  // 菜品分类列表
  listDetailsClass (params, success, error) {
    const url = '/open/goods_food/class_list'
    HttpOpenAPI.createAxiosGet(url, params, success, error)
  }, // 商品配量
  foodClass (params, success, error) {
    const url = '/open/goods_food/rideDetail'
    HttpOpenAPI.createAxiosGet(url, params, success, error)
  },
  // 菜式食品->列表
  listFoods (params, success, error) {
    const url = '/open/goods_food/list'
    HttpOpenAPI.createAxiosGet(url, params, success, error)
  },
  //  套餐模块 ->套餐列表
  foodslist (params, success, error) {
    const url = '/open/goods_food_set/list'
    HttpOpenAPI.createAxiosGet(url, params, success, error)
  },
  // 菜式评价
  listByGoodsFoodId (params, success, error) {
    const url = '/open/goods_food_evaluate/listByGoodsFoodId'
    HttpOpenAPI.createAxiosGet(url, params, success, error)
  },
  // 购物车修改数量
  updateFoodsCount (params, success, error) {
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
  listCart (params, success, error) {
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
    const url = '/open/goods_food/detail'
    HttpOpenAPI.createAxiosGet(url, params, success, error)
  },
  // 菜式食品->套餐详情
  foodMealDetail (params, success, error) {
    const url = '/open/goods_food_set/detail'
    HttpOpenAPI.createAxiosGet(url, params, success, error)
  },
  // 购菜车->列表(ids)
  listCarIds (params, success, error) {
    const url = '/goods/food_cart/list_ids'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 购菜车->单点批量添加
  batchAdd (params, success, error) {
    const url = '/goods/food_cart/batch_add'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 购菜车->套餐批量添加
  mealAdd (params, success, error) {
    const url = '/goods/food_set_cart/batch_add'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 健身卡商品->购卡列表
  cardList (params, success, error) {
    const url = '/goods/card/list'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 健身卡商品->详情
  cardDetail (params, success, error) {
    const url = '/goods/card/detail'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 健身卡商品->生成订单
  cardCreatOrderl (params, success, error) {
    const url = '/goods/card/create_order'
    HttpAPI.createAxiosPost(url, params, success, error)
  }, // 订餐列表
  foodsList (params, success, error) {
    const url = '/user/order_food/list'
    HttpAPI.createAxiosGet(url, params, success, error)
  }, // 取消订单
  delectFoods (params, success, error) {
    const url = '/user/order_food/cancel'
    HttpAPI.createAxiosPost(url, params, success, error)
  }, // 营养详情
  rideDetail (params, success, error) {
    const url = '/open/goods_food/rideDetail'
    HttpOpenAPI.createAxiosGet(url, params, success, error)
  }, // 今日所需KCL
  lessWeight (params, success, error) {
    const url = '/goods/food_cart/getTodayKcal'
    HttpAPI.createAxiosGet(url, params, success, error)
  }, // 此时一餐所需kcl
  todayWeight (params, success, error) {
    const url = '/goods/food_kcal_record/get_record'
    HttpAPI.createAxiosGet(url, params, success, error)
  }, // 一餐所需的总金额
  mealMoney (params, success, error) {
    const url = '/goods/food_cart/mealMoney'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  getNotAccord (params, success, error) {
    const url = '/goods/food_cart/getNotAccord'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  setWeight (params, success, error) {
    const url = '/goods/food_cart/dose_qty'
    HttpAPI.createAxiosPost(url, params, success, error)
  }
}
