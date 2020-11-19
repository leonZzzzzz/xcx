<style lang="less" scoped>
@import "footer-tab.less";
</style>
<template>
  <div class="footer-tab">
    <mt-tabbar fixed>
      <mt-tab-item v-if="$route.name==='somatotype'">
        <img
          src="../../assets/images/common/btn-tx.png"
          style="width: 10rem;position: absolute;top: -0.8rem;left: 0rem;"
        />
        <img slot="icon" src="../../assets/images/common/somatotype_on.png" />
        <span style="color: #F6BF3C;">体型</span>
      </mt-tab-item>
      <mt-tab-item v-else @click.native="goPage('somatotype')">
        <img slot="icon" src="../../assets/images/common/somatotype.png" />
        体型
      </mt-tab-item>
      <mt-tab-item v-if="$route.name==='tack_out_goods'">
        <!--|| ($route.name !== 'personal-index'&& $route.name !== 'nutrition')-->
        <img
          src="../../assets/images/common/btn-yy.png"
          style="width: 10rem;position: absolute;top: -0.8rem;left: 0rem;"
        />
        <img slot="icon" src="../../assets/images/common/nutrition_on.png" />
        <span style="color: #F6BF3C;">营养</span>
      </mt-tab-item>
      <mt-tab-item v-else @click.native="goPage('tack_out_goods')">
        <img slot="icon" src="../../assets/images/common/nutrition.png" />
        营养
      </mt-tab-item>
      <mt-tab-item v-if="$route.name==='train-index'">
        <img
          src="../../assets/images/common/btn-xl.png"
          style="width: 10rem;position: absolute;top: -0.8rem;left: 0rem;"
        />
        <img slot="icon" src="../../assets/images/common/train.png" />
        <span style="color: #F6BF3C;">训练</span>
      </mt-tab-item>
      <mt-tab-item v-else @click.native="goPage('train-index')">
        <img slot="icon" src="../../assets/images/common/train_on.png" />
        训练
      </mt-tab-item>
      <mt-tab-item v-if="$route.name==='personal-index'">
        <img
          src="../../assets/images/common/btn-wd.png"
          style="width: 10rem;position: absolute;top: -0.8rem;left: 0rem;"
        />
        <img slot="icon" src="../../assets/images/common/my_on.png" />
        <span style="color: #F6BF3C;">我的</span>
      </mt-tab-item>
      <mt-tab-item v-else @click.native="goPage('personal-index')">
        <img slot="icon" src="../../assets/images/common/my.png" />
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  watch: {
  },
  beforeRouteLeave (to, from, next) {
    from.meta.keepAlive = false
    next()
  },
  methods: {
    goPage (pageName) {
      this.$router.push({ name: pageName })
      this.selected = pageName
    }
  }
}
</script>
