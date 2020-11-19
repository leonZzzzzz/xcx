<style lang="less">
  @import "record-action-data";
</style>
<template>
  <div class="record-action-data">
    <div class="head-bar head-theme-b">
      <div class="head-bar head-theme-b">
        <div class="head-theme-b-left">
          <i class="icon-image icon-back" @click="$router.go(-1)"></i>
        </div>
        <div class="head-theme-b-center">
          <div class="fs-5">记录训练数据</div>
        </div>
        <div slot="right" class="head-theme-b-right">
        </div>
      </div>
    </div>
    <div class="pt-44 box-content">
      <div class="coupon-item">
        <div class="coupon-icon" >
          <div class="money">
            <span class="spanbei"><img src="../../assets/original-images/active-1.png" alt=""></span>
          </div>
        </div>
        <div class="notice-center">
          <div class="notice-title">{{existenceAction.actionName}}</div>
          <div class="notice-text">{{existenceAction.actionClassTypeDisplay}}</div>
          <div class="notice-text" style="color: #000000" v-if="existenceAction">计划: {{existenceAction.planActionGroup.length}}组
            <!--<template v-for="(item,index)of existenceAction.planActionGroup">{{item '×' item}}</template>-->
          </div>
        </div>
      </div>
      <div class="action-explain">实际训练数量:<span style="color: #DD0000;font-size: .4rem">* 录入全部组数数量，确定后不能修改</span></div>
      <div style="padding-top: 4rem;overflow-y: scroll">
        <div class="form" v-for="(item,index) in group" :key="index">
          <div class="cell-item" style="position: relative">
            <div class="title">{{index+1}}组</div>
            <div style="position: absolute;right: 20px; color: #FF0000" @click="removeGroup(index)">删除</div>
          </div>
          <div v-for="(item2,index2) in item" :key="index2" >
            <div class="cell-item" v-if="index2 !== (item.length-1)">
              <!--因为所有的数据都存储在intem的数组的最后一位元素里，为了不显示在界面上，于是就不显示数组中的最后一位元素 -->
              <div class="title">{{item2}}</div>
              <div class="content">
                <input type="text" :placeholder="'请输入'+item2" v-model="item[item.length-1][index2]">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="confirm-btn">
      <div style="border-right: 1px solid #e4e4e4;background-color: rgb(101, 220, 171);color: white" @click="addGrounp">添加组数</div>
      <!--<div style="border-right: 1px solid #e4e4e4">保存</div>-->
      <div @click="confirm" style="width: 66%; background-color: #00A0E9;color: white">确定</div>
      <!--<div style="border-right: 1px solid #e4e4e4;background-color: rgb(101, 220, 171);color: white" @click="addGrounp">添加组数</div>-->
      <!--&lt;!&ndash;<div style="border-right: 1px solid #e4e4e4">保存</div>&ndash;&gt;-->
      <!--<div @click="confirm" style="width: 66%; background-color: #00A0E9;color: white">确定</div>-->
    </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import TrainAPI from '../../service/train-api'
export default {
  name: 'record-action-data',
  data () {
    // return {
    //   group: [{ kg: '', num: '' }, { kg: '', num: '' }]
    // }
    return {
      id: '',
      date: '',
      addData: {
        id: '',
        actionClassType: '',
        actActionGroup: []
      },
      planData: [[]],
      actionDetail: '',
      existenceAction: '',
      // group: [{ kg: '', num: '' }, { kg: '', num: '' }]
      group: []
    }
  },
  watch: {},
  computed: {},
  mounted () {
    this.id = this.$route.query.id
    this.date = this.$route.query.date
    console.log('今天')
    console.log(this.date)
    this.getExistenceAction()
  },
  methods: {
    checknumber (String) {
      var reg = /^[0-9]+.?[0-9]*$/
      if (reg.test(String)) {
        return true
      }
      return false
    },
    removeGroup (index) {
      if (this.group.length === 1) {
        Toast('至少添加一组动作')
        return
      }
      this.group.splice(index, 1)
    },
    getAction (id) {
      TrainAPI.baseActions({ id: id }, res => {
        let result = res[0]
        let action = []
        result.actionClassTypesDisplay = result.actionClassTypesDisplay.split(',')
        result.action = action
        this.actionDetail = result
        this.addData.actionClassType = this.existenceAction.actionClassType
        // 显示已经有的数据
        if (this.existenceAction.actActionGroup) {
          // 如果以及存在实际的训练数据，就先显示上一次存入的训练数据
          // 然后再次修改可覆盖之前录入的实际训练数据
          for (let i = 0; i < this.existenceAction.actActionGroup.length; i++) {
            let aaArray = this.actionDetail.actionUnitsDisplay.split(',')
            let b = []
            b = this.existenceAction.actActionGroup[i]
            aaArray.push(b)
            this.group.push(aaArray)
          }
        } else {
          for (let i = 0; i < this.existenceAction.planActionGroup.length; i++) {
            // 没有录入过实际训练数据
            let aaArray = this.actionDetail.actionUnitsDisplay.split(',')
            let b = []
            b.length = this.existenceAction.planActionGroup[0].length
            aaArray.push(b)
            this.group.push(aaArray)
          }
        }
        console.log('现在的数组')
        console.log(this.group)

        // this.addGrounp()
      })
    },
    getExistenceAction () {
      // 获取现在这个动作之前添加的属性
      TrainAPI.trainActionDetail({
        id: this.id
      }, res => {
        this.existenceAction = res
        this.getAction(this.existenceAction.actionId)
      })
    },
    confirm () {
      console.log(this.group)
      this.addData.id = this.id
      if (!this.addData.actionClassType) {
        Toast('请选择动作类别')
        return
      }
      this.addData.actActionGroup.length = this.group.length
      for (let i = 0; i < this.group.length; i++) {
        this.addData.actActionGroup[i] = []
        for (let j = 0; j < this.group[i][this.group[i].length - 1].length; j++) {
          if (!this.group[i][this.group[i].length - 1][j]) {
            Toast('请输入组数所对应数据')
            return
          }
          if (!this.checknumber(this.group[i][this.group[i].length - 1][j])) {
            Toast('录入的数据必须为数字')
            return
          }
          this.addData.actActionGroup[i].length = this.group[i][this.group[i].length - 1].length
          this.addData.actActionGroup[i][j] = this.group[i][this.group[i].length - 1][j]
        }
      }
      console.log(this.addData)
      TrainAPI.trainActionActData(this.addData, res => {
        Toast('已成功录入实际训练数据')
        this.$router.push('/train-have-purchase')
      })
    },
    addGrounp () {
      // 添加组数
      let aaArray = this.actionDetail.actionUnitsDisplay.split(',')
      let b = []
      b.length = aaArray.length
      aaArray.push(b)
      this.group.push(aaArray)
      console.log(this.group)
    }
  }
}
</script>

<style scoped>

</style>
