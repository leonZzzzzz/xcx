<template>
  <div class="add-partner">
    <div class="head-bar-to">
      <div class="head-theme-b-left" @click="$router.go(-1)">
        <img style="position: relative; left: 0.5rem; width: 0.25rem;" src="../../assets/images/common/left_icon_black_big.png"/>
      </div>
      <div class="">
        <div class="fs-5">加入搭档</div>
      </div>
    </div>
    <div class="add-partner-info">
      <div class="add-header">
        <img src="../../assets/images/common/head_sculpture.jpg" style="width: 1.5rem;height: 1.5rem;border-radius: 50%"/>
        <div>Make Chen</div>
        <div class="add-info">
          <div>LV.9</div>
          <div>程序员</div>
        </div>
      </div>
      <div class="link-x"></div>
      <div class="add-time">
        <div class="time">
          <span>训练时间</span>
          <span>2018-07-24 19:00~21:00</span>
        </div>
        <div class="plan">
          <span>训练计划</span>
          <span>胸部</span>
        </div>
        <div class="link-x"></div>
        <div class="num">
          <span>我的训练次数</span>
          <span>25</span>
        </div>
        <div class="private-num">
          <span>我的私教次数</span>
          <span>15</span>
        </div>
        <div class="link-x"></div>
        <div>
          <span>本次扣除训练次数</span>
          <span>-1</span>
        </div>
        <div>
          <span>本次扣除私教次数</span>
          <span>-0</span>
        </div>
      </div>
    </div>
    <div class="btn">确认加入</div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
@import "add-partner.less";
</style>
