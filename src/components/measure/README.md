# VisbodyFit Load OBJ Demo

维塑Visfit-Air产品体测模型加载效果demo

## 参数说明
模型文件及相关数据可通过维塑API获取。
```javascript
// 模型文件
var modelPath = "model/shape.obj";
// 模型围度文件
var jsonPath = "model/model.json";
```

## 方法说明
```javascript
/*加载体测模型
*@param String modelPath 模型文件路径
*/
loadOBJ(modelPath);

/*加载模型围度
* 在模型加载完成后调用，不需要显示围度则不调用
*@param String jsonPath 模型围度文件路径
*/
initMeasureCurveFromJSON(jsonPath);


/* 模型加载完成回调 */
loadOBJOver();

/*切换模型围度回调
*@param String type 围度中文名称
*@param String value 围度数值（cm）
*@param String girth 围度英文文名称
*/
selectCurveValue(type, value, girth);
```