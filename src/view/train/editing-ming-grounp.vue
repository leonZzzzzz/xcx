<style lang="less">
  @import "editing-ming-grounp";
</style>
<template>
  <div class="editing-ming-group">
    <Header title="修改训练计划"></Header>
    <div class="box-content">
      <div class="content-absolute-top">
        <div class="top-cell">
          <div class="cell-img-box">
            <img class="img-style" :src="existenceAction.iconFilePath? existenceAction.iconFilePath:actionImg" alt="">
          </div>
          <div class="content-action">
            <div class="action-name">{{existenceAction.actionName}}</div>
            <div class="action-type">{{existenceAction.partDisplay + '-' + existenceAction.actionClassTypeDisplay}}</div>
          </div>
          <div class="content-bth" @click="addGrounp">添加组数</div>
        </div>
      </div>
      <ul class="content-form">
        <li class="form-li" v-for="(item,index) in group" :key="index">
          <div class="li-title li-row-style">
            <div class="title-text">第 {{group.length-index}} 组</div>
            <div class="del-bth" @click="lessGroup(index)">删除</div>
          </div>
          <div class="li-row-style" :style="units.length===1?'border-bottom: none':''">
            <div class="row-name">{{units[0]}}</div>
            <input type="number" class="li-input" v-model="item.numA" placeholder="" />
          </div>
          <div v-if="units.length===2" class="li-row-style" style="border-bottom: none">
            <div class="row-name">{{units[1]}}</div>
            <input type="number" class="li-input" v-model="item.numB" placeholder="" />
          </div>
        </li>
      </ul>
    </div>
    <div class="bottom-bth" @click="addAction">确定</div>
  </div>
</template>

<script>
import TrainAPI from '../../service/train-api'
import { Log } from '@lemon/euler-app-h5/src/libs/euler-mint-ui'
import { downloadUrl } from '../../libs/http-api'
import Header from '../../components/header/header'
export default {
  name: 'editing-ming-grounp',
  components: {
    Header
  },
  data () {
    return {
      id: '',
      // date: '',
      addData: {
        id: '',
        actionClassType: '',
        planActionGroup: []
      },
      planData: [[]],
      // actionDetail: null,
      existenceAction: {
        iconFilePath: null
      }, // 动作信息
      units: [], // 动作单位
      group: [], // 存在的动作列表
      groupValue: [],
      actionImg: require('../../assets/images/footer/train.png')
    }
  },
  watch: {},
  computed: {},
  created () {
    this.id = this.$route.query.id
    this.getExistenceAction()
  },
  mounted () {
  },
  methods: {
    getExistenceAction () {
      // 获取现在这个动作之前添加的属性
      TrainAPI.trainActionDetail({ id: this.id }, res => {
        this.addData.actionClassType = res.actionClassType
        if (res.iconFilePath) {
          res.iconFilePath = downloadUrl + res.iconFilePath
        }
        this.units = res.actionUnitsDisplay.split(',')
        // console.log(this.units)
        // 显示已经有的数据
        if (res.planActionGroup && res.planActionGroup.length) {
          let planActionGroup = res.planActionGroup.reverse()
          for (let i = 0; i < planActionGroup.length; i++) {
            if (planActionGroup[i].length === 1) {
              this.group.push({ numA: planActionGroup[i][0] })
            } else if (planActionGroup[i].length === 2) {
              this.group.push({ numA: planActionGroup[i][0], numB: planActionGroup[i][1] })
            }
          }
        }
        this.existenceAction = res
        // console.log(res)
      })
    },
    addAction () {
      if (!this.group.length) {
        Log.deal({
          message: '请添加组数',
          position: 'middle'
        })
        return
      }
      let arr = []
      for (let i = 0; i < this.group.length; i++) {
        if (this.units.length === 1 && !this.group[i].numA) {
          Log.deal({
            message: '请填写完整',
            position: 'middle'
          })
          return
        } else if (this.units.length === 2 && (!this.group[i].numA || !this.group[i].numB)) {
          Log.deal({
            message: '请填写完整',
            position: 'middle'
          })
          return
        }
        arr.push([this.group[i].numA, this.group[i].numB])
      }
      this.addData.planActionGroup = arr.reverse()
      this.addData.id = this.id
      TrainAPI.trainActionEdit(this.addData, res => {
        Log.deal({
          message: '修改动作成功',
          position: 'middle'
        })
        this.$router.go(-1)
      })
    },
    addGrounp () {
      // 添加组数
      let a = null
      if (this.units.length === 1) {
        this.group.unshift({ numA: a })
      } else if (this.units.length === 2) {
        let b = null
        this.group.unshift({ numA: a, numB: b })
      }
      // console.log(this.group)
    },
    lessGroup (index) {
      if (this.group.length === 1) {
        Log.deal({
          message: '至少保留一组动作',
          position: 'middle'
        })
        return
      }
      this.group.splice(index, 1)
    }
  }
}
</script>
