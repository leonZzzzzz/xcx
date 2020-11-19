<template>
    <div class="somatotype">
      <div class="header" style="z-index: 5;display: flex;justify-content: center;">
        <div :class="{'bottom': isTrain === '2'}" @click="isTrain = '2'">体型</div>
        <div style="margin-left: 1rem;" :class="{'bottoms': isTrain === '3'}" @click="isTrain = '3'" v-if="ismagin">体态</div>
      </div>
      <Header  :leftIcon="false" :rightIcon="true"></Header>
      <div v-if="isTrain === '1'">
        <!--<header-btn style="z-index: 9999"></header-btn>-->
        <img src="../../assets/images/somatotype/isTrain.jpg" style="width: 100%;"/>
        <div style="width: 100%;text-align: center;font-size: 0.45rem;color: white;margin-top: -3rem;">
          <div>还没有您的体型数据哦！</div>
          <div>请前往<a style="color: #F6BF3C">洋格品非</a>进行3D体测</div>
        </div>
      </div>
      <div v-if="isTrain === '2'" style="height: 100%;position: relative">
        <!--<header-btn style="z-index: 9999"></header-btn>-->
        <div class="nav-header">
          <div class="nav-Now">
            <div><span>{{newTime}}</span><span></span></div>
            <div class="nav-line-height">
              <div class="nav-height" style="margin-top: 0.3rem;"></div>
              <div class="nav-height" style="margin-top: 0.75rem;"></div>
              <div class="nav-height" style="margin-top: 1.1rem;"></div>
              <div class="nav-height" style="margin-top: 1.5rem;"></div>
            </div>
            <div style="font-size: 0.1rem;position: relative;left: 8rem;width: 70%;margin-top: 0.2rem;">
              <div style="position: absolute;"></div>
              <div style="position: absolute;font-size: 0.35rem;margin-top: 0.38rem;">{{height}}m</div>
              <div style="position: absolute;margin-top: 0.9rem;"></div>
              <div style="position: absolute;margin-top: 1.3rem;"></div>
            </div>
            <man2D @on-ment="getTrainValue" :trainType="istest"></man2D>
            <div><img src="../../assets/images/somatotype/bottom.png" style="height: 1.2rem;position: absolute;top: 9.4rem;left: 0.3rem;"/></div>
            <div style="position: absolute;top: 10.8rem;display: flex;">
              <div>
                <div class="weight" style="color: #FF3A43;">{{weight}}<span v-if="!isMO">kg</span><span v-else>cm</span></div>
                <img src="../../assets/images/somatotype/frame.png" style="width: 2.2rem;margin-left: 0.6rem;"/>
              </div>
              <div style="margin-top: 0.5rem;margin-left: 0.2rem;">{{trainName}}</div>
            </div>
          </div>
          <div class="nav-line"></div>
          <div class="nav-History">
            <div class="btn-target">目标</div>
            <man2D></man2D>
            <div><img src="../../assets/images/somatotype/bottom.png" style="height: 1.2rem;position: absolute;top: 9.4rem;left: 5rem;"/></div>
            <div style="position: absolute;top: 10.8rem;display: flex;">
              <div>
                <div class="weight" style="color: #262626" v-if="istest === 'magic'">{{weightValue}}
                  <span>kg</span>
                </div>
                <div class="weight" style="color: #262626" v-else>{{weightValue}}
                  <span v-if="ruleBehaviorType === 'REDUCE_FAT'">%</span>
                  <span v-else>kg</span>
                </div>
                <img src="../../assets/images/somatotype/yellowframe.png" style="width: 2.3rem;margin-left: 0.6rem;"/>
              </div>
              <div style="margin-top: 0.5rem;margin-left: 0.2rem;color: #F6BF3C" v-if="istest === 'magic'">{{trainName}}</div>
              <div style="margin-top: 0.5rem;margin-left: 0.2rem;color: #F6BF3C" v-else>{{nameValue}}</div>
            </div>
          </div>
        </div>
        <!--<div v-if="isHave" style="height: 2.2rem;background: #313131;"></div>-->
        <Progress v-if="isMO" :trainType="istest"></Progress>
        <Subject @on-set="getWeights" :trainType="istest" :fats="fats" :skaMuscle="wei" :maintain="maintain"></Subject>
        <div v-if="isHave" style="height: 2rem;background: #262626;"></div>
        <div v-if="!isHave">
          <Accounts></Accounts>
        </div>
      </div>
      <div v-if="isTrain === '3'" style="height: 100%;">
        <div class="posture">
          <div style="padding-top: 1.6rem;"><img src="../../assets/images/somatotype/tt.jpg" style="width: 100%;"/></div>
          <Posture></Posture>
          <div style="height:5rem;background: #313131;font-size: 0.5rem;padding-top: 0.5rem;color: #F6BF3C;border-top: 1px solid #313131">
            <div style="text-align: center;">调理方案正在完善中，</div>
            <div style="text-align: center;">敬请期待！！！</div>
          </div>
        </div>
      </div>
      <FooterTab></FooterTab>
    </div>
</template>

<script>
import FooterTab from '../../components/footer/footer-tab'
import UserAPI from '../../service/user-api'
import man2D from '../../components/3DMolde/man2D'
import Header from '../../components/header/header'
import Posture from './posture'
import Progress from './progressBar'
import Subject from './subjects'
import Accounts from './accounts'
import Common from '../../mixins/common'
import { formatDate } from '@lemon/euler-app-h5/src/libs/util'
export default {
  mixins: [Common],
  data () {
    return {
      isTrainType: '1',
      lessName: '减体脂',
      isMo: '',
      showCoupon: true,
      isBugCard: true,
      showPlay: false,
      sex: '', // 性别
      ruleBehaviorType: 'REDUCE_FAT', // 健身规则项(增肌GAIN_MUSCLE,减脂REDUCE_FAT,保持KEEP_WEIGHT)
      niceTime: '',
      Logs: [],
      height: 170,
      newTime: '2019-07-05',
      weight: '',
      isTrain: '1',
      weightValue: '150',
      isMO: false,
      istest: '',
      isHave: '',
      nameValue: '体脂率',
      trainName: '体重',
      ismagin: false,
      posture: [],
      wei: '',
      fats: '',
      maintain: ''
    }
  },
  components: {
    Header,
    FooterTab,
    man2D,
    Posture,
    Progress,
    Subject,
    Accounts
  },
  mounted () {
    if (this.token) {
      this.getIsTrain()
      this.getIsHave()
    }
  },
  methods: {
    // 获取值
    getTrainValue (newValue, oldValue, name) {
      this.weight = newValue
      this.trainName = name
    },
    // 判断是否已经购买卡
    getIsHave () {
      UserAPI.isHaveCard({}, res => {
        this.isHave = res
      })
    },
    getWeights (value, height, name, targetValue, trainType) {
      this.weightValue = value
      this.height = height
      this.nameValue = name
      this.weightValue = targetValue
      this.ruleBehaviorType = trainType
    },
    getIsTrain () {
      UserAPI.isTest({}, res => {
        this.istest = res.item
        if (res.test === true) {
          this.isTrain = '2'
        }
        if (res.item === 'dimensional_magic' || res.item === 'dimensional') {
          this.isMO = true
          this.ismagin = true
        }
        this.getLogs()
      })
    },
    // 拿取数据
    getLogs () {
      UserAPI.getLog({}, res => {
        this.Logs = res.data
        if (this.istest === 'magic') {
          this.weight = res.data.mirrorLog.weight / 1000
          this.maintain = res.data.mirrorLog.weight / 1000
          this.newTime = formatDate(new Date(res.data.mirrorLog.updateTime), 'yyyy-MM-dd')
        } else {
          this.fats = this.Logs.fatFreeMass.value
          this.wei = this.Logs.skeletalMuscle.value
          this.maintain = res.data.weight.value
          this.weight = res.data.weight.value
          this.newTime = formatDate(new Date(res.data.updateTime), 'yyyy-MM-dd')
        }
      })
    },
    // 判断是否有选择身高性别
    saveSex () {
      UserAPI.isSaveSex({}, res => {
        if (res === true) {
          this.$router.push('/somatotype')
        } else {
          this.$router.push('/choiseSex_home')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import "somatotype.less";
.bottoms{
  border-bottom: 3px solid #F6BF3C;
  /*height: 1.3rem;*/
  margin-left: 1rem;
  color: #F6BF3C;
}
.bottom{
  border-bottom: 3px solid #F6BF3C;
  /*height: 1.3rem;*/
  color: #F6BF3C;
}
.weight{
  position: absolute;
  width: 2rem;
  margin-left: 0.7rem;
  height: 1rem;
  text-align: center;
  line-height: 1rem;
  font-size: 0.45rem;
}
</style>
