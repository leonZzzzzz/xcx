<style lang="less" scoped>
  @import "editing-information";
</style>
<template>
  <div class="editing-information">
    <Header title="编辑资料"></Header>
    <ul class="cell-box">
      <li class="cell" style="height: 2.452rem">
        <span class="cell-title" style="width: 100%">头像</span>
        <div class="cell-photo" @click="clickUpload">
          <input @change="fileAdd($event)" type="file" :value="null" ref="avatar" accept="image/*" style="display: none">
          <img :src="memberInfo.avatar" alt=""/>
        </div>
      </li>
      <li class="cell">
        <span class="cell-title">昵称</span>
        <input class="input-style" type="text" v-model="userInfo.nickName" placeholder="您的昵称"/>
      </li>
      <li class="cell" @click="popupVisibleSex=true">
        <span class="cell-title">性别</span>
        <span style="width: 100%;height: 1.173rem;line-height: 1.173rem">{{sexDisplay}}</span>
        <img style="height: .334rem;margin-left: .267rem" src="../../assets/images/common/left_seting.png">
      </li>
      <li class="cell">
        <span class="cell-title">年龄</span>
        <input class="input-style" type="number" v-model="userInfo.age" placeholder="您的年龄"/>
      </li>
      <li class="cell">
        <span class="cell-title">职业</span>
        <input class="input-style" type="text" v-model="userInfo.occupational" placeholder="您的职业"/>
      </li>
      <li class="cell" style="align-items: flex-start;height: 3rem">
        <span class="cell-title" style="padding-top: .4rem">个性签名</span>
        <textarea class="textarea-style" placeholder="您的个性签名" v-model="userInfo.signature"></textarea>
      </li>
    </ul>
    <div class="save-bth" @click="editingInformation">保存</div>
    <!--选择性别-->
    <mt-popup v-model="popupVisibleSex" position="bottom" style="width: 100%">
      <div style="margin-left: 0.3rem;padding-top: 0.3rem;font-size: 0.35rem;" @click="popupVisibleSex=false">确定</div>
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
    <!--修改头像-->
    <mt-popup v-model="popupUpload" popup-transition="popup-fade" :closeOnClickModal="false" class="popup-upload">
      <div class="popup-upload-title">上传头像</div>
      <img class="popup-upload-img" :src="img"/>
      <div class="popup-upload-bth-box">
        <div class="bth-style" style="border: .03rem solid #F6BF3C;color: #F6BF3C" @click="updateAvatar">更换头像</div>
        <div class="bth-style" style="border: .03rem solid #999999;color: #999999" @click="popupUpload=false">取消</div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import OpenAPI from '../../service/open-api'
import { Log } from '@lemon/euler-app-h5/src/libs/euler-mint-ui'
import Header from '../../components/header/header'
import $ from 'jQuery'
import Common from '../../mixins/common'
import { initBlockMemberInfo } from '../../store/extend-util'

export default {
  name: 'editing-information',
  mixins: [Common],
  components: {
    Header
  },
  data () {
    return {
      popupVisibleSex: false,
      slots: [
        {
          flex: 1,
          values: ['男', '女'],
          value: 0, // 默认值 value+defaultIndex兼容安卓及苹果手机
          defaultIndex: 0, // 默认值 value+defaultIndex兼容安卓及苹果手机
          className: 'slot1'
        }
      ],
      popupUpload: false,
      img: null,
      file: '', // 上传的文件
      sexDisplay: '',
      userInfo: {
        nickName: '',
        age: '',
        signature: '',
        occupational: '',
        sex: ''
      }
    }
  },
  watch: {
    popupVisibleSex () {
      if (!this.popupVisibleSex) {
        this.closeVModal()
      }
    },
    popupUpload () {
      if (!this.popupUpload) {
        this.closeVModal()
      }
    }
  },
  mounted () {
    this.event()
  },
  methods: {
    closeVModal () {
      $('.v-modal').css('display', 'none')
    },
    onValuesChange (picker, values) {
      if (values[0] === '男') {
        this.userInfo.sex = 'MAN'
        this.sexDisplay = '男'
      } else {
        this.userInfo.sex = 'WOMAN'
        this.sexDisplay = '女'
      }
    },
    event () {
      this.userInfo.age = this.memberInfo.age
      this.userInfo.nickName = this.memberInfo.nickName
      this.userInfo.occupational = this.memberInfo.occupational
      this.userInfo.signature = this.memberInfo.signature
      this.userInfo.sex = this.memberInfo.sex
      this.sexDisplay = this.memberInfo.sexDisplay
      if (this.userInfo.sex === 'WOMAN') {
        this.slots[0].value = 1
        this.slots[0].defaultIndex = 1
      }
    },
    clickUpload () {
      this.$refs.avatar.click()
    },
    fileAdd (event) {
      let file = event.target.files[0]
      // 文件大小（保留整数）
      // let fileSize = (file.size / 1024).toFixed(0)
      this.file = file
      // 判断是否为图片文件
      if (file.type.indexOf('image') === -1) {
        Log.deal({
          message: '请选择图片',
          position: 'middle'
        })
        this.$refs.avatar.value = null
      } else {
        let _this = this
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          file.src = this.result
          _this.img = file.src
        }
        _this.popupUpload = true
      }
    },
    updateAvatar () {
      let formData = new FormData()
      formData.append('file', this.file)
      OpenAPI.updateAvatar(formData, res => {
        initBlockMemberInfo(() => {
          this.initMemberInfoTimer()
        })
        this.popupUpload = false
      })
    },
    editingInformation () {
      if (!this.userInfo.nickName) {
        Log.deal({
          message: '昵称不能为空',
          position: 'middle'
        })
        return
      }
      OpenAPI.detailsUpdateInfo(this.userInfo, res => {
        initBlockMemberInfo(() => {
          this.$router.go(-1)
        })
      })
    }
  }
}
</script>
