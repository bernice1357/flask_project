<template lang="pug">
.title
  h1 SHAP(SHapley Additive exPlanations)
  h3 將特徵變量以影響結果之重要程度進行排序
div
  img.shap(
    v-for="item in imgPath"
    :src="getShapImg(item)"
  )

.title
  h1 PDP(Partial Dependency Plots)
  h3 透過圖表得知一個或是兩個特徵與目標值之間的關係
h2 單一特徵欄位
.checkbox
  el-checkbox-group(
    v-model="singleList"
    v-for="item in sinOptions"
    @change="limitDisable(1)"
  )
    el-checkbox(
      :label="item.name" 
      :disabled="item.disabled"
      size="large"
    )
el-row    
  el-button.send(color="#395679" type="primary" @click="sinSubmit") 更新
el-row
  el-button.clear(color="#395679" type="primary" @click="clear(1)") 清空所選欄位
img.pdp1(
  v-if="pdp1" 
  :src="getSingleImg(pdp1)"
)

h2 兩個特徵欄位
.checkbox
  el-checkbox-group(
    v-model="mulList"
    v-for="item in mulOptions"
    @change="limitDisable(2)"
  )
    el-checkbox(
      :label="item.name" 
      :disabled="item.disabled"
      size="large" 
    )
el-row
  el-button.send(color="#395679" type="primary" @click="secSubmit") 更新
el-row
  el-button.clear(color="#395679" type="primary" @click="clear(2)") 清空所選欄位
img.pdp2(
  v-if="pdp2" 
  :src="getMultipleImg(pdp2)"
)

</template>
<script>
import { ref } from 'vue'
const getShapImg = (path) => require(`@as/pic/shap/${path}.png`)
const getSingleImg = (path) => require(`@as/pic/pdp/single/${path}.png`)
const getMultipleImg = (path) => require(`@as/pic/pdp/multiple/${path}.png`)

export default({
  props:{
    imgs: Object
  },
  setup(props) {
    const imgPath = ref(props.imgs)

    const singleList = ref([])//被勾選的欄位
    const mulList = ref([])//被勾選的欄位
    const sinOptions = ref([])//儲存欄位被禁用的狀態
    const mulOptions = ref([])//儲存欄位被禁用的狀態
    const pdp1 = ref('')//result
    const pdp2 = ref('')//result

    sinOptions.value = [
      {name:'apachescore', disabled: false},
      {name:'age', disabled: false},
      {name:'D2_systemicsystolic_MIN', disabled: false},
      {name:'D2_WBC x 1000_AVG', disabled: false},
      {name:'lactate', disabled: false},
      {name:'D2_heartrate_MIN', disabled: false}
    ]
    const sinSubmit = (()=>{
      pdp1.value = singleList.value[0]
    })

    mulOptions.value = [
      {name:'apachescore', disabled: false},
      {name:'age', disabled: false},
      {name:'D2_systemicsystolic_MIN', disabled: false},
      {name:'D2_WBC x 1000_AVG', disabled: false},
      {name:'lactate', disabled: false},
      {name:'D2_glucose_MAX', disabled: false},
      {name:'D2_pH_MAX', disabled: false},
      {name:'D2_systemicmean_AVG', disabled: false},
      {name:'D2_potassium_MAX', disabled: false},
      {name:'D2_paO2_MAX', disabled: false},
      {name:'D2_pH_MIN', disabled: false},
      {name:'D1_bedside glucose_MIN', disabled: false},
      {name:'D2_systemicmean_MIN', disabled: false},
      {name:'D1_creatinine_MAX', disabled: false},
      {name:'D1_potassium_MAX', disabled: false},
      {name:'D2_platelets x 1000_AVG', disabled: false},
      {name:'DN1_systemicmean_MAX', disabled: false},
      {name:'DN1_BUN_MAX', disabled: false},
    ]
    const secSubmit = (()=>{
      const data = mulList.value
      if(data.includes('age') && data.includes('apachescore')){
        pdp2.value = 'age+apachescore'
      }else if(data.includes('age') && data.includes('D2_heartrate_MIN')){
        pdp2.value = 'age+D2_heartrate_MIN'
      }else if(data.includes('age') && data.includes('D2_systemicsystolic_MIN')){
        pdp2.value = 'age+D2_systemicsystolic_MIN'
      }else if(data.includes('age') && data.includes('D2_WBC x 1000_AVG')){
        pdp2.value = 'age+D2_WBC x 1000_AVG'
      }else if(data.includes('apachescore') && data.includes('D2_heartrate_MIN')){
        pdp2.value = 'apachescore+D2_heartrate_MIN'
      }else if(data.includes('apachescore') && data.includes('D2_systemicsystolic_MIN')){
        pdp2.value = 'apachescore+D2_systemicsystolic_MIN'
      }else if(data.includes('apachescore') && data.includes('D2_WBC x 1000_AVG')){
        pdp2.value = 'apachescore+D2_WBC x 1000_AVG'
      }else if(data.includes('D2_systemicsystolic_MIN') && data.includes('D2_heartrate_MIN')){
        pdp2.value = 'D2_systemicsystolic_MIN+D2_heartrate_MIN'
      }else if(data.includes('D2_systemicsystolic_MIN') && data.includes('D2_WBC x 1000_AVG')){
        pdp2.value = 'D2_systemicsystolic_MIN+D2_WBC x 1000_AVG'
      }else if(data.includes('D2_WBC x 1000_AVG') && data.includes('D2_heartrate_MIN')){
        pdp2.value = 'D2_WBC x 1000_AVG+D2_heartrate_MIN'
      }
    })

    //限制checkbox勾選上限
    const limitDisable = ((num)=>{
      var checked, option
      if(num === 1){
        checked = singleList.value
        option = sinOptions.value
      }else{
        checked = mulList.value
        option = mulOptions.value
      }
      if(checked.length === num){
        for(var i in option){
          option[i].disabled = checked.includes(option[i].name) ? false: true
        }
      }else{
        for(var j in option){
          option[j].disabled = false
        }
      }
    })
    const clear = ((item)=>{
      if(item===1){
        pdp1.value = ''
        singleList.value = []
        for(var i in sinOptions.value){
          sinOptions.value[i].disabled = false
        }
      }else{
        pdp2.value = ''
        mulList.value = []
        for(var j in mulOptions.value){
          mulOptions.value[j].disabled = false
        }
      }
    })

    return{
      imgPath,
      sinOptions,
      mulOptions,
      singleList,
      mulList,
      limitDisable,
      getShapImg,
      getSingleImg,
      getMultipleImg,
      clear,
      pdp1,
      pdp2,
      sinSubmit,
      secSubmit
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

h1, h2, h3{
  display: flex;
  justify-content: center; 
}

img{
  width: 80%;
  display: block;
  margin:auto;
}

.pdp1{
  position: absolute;
  width: 70%;
  top: 72%;
  right:0%;
}
.pdp2{
  position: absolute;
  width: 70%;
  top:88%;
  right:0%;
}
.title{
  box-shadow: rgba(50, 50, 93, 0.25) 0px 10px 5px -10px, rgba(0, 0, 0, 0.3) 0px 10px 3px -10px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.checkbox{
  border: 1px rgb(171, 171, 182) solid;
  padding: 10px;
  border-radius: 5px;
  width: 22%;
  height: 150px;
  margin-top: 100px;
  margin-bottom: 20px;
  overflow: auto;
  background-color: #cedae5;
}
.el-checkbox{
  color: #000000;
}
.el-checkbox.el-checkbox--large .el-checkbox__label{
  font-size: 30px;
}
.send,.clear{
  
  width: calc(22% + 20px);
  color: #ffffff;
}
.send{
  margin-bottom: 10px;
}
.clear{
  margin-bottom: 150px;
}
.shap{
  margin-bottom: 30px;
  
}
</style>
