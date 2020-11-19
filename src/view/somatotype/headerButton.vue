<template>
    <div class="menu">
      <div @click="isFound">
        <img class="img" src="../../assets/images/somatotype/dut.png" />
      </div>
      <div class="modal" v-if="isFoundShow" @click="isFoundShow=false"></div>
      <div class="menu-content " v-if="isFoundShow">
        <div class="menu-arrow"></div>
        <div class="cell" @click="handleClick">
          <img class="sm" src="../../assets/images/somatotype/sm.png"/>
          <div style="margin-left: .267rem;white-space: nowrap">扫一扫</div>
        </div>
        <div class="cell" @click="code">
          <img class="sm" src="../../assets/images/somatotype/code.png"/>
          <div style="margin-left: .267rem;white-space: nowrap">3D体测码</div>
        </div>
      </div>
      <div v-if="popupVisible">
        <mt-popup v-model="popupVisible" class="popup">
          <div style="margin-left: 8.2rem;height: 1rem;line-height:0.8rem;margin-right: 0.2rem;" @click="closeQr">✖</div>
          <div style="width: 100%;margin-bottom: 0.3rem;">
            <div style="margin: 0 auto;text-align: center;font-size: 0.6rem;color: #FABD00;">3D体测码</div>
          </div>
          <VueQr
            :colorDark="qrcode.colorDark"
            :text="qrcode.codeValue"
            :margin="qrcode.margin"
            :dotScale="qrcode.dotScale"
            :correctLevel="qrcode.correctLevel"
            :logoScale="qrcode.logoScale"
          style="margin-left: 1.7rem">
          </VueQr>
          <div style="position: absolute;top: 8rem;width: 100%;text-align: center;font-size: 0.45rem;">请把二维码对准扫码机</div>
        </mt-popup>
      </div>
      <GetCoupon :popupGetCoupon="popupGetCoupon" :couponId="couponId" @on-close="popupGetCoupon=false"></GetCoupon>
    </div>
</template>

<script>
import QrCode from '../../mixins/qrcode'
import userAPI from '../../service/user-api'
import VueQr from 'vue-qr'
import Common from '../../mixins/common'
import GetCoupon from '../../components/coupon/get-coupon'
export default {
  mixins: [QrCode, Common],
  name: 'headerButton',
  data () {
    return {
      qrcode: {
        correctLevel: 0, // 容错 0-3
        codeValue: '',
        margin: 10, // 二维码边上间隙
        dotScale: 0.5, // 二维码实点大小
        logoScale: 0.3 // LOGO大小
      },
      popupVisible: false,
      numCabinet: '12',
      isFoundShow: false,
      one: true, // 使扫码只执行一次
      popupGetCoupon: false,
      couponId: null // 优惠券Id
    }
  },
  components: {
    VueQr,
    GetCoupon
  },
  methods: {
    isFound () {
      this.isFoundShow = !this.isFoundShow
    },
    // 扫码的开启
    handleClick () {
      if (this.token) {
        this.one = false
        this.isFoundShow = false
        this.scanQrCode()
      } else {
        this.goLogin()
      }
    },
    code () {
      if (this.token) {
        this.isFoundShow = false
        this.getBoundBox()
      } else {
        this.goLogin()
      }
    },
    closeQr () {
      this.popupVisible = false
    },
    getFood (info) {
      this.popupVisible = true
      this.qrcode.codeValue = info
    },
    getBoundBox () {
      userAPI.getCabinetOccupy({ number: 2 }, res => {
        this.getFood(res)
      }, error => {
        this.popupVisible = false
        console.log(error)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .menu {
    color: white;
    font-size: 0.374rem;
    .img{
      width: 0.55rem;
      display: block;
    }
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0);
      z-index: 99998;
    }
    .menu-content {
      background: #262626;
      position: absolute;
      right: -.134rem;
      padding: 0 .4rem;
      margin-top: .4rem;
      z-index: 99999;
      border-radius: 0.134rem;
      .menu-arrow {
        position: absolute;
        right: .134rem;
        top: -.48rem;
        width: 0;
        border-width: .267rem;
        border-style: solid;
        border-color: transparent transparent #262626 transparent;
      }
      .cell:last-child {
        border-bottom:none;
      }
      .cell {
        display: flex;
        align-items:center;
        font-size: 0.374rem;
        height: 1.226rem;
        border-bottom: .015rem solid #dddddd;
        padding: 0 .214rem;
        .sm{
          height: .48rem;
        }
      }
    }
    .popup {
      width: 88%;
      height: 9.8rem;
      background: #313131;
      color: #FFFFFF;
    }
  }
</style>
