<template>
 <div class="bulk-header">
   <mt-navbar class="bulk" v-model="selectedBulk" style="position: relative;top: 0rem;z-index: 2;width: 100%;">
     <mt-tab-item id="1">胸部(<span>{{5}}</span>)</mt-tab-item>
     <mt-tab-item id="2">背部(0)</mt-tab-item>
     <mt-tab-item id="3">腿部(0)</mt-tab-item>
     <mt-tab-item id="4">肩部(0)</mt-tab-item>
   </mt-navbar>
   <div class="bulk-nav">
     <div style="padding-top: 50%;margin-left: 4.5rem;" v-if="jiaZaiOne">
       <mt-spinner type="triple-bounce"></mt-spinner>
     </div>
     <mt-tab-container v-model="selectedBulk" v-if="jiaZaiTwo">
       <mt-tab-container-item id="1" class="bulk-x">
         <div class="bulk-coach">
           <ul>
             <li v-for="(item,index) in userList.rows" :key="index">
               <!--<div class="bulk-coach">-->
                 <img src="../../assets/images/common/bulk-pic-one.jpg" style="width:100%;" @click="join(item.userId,index)"/>
                 <div class="bulk-name">
                 <div v-if="item.courseType === 'PT'" @click="join(item.userId,index)">教练：{{item.userNickName}}</div>
                 <div v-if="item.courseType === 'CP'" @click="join(item.userId,index)">发起人：{{item.userNickName}}</div>
                 <div class="btn" @click="joinItCoach(item.userId,index)">加入</div>
                 <div v-if="item.courseType === 'CP'" @click="join(item.userId,index)" ><span>性别：{{item.userSex}}</span><span style="margin-left: 0.4rem;">等级：Lv.2</span></div>
                 <div @click="join(item.userId,index)">训练时间：{{item.courseTimes[0]}}</div>
                 <div @click="join(item.userId,index)">训练内容：{{item.courseInfo}}</div>
                 </div>
             </li>
           </ul>
         </div>
       </mt-tab-container-item>
     </mt-tab-container>
   </div>
 </div>
</template>

<script>
import TrainAPI from '../../service/train-api'
export default {
  data () {
    return {
      selectedBulk: '1',
      userList: [],
      mun: '',
      jiaZaiOne: true,
      jiaZaiTwo: false
    }
  },
  created () {
    let _this = this
    setTimeout(function () {
      _this.jiaZaiTwo = true
      _this.jiaZaiOne = false
    }, 500)
    this.getUserList()
  },
  methods: {
    getUserList () {
      // 健身课程->列表
      TrainAPI.UserList({}, res => {
        this.userList = res
      })
    },
    join (id, index) {
      let mun = this.userList.rows
      console.log(mun)
      if (mun[index].courseType === 'PT') {
        this.$router.push({
          path: '/coach_home',
          query: {
            id: id
          }
        })
      } else {
        this.$router.push({
          path: '/partner_home',
          query: {
            id: id
          }
        })
      }
    },
    joinItCoach (id, index) {
      // 课程报名->加入课程\
      let mun = this.userList.rows
      console.log(mun)
      if (mun[index].courseType === 'CP') {
        this.$router.push({
          path: '/intoPartner_home',
          query: {
            userId: id
          }
        })
      } else {
        this.$router.push({
          path: '/intoCoach_home',
          query: {
            userId: id
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "health-home";
</style>
