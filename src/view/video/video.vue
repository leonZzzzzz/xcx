<template>
  <div class="video">
    <Header title="我的视频"></Header>
    <div class="video-content">
      <ul class="video-content-after">
        <li class="content-cell" v-for="item in list" :key="item.id">
          <div class="cell-head">
            <span class="head-title">{{item.createTime + '&nbsp;&nbsp;&nbsp;' + item.albumInfo}}</span>
            <!--<div class="del-bth">删除</div>-->
          </div>
          <div class="cell-video" v-for="(videoItem, index) in item.albumFiles" :key="index">
            <video :src="videoItem.fileId" controls class="video-style"></video>
          </div>
          <!--<div class="cell-line"></div>-->
        </li>
      </ul>
    </div>
    <div class="video-bth" @click="$router.push('/upload_video')">上传视频</div>
  </div>
</template>

<script>
import { formatDate } from '@lemon/euler-app-h5/src/libs/util'
import Header from '../../components/header/header'
import UserAPI from '../../service/user-api'
import { downloadUrl } from '@/libs/http-api'
export default {
  components: {
    Header
  },
  data () {
    return {
      list: []
    }
  },
  beforeCreate () {
  },
  watch: {},
  mounted () {
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      UserAPI.photolistInfo({ limit: 1000, offset: 0 }, res => {
        let rows = res.rows
        for (let i = 0; i < rows.length; i++) {
          if (rows[i].albumType === 'VIDEO') {
            let albumFiles = rows[i].albumFiles
            for (let j = 0; j < albumFiles.length; j++) {
              albumFiles[j].fileId = downloadUrl + albumFiles[j].fileId
            }
            rows[i].createTime = formatDate(new Date(rows[i].createTime), 'yyyy/MM/dd hh:mm')
            if (!rows[i].albumInfo || rows[i].albumInfo === 'null') {
              rows[i].albumInfo = ''
            }
            this.list.push(rows[i])
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import "video.less";
</style>
