<style lang="less" scoped>
  @import "pt-course";
</style>
<template>
  <div class="pt-course">
    <div class="head-bar head-theme-b">
      <div class="head-bar head-theme-b">
        <div class="head-theme-b-left">
          <i class="icon-image icon-back" @click="$router.go(-1)"></i>
        </div>
        <div class="head-theme-b-center">
          <div class="fs-5">私教课程</div>
        </div>
        <div slot="right" class="head-theme-b-right">
        </div>
      </div>
    </div>
    <div class="box-content pt-44">
      <div class="hasAction">
        <div class="title" style="border-bottom: 1px solid #c9cbd4;" @click.stop="$router.push('/user-information')">
          <span>教练信息</span>
          <div class="content">查看信息<img src="../../assets/original-images/choice.png"></div>
        </div>
        <div class="coach">
          <div class="header-picture-icon">
            <img src="../../assets/original-images/head_sculpture.jpg" alt="">
            <!--若是女性的话，类名为sex-woman-->
            <div class="sex-Man" v-if="coachDetail.sex === 'MAN'">
              <img src="../../assets/original-images/man.png" alt="" style="width: .7rem;height: .7rem">
            </div>
            <div class="sex-woman" v-else>
              <img src="../../assets/original-images/sex_woman.png" alt="">
            </div>
          </div>
          <div class="coach-detail">
            <div class="name">
              <span class="coach-name">{{coachDetail.nickName}}</span>
              <span class="profession">教练</span>
              <span class="level">Lv 9级</span></div>
            <div class="number">授课次数： {{coachDetail.courseCount}}次</div>
          </div>
        </div>
      </div>
      <div class="course-detail">
        <div class="hasAction">
          <div class="title" style="border-bottom: 1px solid #c9cbd4;">
            <span>训练信息</span>
          </div>
        </div>
        <div class="course-message">
          <div v-if="courseDetail.courseTimes">训练时间： {{courseDetail.courseDate}}  {{courseDetail.courseTimes[0]}}</div>
          <div>训练位置： 胸部</div>
          <div>{{courseDetail.courseInfo}}</div>
          <div>
            <div>参与会员：</div>
            <div>
              <div class="memenber">
                <div><img src="../../assets/original-images/head_sculpture.jpg" alt=""></div>
                <div>李四</div>
              </div>
              <div class="memenber">
                <div><img src="../../assets/original-images/head_sculpture.jpg" alt=""></div>
                <div>张三</div>
              </div>
            </div>
          </div>
        </div>
        <div class="tabs">
          <!--根据接口返回的训练部位返回，遍历输出显示出来-->
          <div @click="choiceIt(index,item.part)" :class="{'clickIt' : nowChoice === index}" v-for="(item,index) of actionPartStat" :key="index">{{item.partDisplay+'('+item.count+ ')'}}</div>
        </div>
        <div v-for="(item,index) of courseDetail.courseActionList" :key="index">
          <!--<div class="title"><span>{{index === 'POWER' ? '增力动作' : index === 'MUSCLE' ? '增肌动作': index === 'RELAX' ? '放松动作': '热身动作'}}</span></div>-->
          <!--判断显示当前训练部位的数据-->
          <div v-if="index === part">
            <div v-for="(item2,index2) of item" :key="index2">
              <!-- 显示训练的动作分类-->
              <div class="title"><span>{{item2[0].actionClassTypeDisplay}}</span></div>
              <div class="has-coupon-item"  v-for="(item3,index3) of item2" :key="index3">
                <!--显示每个分类下面的索引-->
                <div class="has-grounp-number">{{index3+1}}</div>
                <div class="has-coupon-icon" >
                  <div class="money">
                    <span class="spanbei"><img src="../../assets/original-images/active-2.png" alt=""></span>
                  </div>
                </div>
                <div class="has-notice-center">
                  <div class="has-notice-title">{{item3.actionName}}</div>
                  <div class="has-notice-text">计划:{{item3.planActionGroup.length}}组</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="confirm-btn">
      <div @click="joinIt">加入课程</div>
    </div>
  </div>
</template>

<script>
import TrainAPI from '../../service/train-api'
export default {
  name: 'pt-course',
  data () {
    return {
      id: '',
      userId: '',
      nowChoice: 0,
      part: 'CHEST', // 默认显示训练部位为胸部
      actionPartStat: [],
      actionList: [],
      coachDetail: [],
      courseDetail: []
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.userId = this.$route.query.userId
    this.getCourseDeatail()
    this.getCoachDetail()
    this.getCousePartstat()
  },
  methods: {
    getCourseDeatail () {
      TrainAPI.couseDetail({ id: this.id }, res => {
        let result = res
        result.courseDate = this.getDate(result.courseDate)
        this.courseDetail = result
      })
    },
    getCoachDetail () {
      TrainAPI.coachDetail({ userId: this.userId }, res => {
        this.coachDetail = res
      })
    },
    // 健身课程-> 部位动作统计
    getCousePartstat () {
      TrainAPI.cousePartstat({ courseId: this.id }, res => {
        this.actionPartStat = res
      })
    },
    joinIt () {
      // 课程报名->加入课程
      TrainAPI.couseSignJoin({ courseId: this.id }, res => {
      })
    },
    getDate (days) {
      let time = new Date(days)
      let y = time.getFullYear()
      let m = time.getMonth() + 1
      let d = time.getDate()
      return y + '年' + m + '月' + d + '日'
    },
    choiceIt (num, part) {
      this.nowChoice = num
      this.part = part
    }
  }
}
</script>

<style scoped>

</style>
