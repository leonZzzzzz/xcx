<template>
  <div class="canvas">
    <canvas :id="id" width="160" height="160" style="width:100px;height:100px;"></canvas>
  </div>
</template>

<script>
import GoodsAPI from '@/service/goods-api'
import Common from '../../mixins/common'
export default {
  mixins: [Common],
  data () {
    return {
      targetWeight: '40',
      ruleBehaviorType: 'KEEP_WEIGHT',
      num: 0,
      canvas: '',
      context: '',
      cirX: '',
      cirY: '',
      rad: '',
      n: 1,
      speed: 300,
      r: 38,
      cklToday: ''
    }
  },
  props: [
    'percent',
    'id'
  ],
  beforeCreate () {
  },
  mounted () {
    if (this.token) {
      // 减脂REDUCE_FAT|增肌GAIN_MUSCLE|保持KEEP_WEIGHT
      GoodsAPI.lessWeight({ }, res => {
        this.cklToday = res
        this.canvas = document.getElementById(this.id)
        this.context = this.canvas.getContext('2d')
        this.context.scale(2, 2)
        this.cirX = 40 //  this.canvas.width/ 2
        this.cirY = 40 //  this.canvas.height/ 2
        this.rad = Math.PI * 0.2 / 100
        this.DreamLoading()
      })
    }
  },
  methods: {
    // 绘制最外层细圈
    writeCircle () {
      this.context.save() //  save和restore可以保证样式属性只运用于该段canvas元素
      this.context.beginPath() // 开始路径
      this.context.strokeStyle = '#8E8E8E' //  设置边线的颜色
      this.context.lineWidth = 3.5
      this.context.arc(this.cirX, this.cirY, this.r, 0, Math.PI * 2, false) //  画一个圆的路径
      this.context.stroke() // 绘制边线
      this.context.closePath()
    },
    // 绘制文本
    writeText (n) {
      this.context.save()
      this.context.font = '15px Arial'
      this.context.fillStyle = '#F6BF3C' // 字体颜色
      this.context.fillText(this.cklToday, this.cirX - 18, this.cirY + 0) // 绘制实心
      this.context.fillText('kcal', this.cirX - 15, this.cirY + 15) // 绘制实心
      this.context.stroke()
      this.context.restore()
    },
    // 绘制蓝色外圈
    writeBlue (n) {
      this.context.save()
      this.context.strokeStyle = '#57C9FF'
      this.context.lineWidth = 5
      this.context.lineCap = 'round'
      this.context.beginPath()
      this.context.arc(this.cirX, this.cirY, this.r, -Math.PI / 2, -Math.PI / 2 + this.rad * n, false)
      this.context.stroke()
      this.context.restore()
    },
    DreamLoading () {
      // console.log(this.n)
      // // 清除所有，重新绘制
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.writeCircle()
      this.writeText(this.n)
      this.writeBlue(this.n)
      if (this.n <= this.percent) {
        this.n = this.n + 0.4
      } else {
        return 0
      }
      requestAnimationFrame(this.DreamLoading)
    }
  }
}
</script>

<style scoped>

</style>
