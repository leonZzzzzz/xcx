<template>
   <div class="header-home-pay">
     <div style="height: 0.3rem;width: 100%;background-color: #1C1C1C;border: 1px #1C1C1C solid;"></div>
     <div class="head-bar-to" @click="clone" style="background-color:#1C1C1C; color: white;">
       <div class="head-theme-b-left" >
         <img style="margin-top: 0.35rem;position: relative; left: 0.5rem; width: 0.25rem;" src="../../assets/images/common/left_icon_black_big.png"/>
       </div>
       <div class="pay">
         <div class="fs-5" style="font-weight: lighter;font-size: 0.45rem;">订单确认</div>
       </div>
     </div>
     <div class="pay-money">
       <div class="money">￥{{orderList.payAmount}}</div>
       <div class="mun">订单号：{{orderList.orderNo}}</div>
     </div>
     <div class="pay-fs">
       <mt-radio align="right"  v-model="value" :options="options" style="background-color: white;">
       </mt-radio>
     </div>
     <div class="que-pay" @click="getFreeFoods">确认支付</div>
     <div v-if="popupVisible">
       <mt-popup v-model="popupVisible" :closeOnClickModal="false" class="pop-table">
         <div class="pay-pop">
           <div style="margin-left: 2rem;margin-top: 0.3rem;">请输入支付密码</div>
           <div style="position: relative;left: 1.8rem;" @click="cloneTo">×</div>
         </div>
         <div class="link-x"></div>
         <div class="pop-money">￥0</div>
         <div class="code-input-main">
           <div class="content-pwd">
             <div class="pwd-cell">
               <div v-if="pwdLength>=1" class="cell-dot bc-f9c14b"></div>
             </div>
             <div class="pwd-cell">
               <div v-if="pwdLength>=2" class="cell-dot bc-f9c14b"></div>
             </div>
             <div class="pwd-cell">
               <div v-if="pwdLength>=3" class="cell-dot bc-f9c14b"></div>
             </div>
             <div class="pwd-cell">
               <div v-if="pwdLength>=4" class="cell-dot bc-f9c14b"></div>
             </div>
             <div class="pwd-cell">
               <div v-if="pwdLength>=5" class="cell-dot bc-f9c14b"></div>
             </div>
             <div class="pwd-cell">
               <div v-if="pwdLength>=6" class="cell-dot bc-f9c14b"></div>
             </div>
           </div>
         </div>
         <div v-if="toShow" style="margin-left: 2.5rem;color: #F08000">支付密码错误</div>
       </mt-popup>
     </div>
     <div v-if="popupVisible1">
       <mt-popup v-model="popupVisible1" :closeOnClickModal="false" class="pop-table" style="height: 8rem;">
         <div class="pay-pop">
           <div style="margin-left: 2.5rem;margin-top: 0.3rem;">设置支付密码</div>
           <div style="position: relative;left: 1.8rem;" @click="popupVisible1 = false">×</div>
         </div>
         <div class="pop-money" style="margin-left: 0.5rem;color: #F6BF3C">{{userInfo.phone}}</div>
         <div class="link-x" style="padding-top: 0.02rem;width: 95%;margin: 0 auto"></div>
         <div style="margin-top: 0.5rem;margin-left: 0.3rem;font-size: 0.35rem;display: flex;">
           <div style="margin-left: 0.2rem;">
             <input type="text" style="border: 0;width: 3rem; outline: none;" placeholder="验证码" maxlength="6" oninput="value=value.replace(/[^0-9]/g,'')" v-model="verifyCode"/>
           </div>
           <div v-show="show" style="width: 2rem;background-color: #F6BF3C;text-align: center;border-radius: 0.2rem;margin-bottom: 0.2rem; margin-left: 2rem;" @click="codeLogin">获取验证码</div>
           <div v-show="!show" style="margin-left: 2rem;color: #F6BF3C;border: 1px solid #F6BF3C;width: 2rem;text-align: center;line-height: 0.5rem;border-radius: 0.3rem;margin-bottom: 0.2rem;" class="count">{{count}} s</div>
         </div>
         <div class="link-x" style="padding-top: 0.03rem;width: 95%;margin: 0 auto"></div>
         <div style="margin-top: 0.8rem;margin-left: 0.3rem;font-size: 0.35rem;display: flex;">
           <div style="margin-left: 0.2rem;">
             <input type="text" style="border: 0;width: 3rem; outline: none;" placeholder="请输入6位支付密码" v-model="newPassword"/>
           </div>
         </div>
         <div class="link-x" style="padding-top: 0.03rem;width: 95%;margin: 0 auto"></div>
         <div style="margin-top: 0.8rem;margin-left: 0.3rem;font-size: 0.35rem;display: flex;">
           <div style="margin-left: 0.2rem;">
             <input type="text" style="border: 0;width: 3rem; outline: none;" placeholder="请重新输入6位支付密码" v-model="checkNewPassword"/>
           </div>
         </div>
         <div class="link-x" style="padding-top: 0.03rem;width: 95%;margin: 0 auto"></div>
         <div style="margin-top: 0.4rem;width: 70%;background-color:#FABD00;text-align: center;margin-left:1rem;border-radius: 0.5rem;height: 1rem;line-height: 1rem;font-size: 0.35rem;" @click="changePayment">确认密码</div>
       </mt-popup>
     </div>
<!--     数字键盘-->
     <KeyboardNumber
       :show="noHideKeyboard"
       :pwdLength="pwdLength"
       @typing="typing">
     </KeyboardNumber>
   </div>
</template>

<script>
import HttpAPI from '../../service/user-api'
import WechatInit from '../../mixins/wechat-init'
import OpenAPI from '../../service/open-api'
// import { Toast } from 'mint-ui'
import { mapMutations } from 'vuex'
import personAPI from '../../service/person-api'
import config from '../../config/index.js'
import { Log } from '@lemon/euler-app-h5/src/libs/euler-mint-ui'
import KeyboardNumber from '../../components/keyboard-number/keyboard-number.vue'
export default {
  mixins: [WechatInit],
  components: { KeyboardNumber },
  computed: {
    pwdLength () {
      if (!this.pwd) {
        return 0
      }
      return this.pwd.length
    }
  },
  props: {
    message: Boolean,
    selectFoodsItemProp: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      nameTo: '密码错误',
      toShow: false,
      pwd: '',
      noHideKeyboard: false, // 数字键盘显示状态
      checkNewPassword: '',
      newPassword: '',
      popupVisible1: false,
      code: '',
      popupVisible: false,
      options: [{
        label: '微信支付',
        value: 'A'
      }],
      orderList: [],
      value: 'A',
      orderCardList: '',
      todayKcal: [],
      carList: [],
      messages: false,
      list: [],
      goodsFoodIdMeal: [],
      selectFoods: [],
      userInfo: '',
      verifyCode: null,
      memberTypeEnum: config.memberType,
      count: '', // 时间容器
      timer: null, // 倒计时计时器
      show: true // 显示倒计时
    }
  },
  watch: {
    selectFoodsItemProp: {
      handler (newValue, oldValue) {
        this.selectFoods = this.selectFoodsItemProp
      },
      immediate: true,
      deep: true
    }
  },
  mounted () {
    // 接受到的数据
    this.orderList = this.$route.query.orderList
    HttpAPI.addMoney({ orderFoodId: this.orderList.id, totalAmount: this.orderList.totalAmount }, res => {
    })
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
    }
    window.addEventListener('popstate', this.fun, false)
  },
  destroyed () {
    window.removeEventListener('popstate', this.fun, false)
  },
  methods: {
    ...mapMutations([
      'initUserInfo'
    ]),
    // 键盘删除，清空
    typing (value) {
      // 删除值
      if (value === 'del') {
        // this.pwd = this.pwd.slice(0, -1)
        this.pwd = ''
        this.onErrHint()
      } else {
        // 新的值
        this.pwd = this.pwd + value
      }
      if (this.pwdLength === 6) {
        this.onEvent()
      }
    },
    fun () {
      this.$router.push({
        path: '/foodDateils_home',
        query: {
          orderList: this.orderList,
          orderCardList: this.orderCardList
        }
      })
    },
    // 微信支付
    wxPay () {
      HttpAPI.wxPay({ id: this.orderList.id }, res => {
        this.notifyPay(res, () => {
          this.$router.push({
            path: '/foodsuccess_home',
            query: {
              orderList: this.orderList,
              orderCardList: this.orderCardList
            }
          })
        })
      })
    },
    // 返回按键
    clone () {
      this.$router.push({
        path: '/foodDateils_home',
        query: {
          orderList: this.orderList,
          orderCardList: this.orderCardList
        }
      })
    },
    // 判断是免费还是支付
    getFreeFoods () {
      HttpAPI.getFreeFood({ id: this.orderList.id }, res => {
        if (res === true) {
          this.judgePassword()
        } else {
          this.wxPay()
        }
      })
    },
    // 判断支付密码是否正确
    getPassword () {
      HttpAPI.getPassword({ id: this.orderList.id, payPassword: this.pwd }, res => {
        this.$router.push({
          path: '/foodDateils_home',
          query: {
            orderList: this.orderList,
            orderCardList: this.orderCardList
          }
        })
      }, error => {
        this.toShow = true
        this.pwd = ''
        Log.error('支付密码错误')
        if (error.errorCode === '22016') {
          Log.error('未设置支付密码')
        }
      })
    },
    // 发送验证码
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
    // 关闭按键
    cloneTo () {
      this.popupVisible = false
      this.noHideKeyboard = false
    },
    // 设置支付密码
    changePayment () {
      if (this.newPassword === this.checkNewPassword) {
        HttpAPI.paymentPwd({ phone: this.userInfo.phone, verifyCode: this.verifyCode, newPassword: this.newPassword, checkNewPassword: this.checkNewPassword, memberTypeEnum: this.memberTypeEnum }, res => {
          Log.deal({
            message: '修改成功',
            position: 'bottom'
          })
          this.popupVisible = true
          this.noHideKeyboard = true
          this.popupVisible1 = false
        })
      } else {
        Log.error({
          message: '两次密码输入不同',
          position: 'bottom'
        })
      }
    },
    // 隐藏错误提示标识
    onErrHint () {
      this.$emit('errHint')
    },
    // 触发事件
    onEvent () {
      this.getPassword()
    },
    judgePassword () {
      OpenAPI.userPassword({}, res => {
        if (res === true) {
          this.popupVisible = true
          this.noHideKeyboard = true
        } else {
          this.popupVisible1 = true
        }
      })
    },
    getUserInfo () {
      HttpAPI.userMessage({}, res => {
        this.userInfo = res
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
@import "payment.less";
</style>
