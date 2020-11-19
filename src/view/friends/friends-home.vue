<template>
  <div class="background-color">
    <div class="head-bar-to">
      <div class="head-theme-b-left" @click="$router.go(-1)">
        <img style="position: relative; left: 0.5rem; width: 0.25rem;" src="../../assets/images/common/left_icon_black_big.png"/>
      </div>
      <div class="">
        <div class="fs-5">上传照片</div>
      </div>
    </div>
    <div class="friends-nav">
      <textarea cols="57.5" rows="15" placeholder="这一刻的想法...">
      </textarea>
     <div style="border: 1px solid grey; width: 2rem; height: 2rem;line-height: 2rem;position: relative;top: -2.1rem;">
       <span style="position: absolute;left: 0.8rem;">+</span>
       <input style="opacity: 0;"  type="file" class="upload_pic" id="imgPicker" name="file" @click="show"/>
       <div style="position: relative;left: 2rem; top: -2rem;">
         <img id="preview" style="width: 2rem; height: 2rem;"/>
       </div>
     </div>
      <div style="width:100%;background-color:white;display:flex;position: absolute;top: 7rem;padding-left: 0.2rem; border: 1px solid ghostwhite;">
        <div style="font-size: 0.4rem;position: relative;left: 1rem">谁可以看</div>
        <div style="margin-left: 6.5rem; font-size: 0.35rem; line-height: 0.7rem;">公开</div>
      </div>
    </div>
    <div class="button" @click="$router.back(-1)">确定
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    show () {
      document.querySelector('#imgPicker')
        .addEventListener('change', function () {
          // 当没选中图片时，清除预览
          if (this.files.length === 0) {
            document.querySelector('#preview').src = ''
            return
          }

          // 实例化一个FileReader
          var reader = new FileReader()

          reader.onload = function (e) {
            // 当reader加载时，把图片的内容赋值给
            document.querySelector('#preview').src = e.target.result
          }
          // 读取选中的图片，并转换成dataURL格式
          reader.readAsDataURL(this.files[0])
        }, false)
    }
  }
}
</script>

<style lang="less" scoped>
  @import "friends-home";
</style>
