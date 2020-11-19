<style lang="less" scoped>
  @import "coach-partner-index";
</style>
<template>
  <div class="coach-partner-index">
    <Header title="搭档" rightText="发起搭档" @on-right-handle="goShouldPartnerHome('add', false)"></Header>
    <div v-if="layer" class="layer" @click="closeSelectePopup"></div>
    <div class="box-content">
      <div class="content-select">
        <span style="margin-right: .214rem">部位</span>
        <div class="cell-content">
          <div class="cell" @click="openSelectePopup('partsView')">
            <span>{{parts}}</span>
            <img :class="partsView?'pull-down-icon-on':'pull-down-icon-off'" src="../../assets/images/somatotype/percentage.png"/>
          </div>
          <transition name="popup">
            <div v-if="partsView" class="cell-select">
              <div class="popup-row" @click="selecteds('parts', '全部')">
                <span :style="parts==='全部'?'color: #F6BF3C':''">全部</span>
              </div>
              <div class="popup-row" @click="selecteds('parts', '胸部')">
                <span :style="parts==='胸部'?'color: #F6BF3C':''">胸部</span>
              </div>
              <div class="popup-row" @click="selecteds('parts', '背部')">
                <span :style="parts==='背部'?'color: #F6BF3C':''">背部</span>
              </div>
              <div class="popup-row" @click="selecteds('parts', '肩部')">
                <span :style="parts==='肩部'?'color: #F6BF3C':''">肩部</span>
              </div>
              <div class="popup-row" @click="selecteds('parts', '腿部')">
                <span :style="parts==='腿部'?'color: #F6BF3C':''">腿部</span>
              </div>
              <div class="popup-row" @click="selecteds('parts', '腹部')">
                <span :style="parts==='腹部'?'color: #F6BF3C':''">腹部</span>
              </div>
            </div>
          </transition>
        </div>
        <span style="margin: 0 .214rem 0 .374rem">时间</span>
        <div class="cell-content">
          <div class="cell" @click="openSelectePopup('timeView')">
            <span>{{time}}</span>
            <img :class="timeView?'pull-down-icon-on':'pull-down-icon-off'" src="../../assets/images/somatotype/percentage.png"/>
          </div>
          <transition name="popup">
            <div v-if="timeView" class="cell-select">
              <div class="popup-row" @click="selecteds('time', '全部')">
                <span :style="time==='全部'?'color: #F6BF3C':''">全部</span>
              </div>
              <div class="popup-row" @click="selecteds('time', '今天')">
                <span :style="time==='今天'?'color: #F6BF3C':''">今天</span>
              </div>
              <div class="popup-row" @click="selecteds('time', '明天')">
                <span :style="time==='明天'?'color: #F6BF3C':''">明天</span>
              </div>
            </div>
          </transition>
        </div>
        <span style="margin: 0 .214rem 0 .374rem">性别</span>
        <div class="cell-content">
          <div class="cell" @click="openSelectePopup('genderView')">
            <span>{{gender}}</span>
            <img :class="genderView?'pull-down-icon-on':'pull-down-icon-off'" src="../../assets/images/somatotype/percentage.png"/>
          </div>
          <transition name="popup">
            <div v-if="genderView" class="cell-select">
              <div class="popup-row" @click="selecteds('gender', '不限')">
                <span :style="gender==='不限'?'color: #F6BF3C':''">不限</span>
              </div>
              <div class="popup-row" @click="selecteds('gender', '男')">
                <span :style="gender==='男'?'color: #F6BF3C':''">男</span>
              </div>
              <div class="popup-row" @click="selecteds('gender', '女')">
                <span :style="gender==='女'?'color: #F6BF3C':''">女</span>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <ul class="content-cell">
        <li class="cell" v-for="item in partnerList" :key="item.id" @click="joinItPartner(item)">
          <div class="cell-img">
            <img :src="item.userAvatat?item.userAvatat:(item.userSex==='MAN'? userAvatarBoy:userAvatarGirts)"/>
          </div>
          <div class="cell-info">
            <div class="info-name">{{item.userNickName}}</div>
            <div style="line-height: .6rem;">部位：{{item.trainPartsDisplay}}</div>
            <div style="line-height: .6rem;">时间：{{item.courseDate}} {{item.courseTimes[0]+' ~ '+item.courseTimes[1]}}</div>
            <div style="line-height: .6rem;">备注：{{item.description}}</div>
            <div class="cell-bth">
              <div style="font-size: .32rem;line-height: .32rem"><span style="color: #F6BF3C">{{item.signPeopleCount}}</span>/{{item.peopleLimit}}</div>
              <div v-if="memberInfo.userId!==item.userId && !item.joinStatus && (item.signPeopleCount < item.peopleLimit)" class="bth-style" @click.stop="joinHint(item)">加入</div>
              <div v-if="memberInfo.userId===item.userId" class="bth-style" @click.stop="goShouldPartnerHome('edit', item)">编辑</div>
              <div v-if="memberInfo.userId===item.userId && item.signPeopleCount===1" class="bth-style" @click.stop="affirmDelQuit(item, 'del')">删除</div>
              <div v-if="item.joinStatus" class="bth-style" @click.stop="affirmDelQuit(item, 'quit')">退出</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <mt-popup v-model="popupJoin" popup-transition="popup-fade" :closeOnClickModal="false" class="popup-hint">
      <div class="hint-text">是否加入 <span style="color: #F6BF3C">{{userNickName}}</span> 训练？</div>
      <div class="hint-bth jc-space-between">
        <div class="bth-style" style="border: .03rem solid #F6BF3C;color: #F6BF3C" @click="affirmJoin()">确定</div>
        <div class="bth-style" style="border: .03rem solid #999999;color: #999999" @click="popupJoin=false">取消</div>
      </div>
    </mt-popup>
    <!--请先在训练页面创建计划/已加入所以不能创建-->
    <mt-popup v-model="popupHint" popup-transition="popup-fade" :closeOnClickModal="false" class="popup-hint">
      <div class="hint-text" ref="hint"></div>
      <div class="hint-bth jc-center">
        <div class="bth-style" style="border: .03rem solid #F6BF3C;color: #F6BF3C" @click="popupHint=false">返回</div>
      </div>
    </mt-popup>
    <!--删除/退出-->
    <mt-popup v-model="popupDelQuit" popup-transition="popup-fade" :closeOnClickModal="false" class="popup-hint">
      <div class="hint-text" ref="del_quit"></div>
      <div class="hint-bth jc-space-between">
        <div class="bth-style" style="border: .03rem solid #F6BF3C;color: #F6BF3C" @click="affirmDelQuit()">确定</div>
        <div class="bth-style" style="border: .03rem solid #999999;color: #999999" @click="popupDelQuit=false">取消</div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import TrainAPI from '../../service/train-api'
import { Log } from '@lemon/euler-app-h5/src/libs/euler-mint-ui'
import { downloadUrl } from '@/libs/http-api'
import { formatDate } from '@lemon/euler-app-h5/src/libs/util'
import Common from '../../mixins/common'
import $ from 'jQuery'
import Header from '../../components/header/header'
export default {
  name: 'coach-partner-index',
  mixins: [Common],
  data () {
    return {
      layer: false, // 遮罩层
      partnerList: [],
      parts: '全部',
      partsView: false,
      time: '全部',
      timeView: false,
      gender: '不限',
      params: {
        trainPart: '',
        courseDate: '',
        sexLimit: ''
      },
      genderView: false,
      popupJoin: false,
      courseId: null,
      userNickName: null,
      popupHint: false,
      popupDelQuit: false,
      status: null, // 判断删除课程或退出课程
      joinStatus: false
    }
  },
  components: {
    Header
  },
  watch: {
    popupHint () {
      if (!this.popupHint) {
        this.closeVModal()
      }
    },
    popupJoin () {
      if (!this.popupJoin) {
        this.closeVModal()
      }
    },
    popupDelQuit () {
      if (!this.popupDelQuit) {
        this.closeVModal()
      }
    },
    parts () {
      if (this.parts === '全部') {
        this.params.trainPart = ''
      } else if (this.parts === '胸部') {
        this.params.trainPart = 'CHEST'
      } else if (this.parts === '背部') {
        this.params.trainPart = 'BACK'
      } else if (this.parts === '肩部') {
        this.params.trainPart = 'SHOULDER'
      } else if (this.parts === '腿部') {
        this.params.trainPart = 'LEG'
      } else if (this.parts === '腹部') {
        this.params.trainPart = 'BELLY'
      }
      this.getPartner()
    },
    time () {
      if (this.time === '全部') {
        this.params.courseDate = ''
      } else if (this.time === '今天') {
        this.params.courseDate = formatDate(new Date(), 'yyyy-MM-dd')
      } else if (this.time === '明天') {
        this.params.courseDate = formatDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000), 'yyyy-MM-dd')
      }
      this.getPartner()
    },
    gender () {
      if (this.gender === '不限') {
        this.params.sexLimit = ''
      } else if (this.gender === '男') {
        this.params.sexLimit = 'MAN'
      } else if (this.gender === '女') {
        this.params.sexLimit = 'WOMAN'
      }
      this.getPartner()
    }
  },
  beforeCreate () {
  },
  created () {
  },
  mounted () {
    this.getPartner()
  },
  methods: {
    closeVModal () {
      $('.v-modal').css('display', 'none')
    },
    openSelectePopup (type) {
      this.layer = true
      if (type === 'partsView') {
        this.partsView = true
      } else if (type === 'timeView') {
        this.timeView = true
      } else if (type === 'genderView') {
        this.genderView = true
      }
    },
    closeSelectePopup () {
      this.partsView = false
      this.timeView = false
      this.genderView = false
      this.layer = false
    },
    selecteds (type, name) {
      this.layer = false
      if (type === 'parts') {
        this.parts = name
        this.partsView = false
      } else if (type === 'time') {
        this.time = name
        this.timeView = false
      } else if (type === 'gender') {
        this.gender = name
        this.genderView = false
      }
    },
    getPartner () {
      TrainAPI.nowList(this.params, res => {
        if (res && res.length) {
          for (let i = 0; i < res.length; i++) {
            res[i].joinStatus = false
            // 判断是否加入了课程
            if (res[i].userList && res[i].userList.length) {
              for (let j = 0; j < res[i].userList.length; j++) {
                if (res[i].userList[j].userId === this.memberInfo.userId || res[i].userList[j].userId === this.$store.state.user.memberId) {
                  res[i].joinStatus = true
                  // this.joinStatus = true
                }
              }
            }
            res[i].courseDate = formatDate(new Date(res[i].courseDate), 'yyyy/MM/dd')
            if (res[i].userAvatat) {
              res[i].userAvatat = downloadUrl + res[i].userAvatat
            }
            // 判断是否创建了课程
            // if (res[i].userId === this.memberInfo.userId || res[i].userId === this.$store.state.user.memberId) {
            //   this.joinStatus = true
            // }
          }
          // console.log(res)
        }
        this.partnerList = res
      })
    },
    goShouldPartnerHome (type, item) {
      if (type === 'add') {
        this.$router.push({
          name: 'shouldPartner_home',
          query: { type: type }
        })
        // TrainAPI.isTempAddList({}, res => {
        // }, error => {
        //   if (error.errorCode === '200014') {
        //     this.affirmDelQuit(false, 'hint')
        //   }
        // })
      } else if (type === 'edit') {
        let editStatus = ''
        if (item.signPeopleCount > 1) {
          editStatus = false
        } else {
          editStatus = true
        }
        this.$router.push({
          name: 'shouldPartner_home',
          query: { type: type, id: item.id, editStatus: editStatus }
        })
      }
    },
    joinItCoach (id) {
      // 课程报名->加入课程
      this.$router.push({
        path: '/coach_home',
        query: {
          id: id
        }
      })
    },
    joinItPartner (item) {
      this.$router.push({
        path: '/partner_home',
        query: {
          id: item.id,
          joinStatus: this.memberInfo.userId === item.userId ? true : item.joinStatus
        }
      })
    },
    joinHint (item) {
      if (item.sexLimit && (this.memberInfo.sex !== item.sexLimit)) {
        let sexLimit = ''
        if (item.sexLimit === 'MAN') {
          sexLimit = '男性'
        } else if (item.sexLimit === 'WOMAN') {
          sexLimit = '女性'
        }
        Log.deal({
          message: '只能' + sexLimit + '才能加入哦',
          position: 'middle'
        })
        return
      }
      this.courseId = item.id
      this.userNickName = item.userNickName
      this.popupJoin = true
    },
    affirmJoin () {
      TrainAPI.couseSignJoin({ courseId: this.courseId }, res => {
        this.getPartner()
        this.popupJoin = false
      }, error => {
        this.$refs.hint.innerHTML = error.errorMsg
        this.popupJoin = false
        this.popupHint = true
      })
    },
    affirmDelQuit (item, type) {
      if (!this.popupDelQuit) {
        if (type === 'del') {
          this.$refs.del_quit.innerHTML = '是否删除课程？'
          this.status = type
        } else if (type === 'quit') {
          this.$refs.del_quit.innerHTML = '是否退出课程？'
          this.status = type
        }
        this.courseId = item.id
        this.popupDelQuit = true
        return
      }
      if (this.status === 'del') {
        TrainAPI.couseRecall({ id: this.courseId }, res => {
          this.getPartner()
          // this.joinStatus = false
          this.popupDelQuit = false
        })
      } else if (this.status === 'quit') {
        TrainAPI.courseOut({ courseId: this.courseId }, res => {
          this.getPartner()
          // this.joinStatus = false
          this.popupDelQuit = false
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
