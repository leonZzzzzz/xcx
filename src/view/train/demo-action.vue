<style lang="less" scoped>
  @import "demo-action";
</style>
<template>
    <div class="demo-action">
      <div class="head-bar head-theme-b">
        <div class="head-bar head-theme-b">
          <div class="head-theme-b-left">
            <i class="icon-image icon-back" @click="$router.go(-1)"></i>
          </div>
          <div class="head-theme-b-center">
            <div class="fs-5">标准动作示范</div>
          </div>
          <div slot="right" class="head-theme-b-right">
          </div>
        </div>
      </div>
      <div class="pt-44 box-content">
        <div class="coupon-item">
          <div class="coupon-icon" >
            <div class="money">
              <span class="spanbei"><img src="../../assets/original-images/active-1.png" alt=""></span>
            </div>
          </div>
          <div class="notice-center">
            <div class="notice-title">{{actionDetail.name}}</div>
            <div class="notice-text">{{actionDetail.actionClassTypesDisplay}}</div>
          </div>
        </div>
        <div class="action-gif">
          <img src="../../assets/original-images/actin-gif.gif" alt="">
        </div>
      </div>
    </div>
</template>

<script>
import TrainAPI from '../../service/train-api'
export default {
  name: 'demo-action',
  data () {
    return {
      id: '',
      actionDetail: ''
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getAction(this.id)
  },
  methods: {
    getAction (id) {
      TrainAPI.baseActions({ id: id }, res => {
        let result = res[0]
        this.actionDetail = result
      })
    }
  }
}
</script>

<style scoped>

</style>
