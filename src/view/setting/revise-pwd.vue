<template>
    <div class="revise-pwd">
      <Header title="登陆密码修改" :leftIcon="true"></Header>
      <div style="margin-top: 1.5rem;" v-if="changePwd">
        <div class="revise-nav">
        <div class="revise-num">
          <div style="font-size: 0.38rem;">{{userInfo.phone}}</div>
        </div>
        <div class="link-x"></div>
        <div class="revise-old-pwd">
          <div>
            <input type="text" id="xingmin" v-if="pwdType" style="height: 0.5rem;width: 8rem;" v-model="srcPassword" placeholder="请输入旧密码">
            <input type="password" id="xingmin1" style="height: 0.5rem;width: 8rem;" placeholder="请输入旧密码" v-model="srcPassword" v-else>
          </div>
          <div>
            <img :src="seen ? seenImg : unseenImg" @click="changeType()" />
          </div>
        </div>
        <div class="link-x" style="padding-top: 0.03rem;"></div>
        <div class="revise-new">
          <div>
            <input type="text" id="xingmin2" v-if="pwdType" style="height: 0.5rem;width: 8rem;" v-model="newPassword" placeholder="请输入新密码">
            <input type="password" id="xingmin3" style="height: 0.5rem;width: 8rem;" placeholder="请输入新密码" v-model="newPassword" v-else>
          </div>
          <div>
            <img :src="seen ? seenImg : unseenImg" @click="changeType()" />
          </div>
        </div>
        <div class="link-x" style="padding-top: 0.03rem;"></div>
        <div class="revise-new">
          <div>
            <input type="text" id="xingmin4" v-if="pwdType" style="height: 0.5rem;width: 8rem;" v-model="checkNewPassword" placeholder="确认新密码">
            <input type="password" id="xingmin5" style="height: 0.5rem;width: 8rem;" placeholder="确认新密码" v-model="checkNewPassword" v-else>
          </div>
          <div>
            <img :src="seen ? seenImg : unseenImg" @click="changeType()" />
          </div>
        </div>
      </div>
        <div class="btn" @click="changeUserPwd">确认修改</div>
        <div class="xg-pwd" @click="change()">短信验证码修改</div>
      </div>
      <!--// 验证码验证-->
      <div style="margin-top: 1.5rem;" v-if="revisePwd">
        <div class="revise-nav">
          <div class="revise-num">
            <div style="font-size: 0.38rem;">{{userInfo.phone}}</div>
          </div>
          <div class="link-x" style="padding-top: 0.03rem;"></div>
          <div class="revise-old-pwd" style="display: flex;">
            <input type="text" style="height: 0.5rem;width: 6.7rem;" placeholder="验证码" v-model="verifyCode" maxlength="6" oninput="value=value.replace(/[^0-9]/g,'')">
            <div v-show="show" style="margin-right: 0.5rem;color: #F6BF3C;border: 1px solid #F6BF3C;width: 2.1rem;text-align: center;line-height: 0.5rem;border-radius: 0.3rem;" @click="codeLogin">获取验证码</div>
            <div v-show="!show" style="margin-right: 0.5rem;color: #F6BF3C;border: 1px solid #F6BF3C;width: 1.8rem;text-align: center;line-height: 0.5rem;border-radius: 0.3rem;" class="count">{{count}} s</div>
          </div>
          <div class="link-x" style="padding-top: 0.03rem;"></div>
          <!--<div class="link-x"></div>-->
          <div class="revise-new">
            <div>
              <input type="number" id="xingming" v-if="pwdType" style="height: 0.5rem;width: 8rem;" v-model="newPassword" placeholder="请输入新密码">
              <input type="password" id="xingming1" style="height: 0.5rem;width: 8rem;" placeholder="请输入新密码" v-model="newPassword" v-else>
            </div>
            <div>
              <img :src="seen ? seenImg : unseenImg" @click="changeType()" />
            </div>
          </div>
          <div class="link-x" style="padding-top: 0.03rem;"></div>
          <div class="revise-new">
            <div>
              <input type="text" id="xingming2" v-if="pwdType" style="height: 0.5rem;width: 8rem;" v-model="checkNewPassword" placeholder="确认新密码">
              <input type="password" id="xingming3" style="height: 0.5rem;width: 8rem;" placeholder="确认新密码" v-model="checkNewPassword" v-else>
            </div>
            <div>
              <img :src="seen ? seenImg : unseenImg" @click="changeType()" />
            </div>
          </div>
        </div>
        <div class="btn" @click="changeNewPwd">确认修改</div>
        <div class="xg-pwd" @click="revise()">密码修改</div>
      </div>
    </div>
</template>

<script>
import HttpAPI from '../../service/user-api'
import personAPI from '../../service/person-api'
import config from '../../config/index.js'
import { Log } from '@lemon/euler-app-h5/src/libs/euler-mint-ui'
import { mapMutations } from 'vuex'
import { removeToken } from '@lemon/euler-app-h5/src/libs/util'
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
      changePwd: true,
      revisePwd: false,
      phone: null,
      srcPassword: null,
      verifyCode: null,
      newPassword: null,
      checkNewPassword: null,
      memberType: config.memberType,
      userInfo: []
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
    change () {
      this.changePwd = false
      this.revisePwd = true
    },
    revise () {
      this.changePwd = true
      this.revisePwd = false
    },
    changeUserPwd () {
      if (this.newPassword === this.checkNewPassword) {
        HttpAPI.userPwd({
          srcPassword: this.srcPassword,
          newPassword: this.newPassword,
          checkNewPassword: this.checkNewPassword
        }, res => {
          Log.deal({
            message: '修改成功',
            position: 'bottom'
          })
          this.loginOut()
        })
      } else {
        Log.error({
          message: '两次密码不一致',
          position: 'bottom'
        })
      }
    },
    changeNewPwd () {
      if (this.newPassword === this.checkNewPassword) {
        personAPI.messagePwd({ phone: this.userInfo.phone, verifyCode: this.verifyCode, newPassword: this.newPassword, checkNewPassword: this.checkNewPassword, memberType: this.memberType }, res => {
          Log.deal({
            message: '修改成功',
            position: 'bottom'
          })
          this.loginOut()
        })
      } else {
        Log.error({
          message: '两次密码不一致',
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
    },
    loginOut () {
      removeToken()
      this.$router.push({ name: this.$config.loginPage })
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
@import "revise-pwd";
</style>
