<template>
    <div class="friends-header">
      <div class="head-bar-to" @click="$router.go(-1)">
        <div class="head-theme-b-left">
          <img style="margin-top: 0.3rem;position: relative; left: 0.5rem; width: 0.25rem;" src="../../assets/images/common/left_icon_black_big.png"/>
        </div>
        <!--<div class="friend">-->
          <!--<div class="fs-5">朋友圈</div>-->
        <!--</div>-->
      </div>
      <div class="header">
        <div class="pic"><img src="../../assets/original-images/head_sculpture.jpg"/></div>
        <div class="name">每天健身2小时</div>
        <div class="autogr">爱生活，爱健身~</div>
      </div>
      <div class="nav-friend">
        <div class="background-nav">
        <div class="div1" style="margin-bottom: 0.1rem;">
          <div class="follower">
            <span>60</span>
            <span style="font-size: 0.2rem;color: #727171; font-weight: lighter;padding-left: 0.2rem;">粉丝</span>
          </div>
          <div class="show">
            <span>40</span>
            <span style="font-size: 0.2rem;color: #727171; font-weight: lighter;padding-left: 0.2rem;">关注</span>
          </div>
          <div class="trends">
            <span>120</span>
            <span style="font-size: 0.2rem;color: #727171; font-weight: lighter;padding-left: 0.2rem;">动态</span>
          </div>
        </div>
          <div class="lint-x"></div>
          <!--<div class="lint-x"></div>-->
        <div class="div1">
          <div class="train">
            <span>105</span>
            <span style="font-size: 0.2rem;color: #727171; font-weight: lighter;padding-left: 0.2rem;">训练</span>
          </div>
          <div class="presonal">
            <span style="padding-left: 0.75rem;">10</span>
            <span style="font-size: 0.2rem;color: #727171; font-weight: lighter;padding-left: 0.2rem;">私教</span>
          </div>
          <div class="partner">
            <span style="padding-left: 1.2rem;">60</span>
            <span style="font-size: 0.2rem;color: #727171; font-weight: lighter;padding-left: 0.3rem;">搭档</span>
          </div>
        </div>
        </div>
      </div>
      <div class="nav">
        <mt-navbar class="page-part" v-model="selected" style="position: relative;top: 10px;z-index: 2;width: 100%;">
          <mt-tab-item id="1">动态</mt-tab-item>
          <mt-tab-item id="2">相册</mt-tab-item>
          <mt-tab-item id="3">视频</mt-tab-item>
        </mt-navbar>
      </div>
      <div>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="3">
            <div style="background-color: white">
              <ul>
                <li>
                  <img src="../../assets/images/common/bulk-pic-one.jpg" style="width: 100%; height: 6rem;"/>
                  <div style="background-color: white;height: 1.5rem;width: 90%;margin: 0 auto;line-height: 0.6rem;font-size: 0.33rem;">多运动，多健康。私人教练手把手的教我，真的受益良 多。坚持健身一个月了，效果还是很显著的。</div>
                </li>
                <li>
                  <img src="../../assets/images/common/bulk-pic-one.jpg" style="width: 100%; height: 6rem;"/>
                  <div></div>
                </li>
              </ul>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <div style="background-color: white">
              <ul>
                <li>
                  <img src="../../assets/images/common/bulk-pic-one.jpg" style="width: 100%; height: 6rem;"/>
                  <div style="background-color: white;height: 1.5rem;width: 90%;margin: 0 auto;line-height: 0.6rem;font-size: 0.33rem;">多运动，多健康。私人教练手把手的教我，真的受益良 多。坚持健身一个月了，效果还是很显著的。</div>
                </li>
                <li>
                  <img src="../../assets/images/common/bulk-pic-one.jpg" style="width: 100%; height: 6rem;"/>
                  <div></div>
                </li>
              </ul>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="1">
            <div style="background-color: #F2F2F2">
              <ul>
                <li style="width: 100%;height: 6rem;background-color: #ffffff ; margin-top:0.25rem; ">
                  <div><img style="margin-left: 0.2rem;width: 1rem;border-radius: 50%;position: relative;top:0.5rem;" src="../../assets/original-images/head_sculpture.jpg"/>
                        <span style="line-height: 0.3rem;margin-left: 0.2rem;font-size: 0.32rem;">每天健身2小时</span>
                        <div style="margin-left: 1.5rem;color: #c7c1c1">2019.1.27</div>
                  </div>
                  <div style="margin-top: 0.5rem; font-size: 0.33rem; margin-left: 0.2rem;">今天是我健身第30天，和刚刚开始比较，变化非常大。好不开心！！！！</div>
                  <div>
                    <img src="../../assets/images/common/bulk-pic-two.jpg" style="height: 2.5rem; width: 3rem;margin-left: 0.2rem;">
                  </div>
                </li>
                <li style="width: 100%;height: 6rem;background-color: #ffffff; margin-top:0.25rem; ">
                  <div><img style="margin-left: 0.2rem;width: 1rem;border-radius: 50%;position: relative;top:0.5rem;" src="../../assets/original-images/head_sculpture.jpg"/>
                    <span style="line-height: 0.3rem;margin-left: 0.2rem;font-size: 0.32rem;">每天健身2小时</span>
                    <div style="margin-left: 1.5rem;color: #c7c1c1">2019.1.27</div>
                  </div>
                  <div style="margin-top: 0.5rem; font-size: 0.33rem; margin-left: 0.2rem;">今天是我健身第30天，和刚刚开始比较，变化非常大。好不开心！！！！</div>
                  <div>
                    <img src="../../assets/images/common/bulk-pic-two.jpg" style="height: 2.5rem; width: 3rem;margin-left: 0.2rem;">
                  </div>
                </li>
              </ul>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>

    </div>
</template>

<script>
export default {
  data () {
    return {
      selected: '1'
    }
  }
}
</script>

<style lang="less" scoped>
@import "friends-share.less";
</style>
