<template>
    <div style="background: #313131;border-bottom: 1px solid #313131;">
      <div style="background: #262626;width: 95%;margin: 0 auto;border-radius: 1%;">
        <div class="progress">
          <div style="display: flex;">
            <div><img src="../../assets/images/somatotype/weightem.png" style="width: 0.35rem;margin-top: 0.35rem;"/></div>
            <div style="margin-left: 0.2rem;">体重(kg)</div>
          </div>
          <div class="btn-logo font-color" :style="'margin-left:' + (weight-5) + '%;' + 'background:' + weightColor">
            <div style="position: absolute;top: -0.25rem;font-size: 0.3rem;color: black;text-align:center;width: 0.9rem;">{{weightValue}}</div>
          </div>
          <div>
            <Progress :percent="weight" hide-info :stroke-color="weightColor"/>
          </div>
          <div class="progress-value">
            <div class="progress-div">过低</div>
            <div class="progress-div">{{trainValue.weight.lower}}</div>
            <div class="progress-div">正常</div>
            <div class="progress-div">{{trainValue.weight.upper}}</div>
            <div class="progress-div">过高</div>
          </div>
        </div>
        <div class="progress">
          <div style="display: flex;">
            <div><img src="../../assets/images/somatotype/ggj.png" style="width: 0.35rem;margin-top: 0.35rem;"/></div>
            <div style="margin-left: 0.2rem;">骨骼肌量(kg)</div>
          </div>
          <div class="btn-logo font-color" :style="'margin-left:' + (skeletal-5) + '%;' + 'background:' + skeletalMuscleColor">
            <div style="position: absolute;top: -0.25rem;font-size: 0.3rem;color: black;text-align:center;width: 0.9rem;">{{skeletalValue}}</div>
          </div>
          <div>
            <Progress :percent="skeletal" hide-info :stroke-color="skeletalMuscleColor"/>
          </div>
          <div class="progress-value">
            <div class="progress-div">过低</div>
            <div class="progress-div">{{trainValue.skeletalMuscle.lower}}</div>
            <div class="progress-div">正常</div>
            <div class="progress-div">{{trainValue.skeletalMuscle.upper}}</div>
            <div class="progress-div">过高</div>
          </div>
        </div>
        <div class="progress">
          <div style="display:flex;">
            <div><img src="../../assets/images/somatotype/tzl.png" style="width: 0.35rem;margin-top: 0.35rem;"/></div>
            <div style="margin-left: 0.2rem;">体脂率(%)</div>
          </div>
          <div class="btn-logo font-color" :style="'margin-left:' + (fat-5) + '%;' + 'background:' + fatColor">
            <div style="position: absolute;top: -0.25rem;font-size: 0.3rem;color: black;text-align:center;width: 0.9rem;">{{fatValue}}</div>
          </div>
          <div>
            <Progress :percent="fat" hide-info :stroke-color="fatColor"/>
          </div>
          <div class="progress-value">
            <div class="progress-div">过低</div>
            <div class="progress-div">{{trainValue.fatFreeMass.lower}}</div>
            <div class="progress-div">正常</div>
            <div class="progress-div">{{trainValue.fatFreeMass.upper}}</div>
            <div class="progress-div">过高</div>
          </div>
        </div>
        <div class="progress">
          <div style="display:flex;">
            <div><img src="../../assets/images/somatotype/yjb.png" style="width: 0.35rem;margin-top: 0.3rem;"/></div>
            <div style="margin-left: 0.2rem;">腰臀比</div>
          </div>
          <div class="btn-logo font-color" :style="'margin-left:' + (waist-5)+ '%;' + 'background:' + waistColor">
            <div style="position: absolute;top: -0.25rem;font-size: 0.3rem;color: black;text-align:center;width: 0.9rem;">{{waistValue}}</div>
          </div>
          <div>
            <Progress :percent="waist" hide-info :stroke-color="waistColor"/>
          </div>
          <div class="progress-value">
            <div class="progress-div">过低</div>
            <div class="progress-div">{{trainValue.waistHipRate.lower}}</div>
            <div class="progress-div">正常</div>
            <div class="progress-div">{{trainValue.waistHipRate.upper}}</div>
            <div class="progress-div">过高</div>
          </div>
        </div>
        <div class="progress">
          <div style="display: flex;">
            <div><img src="../../assets/images/somatotype/dxl.png" style="width: 0.4rem;margin-top: 0.3rem;"/></div>
            <div style="margin-left: 0.2rem;">基础代谢量（kcal/d）</div>
          </div>
            <div class="btn-logo font-color" style="width: 1rem;" :style="'margin-left:' + (metabolize-5) + '%;' + 'background:' + metabolizeColor">
              <div style="position: absolute;top: -0.25rem;font-size: 0.3rem;color: black;text-align:center;width: 1rem;">{{metabolizeValue}}</div>
            </div>
          <div>
            <Progress :percent="metabolize" hide-info :stroke-color="metabolizeColor"/>
          </div>
          <div class="progress-value">
            <div class="progress-div">过低</div>
            <div class="progress-div">{{parseInt(trainValue.basalMetabolicRate.lower)}}</div>
            <div class="progress-div">正常</div>
            <div class="progress-div">{{parseInt(trainValue.basalMetabolicRate.upper)}}</div>
            <div class="progress-div">过高</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import UserAPI from '../../service/user-api'
export default {
  name: 'progressBar',
  data () {
    return {
      trainValue: [],
      weight: 25, // 体重值
      skeletal: 35, // 骨骼肌值
      fat: null, // 体脂比
      waist: 15, // 腰间
      metabolize: 68, // 代谢
      weightValue: 25, // 体重值
      skeletalValue: 35, // 骨骼肌值
      fatValue: 45, // 体脂比值
      waistValue: 15, // 腰间值
      metabolizeValue: 68, // 代谢值
      fatColor: '',
      weightColor: '',
      skeletalMuscleColor: '',
      waistColor: '',
      metabolizeColor: ''
    }
  },
  props: {
    trainType: {
      type: String,
      default: function () {
        return null
      }
    }
  },
  mounted () {
    this.getLogs()
  },
  methods: {
    // 拿取数据
    getLogs () {
      UserAPI.getLog({}, res => {
        if (this.trainType === 'dimensional_magic' || this.trainType === 'dimensional') {
          this.trainValue = res.data
          this.fatValue = this.trainValue.fatFreeMass.value
          this.weightValue = this.trainValue.weight.value
          this.skeletalValue = this.trainValue.skeletalMuscle.value
          this.waistValue = this.trainValue.waistHipRate.value
          this.metabolizeValue = parseInt(this.trainValue.basalMetabolicRate.value)
          // this.getNum()
          if (this.trainValue.fatFreeMass.status === 1) {
            this.fat = 15
            this.fatColor = '#57C9FF'
          } else if (this.trainValue.fatFreeMass.status === 2) {
            this.fat = 50
            this.fatColor = '#F6BF3C'
          } else if (this.trainValue.fatFreeMass.status === 3) {
            this.fat = 90
            this.fatColor = '#FF3A43'
          }
          if (this.trainValue.weight.status === 1) {
            this.weight = 15
            this.weightColor = '#57C9FF'
          } else if (this.trainValue.weight.status === 2) {
            this.weight = 50
            this.weightColor = '#F6BF3C'
          } else if (this.trainValue.weight.status === 3) {
            this.weight = 90
            this.weightColor = '#FF3A43'
          }
          if (this.trainValue.skeletalMuscle.status === 1) {
            this.skeletal = 15
            this.skeletalMuscleColor = '#57C9FF'
          } else if (this.trainValue.skeletalMuscle.status === 2) {
            this.skeletal = 50
            this.skeletalMuscleColor = '#F6BF3C'
          } else if (this.trainValue.skeletalMuscle.status === 3) {
            this.skeletal = 90
            this.skeletalMuscleColor = '#FF3A43'
          }
          if (this.trainValue.waistHipRate.status === 1) {
            this.waist = 15
            this.waistColor = '#57C9FF'
          } else if (this.trainValue.waistHipRate.status === 2) {
            this.waist = 50
            this.waistColor = '#F6BF3C'
          } else if (this.trainValue.waistHipRate.status === 3) {
            this.waist = 90
            this.waistColor = '#FF3A43'
          }
          if (this.trainValue.basalMetabolicRate.status === 1) {
            this.metabolize = 15
            this.metabolizeColor = '#57C9FF'
          } else if (this.trainValue.basalMetabolicRate.status === 2) {
            this.metabolize = 50
            this.metabolizeColor = '#F6BF3C'
          } else if (this.trainValue.basalMetabolicRate.status === 3) {
            this.metabolize = 90
            this.metabolizeColor = '#FF3A43'
          }
        }
      })
    },
    getNum () {
      let section = this.trainValue.waistHipRate.upper - this.trainValue.waistHipRate.lower // 区间值
      let line = this.trainValue.waistHipRate.upper + section // 整条线长
      let value = this.trainValue.waistHipRate.lower - section // 起点值
      this.fat = value / line
      console.log(this.fat)
    }
  }
}
</script>

<style lang="less" scoped>
.font-color{
 color: black;
}
.progress{
  position: relative;
  height: 3rem;
  line-height: 1rem;
  margin-left: 0.2rem;
  margin-right: 0.1rem;
  color: white;
  font-size: 0.4rem;
  .progress-value{
    display: flex;
    font-size: 0.3rem;
    margin-bottom: 0.5rem;
    .progress-div{
      margin-left: 1rem;
      color: #8E8E8E;
    }
  }
  .btn-logo{
    position: absolute;
    top: 0.9rem;
    width: 0.9rem;
    height: 0.4rem;
    border-radius: 0.3rem;
    background: #FF3A43;
  }
}
</style>
