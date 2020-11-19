<template>
    <div class="Bracelet">
      <div class="head-bar-to">
        <div class="head-theme-b-left" @click="getOccupy1">
          <img style="position: relative; left: 0.5rem; width: 0.25rem;" src="../../assets/images/common/left_icon_black_big.png"/>
        </div>
        <div class="">
          <div class="fs-5" style="font-weight: lighter">选择储物柜-{{sex}}</div>
        </div>
      </div>
      <div class="Bracelet-nav-time">
        <span>今天:</span>
        <span>{{today}}</span>
      </div>
      <div class="Bracelet-bread-cabinet">
        <div class="cabinet">
          <div class="bread-btn">
            <div class="zfx"></div>
            <div class="zfz-size">闲置</div>
          </div>
          <div class="bread-btn">
            <div class="zfx" style="background-color: #FF3A43"></div>
            <div class="zfz-size">占用</div>
          </div>
          <div class="bread-btn">
            <div class="zfx" style="background-color: #F6BF3C"></div>
            <div class="zfz-size">已选</div>
          </div>
        </div>
        <div class="cabinet-sex">
          <div class="girl" v-if="boyCabinet">
            <div class="nav-girl" v-for=" (item, index) in list" :key="index.id" @click="getOccupy(item.cabinetNo,index)" :class="item.deleteStatus?'backgroudColor':(item.createTime?'backgroudColorOccupy':'backgroud')">
              {{index + 1}}
            </div>
          </div>
          <div class="boy" v-if="girlCabinet">
            <div class="nav-boy" v-for=" (items, index1) in list" :key="index1.id" @click="getOccupy(items.cabinetNo,index1)" :class="items.deleteStatus?'backgroudColor':(items.createTime?'backgroudColorOccupy':'backgroud')">
              {{index1 + 1}}
            </div>
          </div>
        </div>
      </div>
      <div class="btn" @click="getAddBound" v-if="isHave">生成二维码（拿手环）</div>
      <div class="btn" @click="getBoundBox" v-else>归还手环</div>
      <div v-if="popupVisible">
        <mt-popup v-model="popupVisible" class="popup">
          <div style="margin-left: 8.2rem;margin-top: 0.2rem;" @click="closeQr">✖</div>
          <div style="width: 100%">
            <div style="width: 2rem;margin: 0 auto;text-align: center;font-size: 1rem;color: #F6BF3C;">{{numCabinet}}</div>
            <div style="width: 2rem;margin: 0 auto;text-align: center;font-size: 0.45rem;">柜子编号</div>
          </div>
          <VueQr
            :colorDark="qrcode.colorDark"
            :text="qrcode.codeValue"
            :margin="qrcode.margin"
            :dotScale="qrcode.dotScale"
            :correctLevel="qrcode.correctLevel"
            :logoScale="qrcode.logoScale" class="qr-pic">
          </VueQr>
          <div style="position: absolute;top: 8.5rem;width: 100%;text-align: center;font-size: 0.45rem;">请把二维码对准扫码机</div>
        </mt-popup>
      </div>
    </div>
</template>
<!--eyJ0eXBlIjoiZm9vZCIsInRleHQiOiIxOTQwOTQ5NDk0NTk4MjQ2NDExMDAwMjAifQ==-->
<script>
import openAPI from '../../service/open-api'
import userAPI from '../../service/user-api'
import VueQr from 'vue-qr'
// let Base64 = require('js-base64').Base64
// import { Toast } from 'mint-ui'
export default {
  components: { VueQr },
  data () {
    return {
      popupVisible: false,
      isHave: true,
      qrcode: {
        correctLevel: 0, // 容错 0-3
        codeValue: '',
        margin: 10, // 二维码边上间隙
        dotScale: 0.5, // 二维码实点大小
        logoScale: 0.3 // LOGO大小
      },
      sex: '',
      today: '',
      userInfo: [],
      boyCabinet: false,
      girlCabinet: true,
      cabinetType: '',
      occupyColor: false,
      CabinetColor: false,
      index: null,
      cancle: 'cancle',
      list: [],
      number: null,
      numCabinet: null,
      deleteStatus: [],
      numString: ''
    }
  },
  watch: {
    number () {
      this.getCabinet()
    }
  },
  mounted () {
    for (let i = 0; i < 24; i++) {
      this.deleteStatus.push(false)
    }
  },
  methods: {
    closeQr () {
      this.popupVisible = false
      this.getCabinet()
    },
    // 生成二维码
    getFood () {
      this.popupVisible = true
      // var QRCode = this.numString
      // var QRCodeJSON = JSON.stringify(QRCode)
      // QRCodeJSON = Base64.encode(QRCode)
      this.qrcode.codeValue = this.numString
    },
    getTime () {
      setInterval(() => {
        // new Date() new一个data对象，当前日期和时间
        // toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
        this.today = new Date().toLocaleString()
      }, 1000)
    },
    getUserInfo () {
      openAPI.userInfoMember({}, res => {
        this.userInfo = res
        if (this.userInfo.sex === 'MAN') {
          this.sex = '黄柜'
          this.boyCabinet = true
          this.girlCabinet = false
          this.cabinetType = 'BRACELET_BOY'
          this.getCabinet()
        } else if (this.userInfo.sex === 'WOMAN') {
          this.sex = '绿柜'
          this.boyCabinet = false
          this.girlCabinet = true
          this.cabinetType = 'BRACELET_GIRL'
          this.getCabinet()
        }
      })
    },
    getCabinet () {
      userAPI.getCabinetList({ limit: 999, offset: 0 }, res => {
        this.list = res.rows.reverse()
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].status === 'UNUSED') {
            this.list[i].deleteStatus = false
            this.list[i].createTime = false
          } else if (this.list[i].status === 'OCCUPY' && this.list[i].userId === this.userInfo.id) {
            this.list[i].deleteStatus = true
            this.isHave = false
            this.index = this.list[i].cabinetNo
            this.numCabinet = this.list[i].id
          } else if (this.list.status === 'OCCUPY') {
            this.list[i].createTime = true
          }
        }
        this.list[this.number].deleteStatus = true
      })
    },
    getOccupy (index, num) {
      this.index = index
      this.number = num
      this.numCabinet = num + 1
      console.log(this.numCabinet)
    },
    getOccupy1 () {
      this.$router.push('/train-index')
    },
    getAddBound () {
      userAPI.getCabinetOccupy({ cabinetNo: this.index, number: 1 }, res => {
        this.numString = res
        this.getFood()
      }, error => {
        this.popupVisible = false
        console.log(error)
      })
    },
    getBoundBox () {
      userAPI.getCabinetOccupy({ cabinetNo: this.index, number: 0 }, res => {
        this.numString = res
        this.getFood()
      }, error => {
        this.popupVisible = false
        console.log(error)
      })
    }
  },
  created () {
    this.getCabinet()
    this.getTime()
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
@import "braceletCabinet";
.backgroudColor{
  background-color: #F6BF3C;
  border: 1px solid #F6BF3C;
  width: 1.8rem;
  height: 4rem;
  text-align: center;
  line-height: 4rem;
  font-size: 0.45rem;
  margin-left: 0.17rem;
  margin-top: 0.1rem;
}
.backgroudColorOccupy{
  background-color: #FF3A43;
  border: 1px solid #FF3A43;
  width: 1.8rem;
  height: 4rem;
  text-align: center;
  line-height: 4rem;
  font-size: 0.45rem;
  margin-left: 0.17rem;
  margin-top: 0.1rem;
}
.backgroud{
  background-color: #313131;
  border: 1px solid #313131;
  width: 1.8rem;
  height: 4rem;
  text-align: center;
  line-height: 4rem;
  font-size: 0.45rem;
  margin-left: 0.17rem;
  margin-top: 0.1rem;
}
.popup{
  /*position: relative;*/
  width: 88%;
  height: 9.8rem;
  background: #313131;
  color: #FFFFFF;
}
.qr-pic{
  position: absolute;
  top: 3rem;
  margin-left: 1.8rem;
}
</style>
