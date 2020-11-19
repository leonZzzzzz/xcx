<template>
  <div>
    <div id="model"></div>
  </div>
</template>

<script>
// import { ModelObj } from 'vue-3d-model'
// import * as Three from 'three'
// import
export default {
  // components: { ModelObj },
  data () {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null
    }
  },
  mounted () {
    var modelPath = 'model/model.obj'
    window.onload = function () {
      // 加载模型
      loadOBJ(modelPath)
    }
  },
  methods: {
    /* 模型加载完成回调 */
    loadOBJOver () {
      var jsonPath = 'model/modelto.json'
      console.log('模型加载完毕')
      // 加载围度
      initMeasureCurveFromJSON(jsonPath)
    },
    /* 切换模型围度回调 */
    selectCurveValue (type, value, girth) {
      console.log('当前围度：', type, value, girth)
    }
  }
}

</script>

<style lang="less" scoped>
  html,body{padding: 0px;margin: 0px;background:#212121;overflow: hidden;}
  html,body,#model{position: relative; width: 100%;height: 100%;}
</style>
