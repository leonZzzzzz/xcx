<style lang="less">
  @import "buy-gym-card";
</style>
<template>
  <div class="buy-gym-card">
    <div class="head-bar head-theme-b">
      <div class="head-theme-b-left">
        <i class="icon-image icon-back" @click="$router.go(-1)"></i>
      </div>
      <div class="head-theme-b-center">
        <div class="fs-5">购买计划卡</div>
      </div>
      <div slot="right" class="head-theme-b-right">
      </div>
    </div>
    <div class="pt-45 box-content-buy-gym">
      <div class="data-line">
        <div class="data-line-background">
        </div>
        <div class="data-line-explain">
          <div class="move-explain">移动<img src="../../assets/original-images/blue-point.png" alt="">到理想位置，即可生成计划卡</div>
          <div class="select">
            <div class="select-button">社区</div>
            <div class="select-button">塑性</div>
            <div class="select-button">减肥</div>
            <div class="select-button">最近体测</div>
          </div>
        </div>
      </div>
      <div class="gym-card">
        <div class="gym-car-title">请选择计划卡</div>
        <div class="gym-car-category">
          <div :class="{'selected':select === 'Severe'}" @click="choiceSevere">重度训练</div>
          <div :class="{'selected':select === 'Moderate'}" @click="choiceModerate">中度训练</div>
          <div :class="{'selected':select === 'Light'}" @click="choiceLight">轻度训练</div>
        </div>
        <div class="cycle">
          <table>
            <tr>
              <td></td>
              <td>星期日</td>
              <td>星期一</td>
              <td>星期二</td>
              <td>星期三</td>
              <td>星期四</td>
              <td>星期五</td>
              <td>星期六</td>
            </tr>
            <tr>
              <td>
                早
              </td>
              <td>
                <img src="../../assets/original-images/drinks.png" alt="">
                <img src="../../assets/original-images/barbell.png" alt="">
              </td>
              <td>
                <img src="../../assets/original-images/drinks.png" alt="">
              </td>
              <td>
                <img src="../../assets/original-images/barbell.png" alt="">
              </td>
              <td>
                <img src="../../assets/original-images/drinks.png" alt="">
              </td>
              <td>
                <img src="../../assets/original-images/drinks.png" alt="">
              </td>
              <td>
                <img src="../../assets/original-images/barbell.png" alt="">
              </td>
              <td>
                <img src="../../assets/original-images/drinks.png" alt="">
              </td>
            </tr>
            <tr>
              <td>
                中
              </td>
              <td>
                <img src="../../assets/original-images/drinks.png" alt="">
                <img src="../../assets/original-images/barbell.png" alt="">
              </td>
              <td>
                <img src="../../assets/original-images/drinks.png" alt="">
              </td>
              <td>
                <img src="../../assets/original-images/barbell.png" alt="">
              </td>
              <td>
                <img src="../../assets/original-images/drinks.png" alt="">
              </td>
              <td>
                <img src="../../assets/original-images/drinks.png" alt="">
              </td>
              <td>
                <img src="../../assets/original-images/barbell.png" alt="">
              </td>
              <td>
                <img src="../../assets/original-images/drinks.png" alt="">
              </td>
            </tr>
            <tr>
              <td>
                晚
              </td>
              <td>
                <img src="../../assets/original-images/drinks.png" alt="">
                <img src="../../assets/original-images/barbell.png" alt="">
              </td>
              <td>
                <img src="../../assets/original-images/drinks.png" alt="">
              </td>
              <td>
                <img src="../../assets/original-images/barbell.png" alt="">
              </td>
              <td>
                <img src="../../assets/original-images/drinks.png" alt="">
              </td>
              <td>
                <img src="../../assets/original-images/drinks.png" alt="">
              </td>
              <td>
                <img src="../../assets/original-images/barbell.png" alt="">
              </td>
              <td>
                <img src="../../assets/original-images/drinks.png" alt="">
              </td>
            </tr>
          </table>
        </div>
        <div class="gym-card-rule">
          <p>必须按照训练计划进行强度训练，如果训练计划日不到场训练，系统仍然扣除当日训练次数。</p>
          <p>训练计划：购买成功后进入"安排计划"界面制定自己的训练计划，提交计划后不能修改。</p>
        </div>
        <div class="gym-card-time">
          预计达成目标需要34天
        </div>
        <div class="order-detail">
          <div class="order-title">订单内容</div>
          <div class="order-rows">
            <div class="row-name">训练次数：</div>
            <div class="row-number">25</div>
          </div>
          <div class="order-rows">
            <div class="row-name">免费私教次数：</div>
            <div class="row-number">5</div>
          </div>
          <div class="order-rows">
            <div class="row-name" style="color: #FF0000">金额：</div>
            <div class="row-number total-number">￥ 1500</div>
          </div>
        </div>
        <div class="order-explain">
          <p>说明：免费私教需要根据训练次数来激活，每训练5次激活1次免费私教。免费私教次数可提前使用。</p>
          <p>34天后，未使用的训练次数和未使用的已激活的免费私教次数可申请退款。已使用的未激活的免费私教则需要扣除相关费用</p>
        </div>
        <div class="foot-botton" @click="gotoConfirmOrder">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
// import TrainAPI from '@/service/train-api'
export default {
  name: 'buy-gym-card',
  data () {
    return {
      select: 'Severe'
    }
  },
  mounted () {
    this.getCardList()
  },
  methods: {
    choiceSevere () {
      this.select = 'Severe'
    },
    choiceModerate () {
      this.select = 'Moderate'
    },
    choiceLight () {
      this.select = 'Light'
    },
    gotoConfirmOrder () {
      this.$router.push({
        path: 'confirm-order'
      })
    },
    getCardList () {
      // TrainAPI.getCardList({})
    }
  }
}
</script>

<style scoped>

</style>
