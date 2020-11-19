<style lang="stylus" rel="stylesheet/stylus">
@import "tack-out.styl"
</style>

<template>
<div>
  <keep-alive>
    <router-view :seller="seller"></router-view>
  </keep-alive>
</div>

</template>

<script>
import data from '../data'
export default {
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this.seller = data.seller
  },
  components: {
  }
}

</script>
