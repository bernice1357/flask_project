<template lang="pug">
.title
  h2 SHAP(SHapley Additive exPlanations)
  h4 將特徵變量以影響結果之重要程度進行排序
div
  img.shap(
    v-for="item in imgPath"
    :src="getImgPath(item)"
  )

.title
  h2 PDP(Partial Dependency Plots)
  h4 透過圖表得知一個或是兩個特徵與目標值之間的關係
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
      size="small" 
    )
el-button.send(type="primary" @click="submit") 更新
img.pdp1(:src="pdp1")

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
      size="small" 
    )
el-button.send(type="primary" @click="submit") 更新
img.pdp2(:src="pdp2")

</template>
<script>
import pdp1 from '@as/pic/pdp1.png'
import pdp2 from '@as/pic/pdp2.png'
import { ref } from 'vue'
const getImgPath = (path) => require(`@as/pic/shap/${path}.png`)

export default({
  props:{
    imgs: Object
  },
  setup(props) {
    const imgPath = ref(props.imgs)

    const singleList = ref([])
    const mulList = ref([])
    const sinOptions = ref([])
    const mulOptions = ref([])

    sinOptions.value = [
      {name:'apachescore', disabled: false},
      {name:'age', disabled: false},
      {name:'D2_systemicsystolic_MIN', disabled: false},
      {name:'D2_WBC x 1000_AVG', disabled: false},
      {name:'lactate', disabled: false},
      {name:'D2_heartrate_MIN', disabled: false}
    ]

    mulOptions.value = [
      {name:'apachescore', disabled: false},
      {name:'age', disabled: false},
      {name:'D2_systemicsystolic_MIN', disabled: false},
      {name:'D2_WBC x 1000_AVG', disabled: false},
      {name:'lactate', disabled: false}
    ]

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

    return{
      imgPath,
      sinOptions,
      mulOptions,
      singleList,
      mulList,
      limitDisable,
      getImgPath,
      pdp1,
      pdp2
    }
  },
})
</script>
<style scoped>
h2, h4{
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
  top:75%;
  right:0%;
}
.pdp2{
  position: absolute;
  width: 70%;
  top:90%;
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
  margin-top: 100px;
  margin-bottom: 20px;
}
.send{
  margin-bottom: 100px;
}

.shap{
  margin-bottom: 30px;
  
}
</style>
