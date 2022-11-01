<template lang="pug">
el-table(
  :data="filterDynamicData"
  border
  :header-cell-style="headerStyle"
  size="large"
)
  el-table-column(
    prop="name"
    label="動態資料欄位" 
    align="center"
  )
  el-table-column(
    label="數值"
    align="center"
  )
    template(#header)
      el-input(
        v-model="dynamicSearch" 
        clearable size="small" 
        placeholder="搜尋動態欄位"
      )
    template(#default="scope")
      el-popover.popover(
        placement="left" 
        :width="450" 
        trigger="click"
      )
        template(#reference)
          el-button(text @click="getData(scope.row.name)" :icon="Histogram" type="primary") 趨勢圖
        highcharts(:options="chartOptions")
</template>
<script>
import { computed, ref } from 'vue'
import { Histogram } from '@element-plus/icons-vue'
import axios from 'axios';

export default({
  name: "dynamicData",
  props:{
    id: String
  },
  setup() {//props
    const dynamicName = ref([
      {name:"FiO2"},
      {name:"PEEP"},
      {name:"Plateau Pressure"},
      {name:"systemicMean"},
      {name:"heartRate"},
      {name:"observationOffset"},
      {name:"systemicDiastolic"},
      {name:"respiration"},
      {name:"systemicMean"},
      {name:"systemicSystolic"},
      {name:"dialysisTotal"},
      {name:"intakeOutputOffset"},
      {name:"intakeTotal"},
      {name:"netTotal"},
      {name:"outputTotal"}
    ])
    const respName = ['FiO2','PEEP','Plateau Pressure']
    const vitalName = ['systemicMean','heartRate','observationOffset','systemicDiastolic','respiration','systemicMean','systemicSystolic']
    const ioName = ['dialysisTotal','intakeOutputOffset','intakeTotal','netTotal','outputTotal']
    const chartData =ref([])

    const activeName = ref('1')
    const headerStyle = {background:'#bbceed',color:'#606266'}

    const dynamicData = ref([])
    const getData = async(row)=>{
      var res = []
      if(respName.indexOf(row)+1){
        res = await axios.post(
        'https://19bf-211-20-131-166.ngrok.io/patient/respiratoryCharting/',
        {"id": 145867, "field_name":row, "hour":false})

      }else if(vitalName.indexOf(row)+1){
        res = await axios.post(
        'https://19bf-211-20-131-166.ngrok.io/patient/vitalPeriodic/',
        {"id": 145867, "field_name":row, "hour":false})

      }else if(ioName.indexOf(row)+1){
        res = await axios.post(
        'https://19bf-211-20-131-166.ngrok.io/patient/intakeOutput/',
        {"id": 145867, "field_name":row, "hour":false})
      }
      res = res.data.data

      chartData.value = []
      for(var i in res){
        chartData.value.push(parseInt(res[i].value))
      }
    }
    
    // const dynamicData = api.getData()
    // const dynamicData = [
    //   {data:"0.08", name:"troponin-I"},
    //   {data:"0.3", name:"direct bilirubin"},
    //   {data:"2.45", name:"lactate"},
    //   {data:"0.5", name:"fibrinogen"},
    //   {data:"1.1", name:"CPK-MB INDEX"},
    // ]

    const dynamicSearch = ref('')
    const filterDynamicData = computed(() =>//動態
      dynamicName.value.filter(
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
          categories: []
        },
        yAxis: {
          title: { text: "數值" }
        },
        series: [{
          name: "每小時特徵變化趨勢圖",
          data: chartData.value
          // [380,254,281,154,240,129,389,216,272,6,36,29,193,206,152,83,39,250,103,68,55,75,149,
          // 275,95,161,14,351,131,186,151,207,22,54,5,352,280,205,311,393,262,53,184,282,271,15,109,243,172,295]
        }]
      }
    })

    // onMounted(()=>{
    //   getData()
    // })

    return {
      dynamicData,
      chartOptions,
      filterDynamicData,
      activeName,
      Histogram,
      headerStyle,
      getData
    }
  }
})
</script>
