<template>
    <div class="drawplay-home">
      <header>
        <img src="../../assets/images/common/left_icon_black_big.png" @click="$router.go(-1)"/>
        <div class="title">安排计划</div>
      </header>
      <div class="card">
        <img src="../../assets/images/common/goldcard.png">
        <div class="card-buy">
          <div class="title-add">广州扬格健身中心</div>
          <div class="link-y"></div>
          <div class="link-y"></div>
          <!--<div class="link-y"></div>-->
          <div class="title-card">计划卡(强度训练)</div>
          <div class="title-use">*此卡仅限个人使用</div>
        </div>
      </div>
      <div class="content">
        <div class="card-content">订单内容：</div>
        <div class="card-num">训练次数：<span>25</span></div>
        <div class="card-time">私教次数：<span>5</span></div>
        <div class="link-y"></div>
        <div class="card-money">金额：<span>￥2000</span></div>
      </div>
      <div class="sum">
        <div class="preferential"></div>
        <div class="total">洋格豆</div>
      </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
@import "drawplan";
</style>
