<template>
    <div class="ChioseSex">
      <div v-if="isA" style="height: 100%;background-color: #313131">
        <div class="header" >
          <header>你的性别</header>
        </div>
        <div>
          <img src="../../assets/images/common/girts.png"  style="width: 3rem; margin-top: 3rem;margin-left: 3.5rem;" @click="getSexWOMAN('WOMAN')" :class="{'name': isNow}"/>
          <div style="width: 100%;text-align: center;margin-top: 0.2rem;font-size: 0.45rem;color: white;">女生</div>
        </div>
        <div>
          <img src="../../assets/images/common/boy.png" style="width: 3rem;margin-top: 3rem;margin-left: 3.5rem;" @click="getSexMAN('MAN')" :class="{'name': isTure}"/>
          <div style="width: 100%;text-align: center;margin-top: 0.2rem;font-size: 0.45rem;color: white;">男生</div>
        </div>
        <div style="width: 100%;margin-top: 2rem;color: black;">
          <div style="width: 3rem;margin: 0 auto;background-color: #F6BF3C;height: 0.8rem;text-align: center;line-height: 0.8rem;border-radius: 0.5rem;" @click="get()">下一步</div>
        </div>
      </div>
      <div v-if="isB" style="height: 100%;background-color: #313131">
        <div class="header" >
          <header>你的体重</header>
        </div>
        <div v-if="isNow">
          <img src="../../assets/images/common/girts.png"  style="width: 3rem; margin-top: 6rem;margin-left: 3.5rem;" @click="getSexWOMAN('WOMAN')"/>
          <div style="width: 100%;text-align: center;margin-top: 0.2rem;font-size: 0.45rem;color: white;">女生</div>
        </div>
        <div v-if="isTure">
          <img src="../../assets/images/common/boy.png" style="width: 3rem;margin-top: 6rem;margin-left: 3.5rem;" @click="getSexMAN('MAN')"/>
          <div style="width: 100%;text-align: center;margin-top: 0.2rem;font-size: 0.45rem;color: white;">男生</div>
        </div>
        <div style="width: 5rem;height: 3.5rem;background-color: #1C1C1C;margin-left: 2.5rem;position: relative;top: 1.5rem;border-radius: 0.3rem;display: flex;overflow: hidden">
          <div style="margin-top: 0.95rem;margin-left: 0.3rem;">
            <img src="../../assets/images/somatotype/weight.png" style="width: 1.8rem;">
          </div>
          <div style="height: 0.5rem;" v-if="sex === 'MAN'">
            <mt-picker class="pickers" :slots="slots" @change="onValuesChange" style="position:relative;top: -0.63rem;left: 0.2rem;" @itemHeight="30"></mt-picker>
          </div>
          <div style="height: 0.5rem;" v-if="sex === 'WOMAN'">
            <mt-picker class="pickers" :slots="slots1" @change="onValuesChange" style="position:relative;top: -0.63rem;left: 0.2rem;" @itemHeight="30"></mt-picker>
          </div>
          <div style="margin-left: 0.5rem;margin-top: 1.45rem;color: white;font-size: 0.5rem;">kg</div>
        </div>
        <div style="width: 100%;margin-top: 3rem;color: black;">
          <div style="width: 3rem;margin: 0 auto;background-color: #F6BF3C;height: 0.8rem;text-align: center;line-height: 0.8rem;border-radius: 0.5rem;" @click="getHome()">确定</div>
        </div>
      </div>
    </div>
</template>

<script>
import OpenAPI from '../../service/open-api'
import { Toast } from 'mint-ui'
import $ from 'jQuery'
import { initBlockMemberInfo } from '../../store/extend-util'
export default {
  data () {
    return {
      sex: '',
      isNow: false,
      isTure: false,
      isA: true,
      isB: false,
      slots: [
        {
          flex: 3,
          // values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150],
          values: [],
          defaultIndex: 34,
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      slots1: [
        {
          flex: 3,
          // values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150],
          values: [],
          defaultIndex: 19,
          className: 'slot2',
          textAlign: 'center'
        }
      ],
      num: [],
      weight: null
    }
  },
  watch: {
    // isB () {
    //   if (this.isB) {
    //     if (this.sex) {
    //       this.$nextTick(() => {
    //         $('.picker-item').css('width', '1.6rem')
    //         $('.picker-item.picker-selected').css({ 'color': '#FABD00', 'font-size': '0.7rem' })
    //       })
    //     }
    //   }
    // }
    // isB () {
    //   if (this.isB) {
    //     if (this.sex) {
    //       this.$nextTick(() => {
    //         $('.picker-item').css('width', '1.6rem')
    //         $('.picker-item.picker-selected').css({ 'color': '#F08000', 'font-size': '0.6rem' })
    //       })
    //     }
    //   }
    // }
  },
  mounted () {
    for (let i = 31; i <= 150; i++) {
      this.slots1[0].values.push(i)
    }
    for (let i = 31; i <= 150; i++) {
      this.slots[0].values.push(i)
    }
  },
  methods: {
    onValuesChange (picker, values) {
      this.$nextTick(() => {
        $('.picker-item').css({ 'color': '#707274', 'font-size': '18px' })
        $('.picker-item.picker-selected').css({ 'color': '#F08000', 'font-size': '0.6rem' })
      })
      picker.setSlotValue(5, values[56])
      this.weight = values[0]
    },
    getSexWOMAN (sex) {
      this.sex = sex
      this.isNow = true
      this.isTure = false
    },
    getSexMAN (sex) {
      this.sex = sex
      this.isNow = false
      this.isTure = true
    },
    get () {
      if (this.sex !== '') {
        OpenAPI.detailsUpdateInfo({ sex: this.sex }, res => {
          this.isA = false
          this.isB = true
        })
      } else {
        Toast('请先选择性别')
      }
    },
    getHome () {
      OpenAPI.weightUpdateInfo({ weight: this.weight }, res => {
        initBlockMemberInfo(() => {
          this.$router.go(-1)
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .picker-item {
    padding: 0 25px
  }
  .picker-selecteds {
    color: #F08000!important;
    font-size: 0.6rem!important;
    -webkit-transform: translate3d(0, 0, 0) rotateX(0);
    transform: translate3d(0, 0, 0) rotateX(0);
  }
  .name {
    width: 4rem;
    margin-top: 3rem;
    margin-left: 3.5rem;
    border: 3px solid #F6BF3C;
    border-radius: 50%;
  }
  .ChioseSex{
    background-color: #313131;
    height: 100%;
    width: 100%;
    .header{
      background-color: #1B1B1B;
      height: 1.5rem;
      width: 100%;
      text-align: center;
      line-height: 1.8rem;
      font-size: 0.5rem;
      color: white;
      position: fixed;
      z-index: 99999;
    }
}
</style>
