<template>
  <div class="accounts-header">
    <div class="nav">
      <div class="accounts-nav">
        <div class="car-btn" :class="{'btn-car': isNow === '1'}" @click="getYear">年卡</div>
        <div class="car-btn" :class="{'btn-car': isNow === '2'}" @click="getMon">月卡</div>
        <div class="car-btn" :class="{'btn-car': isNow === '3'}" @click="getDay">次卡</div>
      </div>
      <div class="accounts-sun">
        <div>
          合计：
          <span style="color:#FF3A43;font-size: .7rem;">￥{{price}}</span>
        </div>
      </div>
      <div style="display: flex;margin-top: 1rem;font-size: 0.35rem;" @click="isYes = !isYes">
        <div style="position: absolute;" v-if="isYes">
          <img src="../../assets/images/somatotype/gg.png" width="13" />
        </div>
        <div style="border: 1px solid gainsboro;width: 0.4rem;height: 0.4rem;"></div>
        <div style="color: #FFFFFF;margin-left: 0.2rem;">
          我已阅读并同意
          <a style="color: #F6BF3C">购买说明</a>
        </div>
      </div>
      <div class="btn-foot">
        <div class="btn" v-if="isYes" @click="getMoney">去支付</div>
        <div class="btn-now" v-else>去支付</div>
      </div>
    </div>
  </div>
</template>

<script>
import UserAPI from '../../service/user-api'
export default {
  name: 'accounts',
  data () {
    return {
      isNow: '1',
      isYes: false,
      card: 'PLAN_YEAR',
      price: '',
      id: ''
    }
  },
  mounted () {
    this.getIsHave()
  },
  methods: {
    // 判断是否已经购买卡
    getIsHave () {
      UserAPI.isHaveCard({}, res => {
        if (!res) {
          this.getCreate()
        }
      })
    },
    getCreate () {
      UserAPI.palnCreate({ cardType: this.card }, res => {
        this.price = res.price
        this.id = res.id
      })
    },
    getYear () {
      this.isNow = '1'
      this.card = 'PLAN_YEAR'
      this.getCreate()
    },
    getMon () {
      this.isNow = '2'
      this.card = 'PLAN_MONTH'
      this.getCreate()
    },
    getDay () {
      this.isNow = '3'
      this.card = 'TIME'
      this.getCreate()
    },
    getMoney () {
      UserAPI.palnMoney({ id: this.id }, res => {
        this.$router.push({
          path: '/confirm-order',
          query: {
            orderID: res.id
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.btn-car {
  width: 2.5rem;
  height: 1rem;
  border: 1px solid #f6bf3c;
  text-align: center;
  margin: 0.3rem;
  line-height: 1rem;
  font-size: 0.45rem;
  color: black;
  border-radius: 0.2rem;
  background: #f6bf3c;
}
.accounts-header {
  height: 55%;
  background: #313131;
  width: 100%;
  border-top: 1px solid #313131;
  margin-bottom: 1.5rem;
  .nav {
    padding: 5%;
    background: #262626;
    width: 95%;
    height: 90%;
    margin: 0 auto;
    border-radius: 2%;
    .accounts-nav {
      background: #262626;
      width: 95%;
      margin: 0 auto;
      border-radius: 2%;
      display: flex;
      justify-content: center;
      color: #f6bf3c;
      .car-btn {
        width: 2.3rem;
        height: 1rem;
        border: 1px solid #f6bf3c;
        text-align: center;
        margin: 0.3rem;
        line-height: 1rem;
        font-size: 0.45rem;
        border-radius: 0.2rem;
      }
    }
    .accounts-sun {
      text-align: center;
      color: #ffffff;
      font-size: 0.4rem;
      margin-top: 0.5rem;
    }
    .btn-foot {
      margin-top: 0.8rem;
      .btn {
        background: #f6bf3c;
        width: 80%;
        margin: 0 auto;
        color: #000000;
        font-size: 0.45rem;
        height: 1.3rem;
        line-height: 1.3rem;
        text-align: center;
        border-radius: 1rem;
      }
      .btn-now {
        background: #8e8e8e;
        width: 80%;
        margin: 0 auto;
        color: #000000;
        font-size: 0.45rem;
        height: 1.3rem;
        line-height: 1.3rem;
        text-align: center;
        border-radius: 1rem;
      }
    }
  }
}
</style>
