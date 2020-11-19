import HttpAPI from '@/libs/http-api'

export default {
  // --用户周计划------------------------------------------------------------------------
  // 用户周计划->添加下周计划
  weekPlanAdd (params, success, error) {
    const url = '/gym/week_plan/add'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 用户周计划->删除计划
  weekPlanDel (params, success, error) {
    const url = '/gym/week_plan/del'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 用户周计划->修改下周计划
  weekPlanEdit (params, success, error) {
    const url = '/gym/week_plan/edit'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 用户周计划->获取计划
  weekPlanGetList (params, success, error) {
    const url = '/gym/week_plan/get_plan'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 用户周计划->获取月日历
  weekPlanGetMonthCalendar (params, success, error) {
    const url = '/gym/week_plan/month_calendar'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 用户周计划->周人数统计
  weekPlanCoutWeek (params, success, error) {
    const url = '/gym/week_plan/count_week'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 用户周计划->添加为计划日
  weekPlanAppend (params, success, error) {
    const url = '/gym/week_plan/append'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // ---健身课程动作------------------------------------------------------------------------------------------------
  // 健身课程动作->添加（临时保存,求搭档的情况下）
  couseActionTempAdd (params, success, error) {
    const url = '/gym/course_action/temp_add'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 健身课程->列表(公开课，私教和求搭档)
  cousePubList (params, success, error) {
    const url = '/gym/course/pub_list'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 健身课程->详情(带课程动作)
  couseDetail (params, success, error) {
    const url = '/gym/course/detail'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 健身课程动作->添加（课程已存在的情况下）
  couseActionAdd (params, success, error) {
    const url = '/gym/course_action/add'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 健身课程动作->删除
  couseActionDel (params, success, error) {
    const url = '/gym/course_action/del'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 健身课程动作->修改（只能修改动作组数据）
  couseActionEdit (params, success, error) {
    const url = '/gym/course_action/edit'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 健身课程动作->修改（只能修改动作组数据）
  couseActionDetail (params, success, error) {
    const url = '/gym/course_action/detail'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 健身课程动作->列表(不分页)
  couseActionList (params, success, error) {
    const url = '/gym/course_action/list'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // -训练动作（个人)-------------------------------------------------------------------------------
  // 训练动作（个人）->添加训练
  trainActionAdd (params, success, error) {
    const url = '/gym/train_action/add'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 训练动作（个人）->记录实际训练数据
  trainActionTimeAdd (params, success, error) {
    const url = '/gym/train_action/act_data'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  courseAction (params, success, error) {
    const url = '/gym/course_action/list'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 训练动作（个人）->删除
  trainActionDel (params, success, error) {
    const url = '/gym/train_action/del'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 训练动作（个人）->修改
  trainActionEdit (params, success, error) {
    const url = '/gym/train_action/edit'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 训练动作（个人）->详情
  trainActionDetail (params, success, error) {
    const url = '/gym/train_action/detail'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 训练动作（个人）->列表(不分页)
  trainActionList (params, success, error) {
    const url = '/gym/train_action/list'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 训练动作（个人）-> 部位动作统计
  trainActionPartStat (params, success, error) {
    const url = '/gym/train_action/part_stat'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 训练动作（个人）->记录实际训练数据
  trainActionActData (params, success, error) {
    const url = '/gym/train_action/act_data'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // -课程报名-------------------------------------------------------------------------------
  // 课程报名->报名用户列表
  couseSignList (params, success, error) {
    const url = '/gym/course_sign/list_users'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 课程报名->加入课程
  couseSignJoin (params, success, error) {
    const url = '/gym/course_sign/join'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // -健身课程-------------------------------------------------------------------------------------------
  // 健身课程->发起求搭档
  couseUserAdd (params, success, error) {
    const url = '/gym/course/cp_add'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 健身课程->发起求搭档修改
  couseUpdate (params, success, error) {
    const url = '/gym/course/update'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 健身课程->发起求搭档撤回
  couseRecall (params, success, error) {
    const url = '/gym/course/recall'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 健身课程->列表(用户求搭档)
  couseUserList (params, success, error) {
    const url = '/gym/course/user_list'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 健身课程->列表
  UserList (params, success, error) {
    const url = '/gym/course/pub_list'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 健身课程->课程月历
  couseMonthCalendar (params, success, error) {
    const url = '/gym/course/month_calendar'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 健身课程->添加训练（添加自己一个人的训练课程）
  couseOnselfAdd (params, success, error) {
    const url = '/gym/course/oneself_add'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 健身课程->列表(非公开课，个人训练)
  couseOnselfList (params, success, error) {
    const url = '/gym/course/oneself_list'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 健身课程-> 部位动作统计
  cousePartstat (params, success, error) {
    const url = '/gym/course/part_stat'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 健身课程-> 课程统计(根据训练部位分组统计的)
  cousestat (params, success, error) {
    const url = '/gym/course/course_stat'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // --健身基础数据--------------------------------------------------
  // 健身基础数据—>系统健身动作列表(不分页)
  baseActions (params, success, error) {
    const url = '/gym/base/actions'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 健身基础数据—>训练:未选择的动作列表
  notChooseActions (params, success, error) {
    const url = '/gym/base/not_choose_actions'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // ----健身教练------------------------------------------------------------------
  // 健身教练->详情
  coachDetail (params, success, error) {
    const url = '/user/coach/detail'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 健身教练->教练列表(返回带近期课程)
  coachListWithCourse (params, success, error) {
    const url = '/user/coach/list_with_course'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 健身教练->教练列表
  listWithCourse (params, success, error) {
    const url = '/user/coach/list'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 有氧运动->增加
  aerobicsAdd (params, success, error) {
    const url = '/gym/aerobics_sport/add'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 健身教练->教练详情
  addCourse (params, success, error) {
    const url = '/user/coach/detail_with_course'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 搭档用户信息
  getpartner (params, success, error) {
    const url = '/api/user/friend/list'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 搭档列表详情
  getpartnerList (params, success, error) {
    const url = '/user/friend/detail'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 搭档列表详情-->带课程
  getpartnerDayList (params, success, error) {
    const url = '/user/friend/list'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 训练动作（个人）->点击部位
  exchange (params, success, error) {
    const url = '/gym/train_action/exchange'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // ------------------------计划------------------
  // 获取本周计划
  getWeekPlan (params, success, error) {
    const url = '/gym/plan/getCurrWeekPlan'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 每周列表
  getWeekList (params, success, error) {
    const url = '/gym/plan/getMySelfPlan'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 获取训练计划列表
  getTrainAction (params, success, error) {
    const url = '/gym/train_action/get'
    HttpAPI.createAxiosGet(url, params, success, error)
  },

  // ------------------------求搭档------------------
  // 求搭档->课程列表
  nowList (params, success, error) {
    const url = '/gym/course/now_list'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 求搭档->求搭档时,判断计划训练组数据是否存在
  isTempAddList (params, success, error) {
    const url = '/gym/course_action/is_temp_add_list'
    HttpAPI.createAxiosGet(url, params, success, error)
  },
  // 求搭档->显示的动作列表
  tempAddlist (params, success, error) {
    const url = '/gym/course_action/temp_add_list'
    HttpAPI.createAxiosPost(url, params, success, error)
  },
  // 求搭档->显示的动作列表
  courseOut (params, success, error) {
    const url = '/gym/course_sign/out'
    HttpAPI.createAxiosPost(url, params, success, error)
  }
}
