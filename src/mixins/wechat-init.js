import { Log } from '@lemon/euler-app-h5/src/libs/euler-mint-ui'
import config from '@/config'

export default {
  data () {
    return {
      wechatInstall: false,
      buySucceed: false
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
    checkInstall () {
      var that = this
      Wechat.isInstalled(function (installed) {
        that.wechatInstall = installed
      }, function (reason) {
        that.wechatInstall = false
      })
    },
    authWechat () {
      var scope = 'snsapi_userinfo'
      var state = '_' + (+new Date())
      Wechat.auth(scope, state, function (response) {
        // you may use response.code to get the access token.
        alert(JSON.stringify(response))
        Log.error({
          message: JSON.stringify(response),
          position: 'top'
        })
      }, function (reason) {
        Log.error({
          message: reason,
          position: 'top'
        })
      })
    },
    notifyPay (payParams, callBack) {
      let _this = this
      // private String sign;
      // private String prepayId;
      // private String partnerId;
      // private String appId;
      // private String packageValue;
      // private String timeStamp;
      // private String nonceStr;
      var params = {
        appid: config.wxAppId,
        partnerid: payParams.partnerId,
        prepayid: payParams.prepayId,
        noncestr: payParams.nonceStr,
        timestamp: payParams.timeStamp,
        sign: payParams.sign
      }
      Wechat.sendPaymentRequest(params, function () {
        _this.buySucceed = true
        callBack()
      }, function (reason) {
        Log.error({
          message: reason,
          position: 'top'
        })
      })
    }
  }
}
