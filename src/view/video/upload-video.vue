<template>
  <div class="upload-video">
    <Header title="上传视频"></Header>
    <div class="upload-video-content">
      <div class="upload-content">
        <textarea class="textarea" placeholder="这一刻的想法..." v-model="describing"></textarea>
        <div class="content-video">
          <div class="video-box" v-if="videoSrc">
            <video :src="videoSrc" class="video-style"></video>
          </div>
          <div class="video-box">
            <img class="video-style" src="../../assets/images/upload/add-img.png" @click="clickUpload"/>
            <input @change="fileChange($event)" type="file" capture="camcorder" :value="null" ref="video" accept="video/*" style="display: none">
          </div>
        </div>
        <!--<div class="select-cell" @click="popupVisible=true">-->
          <!--<img class="icon-style" src="../../assets/images/upload/icon-a.png"/>-->
          <!--<span class="cell-name">谁可以看</span>-->
          <!--<div class="cell-value">{{value}}</div>-->
          <!--<img class="cell-arrows-icon" style="" src="../../assets/images/common/arrows-bottom-icon.png"/>-->
        <!--</div>-->
      </div>
      <div class="upload-video-bth" @click="updateVideo">确定</div>
    </div>
    <!--<mt-popup v-model="popupVisible" position="bottom" class="popup-picker">-->
      <!--<div class="picker-head">-->
        <!--<div @click="popupVisible=false">确定</div>-->
      <!--</div>-->
      <!--<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>-->
    <!--</mt-popup>-->
    <PopupSpinner
    :popupSpinner="popupSpinner"
    hintContent="上传中，请等待"
    @bth-event="closePopupSpinner"
    >
    </PopupSpinner>
  </div>
</template>

<script>
import { Log } from '@lemon/euler-app-h5/src/libs/euler-mint-ui'
import Header from '../../components/header/header'
import PopupSpinner from '../../components/popup-spinner/popup-spinner'
import UserAPI from '../../service/user-api'
export default {
  components: {
    Header,
    PopupSpinner
  },
  data () {
    return {
      // slots: [
      //   {
      //     flex: 1,
      //     values: ['公开'],
      //     className: 'slot1'
      //   }
      // ],
      // value: null,
      describing: null,
      fileVideo: null, // 传后台图片文件
      videoSrc: null, // 预览视频地址
      popupSpinner: false,
      closeStatus: false
      // popupVisible: false
    }
  },
  beforeCreate () {},
  watch: {},
  mounted () {
  },
  methods: {
    clickUpload () {
      this.$refs.video.click()
    },
    closePopupSpinner () {
      this.closeStatus = true
      this.popupSpinner = false
    },
    updateVideo () {
      if (!this.fileVideo) {
        Log.deal({
          message: '请选择视频',
          position: 'middle'
        })
        return
      }
      this.closeStatus = false
      let formData = new FormData()
      formData.append('file', this.fileVideo)
      formData.append('albumInfo', this.describing)
      formData.append('albumType', 'VIDEO')
      this.popupSpinner = true
      UserAPI.uploadAlbum(formData, res => {
        if (!this.closeStatus) {
          this.$router.go(-1)
        }
      }, () => {
        this.popupSpinner = false
      })
    },
    fileChange (el) {
      let file = el.target.files[0]
      if (file.type.indexOf('video') === -1) {
        Log.deal({
          message: '请选择正确的视频格式',
          position: 'middle'
        })
        this.$refs.video.value = null
      } else {
        let fileSize = (file.size / 1024).toFixed(0)
        // console.log(fileSize)
        if (fileSize > 10240) {
          Log.deal({
            message: '视频不能大于10MB',
            position: 'middle'
          })
          this.$refs.video.value = null
          return
        }
        this.fileVideo = file
        // console.log(this.fileVideo)
        let _this = this
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          file.src = this.result
          _this.videoSrc = file.src
        }
      }
    }
    // onValuesChange (picker, values) {
    //   this.value = values[0]
    // }
  }
}
</script>

<style lang="less" scoped>
  @import "upload-video.less";
</style>
