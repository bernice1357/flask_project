<template lang="pug">
#home-page
  .header
    h1.align 模型綜合分析
  .content
    el-tabs(v-model="activeName" tab-position="right" @tab-click="handleClick")
      el-tab-pane(label="整體分析" name="1") 
        p 整體分析
      el-tab-pane(label="XGBoost" name="2") 
        p XGBoost
      el-tab-pane(label="LGBM" name="3") 
        h2 SHAP(SHapley Additive exPlanations)
        h4 以圖表顯示每項特徵對於模型的重要程度
        img(:src="img1")
        h2 PDP(Partial Dependency Plots)
        h4 用以展示模型中目標值與特徵之間的關係
        img(:src="img2")
      el-tab-pane(label="Random Forest" name="4")
        p Random Forest
    
</template>
<script>
import { ref } from 'vue'
import img1 from '@as/pic/shap.png'
import img2 from '@as/pic/pdp.png'
export default({
  name: "HomePage",
  setup() {
    const activeName = ref('3')
    const columnSetting = [
      {prop: "id", label: "病人編號"},
    ]
    const tableData = [
      {status: 'Danger', id: '1' }
    ]

    return {
      columnSetting,
      tableData,
      img1,
      img2,
      activeName
    }
  },
})
</script>
<style scoped>
.header{
  position: fixed;
  top: 0;
  left: 150px;
  height: 60px;
  width: calc(100vw - 150px);
  z-index: 4;
  background-image: radial-gradient(transparent 1px,#ffffff 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
  -webkit-backdrop-filter: saturate(50%) blur(4px);
  border-bottom:1px rgb(222, 222, 230) solid;
}

h1{
  margin: 0px;
  position: absolute;
  width:  100%;
  text-align: center;
  left: 0%;
  top: 17%;
}

img{
  width:  90%;
}

h2, h4{
  display: flex;
  justify-content: center; 
}

.content{
  margin-top: 80px;
  width:  80%;
  position: absolute;
  right: 3%;
}
</style>