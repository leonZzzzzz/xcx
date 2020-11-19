<template>
  <div class="login-home">
    <Header></Header>
    <div v-if="password === '1'">
      <div class="log">
        <img src="../../assets/images/common/newlogo.png"/>
      </div>
      <div class="background-pic">
        <!--      <img src="../../assets/images/common/background-img.jpg" style="height:25rem;width: 100%;"/>-->
      </div>
      <div class="login-info">
        <div class="photo">
          <img src="../../assets/images/common/login-log.png" style="width: 0.6rem;height: 0.6rem;">
          <input class="field" type="text" placeholder="请输入手机号码" v-model="identifier" oninput="value=value.replace(/[^0-9+]/g,'')">
        </div>
        <div class="link-x"></div>
        <!--<div class="link-x"></div>-->
        <!--<div class="link-x"></div>-->
        <div class="pwd">
          <img src="../../assets/images/common/login-pwd.png" style="width: 0.6rem;"/>
          <input class="field" type="password" placeholder="密码" v-model="credential">
        </div>
        <div class="link-x"></div>
      </div>
      <div class="login-dl">
        <div class="login" @click="clickLogin">登录</div>
        <div class="login-span">
          <span @click="phoneText"  style="width:2rem;">验证码登录</span>
        </div>
      </div>
    </div>
<!--     验证码登录-->
    <div v-if="password === '2'">
      <div class="log">
        <img src="../../assets/images/common/newlogo.png"/>
      </div>
      <div class="background-pic">
        <!--      <img src="../../assets/images/common/background-img.jpg" style="height: 25rem;width: 100%;"/>-->
      </div>
      <div class="login-info">
        <div class="photo">
          <input class="field" style="margin-right: 2rem;" type="text" placeholder="请输入手机号码" v-model="phone" oninput="value=value.replace(/[^0-9+]/g,'')">
        </div>
        <div class="link-x"></div>
        <!--<div class="link-x"></div>-->
        <!--<div class="link-x"></div>-->
        <div class="pwd">
          <input class="field" style="margin-right: 2rem;" type="number" placeholder="验证码" v-model="verifyCode" maxlength="6" oninput="value=value.replace(/[^0-9]/g,'')">
          <div v-show="show" style="width: 2rem;position: absolute;top: 2.25rem; right: 1.2rem;border: 1px #F6BF3C solid;color: #F6BF3C;border-radius: 0.3rem" @click="codeLogin">获取验证码</div>
          <div v-show="!show" style="width: 2rem;position: absolute;top: 2.25rem; right: 1.5rem;border: 1px #F6BF3C solid;color: #F6BF3C;border-radius: 0.3rem" class="count">{{count}} s</div>
        </div>
        <div class="link-x"></div>
        <!--<div class="link-x"></div>-->
      </div>
      <div class="login-dl">
        <div class="login" @click=" messageLogin">登录</div>
        <div class="login-span" @click="password = '1'">
          密码登录
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import personAPI from '../../service/person-api'
import config from '../../config/index.js'
import { mapMutations } from 'vuex'
import HttpAPI from '../../service/user-api'
import { Log } from '@lemon/euler-app-h5/src/libs/euler-mint-ui'
import { Toast } from 'mint-ui'
import { initBlockMemberInfo } from '../../store/extend-util'
import Header from '../../components/header/header'
import Common from '../../mixins/common'

export default {
  components: {
    Header
  },
  mixins: [Common],
  data () {
    return {
      count: '', // 时间容器
      timer: null, // 倒计时计时器
      show: true, // 显示倒计时
      attr: null,
      identifier: null, // 用户名
      credential: null, // 密码
      memberType: config.memberType, // 会员类型
      userInfo: [],
      memberId: '',
      phone: null,
      verifyCode: null,
      infoUser: [],
      password: '1'
    }
  },
  created () {
    if (this.token) {
      this.$router.go(-1)
    }
  },
  methods: {
    ...mapMutations([
      'setToken', 'initUserInfo'
    ]),
    phoneText () {
      this.password = '2'
    },
    // getUserMessage () {
    //   HttpAPI.userMessage({}, res => {
    //     this.userInfo = res
    //     this.initUserInfo()
    //   })
    // },
    newLogin () {
      if (!this.identifier) {
        Log.deal({
          message: '请输入手机号',
          position: 'middle'
        })
        return
      } else if (!this.credential) {
        Log.deal({
          message: '请输入密码',
          position: 'middle'
        })
        return
      }
      personAPI.userLogin({ identifier: this.identifier, credential: this.credential, memberType: this.memberType }, res => {
        this.setToken(res)
        initBlockMemberInfo()
        this.initUserInfo()
        this.saveSex()
        // this.getUserMessage()
        // Log.deal({
        //   message: '登录成功',
        //   position: 'bottom'
        // })
      }, error => {
        if (error !== 200) {
          Log.error({
            message: '账号或密码不正确',
            position: 'middle'
          })
        }
      })
    },
    clickLogin () {
      this.newLogin()
    },
    messageLogin () {
      if (!this.phone) {
        Log.deal({
          message: '请输入手机号',
          position: 'middle'
        })
        return
      } else if (!this.verifyCode) {
        Log.deal({
          message: '请输入验证码',
          position: 'middle'
        })
        return
      }
      personAPI.messageLogin({ phone: this.phone, verifyCode: this.verifyCode, memberType: this.memberType }, res => {
        this.setToken(res)
        initBlockMemberInfo()
        this.initUserInfo()
        this.saveSex()
        // this.getUserMessage()
        // Log.deal({
        //   message: '登录成功',
        //   position: 'bottom'
        // })
      }, error => {
        if (error !== 200) {
          Log.error({
            message: '验证码错误',
            position: 'middle'
          })
        }
      })
    },
    codeLogin () {
      personAPI.codeLogin({ phone: this.phone }, res => {
        Log.deal({
          message: '已发送验证码，请查收',
          position: 'bottom'
        })
        const TIME_COUNT = 180
        if (!this.timer) {
          this.count = TIME_COUNT
          this.show = false
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              this.show = true
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
        }
      }, error => {
        if (error.errorCode === 27004) {
          Toast(error.errorMsg)
        }
        Toast('请输入手机号码')
        // console.log(error)
      })
    },
    saveSex () {
      HttpAPI.isSaveSex({}, res => {
        if (res) {
          this.$router.go(-1)
        } else {
          this.$router.push('/choiseSex_home')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "login";
</style>
