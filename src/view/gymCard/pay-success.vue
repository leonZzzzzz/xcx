<template>
    <div class="pay-success">
      <div class="head-bar head-theme-b">
        <div class="head-theme-b-left" @click="$router.go(-1)">
          <img style="margin-top: 0.1rem; width: 0.25rem;" src="../../assets/images/common/left_icon_black_big.png"/>
        </div>
        <div class="head-theme-b-center">
          <div class="fs-5" style="color:#FFFFFF;">支付完成</div>
        </div>
        <div slot="right" class="head-theme-b-right">
        </div>
      </div>
      <div class="bug-success">
        <div class="bug-img">
          <img src="../../assets/images/common/zfcg.png"/>
        </div>
        <div class="bug-cg" style="color: white;font-size: 0.45rem;margin-top: 0.2rem;">支付成功</div>
      </div>
      <div class="bug-sm" style="background-color:#262626;margin-top: 0.5rem;height: 2.5rem; color:#c7c1c1;">
        <span style="margin-left: 0.5rem;margin-top: 0.2rem;">说明介绍：您已成成功购买计划卡，请务必准时参加哦！</span>
      </div>
      <div class="bug-btn" style="margin-top: 0.3rem;height: 1rem; background-color: #F6BF3C;width: 95%;margin-left: 0.25rem;text-align: center;line-height: 1rem;font-size: 0.35rem;border-radius: 0.1rem;" @click="$router.push('/train-index')">去训练</div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
@import "pay-success";
</style>
