<template>
  <div class="partner-info">
    <div class="head-bar-to">
      <div class="head-theme-b-left" @click="gotback">
        <img style="position: relative; left: 0.5rem; width: 0.25rem;" src="../../assets/images/common/left_icon_black_big.png"/>
      </div>
      <div class="">
        <div class="fs-5" style="font-weight: lighter;">教练训练信息</div>
      </div>
    </div>
    <div class="initiator">
      <div class="initiator-info">
        <img src="../../assets/images/common/shu.png" style="width: 0.08rem;position: absolute;"/>
        <span style="margin-left: 0.3rem;">教练信息</span>
        <span style="margin-left: 6rem;color: white;" @click="intoCoachUser">详细信息></span>
      </div>
      <div class="link-x"></div>
      <div class="partner">
        <img src="../../assets/images/common/head_sculpture.jpg" style="border-radius: 50%;width: 1.3rem;height: 1.3rem;margin-top: 0.3rem;margin-left: 0.2rem;margin-bottom: 0.2rem;"/>
        <div class="partner-time">
          <div class="name">{{coachList.nickName}}</div>
          <div class="time">私教次数：{{courseList.actPeopleCount}}</div>
        </div>
        <div style="display: flex;justify-content: space-between;width: 3rem;height: 1rem;margin-top: 0.3rem;">
          <img src="../../assets/original-images/man.png" style="width: 0.4rem;height: 0.4rem;margin-top: 0.05rem;"/>
          <div class="level">LV.9</div>
          <div class="job">教练</div>
        </div>
      </div>
    </div>
    <div class="content-drill">
      <div class="content">
        <img src="../../assets/images/common/shu.png" style="width: 0.08rem;position: absolute;"/>
        <span style="margin-left: 0.3rem;color: white;font-size: 0.35rem;">训练内容</span>
      </div>
      <div class="link-x" style="margin-top: 0.4rem;padding-top: 0.05rem;"></div>
      <div class="drill-time">
        <span>训练时间</span>
        <span style="margin-right: 0.4rem;">{{courseList.courseDate}} {{times}}</span>
      </div>
      <div class="link-x"></div>
      <div class="drill-df" style="width: 95%">
        <span>训练计划</span>
        <span style="margin-right: 0.2rem;">{{courseList.trainPartsDisplay}}</span>
      </div>
      <div class="link-x"></div>
      <div class="drill-man" style="display: flex;">
        <span>参与人员:</span>
        <div v-for="item in joinMan" :key="item.id" style="margin-left: 0.2rem;">{{item.nickName}}</div>
      </div>
    </div>
    <div class="drill-home">
      <div class="drill-dz">
        <img src="../../assets/images/common/shu.png" style="width: 0.08rem;position: absolute;"/>
        <span style="margin-left: 0.2rem;">训练动作</span>
      </div>
      <div class="link-x"></div>
      <ul class="drill-ul">
        <li class="drill-li">
          <div class="dz-fs">热身放松</div>
          <div class="link-x"></div>
          <div class="drill-one">
            <img src="../../assets/images/common/dz1.png" style="width: 2rem;height: 2rem;"/>
            <div style="margin-top: 0.5rem;margin-left: 0.3rem;">
              <div>1.原地跳操</div>
              <div>计划：2组 30秒，30秒</div>
              <div>实际：</div>
            </div>
          </div>
          <div class="link-x"></div>
          <div class="drill-two">
            <img src="../../assets/images/common/dz1.png" style="width: 2rem;height: 2rem;"/>
            <div style="margin-top: 0.5rem;margin-left: 0.3rem;">
              <div>1.原地跳操</div>
              <div>计划：2组 30秒，30秒</div>
              <div>实际：</div>
            </div>
          </div>
        </li>
        <!--<li class="drill-li">-->
        <!--<div class="dz-fs">热身放松</div>-->
        <!--<div class="drill-one">-->
        <!--<img/>-->
        <!--<div>1.原地跳操</div>-->
        <!--<div>计划：2组 30秒，30秒</div>-->
        <!--<div>实际：</div>-->
        <!--</div>-->
        <!--<div class="drill-two">-->
        <!--<img/>-->
        <!--<div>1.原地跳操</div>-->
        <!--<div>计划：2组 30秒，30秒</div>-->
        <!--<div>实际：</div>-->
        <!--</div>-->
        <!--</li>-->
      </ul>
    </div>
    <div style="height: 1.2rem;width: 100%;background-color: #313131;padding-top: 0.3rem;">
      <div class="btn-partner" @click="intoCoach">加入</div>
    </div>
  </div>
</template>

<script>
import TrainAPI from '../../service/train-api'
import { formatDate } from '@lemon/euler-app-h5/src/libs/util'
export default {
  data () {
    return {
      id: '',
      coachList: [],
      mun: '2',
      joinMan: [],
      courseList: [],
      times: ''
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getCoachMessage()
  },
  methods: {
    intoCoach () {
      this.$router.push({
        path: '/intoCoach_home',
        query: {
          userId: this.id
        }
      })
    },
    intoCoachUser () {
      this.$router.push({
        path: '/coachUserInfo_home',
        query: {
          id: this.id
        }
      })
    },
    getCoachMessage () {
      TrainAPI.addCourse({ userId: this.id }, res => {
        res[0].courseList[0].courseDate = formatDate(new Date(res[0].courseList[0].courseDate), 'yyyy/MM/dd')
        this.coachList = res[0]
        this.courseList = res[0].courseList[0]
        this.times = res[0].courseList[0].courseTimes[0]
        console.log(this.coachList)
        this.coachUserList()
      })
    },
    coachUserList () {
      TrainAPI.couseSignList({ courseId: this.coachList.courseList[0].id }, res => {
        this.joinMan = res
      })
    },
    gotback () {
      this.$router.push({
        path: '/coachPartner-index',
        query: {
          mun: this.mun
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import "coach-info.less";
</style>
