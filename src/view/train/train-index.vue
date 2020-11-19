<style lang="less" scoped>
  @import "train-index";
</style>
<template>
    <div class="train-index">
      <!--<div style="height: 0.15rem;"></div>-->
      <Header title="洋格品非" leftIconName="trainLog" :rightIcon="true"></Header>
      <div style="position:absolute;top: 0;left: 0;display: flex;align-items: center;justify-content: center;height: 100%;width: 100%" v-if="jiaZaiOne">
        <mt-spinner type="triple-bounce"></mt-spinner>
      </div>
      <div class="train-index-content" v-if="jiaZaiTwo">
        <!--<img src="../../assets/images/common/background-img-train.png" />-->
        <div class="content-box-1">
          <div class="box-1-move">
            <div class="box-text">让自己更健康</div>
            <div class="box-bth" @click.stop="goRouter('train-have-purchase')">去训练</div>
          </div>
        </div>
        <div class="content-box-2">
          <div class="box-2-move">
            <div class="box-text">找个小伙伴一起健身</div>
            <div class="box-bth" @click.stop="goRouter('coachPartner-index')">找搭档</div>
          </div>
        </div>
        <div class="content-box-3">
          <div class="box-3-move">
            <div class="box-text">量身定做健身计划</div>
            <div v-if="!isHaveCard" class="box-bth" @click="getNewOrder">买卡体验</div>
          </div>
          <div v-if="isHaveCard || isHaveTimeCard">
            <div style="z-index: 999;">
              <img src="../../assets/images/common/shl.png" style="width: 2rem;margin-top: 0.3rem;margin-left: 0.5rem;" @click="$router.push('/braceletCabinet_home')"/>
            </div>
            <div style="margin-left: 0.6rem;margin-top: 0.1rem;font-size: 0.35rem;color: #FFFFFF;" v-if="isCabinet === '1'">拿手环训练</div>
            <div style="margin-left: 0.85rem;margin-top: 0.1rem;font-size: 0.35rem;color: #FFFFFF;" v-if="isCabinet === '2'">归还手环</div>
          </div>
        </div>
      </div>
      <PopupHint
        :popupHint="popupHint"
        :hintContent="hintContent"
        @left-bth-event="popupHint=false"
        :showRightBth="false"
      >
      </PopupHint>
      <FooterTab></FooterTab>
    </div>
</template>

<script>
import FooterTab from '../../components/footer/footer-tab'
import Header from '../../components/header/header'
import HttpAPI from '../../service/user-api'
import { Log } from '@lemon/euler-app-h5/src/libs/euler-mint-ui'
import PopupHint from '../../components/popup-hint/popup-hint'
import Common from '../../mixins/common'
export default {
  name: 'train-index',
  mixins: [Common],
  data () {
    return {
      // isHaveCard: false, // 是否购买计划卡
      // isHaveTimeCard: false, // 是否购买次卡
      // cardInfo: [],
      // mun: '1',
      // popupVisible1: false,
      jiaZaiOne: true,
      jiaZaiTwo: false,
      popupHint: false,
      hintContent: null,
      isCabinet: '1',
      cabinet: null
    }
  },
  components: {
    FooterTab,
    Header,
    PopupHint
  },
  destroyed: function () {
    // console.log('修改了')
  },
  methods: {
    getHaveCard () {
      if (!this.isHaveTimeCard) {
        if (this.cabinet) {
          this.isHaveTimeCard = true
        } else {
          this.isHaveTimeCard = false
        }
      }
    },
    goRouter (router) {
      if (this.token) {
        if (this.isHaveCard) {
          this.$router.push(router)
        } else {
          this.hintContent = '请先购买计划卡'
          this.popupHint = true
        }
      } else {
        this.goLogin()
      }
    },
    getNewOrder () {
      if (this.token) {
        HttpAPI.getOrder({}, res => {
          this.$router.push({
            path: '/ConfirmOrderOne_home',
            query: {
              order: res
            }
          })
        }, error => {
          Log.deal({
            message: '存在未支付的卡订单',
            position: 'middle'
          })
          console.log(error)
        })
      } else {
        this.goLogin()
      }
    },
    getIsCabinet () {
      HttpAPI.userIsBound({}, res => {
        this.cabinet = res
        if (res) {
          this.isCabinet = '2'
        } else {
          this.isCabinet = '1'
        }
      })
      this.getHaveCard()
    }
  },
  created () {
    if (this.token) {
      this.getIsCabinet()
    }
    let _this = this
    setTimeout(function () {
      _this.jiaZaiTwo = true
      _this.jiaZaiOne = false
    }, 500)
  },
  mounted () {
  }
}
</script>
