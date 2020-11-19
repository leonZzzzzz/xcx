<style lang="less">
  @import "setting.less";
</style>
<template>
  <div class="setting">
    <Header title="设置"></Header>
    <ul class="cell-box">
      <li class="cell" @click="goPage('address_detail')">
        <span class="cell-title">收货地址管理</span>
        <span class="cell-text"></span>
        <img class="right-arrows-icon" src="../../assets/images/common/left_seting.png"/>
      </li>
      <!--<li class="cell">-->
        <!--<span class="cell-title">满意度调查</span>-->
        <!--<span class="cell-text"></span>-->
        <!--<img class="right-arrows-icon" src="../../assets/images/common/left_seting.png"/>-->
      <!--</li>-->
      <!--<li class="cell">-->
        <!--<span class="cell-title">求助反馈</span>-->
        <!--<span class="cell-text"></span>-->
        <!--<img class="right-arrows-icon" src="../../assets/images/common/left_seting.png"/>-->
      <!--</li>-->
      <li class="cell" @click="goPage('payPwd_home')">
        <span class="cell-title">设置/修改支付密码</span>
        <span class="cell-text"></span>
        <img class="right-arrows-icon" src="../../assets/images/common/left_seting.png"/>
      </li>
      <li class="cell" @click="goPage('revisePwd_home')">
        <span class="cell-title">设置/修改登陆密码</span>
        <span class="cell-text"></span>
        <img class="right-arrows-icon" src="../../assets/images/common/left_seting.png"/>
      </li>
    </ul>
    <div v-if="token" @click="loginOut" class="log-out">退出登录</div>
  </div>
</template>

<script>
import Header from '../../components/header/header'
import Common from '../../mixins/common'
export default {
  name: 'setting',
  mixins: [Common],
  components: {
    Header
  },
  methods: {
    loginOut () {
      this.clearLoginInfoCookie()
      this.goLogin()
    }
  }
}
</script>

<style scoped lang="less">
 .btn {
   width: 96%;
   height: 1.2rem;
   margin: 0 auto;
   font-size: .48rem;
   line-height: 1.2rem;
   /*border-bottom: 1px solid #e4e4e4;*/
   color: #FFFFFF;
 }
</style>
