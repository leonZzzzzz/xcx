<template>
  <div class="address-home">
    <Header :title="title"></Header>
    <div class="content-box" :class="popupVisible? 'popupVisible' : ''">
      <ul class="cell-box">
        <li class="cell">
          <span class="cell-title" style="padding-right: .374rem">收货人：</span>
          <input class="input-style" type="text" v-model="realName" placeholder="您的姓名"/>
        </li>
        <li class="cell">
          <span class="cell-title">联系电话：</span>
          <input class="input-style" type="tel" v-model="mobile" placeholder="您的电话号码"/>
        </li>
        <li class="cell" @click="getAreaList(false)">
          <span class="cell-title">所在地区：</span>
          <span class="cell-text">{{area}}</span>
        </li>
        <li class="cell" style="align-items: flex-start;height: 3rem">
          <span class="cell-title" style="padding-top: .4rem">详细地址：</span>
          <textarea class="textarea-style" placeholder="请输入您的详细地址" v-model="areaInfo"></textarea>
        </li>
      </ul>
      <div class="switch-bth">
        <span class="switch-text">设置为默认地址</span>
        <mt-switch class="button" v-model="value"></mt-switch>
      </div>
      <div class="bth" @click="update()">保存</div>
    </div>
    <mt-popup v-model="popupVisible" position="bottom" :closeOnClickModal="false" class="popup-area">
      <div class="popup-top-absolute">
        <div class="area-title">
          <!--<span class="bth-style" @click="popupVisible = false">确定</span>-->
          <span class="title-text">{{areaTitle}}</span>
          <!--<span class="bth-style"></span>-->
        </div>
        <div class="area-info-box">
          <span>已选择：</span>
          <span class="area-info" @click="getAreaList(true)">{{provinceName}}</span>
          <span>{{cityName}}</span>
        </div>
      </div>
      <div class="popup-area-container">
        <div class="container-cell" v-for="item in areaList" :key="item.id" @click="getAreaInfo(item)" :class="provinceName===item.name||cityName===item.name? 'text-color-on':''">{{item.name}}</div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import HttpAPI from '../../service/user-api'
import OpenAPI from '../../service/open-api'
import Header from '../../components/header/header'
import Common from '../../mixins/common'
import $ from 'jQuery'
export default {
  components: {
    Header
  },
  mixins: [Common],
  data () {
    return {
      type: null, // add、edit
      addressInfo: {
        areaCodeDisplay: []
      }, // 编辑的信息
      title: null,
      value: true,
      mobile: '',
      realName: '',
      areaInfo: '',
      tag: '',
      area: '您所在的地区',
      popupVisible: false,
      areaTitle: null,
      areaList: [],
      parentId: null,
      provinceName: '',
      cityName: '',
      cityAreaCode: null,
      addressForm: {
        area: ''
      }
    }
  },
  watch: {
    popupVisible () {
      if (!this.popupVisible) {
        this.closeVModal()
      }
    }
  },
  methods: {
    closeVModal () {
      $('.v-modal').css('display', 'none')
    },
    getAreaList (boolean) {
      if (boolean) {
        this.areaTitle = '请选择省份'
        this.cityName = ''
      }
      this.areaList = []
      if (this.areaTitle === '请选择省份') {
        OpenAPI.getAreaInfo({ parentId: 1 }, res => {
          this.areaList = res
          this.popupVisible = true
        })
      } else if (this.areaTitle === '请选择城市') {
        OpenAPI.getAreaInfo({ parentId: this.parentId }, res => {
          this.areaList = res
          this.popupVisible = true
        })
      }
    },
    getAreaInfo (item) {
      if (this.areaTitle === '请选择省份') {
        this.provinceName = item.name
        this.parentId = item.id
        this.cityName = ''
        this.cityAreaCode = null
        this.areaTitle = '请选择城市'
        this.getAreaList()
      } else if (this.areaTitle === '请选择城市') {
        this.cityName = item.name
        this.cityAreaCode = item.code
        this.area = this.provinceName + ' ' + item.name
        this.popupVisible = false
      }
    },
    update () {
      if (this.type === 'add') {
        HttpAPI.addAddress({
          isDefault: this.value,
          mobile: this.mobile,
          realName: this.realName,
          areaInfo: this.areaInfo,
          areaCode: this.cityAreaCode
        }, res => {
          this.$router.go(-1)
        })
      } else if (this.type === 'edit') {
        HttpAPI.updateAddress({
          id: this.addressInfo.id,
          isDefault: this.value,
          mobile: this.mobile,
          realName: this.realName,
          areaInfo: this.areaInfo,
          areaCode: this.cityAreaCode
        }, res => {
          this.$router.go(-1)
        })
      }
    }
  },
  mounted () {
  },
  created () {
    this.type = this.$route.query.type
    if (this.type === 'add') {
      this.title = '添加收货地址'
      this.areaTitle = '请选择省份'
    } else if (this.type === 'edit') {
      this.title = '编辑收货地址'
      this.areaTitle = '请选择城市'
    }
    if (this.$route.query.addressInfo) {
      this.addressInfo = this.$route.query.addressInfo
      // console.log(this.addressInfo)
      this.realName = this.addressInfo.realName
      this.mobile = this.addressInfo.mobile
      this.value = this.addressInfo.isDefault
      this.areaInfo = this.addressInfo.areaInfo
      this.area = this.addressInfo.areaName
      this.provinceName = this.addressInfo.areaCodeDisplay[0].name
      this.cityName = this.addressInfo.areaCodeDisplay[1].name
      this.parentId = this.addressInfo.areaCodeDisplay[0].id
      this.cityAreaCode = this.addressInfo.areaCodeDisplay[1].code
    }
  }
}
</script>

<style lang="less" scoped>
  @import "reviswaddress-home";
</style>
