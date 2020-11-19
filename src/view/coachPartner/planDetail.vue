<template>
  <div class="plan-header">
    <div class="head-bar-to">
      <div class="head-theme-b-left" @click="$router.go(-1)">
        <img style="position: relative; left: 0.5rem; width: 0.25rem;" src="../../assets/images/common/left_icon_black_big.png"/>
      </div>
      <div class="">
        <div class="fs-5" style="font-weight: lighter" v-if="trainStrength === 'SEVERE'">重度训练</div>
        <div class="fs-5" style="font-weight: lighter" v-if="trainStrength === 'MODERATE'">中度训练</div>
        <div class="fs-5" style="font-weight: lighter" v-if="trainStrength === 'SEVERE'">轻度训练</div>
      </div>
    </div>
    <div style="margin-top: 0.5rem;width: 3.2rem;height: 0.9rem;background-color: white;border-radius: 0.2rem;margin-left: 0.5rem;text-align: center;line-height: 0.9rem;font-size: 0.4rem;">周训练计划</div>
    <div style="display: flex;">
      <ul style="height: 100%">
        <li v-for="(item,index) in transIndex" :key="item.id">
          <div style="height: 1rem;width: 0.02rem;background-color: #8E8E8E;margin-left: 1.2rem;"></div>
          <div style="height: 1.5rem;width: 1.5rem;margin-left: 0.5rem;border-radius: 1rem;border: 1px solid #8E8E8E;text-align: center;line-height: 1.4rem;color: #8E8E8E;font-size: 0.4rem;"><span>{{index}}</span></div>
        </li>
      </ul>
      <ul>
        <li v-for="item in 7" :key="item.id" style="margin-top: 0.55rem;">
          <div style="width: 7rem;height: 2rem;background-color: #262626;"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import HttpAPI from '../../service/user-api'
export default {
  data () {
    return {
      orderList: [],
      limit: 999,
      trainStrength: '',
      transIndex: {}
    }
  },
  methods: {
  },
  mounted () {
    this.transIndex = { '星期日': 1, '星期一': 2, '星期二': 3, '星期三': 4, '星期四': 5, '星期五': 6, '星期六': 7 }
  },
  created () {
    HttpAPI.userMessage({}, res => {
      this.memberId = res.memberId
    })
    HttpAPI.getWeekList({ userId: this.memberId }, res => {
      for (let i = 0; i < res.rows.length; i++) {
        this.orderList = res.rows
        this.trainStrength = res.rows[0].detailList[0].trainStrength
      }
    })
  }
}
</script>

<style lang="less" scoped>
@import "planDetail";
</style>
