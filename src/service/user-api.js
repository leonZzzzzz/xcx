import { HttpAPI, MagicHttpAPI } from '@/libs/http-api'

export default {
  // 个人信息-查看
  detailsList (params, success, error) {
    const url = '/user/details/info'
    return HttpAPI.createAxiosGet(url, {})
  },
  // 个人信息-修改
  detailsUpdateInfo (params, success, error) {
    const url = '/user/details/update_info'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 个人信息-收货地址
  addressList (params, success, error) {
    const url = '/user/address/list'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 个人信息-增加地址
  addAddress (params, success, error) {
    const url = '/user/address/add'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 个人信息-更新地址
  updateAddress (params, success, error) {
    const url = '/user/address/update'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 个人信息-删除地址
  delAddress (params, success, error) {
    const url = '/user/address/del'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 个人信息-设置默认地址
  defaultAddress (params, success, error) {
    const url = '/user/address/default_address'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 个人中心-可用优惠卷
  validListInfo (params, success, error) {
    const url = '/user/coupon/valid_list_info'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 个人中心-可用优惠卷
  unvalidListInfo (params, success, error) {
    const url = '/user/coupon/unvalid_list_info'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 用户订单->列表
  orderCardList (params, success, error) {
    const url = '/user/order_card/list'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 用户订单->详情
  orderCardDetail (params, success, error) {
    const url = '/user/order_card/detail'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 用户点餐订单列表
  orderFoodDetail (params, success, error) {
    const url = '/user/order_food/list'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 用户订餐订单->模拟支付（只能在dev或者test的环境中）
  orderFoodMockPay (params, success, error) {
    const url = '/user/order_food/mock_pay'
    HttpAPI.createAxiosPost(url, params, success, error)
  }, // 获取用户信息
  userMessage (params, success, error) {
    const url = '/euler/member_auth/info'
    HttpAPI.createAxiosGet(url, params, success, error)
  }, // 修改用户密码
  userPwd (params, success, error) {
    const url = '/euler/member_info/update_password_src'
    HttpAPI.createAxiosPost(url, params, success, error)
  }, // 修改支付密码
  paymentPwd (params, success, error) {
    const url = '/euler/member_info/update_pay_password_verify_code'
    HttpAPI.createAxiosPost(url, params, success, error)
  }, // 获取用户信息
  getUserInfo (params, success, error) {
    const url = '/euler/member_info/detail_info'
    HttpAPI.createAxiosGet(url, params, success, error)
  }, // 判断性别
  isSaveSex (params, success, error) {
    const url = '/euler/member_info/isSaveSex'
    HttpAPI.createAxiosGet(url, params, success, error)
  }, // 获取购卡列表
  buyCard (params, success, error) {
    const url = '/goods/card/create_order'
    HttpAPI.createAxiosPost(url, params, success, error)
  }, // 生成订单
  getOrder (params, success, error) {
    const url = '/goods/card/timeCard'
    HttpAPI.createAxiosGet(url, params, success, error)
  }, // 订单列表
  cardPrice (params, success, error) {
    const url = '/gym/train_plan/plan_card_price'
    HttpAPI.createAxiosGet(url, params, success, error)
  }, // 订单取消
  orderdist (params, success, error) {
    const url = '/user/order_card/cancel'
    HttpAPI.createAxiosPost(url, params, success, error)
  }, // 购卡详情
  bugOrder (params, success, error) {
    const url = '/user/order_card/detail'
    HttpAPI.createAxiosGet(url, params, success, error)
  }, // 食物订单详情
  bugfood (params, success, error) {
    const url = '/user/order_food/detail'
    HttpAPI.createAxiosGet(url, params, success, error)
  }, // 计划列表
  plan (params, success, error) {
    const url = '/gym/plan/getMySelfPlan'
    HttpAPI.createAxiosGet(url, params, success, error)
  }, // 计算总金额
  getPlanStyle (params, success, error) {
    const url = '/goods/food_cart/mealdetail'
    HttpAPI.createAxiosPost(url, params, success, error)
  }, // 模拟支付
  cardWxPay (params, success, error) {
    const url = '/user/order_card/wx_pay'
    HttpAPI.createAxiosPost(url, params, success, error)
  }, // 微信支付
  wxPayCard (params, success, error) {
    const url = '/user/order_card/wx_pay'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  wxPay (params, success, error) {
    const url = '/user/order_food/wx_pay'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  addMoney (params, success, error) {
    const url = '/goods/food_cart/editOrderTotalAmount'
    HttpAPI.createAxiosPost(url, params, success, error)
  }, // 保存信息  /gym/plan/customEdit
  customEdit (params, success, error) {
    const url = '/user/target/save'
    HttpAPI.createAxiosPost(url, params, success, error)
  }, // 获取订单id
  getId (params, success, error) {
    const url = '/gym/plan/custom'
    HttpAPI.createAxiosGet(url, params, success, error)
  }, // 次数增加  /gym/plan/customEdit
  addmuch (params, success, error) {
    const url = '/gym/plan/customAdd'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  //  购买计划卡
  palnMoney (params, success, error) {
    const url = '/goods/card/create_order'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 计划卡-创建订单
  palnCreate (params, success, error) {
    const url = '/goods/card/buy_card'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 获取营养次数和金额
  getMunchAnd (params, success, error) {
    const url = '/gym/train_plan/getMealMoney'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 获取总金额
  getTotalMoney (params, success, error) {
    const url = '/gym/train_plan/getTotleMoney'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 获取计划详情
  getdetail (params, success, error) {
    const url = '/gym/train_plan/detail'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 用户评价
  assessUser (params, success, error) {
    const url = '/goods/food_evaluate/add'
    HttpAPI.createAxiosPost(url, params, success, error)
  }, // 确认收货
  confirmOrder (params, success, error) {
    const url = '/user/order_food/confirm_receipt'
    HttpAPI.createAxiosPost(url, params, success, error)
  }, // 取消订单
  remveOrder (params, success, error) {
    const url = '/user/order_food/applyRefund'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 订单详情
  planGet (params, success, error) {
    const url = '/user/order_card/detail'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 取消订单
  remvePlan (params, success, error) {
    const url = '/user/order_card/cancel'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  //  设置体重
  getValue (params, success, error) {
    const url = '/user/target/detail'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 扫码登录
  getPlanScan (params, success, error) {
    const url = '/magic/login/check_login'
    MagicHttpAPI.createAxiosPost(url, params, success, error)
  },
  // 手环柜列表
  getCabinetList (params, success, error) {
    const url = '/user/cabinet/list'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 手环柜占用
  getCabinetOccupy (params, success, error) {
    const url = '/user/cabinet/create_number'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 显示目标重量
  getTarget (params, success, error) {
    const url = '/gym/train_plan/getTarget'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 判断是否已购卡
  isHaveCard (params, success, error) {
    const url = '/gym/train_plan/isHaveCard'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 判断是否已购卡
  isHaveTimeCard (params, success, error) {
    const url = '/gym/train_plan/is_have_time_card'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 获取两次体型数据
  getLog (params, success, error) {
    const url = '/gym/train_plan/getLog'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 获取两次体态数据
  getPosture (params, success, error) {
    const url = '/user/shape/myself_3d_posture'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 清除保存数据
  getClear (params, success, error) {
    const url = '/user/target/clear'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 判断用户是否免费订餐
  getFreeFood (params, success, error) {
    const url = '/user/order_food/is_free'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 提交用户密码
  getPassword (params, success, error) {
    const url = '/user/order_food/update_for_free'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 判断是否体测
  isTest (params, success, error) {
    const url = '/gym/train_plan/isTest'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 上传文件
  uploadFile (params, success, error) {
    const url = '/file/upload'
    HttpAPI.createAxiosPostFile(url, params, success, error)
  },
  // 上传照片/视频
  uploadAlbum (params, success, error) {
    const url = '/user/album/upload_album'
    HttpAPI.createAxiosPostFile(url, params, success, error)
  },
  // 相册列表
  photolistInfo (params, success, error) {
    const url = '/user/album/list_info'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 训练列表
  orderList (params, success, error) {
    const url = '/user/order_card/list'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 训练列表
  userIsBound (params, success, error) {
    const url = '/user/bangle/is_bound'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 个人次数详情
  countInfo (params, success, error) {
    const url = '/user/count/count_info'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 客流量
  customerFlow (params, success, error) {
    const url = '/user/bangle_record/customer_flow'
    HttpAPI.createAxiosGet(url, params, success, error)
  }
}
