<style lang="less" scoped>
  @import "stamina-test-sueccess";
</style>
<template>
    <div class="stamina-test-sueccess">
      <div class="head-bar head-theme-b">
        <div class="head-theme-b-left">
          <i class="icon-image icon-back" @click="$router.go(-1)"></i>
        </div>
        <div class="head-theme-b-center">
          <div class="fs-5">体测完成</div>
        </div>
        <div class="head-theme-b-right">
        </div>
      </div>
      <div class="pt-45 box-content-stamina">
        <div class="cell-item">
          <div class="title">身高（cm）</div>
          <div class="content">176</div>
        </div>
        <div class="cell-item">
          <div class="title">体重（kg）</div>
          <div class="content">75</div>
        </div>
        <div class="cell-item">
          <div class="title">肌肉量（kg）</div>
          <div class="content">9</div>
        </div>
        <div class="cell-item">
          <div class="title">脂肪（kg）</div>
          <div class="content">6</div>
        </div>
      </div>
      <div class="foot-botton" @click="$router.push('buy-gym-card')">前往购买计划卡</div>
    </div>
</template>

<script>
export default {
  name: 'stamina-test-sueccess'
}
</script>

<style scoped>

</style>
