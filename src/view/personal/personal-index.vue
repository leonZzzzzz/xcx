<style lang="less" scoped>
@import "personal-index";
</style>
<template>
  <div class="personal-index">
    <div
      class="flow-bar"
      v-if="opacityNumber!==0"
      :style="{opacity: opacityNumber}"
      style="background-color: #1C1C1C;"
    >
      <div style="width: 24%"></div>
      <div style="width: 52%;display: flex;align-items: center;justify-content: center">个人中心</div>
      <div style="width: 24%;display: flex;align-items: center;justify-content: flex-end">
        <img
          style="height: .547rem;"
          src="../../assets/images/common/img-icon.png"
          @click="goPage('photo')"
        />
        <img
          style="height: .547rem;margin-left: .534rem"
          src="../../assets/images/common/video-icon.png"
          @click="goPage('video')"
        />
      </div>
    </div>
    <div class="box-content" ref="personalIndex">
      <div style="position: absolute;top: 0;left: 0;width: 100%;overflow: hidden;">
        <div class="user-background">
          <div class="header-picture">
            <div class="header-background">
              <div style="width: 24%"></div>
              <div style="width: 52%;display: flex;align-items: center;justify-content: center">个人中心</div>
              <div style="width: 24%;display: flex;align-items: center;justify-content: flex-end">
                <img
                  style="height: .547rem"
                  src="../../assets/images/common/img-icon.png"
                  @click="goPage('photo')"
                />
                <img
                  style="height: .547rem;margin-left: .534rem"
                  src="../../assets/images/common/video-icon.png"
                  @click="goPage('video')"
                />
              </div>
            </div>
            <img
              class="img-style"
              style="filter:alpha(opacity=50);-moz-opacity:0.5;-k-html-opacity: 0.5;opacity: 0.5;"
              src="../../assets/images/common/pic-two.png"
              alt
            />
            <img class="img-style" src="../../assets/images/common/tm.png" />
          </div>
        </div>
        <div class="user">
          <div class="user-introduce">
            <div class="header-picture-icon" @click="goPage('editing-information')">
              <div class="portrait-box">
                <img class="portrait" :src="memberInfo.avatar" alt />
              </div>
              <div class="user-title">
                <div class="user-name">
                  <span class="name-style">{{memberInfo.nickName}}</span>
                  <!--若是女性的话，类名为sex-woman-->
                  <img v-if="memberInfo.sexImg" class="sex" :src="memberInfo.sexImg" alt />
                </div>
                <div class="title" style="font-size: 0.32rem;">
                  <!--<div class="level" style="margin-right: 0.32rem;">Lv 9</div>-->
                  <div class="level" v-if="memberInfo.occupational">
                    <span>{{memberInfo.occupational}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="personality-signature"
              @click="goPage('editing-information')"
            >{{memberInfo.signature}}</div>
            <div class="user-detail">
              <!--<div class="user-detail-main">-->
              <!--<span class="number">0</span>-->
              <!--<span class="number-detail">洋格豆</span>-->
              <!--</div>-->
              <div class="user-detail-main">
                <div
                  style="width: 100%;display: flex;align-items: flex-end;justify-content: center;overflow: hidden"
                >
                  <span class="number">{{countInfo.planCardCount}}</span>
                  <span style="font-size: .32rem;color: #F6BF3C;margin-bottom: .178rem">天</span>
                </div>
                <span class="number-detail">{{aabb}}</span>
              </div>
              <div class="user-detail-main">
                <div
                  style="width: 100%;display: flex;align-items: flex-end;justify-content: center;overflow: hidden"
                >
                  <span class="number">{{countInfo.timeCardCount}}</span>
                  <span style="font-size: .32rem;color: #F6BF3C;margin-bottom: .178rem">次</span>
                </div>
                <span class="number-detail">剩余训练</span>
              </div>
              <div class="user-detail-main">
                <span class="number">{{countInfo.trainCount}}</span>
                <span class="number-detail">已训练次数</span>
              </div>
              <div class="user-detail-main">
                <span class="number">{{countInfo.foodCount}}</span>
                <span class="number-detail">营养次数</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul class="user-cell">
        <!--<li class="cell">-->
        <!--<span class="cell-title">训练历史</span>-->
        <!--<span class="cell-text"></span>-->
        <!--<img class="right-arrows-icon" src="../../assets/images/common/left_seting.png"/>-->
        <!--</li>-->
        <!-- <li class="cell" @click="goPage('coupon')"> -->
        <li class="cell" @click="gotonavigate">
          <span class="cell-title">{{bbcc}}</span>
          <span class="cell-text"></span>
          <img class="right-arrows-icon" src="../../assets/images/common/left_seting.png" />
        </li>
        <li class="cell" @click="goPage('myOrder')">
          <span class="cell-title">我的订单</span>
          <span class="cell-text"></span>
          <img class="right-arrows-icon" src="../../assets/images/common/left_seting.png" />
        </li>
        <!--<li class="cell">-->
        <!--<span class="cell-title">我的关注</span>-->
        <!--<span class="cell-text"></span>-->
        <!--<img class="right-arrows-icon" src="../../assets/images/common/left_seting.png"/>-->
        <!--</li>-->
        <!--<li class="cell">-->
        <!--<span class="cell-title">我的朋友圈</span>-->
        <!--<span class="cell-text"></span>-->
        <!--<img class="right-arrows-icon" src="../../assets/images/common/left_seting.png"/>-->
        <!--</li>-->
        <li class="cell" @click="goPage('traffic')">
          <span class="cell-title">洋格客流量</span>
          <span class="cell-text">22</span>
          <img class="right-arrows-icon" src="../../assets/images/common/left_seting.png" />
        </li>
        <!--<li class="cell">-->
        <!--<span class="cell-title">能力排行榜</span>-->
        <!--<span class="cell-text"></span>-->
        <!--<img class="right-arrows-icon" src="../../assets/images/common/left_seting.png"/>-->
        <!--</li>-->
        <!--<li class="cell" @click="$router.push('/notice')">-->
        <!--<span class="cell-title">通知</span>-->
        <!--<span class="cell-text"></span>-->
        <!--<img class="right-arrows-icon" src="../../assets/images/common/left_seting.png"/>-->
        <!--</li>-->
        <!--<li class="cell">-->
        <!--<span class="cell-title">音乐库</span>-->
        <!--<span class="cell-text"></span>-->
        <!--<img class="right-arrows-icon" src="../../assets/images/common/left_seting.png"/>-->
        <!--</li>-->
        <li class="cell" @click="$router.push('/setting')">
          <span class="cell-title">设置</span>
          <span class="cell-text"></span>
          <img class="right-arrows-icon" src="../../assets/images/common/left_seting.png" />
        </li>
      </ul>
    </div>
    <FooterTab></FooterTab>
  </div>
</template>

<script>
import HttpAPI from '../../service/user-api'
import FooterTab from '../../components/footer/footer-tab'
import Common from '../../mixins/common'
export default {
  name: 'personal-index',
  mixins: [Common],
  components: {
    FooterTab
  },
  data () {
    return {
      aabb: 'youhuiq',
      bbcc: '优惠券1',
      scrollY: 0,
      opacityNumber: 0,
      countInfo: {
        foodCount: 0, // 营养次数
        planCardCount: 0, // 计划卡剩余天数
        timeCardCount: 0, // 次卡剩余次数
        trainCount: 0 // 已训练次数
      }
    }
  },
  computed: {

  },
  watch: {
    scrollY (newY, oldv) {
      // console.log(newY, oldv)
      if (newY < 100) {
        this.opacityNumber = newY / 100
      } else {
        this.opacityNumber = 1
      }
    }
  },
  mounted () {
    if (this.token) {
      this.getCountInfo()
    }
    this.$refs.personalIndex.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    gotonavigate () {
      wx.navigateTo({ url: '/pages/coupon/coupons' })
      this.$forceUpdate()
    },
    handleScroll () {
      // this.scrollY = document.getElementById('personal-index').scrollTop
      this.scrollY = this.$refs.personalIndex.scrollTop
      // console.log(this.scrollY)
    },
    getCountInfo () {
      HttpAPI.countInfo({}, res => {
        this.countInfo = res
      })
    }
  },
  created () {
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
