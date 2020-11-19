<style lang="less" scoped>
  @import "partner-user";
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
          <div style="color: white;position: relative;left: 4rem;top: -0.6rem;font-size: 0.5rem;">搭档信息</div>
        </div>
      </div>
      <div class="user">
        <div class="user-introduce">
          <div class="introduce-title">
            <div class="header-picture-icon">
              <img src="../../assets/original-images/man.png" style="position: absolute;width: 0.4rem;height: 0.4rem;top: 0.2rem;margin-left: 5.2rem;"/>
              <img src="../../assets/images/common/head_sculpture.jpg" alt="" @click="$router.back()">
              <div class="user-title">
                <div class="user-name">Make Chen</div>
                <div class="title" style="font-size: 0.35rem;">
                  <div class="level">Lv 9</div>
                  <div class="profession" style="margin-left: 0.3rem;">程序员</div>
                </div>
              </div>
              <div class="personality-signature">
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
                    <span class="number">1204</span>
                    <span class="number-detail">搭档次数</span>
                  </div>
                  <div class="user-detail-main" style="width: 40%;color: #990033">
                    <span class="number">5</span>
                    <span class="number-detail">相册</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 0.6rem;background-color: #262626;color: #FFFFFF;">
      <echarts></echarts>
    </div>
  </div>
</template>

<script>
import echarts from '../../components/echartsTwo/echarts-UserInfo'
// import echartsOne from '../../components/echartsTwo/echarts-UserInfoOne'
export default {
  components: {
    echarts
  }
}
</script>

<style scoped>

</style>
