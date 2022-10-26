<template lang="pug">
p {{dynamicData}}
//- el-table(
//-   :data="filterDynamicData"
//-   border
//-   :header-cell-style="headerStyle"
//- )
//-   el-table-column(
//-     prop="name"
//-     label="動態資料欄位" 
//-     align="center"
//-   )
//-   el-table-column(
//-     label="數值" 
//-     align="center"
//-   )
//-     template(#header)
//-       el-input(
//-         v-model="dynamicSearch" 
//-         clearable size="small" 
//-         placeholder="搜尋動態欄位"
//-       )
//-     el-popover.popover(
//-       placement="left" 
//-       :width="450" 
//-       trigger="click"
//-     )
//-       template(#reference)
//-         el-button(text @click="showHistogram" :icon="Histogram" type="primary") 趨勢圖
//-       //- p 變化
//-       el-tabs(
//-         v-model="activeName"
//-         @tab-click="handleClick"
//-       )

//-         el-tab-pane(label="最大值變化" name="1")
//-           highcharts(:options="chartOptions")
//-         el-tab-pane(label="最小值變化" name="2")
//-           highcharts(:options="chartOptions")
//-         el-tab-pane(label="平均值變化" name="3")
//-           highcharts(:options="chartOptions")
</template>
<script>
import { computed, ref } from 'vue'
import { Histogram } from '@element-plus/icons-vue'
import api from '@api/http.js'
export default({
  name: "dynamicData",
  props:{
    id: String
  },
  setup() {//props
    const activeName = ref('1')

    const dynamicData = api.getData()
    // const dynamicData = [
    //   {data:"0.08", name:"troponin-I"},
    //   {data:"0.3", name:"direct bilirubin"},
    //   {data:"2.45", name:"lactate"},
    //   {data:"0.5", name:"fibrinogen"},
    //   {data:"1.1", name:"CPK-MB INDEX"},
    // ]

    const dynamicSearch = ref('')
    const filterDynamicData = computed(() =>//動態
      dynamicData.filter(
        (data) =>
          !dynamicSearch.value ||
          data.name.toLowerCase().includes(dynamicSearch.value.toLowerCase())
      )
    )

    const chartOptions= computed(() =>{
      return{
        chart: { type: "line" }, 
        title: { text: "" },
        xAxis: {
          categories: ["第1天","第2天","第3天","第4天","第5天"]
        },
        yAxis: {
          title: { text: "數值" }
        },
        series: [{
          name: "變化趨勢圖",
          data: [1,2,3,4,5]
        }]
      }
    })

    return {
      dynamicData,
      chartOptions,
      filterDynamicData,
      activeName,
      Histogram
    }
  }
})
</script>
