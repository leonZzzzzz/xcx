<template>
    <div class="evaluate-home">
      <div class="head-bar-to" @click="$router.go(-1)" style="background-color:#1C1C1C; color: white;">
        <div class="head-theme-b-left" >
          <img style="margin-top: 0.3rem;position: relative; left: 0.5rem; width: 0.25rem;" src="../../assets/images/common/left_icon_black_big.png"/>
        </div>
        <div class="pay">
          <div class="fs-5">评价</div>
        </div>
      </div>
      <div class="evaluate-nav">
        <div class="evaluate-star">
        </div>
      </div>
      <div class="btn">提交评价</div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
@import "evaluate";
</style>
