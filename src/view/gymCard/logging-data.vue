<style lang="less" scoped>
  @import "logging-data";
</style>
<template>
    <div class="logging-data">
      <div class="head-bar head-theme-b">
        <div class="head-theme-b-left">
          <i class="icon-image icon-back" @click="$router.go(-1)"></i>
        </div>
        <div class="head-theme-b-center">
          <div class="fs-5">手动录入数据</div>
        </div>
        <div slot="right" class="head-theme-b-right">
        </div>
      </div>
      <div class="pt-45 box-content-logging-data">
        <div class="cell-item">
          <div class="title">昵称</div>
          <div class="content"><input type="text" placeholder="昵称"></div>
        </div>
        <div class="cell-item">
          <div class="title">性别</div>
          <div class="content">
            <select name="" id="" style="width: 100%">
              <option value="">男</option>
              <option value="">女</option>
            </select>
          </div>
        </div>
        <div class="cell-item">
          <div class="title">年龄</div>
          <div class="content"><input type="text" placeholder="年龄"></div>
        </div>
        <div class="cell-item">
          <div class="title">身高（cm）</div>
          <div class="content"><input type="text" placeholder="身高（cm）"></div>
        </div>
        <div class="cell-item">
          <div class="title">体重（kg）</div>
          <div class="content"><input type="text" placeholder="体重（kg）"></div>
        </div>
        <div class="cell-item">
          <div class="title">肌肉量（kg）</div>
          <div class="content"><input type="text" placeholder="肌肉量（kg）"></div>
        </div>
        <div class="cell-item">
          <div class="title">脂肪（kg）</div>
          <div class="content"><input type="text" placeholder="脂肪（kg）"></div>
        </div>
      </div>
      <div class="foot-botton" @click="$router.push('stamina-test-sueccess')">确定</div>
    </div>
</template>

<script>
export default {
  name: 'logging-data'
}
</script>

<style scoped>

</style>
