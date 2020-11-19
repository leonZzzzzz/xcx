<template>
  <div class="revise-pwd">
    <Header title="支付密码修改" :leftIcon="true"></Header>
    <!--// 验证码验证-->
    <div style="margin-top: 1.5rem">
      <div class="revise-nav">
        <div class="revise-num">
          <div style="font-size: 0.38rem;">{{userInfo.phone}}</div>
        </div>
        <div class="link-x" style="padding-top: 0.03rem;"></div>
        <div class="revise-old-pwd" style="display: flex;">
          <input type="number" style="height: 0.5rem;width: 7rem;" placeholder="验证码" v-model="verifyCode" maxlength="6" oninput="value=value.replace(/[^0-9]/g,'')">
          <div v-show="show" style="margin-left: 0rem;color: #F6BF3C;border: 1px solid #F6BF3C;width: 2.1rem;text-align: center;line-height: 0.5rem;border-radius: 0.3rem;" @click="codeLogin">获取验证码</div>
          <div v-show="!show" style="margin-left: 0rem;color: #F6BF3C;border: 1px solid #F6BF3C;width: 1.8rem;text-align: center;line-height: 0.5rem;border-radius: 0.3rem;" class="count">{{count}} s</div>
        </div>
        <div class="link-x" style="padding-top: 0.03rem;"></div>
        <div class="revise-new">
          <div>
            <input type="text" v-if="pwdType" style="height: 0.5rem;width: 8rem;" v-model="newPassword" placeholder="请输入6位支付密码">
            <input type="password" style="height: 0.5rem;width: 8rem;" placeholder="请输入6位支付密码" v-model="newPassword" maxlength="6" pattern="[0-9]*" v-else>
          </div>
          <div>
            <img :src="seen ? seenImg : unseenImg" @click="changeType()" />
          </div>
        </div>
        <div class="link-x" style="padding-top: 0.03rem;"></div>
        <div class="revise-new">
          <div>
            <input type="text" v-if="pwdType" style="height: 0.5rem;width: 8rem;" v-model="checkNewPassword" placeholder="请重新输入6位支付密码">
            <input type="password" style="height: 0.5rem;width: 8rem;" placeholder="请重新输入6位支付密码" v-model="checkNewPassword" maxlength="6" pattern="[0-9]*" v-else>
          </div>
          <div>
            <img :src="seen ? seenImg : unseenImg" @click="changeType()" />
          </div>
        </div>
      </div>
      <div class="btn" @click="changePayment">确认修改</div>
    </div>
  </div>
</template>

<script>
import HttpAPI from '../../service/user-api'
import { mapMutations } from 'vuex'
import { Log } from '@lemon/euler-app-h5/src/libs/euler-mint-ui'
import config from '../../config/index.js'
import personAPI from '../../service/person-api'
import Header from '../../components/header/header'
export default {
  components: {
    Header
  },
  data () {
    return {
      seen: '',
      unseenImg: require('../../assets/images/common/show.png'),
      seenImg: require('../../assets/images/common/Noshow.png'),
      eyetxt: '',
      pwdType: false,
      count: '', // 时间容器
      timer: null, // 倒计时计时器
      show: true, // 显示倒计时
      userInfo: [],
      verifyCode: null,
      newPassword: null,
      checkNewPassword: null,
      memberTypeEnum: config.memberType
    }
  },
  methods: {
    changeType () {
      this.seen = !this.seen
      this.pwdType = !this.pwdType
    },
    ...mapMutations([
      'initUserInfo'
    ]),
    changePayment () {
      if (this.newPassword === this.checkNewPassword) {
        HttpAPI.paymentPwd({ phone: this.userInfo.phone, verifyCode: this.verifyCode, newPassword: this.newPassword, checkNewPassword: this.checkNewPassword, memberTypeEnum: this.memberTypeEnum }, res => {
          Log.deal({
            message: '修改成功',
            position: 'bottom'
          })
          this.$router.push('/setting')
        })
      } else {
        Log.error({
          message: '两次密码输入不同',
          position: 'bottom'
        })
      }
    },
    codeLogin () {
      personAPI.codeLogin({ phone: this.userInfo.phone }, res => {
        Log.deal({
          message: '已发送验证码，请查收',
          position: 'bottom'
        })
      })
      const TIME_COUNT = 60
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
    }
  },
  created () {
    HttpAPI.userMessage({}, res => {
      this.userInfo = res
      this.initUserInfo()
    })
  }
}
</script>

<style lang="less" scoped>
  @import "change-paypwd";
</style>
