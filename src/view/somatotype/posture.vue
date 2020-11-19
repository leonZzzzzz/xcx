<template>
    <div style="height: 100%;width: 100%;background: #313131">
      <div style="background: #262626;width: 95%;margin: 0 auto;color: #F2F2F2;font-size: 0.45rem;padding: 0.5rem;border-radius: 0.2rem;">
        <div>长短腿测量（cm）</div>
        <div style="display: flex;justify-content: space-between;padding: 0.2rem">
          <div>
            <div style="text-align: center">{{posture.leftLeg}}</div>
            <div class="font-colors">左腿长</div>
          </div>
          <div>
            <div style="text-align: center">{{posture.rightLeg}}</div>
            <div class="font-colors">右腿长</div>
          </div>
          <div>
            <div style="text-align: center" :class="isA?'font-yes':'font-now'">{{posture.leftLeg - posture.rightLeg}}</div>
            <div class="font-colors">偏离</div>
          </div>
        </div>
      <div style="height: 0.03rem;width: 95%;margin: 0 auto;background: #8E8E8E;margin: 0.3rem;"></div>
      <div>
        <div>头前引测量（cm）</div>
        <div style="display: flex;justify-content: space-between;padding: 0.2rem">
          <div>
            <div style="text-align: center">{{posture.cavumConchae}}</div>
            <div class="font-colors">耳甲腔</div>
          </div>
          <div>
            <div style="text-align: center">{{posture.acromionReference}}</div>
            <div class="font-colors">肩峰基准</div>
          </div>
          <div>
            <div style="text-align: center" :class="isB?'font-yes':'font-now'">{{posture.cavumConchae - posture.acromionReference}}</div>
            <div class="font-colors">偏离</div>
          </div>
        </div>
      </div>
      <div style="height: 0.03rem;width: 95%;margin: 0 auto;background: #8E8E8E;margin: 0.3rem;"></div>
      <div>
        <div>盆骨前/后倾测量（cm）</div>
        <div style="display: flex;justify-content: space-between;padding: 0.2rem">
          <div>
            <div style="text-align: center">{{posture.hipJoint}}</div>
            <div class="font-colors">髋关节</div>
          </div>
          <div>
            <div style="text-align: center">{{posture.acromionReference}}</div>
            <div class="font-colors">肩峰基准</div>
          </div>
          <div>
            <div style="text-align: center" :class="isC?'font-yes':'font-now'">{{posture.hipJoint - posture.acromionReference}}</div>
            <div class="font-colors">偏离</div>
          </div>
        </div>
      </div>
      <div style="height: 0.03rem;width: 95%;margin: 0 auto;background: #8E8E8E;margin: 0.3rem;"></div>
      <div>
        <div>圆肩测量（cm）</div>
        <div style="display: flex;justify-content: space-between;padding: 0.2rem">
          <div>
            <div style="text-align: center">{{posture.shoulderMidpoint}}</div>
            <div class="font-colors">肩中点</div>
          </div>
          <div>
            <div style="text-align: center">{{posture.acromionReference}}</div>
            <div class="font-colors">肩峰基准</div>
          </div>
          <div>
            <div style="text-align: center" :class="isD?'font-yes':'font-now'">{{posture.shoulderMidpoint - posture.acromionReference}}</div>
            <div class="font-colors">偏离</div>
          </div>
        </div>
      </div>
      <div style="height: 0.03rem;width: 95%;margin: 0 auto;background: #8E8E8E;margin: 0.3rem;"></div>
      <div>
        <div>高低肩测量（cm）</div>
        <div style="display: flex;justify-content: space-between;padding: 0.2rem">
          <div>
            <div style="text-align: center">{{posture.leftShoulder}}</div>
            <div class="font-colors">左肩高</div>
          </div>
          <div>
            <div style="text-align: center">{{posture.rightShoulder}}</div>
            <div class="font-colors">右肩高</div>
          </div>
          <div>
            <div style="text-align: center" :class="isE?'font-yes':'font-now'">{{posture.leftShoulder - posture.rightShoulder}}</div>
            <div class="font-colors">偏离</div>
          </div>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
import UserAPI from '../../service/user-api'
export default {
  data () {
    return {
      isA: true,
      isB: true,
      isC: true,
      isD: true,
      isE: true,
      posture: []
    }
  },
  mounted () {
    this.getPosture()
  },
  methods: {
    // 拿取体态
    getPosture () {
      UserAPI.getPosture({}, res => {
        this.posture = res
        if ((this.posture.leftLeg - this.posture.rightLeg) > 0) {
          this.isA = false
        }
        if ((this.posture.cavumConchae - this.posture.acromionReference) > 0) {
          this.isA = false
        }
        if ((this.posture.hipJoint - this.posture.acromionReference) > 0) {
          this.isA = false
        }
        if ((this.posture.shoulderMidpoint - this.posture.acromionReference) > 0) {
          this.isA = false
        }
        if ((this.posture.leftShoulder - this.posture.rightShoulder) > 0) {
          this.isA = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .font-colors{
    font-size: 0.3rem;
  }
  .font-now{
    color: #57C9FF;
  }
  .font-yes{
    color: #FF3A43;
  }
</style>
