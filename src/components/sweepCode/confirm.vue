<template>
    <div class="header-default">
      <img src="../../assets/images/train/log.png" style="width: 2rem;height: 2rem;margin-top: 30%;margin-left: 40%"/>
      <div style="margin-left: 43.5%;color: white">洋格运动</div>
        <div style="position: absolute;bottom: 1.5rem;border: 1px solid #F6BF3C;color: white;margin-left: 35%;width: 3rem;text-align: center;height:0.8rem;line-height: 0.8rem;" @click="confime">确定登录</div>
      <div style="position: absolute;bottom: 0.3rem;color: white;margin-left: 35%;width: 3rem;text-align: center;height:0.8rem;line-height: 0.8rem;" @click="$router.go(-1)">取消登录</div>
    </div>
</template>

<script>
import HttpAPI from '../../service/user-api'
export default {
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    confime () {
      var channelId = this.$route.query.channelId
      HttpAPI.getPlanScan({ channelId: channelId }, res => {
        this.$router.go(-1)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.header-default{
  height: 100%;
  width: 100%;
  background-size: cover;
  background-color: #313131;
}
</style>
