<template>
  <div style="position: absolute;top: 3.1rem;z-index: 3;padding-left: 0.7rem;">
    <img src="../../assets/images/somatotype/man.png" style="height: 7.1rem;"/>
    <div style="width: 2.2rem;height: 0.4rem;position: absolute;top: 1.7rem;" @click="getbust"></div>
    <div style="width: 1.2rem;height: 0.4rem;position: absolute;top: 2.6rem;left: 0.6rem;" @click="getwaist"></div>
    <div style="width: 1.5rem;height: 0.4rem;position: absolute;top: 3.4rem;left: 0.5rem;" @click="gethip"></div>
    <div style="width: 0.7rem;height: 0.4rem;position: absolute;top: 2.2rem;" @click="getleftUpperArm"></div>
    <div style="width: 0.7rem;height: 0.4rem;position: absolute;top: 2.2rem;left: 1.7rem;" @click="getrightUpperArm"></div>
    <div style="width: 1rem;height: 0.4rem;position: absolute;top: 4.6rem;left: 0.25rem;" @click="getleftThigh"></div>
    <div style="width: 1rem;height: 0.4rem;position: absolute;top: 4.6rem;left: 1.2rem;" @click="getrightThigh"></div>
    <div style="width: 0.8rem;height: 0.4rem;position: absolute;top: 5.8rem;left: 0.4rem;" @click="getleftCalf"></div>
    <div style="width: 0.8rem;height: 0.4rem;position: absolute;top: 5.8rem;left: 1.3rem;" @click="getrightCalf"></div>
  </div>
</template>

<script>
import UserAPI from '../../service/user-api'
export default {
  name: 'man2D',
  data () {
    return {
      logs: [],
      newValue: '',
      oldValue: '',
      name: ''
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
  methods: {
    // 拿取数据
    getLogs () {
      UserAPI.getLog({}, res => {
        this.logs = res.data
        console.log(this.logs.measureGirthData.bust)
        this.getbust()
      })
    },
    getbust () {
      this.name = '胸围'
      this.newValue = this.logs.measureGirthData.bust
      this.$emit('on-ment', this.newValue, this.oldValue, this.name)
    },
    gethip () {
      this.name = '臀围'
      this.newValue = this.logs.measureGirthData.hip
      this.$emit('on-ment', this.newValue, this.oldValue, this.name)
    },
    getleftCalf () {
      this.name = '右小腿围'
      this.newValue = this.logs.measureGirthData.leftCalf
      this.$emit('on-ment', this.newValue, this.oldValue, this.name)
    },
    getleftThigh () {
      this.name = '右大腿围'
      this.newValue = this.logs.measureGirthData.leftThigh
      this.$emit('on-ment', this.newValue, this.oldValue, this.name)
    },
    getleftUpperArm () {
      this.name = '右上臂围'
      this.newValue = this.logs.measureGirthData.leftUpperArm
      this.$emit('on-ment', this.newValue, this.oldValue, this.name)
    },
    getrightCalf () {
      this.name = '左小腿围'
      this.newValue = this.logs.measureGirthData.rightCalf
      this.$emit('on-ment', this.newValue, this.oldValue, this.name)
    },
    getrightThigh () {
      this.name = '左大腿围'
      this.newValue = this.logs.measureGirthData.rightThigh
      this.$emit('on-ment', this.newValue, this.oldValue, this.name)
    },
    getrightUpperArm () {
      this.name = '左上臂围'
      this.newValue = this.logs.measureGirthData.rightUpperArm
      this.$emit('on-ment', this.newValue, this.oldValue, this.name)
    },
    getwaist () {
      this.name = '腰围'
      this.newValue = this.logs.measureGirthData.waist
      this.$emit('on-ment', this.newValue, this.oldValue, this.name)
    }
  },
  mounted () {
    if (this.trainType === 'dimensional_magic' || this.trainType === 'dimensional') {
      this.getLogs()
    }
  }
}
</script>

<style scoped>

</style>
