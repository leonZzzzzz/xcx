import Config from '../config'
let Base64 = require('js-base64').Base64
export default {
  data () {
    return {
    }
  },
  computed: {},
  created () {
  },
  methods: {
    scanQrCode () {
      // let aa = Base64.decode('eyJ0eXBlIjoiY291cG9uIiwiaWQiOiIyMDE3NDE1NjE5ODQxOTY2MDgifQ==')
      // aa = JSON.parse(aa)
      // this.couponId = aa.id
      // this.popupGetCoupon = true
      var _that = this
      if (Config.appStore === 'xcx') {
        wx.scanCode({
          success (res) {
            _that.one = true
            var resultParse = Base64.decode(res.result)
            resultParse = JSON.parse(resultParse)
            // alert(resultParse)
            if (resultParse.type === 'login') {
              _that.$router.push({
                path: '/confirm_home',
                query: {
                  channelId: resultParse.id
                }
              })
            }
            if (resultParse.type === 'food') {
              _that.$router.push({
                path: '/tack_out_goods',
                query: {
                  foodList: resultParse.text
                }
              })
            }
            if (resultParse.type === 'coupon') {
              _that.couponId = resultParse.id
              _that.popupGetCoupon = true
            }
          }
        })
      } else {
        cordova.plugins.gizscanqrcode.scan(
          {
            'baseColor': '#4e8dec',
            'title': '扫描二维码',
            'barColor': '4e8dec',
            'statusBarColor': 'white',

            'describe': '请扫描设备二维码',
            'describeFontSize': '15',
            'describeLineSpacing': '8',
            'describeColor': 'ffffff',

            'borderColor': '4e8dec',
            'borderScale': '0.6',

            'choosePhotoEnable': 'true',
            'choosePhotoBtnTitle': '相册',
            'choosePhotoBtnColor': '4e8dec',

            'flashlightEnable': 'true'
          },
          function (result) {
            _that.one = true
            var tempCodeJson = []
            var resultParse = []
            tempCodeJson = JSON.parse(result)
            resultParse = Base64.decode(tempCodeJson.result)
            resultParse = JSON.parse(resultParse)
            // alert(resultParse)
            if (resultParse.type === 'login') {
              _that.$router.push({
                path: '/confirm_home',
                query: {
                  channelId: resultParse.id
                }
              })
            }
            if (resultParse.type === 'food') {
              // alert(resultParse)
              _that.$router.push({
                path: '/tack_out_goods',
                query: {
                  foodList: resultParse.text
                }
              })
            }
            if (resultParse.type === 'coupon') {
              _that.couponId = resultParse.id
              _that.popupGetCoupon = true
            }
          },
          function (error) {
            console.log(error)
            _that.one = true
          }
        )
      }
    }
  }
}
