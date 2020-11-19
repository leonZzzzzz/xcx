<template>
    <div>
      <div class="circle">
        <canvas-circle v-for="(item,index) in cicleList" :key="index" :percent="cklToday" :id="index"></canvas-circle>
      </div>
    </div>
</template>

<script>
import canvasCircle from '../canvas-home/canvas-home'
export default {
  components: {
    canvasCircle
  },
  props: {
  },
  data () {
    return {
      targetWeight: '90',
      ruleBehaviorType: 'REDUCE_FAT',
      msg: 'Welcome to Your Vue.js App',
      val: false,
      url: '',
      cicleList: [{
        ratio: '12'
      }],
      cklToday: '270'
    }
  }
}
</script>

<style scoped>

</style>
