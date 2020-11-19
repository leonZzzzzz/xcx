<template>
  <div class="address">
    <Header title="收货地址"></Header>
    <ul class="address-list">
      <li class="list-cell" v-for="item in addressList" :key="item.id">
        <div class="cell-name-phone">
          <div class="w-50 text-ellipsis">{{item.realName}}</div>
          <div class="w-50 text-ellipsis" style="text-align: right">{{item.mobile}}</div>
        </div>
        <div class="cell-address">{{item.areaName + ' ' + item.areaInfo}}</div>
        <div class="cell-handle">
          <div class="handle-bth" @click="defaultAddress(item.id)">
            <img v-if="item.isDefault" class="pitch-on-icon" src="../../assets/images/common/xz.png"/>
            <div v-if="!item.isDefault" class="not-pitch-on-icon"></div>
            <span class="bth-text">设为默认</span>
          </div>
          <div style="width: 100%"></div>
          <div class="handle-bth" style="margin-right: .4rem" @click="goAddressInfo('edit', item)">
            <img class="edit-delete-icon" src="../../assets/images/common/edit.png"/>
            <span class="bth-text">编辑</span>
          </div>
          <div class="handle-bth" @click="del(item.id)">
            <img class="edit-delete-icon" src="../../assets/images/common/delete.png"/>
            <span class="bth-text">删除</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="add-bth" @click="goAddressInfo('add', false)">新增收货地址</div>
    <!--<ul class="address-ul">-->
      <!--<li class="address-li" v-for="item in userList" :key="item.id">-->
        <!--<div class="address-name">-->
          <!--<span>{{item.realName}}</span><span class="add-span">{{item.mobile}}</span>-->
        <!--</div>-->
        <!--<div class="address-addressName">{{item.areaInfo}}</div>-->
        <!--<div class="line-x"></div>-->
        <!--<div class="address-set">-->
          <!--<span><img src="../../assets/images/common/xz.png"/>设为默认</span>-->
          <!--<div class="address-edit">-->
            <!--<span @click="$router.push('/reviseAddress')"><img src="../../assets/images/common/edit.png"/>编辑</span>-->
            <!--<span @click="moveTo(item.id)"><img style="margin-left: 0.2rem;" src="../../assets/images/common/delete.png"/>删除</span>-->
          <!--</div>-->
        <!--</div>-->
      <!--</li>-->
    <!--</ul>-->
  </div>
</template>

<script>
import HttpAPI from '../../service/user-api'
import Header from '../../components/header/header'
export default {
  components: {
    Header
  },
  data () {
    return {
      addressList: []
    }
  },
  methods: {
    getList () {
      HttpAPI.addressList({}, res => {
        if (res && res.length) {
          for (let i = 0; i < res.length; i++) {
            let areaName = ''
            let area = res[i].areaCodeDisplay
            if (area && area.length >= 1) {
              areaName = area[0].name
            }
            if (area && area.length >= 2) {
              areaName = areaName + ' ' + area[1].name
            }
            res[i].areaName = areaName
          }
        }
        this.addressList = res
      })
    },
    goAddressInfo (type, item) {
      this.$router.push({
        path: '/reviseAddress_home',
        query: {
          type: type,
          addressInfo: item
        }
      })
    },
    del (id) {
      HttpAPI.delAddress({ id: id }, res => {
        this.getList()
      })
    },
    defaultAddress (id) {
      HttpAPI.defaultAddress({ id: id }, res => {
        this.getList()
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
  @import "address-home.less";
</style>
