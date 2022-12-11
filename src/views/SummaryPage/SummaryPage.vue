<template lang="pug">
#SummaryPage
  .header
    el-breadcrumb(:separator-icon="ArrowRight")
      el-breadcrumb-item(:to="{ path: '/' }") 首頁
      el-breadcrumb-item 模型綜合分析
  .content
    el-tabs(v-model="activeName" tab-position="right" @tab-click="handleClick")
      el-tab-pane(label="整體分析" name="1")
        .title
          h1 ROC曲線(Receiver Operating Curve)
          h3 將各模型之 AUC 進行比較以判斷結果表現
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
import rocImg from '@as/pic/roc'
import { ArrowRight } from '@element-plus/icons-vue'
import singleTab from '@v/SummaryPage/components/singleTab.vue'
export default({
  name: "SummaryPage",
  components:{
    singleTab
  },
  setup() {
    const activeName = ref('1')
    const columnSetting = [
      {prop: "id", label: "病人編號"},
    ]
    const tableData = [
      {status: 'Danger', id: '1' }
    ]

    return {
      columnSetting,
      tableData,
      rocImg,
      activeName,
      ArrowRight
    }
  },
})
</script>
<style scoped>
h1{
  font-size: 40px;
}
h3{
  font-size: 20px;
}
.el-breadcrumb{
  margin-top: 40px;
  font-size: 16px;
}
.header{
  position: absolute;
  top: 0;
  left: 3%;
  width: 100%;
  height: 60px;
  z-index: 4;
}

.content{
  position: absolute;
  left: 15%;
  width: 100%;
}

img{
  width: 80%;
  display: block;
  margin:auto;
}

h1, h3, h5{
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
  background-color: #fff699;
  color: #5f5b34;
}

el-tabs.el-tabs__item{
  font-size: 20px;
}
</style>