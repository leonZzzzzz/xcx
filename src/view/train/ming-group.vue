<style lang="less">
  @import "ming-group";
</style>
<template>
  <div class="ming-group" :style="historyStatus? 'padding: 1.6rem 0 0':''">
    <Header :title="actionDetail.name"></Header>
    <div class="box-content">
      <div class="content-video-box">
        <video v-if="videoUrl" :src="videoUrl" controls="controls" autoplay="autoplay" loop="loop" class="video-style"></video>
      </div>
      <div class="content-action">
        <div class="action-title">{{type==='plan'? '添加训练组数':historyStatus?'历史记录数据':'手动记录数据'}}</div>
        <div class="add-del-action">
          <div class="action-num">
            <div class="action-num-title">{{type==='plan'? '计划训练数量':'实际训练数量'}}</div>
            <!--添加的动作组数-->
            <div class="action-num-cell" v-for="(item, index) in addData.actionGroup" :key="index">
              <span v-if="item.length===2">{{item[0]+units[0]}}</span>
              <span v-if="item.length===3">{{item[0]+units[0]+' x '+item[1]+units[1]}}</span>
              <div v-if="(units.length===1&&item[1].delStatus)||(units.length===2&&item[2].delStatus)"
                   class="del-bth"
                   @click="deleteTo(index)">
                <img src="../../assets/images/common/delect.png" />
              </div>
            </div>
          </div>
          <div v-if="!historyStatus" class="picker-style">
            <div class="picker-title">
              <span v-if="unitsDisplay.length>=1">{{unitsDisplay[0]}}</span>
              <span v-if="unitsDisplay.length>=2">{{unitsDisplay[1]}}</span>
            </div>
            <mt-picker :slots="slots" @change="onValuesChange" class="picker-box"></mt-picker>
            <div class="picker-bth" @click="addAction">确定</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!historyStatus" class="bottom-bth" @click="submitAction">确定</div>
    <!--手动记录数据->确定提示-->
    <mt-popup v-model="popupHint" popup-transition="popup-fade" :closeOnClickModal="false" class="popup-hint">
      <div class="hint-text">实际训练数量保存后无法修改，是否确定保存？</div>
      <div class="hint-bth">
        <div class="bth-style" style="background-color: #F6BF3C;color: black" @click="submitAction()">确定</div>
        <div class="bth-style" style="background-color: #8E8E8E;color: white" @click="popupHint=false">取消</div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import TrainAPI from '../../service/train-api'
import { Log } from '@lemon/euler-app-h5/src/libs/euler-mint-ui'
import $ from 'jQuery'
import { downloadUrl } from '../../libs/http-api'
import Header from '../../components/header/header'
import Common from '../../mixins/common'
export default {
  name: 'ming-group',
  components: {
    Header
  },
  mixins: [Common],
  data () {
    return {
      munA: 1,
      munB: 1,
      mun: [],
      type: null, // 业务类型：添加计划动作/记录实际动作
      actionId: null, // 动作Id
      date: null,
      historyStatus: false, // 历史状态（判断能否选择组数）
      videoUrl: '', // 视频地址
      addData: {
        trainDate: '',
        actionId: '',
        actionClassType: '',
        actionGroup: []
      },
      planData: [[]],
      actionDetail: '',
      unitsDisplay: [], // 动作单位(选择器)
      units: [], // 动作单位(确定选择的单位)
      slots: [],
      submitData: {},
      popupHint: false
    }
  },
  watch: {
    popupHint () {
      if (!this.popupHint) {
        this.closeVModal()
      }
    }
  },
  computed: {},
  created () {
    this.type = this.$route.query.type
    this.actionId = this.$route.query.actionId
    this.date = this.$route.query.date
    this.addData.trainDate = this.$route.query.date
    this.historyStatus = this.$route.query.historyStatus
    if (this.type === 'reality') {
      this.addData.actionId = this.$route.query.id
      this.getExistenceAction()
    } else if (this.type === 'plan') {
      this.addData.actionId = this.$route.query.actionId
    }
    this.getActionInfo()
  },
  mounted () {},
  methods: {
    closeVModal () {
      $('.v-modal').css('display', 'none')
    },
    // 删除动作
    deleteTo (id) {
      this.addData.actionGroup = this.addData.actionGroup.filter((item, index) => {
        if (index === id) {
          return false
        } else {
          return true
        }
      })
    },
    // 添加动作数量
    addAction () {
      let delStatus = { delStatus: true }
      if (this.unitsDisplay.length === 1) {
        this.addData.actionGroup.unshift([this.munA, delStatus])
      } else if (this.unitsDisplay.length === 2) {
        this.addData.actionGroup.unshift([this.munA, this.munB, delStatus])
      }
      // console.log(this.addData.actionGroup)
    },
    // 选择动作数据
    onValuesChange (picker, values) {
      if (this.unitsDisplay.length === 1) {
        this.munA = values[0]
      } else if (this.unitsDisplay.length === 2) {
        this.munA = values[0]
        this.munB = values[1]
      }
    },
    // 记录实际数据 -> 获取已存在的动作
    getExistenceAction () {
      TrainAPI.trainActionDetail({ id: this.$route.query.id }, res => {
        if (res.actActionGroup && res.actActionGroup.length) {
          let actActionGroup = res.actActionGroup.reverse()
          let delStatus = { delStatus: false }
          for (let i = 0; i < actActionGroup.length; i++) {
            if (actActionGroup[i].length === 1) {
              this.addData.actionGroup.push([actActionGroup[i][0], delStatus])
            } else if (actActionGroup[i].length === 2) {
              this.addData.actionGroup.push([actActionGroup[i][0], actActionGroup[i][1], delStatus])
            }
          }
          // console.log(this.addData.actionGroup)
        }
      })
    },
    // 初始化选择器
    intPicker () {
      var values = []
      for (let i = 1; i <= 60; i++) {
        values.push(i)
      }
      if (this.unitsDisplay.length === 1) {
        this.slots = [
          {
            flex: 1,
            values: values,
            className: 'slot1',
            textAlign: 'left'
          }
        ]
      } else if (this.unitsDisplay.length === 2) {
        this.slots = [
          {
            flex: 1,
            values: values,
            className: 'slot1',
            textAlign: 'left'
          },
          {
            flex: 1,
            values: values,
            className: 'slot2',
            textAlign: 'right'
          }
        ]
      }
      // console.log(this.slots)
    },
    // 获取动作信息
    getActionInfo () {
      TrainAPI.baseActions({ id: this.actionId }, res => {
        // 获取视频地址
        if (res[0].standardFilePath) {
          this.videoUrl = downloadUrl + res[0].standardFilePath
        }
        // 动作单位(选择器)
        this.unitsDisplay = res[0].actionUnitsDisplay.split(',')
        this.intPicker()
        // 动作单位(确定选择的单位)
        this.units = res[0].actionUnits
        for (let i = 0; i < this.units.length; i++) {
          this.units[i] = this.getUnits(this.units[i])
        }
        // console.log(this.units)
        this.actionDetail = res[0]
        this.addData.actionClassType = res[0].actionClassTypes[0]
      })
    },
    submitAction () {
      let data = {}
      if (this.type === 'plan') {
        data = {
          trainDate: this.addData.trainDate,
          actionId: this.addData.actionId,
          actionClassType: this.addData.actionClassType,
          planActionGroup: []
        }
        for (let i = 0; i < this.addData.actionGroup.length; i++) {
          data.planActionGroup.push(this.addData.actionGroup[i].slice(0, -1))
        }
        data.planActionGroup = data.planActionGroup.reverse()
        TrainAPI.trainActionAdd(data, res => {
          Log.deal({
            message: '添加动作成功',
            position: 'middle'
          })
          this.$router.go(-1)
        }, error => {
          if (error.errorCode === '10002') {
            Log.deal({
              message: '请添加组数',
              position: 'middle'
            })
          } else {
            Log.deal({
              message: error.errorMsg,
              position: 'middle'
            })
          }
        })
      } else if (this.type === 'reality') {
        if (!this.popupHint) {
          this.popupHint = true
          return
        }
        data = {
          trainDate: this.addData.trainDate,
          id: this.addData.actionId,
          actionClassType: this.addData.actionClassType,
          actActionGroup: []
        }
        for (let i = 0; i < this.addData.actionGroup.length; i++) {
          data.actActionGroup.push(this.addData.actionGroup[i].slice(0, -1))
        }
        data.actActionGroup = data.actActionGroup.reverse()
        TrainAPI.trainActionTimeAdd(data, res => {
          Log.deal({
            message: '保存动作成功',
            position: 'middle'
          })
          this.$router.go(-1)
        }, error => {
          if (error.errorCode === '10001') {
            Log.deal({
              message: '请记录组数',
              position: 'middle'
            })
          } else {
            Log.deal({
              message: error.errorMsg,
              position: 'middle'
            })
          }
        })
      }
    }
  }
}
</script>
