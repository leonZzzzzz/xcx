<style lang="less">
  @import "ming-group";
  /*.select-type {*/
  /*  width: 80%;*/
  /*  height: 100%;*/
  /*  outline: none;*/
  /*  border: none;*/
  /*  background: #fbfaf9;*/
  /*}*/
</style>
<template>
  <div class="ming-group">
    <div class="head-bar-to">
      <div class="head-left" @click="$router.go(-1)">
        <img src="../../assets/images/common/left_icon_black_big.png"/>
      </div>
      <div class="head-middle">{{actionDetail.name}}</div>
      <div class="head-right"></div>
    </div>
    <div class="box-content">
      <div class="coupon-item">
        <img src="../../assets/original-images/123.png" alt="" style="width: 100%;height: 100%;">
      </div>
      <div style="padding: .4rem .4rem 0;">添加训练组数</div>
      <div class="link-x" style="margin-top: 0.3rem;"></div>
      <div style="padding: .4rem .4rem 0;width: 4rem;position: absolute;">
        <div>实际训练数量</div>
        <div style="margin-top: 0.4rem;display: flex;" v-for="(item, index) in addData.planActionGroup" :key="index">
          <span style="white-space: nowrap">{{item[0]}} (kg)</span>&nbsp;<span></span><span>x</span><span>&nbsp;</span><span style="white-space: nowrap">{{item[1]}} (次)</span>
          <div @click="deleteTo(index)" style="margin-left: 0.4rem;"><img src="../../assets/images/common/delect.png" style="width: 0.4rem;height: 0.4rem;margin-top: 0.05rem"/></div>
        </div>
      </div>
      <div class="picker-style">
        <div style="color: white;width: 5rem;font-weight: lighter;position: absolute;top: -1.2rem;">
          <span style="margin-left: 0.5rem;">重量（kg）</span>
          <span style="margin-left: 1rem;">次数</span>
        </div>
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      </div>
      <div style="background: #232323;border: 1px #F6BF3C solid;width: 3rem;text-align: center;height: 0.7rem;line-height: 0.7rem;margin-left: 5.7rem;margin-top: 7.5rem;" @click="thisOk">确定</div>
    </div>
    <div style="position: fixed;bottom: 0rem;width: 100%;">
      <div style="background-color: #F6BF3C;height: 1rem;line-height: 1rem;text-align: center;font-size: 0.374rem;" @click="addAction">确定</div>
    </div>
  </div>
</template>

<script>
import TrainAPI from '../../service/train-api'
import { Toast } from 'mint-ui'
export default {
  name: 'ming-group',
  data () {
    return {
      munKg: '',
      munZl: '',
      mun: [],
      id: '',
      date: '',
      addData: {
        trainDate: '',
        actionId: '',
        actionClassType: '',
        actActionGroup: []
      },
      planData: [[]],
      actionDetail: '',
      // group: [{ kg: '', num: '' }, { kg: '', num: '' }]
      // 控制训练的组数以及其单位之类的
      group: [],
      addNewAction: [],
      slots: [
        {
          flex: 1,
          values: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
          className: 'slot1',
          textAlign: 'right'
        },
        {
          flex: 1,
          values: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
          className: 'slot2',
          textAlign: 'left'
        }
      ]
    }
  },
  watch: {},
  computed: {},
  mounted () {
    this.id = this.$route.query.id
    this.date = this.$route.query.date
    this.addData.trainDate = this.date
    this.getAction()
  },
  methods: {
    deleteTo (id) {
      // var newMap = []
      this.addData.planActionGroup = this.addData.planActionGroup.filter((item, index) => {
        if (index === id) {
          return false
        } else {
          return true
        }
      })
      // this.addData.planActionGroup = Array
    },
    thisOk () {
      this.addData.planActionGroup.push([this.munKg, this.munZl])
      // let Array = this.addData.planActionGroup
      // this.addData.planActionGroup = Array
      console.log(this.addData.planActionGroup)
      console.log(this.addData.planActionGroup.length)
    },
    onValuesChange (picker, values) {
      this.munKg = values[0]
      this.munZl = values[1]
    },
    checknumber (String) {
      var reg = /^[0-9]+.?[0-9]*$/
      if (reg.test(String)) {
        return true
      }
      return false
    },
    getAction () {
      TrainAPI.baseActions({ id: this.id }, res => {
        let result = res[0]
        let action = []
        result.actionClassTypesDisplay = result.actionClassTypesDisplay.split(',')
        result.action = action
        this.actionDetail = result
        this.addData.actionClassType = this.actionDetail.actionClassTypes[0]
        this.addData.actionId = res[0].id
        this.addGrounp()
        this.addNewAction = res[0]
        console.log(this.addNewAction)
      })
    },
    addAction () {
      // 训练动作（个人）->添加训练
      TrainAPI.trainActionTimeAdd(this.addData, res => {
        Toast('添加动作成功')
        this.$router.push('/train-have-purchase')
      }, error => {
        Toast('请添加组数')
        console.log(error.errCode)
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
    },
    removeGroup (index) {
      if (this.group.length === 1) {
        Toast('至少添加一组动作')
        return
      }
      this.group.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
