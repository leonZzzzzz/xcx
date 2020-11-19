<template>
    <div style="position: absolute;top: 3.8rem;width: 4.5rem; height: 1.5rem;background-color:#262626;display: flex; ">
      <div style="margin-left: 0.3rem;margin-top: 0.2rem;" @click="passNum(1)">
        <img src="../../assets/images/common/bei.png" style="width: 0.5rem;"/>
        <div>背部</div>
      </div>
      <div style="margin-left: 0.3rem;margin-top: 0.2rem;" @click="passNum(2)">
        <img  src="../../assets/images/common/jr.png" style="width: 0.5rem;"/>
        <div>胸部</div>
      </div>
      <div style="margin-left: 0.3rem;margin-top: 0.2rem;" @click="passNum(3)">
        <img src="../../assets/images/common/yt.png" style="width: 0.45rem;"/>
        <div>腿部</div>
      </div>
      <div style="margin-left: 0.3rem;margin-top: 0.2rem;" @click="passNum(4)">
        <img src="../../assets/images/common/zb.png" style="width: 0.35rem;"/>
        <div>手部</div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    planKeyProp: {
      type: String,
      default: function () {
        return ''
      }
    }
  },
  watch: {
  },
  methods: {
    passNum (id) {
      this.$emit('on-id', id, this.planKeyProp)
    }
  }
}
</script>

<style scoped>

</style>
