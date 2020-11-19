
import { LoginRouter } from '@lemon/lemon-login-digit/src/router/routers'
import { errorPage } from '@lemon/euler-app-h5/src/router/routers'
/* 登陆 */
// const Loging = () => import('../view/personal/login')
// /* member */
//
// // /* 教练和搭档 */
const CoachPartnerIndex = () => import('../view/coachPartner/coach-partner-index.vue')
const Ptcourse = () => import('../view/coachPartner/pt-course.vue')
// // /* train训练 */
const TrainIndex = () => import('../view/train/train-index.vue')
// /* 训练没有购卡 */
const TrainNoPurchase = () => import('../view/train/train-no-purchase.vue')
// // 训练有购卡
const TrainHavePurchase = () => import('../view/train/train-have-purchase.vue')
// 训练周期计划
const TrainCyclePlan = () => import('../view/train/train-cycle-plan.vue')
// // 记录有氧运动
const RecordAerobicAdtion = () => import('../view/train/record-aerobic-adtion.vue')
// /* person我的 */
const PersonalIndex = () => import('../view/personal/personal-index.vue')
// // 个人信息
const UserInformation = () => import('../view/personal/user-information.vue')
// // 修改个人信息
const EditingInformation = () => import('../view/personal/editing-information.vue')
// /* 通知 */
const Notice = () => import('../view/notice/notice.vue')
// /* 优惠券 */
const Coupon = () => import('../view/coupon/coupon.vue')
const Setting = () => import('../view/setting/setting.vue')
const MyOrder = () => import('../view/myOrder/my-order.vue')
// /* 购卡 */
const BuyGymCard = () => import('../view/gymCard/buy-gym-card.vue')
// //  体测完成
const StaminaTestSueccess = () => import('../view/gymCard/stamina-test-sueccess.vue')
// // 购卡确认订单
const ConfirmOrder = () => import('../view/gymCard/confirm-order.vue')
// // 支付中心
const PayCenter = () => import('../view/gymCard/pay-center.vue')
// // 制定计划
const MakePlan = () => import('../view/gymCard/make-plan.vue')
// // 修改训练周期计划
const ModifyPlan = () => import('../view/gymCard/modify-plan.vue')
// // 手动输入组数
const MingGroup = () => import('../view/train/ming-group.vue')
// // 实际输入组数
const MingGroupActual = () => import('../view/train/ming-group-Actual.vue')
// // 修改动作
const EditingMingGroup = () => import('../view/train/editing-ming-grounp.vue')
// // 动作示范
const DemoAction = () => import('../view/train/demo-action.vue')
// // 录入动作数据
const RecordActionData = () => import('../view/train/record-action-data.vue')
// // 手动录入数据
const LoggingData = () => import('../view/gymCard/logging-data.vue')
// // 加入搭档
const intoPartner = () => import('../view/coachPartner/into-partner')
// // 加入教练
const intoCoach = () => import('../view/coachPartner/into-coach')
// // 加入成功
const joinSuccess = () => import('../view/coachPartner/pay-joinPlan')
// // 教练信息
const coachUserInfo = () => import('../view/coachPartner/coach-user')
// // 搭档信息
const partnerUserInfo = () => import('../view/coachPartner/partner-user')
// // 求个搭档
const shouldPartner = () => import('../view/coachPartner/should-partner')
// // 营养端确认订单
const ConfirmOrderFood = () => import('../view/nutrition/confirm-order-food.vue')
// 体型
const Somatotype = () => import('../view/somatotype/somatotype.vue')
// 收货地址
const Address = () => import('../view/address/address-home')
// 修改收货地址
const reviseAddress = () => import('../view/address/reviswaddress-home')
// 朋友圈
const friends = () => import('../view/friends/friends-home')
// 计划
const planDetail = () => import('../view/coachPartner/planDetail')
// 食物订单详情
const details = () => import('../view/details/details-home')
// 查看朋友圈
const share = () => import('../view/share/share-home')
// 营养-支付页面
const payment = () => import('../view/payment/payment-home')
// 别人的朋友圈
const friendsShare = () => import('../view/share/friends-share')
// 制定计划
const drawplan = () => import('../view/drawplan/drawplan-home')
// 营养-动态圆
const canvas = () => import('../components/canvas/canvas')
// 登录页面
const login = () => import('../view/login/login-home')
// // 注册页面
// const register = () => import('../view/register/register-home')
// 计划卡-支付成功
const paysuccess = () => import('../view/gymCard/pay-success')
// 营养->评价
const evaluate = () => import('../view/payment/evaluate')
// 搭档信息
const partner = () => import('../view/coachPartner/partner-info')
// 教练信息
const coach = () => import('../view/coachPartner/coach-info')
// 加入搭档
const addPartner = () => import('../view/coachPartner/add-partner')
// 修改密码
const revisePwd = () => import('../view/setting/revise-pwd')
// 修改支付密码
const payPwd = () => import('../view/setting/change-paypwd')
// 次卡购买成功
const paySuccessOne = () => import('../view/buySubCard/pay-success-one')
// 次卡支付页面
const payCenterOne = () => import('../view/buySubCard/pay-center-one')
// // 确认订单
const ConfirmOrderOne = () => import('../view/buySubCard/confirm-order-one.vue')
// // 购卡-订单详情
const OrderDateils = () => import('../view/details/orderDetails')
// // 营养-订单详情
const foodDateils = () => import('../view/nutrition/details-home-one')
// // 食物-购买成功
const foodsuccess = () => import('../view/nutrition/pay-success-food')
// 商品评价
const assess = () => import('../view/myOrder/assess')
// 日历控件
const week = () => import('../components/todayWeek/week')
// 日历控件
const weekList = () => import('../components/todayWeek/calendarList')
// 性别选择页面
const choiseSex = () => import('../view/somatotype/ChoiceSex')
// 手环选择页面
const braceletCabinet = () => import('../view/coachPartner/braceletCabinet')
// 扫一扫登录页面
const confirms = () => import('../components/3DMolde/confirm')
const confirm = () => import('../components/sweepCode/confirm')
// 相册
const Photo = () => import('../view/photo/photo')
// 上传相册
const UploadPhoto = () => import('../view/photo/upload-photo')
// 视频
const Video = () => import('../view/video/video')
// 上传相册
const UploadVideo = () => import('../view/video/upload-video')
// 客流量
const Traffic = () => import('../view/traffic/traffic')

export default [
  ...LoginRouter,
  ...errorPage,
  {
    path: '/',
    name: '_home',
    redirect: '/somatotype',
    meta: {
      hideInMenu: true,
      notCache: true
    }
  },
  {
    path: '/tack_out_layout',
    name: 'tack_out_layout',
    redirect: '/tack_out_goods',
    component: () => import('@/components/tack-out/layout/take-out'),
    children: [
      { path: '/tack_out_goods', name: 'tack_out_goods', component: () => import('@/view/goods'), meta: { keepAlive: true } },
      { path: '/tack_out_seller', name: 'tack_out_seller', component: () => import('@/view/seller') },
      { path: '/tack_out_ratings', name: 'tack_out_ratings', component: () => import('@/view/ratings') }
    ]
  },
  {
    path: '/train-index',
    name: 'train-index',
    component: TrainIndex,
    meta: { keepAlive: false }
  },
  // 购卡-》健身卡
  {
    path: '/buy-gymCard',
    name: 'buy-gym-card',
    component: BuyGymCard,
    meta: { keepAlive: true }
  },
  {
    path: '/personal-index',
    name: 'personal-index',
    component: PersonalIndex,
    meta: { keepAlive: false }
  },
  {
    path: '/user-information',
    name: 'user-information',
    component: UserInformation,
    meta: { keepAlive: true }
  },
  {
    path: '/editing-information',
    name: 'editing-information',
    component: EditingInformation,
    meta: { keepAlive: false }
  },
  {// 记录动作
    path: '/record-aerobic-adtion',
    name: 'record-aerobic-adtion',
    component: RecordAerobicAdtion,
    meta: { keepAlive: false }
  },
  {
    path: '/train-no-purchase',
    name: 'train-no-purchase',
    component: TrainNoPurchase,
    meta: { keepAlive: true }
  },
  {
    path: '/train-have-purchase',
    name: 'train-have-purchase',
    component: TrainHavePurchase,
    meta: { keepAlive: false }
  },
  {
    path: '/train-cycle-plan',
    name: 'train-cycle-plan',
    component: TrainCyclePlan,
    meta: { keepAlive: true }
  },
  {
    path: '/notice',
    name: 'notice',
    component: Notice,
    meta: { keepAlive: false }
  },
  {
    path: '/coupon',
    name: 'coupon',
    component: Coupon,
    meta: { keepAlive: false }
  },
  {
    path: '/setting',
    name: 'setting',
    component: Setting,
    meta: { keepAlive: false }
  },
  {
    path: '/myOrder',
    name: 'myOrder',
    component: MyOrder,
    meta: { keepAlive: false }
  },
  // 购卡-》健身卡
  {
    path: '/buy-gymCard',
    name: 'buy-gym-card',
    component: BuyGymCard,
    meta: { keepAlive: true }
  },
  { // 体测完成
    path: '/stamina-test-sueccess',
    name: 'stamina-test-sueccess',
    component: StaminaTestSueccess,
    meta: { keepAlive: true }
  },
  { // 确认订单
    path: '/confirm-order',
    name: 'confirm-order',
    component: ConfirmOrder,
    meta: { keepAlive: false }
  },
  { // 支付中心
    path: '/pay-center',
    name: 'pay-center',
    component: PayCenter,
    meta: { keepAlive: true }
  },
  { // 手动录入数据
    path: '/logging-data',
    name: 'logging-data',
    component: LoggingData,
    meta: { keepAlive: true }
  },
  { // 制定计划
    path: '/make-plan',
    name: 'make-plan',
    component: MakePlan,
    meta: { keepAlive: true }
  },
  { // 制定计划
    path: '/modify-plan',
    name: 'modify-plan',
    component: ModifyPlan,
    meta: { keepAlive: true }
  },
  { // 添加组数
    path: '/ming-group',
    name: 'ming-group',
    component: MingGroup,
    meta: { keepAlive: false }
  },
  {// 修改动作
    path: '/editing-ming-grounp',
    name: 'editing-ming-grounp',
    component: EditingMingGroup,
    meta: { keepAlive: false }
  },
  {// 记录动作
    path: '/record-action-data',
    name: 'record-action-data',
    component: RecordActionData,
    meta: { keepAlive: true }
  },
  {// 动作规范
    path: '/demo-action',
    name: 'demo-action',
    component: DemoAction,
    meta: { keepAlive: true }
  },
  {// 营养端确认订单
    path: '/confirm-order-food',
    name: 'confirm-order-food',
    component: ConfirmOrderFood,
    meta: { keepAlive: false }
  },
  // =====教练与搭档=============================
  {//
    path: '/coachPartner-index',
    name: 'coach-partner-index',
    component: CoachPartnerIndex,
    meta: { keepAlive: false }
  },
  {//
    path: '/pt-course',
    name: 'pt-course',
    component: Ptcourse,
    meta: { keepAlive: true }
  },
  // =====体型=============================
  { // 体型
    path: '/somatotype',
    name: 'somatotype',
    component: Somatotype,
    meta: { keepAlive: false }
  },
  {// 收货地址
    path: '/address_detail',
    name: 'address_detail',
    component: Address,
    meta: { keepAlive: false }
  },
  {// 修改收货地址
    path: '/reviseAddress_home',
    name: 'reviseAddress_home',
    component: reviseAddress,
    meta: { keepAlive: false }
  },
  {// 朋友圈
    path: '/friends_home',
    name: 'friends_home',
    component: friends,
    meta: { keepAlive: false }
  },
  {// 食物订单详情
    path: '/details_home',
    name: 'details_home',
    component: details,
    meta: { keepAlive: false }
  },
  {// 朋友圈
    path: '/share_home',
    name: 'share_home',
    component: share,
    meta: { keepAlive: false }
  },
  {// 支付页面
    path: '/payment_home',
    name: 'payment_home',
    component: payment,
    meta: { keepAlive: false }
  },
  {// 别人的朋友圈
    path: '/friendsShare_home',
    name: 'friendsShare_home',
    component: friendsShare,
    meta: { keepAlive: false }
  },
  {//  更改！！！！！！！！！！！
    path: '/drawplan_home',
    name: 'drawplan_home',
    component: drawplan,
    meta: { keepAlive: false }
  },
  {//
    path: '/canvas_home',
    name: 'canvas_home',
    component: canvas,
    meta: { keepAlive: false }
  },
  {// 登录页面
    path: '/login_home',
    name: 'login_home',
    component: login,
    meta: { keepAlive: false }
  },
  {// 支付成功
    path: '/paysuccess_home',
    name: 'paysuccess_home',
    component: paysuccess,
    meta: { keepAlive: false }
  },
  {// 搭档信息
    path: '/partner_home',
    name: 'partner_home',
    component: partner,
    meta: { keepAlive: false }
  },
  {// 加入搭档
    path: '/addPartner_home',
    name: 'addPartner_home',
    component: addPartner,
    meta: { keepAlive: false }
  },
  {// 星级评价
    path: '/evaluate_home',
    name: 'evaluate_home',
    component: evaluate,
    meta: { keepAlive: false }
  },
  {// 修改密码
    path: '/revisePwd_home',
    name: 'revisePwd_home',
    component: revisePwd,
    meta: { keepAlive: false }
  },
  {// 修改支付密码
    path: '/payPwd_home',
    name: 'payPwd_home',
    component: payPwd,
    meta: { keepAlive: false }
  },
  {// 次卡购买成功
    path: '/paySuccessOne_home',
    name: 'paySuccessOne_home',
    component: paySuccessOne,
    meta: { keepAlive: false }
  },
  {// 次卡支付
    path: '/payCenterOne_home',
    name: 'payCenterOne_home',
    component: payCenterOne,
    meta: { keepAlive: false }
  },
  {// 次卡确定订单
    path: '/ConfirmOrderOne_home',
    name: 'ConfirmOrderOne_home',
    component: ConfirmOrderOne,
    meta: { keepAlive: false }
  },
  {// 订单详情
    path: '/OrderDateils_home',
    name: 'OrderDateils_home',
    component: OrderDateils,
    meta: { keepAlive: false }
  },
  {// 食物支付完成
    path: '/foodsuccess_home',
    name: 'foodsuccess_home',
    component: foodsuccess,
    meta: { keepAlive: false }
  },
  {// 食物详情
    path: '/foodDateils_home',
    name: 'foodDateils_home',
    component: foodDateils,
    meta: { keepAlive: false }
  },
  {// 评价
    path: '/assess_home',
    name: 'assess_home',
    component: assess,
    meta: { keepAlive: false }
  },
  {
    path: '/coach_home',
    name: 'coach_home',
    component: coach,
    meta: { keepAlive: false }
  },
  { // 加入教练
    path: '/intoPartner_home',
    name: 'intoPartner_home',
    component: intoPartner,
    meta: { keepAlive: false }
  },
  { // 加入搭档
    path: '/intoCoach_home',
    name: 'intoCoach_home',
    component: intoCoach,
    meta: { keepAlive: false }
  },
  { // 教练信息
    path: '/coachUserInfo_home',
    name: 'coachUserInfo_home',
    component: coachUserInfo,
    meta: { keepAlive: false }
  },
  { // 搭档信息
    path: '/partnerUserInfo_home',
    name: 'partnerUserInfo_home',
    component: partnerUserInfo,
    meta: { keepAlive: false }
  },
  { // 搭档信息
    path: '/shouldPartner_home',
    name: 'shouldPartner_home',
    component: shouldPartner,
    meta: { keepAlive: false }
  },
  { // 计划选择
    path: '/planDetail_home',
    name: 'planDetail_home',
    component: planDetail,
    meta: { keepAlive: true }
  },
  { // 加入成功
    path: '/joinSuccess_home',
    name: 'joinSuccess_home',
    component: joinSuccess,
    meta: { keepAlive: true }
  },
  { // 日历
    path: '/week_home',
    name: 'week_home',
    component: week,
    meta: { keepAlive: true }
  },
  { // 日历
    path: '/weekList_home',
    name: 'weekList_home',
    component: weekList,
    meta: { keepAlive: true }
  },
  { // 性别选择
    path: '/choiseSex_home',
    name: 'choiseSex_home',
    component: choiseSex,
    meta: { keepAlive: true }
  },
  { // ？
    path: '/MingGroupActual_home',
    name: 'MingGroupActual_home',
    component: MingGroupActual,
    meta: { keepAlive: true }
  },
  { // 拿取手环
    path: '/braceletCabinet_home',
    name: 'braceletCabinet_home',
    component: braceletCabinet,
    meta: { keepAlive: false }
  },
  { // 扫一扫
    path: '/confirm_home',
    name: 'confirm_home',
    component: confirm,
    meta: { keepAlive: true }
  },
  { // 扫一扫
    path: '/confirms',
    name: 'confirms',
    component: confirms,
    meta: { keepAlive: false }
  },
  { // 相册
    path: '/photo',
    name: 'photo',
    component: Photo,
    meta: { keepAlive: false }
  },
  { // 上传相册
    path: '/upload_photo',
    name: 'upload_photo',
    component: UploadPhoto,
    meta: { keepAlive: false }
  },
  { // 相册
    path: '/video',
    name: 'video',
    component: Video,
    meta: { keepAlive: false }
  },
  { // 上传相册
    path: '/upload_video',
    name: 'upload_video',
    component: UploadVideo,
    meta: { keepAlive: false }
  },
  { // 客流量
    path: '/traffic',
    name: 'traffic',
    component: Traffic,
    meta: { keepAlive: false }
  }
]
