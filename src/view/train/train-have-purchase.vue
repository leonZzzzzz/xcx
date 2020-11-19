<style lang="less" scoped>
  @import "train-have-purchase";
</style>
<template>
  <div class="train-have-purchase">
    <Header title="训练"></Header>
    <calendar
      type="cardStartDate"
      class="calendar"
      @dateClick="getTrainAction"
      :showYear="true"
      :historyPart="historyPart"
      :defaultDate.sync="default_date"
      :clickDate.sync="clickDate">
    </calendar>
    <div class="box-content">
      <div class="content-list">
        <div v-if="courseList" class="partner-info-box">
          <div class="partner-info-after" @click="joinItPartner()">
            <div class="partner-title">
              <div class="title-sign"></div>
              <div style="white-space: nowrap;">搭档</div>
              <div style="width: 100%;text-align: right">{{courseList.time}}</div>
            </div>
            <div style="width: 100%;background-color: #8e8e8e;height: .03rem"></div>
            <div class="partner-info">
              <div class="info-img">
                <img class="img-style" :src="courseList.avatar"/>
              </div>
              <div class="info-name">{{courseList.nickName}}</div>
              <div style="white-space: nowrap;">搭档训练信息</div>
              <img style="height: .2rem;margin-left: .134rem" src="../../assets/images/common/left_seting.png"/>
            </div>
          </div>
        </div>
        <div class="list-tab" :style="courseList?'margin-top: .4rem':''">
          <div class="tab-style" v-for="(item, index) in parts" :key="index" @click="selectParts(item)" :class="item.status?'tab-style-on':'tab-style-off'">{{item.name}}</div>
        </div>
        <div class="list-cell" v-for="(item, indexA) in partActionList" :key="indexA+'_a'">
          <div v-if="item.action[0].actionList.length || item.action[1].actionList.length">
            <div class="list-head">{{item.partDisplay}}</div>
            <div v-for="(actionName, indexB) in item.action" :key="indexB+'_b'" >
              <div v-if="actionName.actionList.length">
                <div class="cell-label">
                  <div class="cell-label-line"></div>
                  <div class="cell-label-text">{{actionName.actionDisplay}}</div>
                </div>
                <div class="cell-box" v-for="(actionItem, indexC) in actionName.actionList" :key="indexC+'_c'">
                  <div class="cell" :style="actionName.actionList.length===indexC+1? 'margin-bottom: 0':''" @click="goMingGroup('reality', actionItem.actionId, actionItem.id)">
                    <div class="cell-img">
                      <img class="img-style" :src="actionItem.iconFilePath?actionItem.iconFilePath:actionImg" alt="">
                    </div>
                    <div class="cell-text">
                      <div class="cell-text-name">{{actionItem.actionName}}</div>
                      <div class="cell-text-other">
                        <span style="margin-right: 0.2rem;">计划：{{actionItem.planActionGroup && actionItem.planActionGroup.length? actionItem.planActionGroup.length:0}}组</span>
                        <span v-if="actionItem.planActionGroup && actionItem.planActionGroup.length">
                          <span v-for="(planGroup, indexD) in actionItem.planActionGroup" :key="indexD+'_d'" style="margin-right: 0.2rem;">
                            <span v-if="planGroup.length===1">{{planGroup[0]}}</span>
                            <span v-if="planGroup.length===2">{{planGroup[0]+'x'+planGroup[1]}}</span>
                          </span>
                        </span>
                      </div>
                      <div class="cell-text-other">
                        <span>实际：{{actionItem.actActionGroup && actionItem.actActionGroup.length? actionItem.actActionGroup.length:0}}组</span>
                        <span v-if="actionItem.actActionGroup && actionItem.actActionGroup.length">
                          <span v-for="(actGroup, indexE) in actionItem.actActionGroup" :key="indexE+'_e'" style="margin-left: 0.2rem;">
                            <span v-if="actGroup.length===1">{{actGroup[0]}}</span>
                            <span v-if="actGroup.length===2">{{actGroup[0]+'x'+actGroup[1]}}</span>
                          </span>
                        </span>
                      </div>
                    </div>
                    <div v-if="!historyStatus && !partnerStatus" class="cell-bth" @click.stop="showPop(actionItem)">
                      <div class="cell-bth-line"></div>
                      <div class="bth-box">
                        <img class="bth-style" src="../../assets/images/train/move_icon.png" alt="">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="!historyStatus && !partnerStatus" style="width: 100%;font-size: .32rem;display: flex;align-items: center;flex-direction: column;margin: .667rem 0">
              <img @click="getActionList(item)" src="../../assets/images/train/add_big_icon.png" style="width: 1.173rem;"/>
              <div style="color: #F6BF3C;margin-top: .267rem">添加动作</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--选择动作-->
    <mt-popup v-model="showCoupon" position="bottom" :closeOnClickModal="false" class="popup-select-action">
      <div class="popup-select-action-title">
        <span class="title-close" @click="closeCoupon">取消</span>
        <span ref="name"></span>
      </div>
      <ul class="popup-select-action-content">
        <li class="content-action-cell" v-for="(item, index) of addActionList" @click="goMingGroup('plan', item.id, null)" :key="index">
          <div class="cell-img">
            <img class="img-style" :src="item.iconFilePath?item.iconFilePath:actionImg" alt="">
          </div>
          <div class="cell-action-text">
            <div class="action-name">{{item.name}}</div>
            <div class="action-explain">{{item.actionClassTypesDisplay}}</div>
          </div>
          <img class="cell-add-icon" src="../../assets/images/train/add_small_icon.png" alt="">
        </li>
      </ul>
    </mt-popup>
    <!--弹出三个小黑点-->
    <mt-popup v-model="pop" position="bottom" :closeOnClickModal="false" class="toPop">
      <ul>
        <li style="" @click="editAction">修改训练计划</li>
        <li style="margin-bottom: .267rem;" @click="popupDelHint=true">删除</li>
        <li @click="closePop">取消</li>
      </ul>
    </mt-popup>
    <!--提示部位最多选择2个或最少1个-->
    <mt-popup v-model="popupHint" popup-transition="popup-fade" :closeOnClickModal="false" class="popup-hint">
      <div class="hint-text">至少保留1个部位或最多选择2个部位</div>
      <div class="hint-bth jc-center">
        <div class="bth-style" style="border: .03rem solid #F6BF3C;color: #F6BF3C" @click="popupHint=false">确定</div>
      </div>
    </mt-popup>
    <!--删除动作-->
    <mt-popup v-model="popupDelHint" popup-transition="popup-fade" :closeOnClickModal="false" class="popup-hint">
      <div class="hint-text">是否删除 <span style="color: #F6BF3C">{{nowChoiceAction.actionName}}</span> ？</div>
      <div class="hint-bth jc-space-between">
        <div class="bth-style" style="background-color: #8E8E8E;color: white" @click="affirmDel()">删除</div>
        <div class="bth-style" style="background-color: #F6BF3C;color: black" @click="popupDelHint=false">取消</div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import TrainAPI from '../../service/train-api'
import calendar from '../../components/calendar/calendar.vue'
import { formatDate } from '@lemon/euler-app-h5/src/libs/util'
import UserAPI from '../../service/user-api'
import { downloadUrl } from '../../libs/http-api'
import $ from 'jQuery'
import { Log } from '@lemon/euler-app-h5/src/libs/euler-mint-ui'
import Common from '../../mixins/common'
import Header from '../../components/header/header'
export default {
  name: 'train-have-purchase',
  mixins: [Common],
  data () {
    return {
      nowChoiceAction: {
        id: '',
        actionName: ''
      },
      buyDate: '', // 购卡日期时长
      sevenDays: 0, // 7天时长
      date_7: '', // 购卡后7天时间
      date_14: '', // 购卡后14天时间
      date_21: '', // 购卡后21天时间
      date_28: '', // 购卡后28天时间
      date_35: '', // 购卡后35天时间
      date_42: '', // 购卡后42天时间
      date_49: '', // 购卡后49天时间
      beginDate: '', // 购卡每7天的第1天的日期（传后台用）
      showCoupon: false,
      pop: false,
      courseList: null, // 课程信息
      addActionList: [], // 添加部位动作列表
      historyPart: [], // 历史训练部位
      parts: [], // 训练部位
      partAstrict: 0, // 限制选择部位，最少选择1个或最多2个
      default_date: '', // 日历默认日期
      clickDate: '', // 点击日期
      historyStatus: false, // 显示的是历史列表时，为true
      partnerStatus: false, // 加入了搭档课程时，为true
      // clickStatus: true, // 能否点击（日期小于当天、加入了课程的不能进行编辑等操作）
      partActionList: [],
      popupHint: false,
      popupDelHint: false
    }
  },
  components: {
    calendar,
    Header
  },
  watch: {
    showCoupon () {
      if (!this.showCoupon) {
        this.closeVModal()
      }
    },
    pop () {
      if (!this.pop) {
        this.closeVModal()
      }
    },
    popupDelHint () {
      if (this.popupDelHint) {
        this.pop = false
      } else {
        this.closeVModal()
      }
    },
    popupHint () {
      if (!this.popupHint) {
        this.closeVModal()
      }
    }
  },
  created () {
    this.initPartActionList()
  },
  beforeCreate () {
  },
  mounted () {
    this.getDefaultDate()
  },
  methods: {
    closeVModal () {
      $('.v-modal').css('display', 'none')
    },
    // 返回购卡日期每7天内的第1天
    setBeginDate (date) {
      if (date < this.date_7) {
        return formatDate(new Date(this.buyDate), 'yyyy-MM-dd')
      } else if ((this.date_7 <= date) && (date < this.date_14)) {
        return formatDate(new Date(this.date_7), 'yyyy-MM-dd')
      } else if ((this.date_14 <= date) && (date < this.date_21)) {
        return formatDate(new Date(this.date_14), 'yyyy-MM-dd')
      } else if ((this.date_21 <= date) && (date < this.date_28)) {
        return formatDate(new Date(this.date_21), 'yyyy-MM-dd')
      } else if ((this.date_28 <= date) && (date < this.date_35)) {
        return formatDate(new Date(this.date_28), 'yyyy-MM-dd')
      } else if ((this.date_35 <= date) && (date < this.date_42)) {
        return formatDate(new Date(this.date_35), 'yyyy-MM-dd')
      } else if ((this.date_42 <= date) && (date < this.date_49)) {
        return formatDate(new Date(this.date_42), 'yyyy-MM-dd')
      } else {
        return formatDate(new Date(), 'yyyy-MM-dd')
      }
    },
    // 创建部位动作列表
    initPartActionList () {
      this.partActionList = [
        {
          partDisplay: '胸部',
          part: 'CHEST',
          action: [
            {
              actionDisplay: '经典动作',
              actionList: []
            },
            {
              actionDisplay: '辅助动作',
              actionList: []
            }
          ]
        },
        {
          partDisplay: '背部',
          part: 'BACK',
          action: [
            {
              actionDisplay: '经典动作',
              actionList: []
            },
            {
              actionDisplay: '辅助动作',
              actionList: []
            }
          ]
        },
        {
          partDisplay: '肩部',
          part: 'SHOULDER',
          action: [
            {
              actionDisplay: '经典动作',
              actionList: []
            },
            {
              actionDisplay: '辅助动作',
              actionList: []
            }
          ]
        },
        {
          partDisplay: '腿部',
          part: 'LEG',
          action: [
            {
              actionDisplay: '经典动作',
              actionList: []
            },
            {
              actionDisplay: '辅助动作',
              actionList: []
            }
          ]
        },
        {
          partDisplay: '腹部',
          part: 'BELLY',
          action: [
            {
              actionDisplay: '经典动作',
              actionList: []
            },
            {
              actionDisplay: '辅助动作',
              actionList: []
            }
          ]
        }
      ]
    },
    // 获取开始的日期
    getDefaultDate () {
      UserAPI.getdetail({}, res => {
        // 获取购卡日期
        this.buyDate = formatDate(new Date(res.createTime), 'yyyy-MM-dd 00:00:00')
        this.buyDate = new Date(this.buyDate).getTime()
        // 获取当日日期
        let newDate = formatDate(new Date(), 'yyyy-MM-dd 00:00:00')
        newDate = new Date(newDate).getTime()
        // 获取7天的时长
        this.sevenDays = 7 * 24 * 60 * 60 * 1000
        // 获取购卡后7天、14、21、28、35、42、49时间
        this.date_7 = this.buyDate + this.sevenDays
        this.date_14 = this.buyDate + this.sevenDays * 2
        this.date_21 = this.buyDate + this.sevenDays * 3
        this.date_28 = this.buyDate + this.sevenDays * 4
        this.date_35 = this.buyDate + this.sevenDays * 5
        this.date_42 = this.buyDate + this.sevenDays * 6
        this.date_49 = this.buyDate + this.sevenDays * 7
        // console.log(this.date_7, this.date_14, this.date_21, (this.date_28, this.date_35, this.date_42, this.date_49)
        this.default_date = this.setBeginDate(newDate)
        this.beginDate = this.default_date
        this.clickDate = formatDate(new Date(), 'yyyy-MM-dd')
        this.getTrainAction(false)
      })
    },
    // 获取动作列表及点击日期的处理
    getTrainAction (date) {
      // console.log(date)
      if (date) {
        let clickDate = formatDate(new Date(date), 'yyyy/MM/dd 00:00:00')
        this.beginDate = this.setBeginDate(new Date(clickDate).getTime())
        this.clickDate = date
      }
      TrainAPI.getTrainAction({ beginDate: this.beginDate, trainDate: this.clickDate }, res => {
        this.handleList(res)
        // 判断点击日期是否大于当前时间，大于时可以点击编辑等操作
        let newDate = formatDate(new Date(), 'yyyy/MM/dd 00:00:00')
        let clickDate = formatDate(new Date(this.clickDate), 'yyyy/MM/dd 00:00:00')
        if (new Date(clickDate).getTime() >= new Date(newDate).getTime()) {
          this.historyStatus = false
        } else {
          this.historyStatus = true
        }
      }, () => {
        // console.log(123)
        this.historyPart = []
        this.initPartActionList()
        this.parts = []
        this.courseList = null
      })
    },
    // 处理历史训练部位、计划部位动作列表、部位标签
    handleList (res) {
      // 获取课程信息
      this.courseList = null
      this.partnerStatus = false
      let courseList = res.courseList
      if (courseList && courseList.length) {
        this.courseList = {
          time: formatDate(new Date(courseList[0].courseDate), 'yyyy-MM-dd') + ' ' + courseList[0].courseTimes[0] + ' ~ ' + courseList[0].courseTimes[1],
          avatar: courseList[0].userAvatat ? downloadUrl + courseList[0].userAvatat : (courseList[0].userSex === 'MAN' ? this.userAvatarBoy : this.userAvatarGirts),
          nickName: courseList[0].userNickName,
          id: courseList[0].id
        }
        this.partnerStatus = true
      }

      // 获取历史训练部位
      let historyPartItem = {}
      let historyPartArr = []
      for (let i in res.groupByMap) {
        if (res.groupByMap.hasOwnProperty(i)) {
          let partName = ''
          for (let j = 0; j < res.groupByMap[i].length; j++) {
            partName = partName + res.groupByMap[i][j].split('部')[0]
          }
          historyPartItem = { partName: partName, date: i }
          historyPartArr.push(historyPartItem)
        }
      }
      // console.log(historyPartArr)
      this.historyPart = historyPartArr

      // 判断默认部位有哪些及获取默认部位列表
      let partArr = res.mapList
      this.initPartActionList()
      let listItem = this.partActionList
      for (let i in partArr) {
        if (partArr.hasOwnProperty(i)) {
          let item = partArr[i]
          for (let j = 0; j < item.length; j++) {
            if (item[j].iconFilePath) {
              item[j].iconFilePath = downloadUrl + item[j].iconFilePath
            }
            // 获取组数单位
            var unitsA = ''
            var unitsB = ''
            if (item[j].actionUnits.length >= 1) {
              unitsA = this.getUnits(item[j].actionUnits[0])
            }
            if (item[j].actionUnits.length >= 2) {
              unitsB = this.getUnits(item[j].actionUnits[1])
            }
            // console.log(item[j].actionName, unitsA, unitsB)
            // 为计划组数添加单位
            if (item[j].planActionGroup && item[j].planActionGroup.length) {
              for (let k = 0; k < item[j].planActionGroup.length; k++) {
                if (item[j].planActionGroup[k].length >= 1) {
                  item[j].planActionGroup[k][0] = item[j].planActionGroup[k][0] + unitsA
                }
                if (item[j].planActionGroup[k].length >= 2) {
                  item[j].planActionGroup[k][1] = item[j].planActionGroup[k][1] + unitsB
                  // console.log(item[j].actionName, unitsA, unitsB)
                }
                // console.log(item[j].planActionGroup)
              }
            }
            // 为实际组数添加单位
            if (item[j].actActionGroup && item[j].actActionGroup.length) {
              for (let k = 0; k < item[j].actActionGroup.length; k++) {
                if (item[j].actActionGroup[k].length >= 1) {
                  item[j].actActionGroup[k][0] = item[j].actActionGroup[k][0] + unitsA
                }
                if (item[j].actActionGroup[k].length >= 2) {
                  item[j].actActionGroup[k][1] = item[j].actActionGroup[k][1] + unitsB
                }
                // console.log(item[j].actActionGroup)
              }
            }
            // 添加到数组中
            for (let k = 0; k < listItem.length; k++) {
              if (listItem[k].part === i) {
                if (item[j].actionClassType === 'SUTRA') {
                  listItem[k].action[0].actionList.push(item[j])
                } else if (item[j].actionClassType === 'ASSIST') {
                  listItem[k].action[1].actionList.push(item[j])
                }
              }
            }
          }
        }
      }

      // 获取部位标签及显示默认部位、获取限制部位数量
      let partItem = {}
      this.partAstrict = 0
      this.parts = []
      for (let l = 0; l < res.partList.length; l++) {
        for (let m = 0; m < listItem.length; m++) {
          if (res.partList[l] === listItem[m].part) {
            if (listItem[m].action[0].actionList.length || listItem[m].action[1].actionList.length) {
              partItem = { status: true, name: listItem[m].partDisplay.split('部')[0], part: res.partList[l] }
              this.partAstrict = this.partAstrict + 1
            } else {
              partItem = { status: false, name: listItem[m].partDisplay.split('部')[0], part: res.partList[l] }
            }
            this.parts.push(partItem)
          }
        }
      }
      // console.log(this.partActionList)
      // console.log(this.parts)
    },
    // 选择部位
    selectParts (item) {
      if (!this.historyStatus && !this.partnerStatus) {
        if (!item.status) {
          if (this.partAstrict === 2) {
            this.popupHint = true
          } else {
            // 获取选择部位的动作
            TrainAPI.exchange({ part: item.part, trainDate: this.clickDate }, res => {
              this.getTrainAction(false)
              this.partAstrict = this.partAstrict + 1
              item.status = true
            })
          }
        } else {
          if (this.partAstrict === 1) {
            this.popupHint = true
          } else {
            // 清除选中部位的动作
            TrainAPI.exchange({ part: item.part, trainDate: this.clickDate }, res => {
              this.getTrainAction(false)
              this.partAstrict = this.partAstrict - 1
              item.status = false
            })
            // let list = this.partActionList
            // for (let i = 0; i < list.length; i++) {
            //   if (item.part === list[i].part) {
            //     list[i].status = false
            //     list[i].action[0].actionList = []
            //     list[i].action[1].actionList = []
            //   }
            // }
            // this.partAstrict = this.partAstrict - 1
            // item.status = false
            // console.log(this.partActionList)
          }
        }
      }
    },
    // 添加动作 => 获取动作列表
    getActionList (item) {
      TrainAPI.notChooseActions({ Date: this.clickDate, part: item.part }, res => {
        if (res && res.length) {
          this.$refs.name.innerHTML = '选择' + item.partDisplay + '动作'
          for (let i = 0; i < res.length; i++) {
            if (res[i].iconFilePath) {
              res[i].iconFilePath = downloadUrl + res[i].iconFilePath
            }
          }
          this.addActionList = res
          this.showCoupon = true
        } else {
          Log.deal({
            message: '没有可添加的动作',
            position: 'middle'
          })
        }
      })
    },
    closeCoupon () {
      this.showCoupon = false
    },
    goMingGroup (type, actionId, id) {
      this.$router.push({
        path: '/ming-group',
        query: {
          type: type,
          actionId: actionId,
          id: id,
          date: this.clickDate,
          historyStatus: this.historyStatus
        }
      })
    },
    showPop (item) {
      // console.log(item)
      this.pop = true
      this.nowChoiceAction.id = item.id
      this.nowChoiceAction.actionName = item.actionName
    },
    closePop () {
      this.pop = false
    },
    editAction () {
      this.$router.push({
        path: '/editing-ming-grounp',
        query: { id: this.nowChoiceAction.id }
      })
    },
    affirmDel () {
      TrainAPI.trainActionDel({ id: this.nowChoiceAction.id }, res => {
        this.getTrainAction(false)
        this.popupDelHint = false
      })
    },
    joinItPartner () {
      this.$router.push({
        path: '/partner_home',
        query: {
          id: this.courseList.id,
          joinStatus: true
        }
      })
    }
  }
}
</script>
