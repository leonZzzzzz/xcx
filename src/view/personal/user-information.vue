<style lang="less" scoped>
  @import "user-information";
</style>
<template>
  <div class="user-information" id="personal-index">
    <!--<div class="flow-bar" id="flow-bar" :class="{'opacity-hide':!tabShow, 'opacity-show': tabShow}">-->
    <div class="flow-bar" id="flow-bar" :style="{opacity: opacityNumber}">
      张三的个人信息
    </div>
    <div class="user-background">
      <div class="header-picture">
        <img src="../../assets/original-images/head_sculpture.jpg" alt="">
      </div>
    </div>
    <div class="user-imformation">
      <div class="user">
        <div class="user-introduce">
          <div class="introduce-title">
            <div class="header-picture-icon">
              <img src="../../assets/original-images/head_sculpture.jpg" alt="">
              <!--若是女性的话，类名为sex-woman-->
              <div class="sex-Man">
                <img src="../../assets/original-images/man.png" alt="" style="width: .7rem;height: .7rem">
              </div>
              <!-- 女性显示-->
              <!--<div class="sex-woman">-->
                <!--<img src="../../assets/original-images/sex_woman.png" alt="">-->
              <!--</div>-->
            </div>
            <div class="photo-video">
              <div @click.stop="$router.push('/photo')">相册</div>
            </div>
          </div>
          <div class="user-title">
            <span class="user-name">张三</span>
            <span class="profession">后端开发</span>
            <span class="level">Lv 9级</span>
          </div>
          <div class="personality-signature">
            个性签名：~~~~~~~~~~~~~~~~~~~~~~~
          </div>
          <div class="partner">
            搭档次数：16次
          </div>
        </div>
      </div>
      <div class="uBody-fat-curve">
        <div class="title">
          体脂曲线变化
        </div>
      </div>
      <div class="training-history">
        <div class="title">
          训练历史
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-information',
  components: {},
  data () {
    return {
      tabShow: false,
      scrollY: 0,
      opacityNumber: 0
    }
  },
  watch: {
    scrollY (newY, oldv) {
      if (newY < 80) {
        // this.tabShow = true
        this.opacityNumber = newY / 80
      } else {
        this.opacityNumber = 1
        // this.tabShow = false
      }
    },
    '$route' () {
      // 当页面跳转的时候，清空之前的tab栏的opacity
      this.opacityNumber = 0
    }
  },
  mounted () {
    document.getElementById('personal-index').addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      this.scrollY = document.getElementById('personal-index').scrollTop
    }
  }
}
</script>

<style scoped>

</style>
