<template>
    <div class="assess-header">
      <div class="header" @click="$router.go(-1)" style="background-color: #1C1C1C;">
        <img src="../../assets/images/common/left_icon_black_big.png" @click="$router.go(-1)" style="width: 0.25rem;"/>
        <div class="details-title" style="color: white;font-weight: lighter">评价</div>
      </div>
      <div style="height: 100%;background-color: #313131">
        <ul style="width: 100%;background-color: #313131;margin:0px; padding:0px;">
          <li class="assess-nav" v-for="(item,index) in foodList.detailList" :key="index.id">
            <div class="assess-pic">
              <img :src="item.foodImage" style="width: 1.6rem;"/><span style="margin-left: 0.3rem;position: relative;top: -0.5rem;font-size: 0.4rem;">{{item.foodName}}</span>
            </div>
            <div style="height: 0.02rem;width: 95%;margin: 0 auto;background-color: #8E8E8E;"></div>
            <div class="assess-wd">
              <span>味道</span>
              <div>
                <Rate v-model="item.vitaminB1" @on-change="XingMun" style="position: relative;top: -0.2rem;left: 0.5rem;"/>
              </div>
            </div>
            <div class="assess-pj">
              <span style="width: 1rem;">评价</span>
              <textarea cols="35" rows="5" style="margin-left: 0.5rem;background-color: #313131; outline: none;color:white;" v-model="item.kcal" @blur.prevent="concat(item.id,index)"></textarea>
            </div>
<!--            <div style="margin-top: 0.3rem;height: 0.8rem;width: 2rem;background-color: #F6BF3C;color: black;text-align: center;border-radius: 0.2rem;line-height: 0.8rem;position: absolute;right: 0.3rem;" @click="concat(item.id,index)" v-if="item.vitaminE">确定</div>-->
          </li>
            <div class="assess-btn" @click="assessUser()">提交评价</div>
        </ul>
      </div>
    </div>
</template>

<script>
import HttpAPI from '../../service/user-api'
import { downloadUrl } from '../../libs/http-api'
export default {
  data () {
    return {
      value: true,
      value1: true,
      value2: true,
      list: [1, 2, 3, 4, 5],
      starA: require('../../assets/images/common/ypl.png'),
      starB: require('../../assets/images/common/wpl.png'),
      xing: null,
      mun: 5,
      goodsFoodIds: '',
      userId: '',
      grade: '5',
      evaluate: '',
      foodList: [],
      orderFoodId: '',
      isbool: true,
      goodsFoodEvaluate: []
    }
  },
  created () {
    this.goodsFoodIds = this.$route.query.dteils
    HttpAPI.userMessage({}, res => {
      this.userId = res.memberId
    })
    HttpAPI.bugfood({ id: this.goodsFoodIds }, res => {
      let foodLists = res
      for (let i = 0; i < foodLists.detailList.length; i++) {
        foodLists.detailList[i].foodImage = downloadUrl + foodLists.detailList[i].foodImage
      }
      this.foodList = foodLists
    })
  },
  methods: {
    XingMun (xing) {
      this.xing = xing
      console.log(xing)
    },
    concat (id, index) {
      this.foodList.detailList[index].vitaminB1 = this.xing
      let grade = this.foodList.detailList[index].vitaminB1
      let evaluate = this.foodList.detailList[index].kcal
      let foodId = this.foodList.detailList[index].foodId
      this.goodsFoodEvaluate.push({ goodsFoodId: foodId, grade: grade, evaluate: evaluate })
      this.foodList.detailList[index].vitaminE = false
    },
    // 评论接口
    assessUser () {
      HttpAPI.assessUser({ orderFoodId: this.foodList.id, goodsFoodEvaluate: this.goodsFoodEvaluate }, res => {
        this.$router.push('/myOrder')
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "assess.less";
</style>
