<template>
   <div class="header-home">
     <div class="head-bar-to" @click="$router.go(-1)" style="position: fixed;">
       <div class="head-theme-b-left">
         <img style="margin-top: 0.3rem;position: relative; left: 0.5rem; width: 0.25rem;" src="../../assets/images/common/left_icon_black_big.png"/>
       </div>
       <div class="friend">
         <div class="fs-5">朋友圈</div>
       </div>
     </div>
     <div class="pic">
       <!--<ul pic-ul>-->
         <!--<li>-->
           <!--<img src="../../assets/images/common/pic-one.png" style="width: 4.3rem;"/>-->
         <!--</li>-->
         <!--<li>-->
           <!--<img src="../../assets/images/common/pic-tress.png" style="width: 4.3rem;"/>-->
         <!--</li>-->
         <!--<li>-->
           <!--<img src="../../assets/images/common/pic-tress.png" style="width: 4.3rem;"/>-->
         <!--</li>-->
       <!--</ul>-->
       <span><img src="../../assets/images/common/pic-one.png" style="width: 4.3rem;"/></span>
       <span><img src="../../assets/images/common/pic-one.png" style="width: 4.3rem;"/></span>
       <span><img src="../../assets/images/common/pic-one.png" style="width: 4.3rem;"/></span>
       <span><img src="../../assets/images/common/pic-one.png" style="width: 4.3rem;"/></span>
       <span><img src="../../assets/images/common/pic-one.png" style="width: 4.3rem;"/></span>
       <span><img src="../../assets/images/common/pic-one.png" style="width: 4.3rem;"/></span>
       <span><img src="../../assets/images/common/pic-one.png" style="width: 4.3rem;"/></span>
       <span><img src="../../assets/images/common/pic-one.png" style="width: 4.3rem;"/></span>
     </div>
   </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
@import "share.less";
</style>
