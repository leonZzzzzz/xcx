<template>
  <div class="photo">
    <Header title="我的相册"></Header>
    <ul class="photo-content">
      <li class="content-cell" v-for="(item, index) in list" :key="item.id">
        <div class="cell-date">{{item.createTime}}</div>
        <div class="cell-photo">
          <div class="photo-text" v-if="item.albumInfo && item.albumInfo !== 'null'">{{item.albumInfo}}</div>
          <div class="photo-list">
            <div :ref="'photo_box_'+index" class="photo-box" v-for="photoItem in item.albumFiles" :key="photoItem.fileId">
              <img :ref="'photo_'+index" :preview="photoItem.fileId" class="photo-style" :src="photoItem.fileId"/>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="photo-bth" @click="$router.push('/upload_photo')">上传照片</div>
  </div>
</template>

<script>
import { formatDate } from '@lemon/euler-app-h5/src/libs/util'
import UserAPI from '../../service/user-api'
import Header from '../../components/header/header'
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
          if (rows[i].albumType === 'PHOTO') {
            let albumFiles = rows[i].albumFiles
            for (let j = 0; j < albumFiles.length; j++) {
              albumFiles[j].fileId = downloadUrl + albumFiles[j].fileId
            }
            rows[i].createTime = formatDate(new Date(rows[i].createTime), 'yyyy/MM/dd hh:mm')
            this.list.push(rows[i])
          }
        }
        this.$previewRefresh() // 如果图片是异步生成的，在图片数据更新后调用
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import "photo.less";
</style>
