<template>
  <div class="upload-photo">
    <Header title="上传图片"></Header>
    <div class="upload-photo-content">
      <div class="upload-content">
        <textarea class="textarea" placeholder="这一刻的想法..." v-model="describing"></textarea>
        <div class="content-photo">
          <div class="photo-box" v-for="(item, index) in imgList" :key="index">
            <img class="img-style" :src="item.base64"/>
            <img class="del-icon" src="../../assets/images/upload/del-icon.png" @click="fileDel(index)"/>
          </div>
          <div class="photo-box" v-if="imgList.length===0">
            <img class="img-style" src="../../assets/images/upload/add-img.png" @click="clickUpload"/>
            <input id="file" @change="fileChange($event)" type="file" :value="null" ref="photo" accept="image/*" style="display: none">
          </div>
        </div>
        <!--<div class="select-cell" @click="popupVisible=true">-->
          <!--<img class="icon-style" src="../../assets/images/upload/icon-a.png"/>-->
          <!--<span class="cell-name">谁可以看</span>-->
          <!--<div class="cell-value">{{value}}</div>-->
          <!--<img class="cell-arrows-icon" style="" src="../../assets/images/common/arrows-bottom-icon.png"/>-->
        <!--</div>-->
      </div>
      <div class="upload-photo-bth" @click="updatePhoto()">确定</div>
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
    <PopupHint
      :popupHint="popupHint"
      :hintContent="hintContent"
      @right-bth-event="popupHint=false"
      rightBthName="返回"
      :showLeftBth="false"
    >
    </PopupHint>
  </div>
</template>

<script>
import UserAPI from '../../service/user-api'
import { Log } from '@lemon/euler-app-h5/src/libs/euler-mint-ui'
import Header from '../../components/header/header'
import PopupSpinner from '../../components/popup-spinner/popup-spinner'
import 'lrz/dist/lrz.all.bundle'
import PopupHint from '../../components/popup-hint/popup-hint'
export default {
  components: {
    Header,
    PopupSpinner,
    PopupHint
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
      // fileImage: null, // 传后台图片文件
      imgList: [], // 图片文件
      options: {
        // width: ''
        // height: ''
        // fieldName: '' // {String}后端接收的字段名，默认：file
        quality: 0.7 // {Number}图片压缩质量 0 - 1， 默认0.7
      }, // 压缩参数
      popupSpinner: false,
      closeStatus: false,
      popupHint: false,
      hintContent: null
      // popupVisible: false
    }
  },
  beforeCreate () {},
  watch: {},
  mounted () {
  },
  methods: {
    clickUpload () {
      this.$refs.photo.click()
    },
    closePopupSpinner () {
      this.closeStatus = true
      this.popupSpinner = false
    },
    // updatePhoto () {
    //   if (!this.fileImage) {
    //     Log.deal({
    //       message: '请选择图片',
    //       position: 'middle'
    //     })
    //     return
    //   }
    //   this.closeStatus = false
    //   let formData = new FormData()
    //   formData.append('file', this.fileImage)
    //   // formData.append('files', this.fileImage)
    //   formData.append('albumInfo', this.describing)
    //   formData.append('albumType', 'PHOTO')
    //   // console.log(formData)
    //   this.popupSpinner = true
    //   UserAPI.uploadAlbum(formData, res => {
    //     if (!this.closeStatus) {
    //       this.$router.go(-1)
    //     }
    //   }, () => {
    //     this.popupSpinner = false
    //   })
    // },
    updatePhoto () {
      let imgList = this.imgList
      if (imgList && imgList.length) {
        this.popupSpinner = true
        this.closeStatus = false
        let fileData = ''
        let formData = new FormData()
        // 抽出formData的数据并重新下添加到新的formData里
        for (let i = 0; i < imgList.length; i++) {
          fileData = imgList[i].formData.get('file')
          formData.append('file', fileData)
        }
        formData.append('albumInfo', this.describing)
        formData.append('albumType', 'PHOTO')
        UserAPI.uploadAlbum(formData, res => {
          if (!this.closeStatus) {
            this.$router.go(-1)
          }
        }, () => {
          this.popupSpinner = false
        })
      } else {
        Log.deal({
          message: '请选择图片',
          position: 'middle'
        })
      }
    },
    fileChange (el) {
      let file = el.target.files[0]
      console.log(file)
      if (file.type.indexOf('image') === -1) {
        Log.deal({
          message: '请选择图片',
          position: 'middle'
        })
        this.$refs.photo.value = null
      } else {
        // this.fileImage = file
        // 显示图片
        this.fileList(el.target.files)
      }
    },
    fileList (files) {
      for (let i = 0; i < files.length; i++) {
        this.fileAdd(files[i])
      }
    },
    fileAdd (file) {
      let _this = this
      // 压缩文件
      lrz(file, this.options)
        .then(function (rst) {
          console.log(rst)
          // 处理成功会执行
          // console.log(rst)
          _this.imgList.push(rst)
        })
        .catch(function (err) {
          // 处理失败会执行
          // console.log(err)
          this.hintContent = err
          this.popupHint = true
        })
        .always(function () {
          // 不管是成功失败，都会执行
        })
      // let reader = new FileReader()
      // reader.readAsDataURL(file)
      // reader.onload = function () {
      //   file.src = this.result
      //   _this.imgList.push({ file })
      //   console.log(_this.imgList)
      // }
    },
    fileDel (index) {
      this.imgList.splice(index, 1)
      // this.fileImage.splice(index, 1) // 多文件
      // console.log(this.imgList)
      // console.log(this.fileImage)
      // this.fileImage = null
    }
    // onValuesChange (picker, values) {
    //   this.value = values[0]
    // }
  }
}
</script>

<style lang="less" scoped>
  @import "upload-photo.less";
</style>
