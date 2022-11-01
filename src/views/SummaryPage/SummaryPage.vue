<template lang="pug">
#SummaryPage
  .header
    el-breadcrumb(:separator-icon="ArrowRight")
      el-breadcrumb-item(:to="{ path: '/home' }") 首頁
      el-breadcrumb-item 模型綜合分析
  .content
    el-tabs(v-model="activeName" tab-position="right" @tab-click="handleClick")
      el-tab-pane(label="整體分析" name="1")
        .title
          h2 ROC曲線(Receiver Operating Curve)
          h4 將各模型之 AUC 進行比較以判斷結果表現
        img(:src="rocImg.roc1")
        h5 不可允許空值模型的 ROC
        img(:src="rocImg.roc2")
        h5 可允許空值模型的 ROC
      el-tab-pane(label="XGBoost" name="2") 
        singleTab(:imgs="['xgb_2','xgb_3']")
      el-tab-pane(label="梯度提升機(LightGBM)" name="3")
        singleTab(:imgs="['lgbm_1','lgbm_2','lgbm_3']")
      el-tab-pane(label="隨機森林(Random Forest)" name="4")
        singleTab(:imgs="['rf_1','rf_2','rf_3']")
      el-tab-pane(label="K-近鄰演算法(KNN)" name="5")
        singleTab(:imgs="['knn_1','knn_2','knn_3']")
      el-tab-pane(label="邏輯迴歸(Logistic Regression)" name="6")
        singleTab(:imgs="['lr_1','lr_2','lr_3']")
      el-tab-pane(label="支持向量機(SVM)" name="7")
        singleTab(:imgs="['svm_2','svm_3']")
    
  el-backtop(:right="100" :bottom="100" icon="el-icon-search")
    div 回到頂部
    
</template>
<script>
import { ref } from 'vue'

import img2 from '@as/pic/pdp2.png'
import img3 from '@as/pic/pdp1.png'
import rocImg from '@as/pic/roc'
import { ArrowRight } from '@element-plus/icons-vue'
import singleTab from '@v/SummaryPage/components/singleTab.vue'
export default({
  name: "SummaryPage",
  components:{
    singleTab
  },
  setup() {
    const activeName = ref('4')
    const columnSetting = [
      {prop: "id", label: "病人編號"},
    ]
    const tableData = [
      {status: 'Danger', id: '1' }
    ]

    return {
      columnSetting,
      tableData,
      img2,
      img3,
      rocImg,
      activeName,
      ArrowRight
    }
  },
})
</script>
<style scoped>
.el-breadcrumb{
  margin-top: 20px;
}
.header{
  position: absolute;
  top: 0;
  left: 150px;
  height: 60px;
  width: calc(100vw - 150px);
  z-index: 4;
  background-image: radial-gradient(transparent 1px,#ffffff 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
  -webkit-backdrop-filter: saturate(50%) blur(4px);
  /* border-bottom:1px rgb(222, 222, 230) solid; */
}

.content{
  position: absolute;
  left: 15%;
  width: 100%;
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
  width: 80%;
  display: block;
  margin:auto;
}

h2, h4, h5{
  display: flex;
  justify-content: center; 
}

.title{
  box-shadow: rgba(50, 50, 93, 0.25) 0px 10px 5px -10px, rgba(0, 0, 0, 0.3) 0px 10px 3px -10px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.content{
  margin-top: 80px;
  width:  80%;
  position: absolute;
  right: 3%;
}

.el-backtop{
  width: 120px;
  border-radius: 10px;
  background-color: rgb(158, 170, 181);
  color: #ffffff;
}
</style>