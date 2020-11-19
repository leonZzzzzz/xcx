<template>
  <div class="login">
    <form class="login-form" action="#" method="post">
      <div class="login-form-logo">
        <img class="demos-title" src="../../assets/original-images/barbell.png"/>
      </div>
      <div class="login-cell login-cell-after">
        <div class="login-cell-hd">
          <label>+86</label>
        </div>
        <img class="img-size-10 ml-5" src="~jd/market/img/up.png"/>
        <div class="line-1-gray"></div>
        <div class="login-cell-bd login-cell-primary">
          <input class="login-input" type="tel" v-model="telePhone" name="tell" placeholder="请输入手机号码">
        </div>
      </div>
      <div class="login-cell login-cell-after">

        <div class="login-cell-bd login-cell-primary">
          <input class="login-input" type="certifycode" v-model="certifycode" name="certifycode" placeholder="请输入验证码">
        </div>
        <div class="login-cell-ft" @click="clickButton">

          <input :disabled="isBtn" type="button" class="login-btn login-btn-mini login-btn-primary certifycode-btn-input"
                 v-model="inputValue">
        </div>
      </div>
      <div class="login-cell protocol-btn flexct" @click="changeChecked()">
        <input type="checkbox" v-model="isCheck"  class="login-check">
        <a class="fs-12 color-grey">同意扬格健身用户协议</a>
      </div>
      <div class="loginBottom"  @click="loginPhone()">登录</div>
      <div class="login-cell other-login-title-div">
        <div class="line-gray"></div>
        <a class="other-login-title">其他方式登录</a>
        <div class="line-gray"></div>
      </div>
      <div class="login-cell other-login-div">
        <div class="login-other-botton" @click="loginQQ()">
          <img class="img-size-40" src="~jd/market/img/qq.png"/>
        </div>

        <div class="login-other-botton" @click="loginWeChat()">
          <img class="img-size-40" src="~jd/market/img/WeChat.png"/>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Mixins from '@/components/mixins.js'
import { Toast } from 'mint-ui'
import UserAPI from '@/service/user-api'
// import MarketAPI from '@/service/market-api'
import PersonalAPI from '@/service/person-api'
export default {
  mixins: [Mixins],
  data () {
    return {
      telePhone: '',
      certifycode: '',
      isBtn: false,
      inputValue: '获取验证码',
      wait: 120,
      isCheck: true
    }
  },
  methods: {
    changeChecked () {
      this.isCheck = !this.isCheck
    },
    loginWeChat (e) {
      // alert('微信登录')
    },
    loginQQ (e) {
      // alert('QQ登录')
    },
    loginPhone (e) {
      if (!this.isCheck) {
        this.isBtn = true
        Toast('请勾选同意协议')
        return
      }
      if (!this.telePhone) {
        Toast('请输入手机号')
        return
      }
      if (!this.certifycode) {
        Toast('请输入验证码')
        return
      }
      this.LoginIn()
    },
    clickButton (e) {
      this.getData()
    },
    time () {
      if (this.wait === 0) {
        this.isBtn = false
        this.wait = 120
        this.inputValue = '获取验证码'
      } else {
        this.isBtn = true
        this.wait--
        this.inputValue = this.wait + 's'
        var that = this
        setTimeout(function () {
          that.time()
        }, 1000)
      }
    },
    async getData () {
      PersonalAPI.sendVerifyCode({ phone: this.telePhone }, res => {
        this.time()
      })
    },
    initUserData () {
      UserAPI.detailsList().then(res => {
        let resultList = res
        if (resultList.nickName === '') {
          // 这是一个新用户就去编辑信息
          this.$router.push('/editing-information')
        } else {
          // 这是一个老用户就去个人主页
          this.$router.push('/personal-index')
        }
      })
    },
    async LoginIn () {
      PersonalAPI.authLogin({ phone: this.telePhone, verifyCode: this.certifycode }, res => {
        this.setMemberToken(res)
        this.initUserInfo()
        Toast({
          message: '登录成功', // ('手机登录:' + this.telePhone + ',验证码:' + this.certifycode)
          position: 'bottom'
        })
        this.initUserData()
        // this.$router.push('/personal-index')
      })
    }
  }
}
</script>

<style scoped>

</style>
