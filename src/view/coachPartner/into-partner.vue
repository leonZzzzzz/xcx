<template>
  <div class="coach">
    <div class="head-bar-to">
      <div class="head-theme-b-left" @click="$router.go(-1)">
        <img style="position: relative; left: 0.5rem; width: 0.25rem;" src="../../assets/images/common/left_icon_black_big.png"/>
      </div>
      <div class="">
        <div class="fs-5">加入搭档</div>
      </div>
    </div>
    <div class="coach-nav">
      <div class="partner">
        <img src="../../assets/images/common/head_sculpture.jpg" style="border-radius: 50%;width: 1.3rem;height: 1.3rem;margin-top: 0.3rem;margin-left: 0.2rem;margin-bottom: 0.2rem;"/>
        <div class="partner-time">
          <div class="name">{{partnerList.userNickName}}</div>
        </div>
        <div class="level">LV.9</div>
        <div class="job">搭档</div>
      </div>
      <div style="width: 95%;height: 0.03rem;background-color: #8E8E8E;margin: 0 auto;margin-top: 0.3rem;"></div>
      <div class="nav">
        <div class="nav-time" style="display: flex;justify-content: space-between;">
          <span>训练时间</span>
          <span style="margin-right: 0.5rem;color: #FFFFFF;">{{partnerList.courseDate}} {{times}}</span>
        </div>
        <div class="nav-plan" style="margin-top: 0.2rem;display: flex;justify-content: space-between;">
          <span>训练计划</span>
          <span style="margin-right:0.5rem;color: #FFFFFF;">胸部</span>
        </div>
      </div>
      <div style="width: 95%;height: 0.03rem;background-color: #8E8E8E;margin: 0 auto;margin-top: 0.3rem;"></div>
      <div class="nav-mun">
        <div class="nav-mun-plan" style="display: flex;justify-content: space-between;">
          <span>我的训练次数</span>
          <span style="color: #FFFFFF;margin-right: 0.5rem;">25</span>
        </div>
        <div class="nav-mun-coach" style="margin-top: 0.2rem;display: flex;justify-content: space-between;">
          <span>我的私教次数</span>
          <span style="margin-right: 0.5rem;color: #FFFFFF;">12</span>
        </div>
      </div>
      <div style="width: 95%;height: 0.03rem;background-color: #8E8E8E;margin: 0 auto;margin-top: 0.3rem;"></div>
      <div class="nav-less">
        <div class="nav-less-plan" style="display: flex;justify-content: space-between;">
          <span>本次扣除训练次数</span>
          <span style="margin-right: 0.5rem;color: #FFFFFF;">-1</span>
        </div>
        <div class="nav-less-coach" style="margin-top: 0.2rem;display: flex;justify-content: space-between;">
          <span>本次扣除私教次数</span>
          <span style="margin-right: 0.5rem;color: #FFFFFF;">-0</span>
        </div>
      </div>
    </div>
    <div style="height: 1.2rem;width: 100%;background-color: #313131;">
      <div class="btn-partner" @click="intoCoach">确定加入</div>
    </div>
  </div>
</template>

<script>
import TrainAPI from '../../service/train-api'
import { formatDate } from '@lemon/euler-app-h5/src/libs/util'
export default {
  data () {
    return {
      userId: '',
      partnerList: [],
      times: ''
    }
  },
  mounted () {
    this.userId = this.$route.query.userId
    this.showPartner()
  },
  methods: {
    intoCoach () {
      TrainAPI.couseSignJoin({ courseId: this.partnerList.id }, res => {
        res.courseDate = formatDate(new Date(res.courseDate), 'yyyy/MM/dd')
      })
      this.$router.push({
        path: '/joinSuccess_home'
      })
    },
    showPartner () {
      TrainAPI.getpartnerList({ userId: this.userId }, res => {
        res.courseDate = formatDate(new Date(res.courseDate), 'yyyy/MM/dd')
        this.partnerList = res
        this.times = res.courseTimes[0]
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import "into-partner.less";
</style>
