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
import axios from 'axios'

export default {
  name: 'dynamicData',
  props: {
    id: String,
  },
  setup(props) {
    //props
    const dynamicName = ref([
      { name: 'FiO2' },
      { name: 'PEEP' },
      { name: 'Plateau Pressure' },
      { name: 'systemicMean' },
      { name: 'heartRate' },
      { name: 'observationOffset' },
      { name: 'systemicDiastolic' },
      { name: 'respiration' },
      { name: 'systemicMean' },
      { name: 'systemicSystolic' },
      { name: 'dialysisTotal' },
      { name: 'intakeOutputOffset' },
      { name: 'intakeTotal' },
      { name: 'netTotal' },
      { name: 'outputTotal' },
    ])
    const respName = ['FiO2', 'PEEP', 'Plateau Pressure']
    const vitalName = [
      'systemicMean',
      'heartRate',
      'observationOffset',
      'systemicDiastolic',
      'respiration',
      'systemicMean',
      'systemicSystolic',
    ]
    const ioName = [
      'dialysisTotal',
      'intakeOutputOffset',
      'intakeTotal',
      'netTotal',
      'outputTotal',
    ]
    const chartData = ref([])

    const activeName = ref('1')
    const headerStyle = { background: '#395679', color: '#ffffff' }

    const dynamicData = ref([])
    const getData = async (row) => {
      var res = []
      if (respName.indexOf(row) + 1) {
        res = await axios.post(
          ' https://vae.fly.dev/patient/respiratoryCharting/',
          { id: props.id, field_name: row, hour: true }
        )
      } else if (vitalName.indexOf(row) + 1) {
        res = await axios.post(' https://vae.fly.dev/patient/vitalPeriodic/', {
          id: props.id,
          field_name: row,
          hour: true,
        })
      } else if (ioName.indexOf(row) + 1) {
        res = await axios.post(' https://vae.fly.dev/patient/intakeOutput/', {
          id: props.id,
          field_name: row,
          hour: true,
        })
      }
      res = res.data.data

      chartData.value = []
      for (var i in res) {
        chartData.value.push(parseInt(res[i].value))
      }
    }

    const dynamicSearch = ref('')
    const filterDynamicData = computed(() =>
      //動態
      dynamicName.value.filter(
        (data) =>
          !dynamicSearch.value ||
          data.name.toLowerCase().includes(dynamicSearch.value.toLowerCase())
      )
    )

    const chartOptions = computed(() => {
      return {
        chart: { type: 'line' },
        title: { text: '' },
        xAxis: {
          categories: [],
        },
        yAxis: {
          title: { text: '數值' },
        },
        series: [
          {
            name: '每小時特徵變化趨勢圖',
            data: chartData.value,
          },
        ],
      }
    })

    return {
      dynamicData,
      chartOptions,
      filterDynamicData,
      activeName,
      Histogram,
      headerStyle,
      getData,
    }
  },
}
</script>
<style scoped>
.el-table--large {
  font-size: 20px;
}
.el-button {
  font-size: 16px;
  color: #496e85;
  font-family: serif;
}
</style>
