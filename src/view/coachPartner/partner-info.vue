<template>
    <div class="partner-info" :style="!joinStatus? '':'padding-bottom: 0'">
      <Header title="搭档训练信息"></Header>
      <div class="box-content">
        <ul class="cell-box">
          <li class="cell">
            <div class="cell-label"></div>
            <span>发起人信息</span>
            <!--<span style="margin-left: 5.5rem;color: white;" @click="$router.push('/partnerUserInfo_home')">详细信息></span>-->
          </li>
          <li class="cell-partner-info cell-after">
            <div class="portrait-box">
              <img class="portrait-style" :src="courseInfo.member.memberDetailInfoVO.avatar" alt="">
            </div>
            <div class="partner-info-box">
              <div class="info-top">
                <span class="name common-text-ellipsis">{{courseInfo.member.memberDetailInfoVO.nickName}}</span>
                <img class="sex" :src="courseInfo.member.memberDetailInfoVO.sex === 'MAN'? userSexBoy:userSexGirts" alt="">
                <!--<div class="level common-text-ellipsis">-->
                  <!--<span>LV.10</span>-->
                <!--</div>-->
                <div class="level" v-if="courseInfo.member.memberDetailInfoVO.occupational">
                  <span class="common-text-ellipsis">{{courseInfo.member.memberDetailInfoVO.occupational}}</span>
                </div>
              </div>
              <div class="info-bottom">搭档次数：{{courseInfo.member.cpCount}}</div>
            </div>
          </li>
        </ul>
        <ul class="cell-box">
          <li class="cell">
            <div class="cell-label"></div>
            <span>搭档要求</span>
          </li>
          <li class="cell cell-after">
            <span class="cell-text">性别</span>
            <span class="cell-content">{{courseInfo.sexLimit}}</span>
          </li>
          <li class="cell-remark cell-after">{{courseInfo.description}}</li>
        </ul>
        <ul class="cell-box">
          <li class="cell">
            <div class="cell-label"></div>
            <span style="width: 100%">参与人员</span>
            <span style="white-space: nowrap">{{courseInfo.signPeopleCount}}/{{courseInfo.peopleLimit}}</span>
          </li>
          <li class="cell-photo-info">
            <div class="cell-photo-box" v-for="(item, index) in courseInfo.userList" :key="index">
              <img class="cell-photo" :src="item.avatar? item.avatar:(item.sex === 'MAN'? userAvatarBoy:userAvatarGirts)"/>
              <span class="cell-nickName common-text-ellipsis">{{item.nickName}}</span>
            </div>
          </li>
        </ul>
        <ul class="cell-box">
          <li class="cell">
            <div class="cell-label"></div>
            <span>训练内容</span>
          </li>
          <li class="cell cell-after">
            <span class="cell-text">训练时间</span>
            <span class="cell-content">{{courseInfo.courseDateMerge}}</span>
          </li>
          <li v-for="(item, index) in courseInfo.courseActionList" :key="index">
            <div class="cell cell-after" @click.stop="viewAction(index)">
              <span style="white-space: nowrap;width: 100%">
                {{index==='CHEST'? '胸部':(index==='BACK'? '背部':(index==='SHOULDER'? '肩部':(index==='LEG'? '腿部':(index==='BELLY'? '腹部':''))))}}
              </span>
              <img v-if="index==='CHEST'" style="height: .147rem;" :class="onStatus.CHEST?'rotate-on':'rotate-off'"  src="../../assets/images/common/arrows-bottom-icon.png">
              <img v-if="index==='BACK'" style="height: .147rem;" :class="onStatus.BACK?'rotate-on':'rotate-off'"  src="../../assets/images/common/arrows-bottom-icon.png">
              <img v-if="index==='SHOULDER'" style="height: .147rem;" :class="onStatus.SHOULDER?'rotate-on':'rotate-off'"  src="../../assets/images/common/arrows-bottom-icon.png">
              <img v-if="index==='LEG'" style="height: .147rem;" :class="onStatus.LEG?'rotate-on':'rotate-off'"  src="../../assets/images/common/arrows-bottom-icon.png">
              <img v-if="index==='BELLY'" style="height: .147rem;" :class="onStatus.BELLY?'rotate-on':'rotate-off'"  src="../../assets/images/common/arrows-bottom-icon.png">
            </div>
            <ul :ref="index" class="on-hide-content cell-after" style="display: block">
              <li class="content-cell" v-for="actionItem in item" :key="actionItem.id">
                <div class="cell-img">
                  <img class="img-style" :src="actionItem.iconFilePath? actionItem.iconFilePath:actionImg" alt=""/>
                </div>
                <div class="cell-action-info">
                  <div class="info-name common-text-ellipsis">{{actionItem.actionName}}</div>
                  <div class="info-type">{{actionItem.actionClassTypeDisplay}}</div>
                  <div class="info-plan">
                    <div style="white-space: nowrap">计划：{{actionItem.planActionGroup && actionItem.planActionGroup.length? actionItem.planActionGroup.length:0}}组</div>
                    <div class="plan-group" v-if="actionItem.planActionGroup && actionItem.planActionGroup.length">
                      <span v-for="(planGroup, indexD) in actionItem.planActionGroup" :key="indexD+'_d'" class="group-info common-text-ellipsis">
                        <span v-if="planGroup.length===1">{{planGroup[0]}}</span>
                        <span v-if="planGroup.length===2">{{planGroup[0]+'x'+planGroup[1]}}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="bottom-bth" v-if="!joinStatus">
        <div class="bth-style" @click.stop="joinHint()">加入</div>
      </div>
      <mt-popup v-model="popupJoin" popup-transition="popup-fade" :closeOnClickModal="false" class="popup-hint">
        <div class="hint-text">是否加入 <span style="color: #F6BF3C" ref="userNickName"></span> 训练？</div>
        <div class="hint-bth jc-space-between">
          <div class="bth-style" style="border: .03rem solid #F6BF3C;color: #F6BF3C" @click="affirmJoin()">确定</div>
          <div class="bth-style" style="border: .03rem solid #999999;color: #999999" @click="popupJoin=false">取消</div>
        </div>
      </mt-popup>
      <PopupHint
        :popupHint="popupHint"
        :hintContent="hintContent"
        @right-bth-event="popupHint=false"
        :showLeftBth="false"
      >
      </PopupHint>
    </div>
</template>

<script>
import TrainAPI from '../../service/train-api'
import Header from '../../components/header/header'
import { formatDate } from '@lemon/euler-app-h5/src/libs/util'
import Common from '../../mixins/common'
import $ from 'jQuery'
import { downloadUrl } from '../../libs/http-api'
import PopupHint from '../../components/popup-hint/popup-hint'
export default {
  mixins: [Common],
  components: {
    Header,
    PopupHint
  },
  data () {
    return {
      id: null,
      joinStatus: false,
      courseInfo: {
        courseActionList: [],
        member: {
          cpCount: '',
          memberDetailInfoVO: {
            avatar: '',
            nickName: '',
            sex: '',
            occupational: ''
          }
        },
        sexLimit: '',
        description: '',
        signPeopleCount: '',
        peopleLimit: '',
        userList: [],
        courseDateMerge: ''
      },
      onStatus: {
        CHEST: true, // 胸部
        BACK: true, // 背部
        SHOULDER: true, // 肩部
        LEG: true, // 腿部
        BELLY: true // 腹部
      },
      popupJoin: false,
      popupHint: false,
      hintContent: null
    }
  },
  watch: {
    popupJoin () {
      if (!this.popupJoin) {
        this.closeVModal()
      }
    }
  },
  computed: {},
  methods: {
    closeVModal () {
      $('.v-modal').css('display', 'none')
    },
    getPartner () {
      TrainAPI.couseDetail({ id: this.id }, res => {
        // 判断人数是否显示加入按钮
        if (res.signPeopleCount === res.peopleLimit) {
          this.joinStatus = true
        }
        // 获取头像url
        if (res.member.memberDetailInfoVO.avatar) {
          res.member.memberDetailInfoVO.avatar = downloadUrl + res.member.memberDetailInfoVO.avatar
        } else {
          if (res.member.memberDetailInfoVO.sex === 'MAN') {
            res.member.memberDetailInfoVO.avatar = this.userAvatarBoy
          } else {
            res.member.memberDetailInfoVO.avatar = this.userAvatarGirts
          }
        }
        // code转换成中文
        if (res.sexLimit === 'MAN') {
          res.sexLimit = '男'
        } else if (res.sexLimit === 'WOMAN') {
          res.sexLimit = '女'
        } else {
          res.sexLimit = '不限'
        }
        // 描述
        if (!res.description) {
          res.description = '无'
        }
        // 将自己的信息插入到训练队伍中
        res.userList.unshift(res.member.memberDetailInfoVO)
        // 获取训练时间
        res.courseDateMerge = formatDate(new Date(res.courseDate), 'yyyy/MM/dd') + ' ' + res.courseTimes[0] + ' ~ ' + res.courseTimes[1]
        // 为计划组数添加单位
        for (let i in res.courseActionList) {
          if (res.courseActionList.hasOwnProperty(i)) {
            let item = res.courseActionList[i]
            for (let j = 0; j < item.length; j++) {
              // 获取动作图片url
              if (item[j].iconFilePath) {
                item[j].iconFilePath = downloadUrl + item[j].iconFilePath
              }
              // 获取组数单位
              var unitsA, unitsB
              if (item[j].actionUnits.length >= 1) {
                unitsA = this.getUnits(item[j].actionUnits[0])
              }
              if (item[j].actionUnits.length >= 2) {
                unitsB = this.getUnits(item[j].actionUnits[1])
              }
              if (item[j].planActionGroup && item[j].planActionGroup.length) {
                for (let k = 0; k < item[j].planActionGroup.length; k++) {
                  if (item[j].planActionGroup[k].length >= 1) {
                    item[j].planActionGroup[k][0] = item[j].planActionGroup[k][0] + unitsA
                  }
                  if (item[j].planActionGroup[k].length >= 2) {
                    item[j].planActionGroup[k][1] = item[j].planActionGroup[k][1] + unitsB
                  }
                }
              }
            }
          }
        }
        console.log(res)
        this.courseInfo = res
      })
    },
    viewAction (name) {
      if (name === 'CHEST') {
        if (this.onStatus.CHEST) {
          console.log(name)
          // console.log(this.$refs.CHEST)
          this.$refs.CHEST[0].style.display = 'none'
          this.onStatus.CHEST = false
        } else {
          this.$refs.CHEST[0].style.display = 'block'
          this.onStatus.CHEST = true
        }
      } else if (name === 'BACK') {
        if (this.onStatus.BACK) {
          this.$refs.BACK[0].style.display = 'none'
          this.onStatus.BACK = false
        } else {
          this.$refs.BACK[0].style.display = 'block'
          this.onStatus.BACK = true
        }
      } else if (name === 'SHOULDER') {
        if (this.onStatus.SHOULDER) {
          this.$refs.SHOULDER[0].style.display = 'none'
          this.onStatus.SHOULDER = false
        } else {
          this.$refs.SHOULDER[0].style.display = 'block'
          this.onStatus.SHOULDER = true
        }
      } else if (name === 'LEG') {
        if (this.onStatus.LEG) {
          this.$refs.LEG[0].style.display = 'none'
          this.onStatus.LEG = false
        } else {
          this.$refs.LEG[0].style.display = 'block'
          this.onStatus.LEG = true
        }
      } else if (name === 'BELLY') {
        if (this.onStatus.BELLY) {
          this.$refs.BELLY[0].style.display = 'none'
          this.onStatus.BELLY = false
        } else {
          this.$refs.BELLY[0].style.display = 'block'
          this.onStatus.BELLY = true
        }
      }
    },
    joinHint () {
      if ((this.courseInfo.sexLimit !== '不限') && (this.memberInfo.sexDisplay !== this.courseInfo.sexLimit)) {
        this.hintContent = '只能' + this.courseInfo.sexLimit + '性才能加入哦'
        this.popupHint = true
        return
      }
      this.$refs.userNickName.innerHTML = this.courseInfo.member.memberDetailInfoVO.nickName
      this.popupJoin = true
    },
    affirmJoin () {
      TrainAPI.couseSignJoin({ courseId: this.id }, res => {
        this.$router.go(-1)
      }, error => {
        this.hintContent = error.errorMsg
        this.popupJoin = false
        this.popupHint = true
      })
    }
  },
  created () {
    this.id = this.$route.query.id
    this.joinStatus = this.$route.query.joinStatus
    this.getPartner()
  }
}
</script>

<style lang="less" scoped>
@import "partner-info.less";
</style>
