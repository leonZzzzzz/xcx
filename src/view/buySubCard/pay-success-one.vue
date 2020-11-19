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
      <div class="bug-btn"  @click="$router.push('/train-index')">
        <img src="../../assets/images/common/sh.png" style="width: 2.5rem;margin-top: 2rem;margin-left: 3.7rem;"/>
        <div style="margin-left: 3.9rem;margin-top: 0.2rem;color: white;font-size: 0.4rem;">拿手环训练</div>
      </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
@import "pay-success-one";
</style>
