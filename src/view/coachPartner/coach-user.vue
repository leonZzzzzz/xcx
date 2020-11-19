<style lang="less" scoped>
  @import "coach-user";
</style>
<template>
  <div class="personal-index" id="personal-index">
    <div>
      <div class="user-background">
        <div class="header-picture">
          <img style="  filter:alpha(opacity=50);-moz-opacity:0.5;-k-html-opacity: 0.5;opacity: 0.5;" src="../../assets/images/common/pic-two.png" alt="">
          <img src="../../assets/images/common/tm.png"/>
          <!--<div class="header-footer-background"></div>-->
        </div>
      </div>
      <div>
        <div style="position: absolute;top: 0.2rem;">
          <img style="margin-top: 0.3rem;position: relative; left: 0.5rem; width: 0.25rem;" src="../../assets/images/common/left_icon_black_big.png" @click="$router.go(-1)"/>
          <div style="color: white;position: relative;left: 4rem;top: -0.6rem;font-size: 0.5rem;">教练信息</div>
        </div>
      </div>
      <div class="user">
        <div class="user-introduce">
          <div class="introduce-title">
            <div class="header-picture-icon">
              <img src="../../assets/images/common/head_sculpture.jpg" alt="" >
              <div class="user-title">
                <div class="user-name" style="position: relative">{{coachList.nickName}}
                  <img src="../../assets/original-images/man.png" style="position: absolute;width: 0.4rem;height: 0.4rem;margin-left: 0.2rem;top: 0.04rem;" v-if="coachList.sex === 'MALE'"/>
                  <img src="../../assets/original-images/woman.png" style="position: absolute;width: 0.4rem;height: 0.4rem;margin-left: 0.2rem;top: 0.04rem;" v-if="coachList.sex === 'WOMAN'"/>
                </div>
                <div class="title" style="font-size: 0.35rem;">
                  <div class="level">Lv 9</div>
                  <div class="profession" style="margin-left: 0.3rem;">程序员</div>
                </div>
              </div>
              <div class="personality-signature">
                爱生活，爱健身,爱生活，爱健身,爱生活，爱健身~
              </div>
              <!--若是女性的话，类名为sex-woman-->
              <!--<div class="sex-Man" v-if="userData.userInfo.sex === 'MALE'">-->
                <!--<img src="../../assets/original-images/man.png" alt="">-->
              <!--</div>-->
              <!--<div class="sex-woman" v-if="userData.userInfo.sex === 'FEMALE'">-->
                <!--<img src="../../assets/original-images/man.png" alt="">-->
              <!--</div>-->
            </div>
            <div class="marging-box">
              <div class="user-detail">
                <div class="user-detail-center">
                  <div class="user-detail-main">
                    <span class="number">{{coachList.courseCount}}</span>
                    <span class="number-detail">授课次数</span>
                  </div>
                  <div class="user-detail-main">
                    <span class="number">0</span>
                    <span class="number-detail">训练视频</span>
                  </div>
                  <div class="user-detail-main" style="color: #990033">
                    <span class="number">0</span>
                    <span class="number-detail">相册</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 0.6rem;background-color: #262626;color: #FFFFFF;font-size: 0.34rem;">
      <div style="padding-top: 0.3rem;margin-left: 0.5rem;margin-bottom: 0.3rem;">课程计划（{{num}}）</div>
      <div style="width: 100%;height: 0.02rem;background-color: #8E8E8E;"></div>
      <ul style="height: 100%">
        <li style="height: 100%;position: relative;border-bottom: 1px solid #8E8E8E; " v-for="item in coachList.courseList" :key="item.id">
          <div style="margin-left: 0.5rem;margin-top: 0.1rem;">{{item.courseDate}}  {{item.courseTimes[0]}}</div>
          <div style="margin-left: 0.5rem;margin-top: 0.2rem;display: flex;"><span style="color: #8E8E8E;">训练内容：</span><div style="width: 4rem;">{{item.courseInfo}}</div></div>
          <img src="../../assets/original-images/choice.png" style="position: absolute;right: 0.5rem;top: 0.5rem;width: 0.3rem;"/>
          <div style="margin-left: 0.5rem;margin-top: 0.2rem;"><span style="color: #8E8E8E;">部位：</span><span>{{item.trainPartsDisplay}}</span></div>
        </li>
      </ul>
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
      num: null
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getCoachMessage()
  },
  methods: {
    getCoachMessage () {
      TrainAPI.addCourse({ userId: this.id }, res => {
        this.num = res.length
        res[0].courseList[0].courseDate = formatDate(new Date(res[0].courseList[0].courseDate), 'yyyy/MM/dd')
        this.coachList = res[0]
        console.log(this.coachList)
      })
    }
  }
}
</script>

<style scoped>

</style>
