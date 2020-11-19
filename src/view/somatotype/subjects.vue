<template>
  <div class="subject-header">
    <div class="subject-nav">
      <div class="subject-img" v-if="trainType === 'dimensional_magic' || tag === '1' || trainType === 'dimensional'">
        <div @click="getFat">
          <img class="bigImg-height" src="../../assets/images/somatotype/yxjz.png" v-if="fat === '0'"/>
          <img class="img-height" src="../../assets/images/somatotype/njz.png" v-else/>
        </div>
        <div style="padding-left: 0.3rem;" @click="getSustainability">
          <img class="bigImg-height" src="../../assets/images/somatotype/yxcxh.png" v-if="sustainability === '0'"/>
          <img class="img-height" src="../../assets/images/somatotype/ncxh.png" v-else/>
        </div>
        <div style="padding-left: 0.3rem;" @click="getMuscle">
          <img class="bigImg-height" src="../../assets/images/somatotype/yxzj.png" v-if="muscle === '0'"/>
          <img class="img-height" src="../../assets/images/somatotype/nzj.png" v-else/>
        </div>
      </div>
      <div class="subject-img" v-else>
        <div  v-if="ruleBehaviorType === 'REDUCE_FAT'">
          <img class="bigImg-height" src="../../assets/images/somatotype/yxjz.png"/>
          <!--<img class="img-height" src="../../assets/images/somatotype/njz.png" v-else/>-->
        </div>
        <div style="padding-left: 0.3rem;" v-if="ruleBehaviorType === 'KEEP_WEIGHT'">
          <img class="bigImg-height" src="../../assets/images/somatotype/yxcxh.png"/>
          <!--<img class="img-height" src="../../assets/images/somatotype/ncxh.png" v-else/>-->
        </div>
        <div style="padding-left: 0.3rem;" v-if="ruleBehaviorType === 'GAIN_MUSCLE'">
          <img class="bigImg-height" src="../../assets/images/somatotype/yxzj.png"/>
          <!--<img class="img-height" src="../../assets/images/somatotype/nzj.png" v-else/>-->
        </div>
      </div>
      <div class="subject-font">
        <div style="margin-top: 0.7rem;">目标{{valueName}}<span v-if="ruleBehaviorType === 'KEEP_WEIGHT'">为</span><span v-else>至</span></div>
        <div class="subject-input" style="height: 1.15rem;margin-left: 0.1rem;" v-if="weight">{{value}}</div>
        <div v-else><input type="number" class="subject-input" v-model="targetValue" :placeholder="value" @input="getWeightVuale"/></div>
        <div v-if="ruleBehaviorType === 'REDUCE_FAT' && typeId === '1'" style="margin-top: 0.65rem;">%</div>
        <div v-else style="margin-top: 0.65rem;">kg</div>
      </div>
      <div class="subject-nav-font">
          <div style="margin-top: 0.7rem;">推荐:</div>
        <div v-if="ruleBehaviorType === 'REDUCE_FAT' && typeId === '1'">
          1、为了更好的看到效果，推荐目标{{valueName}}
          <span v-if="ruleBehaviorType === 'KEEP_WEIGHT'">为</span>
          <span v-else>至</span>
          <span class="font-nav-color">{{weightValue}}</span>%;</div>
          <div v-else>1、为了更好的看到效果，推荐目标{{valueName}}
            <span v-if="ruleBehaviorType === 'KEEP_WEIGHT'">为</span>
            <span v-else>至</span>
            <span class="font-nav-color">{{weightValue}}</span>kg;</div>
          <div>2、使用健身卡<span class="font-nav-color">{{cardDay}}</span>个月;</div>
          <div>3、每周训练一个循环（即胸背腿肩四个部位各一天）;</div>
          <div>4、每日摄入<span class="font-nav-color">{{kacl}}</span>kcal食物;</div>
      </div>
      <div class="btn-foot" v-if="trainType === 'dimensional_magic' || trainType === 'dimensional'">
        <div class="btn" @click="getClean" v-if="clean">重新设置目标</div>
        <div class="btn" @click="getValue" v-else>确定</div>
        <!--<div class="btn" style="background: #8E8E8E" v-if="clean === false">确定</div>-->
      </div>
    </div>
  </div>
</template>

<script>
import UserAPI from '../../service/user-api'
import { Log } from '@lemon/euler-app-h5/src/libs/euler-mint-ui'
export default {
  name: 'subjects',
  data () {
    return {
      typeId: '1',
      tag: '',
      isMaght: false,
      clean: true,
      name: '',
      height: '',
      fat: '1',
      sustainability: '1',
      muscle: '1',
      weight: true,
      valueName: '体重',
      ruleBehaviorType: '', // REDUCE_FAT GAIN_MUSCLE KEEP_WEIGHT
      targetValue: null,
      value: '', // 目标减去的值
      weightValue: '', //  体重
      cardDay: '', // 卡的天数
      kacl: '' // 日kcal
    }
  },
  props: {
    trainType: {
      type: String,
      default: function () {
        return null
      }
    },
    fats: {
      type: null,
      default: function () {
        return null
      }
    },
    skaMuscle: {
      type: null,
      default: function () {
        return null
      }
    },
    maintain: {
      type: null,
      default: function () {
        return null
      }
    }
  },
  watch: {
    'ruleBehaviorType' () {
      this.value = ''
      this.getWeightVuale()
    }
  },
  mounted () {
    if (this.trainType === 'dimensional_magic' || this.trainType === 'dimensional') {
      this.getWeightVuale()
      this.getFat()
    } else {
      this.ruleBehaviorType = ''
      this.getWeightVuale()
    }
  },
  methods: {
    getValue () {
      if (this.ruleBehaviorType === 'REDUCE_FAT') {
        if (this.fats < this.value) {
          Log.error('减脂不能大于体脂率')
          this.targetValue = null
        } else {
          this.getMy()
        }
      } else if (this.ruleBehaviorType === 'GAIN_MUSCLE') {
        if (this.skaMuscle > this.value) {
          Log.error('增肌不能小于当前骨骼肌量')
          this.targetValue = null
        } else {
          this.getMy()
        }
      } else if (this.ruleBehaviorType === 'KEEP_WEIGHT') {
        this.getMy()
      }
    },
    getMy () {
      let data = {
        needMonthNumber: this.cardDay,
        ruleBehaviorType: this.ruleBehaviorType,
        targetValue: this.targetValue,
        targetKcal: this.kacl,
        recommendValue: this.weightValue
      }
      UserAPI.customEdit(data, res => {
        this.clean = true
        this.weight = true
        this.tag = '2'
      }, error => {
        console.log(error)
        this.targetValue = null
      })
    },
    getFat () {
      if (this.tag === '1') {
        this.fat = '0'
        this.muscle = '1'
        this.sustainability = '1'
        this.ruleBehaviorType = 'REDUCE_FAT'
        this.weight = false
        this.targetValue = null
        if (this.trainType === 'magic') {
          this.valueName = '体重减'
          this.name = '体重减'
          this.typeId = '2'
        } else {
          this.valueName = '体脂减'
          this.name = '体脂率'
        }
      }
    },
    getSustainability () {
      if (this.tag === '1') {
        this.sustainability = '0'
        this.muscle = '1'
        this.fat = '1'
        this.valueName = '体重保持'
        this.ruleBehaviorType = 'KEEP_WEIGHT'
        this.name = '体重'
        this.weight = true
        this.targetValue = null
      }
    },
    getMuscle () {
      if (this.tag === '1') {
        this.muscle = '0'
        this.sustainability = '1'
        this.fat = '1'
        this.valueName = '骨骼肌增'
        this.ruleBehaviorType = 'GAIN_MUSCLE'
        this.name = '骨骼肌量'
        this.weight = false
        this.targetValue = null
      }
    },
    getClean () {
      UserAPI.getClear({}, res => {
        this.weight = false
        this.clean = false
        this.tag = '1'
        if (this.ruleBehaviorType === 'KEEP_WEIGHT') {
          this.weight = true
        }
      })
    },
    getWeightVuale () {
      UserAPI.getValue({ ruleBehaviorType: this.ruleBehaviorType, targetValue: this.targetValue }, res => {
        this.value = res.targetValue
        this.weightValue = res.recommendValue
        this.cardDay = res.needMonthNumber
        this.kacl = res.targetKcal
        this.height = res.height
        this.ruleBehaviorType = res.ruleBehaviorType
        if (this.ruleBehaviorType === 'REDUCE_FAT') {
          this.fat = '0'
          this.name = '体脂率'
          if (this.trainType === 'magic') {
            this.valueName = '体重减'
            this.typeId = '2'
          } else {
            this.valueName = '体脂减'
          }
        } else if (this.ruleBehaviorType === 'KEEP_WEIGHT') {
          this.sustainability = '0'
          this.name = '体重'
          this.valueName = '体重保持'
          this.targetValue = this.maintain
          this.value = this.maintain
        } else if (this.ruleBehaviorType === 'GAIN_MUSCLE') {
          this.muscle = '0'
          this.name = '骨骼肌量'
          this.valueName = '骨骼肌增'
        }
        this.$emit('on-set', this.weightValue, this.height, this.name, this.value, this.ruleBehaviorType)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.font-nav-color{
  color: #F6BF3C;
}
.bigImg-height{
  height: 1.4rem;
}
.img-height{
 height: 1.3rem;
 border: 1px dashed white;
}
.subject-header{
  background: #313131;
  width: 100%;
  /*height: 43%;*/
  border-top: 1px solid #313131;
  border-bottom: 1px solid #313131;
  .subject-nav{
    padding: 5%;
    background: #262626;
    width: 95%;
    height: 98%;
    margin: 0 auto;
    border-radius: 2%;
    .subject-img{
      display: flex;
      justify-content: center;
    }
    .subject-font{
      color: #FFFFFF;
      display: flex;
      font-size: 0.4rem;
      justify-content: center;
      .subject-input{
        width: 1.5rem;
        background: #262626;
        outline:none;
        border: 0;
        font-size: 0.8rem;
        color: #F6BF3C;
        border-bottom: 1px solid white;
        text-align: center;
        margin-left: 0.1rem;
        margin-top: 0.1rem;
      }
    }
    .subject-nav-font{
      color: white;
      font-size: 0.34rem;
      overflow: hidden;
    }
    .btn-foot{
      margin-top: 0.8rem;
      .btn{
        background: #F6BF3C;
        width: 50%;
        margin:  0 auto;
        color: #000000;
        font-size: 0.45rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        border-radius: 1rem;
      }
    }
  }
}
</style>
