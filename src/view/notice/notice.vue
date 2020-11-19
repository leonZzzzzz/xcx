<style lang="less" scoped>
  @import "notice";
</style>
<template>
  <div class="notice">
    <Header title="通知"></Header>
    <div class="notice-box">
      <ul class="notice-box-after">
        <li class="notice-item">
          <div class="notice-icon">
            <img src="../../assets/images/common/horn.png" alt="">
          </div>
          <div class="notice-content">
            <div class="notice-title">
              <span class="title-text">平台通知</span>
              <span class="title-time">1小时前</span>
            </div>
            <div class="notice-text">通知内容~~~~~~~</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '../../components/header/header'
export default {
  name: 'notice',
  components: {
    Header
  },
  data () {
    return {
    }
  }
}
</script>
